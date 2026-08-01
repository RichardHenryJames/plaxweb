import Link from 'next/link';
import { services, solutionFor } from '@/lib/services';
import { site } from '@/lib/site';

/**
 * The hub that makes the service pages reachable.
 *
 * Without this the service pages were orphans: linked from the sitemap and
 * from each other, but not from the one page on the site with any authority
 * to pass. It is grouped by sector rather than listed flat because that is how
 * a visitor scans for themselves — they are looking for their own industry,
 * not reading ten options.
 */

const ORDER = [
  'Food & Dining',
  'Health & Wellness',
  'Travel & Stay',
  'Property & Interiors',
  'Education',
  'Retail',
] as const;

export function ServiceIndex() {
  const grouped = ORDER.map((group) => ({
    group,
    items: services.filter((s) => solutionFor(s).group === group),
  })).filter((g) => g.items.length > 0);

  return (
    <section id="services" className="scroll-mt-20 border-b border-rule py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
        <div className="max-w-3xl">
          <p className="font-mono text-[0.66rem] tracking-[0.2em] text-flame uppercase">What we build</p>
          <h2 className="mt-4 font-display text-[clamp(1.9rem,4.4vw,3rem)] leading-[1.04] font-extrabold tracking-[-0.032em]">
            How we think about each industry.
          </h2>
          <p className="mt-5 text-[1rem] leading-relaxed text-ink-2">
            Every industry sells differently, so every website has to work differently. These pages set out what we
            think a website in each one has to get right, and why. Written to be useful whether or not you end up
            working with us.
          </p>
        </div>

        <nav aria-label="Website design services" className="mt-10">
          <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {grouped.map(({ group, items }, i) => (
              <div
                key={group}
                className="min-w-0"
                data-reveal
                style={{ ['--reveal-delay' as string]: `${(i % 3) * 80}ms` }}
              >
                <h3 className="border-b border-rule pb-2 font-mono text-[0.62rem] tracking-[0.16em] text-ink-3 uppercase">
                  {group}
                </h3>
                <ul className="mt-3 space-y-2.5">
                  {items.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`${site.basePath}/${s.slug}`}
                        className="group inline-flex min-h-[32px] items-start gap-2 text-[0.98rem] leading-snug transition-colors hover:text-flame"
                      >
                        <span
                          aria-hidden
                          className="mt-[0.5rem] h-1.5 w-1.5 shrink-0 rounded-full bg-rule transition-colors group-hover:bg-flame"
                        />
                        <span className="min-w-0">{s.h1}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </nav>
      </div>
    </section>
  );
}
