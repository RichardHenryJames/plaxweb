'use server';

import { headers } from 'next/headers';
import { formatLead, leadSchema, type Lead, type LeadState } from '@/lib/lead';
import { site } from '@/lib/site';

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

async function deliver(lead: Lead, body: string): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_INBOX ?? site.email;

  if (!key) {
    // No provider configured (local dev / preview): log so nothing is lost.
    console.info('[plaxweb:lead]\n' + body);
    return;
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.LEAD_FROM ?? 'PlaxWeb <onboarding@resend.dev>',
      to: [to],
      reply_to: lead.email || undefined,
      subject: `Website enquiry — ${lead.name}${lead.business ? ` (${lead.business})` : ''}`,
      text: body,
    }),
  });

  if (!res.ok) throw new Error(`mail provider responded ${res.status}`);
}

export async function submitLead(_prev: LeadState, formData: FormData): Promise<LeadState> {
  const raw = Object.fromEntries(formData) as Record<string, string>;

  // Honeypot: a bot fills every field it finds.
  if (raw.website) return { status: 'success' };

  // Time trap. Kept deliberately short: a browser autofilling name and phone
  // can legitimately submit in a couple of seconds, and turning away a real
  // enquiry costs far more than letting one bot through to the honeypot.
  const started = Number(raw.startedAt);
  if (Number.isFinite(started) && started > 0 && Date.now() - started < 1200) {
    return { status: 'error', message: 'That was quick — please press send once more.' };
  }

  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: LeadState['fieldErrors'] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof Lead | undefined;
      if (field && !fieldErrors[field]) fieldErrors[field] = issue.message;
    }
    return { status: 'error', message: 'Please check the highlighted fields.', fieldErrors };
  }

  const h = await headers();
  const ip = (h.get('x-forwarded-for') ?? 'local').split(',')[0].trim();
  if (rateLimited(ip)) {
    return { status: 'error', message: 'Too many submissions. Please try again in a minute.' };
  }

  const body = formatLead(parsed.data, { referer: h.get('referer') ?? undefined, at: new Date() });

  try {
    await deliver(parsed.data, body);
  } catch (err) {
    console.error('[plaxweb:lead] delivery failed', err);
    return {
      status: 'error',
      message: `We could not send that. Please WhatsApp or call us on ${site.phoneDisplay} and we will pick it up.`,
    };
  }

  return { status: 'success' };
}
