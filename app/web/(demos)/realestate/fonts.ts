import { Newsreader, Inter_Tight } from 'next/font/google';

export const newsreader = Newsreader({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-newsreader',
  weight: ['300', '400', '500', '600'],
});

export const interTight = Inter_Tight({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter-tight',
  weight: ['400', '500', '600'],
});

export const estateFonts = `${newsreader.variable} ${interTight.variable}`;
