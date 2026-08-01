/**
 * SEO surface audit. Pulls the things a search engine actually reads from
 * every route and lays them out so cannibalisation and weak targeting are
 * visible at a glance.
 *
 * Usage: node scripts/seo.mjs   (needs `npm run start` on :3000)
 */
import { chromium } from 'playwright';

const BASE = process.env.QA_BASE ?? 'http://localhost:3000';
const ROUTES = [
  '/',
  '/contact',
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
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

const rows = [];
for (const route of ROUTES) {
  await page.goto(`${BASE}${route}`, { waitUntil: 'domcontentloaded', timeout: 60_000 });
  rows.push(
    await page.evaluate(() => {
      const meta = (sel) => document.querySelector(sel)?.getAttribute('content') ?? '';
      const schema = [...document.querySelectorAll('script[type="application/ld+json"]')].flatMap((s) => {
        try {
          const j = JSON.parse(s.textContent);
          return (Array.isArray(j) ? j : [j]).map((x) => x['@type']).filter(Boolean);
        } catch {
          return [];
        }
      });
      return {
        title: document.title,
        desc: meta('meta[name="description"]'),
        canonical: document.querySelector('link[rel=canonical]')?.getAttribute('href') ?? '',
        h1: [...document.querySelectorAll('h1')].map((h) => h.innerText.replace(/\s+/g, ' ').trim()),
        h2: [...document.querySelectorAll('h2')].length,
        schema,
        // Links to other pages on this site, which is how topical support is signalled.
        internal: [...document.querySelectorAll('a[href^="/"]')]
          .map((a) => a.getAttribute('href').split('#')[0].split('?')[0])
          .filter((h) => h && h !== '/'),
      };
    })
  );
}
await browser.close();

ROUTES.forEach((route, i) => {
  const r = rows[i];
  const out = [...new Set(r.internal)].filter((h) => h !== route);
  console.log(`\n${route}`);
  console.log(`  title  (${r.title.length}) ${r.title}`);
  console.log(`  desc   (${r.desc.length}) ${r.desc.slice(0, 110)}`);
  console.log(`  h1     ${r.h1.join(' | ')}`);
  console.log(`  h2     ${r.h2}   schema: ${r.schema.join(', ') || 'none'}`);
  console.log(`  out    ${out.length ? out.join(' ') : 'none'}`);
});

// Cannibalisation: the same leading phrase across titles means two pages are
// asking to rank for one thing.
const words = {};
rows.forEach((r, i) => {
  r.title
    .toLowerCase()
    .replace(/[^a-z ]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 3)
    .forEach((w) => ((words[w] ??= new Set()).add(ROUTES[i])));
});
console.log('\n--- title words shared by 4+ pages (cannibalisation risk):');
Object.entries(words)
  .filter(([, s]) => s.size >= 4)
  .sort((a, b) => b[1].size - a[1].size)
  .forEach(([w, s]) => console.log(`  ${w.padEnd(14)} ${s.size} pages`));
