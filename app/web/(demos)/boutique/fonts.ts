import { Bodoni_Moda, Space_Grotesk } from 'next/font/google';

export const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bodoni',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
  weight: ['400', '500'],
});

export const kaanchiFonts = `${bodoni.variable} ${spaceGrotesk.variable}`;
