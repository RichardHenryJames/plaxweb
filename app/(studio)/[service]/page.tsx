import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getService, serviceSlugs, services, solutionFor } from '@/lib/services';
import { getDemo } from '@/lib/demos';
import { faqSchema, pageMetadata, serviceBreadcrumb, serviceSchema } from '@/lib/metadata';
import { jsonLd } from '@/lib/metadata';
import { origin, site } from '@/lib/site';
import { TrackView } from '@/components/ui/TrackView';

/**
 * One page per commercial search intent.
 *
 * Everything on this page is content a buyer asked for. The requirements
 * section is the reason the page deserves to rank at all: it answers "what
 * should a website for my industry actually do", which is the question behind
 * the search, and it is a question most agency pages answer with adjectives.
 *
 * Pricing deliberately does not appear. A number shown before the visitor has
 * understood the work is an objection rather than information, so the page
 * explains how quoting works and lets the price arrive in a proposal.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return serviceSlugs.map((service) => ({ service }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service: slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  const demo = getDemo(service.demo);
  return pageMetadata({
    title: service.title,
    description: service.description,
    path: `${site.basePath}/${service.slug}`,
    // The card shows the working site we are talking about, not a logo.
    image: demo?.preview ? `${origin()}${demo.preview.desktop.src}` : demo?.cover.src,
  });
}

export default async function ServicePage({ params }: { params: Promise<{ service: string }> }) {
  const { service: slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const solution = solutionFor(service);
  const demo = getDemo(service.demo);
  const related = service.related
    .map((s) => services.find((x) => x.slug === s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <>
      <script {...jsonLd(serviceSchema(service))} />
      <script {...jsonLd(serviceBreadcrumb(service))} />
      <script {...jsonLd(faqSchema(service.faqs))} />
      <TrackView event="service_view" props={{ service: service.slug }} />

      <article>
        {/* ------------------------------------------------------------ head */}
        <header className="border-b border-rule py-14 sm:py-20">
          <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[0.66rem] tracking-[0.14em] text-ink-3 uppercase">
                <li>
                  <Link href={site.home} className="hover:text-flame">
                    Website development
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li aria-current="page">{solution.group}</li>
              </ol>
            </nav>

            <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.2rem,6vw,4rem)] leading-[1.02] font-extrabold tracking-[-0.035em]">
              {service.h1}
            </h1>
            <p className="mt-6 max-w-3xl text-[1.05rem] leading-relaxed text-ink-2 sm:text-[1.12rem]">
              {service.lede}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
              <Link
                href={`${site.basePath}/contact?demo=${service.demo}`}
                className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-flame px-7 text-[0.95rem] font-medium text-white transition-colors hover:bg-ink"
              >
                Get a fixed-price proposal
              </Link>
              {demo && (
                <Link
                  href={`${site.basePath}/${demo.slug}`}
                  className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-ink px-7 text-[0.95rem] font-medium transition-colors hover:bg-ink hover:text-paper"
                >
                  Open the working demo
                </Link>
              )}
            </div>
          </div>
        </header>

        {/* ------------------------------------------------------------ proof */}
        {demo?.preview && (
          <section aria-labelledby="proof" className="border-b border-rule py-14 sm:py-20">
            <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
              <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14">
                <figure className="min-w-0">
                  <div className="overflow-hidden rounded-lg border border-rule bg-white">
                    <Image
                      src={demo.preview.desktop.src}
                      width={demo.preview.desktop.width}
                      height={demo.preview.desktop.height}
                      alt={`Home page of the ${demo.brand} demo, a ${demo.industry.toLowerCase()} website built by PlaxWeb`}
                      sizes="(min-width: 1024px) 55vw, 100vw"
                      // Full-page captures are tall enough to leave the column
                      // beside them empty, so only the first screen is shown.
                      className="max-h-[34rem] w-full object-cover object-top"
                    />
                  </div>
                  <figcaption className="mt-3 text-[0.82rem] text-ink-3">
                    {demo.brand} — a fictional {demo.industry.toLowerCase()} business, built as a complete working
                    website rather than a mockup.
                  </figcaption>
                </figure>

                <div className="min-w-0">
                  <p className="font-mono text-[0.66rem] tracking-[0.2em] text-flame uppercase">See it working</p>
                  <h2 id="proof" className="mt-4 font-display text-[clamp(1.7rem,3.6vw,2.5rem)] leading-[1.06] font-extrabold tracking-[-0.03em]">
                    Judge the work before you talk to us.
                  </h2>
                  <p className="mt-4 text-[1rem] leading-relaxed text-ink-2">
                    {demo.proves}
                  </p>
                  <p className="mt-4 text-[1rem] leading-relaxed text-ink-2">
                    It is a real site, not screenshots. Open it on your phone, use the navigation, start a booking and
                    stop where you like. Nothing is faked and nothing is behind a form.
                  </p>
                  <Link
                    href={`${site.basePath}/${demo.slug}`}
                    className="mt-5 inline-flex min-h-[44px] items-center border-b border-ink pb-0.5 text-[0.95rem] font-medium transition-colors hover:border-flame hover:text-flame"
                  >
                    Open the {demo.industry.toLowerCase()} demo <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ----------------------------------------------------- requirements */}
        <section aria-labelledby="requirements" className="border-b border-rule py-14 sm:py-20">
          <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <p className="font-mono text-[0.66rem] tracking-[0.2em] text-flame uppercase">What it has to do</p>
                <h2
                  id="requirements"
                  className="mt-4 font-display text-[clamp(1.9rem,4.4vw,3rem)] leading-[1.04] font-extrabold tracking-[-0.032em]"
                >
                  What this kind of website has to get right.
                </h2>
                <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-ink-2">
                  These are the things that decide whether the site pays for itself. We would apply them whether or not
                  you hire us, so they are written to be useful on their own.
                </p>
              </div>

              <div className="min-w-0">
                <ol className="space-y-8">
                  {service.requirements.map(([title, body], i) => (
                    <li key={title} className="grid grid-cols-[2rem_1fr] gap-4 sm:grid-cols-[2.5rem_1fr]">
                      <span
                        aria-hidden
                        className="font-mono text-[0.75rem] leading-7 tracking-[0.1em] text-ink-3 tabular-nums"
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-[1.05rem] leading-snug font-medium">{title}</h3>
                        <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-2">{body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- included */}
        <section aria-labelledby="included" className="border-b border-rule py-14 sm:py-20">
          <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <p className="font-mono text-[0.66rem] tracking-[0.2em] text-flame uppercase">In the build</p>
                <h2
                  id="included"
                  className="mt-4 font-display text-[clamp(1.9rem,4.4vw,3rem)] leading-[1.04] font-extrabold tracking-[-0.032em]"
                >
                  What a {solution.name.toLowerCase()} includes.
                </h2>
                <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-ink-2">
                  Built for {solution.bestFor.toLowerCase()}. Typically live in {solution.timeline}.
                </p>
              </div>

              <div className="min-w-0">
                <h3 className="font-mono text-[0.62rem] tracking-[0.16em] text-ink-3 uppercase">Included as standard</h3>
                <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {solution.core.map((item) => (
                    <li key={item} className="flex gap-3 text-[0.95rem] leading-relaxed">
                      <span aria-hidden className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-flame" />
                      <span className="min-w-0">{item}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="mt-10 font-mono text-[0.62rem] tracking-[0.16em] text-ink-3 uppercase">
                  Added when it earns its place
                </h3>
                <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {solution.optional.map((item) => (
                    <li key={item} className="flex gap-3 text-[0.95rem] leading-relaxed text-ink-2">
                      <span aria-hidden className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-rule" />
                      <span className="min-w-0">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 rounded-lg border border-rule bg-white/50 p-5">
                  <h3 className="text-[1rem] font-medium">How the price is decided</h3>
                  <p className="mt-2 text-[0.93rem] leading-relaxed text-ink-2">
                    Every project is quoted individually against a written scope, because a five-page site and a
                    fifty-page site are not the same job. You get one fixed price and a delivery date before any payment
                    — no hourly billing, and no line items appearing at the end. If something you have asked for is not
                    worth building yet, we will say so and take it out of the number.
                  </p>
                  <Link
                    href={`${site.basePath}/contact?demo=${service.demo}`}
                    className="mt-4 inline-flex min-h-[44px] items-center border-b border-ink pb-0.5 text-[0.93rem] font-medium transition-colors hover:border-flame hover:text-flame"
                  >
                    Ask for a proposal <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- faq */}
        <section aria-labelledby="faq" className="border-b border-rule py-14 sm:py-20">
          <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <p className="font-mono text-[0.66rem] tracking-[0.2em] text-flame uppercase">Before you ask</p>
                <h2
                  id="faq"
                  className="mt-4 font-display text-[clamp(1.9rem,4.4vw,3rem)] leading-[1.04] font-extrabold tracking-[-0.032em]"
                >
                  Questions we get from {solution.group.toLowerCase()} clients.
                </h2>
              </div>

              <dl className="min-w-0 divide-y divide-rule border-y border-rule">
                {service.faqs.map((f) => (
                  <div key={f.q} className="py-5">
                    <dt className="text-[1rem] leading-snug font-medium">{f.q}</dt>
                    <dd className="mt-2 text-[0.95rem] leading-relaxed text-ink-2">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- related */}
        <section aria-labelledby="related" className="border-b border-rule py-14 sm:py-20">
          <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
            <h2
              id="related"
              className="font-display text-[clamp(1.6rem,3.4vw,2.3rem)] leading-[1.06] font-extrabold tracking-[-0.03em]"
            >
              Related work.
            </h2>
            <nav aria-label="Related services" className="mt-7">
              <ul className="grid gap-px overflow-hidden rounded-lg border border-rule bg-rule sm:grid-cols-3">
                {related.map((r) => (
                  <li key={r.slug} className="bg-paper">
                    <Link href={`${site.basePath}/${r.slug}`} className="block h-full p-5 transition-colors hover:bg-white">
                      <span className="font-mono text-[0.6rem] tracking-[0.14em] text-ink-3 uppercase">
                        {solutionFor(r).group}
                      </span>
                      <span className="mt-2 block text-[1.02rem] font-medium">{r.h1}</span>
                      <span className="mt-1.5 block text-[0.88rem] leading-relaxed text-ink-3">{r.intent}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>

        {/* ------------------------------------------------------------- cta */}
        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
            <div className="max-w-2xl">
              <h2 className="font-display text-[clamp(1.8rem,4vw,2.7rem)] leading-[1.05] font-extrabold tracking-[-0.03em]">
                Tell us what your business needs.
              </h2>
              <p className="mt-4 text-[1rem] leading-relaxed text-ink-2">
                Send us what you have — an existing site, an Instagram page, or nothing at all. We reply with a fixed
                price, a delivery date and what we would change, usually within a working day.
              </p>
              <Link
                href={`${site.basePath}/contact?demo=${service.demo}`}
                className="mt-7 inline-flex min-h-[52px] items-center justify-center rounded-full bg-ink px-7 text-[0.95rem] font-medium text-paper transition-colors hover:bg-flame"
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
