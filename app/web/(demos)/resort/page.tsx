import type { Metadata } from 'next';
import Image from 'next/image';
import { tamaraFonts } from './fonts';
import { dining, directBenefits, experiences, faqs, gettingHere, tamara, villas } from './data';
import { AvailabilityBar, TamaraMobileBar, TamaraNav } from './parts';
import { tamaraImages as img } from '@/lib/images';
import { getDemo } from '@/lib/demos';
import { demoMetadata, jsonLd } from '@/lib/metadata';
import { DemoChrome } from '@/components/demo/DemoChrome';
import { DemoCredit } from '@/components/demo/DemoCredit';

const demo = getDemo('resort')!;
export const metadata: Metadata = demoMetadata(demo);

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Resort',
  name: tamara.name,
  telephone: `+${tamara.phoneRaw}`,
  email: tamara.email,
  priceRange: '₹₹₹',
  numberOfRooms: 12,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Cheepunkal, Vembanad Lake',
    addressLocality: 'Kumarakom',
    addressRegion: 'Kerala',
    postalCode: '686563',
    addressCountry: 'IN',
  },
};

const eyebrow = 'text-[0.66rem] tracking-[0.28em] uppercase text-tamara-coral';
const heading = 'font-tamara-display leading-[1.15] text-[clamp(1.9rem,4.6vw,3.1rem)] text-tamara-shell';

export default function ResortDemo() {
  return (
    <div id="top" className={`${tamaraFonts} bg-tamara-slate font-tamara-sans text-tamara-shell`}>
      <script {...jsonLd(schema)} />
      <TamaraNav />

      {/* --------------------------------------------------------- hero */}
      <section className="relative min-h-[100svh]">
        <Image src={img.hero.src} alt={img.hero.alt} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-tamara-deep/65 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-tamara-slate via-tamara-slate/80 to-transparent" />

        <div className="relative mx-auto flex min-h-[100svh] max-w-[80rem] flex-col justify-end px-5 pt-32 pb-16 sm:px-8 sm:pb-20">
          <p className={eyebrow}>Kumarakom, Kerala · Twelve villas on Vembanad</p>
          <h1 className="mt-6 max-w-3xl font-tamara-display text-[clamp(2.4rem,6.4vw,4.6rem)] leading-[1.08]">
            Twelve villas, one lake, and no reason to hurry.
          </h1>
          <p className="mt-6 max-w-lg text-[1.02rem] leading-relaxed text-tamara-shell/78">
            A small property on the Cheepunkal shore, two hours from Kochi. Canoes at dawn, an Ayurvedic physician on
            call, and a kitchen that cooks whatever came off the boat that morning.
          </p>

          <AvailabilityBar />
        </div>
      </section>

      {/* ------------------------------------------------------- villas */}
      <section id="villas" className="scroll-mt-24 py-20 sm:py-28">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className={eyebrow}>The villas</p>
              <h2 className={`mt-5 ${heading}`}>Three kinds of room. Twelve in total.</h2>
            </div>
            <p className="max-w-sm text-[0.9rem] leading-relaxed text-tamara-shell/55">
              Tariffs are per night for two, including breakfast and all taxes except GST. Peak season is 20 December
              to 10 January.
            </p>
          </div>

          <div className="mt-12 space-y-6">
            {villas.map((v, i) => (
              <article
                key={v.name}
                data-reveal
                style={{ ['--reveal-delay' as string]: `${i * 70}ms` }}
                className={`grid gap-8 border border-tamara-shell/15 p-5 sm:p-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-12 ${
                  v.featured ? 'border-tamara-coral/45' : ''
                }`}
              >
                <div className={`relative aspect-[4/3] overflow-hidden ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <Image
                    src={v.image.src}
                    alt={v.image.alt}
                    fill
                    sizes="(min-width:1024px) 40vw, 92vw"
                    className="object-cover"
                  />
                </div>

                <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="flex flex-wrap items-baseline justify-between gap-4">
                    <div>
                      <h3 className="font-tamara-display text-[1.75rem] leading-tight">{v.name}</h3>
                      <p className="mt-1.5 text-[0.8rem] tracking-[0.12em] text-tamara-coral uppercase">
                        {v.count} · {v.size} · {v.sleeps}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-tamara-display text-[1.7rem] text-tamara-shell">{v.rate}</p>
                      <p className="text-[0.74rem] text-tamara-shell/45">per night · peak {v.peak}</p>
                    </div>
                  </div>

                  <p className="mt-4 text-[0.95rem] text-tamara-shell/70">{v.view}</p>

                  <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                    {v.inclusions.map((inc) => (
                      <li key={inc} className="flex gap-3 text-[0.88rem] text-tamara-shell/70">
                        <span aria-hidden className="mt-[0.6em] h-px w-3 shrink-0 bg-tamara-coral" />
                        {inc}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#enquire"
                    className="mt-6 inline-flex min-h-[46px] items-center justify-center border border-tamara-shell/25 px-7 text-[0.72rem] tracking-[0.18em] uppercase transition-colors hover:border-tamara-coral hover:text-tamara-coral"
                  >
                    Check dates for this villa
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- experiences */}
      <section id="experiences" className="scroll-mt-24 border-t border-tamara-shell/12 bg-tamara-deep py-20 sm:py-28">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <p className={eyebrow}>Experiences</p>
          <h2 className={`mt-5 max-w-2xl ${heading}`}>Four things worth getting up for.</h2>

          <div className="mt-12 grid gap-x-8 gap-y-12 md:grid-cols-2">
            {experiences.map((e, i) => (
              <article key={e.name} data-reveal style={{ ['--reveal-delay' as string]: `${(i % 2) * 80}ms` }}>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={e.image.src}
                    alt={e.image.alt}
                    fill
                    sizes="(min-width:768px) 46vw, 92vw"
                    className="object-cover transition-transform duration-[900ms] hover:scale-105"
                  />
                </div>
                <h3 className="mt-5 font-tamara-display text-[1.5rem] leading-tight">{e.name}</h3>
                <p className="mt-1.5 text-[0.76rem] tracking-[0.12em] text-tamara-coral uppercase">{e.time}</p>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-tamara-shell/68">{e.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- dining */}
      <section id="dining" className="scroll-mt-24 border-t border-tamara-shell/12 py-20 sm:py-28">
        <div className="mx-auto grid max-w-[80rem] gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <p className={eyebrow}>Dining</p>
            <h2 className={`mt-5 ${heading}`}>Two kitchens, one boat.</h2>
            <p className="mt-6 max-w-lg text-[1rem] leading-relaxed text-tamara-shell/72">
              Whatever the boat brings in at six goes on the board at seven. Beyond that, everything is grown within
              twenty kilometres — the rice, the coconut, the pepper, the tapioca.
            </p>

            <dl className="mt-9">
              {dining.map(([name, body]) => (
                <div key={name} className="border-t border-tamara-shell/12 py-5 last:border-b">
                  <dt className="font-tamara-display text-[1.3rem]">{name}</dt>
                  <dd className="mt-2 text-[0.93rem] leading-relaxed text-tamara-shell/65">{body}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="grid gap-4" data-reveal>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image src={img.dining.src} alt={img.dining.alt} fill sizes="(min-width:1024px) 45vw, 92vw" className="object-cover" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-square overflow-hidden">
                <Image src={img.food.src} alt={img.food.alt} fill sizes="22vw" className="object-cover" />
              </div>
              <div className="relative aspect-square overflow-hidden">
                <Image src={img.pool.src} alt={img.pool.alt} fill sizes="22vw" className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- direct booking */}
      <section className="border-t border-tamara-shell/12 bg-tamara-coral/10 py-16 sm:py-20">
        <div className="mx-auto grid max-w-[80rem] gap-10 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <div>
            <p className={eyebrow}>Book direct</p>
            <h2 className={`mt-5 ${heading}`}>Booking with us costs you less than booking through them.</h2>
          </div>
          <ul className="grid gap-3">
            {directBenefits.map((b) => (
              <li key={b} className="flex gap-4 border-b border-tamara-shell/12 pb-3 text-[0.98rem] text-tamara-shell/80 last:border-b-0">
                <span aria-hidden className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rotate-45 bg-tamara-coral" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------ journey */}
      <section id="journey" className="scroll-mt-24 border-t border-tamara-shell/12 py-20 sm:py-28">
        <div className="mx-auto grid max-w-[80rem] gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className={eyebrow}>Getting here</p>
            <h2 className={`mt-5 ${heading}`}>Cheepunkal, Kumarakom</h2>
            <address className="mt-7 text-[1.02rem] leading-relaxed text-tamara-shell/78 not-italic">
              {tamara.address.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </address>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(tamara.mapQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex border-b border-tamara-coral pb-1 text-[0.85rem] text-tamara-coral"
            >
              Open in Google Maps ↗
            </a>

            <table className="mt-10 w-full border-collapse text-left">
              <caption className="sr-only">Distances to Tamara Backwaters</caption>
              <tbody>
                {gettingHere.map(([place, km, mins]) => (
                  <tr key={place} className="border-b border-tamara-shell/12">
                    <th scope="row" className="py-3.5 pr-4 text-[0.93rem] font-normal">
                      {place}
                    </th>
                    <td className="py-3.5 text-right text-[0.88rem] text-tamara-shell/60">{km}</td>
                    <td className="py-3.5 pl-4 text-right text-[0.88rem] text-tamara-coral">{mins}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <p className={eyebrow}>Before you book</p>
            <div className="mt-7 border-t border-tamara-shell/12">
              {faqs.map((f) => (
                <details key={f.q} className="group border-b border-tamara-shell/12">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[0.98rem] marker:content-none [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span aria-hidden className="text-tamara-coral transition-transform duration-300 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="pb-5 text-[0.92rem] leading-relaxed text-tamara-shell/62">{f.a}</p>
                </details>
              ))}
            </div>

            <div className="relative mt-10 aspect-[16/10] overflow-hidden">
              <Image src={img.poolDusk.src} alt={img.poolDusk.alt} fill sizes="(min-width:1024px) 45vw, 92vw" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ enquire */}
      <section id="enquire" className="scroll-mt-24 border-t border-tamara-shell/12 bg-tamara-deep py-20 sm:py-28">
        <div className="mx-auto grid max-w-[80rem] gap-12 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className={eyebrow}>Check availability</p>
            <h2 className={`mt-5 ${heading}`}>Tell us your dates.</h2>
            <p className="mt-6 max-w-md text-[0.98rem] leading-relaxed text-tamara-shell/70">
              We hold the villa for 24 hours while you decide. No card is taken until you confirm, and cancellation is
              free up to 72 hours before you arrive.
            </p>
            <p className="mt-6 text-[0.9rem] text-tamara-shell/55">
              <a href={`tel:+${tamara.phoneRaw}`} className="text-tamara-coral">
                {tamara.phoneDisplay}
              </a>
              <span className="mx-3">·</span>
              <a href={`mailto:${tamara.email}`} className="text-tamara-coral">
                {tamara.email}
              </a>
            </p>
          </div>

          <AvailabilityBar variant="panel" />
        </div>
      </section>

      {/* ------------------------------------------------------- footer */}
      <footer className="border-t border-tamara-shell/12 pb-24 lg:pb-0">
        <div className="mx-auto max-w-[80rem] px-5 py-14 sm:px-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="font-tamara-display text-[1.3rem] tracking-[0.3em] uppercase">Tamara</p>
              <p className="mt-2 text-[0.62rem] tracking-[0.36em] text-tamara-coral uppercase">Backwaters</p>
              <p className="mt-4 text-[0.85rem] text-tamara-shell/50">Kumarakom, Kerala · Twelve villas on Vembanad</p>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-2 [&>a]:inline-flex [&>a]:min-h-[30px] [&>a]:items-center text-[0.88rem] text-tamara-shell/70">
              <a href={`tel:+${tamara.phoneRaw}`}>{tamara.phoneDisplay}</a>
              <a href={`mailto:${tamara.email}`}>{tamara.email}</a>
              <a
                href={`https://wa.me/${tamara.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-tamara-coral"
              >
                WhatsApp
              </a>
            </div>
          </div>
          <DemoCredit slug="resort" className="mt-12 border-t border-tamara-shell/12 pt-6 text-tamara-shell/45" />
        </div>
      </footer>

      <TamaraMobileBar />
      <DemoChrome demo={demo} />
    </div>
  );
}
