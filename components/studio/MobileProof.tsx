import Image from 'next/image';
import { getDemo } from '@/lib/demos';

const PICKS = ['restaurant', 'clinic', 'travel'] as const;

/**
 * Real mobile screenshots, not a claim about mobile. Each phone is the actual
 * captured 390px view of a demo, so the section proves the point it makes.
 */
export function MobileProof() {
  const picks = PICKS.map((slug) => getDemo(slug)).filter((d): d is NonNullable<typeof d> => Boolean(d?.preview));

  return (
    <section className="overflow-hidden border-b border-rule bg-paper-2 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
          <div>
            <p className="font-mono text-[0.66rem] tracking-[0.2em] text-flame uppercase">Designed twice, not squeezed</p>
            <h2 className="mt-4 font-display text-[clamp(1.9rem,4.4vw,3rem)] leading-[1.04] font-extrabold tracking-[-0.032em]">
              Most people will only ever see the phone version.
            </h2>
            <p className="mt-5 max-w-lg text-[1rem] leading-relaxed text-ink-2">
              So it gets its own layout rather than the desktop page stacked into one column. Call and WhatsApp stay
              within thumb reach, menus and fee tables stay readable at 375px, and photographs are cropped for a
              portrait screen rather than squeezed into it.
            </p>

            <ul className="mt-8 max-w-lg divide-y divide-rule border-y border-rule">
              {[
                ['The order changes on a phone', 'Sections are re-ordered for how people scan on a phone.'],
                ['The action never scrolls away', 'Call, WhatsApp and book sit in a bar you can reach one-handed.'],
                ['Tested from 360px to 1920px', 'Every demo, every breakpoint, before it goes live.'],
              ].map(([title, body]) => (
                <li key={title} className="py-4">
                  <p className="text-[0.95rem] font-medium">{title}</p>
                  <p className="mt-1 text-[0.9rem] text-ink-3">{body}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-end justify-center gap-4 sm:gap-6 lg:gap-8" data-reveal>
            {picks.map((demo, i) => (
              <figure
                key={demo.slug}
                className={`relative w-[31%] max-w-[210px] shrink-0 overflow-hidden rounded-[20px] border-[6px] border-ink bg-ink shadow-[0_30px_60px_-28px_rgba(20,18,15,0.5)] sm:rounded-[26px] sm:border-[8px] ${
                  i === 1 ? 'mb-8 sm:mb-12' : ''
                }`}
              >
                <div className="relative overflow-hidden rounded-[13px] sm:rounded-[17px]" style={{ aspectRatio: '9 / 18' }}>
                  <Image
                    src={demo.preview!.mobile.src}
                    alt={`${demo.brand} on a phone`}
                    fill
                    sizes="(min-width:640px) 210px, 31vw"
                    placeholder="blur"
                    blurDataURL={demo.preview!.mobile.blurDataURL}
                    className="object-cover object-top"
                  />
                </div>
                <figcaption className="sr-only">
                  {demo.solution.name} — {demo.brand}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
