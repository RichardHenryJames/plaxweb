import { clinicImages as img } from '@/lib/images';

export const clinic = {
  name: 'Aarogya Dental Studio',
  phoneDisplay: '+91 80 4370 9090',
  phoneRaw: '918043709090',
  emergencyDisplay: '+91 98450 77112',
  emergencyRaw: '919845077112',
  whatsappRaw: '919845077112',
  address: ['Aarogya Dental Studio', '3rd Floor, Prestige Point, 80 Feet Road', '6th Block Koramangala, Bengaluru 560095'],
  mapQuery: 'Aarogya Dental Studio 80 Feet Road 6th Block Koramangala Bengaluru',
  hours: [
    ['Monday – Friday', '09:30 – 20:00'],
    ['Saturday', '09:30 – 18:00'],
    ['Sunday', '10:00 – 14:00 (emergencies only)'],
  ],
};

export type Treatment = {
  id: string;
  name: string;
  summary: string;
  price: string;
  sittings: string;
  detail: string;
  includes: string[];
};

export const treatments: Treatment[] = [
  {
    id: 'checkup',
    name: 'Check-up & cleaning',
    summary: 'Scaling, polishing and a full digital chart of your mouth.',
    price: '₹1,200',
    sittings: '1 sitting · 40 min',
    detail:
      'Ultrasonic scaling removes hardened plaque that brushing cannot. We photograph every quadrant so you can see the same thing the dentist is seeing, and you leave with a written note of anything worth watching.',
    includes: ['Full-mouth scaling', 'Stain polishing', 'Intraoral photographs', 'Written treatment note'],
  },
  {
    id: 'filling',
    name: 'Tooth-coloured fillings',
    summary: 'Composite restorations that match the shade of the tooth.',
    price: '₹1,800 – ₹3,500',
    sittings: '1 sitting · 30–45 min',
    detail:
      'Priced by the number of surfaces involved, not by how deep the cavity looks on the day. If a filling will not hold and the tooth needs a crown instead, we will say so before starting.',
    includes: ['Local anaesthesia', 'Decay removal', 'Layered composite', 'Bite adjustment'],
  },
  {
    id: 'rct',
    name: 'Root canal treatment',
    summary: 'Single-visit RCT under a rubber dam, with an operating microscope.',
    price: '₹6,500 – ₹11,000',
    sittings: '1–2 sittings',
    detail:
      'Front teeth sit at the lower end, molars at the upper. The price includes the post-treatment X-ray but not the crown, which we quote separately so there is no surprise at the end.',
    includes: ['Rubber dam isolation', 'Rotary instrumentation', 'Microscope-assisted', 'Post-op radiograph'],
  },
  {
    id: 'crown',
    name: 'Crowns & bridges',
    summary: 'Zirconia and E-max, milled at a Bengaluru lab we have used for nine years.',
    price: '₹8,000 – ₹18,000',
    sittings: '2 sittings · 7 days apart',
    detail:
      'Metal-ceramic crowns start lower but we rarely recommend them for visible teeth. Every crown carries a five-year warranty against fracture under normal use.',
    includes: ['Digital shade match', 'Temporary crown', 'Trial fit', '5-year warranty'],
  },
  {
    id: 'aligner',
    name: 'Clear aligners',
    summary: 'Invisible alignment for crowding, spacing and mild bite issues.',
    price: '₹85,000 – ₹1,90,000',
    sittings: '9–18 months',
    detail:
      'A 3D scan and a simulation of your finished result before you pay anything beyond the ₹3,000 assessment. If aligners will not achieve what you want, we will tell you that braces are the honest answer.',
    includes: ['3D intraoral scan', 'Outcome simulation', 'All aligner trays', 'Retainers for year one'],
  },
  {
    id: 'implant',
    name: 'Dental implants',
    summary: 'Titanium implants from Straumann and Nobel Biocare.',
    price: '₹32,000 – ₹55,000',
    sittings: '2 stages · 3–5 months',
    detail:
      'Price is per implant and includes the abutment and crown. Bone grafting, if needed, is quoted after the CBCT scan — we do not build it into the headline number to make it look cheaper.',
    includes: ['CBCT planning', 'Guided placement', 'Abutment & crown', 'Two-year review'],
  },
  {
    id: 'whitening',
    name: 'Teeth whitening',
    summary: 'In-chair whitening, or a take-home kit with custom trays.',
    price: '₹9,000 / ₹6,000',
    sittings: '1 sitting / 2 weeks',
    detail:
      'Whitening lifts natural enamel shade. It does not change the colour of existing crowns or fillings, which is the single most common disappointment — we check what is in your mouth first.',
    includes: ['Shade assessment', 'Gum barrier', 'Sensitivity gel', 'Two-week review'],
  },
  {
    id: 'kids',
    name: 'Children’s dentistry',
    summary: 'First visits, sealants and fluoride, in a room built for it.',
    price: '₹800 – ₹4,000',
    sittings: '1 sitting · 30 min',
    detail:
      'The first appointment for a child under six is a look-and-count with no instruments. It is free. We would rather they are not frightened of us at seven.',
    includes: ['Tell-show-do approach', 'Pit and fissure sealants', 'Fluoride varnish', 'Parent briefing'],
  },
];

export const doctors = [
  {
    name: 'Dr Nikhil Rao',
    qual: 'BDS, MDS — Prosthodontics',
    years: '16 years',
    focus: 'Implants, full-mouth rehabilitation, crowns',
    note: 'Trained at Manipal, fellowship in implantology from ICOI. Handles every implant case at the studio.',
    image: img.doctor,
  },
  {
    name: 'Dr Meera Iyer',
    qual: 'BDS, MDS — Endodontics',
    years: '12 years',
    focus: 'Root canals, retreatment, dental trauma',
    note: 'Works under a microscope for every canal. Takes the cases other clinics have already attempted once.',
    image: img.doctorTwo,
  },
  {
    name: 'Dr Aditya Shetty',
    qual: 'BDS, MDS — Oral Surgery',
    years: '10 years',
    focus: 'Wisdom teeth, extractions, minor surgery',
    note: 'Also the person who sees Sunday emergencies. Attached to a Koramangala day-care hospital for sedation cases.',
    image: img.doctorThree,
  },
];

export const safety = [
  ['Class B autoclave', 'Every instrument is pouched, cycled and dated. Ask to see the day’s log — it is on the wall.'],
  ['Single-use where it matters', 'Needles, gloves, suction tips, prophy cups and bibs are used once and discarded.'],
  ['Rubber dam as standard', 'Every root canal is isolated. It is slower and it is the correct way to do it.'],
  ['Digital, low-dose imaging', 'RVG and OPG at roughly a tenth of the radiation of conventional film.'],
];

export const stories = [
  {
    quote:
      'I was quoted ₹14,000 for a root canal and crown elsewhere, then told at the chair it would be ₹22,000. Aarogya gave me a written estimate before touching anything and the final bill matched it to the rupee.',
    name: 'Praveen K.',
    meta: 'Root canal & crown · Nov 2025',
  },
  {
    quote:
      'Dr Meera spent twenty minutes explaining why my daughter did not need the treatment another clinic had recommended. She charged for a consultation and nothing else.',
    name: 'Sunita Reddy',
    meta: 'Second opinion · Feb 2026',
  },
  {
    quote:
      'The aligner simulation showed me exactly what my teeth would look like at month twelve. Fifteen months later it is basically identical.',
    name: 'Aakash Menon',
    meta: 'Clear aligners · completed 2025',
  },
];

export const faqs = [
  {
    q: 'Do you take insurance or corporate plans?',
    a: 'We are empanelled with most major TPAs for surgical procedures and we will file the paperwork for you. Routine dentistry is usually not covered by Indian health policies — we will tell you upfront rather than after the treatment.',
  },
  {
    q: 'What if I am nervous about the dentist?',
    a: 'Say so when you book. We schedule nervous patients as the first appointment of the day, walk through everything before it happens, and stop the moment you raise your hand. Sedation is available for surgical work.',
  },
  {
    q: 'Can I pay in instalments?',
    a: 'Treatment plans above ₹25,000 can be split into three interest-free instalments across the course of treatment. Aligners and implants can be put on a no-cost EMI through Bajaj or HDFC.',
  },
  {
    q: 'How quickly can I be seen in pain?',
    a: 'Call the emergency number. We keep two slots open every weekday for pain, and Dr Shetty sees emergencies on Sunday mornings.',
  },
];
