import type { Metadata } from 'next';
import Image from 'next/image';
import { ironFonts } from './fonts';
import { coaches, iron, plans, programmes, quarterly, results, rules } from './data';
import { IronMobileBar, IronNav, Timetable, TrialForm } from './parts';
import { ironImages as img } from '@/lib/images';
import { getDemo } from '@/lib/demos';
import { demoMetadata, jsonLd } from '@/lib/metadata';
import { DemoChrome } from '@/components/demo/DemoChrome';
import { DemoCredit } from '@/components/demo/DemoCredit';

const demo = getDemo('fitness')!;
export const metadata: Metadata = demoMetadata(demo);

const schema = {
  '@context': 'https://schema.org',
  '@type': 'HealthAndBeautyBusiness',
  '@id': 'ironhouse',
  name: iron.name,
  telephone: `+${iron.phoneRaw}`,
  priceRange: '₹₹',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Plot 42, Road No. 36, Jubilee Hills',
    addressLocality: 'Hyderabad',
    addressRegion: 'Telangana',
    postalCode: '500033',
    addressCountry: 'IN',
  },
  openingHours: ['Mo-Su 05:00-22:30'],
};

const eyebrow = 'text-[0.7rem] font-semibold tracking-[0.24em] uppercase text-iron-volt';
const heading = 'font-iron-display uppercase leading-[0.92] tracking-[0.01em] text-[clamp(2.4rem,6vw,4.2rem)] text-white';

export default function FitnessDemo() {
  return (
    <div id="top" className={`${ironFonts} bg-iron-black font-iron-sans text-white`}>
      <script {...jsonLd(schema)} />
      <IronNav />

      {/* --------------------------------------------------------- hero */}
      <section className="relative min-h-[94svh] overflow-hidden">
        <Image src={img.hero.src} alt={img.hero.alt} fill priority sizes="100vw" className="object-cover opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-t from-iron-black via-iron-black/55 to-iron-black/80" />

        <div className="relative mx-auto flex min-h-[94svh] max-w-[84rem] flex-col justify-end px-5 pt-28 pb-16 sm:px-8">
          <p className={eyebrow}>Jubilee Hills, Hyderabad · Open 05:00 – 22:30</p>
          <h1 className="mt-5 max-w-5xl font-iron-display text-[clamp(3rem,11vw,8.5rem)] leading-[0.86] tracking-[0.005em] text-white uppercase">
            Lift heavy.
            <span className="block text-iron-volt">Leave stronger.</span>
          </h1>
          <p className="mt-7 max-w-lg text-[1.05rem] leading-relaxed text-white/70">
            A 6,000 sq ft strength gym with eight platforms, four coaches and no mirrors on the lifting floor. Your
            first session is free and it is a movement screen, not a sales pitch.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#trial"
              className="inline-flex min-h-[58px] items-center justify-center bg-iron-volt px-9 text-[0.85rem] font-bold tracking-[0.14em] text-iron-black uppercase transition-colors hover:bg-white"
            >
              Book a free session
            </a>
            <a
              href="#timetable"
              className="inline-flex min-h-[58px] items-center justify-center border border-white/25 px-9 text-[0.85rem] font-semibold tracking-[0.14em] text-white uppercase transition-colors hover:border-white"
            >
              See the timetable
            </a>
          </div>

          <dl className="mt-12 grid grid-cols-2 gap-px bg-iron-steel md:grid-cols-4">
            {[
              ['Floor', '6,000 sq ft'],
              ['Platforms', 'Eight'],
              ['Coaches', 'Four, full-time'],
              ['Members', 'Capped at 300'],
            ].map(([k, v]) => (
              <div key={k} className="bg-iron-black px-5 py-5">
                <dt className="text-[0.66rem] font-semibold tracking-[0.16em] text-iron-smoke uppercase">{k}</dt>
                <dd className="mt-1.5 font-iron-display text-[1.6rem] leading-none uppercase">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ------------------------------------------------------ programmes */}
      <section id="train" className="scroll-mt-20 py-20 sm:py-24">
        <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
          <p className={eyebrow}>How you train here</p>
          <h2 className={`mt-4 max-w-3xl ${heading}`}>Four ways in. All of them coached.</h2>

          <div className="mt-12 grid gap-px bg-iron-steel md:grid-cols-2">
            {programmes.map((p, i) => (
              <article key={p.name} className="group relative overflow-hidden bg-iron-black">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={p.image.src}
                    alt={p.image.alt}
                    fill
                    sizes="(min-width:768px) 46vw, 92vw"
                    className="object-cover opacity-60 transition-[opacity,transform] duration-700 group-hover:scale-105 group-hover:opacity-85"
                  />
                  <span className="absolute top-4 left-4 font-iron-display text-[2.6rem] leading-none text-iron-volt/85">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="p-6 sm:p-8">
                  <h3 className="font-iron-display text-[1.8rem] leading-none uppercase">{p.name}</h3>
                  <p className="mt-4 text-[0.98rem] leading-relaxed text-white/75">{p.line}</p>
                  <p className="mt-3 border-l-2 border-iron-volt pl-4 text-[0.9rem] leading-relaxed text-iron-smoke">
                    {p.who}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- timetable */}
      <section id="timetable" className="scroll-mt-20 border-t border-iron-steel py-20 sm:py-24">
        <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className={eyebrow}>This week</p>
              <h2 className={`mt-4 ${heading}`}>The timetable</h2>
            </div>
            <p className="max-w-sm text-[0.92rem] leading-relaxed text-iron-smoke">
              Classes cap at 14. Book on the app up to seven days ahead. Open floor means a coach is on duty but there
              is no class running.
            </p>
          </div>

          <Timetable />
        </div>
      </section>

      {/* --------------------------------------------------------- coaches */}
      <section id="coaches" className="scroll-mt-20 border-t border-iron-steel py-20 sm:py-24">
        <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
          <p className={eyebrow}>Who coaches you</p>
          <h2 className={`mt-4 max-w-3xl ${heading}`}>Four coaches. Nobody is on commission.</h2>

          <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {coaches.map((c, i) => (
              <article key={c.name} data-reveal style={{ ['--reveal-delay' as string]: `${i * 70}ms` }}>
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={c.image.src}
                    alt={`${c.name}, ${c.role}`}
                    fill
                    sizes="(min-width:1024px) 22vw, (min-width:640px) 45vw, 90vw"
                    className="object-cover grayscale transition-[filter] duration-700 hover:grayscale-0"
                  />
                </div>
                <h3 className="mt-5 font-iron-display text-[1.45rem] leading-none uppercase">{c.name}</h3>
                <p className="mt-2 text-[0.72rem] font-semibold tracking-[0.14em] text-iron-volt uppercase">{c.role}</p>
                <p className="mt-2 text-[0.82rem] text-iron-smoke">{c.creds}</p>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-white/70">{c.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ membership */}
      <section id="membership" className="scroll-mt-20 border-t border-iron-steel py-20 sm:py-24">
        <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className={eyebrow}>Membership</p>
              <h2 className={`mt-4 ${heading}`}>No joining fee. No lock-in.</h2>
            </div>
            <p className="max-w-sm text-[0.92rem] leading-relaxed text-iron-smoke">
              Month-to-month, cancel with two weeks’ notice. Freeze for up to 60 days a year at no cost — travel and
              injuries happen.
            </p>
          </div>

          <div className="mt-12 grid gap-px bg-iron-steel lg:grid-cols-3">
            {plans.map((p) => (
              <div key={p.name} className={`flex flex-col p-7 sm:p-9 ${p.featured ? 'bg-iron-volt text-iron-black' : 'bg-iron-black'}`}>
                <h3 className="font-iron-display text-[1.8rem] leading-none uppercase">{p.name}</h3>
                <p className={`mt-2 text-[0.9rem] ${p.featured ? 'text-iron-black/70' : 'text-iron-smoke'}`}>{p.line}</p>
                <p className="mt-7 font-iron-display text-[3rem] leading-none">
                  {p.price}
                  <span className={`ml-2 text-[0.8rem] font-normal tracking-[0.12em] uppercase ${p.featured ? 'text-iron-black/60' : 'text-iron-smoke'}`}>
                    {p.period}
                  </span>
                </p>
                <ul className={`mt-8 flex-1 space-y-2.5 text-[0.92rem] ${p.featured ? 'text-iron-black/85' : 'text-white/75'}`}>
                  {p.perks.map((k) => (
                    <li key={k} className="flex gap-3">
                      <span aria-hidden className={`mt-[0.6em] h-[2px] w-3 shrink-0 ${p.featured ? 'bg-iron-black' : 'bg-iron-volt'}`} />
                      {k}
                    </li>
                  ))}
                </ul>
                <a
                  href="#trial"
                  className={`mt-9 inline-flex min-h-[52px] items-center justify-center px-6 text-[0.78rem] font-bold tracking-[0.14em] uppercase transition-colors ${
                    p.featured ? 'bg-iron-black text-iron-volt hover:bg-iron-coal' : 'border border-white/25 hover:border-iron-volt hover:text-iron-volt'
                  }`}
                >
                  Start with a free session
                </a>
              </div>
            ))}
          </div>

          <dl className="mt-8 grid gap-px bg-iron-steel sm:grid-cols-2 lg:grid-cols-4">
            {quarterly.map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-3 bg-iron-black px-5 py-4">
                <dt className="text-[0.86rem] text-iron-smoke">{k}</dt>
                <dd className="text-[0.9rem] font-semibold text-iron-volt">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* --------------------------------------------------- floor & rules */}
      <section className="border-t border-iron-steel py-20 sm:py-24">
        <div className="mx-auto grid max-w-[84rem] gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="grid grid-cols-2 gap-3">
            {[img.rack, img.squat, img.floor, img.dumbbell].map((p, i) => (
              <div key={p.src} className={`relative overflow-hidden ${i % 2 ? 'mt-6' : ''} aspect-[4/5]`}>
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(min-width:1024px) 26vw, 45vw"
                  className="object-cover grayscale-[40%]"
                />
              </div>
            ))}
          </div>

          <div className="self-center">
            <p className={eyebrow}>House rules</p>
            <h2 className={`mt-4 ${heading}`}>Four rules, that is all.</h2>
            <ul className="mt-9">
              {rules.map((r, i) => (
                <li key={r} className="flex gap-5 border-t border-iron-steel py-5 last:border-b">
                  <span className="font-iron-display text-[1.6rem] leading-none text-iron-volt">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[1rem] leading-relaxed text-white/80">{r}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 space-y-8">
              {results.map((r) => (
                <blockquote key={r.name}>
                  <p className="text-[1.02rem] leading-relaxed text-white/85">“{r.quote}”</p>
                  <footer className="mt-3 text-[0.84rem] text-iron-smoke">
                    <span className="font-semibold text-white">{r.name}</span> · {r.meta}
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- trial */}
      <section id="trial" className="scroll-mt-20 border-t border-iron-steel bg-iron-coal py-20 sm:py-24">
        <div className="mx-auto grid max-w-[84rem] gap-12 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className={eyebrow}>Free trial</p>
            <h2 className={`mt-4 ${heading}`}>One session. On us.</h2>
            <p className="mt-6 max-w-md text-[1rem] leading-relaxed text-white/72">
              A movement screen with Ananya, your baseline numbers, and an honest conversation about whether this is the
              right gym for you. It takes about an hour.
            </p>
            <address className="mt-9 border-t border-iron-steel pt-7 text-[0.95rem] leading-relaxed text-white/70 not-italic">
              {iron.address.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
              <a href={`tel:+${iron.phoneRaw}`} className="mt-3 block font-semibold text-iron-volt">
                {iron.phoneDisplay}
              </a>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(iron.mapQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block border-b border-iron-volt pb-0.5 text-[0.86rem] text-iron-volt"
              >
                Directions ↗
              </a>
            </address>
          </div>

          <TrialForm />
        </div>
      </section>

      {/* -------------------------------------------------------- footer */}
      <footer className="border-t border-iron-steel pb-24 lg:pb-0">
        <div className="mx-auto max-w-[84rem] px-5 py-14 sm:px-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="font-iron-display text-[2.2rem] leading-none uppercase">
                Iron<span className="text-iron-volt">house</span>
              </p>
              <p className="mt-3 text-[0.86rem] text-iron-smoke">
                Strength club · Jubilee Hills, Hyderabad · {iron.hours}
              </p>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-2 [&>a]:inline-flex [&>a]:min-h-[30px] [&>a]:items-center text-[0.88rem] text-white/70">
              <a href={`tel:+${iron.phoneRaw}`}>{iron.phoneDisplay}</a>
              <a href="mailto:floor@ironhouse.fit">floor@ironhouse.fit</a>
              <a
                href={`https://wa.me/${iron.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-iron-volt"
              >
                WhatsApp
              </a>
            </div>
          </div>
          <DemoCredit slug="fitness" className="mt-12 border-t border-iron-steel pt-6 text-iron-smoke" />
        </div>
      </footer>

      <IronMobileBar />
      <DemoChrome demo={demo} />
    </div>
  );
}
