import type { Metadata } from 'next';
import Image from 'next/image';
import { clinicFonts } from './fonts';
import { clinic, doctors, faqs, safety, stories, treatments } from './data';
import { AppointmentForm, ClinicMobileBar, ClinicNav, TreatmentGrid } from './parts';
import { clinicImages as img } from '@/lib/images';
import { getDemo } from '@/lib/demos';
import { demoMetadata, jsonLd } from '@/lib/metadata';
import { DemoChrome } from '@/components/demo/DemoChrome';
import { DemoCredit } from '@/components/demo/DemoCredit';

const demo = getDemo('clinic')!;
export const metadata: Metadata = demoMetadata(demo);

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Dentist',
  name: clinic.name,
  telephone: `+${clinic.phoneRaw}`,
  priceRange: '₹₹',
  medicalSpecialty: 'Dentistry',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '3rd Floor, Prestige Point, 80 Feet Road, 6th Block Koramangala',
    addressLocality: 'Bengaluru',
    addressRegion: 'Karnataka',
    postalCode: '560095',
    addressCountry: 'IN',
  },
  openingHours: ['Mo-Fr 09:30-20:00', 'Sa 09:30-18:00', 'Su 10:00-14:00'],
};

const eyebrow = 'text-[0.72rem] font-semibold tracking-[0.18em] uppercase text-clinic-teal';
const heading = 'font-clinic-display font-semibold leading-[1.08] tracking-[-0.02em] text-[clamp(1.95rem,4.8vw,3.1rem)] text-clinic-ink';

export default function ClinicDemo() {
  return (
    <div id="top" className={`${clinicFonts} bg-white font-clinic-sans text-clinic-ink`}>
      <script {...jsonLd(schema)} />
      <ClinicNav />

      {/* --------------------------------------------------------- hero */}
      <section className="border-b border-clinic-line bg-clinic-mist">
        <div className="mx-auto grid max-w-[80rem] items-center gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <p className={eyebrow}>Koramangala, Bengaluru</p>
            <h1 className="mt-4 font-clinic-display text-[clamp(2.2rem,5.6vw,3.6rem)] leading-[1.05] font-bold tracking-[-0.03em] text-clinic-ink">
              A dental clinic that tells you the price before it picks up a drill.
            </h1>
            <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-clinic-slate">
              Written estimates, three specialists under one roof, and a Class B autoclave log you are welcome to
              inspect. Most patients are seen within the same week.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#book"
                className="inline-flex min-h-[54px] items-center justify-center rounded-full bg-clinic-teal px-8 text-[0.98rem] font-semibold text-white transition-colors hover:bg-clinic-deep"
              >
                Book an appointment
              </a>
              <a
                href="#pricing"
                className="inline-flex min-h-[54px] items-center justify-center rounded-full border border-clinic-ink/15 px-8 text-[0.98rem] font-medium transition-colors hover:border-clinic-ink"
              >
                See what it costs
              </a>
            </div>

            <dl className="mt-11 grid grid-cols-3 gap-4 border-t border-clinic-line pt-7">
              {[
                ['Since', '2013'],
                ['Specialists', 'Three, in-house'],
                ['Estimates', 'Written, upfront'],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-[0.72rem] font-medium tracking-[0.1em] text-clinic-slate uppercase">{k}</dt>
                  <dd className="mt-1 font-clinic-display text-[1.05rem] font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* On a phone the room itself is the trust signal, so it sits above
             the promise rather than a screen below it. */}
          <div className="relative order-first mb-8 lg:order-none lg:mb-0">
            <div className="relative aspect-[5/4] overflow-hidden rounded-[14px] sm:aspect-[4/3] lg:aspect-[4/4.4]">
              <Image
                src={img.hero.src}
                alt={img.hero.alt}
                fill
                priority
                sizes="(min-width:1024px) 45vw, 92vw"
                className="object-cover"
              />
            </div>
            <div className="absolute right-4 -bottom-6 left-4 rounded-[12px] border border-clinic-line bg-white p-5 shadow-[0_20px_45px_-25px_rgba(13,32,39,0.4)] sm:right-auto sm:-bottom-8 sm:left-6 sm:max-w-[19rem]">
              <p className="text-[0.72rem] font-semibold tracking-[0.14em] text-clinic-teal uppercase">In pain today?</p>
              <p className="mt-2 text-[0.9rem] leading-relaxed text-clinic-slate">
                Two emergency slots are held every weekday, and Sunday mornings are kept for pain.
              </p>
              <a
                href={`tel:+${clinic.emergencyRaw}`}
                className="mt-3 inline-flex font-clinic-display text-[1.05rem] font-semibold text-clinic-ink underline underline-offset-4"
              >
                {clinic.emergencyDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- treatments */}
      <section id="treatments" className="scroll-mt-24 py-20 sm:py-24">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <div className="max-w-2xl">
            <p className={eyebrow}>Treatments</p>
            <h2 className={`mt-4 ${heading}`}>What we do, and what it involves.</h2>
            <p className="mt-5 text-[1rem] leading-relaxed text-clinic-slate">
              Tap any treatment for the honest version — how long it takes, what is included, and where the price
              actually lands.
            </p>
          </div>

          <TreatmentGrid />
        </div>
      </section>

      {/* ------------------------------------------------------ pricing */}
      <section id="pricing" className="scroll-mt-24 border-y border-clinic-line bg-clinic-mist py-20 sm:py-24">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <p className={eyebrow}>Transparent pricing</p>
              <h2 className={`mt-4 ${heading}`}>The full price list.</h2>
            </div>
            <p className="max-w-sm text-[0.92rem] leading-relaxed text-clinic-slate">
              These are the ranges we work within. You get a written estimate at the end of the first examination and
              we do not move off it without asking you first.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-[12px] border border-clinic-line bg-white">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">Treatment price list at Aarogya Dental Studio</caption>
              <thead>
                <tr className="border-b border-clinic-line bg-clinic-mist/60">
                  <th scope="col" className="px-5 py-3.5 text-[0.74rem] font-semibold tracking-[0.12em] text-clinic-slate uppercase">
                    Treatment
                  </th>
                  <th scope="col" className="hidden px-5 py-3.5 text-[0.74rem] font-semibold tracking-[0.12em] text-clinic-slate uppercase sm:table-cell">
                    Sittings
                  </th>
                  <th scope="col" className="px-5 py-3.5 text-right text-[0.74rem] font-semibold tracking-[0.12em] text-clinic-slate uppercase">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {treatments.map((t) => (
                  <tr key={t.id} className="border-b border-clinic-line/70 last:border-b-0">
                    <th scope="row" className="px-5 py-4 font-medium">
                      <span className="block font-clinic-display text-[1rem] text-clinic-ink">{t.name}</span>
                      <span className="mt-0.5 block text-[0.84rem] font-normal text-clinic-slate sm:hidden">{t.sittings}</span>
                    </th>
                    <td className="hidden px-5 py-4 text-[0.9rem] text-clinic-slate sm:table-cell">{t.sittings}</td>
                    <td className="px-5 py-4 text-right font-semibold whitespace-nowrap text-clinic-teal">{t.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-5 text-[0.86rem] text-clinic-slate">
            Consultation is ₹500 and is adjusted against treatment started within 30 days. Children under six are seen
            free for a first look.
          </p>
        </div>
      </section>

      {/* --------------------------------------------------------- team */}
      <section id="team" className="scroll-mt-24 py-20 sm:py-24">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <div className="max-w-2xl">
            <p className={eyebrow}>Your dentists</p>
            <h2 className={`mt-4 ${heading}`}>Three specialists. You see the same one each time.</h2>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {doctors.map((d, i) => (
              <article
                key={d.name}
                data-reveal
                style={{ ['--reveal-delay' as string]: `${i * 80}ms` }}
                className="overflow-hidden rounded-[12px] border border-clinic-line"
              >
                <div className="relative aspect-[4/3] bg-clinic-mist">
                  <Image
                    src={d.image.src}
                    alt={`${d.name}, ${d.qual}`}
                    fill
                    sizes="(min-width:768px) 30vw, 92vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-clinic-display text-[1.2rem] font-semibold">{d.name}</h3>
                  <p className="mt-1 text-[0.85rem] font-medium text-clinic-teal">{d.qual}</p>
                  <p className="mt-3 text-[0.9rem] leading-relaxed text-clinic-slate">{d.note}</p>
                  <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-1 border-t border-clinic-line pt-3 text-[0.82rem]">
                    <div className="flex gap-1.5">
                      <dt className="text-clinic-slate">Practising</dt>
                      <dd className="font-medium">{d.years}</dd>
                    </div>
                    <div className="flex gap-1.5">
                      <dt className="text-clinic-slate">Focus</dt>
                      <dd className="font-medium">{d.focus}</dd>
                    </div>
                  </dl>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- safety */}
      <section id="safety" className="scroll-mt-24 bg-clinic-ink py-20 text-white sm:py-24">
        <div className="mx-auto grid max-w-[80rem] gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <p className="text-[0.72rem] font-semibold tracking-[0.18em] text-clinic-lit uppercase">Sterilisation</p>
            <h2 className="mt-4 font-clinic-display text-[clamp(1.95rem,4.8vw,3.1rem)] leading-[1.08] font-semibold tracking-[-0.02em]">
              The part nobody asks about, and everybody should.
            </h2>
            <p className="mt-6 max-w-md text-[1rem] leading-relaxed text-white/65">
              Infection control is invisible when it is done properly, which is exactly why it gets cut. Here is what we
              do, in full, so you can compare it with anywhere else.
            </p>
            <div className="relative mt-9 aspect-[4/3] overflow-hidden rounded-[12px]">
              <Image src={img.room.src} alt={img.room.alt} fill sizes="(min-width:1024px) 40vw, 92vw" className="object-cover" />
            </div>
          </div>

          <ul className="grid gap-px self-start overflow-hidden rounded-[12px] bg-white/12">
            {safety.map(([t, b]) => (
              <li key={t} className="bg-clinic-ink p-7">
                <h3 className="font-clinic-display text-[1.15rem] font-semibold">{t}</h3>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-white/60">{b}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------ stories */}
      <section className="border-b border-clinic-line py-20 sm:py-24">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <p className={eyebrow}>Patient stories</p>
          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            {stories.map((s, i) => (
              <blockquote
                key={s.name}
                data-reveal
                style={{ ['--reveal-delay' as string]: `${i * 80}ms` }}
                className="rounded-[12px] border border-clinic-line p-7"
              >
                <p className="text-[0.98rem] leading-relaxed text-clinic-ink/85">“{s.quote}”</p>
                <footer className="mt-5 border-t border-clinic-line pt-4">
                  <p className="text-[0.92rem] font-semibold">{s.name}</p>
                  <p className="mt-0.5 text-[0.82rem] text-clinic-slate">{s.meta}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- appointment */}
      <section id="book" className="scroll-mt-24 py-20 sm:py-24">
        <div className="mx-auto grid max-w-[80rem] gap-12 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className={eyebrow}>Book</p>
            <h2 className={`mt-4 ${heading}`}>Request an appointment</h2>
            <p className="mt-5 max-w-md text-[1rem] leading-relaxed text-clinic-slate">
              Pick a time that suits you and we will confirm it, or offer the nearest slot. First appointments are
              always an examination — no treatment is started on day one without your agreement.
            </p>
            <div className="mt-8 rounded-[12px] bg-clinic-mist p-6">
              <p className="text-[0.9rem] leading-relaxed text-clinic-ink/80">
                <span className="font-semibold">Bringing a child?</span> Book the 09:30 or 16:00 slot. Those are held for
                children so the waiting room is quiet.
              </p>
            </div>
          </div>

          <AppointmentForm />
        </div>
      </section>

      {/* -------------------------------------------------------- visit */}
      <section id="visit" className="scroll-mt-24 border-t border-clinic-line bg-clinic-mist py-20 sm:py-24">
        <div className="mx-auto grid max-w-[80rem] gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className={eyebrow}>Visit</p>
            <h2 className={`mt-4 ${heading}`}>80 Feet Road, 6th Block</h2>
            <address className="mt-6 text-[1.05rem] leading-relaxed text-clinic-ink/80 not-italic">
              {clinic.address.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </address>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clinic.mapQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-clinic-ink/15 bg-white px-5 py-2.5 text-[0.86rem] font-medium transition-colors hover:border-clinic-teal"
              >
                Directions ↗
              </a>
              <a
                href={`tel:+${clinic.phoneRaw}`}
                className="rounded-full border border-clinic-ink/15 bg-white px-5 py-2.5 text-[0.86rem] font-medium transition-colors hover:border-clinic-teal"
              >
                {clinic.phoneDisplay}
              </a>
            </div>

            <dl className="mt-9 rounded-[12px] border border-clinic-line bg-white">
              {clinic.hours.map(([d, t]) => (
                <div key={d} className="flex justify-between gap-4 border-b border-clinic-line px-5 py-3.5 text-[0.92rem] last:border-b-0">
                  <dt className="text-clinic-slate">{d}</dt>
                  <dd className="text-right font-medium">{t}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-5 text-[0.86rem] leading-relaxed text-clinic-slate">
              Lift access to the third floor. Wheelchair accessible. Free parking in the basement for patients — tell
              the guard you are visiting Aarogya.
            </p>
          </div>

          <div>
            <p className={eyebrow}>Common questions</p>
            <div className="mt-6 overflow-hidden rounded-[12px] border border-clinic-line bg-white">
              {faqs.map((f) => (
                <details key={f.q} className="group border-b border-clinic-line last:border-b-0">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[0.98rem] font-medium marker:content-none [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span aria-hidden className="text-clinic-teal transition-transform duration-300 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="px-5 pb-5 text-[0.92rem] leading-relaxed text-clinic-slate">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- footer */}
      <footer className="bg-clinic-ink pb-24 text-white lg:pb-0">
        <div className="mx-auto max-w-[80rem] px-5 py-14 sm:px-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="font-clinic-display text-[1.4rem] font-semibold">Aarogya Dental Studio</p>
              <p className="mt-2 max-w-xs text-[0.9rem] text-white/60">
                Koramangala, Bengaluru. Dental Council of India registered practice.
              </p>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-2 [&>a]:inline-flex [&>a]:min-h-[30px] [&>a]:items-center text-[0.9rem] text-white/70">
              <a href={`tel:+${clinic.phoneRaw}`}>{clinic.phoneDisplay}</a>
              <a href="mailto:care@aarogyadental.in">care@aarogyadental.in</a>
              <a href={`tel:+${clinic.emergencyRaw}`} className="text-clinic-teal">
                Emergency {clinic.emergencyDisplay}
              </a>
            </div>
          </div>
          <DemoCredit slug="clinic" className="mt-12 border-t border-white/12 pt-6 text-white/45" />
        </div>
      </footer>

      <ClinicMobileBar />
      <DemoChrome demo={demo} />
    </div>
  );
}
