/**
 * Copies the flag SVGs we actually use out of node_modules and into public/.
 *
 * Self-hosted rather than loaded from a flag CDN: an enquiry form should not
 * depend on a third party being reachable, and it should not tell anyone else
 * that this visitor is filling it in.
 *
 * Run after changing the country list: node scripts/flags.mjs
 */
import { mkdirSync, copyFileSync, existsSync, readdirSync, readFileSync, rmSync, statSync } from 'node:fs';
import { join } from 'node:path';

const SRC = 'node_modules/country-flag-icons/3x2';
const OUT = 'public/flags';

// Read the ISO codes straight out of the source rather than importing it:
// lib/countries.ts is TypeScript and this script should not need a loader.
const source = readFileSync('lib/countries.ts', 'utf8');
const isos = [...source.matchAll(/^\s*\['([A-Z]{2})',/gm)].map((m) => m[1]);

if (!existsSync(SRC)) {
  console.error(`Missing ${SRC}. Run: npm i -D country-flag-icons`);
  process.exit(1);
}

if (existsSync(OUT)) rmSync(OUT, { recursive: true });
mkdirSync(OUT, { recursive: true });

const missing = [];
let bytes = 0;

for (const iso of isos) {
  const from = join(SRC, `${iso}.svg`);
  if (!existsSync(from)) {
    missing.push(iso);
    continue;
  }
  const to = join(OUT, `${iso.toLowerCase()}.svg`);
  copyFileSync(from, to);
  bytes += statSync(to).size;
}

console.log(`${readdirSync(OUT).length} flags, ${(bytes / 1024).toFixed(0)} kB total`);
if (missing.length) console.warn(`No flag for: ${missing.join(', ')}`);
