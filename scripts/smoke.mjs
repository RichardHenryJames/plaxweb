/**
 * Functional smoke test. Checks the things a screenshot cannot:
 * the demo badge opens, CTAs point somewhere real, WhatsApp deep links are
 * composed with the visitor's input, and the lead form validates.
 *
 * Usage: node scripts/smoke.mjs   (needs `npm run start` on :3000)
 */
import { chromium } from 'playwright';

const BASE = process.env.QA_BASE ?? 'http://localhost:3000';
const results = [];
const check = (name, ok, detail = '') => results.push({ name, ok, detail });

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();

/* ---------------------------------------------------- demo badge + routing */
await page.goto(`${BASE}/salon`, { waitUntil: 'networkidle' });
const badge = page.locator('[data-plax-demo-chrome]');
await badge.getByRole('button', { name: /PlaxWeb panel/ }).click();
const quote = badge.getByRole('link', { name: 'Get this for my business' });
check('demo badge opens', await quote.isVisible());
check('badge quote link carries demo + view', (await quote.getAttribute('href')) === '/contact?demo=salon&view=desktop');
check('badge sells the solution', (await badge.getByRole('dialog').innerText()).includes('Salon Booking Website'));
check('badge offers sibling demos', (await badge.getByRole('link').count()) >= 5);
await page.keyboard.press('Escape');

/* ------------------------------------------------ WhatsApp booking compose */
await page.locator('#aria-name').fill('Ananya Rao');
await page.locator('#aria-phone').fill('9876543210');
await page.getByRole('button', { name: '16:00' }).click();
const waHref = await page.getByRole('link', { name: /Send request on WhatsApp/i }).getAttribute('href');
check('salon booking builds a WhatsApp link', Boolean(waHref?.startsWith('https://wa.me/')));
check('…with the name filled in', decodeURIComponent(waHref ?? '').includes('Ananya Rao'));
check('…with the chosen slot', decodeURIComponent(waHref ?? '').includes('16:00'));

/* --------------------------------------------------- restaurant menu state */
await page.goto(`${BASE}/restaurant`, { waitUntil: 'networkidle' });
await page.getByRole('button', { name: 'Vegetarian only' }).click();
const nonVeg = await page.locator('[role="img"][aria-label="Non-vegetarian"]').count();
check('vegetarian filter removes non-veg dishes', nonVeg === 0, `${nonVeg} left`);

/* -------------------------------------------------------- EMI calculator */
await page.goto(`${BASE}/realestate`, { waitUntil: 'networkidle' });
const emiFigure = page.locator('#emi p').filter({ hasText: /^₹[\d,]+$/ }).first();
const emiBefore = (await emiFigure.textContent())?.trim();
await page.locator('#e-years').fill('10');
const emiAfter = (await emiFigure.textContent())?.trim();
check('EMI recalculates when tenure changes', Boolean(emiBefore) && emiBefore !== emiAfter, `${emiBefore} → ${emiAfter}`);

/* ------------------------------------------------------ boutique catalogue */
await page.goto(`${BASE}/boutique`, { waitUntil: 'networkidle' });
await page.getByRole('button', { name: /View The Aavani drape/i }).click();
const dialog = page.getByRole('dialog');
check('product detail opens', await dialog.isVisible());
const order = dialog.getByRole('link', { name: 'Order on WhatsApp' });
check('order link names the piece', decodeURIComponent((await order.getAttribute('href')) ?? '').includes('Aavani drape'));
await page.keyboard.press('Escape');
check('Escape closes the dialog', !(await dialog.isVisible().catch(() => false)));

/* --------------------------------------------------------------- lead form */
await page.goto(`${BASE}/contact?demo=travel`, { waitUntil: 'networkidle' });
const demoSelect = page.locator('select[name="referenceDemo"]');
check('contact page prefills the reference demo', (await demoSelect.inputValue()) === 'travel');
check('…and the matching category', (await page.locator('select[name="category"]').inputValue()) === 'Travel / Tours');

await page.locator('input[name="name"]').fill('A');
await page.locator('input[name="phone"]').fill('123');
await page.getByRole('button', { name: /Send enquiry/i }).click();
await page.waitForTimeout(1500);
check('server rejects invalid input', await page.getByText('Please check the highlighted fields.').isVisible());

await page.locator('input[name="name"]').fill('Deepa Sharma');
await page.locator('input[name="phone"]').fill('9876543210');
await page.waitForTimeout(1500);
await page.getByRole('button', { name: /Send enquiry/i }).click();
await page.waitForTimeout(2500);
check('valid submission succeeds', await page.getByRole('heading', { name: /Thanks/ }).isVisible());

/* ------------------------------------------------------------ sitemap etc */
for (const path of ['/sitemap.xml', '/robots.txt']) {
  const res = await page.request.get(`${BASE}${path}`);
  const body = await res.text();
  check(`${path} responds`, res.ok());
  // Home + ten service pages + contact. Demos are noindex and deliberately
  // absent: listing a noindexed URL in a sitemap is a contradiction.
  if (path === '/sitemap.xml') {
    const locs = body.match(/<loc>/g) ?? [];
    check('sitemap lists the twelve indexable pages', locs.length === 12);
    check('sitemap excludes the demos', !/<loc>[^<]*\/salon<\/loc>/.test(body));
  }
}

await browser.close();

let failed = 0;
for (const r of results) {
  if (!r.ok) failed++;
  console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.name}${r.detail ? '  — ' + r.detail : ''}`);
}
console.log(`\n${results.length - failed}/${results.length} passed`);
process.exitCode = failed ? 1 : 0;
