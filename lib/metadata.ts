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
