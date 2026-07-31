import { salonImages as img } from '@/lib/images';

export const salon = {
  name: 'Maison Aria',
  sub: 'Hair · Skin · Bridal',
  phoneDisplay: '+91 80 4123 7788',
  phoneRaw: '918041237788',
  whatsappRaw: '919845112233',
  address: ['Maison Aria', '#42, 100 Feet Road, above Blue Tokai', 'Indiranagar, Bengaluru 560038'],
  mapQuery: 'Maison Aria Salon 100 Feet Road Indiranagar Bengaluru',
  hours: [
    ['Monday', 'Closed'],
    ['Tuesday – Thursday', '10:00 – 20:00'],
    ['Friday – Saturday', '09:30 – 21:00'],
    ['Sunday', '10:00 – 19:00'],
  ],
};

export type ServiceGroup = {
  id: string;
  label: string;
  note: string;
  image: { src: string; alt: string };
  items: { name: string; detail: string; price: string; time: string }[];
};

export const serviceGroups: ServiceGroup[] = [
  {
    id: 'hair',
    label: 'Hair',
    note: 'Cuts are dry-consulted first — we look at how your hair falls before anything is wet.',
    image: img.blowdry,
    items: [
      { name: 'Signature cut & finish', detail: 'Consultation, wash, cut, blow-dry', price: '₹1,600', time: '60 min' },
      { name: 'Restyle', detail: 'For a change of length or shape', price: '₹2,400', time: '90 min' },
      { name: 'Curl-specialist cut', detail: 'Dry-cut, curl-by-curl', price: '₹2,800', time: '90 min' },
      { name: 'Blow-dry & set', detail: 'Wash, blow-dry, light styling', price: '₹900', time: '45 min' },
      { name: 'Keratin smoothening', detail: 'Formaldehyde-free, per length', price: '₹6,500 – ₹12,000', time: '3 hrs' },
      { name: 'Scalp & hair-fall ritual', detail: 'Diagnosis, scrub, ampoule, massage', price: '₹2,200', time: '60 min' },
    ],
  },
  {
    id: 'colour',
    label: 'Colour',
    note: 'Every colour service includes a strand test and a written maintenance plan. Patch test 48 hours before, free.',
    image: img.colour,
    items: [
      { name: 'Root touch-up', detail: 'Up to 2 inches, ammonia-free', price: '₹2,200', time: '75 min' },
      { name: 'Global colour', detail: 'Single tone, full head', price: '₹3,800 – ₹6,200', time: '2 hrs' },
      { name: 'Balayage', detail: 'Hand-painted, includes toner', price: '₹7,500 – ₹13,000', time: '3–4 hrs' },
      { name: 'Highlights / babylights', detail: 'Half or full head', price: '₹5,200 – ₹9,800', time: '3 hrs' },
      { name: 'Grey blending', detail: 'Low-commitment demi colour', price: '₹2,600', time: '60 min' },
      { name: 'Colour correction', detail: 'Quoted after consultation', price: 'On consult', time: '—' },
    ],
  },
  {
    id: 'skin',
    label: 'Skin',
    note: 'Facials are chosen after a skin reading, not from a menu. Prices below are the usual landing point.',
    image: img.facial,
    items: [
      { name: 'Aria clean-up', detail: 'Cleanse, extract, mask', price: '₹1,300', time: '45 min' },
      { name: 'Hydra-glow facial', detail: 'Hydration + light peel', price: '₹2,900', time: '60 min' },
      { name: 'Pigmentation facial', detail: 'Vitamin C and niacinamide protocol', price: '₹3,400', time: '70 min' },
      { name: 'Acne protocol', detail: 'Course of four, priced together', price: '₹9,600', time: '4 × 45 min' },
      { name: 'De-tan & polish', detail: 'Face, neck and arms', price: '₹1,900', time: '50 min' },
      { name: 'Hot stone back therapy', detail: 'Relief for desk-bound shoulders', price: '₹2,400', time: '60 min' },
    ],
  },
  {
    id: 'nails',
    label: 'Hands & feet',
    note: 'Single-use files and buffers. Tools are autoclaved between guests — ask to see the log.',
    image: img.nails,
    items: [
      { name: 'Classic manicure', detail: 'Shape, cuticle, buff, polish', price: '₹750', time: '40 min' },
      { name: 'Gel manicure', detail: 'Two-week wear', price: '₹1,450', time: '60 min' },
      { name: 'Spa pedicure', detail: 'Soak, scrub, mask, massage', price: '₹1,250', time: '55 min' },
      { name: 'Gel removal & repair', detail: 'Free with a new gel service', price: '₹400', time: '20 min' },
      { name: 'Nail art', detail: 'Per nail, from', price: '₹120', time: '—' },
    ],
  },
  {
    id: 'grooming',
    label: 'Grooming',
    note: 'A separate room, a separate entrance off the stairwell. Walk-ins taken before 6pm on weekdays.',
    image: img.barber,
    items: [
      { name: 'Skin fade', detail: 'Clipper work, hot towel finish', price: '₹850', time: '45 min' },
      { name: 'Scissor cut & style', detail: 'Wash, cut, product finish', price: '₹700', time: '40 min' },
      { name: 'Beard sculpt', detail: 'Line-up, trim, oil', price: '₹450', time: '25 min' },
      { name: 'Royal shave', detail: 'Hot towel, single blade, balm', price: '₹700', time: '35 min' },
      { name: 'Groom package', detail: 'Cut, beard, facial, manicure', price: '₹3,200', time: '2 hrs' },
    ],
  },
  {
    id: 'bridal',
    label: 'Bridal',
    note: 'Booked as a package with a mandatory trial. Dates in November and December close by August.',
    image: img.makeup,
    items: [
      { name: 'Bridal trial', detail: 'Full look, adjusted on the spot', price: '₹6,000', time: '2 hrs' },
      { name: 'Wedding day — HD', detail: 'Makeup, hair, draping', price: '₹28,000', time: '4 hrs' },
      { name: 'Wedding day — airbrush', detail: 'Makeup, hair, draping', price: '₹38,000', time: '4 hrs' },
      { name: 'Reception / sangeet', detail: 'Per function', price: '₹18,000', time: '3 hrs' },
      { name: 'Family & guests', detail: 'Per person, minimum four', price: '₹3,500', time: '45 min' },
      { name: 'Six-week bridal skin plan', detail: 'Four facials, two peels, home routine', price: '₹18,500', time: '—' },
    ],
  },
];

export const stylists = [
  {
    name: 'Aria Fernandes',
    role: 'Founder · Creative Director',
    years: '18 years',
    focus: 'Restyles, colour correction, curly hair',
    note: 'Trained at Toni & Guy London, ran the colour floor at a Bandra studio for six years before opening Aria.',
    image: img.editorial,
  },
  {
    name: 'Nandita Kulkarni',
    role: 'Senior Colourist',
    years: '11 years',
    focus: 'Balayage, grey blending, brunette work',
    note: 'Wella Master Colour Expert. The person to see if you have been told your hair "will not lift".',
    image: img.longHair,
  },
  {
    name: 'Rehan Qureshi',
    role: 'Head of Grooming',
    years: '9 years',
    focus: 'Fades, beard architecture, straight razor',
    note: 'Runs the grooming room. Books out on Saturdays by Wednesday — plan ahead.',
    image: img.shave,
  },
  {
    name: 'Divya Nair',
    role: 'Skin Therapist',
    years: '7 years',
    focus: 'Acne, pigmentation, pre-wedding plans',
    note: 'CIDESCO certified. Will tell you honestly when a facial is not the answer and a dermatologist is.',
    image: img.mask,
  },
];

export const memberships = [
  {
    name: 'Aria Every Month',
    price: '₹1,999',
    cadence: 'per month',
    line: 'For the cut-and-blow-dry regular.',
    perks: ['One signature cut & finish', 'One blow-dry', '10% off all colour', 'Priority weekend slots'],
  },
  {
    name: 'Colour Club',
    price: '₹11,500',
    cadence: 'per 6 months',
    line: 'For anyone maintaining colour.',
    perks: ['Three root touch-ups', 'One gloss & toner', 'Free bond treatment each visit', 'Home-care kit'],
    featured: true,
  },
  {
    name: 'Skin Season',
    price: '₹8,400',
    cadence: 'per quarter',
    line: 'For skin that needs a plan, not a one-off.',
    perks: ['Four facials of your protocol', 'Monthly skin reading', '15% off peels', 'Two de-tan sessions'],
  },
];

export const reviews = [
  {
    quote:
      'I have been going grey since I was 26 and every salon suggested a full global colour. Nandita talked me into blending instead. Six months later it looks deliberate rather than like I am hiding something.',
    name: 'Shruti Menon',
    meta: 'Colour · guest since 2022',
  },
  {
    quote:
      'They rescheduled me twice for a bridal trial because they would not do it in a rush before another appointment. Annoying at the time. Correct in hindsight — the trial took two and a half hours.',
    name: 'Anjali Bhatt',
    meta: 'Bridal · married Feb 2025',
  },
  {
    quote:
      'The grooming room has its own entrance so you are not sitting through someone else\u2019s highlights. Rehan is worth booking a week out for.',
    name: 'Karthik Rajan',
    meta: 'Grooming · fortnightly',
  },
];

export const faqs = [
  {
    q: 'Do you take walk-ins?',
    a: 'Grooming takes walk-ins before 6pm on weekdays. Everything else is by appointment — colour and bridal in particular need a consultation slot booked separately.',
  },
  {
    q: 'What if I do not like the result?',
    a: 'Tell us before you leave, or within seven days. Cuts and colour are adjusted free of charge. We would rather redo it than have you not come back.',
  },
  {
    q: 'Is there parking?',
    a: 'Two-wheeler parking in the building. For cars, the paid lot behind the CMH Road junction is a three-minute walk and we validate two hours for services over ₹3,000.',
  },
  {
    q: 'What products do you use?',
    a: 'Kérastase and Olaplex for hair, Wella and Schwarzkopf for colour, Dermalogica and Casmara for skin. All ammonia-free colour lines are available on request.',
  },
];
