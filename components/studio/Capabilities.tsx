/**
 * Confirmation, not persuasion.
 *
 * By the time a visitor reaches this point they have already opened a menu, a
 * fee table and a booking flow in the demos above. Six paragraphs re-arguing
 * that is repetition, so this is now a checklist that can be scanned in a few
 * seconds — the portfolio sells, this only confirms scope.
 */
const ITEMS: [string, string][] = [
  ['Business websites', 'The five to twelve pages a real business needs, readable on a phone in ninety seconds.'],
  ['Enquiry & booking flows', 'Appointments, admissions, site visits, tables — with the fields your team needs to act.'],
  ['Menus, catalogues & tariffs', 'Prices, sizes and packages that load instantly instead of a PDF nobody can pinch-zoom.'],
  ['WhatsApp & call routing', 'Pre-filled WhatsApp, click-to-call, and a copy of every lead in your inbox.'],
  ['Local SEO groundwork', 'Titles, structured data, sitemap and a Google Business Profile checklist.'],
  ['Speed & Core Web Vitals', 'Images sized per device, fonts self-hosted, almost no JavaScript.'],
];

export function Capabilities() {
  return (
    <section id="build" className="scroll-mt-20 border-b border-rule py-16 sm:py-20">
      <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[0.66rem] tracking-[0.2em] text-flame uppercase">What we build</p>
            <h2 className="mt-4 font-display text-[clamp(1.8rem,4vw,2.6rem)] leading-[1.05] font-extrabold tracking-[-0.032em]">
              What is in every build.
            </h2>
          </div>
          <p className="max-w-sm text-[0.95rem] leading-relaxed text-ink-3">
            If a section does not help someone decide, understand or get in touch, we will argue against building it.
          </p>
        </div>

        <ul className="mt-10 grid gap-x-10 border-t border-rule sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map(([title, body], i) => (
            <li
              key={title}
              data-reveal
              style={{ ['--reveal-delay' as string]: `${(i % 3) * 60}ms` }}
              className="border-b border-rule py-6"
            >
              <h3 className="flex items-baseline gap-3 font-display text-[1.05rem] leading-snug font-bold tracking-[-0.02em]">
                <span className="font-mono text-[0.62rem] font-normal tracking-widest text-flame">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {title}
              </h3>
              <p className="mt-2 text-[0.92rem] leading-relaxed text-ink-3">{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
