export const project = {
  name: 'Aashray Grove',
  developer: 'Aashray Habitat',
  tagline: '42 garden villas on Sarjapur Road',
  rera: 'PRM/KA/RERA/1251/446/PR/300126/007412',
  phoneDisplay: '+91 80 6821 4400',
  phoneRaw: '918068214400',
  whatsappRaw: '919845661200',
  address: ['Aashray Grove', 'Off Sarjapur–Attibele Road, Dommasandra', 'Bengaluru 562125'],
  mapQuery: 'Dommasandra Sarjapur Attibele Road Bengaluru',
  facts: [
    ['Land parcel', '2.8 acres'],
    ['Units', '42 villas'],
    ['Configurations', '3 & 4 BHK'],
    ['Possession', 'December 2027'],
  ],
};

export type Config = {
  id: string;
  name: string;
  built: string;
  plot: string;
  price: string;
  priceValue: number;
  available: string;
  rooms: string[];
  /** Simple architectural plan drawn as SVG rectangles: [x, y, w, h, label] */
  plan: [number, number, number, number, string][];
};

export const configs: Config[] = [
  {
    id: '3bhk',
    name: '3 BHK Garden Villa',
    built: '2,180 sq ft',
    plot: '1,800 sq ft',
    price: '₹2.14 Cr onwards',
    priceValue: 21400000,
    available: '9 of 18 available',
    rooms: ['Living & dining, double height', 'Three bedrooms, all en-suite', 'Utility and help’s room', 'Private garden, 380 sq ft', 'Covered parking for two'],
    plan: [
      [4, 4, 46, 34, 'Living & dining'],
      [52, 4, 30, 20, 'Kitchen'],
      [52, 26, 30, 12, 'Utility'],
      [4, 40, 34, 26, 'Bedroom 1'],
      [40, 40, 24, 26, 'Bedroom 2'],
      [66, 40, 16, 26, 'Bath'],
      [4, 68, 78, 14, 'Private garden'],
    ],
  },
  {
    id: '4bhk',
    name: '4 BHK Courtyard Villa',
    built: '2,940 sq ft',
    plot: '2,400 sq ft',
    price: '₹2.86 Cr onwards',
    priceValue: 28600000,
    available: '7 of 16 available',
    rooms: ['Living, dining and family room', 'Four bedrooms, all en-suite', 'Internal courtyard with skylight', 'Private garden, 520 sq ft', 'Covered parking for two'],
    plan: [
      [4, 4, 40, 30, 'Living'],
      [46, 4, 22, 30, 'Courtyard'],
      [70, 4, 26, 16, 'Kitchen'],
      [70, 22, 26, 12, 'Utility'],
      [4, 36, 30, 24, 'Dining'],
      [36, 36, 30, 24, 'Bedroom 1'],
      [68, 36, 28, 24, 'Bedroom 2'],
      [4, 62, 44, 20, 'Family room'],
      [50, 62, 46, 20, 'Private garden'],
    ],
  },
  {
    id: '4bhk-duplex',
    name: '4 BHK Duplex, corner',
    built: '3,420 sq ft',
    plot: '3,000 sq ft',
    price: '₹3.52 Cr onwards',
    priceValue: 35200000,
    available: '3 of 8 available',
    rooms: ['Double-height living volume', 'Four bedrooms with a study', 'Roof terrace, 460 sq ft', 'Private garden, 700 sq ft', 'Covered parking for three'],
    plan: [
      [4, 4, 44, 36, 'Living, double height'],
      [50, 4, 28, 22, 'Kitchen'],
      [80, 4, 16, 22, 'Store'],
      [50, 28, 46, 12, 'Dining'],
      [4, 42, 30, 24, 'Study'],
      [36, 42, 30, 24, 'Bedroom 1'],
      [68, 42, 28, 24, 'Bedroom 2'],
      [4, 68, 50, 14, 'Deck'],
      [56, 68, 40, 14, 'Private garden'],
    ],
  },
];

export const amenities = [
  ['Clubhouse, 6,400 sq ft', 'Gym, indoor games, a 24-seat screening room and a hall that residents book for free.'],
  ['25m lap pool', 'Plus a separate toddlers’ pool, both heated between November and February.'],
  ['1.1 km walking loop', 'Around the perimeter, lit and shaded by the 68 existing rain trees we did not cut.'],
  ['Children’s play & creche', 'A fenced play area and a creche run by an operator, open 8am to 7pm.'],
  ['EV-ready parking', 'A 7.4 kW charging point wired to every villa’s own meter.'],
  ['Rainwater & STP', '4.2 lakh litres of rainwater storage and a 60 KLD sewage treatment plant for landscape reuse.'],
];

export const location = [
  ['Wipro Corporate Office', '4.2 km', '11 min'],
  ['RGA Tech Park', '6.8 km', '16 min'],
  ['Greenwood High International', '5.1 km', '13 min'],
  ['Sarjapur Road (junction)', '3.4 km', '9 min'],
  ['Manipal Hospital, Sarjapur', '7.6 km', '18 min'],
  ['Electronic City', '17 km', '35 min'],
  ['Kempegowda Airport', '58 km', '85 min'],
];

export const specs = [
  ['Structure', 'RCC framed structure, seismic zone II compliant, designed for G+2'],
  ['Flooring', '800×1600 mm vitrified tile in living and bedrooms; anti-skid ceramic in bathrooms and utility'],
  ['Kitchen', 'Granite counter, stainless steel sink, provision for chimney, hob, RO and dishwasher'],
  ['Bathrooms', 'Jaquar or equivalent CP fittings, concealed cisterns, geyser point in every bath'],
  ['Doors & windows', 'Teak main door frame with veneer shutter; UPVC windows with mosquito mesh'],
  ['Electrical', 'Concealed copper wiring, modular switches, 5 kVA per villa, 100% DG backup for common areas'],
  ['Painting', 'Acrylic emulsion inside, textured exterior finish with 7-year warranty'],
  ['Security', 'Gated perimeter, CCTV on all approach roads, video door phone in every villa'],
];

export const milestones = [
  ['Land acquired & RERA registered', 'Complete', true],
  ['Excavation and foundation', 'Complete', true],
  ['Phase 1 — 18 villas, structure', 'Complete', true],
  ['Phase 1 — finishing', 'In progress · 62%', false],
  ['Phase 2 — 24 villas, structure', 'In progress · 30%', false],
  ['Clubhouse & landscape', 'Starts March 2027', false],
  ['Handover', 'December 2027', false],
];

export const faqs = [
  {
    q: 'Is the project RERA registered?',
    a: `Yes — ${project.rera}. The registration, approved plans and the sanctioned layout are available on the Karnataka RERA portal and at the site office.`,
  },
  {
    q: 'What is the payment schedule?',
    a: '10% on booking, 20% on agreement, then construction-linked instalments across five stages, with 5% held back until handover. There is no separate infrastructure or amenity charge added later.',
  },
  {
    q: 'Which banks have approved the project?',
    a: 'HDFC, SBI, ICICI and LIC Housing Finance have approved Aashray Grove for home loans. Our site team will connect you with the relationship manager for whichever you prefer.',
  },
  {
    q: 'What are the maintenance charges?',
    a: '₹3.20 per sq ft per month, billed quarterly, starting from handover. The first 12 months are collected upfront and held in an escrow account handed to the residents’ association.',
  },
];
