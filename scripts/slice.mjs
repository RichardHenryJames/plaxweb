/**
 * Slices a tall full-page screenshot into readable review tiles.
 * Usage: node scripts/slice.mjs salon-1440-full 3
 */
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const [nameArg, partsArg] = process.argv.slice(2);
const name = nameArg;
const parts = Number(partsArg ?? 3);
const src = fileURLToPath(new URL(`../.imgqa/${name}.png`, import.meta.url));

const meta = await sharp(src).metadata();
const sliceH = Math.ceil(meta.height / parts);
const targetW = 900;

for (let i = 0; i < parts; i++) {
  const top = i * sliceH;
  const height = Math.min(sliceH, meta.height - top);
  const out = fileURLToPath(new URL(`../.imgqa/${name}-p${i + 1}.jpg`, import.meta.url));
  await sharp(src)
    .extract({ left: 0, top, width: meta.width, height })
    .resize({ width: targetW })
    .jpeg({ quality: 74 })
    .toFile(out);
  console.log(`${name}-p${i + 1}.jpg  ${targetW}x${Math.round((height * targetW) / meta.width)}`);
}
