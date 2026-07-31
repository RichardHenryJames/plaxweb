/**
 * Builds labelled contact sheets so photography can be reviewed visually
 * before it is committed to lib/images.ts.
 *
 * Usage: npm run images:sheet            (all themes)
 *        npm run images:sheet salon-hair (single theme)
 *
 * Output: .imgqa/<theme>.jpg
 */
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import sharp from 'sharp';

const UA = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/126.0 Safari/537.36' };

const CELL_W = 300;
const CELL_H = 200;
const LABEL_H = 22;
const COLS = 4;
const GAP = 6;

const verified = JSON.parse(await readFile(new URL('./.verified.json', import.meta.url), 'utf8'));
const only = process.argv.slice(2);
const themes = only.length ? only : Object.keys(verified);

await mkdir(new URL('../.imgqa/', import.meta.url), { recursive: true });

function escapeXml(s) {
  return s.replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c]);
}

for (const theme of themes) {
  const ids = verified[theme] ?? [];
  if (!ids.length) {
    console.log(`skip ${theme} (no verified ids)`);
    continue;
  }
  const rows = Math.ceil(ids.length / COLS);
  const sheetW = COLS * CELL_W + (COLS + 1) * GAP;
  const sheetH = rows * (CELL_H + LABEL_H) + (rows + 1) * GAP + 30;

  const composites = [];
  composites.push({
    input: Buffer.from(
      `<svg width="${sheetW}" height="30"><rect width="${sheetW}" height="30" fill="#111"/>` +
        `<text x="8" y="20" font-family="monospace" font-size="16" fill="#8f8">${escapeXml(theme)} — ${ids.length} images</text></svg>`
    ),
    top: 0,
    left: 0,
  });

  for (let i = 0; i < ids.length; i++) {
    const col = i % COLS;
    const row = Math.floor(i / COLS);
    const left = GAP + col * (CELL_W + GAP);
    const top = 30 + GAP + row * (CELL_H + LABEL_H + GAP);
    const url = `https://images.unsplash.com/${ids[i]}?w=${CELL_W * 2}&h=${CELL_H * 2}&fit=crop&q=65&fm=jpg`;
    try {
      const res = await fetch(url, { headers: UA });
      const buf = Buffer.from(await res.arrayBuffer());
      const thumb = await sharp(buf).resize(CELL_W, CELL_H, { fit: 'cover' }).jpeg({ quality: 72 }).toBuffer();
      composites.push({ input: thumb, top, left });
    } catch {
      composites.push({
        input: Buffer.from(`<svg width="${CELL_W}" height="${CELL_H}"><rect width="100%" height="100%" fill="#400"/></svg>`),
        top,
        left,
      });
    }
    composites.push({
      input: Buffer.from(
        `<svg width="${CELL_W}" height="${LABEL_H}"><rect width="100%" height="100%" fill="#111"/>` +
          `<text x="4" y="16" font-family="monospace" font-size="13" fill="#fff">[${i}] ${escapeXml(ids[i].replace('photo-', ''))}</text></svg>`
      ),
      top: top + CELL_H,
      left,
    });
  }

  const out = await sharp({
    create: { width: sheetW, height: sheetH, channels: 3, background: { r: 24, g: 24, b: 24 } },
  })
    .composite(composites)
    .jpeg({ quality: 76 })
    .toBuffer();

  const path = new URL(`../.imgqa/${theme}.jpg`, import.meta.url);
  await writeFile(path, out);
  console.log(`wrote .imgqa/${theme}.jpg (${ids.length} images, ${sheetW}x${sheetH})`);
}
