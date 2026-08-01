import type { Photo } from './images';
import { preview, type DemoPreview } from './previews';
import { solutions, type Solution, type SolutionGroup } from './solutions';
import {
  clinicImages,
  estateImages,
  ironImages,
  kaanchiImages,
  kesariImages,
  mittiImages,
  salonImages,
  schoolImages,
  tamaraImages,
  wayfareImages,
} from './images';

/**
 * Demo registry.
 *
 * Adding a new industry means adding one entry here plus a route folder under
 * app/(demos)/<slug>. The gallery, sitemap, demo switcher, contact form
 * and analytics all read from this list — nothing else needs touching.
 *
 * The registry deliberately describes a demo; it does NOT describe how the
 * demo looks. Every demo owns its own layout and components.
 */

export type DemoStatus = 'live' | 'in-progress';

export type Demo = {
  slug: string;
  /** Fictional business the demo was designed for. */
  brand: string;
  /** Industry label used in filters and metadata. */
  industry: string;
  /** Where the fictional business is based. */
  location: string;
  /** One line, in plain language, about the business. */
  blurb: string;
  /** What this demo is meant to prove to a prospect. */
  proves: string;
  /** Concrete features a buyer would recognise. Keep to 4–5. */
  features: string[];
  /** Primary action the demo is designed to drive. */
  primaryGoal: string;
  /** Card art. */
  cover: Photo;
  /** Two supporting frames used in the gallery card collage. */
  stills: [Photo, Photo];
  /** Card accent, also used for the demo switcher. */
  accent: string;
  /** Contrasting ink used on top of the accent. */
  onAccent: string;
  status: DemoStatus;
  /** SEO */
  metaTitle: string;
  metaDescription: string;
};

/** A demo joined to the solution it sells and the screenshots that show it. */
export type DemoEntry = Demo & { solution: Solution; preview: DemoPreview | undefined };

export const demos: Demo[] = [
  {
    slug: 'salon',
    brand: 'Maison Aria',
    industry: 'Salon & Spa',
    location: 'Indiranagar, Bengaluru',
    blurb: 'A hair and skin studio that sells appointments, not information.',
    proves: 'Service menus with real prices, stylist profiles and a booking flow that finishes on WhatsApp.',
    features: ['Service menu with pricing', 'Stylist profiles', 'Appointment request flow', 'WhatsApp booking'],
    primaryGoal: 'Book an appointment',
    cover: salonImages.hero,
    stills: [salonImages.wash, salonImages.nails],
    accent: '#c39b48',
    onAccent: '#201814',
    status: 'live',
    metaTitle: 'Maison Aria — Salon Website Demo | PlaxWeb',
    metaDescription:
      'A working salon website you can open and use: service menu with prices, stylist profiles and booking that opens WhatsApp.',
  },
  {
    slug: 'restaurant',
    brand: 'Kesari House',
    industry: 'Restaurant',
    location: 'Hauz Khas, New Delhi',
    blurb: 'A regional Indian kitchen where the menu is the website.',
    proves: 'A menu people can actually read on a phone, plus table reservations and live opening hours.',
    features: ['Full menu by course', 'Table reservation form', 'Live open/closed status', 'Directions & ordering links'],
    primaryGoal: 'Reserve a table',
    cover: kesariImages.hero,
    stills: [kesariImages.thali, kesariImages.roomLights],
    accent: '#c0392b',
    onAccent: '#f6ead6',
    status: 'live',
    metaTitle: 'Restaurant Website Demo — Menu & Reservations | PlaxWeb',
    metaDescription:
      'A working restaurant website you can open and use: a menu that reads on a phone, live open/closed status and table reservations.',
  },
  {
    slug: 'realestate',
    brand: 'Aashray Grove',
    industry: 'Real Estate',
    location: 'Sarjapur Road, Bengaluru',
    blurb: 'A 42-villa gated project that has to qualify buyers before a site visit.',
    proves: 'Configuration tables, floor plans, an EMI calculator and a lead form built for a sales team.',
    features: ['Unit configurations & pricing', 'Interactive floor plans', 'EMI calculator', 'Site-visit lead capture'],
    primaryGoal: 'Book a site visit',
    cover: estateImages.hero,
    stills: [estateImages.living, estateImages.clubPool],
    accent: '#a97f36',
    onAccent: '#0a231d',
    status: 'live',
    metaTitle: 'Property Website Demo — Plans & Site Visits | PlaxWeb',
    metaDescription:
      'A working property website you can open and use: villa configurations, floor plans, an EMI calculator and site-visit booking.',
  },
  {
    slug: 'school',
    brand: 'Rosewood International School',
    industry: 'School',
    location: 'Gangapur Road, Nashik',
    blurb: 'A CBSE school that lives or dies by the admissions season.',
    proves: 'An admissions funnel, board results, circulars and a fee structure parents can find in one tap.',
    features: ['Admissions enquiry funnel', 'Board results & toppers', 'Circulars and notices', 'Fee structure'],
    primaryGoal: 'Start an admission enquiry',
    cover: schoolImages.hero,
    stills: [schoolImages.stacks, schoolImages.science],
    accent: '#10294a',
    onAccent: '#fbf8f2',
    status: 'live',
    metaTitle: 'School Website Demo — Admissions & Results | PlaxWeb',
    metaDescription:
      'A working school website you can open and use: an admission enquiry funnel, results, fee structure and transport routes.',
  },
  {
    slug: 'clinic',
    brand: 'Aarogya Dental Studio',
    industry: 'Healthcare',
    location: 'Koramangala, Bengaluru',
    blurb: 'A dental practice that has to win trust before anyone calls.',
    proves: 'Treatment pages with honest price bands, doctor credentials and a same-week appointment request.',
    features: ['Treatment pages with price bands', 'Doctor credentials', 'Appointment slots', 'Emergency call button'],
    primaryGoal: 'Request an appointment',
    cover: clinicImages.hero,
    stills: [clinicImages.chair, clinicImages.room],
    accent: '#0d7c76',
    onAccent: '#ffffff',
    status: 'live',
    metaTitle: 'Dental Clinic Website Demo — Appointments | PlaxWeb',
    metaDescription:
      'A working dental clinic website you can open and use: treatments with honest price bands, doctor credentials and appointments.',
  },
  {
    slug: 'travel',
    brand: 'Wayfare Journeys',
    industry: 'Travel',
    location: 'Panjim, Goa',
    blurb: 'A tour operator selling fixed departures and custom itineraries.',
    proves: 'Filterable packages, day-by-day itineraries and an enquiry form that captures dates and traveller count.',
    features: ['Filterable packages', 'Day-by-day itineraries', 'Departure dates & pricing', 'Trip enquiry form'],
    primaryGoal: 'Enquire about a trip',
    cover: wayfareImages.hero,
    stills: [wayfareImages.kerala, wayfareImages.jaipur],
    accent: '#dd6b34',
    onAccent: '#071c23',
    status: 'live',
    metaTitle: 'Travel Website Demo — Itineraries & Departures | PlaxWeb',
    metaDescription:
      'A working travel website you can open and use: filterable packages, day-by-day itineraries, fixed departures and dated enquiries.',
  },
  {
    slug: 'fitness',
    brand: 'Ironhouse Strength Club',
    industry: 'Fitness',
    location: 'Jubilee Hills, Hyderabad',
    blurb: 'A strength gym that sells memberships on its timetable and its coaches.',
    proves: 'A live class timetable, coach profiles and membership pricing with a free-trial booking.',
    features: ['Weekly class timetable', 'Coach profiles', 'Membership pricing', 'Free trial booking'],
    primaryGoal: 'Book a free trial',
    cover: ironImages.hero,
    stills: [ironImages.squat, ironImages.coach],
    accent: '#d7ff3e',
    onAccent: '#0a0a0b',
    status: 'live',
    metaTitle: 'Gym Website Demo — Timetable & Free Trial | PlaxWeb',
    metaDescription:
      'A working gym website you can open and use: a weekly class timetable, coach profiles, membership pricing and free-trial booking.',
  },
  {
    slug: 'interior',
    brand: 'Studio Mitti',
    industry: 'Interior Design',
    location: 'Malleswaram, Bengaluru',
    blurb: 'An interior practice whose portfolio has to do the selling.',
    proves: 'Full project case studies, a materials point of view and a budget-qualified enquiry.',
    features: ['Project case studies', 'Scope & budget bands', 'Process timeline', 'Qualified enquiry form'],
    primaryGoal: 'Start a project enquiry',
    cover: mittiImages.hero,
    stills: [mittiImages.detail, mittiImages.bedroom],
    accent: '#b06f4c',
    onAccent: '#f2eee7',
    status: 'live',
    metaTitle: 'Interior Design Website Demo — Case Studies | PlaxWeb',
    metaDescription:
      'A working interior design website you can open and use: case studies with real budgets and durations, and a qualified enquiry form.',
  },
  {
    slug: 'resort',
    brand: 'Tamara Backwaters',
    industry: 'Hotel & Resort',
    location: 'Kumarakom, Kerala',
    blurb: 'A twelve-villa property that wants guests to book direct.',
    proves: 'Room types with tariffs, a date-based availability enquiry and experiences that justify the rate.',
    features: ['Room types & tariffs', 'Date-based enquiry', 'Experiences & dining', 'Direct-booking incentive'],
    primaryGoal: 'Check availability',
    cover: tamaraImages.hero,
    stills: [tamaraImages.pool, tamaraImages.room],
    accent: '#d9714f',
    onAccent: '#0b232b',
    status: 'live',
    metaTitle: 'Resort Website Demo — Rooms & Direct Booking | PlaxWeb',
    metaDescription:
      'A working hotel website you can open and use: room types with tariffs, experiences and a date-based enquiry that books direct.',
  },
  {
    slug: 'boutique',
    brand: 'Kaanchi',
    industry: 'Fashion Label',
    location: 'Alwarpet, Chennai',
    blurb: 'A small handloom label selling a nine-piece festive edit.',
    proves: 'A catalogue with sizes and prices, WhatsApp ordering and made-to-measure appointments.',
    features: ['Product catalogue', 'Size & fabric details', 'WhatsApp ordering', 'Made-to-measure booking'],
    primaryGoal: 'Enquire about a piece',
    cover: kaanchiImages.hero,
    stills: [kaanchiImages.kanjivaram, kaanchiImages.rail],
    accent: '#6f1d3b',
    onAccent: '#faf6f0',
    status: 'live',
    metaTitle: 'Boutique Website Demo — Catalogue & Orders | PlaxWeb',
    metaDescription:
      'A working boutique website you can open and use: a catalogue with fabric, sizes and prices, plus WhatsApp ordering.',
  },
];

export const demoSlugs = demos.map((d) => d.slug);

/** The list everything on the portfolio renders from. */
export const catalogue: DemoEntry[] = demos.map((d) => ({
  ...d,
  solution: solutions[d.slug],
  preview: preview(d.slug),
}));

export function getDemo(slug: string): DemoEntry | undefined {
  return catalogue.find((d) => d.slug === slug);
}

/**
 * The three demos the portfolio leads with.
 *
 * A portfolio that gives ten projects equal weight reads as a product list,
 * not as a studio's work. These three are chosen for a mix of visual pull and
 * commercial value: restaurants and salons are the highest-frequency buyers in
 * Indian towns and both demos photograph well, while the property site carries
 * the most complex build and justifies the top of the price range.
 */
export const FEATURED_SLUGS = ['restaurant', 'realestate', 'salon'] as const;

export const featured: DemoEntry[] = FEATURED_SLUGS.map((s) => catalogue.find((d) => d.slug === s)!);

/** Everything not in the lead three, in registry order. */
export const alsoBuilt: DemoEntry[] = catalogue.filter(
  (d) => !FEATURED_SLUGS.includes(d.slug as (typeof FEATURED_SLUGS)[number])
);

/** Solution groups, in registry order, for the gallery filter. */
export function groups(): SolutionGroup[] {
  return [...new Set(catalogue.map((d) => d.solution.group))];
}

/** The other demos, for the in-demo switcher. */
export function otherDemos(slug: string, count = 3): DemoEntry[] {
  const i = catalogue.findIndex((d) => d.slug === slug);
  if (i === -1) return catalogue.slice(0, count);
  const rotated = [...catalogue.slice(i + 1), ...catalogue.slice(0, i)];
  return rotated.slice(0, count);
}
