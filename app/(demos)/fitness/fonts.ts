import { Anton, Barlow } from 'next/font/google';

export const anton = Anton({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-anton',
  weight: ['400'],
});

export const barlow = Barlow({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-barlow',
  weight: ['400', '500', '600'],
});

export const ironFonts = `${anton.variable} ${barlow.variable}`;
