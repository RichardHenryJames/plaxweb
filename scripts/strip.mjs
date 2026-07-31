/**
 * Vertical contact sheet of one route.
 *
 * Full-page QA screenshots are too tall to judge; this cuts a page into
 * viewport-sized bands and lays them left-to-right so an entire scroll
 * experience can be read at a glance.
 *
 * Usage: node scripts/strip.mjs / 1440 [maxBands]
 */
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import sharp from 'sharp';

const BASE = process.env.QA_BASE ?? 'http://localhost:3000';
const route = process.argv[2] ?? '/';
const width = Number(process.argv[3] ?? 1440);
const maxBands = Number(process.argv[4] ?? 8);
const height = width < 700 ? 780 : 900;

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width, height },
  isMobile: width < 700,
  hasTouch: width < 700,
  deviceScaleFactor: 1,
});
const page = await ctx.newPage();
await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle', timeout: 90_000 });

// Force every scroll-reveal open so nothing is captured mid-animation.
await page.evaluate(() => {
  document.querySelectorAll('[data-reveal]').forEach((el) => el.setAttribute('data-reveal', 'in'));
});
await page.waitForTimeout(600);

const total = await page.evaluate(() => document.documentElement.scrollHeight);
const bands = Math.min(maxBands, Math.ceil(total / height));

const shots = [];
for (let i = 0; i < bands; i++) {
  const y = i * height;
  await page.evaluate((top) => window.scrollTo(0, top), y);
  await page.waitForTimeout(650);
  shots.push(await page.screenshot());
}
await browser.close();

const CELL_W = width < 700 ? 250 : 330;
const CELL_H = Math.round((CELL_W * height) / width);
const GAP = 8;
const LABEL = 18;

const composites = [];
for (let i = 0; i < shots.length; i++) {
  const left = GAP + i * (CELL_W + GAP);
  composites.push({
    input: await sharp(shots[i]).resize(CELL_W, CELL_H, { fit: 'cover', position: 'top' }).jpeg({ quality: 88 }).toBuffer(),
    left,
    top: GAP + LABEL,
  });
  composites.push({
    input: Buffer.from(
      `<svg width="${CELL_W}" height="${LABEL}"><rect width="100%" height="100%" fill="#111"/><text x="4" y="13" font-family="monospace" font-size="11" fill="#fff">${i * height}px</text></svg>`
    ),
    left,
    top: GAP,
  });
}

const name = `strip${route.replace(/\//g, '-') || '-home'}-${width}`;
const out = fileURLToPath(new URL(`../.imgqa/${name}.jpg`, import.meta.url));
await sharp({
  create: {
    width: shots.length * (CELL_W + GAP) + GAP,
    height: CELL_H + LABEL + GAP * 2,
    channels: 3,
    background: { r: 18, g: 18, b: 18 },
  },
})
  .composite(composites)
  .jpeg({ quality: 86 })
  .toFile(out);

console.log(`wrote .imgqa/${name}.jpg  (${bands} bands of ${total}px)`);
