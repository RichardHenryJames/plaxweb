import type { Metadata } from 'next';
import Image from 'next/image';
import { schoolFonts } from './fonts';
import {
  admissionSteps,
  facilities,
  faculty,
  faqs,
  fees,
  importantDates,
  notices,
  parentVoices,
  results,
  school,
  streams,
} from './data';
import { AdmissionEnquiry, NoticeTicker, SchoolMobileBar, SchoolNav } from './parts';
import { schoolImages as img } from '@/lib/images';
import { getDemo } from '@/lib/demos';
import { demoMetadata, jsonLd } from '@/lib/metadata';
import { DemoChrome } from '@/components/demo/DemoChrome';
import { DemoCredit } from '@/components/demo/DemoCredit';

const demo = getDemo('school')!;
export const metadata: Metadata = demoMetadata(demo);

const schema = {
  '@context': 'https://schema.org',
  '@type': 'School',
  name: school.name,
  foundingDate: school.established,
  telephone: `+${school.phoneRaw}`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Survey 214, Gangapur Road, Anandwalli',
    addressLocality: 'Nashik',
    addressRegion: 'Maharashtra',
    postalCode: '422013',
    addressCountry: 'IN',
  },
};

const eyebrow = 'text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-school-crimson';
const heading =
  'font-school-display font-bold leading-[1.1] tracking-[-0.015em] text-[clamp(1.9rem,4.6vw,3rem)] text-school-navy';

export default function SchoolDemo() {
  return (
    <div id="top" className={`${schoolFonts} bg-school-paper font-school-sans text-school-navy`}>
      <script {...jsonLd(schema)} />
      <NoticeTicker />
      <SchoolNav />

      {/* --------------------------------------------------------- hero */}
      <section className="relative">
        <div className="relative h-[62svh] min-h-[420px] w-full lg:h-[74svh]">
          <Image src={img.hero.src} alt={img.hero.alt} fill priority sizes="100vw" className="object-cover" />
          {/* Bottom-up on phones (text sits low), left-to-right on desktop. */}
          <div className="absolute inset-0 bg-gradient-to-t from-school-deep/96 via-school-deep/72 to-school-deep/40 lg:bg-gradient-to-r lg:from-school-deep/94 lg:via-school-deep/60 lg:to-school-deep/15" />
        </div>

        <div className="absolute inset-0">
          <div className="mx-auto flex h-full max-w-[82rem] flex-col justify-center px-5 sm:px-8">
            <p className="text-[0.7rem] font-semibold tracking-[0.2em] text-school-gold-lit uppercase">
              CBSE · Nursery to Class XII · Nashik
            </p>
            <h1 className="mt-4 max-w-3xl font-school-display text-[clamp(2rem,5.4vw,3.6rem)] leading-[1.08] font-bold text-white">
              Twenty-eight years of getting children ready for what comes after school.
            </h1>
            <p className="mt-5 max-w-xl text-[1rem] leading-relaxed text-white/80">
              A twelve-acre campus on Gangapur Road, ninety-one teachers, and a class size we have refused to increase
              since 2011.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#enquiry"
                className="inline-flex min-h-[54px] items-center justify-center rounded-sm bg-school-gold px-8 text-[0.95rem] font-semibold text-school-deep transition-colors hover:bg-white"
              >
                Start an admission enquiry
              </a>
              <a
                href="#results"
                className="inline-flex min-h-[54px] items-center justify-center rounded-sm border border-white/35 px-8 text-[0.95rem] font-medium text-white transition-colors hover:border-white"
              >
                2026 board results
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- facts */}
      <section className="border-b border-school-line bg-white">
        <dl className="mx-auto grid max-w-[82rem] grid-cols-2 gap-px bg-school-line md:grid-cols-4">
          {[
            ['Established', school.established],
            ['Affiliation', 'CBSE'],
            ['Campus', '12 acres'],
            ['Average class', '28 students'],
          ].map(([k, v]) => (
            <div key={k} className="bg-white px-5 py-6 sm:px-6">
              <dt className="text-[0.68rem] font-semibold tracking-[0.14em] text-school-navy/50 uppercase">{k}</dt>
              <dd className="mt-1.5 font-school-display text-[1.35rem] font-bold">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ---------------------------------------------------- admissions */}
      <section id="admissions" className="scroll-mt-24 py-20 sm:py-24">
        <div className="mx-auto max-w-[82rem] px-5 sm:px-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className={eyebrow}>Admissions 2026–27</p>
              <h2 className={`mt-4 ${heading}`}>Five steps, published dates, no quota.</h2>
            </div>
            <a
              href="#enquiry"
              className="inline-flex shrink-0 rounded-sm border border-school-navy px-6 py-3 text-[0.88rem] font-semibold transition-colors hover:bg-school-navy hover:text-white"
            >
              Begin an enquiry
            </a>
          </div>

          <ol className="mt-12 grid gap-px overflow-hidden border border-school-line bg-school-line md:grid-cols-5">
            {admissionSteps.map((s, i) => (
              <li key={s.step} className="flex flex-col bg-white p-6">
                <span className="font-school-display text-[2rem] leading-none font-bold text-school-gold">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 font-school-display text-[1.15rem] font-bold">{s.step}</h3>
                <p className="mt-1 text-[0.74rem] font-medium tracking-[0.08em] text-school-crimson uppercase">{s.when}</p>
                <p className="mt-3 text-[0.88rem] leading-relaxed text-school-navy/70">{s.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="min-w-0">
              <h3 className="font-school-display text-[1.4rem] font-bold">Important dates</h3>
              <dl className="mt-5 border-t border-school-line">
                {importantDates.map(([k, v]) => (
                  <div
                    key={k}
                    className="flex flex-col gap-0.5 border-b border-school-line py-3.5 text-[0.92rem] sm:flex-row sm:justify-between sm:gap-6"
                  >
                    <dt className="text-school-navy/70">{k}</dt>
                    <dd className="font-semibold sm:text-right">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="min-w-0">
              <h3 className="font-school-display text-[1.4rem] font-bold">Fee structure, 2026–27</h3>
              <div className="mt-5 overflow-x-auto">
                <table className="w-full min-w-[26rem] border-collapse text-left text-[0.9rem]">
                  <caption className="sr-only">Annual fee structure by grade</caption>
                  <thead>
                    <tr className="border-b-2 border-school-navy">
                      <th scope="col" className="py-2.5 pr-4 text-[0.72rem] font-semibold tracking-[0.1em] uppercase">
                        Grade
                      </th>
                      <th scope="col" className="py-2.5 pr-4 text-right text-[0.72rem] font-semibold tracking-[0.1em] uppercase">
                        Tuition
                      </th>
                      <th scope="col" className="py-2.5 pr-4 text-right text-[0.72rem] font-semibold tracking-[0.1em] uppercase">
                        Transport
                      </th>
                      <th scope="col" className="py-2.5 text-right text-[0.72rem] font-semibold tracking-[0.1em] uppercase">
                        Annual
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {fees.map((f) => (
                      <tr key={f.grade} className="border-b border-school-line">
                        <th scope="row" className="py-3 pr-4 font-medium">
                          {f.grade}
                        </th>
                        <td className="py-3 pr-4 text-right text-school-navy/70">{f.tuition}</td>
                        <td className="py-3 pr-4 text-right text-school-navy/70">{f.transport}</td>
                        <td className="py-3 text-right font-semibold">{f.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-[0.84rem] leading-relaxed text-school-navy/60">
                Payable in three terms. Includes books, laboratory, library, examination and annual day. There are no
                additional charges during the year.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ results */}
      <section id="results" className="scroll-mt-24 bg-school-navy py-20 text-school-paper sm:py-24">
        <div className="mx-auto max-w-[82rem] px-5 sm:px-8">
          <p className="text-[0.7rem] font-semibold tracking-[0.2em] text-school-gold-lit uppercase">Board results 2025–26</p>
          <h2 className="mt-4 max-w-2xl font-school-display text-[clamp(1.9rem,4.6vw,3rem)] leading-[1.1] font-bold">
            The numbers, without the marketing.
          </h2>

          <dl className="mt-10 grid gap-px bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
            {results.headline.map(([k, v, note]) => (
              <div key={k} className="bg-school-navy p-6">
                <dt className="text-[0.7rem] font-semibold tracking-[0.14em] text-school-paper/55 uppercase">{k}</dt>
                <dd className="mt-2 font-school-display text-[2.4rem] leading-none font-bold text-school-gold-lit">{v}</dd>
                <p className="mt-2 text-[0.85rem] text-school-paper/65">{note}</p>
              </div>
            ))}
          </dl>

          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[34rem] border-collapse text-left">
              <caption className="sr-only">Class XII toppers, 2025–26</caption>
              <thead>
                <tr className="border-b border-white/20">
                  {['Student', 'Score', 'Stream', 'Admitted to'].map((h) => (
                    <th key={h} scope="col" className="py-3 pr-6 text-[0.72rem] font-semibold tracking-[0.12em] text-school-paper/55 uppercase">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {results.toppers.map((t) => (
                  <tr key={t.name} className="border-b border-white/10">
                    <th scope="row" className="py-4 pr-6 font-school-display text-[1.05rem] font-semibold">
                      {t.name}
                    </th>
                    <td className="py-4 pr-6 font-semibold text-school-gold-lit">{t.score}</td>
                    <td className="py-4 pr-6 text-[0.9rem] text-school-paper/70">{t.stream}</td>
                    <td className="py-4 text-[0.9rem] text-school-paper/70">{t.next}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- academics */}
      <section id="academics" className="scroll-mt-24 py-20 sm:py-24">
        <div className="mx-auto max-w-[82rem] px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            <div>
              <p className={eyebrow}>Academics</p>
              <h2 className={`mt-4 ${heading}`}>Three streams in the senior school.</h2>
              <div className="mt-9">
                {streams.map((s, i) => (
                  <div key={s.name} data-reveal style={{ ['--reveal-delay' as string]: `${i * 70}ms` }} className="border-t border-school-line py-7 last:border-b">
                    <h3 className="font-school-display text-[1.4rem] font-bold">{s.name}</h3>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-school-navy/75">{s.detail}</p>
                    <p className="mt-3 border-l-2 border-school-gold pl-4 text-[0.88rem] leading-relaxed text-school-navy/60">
                      {s.extra}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={img.teaching.src} alt={img.teaching.alt} fill sizes="(min-width:1024px) 48vw, 92vw" className="object-cover" />
              </div>

              <div className="mt-10 border border-school-line bg-white p-7">
                <h3 className="font-school-display text-[1.3rem] font-bold">Faculty</h3>
                <p className="mt-3 text-[0.93rem] leading-relaxed text-school-navy/70">{faculty.note}</p>
                <ul className="mt-6 space-y-4 border-t border-school-line pt-5">
                  {faculty.people.map((p) => (
                    <li key={p.name}>
                      <p className="font-school-display text-[1.05rem] font-semibold">{p.name}</p>
                      <p className="text-[0.78rem] font-medium tracking-[0.06em] text-school-crimson uppercase">{p.role}</p>
                      <p className="mt-1 text-[0.87rem] leading-relaxed text-school-navy/65">{p.detail}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- campus */}
      <section id="campus" className="scroll-mt-24 border-y border-school-line bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-[82rem] px-5 sm:px-8">
          <p className={eyebrow}>The campus</p>
          <h2 className={`mt-4 max-w-2xl ${heading}`}>Twelve acres, built in phases since 1998.</h2>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[img.campus, img.stacks, img.science, img.auditorium].map((photo, i) => (
              <div
                key={photo.src}
                data-reveal
                style={{ ['--reveal-delay' as string]: `${i * 60}ms` }}
                className={`relative overflow-hidden ${i === 0 ? 'aspect-[4/3] sm:col-span-2 sm:aspect-[16/9]' : 'aspect-[4/3]'}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 92vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          <ul className="mt-12 grid gap-x-10 gap-y-7 md:grid-cols-2 lg:grid-cols-3">
            {facilities.map(([t, b]) => (
              <li key={t} className="border-t border-school-line pt-5">
                <h3 className="font-school-display text-[1.15rem] font-bold">{t}</h3>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-school-navy/70">{b}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------- parents */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-[82rem] px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <p className={eyebrow}>From parents</p>
              <div className="mt-8 space-y-10">
                {parentVoices.map((v) => (
                  <blockquote key={v.name}>
                    <p className="font-school-display text-[1.25rem] leading-[1.5] text-school-navy italic">“{v.quote}”</p>
                    <footer className="mt-4 text-[0.88rem] text-school-navy/60">
                      <span className="font-semibold text-school-navy">{v.name}</span> · {v.meta}
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>

            <div>
              <p className={eyebrow}>Circulars &amp; notices</p>
              <ul className="mt-8 border-t border-school-line">
                {notices.map((n) => (
                  <li key={n} className="flex gap-4 border-b border-school-line py-4">
                    <span aria-hidden className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-school-gold" />
                    <span className="text-[0.93rem] leading-relaxed text-school-navy/80">{n}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 border border-school-line bg-white">
                {faqs.map((f) => (
                  <details key={f.q} className="group border-b border-school-line last:border-b-0">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[0.95rem] font-medium marker:content-none [&::-webkit-details-marker]:hidden">
                      {f.q}
                      <span aria-hidden className="text-school-crimson transition-transform duration-300 group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="px-5 pb-5 text-[0.9rem] leading-relaxed text-school-navy/70">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ enquiry */}
      <section id="enquiry" className="scroll-mt-24 border-t border-school-line bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-[82rem] gap-12 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className={eyebrow}>Admission enquiry</p>
            <h2 className={`mt-4 ${heading}`}>Tell us about your child.</h2>
            <p className="mt-5 max-w-md text-[1rem] leading-relaxed text-school-navy/70">
              The admissions desk replies within two working days with a campus-visit slot, the prospectus and the fee
              structure for the grade you are applying to.
            </p>

            <address className="mt-9 border-t border-school-line pt-7 text-[0.95rem] leading-relaxed text-school-navy/75 not-italic">
              {school.address.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
              <a href={`tel:+${school.admissionsRaw}`} className="mt-4 block font-semibold text-school-navy">
                Admissions · {school.admissionsDisplay}
              </a>
              <a href={`tel:+${school.phoneRaw}`} className="mt-1 block text-school-navy/70">
                Office · {school.phoneDisplay}
              </a>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(school.mapQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block border-b border-school-crimson pb-0.5 text-[0.88rem] font-medium text-school-crimson"
              >
                Directions to campus ↗
              </a>
            </address>
          </div>

          <AdmissionEnquiry />
        </div>
      </section>

      {/* ------------------------------------------------------- footer */}
      <footer className="bg-school-deep pb-24 text-school-paper lg:pb-0">
        <div className="mx-auto max-w-[82rem] px-5 py-14 sm:px-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="font-school-display text-[1.45rem] font-bold">{school.name}</p>
              <p className="mt-2 text-[0.86rem] text-school-paper/60">
                {school.affiliation} · Established {school.established}
              </p>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-2 [&>a]:inline-flex [&>a]:min-h-[30px] [&>a]:items-center text-[0.9rem] text-school-paper/70">
              <a href={`tel:+${school.phoneRaw}`}>{school.phoneDisplay}</a>
              <a href="mailto:admissions@rosewood.edu.in">admissions@rosewood.edu.in</a>
            </div>
          </div>
          <DemoCredit slug="school" className="mt-12 border-t border-white/12 pt-6 text-school-paper/45" />
        </div>
      </footer>

      <SchoolMobileBar />
      <DemoChrome demo={demo} />
    </div>
  );
}
