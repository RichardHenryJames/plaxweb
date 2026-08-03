import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { headers } from 'next/headers';
import { LeadForm } from '@/components/studio/LeadForm';
import { WhatsAppSkip } from '@/components/studio/WhatsAppSkip';
import { Blob } from '@/components/ui/Blob';
import { TrackView } from '@/components/ui/TrackView';
import { pageMetadata } from '@/lib/metadata';
import { demoSlugs, featured, getDemo } from '@/lib/demos';
import { origin, site } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Get a quote — PlaxWeb',
  description:
    'Tell us which solution is closest to your business and we will reply with a fixed price, a delivery date and what we would change for you.',
  path: `${site.basePath}/contact`,
  // This is the link a salesperson actually sends. Without an image WhatsApp
  // and LinkedIn render a bare grey box, so it borrows the lead demo's
  // screenshot — real work rather than a logo.
  image: featured[0].preview ? `${origin()}${featured[0].preview.desktop.src}` : undefined,
});

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ demo?: string; view?: string; tier?: string }>;
}) {
  const params = await searchParams;
  const slug = params.demo && demoSlugs.includes(params.demo) ? params.demo : '';
  const demo = slug ? getDemo(slug) : undefined;
  const view = params.view === 'mobile' ? 'mobile' : params.view === 'desktop' ? 'desktop' : '';
  const shot = demo?.preview ? (view === 'mobile' ? demo.preview.mobile : demo.preview.desktop) : undefined;

  // This page is already dynamic, so the country comes straight off the request
  // and the phone field is right on first paint — no fetch, no flicker. Only
  // the country code is read; the IP itself is neither used nor stored.
  const detectedCountry = (await headers()).get('x-vercel-ip-country') ?? undefined;

  return (
    <>
      <TrackView event="contact_start" props={{ from: 'contact_page', demo: slug || 'none', view: view || 'none' }} />

      <div className="relative isolate overflow-hidden bg-flame text-white">
        {/* Same treatment as the closing block on the home page: a flat panel
            this size looks like a printing error, and these give it depth
            without an image to download. Deliberately near-invisible. */}
        <Blob
          shape="spill"
          className="pointer-events-none absolute -top-32 -left-32 h-[34rem] w-[34rem] text-white/[0.07]"
        />
        <Blob
          shape="drift"
          className="pointer-events-none absolute -right-48 -bottom-48 hidden h-[40rem] w-[50rem] text-black/[0.06] lg:block"
        />

        <div className="relative mx-auto max-w-[84rem] px-5 pt-10 pb-16 sm:px-8 sm:pt-14 sm:pb-20">
          <nav aria-label="Breadcrumb" className="font-mono text-[0.68rem] tracking-[0.14em] text-white/60 uppercase">
            <Link href={site.basePath} className="inline-flex min-h-[28px] items-center hover:text-white">
              PlaxWeb
            </Link>
            <span className="mx-2 text-white/35">/</span>
            <span className="text-white">Get a quote</span>
          </nav>

          <div className="mt-6 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <div>
              {demo ? (
                <>
                  <p className="font-mono text-[0.66rem] tracking-[0.2em] text-white/70 uppercase">
                    {demo.solution.group}
                  </p>
                  <h1 className="mt-4 font-display text-[clamp(2rem,4.8vw,3.1rem)] leading-[1.04] font-extrabold tracking-[-0.034em]">
                    A {demo.solution.name} for your business.
                  </h1>
                  <p className="mt-5 max-w-md text-[1.02rem] leading-relaxed text-white/85">{demo.solution.outcome}</p>

                  {/* Show them what they were just looking at, so nothing has
                      to be re-explained. */}
                  {shot && (
                    <div className="mt-7 flex items-center gap-4 rounded-[10px] border border-white/25 bg-white/10 p-3">
                      <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-[5px] bg-paper-2 sm:h-24 sm:w-36">
                        <Image
                          src={shot.src}
                          alt={`${demo.brand} on ${view === 'mobile' ? 'a phone' : 'desktop'}`}
                          fill
                          sizes="150px"
                          placeholder="blur"
                          blurDataURL={shot.blurDataURL}
                          className="object-cover object-top"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[0.85rem] font-medium">
                          You were looking at {demo.brand}
                          {view && <span className="text-white/65"> · {view} view</span>}
                        </p>
                        <p className="mt-1 text-[0.82rem] text-white/70">
                          Typically live in {demo.solution.timeline}
                        </p>
                        <Link
                          href={`${site.basePath}/${demo.slug}`}
                          className="mt-1.5 inline-flex min-h-[28px] items-center border-b border-white pb-0.5 text-[0.82rem] font-medium transition-colors hover:border-white/50 hover:text-white/80"
                        >
                          Re-open the demo <span aria-hidden>→</span>
                        </Link>
                      </div>
                    </div>
                  )}

                  <div className="mt-7">
                    <p className="font-mono text-[0.6rem] tracking-[0.16em] text-white/65 uppercase">Included as standard</p>
                    <ul className="mt-3 grid gap-x-6 gap-y-1.5 text-[0.86rem] text-white/85 sm:grid-cols-2">
                      {demo.solution.core.map((f) => (
                        <li key={f} className="flex items-baseline gap-2.5">
                          <span aria-hidden className="h-px w-2.5 shrink-0 -translate-y-[0.2em] bg-white/40" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-[0.84rem] leading-relaxed text-white/85">
                      Often added later:{' '}
                      {demo.solution.optional.slice(0, 3).join(', ').toLowerCase()}. We will tell you which of these you
                      actually need — and which you do not.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <h1 className="font-display text-[clamp(2.1rem,5.2vw,3.4rem)] leading-[1.02] font-extrabold tracking-[-0.036em]">
                    Let’s price your website.
                  </h1>
                  <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-white/85">
                    Fill this in and you will get a reply within one working day: a fixed price, a delivery date, and an
                    honest note on what your business actually needs.
                  </p>
                </>
              )}

              <dl className="mt-9 space-y-5 border-t border-white/25 pt-7">
                <div>
                  <dt className="font-mono text-[0.62rem] tracking-[0.16em] text-white/65 uppercase">
                    Rather skip the form
                  </dt>
                  <dd className="mt-2 flex flex-wrap gap-3">
                    <WhatsAppSkip
                      solution={demo?.solution.name}
                      brand={demo?.brand}
                      className="inline-flex min-h-[44px] items-center rounded-full bg-white px-5 text-[0.85rem] font-medium text-flame transition-colors hover:bg-ink hover:text-white"
                    >
                      WhatsApp us
                    </WhatsAppSkip>
                    <a
                      href={`tel:+${site.phoneRaw}`}
                      className="inline-flex min-h-[44px] items-center rounded-full border border-white/50 px-5 text-[0.85rem] font-medium transition-colors hover:border-white hover:bg-white/10"
                    >
                      {site.phoneDisplay}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.62rem] tracking-[0.16em] text-white/65 uppercase">What happens next</dt>
                  <dd className="mt-2 space-y-2 text-[0.92rem] leading-relaxed text-white/85">
                    <p>1. We read it and reply — usually on WhatsApp, within a working day.</p>
                    <p>2. A 30-minute call to agree the pages and the price.</p>
                    <p>3. A written scope and a delivery date before any payment.</p>
                  </dd>
                </div>
                {/* Not offered as a way to reach us. Enquiries belong in the
                    form or on WhatsApp, where they get answered; this is here
                    for the person who wants to see more before deciding. */}
                <div>
                  <dt className="font-mono text-[0.62rem] tracking-[0.16em] text-white/65 uppercase">Want to see more first</dt>
                  <dd className="mt-2 text-[0.92rem] leading-relaxed text-white/85">
                    Recent work goes up on{' '}
                    <a
                      href={site.social.instagram.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-4 hover:no-underline"
                    >
                      {site.social.instagram.name} ({site.social.instagram.handle})
                    </a>
                    .
                  </dd>
                </div>
              </dl>
            </div>

            <LeadForm defaultDemo={slug} view={view} detectedCountry={detectedCountry} />
          </div>
        </div>
      </div>
    </>
  );
}
