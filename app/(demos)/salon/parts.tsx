'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { salon, serviceGroups } from './data';
import { track } from '@/lib/analytics';

const NAV = [
  ['#services', 'Services'],
  ['#team', 'The team'],
  ['#membership', 'Memberships'],
  ['#book', 'Book'],
  ['#visit', 'Visit'],
] as const;

/* ------------------------------------------------------------------ nav */

export function SalonNav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
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
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid ? 'border-b border-salon-bone/12 bg-salon-deep/95 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-[74px] max-w-[80rem] items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex min-h-11 flex-col justify-center leading-none">
          <span className="font-salon-display text-[1.55rem] font-light tracking-[0.14em] text-salon-bone uppercase">
            Maison Aria
          </span>
          <span className="mt-1 font-salon-sans text-[0.55rem] font-light tracking-[0.4em] text-salon-brass uppercase">
            Indiranagar
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
          {NAV.slice(0, 3).map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="font-salon-sans text-[0.72rem] font-light tracking-[0.22em] text-salon-bone/75 uppercase transition-colors hover:text-salon-brass"
            >
              {label}
            </a>
          ))}
          <a
            href="#book"
            className="border border-salon-brass/60 px-6 py-2.5 font-salon-sans text-[0.7rem] tracking-[0.22em] text-salon-brass uppercase transition-colors hover:bg-salon-brass hover:text-salon-deep"
          >
            Book
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="-mr-2 flex h-11 w-11 items-center justify-center md:hidden"
          aria-label="Open menu"
        >
          <span aria-hidden className="relative block h-[9px] w-6">
            <span className="absolute inset-x-0 top-0 h-px bg-salon-bone" />
            <span className="absolute inset-x-0 bottom-0 h-px bg-salon-bone" />
          </span>
        </button>
      </div>

    </header>

      {/* A sibling of <header>, not a child. A header with a z-index or a
          backdrop-filter creates a stacking context its descendants cannot
          escape: the panel painted under the demo's own bottom bar, and
          where the header was blurred it collapsed to a 72px strip because
          inset-0 resolved against the header rather than the viewport. */}
      {open && (
        <div className="fixed inset-0 z-[80] flex flex-col bg-salon-deep md:hidden">
          <div className="flex h-[74px] items-center justify-between px-5">
            <span className="font-salon-display text-[1.5rem] font-light tracking-[0.14em] text-salon-bone uppercase">
              Maison Aria
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="-mr-2 flex h-11 w-11 items-center justify-center text-2xl text-salon-bone"
              aria-label="Close menu"
            >
              <span aria-hidden>×</span>
            </button>
          </div>
          <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center gap-2 px-5 pb-28">
            {NAV.map(([href, label]) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="border-b border-salon-bone/10 py-5 font-salon-display text-[2rem] font-light text-salon-bone"
              >
                {label}
              </a>
            ))}
            <a
              href={`tel:+${salon.phoneRaw}`}
              className="mt-8 font-salon-sans text-[0.75rem] tracking-[0.24em] text-salon-brass uppercase"
            >
              {salon.phoneDisplay}
            </a>
          </nav>
        </div>
      )}
    </>
  );
}

/* ------------------------------------------------------------- services */

export function ServiceMenu() {
  const [active, setActive] = useState(serviceGroups[0].id);
  const group = serviceGroups.find((g) => g.id === active) ?? serviceGroups[0];

  return (
    <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
      <div className="min-w-0 lg:order-2">
        <div
          role="tablist"
          aria-label="Service categories"
          className="scroll-x -mx-5 flex gap-7 border-b border-salon-bone/12 px-5 pb-3 sm:mx-0 sm:px-0"
        >
          {serviceGroups.map((g) => (
            <button
              key={g.id}
              role="tab"
              aria-selected={g.id === active}
              onClick={() => setActive(g.id)}
              className={`relative min-h-[44px] pb-2 font-salon-sans text-[0.72rem] tracking-[0.22em] whitespace-nowrap uppercase transition-colors ${
                g.id === active ? 'text-salon-brass' : 'text-salon-bone/50 hover:text-salon-bone'
              }`}
            >
              {g.label}
              <span
                aria-hidden
                className={`absolute -bottom-[13px] left-0 h-px w-full bg-salon-brass transition-transform duration-300 ${
                  g.id === active ? 'scale-x-100' : 'scale-x-0'
                }`}
              />
            </button>
          ))}
        </div>

        <p className="mt-7 max-w-lg font-salon-sans text-[0.92rem] leading-relaxed font-light text-salon-bone/60 italic">
          {group.note}
        </p>

        <ul className="mt-8">
          {group.items.map((item) => (
            <li
              key={item.name}
              className="grid grid-cols-[1fr_auto] gap-x-6 border-t border-salon-bone/10 py-5 last:border-b"
            >
              <div>
                <h3 className="font-salon-display text-[1.32rem] leading-snug font-normal text-salon-bone">
                  {item.name}
                </h3>
                <p className="mt-1 font-salon-sans text-[0.85rem] font-light text-salon-muted">{item.detail}</p>
              </div>
              <div className="text-right">
                <p className="font-salon-display text-[1.2rem] whitespace-nowrap text-salon-brass">{item.price}</p>
                <p className="mt-1 font-salon-sans text-[0.7rem] tracking-[0.14em] text-salon-muted uppercase">
                  {item.time}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative min-w-0 lg:order-1 lg:sticky lg:top-28 lg:self-start">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            key={group.image.src}
            src={group.image.src}
            alt={group.image.alt}
            fill
            sizes="(min-width:1024px) 45vw, 92vw"
            className="object-cover"
          />
        </div>
        <p className="mt-4 font-salon-sans text-[0.7rem] tracking-[0.2em] text-salon-muted uppercase">
          {group.label} — {group.items.length} services
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- booking */

const SLOTS = ['10:00', '11:30', '13:00', '14:30', '16:00', '17:30', '19:00'];
const STYLISTS = ['No preference', 'Aria Fernandes', 'Nandita Kulkarni', 'Rehan Qureshi', 'Divya Nair'];

export function BookingPanel() {
  const allServices = useMemo(
    () => serviceGroups.flatMap((g) => g.items.map((i) => `${g.label} — ${i.name} (${i.price})`)),
    []
  );

  const [form, setForm] = useState({
    name: '',
    phone: '',
    service: allServices[0],
    stylist: STYLISTS[0],
    date: '',
    slot: SLOTS[2],
    notes: '',
  });

  const message = [
    `Hello Maison Aria, I would like to book an appointment.`,
    ``,
    `Name: ${form.name || '—'}`,
    `Phone: ${form.phone || '—'}`,
    `Service: ${form.service}`,
    `Stylist: ${form.stylist}`,
    `Preferred: ${form.date || 'any day'} at ${form.slot}`,
    form.notes ? `Notes: ${form.notes}` : '',
  ]
    .filter(Boolean)
    .join('\n');

  const ready = form.name.trim().length > 1 && form.phone.trim().length >= 8;
  const href = `https://wa.me/${salon.whatsappRaw}?text=${encodeURIComponent(message)}`;

  const field =
    'w-full min-h-[48px] border border-salon-bone/18 bg-transparent px-4 py-3 font-salon-sans text-[0.92rem] font-light text-salon-bone placeholder:text-salon-muted/60 focus:border-salon-brass focus:outline-none';
  const label = 'mb-2 block font-salon-sans text-[0.66rem] tracking-[0.2em] text-salon-muted uppercase';

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="border border-salon-bone/12 p-6 sm:p-9"
      aria-labelledby="book-heading"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="aria-name">
            Your name
          </label>
          <input id="aria-name" className={field} value={form.name} onChange={set('name')} placeholder="Ananya Rao" />
        </div>
        <div>
          <label className={label} htmlFor="aria-phone">
            Mobile number
          </label>
          <input
            id="aria-phone"
            className={field}
            value={form.phone}
            onChange={set('phone')}
            type="tel"
            inputMode="tel"
            placeholder="98765 43210"
          />
        </div>
        <div className="sm:col-span-2">
          <label className={label} htmlFor="aria-service">
            Service
          </label>
          <select id="aria-service" className={field} value={form.service} onChange={set('service')}>
            {allServices.map((s) => (
              <option key={s} value={s} className="bg-salon-deep">
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="aria-stylist">
            Stylist
          </label>
          <select id="aria-stylist" className={field} value={form.stylist} onChange={set('stylist')}>
            {STYLISTS.map((s) => (
              <option key={s} value={s} className="bg-salon-deep">
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="aria-date">
            Preferred date
          </label>
          <input id="aria-date" className={field} value={form.date} onChange={set('date')} type="date" />
        </div>
        <div className="sm:col-span-2">
          <span className={label}>Preferred time</span>
          <div className="flex flex-wrap gap-2">
            {SLOTS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setForm((f) => ({ ...f, slot: s }))}
                aria-pressed={form.slot === s}
                className={`min-h-[42px] border px-4 font-salon-sans text-[0.85rem] font-light transition-colors ${
                  form.slot === s
                    ? 'border-salon-brass bg-salon-brass text-salon-deep'
                    : 'border-salon-bone/18 text-salon-bone/75 hover:border-salon-bone/50'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="sm:col-span-2">
          <label className={label} htmlFor="aria-notes">
            Anything we should know
          </label>
          <textarea
            id="aria-notes"
            className={`${field} resize-y`}
            rows={2}
            value={form.notes}
            onChange={set('notes')}
            placeholder="Allergies, a photo reference, an event date…"
          />
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <a
          href={ready ? href : undefined}
          aria-disabled={!ready}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => ready && track('whatsapp_click', { demo: 'salon', from: 'booking' })}
          className={`inline-flex min-h-[52px] items-center justify-center px-8 font-salon-sans text-[0.75rem] tracking-[0.22em] uppercase transition-colors ${
            ready
              ? 'bg-salon-brass text-salon-deep hover:bg-salon-bone'
              : 'cursor-not-allowed border border-salon-bone/15 text-salon-muted'
          }`}
        >
          Send request on WhatsApp
        </a>
        <a
          href={`tel:+${salon.phoneRaw}`}
          onClick={() => track('call_click', { demo: 'salon', from: 'booking' })}
          className="inline-flex min-h-[52px] items-center justify-center border border-salon-bone/20 px-8 font-salon-sans text-[0.75rem] tracking-[0.22em] text-salon-bone uppercase transition-colors hover:border-salon-bone"
        >
          Call the studio
        </a>
      </div>

      <p className="mt-5 font-salon-sans text-[0.78rem] leading-relaxed font-light text-salon-muted">
        {ready
          ? 'Your details will be filled into the message. We confirm within business hours.'
          : 'Add your name and number to enable the request.'}
      </p>
    </form>
  );
}

/* ------------------------------------------------------- mobile actions */

export function SalonMobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] grid grid-cols-3 border-t border-salon-bone/12 bg-salon-deep/97 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden">
      <a
        href={`tel:+${salon.phoneRaw}`}
        onClick={() => track('call_click', { demo: 'salon', from: 'mobile_bar' })}
        className="flex min-h-[56px] items-center justify-center font-salon-sans text-[0.68rem] tracking-[0.18em] text-salon-bone/80 uppercase"
      >
        Call
      </a>
      <a
        href={`https://wa.me/${salon.whatsappRaw}?text=${encodeURIComponent('Hello Maison Aria, I would like to book an appointment.')}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track('whatsapp_click', { demo: 'salon', from: 'mobile_bar' })}
        className="flex min-h-[56px] items-center justify-center border-x border-salon-bone/12 font-salon-sans text-[0.68rem] tracking-[0.18em] text-salon-bone/80 uppercase"
      >
        WhatsApp
      </a>
      <a
        href="#book"
        className="flex min-h-[56px] items-center justify-center bg-salon-brass font-salon-sans text-[0.68rem] tracking-[0.18em] text-salon-deep uppercase"
      >
        Book
      </a>
    </div>
  );
}
