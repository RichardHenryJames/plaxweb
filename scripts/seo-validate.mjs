/**
 * Validates the things a search engine and a social card reader actually
 * consume, against whatever host is deployed. Catches the failures that only
 * appear in production: a canonical pointing at the wrong host, an OG image
 * that 404s, structured data that does not parse.
 *
 * Usage: QA_BASE=https://www.plaxlabs.com node scripts/seo-validate.mjs
 */
import { chromium } from 'playwright';

const BASE = process.env.QA_BASE ?? 'http://localhost:3000';

// The pages that are meant to rank. Demos are noindex by design and are
// checked separately, since a missing description on a noindex page is not a
// defect.
const ROUTES = [
  '/',
  '/contact',
  '/restaurant-website-design',
  '/salon-website-design',
  '/dental-clinic-website-design',
  '/school-website-design',
  '/real-estate-website-design',
  '/travel-agency-website-design',
  '/gym-website-design',
  '/interior-design-website',
  '/hotel-website-design',
  '/boutique-website-design',
  '/goals/more-bookings',
  '/goals/more-enquiries',
  '/goals/sell-online',
  '/goals/better-leads',
  '/goals/direct-bookings',
  '/goals/build-trust',
  '/guides',
  '/guides/what-a-business-website-should-cost',
  '/guides/website-or-instagram',
  '/guides/getting-found-locally',
  '/guides/why-a-slow-website-costs-enquiries',
];

/** Demos must stay out of the index, or they compete with the pages above. */
const NOINDEX_ROUTES = [
  '/salon',
  '/restaurant',
  '/clinic',
  '/school',
  '/realestate',
  '/travel',
  '/fitness',
  '/interior',
  '/resort',
  '/boutique',
];

const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();

let failures = 0;

for (const route of ROUTES) {
  const res = await page.goto(`${BASE}${route}`, { waitUntil: 'domcontentloaded', timeout: 60_000 });

  const d = await page.evaluate(() => {
    const meta = (s) => document.querySelector(s)?.getAttribute('content') ?? '';
    const blocks = [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => {
      try {
        return JSON.parse(s.textContent);
      } catch (e) {
        return { __bad: e.message };
      }
    });
    return {
      title: document.title,
      desc: meta('meta[name="description"]'),
      canonical: document.querySelector('link[rel=canonical]')?.getAttribute('href') ?? '',
      ogImage: meta('meta[property="og:image"]'),
      ogTitle: meta('meta[property="og:title"]'),
      viewport: Boolean(document.querySelector('meta[name=viewport]')),
      h1: document.querySelectorAll('h1').length,
      robots: document.querySelector('meta[name=robots]')?.getAttribute('content') ?? '',
      blocks,
    };
  });

  const errs = [];
  if (res.status() !== 200) errs.push(`HTTP ${res.status()}`);
  if (!d.title) errs.push('no title');
  else if (d.title.length > 62) errs.push(`title ${d.title.length} chars`);
  if (!d.desc) errs.push('no description');
  else if (d.desc.length > 160) errs.push(`desc ${d.desc.length} chars`);
  if (!d.canonical.startsWith(BASE)) errs.push(`canonical ${d.canonical}`);
  if (!d.ogImage) errs.push('no og:image');
  if (!d.ogTitle) errs.push('no og:title');
  if (!d.viewport) errs.push('no viewport');
  if (d.h1 !== 1) errs.push(`${d.h1} h1 tags`);
  if (d.robots.includes('noindex')) errs.push('noindex on a page meant to rank');

  for (const b of d.blocks) {
    if (b.__bad) errs.push('JSON-LD does not parse');
    else if (!b['@context'] || !b['@type']) errs.push('JSON-LD missing @context/@type');
  }

  // A social card that 404s is worse than none: WhatsApp and LinkedIn show a
  // broken preview rather than falling back.
  if (d.ogImage) {
    const r = await page.request.get(d.ogImage).catch(() => null);
    if (!r || !r.ok()) errs.push(`og:image ${r ? r.status() : 'unreachable'}`);
  }

  const types = d.blocks.map((b) => b['@type']).filter(Boolean).join(', ') || 'none';
  if (errs.length) {
    failures++;
    console.log(`${route.padEnd(30)} FAIL  ${errs.join(' | ')}`);
  } else {
    console.log(`${route.padEnd(30)} ok    ${types}`);
  }
}

// The demos must stay noindex. If one slips back into the index it starts
// competing with the service page written to answer the same search.
for (const route of NOINDEX_ROUTES) {
  await page.goto(`${BASE}${route}`, { waitUntil: 'domcontentloaded', timeout: 60_000 });
  const robots = await page.evaluate(
    () => document.querySelector('meta[name=robots]')?.getAttribute('content') ?? ''
  );
  if (robots.includes('noindex')) {
    console.log(`${route.padEnd(30)} ok    noindex`);
  } else {
    failures++;
    console.log(`${route.padEnd(30)} FAIL  demo is indexable (robots: ${robots || 'none'})`);
  }
}

await browser.close();
const total = ROUTES.length + NOINDEX_ROUTES.length;
console.log(failures ? `\n${failures} page(s) with issues` : `\nall ${total} pages valid`);
