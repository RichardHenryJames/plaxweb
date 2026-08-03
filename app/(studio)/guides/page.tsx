import type { Metadata } from 'next';
import Link from 'next/link';
import { guides } from '@/lib/guides';
import { featured } from '@/lib/demos';
import { jsonLd, pageMetadata } from '@/lib/metadata';
import { origin, site } from '@/lib/site';

/**
 * The index. Deliberately plain.
 *
 * Everything cinematic on this site lives on the home page. Someone who has
 * arrived here has a question and wants it answered, so this is a list of
 * questions in large type and nothing else — no cards, no thumbnails, no
 * estimated reading time dressed up as a badge.
 */

export const metadata: Metadata = pageMetadata({
  title: 'Guides for business owners | PlaxWeb',
  description:
    'Straight answers on what a website should cost, whether you need one at all, how to get found locally, and why a slow site quietly loses enquiries.',
  path: `${site.basePath}/guides`,
  image: featured[0].preview ? `${origin()}${featured[0].preview.desktop.src}` : undefined,
});

export default function GuidesPage() {
  const listSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'PlaxWeb guides',
    itemListElement: guides.map((g, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: g.title,
      url: `${origin()}${site.basePath}/guides/${g.slug}`,
    })),
  };

  return (
    <>
      <script {...jsonLd(listSchema)} />

      <header className="border-b border-rule py-14 sm:py-20">
        <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[0.66rem] tracking-[0.14em] text-ink-3 uppercase">
              <li>
                <Link href={site.home} className="hover:text-flame">
                  PlaxWeb
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page">Guides</li>
            </ol>
          </nav>

          <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.2rem,6vw,4rem)] leading-[1.02] font-extrabold tracking-[-0.035em]">
            Questions owners ask before hiring anyone.
          </h1>
          <p className="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-ink-2">
            Answered properly, including the parts that argue against buying anything from us. There is no newsletter
            attached to these and nothing is gated.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-[84rem] px-5 py-4 sm:px-8">
        <ul className="border-t border-ink">
          {guides.map((g) => (
            <li key={g.slug} className="border-b border-rule">
              <Link href={`${site.basePath}/guides/${g.slug}`} className="group block py-8 sm:py-10">
                <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
                  <h2 className="font-display text-[clamp(1.4rem,3.2vw,2.1rem)] leading-[1.08] font-extrabold tracking-[-0.028em] transition-colors group-hover:text-flame">
                    {g.h1}
                  </h2>
                  <div className="min-w-0">
                    <p className="text-[1rem] leading-relaxed text-ink-2">{g.dek}</p>
                    <p className="mt-3 font-mono text-[0.62rem] tracking-[0.16em] text-ink-3 uppercase">
                      {g.minutes} min read
                      <span aria-hidden className="ml-3 inline-block transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
