import type { MetadataRoute } from 'next';
import { services } from '@/lib/services';
import { goals } from '@/lib/goals';
import { guides } from '@/lib/guides';
import { origin, site } from '@/lib/site';

/**
 * Only pages that are meant to rank.
 *
 * The demos are deliberately absent. They are noindex — a fictional salon
 * cannot rank for salon website design and was competing with the page that
 * can — and listing a noindexed URL in a sitemap is a contradiction that
 * Search Console reports as an error.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = origin();
  const now = new Date();

  return [
    { url: `${base}${site.home}`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    ...services.map((s) => ({
      url: `${base}${site.basePath}/${s.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    // Below the industry pages on purpose. These convert someone who arrived
    // without the vocabulary; the industry pages are what gets searched.
    ...goals.map((g) => ({
      url: `${base}${site.basePath}/goals/${g.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    { url: `${base}${site.basePath}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    // Guides carry their own date, so the crawler is told when each one
    // actually changed rather than being told everything changed today.
    { url: `${base}${site.basePath}/guides`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
    ...guides.map((g) => ({
      url: `${base}${site.basePath}/guides/${g.slug}`,
      lastModified: new Date(g.updated),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ];
}
