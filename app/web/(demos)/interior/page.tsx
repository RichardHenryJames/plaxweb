import type { Metadata } from 'next';
import Image from 'next/image';
import { mittiFonts } from './fonts';
import { approach, fees, materials, mitti, press, projects, statement } from './data';
import { MittiNav, ProjectEnquiry } from './parts';
import { mittiImages as img } from '@/lib/images';
import { getDemo } from '@/lib/demos';
import { demoMetadata, jsonLd } from '@/lib/metadata';
import { DemoChrome } from '@/components/demo/DemoChrome';
import { DemoCredit } from '@/components/demo/DemoCredit';

const demo = getDemo('interior')!;
export const metadata: Metadata = demoMetadata(demo);

const schema = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  name: mitti.name,
  telephone: `+${mitti.phoneRaw}`,
  email: mitti.email,
  foundingDate: mitti.founded,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '18, 8th Cross, Malleswaram',
    addressLocality: 'Bengaluru',
    addressRegion: 'Karnataka',
    postalCode: '560003',
    addressCountry: 'IN',
  },
};

const eyebrow = 'text-[0.68rem] tracking-[0.24em] uppercase text-mitti-clay';

export default function InteriorDemo() {
  return (
    <div id="top" className={`${mittiFonts} bg-mitti-linen font-mitti-sans text-mitti-char`}>
      <script {...jsonLd(schema)} />
      <MittiNav />

      {/* ---------------------------------------------------------- hero

          An interior practice sells the work, so the work is the first thing
          on the screen. The type block sits below the image rather than on top
          of it — quieter than the other demos, and how a real studio presents
          itself. */}
      <section className="relative">
        <div className="relative h-[52svh] min-h-[300px] w-full sm:h-[62svh] lg:h-[76svh]">
          <Image src={img.living.src} alt={img.living.alt} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/35 to-transparent" />
          <p className="absolute bottom-4 left-5 text-[0.72rem] tracking-[0.14em] text-white/85 uppercase sm:bottom-6 sm:left-8">
            Rain Tree House · Malleswaram · 2025
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[78rem] px-5 pt-10 pb-16 sm:px-8 sm:pt-14 sm:pb-24">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <h1 className="font-mitti-display text-[clamp(1.95rem,4.2vw,3.1rem)] leading-[1.16] text-mitti-char">
            Homes and small workplaces, built from materials that age well.
          </h1>
          <p className="max-w-2xl text-[clamp(0.98rem,1.35vw,1.1rem)] leading-[1.75] font-light text-mitti-char/80 lg:pt-2">
            {statement}
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-3 border-t border-mitti-char/12 pt-6 text-[0.82rem] tracking-[0.06em] text-mitti-stone">
          <span>Bengaluru</span>
          <span>Founded {mitti.founded}</span>
          <span>Residential &amp; workplace</span>
          <a
            href="#enquire"
            className="ml-auto inline-flex min-h-[30px] items-center border-b border-mitti-char pb-0.5 text-mitti-char"
          >
            Start a project →
          </a>
        </div>
      </section>

      {/* --------------------------------------------------------- work */}
      <section id="work" className="scroll-mt-24 border-t border-mitti-char/12">
        <div className="mx-auto flex max-w-[78rem] flex-col gap-4 px-5 py-12 sm:px-8 sm:py-14 md:flex-row md:items-end md:justify-between">
          <p className={eyebrow}>Selected work</p>
          <p className="max-w-md text-[0.9rem] leading-relaxed font-light text-mitti-stone">
            Four of the fourteen we finished last year. Areas, durations and final costs are the real ones, including
            the two that ran over.
          </p>
        </div>

        {projects.map((p, i) => (
          <article
            key={p.slug}
            className={`border-t border-mitti-char/12 ${i % 2 === 1 ? 'bg-mitti-shell/55' : ''}`}
          >
            <div className="mx-auto max-w-[78rem] px-5 py-16 sm:px-8 sm:py-24">
              <div className={`grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 ${i % 2 === 1 ? 'lg:grid-cols-[0.85fr_1.15fr]' : ''}`}>
                <div className={i % 2 === 1 ? 'lg:order-2' : ''} data-reveal>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={p.cover.src}
                      alt={p.cover.alt}
                      fill
                      sizes="(min-width:1024px) 55vw, 92vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-3">
                    {p.frames.map((fr) => (
                      <div key={fr.src} className="relative aspect-square overflow-hidden">
                        <Image src={fr.src} alt={fr.alt} fill sizes="(min-width:1024px) 18vw, 30vw" className="object-cover" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                  <p className="font-mitti-sans text-[0.68rem] tracking-[0.22em] text-mitti-clay uppercase">
                    {String(i + 1).padStart(2, '0')} · {p.type}
                  </p>
                  <h2 className="mt-4 font-mitti-display text-[clamp(1.9rem,4vw,2.8rem)] leading-tight">{p.name}</h2>

                  <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-y border-mitti-char/12 py-5 text-[0.85rem] sm:grid-cols-4">
                    {[
                      ['Location', p.location],
                      ['Area', p.area],
                      ['Duration', p.duration],
                      ['Cost', p.budget],
                    ].map(([k, v]) => (
                      <div key={k}>
                        <dt className="text-[0.64rem] tracking-[0.16em] text-mitti-stone uppercase">{k}</dt>
                        <dd className="mt-1 font-light">{v}</dd>
                      </div>
                    ))}
                  </dl>

                  <p className="mt-6 text-[1rem] leading-relaxed font-light text-mitti-char/85">{p.brief}</p>

                  <ul className="mt-6 space-y-3">
                    {p.moves.map((m) => (
                      <li key={m} className="flex gap-4 text-[0.93rem] leading-relaxed font-light text-mitti-stone">
                        <span aria-hidden className="mt-[0.7em] h-px w-4 shrink-0 bg-mitti-clay" />
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* ------------------------------------------------------ approach */}
      <section id="approach" className="scroll-mt-24 border-t border-mitti-char/12 bg-mitti-char text-mitti-linen">
        <div className="mx-auto max-w-[78rem] px-5 py-20 sm:px-8 sm:py-28">
          <p className="text-[0.68rem] tracking-[0.24em] text-mitti-clay-lit uppercase">How we work</p>
          <h2 className="mt-5 max-w-3xl font-mitti-display text-[clamp(1.9rem,4.4vw,3rem)] leading-tight">
            Three stages, and a partner on your site every week.
          </h2>

          <div className="mt-14 grid gap-px bg-mitti-linen/15 md:grid-cols-3">
            {approach.map((a) => (
              <div key={a.stage} className="bg-mitti-char p-8">
                <span className="font-mitti-display text-[0.9rem] tracking-[0.2em] text-mitti-clay-lit uppercase">
                  {a.stage}
                </span>
                <h3 className="mt-5 font-mitti-display text-[1.5rem] leading-snug">{a.title}</h3>
                <p className="mt-4 text-[0.94rem] leading-relaxed font-light text-mitti-linen/65">{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- materials */}
      <section id="materials" className="scroll-mt-24 border-t border-mitti-char/12">
        <div className="mx-auto max-w-[78rem] px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <p className={eyebrow}>Materials</p>
              <h2 className="mt-5 font-mitti-display text-[clamp(1.9rem,4.4vw,3rem)] leading-tight">
                Four things we keep coming back to.
              </h2>
              <ul className="mt-10">
                {materials.map(([t, b]) => (
                  <li key={t} className="border-t border-mitti-char/12 py-6 last:border-b">
                    <h3 className="font-mitti-display text-[1.3rem]">{t}</h3>
                    <p className="mt-2 max-w-lg text-[0.93rem] leading-relaxed font-light text-mitti-stone">{b}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-3" data-reveal>
              {[img.detail, img.detailThree, img.detailFour, img.detailTwo].map((p, i) => (
                <div key={p.src} className={`relative overflow-hidden ${i % 2 ? 'mt-8' : ''} aspect-[3/4]`}>
                  <Image src={p.src} alt={p.alt} fill sizes="(min-width:1024px) 26vw, 45vw" className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- fees */}
      <section id="fees" className="scroll-mt-24 border-t border-mitti-char/12 bg-mitti-shell/60">
        <div className="mx-auto max-w-[78rem] px-5 py-20 sm:px-8 sm:py-28">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className={eyebrow}>Fees</p>
              <h2 className="mt-5 font-mitti-display text-[clamp(1.9rem,4.4vw,3rem)] leading-tight">
                What we charge, published.
              </h2>
            </div>
            <p className="max-w-sm text-[0.92rem] leading-relaxed font-light text-mitti-stone">
              We do not take a commission from contractors or suppliers. If a vendor offers one, it is passed back to
              you as a discount.
            </p>
          </div>

          <dl className="mt-12">
            {fees.map(([service, price, note]) => (
              <div
                key={service}
                className="grid gap-2 border-t border-mitti-char/15 py-6 last:border-b sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8"
              >
                <div>
                  <dt className="font-mitti-display text-[1.35rem]">{service}</dt>
                  <p className="mt-1.5 max-w-xl text-[0.9rem] leading-relaxed font-light text-mitti-stone">{note}</p>
                </div>
                <dd className="font-mitti-display text-[1.35rem] text-mitti-clay sm:text-right">{price}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* -------------------------------------------------- studio & press */}
      <section id="studio" className="scroll-mt-24 border-t border-mitti-char/12">
        <div className="mx-auto grid max-w-[78rem] gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <p className={eyebrow}>The studio</p>
            <h2 className="mt-5 font-mitti-display text-[clamp(1.9rem,4.4vw,3rem)] leading-tight">
              Two partners, six people, one workshop in Malleswaram.
            </h2>
            <div className="mt-7 max-w-xl space-y-5 text-[1rem] leading-relaxed font-light text-mitti-char/80">
              <p>
                Studio Mitti was started in {mitti.founded} by Aparna Sridhar and Rohan Dev, both of whom trained at
                CEPT and worked in larger practices before deciding they wanted to be on site rather than in review
                meetings.
              </p>
              <p>
                The studio has a small workshop attached where joinery details are mocked up full size before they go
                to the carpenter. It is slower. It also means fewer surprises on site.
              </p>
            </div>

            <div className="mt-10">
              <p className={eyebrow}>Press</p>
              <ul className="mt-5">
                {press.map(([pub, line]) => (
                  <li key={pub} className="flex flex-col gap-1 border-t border-mitti-char/12 py-3.5 last:border-b sm:flex-row sm:justify-between sm:gap-6">
                    <span className="text-[0.93rem]">{pub}</span>
                    <span className="text-[0.88rem] font-light text-mitti-stone">{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden lg:sticky lg:top-28 lg:self-start">
            <Image src={img.office.src} alt="The Studio Mitti workshop in Malleswaram" fill sizes="(min-width:1024px) 44vw, 92vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- enquiry */}
      <section id="enquire" className="scroll-mt-24 border-t border-mitti-char/12 bg-mitti-shell/60">
        <div className="mx-auto grid max-w-[78rem] gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className={eyebrow}>Start a project</p>
            <h2 className="mt-5 font-mitti-display text-[clamp(1.9rem,4.4vw,3rem)] leading-tight">
              The first conversation is free, and it is in your space.
            </h2>
            <address className="mt-9 border-t border-mitti-char/15 pt-7 text-[0.95rem] leading-relaxed font-light text-mitti-stone not-italic">
              {mitti.address.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
              <a href={`tel:+${mitti.phoneRaw}`} className="mt-4 block text-mitti-char">
                {mitti.phoneDisplay}
              </a>
              <a href={`mailto:${mitti.email}`} className="mt-1 block text-mitti-char">
                {mitti.email}
              </a>
            </address>
          </div>

          <ProjectEnquiry />
        </div>
      </section>

      {/* -------------------------------------------------------- footer */}
      <footer className="border-t border-mitti-char/12">
        <div className="mx-auto max-w-[78rem] px-5 py-12 sm:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <p className="font-mitti-display text-[1.2rem] tracking-[0.14em] uppercase">Studio Mitti</p>
            <p className="text-[0.85rem] font-light text-mitti-stone">
              Interior design &amp; architecture · Bengaluru · Since {mitti.founded}
            </p>
          </div>
          <DemoCredit slug="interior" className="mt-10 border-t border-mitti-char/12 pt-6 text-mitti-stone" />
        </div>
      </footer>

      <DemoChrome demo={demo} />
    </div>
  );
}
