import { mittiImages as img } from '@/lib/images';

export const mitti = {
  name: 'Studio Mitti',
  phoneDisplay: '+91 80 2334 6611',
  phoneRaw: '918023346611',
  email: 'studio@mitti.design',
  address: ['Studio Mitti', '18, 8th Cross, Malleswaram', 'Bengaluru 560003'],
  founded: '2016',
};

export const statement =
  'We design homes and small workplaces in and around Bengaluru. Lime plaster, solid teak, terracotta, cane — materials that age rather than degrade, made by people we can drive to. Fourteen projects a year, no more, because that is how many we can be present for.';

export type Project = {
  slug: string;
  name: string;
  type: string;
  location: string;
  area: string;
  year: string;
  duration: string;
  budget: string;
  brief: string;
  moves: string[];
  cover: { src: string; alt: string };
  frames: { src: string; alt: string }[];
};

export const projects: Project[] = [
  {
    slug: 'rain-tree-house',
    name: 'Rain Tree House',
    type: 'Private residence',
    location: 'Malleswaram, Bengaluru',
    area: '3,150 sq ft',
    year: '2025',
    duration: '9 months',
    budget: '₹1.05 Cr',
    brief:
      'A 1960s house with good bones, dark rooms and a rain tree in the courtyard the family refused to lose. The brief was to open it up without turning it into a glass box.',
    moves: [
      'Two internal walls removed and replaced with a teak-and-cane screen, so the living room borrows the courtyard light without losing separation.',
      'Floors relaid in Kota stone with a lime-plaster skirting instead of skirting board.',
      'All joinery in solid teak from a Yeshwanthpur yard, oiled rather than lacquered so it can be reworked in ten years.',
      'The kitchen moved to face the tree; the old kitchen became a utility and a maid’s room with its own entrance.',
    ],
    cover: img.hero,
    frames: [img.living, img.detail, img.nook],
  },
  {
    slug: 'anjali-apartment',
    name: 'The Anjali Apartment',
    type: 'Apartment renovation',
    location: 'Indiranagar, Bengaluru',
    area: '1,680 sq ft',
    year: '2025',
    duration: '5 months',
    budget: '₹42 lakh',
    brief:
      'A builder-finish 3 BHK for a couple who both work from home and had been fighting over one desk. Two workspaces, no extra room, and a strict budget.',
    moves: [
      'The dining alcove became a shared study with a nine-foot table, used for both work and eating.',
      'A folding cane-and-teak partition lets one person take a call without the other leaving the room.',
      'Bedroom wardrobes rebuilt full height to reclaim the six inches of dead space above them.',
      'Existing vitrified floor kept — the budget went into joinery and light instead of ripping up a perfectly good floor.',
    ],
    cover: img.livingTwo,
    frames: [img.bedroom, img.detailThree, img.colour],
  },
  {
    slug: 'terracotta-farmhouse',
    name: 'Terracotta Farmhouse',
    type: 'Weekend house',
    location: 'Kanakapura Road',
    area: '2,400 sq ft',
    year: '2024',
    duration: '14 months',
    budget: '₹78 lakh',
    brief:
      'A weekend house on a two-acre plot with no reliable power. It had to be comfortable in April without air-conditioning, and to be shut up for three weeks at a stretch without deteriorating.',
    moves: [
      'Filler-slab roof with terracotta blocks, and a 600mm cavity wall on the west face — the interior sits 6–7°C below outside at peak.',
      'Every finish chosen for a house that will be empty and shut: no MDF, no laminate, no fabric that will hold damp.',
      'Deep verandah on three sides with a lime-washed ceiling that bounces light without glare.',
      'Kitchen in granite and stainless steel, so it can be hosed down and locked.',
    ],
    cover: img.villa,
    frames: [img.detailFour, img.colour, img.detailTwo],
  },
  {
    slug: 'quiet-office',
    name: 'A Quiet Office',
    type: 'Workplace',
    location: 'Richmond Town, Bengaluru',
    area: '4,200 sq ft',
    year: '2024',
    duration: '7 months',
    budget: '₹1.4 Cr',
    brief:
      'Twenty-eight people in a firm that does deep, quiet work. The client had been in a glass-box office and wanted the opposite: acoustic calm, no open-plan bench farm.',
    moves: [
      'Six four-person rooms rather than one open floor, with a shared central table for everything else.',
      'Acoustic ceiling in recycled cotton, jute panels on the long wall, carpet only where people walk.',
      'Furniture in oak and powder-coated steel, specified to be repairable rather than replaced.',
      'Every desk within four metres of a window; the meeting rooms took the internal core.',
    ],
    cover: img.office,
    frames: [img.detail, img.livingTwo, img.detailThree],
  },
];

export const approach = [
  {
    stage: 'One',
    title: 'A long first conversation',
    body: 'Two hours in your existing home or office, not our studio. How you actually live matters more than what you have saved. We charge nothing for this and we will tell you honestly if we are not the right practice.',
  },
  {
    stage: 'Two',
    title: 'Design, in three rounds',
    body: 'Concept, then developed design, then working drawings. You see hand sketches and physical material samples before any render. Renders come last, and only to check something specific.',
  },
  {
    stage: 'Three',
    title: 'On site, every week',
    body: 'One of the two partners is on your site weekly, with a written note after each visit. We work with four contractors we have used for years and we do not take a cut from them.',
  },
];

export const fees = [
  ['Consultation & site study', 'Free', 'Two hours, in your space. No obligation.'],
  ['Design only', '₹110 – ₹160 / sq ft', 'Drawings, specifications and material selection. You execute.'],
  ['Design & supervision', '9% of project cost', 'Everything above, plus weekly site supervision and vendor coordination.'],
  ['Turnkey', '14% of project cost', 'We hold the contracts and hand you the keys. Fixed cost agreed before work starts.'],
];

export const materials = [
  ['Lime plaster', 'Breathable, repairable, and it improves with age. We use a Kerala lime and a local applicator we have worked with since 2018.'],
  ['Solid teak', 'From a Yeshwanthpur yard, seasoned eighteen months. Oiled, never lacquered, so a scratch is fixed with a cloth.'],
  ['Kota and Sadarahalli', 'Stone quarried within 400 km. Honed rather than polished — better underfoot and it does not show every mark.'],
  ['Cane and rattan', 'Woven by two families in Chikkaballapur. It costs more than a laminate screen and it lasts thirty years.'],
];

export const press = [
  ['Architectural Digest India', 'Ten small studios to watch, 2025'],
  ['Elle Decor India', 'Rain Tree House, June 2025'],
  ['The Hindu', '“Building with what is already there”, 2024'],
];
