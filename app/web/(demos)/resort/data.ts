import { tamaraImages as img } from '@/lib/images';

export const tamara = {
  name: 'Tamara Backwaters',
  phoneDisplay: '+91 481 252 6600',
  phoneRaw: '914812526600',
  whatsappRaw: '919447112200',
  email: 'stay@tamarabackwaters.in',
  address: ['Tamara Backwaters', 'Cheepunkal, Vembanad Lake', 'Kumarakom, Kottayam, Kerala 686563'],
  mapQuery: 'Kumarakom Vembanad Lake Kerala',
};

export const villas = [
  {
    name: 'Garden Villa',
    count: '6 villas',
    size: '540 sq ft',
    sleeps: '2 adults',
    rate: '₹11,500',
    peak: '₹16,500',
    view: 'Coconut grove and courtyard',
    inclusions: ['Breakfast for two', 'Private verandah with a swing', 'Outdoor rain shower', 'Air-conditioned bedroom'],
    image: img.room,
  },
  {
    name: 'Lake Villa',
    count: '4 villas',
    size: '720 sq ft',
    sleeps: '2 adults, 1 child',
    rate: '₹16,800',
    peak: '₹23,500',
    view: 'Vembanad lake, west-facing',
    inclusions: ['Breakfast for two', 'Private deck over the water', 'Plunge pool', 'Sunset canoe, once per stay'],
    image: img.roomTwo,
    featured: true,
  },
  {
    name: 'Two-bedroom Villa',
    count: '2 villas',
    size: '1,180 sq ft',
    sleeps: '4 adults, 2 children',
    rate: '₹27,000',
    peak: '₹38,000',
    view: 'Lake and paddy fields',
    inclusions: ['Breakfast for four', 'Living room and kitchenette', 'Private garden and pool', 'Airport transfer included'],
    image: img.roomThree,
  },
];

export const experiences = [
  {
    name: 'Dawn canoe through the canals',
    time: '5:45am · 2 hours · included',
    body: 'A country canoe poled by Suresh, who grew up here, into channels too narrow for a houseboat. You will see more birds before seven than at any other time of day.',
    image: img.boat,
  },
  {
    name: 'Toddy tapper’s morning',
    time: '7:00am · 90 min · ₹1,200',
    body: 'Walk out with a tapper as he climbs the palms, and drink the sweet unfermented toddy at the base. Ends with a breakfast of kappa and meen curry in his home.',
    image: img.food,
  },
  {
    name: 'Ayurvedic consultation & therapy',
    time: 'By appointment · from ₹3,400',
    body: 'A consultation with a BAMS physician before any treatment, which is the correct order and is not what most resorts do. Abhyanga, shirodhara and podikizhi.',
    image: img.spa,
  },
  {
    name: 'Cooking with Sarala',
    time: '11:00am · 3 hours · ₹2,800',
    body: 'Five dishes in a Kerala kitchen — meen pollichathu, olan, thoran, and how to actually grind a coconut masala. You eat what you cook, for lunch.',
    image: img.dining,
  },
];

export const dining = [
  ['Kayal', 'Over the water. Kerala and Syrian Christian cooking, a menu that changes with the catch. Dinner only, 7:30 to 10.'],
  ['The Verandah', 'All-day. Breakfast until 10:30, then light meals. The appam and stew is the reason people come down early.'],
  ['In your villa', 'Anything from either kitchen, served on your deck at no extra charge. Most guests do this at least once.'],
];

export const directBenefits = [
  'Best rate, guaranteed — we will match anything you find and take another 5% off',
  'Free cancellation up to 72 hours before check-in',
  'Complimentary airport pick-up from Kochi on stays of three nights or more',
  'A late checkout at 2pm whenever the villa allows it',
];

export const gettingHere = [
  ['Cochin International Airport', '85 km', '2 hr 15 min'],
  ['Kottayam railway station', '16 km', '30 min'],
  ['Alappuzha', '38 km', '1 hr'],
  ['Kumarakom Bird Sanctuary', '4 km', '10 min'],
  ['Munnar', '145 km', '4 hr'],
];

export const faqs = [
  {
    q: 'Is the property suitable for children?',
    a: 'Yes, though the Lake Villas have unfenced decks over water and we ask parents to judge that. The two-bedroom villas have a fenced garden and a shallow pool. Cots and high chairs are free.',
  },
  {
    q: 'When is the best time to come?',
    a: 'October to March is dry and the lake is calm. June to August is the monsoon — the property is at its greenest and rates drop by about 35%, but boat trips can be cancelled at short notice.',
  },
  {
    q: 'Do you serve alcohol?',
    a: 'Yes, we hold a licence. There is a small list of Indian wines and a good selection of arrack-based cocktails made with local spices.',
  },
  {
    q: 'How do I get here from Kochi airport?',
    a: 'We can send a car for ₹4,200 one way, or it is included for stays of three nights or more booked directly. A taxi from the airport rank costs about the same and takes two and a quarter hours.',
  },
];
