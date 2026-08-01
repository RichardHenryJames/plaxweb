import type { Metadata } from 'next';
import { origin, site } from './site';
import { solutions } from './solutions';
import type { DemoEntry } from './demos';
import type { Service, ServiceFaq } from './services';

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  /** Absolute or CDN image URL for the social card. */
  image?: string;
  noIndex?: boolean;
};

export function pageMetadata({ title, description, path, image, noIndex }: PageMetaInput): Metadata {
  const url = `${origin()}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      siteName: `${site.name} · ${site.parent}`,
      locale: 'en',
      images: image ? [{ url: image, width: 1200, height: 630, alt: title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export function demoMetadata(demo: DemoEntry): Metadata {
  return pageMetadata({
    title: demo.metaTitle,
    description: demo.metaDescription,
    path: `${site.basePath}/${demo.slug}`,
    // The social card shows the actual website, not a stock photo.
    image: demo.preview ? `${origin()}${demo.preview.desktop.src}` : demo.cover.src,
    // A demo is a fictional salon or restaurant. Whatever the title tag says,
    // its content reads to a crawler as that business rather than as web
    // design, so it was competing with — and undermining — the service page
    // that is actually written to answer the search. It stays crawlable so it
    // still passes authority and can be shared, but it no longer competes.
    noIndex: true,
  });
}

/** JSON-LD helper — returns the props for a <script type="application/ld+json">. */
export function jsonLd(data: Record<string, unknown>) {
  return {
    type: 'application/ld+json',
    // Escaping "<" prevents a crafted string from closing the script tag.
    dangerouslySetInnerHTML: { __html: JSON.stringify(data).replace(/</g, '\\u003c') },
  };
}

/**
 * What PlaxWeb sells on this page.
 *
 * This now hangs off the service page rather than the demo. The demo depicts a
 * fictional salon; the service page is the thing being sold, so that is where
 * the Service markup belongs and where it will not contradict the content
 * around it.
 *
 * No price. Quotes are made against a written scope, so any figure here would
 * either be a guess or a number the page itself does not show — and structured
 * data that disagrees with the visible page is worse than none.
 */
export function serviceSchema(service: Service) {
  const s = solutions[service.demo];
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${origin()}${site.basePath}/${service.slug}#service`,
    name: s.name,
    serviceType: service.primary,
    description: service.description,
    provider: {
      '@type': 'ProfessionalService',
      '@id': `${origin()}${site.basePath}#plaxweb`,
      name: site.name,
      url: `${origin()}${site.home}`,
      parentOrganization: { '@type': 'Organization', name: site.parent },
    },
    areaServed: { '@type': 'Place', name: 'Worldwide' },
    audience: { '@type': 'BusinessAudience', audienceType: s.bestFor },
    termsOfService: `${origin()}${site.basePath}/${service.slug}#included`,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceSpecification: {
        '@type': 'PriceSpecification',
        // Truthful and deliberate: the price is set per project against scope.
        description: 'Quoted individually against a written scope. Fixed price agreed before work begins.',
      },
      url: `${origin()}${site.basePath}/contact?demo=${service.demo}`,
    },
  };
}

/** Where this page sits, so search results can show a path rather than a URL. */
export function serviceBreadcrumb(service: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Website development', item: `${origin()}${site.home}` },
      {
        '@type': 'ListItem',
        position: 2,
        name: service.h1,
        item: `${origin()}${site.basePath}/${service.slug}`,
      },
    ],
  };
}

/** Shared so the home page and every service page mark FAQs up the same way. */
export function faqSchema(faqs: ServiceFaq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
