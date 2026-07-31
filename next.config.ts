import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // plaxlabs.com is served by a separate Vercel project that proxies /web here
  // (a Next.js multi-zone). This app's JS, CSS and fonts must therefore sit
  // under a path the parent can forward verbatim and that cannot collide with
  // the parent's own /_next assets. Next 15+ serves them from the prefix
  // itself, so the app still works when opened on its own deployment URL.
  assetPrefix: '/web-static',
  experimental: {
    // Server Actions reject requests whose Origin does not match the host.
    // Behind the proxy the browser's origin is the parent domain, not this
    // deployment, so the lead form would 403 without this.
    serverActions: { allowedOrigins: ['plaxlabs.com', 'www.plaxlabs.com'] },
  },
  // The floating badge sits bottom-left, where the demo chrome lives.
  devIndicators: false,
  // Pin the workspace root; a stray lockfile in the home directory otherwise
  // makes Turbopack infer the wrong one.
  turbopack: { root: __dirname },
  images: {
    // All demo photography is served from the Unsplash CDN and is verified by
    // `npm run images:verify` before it is allowed into lib/images.ts.
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' }],
    // assetPrefix does NOT cover the image optimiser, so without this every
    // <Image> would request /_next/image from the parent zone, which knows
    // nothing about this app's files. Must stay in step with assetPrefix.
    path: '/web-static/_next/image',
    // Preview screenshots keep a stable filename but carry a `?v=<hash>` of
    // their own bytes, so re-shooting a demo busts the month-long cache below.
    // Nothing else is allowed to pass a query string to the optimiser.
    localPatterns: [{ pathname: '/previews/**' }, { pathname: '/**', search: '' }],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 420, 640, 768, 1024, 1280, 1600, 1920],
    imageSizes: [64, 96, 128, 200, 256, 320, 400],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
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
