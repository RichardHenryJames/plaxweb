import Link from 'next/link';
import { catalogue } from '@/lib/demos';
import { serviceForDemo } from '@/lib/services';
import { site } from '@/lib/site';

/**
 * How pricing works, rather than what it costs.
 *
 * This used to be a table of starting prices. It was removed on purpose. A
 * number shown before the visitor understands the work gets compared against
 * a template price it has nothing in common with, and the visitor leaves
 * before reaching the part that explains the difference. The people who did
 * enquire were pre-anchored to the lowest number on the page.
 *
 * Hiding the number would be worse. So the page commits to everything that
 * actually worries a buyer — fixed price, agreed first, no hourly billing, no
 * additions at the end — and lets the figure arrive with the scope it depends
 * on. What stays visible is delivery time, which is a real commitment and
 * costs nothing to give away.
 */

const TERMS: [string, string][] = [
  [
    'One fixed price, agreed before anything starts',
    'You get a written scope and a single number. It does not move unless you ask for something that is not in the scope, and then you approve the change before it is built.',
  ],
  [
    'Quoted on scope, not on your industry',
    'A ten-page school site costs more than a five-page salon site because it is more work. Two businesses asking for the same thing pay the same, whatever sector they are in.',
  ],
  [
    'No hourly billing',
    'You are buying a finished website, not our time. If something takes us longer than we expected, that is our problem and it does not reach your invoice.',
  ],
  [
    'Nothing appears at the end',
    'The proposal lists what is included and what is not. Anything we think you do not need yet is named as such and left out of the price rather than quietly added to it.',
  ],
  [
    'Paid in stages, against progress',
    '40% to start, 40% when you approve the design, 20% before launch. Cancel before the design stage and the first instalment covers the work done — nothing further is owed.',
  ],
  [
    'You own what you paid for',
    'Code, content and domain are yours at the end, in your accounts. There is no monthly licence for the site itself and nothing stops you taking it elsewhere.',
  ],
];

export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-20 border-b border-rule py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
            <p className="font-mono text-[0.66rem] tracking-[0.2em] text-flame uppercase">How pricing works</p>
            <h2 className="mt-4 font-display text-[clamp(1.9rem,4.4vw,3rem)] leading-[1.04] font-extrabold tracking-[-0.032em]">
              Every project is quoted on its own.
            </h2>
            <p className="mt-5 max-w-md text-[0.98rem] leading-relaxed text-ink-2">
              We do not publish a starting price, because the number depends almost entirely on scope and a figure
              without one is guesswork. Tell us what you need and you get a fixed price and a delivery date, usually
              within a working day, before you have committed to anything.
            </p>
            <Link
              href={`${site.basePath}/contact`}
              className="mt-7 inline-flex min-h-[52px] items-center justify-center rounded-full bg-ink px-7 text-[0.93rem] font-medium text-paper transition-colors hover:bg-flame"
            >
              Get a fixed-price proposal
            </Link>
          </div>

          <div className="min-w-0">
            <dl className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
              {TERMS.map(([term, detail]) => (
                <div key={term} className="min-w-0">
                  <dt className="text-[0.98rem] leading-snug font-medium">{term}</dt>
                  <dd className="mt-1.5 text-[0.92rem] leading-relaxed text-ink-2">{detail}</dd>
                </div>
              ))}
            </dl>

            <div className="-mx-5 mt-10 overflow-x-auto px-5 sm:mx-0 sm:px-0">
              <table className="w-full min-w-[30rem] border-collapse text-left">
                <caption className="sr-only">Typical delivery time for every PlaxWeb solution</caption>
                <thead>
                  <tr className="border-b-2 border-ink">
                    <th scope="col" className="py-3 pr-4 font-mono text-[0.6rem] tracking-[0.14em] text-ink-3 uppercase">
                      Solution
                    </th>
                    <th scope="col" className="py-3 pr-4 font-mono text-[0.6rem] tracking-[0.14em] text-ink-3 uppercase">
                      Built to move
                    </th>
                    <th
                      scope="col"
                      className="py-3 text-right font-mono text-[0.6rem] tracking-[0.14em] text-ink-3 uppercase"
                    >
                      Typically live in
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {catalogue.map((d) => {
                    const service = serviceForDemo(d.slug);
                    return (
                      <tr key={d.slug} className="border-b border-rule">
                        <th scope="row" className="py-3.5 pr-4 font-medium">
                          {service ? (
                            <Link
                              href={`${site.basePath}/${service.slug}`}
                              className="inline-flex min-h-[28px] items-center text-[0.95rem] transition-colors hover:text-flame"
                            >
                              {d.solution.name}
                            </Link>
                          ) : (
                            d.solution.name
                          )}
                        </th>
                        <td className="py-3.5 pr-4 text-[0.87rem] text-ink-3">{d.solution.metric}</td>
                        <td className="py-3.5 text-right text-[0.9rem] whitespace-nowrap text-ink-3">
                          {d.solution.timeline}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <p className="mt-6 max-w-2xl text-[0.88rem] leading-relaxed text-ink-3">
              Delivery times assume content and photographs arrive when we ask for them, which is the usual reason a
              website is late. Extra pages, a second language, online payments, a booking engine or a CRM connection
              are quoted alongside the base scope so you can see what each one adds before deciding.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
