import { ironImages as img } from '@/lib/images';

export const iron = {
  name: 'Ironhouse Strength Club',
  short: 'Ironhouse',
  phoneDisplay: '+91 40 4855 2020',
  phoneRaw: '914048552020',
  whatsappRaw: '919701882020',
  address: ['Ironhouse Strength Club', 'Plot 42, Road No. 36, Jubilee Hills', 'Hyderabad 500033'],
  mapQuery: 'Road No 36 Jubilee Hills Hyderabad',
  hours: '05:00 – 22:30 · seven days',
};

export const programmes = [
  {
    name: 'Barbell Strength',
    line: 'Squat, bench, deadlift, press. Linear progression until it stops working, then blocks.',
    who: 'Beginners welcome. Most people add 40–60 kg to their total in the first year.',
    image: img.press,
  },
  {
    name: 'Hybrid',
    line: 'Three lifting days, two conditioning days, one long aerobic session a week.',
    who: 'For people who want to be strong and still able to run 10k without hating it.',
    image: img.conditioning,
  },
  {
    name: 'Conditioning',
    line: 'Assault bikes, sleds, carries and intervals. Forty-five minutes, no music theatrics.',
    who: 'For fat loss and work capacity. Scaled every session, so nobody is left behind.',
    image: img.kettlebell,
  },
  {
    name: 'Personal training',
    line: 'One-to-one or in a pair. Programme written for you and adjusted every fortnight.',
    who: 'For injuries, competition prep, or anyone who simply trains better with a coach in the room.',
    image: img.coach,
  },
];

export type Slot = { time: string; name: string; coach: string; type: 'Strength' | 'Conditioning' | 'Hybrid' | 'Open' };

export const timetable: { day: string; slots: Slot[] }[] = [
  {
    day: 'Monday',
    slots: [
      { time: '06:00', name: 'Barbell Strength', coach: 'Vikram', type: 'Strength' },
      { time: '07:15', name: 'Conditioning 45', coach: 'Ritu', type: 'Conditioning' },
      { time: '18:00', name: 'Barbell Strength', coach: 'Vikram', type: 'Strength' },
      { time: '19:15', name: 'Hybrid', coach: 'Sameer', type: 'Hybrid' },
      { time: '20:30', name: 'Open floor', coach: 'Duty coach', type: 'Open' },
    ],
  },
  {
    day: 'Tuesday',
    slots: [
      { time: '06:00', name: 'Conditioning 45', coach: 'Ritu', type: 'Conditioning' },
      { time: '07:15', name: 'Hybrid', coach: 'Sameer', type: 'Hybrid' },
      { time: '18:00', name: 'Conditioning 45', coach: 'Ritu', type: 'Conditioning' },
      { time: '19:15', name: 'Barbell Strength', coach: 'Vikram', type: 'Strength' },
    ],
  },
  {
    day: 'Wednesday',
    slots: [
      { time: '06:00', name: 'Barbell Strength', coach: 'Vikram', type: 'Strength' },
      { time: '07:15', name: 'Mobility & core', coach: 'Ananya', type: 'Hybrid' },
      { time: '18:00', name: 'Barbell Strength', coach: 'Sameer', type: 'Strength' },
      { time: '19:15', name: 'Conditioning 45', coach: 'Ritu', type: 'Conditioning' },
      { time: '20:30', name: 'Open floor', coach: 'Duty coach', type: 'Open' },
    ],
  },
  {
    day: 'Thursday',
    slots: [
      { time: '06:00', name: 'Hybrid', coach: 'Sameer', type: 'Hybrid' },
      { time: '07:15', name: 'Conditioning 45', coach: 'Ritu', type: 'Conditioning' },
      { time: '18:00', name: 'Hybrid', coach: 'Sameer', type: 'Hybrid' },
      { time: '19:15', name: 'Barbell Strength', coach: 'Vikram', type: 'Strength' },
    ],
  },
  {
    day: 'Friday',
    slots: [
      { time: '06:00', name: 'Barbell Strength', coach: 'Vikram', type: 'Strength' },
      { time: '07:15', name: 'Conditioning 45', coach: 'Ananya', type: 'Conditioning' },
      { time: '18:00', name: 'Barbell Strength', coach: 'Vikram', type: 'Strength' },
      { time: '19:15', name: 'Friday finisher', coach: 'All coaches', type: 'Conditioning' },
    ],
  },
  {
    day: 'Saturday',
    slots: [
      { time: '07:00', name: 'Long conditioning', coach: 'Ritu', type: 'Conditioning' },
      { time: '08:30', name: 'Barbell Strength', coach: 'Vikram', type: 'Strength' },
      { time: '10:00', name: 'Beginners’ intake', coach: 'Ananya', type: 'Open' },
      { time: '17:00', name: 'Open floor', coach: 'Duty coach', type: 'Open' },
    ],
  },
  {
    day: 'Sunday',
    slots: [
      { time: '08:00', name: 'Open floor', coach: 'Duty coach', type: 'Open' },
      { time: '09:30', name: 'Mobility & core', coach: 'Ananya', type: 'Hybrid' },
    ],
  },
];

export const coaches = [
  {
    name: 'Vikram Reddy',
    role: 'Head Coach · Strength',
    creds: 'NSCA-CSCS · National-level powerlifter, 93 kg',
    note: 'Coaches every barbell class. Will make you spend three weeks on technique before adding weight, and will not apologise for it.',
    image: img.coach,
  },
  {
    name: 'Ritu Menon',
    role: 'Conditioning',
    creds: 'ACSM-CPT · Ironman 70.3 finisher',
    note: 'Runs conditioning and the Saturday long session. Scales everything — nobody has ever been left behind in her class.',
    image: img.athlete,
  },
  {
    name: 'Sameer Ali',
    role: 'Hybrid & Personal Training',
    creds: 'ACE-CPT · FMS Level 2',
    note: 'Handles return-to-training after injury. Works with three orthopaedic physiotherapists in Jubilee Hills.',
    image: img.mobility,
  },
  {
    name: 'Ananya Rao',
    role: 'Onboarding & Mobility',
    creds: 'BPT · Certified Strength Coach',
    note: 'Every new member’s first two sessions are with Ananya. Movement screen, baseline numbers, and a plan.',
    image: img.silhouette,
  },
];

export const plans = [
  {
    name: 'Open floor',
    price: '₹2,800',
    period: 'per month',
    line: 'Access to the floor during staffed hours. No classes.',
    perks: ['05:00 – 22:30, seven days', 'Duty coach on the floor', 'Free reassessment every quarter', 'Locker and towel'],
  },
  {
    name: 'Full',
    price: '₹4,600',
    period: 'per month',
    line: 'Everything on the timetable, plus the floor.',
    featured: true,
    perks: [
      'All classes, unlimited',
      'Programme written for you',
      'Fortnightly check-in with a coach',
      'InBody scan every six weeks',
      'Locker, towel and shake bar credit',
    ],
  },
  {
    name: 'Coached',
    price: '₹12,500',
    period: 'per month',
    line: 'Two one-to-one sessions a week on top of full access.',
    perks: ['Everything in Full', '8 personal sessions a month', 'Nutrition plan and weekly review', 'Priority class booking'],
  },
];

export const quarterly = [
  ['Quarterly, paid upfront', '10% off'],
  ['Half-yearly', '15% off'],
  ['Annual', '20% off + 1 month free'],
  ['Students & armed forces', '15% off any plan'],
];

export const results = [
  {
    quote:
      'I came in unable to squat below parallel without my back rounding. Eight months later I pulled 160. Nobody rushed me and nobody put me on a machine circuit to keep me quiet.',
    name: 'Harish V.',
    meta: 'Member since 2024',
  },
  {
    quote:
      'The first two sessions are a movement screen with a physio-trained coach. That alone is why I stopped going to the gym in my building.',
    name: 'Priyanka S.',
    meta: 'Member since 2025',
  },
];

export const rules = [
  'Chalk is allowed. Dropping a loaded bar from the top is not.',
  'Every plate goes back on the tree. Every bar gets stripped.',
  'Phones on the floor are for the timer and the log. Not for filming other members.',
  'If you are new, say so. Somebody will show you where things are.',
];
