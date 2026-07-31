import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV === 'development';

/**
 * The news app (github.com/RichardHenryJames/plax) is a separate Vercel
 * project served under /news. Override in that project's env if its
 * deployment URL changes.
 */
const NEWS_ZONE = process.env.NEWS_ZONE_URL ?? 'https://plax-rouge.vercel.app';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // This app owns plaxlabs.com and every path not handed to another zone, so
  // it needs no assetPrefix of its own — only the zones behind it do.
  // The floating badge sits bottom-left, where the demo chrome lives.
  devIndicators: false,
  // Pin the workspace root; a stray lockfile in the home directory otherwise
  // makes Turbopack infer the wrong one.
  turbopack: { root: __dirname },
  images: {
    // All demo photography is served from the Unsplash CDN and is verified by
    // `npm run images:verify` before it is allowed into lib/images.ts.
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' }],
    // Preview screenshots keep a stable filename but carry a `?v=<hash>` of
    // their own bytes, so re-shooting a demo busts the month-long cache below.
    // Nothing else is allowed to pass a query string to the optimiser.
    localPatterns: [{ pathname: '/previews/**' }, { pathname: '/**', search: '' }],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 420, 640, 768, 1024, 1280, 1600, 1920],
    imageSizes: [64, 96, 128, 200, 256, 320, 400],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  // The news app is its own Next.js project mounted at /news. It sets
  // `basePath: '/news'`, so its pages *and* its /news/_next assets are both
  // covered by the second rule below — no separate asset prefix is needed.
  async rewrites() {
    return [
      { source: '/news', destination: `${NEWS_ZONE}/news` },
      { source: '/news/:path+', destination: `${NEWS_ZONE}/news/:path+` },
    ];
  },
  // The news app used to own these paths at the domain root. Preserve the
  // links and search rankings that already point at them. Safe to delete once
  // the old URLs no longer appear in Search Console.
  async redirects() {
    return ['topics', 'samachar', 'profile'].map((p) => ({
      source: `/${p}/:path*`,
      destination: `/news/${p}/:path*`,
      permanent: true,
    }));
  },
  async headers() {
    return [
      {
        // Everything except /news. These rules are written for this app — its
        // CSP allows only Unsplash images and no third-party connections.
        // Applying them to the proxied news app would block its image sources
        // and its Supabase calls, so that zone sends its own headers.
        source: '/((?!news).*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              // React's dev runtime needs eval; production does not.
              `script-src 'self' 'unsafe-inline' ${isDev ? "'unsafe-eval'" : ''} https://va.vercel-scripts.com`,
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https://images.unsplash.com",
              "font-src 'self' data:",
              `connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com${isDev ? ' ws: http://localhost:*' : ''}`,
              "form-action 'self'",
              "frame-ancestors 'self'",
              "base-uri 'self'",
              "object-src 'none'",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
