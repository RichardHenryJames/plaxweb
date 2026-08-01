'use client';

import { useActionState, useEffect, useId, useRef, useState, useSyncExternalStore } from 'react';
import { submitLead } from '@/app/actions/lead';
import { CATEGORIES, type LeadState } from '@/lib/lead';
import { catalogue, getDemo } from '@/lib/demos';
import { getSourceDemo, track } from '@/lib/analytics';
import { site, whatsappUrl } from '@/lib/site';

const INITIAL: LeadState = { status: 'idle' };

/** Maps a demo slug to the closest business category, so the form arrives pre-filled. */
const CATEGORY_BY_DEMO: Record<string, (typeof CATEGORIES)[number]> = {
  salon: 'Salon / Spa',
  restaurant: 'Restaurant / Cafe',
  clinic: 'Clinic / Healthcare',
  school: 'School / Coaching',
  realestate: 'Real estate / Builder',
  travel: 'Travel / Tours',
  fitness: 'Gym / Fitness',
  interior: 'Interior / Architecture',
  resort: 'Hotel / Resort / Homestay',
  boutique: 'Retail / Fashion label',
};

function Label({ htmlFor, children, optional }: { htmlFor: string; children: React.ReactNode; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 flex items-baseline gap-2 text-[0.8rem] font-medium text-ink-2">
      {children}
      {optional && <span className="font-mono text-[0.6rem] tracking-[0.1em] text-ink-3 uppercase">optional</span>}
    </label>
  );
}

const fieldClass =
  'w-full min-h-[46px] rounded-[3px] border border-rule bg-white px-3.5 py-3 text-[0.95rem] text-ink transition-colors placeholder:text-ink-3/60 focus:border-ink focus:outline-none';

/** sessionStorage never changes mid-page, so this subscription is a no-op. */
const noopSubscribe = () => () => {};

export function LeadForm({
  defaultDemo = '',
  view = '',
  compact = false,
}: {
  defaultDemo?: string;
  view?: string;
  compact?: boolean;
}) {
  const [state, formAction, pending] = useActionState(submitLead, INITIAL);

  // The visitor may have wandered in from a demo without a query string.
  // Reading it through useSyncExternalStore keeps the server render empty and
  // avoids a hydration mismatch, with no effect and no cascading render.
  const remembered = useSyncExternalStore(noopSubscribe, getSourceDemo, () => null);

  const [demoChoice, setDemoChoice] = useState<string | null>(null);
  const [categoryChoice, setCategoryChoice] = useState<string | null>(null);

  const demo = demoChoice ?? defaultDemo ?? remembered ?? '';
  const category = categoryChoice ?? CATEGORY_BY_DEMO[demo] ?? '';
  const solutionName = getDemo(demo)?.solution.name ?? '';

  // The bot time-trap value is written to the DOM after mount, so nothing
  // impure happens during render.
  const startedRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (startedRef.current) startedRef.current.value = String(Date.now());
  }, []);

  const uid = useId();
  const id = (n: string) => `${uid}-${n}`;

  /**
   * Field errors come back with the server action and would otherwise sit
   * there until the next submit, still complaining about a value the visitor
   * has already corrected. Editing a field clears its own message.
   *
   * The reset is done during render rather than in an effect: a new response
   * carries new errors, so the record of "already fixed" belongs to the
   * response it was collected against.
   */
  const [fixed, setFixed] = useState<Record<string, boolean>>({});
  const [answeredFor, setAnsweredFor] = useState(state);
  if (answeredFor !== state) {
    setAnsweredFor(state);
    setFixed({});
  }
  const errorFor = (field: 'name' | 'phone' | 'email') =>
    fixed[field] ? undefined : state.fieldErrors?.[field];
  const clearOnEdit = (field: string) => () => {
    if (!fixed[field]) setFixed((p) => ({ ...p, [field]: true }));
  };

  useEffect(() => {
    if (state.status === 'success') track('lead_submit', { demo: demo || 'none', category });
    if (state.status === 'error') track('lead_error', { demo: demo || 'none' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  if (state.status === 'success') {
    return (
      <div className="rounded-[4px] border border-rule bg-white p-8 sm:p-10">
        <p className="font-mono text-[0.66rem] tracking-[0.2em] text-flame uppercase">Enquiry received</p>
        <h3 className="mt-4 font-display text-[1.9rem] leading-tight font-extrabold tracking-[-0.03em]">
          Thanks, we&apos;ve got it.
        </h3>
        <p className="mt-4 max-w-md text-[1rem] leading-relaxed text-ink-2">
          Someone will read this and reply within one working day, usually on WhatsApp, with a few
          questions and a rough number.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href={whatsappUrl('Hi PlaxWeb, I just submitted an enquiry on your website.')}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('whatsapp_click', { from: 'lead_success' })}
            className="rounded-full bg-ink px-6 py-3 text-[0.9rem] font-medium text-paper transition-colors hover:bg-flame"
          >
            Message us now instead
          </a>
          <a
            href={`tel:+${site.phoneRaw}`}
            onClick={() => track('call_click', { from: 'lead_success' })}
            className="rounded-full border border-ink/20 px-6 py-3 text-[0.9rem] font-medium transition-colors hover:border-ink"
          >
            {site.phoneDisplay}
          </a>
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} className="rounded-[4px] border border-rule bg-white p-6 sm:p-8" noValidate>
      <input ref={startedRef} type="hidden" name="startedAt" defaultValue="" />
      <input type="hidden" name="solution" value={solutionName} />
      <input type="hidden" name="previewView" value={view} />
      {/* Honeypot — hidden from people, irresistible to bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={id('website')}>Website</label>
        <input id={id('website')} type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <fieldset className="border-0 p-0">
        <legend className="mb-5 font-mono text-[0.64rem] tracking-[0.18em] text-ink-3 uppercase">About you</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor={id('name')}>Your name</Label>
            <input
              id={id('name')}
              name="name"
              required
              autoComplete="name"
              placeholder="Ananya Rao"
              className={fieldClass}
              onInput={clearOnEdit('name')}
              aria-invalid={Boolean(errorFor('name'))}
              aria-describedby={errorFor('name') ? id('name-err') : undefined}
            />
            {errorFor('name') && (
              <p id={id('name-err')} className="mt-1.5 text-[0.8rem] text-flame">
                {errorFor('name')}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor={id('phone')}>Phone / WhatsApp</Label>
            <input
              id={id('phone')}
              name="phone"
              type="tel"
              required
              inputMode="tel"
              autoComplete="tel"
              placeholder="+91 98765 43210 or +971 50 123 4567"
              className={fieldClass}
              onInput={clearOnEdit('phone')}
              aria-invalid={Boolean(errorFor('phone'))}
              aria-describedby={errorFor('phone') ? id('phone-err') : undefined}
            />
            {errorFor('phone') && (
              <p id={id('phone-err')} className="mt-1.5 text-[0.8rem] text-flame">
                {errorFor('phone')}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor={id('email')} optional>
              Email
            </Label>
            <input
              id={id('email')}
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@business.com"
              className={fieldClass}
              onInput={clearOnEdit('email')}
              aria-invalid={Boolean(errorFor('email'))}
              aria-describedby={errorFor('email') ? id('email-err') : undefined}
            />
            {errorFor('email') && (
              <p id={id('email-err')} className="mt-1.5 text-[0.8rem] text-flame">
                {errorFor('email')}
              </p>
            )}
          </div>
        </div>
      </fieldset>

      <fieldset className="mt-8 border-0 p-0">
        <legend className="mb-5 font-mono text-[0.64rem] tracking-[0.18em] text-ink-3 uppercase">
          Your business
        </legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor={id('category')}>Business category</Label>
            <select
              id={id('category')}
              name="category"
              required
              value={category}
              onChange={(e) => setCategoryChoice(e.target.value)}
              className={fieldClass}
            >
              <option value="" disabled>
                Choose one
              </option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor={id('demo')} optional>
              Which demo did you like?
            </Label>
            <select
              id={id('demo')}
              name="referenceDemo"
              value={demo}
              onChange={(e) => {
                setDemoChoice(e.target.value);
                setCategoryChoice(CATEGORY_BY_DEMO[e.target.value] ?? null);
              }}
              className={fieldClass}
            >
              <option value="none">None / not sure</option>
              {catalogue.map((d) => (
                <option key={d.slug} value={d.slug}>
                  {d.solution.name}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor={id('message')} optional>
              Anything we should know?
            </Label>
            <textarea
              id={id('message')}
              name="message"
              rows={compact ? 3 : 4}
              maxLength={2000}
              placeholder="Pages you need, what you dislike about your current site, a link to a competitor you like…"
              className={`${fieldClass} resize-y`}
            />
          </div>
        </div>
      </fieldset>

      {state.status === 'error' && state.message && (
        <p role="alert" className="mt-6 rounded-[3px] border border-flame/35 bg-flame-soft/50 px-4 py-3 text-[0.88rem] text-ink">
          {state.message}
        </p>
      )}

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={pending}
          onClick={() => track('contact_start', { from: 'form_submit', demo: demo || 'none' })}
          className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full bg-flame px-8 py-3.5 text-[0.95rem] font-medium text-white transition-colors hover:bg-ink disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? 'Sending…' : 'Send enquiry'}
          {!pending && <span aria-hidden>→</span>}
        </button>
        <p className="max-w-xs text-[0.78rem] leading-relaxed text-ink-3">
          No newsletter, no sales sequence. We reply once, from a real person.
        </p>
      </div>
    </form>
  );
}
