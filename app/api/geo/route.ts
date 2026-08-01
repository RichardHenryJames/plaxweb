import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { DEFAULT_COUNTRY, isCountry } from '@/lib/countries';

/**
 * The visitor's country, from the edge network's IP lookup.
 *
 * This exists as an endpoint rather than being read during the render because
 * the home page carries the same enquiry form and is fully static. Reading a
 * request header inside it would make the whole page dynamic and cost us the
 * cached response, to save the visitor one tap on a dropdown. The contact page
 * is already dynamic, so it reads the header directly and never calls this.
 *
 * No IP address is read, stored or logged — only the two-letter country code
 * the platform has already resolved.
 */
export async function GET() {
  const h = await headers();
  // Vercel resolves this at the edge. Cloudflare's equivalent is kept as a
  // fallback so this still works if the site is ever fronted differently.
  const raw = h.get('x-vercel-ip-country') ?? h.get('cf-ipcountry') ?? '';
  const country = isCountry(raw) ? raw.toUpperCase() : DEFAULT_COUNTRY;

  return NextResponse.json(
    { country },
    {
      headers: {
        // Per-visitor answer, so it must not land in a shared cache.
        'Cache-Control': 'private, no-store',
      },
    }
  );
}
