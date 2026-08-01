import type { Metadata } from 'next';
import { origin, site } from './site';
import type { DemoEntry } from './demos';

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
      locale: 'en_IN',
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
 * What PlaxWeb sells on this page, as opposed to what the demo depicts.
 *
 * Each demo already carries schema for its fictional business (Restaurant,
 * Dentist, School). That is accurate for the page's content but says nothing
 * about the service being offered, so a crawler could read the restaurant demo
 * as a restaurant rather than as restaurant web design. This runs alongside it
 * and states the actual offer, priced and located.
 *
 * Everything here is checkable on the page: the price is the published starting
 * price and the description is the solution's own outcome. No ratings, no
 * review counts, nothing we cannot stand behind.
 */
export function serviceSchema(demo: DemoEntry) {
  const s = demo.solution;
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${origin()}${site.basePath}/${demo.slug}#service`,
    name: s.name,
    serviceType: `${demo.industry} website design and development`,
    description: s.outcome,
    provider: {
      '@type': 'ProfessionalService',
      name: site.name,
      url: `${origin()}${site.home}`,
      parentOrganization: { '@type': 'Organization', name: site.parent },
    },
    areaServed: { '@type': 'Country', name: 'India' },
    audience: { '@type': 'BusinessAudience', audienceType: s.bestFor },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: s.priceFrom.replace(/[^0-9]/g, ''),
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'INR',
        minPrice: s.priceFrom.replace(/[^0-9]/g, ''),
        valueAddedTaxIncluded: false,
      },
      availability: 'https://schema.org/InStock',
      url: `${origin()}${site.basePath}/contact?demo=${demo.slug}`,
    },
  };
}

/** Where this page sits, so search results can show a path rather than a URL. */
export function breadcrumbSchema(demo: DemoEntry) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Website demos', item: `${origin()}${site.home}` },
      {
        '@type': 'ListItem',
        position: 2,
        name: demo.solution.name,
        item: `${origin()}${site.basePath}/${demo.slug}`,
      },
    ],
  };
}
