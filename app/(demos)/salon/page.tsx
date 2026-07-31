import type { Metadata } from 'next';
import Image from 'next/image';
import { salonFonts } from './fonts';
import { faqs, memberships, reviews, salon, stylists } from './data';
import { BookingPanel, SalonMobileBar, SalonNav, ServiceMenu } from './parts';
import { salonImages as img } from '@/lib/images';
import { getDemo } from '@/lib/demos';
import { demoMetadata, jsonLd } from '@/lib/metadata';
import { DemoChrome } from '@/components/demo/DemoChrome';
import { DemoCredit } from '@/components/demo/DemoCredit';

const demo = getDemo('salon')!;
export const metadata: Metadata = demoMetadata(demo);

const schema = {
  '@context': 'https://schema.org',
  '@type': 'HairSalon',
  name: salon.name,
  description: 'Hair, colour, skin and bridal studio in Indiranagar, Bengaluru.',
  telephone: `+${salon.phoneRaw}`,
  priceRange: '₹₹',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '#42, 100 Feet Road, Indiranagar',
    addressLocality: 'Bengaluru',
    addressRegion: 'Karnataka',
    postalCode: '560038',
    addressCountry: 'IN',
  },
  openingHours: ['Tu-Th 10:00-20:00', 'Fr-Sa 09:30-21:00', 'Su 10:00-19:00'],
};

const eyebrow = 'font-salon-sans text-[0.66rem] tracking-[0.28em] uppercase text-salon-brass';
const sectionTitle =
  'font-salon-display font-light leading-[1.06] tracking-[-0.01em] text-[clamp(2.1rem,5.4vw,3.6rem)]';

export default function SalonDemo() {
  return (
    <div id="top" className={`${salonFonts} bg-salon-espresso font-salon-sans text-salon-bone`}>
      <script {...jsonLd(schema)} />
      <SalonNav />

      {/* ---------------------------------------------------------- hero */}
      <section className="relative min-h-[92svh] overflow-hidden">
        <Image
          src={img.hero.src}
          alt={img.hero.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-salon-deep/80 via-salon-deep/45 to-salon-espresso" />

        <div className="relative mx-auto flex min-h-[92svh] max-w-[80rem] flex-col justify-end px-5 pt-32 pb-16 sm:px-8 sm:pb-24">
          <p className={eyebrow}>Hair · Skin · Bridal · Since 2016</p>
          <h1 className="mt-6 max-w-4xl font-salon-display text-[clamp(2.7rem,8.6vw,6rem)] leading-[0.98] font-light tracking-[-0.015em]">
            Hair that behaves.
            <span className="block text-salon-sand italic">Skin that shows up.</span>
          </h1>
          <p className="mt-7 max-w-lg text-[1.02rem] leading-relaxed font-light text-salon-bone/80">
            A twelve-chair studio on 100 Feet Road. One consultation before anything is cut or coloured, and an honest
            answer about what your hair will actually do.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#book"
              className="inline-flex min-h-[54px] items-center justify-center bg-salon-brass px-9 text-[0.75rem] tracking-[0.22em] text-salon-deep uppercase transition-colors hover:bg-salon-bone"
            >
              Book an appointment
            </a>
            <a
              href="#services"
              className="inline-flex min-h-[54px] items-center justify-center border border-salon-bone/25 px-9 text-[0.75rem] tracking-[0.22em] uppercase transition-colors hover:border-salon-bone"
            >
              See the price list
            </a>
          </div>

          <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-salon-bone/12 pt-6 text-[0.78rem] tracking-[0.14em] text-salon-bone/60 uppercase">
            <div>
              <dt className="sr-only">Location</dt>
              <dd>Indiranagar, Bengaluru</dd>
            </div>
            <div>
              <dt className="sr-only">Today</dt>
              <dd>Open till 9pm Fri &amp; Sat</dd>
            </div>
            <div>
              <dt className="sr-only">From</dt>
              <dd>Cuts from ₹700</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ------------------------------------------------------ statement */}
      <section className="border-t border-salon-bone/8 py-20 sm:py-28">
        <div className="mx-auto grid max-w-[80rem] gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div data-reveal>
            <p className={eyebrow}>Why people stay</p>
            <h2 className={`mt-6 ${sectionTitle}`}>
              We would rather talk you out of a service than sell you one you will regret.
            </h2>
            <div className="mt-8 max-w-xl space-y-5 text-[1rem] leading-relaxed font-light text-salon-bone/72">
              <p>
                Every first visit starts dry, in the chair, with a conversation. How you actually style your hair on a
                Tuesday morning matters more than the photo on your phone — and we will say so.
              </p>
              <p>
                Colour is strand-tested. Skin is read before a protocol is chosen. If what you want is going to damage
                your hair or your skin, we will offer the version that does not.
              </p>
            </div>
            <ul className="mt-10 grid gap-px bg-salon-bone/10 sm:grid-cols-3">
              {[
                ['12', 'chairs, never rushed'],
                ['48h', 'patch test before colour'],
                ['7 days', 'free adjustment window'],
              ].map(([n, l]) => (
                <li key={l} className="bg-salon-espresso py-5 pr-4">
                  <p className="font-salon-display text-[1.9rem] font-light text-salon-brass">{n}</p>
                  <p className="mt-1 text-[0.8rem] leading-snug font-light text-salon-muted">{l}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4" data-reveal>
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image src={img.wash.src} alt={img.wash.alt} fill sizes="(min-width:1024px) 22vw, 45vw" className="object-cover" />
            </div>
            <div className="relative mt-10 aspect-[3/4] overflow-hidden">
              <Image src={img.floor.src} alt={img.floor.alt} fill sizes="(min-width:1024px) 22vw, 45vw" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- services */}
      <section id="services" className="scroll-mt-24 border-t border-salon-bone/8 py-20 sm:py-28">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className={eyebrow}>The menu</p>
              <h2 className={`mt-6 ${sectionTitle}`}>Services &amp; prices</h2>
            </div>
            <p className="max-w-sm text-[0.92rem] leading-relaxed font-light text-salon-muted">
              Prices are what you pay. Nothing is added at the counter — if a treatment is recommended mid-service, you
              are told the cost before it starts.
            </p>
          </div>

          <ServiceMenu />
        </div>
      </section>

      {/* --------------------------------------------------------- team */}
      <section id="team" className="scroll-mt-24 border-t border-salon-bone/8 py-20 sm:py-28">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <p className={eyebrow}>Who you will sit with</p>
          <h2 className={`mt-6 max-w-2xl ${sectionTitle}`}>Four people, not a rota of whoever is free.</h2>

          <div className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {stylists.map((s, i) => (
              <article key={s.name} data-reveal style={{ ['--reveal-delay' as string]: `${i * 70}ms` }}>
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={s.image.src}
                    alt={`${s.name}, ${s.role}`}
                    fill
                    sizes="(min-width:1024px) 22vw, (min-width:640px) 45vw, 90vw"
                    className="object-cover grayscale-[35%] transition-[filter,transform] duration-700 hover:scale-[1.03] hover:grayscale-0"
                  />
                </div>
                <h3 className="mt-5 font-salon-display text-[1.35rem] font-normal">{s.name}</h3>
                <p className="mt-1 text-[0.68rem] tracking-[0.2em] text-salon-brass uppercase">{s.role}</p>
                <p className="mt-3 text-[0.86rem] leading-relaxed font-light text-salon-muted">{s.note}</p>
                <p className="mt-3 border-t border-salon-bone/10 pt-3 text-[0.78rem] font-light text-salon-bone/60">
                  {s.years} · {s.focus}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- work */}
      <section className="border-t border-salon-bone/8 py-20 sm:py-28">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className={eyebrow}>Recent work</p>
              <h2 className={`mt-6 ${sectionTitle}`}>From the floor</h2>
            </div>
            <p className="hidden text-[0.72rem] tracking-[0.18em] text-salon-muted uppercase sm:block">Swipe →</p>
          </div>
        </div>

        <div className="scroll-x mt-12 flex gap-4 px-5 pb-4 sm:px-8">
          {[img.longHair, img.curls, img.colour, img.mensCut, img.beard, img.nails, img.stones, img.editorial].map(
            (photo, i) => (
              <figure key={photo.src} className="w-[74vw] shrink-0 sm:w-[36vw] lg:w-[25vw]">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width:1024px) 25vw, (min-width:640px) 36vw, 74vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 text-[0.76rem] font-light text-salon-muted">
                  {String(i + 1).padStart(2, '0')} — {photo.alt}
                </figcaption>
              </figure>
            )
          )}
        </div>
      </section>

      {/* ---------------------------------------------------- memberships */}
      <section id="membership" className="scroll-mt-24 border-t border-salon-bone/8 py-20 sm:py-28">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <div className="max-w-2xl">
            <p className={eyebrow}>Memberships</p>
            <h2 className={`mt-6 ${sectionTitle}`}>Worth it if you come more than four times a year.</h2>
          </div>

          <div className="mt-14 grid gap-px bg-salon-bone/10 lg:grid-cols-3">
            {memberships.map((m) => (
              <div
                key={m.name}
                className={`flex flex-col p-8 sm:p-10 ${m.featured ? 'bg-salon-bone text-salon-deep' : 'bg-salon-espresso'}`}
              >
                <h3 className="font-salon-display text-[1.6rem] font-normal">{m.name}</h3>
                <p className={`mt-2 text-[0.88rem] font-light ${m.featured ? 'text-salon-deep/70' : 'text-salon-muted'}`}>
                  {m.line}
                </p>
                <p className="mt-7 font-salon-display text-[2.4rem] leading-none font-light">
                  {m.price}
                  <span className={`ml-2 text-[0.8rem] tracking-[0.16em] uppercase ${m.featured ? 'text-salon-deep/55' : 'text-salon-muted'}`}>
                    {m.cadence}
                  </span>
                </p>
                <ul className="mt-8 flex-1 space-y-3 text-[0.9rem] font-light">
                  {m.perks.map((p) => (
                    <li key={p} className="flex gap-3">
                      <span aria-hidden className={`mt-[0.6em] h-px w-3 shrink-0 ${m.featured ? 'bg-salon-deep' : 'bg-salon-brass'}`} />
                      {p}
                    </li>
                  ))}
                </ul>
                <a
                  href="#book"
                  className={`mt-9 inline-flex min-h-[48px] items-center justify-center px-6 text-[0.72rem] tracking-[0.22em] uppercase transition-colors ${
                    m.featured
                      ? 'bg-salon-deep text-salon-bone hover:bg-salon-espresso'
                      : 'border border-salon-bone/25 hover:border-salon-brass hover:text-salon-brass'
                  }`}
                >
                  Enquire
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- reviews */}
      <section className="border-t border-salon-bone/8 py-20 sm:py-28">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <p className={eyebrow}>In their words</p>
          <div className="mt-12 grid gap-10 lg:grid-cols-3 lg:gap-14">
            {reviews.map((r, i) => (
              <blockquote key={r.name} data-reveal style={{ ['--reveal-delay' as string]: `${i * 80}ms` }}>
                <p className="font-salon-display text-[1.22rem] leading-[1.55] font-light text-salon-bone/90 italic">
                  “{r.quote}”
                </p>
                <footer className="mt-6 border-t border-salon-bone/12 pt-4">
                  <p className="text-[0.9rem]">{r.name}</p>
                  <p className="mt-1 text-[0.72rem] tracking-[0.16em] text-salon-muted uppercase">{r.meta}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- booking */}
      <section id="book" className="scroll-mt-24 border-t border-salon-bone/8 py-20 sm:py-28">
        <div className="mx-auto grid max-w-[80rem] gap-12 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className={eyebrow}>Book</p>
            <h2 id="book-heading" className={`mt-6 ${sectionTitle}`}>
              Tell us what you want done.
            </h2>
            <p className="mt-6 max-w-md text-[0.98rem] leading-relaxed font-light text-salon-bone/70">
              Fill this in and it goes straight to the front desk on WhatsApp with your details attached. We confirm the
              slot — or offer the nearest one — within business hours.
            </p>
            <div className="mt-9 space-y-4 border-t border-salon-bone/12 pt-7 text-[0.9rem] font-light">
              <p className="text-salon-muted">
                Colour and bridal need a consultation first. Ask for one in the notes and we will book it free.
              </p>
              <p>
                <a href={`tel:+${salon.phoneDisplay}`} className="text-salon-brass">
                  {salon.phoneDisplay}
                </a>
              </p>
            </div>
          </div>

          <BookingPanel />
        </div>
      </section>

      {/* --------------------------------------------------------- visit */}
      <section id="visit" className="scroll-mt-24 border-t border-salon-bone/8 py-20 sm:py-28">
        <div className="mx-auto grid max-w-[80rem] gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <p className={eyebrow}>Visit</p>
            <h2 className={`mt-6 ${sectionTitle}`}>100 Feet Road, Indiranagar</h2>

            <address className="mt-8 text-[1.05rem] leading-relaxed font-light text-salon-bone/80 not-italic">
              {salon.address.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </address>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(salon.mapQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 border-b border-salon-brass pb-1 text-[0.8rem] tracking-[0.18em] text-salon-brass uppercase"
            >
              Open in Google Maps <span aria-hidden>↗</span>
            </a>

            <dl className="mt-10 border-t border-salon-bone/12">
              {salon.hours.map(([day, time]) => (
                <div key={day} className="flex justify-between border-b border-salon-bone/10 py-3.5 text-[0.92rem] font-light">
                  <dt className="text-salon-bone/70">{day}</dt>
                  <dd className={time === 'Closed' ? 'text-salon-muted' : 'text-salon-bone'}>{time}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-6 text-[0.85rem] leading-relaxed font-light text-salon-muted">
              Two-wheeler parking in the building. Car parking behind the CMH Road junction — two hours validated on
              services over ₹3,000.
            </p>
          </div>

          <div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image src={img.bright.src} alt={img.bright.alt} fill sizes="(min-width:1024px) 45vw, 92vw" className="object-cover" />
            </div>

            <div className="mt-10">
              <p className={eyebrow}>Before you come</p>
              <div className="mt-6 border-t border-salon-bone/12">
                {faqs.map((f) => (
                  <details key={f.q} className="group border-b border-salon-bone/10">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[0.98rem] font-light marker:content-none [&::-webkit-details-marker]:hidden">
                      {f.q}
                      <span aria-hidden className="text-salon-brass transition-transform duration-300 group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="pb-5 text-[0.9rem] leading-relaxed font-light text-salon-muted">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- footer */}
      <footer className="border-t border-salon-bone/12 bg-salon-deep pb-24 md:pb-0">
        <div className="mx-auto max-w-[80rem] px-5 py-14 sm:px-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="font-salon-display text-[1.6rem] font-light tracking-[0.14em] uppercase">Maison Aria</p>
              <p className="mt-2 text-[0.72rem] tracking-[0.3em] text-salon-brass uppercase">{salon.sub}</p>
            </div>
            <div className="flex flex-wrap gap-x-10 gap-y-2 text-[0.85rem] font-light text-salon-bone/70 [&>a]:inline-flex [&>a]:min-h-[30px] [&>a]:items-center">
              <a href={`tel:+${salon.phoneRaw}`}>{salon.phoneDisplay}</a>
              <a href="mailto:hello@maisonaria.in">hello@maisonaria.in</a>
              <a
                href={`https://wa.me/${salon.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-salon-brass"
              >
                WhatsApp
              </a>
            </div>
          </div>

          <DemoCredit slug="salon" className="mt-12 border-t border-salon-bone/12 pt-6 text-salon-muted" />
        </div>
      </footer>

      <SalonMobileBar />
      <DemoChrome demo={demo} />
    </div>
  );
}
