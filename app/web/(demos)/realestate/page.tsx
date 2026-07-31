import type { Metadata } from 'next';
import Image from 'next/image';
import { estateFonts } from './fonts';
import { amenities, faqs, location, milestones, project, specs } from './data';
import { EmiCalculator, EstateMobileBar, EstateNav, HomeSelector, SiteVisitForm } from './parts';
import { estateImages as img } from '@/lib/images';
import { getDemo } from '@/lib/demos';
import { demoMetadata, jsonLd } from '@/lib/metadata';
import { DemoChrome } from '@/components/demo/DemoChrome';
import { DemoCredit } from '@/components/demo/DemoCredit';

const demo = getDemo('realestate')!;
export const metadata: Metadata = demoMetadata(demo);

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Residence',
  name: project.name,
  description: '42 garden villas on 2.8 acres off Sarjapur Road, Bengaluru. 3 and 4 BHK, possession December 2027.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Off Sarjapur–Attibele Road, Dommasandra',
    addressLocality: 'Bengaluru',
    addressRegion: 'Karnataka',
    postalCode: '562125',
    addressCountry: 'IN',
  },
};

const eyebrow = 'text-[0.68rem] tracking-[0.22em] uppercase text-estate-brass';
const heading =
  'font-estate-display font-medium leading-[1.08] tracking-[-0.015em] text-[clamp(2rem,5vw,3.3rem)]';

export default function RealEstateDemo() {
  return (
    <div id="top" className={`${estateFonts} bg-estate-forest font-estate-sans text-estate-stone`}>
      <script {...jsonLd(schema)} />
      <EstateNav />

      {/* --------------------------------------------------------- hero */}
      <section className="relative min-h-[94svh]">
        <Image src={img.hero.src} alt={img.hero.alt} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-estate-deep/80 via-estate-deep/30 to-estate-forest" />
        <div className="absolute inset-0 bg-gradient-to-r from-estate-deep/85 via-estate-deep/25 to-transparent" />

        <div className="relative mx-auto flex min-h-[94svh] max-w-[82rem] flex-col justify-end px-5 pt-32 pb-0 sm:px-8">
          <p className={eyebrow}>Dommasandra, Sarjapur Road · RERA registered</p>
          <h1 className="mt-5 max-w-3xl font-estate-display text-[clamp(2.5rem,7vw,5rem)] leading-[1.0] font-light">
            Forty-two villas, and sixty-eight trees we did not cut down.
          </h1>
          <p className="mt-6 max-w-lg text-[1.02rem] leading-relaxed text-estate-stone/78">
            A 2.8-acre gated community of 3 and 4 BHK garden villas, eleven minutes from Wipro Corporate Office.
            Possession December 2027.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#visit"
              className="inline-flex min-h-[54px] items-center justify-center bg-estate-brass px-8 text-[0.95rem] font-medium text-estate-deep transition-colors hover:bg-estate-stone"
            >
              Book a site visit
            </a>
            <a
              href="#homes"
              className="inline-flex min-h-[54px] items-center justify-center border border-estate-stone/25 px-8 text-[0.95rem] transition-colors hover:border-estate-stone"
            >
              See the floor plans
            </a>
          </div>

          <dl className="mt-14 grid grid-cols-2 gap-px bg-estate-stone/15 md:grid-cols-4">
            {project.facts.map(([k, v]) => (
              <div key={k} className="bg-estate-forest px-5 py-6">
                <dt className="text-[0.64rem] tracking-[0.16em] text-estate-stone/45 uppercase">{k}</dt>
                <dd className="mt-2 font-estate-display text-[1.5rem] font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ------------------------------------------------------ project */}
      <section id="project" className="scroll-mt-24 py-20 sm:py-28">
        <div className="mx-auto grid max-w-[82rem] gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <p className={eyebrow}>The project</p>
            <h2 className={`mt-5 ${heading}`}>Built around what was already here.</h2>
            <div className="mt-7 max-w-xl space-y-5 text-[1rem] leading-relaxed text-estate-stone/75">
              <p>
                The site was a mango and rain-tree plot. Rather than clearing it and drawing a grid, the layout was
                planned around the sixty-eight mature trees worth keeping — which is why no two rows of villas here are
                identical, and why the walking loop bends the way it does.
              </p>
              <p>
                Every villa faces either the central green or its own garden. None of them look into a neighbour’s
                living room, and no villa shares more than one wall.
              </p>
            </div>

            <div className="mt-10">
              <h3 className="text-[0.68rem] tracking-[0.18em] text-estate-brass uppercase">Construction progress</h3>
              <ul className="mt-5 border-t border-estate-stone/12">
                {milestones.map(([label, status, done]) => (
                  <li key={label as string} className="flex items-center justify-between gap-4 border-b border-estate-stone/10 py-3.5">
                    <span className="flex items-center gap-3 text-[0.93rem]">
                      <span
                        aria-hidden
                        className={`h-2 w-2 shrink-0 rounded-full ${done ? 'bg-estate-brass' : 'border border-estate-stone/35'}`}
                      />
                      {label}
                    </span>
                    <span className={`text-right text-[0.84rem] ${done ? 'text-estate-brass' : 'text-estate-stone/50'}`}>
                      {status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid gap-4" data-reveal>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image src={img.facade.src} alt={img.facade.alt} fill sizes="(min-width:1024px) 45vw, 92vw" className="object-cover" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-square overflow-hidden">
                <Image src={img.living.src} alt={img.living.alt} fill sizes="22vw" className="object-cover" />
              </div>
              <div className="relative aspect-square overflow-hidden">
                <Image src={img.evening.src} alt={img.evening.alt} fill sizes="22vw" className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- homes */}
      <section id="homes" className="scroll-mt-24 border-t border-estate-stone/10 py-20 sm:py-28">
        <div className="mx-auto max-w-[82rem] px-5 sm:px-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className={eyebrow}>The homes</p>
              <h2 className={`mt-5 ${heading}`}>Three configurations</h2>
            </div>
            <p className="max-w-sm text-[0.92rem] leading-relaxed text-estate-stone/55">
              Prices are all-inclusive of the villa and the plot, before stamp duty, registration and GST. Nineteen of
              the forty-two villas are still available.
            </p>
          </div>

          <HomeSelector />
        </div>
      </section>

      {/* ---------------------------------------------------------- EMI */}
      <section className="border-t border-estate-stone/10 bg-estate-deep py-20 sm:py-28">
        <div className="mx-auto max-w-[82rem] px-5 sm:px-8">
          <div className="mb-12 max-w-2xl">
            <p className={eyebrow}>Work out the numbers</p>
            <h2 className={`mt-5 ${heading}`}>What this actually costs per month.</h2>
          </div>
          <EmiCalculator />
        </div>
      </section>

      {/* --------------------------------------------------- amenities */}
      <section id="amenities" className="scroll-mt-24 border-t border-estate-stone/10 py-20 sm:py-28">
        <div className="mx-auto max-w-[82rem] px-5 sm:px-8">
          <p className={eyebrow}>Amenities</p>
          <h2 className={`mt-5 max-w-2xl ${heading}`}>Shared spaces that residents will actually use.</h2>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <ul className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
              {amenities.map(([t, b]) => (
                <li key={t} className="border-t border-estate-stone/12 pt-5">
                  <h3 className="font-estate-display text-[1.2rem] font-medium">{t}</h3>
                  <p className="mt-2 text-[0.9rem] leading-relaxed text-estate-stone/65">{b}</p>
                </li>
              ))}
            </ul>

            <div className="grid gap-4">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={img.clubPool.src} alt={img.clubPool.alt} fill sizes="(min-width:1024px) 42vw, 92vw" className="object-cover" />
              </div>
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image src={img.clubGym.src} alt={img.clubGym.alt} fill sizes="(min-width:1024px) 42vw, 92vw" className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- location */}
      <section id="location" className="scroll-mt-24 border-t border-estate-stone/10 py-20 sm:py-28">
        <div className="mx-auto grid max-w-[82rem] gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className={eyebrow}>Location</p>
            <h2 className={`mt-5 ${heading}`}>Off Sarjapur–Attibele Road</h2>
            <address className="mt-7 text-[1.02rem] leading-relaxed text-estate-stone/78 not-italic">
              {project.address.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </address>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(project.mapQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex border-b border-estate-brass pb-1 text-[0.86rem] text-estate-brass"
            >
              Open the site location in Maps ↗
            </a>

            <table className="mt-10 w-full border-collapse text-left">
              <caption className="sr-only">Distances from Aashray Grove</caption>
              <thead>
                <tr className="border-b border-estate-stone/20">
                  <th scope="col" className="py-2.5 text-[0.66rem] tracking-[0.14em] text-estate-stone/45 uppercase">
                    Landmark
                  </th>
                  <th scope="col" className="py-2.5 text-right text-[0.66rem] tracking-[0.14em] text-estate-stone/45 uppercase">
                    Distance
                  </th>
                  <th scope="col" className="py-2.5 text-right text-[0.66rem] tracking-[0.14em] text-estate-stone/45 uppercase">
                    Drive
                  </th>
                </tr>
              </thead>
              <tbody>
                {location.map(([place, km, mins]) => (
                  <tr key={place} className="border-b border-estate-stone/10">
                    <th scope="row" className="py-3 pr-4 text-[0.93rem] font-normal">
                      {place}
                    </th>
                    <td className="py-3 text-right text-[0.9rem] text-estate-stone/65">{km}</td>
                    <td className="py-3 text-right text-[0.9rem] text-estate-brass">{mins}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <p className={eyebrow}>Specifications</p>
            <dl className="mt-7 border-t border-estate-stone/12">
              {specs.map(([k, v]) => (
                <div key={k} className="grid gap-1 border-b border-estate-stone/10 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
                  <dt className="text-[0.8rem] tracking-[0.1em] text-estate-brass uppercase">{k}</dt>
                  <dd className="text-[0.92rem] leading-relaxed text-estate-stone/72">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- visit */}
      <section id="visit" className="scroll-mt-24 border-t border-estate-stone/10 bg-estate-deep py-20 sm:py-28">
        <div className="mx-auto grid max-w-[82rem] gap-12 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className={eyebrow}>Site visit</p>
            <h2 className={`mt-5 ${heading}`}>Come and walk the plot.</h2>
            <p className="mt-6 max-w-md text-[0.98rem] leading-relaxed text-estate-stone/70">
              The show villa is a finished 4 BHK, furnished to the specification you would receive. Sales staff will
              walk you through the sanctioned plan, the RERA filing and the payment schedule without being asked.
            </p>

            <div className="mt-9 border-t border-estate-stone/12 pt-7">
              <h3 className="text-[0.68rem] tracking-[0.18em] text-estate-brass uppercase">Before you ask</h3>
              <div className="mt-4">
                {faqs.map((f) => (
                  <details key={f.q} className="group border-b border-estate-stone/10">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-3.5 text-[0.95rem] marker:content-none [&::-webkit-details-marker]:hidden">
                      {f.q}
                      <span aria-hidden className="text-estate-brass transition-transform duration-300 group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="pb-4 text-[0.88rem] leading-relaxed text-estate-stone/60">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>

          <SiteVisitForm />
        </div>
      </section>

      {/* ------------------------------------------------------- footer */}
      <footer className="border-t border-estate-stone/12 pb-24 lg:pb-0">
        <div className="mx-auto max-w-[82rem] px-5 py-14 sm:px-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="font-estate-display text-[1.6rem] font-medium">Aashray Grove</p>
              <p className="mt-2 text-[0.85rem] text-estate-stone/55">by {project.developer}, Bengaluru</p>
              <p className="mt-4 max-w-md text-[0.78rem] leading-relaxed text-estate-stone/40">
                RERA {project.rera}. Images are indicative. Floor plans are not to scale. All dimensions are subject to
                the sanctioned plan available at the site office.
              </p>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-2 [&>a]:inline-flex [&>a]:min-h-[30px] [&>a]:items-center text-[0.88rem] text-estate-stone/70">
              <a href={`tel:+${project.phoneRaw}`}>{project.phoneDisplay}</a>
              <a href="mailto:sales@aashraygrove.in">sales@aashraygrove.in</a>
              <a
                href={`https://wa.me/${project.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-estate-brass"
              >
                WhatsApp
              </a>
            </div>
          </div>
          <DemoCredit slug="realestate" className="mt-12 border-t border-estate-stone/12 pt-6 text-estate-stone/45" />
        </div>
      </footer>

      <EstateMobileBar />
      <DemoChrome demo={demo} />
    </div>
  );
}
