/**
 * Composites one capture per route into a single review sheet.
 * Usage: node scripts/sheet.mjs 390
 */
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const width = process.argv[2] ?? '390';
const names = [
  'home',
  'contact',
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

const W = Number(width) < 700 ? 200 : 300;
const H = Number(width) < 700 ? 440 : 210;
const GAP = 8;
const LABEL = 22;
const COLS = 6;

const p = (f) => fileURLToPath(new URL(`../.imgqa/${f}`, import.meta.url));
const label = (t) =>
  Buffer.from(
    `<svg width="${W}" height="${LABEL}"><rect width="100%" height="100%" fill="#111"/><text x="4" y="16" font-family="monospace" font-size="13" fill="#fff">${t}</text></svg>`
  );

const comps = [];
for (let i = 0; i < names.length; i++) {
  const col = i % COLS;
  const row = Math.floor(i / COLS);
  const left = GAP + col * (W + GAP);
  const top = GAP + row * (H + LABEL + GAP);
  const buf = await sharp(p(`${names[i]}-${width}.png`))
    .resize(W, H, { fit: 'cover', position: 'top' })
    .jpeg({ quality: 78 })
    .toBuffer();
  comps.push({ input: buf, left, top });
  comps.push({ input: label(`${names[i]} @${width}`), left, top: top + H });
}

const rows = Math.ceil(names.length / COLS);
await sharp({
  create: {
    width: COLS * (W + GAP) + GAP,
    height: rows * (H + LABEL + GAP) + GAP,
    channels: 3,
    background: { r: 24, g: 24, b: 24 },
  },
})
  .composite(comps)
  .jpeg({ quality: 80 })
  .toFile(p(`review-${width}.jpg`));

console.log(`wrote .imgqa/review-${width}.jpg`);
