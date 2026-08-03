/**
 * Guides.
 *
 * The point of these is footprint, but shallow pages do not produce footprint
 * any more — they produce impressions and no clicks, and enough of them drag a
 * small site down. So each one here answers a question a business owner
 * actually types, with a position rather than a summary of both sides.
 *
 * The test applied to every paragraph: would this be worth reading by someone
 * who is never going to hire us? If not it is padding, and padding is what
 * makes a site look like it was written to rank rather than to help.
 *
 * Four to start. More matter than four, but four that are worth reading beat
 * twenty that are not, and the twenty are actively harmful.
 */

export type GuideSection = { h: string; p: string[] };

export type Guide = {
  slug: string;
  /** The question as it gets typed, near enough. */
  title: string;
  h1: string;
  description: string;
  /** Standfirst. The answer, before the argument. */
  dek: string;
  updated: string;
  minutes: number;
  sections: GuideSection[];
  /** What someone should leave with if they read nothing else. */
  takeaways: string[];
  /** Industry pages this genuinely leads to. */
  related: string[];
};

export const guides: Guide[] = [
  {
    slug: 'what-a-business-website-should-cost',
    title: 'What a business website should cost (and what makes it expensive)',
    h1: 'What a business website should cost',
    description:
      'Why the same brief is quoted at wildly different numbers, what actually drives the price, and how to tell an expensive website from an overpriced one.',
    dek: 'Almost nothing about the price of a website is about design. It is about how many decisions someone has to make on your behalf, and how many of them you will change your mind about.',
    updated: '2026-08-03',
    minutes: 7,
    sections: [
      {
        h: 'Why the same brief gets quoted four different ways',
        p: [
          'Ask four studios for a website for the same business and the numbers will not be close. That is not because three of them are trying it on. It is because \u201ca website for my salon\u201d is not a specification, and each of them has quietly filled in the gaps differently.',
          'One has assumed a template with your logo dropped in. One has assumed six pages of writing they will have to produce themselves. One has assumed a booking system connected to the software you already pay for. One has assumed photography. Those are four different jobs, and the only thing they have in common is the sentence that started them.',
          'The single most useful thing you can do before collecting quotes is to write down what happens when the site works: someone books, someone orders, someone sends an enquiry with enough detail that you can reply properly. That sentence narrows the gap between quotes more than any amount of negotiating.',
        ],
      },
      {
        h: 'What actually drives the number',
        p: [
          'Page count matters far less than people expect. Ten pages of the same kind is barely more work than five. What costs money is the number of genuinely different things on the site: a booking flow is a different thing from a menu, which is a different thing from a case study, which is a different thing from a fee table.',
          'Integrations are the other half. Connecting to a booking platform, a payment provider or a CRM is not hard in itself, but each one adds a system that can change under you and a set of edge cases someone has to think through. Two integrations is not twice one; it is closer to three times.',
          'Content is where projects actually overrun. A site can be finished in three weeks and sit unlaunched for two months waiting on photographs and copy that nobody was assigned. If a quote does not say who is writing the words, that is the risk you are carrying.',
        ],
      },
      {
        h: 'Expensive and overpriced are not the same thing',
        p: [
          'An expensive website has a lot of work in it. An overpriced one has an agency in it — layers of account management, a design phase that produces slides rather than screens, and a discovery process whose output is a document telling you what you already told them.',
          'The way to tell them apart is to ask what you get at each stage and what happens if you stop. A studio that can answer that quickly is quoting from a scope. One that cannot is quoting from a feeling.',
          'Be equally careful at the bottom. A site at a few thousand rupees or a couple of hundred dollars is a template with your details typed in, and that is a legitimate product — it is just not a website designed around how your business sells. The problem is not the price, it is being sold the second thing at the first price.',
        ],
      },
      {
        h: 'Questions worth asking before you sign anything',
        p: [
          'Who writes the words, and what happens if they are late. Who owns the code and the domain at the end. What the site costs to run per year, separately from what it costs to build. What a change costs six months from now, when the person who built it has moved on to other work.',
          'And the one most people forget: what happens if it does not work. Not a refund — nobody sensible offers that — but whether anyone is going to look at what the site is doing after launch and tell you honestly which parts are earning their place.',
        ],
      },
    ],
    takeaways: [
      'Write down what a working website does for you before collecting quotes. It narrows the spread more than negotiating does.',
      'Different kinds of page cost money. More of the same kind of page barely does.',
      'Every integration is a system that can change under you. Two is closer to three times the cost of one, not twice.',
      'Ask who writes the content. Unassigned content is the most common reason a finished site sits unlaunched.',
      'Cheap templates are a real product, honestly priced. The problem is being sold one as though it were bespoke.',
    ],
    related: ['salon-website-design', 'restaurant-website-design', 'dental-clinic-website-design'],
  },

  {
    slug: 'website-or-instagram',
    title: 'Website or Instagram: which does a small business actually need?',
    h1: 'Website or Instagram?',
    description:
      'Instagram is better at being found and worse at being useful. A straight comparison of what each one does, and when paying for both is genuinely wasteful.',
    dek: 'They are not competing. Instagram is how people find you and decide they like you. A website is where they find out whether you can help them, and how much it costs.',
    updated: '2026-08-03',
    minutes: 6,
    sections: [
      {
        h: 'What Instagram is genuinely better at',
        p: [
          'Discovery, and it is not close. A salon posting good work reaches people who were not looking for a salon, which no website can do. It is also the cheapest place to look alive: a business that posted yesterday reads as open, and a website that has not changed in two years reads as closed even when it is not.',
          'It is also where people check whether they trust you. Plenty of enquiries begin on a search engine and detour through Instagram before anyone makes contact. If nothing is there, that is a real cost.',
        ],
      },
      {
        h: 'What it is structurally bad at',
        p: [
          'Holding a price list. Answering a question at eleven at night. Being found by someone searching for what you do in the town you do it in. Taking a booking with a date attached. Existing on a platform whose reach you do not control and whose rules change without notice.',
          'The specific failure most owners recognise: the same question in the DMs every day. What do you charge, are you open Sunday, do you do this treatment. Every one of those is a question a page could have answered while you were with a customer, and each is an interruption that arrives during work.',
        ],
      },
      {
        h: 'The honest case for skipping the website',
        p: [
          'If your work is entirely visual, your prices are genuinely bespoke, your bookings come through people you already know, and you are not trying to be found by strangers in your area, a website will not do much for you. A well-kept Instagram and a phone number is a complete setup for a lot of small studios, and being sold a site you do not need is a real thing that happens.',
          'Two signals that this has stopped being true: you are answering the same question repeatedly, and people are finding you by name rather than by what you do. The first is a cost you are paying in interruptions. The second means you are only reaching people who already heard of you.',
        ],
      },
      {
        h: 'Where each one earns its place',
        p: [
          'Use Instagram for the work, the personality and the proof that you are active. Use the site for everything that has to be looked up rather than scrolled past: prices, hours, location, what you actually offer, and a way to book or enquire that finishes without you.',
          'The pairing that works is unglamorous. Instagram brings people in, the site answers what they need and takes the booking, and the enquiry arrives with enough detail that your reply can be useful rather than a request for more information.',
        ],
      },
    ],
    takeaways: [
      'Instagram is better at being found. A website is better at being useful. They are not alternatives.',
      'If you answer the same question in DMs every day, that is a page you have not built yet.',
      'If people find you by name rather than by what you do, you are only reaching people who already know you.',
      'Entirely visual work, bespoke pricing and word-of-mouth bookings is a real case for not building a website yet.',
      'Instagram reach is rented. A website is the only part of your presence you own.',
    ],
    related: ['salon-website-design', 'boutique-website-design', 'interior-design-website'],
  },

  {
    slug: 'getting-found-locally',
    title: 'Getting found locally: what actually moves the needle',
    h1: 'Getting found locally',
    description:
      'For most local businesses the website is not the thing that gets you found. This is what does, in the order it is worth doing, with honest timescales.',
    dek: 'If you serve people who live near you, your Google Business Profile matters more than your website. Most of the money spent on local SEO is spent in the wrong place.',
    updated: '2026-08-03',
    minutes: 8,
    sections: [
      {
        h: 'The map results are a different competition',
        p: [
          'Search for almost any local service and the first thing on the screen is a map with three businesses on it. That block is not won by your website. It is won by your Google Business Profile, and it is driven by proximity to the person searching, how complete and active the profile is, and reviews.',
          'This matters because it changes where the effort goes. A studio quoting you for months of content aimed at the ordinary results is competing for the space underneath the thing everyone actually taps. Get the profile right first. It is free, it takes an afternoon, and for a lot of businesses it produces more calls than everything else combined.',
        ],
      },
      {
        h: 'What a complete profile actually means',
        p: [
          'Every field filled, not most of them. The correct primary category, which is the single most influential setting and the one most often left wrong. Real opening hours including holidays. Photographs taken this year, of the actual premises. Services listed individually with prices where you have them.',
          'Then the part nobody enjoys: reviews. Not buying them, not incentivising them, which is against the rules and detectable. Asking, at the moment someone is visibly happy, with a link that takes two taps. A business with forty honest reviews outranks one with four in almost every case, and no amount of website work closes that gap.',
        ],
      },
      {
        h: 'What the website contributes',
        p: [
          'It corroborates. Google cross-references the name, address and phone number on your site against your profile and everywhere else you appear. When those disagree — an old suite number, a number you stopped using — confidence drops, and confidence is what the map result is made of.',
          'It also answers the searches that are not near-me searches. Somebody looking for a specific treatment, a particular cuisine, a service you offer that your competitors do not. Those land on pages, not on map pins, and that is where having a page per thing you actually do starts to pay.',
        ],
      },
      {
        h: 'Honest timescales',
        p: [
          'The profile can produce calls within days of being fixed, because you are correcting something that was already competing rather than starting from nothing. Ordinary search results are slower and depend heavily on how old your domain is and whether anyone links to it.',
          'A new site on a new domain with no links pointing at it should expect months, not weeks, for anything competitive. Long-tail phrases move first. Anyone promising faster than that is either buying ads or telling you what you want to hear.',
        ],
      },
      {
        h: 'Where money is most often wasted',
        p: [
          'Directory submissions in bulk. Blog posts written to a keyword rather than to a question. Anything sold as a monthly retainer with no stated deliverable. And backlink packages, which range from useless to actively dangerous.',
          'The unglamorous version costs almost nothing: a complete profile, consistent details everywhere, a page for each thing you genuinely do, and a steady trickle of real reviews. It is not a service anyone can sell you at a good margin, which is largely why it gets skipped.',
        ],
      },
    ],
    takeaways: [
      'The map block is won by your Google Business Profile, not your website. Fix that first.',
      'Primary category is the most influential setting on the profile and the most commonly wrong.',
      'Reviews are the gap no amount of website work closes. Ask at the moment someone is happy.',
      'Your site corroborates your profile. Inconsistent contact details quietly cost you confidence.',
      'A new domain with no links should expect months for competitive terms. Anyone promising weeks is selling ads or telling you what you want to hear.',
    ],
    related: ['dental-clinic-website-design', 'restaurant-website-design', 'gym-website-design'],
  },

  {
    slug: 'why-a-slow-website-costs-enquiries',
    title: 'Why a slow website costs you enquiries',
    h1: 'Why a slow website costs enquiries',
    description:
      'What actually makes a website slow, why it matters more on a phone than you think, and the handful of things that account for most of the problem.',
    dek: 'Speed is not a technical score. It is the number of people who never saw your page at all, because they left while it was still deciding what to show them.',
    updated: '2026-08-03',
    minutes: 6,
    sections: [
      {
        h: 'The part that gets missed',
        p: [
          'People do not experience a slow website as slow. They experience it as not having found anything, and they go back and tap the next result. There is no signal in your analytics that says this happened, which is why it is so easy to keep paying for.',
          'It compounds on a phone on mobile data, which is how most people arrive from a message or a search. The site you tested on office wifi on a laptop is not the site your customer is using.',
        ],
      },
      {
        h: 'What actually makes sites slow',
        p: [
          'Images, overwhelmingly. A photograph straight off a camera can be several megabytes; the same photograph sized for the space it appears in and served in a modern format is a fraction of that and looks identical. This one issue accounts for most of the weight on most small business websites.',
          'Then plugins and third-party scripts. Every chat widget, popup builder, analytics tool and review embed is code from someone else that runs before your page finishes. Five of them is normal on a template site and any one can be the thing holding everything up.',
          'Then fonts. Loading six weights of two families when the design uses three is invisible in a design tool and expensive on a phone.',
        ],
      },
      {
        h: 'The one nobody mentions: layout that moves',
        p: [
          'A page that finishes loading in good time can still feel broken if things jump while it settles — an image arriving and pushing text down, a banner appearing above the fold and shifting everything. Everyone has tapped the wrong thing because of this.',
          'It is measurable, it is one of the things search engines score, and it is almost always caused by not telling the browser how big something will be before it arrives. It is also one of the cheapest things to fix.',
        ],
      },
      {
        h: 'What is worth doing about it',
        p: [
          'Test the real thing on a real phone on mobile data, not on the office connection. Then look at the images before anything else, because that is where the weight is. Then count the third-party scripts and remove the ones nobody looks at, which is usually most of them.',
          'Be wary of speed as a product. Caching plugins and optimisation services can help a heavy site, but they are compensating for weight that should not be there. A site that is light to begin with does not need them, and a site that needs them permanently has a structural problem being managed rather than fixed.',
        ],
      },
    ],
    takeaways: [
      'Nobody reports a slow site. They leave, and nothing in your analytics tells you they did.',
      'Test on a real phone on mobile data. Office wifi on a laptop is not what your customer has.',
      'Images are most of the weight on most small business sites. Fix those before anything else.',
      'Every third-party widget is someone else\u2019s code running before your page finishes.',
      'Layout that jumps while loading is cheap to fix and one of the things search engines score.',
    ],
    related: ['restaurant-website-design', 'hotel-website-design', 'real-estate-website-design'],
  },
];

const bySlug = new Map(guides.map((g) => [g.slug, g]));

export function getGuide(slug: string): Guide | undefined {
  return bySlug.get(slug);
}

export const guideSlugs = guides.map((g) => g.slug);
