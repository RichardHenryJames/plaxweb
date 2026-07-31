import type { Metadata } from 'next';
import Image from 'next/image';
import { kesariFonts } from './fonts';
import { gallery, kesari, press, story } from './data';
import { DishStrip, KesariMobileBar, KesariNav, MenuBoard, OpenStatus, ReserveForm } from './parts';
import { kesariImages as img } from '@/lib/images';
import { getDemo } from '@/lib/demos';
import { demoMetadata, jsonLd } from '@/lib/metadata';
import { DemoChrome } from '@/components/demo/DemoChrome';
import { DemoCredit } from '@/components/demo/DemoCredit';

const demo = getDemo('restaurant')!;
export const metadata: Metadata = demoMetadata(demo);

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: kesari.name,
  servesCuisine: ['North Indian', 'Kashmiri', 'Chettinad', 'Hyderabadi'],
  priceRange: '₹₹₹',
  telephone: `+${kesari.phoneRaw}`,
  acceptsReservations: 'True',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '7, Aurobindo Place Market, Hauz Khas',
    addressLocality: 'New Delhi',
    addressRegion: 'Karnataka',
    postalCode: '560038',
    addressCountry: 'IN',
  },
  openingHours: ['Tu-Th 12:00-15:30', 'Tu-Th 19:00-23:00', 'Fr-Sa 12:00-16:00', 'Fr-Sa 19:00-23:30', 'Su 12:00-15:30'],
};

const eyebrow = 'font-kesari-sans text-[0.7rem] tracking-[0.24em] uppercase text-kesari-turmeric';
const heading = 'font-kesari-display font-semibold leading-[1.05] tracking-[-0.02em] text-[clamp(2.1rem,5.4vw,3.7rem)]';

export default function RestaurantDemo() {
  return (
    <div id="top" className={`${kesariFonts} bg-kesari-char font-kesari-sans text-kesari-cream`}>
      <script {...jsonLd(schema)} />
      <KesariNav />

      {/* ------------------------------------------------- split hero */}
      <section className="grid lg:min-h-[92svh] lg:grid-cols-[1fr_1.1fr]">
        <div className="flex flex-col justify-center px-5 pt-10 pb-14 sm:px-10 lg:pt-24 lg:pb-20 xl:px-16">
          <p className={eyebrow}>Hauz Khas · Since 2019</p>
          <h1 className="mt-6 font-kesari-display text-[clamp(2.8rem,7vw,4.6rem)] leading-[0.98] font-semibold tracking-[-0.03em]">
            Regional Indian,
            <span className="block text-kesari-turmeric">cooked properly.</span>
          </h1>
          <p className="mt-7 max-w-md text-[1.02rem] leading-relaxed text-kesari-cream/72">
            A 54-seat room, one clay oven and a dal that takes twenty-six hours. No buffet, no fusion, no small plates
            of things that should be curries.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#reserve"
              className="inline-flex min-h-[54px] items-center justify-center rounded-full bg-kesari-chilli px-8 text-[0.95rem] font-medium transition-colors hover:bg-kesari-turmeric hover:text-kesari-char"
            >
              Reserve a table
            </a>
            <a
              href="#menu"
              className="inline-flex min-h-[54px] items-center justify-center rounded-full border border-kesari-cream/22 px-8 text-[0.95rem] transition-colors hover:border-kesari-cream"
            >
              Read the menu
            </a>
          </div>

          <div className="mt-11 border-t border-kesari-cream/12 pt-6">
            <OpenStatus className="text-[0.9rem] text-kesari-cream/80" />
            <p className="mt-2 text-[0.85rem] text-kesari-muted">
              7, Aurobindo Place Market, Hauz Khas · Valet after 7pm · Closed Mondays
            </p>
          </div>
        </div>

        {/* People choose a restaurant with their eyes. On a phone the food
            leads and the words follow; on a wide screen they sit together. */}
        <div className="relative order-first h-[44svh] min-h-[260px] lg:order-none lg:h-auto lg:min-h-full">
          <Image
            src={img.hero.src}
            alt={img.hero.alt}
            fill
            priority
            sizes="(min-width:1024px) 55vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-kesari-char/75 via-transparent to-kesari-char/45 lg:bg-gradient-to-r lg:from-kesari-char lg:via-kesari-char/10 lg:to-transparent" />
        </div>
      </section>

      {/* ------------------------------------------------------- press */}
      <section className="border-y border-kesari-cream/10 bg-kesari-soot py-8">
        <div className="mx-auto grid max-w-[82rem] gap-6 px-5 sm:px-8 md:grid-cols-3">
          {press.map((p) => (
            <figure key={p.source}>
              <blockquote className="font-kesari-display text-[1rem] leading-snug text-kesari-cream/85 italic">
                “{p.quote}”
              </blockquote>
              <figcaption className="mt-2 text-[0.72rem] tracking-[0.14em] text-kesari-muted uppercase">
                {p.source}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------- menu */}
      <section id="menu" className="scroll-mt-20 py-20 sm:py-28">
        <div className="mx-auto max-w-[82rem] px-5 sm:px-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className={eyebrow}>The menu</p>
              <h2 className={`mt-5 ${heading}`}>What we are cooking</h2>
            </div>
            <p className="max-w-sm text-[0.92rem] leading-relaxed text-kesari-muted">
              Prices include taxes. Jain and no-onion-no-garlic preparations are available for most dishes — tell the
              server, not the app.
            </p>
          </div>

          <MenuBoard />
        </div>
      </section>

      {/* ----------------------------------------------------- gallery */}
      <section className="border-t border-kesari-cream/10 py-16 sm:py-20">
        <div className="mx-auto max-w-[82rem] px-5 sm:px-8">
          <p className={eyebrow}>On the pass</p>
        </div>
        <div className="mt-8">
          <DishStrip photos={gallery} />
        </div>
      </section>

      {/* ----------------------------------------------------- kitchen */}
      <section id="kitchen" className="scroll-mt-20 border-t border-kesari-cream/10 py-20 sm:py-28">
        <div className="mx-auto grid max-w-[82rem] gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <p className={eyebrow}>The kitchen</p>
            <h2 className={`mt-5 max-w-lg ${heading}`}>Three rules we have never broken.</h2>

            <div className="mt-10">
              {story.map((s, i) => (
                <div
                  key={s.title}
                  data-reveal
                  style={{ ['--reveal-delay' as string]: `${i * 80}ms` }}
                  className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-t border-kesari-cream/12 py-7 last:border-b"
                >
                  <span className="pt-1 font-kesari-display text-[1.1rem] text-kesari-turmeric">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-kesari-display text-[1.3rem] font-semibold">{s.title}</h3>
                    <p className="mt-2 max-w-xl text-[0.95rem] leading-relaxed text-kesari-cream/70">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-8 max-w-xl text-[0.92rem] leading-relaxed text-kesari-muted">
              Chef Iqbal Ahmed trained in Lucknow and ran the tandoor at a Delhi institution for eleven years before
              moving south. He is usually at the pass between 8 and 10pm.
            </p>
          </div>

          <div className="grid gap-4" data-reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[3px]">
              <Image src={img.chef.src} alt={img.chef.alt} fill sizes="(min-width:1024px) 44vw, 92vw" className="object-cover" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-square overflow-hidden rounded-[3px]">
                <Image src={img.kitchen.src} alt={img.kitchen.alt} fill sizes="22vw" className="object-cover" />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-[3px]">
                <Image src={img.room.src} alt={img.room.alt} fill sizes="22vw" className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- reserve */}
      <section id="reserve" className="scroll-mt-20 border-t border-kesari-cream/10 bg-kesari-soot py-20 sm:py-28">
        <div className="mx-auto grid max-w-[82rem] gap-12 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className={eyebrow}>Reserve</p>
            <h2 className={`mt-5 ${heading}`}>Book a table</h2>
            <p className="mt-6 max-w-md text-[0.98rem] leading-relaxed text-kesari-cream/72">
              Weekends fill by Thursday. Send the request and we confirm on WhatsApp within the hour we are open.
            </p>
            <ul className="mt-8 space-y-3 border-t border-kesari-cream/12 pt-6 text-[0.9rem] text-kesari-muted">
              <li>Parties of eight or more are handled on a call.</li>
              <li>The private room seats 14 and is booked separately.</li>
              <li>We hold tables for 15 minutes past the booking time.</li>
            </ul>
          </div>

          <ReserveForm />
        </div>
      </section>

      {/* -------------------------------------------------------- visit */}
      <section id="visit" className="scroll-mt-20 border-t border-kesari-cream/10 py-20 sm:py-28">
        <div className="mx-auto grid max-w-[82rem] gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className={eyebrow}>Find us</p>
            <h2 className={`mt-5 ${heading}`}>Aurobindo Place, Hauz Khas</h2>
            <address className="mt-7 text-[1.05rem] leading-relaxed text-kesari-cream/80 not-italic">
              {kesari.address.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </address>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(kesari.mapQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-kesari-cream/22 px-5 py-2.5 text-[0.85rem] transition-colors hover:border-kesari-cream"
              >
                Directions ↗
              </a>
              <a
                href={`tel:+${kesari.phoneRaw}`}
                className="rounded-full border border-kesari-cream/22 px-5 py-2.5 text-[0.85rem] transition-colors hover:border-kesari-cream"
              >
                {kesari.phoneDisplay}
              </a>
            </div>

            <dl className="mt-10 border-t border-kesari-cream/12">
              {kesari.week.map((w) => (
                <div key={w.day} className="flex justify-between gap-4 border-b border-kesari-cream/10 py-3.5 text-[0.92rem]">
                  <dt className="text-kesari-cream/70">{w.day}</dt>
                  <dd className={w.spans.length ? 'text-right text-kesari-cream' : 'text-kesari-muted'}>{w.label}</dd>
                </div>
              ))}
            </dl>
            <OpenStatus className="mt-5 text-[0.88rem] text-kesari-cream/75" />
          </div>

          <div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[3px]">
              <Image src={img.roomLights.src} alt={img.roomLights.alt} fill sizes="(min-width:1024px) 45vw, 92vw" className="object-cover" />
            </div>

            <div className="mt-10 grid gap-px rounded-[3px] bg-kesari-cream/10 sm:grid-cols-2">
              {[
                ['Order in', 'Available on Swiggy and Zomato between 12:30 and 22:30. Biryani travels best; breads do not.'],
                ['Private dining', 'A 14-seat room with its own service. Minimum spend ₹18,000 on weekends.'],
                ['Parking', 'Valet from 7pm. Market parking behind the block is usually free after 9pm.'],
                ['Large orders', 'Office and house catering from 20 people. Two days’ notice for raan.'],
              ].map(([t, b]) => (
                <div key={t} className="bg-kesari-char p-6">
                  <h3 className="font-kesari-display text-[1.08rem] font-semibold">{t}</h3>
                  <p className="mt-2 text-[0.88rem] leading-relaxed text-kesari-muted">{b}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- footer */}
      <footer className="border-t border-kesari-cream/12 bg-kesari-soot pb-24 md:pb-0">
        <div className="mx-auto max-w-[82rem] px-5 py-14 sm:px-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="font-kesari-display text-[1.7rem] font-semibold">
                Kesari House<span className="text-kesari-turmeric">.</span>
              </p>
              <p className="mt-2 text-[0.85rem] text-kesari-muted">{kesari.sub} · New Delhi</p>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-2 [&>a]:inline-flex [&>a]:min-h-[30px] [&>a]:items-center text-[0.88rem] text-kesari-cream/70">
              <a href={`tel:+${kesari.phoneRaw}`}>{kesari.phoneDisplay}</a>
              <a href="mailto:table@kesarihouse.in">table@kesarihouse.in</a>
              <a
                href={`https://wa.me/${kesari.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-kesari-turmeric"
              >
                WhatsApp
              </a>
            </div>
          </div>
          <DemoCredit slug="restaurant" className="mt-12 border-t border-kesari-cream/12 pt-6 text-kesari-muted" />
        </div>
      </footer>

      <KesariMobileBar />
      <DemoChrome demo={demo} />
    </div>
  );
}
