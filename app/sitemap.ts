import type { MetadataRoute } from 'next';
import { services } from '@/lib/services';
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
    { url: `${base}${site.basePath}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ];
}
