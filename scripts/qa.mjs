/**
 * Visual QA harness.
 *
 * Captures every route at the breakpoints in the brief and writes them to
 * .imgqa/. Also reports horizontal overflow, which is the single most common
 * responsive defect.
 *
 * Usage:
 *   node scripts/qa.mjs                     all routes, all widths
 *   node scripts/qa.mjs salon               one route
 *   node scripts/qa.mjs salon 390           one route, one width
 *   node scripts/qa.mjs --full salon        full-page capture instead of fold
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const BASE = process.env.QA_BASE ?? 'http://localhost:3000';
const WIDTHS = [375, 390, 430, 768, 1024, 1440, 1920];

const ROUTES = {
  home: '/',
  contact: '/contact',
  salon: '/salon',
  restaurant: '/restaurant',
  clinic: '/clinic',
  school: '/school',
  realestate: '/realestate',
  travel: '/travel',
  fitness: '/fitness',
  interior: '/interior',
  resort: '/resort',
  boutique: '/boutique',
  'svc-restaurant': '/restaurant-website-design',
  'svc-salon': '/salon-website-design',
  'svc-clinic': '/dental-clinic-website-design',
  'svc-school': '/school-website-design',
  'svc-realestate': '/real-estate-website-design',
  'svc-travel': '/travel-agency-website-design',
  'svc-fitness': '/gym-website-design',
  'svc-interior': '/interior-design-website',
  'svc-resort': '/hotel-website-design',
  'svc-boutique': '/boutique-website-design',
  'goal-bookings': '/goals/more-bookings',
  'goal-leads': '/goals/better-leads',
  'goal-trust': '/goals/build-trust',
};

const args = process.argv.slice(2);
const full = args.includes('--full');
const rest = args.filter((a) => !a.startsWith('--'));
const routeArgs = rest.filter((a) => Number.isNaN(Number(a)));
const widthArgs = rest.filter((a) => !Number.isNaN(Number(a))).map(Number);

const routes = routeArgs.length ? Object.fromEntries(routeArgs.map((r) => [r, ROUTES[r] ?? `/${r}`])) : ROUTES;
const widths = widthArgs.length ? widthArgs : WIDTHS;

await mkdir(new URL('../.imgqa/', import.meta.url), { recursive: true });

const browser = await chromium.launch();
const problems = [];

for (const [name, path] of Object.entries(routes)) {
  for (const width of widths) {
    const ctx = await browser.newContext({
      viewport: { width, height: width < 700 ? 860 : 1000 },
      deviceScaleFactor: 1,
      isMobile: width < 700,
      hasTouch: width < 700,
    });
    const page = await ctx.newPage();
    const consoleErrors = [];
    page.on('console', (m) => {
      if (m.type() !== 'error') return;
      const text = m.text();
      // Network failures are reported with their URL by the response handler
      // below; Vercel Analytics only exists once deployed.
      if (text.includes('Failed to load resource')) return;
      if (text.includes('_vercel/insights')) return;
      consoleErrors.push(text.slice(0, 160));
    });
    page.on('response', (r) => {
      if (r.status() >= 400 && !r.url().includes('_vercel/insights')) {
        consoleErrors.push(`${r.status()} ${r.url()}`);
      }
    });

    await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle', timeout: 60_000 });

    if (full) {
      // Force every reveal open and settle lazy images before a long capture.
      await page.evaluate(async () => {
        document.querySelectorAll('[data-reveal]').forEach((n) => n.setAttribute('data-reveal', 'in'));
        const step = window.innerHeight * 0.8;
        for (let y = 0; y < document.body.scrollHeight; y += step) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 90));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(1200);
    } else {
      await page.waitForTimeout(500);
    }

    const audit = await page.evaluate(() => {
      const docW = document.documentElement.clientWidth;
      const overflowing = [];
      // An element inside a scroll container is meant to be wider than the
      // viewport — only report things that actually push the document.
      const clipped = (el) => {
        let n = el.parentElement;
        while (n && n !== document.body) {
          if (/auto|scroll|hidden|clip/.test(getComputedStyle(n).overflowX)) return true;
          n = n.parentElement;
        }
        return false;
      };
      document.querySelectorAll('body *').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) return;
        if (r.right > docW + 1.5 || r.left < -1.5) {
          const cs = getComputedStyle(el);
          if (cs.position === 'fixed') return;
          if (clipped(el)) return;
          overflowing.push(
            `${el.tagName.toLowerCase()}${el.className && typeof el.className === 'string' ? '.' + el.className.split(' ').slice(0, 3).join('.') : ''} → ${Math.round(r.left)}..${Math.round(r.right)}`
          );
        }
      });
      return {
        scrollW: document.documentElement.scrollWidth,
        clientW: docW,
        overflowing: overflowing.slice(0, 6),
        h1: document.querySelectorAll('h1').length,
        imgNoAlt: Array.from(document.images).filter((i) => !i.alt && i.getAttribute('alt') === null).length,
        // A custom face must actually win on the main heading. Falling back to
        // the system stack means a token or a font import is broken.
        h1Font: document.querySelector('h1') ? getComputedStyle(document.querySelector('h1')).fontFamily.split(',')[0].replace(/"/g, '') : '',
      };
    });

    if (audit.scrollW > audit.clientW + 1) {
      problems.push(`${name}@${width}: horizontal overflow (${audit.scrollW} > ${audit.clientW}) ${audit.overflowing.join(' | ')}`);
    }
    if (audit.h1 !== 1) problems.push(`${name}@${width}: ${audit.h1} <h1> elements`);
    if (audit.imgNoAlt) problems.push(`${name}@${width}: ${audit.imgNoAlt} images without an alt attribute`);
    if (/^(-apple-system|ui-sans-serif|system-ui|Times|serif|sans-serif)$/.test(audit.h1Font)) {
      problems.push(`${name}@${width}: <h1> fell back to a system font (${audit.h1Font})`);
    }
    if (consoleErrors.length) problems.push(`${name}@${width}: console → ${consoleErrors[0]}`);

    const file = `.imgqa/${name}-${width}${full ? '-full' : ''}.png`;
    await page.screenshot({ path: fileURLToPath(new URL(`../${file}`, import.meta.url)), fullPage: full });
    console.log(`${file.padEnd(34)} scrollW=${audit.scrollW} h1=${audit.h1Font}`);

    await ctx.close();
  }
}

await browser.close();

if (problems.length) {
  console.log('\n--- ISSUES ---');
  problems.forEach((p) => console.log('  ! ' + p));
  await writeFile(new URL('../.imgqa/issues.txt', import.meta.url), problems.join('\n'));
} else {
  console.log('\nNo overflow, heading or alt-text issues found.');
}
