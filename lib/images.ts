/**
 * Curated photography manifest.
 *
 * Every id below has been (a) HTTP-verified by `npm run images:verify` and
 * (b) reviewed on a contact sheet by `npm run images:sheet` so the subject
 * actually matches the slot it is used in. Do not add ids here without
 * running both.
 *
 * Photos are served from the Unsplash CDN (Unsplash License — free for
 * commercial use, no attribution required) and re-encoded by next/image.
 */

export type Photo = { src: string; alt: string };

const CDN = 'https://images.unsplash.com/';

function p(id: string, alt: string): Photo {
  // Cap the source download; next/image re-encodes to AVIF/WebP at the sizes
  // each layout actually needs.
  return { src: `${CDN}${id}?auto=format&fit=crop&w=1800&q=72`, alt };
}

/* ------------------------------------------------------------------ salon */
export const salonImages = {
  hero: p('photo-1600948836101-f9ffda59d250', 'Styling floor at Maison Aria with round mirrors and deep navy walls'),
  floor: p('photo-1560066984-138dadb4c035', 'Open styling floor with black leather chairs and tall windows'),
  bright: p('photo-1633681926022-84c23e8cb2d6', 'Bright styling stations lined with mirrors and marble counters'),
  wash: p('photo-1595476108010-b4d1f102b1b1', 'Guest at the wash basin during a scalp ritual'),
  blowdry: p('photo-1580618672591-eb180b1a973f', 'Stylist finishing a blow-dry with a round brush'),
  longHair: p('photo-1522337360788-8b13dee7a37e', 'Long layered hair after a gloss treatment'),
  colour: p('photo-1492106087820-71f1a00d2b11', 'Ash-lilac balayage on wavy hair'),
  curls: p('photo-1519699047748-de8e457a634e', 'Defined natural curls after a curl-cut'),
  barber: p('photo-1585747860715-2ba37e788b70', "Men's grooming room with brick walls and warm lamps"),
  shave: p('photo-1503951914875-452162b0f3f1', 'Hot-towel razor shave in progress'),
  mensCut: p('photo-1605497788044-5a32c7078486', 'Precision fade being finished with a dryer'),
  beard: p('photo-1567894340315-735d7c361db0', 'Beard sculpting with clippers'),
  facial: p('photo-1570172619644-dfd03ed5d881', 'Clay mask being applied during a facial'),
  stones: p('photo-1600334089648-b0d9d3028eb2', 'Hot stone therapy laid along the back'),
  pedicure: p('photo-1519415510236-718bdfcd89c8', 'Pedicure soak with fresh flowers'),
  nails: p('photo-1607779097040-26e80aa78e66', 'Pastel gel manicure, close up'),
  mask: p('photo-1616394584738-fc6e612e71b9', 'Hydrating sheet mask during a facial'),
  makeup: p('photo-1487412947147-5cebf100ffc2', 'Eye makeup being applied for a bridal trial'),
  brushes: p('photo-1526045478516-99145907023c', 'Makeup brush kit laid out on marble'),
  products: p('photo-1571875257727-256c39da42af', 'Shelf of professional haircare products'),
  editorial: p('photo-1470259078422-826894b933aa', 'Editorial hair shot with movement'),
};

/* ------------------------------------------------------------- restaurant */
export const kesariImages = {
  hero: p('photo-1596797038530-2c107229654b', 'Slow-cooked curry finished with coriander in a copper handi'),
  thali: p('photo-1626777552726-4a6b54c97e46', 'Full thali laid out on dark slate, shot from above'),
  biryani: p('photo-1589302168068-964664d93dc0', 'Dum biryani opened at the table with mint and raita'),
  butterChicken: p('photo-1565557623262-b51c2513a641', 'Butter chicken with fresh naan'),
  paneerTikka: p('photo-1567188040759-fb8a883dc6d8', 'Paneer tikka on a sizzling cast-iron plate'),
  samosa: p('photo-1601050690597-df0568f70950', 'Hand-folded samosas with green chilli'),
  pavBhaji: p('photo-1606491956689-2ea866880c84', 'Pav bhaji served with buttered pav'),
  dosa: p('photo-1668236543090-82eba5ee5976', 'Ghee roast dosa with three chutneys and sambar'),
  roganJosh: p('photo-1517244683847-7456b63c5969', 'Rogan josh served in a silver bowl'),
  tandoori: p('photo-1610057099443-fde8c4d50f91', 'Tandoori chicken on a bed of greens'),
  paneerMasala: p('photo-1631452180519-c014fe946bc7', 'Paneer butter masala with roti and rice'),
  chole: p('photo-1585937421612-70a008356fbe', 'Chole simmered in a kadhai'),
  riceBowl: p('photo-1512058564366-18510be2db19', 'Spiced rice bowl with lemon'),
  room: p('photo-1517248135467-4c7edcad34c4', 'Dining room at Kesari House with low pendant lighting'),
  roomWarm: p('photo-1552566626-52f8b828add9', 'Corner banquettes and warm brass lighting'),
  roomLights: p('photo-1590846406792-0adc7f938f1d', 'Double-height dining hall with hanging lamps'),
  table: p('photo-1424847651672-bf20a4b0982b', 'Shared table set for a group'),
  chef: p('photo-1600565193348-f74bd3c7ccdf', 'Chef working the tandoor line'),
  kitchen: p('photo-1622021142947-da7dedc7c39a', 'Kitchen pass during evening service'),
};

/* ----------------------------------------------------------------- clinic */
export const clinicImages = {
  hero: p('photo-1616391182219-e080b4d1043a', 'Treatment suite with a city-facing window'),
  room: p('photo-1629909613654-28e377c37b09', 'Bright operatory with modern dental unit'),
  chair: p('photo-1598256989800-fe5f95da9787', 'Dental chair prepared for the next appointment'),
  treatment: p('photo-1606811841689-23dfddce3e95', 'Dentist and assistant during a routine procedure'),
  xray: p('photo-1588776814546-1ffcf47267a5', 'Dentist reviewing a digital OPG scan'),
  aligner: p('photo-1609840114035-3c981b782dfe', 'Clear aligner tray held up to the light'),
  working: p('photo-1588776813677-77aaf5595b83', 'Close-up of a restorative procedure'),
  doctor: p('photo-1612349317150-e413f6a5b16d', 'Dr Nikhil Rao, prosthodontist'),
  doctorTwo: p('photo-1582750433449-648ed127bb54', 'Dr Meera Iyer, endodontist'),
  doctorThree: p('photo-1584467735815-f778f274e296', 'Dr Aditya Shetty, oral surgeon'),
};

/* ----------------------------------------------------------------- school */
export const schoolImages = {
  hero: p('photo-1562774053-701939374585', 'Rosewood International School main block and front lawn'),
  campus: p('photo-1592280771190-3e2e4d571952', 'Senior school block seen from the quadrangle'),
  path: p('photo-1591123120675-6f7f1aae0e5b', 'Tree-lined walkway through campus'),
  auditorium: p('photo-1519452575417-564c1401ecc0', 'Auditorium set for assembly'),
  library: p('photo-1498243691581-b145c3f54a5a', 'Library stacks in the senior wing'),
  reading: p('photo-1567168544813-cc03465b4fa8', 'Student reading between the library stacks'),
  classroom: p('photo-1580582932707-520aed937b7b', 'Classroom ready for the morning session'),
  teaching: p('photo-1509062522246-3755977927d7', 'Teacher leading a Class 9 discussion'),
  lecture: p('photo-1524178232363-1fb2b075b655', 'Seminar in the senior lecture hall'),
  computerLab: p('photo-1531482615713-2afd69097998', 'Computer lab during a robotics period'),
  students: p('photo-1571260899304-425eee4c7efc', 'Senior students between periods'),
  science: p('photo-1532094349884-543bc11b234d', 'Titration set up in the senior chemistry lab'),
  chemistry: p('photo-1554475901-4538ddfbccc2', 'Class 11 practical in progress'),
  stacks: p('photo-1481627834876-b7833e8f5570', 'Reading room in the senior library'),
};

/* ------------------------------------------------------------ real estate */
export const estateImages = {
  hero: p('photo-1600585154340-be6161a56a0c', 'Aashray Grove villa at dusk under a rain tree'),
  facade: p('photo-1512917774080-9991f1c4c750', 'Villa facade with private plunge pool'),
  facadeTwo: p('photo-1600596542815-ffad4c1539a9', 'Four-bedroom corner villa, east elevation'),
  facadeThree: p('photo-1613977257363-707ba9348227', 'Garden villa with double-height living volume'),
  evening: p('photo-1568605114967-8130f3a36994', 'Villa lit up in the evening'),
  living: p('photo-1618221195710-dd6b41faaea6', 'Living room opening on to the private garden'),
  livingTwo: p('photo-1600210492486-724fe5c67fb0', 'Double-height living room with courtyard light'),
  dining: p('photo-1600607687920-4e2a09cf159d', 'Kitchen and dining, show villa'),
  bedroom: p('photo-1571508601891-ca5e7a713859', 'Master bedroom with a garden-facing deck'),
  stair: p('photo-1502005229762-cf1b2da7c5d6', 'Stairwell with skylight'),
  clubPool: p('photo-1571896349842-33c89424de2d', 'Clubhouse pool at dusk'),
  clubGym: p('photo-1571902943202-507ec2618e8f', 'Residents gym in the clubhouse'),
};

/* ----------------------------------------------------------------- travel */
export const wayfareImages = {
  hero: p('photo-1548013146-72479768bada', 'The Taj Mahal framed through a sandstone gateway at sunrise'),
  taj: p('photo-1524492412937-b28074a5d7da', 'Taj Mahal and the reflecting pool, Agra'),
  delhi: p('photo-1587474260584-136574528ed5', 'India Gate at dusk, New Delhi'),
  jaipur: p('photo-1477587458883-47145ed94245', 'Hawa Mahal, Jaipur, in the morning'),
  jaipurTwo: p('photo-1603262110263-fb0112e7cc33', 'Detail of the Hawa Mahal facade'),
  kerala: p('photo-1602216056096-3b40cc0c9944', 'Houseboat on the Kerala backwaters'),
  goa: p('photo-1512343879784-a960bf40e7f2', 'Palm-lined cove on the Konkan coast'),
  himalaya: p('photo-1609920658906-8223bd289001', 'Glacial river through Himalayan pine forest'),
  snow: p('photo-1626621341517-bbf3d9990a23', 'Trekkers on a snow ridge in the high Himalaya'),
  mumbai: p('photo-1595658658481-d53d3f999875', 'Gateway of India, Mumbai'),
  mysore: p('photo-1590766940554-634a7ed41450', 'Mysore Palace lit for the evening'),
  monsoon: p('photo-1566552881560-0be862a7c445', 'Monsoon light over south Mumbai'),
};

/* ---------------------------------------------------------------- fitness */
export const ironImages = {
  hero: p('photo-1517836357463-d25dfeac3438', 'Loaded barbell on the platform at Ironhouse'),
  rack: p('photo-1534438327276-14e5300c3a48', 'Dumbbell rack along the training floor'),
  squat: p('photo-1541534741688-6078c6bfb5c5', 'Squat racks under low light'),
  press: p('photo-1581009146145-b5ef050c2e1e', 'Barbell curl mid-set'),
  dumbbell: p('photo-1583454110551-21f2fa2afe61', 'Dumbbell work on the strength floor'),
  coach: p('photo-1571019614242-c5c5dee9f50b', 'Coach cueing a lift'),
  athlete: p('photo-1550345332-09e3ac987658', 'Athlete resting between working sets'),
  silhouette: p('photo-1605296867304-46d5465a13f1', 'Silhouette on the turf lane'),
  floor: p('photo-1596357395217-80de13130e92', 'Main training floor'),
  conditioning: p('photo-1541963463532-d68292c34b19', 'Conditioning circuit in progress'),
  kettlebell: p('photo-1599058917212-d750089bc07e', 'Kettlebell work on the turf'),
  mobility: p('photo-1518310383802-640c2de311b2', 'Mobility work before a session'),
};

/* ---------------------------------------------------------------- interior */
export const mittiImages = {
  hero: p('photo-1615529182904-14819c35db37', 'Living room in cane, lime plaster and teak — Malleswaram residence'),
  living: p('photo-1600210492493-0946911123ea', 'Double-height living volume with a slatted teak ceiling'),
  livingTwo: p('photo-1631679706909-1844bbd07221', 'Curved sofa and travertine coffee table'),
  bedroom: p('photo-1615874959474-d609969a20ed', 'Bedroom with planted balcony'),
  nook: p('photo-1618219908412-a29a1bb7b86e', 'Reading nook with cane screen and arched mirror'),
  colour: p('photo-1556228453-efd6c1ff04f6', 'Terracotta and rust palette in the family lounge'),
  office: p('photo-1524758631624-e2822e304c36', 'Studio office fit-out in oak and rattan'),
  villa: p('photo-1600566753086-00f18fb6b3ea', 'Villa living room opening to the deck'),
  detail: p('photo-1616627561950-9f746e330187', 'Cushion and throw detail in rust and cream'),
  detailTwo: p('photo-1604709177225-055f99402ea3', 'Powder room in honed grey stone'),
  detailThree: p('photo-1595428774223-ef52624120d2', 'Open oak shelving against a lime-washed wall'),
  detailFour: p('photo-1567225557594-88d73e55f2cb', 'Fluted teak screen with planting'),
};

/* ----------------------------------------------------------------- resort */
export const tamaraImages = {
  hero: p('photo-1602216056096-3b40cc0c9944', 'Kettuvallam moored on the Vembanad backwaters at first light'),
  pool: p('photo-1584132967334-10e028bd69f7', 'Infinity pool looking out over the palms'),
  poolDusk: p('photo-1571896349842-33c89424de2d', 'Pool deck and dining pavilion at dusk'),
  poolWide: p('photo-1540541338287-41700207dee6', 'Lagoon pool wrapping the garden villas'),
  beach: p('photo-1512343879784-a960bf40e7f2', 'Palm-fringed shoreline a short walk from the property'),
  room: p('photo-1571508601891-ca5e7a713859', 'Garden villa bedroom with a private verandah'),
  roomTwo: p('photo-1519449556851-5720b33024e7', 'Backwater-facing suite at sunrise'),
  roomThree: p('photo-1618221195710-dd6b41faaea6', 'Living area of the two-bedroom villa'),
  dining: p('photo-1559339352-11d035aa65de', 'Open-air restaurant over the water'),
  food: p('photo-1668236543090-82eba5ee5976', 'Kerala breakfast served on the deck'),
  spa: p('photo-1600334089648-b0d9d3028eb2', 'Ayurvedic treatment room'),
  boat: p('photo-1609920658906-8223bd289001', 'Morning canoe route through the canals'),
};

/* --------------------------------------------------------------- boutique */
export const kaanchiImages = {
  hero: p('photo-1610030469983-98e550d6193c', 'The Aavani drape — handloom silk in aubergine and gold'),
  kanjivaram: p('photo-1617627143750-d86bc21e42bb', 'Kanjivaram silk saree in coral and gold zari'),
  gown: p('photo-1595777457583-95e059d581b8', 'Occasion gown in crimson georgette'),
  wine: p('photo-1585487000160-6ebcfceb0d03', 'Wine-toned cotton dress with a gathered waist'),
  coord: p('photo-1614251055880-ee96e4803393', 'Printed shirt and wide-leg co-ord set'),
  palazzo: p('photo-1594633312681-425c7b97ccd1', 'Blush georgette palazzo, studio shot'),
  shirt: p('photo-1583846717393-dc2412c95ed7', 'Ivory tie-neck shirt in handwoven cotton'),
  jewel: p('photo-1611652022419-a9419f74343d', 'Layered gold chains worn with a cotton shirt'),
  jewelTwo: p('photo-1599643478518-a784e5dc4c8f', 'Fine gold pendant, close up'),
  store: p('photo-1445205170230-053b83016050', 'The Kaanchi studio store in Alwarpet, Chennai'),
  rail: p('photo-1558769132-cb1aea458c5e', 'The festive edit hanging on the studio rail'),
  fabric: p('photo-1490481651871-ab68de25d43d', 'Made-to-measure toiles on the fitting rail'),
};
