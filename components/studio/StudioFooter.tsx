import Link from 'next/link';
import { catalogue } from '@/lib/demos';
import { services, solutionFor } from '@/lib/services';
import { goals } from '@/lib/goals';
import { guides } from '@/lib/guides';
import { site, whatsappUrl } from '@/lib/site';

/**
 * A resource hub rather than a row of links.
 *
 * The footer is the only element on every page, which makes it the strongest
 * internal linking surface the site has: every indexable page is reachable
 * from every other page in one click. That matters more here than on an
 * established site, because a new domain has no external links pointing at
 * its deeper pages and this is the only signal available that they exist.
 *
 * Both navigation systems are repeated in full — by industry for someone who
 * knows what they want built, by goal for someone who only knows what is
 * going wrong. Demos are listed too even though they are noindex: they cannot
 * rank, but they are the thing people actually want to open, and burying them
 * would be perverse.
 */
export function StudioFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-[84rem] px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr_1fr_1fr] lg:gap-10">
          {/* ------------------------------------------------------- brand */}
          <div className="max-w-sm">
            <span className="font-display text-[1.6rem] leading-none font-extrabold tracking-[-0.03em]">
              Plax<span className="text-flame-lit">Web</span>
            </span>
            {/* The tagline lives here rather than in the hero, where the work
                should do the talking. This is the line that travels — OG cards,
                proposals, invoices, WhatsApp Business. */}
            <p className="mt-4 font-display text-[1.15rem] leading-snug font-bold tracking-[-0.02em]">
              Websites built to do business.
            </p>
            <p className="mt-2 text-[0.85rem] text-paper/55">A Plax Labs studio. {site.serves}.</p>
            <p className="mt-5 text-[0.95rem] leading-relaxed text-paper/65">
              We build websites to win business, not awards.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`tel:+${site.phoneRaw}`}
                className="rounded-full border border-paper/20 px-4 py-2 text-[0.82rem] transition-colors hover:border-paper/50"
              >
                {site.phoneDisplay}
              </a>
              <a
                href={whatsappUrl('Hi PlaxWeb, I saw your website demos and want to discuss a website for my business.')}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-paper/20 px-4 py-2 text-[0.82rem] transition-colors hover:border-paper/50"
              >
                WhatsApp
              </a>
              {/* Text, not an icon, because the two beside it are text. A lone
                  glyph here would read as decoration rather than a third
                  equally usable route. */}
              <a
                href={site.social.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-paper/20 px-4 py-2 text-[0.82rem] transition-colors hover:border-paper/50"
              >
                {site.social.instagram.name}
              </a>
            </div>

            <address className="mt-7 text-[0.85rem] leading-relaxed text-paper/45 not-italic">
              {site.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              <span className="mt-2 block">{site.hours}</span>
            </address>
          </div>

          {/* --------------------------------------------------- industries */}
          <nav aria-label="Websites by industry">
            <h2 className="font-mono text-[0.65rem] tracking-[0.18em] text-paper/40 uppercase">By industry</h2>
            <ul className="mt-4 space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`${site.basePath}/${s.slug}`}
                    className="inline-flex min-h-[28px] items-center text-[0.88rem] leading-snug text-paper/70 transition-colors hover:text-paper"
                  >
                    {solutionFor(s).name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* -------------------------------------------------------- goals */}
          <nav aria-label="Websites by business goal">
            <h2 className="font-mono text-[0.65rem] tracking-[0.18em] text-paper/40 uppercase">By goal</h2>
            <ul className="mt-4 space-y-2.5">
              {goals.map((g) => (
                <li key={g.slug}>
                  <Link
                    href={`${site.basePath}/goals/${g.slug}`}
                    className="inline-flex min-h-[28px] items-start text-[0.88rem] leading-snug text-paper/70 transition-colors hover:text-paper"
                  >
                    {g.said}
                  </Link>
                </li>
              ))}
            </ul>

            <h2 className="mt-9 font-mono text-[0.65rem] tracking-[0.18em] text-paper/40 uppercase">Studio</h2>
            <ul className="mt-4 space-y-2.5 text-[0.88rem] text-paper/70">
              <li>
                <Link href={`${site.basePath}/guides`} className="transition-colors hover:text-paper">
                  Guides
                </Link>
              </li>
              <li>
                <Link href={`${site.basePath}/contact`} className="transition-colors hover:text-paper">
                  Get a quote
                </Link>
              </li>
              <li>
                <Link href="/#process" className="transition-colors hover:text-paper">
                  How we work
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="transition-colors hover:text-paper">
                  How pricing works
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="transition-colors hover:text-paper">
                  Questions
                </Link>
              </li>
            </ul>
          </nav>

          {/* -------------------------------------------------------- demos */}
          <nav aria-label="Live demo websites and guides">
            <h2 className="font-mono text-[0.65rem] tracking-[0.18em] text-paper/40 uppercase">Popular guides</h2>
            <ul className="mt-4 space-y-2.5">
              {guides.map((g) => (
                <li key={g.slug}>
                  <Link
                    href={`${site.basePath}/guides/${g.slug}`}
                    className="inline-flex min-h-[28px] items-start text-[0.88rem] leading-snug text-paper/70 transition-colors hover:text-paper"
                  >
                    {g.h1}
                  </Link>
                </li>
              ))}
            </ul>

            <h2 className="mt-9 font-mono text-[0.65rem] tracking-[0.18em] text-paper/40 uppercase">Open a live demo</h2>
            <ul className="mt-4 space-y-2.5">
              {catalogue.slice(0, 6).map((d) => (
                <li key={d.slug}>
                  <Link
                    href={`${site.basePath}/${d.slug}`}
                    className="group inline-flex min-h-[28px] items-baseline gap-2 text-[0.88rem] leading-snug text-paper/70 transition-colors hover:text-paper"
                  >
                    {d.brand}
                    <span className="text-[0.72rem] text-paper/35 transition-colors group-hover:text-paper/60">
                      {d.industry}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-paper/12 pt-6 text-[0.78rem] text-paper/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.parent}. All demo businesses shown are fictional.
          </p>
          <p>Built with Next.js. Hosted on Vercel. Photography via Unsplash.</p>
        </div>
      </div>
    </footer>
  );
}
