# PlaxWeb — plaxlabs.com

A website showroom for PlaxWeb, the web-development studio inside PlaxLabs.

This app owns the domain root. The news app (`RichardHenryJames/plax`) is a
second Next.js project mounted at `/news` — see [Deployment](#deployment).

The portfolio is not a page of screenshots. It is ten complete, working websites
for ten Indian industries, each sold as a **solution** — a business type, the
outcome it produces, and what is in the box. A prospect finds the one closest to
their business, compares the desktop and mobile designs, opens the live site,
and asks for the same thing. The demo _is_ the pitch.

### Two layers

| Layer            | What it is                                                   | Where it lives                                          |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| **The website**  | A finished, live site for a fictional business                | `/<slug>`                                               |
| **The solution** | What a real business buys: outcome, features, price, timeline | `lib/solutions.ts`, shown on `/` and in the in-demo panel |

So `Maison Aria` is the demo; **Salon Booking Website — from ₹32,000, live in
2–3 weeks** is the product. Every card, the in-demo panel and the contact page
speak the second language.

```
plaxlabs.com              the studio site + showroom
plaxlabs.com/salon        Maison Aria — hair & skin studio, Bengaluru
plaxlabs.com/restaurant   Kesari House — regional Indian kitchen, Bengaluru
plaxlabs.com/clinic       Aarogya Dental Studio — Koramangala, Bengaluru
plaxlabs.com/school       Rosewood International School — Nashik
plaxlabs.com/realestate   Aashray Grove — 42 garden villas, Sarjapur Road
plaxlabs.com/travel       Wayfare Journeys — tour operator, Goa
plaxlabs.com/fitness      Ironhouse Strength Club — Jubilee Hills, Hyderabad
plaxlabs.com/interior     Studio Mitti — interior design, Bengaluru
plaxlabs.com/resort       Tamara Backwaters — boutique resort, Kumarakom
plaxlabs.com/boutique     Kaanchi — handloom & occasion wear, Chennai
plaxlabs.com/contact      shared lead capture

plaxlabs.com/news         the Plax news app — a separate project
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
npm run dev          # http://localhost:3000
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
  globals.css                 design tokens for the studio and all ten demos
  sitemap.ts  robots.ts
  actions/lead.ts             'use server' — validation, rate limit, delivery
  (studio)/                   the PlaxWeb site, mounted at /
    layout.tsx  page.tsx  contact/page.tsx
  (demos)/                    the ten demos — route group, no shared chrome
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
4. Create `app/(demos)/<slug>/` with its own `fonts.ts`, `data.ts`,
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
result rather than through `/` — opening it gives the solution name, the
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

Two Vercel projects serve one domain as a Next.js
[multi-zone](https://nextjs.org/docs/app/guides/multi-zones):

| Project   | Repo                        | Serves                          |
| --------- | --------------------------- | ------------------------------- |
| `plaxweb` | `RichardHenryJames/plaxweb` | `plaxlabs.com` and everything not claimed below |
| `plax`    | `RichardHenryJames/plax`    | `plaxlabs.com/news/*` (the news app) |

A Vercel domain attaches to a whole project, so only one project can own the
domain. This one does, because it owns `/`. It forwards `/news` to the other.

### This project

- Attach **plaxlabs.com** here.
- Set `NEXT_PUBLIC_SITE_ORIGIN` to the exact canonical host, including `www` if
  that is the host you keep. Canonicals, Open Graph tags and the sitemap all
  derive from it.
- Set `NEWS_ZONE_URL` to the news project's production URL. It defaults to
  `https://plax-rouge.vercel.app`.
- Other environment variables are in `.env.example`.

As the default zone this app needs no `assetPrefix` — only the zones behind it
do. Two details in `next.config.ts` are load-bearing:

| Setting | Why |
| --- | --- |
| `rewrites()` → `/news`, `/news/:path+` | The news app sets `basePath: '/news'`, so its pages *and* its `/news/_next` assets are both covered. No separate asset rule is needed. |
| `headers()` source `/((?!news).*)` | The CSP here allows only Unsplash images and no third-party connections. Applied to the proxied news app it would block that app's image sources and its Supabase calls, so the news zone sends its own headers. |

`redirects()` sends the news app's old root-level URLs (`/topics`, `/samachar`,
`/profile`) to their new `/news/*` homes. Delete it once those stop appearing in
Search Console.

### The news project

Keeps its own `*.vercel.app` URL — do **not** attach the domain there. It sets
`basePath: '/news'`, which prefixes its routes, `<Link>`s and `/_next` assets
automatically. Three things `basePath` does not touch, all handled in that repo:

- `fetch()` calls — they go through `withBase()` in `src/lib/base-path.ts`
- files in `public/` — served at `/news/<file>`, so `next/image` and `<img>`
  both need the prefix (an unprefixed `next/image` src returns **400**)
- the Supabase auth `redirectTo`

Its Supabase project must allow `https://plaxlabs.com/news/auth/callback` as a
redirect URL, and `NEXT_PUBLIC_SITE_URL` must match the canonical host chosen
above.

### Running both locally

```bash
# news app
cd ../plax && npm run build && npx next start -p 3101

# this app, pointed at it
NEWS_ZONE_URL=http://localhost:3101 npm run build && npm run start
```

Then `localhost:3000` is the studio and `localhost:3000/news` is the news app.

### Check after deploying

- `plaxlabs.com` shows the studio, `plaxlabs.com/salon` shows a demo
- `plaxlabs.com/news` is styled and its logo loads
- the contact form submits
- `/topics` redirects to `/news/topics`
