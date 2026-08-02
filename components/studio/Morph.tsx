import Image from 'next/image';
import Link from 'next/link';
import { getDemo } from '@/lib/demos';
import { site } from '@/lib/site';

/**
 * The morph: one browser, six businesses.
 *
 * The second and last cinematic moment on the site. The Reframe argues that
 * the phone version is designed rather than squeezed; this one argues the
 * thing underneath every price objection — that these are not one template
 * with the colours changed.
 *
 * That claim cannot be made in words. "We don't use templates" is what every
 * agency says, including the ones that do. It can only be demonstrated, by
 * holding the frame perfectly still and letting six genuinely unalike websites
 * pass through it: different typefaces, different palettes, different
 * structures, different things being sold. The stillness of the frame is what
 * makes the differences impossible to miss.
 *
 * Every image is a real capture of a real demo that a visitor can open. If any
 * of these were a mockup the whole argument would be worthless.
 *
 * As with the Reframe: no JavaScript, a named view timeline, and only opacity
 * and transform animated so it stays on the compositor.
 */

// Chosen for maximum distance from each other rather than for quality. A
// clinic and a school are both institutional and would waste a beat; a
// restaurant, a resort and a gym share nothing at all.
const SEQUENCE = ['restaurant', 'resort', 'school', 'interior', 'fitness', 'travel'] as const;

export function Morph() {
  const demos = SEQUENCE.map((slug) => getDemo(slug)).filter((d): d is NonNullable<typeof d> => Boolean(d?.preview));
  if (demos.length < 3) return null;

  return (
    <section
      aria-labelledby="morph-heading"
      className="morph-track relative border-b border-rule bg-ink text-paper sm:h-[420vh]"
    >
      {/* Extra top padding on phones only. There the stage is taller than the
          viewport, so centring cannot keep the first line clear of the sticky
          site header and the eyebrow was sliding underneath it. */}
      <div className="sticky top-0 flex min-h-[100svh] flex-col justify-center overflow-hidden pt-24 pb-14 sm:py-16">
        <div className="mx-auto w-full max-w-[84rem] px-5 sm:px-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-16">
            {/* -------------------------------------------------- the claim */}
            <div className="min-w-0 shrink-0 lg:w-[22rem]">
              <p className="font-mono text-[0.66rem] tracking-[0.2em] text-flame-lit uppercase">
                Same studio, same frame
              </p>
              <h2
                id="morph-heading"
                className="mt-4 font-display text-[clamp(1.9rem,4.4vw,2.9rem)] leading-[1.03] font-extrabold tracking-[-0.034em]"
              >
                Nothing here shares a template.
              </h2>
              <p className="mt-5 text-[0.98rem] leading-relaxed text-paper/65">
                The window does not move. Everything inside it does — the typeface, the palette, the structure, and what
                the business is actually trying to sell you.
              </p>

              {/* One slot, six labels. The frame holds still, so this is the
                  only thing that tells you the business changed.

                  Desktop only: they exist to stay in sync with a pinned frame,
                  and without the pin they are six paragraphs saying almost the
                  same thing. */}
              <div className="morph-labels mt-8 hidden min-h-[5rem] border-t border-paper/20 pt-6 sm:grid">
                {demos.map((d, i) => (
                  <div key={d.slug} className="morph-label" data-i={i}>
                    <p className="font-display text-[1.5rem] leading-tight font-bold tracking-[-0.02em]">{d.brand}</p>
                    <p className="mt-1 font-mono text-[0.62rem] tracking-[0.16em] text-flame-lit uppercase">
                      {d.industry}
                    </p>
                    <p className="mt-2 text-[0.88rem] leading-relaxed text-paper/60">{d.solution.metric}</p>
                  </div>
                ))}
              </div>

              {/* Where you are in the sequence. Six ticks, and the active one
                  is the only thing on screen that is flame. */}
              <ol aria-hidden className="mt-7 hidden gap-1.5 sm:flex">
                {demos.map((d, i) => (
                  <li key={d.slug} className="morph-tick h-[3px] w-9 rounded-full bg-paper/20" data-i={i} />
                ))}
              </ol>
            </div>

            {/* ------------------------------------------------- the window */}
            <div className="min-w-0 flex-1">
              <div className="overflow-hidden rounded-[12px] border border-paper/15 bg-[#0d0c0b] shadow-[0_40px_90px_-40px_rgba(0,0,0,0.8)]">
                <div className="flex items-center gap-1.5 border-b border-paper/12 px-3.5 py-2.5">
                  <span aria-hidden className="h-2 w-2 rounded-full bg-paper/20" />
                  <span aria-hidden className="h-2 w-2 rounded-full bg-paper/20" />
                  <span aria-hidden className="h-2 w-2 rounded-full bg-paper/20" />
                  <span className="ml-2 truncate font-mono text-[0.58rem] text-paper/35">
                    {site.domain}
                    {site.basePath}/
                  </span>
                </div>

                {/* Two different things by breakpoint, not one thing scaled.
                    A pinned crossfade needs a fixed frame and a long scroll,
                    neither of which a phone should be asked for — so touch
                    gets a strip it can flick through at its own pace. */}
                <div className="morph-stage relative flex snap-x snap-mandatory gap-3 overflow-x-auto px-3 py-3 [scrollbar-width:none] sm:block sm:aspect-[16/10] sm:gap-0 sm:overflow-hidden sm:p-0">
                  {demos.map((d, i) => (
                    <figure
                      key={d.slug}
                      className="m-0 w-[86%] shrink-0 snap-center sm:absolute sm:inset-0 sm:w-full"
                    >
                      <Image
                        src={d.preview!.desktop.src}
                        width={d.preview!.desktop.width}
                        height={d.preview!.desktop.height}
                        alt={`${d.brand}, a ${d.industry.toLowerCase()} website built by PlaxWeb`}
                        sizes="(min-width: 1024px) 60vw, 86vw"
                        loading={i === 0 ? 'eager' : 'lazy'}
                        placeholder="blur"
                        blurDataURL={d.preview!.desktop.blurDataURL}
                        data-i={i}
                        className="morph-shot aspect-[16/10] w-full rounded-[6px] object-cover object-top sm:absolute sm:inset-0 sm:h-full sm:rounded-none"
                      />
                      <figcaption className="mt-2 flex items-baseline gap-2 sm:hidden">
                        <span className="text-[0.88rem] font-medium">{d.brand}</span>
                        <span className="font-mono text-[0.58rem] tracking-[0.14em] text-flame-lit uppercase">
                          {d.industry}
                        </span>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>

              <p className="mt-4 text-[0.82rem] text-paper/45">
                <span className="sm:hidden">Swipe through them. </span>
                Every one is a finished website you can open.{' '}
                <Link href="/#demos" className="underline underline-offset-4 hover:text-paper">
                  Go and use them
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
