/**
 * Verifies every candidate photo id resolves on the Unsplash CDN.
 * Writes scripts/.verified.json used by contact-sheet.mjs.
 *
 * Usage: npm run images:verify
 */
import { writeFile } from 'node:fs/promises';
import { POOLS as BASE } from './candidates.mjs';
import { POOLS_IN } from './candidates-in.mjs';

const POOLS = { ...BASE, ...POOLS_IN };
const UA = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/126.0 Safari/537.36' };
const CONCURRENCY = 12;

async function check(id) {
  const url = `https://images.unsplash.com/${id}?w=200&q=45&fm=jpg`;
  try {
    const r = await fetch(url, { headers: UA });
    if (!r.ok) return { id, ok: false, status: r.status };
    const buf = await r.arrayBuffer();
    return { id, ok: buf.byteLength > 1200, status: r.status, bytes: buf.byteLength };
  } catch (e) {
    return { id, ok: false, status: 'ERR', error: e.message };
  }
}

async function pool(items, worker) {
  const out = [];
  let i = 0;
  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      while (i < items.length) out.push(await worker(items[i++]));
    })
  );
  return out;
}

const all = [...new Set(Object.values(POOLS).flat())];
console.log(`Checking ${all.length} unique candidates…`);
const results = await pool(all, check);
const okSet = new Set(results.filter((r) => r.ok).map((r) => r.id));

const verified = {};
for (const [theme, ids] of Object.entries(POOLS)) {
  verified[theme] = [...new Set(ids)].filter((id) => okSet.has(id));
  const dead = [...new Set(ids)].filter((id) => !okSet.has(id));
  console.log(
    `${theme.padEnd(22)} ${String(verified[theme].length).padStart(3)}/${String(new Set(ids).size).padStart(3)} ok` +
      (dead.length ? `   dead: ${dead.join(' ')}` : '')
  );
}

await writeFile(new URL('./.verified.json', import.meta.url), JSON.stringify(verified, null, 2));
console.log(`\nTotal live: ${okSet.size}/${all.length}. Wrote scripts/.verified.json`);
