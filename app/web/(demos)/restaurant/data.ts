import { kesariImages as img } from '@/lib/images';

export const kesari = {
  name: 'Kesari House',
  sub: 'Regional Indian kitchen',
  phoneDisplay: '+91 80 4922 6161',
  phoneRaw: '918049226161',
  whatsappRaw: '919902334455',
  address: ['Kesari House', '11, 12th Main, Indiranagar 1st Stage', 'Bengaluru 560038'],
  mapQuery: 'Kesari House Indiranagar 12th Main Bengaluru',
  /** [openMinutes, closeMinutes] in IST, or null when shut. Index 0 = Sunday. */
  week: [
    { day: 'Sunday', label: '12:00 – 15:30 · 19:00 – 23:00', spans: [[720, 930], [1140, 1380]] },
    { day: 'Monday', label: 'Closed', spans: [] },
    { day: 'Tuesday', label: '12:00 – 15:30 · 19:00 – 23:00', spans: [[720, 930], [1140, 1380]] },
    { day: 'Wednesday', label: '12:00 – 15:30 · 19:00 – 23:00', spans: [[720, 930], [1140, 1380]] },
    { day: 'Thursday', label: '12:00 – 15:30 · 19:00 – 23:00', spans: [[720, 930], [1140, 1380]] },
    { day: 'Friday', label: '12:00 – 15:30 · 19:00 – 23:30', spans: [[720, 930], [1140, 1410]] },
    { day: 'Saturday', label: '12:00 – 16:00 · 19:00 – 23:30', spans: [[720, 960], [1140, 1410]] },
  ],
};

export type Dish = {
  name: string;
  desc: string;
  price: string;
  veg: boolean;
  heat?: 1 | 2 | 3;
  signature?: boolean;
};

export type Course = { id: string; label: string; blurb: string; dishes: Dish[] };

export const menu: Course[] = [
  {
    id: 'begin',
    label: 'To begin',
    blurb: 'Small plates from the north-west frontier and the Malabar coast. Meant for sharing.',
    dishes: [
      { name: 'Amritsari machhi', desc: 'Ajwain-battered basa, kachumber, black-salt lime', price: '₹460', veg: false, heat: 2 },
      { name: 'Kesari paneer tikka', desc: 'Saffron-yoghurt marinade, charred peppers, mint', price: '₹420', veg: true, heat: 1, signature: true },
      { name: 'Bhatti da murgh', desc: 'Overnight-marinated chicken leg, smoked in the tandoor', price: '₹490', veg: false, heat: 2 },
      { name: 'Beetroot galouti', desc: 'Melt-in-the-mouth kebab, warqi paratha', price: '₹390', veg: true, heat: 1 },
      { name: 'Kolkata samosa chaat', desc: 'Crushed samosa, ghugni, tamarind, sev', price: '₹280', veg: true, heat: 1 },
      { name: 'Malabar prawn fry', desc: 'Curry leaf, red chilli, coconut oil', price: '₹560', veg: false, heat: 3 },
    ],
  },
  {
    id: 'tandoor',
    label: 'From the tandoor',
    blurb: 'One clay oven, run at 400°C from noon. Everything here is cooked to order.',
    dishes: [
      { name: 'Sikandari raan', desc: 'Whole lamb leg, 14-hour marinade — order 24 hrs ahead', price: '₹1,850', veg: false, heat: 2, signature: true },
      { name: 'Tandoori jhinga', desc: 'Four tiger prawns, ajwain and hung curd', price: '₹740', veg: false, heat: 2 },
      { name: 'Bharwan aloo', desc: 'Potato stuffed with khoya, nuts and figs', price: '₹380', veg: true, heat: 1 },
      { name: 'Murgh malai tikka', desc: 'Cheese, cream, green cardamom', price: '₹480', veg: false, heat: 1 },
      { name: 'Tandoori broccoli', desc: 'Cheddar-walnut crust, chilli honey', price: '₹410', veg: true, heat: 1 },
    ],
  },
  {
    id: 'mains',
    label: 'Curries & mains',
    blurb: 'Gravies are made in small batches through the day. When one finishes, it finishes.',
    dishes: [
      { name: 'Dal Kesari', desc: 'Black urad simmered 26 hours, finished with white butter', price: '₹420', veg: true, heat: 1, signature: true },
      { name: 'Butter chicken', desc: 'Tandoori chicken, tomato and cashew, honey-free', price: '₹590', veg: false, heat: 1 },
      { name: 'Rogan josh', desc: 'Kashmiri lamb on the bone, ratanjot, saunf', price: '₹680', veg: false, heat: 2 },
      { name: 'Paneer butter masala', desc: 'House paneer, fenugreek, single cream', price: '₹520', veg: true, heat: 1 },
      { name: 'Kerala meen curry', desc: 'Seer fish, kudampuli, coconut milk', price: '₹690', veg: false, heat: 3 },
      { name: 'Baingan ka bharta', desc: 'Charred aubergine, tomato, green chilli', price: '₹450', veg: true, heat: 2 },
      { name: 'Chettinad chicken', desc: 'Roasted spice paste, curry leaf, coconut', price: '₹610', veg: false, heat: 3 },
    ],
  },
  {
    id: 'biryani',
    label: 'Biryani & rice',
    blurb: 'Sealed and cooked on dum. Served in the handi it was cooked in, with burani raita and mirchi ka salan.',
    dishes: [
      { name: 'Hyderabadi kacchi gosht biryani', desc: 'Raw lamb layered with rice, sealed and slow-cooked', price: '₹720', veg: false, heat: 2, signature: true },
      { name: 'Murgh dum biryani', desc: 'Boneless chicken, saffron, fried onion', price: '₹620', veg: false, heat: 2 },
      { name: 'Subz-e-bahar biryani', desc: 'Seasonal vegetables, mint, kewra', price: '₹520', veg: true, heat: 1 },
      { name: 'Jeera pulao', desc: 'Basmati, cumin, ghee', price: '₹280', veg: true },
      { name: 'Steamed rice', desc: 'Sona masuri', price: '₹190', veg: true },
    ],
  },
  {
    id: 'breads',
    label: 'Breads & sides',
    blurb: 'Breads come out of the tandoor in the order they are ordered. Ask for them to be paced.',
    dishes: [
      { name: 'Laccha paratha', desc: 'Layered whole wheat', price: '₹120', veg: true },
      { name: 'Garlic naan', desc: 'Butter, coriander', price: '₹130', veg: true },
      { name: 'Warqi roti', desc: 'Flaky, unleavened', price: '₹140', veg: true },
      { name: 'Burani raita', desc: 'Curd, roasted garlic', price: '₹160', veg: true },
      { name: 'Kachumber', desc: 'Cucumber, onion, tomato, lime', price: '₹140', veg: true },
    ],
  },
  {
    id: 'sweet',
    label: 'Sweet & drinks',
    blurb: 'Desserts are made in the morning. The shahi tukda usually goes by 9pm on weekends.',
    dishes: [
      { name: 'Shahi tukda', desc: 'Fried brioche, rabri, pistachio', price: '₹320', veg: true, signature: true },
      { name: 'Gulab jamun', desc: 'Khoya, rose syrup, two pieces', price: '₹240', veg: true },
      { name: 'Kesari phirni', desc: 'Broken rice, saffron, served chilled', price: '₹280', veg: true },
      { name: 'Masala chaas', desc: 'Buttermilk, curry leaf, cumin', price: '₹150', veg: true },
      { name: 'Aam panna', desc: 'Raw mango, black salt, mint', price: '₹190', veg: true },
      { name: 'Filter coffee', desc: 'Chikmagalur beans, decoction-brewed', price: '₹140', veg: true },
    ],
  },
];

export const story = [
  {
    title: 'The dal takes 26 hours',
    body: 'It starts at 4pm the previous day. Black urad, a slow flame overnight, tomato in the morning, butter at the end. There is no shortcut and we have stopped looking for one.',
  },
  {
    title: 'One tandoor, no microwave',
    body: 'Everything from the clay oven is fired to order, which is why kebabs take eighteen minutes and why we ask you to pace your breads.',
  },
  {
    title: 'Small batches, real endings',
    body: 'Gravies are cooked through the day rather than held in bulk. If the meen curry is finished at 9pm, it is finished — the alternative is worse.',
  },
];

export const press = [
  { quote: 'The best dal in Indiranagar, and it is not close.', source: 'Bangalore Times, 2025' },
  { quote: 'A kitchen that cooks like it has nothing to prove.', source: 'The Hindu MetroPlus' },
  { quote: 'Come for the biryani, stay because they refuse to rush you.', source: 'Conde Nast Traveller India' },
];

export const gallery = [img.thali, img.biryani, img.tandoori, img.dosa, img.samosa, img.roomWarm, img.chef, img.paneerMasala];
