import type { MetadataRoute } from 'next';
import { origin } from '@/lib/site';

/**
 * This app owns the domain root, so this is the only robots.txt crawlers will
 * read — it has to speak for the news zone at /news as well. The news app
 * serves its own copy at /news/robots.txt, which crawlers ignore.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Auth callback and write endpoints in the news zone have no SEO value.
        disallow: ['/news/auth/', '/news/api/'],
      },
    ],
    sitemap: [
      `${origin()}/sitemap.xml`,
      `${origin()}/news/sitemap.xml`,
      `${origin()}/news/news-sitemap.xml`,
    ],
    host: origin(),
  };
}
