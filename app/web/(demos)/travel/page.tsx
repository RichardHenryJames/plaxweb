import type { Metadata } from 'next';
import Image from 'next/image';
import { wayfareFonts } from './fonts';
import { stories, wayfare, whyUs } from './data';
import { ItineraryExplorer, TripEnquiry, TripFinder, WayfareMobileBar, WayfareNav } from './parts';
import { wayfareImages as img } from '@/lib/images';
import { getDemo } from '@/lib/demos';
import { demoMetadata, jsonLd } from '@/lib/metadata';
import { DemoChrome } from '@/components/demo/DemoChrome';
import { DemoCredit } from '@/components/demo/DemoCredit';

const demo = getDemo('travel')!;
export const metadata: Metadata = demoMetadata(demo);

const schema = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: wayfare.name,
  telephone: `+${wayfare.phoneRaw}`,
  priceRange: '₹₹₹',
  areaServed: 'IN',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Corte de Oiteiro, Rua de Ourem',
    addressLocality: 'Panjim',
    addressRegion: 'Goa',
    postalCode: '403001',
    addressCountry: 'IN',
  },
};

const eyebrow = 'text-[0.7rem] tracking-[0.22em] uppercase text-way-sun';
const heading = 'font-way-display leading-[1.02] text-[clamp(2.2rem,5.6vw,3.8rem)] text-way-sand';

export default function TravelDemo() {
  return (
    <div id="top" className={`${wayfareFonts} bg-way-ink font-way-sans text-way-sand`}>
      <script {...jsonLd(schema)} />
      <WayfareNav />

      {/* --------------------------------------------------------- hero */}
      <section className="relative min-h-[96svh]">
        <Image src={img.hero.src} alt={img.hero.alt} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-way-deep/70 via-way-deep/25 to-way-ink" />
        <div className="absolute inset-0 bg-gradient-to-r from-way-deep/80 via-way-deep/20 to-transparent" />

        <div className="relative mx-auto flex min-h-[96svh] max-w-[82rem] flex-col justify-center px-5 pt-28 pb-20 sm:px-8">
          <p className={eyebrow}>Small-group travel across India · Since 2012</p>
          <h1 className="mt-6 max-w-4xl font-way-display text-[clamp(2.9rem,8.4vw,6.2rem)] leading-[0.96]">
            Twelve people, one driver, and an itinerary that leaves room to do nothing.
          </h1>
          <p className="mt-7 max-w-xl text-[1.05rem] leading-relaxed text-way-sand/78">
            We run six fixed-departure trips and design private ones. No shopping stops, no white-labelled operators,
            and full costing on the page before you write to us.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#trips"
              className="inline-flex min-h-[54px] items-center justify-center rounded-full bg-way-sun px-8 text-[0.95rem] font-medium text-way-deep transition-colors hover:bg-way-sand"
            >
              See the trips
            </a>
            <a
              href="#enquire"
              className="inline-flex min-h-[54px] items-center justify-center rounded-full border border-way-sand/28 px-8 text-[0.95rem] transition-colors hover:border-way-sand"
            >
              Design a private trip
            </a>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- trips */}
      <section id="trips" className="scroll-mt-24 py-20 sm:py-28">
        <div className="mx-auto max-w-[82rem] px-5 sm:px-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className={eyebrow}>The trips</p>
              <h2 className={`mt-5 ${heading}`}>Six routes we know properly.</h2>
            </div>
            <p className="max-w-sm text-[0.92rem] leading-relaxed text-way-sand/55">
              Every one of these can also run as a private departure for your own group, on your own dates, at roughly
              15% more per person.
            </p>
          </div>

          <TripFinder />
        </div>
      </section>

      {/* ---------------------------------------------------- itinerary */}
      <section id="itinerary" className="scroll-mt-24 border-t border-way-sand/12 bg-way-deep py-20 sm:py-28">
        <div className="mx-auto max-w-[82rem] px-5 sm:px-8">
          <div className="max-w-2xl">
            <p className={eyebrow}>Day by day</p>
            <h2 className={`mt-5 ${heading}`}>Read the whole itinerary before you enquire.</h2>
            <p className="mt-5 text-[0.98rem] leading-relaxed text-way-sand/62">
              Most operators send the day-by-day only after you have shared your number. Here it is, along with what is
              and is not included, and how many seats are actually left.
            </p>
          </div>

          <ItineraryExplorer />
        </div>
      </section>

      {/* ---------------------------------------------------------- why */}
      <section id="why" className="scroll-mt-24 border-t border-way-sand/12 py-20 sm:py-28">
        <div className="mx-auto grid max-w-[82rem] gap-12 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div>
            <p className={eyebrow}>Why book with us</p>
            <h2 className={`mt-5 ${heading}`}>Four things we will put in writing.</h2>
            <ul className="mt-9">
              {whyUs.map(([t, b], i) => (
                <li
                  key={t}
                  data-reveal
                  style={{ ['--reveal-delay' as string]: `${i * 70}ms` }}
                  className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-t border-way-sand/12 py-6 last:border-b"
                >
                  <span className="pt-1 text-[0.8rem] text-way-sun">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="font-way-display text-[1.4rem] leading-snug text-way-sand">{t}</h3>
                    <p className="mt-2 text-[0.93rem] leading-relaxed text-way-sand/62">{b}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-7 text-[0.85rem] text-way-sand/45">{wayfare.licence}</p>
          </div>

          <div className="grid grid-cols-2 gap-3" data-reveal>
            {[img.snow, img.jaipurTwo, img.mysore, img.monsoon].map((p, i) => (
              <div key={p.src} className={`relative overflow-hidden rounded-[4px] ${i % 2 ? 'mt-8' : ''} aspect-[3/4]`}>
                <Image src={p.src} alt={p.alt} fill sizes="(min-width:1024px) 24vw, 45vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- stories */}
      <section className="border-t border-way-sand/12 py-16 sm:py-20">
        <div className="mx-auto grid max-w-[82rem] gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
          {stories.map((s) => (
            <blockquote key={s.name}>
              <p className="font-way-display text-[1.5rem] leading-[1.45] text-way-sand/92 italic">“{s.quote}”</p>
              <footer className="mt-5 border-t border-way-sand/15 pt-4 text-[0.86rem] text-way-sand/55">
                <span className="text-way-sand">{s.name}</span> · {s.trip}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* ----------------------------------------------------- enquiry */}
      <section id="enquire" className="scroll-mt-24 border-t border-way-sand/12 bg-way-deep py-20 sm:py-28">
        <div className="mx-auto grid max-w-[82rem] gap-12 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className={eyebrow}>Plan a trip</p>
            <h2 className={`mt-5 ${heading}`}>Tell us roughly what you want.</h2>
            <p className="mt-6 max-w-md text-[0.98rem] leading-relaxed text-way-sand/70">
              Even “somewhere green, ten days, in August, with two children” is enough to start. We reply with two or
              three honest options and what each would cost.
            </p>
            <address className="mt-9 border-t border-way-sand/15 pt-7 text-[0.93rem] leading-relaxed text-way-sand/65 not-italic">
              {wayfare.address.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
              <a href="mailto:hello@wayfarejourneys.in" className="mt-3 block text-way-sun">
                hello@wayfarejourneys.in
              </a>
            </address>
          </div>

          <TripEnquiry />
        </div>
      </section>

      {/* ------------------------------------------------------- footer */}
      <footer className="border-t border-way-sand/12 pb-24 md:pb-0">
        <div className="mx-auto max-w-[82rem] px-5 py-14 sm:px-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="font-way-display text-[1.8rem] text-way-sand">
                Wayfare <span className="text-way-sun italic">Journeys</span>
              </p>
              <p className="mt-2 text-[0.85rem] text-way-sand/50">{wayfare.licence}</p>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-2 [&>a]:inline-flex [&>a]:min-h-[30px] [&>a]:items-center text-[0.88rem] text-way-sand/70">
              <a href={`tel:+${wayfare.phoneRaw}`}>{wayfare.phoneDisplay}</a>
              <a href="mailto:hello@wayfarejourneys.in">hello@wayfarejourneys.in</a>
              <a
                href={`https://wa.me/${wayfare.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-way-sun"
              >
                WhatsApp
              </a>
            </div>
          </div>
          <DemoCredit slug="travel" className="mt-12 border-t border-way-sand/15 pt-6 text-way-sand/45" />
        </div>
      </footer>

      <WayfareMobileBar />
      <DemoChrome demo={demo} />
    </div>
  );
}
