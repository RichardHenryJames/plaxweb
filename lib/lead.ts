import { z } from 'zod';
import { demoSlugs } from './demos';

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

export const leadSchema = z.object({
  name: z.string().transform(clean).pipe(z.string().min(2, 'Please enter your name').max(80)),
  business: z.string().transform(clean).pipe(z.string().max(120)).optional().or(z.literal('')),
  phone: z
    .string()
    .transform((s) => clean(s).replace(/[\s-]/g, ''))
    .pipe(
      z
        .string()
        .min(8, 'Enter a phone number we can reach you on')
        .max(20)
        .regex(/^\+?[0-9]+$/, 'Digits only, with an optional country code')
    ),
  email: z.string().transform(clean).pipe(z.email('Check this email address').max(160)).optional().or(z.literal('')),
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
});

export type Lead = z.infer<typeof leadSchema>;

export type LeadState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
  fieldErrors?: Partial<Record<keyof Lead, string>>;
};

/** Plain-text body. Text-only sidesteps HTML injection in the inbox entirely. */
export function formatLead(lead: Lead, meta: { referer?: string; at: Date }): string {
  const rows: [string, string | undefined][] = [
    ['Name', lead.name],
    ['Business', lead.business],
    ['Phone / WhatsApp', lead.phone],
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
