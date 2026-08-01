import { solutions } from './solutions';

/**
 * Service pages — the commercial layer.
 *
 * Why this file exists at all:
 *
 * A demo page is a fictional salon. Its content is a service menu, stylist
 * profiles and opening hours, and it used to carry HairSalon schema with a
 * street address. Whatever the title tag claimed, that page reads to a crawler
 * as *a salon*, not as salon website design — and when metadata and content
 * disagree, content wins. The demos were therefore never going to rank for the
 * terms that bring in work, no matter how the titles were written.
 *
 * So the two jobs are now separated. A service page owns one commercial search
 * intent and is written to satisfy it. The demo is the proof it points at, and
 * is no longer asked to rank for anything.
 *
 * The rule for adding a page here: it must own a search intent that no other
 * page owns. If two pages would answer the same question, they should be one
 * page.
 */

export type ServiceFaq = { q: string; a: string };

export type Service = {
  /** URL slug. Also the commercial phrase this page is the authority for. */
  slug: string;
  /** The demo that proves it. */
  demo: string;
  /**
   * The single search intent this page satisfies, in the searcher's words.
   * Kept explicit so that adding a page forces the question "does something
   * already own this?" — which is how cannibalisation gets caught early.
   */
  intent: string;
  /** Primary commercial keyword. One per page, deliberately. */
  primary: string;
  /** Genuine variants people search. Not for stuffing — for checking coverage. */
  secondary: string[];
  h1: string;
  title: string;
  description: string;
  /**
   * The opening answer, in two sentences. Skim readers and AI assistants both
   * take the top of the page as the summary, so it answers the question rather
   * than introducing the company.
   */
  lede: string;
  /** What a site in this industry must do to earn its keep. The intent answer. */
  requirements: [string, string][];
  /** Questions people genuinely ask before hiring. Industry-specific. */
  faqs: ServiceFaq[];
  /** Sideways links. Related work, not an SEO link farm. */
  related: string[];
};

export const services: Service[] = [
  {
    slug: 'restaurant-website-design',
    demo: 'restaurant',
    intent: 'I run a restaurant and I need a website that takes orders and reservations',
    primary: 'restaurant website design',
    secondary: [
      'restaurant website development',
      'restaurant website developer',
      'website for restaurant',
      'restaurant online ordering website',
      'restaurant reservation website',
      'cafe website design',
      'food delivery website design',
    ],
    h1: 'Restaurant website design',
    title: 'Restaurant Website Design & Development | PlaxWeb',
    description:
      'Restaurant websites built around the menu, reservations and direct orders. Open our working restaurant demo and use it on your phone before you enquire.',
    lede: 'A restaurant website has one job before anything else: show the menu clearly on a phone, because that is where almost everyone reads it. Everything after that — reservations, direct orders, opening hours, directions — is about keeping the customer on your site instead of an aggregator that charges you commission on the same order.',
    requirements: [
      [
        'The menu has to work as a web page, not a PDF',
        'A PDF menu is the most common mistake in this industry. It loads slowly, forces pinch-to-zoom, cannot be read by search engines and is invisible to anyone using a screen reader. A real menu page can be searched, linked, indexed and updated the morning a dish sells out.',
      ],
      [
        'Open or closed, answered instantly',
        'The two things people check before travelling to a restaurant are whether it is open and how to get there. Both belong above the fold, and the opening status should be calculated rather than typed, so it is never wrong on a public holiday.',
      ],
      [
        'A reservation that finishes without a phone call',
        'Every reservation that requires a call is lost when the line is busy or the restaurant is loud. A table request that completes on the site, or hands over to WhatsApp with the date, party size and name already filled in, converts at a far higher rate.',
      ],
      [
        'Direct ordering, so the margin stays with you',
        'Aggregators take a percentage of every order and own the customer relationship. A direct ordering route on your own site does not replace them, but it moves your repeat customers — the profitable ones — off that commission.',
      ],
      [
        'Photography that matches the price point',
        'Food photography is the one place where stock imagery is obvious and expensive. If the pictures look like a template, the pricing looks unjustified. We will tell you when a shoot is worth it rather than filling the page with library images.',
      ],
    ],
    faqs: [
      {
        q: 'Can customers order directly from the website instead of a delivery app?',
        a: 'Yes. Direct ordering can go to a payment provider, to your kitchen as a printed or emailed ticket, or to WhatsApp with the order already itemised, depending on how your kitchen actually works. Most restaurants keep the aggregators for discovery and use the site to hold on to repeat customers, where the commission hurts most.',
      },
      {
        q: 'How do we update the menu when prices or dishes change?',
        a: 'Small changes are quick for us and included for the first month. If your menu changes weekly or seasonally, we add a content manager so a member of your team can edit items, prices and availability without touching code or waiting on us.',
      },
      {
        q: 'Will the website help us appear on Google Maps?',
        a: 'Your Google Business Profile is what drives the map result, and it is a separate thing from the website. We set it up or clean it up, make sure the name, address, hours and menu link match what the site says, and add the structured data that lets Google connect the two with confidence.',
      },
      {
        q: 'We have several branches. Does each one need its own page?',
        a: 'Usually yes. Each branch has its own address, hours, phone number and often its own menu, and each one is competing in a different local search. A single page listing five addresses ranks for none of them well.',
      },
    ],
    related: ['hotel-website-design', 'boutique-website-design', 'travel-agency-website-design'],
  },

  {
    slug: 'salon-website-design',
    demo: 'salon',
    intent: 'I run a salon or spa and I want the website to bring in appointments',
    primary: 'salon website design',
    secondary: [
      'salon website development',
      'beauty salon website design',
      'spa website design',
      'hair salon website',
      'salon booking website',
      'nail salon website design',
      'barbershop website design',
    ],
    h1: 'Salon and spa website design',
    title: 'Salon & Spa Website Design with Online Booking | PlaxWeb',
    description:
      'Salon websites built to turn browsers into booked appointments. Open our working salon demo, try the booking flow, then tell us what your studio needs.',
    lede: 'Most salon enquiries die on one question: what does it cost. If your prices are only available by calling the front desk, every price-checker becomes a phone call your team has to answer mid-appointment, and most of them never call at all. A salon website earns its keep by answering that question in public and turning the people who are happy with the answer into booked appointments.',
    requirements: [
      [
        'A full price list, published',
        'Salons are the industry most likely to hide prices and the industry that suffers most for it. Publishing the menu with durations filters out the people who were never going to book and gives everyone else a reason to. The calls you lose were not appointments.',
      ],
      [
        'Booking that finishes where the customer already is',
        'A form that sends an email nobody reads is not a booking system. The request should either write into your calendar or arrive on WhatsApp with the service, stylist and preferred time already filled in, so confirming it takes one reply.',
      ],
      [
        'The stylists are the product',
        'People book a person, not a premises. Individual profiles with real photographs, specialisms and the work they have done convert better than any amount of copy about the salon itself.',
      ],
      [
        'Proof of work that is actually yours',
        'A before-and-after gallery of your own clients is the single most persuasive thing on a salon website. It also has to be fast: galleries are usually what makes these sites slow on a phone, so images are sized and lazy-loaded properly.',
      ],
      [
        'Memberships and packages priced where people can see them',
        'Packages are how a salon raises the value of a customer. They only work if they are presented as a clear comparison against single-visit pricing, not buried on a page nobody reaches.',
      ],
    ],
    faqs: [
      {
        q: 'Can the website connect to the booking software we already use?',
        a: 'In most cases yes. Widely used salon systems provide either an embeddable booking widget or an API, and we connect to whichever you already pay for rather than asking you to change. Where a system has no integration route, we use a structured request that lands in your calendar and on WhatsApp so nothing is retyped.',
      },
      {
        q: 'Should we really publish our prices?',
        a: 'For almost every salon, yes. The usual objection is that competitors will see them, but they can already book an appointment and find out. The real effect of hiding prices is that you lose the customers who were comfortable with them and keep the ones who want to negotiate.',
      },
      {
        q: 'Can we take deposits so people stop missing appointments?',
        a: 'Yes, and for salons with a high no-show rate it usually pays for the site. A small card deposit at the point of booking, refundable against the service, is the most effective way to reduce no-shows without turning away first-time customers.',
      },
      {
        q: 'We have one branch. Is a website worth it against just using Instagram?',
        a: 'Instagram is good at showing work and bad at answering questions. It cannot hold a price list, rank in a search for your service in your area, or take a booking at eleven at night. The two work together: the site answers and books, Instagram brings people to it.',
      },
    ],
    related: ['gym-website-design', 'dental-clinic-website-design', 'boutique-website-design'],
  },

  {
    slug: 'dental-clinic-website-design',
    demo: 'clinic',
    intent: 'I run a clinic and I need a website that brings in appointments and looks trustworthy',
    primary: 'dental clinic website design',
    secondary: [
      'dental website design',
      'clinic website development',
      'medical website design',
      'doctor website design',
      'healthcare website design',
      'dentist website',
      'medical practice website',
    ],
    h1: 'Dental and medical clinic website design',
    title: 'Dental & Medical Clinic Website Design | PlaxWeb',
    description:
      'Clinic websites built for trust and appointments: treatments explained, credentials shown, honest price bands. Open the working demo before you enquire.',
    lede: 'Healthcare is the one category where the website is judged on trust before it is judged on anything else. A patient choosing a clinic is weighing up qualifications, cleanliness, honesty about cost and whether they will be treated well — and they are doing it from a phone, quickly, usually while uncomfortable. The site has to answer all of that before it asks for an appointment.',
    requirements: [
      [
        'Credentials stated plainly',
        'Registration numbers, qualifications, years in practice and the professional bodies a clinician belongs to. This is the clearest, most checkable trust signal a clinic has, and most clinic websites bury it on a page nobody visits.',
      ],
      [
        'Treatments explained in the patient\u2019s language',
        'People search for the problem, not the procedure. Pages written around what the patient is feeling, with the clinical name alongside it, both help the patient and match how the search was actually typed.',
      ],
      [
        'Honest price bands, not silence',
        'Clinics resist publishing costs because every case differs. A band with the reason it varies is enough. Total silence about cost is what makes a patient close the page and call somewhere that gave them a number.',
      ],
      [
        'Appointments without a phone call',
        'A request that captures the treatment, preferred time and whether the patient is new or returning saves the front desk the entire triage conversation, and can be taken outside working hours when most of them are made.',
      ],
      [
        'Careful, accurate claims',
        'Healthcare content is held to a higher standard by search engines and by advertising regulators in most countries. We will not write outcome guarantees or invent testimonials, both because it is wrong and because it is the fastest route to being demoted.',
      ],
    ],
    faqs: [
      {
        q: 'Is patient data on the website a compliance risk?',
        a: 'It can be, which is why an appointment request should collect the minimum needed to make contact and never clinical detail. Where you need to take medical history, that belongs in a system built for it with the right safeguards, not in a website contact form that emails a shared inbox.',
      },
      {
        q: 'Can we show patient reviews and before-and-after photographs?',
        a: 'Reviews yes, with consent, and best pulled live from your Google profile so they are verifiable rather than typed by us. Clinical photographs are governed by advertising rules that differ by country and by professional body — we will tell you what your regulator allows rather than guessing.',
      },
      {
        q: 'We have several doctors. Should each have a page?',
        a: 'If patients choose a specific clinician, yes. Individual pages rank for that clinician\u2019s name, carry their credentials properly and let a returning patient book with the person they saw last time. If patients simply book the clinic, one team page is enough.',
      },
      {
        q: 'How do we appear for searches from people nearby?',
        a: 'Local search for clinics is driven mainly by your Google Business Profile, consistent contact details everywhere they appear, and a site that clearly states where you are and what you treat. We set the groundwork; sustained ranking in a competitive city also needs reviews, which only your patients can give you.',
      },
    ],
    related: ['salon-website-design', 'gym-website-design', 'school-website-design'],
  },

  {
    slug: 'school-website-design',
    demo: 'school',
    intent: 'I run a school and I need a website that brings in admission enquiries',
    primary: 'school website design',
    secondary: [
      'school website development',
      'education website design',
      'college website design',
      'school website company',
      'admission website design',
      'university website design',
      'preschool website design',
    ],
    h1: 'School and education website design',
    title: 'School Website Design for Admissions | PlaxWeb',
    description:
      'School websites built around the admission decision: curriculum, results, fees, transport and a clear enquiry. Open the working demo and see the funnel.',
    lede: 'A school website has two audiences with almost opposite needs. A prospective parent is deciding whether to trust you with their child and wants curriculum, results, fees, safety and a way to visit. A current parent wants a notice, a date or a form, quickly. Most school sites serve the second group and quietly lose the first, which is the group that pays for the site.',
    requirements: [
      [
        'The admission path is the spine of the site',
        'Eligibility, dates, process, fee structure, documents, and a single enquiry that captures the child\u2019s year group. A parent should be able to get from the home page to a submitted enquiry without hunting.',
      ],
      [
        'Results and outcomes, presented honestly',
        'Board results, university destinations, competitive exam outcomes. Real numbers presented plainly beat adjectives. Parents compare schools on this and will find it elsewhere if you do not publish it.',
      ],
      [
        'Fees, or at least a range',
        'The most-searched and least-published fact about any school. A fee page with the structure and what it includes removes an enormous volume of repetitive phone calls and stops parents assuming the worst.',
      ],
      [
        'Practical logistics parents actually search for',
        'Transport routes, timings, uniform, term dates and the academic calendar. These are the pages that get the most traffic after admissions, and they build enormous goodwill for the amount of work they take.',
      ],
      [
        'Safeguarding and accessibility taken seriously',
        'Schools are held to a higher accessibility standard than most businesses, and in several countries it is a legal requirement rather than a preference. Correct headings, contrast, keyboard access and readable documents are part of the build, not an extra.',
      ],
    ],
    faqs: [
      {
        q: 'Can our office staff publish notices and circulars themselves?',
        a: 'Yes, and for a school this is essential rather than optional. Notices, calendar entries and results go into a content manager your administrative team can use without training in anything technical. Structural changes stay with us.',
      },
      {
        q: 'Do we need a parent login or portal?',
        a: 'Usually not on the website itself. Most schools already have a management system that handles attendance, fees and report cards, and duplicating it is expensive and confusing. The site links to it. Where no such system exists, we will say so rather than building a weak version of one.',
      },
      {
        q: 'How do we handle admissions that open once a year?',
        a: 'The admission section is built to be switched between open and closed states, with a waiting-list capture for the closed period. Enquiries arriving out of season are the cheapest leads a school gets and most sites throw them away.',
      },
      {
        q: 'Will this work for a preschool or a coaching institute as well?',
        a: 'The structure holds, but the decision is different. Preschool parents weigh safety, ratios and proximity above outcomes; coaching institutes are judged almost entirely on results and faculty. We rebuild the page order around whichever decision your parents are actually making.',
      },
    ],
    related: ['dental-clinic-website-design', 'real-estate-website-design', 'interior-design-website'],
  },

  {
    slug: 'real-estate-website-design',
    demo: 'realestate',
    intent: 'I sell property and I need a website that produces qualified buyer enquiries',
    primary: 'real estate website design',
    secondary: [
      'real estate website development',
      'property website design',
      'realtor website design',
      'estate agent website',
      'property developer website',
      'real estate agency website',
      'property listing website',
    ],
    h1: 'Real estate and property website design',
    title: 'Real Estate & Property Website Design | PlaxWeb',
    description:
      'Property websites built to qualify buyers, not just list units: configurations, floor plans, location detail and site-visit booking. Open the demo first.',
    lede: 'In property the website is rarely the thing that closes the sale, and it is almost always the thing that decides whether a buyer is worth your sales team\u2019s time. The single most valuable thing it can do is qualify — surface configuration, price band, location and possession date clearly enough that the enquiries reaching your team are from people who already know what they are asking about.',
    requirements: [
      [
        'Every unit type given its own honest detail',
        'Configuration, carpet and built-up area, orientation, floor plans and what is actually included. Buyers compare these across developers line by line, and vagueness reads as something being hidden.',
      ],
      [
        'Location explained, not just pinned',
        'Distance to schools, hospitals, transport, workplaces and what is being built nearby. For a buyer this is half the decision, and it is the part a map alone does not answer.',
      ],
      [
        'Affordability made concrete',
        'A payment schedule and a repayment calculator turn an abstract price into a monthly number the buyer can judge. This is the single feature that most reliably increases enquiry quality in this category.',
      ],
      [
        'A site visit is the real conversion, not a form fill',
        'The goal is a booked visit with a date, not a name on a list. Capturing preferred day, configuration of interest and budget band lets the sales team arrive prepared and cuts the qualifying call entirely.',
      ],
      [
        'Regulatory disclosures handled properly',
        'Most markets require registration numbers, disclaimers and accurate area definitions on property marketing. These are built in as structured, readable content rather than an image of a certificate nobody can read on a phone.',
      ],
    ],
    faqs: [
      {
        q: 'Can the site pull listings from the system we already use?',
        a: 'If your CRM or listing platform exposes a feed or an API, yes — listings stay in one place and the site reflects them. Where inventory is small and changes slowly, as with a single project, managing it on the site directly is simpler and faster than an integration nobody maintains.',
      },
      {
        q: 'Do enquiries go straight into our CRM?',
        a: 'Yes. Enquiries can be pushed into your CRM with the source, project and unit type attached, so your team knows which listing produced the lead and your marketing spend can be judged honestly.',
      },
      {
        q: 'We are a brokerage, not a developer. Is this the same thing?',
        a: 'The build is similar but the emphasis moves. A developer sells one project deeply, so the site goes into detail on configurations and progress. A brokerage sells many properties shallowly, so search, filtering and freshness matter more, and each listing needs to stand on its own in search results.',
      },
      {
        q: 'Do we need a separate microsite for each project?',
        a: 'For a large launch, often yes — it can carry its own branding and rank for the project name, which buyers search directly. For a smaller portfolio it fragments your authority across several weak sites instead of building one strong one.',
      },
    ],
    related: ['interior-design-website', 'hotel-website-design', 'school-website-design'],
  },

  {
    slug: 'travel-agency-website-design',
    demo: 'travel',
    intent: 'I run a travel business and I need a website that produces dated, serious enquiries',
    primary: 'travel agency website design',
    secondary: [
      'travel website development',
      'tour operator website design',
      'travel company website',
      'tour package website',
      'holiday website design',
      'travel booking website',
      'destination management website',
    ],
    h1: 'Travel agency and tour operator website design',
    title: 'Travel Agency & Tour Operator Website Design | PlaxWeb',
    description:
      'Travel websites built for dated enquiries: filterable packages, day-by-day itineraries and fixed departures. Open the working demo and try the flow.',
    lede: 'Travel is sold on specificity. A page that says it offers unforgettable holidays converts nobody; a day-by-day itinerary with what is included, what is not, where you sleep each night and which departures still have seats converts people who are ready to book. The website\'s job is to move a browser from a vague idea to a specific date.',
    requirements: [
      [
        'Itineraries told day by day',
        'The itinerary is the product. Each day with its route, activity, meals and accommodation is what a traveller compares between operators, and it is also the content that earns long-tail search traffic for years.',
      ],
      [
        'Inclusions and exclusions stated without ambiguity',
        'What is not included causes every dispute in this industry. Saying it plainly costs a few bookings from people who were going to complain anyway and saves the relationship with everyone else.',
      ],
      [
        'Real departures with real availability',
        'Fixed departure dates with remaining seats create genuine urgency without manufacturing it. It also filters enquiries down to people asking about a date you can actually sell.',
      ],
      [
        'Enquiries that carry the date and the party',
        'A travel enquiry without dates, group size and origin city is worthless. Asking for them at the point of enquiry, rather than in a follow-up call, is the difference between a lead and a conversation.',
      ],
      [
        'Search-shaped by destination',
        'People search destinations and durations, not agencies. A structure that gives each destination and each package its own indexable page is what makes a travel site compound over time instead of relying on paid traffic forever.',
      ],
    ],
    faqs: [
      {
        q: 'Do we need live booking and payment, or are enquiries enough?',
        a: 'For most tour operators enquiries are enough and often better, because itineraries get customised and prices vary by group size and season. Live booking makes sense for fixed departures and day tours where nothing is negotiable. We will steer you away from a booking engine you do not need.',
      },
      {
        q: 'Can we show prices when they change with season and group size?',
        a: 'Show a starting price with the basis stated — per person, twin sharing, low season. A starting price that is honest about its assumptions outperforms both a fixed price you cannot honour and no price at all, which most travellers read as expensive.',
      },
      {
        q: 'We sell to travellers in several countries. Does that change the site?',
        a: 'It changes currency, the way dates are written, which payment methods appear and often the entire itinerary emphasis. It can also justify separate pages per source market, since a traveller from Dubai and one from London are searching different phrases for the same trip.',
      },
      {
        q: 'How do we compete with the large booking portals?',
        a: 'Not on generic terms, where they will always outspend you. Specific itineraries, genuine local knowledge and named guides are things a portal cannot replicate, and they are what the traveller who wants a curated trip is actually searching for.',
      },
    ],
    related: ['hotel-website-design', 'restaurant-website-design', 'gym-website-design'],
  },

  {
    slug: 'gym-website-design',
    demo: 'fitness',
    intent: 'I run a gym or studio and I want the website to bring in trials and memberships',
    primary: 'gym website design',
    secondary: [
      'fitness website design',
      'gym website development',
      'personal trainer website',
      'yoga studio website design',
      'fitness studio website',
      'crossfit gym website',
      'gym membership website',
    ],
    h1: 'Gym and fitness studio website design',
    title: 'Gym & Fitness Studio Website Design | PlaxWeb',
    description:
      'Gym websites built around the free trial: class timetable, coach profiles and membership pricing that is easy to compare. Open the demo and try it.',
    lede: 'Almost nobody buys a gym membership from a website. They book a trial, walk in, and decide there. Which means the entire site should be built to produce that first visit — and the two things standing in the way are always the same: people cannot tell when the classes are, and they cannot tell what it costs.',
    requirements: [
      [
        'The timetable, readable on a phone',
        'The most visited page on any gym website, and usually the worst. A weekly schedule that works at phone width, filterable by class and instructor, prevents the enquiry that is really just someone asking what time yoga is.',
      ],
      [
        'Membership pricing laid out for comparison',
        'People compare gyms on price and lock-in. Plans side by side with what each includes and what the commitment is, presented so the differences are obvious, does more for conversion than any amount of gym photography.',
      ],
      [
        'The trial booking is the main call to action',
        'Not "contact us". A specific, low-commitment first session with a date attached, which is what the visitor was willing to do anyway.',
      ],
      [
        'Coaches, with real credentials',
        'Members stay for coaches. Qualifications, specialisms and how long they have been coaching turn a facility into a set of people, and people are what someone nervous about walking in is really evaluating.',
      ],
      [
        'Honest about the room itself',
        'Photographs of the actual floor at a normal hour, not an empty studio at dawn. Prospective members are trying to work out how crowded it gets and whether they will feel out of place.',
      ],
    ],
    faqs: [
      {
        q: 'Can members book classes through the site?',
        a: 'Yes, either through your existing gym management platform embedded into the site, or as a request that reaches the desk. Most gyms already pay for a system that does this, and connecting to it is better than replacing it.',
      },
      {
        q: 'Should we publish our membership prices?',
        a: 'In almost all cases yes. Gyms that hide pricing are trying to get the prospect onto a sales call, and the cost is that price-sensitive visitors simply leave for a competitor who told them. Publishing filters your enquiries rather than reducing them.',
      },
      {
        q: 'We run personal training as well as memberships. Can both work on one site?',
        a: 'Yes, but they are different sales with different buyers, so they need their own paths and their own enquiry routes. Personal training is sold on the trainer and the outcome; membership is sold on access, timetable and price.',
      },
      {
        q: 'Can we sell online programmes or class packs?',
        a: 'Yes, and for studios with limited floor space this is often where the margin is. Digital programmes, class packs and challenge sign-ups can be sold with online payment and delivered by email without needing a full membership platform.',
      },
    ],
    related: ['salon-website-design', 'dental-clinic-website-design', 'school-website-design'],
  },

  {
    slug: 'interior-design-website',
    demo: 'interior',
    intent: 'I am an interior designer and I need a website that produces serious project enquiries',
    primary: 'interior design website',
    secondary: [
      'interior designer website design',
      'interior design portfolio website',
      'architect website design',
      'design studio website',
      'interior design company website',
      'architecture firm website',
      'home renovation website',
    ],
    h1: 'Interior design and architecture website design',
    title: 'Interior Design & Architecture Website Design | PlaxWeb',
    description:
      'Portfolio websites for design studios that qualify the enquiry: case studies with real budgets, scope and duration. Open the working demo and see it.',
    lede: 'A design studio\u2019s website has an unusual problem: it is judged as a piece of design work in its own right, and it is also expected to filter out the enquiries that waste the studio\u2019s time. Both come down to the same thing — showing complete projects with the budget, scope and timeline attached, rather than a grid of beautiful images with no context.',
    requirements: [
      [
        'Case studies, not a gallery',
        'The brief, the constraint, what was decided and why, and how it turned out. This is what a prospective client reads to work out whether you can handle their project, and it is what makes a design site rank for anything at all.',
      ],
      [
        'Budgets and durations shown',
        'The single most effective filter in this industry. A client who sees that your projects run at a certain level either self-selects in or leaves quietly, and the ones who remain are worth speaking to.',
      ],
      [
        'Photography given the space it needs',
        'Design work must be viewable large and load fast, which are usually in tension. Correct formats, responsive sizes and lazy loading are what let a heavy portfolio stay quick on a phone.',
      ],
      [
        'The scope stated plainly',
        'Full turnkey, design only, consultation, residential or commercial. Enquiries for work you do not take are a tax on the studio, and the website is the cheapest place to prevent them.',
      ],
      [
        'An enquiry that captures the project',
        'Property type, approximate size, stage and budget band. A designer should be able to tell from the enquiry alone whether it is worth a call, and a bare contact form never allows that.',
      ],
    ],
    faqs: [
      {
        q: 'We do not want to publish our budgets. Is a band enough?',
        a: 'A band is enough, and it does the same work. Something like "projects from this level upward" or a range per project type sets expectations without committing you to a number. What does not work is nothing at all, which produces enquiries with no budget behind them.',
      },
      {
        q: 'Our photography is the site. Will it be slow?',
        a: 'It should not be. Large imagery is a solved problem — modern formats, correctly sized variants for each screen, and loading only what is on screen. The demo is image-heavy and still loads quickly on a phone connection, which is the standard we hold to.',
      },
      {
        q: 'Should we show work that is not finished or not photographed yet?',
        a: 'Work in progress can be one of your strongest sections, because it shows the process a client is actually buying. It needs to be presented as such rather than mixed into finished work, where unfinished photography undermines everything around it.',
      },
      {
        q: 'Does this suit an architecture practice as well as an interiors studio?',
        a: 'Yes, with a shift in emphasis. Architecture enquiries turn on planning, feasibility and regulation, so the case studies carry more technical narrative, and credentials and registration matter more than they do for interiors.',
      },
    ],
    related: ['real-estate-website-design', 'hotel-website-design', 'boutique-website-design'],
  },

  {
    slug: 'hotel-website-design',
    demo: 'resort',
    intent: 'I run a hotel or resort and I want direct bookings instead of paying commission',
    primary: 'hotel website design',
    secondary: [
      'resort website design',
      'hotel website development',
      'boutique hotel website',
      'hotel direct booking website',
      'homestay website design',
      'villa rental website',
      'hospitality website design',
    ],
    h1: 'Hotel and resort website design',
    title: 'Hotel & Resort Website Design for Direct Bookings | PlaxWeb',
    description:
      'Hotel websites built to win direct bookings back from the travel portals: rooms, tariffs, experiences and a date-based enquiry. Open the demo first.',
    lede: 'Every hotel has the same arithmetic problem: the travel portals bring the guests and take fifteen to twenty-five percent of the room rate for doing it. Your own website cannot replace them, and it does not need to. It needs to convert the guest who has already found you on a portal and is now checking whether booking direct is better — because a meaningful share of them do exactly that before booking.',
    requirements: [
      [
        'Rooms shown properly, with tariffs',
        'Each room type with real photographs, what is in it, how many it sleeps and the rate basis. Guests compare this against the portal listing side by side, and anything missing sends them back to the portal.',
      ],
      [
        'A clear reason to book direct',
        'Best rate, a free upgrade, late checkout, breakfast included, flexible cancellation. Guests will book direct if given a reason, and most hotel sites never give one.',
      ],
      [
        'Date-driven enquiry or live availability',
        'A guest thinks in dates. Whether it goes to a live booking engine or to a dated enquiry, the first thing the site asks should be when they are coming and how many.',
      ],
      [
        'The location and the experience sold, not just the room',
        'Nobody chooses a resort for its mattress. What there is to do, how far the airport is, what the property is like at different times of year — this is the content that both persuades and ranks.',
      ],
      [
        'Fast on a weak connection',
        'Hospitality sites are the heaviest on the web and are frequently opened on hotel wifi, aeroplane connections and mobile data abroad. A slow site loses the booking to the portal, which is never slow.',
      ],
    ],
    faqs: [
      {
        q: 'Can the site connect to our channel manager or booking engine?',
        a: 'Yes. Most channel managers and booking engines provide an embeddable engine or an API, and we connect to whichever you already use so rates and availability stay in one place. Smaller properties often do better with a dated enquiry and a human reply, which converts well and costs nothing per booking.',
      },
      {
        q: 'Will a website really reduce our commission bill?',
        a: 'Partly, and honestly it is worth being realistic. Portals will keep bringing you guests who have never heard of you. What a good direct site captures is the returning guest and the one who found you on a portal and then searched your name — that traffic is already yours, and it is the cheapest revenue a hotel has.',
      },
      {
        q: 'We are a small homestay, not a resort. Is this over-specified?',
        a: 'The structure scales down. A homestay needs fewer room types and no booking engine, but the same fundamentals: real photographs, honest tariffs, the location sold properly and a dated enquiry. Often it is a simpler and cheaper build.',
      },
      {
        q: 'Do we need the site in more than one language?',
        a: 'If a meaningful share of your guests arrive from a country that does not read English comfortably, yes, and it is one of the highest-return additions in hospitality. It needs proper language markup so search engines serve the right version rather than treating them as duplicates.',
      },
    ],
    related: ['travel-agency-website-design', 'restaurant-website-design', 'real-estate-website-design'],
  },

  {
    slug: 'boutique-website-design',
    demo: 'boutique',
    intent: 'I sell products from a boutique and I want a website that takes orders',
    primary: 'boutique website design',
    secondary: [
      'fashion website design',
      'clothing store website',
      'online store design',
      'ecommerce website design',
      'jewellery website design',
      'small retail website',
      'label website design',
    ],
    h1: 'Boutique and retail website design',
    title: 'Boutique & Retail Website Design with Ordering | PlaxWeb',
    description:
      'Boutique websites that sell without the weight of a full store: catalogue with fabric, sizes and prices, plus direct ordering. Open the demo and try it.',
    lede: 'Most independent boutiques do not need a full ecommerce platform, and paying for one is a common and expensive mistake. What they need is a catalogue that presents each piece properly — fabric, sizes, price, availability — and a way for the customer to order without a checkout that costs a monthly fee and takes a percentage.',
    requirements: [
      [
        'Each piece given its own page',
        'Photographs, fabric, care, sizing and price. A catalogue built as individual pages means each piece can be sent to a customer as a link, shared, and found in search, which a gallery of images cannot do.',
      ],
      [
        'Sizing answered before it is asked',
        'Fit is the single largest cause of both abandoned orders and returns. A real size guide with measurements, and a note on how the piece runs, does more for conversion than any discount.',
      ],
      [
        'Ordering that suits your volume',
        'A boutique selling a few pieces a day does not need a checkout with a monthly subscription. A pre-filled order message with the item, size and price already in it converts well, costs nothing per order, and keeps the conversation personal.',
      ],
      [
        'Stock that is honest',
        'Nothing damages a small label faster than selling something that is not there. Availability needs to be simple enough that whoever runs the shop will actually keep it current.',
      ],
      [
        'Photography that carries the price',
        'For anything above high-street pricing, photography is the product. Consistent lighting, background and crop across the catalogue is what separates a label from a marketplace listing.',
      ],
    ],
    faqs: [
      {
        q: 'When do we actually need a full ecommerce platform?',
        a: 'When you are taking enough orders per day that handling them by message becomes the bottleneck, when you need inventory synced across a shop and a warehouse, or when you want automated shipping labels and returns. Below that, a platform costs money and complexity for capability you are not using yet.',
      },
      {
        q: 'Can we start simple and add a checkout later?',
        a: 'Yes, and that is usually the right order. The catalogue, sizing and photography are the same work either way. Adding payment later is a well-defined piece of work rather than a rebuild, provided the site was structured for it from the start — which this one is.',
      },
      {
        q: 'How do we handle custom and made-to-order pieces?',
        a: 'These convert better as an enquiry than a checkout, because measurements, fabric choice and timeline all need a conversation. The piece page carries the price basis and the lead time, and the enquiry captures the customisation so the reply can be specific.',
      },
      {
        q: 'Should we sell on a marketplace as well?',
        a: 'Usually yes, for reach, while treating your own site as the place where the brand and the margin live. The marketplace introduces customers to you; the site is where the ones who liked what they bought come back, and it is the only one of the two you own.',
      },
    ],
    related: ['salon-website-design', 'restaurant-website-design', 'interior-design-website'],
  },
];

const bySlug = new Map(services.map((s) => [s.slug, s]));
const byDemo = new Map(services.map((s) => [s.demo, s]));

export function getService(slug: string): Service | undefined {
  return bySlug.get(slug);
}

/** The service page a demo should point at. */
export function serviceForDemo(demoSlug: string): Service | undefined {
  return byDemo.get(demoSlug);
}

/** The solution a service sells, so the two never drift apart. */
export function solutionFor(service: Service) {
  return solutions[service.demo];
}

export const serviceSlugs = services.map((s) => s.slug);
