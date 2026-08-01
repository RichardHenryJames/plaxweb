/**
 * Walks the journey a real buyer takes, end to end, on desktop and on a phone:
 *
 *   / → find an industry → switch to the mobile preview → open the live
 *   demo → open the PlaxWeb panel → ask for the same thing → land on a contact
 *   page that already knows the solution and the device they liked → send it.
 *
 * Usage: node scripts/journey.mjs   (needs `npm run start` on :3000)
 */
import { chromium, devices } from 'playwright';

const BASE = process.env.QA_BASE ?? 'http://localhost:3000';
const results = [];
const check = (name, ok, detail = '') => results.push({ name, ok, detail });

const browser = await chromium.launch();

async function journey(label, contextOptions) {
  const ctx = await browser.newContext(contextOptions);
  const page = await ctx.newPage();
  const tag = (s) => `[${label}] ${s}`;

  // 1. Land and understand.
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  check(tag('hero states the offer'), (await page.locator('h1').innerText()).includes('real businesses'));
  check(tag('hero shows a real screenshot'), await page.locator('img[src*="previews"]').first().isVisible());

  // 2. Reach the catalogue and filter it.
  await page.getByRole('link', { name: /Explore websites/ }).click();
  await page.waitForTimeout(500);
  await page.evaluate(() => document.querySelectorAll('[data-reveal]').forEach((n) => n.setAttribute('data-reveal', 'in')));
  const beauty = page.getByRole('button', { name: /Health & Wellness/ });
  await beauty.click();
  await page.waitForTimeout(400);
  const shown = await page.locator('#demos article').count();
  check(tag('sector filter narrows the catalogue'), shown === 3, `${shown} shown`);

  // 3. The card sells an outcome, not a page count.
  const card = page.locator('#demos article').first();
  await card.scrollIntoViewIfNeeded();
  check(tag('card names a solution'), (await card.locator('h3').innerText()).includes('Website'));
  // Prices were removed from the journey on purpose. What the card must still
  // commit to is a delivery time.
  check(tag('card commits to a delivery time'), /\d\s*–\s*\d\s*weeks/.test(await card.innerText()));

  // 4. Switch to mobile preview.
  await card.getByRole('button', { name: 'Mobile' }).click();
  await page.waitForTimeout(700);
  const mobileShot = card.locator('img[src*="-mobile.webp"]');
  check(tag('mobile preview renders a phone shot'), await mobileShot.isVisible());
  const quoteHref = await card.getByRole('link', { name: /Get this for my business/ }).getAttribute('href');
  check(tag('CTA carries demo + view'), quoteHref?.includes('demo=salon') && quoteHref?.includes('view=mobile'), quoteHref ?? '');

  // 5. Open the live demo.
  await card.getByRole('link', { name: /Open the live/ }).click();
  await page.waitForURL('**/salon', { timeout: 20_000 });
  check(tag('live demo opens'), page.url().endsWith('/salon'));
  check(tag('demo looks like the business, not PlaxWeb'), (await page.locator('h1').innerText()).includes('Hair that behaves'));

  // 6. The badge is the sales layer for direct traffic.
  const badge = page.locator('[data-plax-demo-chrome]');
  await badge.getByRole('button', { name: /PlaxWeb panel/ }).click();
  const panel = badge.getByRole('dialog');
  check(tag('panel names the solution'), (await panel.innerText()).includes('Salon Booking Website'));
  check(tag('panel commits to a timeline'), (await panel.innerText()).includes('2–3 weeks'));
  check(tag('panel offers both device views'), await panel.getByRole('button', { name: 'Mobile' }).isVisible());

  // 7. Ask for it.
  await panel.getByRole('link', { name: /Get this for my business/ }).click();
  await page.waitForURL('**/contact**', { timeout: 20_000 });
  const body = await page.locator('main, body').first().innerText();
  check(tag('contact page recognises the solution'), body.includes('Salon Booking Website'));
  check(tag('contact page shows what they were looking at'), body.includes('You were looking at Maison Aria'));
  check(tag('reference prefilled'), (await page.locator('select[name="referenceDemo"]').inputValue()) === 'salon');
  check(tag('category prefilled'), (await page.locator('select[name="category"]').inputValue()) === 'Salon / Spa');

  // 8. Send it.
  await page.locator('input[name="name"]').fill('Meera Joshi');
  await page.locator('input[name="phone"]').fill('9876500011');
  await page.waitForTimeout(1600);
  await page.getByRole('button', { name: /Send enquiry/i }).click();
  await page.waitForTimeout(2500);
  check(tag('enquiry sends'), await page.getByRole('heading', { name: /Thanks/ }).isVisible());

  await ctx.close();
}

await journey('desktop', { viewport: { width: 1440, height: 900 } });
await journey('mobile', { ...devices['iPhone 13'] });

await browser.close();

let failed = 0;
for (const r of results) {
  if (!r.ok) failed++;
  console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.name}${r.detail ? '  — ' + r.detail : ''}`);
}
console.log(`\n${results.length - failed}/${results.length} passed`);
process.exitCode = failed ? 1 : 0;
