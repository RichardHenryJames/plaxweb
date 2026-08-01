import 'server-only';

/**
 * What we can tell about an enquiry from the request that carried it.
 *
 * None of this is asked for on the form. It comes from headers the browser and
 * the edge network already send, which is why it is worth capturing: it costs
 * the visitor nothing and answers the questions a salesperson asks first —
 * where are they, were they on a phone, and which page were they on.
 *
 * A note on the IP address. It is personal data in most of the markets this
 * site sells into, so it is kept because it is genuinely useful for spotting
 * duplicate and fraudulent submissions, and for nothing else. If you ever put
 * a privacy page on this site, this is the thing that needs to be on it.
 */

export type Visitor = {
  ip?: string;
  city?: string;
  region?: string;
  country?: string;
  timezone?: string;
  device?: 'Mobile' | 'Tablet' | 'Desktop';
  browser?: string;
  os?: string;
  language?: string;
  referer?: string;
  userAgent?: string;
};

/**
 * Deliberately small and readable rather than a full UA database.
 *
 * User-agent strings lie by design — every browser claims to be several
 * others — so the order of these tests matters more than the list length.
 * Edge before Chrome, Chrome before Safari, because each impersonates the
 * next. Anything unrecognised is reported as unknown rather than guessed at.
 */
function parseUserAgent(ua: string): { browser?: string; os?: string; device?: Visitor['device'] } {
  if (!ua) return {};

  const browser =
    /Edg\//.test(ua) ? 'Edge'
    : /OPR\/|Opera/.test(ua) ? 'Opera'
    : /SamsungBrowser/.test(ua) ? 'Samsung Internet'
    : /Firefox\//.test(ua) ? 'Firefox'
    : /Chrome\//.test(ua) ? 'Chrome'
    : /Safari\//.test(ua) ? 'Safari'
    : undefined;

  const os =
    /Windows NT 10/.test(ua) ? 'Windows'
    : /Windows/.test(ua) ? 'Windows'
    : /Android/.test(ua) ? 'Android'
    : /iPhone|iPad|iPod/.test(ua) ? 'iOS'
    : /Mac OS X/.test(ua) ? 'macOS'
    : /Linux/.test(ua) ? 'Linux'
    : undefined;

  // iPad has reported itself as a Mac since iPadOS 13, so a tablet that says
  // "Macintosh" with touch is unresolvable here and lands as Desktop.
  const device: Visitor['device'] = /iPad|Android(?!.*Mobile)|Tablet/.test(ua)
    ? 'Tablet'
    : /Mobi|iPhone|Android/.test(ua)
      ? 'Mobile'
      : 'Desktop';

  // Safari puts its own version in Version/, and a WebKit build number in
  // Safari/. Reading the latter reports "Safari 604" for every Apple device
  // ever made, which is true and useless.
  const versionToken =
    browser === 'Edge' ? 'Edg'
    : browser === 'Safari' ? 'Version'
    : browser === 'Opera' ? 'OPR'
    : browser === 'Samsung Internet' ? 'SamsungBrowser'
    : browser;

  const version = versionToken ? new RegExp(`${versionToken}\\/([0-9]+)`).exec(ua)?.[1] : undefined;

  return { browser: browser && version ? `${browser} ${version}` : browser, os, device };
}

const clean = (v: string | null | undefined): string | undefined => {
  const s = v?.trim();
  return s ? s : undefined;
};

export function readVisitor(h: Headers): Visitor {
  const ua = h.get('user-agent') ?? '';
  const parsed = parseUserAgent(ua);

  // x-forwarded-for is a chain; the client is the first entry. The rest are
  // proxies, and trusting a later one would report our own edge as the source.
  const ip = clean(h.get('x-forwarded-for')?.split(',')[0]) ?? clean(h.get('x-real-ip'));

  // Client hints are more trustworthy than the UA string where they exist,
  // so they win. Chrome and Edge send them; Firefox and Safari do not.
  const chMobile = h.get('sec-ch-ua-mobile');
  const chPlatform = clean(h.get('sec-ch-ua-platform'))?.replace(/"/g, '');

  return {
    ip,
    // Vercel resolves these at the edge and URL-encodes city names.
    city: clean(h.get('x-vercel-ip-city')) && decodeURIComponent(h.get('x-vercel-ip-city')!),
    region: clean(h.get('x-vercel-ip-country-region')),
    country: clean(h.get('x-vercel-ip-country')),
    timezone: clean(h.get('x-vercel-ip-timezone')),
    device: chMobile === '?1' ? 'Mobile' : chMobile === '?0' && parsed.device === 'Mobile' ? 'Desktop' : parsed.device,
    browser: parsed.browser,
    os: chPlatform || parsed.os,
    language: clean(h.get('accept-language'))?.split(',')[0],
    referer: clean(h.get('referer')),
    userAgent: ua || undefined,
  };
}

/** The block that goes in the admin email. */
export function formatVisitor(v: Visitor, countryName?: string): string {
  const place = [v.city, v.region, countryName ?? v.country].filter(Boolean).join(', ');

  const rows: [string, string | undefined][] = [
    ['Device', [v.device, v.os].filter(Boolean).join(' · ') || undefined],
    ['Browser', v.browser],
    ['Location', place || undefined],
    ['Time zone', v.timezone],
    ['Language', v.language],
    ['IP address', v.ip],
  ];

  const table = rows
    .filter(([, val]) => val)
    .map(([k, val]) => `${k.padEnd(18)}: ${val}`)
    .join('\n');

  return table || 'Nothing available — the request carried no usable headers.';
}
