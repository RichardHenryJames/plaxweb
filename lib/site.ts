/**
 * Site-wide constants. Everything that would change if the studio moved
 * domains, phone numbers or entry path lives here.
 */

export const site = {
  name: 'PlaxWeb',
  parent: 'PlaxLabs',
  /**
   * The studio is the site root, so demos sit directly under it as
   * plaxlabs.com/salon. Kept as a constant because metadata, the sitemap and
   * every internal link derive from it.
   */
  basePath: '',
  /** Same place, but usable as an href — `basePath` alone is not a valid one. */
  home: '/',
  domain: 'plaxlabs.com',
  tagline: 'Websites built for real businesses.',
  description:
    'PlaxWeb builds websites for Indian businesses — salons, restaurants, clinics, schools, builders and more. Ten finished demo websites you can open and use right now.',
  /**
   * Where enquiries are delivered. Deliberately NOT shown on the site: the
   * domain has no MX records, so mail sent here bounces silently. Set
   * LEAD_INBOX in the environment to override. Publish it again only once a
   * mailbox actually exists.
   */
  email: 'hello@plaxlabs.com',
  phoneDisplay: '+91 98765 43210',
  phoneRaw: '919876543210',
  city: 'Bengaluru, India',
  addressLines: ['PlaxLabs', '2nd Floor, Cambridge Layout', 'Halasuru, Bengaluru 560008'],
  hours: 'Mon–Sat, 10am – 7pm IST',
} as const;

/** Absolute origin. Vercel sets VERCEL_PROJECT_PRODUCTION_URL automatically. */
export function origin(): string {
  if (process.env.NEXT_PUBLIC_SITE_ORIGIN) return process.env.NEXT_PUBLIC_SITE_ORIGIN;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return `https://${site.domain}`;
}

/** Build a WhatsApp deep link with a pre-filled message. */
export function whatsappUrl(message: string, phone: string = site.phoneRaw): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/** Quote link that carries the originating demo through to the lead form. */
export function quoteUrl(sourceDemo?: string): string {
  return sourceDemo ? `${site.basePath}/contact?demo=${sourceDemo}` : `${site.basePath}/contact`;
}
