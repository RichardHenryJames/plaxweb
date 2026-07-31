'use client';

import { useMemo, useState } from 'react';
import { catalogue, groups } from '@/lib/demos';
import { SolutionCard } from './DemoShowcase';

const ALL = 'All';

export function DemoGallery() {
  const [filter, setFilter] = useState<string>(ALL);
  const options = useMemo(() => [ALL, ...groups()], []);
  const list = filter === ALL ? catalogue : catalogue.filter((d) => d.solution.group === filter);

  return (
    <section id="demos" className="scroll-mt-20 border-b border-rule py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="font-mono text-[0.66rem] tracking-[0.2em] text-flame uppercase">Website solutions</p>
            <h2 className="mt-4 font-display text-[clamp(1.9rem,4.4vw,3rem)] leading-[1.04] font-extrabold tracking-[-0.032em]">
              Find the one closest to your business.
            </h2>
            <p className="mt-4 text-[1rem] leading-relaxed text-ink-2">
              Ten finished websites, each built around a single business outcome. Switch between desktop and mobile,
              then open the live site and use it the way your customer would.
            </p>
          </div>
          <p className="shrink-0 font-mono text-[0.7rem] text-ink-3 lg:text-right">
            Showing {list.length} of {catalogue.length}
            <span className="mx-2 text-rule">/</span>
            all live
          </p>
        </div>

        <div className="mt-8 -mx-5 overflow-x-auto px-5 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0 [scrollbar-width:none]">
          <div role="group" aria-label="Filter solutions by sector" className="flex w-max gap-2 pb-1 lg:w-auto lg:flex-wrap">
            {options.map((opt) => {
              const active = opt === filter;
              const count = opt === ALL ? catalogue.length : catalogue.filter((d) => d.solution.group === opt).length;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setFilter(opt)}
                  aria-pressed={active}
                  className={`inline-flex min-h-[40px] items-center gap-2 rounded-full border px-4 text-[0.85rem] whitespace-nowrap transition-colors ${
                    active ? 'border-ink bg-ink text-paper' : 'border-rule text-ink-2 hover:border-ink/45 hover:text-ink'
                  }`}
                >
                  {opt}
                  <span className={active ? 'text-paper/55' : 'text-ink-3'}>{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-12 grid gap-x-10 gap-y-16 lg:mt-14 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-20 xl:gap-x-16">
          {list.map((demo, i) => (
            <SolutionCard key={demo.slug} demo={demo} index={catalogue.indexOf(demo)} priority={i < 2} />
          ))}
        </div>
      </div>
    </section>
  );
}
