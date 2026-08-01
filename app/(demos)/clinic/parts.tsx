'use client';

import { useEffect, useState } from 'react';
import { clinic, treatments } from './data';
import { track } from '@/lib/analytics';

const NAV = [
  ['#treatments', 'Treatments'],
  ['#pricing', 'What it costs'],
  ['#team', 'Our dentists'],
  ['#safety', 'Safety'],
  ['#visit', 'Visit'],
] as const;

export function ClinicNav() {
  const [open, setOpen] = useState(false);
  const [shadow, setShadow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShadow(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      {/* Utility strip — an emergency number above the fold is the point. */}
      <div className="bg-clinic-ink text-white">
        <div className="mx-auto flex max-w-[80rem] flex-wrap items-center justify-between gap-x-6 gap-y-1 px-5 py-2 text-[0.78rem] sm:px-8">
          <p className="text-white/70">Mon–Fri 9:30–20:00 · Sat 9:30–18:00</p>
          <p>
            <span className="text-white/70">Dental emergency? </span>
            <a
              href={`tel:+${clinic.emergencyRaw}`}
              onClick={() => track('call_click', { demo: 'clinic', from: 'utility_bar' })}
              className="font-semibold text-white underline underline-offset-2"
            >
              {clinic.emergencyDisplay}
            </a>
          </p>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
          shadow ? 'shadow-[0_1px_0_var(--color-clinic-line),0_8px_24px_-16px_rgba(13,32,39,0.3)]' : 'border-b border-clinic-line'
        }`}
      >
        <div className="mx-auto flex h-[68px] max-w-[80rem] items-center justify-between gap-4 px-5 sm:px-8">
          <a href="#top" className="flex min-h-11 items-center gap-2.5">
            <span aria-hidden className="grid h-8 w-8 place-items-center rounded-full bg-clinic-teal text-[0.9rem] font-bold text-white">
              A
            </span>
            <span className="font-clinic-display text-[1.08rem] leading-tight font-semibold text-clinic-ink">
              Aarogya
              <span className="block text-[0.62rem] font-medium tracking-[0.16em] text-clinic-slate uppercase">
                Dental Studio
              </span>
            </span>
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            {NAV.map(([href, label]) => (
              <a key={href} href={href} className="text-[0.88rem] text-clinic-slate transition-colors hover:text-clinic-teal">
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#book"
              className="hidden rounded-full bg-clinic-teal px-5 py-2.5 text-[0.85rem] font-semibold text-white transition-colors hover:bg-clinic-deep sm:inline-flex"
            >
              Book an appointment
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="-mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
              aria-label="Open menu"
            >
              <span aria-hidden className="relative block h-[10px] w-6">
                <span className="absolute inset-x-0 top-0 h-[2px] rounded bg-clinic-ink" />
                <span className="absolute inset-x-0 bottom-0 h-[2px] rounded bg-clinic-ink" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[80] flex flex-col bg-white lg:hidden">
          <div className="flex h-[68px] items-center justify-between border-b border-clinic-line px-5">
            <span className="font-clinic-display text-[1.08rem] font-semibold text-clinic-ink">Aarogya Dental Studio</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="-mr-2 flex h-11 w-11 items-center justify-center text-2xl"
              aria-label="Close menu"
            >
              <span aria-hidden>×</span>
            </button>
          </div>
          <nav aria-label="Mobile" className="flex flex-1 flex-col gap-1 px-5 py-6">
            {NAV.map(([href, label]) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="border-b border-clinic-line py-4 font-clinic-display text-[1.4rem] font-medium text-clinic-ink"
              >
                {label}
              </a>
            ))}
            <a
              href="#book"
              onClick={() => setOpen(false)}
              className="mt-6 rounded-full bg-clinic-teal py-4 text-center font-semibold text-white"
            >
              Book an appointment
            </a>
          </nav>
        </div>
      )}
    </>
  );
}

/* ------------------------------------------------------- treatments */

export function TreatmentGrid() {
  const [openId, setOpenId] = useState<string | null>(treatments[0].id);

  return (
    <div className="mt-12 grid gap-4 md:grid-cols-2">
      {treatments.map((t) => {
        const isOpen = openId === t.id;
        return (
          <article
            key={t.id}
            className={`rounded-[10px] border transition-colors ${
              isOpen ? 'border-clinic-teal bg-clinic-mist' : 'border-clinic-line bg-white hover:border-clinic-teal/45'
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : t.id)}
              aria-expanded={isOpen}
              className="flex w-full items-start justify-between gap-4 p-6 text-left"
            >
              <span className="min-w-0">
                <h3 className="font-clinic-display text-[1.18rem] font-semibold text-clinic-ink">{t.name}</h3>
                <span className="mt-1.5 block text-[0.9rem] leading-relaxed text-clinic-slate">{t.summary}</span>
                <span className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.82rem]">
                  <span className="font-semibold text-clinic-teal">{t.price}</span>
                  <span className="text-clinic-slate">{t.sittings}</span>
                </span>
              </span>
              <span
                aria-hidden
                className={`relative mt-1.5 h-3.5 w-3.5 shrink-0 text-clinic-teal transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
              >
                <span className="absolute top-1/2 left-0 h-[2px] w-full -translate-y-1/2 rounded bg-current" />
                <span className="absolute top-0 left-1/2 h-full w-[2px] -translate-x-1/2 rounded bg-current" />
              </span>
            </button>

            {isOpen && (
              <div className="border-t border-clinic-teal/25 px-6 pt-5 pb-6">
                <p className="text-[0.92rem] leading-relaxed text-clinic-ink/80">{t.detail}</p>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {t.includes.map((i) => (
                    <li key={i} className="flex items-start gap-2 text-[0.86rem] text-clinic-slate">
                      <span aria-hidden className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-clinic-teal" />
                      {i}
                    </li>
                  ))}
                </ul>
                <a href="#book" className="mt-4 inline-flex min-h-[36px] items-center text-[0.86rem] font-semibold text-clinic-teal underline underline-offset-4">
                  Book this treatment →
                </a>
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------ appointment */

const SLOTS = ['09:30', '10:30', '11:30', '12:30', '16:00', '17:00', '18:00', '19:00'];
const WHO = ['New patient', 'Existing patient', 'Second opinion', 'In pain — need to be seen today'];

export function AppointmentForm() {
  const [f, setF] = useState({
    name: '',
    phone: '',
    who: WHO[0],
    treatment: treatments[0].name,
    date: '',
    slot: '10:30',
    note: '',
  });
  const [sent, setSent] = useState(false);
  const ready = f.name.trim().length > 1 && f.phone.trim().length >= 8;

  const msg = [
    'Hello Aarogya Dental Studio, I would like an appointment.',
    '',
    `Name: ${f.name || '—'}`,
    `Phone: ${f.phone || '—'}`,
    `Patient: ${f.who}`,
    `Treatment: ${f.treatment}`,
    `Preferred: ${f.date || 'any day'} at ${f.slot}`,
    f.note ? `Note: ${f.note}` : '',
  ]
    .filter(Boolean)
    .join('\n');

  const field =
    'w-full min-h-[48px] rounded-[8px] border border-clinic-line bg-white px-4 py-3 text-[0.95rem] text-clinic-ink placeholder:text-clinic-slate/55 focus:border-clinic-teal focus:outline-none';
  const label = 'mb-1.5 block text-[0.82rem] font-medium text-clinic-ink';

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF((p) => ({ ...p, [k]: e.target.value }));

  if (sent) {
    return (
      <div className="rounded-[12px] border border-clinic-teal bg-clinic-mist p-8 sm:p-10">
        <p className="text-[0.72rem] font-semibold tracking-[0.16em] text-clinic-teal uppercase">Request noted</p>
        <h3 className="mt-3 font-clinic-display text-[1.7rem] leading-tight font-semibold text-clinic-ink">
          We will call you back to confirm.
        </h3>
        <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-clinic-slate">
          The front desk confirms appointments within working hours. If you are in pain, please call{' '}
          <a href={`tel:+${clinic.emergencyRaw}`} className="font-semibold text-clinic-teal underline underline-offset-2">
            {clinic.emergencyDisplay}
          </a>{' '}
          instead of waiting.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={`https://wa.me/${clinic.whatsappRaw}?text=${encodeURIComponent(msg)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('whatsapp_click', { demo: 'clinic', from: 'appointment_success' })}
            className="rounded-full bg-clinic-teal px-6 py-3 text-[0.9rem] font-semibold text-white"
          >
            Send the same on WhatsApp
          </a>
          <button
            type="button"
            onClick={() => setSent(false)}
            className="rounded-full border border-clinic-line px-6 py-3 text-[0.9rem] font-medium text-clinic-ink"
          >
            Book another
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (ready) setSent(true);
      }}
      className="rounded-[12px] border border-clinic-line bg-white p-6 sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="c-name">
            Full name
          </label>
          <input id="c-name" required className={field} value={f.name} onChange={set('name')} placeholder="Praveen Kumar" />
        </div>
        <div>
          <label className={label} htmlFor="c-phone">
            Mobile number
          </label>
          <input id="c-phone" required type="tel" inputMode="tel" className={field} value={f.phone} onChange={set('phone')} placeholder="98765 43210" />
        </div>
        <div>
          <label className={label} htmlFor="c-who">
            You are
          </label>
          <select id="c-who" className={field} value={f.who} onChange={set('who')}>
            {WHO.map((w) => (
              <option key={w}>{w}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="c-treat">
            Reason for visit
          </label>
          <select id="c-treat" className={field} value={f.treatment} onChange={set('treatment')}>
            {treatments.map((t) => (
              <option key={t.id}>{t.name}</option>
            ))}
            <option>Not sure — need an examination</option>
          </select>
        </div>
        <div>
          <label className={label} htmlFor="c-date">
            Preferred date
          </label>
          <input id="c-date" type="date" className={field} value={f.date} onChange={set('date')} />
        </div>
        <div>
          <span className={label}>Preferred time</span>
          <div className="flex flex-wrap gap-2">
            {SLOTS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setF((p) => ({ ...p, slot: s }))}
                aria-pressed={f.slot === s}
                className={`min-h-[40px] rounded-full border px-3.5 text-[0.84rem] transition-colors ${
                  f.slot === s
                    ? 'border-clinic-teal bg-clinic-teal text-white'
                    : 'border-clinic-line text-clinic-slate hover:border-clinic-teal'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="sm:col-span-2">
          <label className={label} htmlFor="c-note">
            Anything the dentist should know <span className="font-normal text-clinic-slate">(optional)</span>
          </label>
          <textarea
            id="c-note"
            rows={2}
            className={`${field} resize-y`}
            value={f.note}
            onChange={set('note')}
            placeholder="Medication, previous treatment, dental anxiety…"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={!ready}
        className="mt-7 inline-flex min-h-[52px] w-full items-center justify-center rounded-full bg-clinic-teal px-8 text-[0.95rem] font-semibold text-white transition-colors hover:bg-clinic-deep disabled:cursor-not-allowed disabled:bg-clinic-slate/35 sm:w-auto"
      >
        Request appointment
      </button>
      <p className="mt-4 text-[0.82rem] leading-relaxed text-clinic-slate">
        Your details are only used to confirm this appointment. We do not send marketing messages.
      </p>
    </form>
  );
}

export function ClinicMobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] grid grid-cols-3 border-t border-clinic-line bg-white pb-[env(safe-area-inset-bottom)] lg:hidden">
      <a
        href={`tel:+${clinic.phoneRaw}`}
        onClick={() => track('call_click', { demo: 'clinic', from: 'mobile_bar' })}
        className="flex min-h-[56px] items-center justify-center text-[0.85rem] font-medium text-clinic-ink"
      >
        Call
      </a>
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clinic.mapQuery)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-[56px] items-center justify-center border-x border-clinic-line text-[0.85rem] font-medium text-clinic-ink"
      >
        Directions
      </a>
      <a href="#book" className="flex min-h-[56px] items-center justify-center bg-clinic-teal text-[0.85rem] font-semibold text-white">
        Book
      </a>
    </div>
  );
}
