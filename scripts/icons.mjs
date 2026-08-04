/**
 * Builds the PlaxWeb app icons from the shared PlaxLabs mark.
 *
 * The source mark is white on transparent, which is correct inside the dark
 * news app and invisible everywhere else — dropped straight into a browser tab
 * it disappears against the light chrome. So only its silhouette is used: the
 * alpha channel becomes a mask, and the mark is drawn in paper on the studio's
 * flame, which reads at 16px on both light and dark tab bars.
 *
 * Run after changing the source: node scripts/icons.mjs
 */
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const SRC = 'C:/Users/parimalkumar/Desktop/Projects/plax/src/app/icon.png';
const FLAME = { r: 184, g: 57, b: 22 }; // --color-flame
const PAPER = { r: 244, g: 241, b: 234 }; // --color-paper

// A hard square reads as an unfinished screenshot next to the rounded tiles
// every other site ships. 22.5% is the ratio the platform masks use, so the
// corner matches what a browser would have cut anyway.
const ROUNDING = 0.225;

/** A rounded-square drawn in white, used as an alpha mask rather than as ink. */
function corners(size) {
  const r = size * ROUNDING;
  return Buffer.from(
    `<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${r}" ry="${r}" fill="#fff"/></svg>`,
  );
}

/** The mark, trimmed to its ink and redrawn in a single flat colour. */
async function mark(box, colour) {
  // The source is white on transparent, so the shape lives entirely in the
  // alpha channel. Pulled out on its own it becomes a greyscale mask.
  const { data, info } = await sharp(SRC)
    .ensureAlpha()
    .extractChannel('alpha')
    .trim({ threshold: 10 })
    // "inside" keeps the mark's proportions; it is noticeably taller than it
    // is wide, so forcing a square would squash it.
    .resize({ width: box, height: box, fit: 'inside' })
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Re-attaching the mask as an alpha channel is the step that matters. Left
  // as greyscale it would composite as a solid block, because a mask with no
  // alpha channel is opaque everywhere.
  const glyph = await sharp({
    create: { width: info.width, height: info.height, channels: 3, background: colour },
  })
    .joinChannel(data, { raw: { width: info.width, height: info.height, channels: 1 } })
    .png()
    .toBuffer();

  return { glyph, width: info.width, height: info.height };
}

async function icon(size, pad, rounded = true) {
  const box = Math.round(size * (1 - pad * 2));
  const { glyph, width, height } = await mark(box, PAPER);

  // Order matters: the mask has to land on a tile that already carries the
  // mark, otherwise the corners get painted back in by the glyph composite.
  const layers = [{ input: glyph, top: Math.round((size - height) / 2), left: Math.round((size - width) / 2) }];
  if (rounded) layers.push({ input: corners(size), blend: 'dest-in' });

  return sharp({
    create: { width: size, height: size, channels: 4, background: { ...FLAME, alpha: 1 } },
  })
    .composite(layers)
    .png()
    .toBuffer();
}

mkdirSync('app', { recursive: true });

// 22% padding: the mark is tall and narrow, so it needs less breathing room
// than a square logo would to read at the same optical size.
await sharp(await icon(512, 0.22)).toFile('app/icon.png');

// iOS masks the home-screen icon itself. Rounding it here too would clip a
// second time and leave dark slivers in the corners, so this one stays square.
await sharp(await icon(180, 0.2, false)).toFile('app/apple-icon.png');

// favicon.ico: a single 48px PNG payload, which every browser in use accepts
// and which stays sharp on a high-density tab bar.
const ico = await icon(48, 0.18);
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
header.writeUInt8(48, 6);
header.writeUInt8(48, 7);
header.writeUInt16LE(1, 10);
header.writeUInt16LE(32, 12);
header.writeUInt32LE(ico.length, 14);
header.writeUInt32LE(22, 18);
await import('node:fs').then((fs) => fs.writeFileSync('app/favicon.ico', Buffer.concat([header, ico])));

console.log('icon.png 512 · apple-icon.png 180 · favicon.ico 48');
