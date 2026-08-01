'use client';

import Image from 'next/image';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { kesari, menu, type Dish } from './data';
import { track } from '@/lib/analytics';

/* -------------------------------------------------------- open status */

function istNow() {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  const dayIndex = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
  return { dayIndex, minutes: Number(get('hour')) * 60 + Number(get('minute')) };
}

function statusNow() {
  const { dayIndex, minutes } = istNow();
  const today = kesari.week[dayIndex] ?? kesari.week[0];
  const open = today.spans.some(([a, b]) => minutes >= a && minutes < b);
  if (open) {
    const span = today.spans.find(([a, b]) => minutes >= a && minutes < b)!;
    const h = Math.floor(span[1] / 60);
    const m = String(span[1] % 60).padStart(2, '0');
    return { open: true, text: `Open now · last orders ${h}:${m}` };
  }
  const next = today.spans.find(([a]) => minutes < a);
  if (next) {
    const h = Math.floor(next[0] / 60);
    const m = String(next[0] % 60).padStart(2, '0');
    return { open: false, text: `Closed · opens today at ${h}:${m}` };
  }
  const tomorrow = kesari.week[(dayIndex + 1) % 7];
  return {
    open: false,
    text: tomorrow.spans.length
      ? `Closed · opens ${tomorrow.day} at ${Math.floor(tomorrow.spans[0][0] / 60)}:00`
      : `Closed · we are shut on ${tomorrow.day}s`,
  };
}

/** Cached snapshot so useSyncExternalStore sees a stable reference. */
let cachedStatus: { open: boolean; text: string } = { open: false, text: '' };

function statusSnapshot() {
  const next = statusNow();
  if (next.open !== cachedStatus.open || next.text !== cachedStatus.text) cachedStatus = next;
  return cachedStatus;
}

function subscribeToClock(onChange: () => void) {
  const t = setInterval(onChange, 60_000);
  return () => clearInterval(t);
}

export function OpenStatus({ className = '' }: { className?: string }) {
  // Read on the client only, so the server render never disagrees about the clock.
  const state = useSyncExternalStore(subscribeToClock, statusSnapshot, () => null);

  if (!state) return <span className={className}>Kitchen hours 12:00–15:30 &amp; 19:00–23:00</span>;

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span
        aria-hidden
        className={`h-[7px] w-[7px] rounded-full ${state.open ? 'bg-green-400' : 'bg-kesari-chilli'}`}
      />
      {state.text}
    </span>
  );
}

/* ---------------------------------------------------------------- nav */

const NAV = [
  ['#menu', 'Menu'],
  ['#kitchen', 'The kitchen'],
  ['#reserve', 'Reserve'],
  ['#visit', 'Find us'],
] as const;

export function KesariNav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 30);
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
        solid ? 'border-b border-kesari-cream/12 bg-kesari-char/96 backdrop-blur-md' : ''
      }`}
    >
      <div className="mx-auto flex h-[70px] max-w-[82rem] items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#top" className="flex min-h-11 items-center font-kesari-display text-[1.4rem] leading-none font-semibold text-kesari-cream">
          Kesari<span className="text-kesari-turmeric">.</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {NAV.map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="font-kesari-sans text-[0.82rem] text-kesari-cream/75 transition-colors hover:text-kesari-turmeric"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#reserve"
            className="hidden rounded-full bg-kesari-chilli px-5 py-2.5 font-kesari-sans text-[0.82rem] font-medium text-kesari-cream transition-colors hover:bg-kesari-turmeric hover:text-kesari-char sm:inline-flex"
          >
            Reserve a table
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="-mr-2 flex h-11 w-11 items-center justify-center md:hidden"
            aria-label="Open menu"
          >
            <span aria-hidden className="relative block h-[9px] w-6">
              <span className="absolute inset-x-0 top-0 h-[1.5px] bg-kesari-cream" />
              <span className="absolute inset-x-0 bottom-0 h-[1.5px] bg-kesari-cream" />
            </span>
          </button>
        </div>
      </div>

    </header>

      {/* A sibling of <header>, not a child. A header with a z-index or a
          backdrop-filter creates a stacking context its descendants cannot
          escape: the panel painted under the demo's own bottom bar, and
          where the header was blurred it collapsed to a 72px strip because
          inset-0 resolved against the header rather than the viewport. */}
      {open && (
        <div className="fixed inset-0 z-[80] flex flex-col bg-kesari-char md:hidden">
          <div className="flex h-[70px] items-center justify-between px-5">
            <span className="font-kesari-display text-[1.4rem] font-semibold text-kesari-cream">
              Kesari<span className="text-kesari-turmeric">.</span>
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="-mr-2 flex h-11 w-11 items-center justify-center text-2xl text-kesari-cream"
              aria-label="Close menu"
            >
              <span aria-hidden>×</span>
            </button>
          </div>
          <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center gap-1 px-5 pb-28">
            {NAV.map(([href, label]) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="border-b border-kesari-cream/10 py-5 font-kesari-display text-[2.1rem] font-semibold text-kesari-cream"
              >
                {label}
              </a>
            ))}
            <OpenStatus className="mt-8 font-kesari-sans text-[0.85rem] text-kesari-muted" />
          </nav>
        </div>
      )}
    </>
  );
}

/* --------------------------------------------------------------- menu */

function Heat({ level }: { level?: 1 | 2 | 3 }) {
  if (!level) return null;
  return (
    <span className="ml-2 inline-flex align-middle" aria-label={`Spice level ${level} of 3`}>
      {[1, 2, 3].map((n) => (
        <span
          key={n}
          aria-hidden
          className={`ml-[2px] h-[6px] w-[6px] rounded-full ${n <= level ? 'bg-kesari-chilli' : 'bg-kesari-cream/18'}`}
        />
      ))}
    </span>
  );
}

function VegMark({ veg }: { veg: boolean }) {
  return (
    <span
      role="img"
      aria-label={veg ? 'Vegetarian' : 'Non-vegetarian'}
      className={`mt-[0.45em] inline-grid h-3 w-3 shrink-0 place-items-center border ${
        veg ? 'border-green-500' : 'border-kesari-chilli'
      }`}
    >
      <span aria-hidden className={`h-[5px] w-[5px] rounded-full ${veg ? 'bg-green-500' : 'bg-kesari-chilli'}`} />
    </span>
  );
}

function DishRow({ dish }: { dish: Dish }) {
  return (
    <li className="flex gap-3 border-b border-kesari-cream/10 py-4 last:border-b-0">
      <VegMark veg={dish.veg} />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-3">
          <h3 className="font-kesari-display text-[1.06rem] leading-snug font-semibold text-kesari-cream">
            {dish.name}
            <Heat level={dish.heat} />
          </h3>
          <span aria-hidden className="mb-1 h-px min-w-4 flex-1 bg-kesari-cream/12" />
          <span className="font-kesari-sans text-[0.95rem] whitespace-nowrap text-kesari-turmeric">{dish.price}</span>
        </div>
        <p className="mt-1 font-kesari-sans text-[0.86rem] leading-relaxed text-kesari-muted">
          {dish.desc}
          {dish.signature && <span className="ml-2 text-kesari-turmeric">· house signature</span>}
        </p>
      </div>
    </li>
  );
}

export function MenuBoard() {
  const [course, setCourse] = useState(menu[0].id);
  const [vegOnly, setVegOnly] = useState(false);
  const current = menu.find((c) => c.id === course) ?? menu[0];
  const dishes = vegOnly ? current.dishes.filter((d) => d.veg) : current.dishes;
  const mid = Math.ceil(dishes.length / 2);

  return (
    <div className="mt-10">
      <div className="flex flex-col gap-4 border-b border-kesari-cream/12 pb-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="scroll-x -mx-5 flex gap-7 px-5 lg:mx-0 lg:px-0">
          {menu.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCourse(c.id)}
              aria-pressed={c.id === course}
              className={`relative min-h-[44px] pb-2 font-kesari-sans text-[0.88rem] whitespace-nowrap transition-colors ${
                c.id === course ? 'text-kesari-turmeric' : 'text-kesari-cream/55 hover:text-kesari-cream'
              }`}
            >
              {c.label}
              <span
                aria-hidden
                className={`absolute -bottom-[17px] left-0 h-[2px] w-full origin-left bg-kesari-turmeric transition-transform duration-300 ${
                  c.id === course ? 'scale-x-100' : 'scale-x-0'
                }`}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setVegOnly((v) => !v)}
          aria-pressed={vegOnly}
          className={`inline-flex shrink-0 items-center gap-2 self-start rounded-full border px-4 py-2 font-kesari-sans text-[0.8rem] transition-colors ${
            vegOnly
              ? 'border-green-500 bg-green-500/12 text-green-400'
              : 'border-kesari-cream/20 text-kesari-cream/70 hover:border-kesari-cream/45'
          }`}
        >
          <span aria-hidden className="inline-grid h-3 w-3 place-items-center border border-current">
            <span className="h-[5px] w-[5px] rounded-full bg-current" />
          </span>
          Vegetarian only
        </button>
      </div>

      <p className="mt-6 max-w-2xl font-kesari-sans text-[0.92rem] leading-relaxed text-kesari-muted italic">
        {current.blurb}
      </p>

      <div className="mt-4 grid gap-x-14 lg:grid-cols-2">
        <ul>
          {dishes.slice(0, mid).map((d) => (
            <DishRow key={d.name} dish={d} />
          ))}
        </ul>
        <ul>
          {dishes.slice(mid).map((d) => (
            <DishRow key={d.name} dish={d} />
          ))}
        </ul>
      </div>

      {dishes.length === 0 && (
        <p className="py-10 text-center font-kesari-sans text-kesari-muted">
          Nothing vegetarian in this course — try “To begin” or “Curries &amp; mains”.
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------ reserve */

const PARTY = ['2', '3', '4', '5', '6', '7', '8+'];
const TIMES = ['12:30', '13:00', '13:30', '19:30', '20:00', '20:30', '21:00', '21:30'];

export function ReserveForm() {
  const [f, setF] = useState({ name: '', phone: '', date: '', time: '20:00', party: '4', note: '' });
  const ready = f.name.trim().length > 1 && f.phone.trim().length >= 8;

  const msg = [
    'Hello Kesari House, I would like to reserve a table.',
    '',
    `Name: ${f.name || '—'}`,
    `Phone: ${f.phone || '—'}`,
    `Guests: ${f.party}`,
    `Date: ${f.date || 'flexible'}`,
    `Time: ${f.time}`,
    f.note ? `Note: ${f.note}` : '',
  ]
    .filter(Boolean)
    .join('\n');

  const field =
    'w-full min-h-[48px] rounded-[2px] border border-kesari-cream/18 bg-kesari-soot px-4 py-3 font-kesari-sans text-[0.92rem] text-kesari-cream placeholder:text-kesari-muted/70 focus:border-kesari-turmeric focus:outline-none';
  const label = 'mb-2 block font-kesari-sans text-[0.72rem] tracking-[0.12em] text-kesari-muted uppercase';

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF((p) => ({ ...p, [k]: e.target.value }));

  return (
    <form onSubmit={(e) => e.preventDefault()} className="rounded-[3px] border border-kesari-cream/12 p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="k-name">
            Name
          </label>
          <input id="k-name" className={field} value={f.name} onChange={set('name')} placeholder="Rohit Menon" />
        </div>
        <div>
          <label className={label} htmlFor="k-phone">
            Mobile
          </label>
          <input id="k-phone" className={field} type="tel" inputMode="tel" value={f.phone} onChange={set('phone')} placeholder="98765 43210" />
        </div>
        <div>
          <label className={label} htmlFor="k-date">
            Date
          </label>
          <input id="k-date" className={field} type="date" value={f.date} onChange={set('date')} />
        </div>
        <div>
          <label className={label} htmlFor="k-party">
            Guests
          </label>
          <select id="k-party" className={field} value={f.party} onChange={set('party')}>
            {PARTY.map((p) => (
              <option key={p} value={p} className="bg-kesari-soot">
                {p} {p === '8+' ? 'guests — we will call you' : 'guests'}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <span className={label}>Time</span>
          <div className="flex flex-wrap gap-2">
            {TIMES.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setF((p) => ({ ...p, time: t }))}
                aria-pressed={f.time === t}
                className={`min-h-[42px] rounded-[2px] border px-4 font-kesari-sans text-[0.85rem] transition-colors ${
                  f.time === t
                    ? 'border-kesari-turmeric bg-kesari-turmeric text-kesari-char'
                    : 'border-kesari-cream/18 text-kesari-cream/75 hover:border-kesari-cream/45'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <p className="mt-2 font-kesari-sans text-[0.78rem] text-kesari-muted">
            Lunch 12:00–15:30 · Dinner 19:00–23:00. Tables are held for 15 minutes.
          </p>
        </div>
        <div className="sm:col-span-2">
          <label className={label} htmlFor="k-note">
            Anything we should know
          </label>
          <textarea
            id="k-note"
            rows={2}
            className={`${field} resize-y`}
            value={f.note}
            onChange={set('note')}
            placeholder="Birthday, high chair, allergy, jain preparation…"
          />
        </div>
      </div>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <a
          href={ready ? `https://wa.me/${kesari.whatsappRaw}?text=${encodeURIComponent(msg)}` : undefined}
          aria-disabled={!ready}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => ready && track('whatsapp_click', { demo: 'restaurant', from: 'reserve' })}
          className={`inline-flex min-h-[52px] flex-1 items-center justify-center rounded-full px-8 font-kesari-sans text-[0.92rem] font-medium transition-colors ${
            ready
              ? 'bg-kesari-chilli text-kesari-cream hover:bg-kesari-turmeric hover:text-kesari-char'
              : 'cursor-not-allowed border border-kesari-cream/15 text-kesari-muted'
          }`}
        >
          Request this table
        </a>
        <a
          href={`tel:+${kesari.phoneRaw}`}
          onClick={() => track('call_click', { demo: 'restaurant', from: 'reserve' })}
          className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-kesari-cream/20 px-8 font-kesari-sans text-[0.92rem] transition-colors hover:border-kesari-cream"
        >
          Call {kesari.phoneDisplay}
        </a>
      </div>
    </form>
  );
}

/* ------------------------------------------------------- mobile bar */

export function KesariMobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] grid grid-cols-3 border-t border-kesari-cream/12 bg-kesari-char/97 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden">
      <a
        href={`tel:+${kesari.phoneRaw}`}
        onClick={() => track('call_click', { demo: 'restaurant', from: 'mobile_bar' })}
        className="flex min-h-[56px] items-center justify-center font-kesari-sans text-[0.82rem] text-kesari-cream/80"
      >
        Call
      </a>
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(kesari.mapQuery)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-[56px] items-center justify-center border-x border-kesari-cream/12 font-kesari-sans text-[0.82rem] text-kesari-cream/80"
      >
        Directions
      </a>
      <a
        href="#reserve"
        className="flex min-h-[56px] items-center justify-center bg-kesari-chilli font-kesari-sans text-[0.82rem] font-medium text-kesari-cream"
      >
        Reserve
      </a>
    </div>
  );
}

/* ------------------------------------------------------------ gallery */

export function DishStrip({ photos }: { photos: { src: string; alt: string }[] }) {
  return (
    <div className="scroll-x flex gap-3 px-5 pb-4 sm:px-8">
      {photos.map((p) => (
        <figure key={p.src} className="w-[68vw] shrink-0 sm:w-[38vw] lg:w-[23vw]">
          <div className="relative aspect-square overflow-hidden rounded-[3px]">
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes="(min-width:1024px) 23vw, (min-width:640px) 38vw, 68vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          <figcaption className="mt-2.5 font-kesari-sans text-[0.8rem] text-kesari-muted">{p.alt}</figcaption>
        </figure>
      ))}
    </div>
  );
}
