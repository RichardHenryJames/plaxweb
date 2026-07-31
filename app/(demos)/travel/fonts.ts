import { Instrument_Serif, DM_Sans } from 'next/font/google';

export const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-instrument-serif',
  weight: ['400'],
  style: ['normal', 'italic'],
});

export const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
  weight: ['400', '500', '600'],
});

export const wayfareFonts = `${instrumentSerif.variable} ${dmSans.variable}`;
