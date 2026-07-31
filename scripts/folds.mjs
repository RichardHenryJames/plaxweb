/**
 * The ten-second test.
 *
 * Captures only the first screen of every demo and lays them out side by side,
 * because that is what a visitor actually judges. Anything that looks empty,
 * text-only or unfinished here is a real problem regardless of how good the
 * rest of the page is.
 *
 * Usage: node scripts/folds.mjs 1440   (needs `npm run start` on :3000)
 */
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import sharp from 'sharp';

const BASE = process.env.QA_BASE ?? 'http://localhost:3000';
const width = Number(process.argv[2] ?? 1440);
const height = width < 700 ? 780 : 900;

const SLUGS = [
  'salon',
  'restaurant',
  'clinic',
  'school',
  'realestate',
  'travel',
  'fitness',
  'interior',
  'resort',
  'boutique',
];

const browser = await chromium.launch();
const shots = [];

for (const slug of SLUGS) {
  const ctx = await browser.newContext({
    viewport: { width, height },
    isMobile: width < 700,
    hasTouch: width < 700,
    reducedMotion: 'reduce',
  });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/${slug}`, { waitUntil: 'networkidle', timeout: 60_000 });
  await page.waitForTimeout(700);
  shots.push({ slug, buf: await page.screenshot() });
  await ctx.close();
}

await browser.close();

const COLS = width < 700 ? 5 : 3;
const CELL_W = width < 700 ? 220 : 420;
const CELL_H = Math.round((CELL_W * height) / width);
const LABEL = 20;
const GAP = 6;
const rows = Math.ceil(shots.length / COLS);

const composites = [];
for (let i = 0; i < shots.length; i++) {
  const col = i % COLS;
  const row = Math.floor(i / COLS);
  const left = GAP + col * (CELL_W + GAP);
  const top = GAP + row * (CELL_H + LABEL + GAP);
  composites.push({
    input: await sharp(shots[i].buf).resize(CELL_W, CELL_H, { fit: 'cover', position: 'top' }).jpeg({ quality: 80 }).toBuffer(),
    left,
    top,
  });
  composites.push({
    input: Buffer.from(
      `<svg width="${CELL_W}" height="${LABEL}"><rect width="100%" height="100%" fill="#111"/><text x="4" y="15" font-family="monospace" font-size="12" fill="#fff">${shots[i].slug} @${width}</text></svg>`
    ),
    left,
    top: top + CELL_H,
  });
}

const out = fileURLToPath(new URL(`../.imgqa/folds-${width}.jpg`, import.meta.url));
await sharp({
  create: {
    width: COLS * (CELL_W + GAP) + GAP,
    height: rows * (CELL_H + LABEL + GAP) + GAP,
    channels: 3,
    background: { r: 18, g: 18, b: 18 },
  },
})
  .composite(composites)
  .jpeg({ quality: 82 })
  .toFile(out);

console.log(`wrote .imgqa/folds-${width}.jpg`);
