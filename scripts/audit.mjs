/**
 * Accessibility and page-weight audit.
 *
 * Deliberately dependency-free: it checks the things that actually break on
 * hand-built marketing sites — contrast on body copy, focusable controls that
 * are too small to tap, labels, landmarks and heading order — plus the JS and
 * image weight each route ships.
 *
 * Usage: node scripts/audit.mjs   (needs `npm run start` on :3000)
 */
import { chromium } from 'playwright';

const BASE = process.env.QA_BASE ?? 'http://localhost:3000';
const ROUTES = [
  '/',
  '/contact',
  '/salon',
  '/restaurant',
  '/clinic',
  '/school',
  '/realestate',
  '/travel',
  '/fitness',
  '/interior',
  '/resort',
  '/boutique',
];

const browser = await chromium.launch();
const problems = [];

for (const route of ROUTES) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();

  let js = 0;
  let img = 0;
  page.on('response', (r) => {
    const type = r.request().resourceType();
    const len = Number(r.headers()['content-length'] ?? 0);
    if (type === 'script') js += len;
    if (type === 'image') img += len;
  });

  await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle', timeout: 60_000 });

  const a11y = await page.evaluate(() => {
    const issues = [];

    const parse = (c) => {
      const m = c.match(/rgba?\(([^)]+)\)/);
      if (!m) return null;
      const [r, g, b, a = '1'] = m[1].split(',').map((v) => parseFloat(v));
      return { r, g, b, a };
    };
    const lum = ({ r, g, b }) =>
      [r, g, b]
        .map((v) => v / 255)
        .map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)))
        .reduce((acc, v, i) => acc + v * [0.2126, 0.7152, 0.0722][i], 0);

    const effectiveBg = (el) => {
      let node = el;
      while (node && node !== document.documentElement) {
        const bg = parse(getComputedStyle(node).backgroundColor);
        if (bg && bg.a > 0.85) return bg;
        node = node.parentElement;
      }
      return { r: 255, g: 255, b: 255, a: 1 };
    };

    // Body copy only, and only where it is not sitting on a photograph —
    // contrast over art-directed imagery is judged visually, not numerically.
    const imageRects = Array.from(document.images).map((i) => i.getBoundingClientRect());
    const overPhoto = (r) =>
      imageRects.some((ir) => r.left < ir.right && r.right > ir.left && r.top < ir.bottom && r.bottom > ir.top);

    const text = Array.from(document.querySelectorAll('p, li, dd, dt, label, summary, figcaption'));
    for (const el of text.slice(0, 400)) {
      if (!el.textContent?.trim()) continue;
      const cs = getComputedStyle(el);
      if (cs.visibility === 'hidden' || cs.display === 'none') continue;
      // Visually-hidden text has no contrast to judge.
      if (el.classList.contains('sr-only') || el.closest('.sr-only')) continue;
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) continue;
      if (overPhoto(r)) continue;
      const fg = parse(cs.color);
      const bg = effectiveBg(el);
      if (!fg || fg.a < 0.5) continue;
      const l1 = lum(fg);
      const l2 = lum(bg);
      const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
      const size = parseFloat(cs.fontSize);
      const large = size >= 24 || (size >= 18.66 && Number(cs.fontWeight) >= 700);
      const min = large ? 3 : 4.5;
      if (ratio < min) {
        issues.push(`contrast ${ratio.toFixed(2)}:1 (needs ${min}) — "${el.textContent.trim().slice(0, 40)}"`);
      }
    }

    // Tap targets — WCAG 2.2 AA "Target Size (Minimum)" is 24×24 CSS px.
    const controls = Array.from(document.querySelectorAll('a[href], button, select, input, textarea, summary'));
    for (const el of controls) {
      const cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden') continue;
      // Honeypots, decorative subtrees and skip links are not reachable by touch.
      if (el.closest('[aria-hidden="true"]') || el.getAttribute('tabindex') === '-1') continue;
      if (el.classList.contains('sr-only')) continue;
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) continue;
      // Links flowing inside running text are exempt.
      if (el.tagName === 'A' && el.closest('p, li, address, figcaption, dd, blockquote')) continue;
      if (r.height < 24 || r.width < 24) {
        issues.push(
          `tap target ${Math.round(r.width)}×${Math.round(r.height)} — <${el.tagName.toLowerCase()}> "${(el.textContent ?? '').trim().slice(0, 30)}"`
        );
      }
    }

    // Labels.
    for (const el of document.querySelectorAll('input:not([type=hidden]), select, textarea')) {
      const id = el.getAttribute('id');
      const labelled =
        (id && document.querySelector(`label[for="${CSS.escape(id)}"]`)) ||
        el.closest('label') ||
        el.getAttribute('aria-label') ||
        el.getAttribute('aria-labelledby');
      if (!labelled) issues.push(`unlabelled form control <${el.tagName.toLowerCase()} name="${el.getAttribute('name')}">`);
    }

    // Landmarks and heading order.
    if (!document.querySelector('header')) issues.push('no <header> landmark');
    if (!document.querySelector('footer')) issues.push('no <footer> landmark');
    const levels = Array.from(document.querySelectorAll('h1,h2,h3,h4')).map((h) => Number(h.tagName[1]));
    for (let i = 1; i < levels.length; i++) {
      if (levels[i] - levels[i - 1] > 1) {
        issues.push(`heading level jumps h${levels[i - 1]} → h${levels[i]}`);
        break;
      }
    }

    // Links that open a new tab must be safe.
    for (const a of document.querySelectorAll('a[target="_blank"]')) {
      if (!(a.getAttribute('rel') ?? '').includes('noopener')) issues.push(`target=_blank without rel=noopener: ${a.getAttribute('href')?.slice(0, 40)}`);
    }

    return issues;
  });

  const unique = [...new Set(a11y)];
  console.log(
    `${route.padEnd(20)} js=${(js / 1024).toFixed(0).padStart(4)}kB  img=${(img / 1024).toFixed(0).padStart(5)}kB  issues=${unique.length}`
  );
  unique.slice(0, 6).forEach((i) => problems.push(`${route}: ${i}`));

  await ctx.close();
}

await browser.close();

if (problems.length) {
  console.log('\n--- ISSUES ---');
  problems.forEach((p) => console.log('  ! ' + p));
  process.exitCode = 1;
} else {
  console.log('\nNo contrast, tap-target, label, landmark or heading-order issues found.');
}
