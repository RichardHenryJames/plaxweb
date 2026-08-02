import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getGoal, goals, goalSlugs, servicesFor } from '@/lib/goals';
import { solutionFor } from '@/lib/services';
import { getDemo } from '@/lib/demos';
import { faqSchema, jsonLd, pageMetadata } from '@/lib/metadata';
import { origin, site } from '@/lib/site';
import { TrackView } from '@/components/ui/TrackView';

/**
 * A page for someone who knows what is going wrong but not what to buy.
 *
 * Deliberately laid out unlike the industry pages: this one leads with the
 * problem in the visitor's own words and holds the solution back until the
 * diagnosis has landed. Someone arriving here has not decided they want a
 * website, so opening with what we build would answer a question they have
 * not asked yet.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return goalSlugs.map((goal) => ({ goal }));
}

export async function generateMetadata({ params }: { params: Promise<{ goal: string }> }): Promise<Metadata> {
  const { goal: slug } = await params;
  const goal = getGoal(slug);
  if (!goal) return {};
  const first = servicesFor(goal)[0];
  const demo = first ? getDemo(first.demo) : undefined;
  return pageMetadata({
    title: goal.title,
    description: goal.description,
    path: `${site.basePath}/goals/${goal.slug}`,
    image: demo?.preview ? `${origin()}${demo.preview.desktop.src}` : demo?.cover.src,
  });
}

export default async function GoalPage({ params }: { params: Promise<{ goal: string }> }) {
  const { goal: slug } = await params;
  const goal = getGoal(slug);
  if (!goal) notFound();

  const related = servicesFor(goal);
  const others = goals.filter((g) => g.slug !== goal.slug);

  return (
    <>
      <script {...jsonLd(faqSchema(goal.faqs))} />
      <TrackView event="goal_view" props={{ goal: goal.slug }} />

      <article>
        {/* ------------------------------------------------------- the problem */}
        <header className="border-b border-rule bg-ink py-16 text-paper sm:py-24">
          <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[0.66rem] tracking-[0.14em] text-paper/45 uppercase">
                <li>
                  <Link href={site.home} className="hover:text-flame-lit">
                    Website development
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li aria-current="page">By goal</li>
              </ol>
            </nav>

            {/* The owner's own sentence, set as a quotation. It is the whole
                premise of the page: we heard the problem before we pitched. */}
            <p className="mt-8 font-mono text-[0.7rem] tracking-[0.2em] text-flame-lit uppercase">You said</p>
            <p className="mt-4 max-w-4xl font-display text-[clamp(1.9rem,5.2vw,3.4rem)] leading-[1.08] font-extrabold tracking-[-0.035em]">
              &ldquo;{goal.said}.&rdquo;
            </p>

            <div className="mt-12 grid gap-8 border-t border-paper/15 pt-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <h1 className="font-display text-[1.35rem] leading-snug font-bold tracking-[-0.02em] sm:text-[1.5rem]">
                  {goal.h1}
                </h1>
              </div>
              <div className="space-y-5 text-[1rem] leading-relaxed text-paper/70">
                <p>{goal.problem}</p>
                <p className="text-paper">{goal.shift}</p>
              </div>
            </div>
          </div>
        </header>

        {/* --------------------------------------------------- what we do about it */}
        <section aria-labelledby="how" className="border-b border-rule py-16 sm:py-24">
          <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <h2
                id="how"
                className="max-w-2xl font-display text-[clamp(1.8rem,4vw,2.7rem)] leading-[1.05] font-extrabold tracking-[-0.032em]"
              >
                What we build to move it.
              </h2>
              <p className="font-mono text-[0.66rem] tracking-[0.16em] text-ink-3 uppercase">
                Measured on: {goal.metric}
              </p>
            </div>

            <ol className="mt-12 space-y-0 border-t border-ink">
              {goal.mechanisms.map(([title, body], i) => (
                <li
                  key={title}
                  className="grid gap-x-8 gap-y-3 border-b border-rule py-8 md:grid-cols-[4rem_1fr_1.3fr] md:py-10"
                >
                  <span aria-hidden className="font-mono text-[0.72rem] tracking-[0.1em] text-flame tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-[1.25rem] leading-tight font-bold tracking-[-0.02em] sm:text-[1.4rem]">
                    {title}
                  </h3>
                  <p className="text-[0.98rem] leading-relaxed text-ink-2">{body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ------------------------------------------------- industries + proof */}
        <section aria-labelledby="who" className="border-b border-rule bg-paper-2 py-16 sm:py-24">
          <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
            <h2
              id="who"
              className="max-w-2xl font-display text-[clamp(1.8rem,4vw,2.7rem)] leading-[1.05] font-extrabold tracking-[-0.032em]"
            >
              Where this comes up most.
            </h2>
            <p className="mt-4 max-w-2xl text-[1rem] leading-relaxed text-ink-2">
              Each of these has a working website you can open and use. Start with whichever is closest to what you do.
            </p>

            <ul className="mt-10 border-t border-ink">
              {related.map((s) => {
                const demo = getDemo(s.demo);
                return (
                  <li key={s.slug} className="border-b border-rule">
                    <Link
                      href={`${site.basePath}/${s.slug}`}
                      className="group flex flex-wrap items-baseline gap-x-6 gap-y-2 py-6 transition-colors hover:text-flame"
                    >
                      <span className="font-mono text-[0.62rem] tracking-[0.16em] text-ink-3 uppercase">
                        {solutionFor(s).group}
                      </span>
                      <span className="font-display text-[1.3rem] leading-tight font-bold tracking-[-0.02em] sm:text-[1.6rem]">
                        {s.h1}
                      </span>
                      <span className="ml-auto shrink-0 text-[0.85rem] text-ink-3">
                        {demo?.brand}
                        <span aria-hidden className="ml-3 inline-block transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* -------------------------------------------------------------- faq */}
        <section aria-labelledby="faq" className="border-b border-rule py-16 sm:py-24">
          <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <h2
                id="faq"
                className="font-display text-[clamp(1.8rem,4vw,2.7rem)] leading-[1.05] font-extrabold tracking-[-0.032em] lg:sticky lg:top-28 lg:self-start"
              >
                What owners ask us.
              </h2>
              <dl className="min-w-0 divide-y divide-rule border-y border-rule">
                {goal.faqs.map((f) => (
                  <div key={f.q} className="py-6">
                    <dt className="text-[1.05rem] leading-snug font-medium">{f.q}</dt>
                    <dd className="mt-2.5 text-[0.98rem] leading-relaxed text-ink-2">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------ other goals */}
        <section aria-labelledby="other" className="border-b border-rule py-16 sm:py-20">
          <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
            <h2 id="other" className="font-mono text-[0.66rem] tracking-[0.2em] text-ink-3 uppercase">
              Other things owners tell us
            </h2>
            <nav aria-label="Other business goals" className="mt-6">
              <ul className="flex flex-wrap gap-2.5">
                {others.map((g) => (
                  <li key={g.slug}>
                    <Link
                      href={`${site.basePath}/goals/${g.slug}`}
                      className="inline-flex min-h-[44px] items-center rounded-full border border-rule px-5 text-[0.9rem] transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                    >
                      &ldquo;{g.said}&rdquo;
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>

        {/* ------------------------------------------------------------- cta */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
            <div className="max-w-2xl">
              <h2 className="font-display text-[clamp(1.9rem,4.4vw,3rem)] leading-[1.04] font-extrabold tracking-[-0.032em]">
                Tell us what is actually going wrong.
              </h2>
              <p className="mt-5 text-[1.02rem] leading-relaxed text-ink-2">
                Not a brief. Just the problem. We reply within a working day with a fixed price, a delivery date, and an
                honest note on whether a new website is the thing that fixes it.
              </p>
              <Link
                href={`${site.basePath}/contact`}
                className="mt-8 inline-flex min-h-[52px] items-center justify-center rounded-full bg-flame px-8 text-[0.95rem] font-medium text-white transition-colors hover:bg-ink"
              >
                Get a fixed-price proposal
              </Link>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
