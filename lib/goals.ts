import { services, type Service } from './services';

/**
 * Business goals, as the owner would state them.
 *
 * Every agency organises itself by what it makes: web design, development,
 * SEO. That is the seller's filing system, not the buyer's. A clinic owner
 * does not wake up needing a clinic website — they wake up needing their
 * appointment book fuller, and a website is one of several things that might
 * do it.
 *
 * So the site is navigable two ways. By industry, for someone who already
 * knows what they want built, and by goal, for someone who only knows what is
 * going wrong. The second group is larger and almost nobody serves it.
 *
 * These are deliberately not keyword pages. "Restaurant website design" is
 * what gets searched and the industry pages own it. These exist to convert
 * someone who arrived without the vocabulary, and to prove we understand the
 * problem before we start describing the solution.
 */

export type Goal = {
  slug: string;
  /** How the owner says it, first person. Used as the entry point label. */
  said: string;
  h1: string;
  title: string;
  description: string;
  /** What is actually happening, named plainly. No sympathy, no selling. */
  problem: string;
  /** The single change that fixes it. */
  shift: string;
  /** Concrete mechanisms. What we build, and why it moves this number. */
  mechanisms: [string, string][];
  /** The measurable thing that should move. */
  metric: string;
  /** Industry pages that serve this goal, most relevant first. */
  services: string[];
  faqs: { q: string; a: string }[];
};

export const goals: Goal[] = [
  {
    slug: 'more-bookings',
    said: 'I want a fuller appointment book',
    h1: 'Websites built to fill an appointment book',
    title: 'Websites That Get You More Bookings | PlaxWeb',
    description:
      'If your booking still depends on someone answering the phone, you lose every enquiry that arrives while you are busy. Open a working demo and try the flow.',
    problem:
      'Most appointment businesses lose bookings at the same two points: the price is not published, so people call to ask instead of booking, and the booking itself needs a human at the other end. Both fail hardest in the evening, which is when most people are actually deciding.',
    shift:
      'Publish what things cost, and let the booking finish without you. The calls you stop getting were never appointments — they were people checking a price you could have shown them.',
    mechanisms: [
      [
        'The price list is public',
        'Every service with its duration and its cost. This is the single change that removes the most work from the front desk, and the objection to it — that competitors will see — is answered by the fact that they can already walk in and ask.',
      ],
      [
        'The booking completes at 11pm',
        'Either it writes into the calendar you already use, or it arrives on WhatsApp with the service, the person and the preferred time already filled in. Either way nobody has to be awake.',
      ],
      [
        'The person, not just the premises',
        'People book a stylist, a doctor, a trainer. Individual profiles with real credentials and real work convert better than any amount of copy about the building.',
      ],
      [
        'A deposit, where no-shows are the real cost',
        'A small refundable card deposit at the point of booking is the most effective way to cut no-shows without turning away first-timers. Worth it above a certain volume, and not before.',
      ],
    ],
    metric: 'Booking requests per month',
    services: ['salon-website-design', 'dental-clinic-website-design', 'gym-website-design', 'hotel-website-design'],
    faqs: [
      {
        q: 'Will this replace the booking software we already pay for?',
        a: 'No, and it should not. Most booking platforms provide an embeddable widget or an API, and connecting to the one you already use is cheaper and less disruptive than migrating. We only build a booking flow from scratch when there is nothing to connect to.',
      },
      {
        q: 'We are worried publishing prices will scare people off.',
        a: 'It will scare off the people who were going to leave anyway, later, after taking up your time. What it does not do is reduce bookings from people who were comfortable with the number — and those people currently leave too, because they could not find it.',
      },
    ],
  },

  {
    slug: 'more-enquiries',
    said: 'I want more enquiries from my website',
    h1: 'Websites built to produce enquiries, not visits',
    title: 'Websites That Generate More Enquiries | PlaxWeb',
    description:
      'Traffic that never contacts you is not a marketing problem. Open a working demo and see what an enquiry route looks like when it is designed properly.',
    problem:
      'A site that gets visitors but no enquiries usually has one contact page, one generic form, and no reason to use either. The visitor has to decide to contact you, find how, and then compose a message from nothing. Most give up at the second step.',
    shift:
      'Put the way out on every page, and make the message write itself. The point is not more traffic — it is that the traffic you already have currently has nowhere obvious to go.',
    mechanisms: [
      [
        'The route out is never more than a thumb away',
        'Call, WhatsApp and enquire sit in a bar you can reach one-handed, on every page, not only at the bottom of a contact page nobody scrolled to.',
      ],
      [
        'The message arrives pre-written',
        'A WhatsApp button that opens with the product, the page or the service already named. It removes the hardest part of making contact, which is working out what to say.',
      ],
      [
        'The form asks for what your team needs to act',
        'Not a name and a blank box. The fields that let you reply with something specific, and no more than that — every extra field costs submissions.',
      ],
      [
        'Every enquiry says where it came from',
        'Which page, which product, which device. Within a month you know which parts of the site earn their place and which are decoration.',
      ],
    ],
    metric: 'Enquiries per hundred visitors',
    services: [
      'interior-design-website',
      'boutique-website-design',
      'travel-agency-website-design',
      'real-estate-website-design',
    ],
    faqs: [
      {
        q: 'We get traffic but nobody contacts us. Is that a website problem?',
        a: 'Usually yes, and it is testable. If people are landing on pages that answer a question and then leaving, the page did its job and offered nothing next. If they are landing and leaving in seconds, the traffic is wrong and a new site will not fix it. We will tell you which one you have before quoting.',
      },
      {
        q: 'Is WhatsApp really better than a form?',
        a: 'In most of the markets we build for, yes — it is where people already are and it feels like less of a commitment. But it is not a substitute for a form: a form captures structured detail your team can sort and follow up. Serious sites run both and let the customer choose.',
      },
    ],
  },

  {
    slug: 'sell-online',
    said: 'I want to sell without a full online store',
    h1: 'Selling online without the weight of a store',
    title: 'Sell Products Online Without a Full Store | PlaxWeb',
    description:
      'Most small labels do not need a subscription ecommerce platform. Open a working catalogue and see what a lighter route to selling looks like.',
    problem:
      'Paying a monthly platform fee and a percentage of every order makes sense at volume. Below it, you are funding inventory sync, abandoned-cart automation and shipping integrations you are not using, and the setup is heavy enough that most catalogues never get finished.',
    shift:
      'Build the catalogue properly and take the order the way you already take it. Add a checkout when the volume makes the fee worth paying, not before.',
    mechanisms: [
      [
        'Every piece has its own page',
        'Photographs, fabric or materials, sizing, price, availability. Individual pages can be sent to one customer as a link, shared, and found in search. A gallery of images can do none of those things.',
      ],
      [
        'Sizing answered before it is asked',
        'Fit causes more abandoned orders and more returns than price does. Real measurements and a note on how a piece runs is worth more than a discount.',
      ],
      [
        'The order arrives itemised',
        'A pre-filled message carrying the item, size and price. It costs nothing per order, converts well at low volume, and keeps the conversation personal — which is the thing a small label actually sells.',
      ],
      [
        'Built so a checkout can be added later',
        'The catalogue, photography and sizing are the same work either way. Adding payment later is a defined piece of work rather than a rebuild, provided the structure anticipated it.',
      ],
    ],
    metric: 'Orders per month, without a platform fee',
    services: ['boutique-website-design', 'restaurant-website-design'],
    faqs: [
      {
        q: 'When should we actually move to a real ecommerce platform?',
        a: 'When handling orders by message becomes the bottleneck, when stock has to stay in sync across a shop and a warehouse, or when you need automated shipping labels and returns. Below that, a platform costs money and complexity for capability you are not using.',
      },
      {
        q: 'Does this work for made-to-order pieces?',
        a: 'Better than a checkout does. Measurements, fabric choice and lead time all need a conversation, so the piece page carries the price basis and the timeline, and the enquiry captures the customisation so your reply can be specific.',
      },
    ],
  },

  {
    slug: 'better-leads',
    said: 'I am wasting time on enquiries that go nowhere',
    h1: 'Websites that filter before your team spends time',
    title: 'Get Fewer, Better-Qualified Enquiries | PlaxWeb',
    description:
      'For high-value work, the website is not there to attract everyone. Open a demo and see how budget, scope and timeline get answered before you pick up the phone.',
    problem:
      'When every enquiry arrives as a name and a sentence, someone has to spend a call working out whether it is real. For businesses selling projects rather than products, that qualifying call is the single most expensive thing on the site — and most of them end in nothing.',
    shift:
      'Let the site do the filtering. Publish the things that make people self-select — budget bands, scope, what you do not do — and capture the rest at the point of enquiry.',
    mechanisms: [
      [
        'Budget bands, stated',
        'The most effective filter there is. A client who sees the level you work at either self-selects in or leaves quietly, and the ones who remain are worth a call. A band is enough; you do not have to publish a price.',
      ],
      [
        'The scope named plainly',
        'What you take on and what you do not. Enquiries for work you do not do are a tax on the business, and the website is the cheapest place to prevent them.',
      ],
      [
        'Case studies that carry constraints',
        'The brief, the budget, the timeline, what was decided and why. This is what a serious buyer reads to work out whether you can handle their project — and it is what makes the page rank at all.',
      ],
      [
        'The enquiry captures the project',
        'Property type, size, stage, budget band, timeline. Enough that you can tell from the enquiry alone whether it is worth a call.',
      ],
    ],
    metric: 'Share of enquiries worth a call',
    services: ['interior-design-website', 'real-estate-website-design', 'school-website-design'],
    faqs: [
      {
        q: 'Will publishing budgets reduce our enquiries?',
        a: 'It will reduce the count and raise the quality, which is the trade you are asking for. If total volume matters more to you than the mix, this is the wrong approach and we will say so.',
      },
      {
        q: 'We do not want competitors seeing our pricing.',
        a: 'They already can, by enquiring. What publishing changes is not what competitors know but what customers do — and the customers who cannot find it assume the worst and leave.',
      },
    ],
  },

  {
    slug: 'direct-bookings',
    said: 'I am paying commission on customers I already have',
    h1: 'Winning back the customer a portal already sold you',
    title: 'Win Direct Bookings, Not Commission | PlaxWeb',
    description:
      'Portals bring guests you would never have reached, then charge on the ones who already know your name. Open a demo and see what a direct route looks like.',
    problem:
      'Aggregators and travel portals take fifteen to twenty-five percent of a booking, and a meaningful share of the people they charge you for had already decided on you. They search your name, land on a site that answers less than the portal listing did, and go back.',
    shift:
      'Stop trying to replace the portal and start converting the person who is comparing it against you. That traffic is already yours, and it is the cheapest revenue you have.',
    mechanisms: [
      [
        'Match the listing, then beat it',
        'Every room or package with real photography, what is included, and the rate basis. A guest comparing you against a portal side by side will take whichever answers more, and anything missing sends them back.',
      ],
      [
        'A stated reason to book direct',
        'Best rate, late checkout, an upgrade, flexible cancellation. Guests will book direct when given a reason, and most sites in this category never give one.',
      ],
      [
        'The first question is the date',
        'A guest thinks in dates and party size. Whether it goes to a booking engine or a dated enquiry, that is what the page should ask first.',
      ],
      [
        'Fast on a bad connection',
        'These sites are the heaviest on the web and are opened on hotel wifi, aeroplane connections and roaming data. The portal is never slow, so this is not optional.',
      ],
    ],
    metric: 'Direct bookings as a share of total',
    services: ['hotel-website-design', 'travel-agency-website-design', 'restaurant-website-design'],
    faqs: [
      {
        q: 'Will a website actually reduce our commission bill?',
        a: 'Partly, and it is worth being realistic. Portals will keep bringing you guests who have never heard of you, and you should keep them for that. What a direct site captures is the returning guest and the one who found you on a portal and then searched your name — that is where the commission genuinely hurts.',
      },
      {
        q: 'Can it connect to our channel manager?',
        a: 'Usually. Most channel managers and booking engines provide an embeddable engine or an API, so rates and availability stay in one place. Smaller properties often convert better with a dated enquiry and a human reply, which costs nothing per booking.',
      },
    ],
  },

  {
    slug: 'build-trust',
    said: 'People compare us and pick someone else',
    h1: 'Websites for businesses that get judged before they get called',
    title: 'Build Trust With Customers Comparing You | PlaxWeb',
    description:
      'In healthcare, education and professional services the website is judged on credibility first. Open a working demo and see what that looks like built properly.',
    problem:
      'Some categories are chosen, not browsed. A patient picking a clinic or a parent picking a school is weighing qualifications, honesty about cost and whether they will be treated well — usually on a phone, quickly, and against two or three alternatives open in other tabs.',
    shift:
      'Put the checkable facts where they are looked for. Credentials, real outcomes, honest costs. Trust in these categories is built with specifics, and lost with adjectives.',
    mechanisms: [
      [
        'Credentials stated, not implied',
        'Registrations, qualifications, years in practice, professional bodies. The most checkable signal you have, and the one most sites bury on a page nobody visits.',
      ],
      [
        'Real outcomes, published',
        'Board results, university destinations, treatment price bands. Whatever your category is compared on, publish it. People will find it elsewhere if you do not, and a competitor who published it looks more confident.',
      ],
      [
        'Written in the customer\u2019s language',
        'People search for the problem, not the procedure. Pages framed around what they are experiencing, with the technical name alongside, both help the reader and match how the search was typed.',
      ],
      [
        'Claims we can stand behind',
        'No invented testimonials, no outcome guarantees. These categories are held to a higher standard by search engines and by regulators, and the shortcut is also the fastest way to be demoted.',
      ],
    ],
    metric: 'Enquiries from people who compared you',
    services: ['dental-clinic-website-design', 'school-website-design', 'interior-design-website'],
    faqs: [
      {
        q: 'We cannot publish prices, every case is different.',
        a: 'A band with the reason it varies is enough, and it is what patients and parents are actually looking for. Total silence about cost is what makes someone close the page and call the practice that gave them a number.',
      },
      {
        q: 'Can we show reviews and before-and-after photographs?',
        a: 'Reviews yes, and best pulled live from your Google profile so they are verifiable rather than typed by us. Clinical photography is governed by rules that differ by country and professional body, and we will tell you what your regulator allows rather than guessing.',
      },
    ],
  },
];

const byGoal = new Map(goals.map((g) => [g.slug, g]));

export function getGoal(slug: string): Goal | undefined {
  return byGoal.get(slug);
}

export const goalSlugs = goals.map((g) => g.slug);

/** The industry pages a goal points at, resolved and in order. */
export function servicesFor(goal: Goal): Service[] {
  return goal.services
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is Service => Boolean(s));
}

/** The goals an industry page can send someone sideways to. */
export function goalsForService(serviceSlug: string): Goal[] {
  return goals.filter((g) => g.services.includes(serviceSlug));
}
