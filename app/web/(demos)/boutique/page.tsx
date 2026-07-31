import type { Metadata } from 'next';
import Image from 'next/image';
import { kaanchiFonts } from './fonts';
import { collection, craft, faqs, kaanchi, sizeGuide } from './data';
import { Catalogue, FittingForm, KaanchiMobileBar, KaanchiNav } from './parts';
import { kaanchiImages as img } from '@/lib/images';
import { getDemo } from '@/lib/demos';
import { demoMetadata, jsonLd } from '@/lib/metadata';
import { DemoChrome } from '@/components/demo/DemoChrome';
import { DemoCredit } from '@/components/demo/DemoCredit';

const demo = getDemo('boutique')!;
export const metadata: Metadata = demoMetadata(demo);

const schema = {
  '@context': 'https://schema.org',
  '@type': 'ClothingStore',
  name: kaanchi.name,
  telephone: `+${kaanchi.phoneRaw}`,
  email: kaanchi.email,
  priceRange: '₹₹₹',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '14, 2nd Street, Alwarpet',
    addressLocality: 'Chennai',
    addressRegion: 'Tamil Nadu',
    postalCode: '600018',
    addressCountry: 'IN',
  },
  openingHours: ['Tu-Su 11:00-19:30'],
};

const eyebrow = 'text-[0.68rem] tracking-[0.24em] uppercase text-kaanchi-plum';
const heading = 'font-kaanchi-display leading-[1.1] text-[clamp(2rem,5vw,3.4rem)] text-kaanchi-ink';

export default function BoutiqueDemo() {
  return (
    <div id="top" className={`${kaanchiFonts} bg-kaanchi-ivory font-kaanchi-sans text-kaanchi-ink`}>
      <script {...jsonLd(schema)} />
      <KaanchiNav />

      {/* --------------------------------------------------------- hero */}
      <section className="mx-auto grid max-w-[78rem] gap-10 px-5 pt-10 pb-16 sm:px-8 sm:pt-14 sm:pb-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
        <div>
          <p className={eyebrow}>
            {collection.name} — {collection.season}
          </p>
          <h1 className="mt-6 font-kaanchi-display text-[clamp(2.6rem,7vw,4.8rem)] leading-[1.02] text-kaanchi-ink">
            Cloth we can name the weaver of.
          </h1>
          <p className="mt-6 max-w-lg text-[1.02rem] leading-relaxed text-kaanchi-ink/72">{collection.intro}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#edit"
              className="inline-flex min-h-[52px] items-center justify-center bg-kaanchi-ink px-8 text-[0.76rem] tracking-[0.16em] text-kaanchi-ivory uppercase transition-colors hover:bg-kaanchi-plum"
            >
              See the nine pieces
            </a>
            <a
              href="#measure"
              className="inline-flex min-h-[52px] items-center justify-center border border-kaanchi-ink/20 px-8 text-[0.76rem] tracking-[0.16em] uppercase transition-colors hover:border-kaanchi-ink"
            >
              Book a fitting
            </a>
          </div>

          <dl className="mt-11 flex flex-wrap gap-x-10 gap-y-4 border-t border-kaanchi-ink/12 pt-6 text-[0.82rem]">
            {[
              ['Studio', 'Alwarpet, Chennai'],
              ['Runs of', 'Twelve or fewer'],
              ['Made to order', '2–3 weeks'],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-[0.64rem] tracking-[0.14em] text-kaanchi-mute uppercase">{k}</dt>
                <dd className="mt-1 text-kaanchi-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* A boutique is judged on the cloth, so on a phone the cloth comes
            first. On a wide screen the type can hold the left column. */}
        <div className="relative order-first aspect-[4/5] overflow-hidden lg:order-none">
          <Image src={img.hero.src} alt={img.hero.alt} fill priority sizes="(min-width:1024px) 45vw, 92vw" className="object-cover" />
        </div>
      </section>

      {/* --------------------------------------------------------- edit */}
      <section id="edit" className="scroll-mt-24 border-t border-kaanchi-ink/12 py-16 sm:py-24">
        <div className="mx-auto max-w-[78rem] px-5 sm:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className={eyebrow}>The edit</p>
              <h2 className={`mt-5 ${heading}`}>Aavani, in nine pieces</h2>
            </div>
            <p className="max-w-sm text-[0.9rem] leading-relaxed text-kaanchi-mute">
              Tap a piece for the fabric, the weave and what is left. Ordering happens on WhatsApp — you will get a
              photograph of the exact piece before you pay.
            </p>
          </div>

          <Catalogue />
        </div>
      </section>

      {/* -------------------------------------------------------- craft */}
      <section id="craft" className="scroll-mt-24 border-t border-kaanchi-ink/12 bg-kaanchi-ink py-20 text-kaanchi-ivory sm:py-28">
        <div className="mx-auto grid max-w-[78rem] gap-12 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div>
            <p className="text-[0.68rem] tracking-[0.24em] text-kaanchi-gold uppercase">Where it comes from</p>
            <h2 className="mt-5 font-kaanchi-display text-[clamp(2rem,5vw,3.4rem)] leading-[1.1]">
              Three places, and the people in them.
            </h2>
            <div className="mt-10">
              {craft.map((c, i) => (
                <div
                  key={c.title}
                  data-reveal
                  style={{ ['--reveal-delay' as string]: `${i * 80}ms` }}
                  className="border-t border-kaanchi-ivory/15 py-7 last:border-b"
                >
                  <h3 className="font-kaanchi-display text-[1.5rem]">{c.title}</h3>
                  <p className="mt-3 max-w-xl text-[0.96rem] leading-relaxed text-kaanchi-ivory/68">{c.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3" data-reveal>
            {[img.rail, img.fabric, img.store, img.kanjivaram].map((p, i) => (
              <div key={p.src} className={`relative overflow-hidden ${i % 2 ? 'mt-10' : ''} aspect-[3/4]`}>
                <Image src={p.src} alt={p.alt} fill sizes="(min-width:1024px) 26vw, 45vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- made to measure */}
      <section id="measure" className="scroll-mt-24 border-t border-kaanchi-ink/12 py-20 sm:py-28">
        <div className="mx-auto grid max-w-[78rem] gap-12 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className={eyebrow}>Made to measure</p>
            <h2 className={`mt-5 ${heading}`}>Come to the studio, or send measurements.</h2>
            <p className="mt-6 max-w-md text-[1rem] leading-relaxed text-kaanchi-ink/72">
              A fitting takes about forty minutes. Every piece in the edit is on the rail, and we will pin it on you
              rather than guess. Alterations on made-to-order pieces are free, once.
            </p>

            <div className="mt-9">
              <h3 className="text-[0.68rem] tracking-[0.16em] text-kaanchi-mute uppercase">Size guide (inches)</h3>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[20rem] border-collapse text-left text-[0.88rem]">
                  <caption className="sr-only">Kaanchi size chart in inches</caption>
                  <thead>
                    <tr className="border-b border-kaanchi-ink/20">
                      {['Size', 'Bust', 'Waist', 'Hip'].map((h) => (
                        <th key={h} scope="col" className="py-2.5 text-[0.68rem] tracking-[0.12em] text-kaanchi-mute uppercase">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sizeGuide.map(([s, b, w, h]) => (
                      <tr key={s} className="border-b border-kaanchi-ink/10">
                        <th scope="row" className="py-2.5 font-medium">
                          {s}
                        </th>
                        <td className="py-2.5 text-kaanchi-ink/70">{b}</td>
                        <td className="py-2.5 text-kaanchi-ink/70">{w}</td>
                        <td className="py-2.5 text-kaanchi-ink/70">{h}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-[0.8rem] leading-relaxed text-kaanchi-mute">
                Sarees are one size. Blouse pieces are unstitched and we can put you in touch with a tailor in Alwarpet
                who does ours.
              </p>
            </div>
          </div>

          <FittingForm />
        </div>
      </section>

      {/* -------------------------------------------------------- visit */}
      <section id="visit" className="scroll-mt-24 border-t border-kaanchi-ink/12 py-20 sm:py-28">
        <div className="mx-auto grid max-w-[78rem] gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className={eyebrow}>Visit</p>
            <h2 className={`mt-5 ${heading}`}>2nd Street, Alwarpet</h2>
            <address className="mt-7 text-[1.02rem] leading-relaxed text-kaanchi-ink/78 not-italic">
              {kaanchi.address.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </address>
            <p className="mt-4 text-[0.92rem] text-kaanchi-mute">{kaanchi.hours}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(kaanchi.mapQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-kaanchi-ink/20 px-5 py-2.5 text-[0.78rem] tracking-[0.12em] uppercase transition-colors hover:border-kaanchi-ink"
              >
                Directions ↗
              </a>
              <a
                href={`tel:+${kaanchi.phoneRaw}`}
                className="border border-kaanchi-ink/20 px-5 py-2.5 text-[0.78rem] tracking-[0.12em] uppercase transition-colors hover:border-kaanchi-ink"
              >
                {kaanchi.phoneDisplay}
              </a>
            </div>

            <div className="relative mt-10 aspect-[4/3] overflow-hidden">
              <Image src={img.store.src} alt={img.store.alt} fill sizes="(min-width:1024px) 45vw, 92vw" className="object-cover" />
            </div>
          </div>

          <div>
            <p className={eyebrow}>Questions</p>
            <div className="mt-7 border-t border-kaanchi-ink/12">
              {faqs.map((f) => (
                <details key={f.q} className="group border-b border-kaanchi-ink/12">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[0.98rem] marker:content-none [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span aria-hidden className="text-kaanchi-plum transition-transform duration-300 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="pb-5 text-[0.92rem] leading-relaxed text-kaanchi-ink/70">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- footer */}
      <footer className="border-t border-kaanchi-ink/12 pb-24 md:pb-0">
        <div className="mx-auto max-w-[78rem] px-5 py-14 sm:px-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="font-kaanchi-display text-[1.9rem] tracking-[0.1em] text-kaanchi-ink">KAANCHI</p>
              <p className="mt-2 text-[0.82rem] tracking-[0.12em] text-kaanchi-mute uppercase">{kaanchi.sub}</p>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-2 [&>a]:inline-flex [&>a]:min-h-[30px] [&>a]:items-center text-[0.88rem] text-kaanchi-ink/70">
              <a href={`tel:+${kaanchi.phoneRaw}`}>{kaanchi.phoneDisplay}</a>
              <a href={`mailto:${kaanchi.email}`}>{kaanchi.email}</a>
              <a
                href={`https://wa.me/${kaanchi.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-kaanchi-plum"
              >
                WhatsApp
              </a>
            </div>
          </div>
          <DemoCredit slug="boutique" className="mt-12 border-t border-kaanchi-ink/12 pt-6 text-kaanchi-mute" />
        </div>
      </footer>

      <KaanchiMobileBar />
      <DemoChrome demo={demo} />
    </div>
  );
}
