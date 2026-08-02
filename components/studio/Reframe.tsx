import Image from 'next/image';
import Link from 'next/link';
import { getDemo } from '@/lib/demos';
import { site } from '@/lib/site';

/**
 * The reframe.
 *
 * One website, watched as it becomes the phone version of itself. It is the
 * only cinematic moment on the site and it exists because it is an argument
 * rather than an effect: PlaxWeb's claim is that the phone version is designed
 * a second time rather than squeezed, and this is that claim demonstrated in
 * the medium it is about.
 *
 * Both frames are real captures of the same live demo — the desktop and mobile
 * screenshots the gallery already uses — so nothing here is a mockup of work
 * that does not exist.
 *
 * All the motion lives in globals.css on a named view timeline. There is no
 * JavaScript in this component at all, which is the point: a scroll listener
 * driving transforms from the main thread is exactly how these effects end up
 * stuttering on the mid-range phones most of our visitors are holding.
 *
 * Without scroll-timeline support, or with reduced motion, the two frames
 * simply sit side by side and the section still makes its case.
 */
export function Reframe({ slug = 'restaurant' }: { slug?: string }) {
  const demo = getDemo(slug);
  if (!demo?.preview) return null;

  const { desktop, mobile } = demo.preview;

  return (
    // 260vh of scroll gives the pinned stage room to play out. The stage
    // itself is one viewport tall and sticks to the top while the track moves
    // past underneath it.
    <section
      aria-labelledby="reframe-heading"
      className="reframe-track relative border-b border-rule bg-paper-2 sm:h-[260vh]"
    >
      <div className="sticky top-0 flex min-h-[100svh] flex-col justify-center overflow-hidden pt-24 pb-16 sm:py-20">
        <div className="mx-auto w-full max-w-[84rem] px-5 sm:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            {/* ------------------------------------------------------ words */}
            <div className="min-w-0">
              <p className="font-mono text-[0.66rem] tracking-[0.2em] text-flame uppercase">Designed twice</p>
              <h2
                id="reframe-heading"
                className="mt-4 font-display text-[clamp(1.9rem,4.6vw,3.1rem)] leading-[1.03] font-extrabold tracking-[-0.034em]"
              >
                The same website, designed again for the phone.
              </h2>

              {/* Two captions occupying one grid cell, so the swap does not
                  shift anything underneath it. */}
              <div className="reframe-captions mt-6 grid gap-6 sm:min-h-[7.5rem]">
                <div className="reframe-caption-a">
                  <p className="text-[1rem] leading-relaxed text-ink-2">
                    On a laptop there is room to let a page breathe — wide imagery, several columns, a menu that sits
                    open across the top.
                  </p>
                  <p className="mt-3 font-mono text-[0.66rem] tracking-[0.16em] text-ink-3 uppercase">
                    {desktop.width} × {desktop.height} capture
                  </p>
                </div>
                <div className="reframe-caption-b">
                  <p className="text-[1rem] leading-relaxed text-ink-2">
                    On a phone none of that survives. The order changes, the actions move within thumb reach, and the
                    photographs are re-cropped for a portrait screen rather than letterboxed into it.
                  </p>
                  <p className="mt-3 font-mono text-[0.66rem] tracking-[0.16em] text-ink-3 uppercase">
                    {mobile.width} × {mobile.height} capture
                  </p>
                </div>
              </div>

              <Link
                href={`${site.basePath}/${demo.slug}`}
                className="mt-7 inline-flex min-h-[48px] items-center border-b border-ink pb-1 text-[0.95rem] font-medium transition-colors hover:border-flame hover:text-flame"
              >
                Open {demo.brand} and resize it yourself <span aria-hidden className="ml-2">→</span>
              </Link>
            </div>

            {/* ----------------------------------------------------- frames */}
            <div className="reframe-stage grid min-w-0 grid-cols-1 items-center gap-10 sm:grid-cols-2 sm:gap-10">
              {/* Desktop. A real browser is a landscape window, so the frame is
                  held at 16:10 rather than being given a height — a clamped
                  height made it letterbox-shaped at some viewports and nothing
                  like the thing it is meant to depict. */}
              <figure className="reframe-desktop m-0 min-w-0">
                <div className="mx-auto w-full max-w-[34rem] overflow-hidden rounded-[10px] border border-rule bg-white shadow-[0_24px_60px_-30px_rgba(20,18,15,0.45)]">
                  <div className="flex items-center gap-1.5 border-b border-rule px-3 py-2">
                    <span aria-hidden className="h-2 w-2 rounded-full bg-rule" />
                    <span aria-hidden className="h-2 w-2 rounded-full bg-rule" />
                    <span aria-hidden className="h-2 w-2 rounded-full bg-rule" />
                    <span className="ml-2 truncate font-mono text-[0.58rem] text-ink-3">
                      {demo.brand.toLowerCase().replace(/\s+/g, '')}.com
                    </span>
                  </div>
                  <Image
                    src={desktop.src}
                    width={desktop.width}
                    height={desktop.height}
                    alt={`${demo.brand} on a laptop: the desktop layout of a ${demo.industry.toLowerCase()} website built by PlaxWeb`}
                    sizes="(min-width: 1024px) 45vw, 90vw"
                    className="aspect-[16/10] w-full object-cover object-top"
                  />
                </div>
                <figcaption className="sr-only">Desktop layout</figcaption>
              </figure>

              {/* Phone. Sized by height with a 9:19.5 aspect, which is the
                  shape of an actual handset — the previous version derived its
                  height from the viewport and came out almost square, so it
                  read as a rounded box rather than a phone. */}
              <figure className="reframe-phone m-0 flex justify-center">
                <div className="relative aspect-[9/19.5] h-[min(30rem,62vh)] overflow-hidden rounded-[2.2rem] border-[4px] border-ink bg-ink shadow-[0_30px_70px_-28px_rgba(20,18,15,0.6)]">
                  <span
                    aria-hidden
                    className="absolute top-2.5 left-1/2 z-10 h-1.5 w-12 -translate-x-1/2 rounded-full bg-paper/30"
                  />
                  <Image
                    src={mobile.src}
                    width={mobile.width}
                    height={mobile.height}
                    alt={`${demo.brand} on a phone: the same website re-laid out for a portrait screen`}
                    sizes="240px"
                    className="h-full w-full rounded-[1.9rem] object-cover object-top"
                  />
                </div>
                <figcaption className="sr-only">Phone layout of the same page</figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
