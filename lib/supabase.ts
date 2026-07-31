import 'server-only';
import { createClient } from '@supabase/supabase-js';

/**
 * Supabase, server-side only.
 *
 * This is the same project the Plax news app uses — one database, one bill,
 * and one keep-alive cron (that cron lives in the plax repo and hits
 * /news/api/keep-alive daily, which is what stops the free tier auto-pausing).
 *
 * Writes go through the service role key, which bypasses row-level security.
 * plaxweb_leads has RLS enabled with no policies, so a leaked anon key still
 * cannot read anyone's phone number. The `server-only` import above makes it a
 * build error if this file is ever pulled into a client bundle.
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/** Null when unconfigured, so local dev and previews run without secrets. */
export function leadStore() {
  if (!url || !serviceKey) return null;
  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/** True when the environment can actually store a lead. */
export const leadStoreConfigured = Boolean(url && serviceKey);
