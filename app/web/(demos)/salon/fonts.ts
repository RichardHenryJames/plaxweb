import { Cormorant_Garamond, Jost } from 'next/font/google';

export const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
});

export const jost = Jost({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jost',
  weight: ['300', '400', '500'],
});

export const salonFonts = `${cormorant.variable} ${jost.variable}`;
