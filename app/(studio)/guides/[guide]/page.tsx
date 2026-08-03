import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getGuide, guides, guideSlugs } from '@/lib/guides';
import { services, solutionFor } from '@/lib/services';
import { getDemo } from '@/lib/demos';
import { jsonLd, pageMetadata } from '@/lib/metadata';
import { origin, site } from '@/lib/site';

/**
 * A guide. One column, generous measure, no sidebar.
 *
 * Calm on purpose: the two cinematic scenes live on the home page and this is
 * the other end of that contrast. Someone reading this wants an answer, and
 * anything that moves while they read is working against them.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return guideSlugs.map((guide) => ({ guide }));
}

export async function generateMetadata({ params }: { params: Promise<{ guide: string }> }): Promise<Metadata> {
  const { guide: slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  // Guides get shared far more than any other page here, so the card shows
  // real work rather than a wordmark. The first related industry's demo is
  // the closest thing the article has to a subject.
  const first = services.find((s) => s.slug === guide.related[0]);
  const demo = first ? getDemo(first.demo) : undefined;
  return pageMetadata({
    title: `${guide.h1} | PlaxWeb`,
    description: guide.description,
    path: `${site.basePath}/guides/${guide.slug}`,
    image: demo?.preview ? `${origin()}${demo.preview.desktop.src}` : demo?.cover.src,
  });
}

export default async function GuidePage({ params }: { params: Promise<{ guide: string }> }) {
  const { guide: slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const related = guide.related
    .map((s) => services.find((x) => x.slug === s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const others = guides.filter((g) => g.slug !== guide.slug);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.description,
    dateModified: guide.updated,
    datePublished: guide.updated,
    author: { '@type': 'Organization', name: site.name, url: `${origin()}${site.home}` },
    publisher: { '@id': `${origin()}${site.basePath}#plaxweb` },
    mainEntityOfPage: `${origin()}${site.basePath}/guides/${guide.slug}`,
  };

  const crumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'PlaxWeb', item: `${origin()}${site.home}` },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: `${origin()}${site.basePath}/guides` },
      {
        '@type': 'ListItem',
        position: 3,
        name: guide.h1,
        item: `${origin()}${site.basePath}/guides/${guide.slug}`,
      },
    ],
  };

  return (
    <>
      <script {...jsonLd(articleSchema)} />
      <script {...jsonLd(crumbs)} />

      <article>
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
                <li>
                  <Link href={`${site.basePath}/guides`} className="hover:text-flame">
                    Guides
                  </Link>
                </li>
              </ol>
            </nav>

            <h1 className="mt-5 max-w-4xl font-display text-[clamp(2rem,5.4vw,3.6rem)] leading-[1.03] font-extrabold tracking-[-0.035em]">
              {guide.h1}
            </h1>
            <p className="mt-6 max-w-2xl text-[1.15rem] leading-relaxed text-ink-2">{guide.dek}</p>
            <p className="mt-6 font-mono text-[0.62rem] tracking-[0.16em] text-ink-3 uppercase">
              {guide.minutes} min read
              <span className="mx-3 text-rule">·</span>
              Updated{' '}
              {new Date(guide.updated).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
            </p>
          </div>
        </header>

        {/* Body. A single column at a readable measure — around 70 characters,
            which is where long-form stops being tiring. */}
        <div className="mx-auto max-w-[84rem] px-5 py-14 sm:px-8 sm:py-20">
          <div className="max-w-[42rem]">
            {guide.sections.map((s) => (
              <section key={s.h} className="mb-12 last:mb-0">
                <h2 className="font-display text-[clamp(1.4rem,3vw,1.9rem)] leading-[1.12] font-extrabold tracking-[-0.026em]">
                  {s.h}
                </h2>
                {s.p.map((para) => (
                  <p key={para.slice(0, 40)} className="mt-4 text-[1.05rem] leading-[1.7] text-ink-2">
                    {para}
                  </p>
                ))}
              </section>
            ))}

            <aside className="mt-14 border-t-2 border-ink pt-8">
              <h2 className="font-mono text-[0.66rem] tracking-[0.2em] text-flame uppercase">If you read nothing else</h2>
              <ul className="mt-5 space-y-3.5">
                {guide.takeaways.map((t) => (
                  <li key={t} className="flex gap-3.5 text-[1rem] leading-relaxed">
                    <span aria-hidden className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-flame" />
                    <span className="min-w-0">{t}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>

        {related.length > 0 && (
          <section aria-labelledby="related" className="border-t border-rule py-14 sm:py-16">
            <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
              <h2 id="related" className="font-mono text-[0.66rem] tracking-[0.2em] text-ink-3 uppercase">
                Where this applies
              </h2>
              <nav aria-label="Related industries" className="mt-5">
                <ul className="flex flex-wrap gap-2.5">
                  {related.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`${site.basePath}/${s.slug}`}
                        className="inline-flex min-h-[44px] items-center rounded-full border border-rule px-5 text-[0.92rem] transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                      >
                        {solutionFor(s).name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </section>
        )}

        <section aria-labelledby="more" className="border-t border-rule py-14 sm:py-16">
          <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
            <h2 id="more" className="font-mono text-[0.66rem] tracking-[0.2em] text-ink-3 uppercase">
              Other guides
            </h2>
            <ul className="mt-6 border-t border-rule">
              {others.map((g) => (
                <li key={g.slug} className="border-b border-rule">
                  <Link
                    href={`${site.basePath}/guides/${g.slug}`}
                    className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-5 transition-colors hover:text-flame"
                  >
                    <span className="font-display text-[1.15rem] leading-snug font-bold tracking-[-0.02em]">
                      {g.h1}
                    </span>
                    <span className="font-mono text-[0.6rem] tracking-[0.14em] text-ink-3 uppercase">
                      {g.minutes} min
                      <span aria-hidden className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </article>
    </>
  );
}
