/**
 * Productised website solutions.
 *
 * A demo shows what we can design. A solution says what a business actually
 * buys: who it is for, the problem it removes, what is in the box, what it
 * costs to start and how long it takes.
 *
 * The pricing bands below rise with the commercial value of a single lead — a
 * villa enquiry is worth far more to a builder than a haircut booking is to a
 * salon, and the buying process is longer.
 *
 * Starting prices are deliberately not published. A number shown before the
 * visitor understands the work is an objection, not information: it gets
 * compared against a template price it has nothing in common with, and the
 * visitor leaves before seeing why the two differ. Scope decides the number,
 * so the number arrives with the scope, in a written proposal.
 */

export type SolutionGroup =
  | 'Food & Dining'
  | 'Health & Wellness'
  | 'Education'
  | 'Travel & Stay'
  | 'Property & Interiors'
  | 'Retail';

export type Solution = {
  /** Business type + the outcome it produces. This is the thing we sell. */
  name: string;
  group: SolutionGroup;
  /** Who should buy it, in their own words. */
  bestFor: string;
  /** The problem, as the owner would describe it. */
  problem: string;
  /** What changes once the site is live. */
  outcome: string;
  /** The measurable thing the site is built to move. */
  metric: string;
  /**
   * The change the owner actually buys, as a pair. Owners rarely care that a
   * site is well designed; they care what stops being a problem.
   */
  before: string;
  after: string;
  /** In the box. Six to eight — enough to feel complete, few enough to read. */
  core: string[];
  /** Sensible additions. Never pushed on the portfolio itself. */
  optional: string[];
  timeline: string;
};

export const solutions: Record<string, Solution> = {
  salon: {
    name: 'Salon Booking Website',
    group: 'Health & Wellness',
    bestFor: 'Salons, spas, nail bars and grooming studios with one or two branches',
    problem:
      'The front desk loses half its day to “what do you charge for” calls, and Instagram DMs asking for a Saturday slot never turn into a confirmed appointment.',
    outcome:
      'Prices are answered before anyone calls, and a slot request reaches the desk on WhatsApp with the service, stylist and time already filled in.',
    metric: 'Appointment requests per month',
    before: 'Price questions answered on the phone all day',
    after: 'the menu and every price are public, so calls are people ready to book',
    core: [
      'Full service menu with real prices and durations',
      'Stylist and therapist profiles',
      'Appointment request that opens WhatsApp pre-filled',
      'Click-to-call and directions on every screen',
      'Membership and package pages',
      'Before/after and recent-work gallery',
      'Google Business Profile setup and local SEO',
    ],
    optional: ['Online payment for deposits', 'Salon software / calendar integration', 'Offers and festival campaign pages'],
    timeline: '2–3 weeks',
  },

  restaurant: {
    name: 'Restaurant Orders & Reservations Website',
    group: 'Food & Dining',
    bestFor: 'Standalone restaurants, cafés and cloud kitchens that want to own their customers',
    problem:
      'The menu lives in a PDF nobody can read on a phone, table bookings arrive as missed calls, and every order pays 25–30% to an aggregator.',
    outcome:
      'A menu that opens instantly on any phone, reservations that arrive with date, party size and time, and a direct-ordering route that keeps the margin in the kitchen.',
    metric: 'Direct reservations and orders',
    before: 'An Instagram page and a photo of the menu',
    after: 'a menu that reads on a phone, live opening status and a table request that lands on WhatsApp',
    core: [
      'Digital menu by course, with veg and spice markers',
      'Live open/closed status from your real kitchen hours',
      'Table reservation request with date, time and party size',
      'WhatsApp ordering and click-to-call',
      'Google Maps, parking and delivery-partner links',
      'Food photography gallery and press quotes',
      'Local SEO for “restaurants near me” searches',
    ],
    optional: ['Direct online ordering with payments', 'Loyalty and offers', 'Multi-outlet pages', 'Table-QR menu'],
    timeline: '2–4 weeks',
  },

  clinic: {
    name: 'Clinic Appointment Website',
    group: 'Health & Wellness',
    bestFor: 'Dental, derma, IVF, physio, eye and multi-speciality clinics',
    problem:
      'Patients compare four clinics before calling any of them, and the one that hides its pricing and its doctors’ credentials is the one they skip.',
    outcome:
      'Treatments explained with honest price bands and real credentials, so the patient who calls has already decided, and can book a slot in two taps.',
    metric: 'Appointment requests and calls',
    before: 'Patients ring to ask what a treatment costs',
    after: 'honest price bands are published, so the person who calls has already decided',
    core: [
      'Treatment pages with transparent price bands',
      'Doctor profiles with qualifications and registration',
      'Appointment request with preferred date and time',
      'Emergency number pinned to every screen',
      'Sterilisation and safety protocol page',
      'Patient stories and clinic gallery',
      'Google Business Profile and local SEO',
    ],
    optional: ['Payment for consultation deposits', 'Practice-management software integration', 'Multi-branch pages', 'Health blog'],
    timeline: '3–4 weeks',
  },

  school: {
    name: 'School Admissions Website',
    group: 'Education',
    bestFor: 'CBSE/ICSE/state schools, preschools and coaching institutes',
    problem:
      'Admission season is decided in eight weeks, and parents are choosing on a phone at 11pm, from fee structures, board results and a prospectus they cannot find.',
    outcome:
      'Every question a parent asks is answered on the site, and the enquiry reaches the admissions desk with the grade, locality and transport need attached.',
    metric: 'Qualified admission enquiries',
    before: 'Admission enquiries scattered across WhatsApp and phone calls',
    after: 'one enquiry form that reaches the admissions desk with grade, locality and transport attached',
    core: [
      'Admission enquiry funnel with grade and locality capture',
      'Published fee structure, with no hidden charges',
      'Board results, toppers and university placements',
      'Programmes, streams and faculty',
      'Campus, labs, library, sport and transport routes',
      'Circulars and notices your office can update',
      'Downloadable prospectus and campus-visit booking',
    ],
    optional: ['Online registration with fee payment', 'Parent portal / ERP link', 'Alumni section', 'Regional-language version'],
    timeline: '4–6 weeks',
  },

  realestate: {
    name: 'Property Enquiry Website',
    group: 'Property & Interiors',
    bestFor: 'Developers, project marketers and channel partners selling a specific project',
    problem:
      'Portal leads cost thousands each and arrive unqualified, so the sales team burns its week on site visits from people who were never going to buy.',
    outcome:
      'Buyers self-qualify on configuration, price and EMI before they ask for a visit. The site-visit calendar fills with people who already know the number.',
    metric: 'Site-visit bookings',
    before: 'Brochures forwarded by hand to anyone who asks',
    after: 'configuration-wise pricing and an EMI calculator qualify the buyer before the site visit',
    core: [
      'Configuration-wise pricing and availability',
      'Interactive floor plans and specifications',
      'EMI calculator with live monthly figures',
      'Amenities, location advantages and drive times',
      'Construction progress and RERA disclosure',
      'Site-visit booking with date, time and budget',
      'Campaign landing pages for ads',
    ],
    optional: ['CRM integration (Salesforce, Zoho, LeadSquared)', 'Virtual tour / 360°', 'Channel-partner portal', 'Multi-project microsites'],
    timeline: '4–6 weeks',
  },

  travel: {
    name: 'Travel Package Enquiry Website',
    group: 'Travel & Stay',
    bestFor: 'Tour operators, DMCs and travel agencies selling fixed departures or custom trips',
    problem:
      'Itineraries go out as PDFs over WhatsApp, the same eight questions get answered by hand every day, and price-shoppers eat the whole week.',
    outcome:
      'The full day-by-day itinerary, inclusions and departure dates are public. People enquire with dates already in mind, and they have read them and are ready to talk dates.',
    metric: 'Trip enquiries with dates',
    before: 'The same itinerary retyped into chat all week',
    after: 'packages, day-by-day plans and departure dates are public, so enquiries arrive with dates',
    core: [
      'Filterable packages by region, length and pace',
      'Day-by-day itineraries, published in full',
      'Fixed departure dates with live seat availability',
      'What is included and what is not, stated plainly',
      'Trip enquiry capturing dates, travellers and budget',
      'Traveller stories and destination galleries',
      'SEO built around destination searches',
    ],
    optional: ['Online booking with advance payment', 'Custom itinerary builder', 'B2B agent login', 'Multi-currency pricing'],
    timeline: '3–5 weeks',
  },

  fitness: {
    name: 'Gym Trial & Membership Website',
    group: 'Health & Wellness',
    bestFor: 'Strength gyms, CrossFit boxes, yoga and pilates studios, dance academies',
    problem:
      'People walk past for months. The class timetable lives in an Instagram story that expired, and nobody knows what membership actually costs.',
    outcome:
      'Timetable, coaches and prices are all public, and the free-trial form turns a curious passer-by into someone standing on the floor this week.',
    metric: 'Free-trial bookings',
    before: 'Walk-ins are the only way to see the timetable',
    after: 'the schedule, the coaches and the membership price are online, and a trial can be booked at 11pm',
    core: [
      'Weekly class timetable, readable on a phone',
      'Coach profiles and certifications',
      'Membership plans with clear pricing',
      'Free-trial booking with goal and experience level',
      'Programme pages for each training style',
      'Facility gallery and member results',
      'Local SEO for “gym near me” searches',
    ],
    optional: ['Class booking with capacity limits', 'Membership payments and renewals', 'Member app integration', 'Corporate wellness page'],
    timeline: '2–3 weeks',
  },

  interior: {
    name: 'Interior Portfolio & Consultation Website',
    group: 'Property & Interiors',
    bestFor: 'Interior designers, architects and turnkey contractors',
    problem:
      'The work only exists on Instagram, where a 3,000 sq ft project is nine squares, and every enquiry starts with “what do you charge?” from someone with no budget.',
    outcome:
      'Full project case studies with area, duration and cost, and published fee bands. Enquiries arrive from people who already know the range and from the first message.',
    metric: 'Qualified project enquiries',
    before: 'Work shown as a folder of photos on a phone',
    after: 'finished projects with budgets and durations, and an enquiry that already states the brief',
    core: [
      'Long-form project case studies with real numbers',
      'Materials and craft point of view',
      'Published fee structure and engagement models',
      'Process and timeline, stage by stage',
      'Budget-qualified enquiry form',
      'Press, awards and studio story',
      'Image-heavy pages that still load fast',
    ],
    optional: ['3D walkthrough embeds', 'Client project portal', 'Before/after sliders', 'Product sourcing catalogue'],
    timeline: '3–4 weeks',
  },

  resort: {
    name: 'Hotel Direct Booking Website',
    group: 'Travel & Stay',
    bestFor: 'Boutique resorts, homestays, villas and heritage properties',
    problem:
      'Almost every booking arrives through an OTA that takes 18–25% and owns the guest, so repeat guests never come back directly.',
    outcome:
      'Room types, tariffs and experiences are shown properly, and a date-based enquiry with a best-rate promise gives guests a reason to book with you instead.',
    metric: 'Direct booking enquiries',
    before: 'Every booking arrives through an OTA and its commission',
    after: 'guests can see the rooms, the tariff and the experiences, and ask to book direct',
    core: [
      'Room and villa types with real tariffs',
      'Date-based availability enquiry with an estimate',
      'Experiences, dining and spa pages',
      'Direct-booking benefits versus the OTAs',
      'Getting-here distances and transfer options',
      'Seasonal rates and cancellation policy',
      'SEO for the destination, not just the brand name',
    ],
    optional: ['Booking engine with payments', 'Channel-manager integration', 'Gift vouchers', 'Weddings and events enquiry'],
    timeline: '3–5 weeks',
  },

  boutique: {
    name: 'Boutique Catalogue & WhatsApp Orders',
    group: 'Retail',
    bestFor: 'Boutiques, jewellers, handloom labels and small D2C brands',
    problem:
      'The whole catalogue lives in a WhatsApp broadcast. Customers ask “price?” under every Instagram post, and nobody knows what is still in stock.',
    outcome:
      'A proper catalogue with prices, sizes and fabric detail, and an order that arrives on WhatsApp naming the exact piece and size, instead of another price-in-DM thread.',
    metric: 'Product enquiries and orders',
    before: 'Orders negotiated one WhatsApp photo at a time',
    after: 'a catalogue with fabric, sizes and prices, and an order that starts with the piece already chosen',
    core: [
      'Product catalogue with prices, sizes and materials',
      'Piece-level detail with availability',
      'WhatsApp ordering that names the exact item',
      'Made-to-measure or in-store appointment booking',
      'Size guide and care instructions',
      'Craft and provenance story',
      'Shipping, exchange and care policy',
    ],
    optional: ['Full online store with payments', 'Inventory sync', 'Instagram shop feed', 'Loyalty and repeat-customer offers'],
    timeline: '2–4 weeks',
  },
};

export const solutionGroups: SolutionGroup[] = [
  'Food & Dining',
  'Health & Wellness',
  'Education',
  'Travel & Stay',
  'Property & Interiors',
  'Retail',
];
