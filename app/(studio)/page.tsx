import type { Metadata } from 'next';
import { Hero } from '@/components/studio/Hero';
import { DemoGallery } from '@/components/studio/DemoGallery';
import { Capabilities } from '@/components/studio/Capabilities';
import { Process } from '@/components/studio/Process';
import { MobileProof } from '@/components/studio/MobileProof';
import { WhyNotATemplate } from '@/components/studio/WhyNotATemplate';
import { Pricing } from '@/components/studio/Pricing';
import { Faq, faqSchema } from '@/components/studio/Faq';
import { ContactSection } from '@/components/studio/ContactSection';
import { TrackView } from '@/components/ui/TrackView';
import { jsonLd, pageMetadata } from '@/lib/metadata';
import { origin, site } from '@/lib/site';
import { demos } from '@/lib/demos';

export const metadata: Metadata = pageMetadata({
  title: 'PlaxWeb — Websites built for real businesses',
  description: site.description,
  path: site.home,
  image: demos[0].cover.src,
});

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${origin()}${site.basePath}#plaxweb`,
  name: 'PlaxWeb',
  parentOrganization: { '@type': 'Organization', name: 'PlaxLabs' },
  description: site.description,
  url: `${origin()}${site.basePath}`,
  telephone: `+${site.phoneRaw}`,
  email: site.email,
  areaServed: 'IN',
  priceRange: '₹₹',
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.addressLines.slice(1).join(', '),
    addressLocality: 'Bengaluru',
    addressRegion: 'Karnataka',
    postalCode: '560008',
    addressCountry: 'IN',
  },
  makesOffer: demos.map((d) => ({
    '@type': 'Offer',
    itemOffered: { '@type': 'Service', name: `${d.industry} website design`, description: d.proves },
  })),
};

export default function PortfolioPage() {
  return (
    <>
      <script {...jsonLd(orgSchema)} />
      <script {...jsonLd(faqSchema)} />
      <TrackView event="portfolio_view" />

      <Hero />

      {/* Sets the rule of the page before the catalogue. Only the middle line
          is a contrast: three negations in a row read as a formula rather than
          as an argument. */}
      <section className="border-b border-rule bg-ink py-10 text-paper sm:py-12">
        <div className="mx-auto grid max-w-[84rem] gap-8 px-5 sm:px-8 md:grid-cols-3 md:gap-10">
          {[
            [
              'Everything below is live',
              'Open a menu, submit a form, tap WhatsApp, run the EMI calculator. Nothing here is a picture of a website.',
            ],
            [
              'Sold as an outcome, not a page count',
              'A clinic buys appointments. A school buys admission enquiries. The website is how it happens.',
            ],
            [
              'You get your own website',
              'The closest one becomes the starting point. Your brand, services and photographs replace ours.',
            ],
          ].map(([title, body], i) => (
            <div key={title} className="flex gap-4">
              <span className="font-mono text-[0.68rem] leading-relaxed text-flame-lit">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h2 className="text-[0.98rem] font-medium">{title}</h2>
                <p className="mt-1.5 text-[0.9rem] leading-relaxed text-paper/58">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <DemoGallery />
      <WhyNotATemplate />
      <Capabilities />
      <Process />
      <MobileProof />
      <Pricing />
      <Faq />
      <ContactSection />
    </>
  );
}
