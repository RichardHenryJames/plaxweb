import Link from 'next/link';
import { site } from '@/lib/site';
import { HeroDevice } from './HeroDevice';

/**
 * On a phone the proof has to arrive before the pitch finishes, so the device
 * showcase is ordered between the headline and the buttons. On a laptop the
 * same three blocks resolve into a two-column composition.
 */
export function Hero() {
  return (
    <section className="border-b border-rule">
      <div className="mx-auto max-w-[84rem] px-5 pt-8 pb-12 sm:px-8 sm:pt-12 sm:pb-16 lg:pt-16 lg:pb-20">
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-x-14 lg:gap-y-0 xl:gap-x-20">
          <div className="lg:col-start-1 lg:row-start-1 lg:self-end">
            <p className="font-mono text-[0.66rem] tracking-[0.2em] text-flame uppercase sm:text-[0.68rem]">
              PlaxWeb, a PlaxLabs studio
            </p>
            <h1 className="mt-4 font-display text-[clamp(2.15rem,5.4vw,3.9rem)] leading-[1.03] font-extrabold tracking-[-0.036em] sm:mt-5">
              Websites built for real businesses.
            </h1>
            <p className="mt-5 max-w-xl text-[1.02rem] leading-relaxed text-ink-2 sm:mt-6 sm:text-[1.05rem]">
              Find a website close to your business and open it. Each one is set up to bring in bookings, orders or
              enquiries, and works as well on a phone as on a laptop.
            </p>
          </div>

          <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <HeroDevice />
          </div>

          <div className="lg:col-start-1 lg:row-start-2 lg:self-start lg:pt-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#demos"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-flame px-7 text-[0.95rem] font-medium text-white transition-colors hover:bg-ink"
              >
                Explore websites
                <span aria-hidden>↓</span>
              </a>
              <Link
                href={`${site.basePath}/contact`}
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-ink/20 px-7 text-[0.95rem] font-medium transition-colors hover:border-ink"
              >
                Build my website
                <span aria-hidden>→</span>
              </Link>
            </div>

            {/* Proof, not price. A number before the visitor has seen anything
                is just a barrier; the price lands under each solution instead,
                where there is something to weigh it against. */}
            <dl className="mt-7 grid max-w-lg grid-cols-3 gap-px overflow-hidden rounded-[4px] border border-rule bg-rule sm:mt-8">
              {[
                ['Live demos', '10, all open'],
                ['Live in', '2–6 weeks'],
                ['Designed for', 'Desktop + mobile'],
              ].map(([label, value]) => (
                <div key={label} className="bg-paper px-3 py-3.5 sm:px-4">
                  <dt className="font-mono text-[0.56rem] tracking-[0.12em] text-ink-3 uppercase sm:text-[0.58rem]">
                    {label}
                  </dt>
                  <dd className="mt-1 text-[0.9rem] font-medium sm:text-[0.92rem]">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
