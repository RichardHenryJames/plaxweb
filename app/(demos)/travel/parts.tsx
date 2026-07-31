'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { trips, wayfare, type Trip } from './data';
import { track } from '@/lib/analytics';

const NAV = [
  ['#trips', 'Trips'],
  ['#itinerary', 'Sample itinerary'],
  ['#why', 'Why us'],
  ['#enquire', 'Plan a trip'],
] as const;

export function WayfareNav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 50);
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
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid ? 'border-b border-way-sand/15 bg-way-deep/95 backdrop-blur-md' : ''
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-[82rem] items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#top" className="flex min-h-11 items-center font-way-display text-[1.5rem] leading-none text-way-sand">
          Wayfare <span className="text-way-sun italic">Journeys</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {NAV.slice(0, 3).map(([href, label]) => (
            <a key={href} href={href} className="text-[0.86rem] text-way-sand/75 transition-colors hover:text-way-sun">
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#enquire"
            className="hidden rounded-full bg-way-sun px-5 py-2.5 text-[0.85rem] font-medium text-way-deep transition-colors hover:bg-way-sand sm:inline-flex"
          >
            Plan a trip
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="-mr-2 flex h-11 w-11 items-center justify-center md:hidden"
            aria-label="Open menu"
          >
            <span aria-hidden className="relative block h-[10px] w-6">
              <span className="absolute inset-x-0 top-0 h-[1.5px] bg-way-sand" />
              <span className="absolute inset-x-0 bottom-0 h-[1.5px] bg-way-sand" />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-way-deep md:hidden">
          <div className="flex h-[72px] items-center justify-between px-5">
            <span className="font-way-display text-[1.5rem] text-way-sand">Wayfare</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="-mr-2 flex h-11 w-11 items-center justify-center text-2xl text-way-sand"
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
                className="border-b border-way-sand/12 py-5 font-way-display text-[2.1rem] text-way-sand"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

/* --------------------------------------------------------- trip grid */

const REGIONS = ['All', 'Himalaya', 'South', 'Rajasthan', 'Coast'] as const;
const LENGTHS = ['Any length', 'Up to 6 days', '7–9 days', '10 days or more'] as const;

export function TripFinder() {
  const [region, setRegion] = useState<(typeof REGIONS)[number]>('All');
  const [length, setLength] = useState<(typeof LENGTHS)[number]>('Any length');

  const list = useMemo(
    () =>
      trips.filter((t) => {
        if (region !== 'All' && t.region !== region) return false;
        if (length === 'Up to 6 days' && t.days > 6) return false;
        if (length === '7–9 days' && (t.days < 7 || t.days > 9)) return false;
        if (length === '10 days or more' && t.days < 10) return false;
        return true;
      }),
    [region, length]
  );

  return (
    <>
      <div className="mt-10 flex flex-col gap-5 border-y border-way-sand/15 py-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3 overflow-x-auto [scrollbar-width:none]">
          <span className="shrink-0 text-[0.68rem] tracking-[0.16em] text-way-sand/45 uppercase">Region</span>
          <div className="flex gap-2">
            {REGIONS.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRegion(r)}
                aria-pressed={region === r}
                className={`min-h-[38px] shrink-0 rounded-full border px-4 text-[0.84rem] transition-colors ${
                  region === r
                    ? 'border-way-sun bg-way-sun text-way-deep'
                    : 'border-way-sand/20 text-way-sand/70 hover:border-way-sand/45'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label htmlFor="w-length" className="shrink-0 text-[0.68rem] tracking-[0.16em] text-way-sand/45 uppercase">
            Length
          </label>
          <select
            id="w-length"
            value={length}
            onChange={(e) => setLength(e.target.value as (typeof LENGTHS)[number])}
            className="min-h-[38px] rounded-full border border-way-sand/20 bg-transparent px-4 text-[0.84rem] text-way-sand focus:border-way-sun focus:outline-none"
          >
            {LENGTHS.map((l) => (
              <option key={l} className="bg-way-deep">
                {l}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="mt-4 text-[0.82rem] text-way-sand/45">
        {list.length} {list.length === 1 ? 'trip' : 'trips'} · all with fixed departures and a private option
      </p>

      <div className="mt-8 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        {list.map((t, i) => (
          <article key={t.slug} data-reveal style={{ ['--reveal-delay' as string]: `${(i % 3) * 70}ms` }}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[4px]">
              <Image
                src={t.cover.src}
                alt={t.cover.alt}
                fill
                sizes="(min-width:1024px) 30vw, (min-width:768px) 46vw, 92vw"
                className="object-cover transition-transform duration-[900ms] hover:scale-[1.05]"
              />
              <span className="absolute top-3 left-3 rounded-full bg-way-deep/85 px-3 py-1 text-[0.7rem] text-way-sand backdrop-blur-sm">
                {t.days} days · {t.pace}
              </span>
            </div>
            <h3 className="mt-5 font-way-display text-[1.6rem] leading-tight text-way-sand">{t.name}</h3>
            <p className="mt-1 text-[0.78rem] tracking-[0.1em] text-way-sun uppercase">
              {t.region} · best {t.best}
            </p>
            <p className="mt-3 text-[0.92rem] leading-relaxed text-way-sand/65">{t.summary}</p>
            <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-way-sand/15 pt-3">
              <span className="text-[0.85rem] text-way-sand/55">
                from <span className="font-medium text-way-sand">{t.from}</span> per person
              </span>
              <a href="#enquire" className="inline-flex min-h-[30px] items-center text-[0.85rem] text-way-sun underline underline-offset-4">
                Enquire
              </a>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

/* ------------------------------------------------------- itinerary */

export function ItineraryExplorer() {
  const [slug, setSlug] = useState(trips[0].slug);
  const trip: Trip = trips.find((t) => t.slug === slug) ?? trips[0];
  const [openDay, setOpenDay] = useState(0);

  return (
    <div className="mt-10">
      <div className="scroll-x -mx-5 flex gap-2 px-5 sm:mx-0 sm:px-0">
        {trips.slice(0, 5).map((t) => (
          <button
            key={t.slug}
            type="button"
            onClick={() => {
              setSlug(t.slug);
              setOpenDay(0);
            }}
            aria-pressed={t.slug === slug}
            className={`min-h-[40px] shrink-0 rounded-full border px-4 text-[0.84rem] transition-colors ${
              t.slug === slug
                ? 'border-way-sun bg-way-sun text-way-deep'
                : 'border-way-sand/20 text-way-sand/70 hover:border-way-sand/45'
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>

      <div className="mt-9 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <div className="min-w-0">
          <h3 className="font-way-display text-[2rem] leading-tight text-way-sand">{trip.name}</h3>
          <p className="mt-2 text-[0.85rem] text-way-sand/55">
            {trip.days} days · {trip.pace} pace · from {trip.from} per person
          </p>

          <ol className="mt-7">
            {trip.itinerary.map((d, i) => {
              const isOpen = openDay === i;
              return (
                <li key={d.day} className="border-t border-way-sand/15 last:border-b">
                  <button
                    type="button"
                    onClick={() => setOpenDay(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-start gap-4 py-4 text-left"
                  >
                    <span className="w-[4.5rem] shrink-0 pt-0.5 text-[0.76rem] tracking-[0.1em] text-way-sun uppercase">
                      {d.day}
                    </span>
                    <span className="min-w-0 flex-1 font-way-display text-[1.28rem] leading-snug text-way-sand">
                      {d.title}
                    </span>
                    <span
                      aria-hidden
                      className={`mt-1.5 shrink-0 text-way-sand/45 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    >
                      ▾
                    </span>
                  </button>
                  {isOpen && (
                    <p className="pb-5 pl-[5.5rem] text-[0.93rem] leading-relaxed text-way-sand/65">{d.body}</p>
                  )}
                </li>
              );
            })}
          </ol>
        </div>

        <div className="min-w-0 space-y-8">
          <div className="rounded-[4px] border border-way-sand/15 p-6">
            <h4 className="text-[0.7rem] tracking-[0.18em] text-way-sun uppercase">What is included</h4>
            <ul className="mt-4 space-y-2.5 text-[0.9rem] text-way-sand/75">
              {trip.includes.map((i) => (
                <li key={i} className="flex gap-3">
                  <span aria-hidden className="mt-[0.6em] h-px w-3 shrink-0 bg-way-sun" />
                  {i}
                </li>
              ))}
            </ul>
            <h4 className="mt-6 text-[0.7rem] tracking-[0.18em] text-way-sand/45 uppercase">Not included</h4>
            <ul className="mt-3 space-y-2 text-[0.88rem] text-way-sand/50">
              {trip.excludes.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[0.7rem] tracking-[0.18em] text-way-sun uppercase">Fixed departures</h4>
            <table className="mt-4 w-full border-collapse text-left">
              <caption className="sr-only">Departure dates and availability</caption>
              <tbody>
                {trip.departures.map((d) => (
                  <tr key={d.date} className="border-b border-way-sand/12">
                    <th scope="row" className="py-3 pr-4 text-[0.92rem] font-normal text-way-sand">
                      {d.date}
                    </th>
                    <td
                      className={`py-3 pr-4 text-[0.84rem] ${
                        d.seats === 'Sold out' || d.seats === 'Waitlist' ? 'text-way-sun' : 'text-way-sand/55'
                      }`}
                    >
                      {d.seats}
                    </td>
                    <td className="py-3 text-right text-[0.9rem] font-medium text-way-sand">{d.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <a
              href="#enquire"
              className="mt-6 inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-way-sun px-7 text-[0.9rem] font-medium text-way-deep transition-colors hover:bg-way-sand"
            >
              Enquire about {trip.name}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------- enquiry */

export function TripEnquiry() {
  const [f, setF] = useState({
    name: '',
    phone: '',
    trip: trips[0].name,
    month: '',
    adults: '2',
    children: '0',
    budget: '₹50,000 – ₹1,00,000 per person',
    note: '',
  });
  const ready = f.name.trim().length > 1 && f.phone.trim().length >= 8;

  const msg = [
    'Hello Wayfare, I would like to plan a trip.',
    '',
    `Name: ${f.name || '—'}`,
    `Phone: ${f.phone || '—'}`,
    `Trip: ${f.trip}`,
    `When: ${f.month || 'flexible'}`,
    `Travellers: ${f.adults} adults, ${f.children} children`,
    `Budget: ${f.budget}`,
    f.note ? `Note: ${f.note}` : '',
  ]
    .filter(Boolean)
    .join('\n');

  const field =
    'w-full min-h-[48px] rounded-[3px] border border-way-sand/20 bg-way-deep px-4 py-3 text-[0.94rem] text-way-sand placeholder:text-way-sand/35 focus:border-way-sun focus:outline-none';
  const label = 'mb-2 block text-[0.68rem] tracking-[0.16em] text-way-sand/50 uppercase';
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF((p) => ({ ...p, [k]: e.target.value }));

  return (
    <form onSubmit={(e) => e.preventDefault()} className="rounded-[4px] border border-way-sand/15 p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="w-name">
            Name
          </label>
          <input id="w-name" className={field} value={f.name} onChange={set('name')} placeholder="Farah Qureshi" />
        </div>
        <div>
          <label className={label} htmlFor="w-phone">
            Phone / WhatsApp
          </label>
          <input id="w-phone" type="tel" inputMode="tel" className={field} value={f.phone} onChange={set('phone')} placeholder="98220 04466" />
        </div>
        <div className="sm:col-span-2">
          <label className={label} htmlFor="w-trip">
            Which trip
          </label>
          <select id="w-trip" className={field} value={f.trip} onChange={set('trip')}>
            {trips.map((t) => (
              <option key={t.slug} className="bg-way-deep">
                {t.name}
              </option>
            ))}
            <option className="bg-way-deep">Something custom — let’s design it</option>
          </select>
        </div>
        <div>
          <label className={label} htmlFor="w-month">
            When
          </label>
          <input id="w-month" type="month" className={field} value={f.month} onChange={set('month')} />
        </div>
        <div>
          <label className={label} htmlFor="w-budget">
            Budget per person
          </label>
          <select id="w-budget" className={field} value={f.budget} onChange={set('budget')}>
            {['Under ₹50,000', '₹50,000 – ₹1,00,000 per person', '₹1,00,000 – ₹2,00,000 per person', 'Above ₹2,00,000'].map((b) => (
              <option key={b} className="bg-way-deep">
                {b}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="w-adults">
            Adults
          </label>
          <select id="w-adults" className={field} value={f.adults} onChange={set('adults')}>
            {['1', '2', '3', '4', '5', '6', '7+'].map((n) => (
              <option key={n} className="bg-way-deep">
                {n}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="w-children">
            Children under 12
          </label>
          <select id="w-children" className={field} value={f.children} onChange={set('children')}>
            {['0', '1', '2', '3', '4+'].map((n) => (
              <option key={n} className="bg-way-deep">
                {n}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={label} htmlFor="w-note">
            Anything that would change the plan
          </label>
          <textarea
            id="w-note"
            rows={3}
            className={`${field} resize-y`}
            value={f.note}
            onChange={set('note')}
            placeholder="Elderly parents, a vegetarian group, someone who cannot do altitude, an anniversary…"
          />
        </div>
      </div>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <a
          href={ready ? `https://wa.me/${wayfare.whatsappRaw}?text=${encodeURIComponent(msg)}` : undefined}
          aria-disabled={!ready}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => ready && track('whatsapp_click', { demo: 'travel', from: 'enquiry' })}
          className={`inline-flex min-h-[52px] flex-1 items-center justify-center rounded-full px-8 text-[0.92rem] font-medium transition-colors ${
            ready ? 'bg-way-sun text-way-deep hover:bg-way-sand' : 'cursor-not-allowed border border-way-sand/15 text-way-sand/35'
          }`}
        >
          Send the enquiry
        </a>
        <a
          href={`tel:+${wayfare.phoneRaw}`}
          onClick={() => track('call_click', { demo: 'travel', from: 'enquiry' })}
          className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-way-sand/22 px-8 text-[0.92rem] transition-colors hover:border-way-sand"
        >
          {wayfare.phoneDisplay}
        </a>
      </div>

      <p className="mt-5 text-[0.8rem] leading-relaxed text-way-sand/45">
        You will get a reply from the person who wrote the itinerary, not a call centre. No deposit is taken until the
        plan is agreed in writing.
      </p>
    </form>
  );
}

export function WayfareMobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] grid grid-cols-2 border-t border-way-sand/15 bg-way-deep/97 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden">
      <a
        href={`tel:+${wayfare.phoneRaw}`}
        onClick={() => track('call_click', { demo: 'travel', from: 'mobile_bar' })}
        className="flex min-h-[56px] items-center justify-center text-[0.85rem] text-way-sand/85"
      >
        Call us
      </a>
      <a href="#enquire" className="flex min-h-[56px] items-center justify-center bg-way-sun text-[0.85rem] font-medium text-way-deep">
        Plan a trip
      </a>
    </div>
  );
}
