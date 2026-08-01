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

/* ------------------------------------------------------- phone country code */
const dialBtn = page.getByRole('button', { name: /^Country code:/ });
check('phone field offers a country picker', await dialBtn.isVisible());
check('picker shows a real flag image', await page.locator('button[aria-haspopup="listbox"] img').isVisible());
check(
  'flag svg is served, not hotlinked',
  (await page.request.get(`${BASE}/flags/in.svg`)).ok()
);

// Search is the reason this is not a native select: 182 countries is too many
// to scroll on a phone.
await dialBtn.click();
await page.getByRole('textbox', { name: 'Search countries' }).fill('971');
const uae = page.getByRole('option', { name: /United Arab Emirates/ });
check('search finds a country by dialling code', await uae.isVisible());
await uae.click();
check('prefix follows the country', await page.getByRole('button', { name: /United Arab Emirates, plus 971/ }).isVisible());

await page.locator('input[name="phone"]').fill('501234567');
await page.getByRole('button', { name: /Send enquiry/i }).click();
await page.waitForTimeout(1200);
check('a nine-digit UAE number is accepted', !(await page.getByText(/numbers are 10 digits/).isVisible()));

await dialBtn.click();
await page.getByRole('textbox', { name: 'Search countries' }).fill('India');
await page.getByRole('option', { name: /India/ }).first().click();
await page.locator('input[name="phone"]').fill('98765');
await page.getByRole('button', { name: /Send enquiry/i }).click();
await page.waitForTimeout(1500);
check('a short Indian number is caught', await page.getByText(/India numbers are 10 digits/).isVisible());

// Email is required so that every enquirer gets an acknowledgement. If this
// ever silently becomes optional again, people submit into silence.
await page.locator('input[name="name"]').fill('Deepa Sharma');
await page.locator('input[name="phone"]').fill('9876543210');
await page.locator('input[name="email"]').fill('');
await page.getByRole('button', { name: /Send enquiry/i }).click();
await page.waitForTimeout(1500);
check('email is required', await page.getByText(/Enter an email so we can send you a copy/).isVisible());

/**
 * A successful submission is a real enquiry: it writes a row and emails the
 * inbox. Running this suite against production put three "Deepa Sharma" leads
 * in the table before anyone noticed, so the happy path is local-only. Every
 * check above rejects, and rejections persist nothing.
 */
const LOCAL = /^https?:\/\/(localhost|127\.0\.0\.1)(:|\/|$)/.test(BASE);
if (LOCAL) {
  await page.locator('input[name="name"]').fill('Deepa Sharma');
  await page.locator('input[name="phone"]').fill('9876543210');
  await page.locator('input[name="email"]').fill('deepa@example.com');
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: /Send enquiry/i }).click();
  await page.waitForTimeout(2500);
  check('valid submission succeeds', await page.getByRole('heading', { name: /Thanks/ }).isVisible());

  // The free path: the enquirer opens the conversation, which makes every
  // reply for the next 24 hours cost nothing. It only works if the link
  // arrives pre-written, so this asserts the context is actually in it.
  const wa = await page.getByRole('link', { name: /Continue on WhatsApp/ }).getAttribute('href');
  const text = decodeURIComponent(wa ?? '');
  check('WhatsApp hand-off is pre-filled with the enquirer', text.includes('Deepa Sharma'));
  check('…and with what they asked about', /travel/i.test(text));
} else {
  console.log('SKIP  valid submission — would write a real lead to a live inbox');
}

/* ------------------------------------------------------------ dialability */
// A tel: link built from a display number rather than the raw one produces
// "tel:++91 80 4123 7788", which silently does nothing when tapped. That
// shipped on the salon demo, so every page is checked now.
{
  const routes = ['/', '/contact', '/salon', '/restaurant', '/clinic', '/school',
    '/realestate', '/travel', '/fitness', '/interior', '/resort', '/boutique'];
  const bad = [];
  for (const r of routes) {
    await page.goto(`${BASE}${r}`, { waitUntil: 'domcontentloaded' });
    const hrefs = await page
      .locator('a[href^="tel:"], a[href*="wa.me"]')
      .evaluateAll((els) => els.map((e) => e.getAttribute('href')));
    for (const h of hrefs) {
      const ok = h.startsWith('tel:')
        ? /^tel:\+[0-9]+$/.test(h)
        : /^https:\/\/wa\.me\/[0-9]+(\?|$)/.test(h);
      if (!ok) bad.push(`${r} ${h.split('?')[0]}`);
    }
  }
  check('every tel: and wa.me link is dialable', bad.length === 0, bad.join(' | '));
}

/* ------------------------------------------------------------ sitemap etc */
{
  const res = await page.request.get(`${BASE}/api/geo`);
  const body = await res.json().catch(() => ({}));
  check('/api/geo returns a country code', res.ok() && /^[A-Z]{2}$/.test(body.country ?? ''));
  check('/api/geo is not shared-cached', (res.headers()['cache-control'] ?? '').includes('no-store'));
}

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
