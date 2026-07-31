import { Bricolage_Grotesque, Geist, Geist_Mono } from 'next/font/google';

/**
 * Studio typography only. Each demo declares its own faces in its own folder
 * so a visitor opening /web/salon never downloads the studio display face.
 */

export const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bricolage',
  weight: ['400', '500', '600', '700', '800'],
});

export const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist',
});

export const geistMono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-mono',
  weight: ['400', '500'],
});

export const studioFontClass = `${bricolage.variable} ${geist.variable} ${geistMono.variable}`;
