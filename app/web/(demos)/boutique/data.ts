import { kaanchiImages as img } from '@/lib/images';
import type { Photo } from '@/lib/images';

export const kaanchi = {
  name: 'Kaanchi',
  sub: 'Handloom & occasion wear',
  phoneDisplay: '+91 44 4218 9090',
  phoneRaw: '914442189090',
  whatsappRaw: '919840223311',
  email: 'studio@kaanchi.in',
  address: ['Kaanchi', '14, 2nd Street, Alwarpet', 'Chennai 600018'],
  mapQuery: 'Alwarpet Chennai',
  hours: 'Tue – Sun, 11:00 – 19:30 · Monday by appointment',
};

export type Piece = {
  id: string;
  name: string;
  category: 'Saree' | 'Occasion' | 'Everyday';
  price: string;
  fabric: string;
  weave: string;
  sizes: string[];
  lead: string;
  note: string;
  image: Photo;
};

export const collection = {
  name: 'Aavani',
  season: 'Festive 2026',
  intro:
    'Nine pieces, cut in the studio in Alwarpet from cloth woven in Kanchipuram, Chettinad and Bhagalpur. Each one is made in a run of twelve or fewer, and then not made again.',
};

export const pieces: Piece[] = [
  {
    id: 'aavani-drape',
    name: 'The Aavani drape',
    category: 'Saree',
    price: '₹42,000',
    fabric: 'Pure mulberry silk with tested zari',
    weave: 'Kanchipuram · korvai border',
    sizes: ['6.3 m with blouse piece'],
    lead: 'In stock · 4 remaining',
    note: 'Aubergine body with a bronze korvai border, woven by the Devarajan family over eleven weeks. The pallu carries a rudraksham motif redrawn from a 1940s sample.',
    image: img.hero,
  },
  {
    id: 'coral-kanjivaram',
    name: 'Coral Kanjivaram',
    category: 'Saree',
    price: '₹38,500',
    fabric: 'Mulberry silk, 400-grade zari',
    weave: 'Kanchipuram · petni join',
    sizes: ['6.3 m with blouse piece'],
    lead: 'In stock · 2 remaining',
    note: 'A traditional coral with a mustard contrast pallu. Heavier than the Aavani at 780 g, which is why it falls the way it does.',
    image: img.kanjivaram,
  },
  {
    id: 'crimson-gown',
    name: 'Crimson reception gown',
    category: 'Occasion',
    price: '₹28,000',
    fabric: 'Silk georgette, hand-rolled hem',
    weave: 'Studio-cut · 9 m circle',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    lead: 'Made to order · 3 weeks',
    note: 'A nine-metre circle skirt that moves properly when you do. Fully lined, with a concealed side zip and pockets, because there is no reason not to.',
    image: img.gown,
  },
  {
    id: 'wine-shift',
    name: 'Wine gathered shift',
    category: 'Occasion',
    price: '₹12,400',
    fabric: 'Handwoven cotton-silk',
    weave: 'Bhagalpur',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    lead: 'In stock · all sizes',
    note: 'The piece most people buy first. Gathered at the waist, deep pockets, and it takes a saree blouse-maker no effort to alter.',
    image: img.wine,
  },
  {
    id: 'printed-coord',
    name: 'Printed co-ord set',
    category: 'Everyday',
    price: '₹9,800',
    fabric: 'Hand block-printed cotton',
    weave: 'Bagru · natural dye',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    lead: 'In stock · S, M, L',
    note: 'Shirt and wide-leg trouser, sold together or separately. Natural indigo, which means it will fade — that is the point, and it will fade well.',
    image: img.coord,
  },
  {
    id: 'blush-palazzo',
    name: 'Blush georgette palazzo',
    category: 'Everyday',
    price: '₹6,600',
    fabric: 'Silk georgette',
    weave: 'Studio-cut',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    lead: 'In stock · all sizes',
    note: 'Elasticated at the back only, flat at the front, so it sits properly under a fitted kurta. Ankle length on 5’5”.',
    image: img.palazzo,
  },
  {
    id: 'ivory-shirt',
    name: 'Ivory tie-neck shirt',
    category: 'Everyday',
    price: '₹5,200',
    fabric: 'Handwoven cotton, 80s count',
    weave: 'Chettinad',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    lead: 'In stock · all sizes',
    note: 'A shirt for Chennai in May. Detachable neck tie, mother-of-pearl buttons, and it gets softer for about forty washes.',
    image: img.shirt,
  },
  {
    id: 'layered-chain',
    name: 'Layered gold-plate chains',
    category: 'Occasion',
    price: '₹4,800',
    fabric: '22k gold plate on brass',
    weave: 'Made in Coimbatore',
    sizes: ['16" / 18" / 20"'],
    lead: 'In stock',
    note: 'Sold as a set of three, each a different length. Meant to be worn with the ivory shirt as much as with a saree.',
    image: img.jewel,
  },
  {
    id: 'fine-pendant',
    name: 'Fine temple pendant',
    category: 'Occasion',
    price: '₹7,400',
    fabric: '22k gold plate, kemp stone',
    weave: 'Made in Coimbatore',
    sizes: ['One size, adjustable'],
    lead: 'Made to order · 2 weeks',
    note: 'A small temple-form pendant on a fine chain. Deliberately understated — it is meant to sit under a collar, not over one.',
    image: img.jewelTwo,
  },
];

export const craft = [
  {
    title: 'Kanchipuram',
    body: 'Two weaving families, both in Pillaiyarpalayam. We buy the cloth at a price they set, which is roughly 30% above the market rate, and we put their name on the label.',
  },
  {
    title: 'Bagru',
    body: 'Block printing in natural indigo and madder, which behaves unpredictably and produces no two identical metres. We have stopped apologising for that.',
  },
  {
    title: 'The studio',
    body: 'Everything is cut and finished by six tailors in Alwarpet. Nothing is outsourced, which is why the runs are twelve and not two hundred.',
  },
];

export const sizeGuide = [
  ['XS', '32', '26', '35'],
  ['S', '34', '28', '37'],
  ['M', '36', '30', '39'],
  ['L', '38', '32', '41'],
  ['XL', '40', '34', '43'],
  ['XXL', '42', '36', '45'],
];

export const faqs = [
  {
    q: 'Can I try before I buy?',
    a: 'Yes — the Alwarpet studio has a fitting room and everything in the edit is on the rail. Book a slot and we will keep the pieces you want to see aside.',
  },
  {
    q: 'Do you ship outside India?',
    a: 'We ship worldwide by DHL. Sarees and made-to-order pieces are sent insured. Duties are payable by you at the destination and we will tell you the likely amount before you pay.',
  },
  {
    q: 'What if the size is wrong?',
    a: 'Exchange within 10 days on in-stock pieces, unworn and with tags. Made-to-order pieces are altered free once — we would rather adjust it than have it sit in a cupboard.',
  },
  {
    q: 'How do I care for the silk?',
    a: 'Dry clean only, and not more than twice a year. Between wearings, wrap it in the mulmul cloth that comes with the saree, never in plastic, and refold it along a different line every few months.',
  },
];
