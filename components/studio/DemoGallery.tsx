'use client';

import { useMemo, useState } from 'react';
import { alsoBuilt, catalogue, featured, groups } from '@/lib/demos';
import { track } from '@/lib/analytics';
import { CompactCard, FeatureRow, SolutionCard } from './DemoShowcase';

const ALL = 'All';

/**
 * The portfolio.
 *
 * Unfiltered, this curates: three projects get real room, the rest are shown
 * small. Identical cards in a row made the page read as a product list and
 * buried the work under repeated feature lists — what a solution includes
 * belongs on the demo and the enquiry page, not repeated here.
 *
 * Picking a sector switches to a plain grid: at that point the visitor has
 * said what they want, and hierarchy would only get in the way.
 *
 * Nothing here counts anything. It used to show "10 of 10" and a tally on
 * every sector chip, which answered a question the visitor was not asking and
 * quietly drew attention to how small the catalogue is. The job of this
 * section is to get someone to their own industry, not to be impressive about
 * its size.
 */
export function DemoGallery() {
  const [filter, setFilter] = useState<string>(ALL);
  const options = useMemo(() => [ALL, ...groups()], []);
  const filtered = filter === ALL ? [] : catalogue.filter((d) => d.solution.group === filter);
  const curated = filter === ALL;

  return (
    <section id="demos" className="scroll-mt-20 border-b border-rule py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="font-mono text-[0.66rem] tracking-[0.2em] text-flame uppercase">The work</p>
            <h2 className="mt-4 font-display text-[clamp(1.9rem,4.4vw,3rem)] leading-[1.04] font-extrabold tracking-[-0.032em]">
              Find the one closest to your business.
            </h2>
            <p className="mt-4 text-[1rem] leading-relaxed text-ink-2">
              Each of these was designed for a different business with a different problem to solve, so they look and
              behave nothing alike. They are finished, working websites: check a menu, request a slot, run a repayment
              calculator, plan a trip. Open them on your phone as well as your laptop.
            </p>
          </div>
          <p className="shrink-0 font-mono text-[0.7rem] tracking-[0.14em] text-ink-3 uppercase lg:text-right">
            Jump to your sector <span aria-hidden>↓</span>
          </p>
        </div>

        <div className="mt-8 -mx-5 overflow-x-auto px-5 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0 [scrollbar-width:none]">
          <div role="group" aria-label="Filter by sector" className="flex w-max gap-2 pb-1 lg:w-auto lg:flex-wrap">
            {options.map((opt) => {
              const active = opt === filter;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    setFilter(opt);
                    if (opt !== ALL) track('sector_filter', { sector: opt });
                  }}
                  aria-pressed={active}
                  className={`inline-flex min-h-[40px] items-center gap-2 rounded-full border px-4 text-[0.85rem] whitespace-nowrap transition-colors ${
                    active ? 'border-ink bg-ink text-paper' : 'border-rule text-ink-2 hover:border-ink/45 hover:text-ink'
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        {curated ? (
          <>
            <div className="mt-12 flex flex-col gap-16 lg:mt-16 lg:gap-24">
              {featured.map((demo, i) => (
                <FeatureRow key={demo.slug} demo={demo} index={i} priority={i === 0} />
              ))}
            </div>

            <div className="mt-16 border-t border-rule pt-10 lg:mt-24 lg:pt-14">
              <h3 className="font-mono text-[0.66rem] tracking-[0.2em] text-ink-3 uppercase">Other industries</h3>
              <div className="mt-8 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3 lg:gap-x-10">
                {alsoBuilt.map((demo, i) => (
                  <CompactCard key={demo.slug} demo={demo} index={i} />
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="mt-12 grid gap-x-10 gap-y-16 lg:mt-14 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-20 xl:gap-x-16">
            {filtered.map((demo, i) => (
              <SolutionCard key={demo.slug} demo={demo} index={catalogue.indexOf(demo)} priority={i < 2} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
