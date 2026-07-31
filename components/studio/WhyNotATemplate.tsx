import { site } from '@/lib/site';

/**
 * The objection nobody says out loud.
 *
 * Every business owner being sold a website has already seen a ₹2,000 theme
 * and a ₹499/month site builder. Ignoring that makes our price look arbitrary;
 * answering it plainly is the difference between a considered decision and a
 * silent bounce. No claims here that a visitor cannot check on this site.
 */
const points: [string, string][] = [
  [
    'A template starts with a layout. We start with the enquiry.',
    'The salon demo is built around one thing: a booking request that arrives with the service, stylist and time already filled in. A theme cannot know that, so it gives you a contact form and leaves the rest to you.',
  ],
  [
    'Your prices, your rooms, your photographs.',
    'Every demo carries real service menus, fee tables, floor plans or tariffs — the content owners actually get asked about. Templates ship with placeholder copy that most sites never replace.',
  ],
  [
    'Built for the phone your customer is holding.',
    'Open any demo at 390px. Nothing is pinch-to-zoom, nothing is cut off, and call and WhatsApp stay within thumb reach. Themes are demoed on desktop and thinned down afterwards.',
  ],
  [
    'You own it outright.',
    'The code, the domain and the content are yours, with no monthly licence for the site itself. If you leave us, nothing switches off.',
  ],
];

export function WhyNotATemplate() {
  return (
    <section className="border-b border-rule py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="min-w-0">
            <p className="font-mono text-[0.66rem] tracking-[0.2em] text-flame uppercase">The fair question</p>
            <h2 className="mt-4 font-display text-[clamp(1.8rem,4vw,2.7rem)] leading-[1.06] font-extrabold tracking-[-0.03em]">
              Why not just buy a&nbsp;₹2,000 template?
            </h2>
            <p className="mt-5 text-[1rem] leading-relaxed text-ink-2">
              Sometimes you should. If you need a single page with your address and a phone number, a theme will do it
              this week for almost nothing, and we will tell you so on the call.
            </p>
            <p className="mt-4 text-[1rem] leading-relaxed text-ink-2">
              The four differences below are the ones that decide whether a website sits there or brings you work.
            </p>
          </div>

          <ol className="min-w-0 divide-y divide-rule border-t border-rule">
            {points.map(([title, body], i) => (
              <li key={title} className="flex gap-5 py-6 sm:gap-8" data-reveal style={{ ['--reveal-delay' as string]: `${i * 70}ms` }}>
                <span aria-hidden className="mt-1 font-mono text-[0.7rem] text-flame">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-[1.08rem] leading-snug font-bold tracking-[-0.015em]">{title}</h3>
                  <p className="mt-2 text-[0.94rem] leading-relaxed text-ink-2">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <p className="mt-10 max-w-3xl border-l-2 border-rule pl-5 text-[0.9rem] leading-relaxed text-ink-3">
          {site.name} is a small studio, not an agency floor. You talk to the person building your site, and the price
          we quote is the price you pay.
        </p>
      </div>
    </section>
  );
}
