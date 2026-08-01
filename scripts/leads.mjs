/**
 * Prints the enquiries stored in Supabase.
 *
 * Credentials are read from the environment, or from an env file passed with
 * --env, so nothing secret lives in this file or in the repository.
 *
 *   node scripts/leads.mjs --env ../../Desktop/Projects/plax/.env.local
 *   node scripts/leads.mjs --all        include rows submitted by the suites
 */
import { readFileSync } from 'node:fs';
import { createClient } from '@supabase/supabase-js';

const args = process.argv.slice(2);
const envPath = args.includes('--env') ? args[args.indexOf('--env') + 1] : null;
const showAll = args.includes('--all');

const fromFile = envPath
  ? Object.fromEntries(
      readFileSync(envPath, 'utf8')
        .split(/\r?\n/)
        .filter((l) => /^\s*[A-Z0-9_]+\s*=/.test(l))
        .map((l) => {
          const i = l.indexOf('=');
          return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^["']|["']$/g, '')];
        })
    )
  : {};

const env = { ...fromFile, ...process.env };
const url = env.SUPABASE_URL ?? env.NEXT_PUBLIC_SUPABASE_URL;
const key = env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error('Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY, or pass --env <file>.');
  process.exit(1);
}

const db = createClient(url, key, { auth: { persistSession: false } });

const { data, error } = await db.from('plaxweb_leads').select('*').order('created_at', { ascending: false });

if (error) {
  console.error('Query failed:', error.message);
  process.exit(1);
}

/**
 * Rows the test suites created, so a real enquiry is never buried under them.
 * The suites no longer submit against production, but the rows they wrote
 * before that guard existed are still in the table.
 */
const isTest = (r) =>
  /test lead|email test/i.test(r.name ?? '') ||
  ['Deepa Sharma', 'Meera Joshi'].includes(r.name) ||
  /^\+?910000000/.test(r.phone ?? '');

const rows = showAll ? data : data.filter((r) => !isTest(r));
const hidden = data.length - rows.length;

console.log(
  `${rows.length} enquir${rows.length === 1 ? 'y' : 'ies'}` +
    (hidden ? `   (${hidden} test row${hidden === 1 ? '' : 's'} hidden, use --all)` : '') +
    '\n'
);

for (const r of rows) {
  console.log('─'.repeat(64));
  for (const [k, v] of Object.entries(r)) {
    if (v !== null && v !== '') console.log(`${k.padEnd(16)}: ${v}`);
  }
}
