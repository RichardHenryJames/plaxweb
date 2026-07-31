import { Tenor_Sans, Karla } from 'next/font/google';

export const tenor = Tenor_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-tenor',
  weight: ['400'],
});

export const karla = Karla({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-karla',
  weight: ['300', '400', '500'],
});

export const tamaraFonts = `${tenor.variable} ${karla.variable}`;
