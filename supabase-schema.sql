-- PlaxWeb lead capture.
--
-- Runs in the SAME Supabase project as the Plax news app, so the two share a
-- keep-alive and a bill. The table is prefixed rather than put in its own
-- schema so it is obvious in the dashboard which product a row belongs to.
--
-- Apply once: Supabase dashboard → SQL Editor → paste → Run.

create table if not exists public.plaxweb_leads (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),

  -- What the visitor typed.
  name         text not null,
  phone        text not null,
  email        text,
  business     text,
  category     text not null,
  message      text,

  -- Where the enquiry came from. This is the part that makes the table worth
  -- having: it answers which demo and which device actually produce leads.
  solution        text,
  reference_demo  text,
  preview_view    text,
  referer         text,

  -- Everything the request itself told us: device, browser, operating system,
  -- city, region, country, time zone, language and IP. Nothing here is asked
  -- for on the form.
  --
  -- The IP is personal data in most markets this site sells into. It is kept
  -- because it is what identifies duplicate and fraudulent submissions, and
  -- for nothing else. If a privacy page is ever added, this belongs on it.
  meta         jsonb,

  -- Sales pipeline. Updated by hand in the dashboard.
  status       text not null default 'new'
    check (status in ('new', 'contacted', 'quoted', 'won', 'lost')),
  notes        text
);

-- Newest first is the only way this is ever read in the dashboard.
create index if not exists plaxweb_leads_created_at_idx
  on public.plaxweb_leads (created_at desc);

-- "Which demo brings enquiries" is the question we most want answered.
create index if not exists plaxweb_leads_reference_demo_idx
  on public.plaxweb_leads (reference_demo);

-- Leads are commercially sensitive and contain phone numbers, so nothing is
-- readable by the public. RLS is enabled with NO policies, which denies the
-- anon and authenticated roles outright. The server writes with the service
-- role key, which bypasses RLS by design, and you read them in the dashboard.
alter table public.plaxweb_leads enable row level security;

-- ---------------------------------------------------------------------------
-- Migration for tables created before the meta column existed. Safe to run on
-- a fresh database too: the create above already includes it.
alter table public.plaxweb_leads add column if not exists meta jsonb;

-- Verify after applying:
--   select count(*) from public.plaxweb_leads;                 -- as service role: works
--   -- with the anon key from a browser: returns nothing.
