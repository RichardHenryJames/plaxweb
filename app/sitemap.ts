import type { MetadataRoute } from 'next';
import { demos } from '@/lib/demos';
import { origin, site } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = origin();
  const now = new Date();

  return [
    { url: `${base}${site.basePath}`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}${site.basePath}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    ...demos
      .filter((d) => d.status === 'live')
      .map((d) => ({
        url: `${base}${site.basePath}/${d.slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })),
  ];
}
