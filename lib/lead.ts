import { z } from 'zod';
import { demoSlugs } from './demos';
import { countryOf, isCountry, toE164 } from './countries';

/** Strip control characters — nothing legitimate needs them. */
const clean = (s: string) => s.replace(/[\u0000-\u001f\u007f]/g, '').trim();

export const BUDGETS = [
  'Not sure yet',
  'Under ₹25,000',
  '₹25,000 – ₹50,000',
  '₹50,000 – ₹1,00,000',
  '₹1,00,000 – ₹2,00,000',
  'Above ₹2,00,000',
] as const;

export const TIMELINES = ['As soon as possible', 'Within 2–4 weeks', 'In 1–2 months', 'Just exploring'] as const;

export const REQUIREMENTS = [
  'A new website',
  'Redesign of my existing website',
  'A single landing page',
  'Not sure — need advice',
] as const;

export const CATEGORIES = [
  'Salon / Spa',
  'Restaurant / Cafe',
  'Clinic / Healthcare',
  'School / Coaching',
  'Real estate / Builder',
  'Travel / Tours',
  'Gym / Fitness',
  'Interior / Architecture',
  'Hotel / Resort / Homestay',
  'Retail / Fashion label',
  'Something else',
] as const;

export const leadSchema = z
  .object({
    name: z.string().transform(clean).pipe(z.string().min(2, 'Please enter your name').max(80)),
    business: z.string().transform(clean).pipe(z.string().max(120)).optional().or(z.literal('')),
    /**
     * ISO country code, not a dialling code. Dialling codes are not unique
     * (+1 is the US and Canada), and taking the prefix from a submitted field
     * would let a tampered request pair any country with any prefix. The
     * server looks the prefix up from this instead.
     */
    phoneCountry: z
      .string()
      .transform((s) => clean(s).toUpperCase())
      .pipe(z.string().refine(isCountry, 'Choose a country')),
    /** The national number only — what the visitor would give a local. */
    phone: z
      .string()
      .transform((s) => clean(s).replace(/[\s\-().]/g, '').replace(/^0+/, ''))
      .pipe(
        z
          .string()
          .min(4, 'Enter a phone number we can reach you on')
          .max(14)
          .regex(/^[0-9]+$/, 'Digits only — leave out the country code')
      ),
    /**
     * Required, so every enquiry can be acknowledged. It is the one field
     * that pays the visitor back for filling in the form: without it they
     * send their details into silence and have no record it worked.
     */
    email: z
      .string()
      .transform(clean)
      .pipe(z.email('Enter an email so we can send you a copy').max(160)),
    category: z.enum(CATEGORIES),
    requirement: z.enum(REQUIREMENTS).optional(),
    referenceDemo: z
      .string()
      .transform(clean)
      .refine((v) => v === '' || v === 'none' || demoSlugs.includes(v), 'Unknown demo')
      .optional(),
    budget: z.enum(BUDGETS).optional(),
    timeline: z.enum(TIMELINES).optional(),
    message: z.string().transform(clean).pipe(z.string().max(2000)).optional().or(z.literal('')),
    /** Context carried from the demo the visitor came from. */
    solution: z.string().transform(clean).pipe(z.string().max(80)).optional().or(z.literal('')),
    previewView: z.enum(['desktop', 'mobile']).optional().or(z.literal('')),
    /** Honeypot — must stay empty. */
    website: z.string().max(0).optional().or(z.literal('')),
  })
  // Only checked where the country has a genuinely fixed length. Guessing for
  // countries with variable numbering would reject valid numbers, which loses
  // the enquiry outright — a much worse outcome than accepting a typo.
  .superRefine((v, ctx) => {
    const c = countryOf(v.phoneCountry);
    if (c.nsn && v.phone.length !== c.nsn) {
      ctx.addIssue({
        code: 'custom',
        path: ['phone'],
        message: `${c.name} numbers are ${c.nsn} digits. You entered ${v.phone.length}.`,
      });
    }
  });

export type Lead = z.infer<typeof leadSchema>;

/** The dialable number, assembled server-side from the country and the digits. */
export function leadPhone(lead: Lead): string {
  return toE164(lead.phoneCountry, lead.phone);
}

export type LeadState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
  fieldErrors?: Partial<Record<keyof Lead, string>>;
  /**
   * A wa.me link pre-filled as if the enquirer wrote it, built on the server
   * where the whole lead is known.
   *
   * This is the free path, and the reason it points that way round: Meta
   * charges a business to start a conversation, but once the customer sends
   * the first message, every reply for the next 24 hours costs nothing. One
   * tap here turns a paid outbound message into a free inbound one.
   */
  whatsapp?: string;
};

/** Plain-text body. Text-only sidesteps HTML injection in the inbox entirely. */
export function formatLead(lead: Lead, meta: { referer?: string; at: Date }): string {
  const rows: [string, string | undefined][] = [
    ['Name', lead.name],
    ['Business', lead.business],
    ['Phone / WhatsApp', `${leadPhone(lead)}  (${countryOf(lead.phoneCountry).name})`],
    ['Email', lead.email],
    ['Category', lead.category],
    ['Solution', lead.solution],
    ['Requirement', lead.requirement],
    ['Reference demo', lead.referenceDemo !== 'none' ? lead.referenceDemo : undefined],
    ['Previewed on', lead.previewView],
    ['Budget', lead.budget],
    ['Timeline', lead.timeline],
    ['Came from', meta.referer],
    ['Received', meta.at.toISOString()],
  ];

  // Only what was actually answered. The form asks for far less than the schema
  // allows, so printing every field would bury the real content under blanks.
  const table = rows
    .filter(([, v]) => v)
    .map(([k, v]) => `${k.padEnd(18)}: ${v}`)
    .join('\n');
  return `New PlaxWeb enquiry\n\n${table}\n\nMessage\n-------\n${lead.message || '—'}\n`;
}
