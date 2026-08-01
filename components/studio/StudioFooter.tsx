import Link from 'next/link';
import { catalogue } from '@/lib/demos';
import { site, whatsappUrl } from '@/lib/site';

export function StudioFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-[84rem] px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr] md:gap-8">
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
            </div>
          </div>

          <nav aria-label="Solutions">
            <h2 className="font-mono text-[0.65rem] tracking-[0.18em] text-paper/40 uppercase">Website solutions</h2>
            <ul className="mt-4 space-y-2.5">
              {catalogue.map((d) => (
                <li key={d.slug}>
                  <Link
                    href={`${site.basePath}/${d.slug}`}
                    className="inline-flex min-h-[28px] items-center text-[0.9rem] text-paper/70 transition-colors hover:text-paper"
                  >
                    {d.solution.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-mono text-[0.65rem] tracking-[0.18em] text-paper/40 uppercase">Studio</h2>
            <ul className="mt-4 space-y-2.5 text-[0.9rem] text-paper/70">
              <li>
                <Link href={`${site.basePath}/contact`} className="transition-colors hover:text-paper">
                  Get a quote
                </Link>
              </li>
              <li>
                <a
                  href={whatsappUrl('Hi PlaxWeb, I would like to talk about a website for my business.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-paper"
                >
                  WhatsApp us
                </a>
              </li>
              <li className="pt-3 text-paper/45">{site.hours}</li>
            </ul>
            <address className="mt-6 text-[0.85rem] leading-relaxed text-paper/45 not-italic">
              {site.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </div>
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
