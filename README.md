# PlaxWeb — plaxlabs.com/web

A website showroom for PlaxWeb, the web-development studio inside PlaxLabs.

The portfolio is not a page of screenshots. It is ten complete, working websites
for ten Indian industries, each sold as a **solution** — a business type, the
outcome it produces, and what is in the box. A prospect finds the one closest to
their business, compares the desktop and mobile designs, opens the live site,
and asks for the same thing. The demo _is_ the pitch.

### Two layers

| Layer            | What it is                                                   | Where it lives                                              |
| ---------------- | ------------------------------------------------------------ | ----------------------------------------------------------- |
| **The website**  | A finished, live site for a fictional business                | `/web/<slug>`                                               |
| **The solution** | What a real business buys: outcome, features, price, timeline | `lib/solutions.ts`, shown on `/web` and in the in-demo panel |

So `Maison Aria` is the demo; **Salon Booking Website — from ₹32,000, live in
2–3 weeks** is the product. Every card, the in-demo panel and the contact page
speak the second language.

```
plaxlabs.com/web              the studio site + showroom
plaxlabs.com/web/salon        Maison Aria — hair & skin studio, Bengaluru
plaxlabs.com/web/restaurant   Kesari House — regional Indian kitchen, Bengaluru
plaxlabs.com/web/clinic       Aarogya Dental Studio — Koramangala, Bengaluru
plaxlabs.com/web/school       Rosewood International School — Nashik
plaxlabs.com/web/realestate   Aashray Grove — 42 garden villas, Sarjapur Road
plaxlabs.com/web/travel       Wayfare Journeys — tour operator, Goa
plaxlabs.com/web/fitness      Ironhouse Strength Club — Jubilee Hills, Hyderabad
plaxlabs.com/web/interior     Studio Mitti — interior design, Bengaluru
plaxlabs.com/web/resort       Tamara Backwaters — boutique resort, Kumarakom
plaxlabs.com/web/boutique     Kaanchi — handloom & occasion wear, Chennai
plaxlabs.com/web/contact      shared lead capture
```

---

## Why these ten industries

Chosen for three things at once: how many of these businesses exist in India and
will pay for a website, how visually different they are from one another, and
whether each one forces a _different_ feature into the portfolio. Ten businesses
that all need "services, about, contact" would prove nothing.

| Demo            | Why it earns its place                        | The capability it proves                                            |
| --------------- | --------------------------------------------- | ------------------------------------------------------------------- |
| Salon & spa     | Enormous density in every city; appointment-led | Priced service menu, stylist profiles, WhatsApp booking             |
| Restaurant      | Highest-volume category; the menu is the site   | Readable menu with veg/spice markers, live open/closed, reservations |
| Dental clinic   | Trust-led, high value, distrusted on pricing    | Treatments with honest price bands, appointment slots, emergency routing |
| School          | Admission season is a hard commercial deadline  | Admissions funnel, board results, circulars, published fee structure |
| Real estate     | Largest budgets in the market                   | Configurations, SVG floor plans, EMI calculator, site-visit capture  |
| Travel          | Package-and-itinerary selling                   | Filterable trips, day-by-day itineraries, fixed departures           |
| Gym             | Membership sales, recurring revenue             | Weekly class timetable, coach profiles, free-trial booking           |
| Interior design | The portfolio is the product                    | Long-form case studies, published fee bands, qualified enquiry       |
| Resort          | Wants direct bookings, not OTA commission       | Room tariffs, date-based availability enquiry, direct-booking offer  |
| Fashion label   | Catalogue and commerce without a full store     | Product catalogue with sizes, WhatsApp ordering, made-to-measure     |

Photography, palette, typeface pairing, navigation pattern, section rhythm and
mobile action bar are decided **per demo**. No two share a display face and no
two share a colour ramp.

---

## Running it

```bash
npm install
npm run dev          # http://localhost:3000 → redirects to /web
npm run build
npm run start

npm run typecheck
npm run lint
```

### Desktop / mobile previews

The showroom never embeds a live demo. `scripts/previews.mjs` opens each site in
Chromium at 1440px and 390px, captures a tall screenshot, crops and re-encodes
it to WebP, and writes `lib/previews.ts` with the dimensions and an inlined blur
placeholder.

```bash
npm run start
npm run previews              # all ten
npm run previews salon        # one (merges into the existing manifest)
```

Those assets drive the device toggle on every card, the rotating hero showcase,
the phones in the mobile-proof section, the in-demo sales panel and the social
cards. Re-run it after changing any demo's design, or the showroom will be
selling last week's work.

### Visual QA

The project ships with its own QA harness rather than trusting that correct code
looks correct.

```bash
npm run start                      # QA runs against a production build
npm run qa                         # every route, every breakpoint in the brief
npm run qa:audit                   # contrast, target size, labels, page weight
npm run qa:smoke                   # menus, calculators, dialogs, WhatsApp links
npm run qa:journey                 # the whole buyer journey, desktop and phone
node scripts/qa.mjs salon 390      # one route, one width
node scripts/qa.mjs --full home    # full-page capture
node scripts/slice.mjs home-1440-full 6
node scripts/sheet.mjs 390         # every route in one reviewable image
```

`npm run qa` writes a screenshot per route × width to `.imgqa/` and fails on:

- horizontal overflow, naming the offending node and ignoring legitimate
  scroll containers
- a page with zero or more than one `<h1>`
- any `<img>` without an `alt` attribute
- console or network errors
- **an `<h1>` that fell back to a system font** — this caught a real bug where
  every demo's display face was silently not loading

`npm run qa:journey` walks the actual sales path on a 1440px desktop and an
iPhone 13: land → filter by sector → switch to the mobile preview → open the
live demo → open the PlaxWeb panel → ask for the solution → arrive on a contact
page that already knows the solution and the device → submit.

### Photography pipeline

Demo photography is served from the Unsplash CDN (Unsplash License: free for
commercial use, no attribution required) and re-encoded to AVIF/WebP by
`next/image`. Nothing enters `lib/images.ts` until it has passed both steps:

```bash
npm run images:verify   # HTTP-checks every candidate id → scripts/.verified.json
npm run images:sheet    # labelled contact sheets in .imgqa/ for eyeballing
```

The contact sheets exist so the _subject_ of each photo is reviewed, not just
that the URL resolves.

---

## Architecture

```
app/
  layout.tsx                  html shell, base metadata, analytics
  page.tsx                    /  →  redirect to /web
  globals.css                 design tokens for the studio and all ten demos
  sitemap.ts  robots.ts
  actions/lead.ts             'use server' — validation, rate limit, delivery
  web/
    (studio)/                 the PlaxWeb site
      layout.tsx  page.tsx  contact/page.tsx
    (demos)/                  the ten demos — route group, no shared chrome
      layout.tsx              scroll-reveal only; everything else is per demo
      salon/  { fonts.ts, data.ts, parts.tsx, page.tsx }
      restaurant/ …
components/
  studio/                     hero + device showcase, catalogue, pricing, FAQ,
                              lead form, footer
  demo/                       DemoChrome (badge → sales panel), DemoCredit
  ui/                         RevealProvider, Frame, TrackView
lib/
  demos.ts                    the registry, joined to solutions + previews
  solutions.ts                what a business buys: outcome, features, price
  previews.ts                 AUTO-GENERATED screenshot manifest
  images.ts                   verified photography manifest with alt text
  lead.ts                     zod schema + plain-text formatter
  analytics.ts  metadata.ts  site.ts  fonts.ts  cn.ts
public/previews/              the captured desktop + mobile WebP screenshots
scripts/
  previews.mjs                capture + optimise the showroom assets
  qa.mjs  audit.mjs  smoke.mjs  journey.mjs  sheet.mjs  slice.mjs
  verify-images.mjs  contact-sheet.mjs  candidates*.mjs
```

### Adding an eleventh demo

1. Add an entry to `lib/demos.ts` and a solution to `lib/solutions.ts`.
2. Add photography to `lib/images.ts` (after `images:verify` + `images:sheet`).
3. Add the demo's palette and font tokens to `app/globals.css`.
4. Create `app/web/(demos)/<slug>/` with its own `fonts.ts`, `data.ts`,
   `parts.tsx` and `page.tsx`.
5. Run `npm run previews <slug>` to capture its screenshots.

The catalogue, sector filters, sitemap, in-demo switcher, pricing table,
contact-form dropdown and analytics all pick it up from the registry. Nothing
else changes — and the new demo is still free to look like nothing else on the
site.

### Fonts, and one trap worth knowing

Colour tokens live in `@theme`. **Font families live in `@theme inline`.**
`next/font` puts its CSS variables on a wrapper element, not on `:root`, so a
plain `@theme` resolves `var(--font-x)` at `:root`, fails, and every heading
silently falls back to the system stack. `scripts/qa.mjs` asserts against this.

---

## Conversion and attribution

Every demo carries a small badge, bottom-left. It is the entire sales layer for
the visitor who arrived straight from a WhatsApp message, an ad or a search
result rather than through `/web` — opening it gives the solution name, the
outcome, a desktop/mobile preview, the starting price, the timeline, what is
included and a pinned "Get this for my business". It shrinks to its mark once
the visitor starts scrolling, so it never sits on top of the demo's content.

Context travels with the visitor. The card, the hero and the panel all pass
`?demo=&view=`, so the contact page opens already knowing the solution, showing
the screenshot they were just looking at, with the reference and category
prefilled. The lead that lands in the inbox names the solution and the device.

Events, in funnel order:

```
portfolio_view → demo_preview_toggle → demo_open → demo_cta_click
               → contact_start → lead_submit
                     ↘ demo_switch, whatsapp_click, call_click, lead_error
```

`lib/analytics.ts` forwards to Vercel Analytics and/or `window.dataLayer` and
no-ops when neither is present, so the vendor can change without touching call
sites.

### The lead form

`app/actions/lead.ts` is a server action. It validates with zod, caps every
field length, strips control characters, rate-limits per IP, and carries a
honeypot plus a submission-time trap. Delivery is plain text — never HTML — so
there is nothing to inject into the inbox. With no `RESEND_API_KEY` configured
the lead is logged server-side and the form still succeeds, so previews and
local development work without secrets.

---

## Deployment

plaxlabs.com is served by a **separate** Vercel project (`plax`). Vercel attaches
a domain to a whole project, so there is no way to point `plaxlabs.com/web` at a
different project from the dashboard. This repo is therefore deployed as its own
project and the parent proxies `/web` to it — a Next.js
[multi-zone](https://nextjs.org/docs/app/guides/multi-zones).

### 1. This project

Import the repo in Vercel as a new project (framework auto-detects as Next.js).
Set the environment variables from `.env.example`, plus:

```
NEXT_PUBLIC_SITE_ORIGIN=https://plaxlabs.com
```

so canonical URLs, Open Graph tags and the sitemap point at the public domain
rather than the deployment URL. Do **not** add plaxlabs.com as a domain here.

The zone config is already in `next.config.ts` and needs no changes:

| Setting | Why |
| --- | --- |
| `assetPrefix: '/web-static'` | Keeps this app's JS/CSS/fonts from colliding with the parent's `/_next`. |
| `images.path: '/web-static/_next/image'` | `assetPrefix` does **not** cover the image optimiser. Without it every image requests `/_next/image` from the parent. |
| `serverActions.allowedOrigins` | Behind the proxy the browser's origin is plaxlabs.com, not this deployment. The lead form 403s without it. |

### 2. The parent project (`plax`)

Add these rewrites. In `next.config.ts` if the parent is Next.js:

```ts
async rewrites() {
  const zone = 'https://plaxweb.vercel.app';
  return [
    { source: '/web', destination: `${zone}/web` },
    { source: '/web/:path+', destination: `${zone}/web/:path+` },
    // Assets. Omit this and the pages arrive unstyled.
    { source: '/web-static/:path+', destination: `${zone}/web-static/:path+` },
    // Public files — the social-card screenshots are absolute URLs on the
    // public domain, so crawlers fetch them from the parent.
    { source: '/previews/:path+', destination: `${zone}/previews/:path+` },
    { source: '/web-sitemap.xml', destination: `${zone}/sitemap.xml` },
  ];
}
```

or in `vercel.json` if it is not:

```json
{
  "rewrites": [
    { "source": "/web", "destination": "https://plaxweb.vercel.app/web" },
    { "source": "/web/:path+", "destination": "https://plaxweb.vercel.app/web/:path+" },
    { "source": "/web-static/:path+", "destination": "https://plaxweb.vercel.app/web-static/:path+" },
    { "source": "/previews/:path+", "destination": "https://plaxweb.vercel.app/previews/:path+" },
    { "source": "/web-sitemap.xml", "destination": "https://plaxweb.vercel.app/sitemap.xml" }
  ]
}
```

Point the parent's `robots.txt` at `https://plaxlabs.com/web-sitemap.xml` so the
demos get indexed — the parent owns `/robots.txt` and `/sitemap.xml`.

Replace `plaxweb.vercel.app` with this project's real production URL. Links from
the parent site into `/web` must be plain `<a>` tags, not `<Link>` — soft
navigation does not work across zones.

### 3. Check after deploying

- `plaxlabs.com/web` is styled (if not, the `/web-static` rewrite is missing)
- a demo's photos load (if not, `/web-static/_next/image` is not reaching here)
- the contact form submits (if not, check `allowedOrigins`)

### If plaxlabs.com later becomes this project

Attach the domain here and delete the parent rewrites. Nothing else changes —
the app already serves everything under `/web`, and `assetPrefix` is served
correctly whether or not a proxy is in front of it.

---

## Performance and SEO notes

- No animation library, no UI kit, no icon package. Motion is CSS plus one
  shared `IntersectionObserver`; icons are inline SVG or type.
- The showroom renders optimised WebP screenshots, never live demos. The hero
  keeps only the current and next shot mounted, so it does not download twenty
  images to show one.
- Each demo declares its own fonts in its own folder, so a visitor opening
  `/web/salon` never downloads the studio's display face or any other demo's.
- Images are optimised by `next/image` with explicit `sizes` everywhere, AVIF and
  WebP output, inlined blur placeholders and a 30-day cache. `/web` loads about
  130kB of imagery on a phone.
- Every page is statically prerendered except `/web/contact`, which reads a
  query string.
- Per-page metadata, canonical URLs, Open Graph and Twitter cards — with the
  demo's real screenshot as the social image — a generated sitemap and robots
  file, plus JSON-LD per demo (`HairSalon`, `Restaurant`, `Dentist`, `School`,
  `Residence`, `TravelAgency`, `Resort`, `ClothingStore` …) and `FAQPage` on the
  studio site.
- Security headers including a Content-Security-Policy are set in
  `next.config.ts`.

---

All ten businesses in the showroom are fictional. Any resemblance to a real
salon, school or builder is a coincidence — the prices, hours and addresses were
written to be plausible, not real.
