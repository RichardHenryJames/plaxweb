import { wayfareImages as img } from '@/lib/images';
import type { Photo } from '@/lib/images';

export const wayfare = {
  name: 'Wayfare Journeys',
  phoneDisplay: '+91 832 660 2211',
  phoneRaw: '918326602211',
  whatsappRaw: '919822004466',
  address: ['Wayfare Journeys', '2nd Floor, Corte de Oiteiro, Rua de Ourem', 'Panjim, Goa 403001'],
  licence: 'Ministry of Tourism approved · IATA accredited agent',
};

export type Trip = {
  slug: string;
  name: string;
  region: 'Himalaya' | 'South' | 'Rajasthan' | 'Coast';
  days: number;
  from: string;
  fromValue: number;
  pace: 'Easy' | 'Moderate' | 'Active';
  best: string;
  summary: string;
  cover: Photo;
  includes: string[];
  excludes: string[];
  itinerary: { day: string; title: string; body: string }[];
  departures: { date: string; seats: string; price: string }[];
};

export const trips: Trip[] = [
  {
    slug: 'kerala-backwaters',
    name: 'Kerala, slowly',
    region: 'South',
    days: 8,
    from: '₹68,500',
    fromValue: 68500,
    pace: 'Easy',
    best: 'September – March',
    summary:
      'Kochi, the Vembanad backwaters on a private kettuvallam, tea country at Munnar, and three unhurried days where nothing is scheduled before nine.',
    cover: img.kerala,
    includes: [
      '7 nights — heritage hotel, houseboat, tea bungalow',
      'All breakfasts, 4 dinners, full board on the houseboat',
      'Private vehicle with driver for the full route',
      'Kathakali evening and a Fort Kochi walk with a historian',
      'Airport transfers at Kochi',
    ],
    excludes: ['Flights to and from Kochi', 'Lunches on days 2, 4 and 6', 'Ayurveda treatments', 'Personal expenses'],
    itinerary: [
      { day: 'Day 1', title: 'Arrive Kochi', body: 'Met at the airport and driven to Fort Kochi. Evening free. Dinner at a Jew Town courtyard restaurant.' },
      { day: 'Day 2', title: 'Fort Kochi on foot', body: 'A three-hour walk with a local historian — the Chinese nets, the synagogue, Mattancherry, and a spice warehouse still in use.' },
      { day: 'Day 3', title: 'To the backwaters', body: 'Drive to Alappuzha and board a private kettuvallam by noon. Lunch and dinner cooked on board. Moored overnight in a quiet canal.' },
      { day: 'Day 4', title: 'Canals and canoes', body: 'A dawn canoe through village canals too narrow for the houseboat. Back on board for breakfast; disembark at 4pm to a lakeside homestay.' },
      { day: 'Day 5', title: 'Up to Munnar', body: 'Four hours of climbing road through rubber and cardamom. Afternoon at leisure at a working tea estate bungalow.' },
      { day: 'Day 6', title: 'Tea country', body: 'Morning with a plantation manager — plucking, withering, rolling, tasting. Afternoon walk to Lakshmi Hills. Nothing else planned.' },
      { day: 'Day 7', title: 'Return to Kochi', body: 'A slow drive down with a stop at Cheeyappara. Evening Kathakali performance with the make-up session beforehand.' },
      { day: 'Day 8', title: 'Depart', body: 'Transfer to Kochi airport. Late checkout can be arranged at cost.' },
    ],
    departures: [
      { date: '12 Oct 2026', seats: '6 seats left', price: '₹68,500' },
      { date: '9 Nov 2026', seats: '2 seats left', price: '₹72,000' },
      { date: '14 Dec 2026', seats: 'Waitlist', price: '₹79,500' },
      { date: '11 Jan 2027', seats: '10 seats left', price: '₹72,000' },
    ],
  },
  {
    slug: 'rajasthan-forts',
    name: 'Rajasthan, without the coach',
    region: 'Rajasthan',
    days: 10,
    from: '₹94,000',
    fromValue: 94000,
    pace: 'Moderate',
    best: 'October – March',
    summary:
      'Jaipur, Bundi, Jodhpur and a night in the Thar — travelling by car and one overnight train, staying in havelis rather than chain hotels.',
    cover: img.jaipur,
    includes: [
      '9 nights in restored havelis and one desert camp',
      'All breakfasts and 6 dinners',
      'Private car and driver throughout',
      'Monument entry at Amber, Mehrangarh, Bundi and Ranakpur',
      'A morning with a Jaipur block-printing family',
    ],
    excludes: ['Flights', 'Camera fees at monuments', 'Lunches', 'Camel safari beyond the included two hours'],
    itinerary: [
      { day: 'Day 1–2', title: 'Jaipur', body: 'Amber at opening time before the crowds, the Jantar Mantar with an astronomer, and an afternoon in the old city with a textile buyer.' },
      { day: 'Day 3', title: 'Block printing at Bagru', body: 'A working morning with a printing family — not a demonstration. You leave with what you print.' },
      { day: 'Day 4–5', title: 'Bundi', body: 'The step-wells and the painted palace, in a town that has almost no tourism infrastructure. Two nights in a haveli on the lake.' },
      { day: 'Day 6–7', title: 'Jodhpur', body: 'Mehrangarh in the morning light, the blue city on foot, and an evening on a rooftop above Toorji ka Jhalra.' },
      { day: 'Day 8', title: 'Into the Thar', body: 'Drive to a dune camp beyond Osian. Two hours by camel at sunset, dinner on the sand, and no generator after 11pm.' },
      { day: 'Day 9', title: 'Ranakpur', body: 'The Jain temple at Ranakpur, then a long slow drive to Udaipur through the Aravallis.' },
      { day: 'Day 10', title: 'Udaipur & depart', body: 'A morning boat on Pichola, then transfer to the airport.' },
    ],
    departures: [
      { date: '18 Oct 2026', seats: '4 seats left', price: '₹94,000' },
      { date: '15 Nov 2026', seats: 'Sold out', price: '₹99,000' },
      { date: '6 Dec 2026', seats: '8 seats left', price: '₹1,08,000' },
      { date: '7 Feb 2027', seats: '11 seats left', price: '₹94,000' },
    ],
  },
  {
    slug: 'spiti-loop',
    name: 'The Spiti loop',
    region: 'Himalaya',
    days: 11,
    from: '₹1,12,000',
    fromValue: 112000,
    pace: 'Active',
    best: 'June – September',
    summary:
      'Shimla to Manali the long way — Kalpa, Nako, Tabo, Kaza, Kibber and Chandratal — with two acclimatisation days built in because altitude does not negotiate.',
    cover: img.himalaya,
    includes: [
      '10 nights in guesthouses, monastery stays and one camp',
      'All meals from day 2 onwards',
      'Tempo Traveller with an experienced high-altitude driver',
      'Inner Line Permits and monastery donations',
      'Oxygen cylinder and a pulse oximeter with the group',
    ],
    excludes: ['Travel to Shimla and from Manali', 'Travel insurance (mandatory)', 'Personal trekking gear'],
    itinerary: [
      { day: 'Day 1', title: 'Shimla', body: 'Arrive and settle. A briefing on altitude, hydration and what the next ten days actually involve.' },
      { day: 'Day 2–3', title: 'To Kalpa', body: 'Along the Sutlej to Sarahan and then Kalpa, facing Kinner Kailash. First acclimatisation night at 2,960m.' },
      { day: 'Day 4', title: 'Nako', body: 'The road narrows past Spillow. Nako lake and the eleventh-century monastery. 3,660m — a short walk only.' },
      { day: 'Day 5', title: 'Tabo', body: 'The thousand-year-old Tabo monastery, and its murals, with a monk who will explain them if you ask properly.' },
      { day: 'Day 6–7', title: 'Kaza & Key', body: 'Base at Kaza. Key monastery, Kibber at 4,270m, and the Chicham bridge. A rest afternoon that people always underestimate.' },
      { day: 'Day 8', title: 'Langza, Komic, Hikkim', body: 'Fossils at Langza, the world’s highest post office at Hikkim — send a postcard, it takes a month.' },
      { day: 'Day 9', title: 'Chandratal', body: 'Over Kunzum La to the lake. Camp at 4,250m. Cold, and worth it.' },
      { day: 'Day 10', title: 'To Manali', body: 'Rohtang or the Atal Tunnel depending on conditions. Down into green again, which is a strange feeling after ten days.' },
      { day: 'Day 11', title: 'Depart Manali', body: 'Group ends after breakfast. We can book onward transport to Delhi or Chandigarh.' },
    ],
    departures: [
      { date: '14 Jun 2026', seats: '3 seats left', price: '₹1,12,000' },
      { date: '5 Jul 2026', seats: '9 seats left', price: '₹1,12,000' },
      { date: '16 Aug 2026', seats: '6 seats left', price: '₹1,18,000' },
      { date: '6 Sep 2026', seats: '12 seats left', price: '₹1,12,000' },
    ],
  },
  {
    slug: 'konkan-coast',
    name: 'The Konkan coast',
    region: 'Coast',
    days: 6,
    from: '₹42,000',
    fromValue: 42000,
    pace: 'Easy',
    best: 'November – February',
    summary:
      'Goa to Malvan by road — sea forts, Konkani home kitchens, empty beaches and one morning of snorkelling off Tarkarli.',
    cover: img.goa,
    includes: [
      '5 nights in homestays and one beach property',
      'All breakfasts and 4 home-cooked dinners',
      'Private vehicle from Goa airport',
      'Sindhudurg fort boat and a Malvani cooking session',
    ],
    excludes: ['Flights', 'Water sports beyond the included snorkelling', 'Alcohol'],
    itinerary: [
      { day: 'Day 1', title: 'North to Vengurla', body: 'Picked up at Goa airport and driven up the coast road. Evening on an almost empty beach.' },
      { day: 'Day 2', title: 'Sawantwadi & Amboli', body: 'Lacquerware workshops at Sawantwadi, then up to Amboli ghat for the evening.' },
      { day: 'Day 3', title: 'Malvan', body: 'Boat to Sindhudurg fort in the morning. Afternoon at leisure. Dinner cooked in a Malvani home.' },
      { day: 'Day 4', title: 'Tarkarli', body: 'Snorkelling off the sandbar at first light, then a slow day. A cooking session with sol kadhi and kombdi vade.' },
      { day: 'Day 5', title: 'Devbagh & Achra', body: 'Backwater boat at Devbagh, the sangam where the river meets the sea, and the old Achra fishing village.' },
      { day: 'Day 6', title: 'Back to Goa', body: 'Coastal drive back with a stop at Terekhol. Drop at Goa airport by 3pm.' },
    ],
    departures: [
      { date: '22 Nov 2026', seats: '7 seats left', price: '₹42,000' },
      { date: '20 Dec 2026', seats: '2 seats left', price: '₹48,000' },
      { date: '17 Jan 2027', seats: '12 seats left', price: '₹42,000' },
    ],
  },
  {
    slug: 'golden-triangle',
    name: 'Delhi, Agra, Jaipur — done properly',
    region: 'Rajasthan',
    days: 7,
    from: '₹58,000',
    fromValue: 58000,
    pace: 'Moderate',
    best: 'October – March',
    summary:
      'The classic route, but at the right times of day, with a historian in Delhi and sunrise at the Taj before the gates get busy.',
    cover: img.taj,
    includes: [
      '6 nights in boutique hotels',
      'All breakfasts and 3 dinners',
      'Gatimaan Express to Agra in executive chair car',
      'Monument entries including the Taj and Amber',
      'Old Delhi walk and a Chandni Chowk food crawl',
    ],
    excludes: ['International flights', 'Lunches', 'Camera fees', 'Tips'],
    itinerary: [
      { day: 'Day 1', title: 'Delhi', body: 'Arrive and rest. Evening at Nizamuddin for the Thursday qawwali if the day falls right.' },
      { day: 'Day 2', title: 'Old and New Delhi', body: 'Jama Masjid and the lanes of Shahjahanabad on foot, then Humayun’s Tomb in the late light.' },
      { day: 'Day 3', title: 'To Agra', body: 'Morning train. Afternoon at Agra Fort, and Mehtab Bagh for the view across the river at sunset.' },
      { day: 'Day 4', title: 'The Taj at sunrise', body: 'At the gate before it opens. Back for a late breakfast, then Itmad-ud-Daulah, which most people skip.' },
      { day: 'Day 5', title: 'Fatehpur Sikri to Jaipur', body: 'Break the drive at Fatehpur Sikri and Abhaneri step-well. Reach Jaipur by evening.' },
      { day: 'Day 6', title: 'Jaipur', body: 'Amber at opening, the City Palace, and an afternoon in the bazaars with someone who knows which shops are worth it.' },
      { day: 'Day 7', title: 'Depart', body: 'Transfer to Jaipur airport, or onward road transfer to Delhi.' },
    ],
    departures: [
      { date: '4 Oct 2026', seats: '9 seats left', price: '₹58,000' },
      { date: '1 Nov 2026', seats: '5 seats left', price: '₹62,000' },
      { date: '13 Dec 2026', seats: '3 seats left', price: '₹68,000' },
    ],
  },
  {
    slug: 'mumbai-weekend',
    name: 'Bombay, three days',
    region: 'Coast',
    days: 3,
    from: '₹24,500',
    fromValue: 24500,
    pace: 'Easy',
    best: 'November – February',
    summary:
      'Art deco Marine Drive, the Sassoon Dock at 5am, Elephanta, and a food walk that avoids every place on the usual list.',
    cover: img.mumbai,
    includes: ['2 nights in Colaba', 'All breakfasts', 'Elephanta ferry and guide', 'Two guided walks', 'Airport transfers'],
    excludes: ['Flights', 'Dinners', 'Personal shopping'],
    itinerary: [
      { day: 'Day 1', title: 'Fort & Kala Ghoda', body: 'An architecture walk through the Gothic and art deco precinct, ending at Marine Drive for sunset.' },
      { day: 'Day 2', title: 'Docks and Elephanta', body: 'Sassoon Dock at 5:30am when the catch lands, breakfast at an Irani café, then the ferry to Elephanta.' },
      { day: 'Day 3', title: 'Bandra and Dharavi', body: 'A morning in Bandra’s village lanes, an honest afternoon in Dharavi with a community organisation, then the airport.' },
    ],
    departures: [
      { date: 'Every Friday', seats: 'Private departures', price: '₹24,500' },
    ],
  },
];

export const whyUs = [
  ['We run our own trips', 'No white-labelled operators. The person who wrote the itinerary is on WhatsApp while you are travelling.'],
  ['Groups of twelve, maximum', 'Small enough for a homestay to feed everybody. Large enough that a fixed departure actually runs.'],
  ['Nothing is a shopping stop', 'You will never be driven to an emporium that pays us commission. Ask any operator this question.'],
  ['Full costing upfront', 'What is included and what is not is on every trip page, before you enquire.'],
];

export const stories = [
  {
    quote:
      'They talked us out of Spiti in our first year of travelling with a six-year-old and put us on the Konkan trip instead. It was the right call and it cost them ₹70,000.',
    name: 'Deepa & Nikhil Sharma',
    trip: 'Konkan coast, Dec 2025',
  },
  {
    quote:
      'The Kerala itinerary had two afternoons with nothing planned. I thought that was lazy planning until I got there.',
    name: 'Farah Qureshi',
    trip: 'Kerala, slowly · Nov 2025',
  },
];
