import Link from 'next/link';
import { goals } from '@/lib/goals';
import { site } from '@/lib/site';

/**
 * The other way into the site.
 *
 * Every agency organises itself by what it makes. That is the seller's filing
 * system: a clinic owner does not wake up needing a clinic website, they wake
 * up needing a fuller appointment book. Someone who already knows what to buy
 * uses the industry list; someone who only knows what is going wrong has,
 * until now, had nowhere to start.
 *
 * Set as sentences rather than cards on purpose. These are quotations — the
 * words an owner actually uses — and putting them in boxes with icons would
 * turn them back into agency taxonomy, which is the thing this section exists
 * to avoid.
 */
export function GoalIndex() {
  return (
    <section id="goals" className="scroll-mt-20 border-b border-rule bg-ink py-16 text-paper sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
        <div className="max-w-3xl">
          <p className="font-mono text-[0.66rem] tracking-[0.2em] text-flame-lit uppercase">Start from the problem</p>
          <h2 className="mt-4 font-display text-[clamp(1.9rem,4.6vw,3.1rem)] leading-[1.03] font-extrabold tracking-[-0.034em]">
            Most owners don&rsquo;t want a website. They want the thing a website does.
          </h2>
          <p className="mt-5 text-[1.02rem] leading-relaxed text-paper/65">
            If you already know what you need built, the list of industries is further down. If you only know what
            isn&rsquo;t working, start here.
          </p>
        </div>

        <nav aria-label="Explore by business goal" className="mt-12 border-t border-paper/15">
          <ul>
            {goals.map((g) => (
              <li key={g.slug} className="border-b border-paper/15">
                <Link
                  href={`${site.basePath}/goals/${g.slug}`}
                  className="group flex flex-wrap items-baseline gap-x-8 gap-y-2 py-6 sm:py-7"
                >
                  <span className="font-display text-[clamp(1.25rem,3.2vw,2rem)] leading-tight font-semibold tracking-[-0.025em] transition-colors group-hover:text-flame-lit">
                    &ldquo;{g.said}.&rdquo;
                  </span>
                  <span className="ml-auto flex shrink-0 items-center gap-3 font-mono text-[0.62rem] tracking-[0.16em] text-paper/45 uppercase transition-colors group-hover:text-paper">
                    {g.metric}
                    <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
