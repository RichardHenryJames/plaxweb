'use client';

/**
 * Provider-agnostic analytics.
 *
 * Events are forwarded to whichever of these is present at runtime:
 *   - Vercel Analytics  (window.va)
 *   - GTM / GA4         (window.dataLayer)
 * If neither exists the call is a no-op, so nothing breaks in local dev and
 * we are never locked to one vendor.
 *
 * The event vocabulary is deliberately small and business-shaped so the
 * funnel can be read straight off the dashboard:
 *   portfolio_view → demo_preview_toggle → demo_open → demo_cta_click
 *                  → contact_start → lead_submit
 */

export type PlaxEvent =
  | 'portfolio_view'
  | 'service_view'
  | 'demo_card_view'
  | 'sector_filter'
  | 'demo_preview_toggle'
  | 'demo_open'
  | 'demo_cta_click'
  | 'demo_switch'
  | 'whatsapp_click'
  | 'call_click'
  | 'contact_start'
  | 'lead_submit'
  | 'lead_error';

type Props = Record<string, string | number | boolean | undefined>;

type WithAnalytics = Window & {
  va?: (event: 'event', payload: { name: string } & Props) => void;
  dataLayer?: unknown[];
};

const SOURCE_KEY = 'plax:sourceDemo';

export function track(event: PlaxEvent, props: Props = {}): void {
  if (typeof window === 'undefined') return;

  const payload: Props = { ...props };
  const source = getSourceDemo();
  if (source && !payload.sourceDemo) payload.sourceDemo = source;

  const w = window as WithAnalytics;
  try {
    w.va?.('event', { name: event, ...payload });
    w.dataLayer?.push({ event, ...payload });
  } catch {
    // Analytics must never break a page.
  }
}

/**
 * Remember which demo a visitor came from so a lead submitted later can be
 * attributed to it. Survives navigation inside the tab, not across sessions.
 */
export function setSourceDemo(slug: string): void {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.setItem(SOURCE_KEY, slug);
  } catch {
    /* private mode */
  }
}

export function getSourceDemo(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return window.sessionStorage.getItem(SOURCE_KEY);
  } catch {
    return null;
  }
}
