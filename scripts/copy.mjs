/**
 * Copy audit helper. Dumps the rendered text of a route and reports the tells
 * that make writing feel generated: em dashes, contrast formulas, and the
 * words this project leans on.
 *
 * Usage: node scripts/copy.mjs / before
 */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const BASE = process.env.QA_BASE ?? 'http://localhost:3000';
const route = process.argv[2] ?? '/';
const tag = process.argv[3] ?? 'now';

const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle', timeout: 90_000 });

const text = await page.evaluate(() => document.body.innerText);
const headings = await page.evaluate(() =>
  [...document.querySelectorAll('h1,h2')].map((h) => h.innerText.replace(/\s+/g, ' ').trim())
);
await browser.close();

const out = fileURLToPath(new URL(`../.imgqa/copy-${tag}.txt`, import.meta.url));
writeFileSync(out, `${headings.join('\n')}\n\n----\n\n${text}`);

const count = (re) => (text.match(re) || []).length;

console.log(`route ${route}  [${tag}]`);
console.log('  words        :', text.trim().split(/\s+/).length);
console.log('  em dashes    :', count(/—/g));
console.log('  ", not "     :', count(/, not /gi));
console.log('  "not just"   :', count(/not just/gi));
console.log('  "real"       :', count(/\breal\b/gi));
console.log('  "built"      :', count(/\bbuilt\b/gi));
console.log('  "designed"   :', count(/\bdesigned\b/gi));
console.log(`  headings (${headings.length}):`);
headings.forEach((h) => console.log('    ' + h));
