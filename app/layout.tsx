import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { origin, site } from '@/lib/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(origin()),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: '%s',
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.parent, url: `https://${site.domain}` }],
  formatDetection: { telephone: true, address: false, email: false },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#14120f',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Without JavaScript nothing can reveal itself, so show everything. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
