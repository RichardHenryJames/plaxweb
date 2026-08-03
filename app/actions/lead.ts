'use server';

import { headers } from 'next/headers';
import { formatLead, leadPhone, leadSchema, type Lead, type LeadState } from '@/lib/lead';
import { leadStore } from '@/lib/supabase';
import { countryOf } from '@/lib/countries';
import { formatVisitor, readVisitor, type Visitor } from '@/lib/visitor';
import { sendWhatsAppTemplate } from '@/lib/whatsapp';
import { site, whatsappUrl } from '@/lib/site';

/**
 * Naive per-instance rate limit. On serverless this is per warm instance, so
 * it stops casual flooding rather than a distributed attack — good enough for
 * a contact form, and it costs nothing.
 */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

type Mail = { to: string; subject: string; text: string; replyTo?: string };

/**
 * plaxlabs.com is verified in Resend (DKIM, SPF and the bounce MX are live),
 * so this needs no environment variable. Override with LEAD_FROM only if the
 * sending domain changes.
 */
const FROM = process.env.LEAD_FROM ?? 'PlaxWeb <noreply@plaxlabs.com>';

async function send(key: string, mail: Mail): Promise<void> {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: FROM,
      to: [mail.to],
      reply_to: mail.replyTo,
      subject: mail.subject,
      text: mail.text,
    }),
  });
  if (!res.ok) throw new Error(`mail provider responded ${res.status}: ${await res.text()}`);
}

/**
 * What the person who enquired gets back.
 *
 * Short, and it repeats what they asked about so the reply is recognisable in
 * a crowded inbox. Replies go to a monitored address rather than the no-reply
 * sender, because someone answering this email is a good sign, not a mistake.
 */
function acknowledgement(lead: Lead): string {
  const about = lead.solution ? `You asked about a ${lead.solution.toLowerCase()}.` : '';
  // Carries the same context the form captured, so the chat opens knowing what
  // it is about rather than with a bare "Hi".
  const chat = whatsappUrl(
    `Hi PlaxWeb, I enquired on your website${lead.solution ? ` about a ${lead.solution.toLowerCase()}` : ''}.`
  );

  return [
    `Hi ${lead.name.split(' ')[0]},`,
    '',
    `Thanks for getting in touch with ${site.name}. ${about}`.trim(),
    '',
    'Someone will reply within one working day with a fixed price, a delivery date, and an honest note on what your business actually needs.',
    '',
    'If WhatsApp is quicker for you, start there and we will pick it up:',
    chat,
    '',
    // No email address in the signature: the domain has no inbox yet, so
    // printing one would invite a reply that bounces. Reply-to on this message
    // already points somewhere monitored.
    `${site.phoneDisplay}`,
    '',
    `${site.name}, a PlaxLabs studio`,
    site.domain,
    `Recent work: ${site.social.instagram.url}`,
    '',
  ].join('\n');
}

async function deliver(lead: Lead, body: string): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  const inbox = process.env.LEAD_INBOX ?? site.email;

  if (!key) {
    // No provider configured (local dev / preview): log so nothing is lost.
    console.info('[plaxweb:lead]\n' + body);
    return;
  }

  // The copy that matters. If this throws, the visitor is told to call.
  //
  // The category is in the subject because mail clients thread on subject
  // alone: three enquiries from the same person collapsed into one
  // conversation, and the two underneath were easy to miss entirely.
  await send(key, {
    to: inbox,
    subject: `Website enquiry — ${lead.name}${lead.business ? ` (${lead.business})` : ''} · ${lead.category}`,
    text: body,
    replyTo: lead.email,
  });

  // Courtesy copy. A failure here must never cost us the enquiry — we already
  // hold the lead and the inbox already has it.
  try {
    await send(key, {
      to: lead.email,
      subject: `We have your enquiry — ${site.name}`,
      text: acknowledgement(lead),
      replyTo: inbox,
    });
  } catch (err) {
    console.error('[plaxweb:lead] acknowledgement not sent', err);
  }
}

/**
 * The same acknowledgement, on the channel most of these people actually read.
 *
 * The wording lives in the approved Meta template, not here. Only the two
 * variable parts are sent: the first name, and what they were looking at.
 *
 * Best effort by design. WhatsApp fails for reasons that have nothing to do
 * with the enquiry — a template pending review, a number not on the platform,
 * a landline in the phone field — and none of them should reach the visitor.
 */
async function notifyOnWhatsApp(lead: Lead): Promise<void> {
  try {
    const looking = lead.solution || `${lead.category.split(' / ')[0].toLowerCase()} website`;
    await sendWhatsAppTemplate(leadPhone(lead), [lead.name.split(' ')[0], looking]);
  } catch (err) {
    console.error('[plaxweb:lead] whatsapp not sent', err);
  }
}

/**
 * Persist the enquiry so there is a list to work from, not just an inbox.
 *
 * Deliberately never throws. An email that arrived is a lead we can still act
 * on; a database hiccup must not be the reason a visitor is told their enquiry
 * failed. Failures are logged loudly enough to notice, with the lead body so
 * it can be recovered from the log.
 */
async function store(lead: Lead, visitor: Visitor): Promise<void> {
  const db = leadStore();
  if (!db) return; // Unconfigured locally; delivery still logs the lead.

  const row = {
    name: lead.name,
    // Stored in full international form so it is dialable straight from the
    // table, whichever country the enquiry came from.
    phone: leadPhone(lead),
    email: lead.email,
    business: lead.business || null,
    category: lead.category,
    message: lead.message || null,
    solution: lead.solution || null,
    reference_demo: lead.referenceDemo && lead.referenceDemo !== 'none' ? lead.referenceDemo : null,
    preview_view: lead.previewView || null,
    referer: visitor.referer ?? null,
  };

  const { error } = await db.from('plaxweb_leads').insert({ ...row, meta: visitor });

  // The meta column arrived after the table did. Rather than lose enquiries on
  // any deployment where the migration has not been run yet, fall back to the
  // row without it — the detail is in the email regardless.
  if (error?.message.includes('meta')) {
    console.warn('[plaxweb:lead] no meta column yet; run the ALTER in supabase-schema.sql');
    const retry = await db.from('plaxweb_leads').insert(row);
    if (retry.error) console.error('[plaxweb:lead] not stored:', retry.error.message);
    return;
  }

  if (error) console.error('[plaxweb:lead] not stored:', error.message);
}

export async function submitLead(_prev: LeadState, formData: FormData): Promise<LeadState> {
  const raw = Object.fromEntries(formData) as Record<string, string>;

  // Handed back on every failure path, because React empties an uncontrolled
  // form once its action resolves — success or not. Never includes the
  // honeypot, which is the one field that must stay empty.
  const values = {
    name: raw.name ?? '',
    phone: raw.phone ?? '',
    email: raw.email ?? '',
    message: raw.message ?? '',
    business: raw.business ?? '',
  };

  // Honeypot: a bot fills every field it finds.
  if (raw.website) return { status: 'success' };

  // Time trap. Kept deliberately short: a browser autofilling name and phone
  // can legitimately submit in a couple of seconds, and turning away a real
  // enquiry costs far more than letting one bot through to the honeypot.
  const started = Number(raw.startedAt);
  if (Number.isFinite(started) && started > 0 && Date.now() - started < 1200) {
    return { status: 'error', message: 'That was quick — please press send once more.', values };
  }

  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: LeadState['fieldErrors'] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof Lead | undefined;
      if (field && !fieldErrors[field]) fieldErrors[field] = issue.message;
    }
    return { status: 'error', message: 'Please check the highlighted fields.', fieldErrors, values };
  }

  const h = await headers();
  const visitor = readVisitor(h);
  if (rateLimited(visitor.ip ?? 'local')) {
    return { status: 'error', message: 'Too many submissions. Please try again in a minute.', values };
  }

  const body =
    formatLead(parsed.data, { referer: visitor.referer, at: new Date() }) +
    '\nWhere this came from\n--------------------\n' +
    formatVisitor(visitor, visitor.country ? countryOf(visitor.country).name : undefined) +
    '\n';

  // Store first: if the mail provider is down we still have the lead.
  await store(parsed.data, visitor);

  try {
    await deliver(parsed.data, body);
  } catch (err) {
    console.error('[plaxweb:lead] delivery failed', err);
    return {
      status: 'error',
      message: `We could not send that. Please WhatsApp or call us on ${site.phoneDisplay} and we will pick it up.`,
      values,
    };
  }

  // After delivery, never before: the email is the record that matters, and
  // this must not delay or endanger it.
  await notifyOnWhatsApp(parsed.data);

  // Written in the enquirer's voice, because they are the one who will send
  // it. Their name and what they asked about are already in it, so the reply
  // can be specific without a round of questions first.
  const looking = parsed.data.solution
    ? ` about a ${parsed.data.solution.toLowerCase()}`
    : ` about a ${parsed.data.category.split(' / ')[0].toLowerCase()} website`;

  return {
    status: 'success',
    whatsapp: whatsappUrl(
      `Hi PlaxWeb, this is ${parsed.data.name}. I just sent an enquiry${looking} and would like to carry on here.`
    ),
  };
}
