import Link from 'next/link';
import { catalogue } from '@/lib/demos';
import { site } from '@/lib/site';

const HOW = [
  [
    'One fixed price, agreed first',
    'You get a written scope and a number before any payment. No hourly billing, no line items appearing at the end.',
  ],
  [
    'The number moves with the work, not the industry',
    'A ten-page school site costs more than a five-page salon site because it is more work. The industry itself makes no difference to the number.',
  ],
  [
    'Running costs stay small',
    'Most small-business sites sit inside the free tier of our hosting platform; heavier traffic or added services can change that, and we will say so before you commit. A domain is about ₹900 a year and stays in your name.',
  ],
];

/**
 * Prices are attached to solutions rather than to abstract tiers, because that
 * is the question a business owner is actually asking: what does the thing I
 * just looked at cost?
 */
export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-20 border-b border-rule py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
            <p className="font-mono text-[0.66rem] tracking-[0.2em] text-flame uppercase">What it costs</p>
            <h2 className="mt-4 font-display text-[clamp(1.9rem,4.4vw,3rem)] leading-[1.04] font-extrabold tracking-[-0.032em]">
              What each website starts at.
            </h2>
            <div className="mt-7 space-y-6">
              {HOW.map(([title, body]) => (
                <div key={title}>
                  <h3 className="text-[0.98rem] font-medium">{title}</h3>
                  <p className="mt-1.5 max-w-md text-[0.92rem] leading-relaxed text-ink-2">{body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="min-w-0">
            <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
              <table className="w-full min-w-[32rem] border-collapse text-left">
                <caption className="sr-only">Starting price and delivery time for every PlaxWeb solution</caption>
                <thead>
                  <tr className="border-b-2 border-ink">
                    <th scope="col" className="py-3 pr-4 font-mono text-[0.6rem] tracking-[0.14em] text-ink-3 uppercase">
                      Solution
                    </th>
                    <th scope="col" className="py-3 pr-4 font-mono text-[0.6rem] tracking-[0.14em] text-ink-3 uppercase">
                      Built to move
                    </th>
                    <th scope="col" className="py-3 pr-4 text-right font-mono text-[0.6rem] tracking-[0.14em] text-ink-3 uppercase">
                      Live in
                    </th>
                    <th scope="col" className="py-3 text-right font-mono text-[0.6rem] tracking-[0.14em] text-ink-3 uppercase">
                      From
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {catalogue.map((d) => (
                    <tr key={d.slug} className="border-b border-rule">
                      <th scope="row" className="py-3.5 pr-4 font-medium">
                        <Link
                          href={`${site.basePath}/${d.slug}`}
                          className="inline-flex min-h-[28px] items-center text-[0.95rem] transition-colors hover:text-flame"
                        >
                          {d.solution.name}
                        </Link>
                      </th>
                      <td className="py-3.5 pr-4 text-[0.87rem] text-ink-3">{d.solution.metric}</td>
                      <td className="py-3.5 pr-4 text-right text-[0.87rem] whitespace-nowrap text-ink-3">
                        {d.solution.timeline}
                      </td>
                      <td className="py-3.5 text-right text-[0.95rem] font-medium whitespace-nowrap">
                        {d.solution.priceFrom}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-6 max-w-2xl text-[0.88rem] leading-relaxed text-ink-3">
              Starting prices are for the solution as it stands, with your brand and content in place of ours. Extra
              pages, a second language, online payments, a booking engine or a CRM connection are quoted on top, and
              we will tell you which of them you do not need yet.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                href={`${site.basePath}/contact`}
                className="inline-flex min-h-[50px] items-center justify-center rounded-full bg-ink px-7 text-[0.92rem] font-medium text-paper transition-colors hover:bg-flame"
              >
                Get a fixed quote
              </Link>
              <p className="text-[0.86rem] text-ink-3">
                40% to start · 40% on design approval · 20% before launch. GST invoice every time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
