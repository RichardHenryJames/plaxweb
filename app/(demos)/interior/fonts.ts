import { Marcellus, Work_Sans } from 'next/font/google';

export const marcellus = Marcellus({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-marcellus',
  weight: ['400'],
});

export const workSans = Work_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-work-sans',
  weight: ['300', '400', '500'],
});

export const mittiFonts = `${marcellus.variable} ${workSans.variable}`;
