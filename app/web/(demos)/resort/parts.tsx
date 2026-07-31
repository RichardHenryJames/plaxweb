'use client';

import { useEffect, useMemo, useState } from 'react';
import { tamara, villas } from './data';
import { track } from '@/lib/analytics';

const NAV = [
  ['#villas', 'Villas'],
  ['#experiences', 'Experiences'],
  ['#dining', 'Dining'],
  ['#journey', 'Getting here'],
  ['#enquire', 'Check dates'],
] as const;

export function TamaraNav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 60);
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
        solid ? 'border-b border-tamara-shell/15 bg-tamara-deep/95 backdrop-blur-md' : ''
      }`}
    >
      <div className="mx-auto flex h-[76px] max-w-[80rem] items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#top" className="flex min-h-11 flex-col items-start justify-center leading-none">
          <span className="font-tamara-display text-[1.15rem] tracking-[0.3em] text-tamara-shell uppercase">Tamara</span>
          <span className="mt-1.5 text-[0.55rem] tracking-[0.36em] text-tamara-coral uppercase">Backwaters</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {NAV.slice(0, 4).map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="text-[0.78rem] tracking-[0.14em] text-tamara-shell/70 uppercase transition-colors hover:text-tamara-coral"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#enquire"
            className="hidden border border-tamara-coral px-6 py-2.5 text-[0.72rem] tracking-[0.18em] text-tamara-coral uppercase transition-colors hover:bg-tamara-coral hover:text-tamara-deep sm:inline-flex"
          >
            Check availability
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="-mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
            aria-label="Open menu"
          >
            <span aria-hidden className="relative block h-[9px] w-6">
              <span className="absolute inset-x-0 top-0 h-px bg-tamara-shell" />
              <span className="absolute inset-x-0 bottom-0 h-px bg-tamara-shell" />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-tamara-deep lg:hidden">
          <div className="flex h-[76px] items-center justify-between px-5">
            <span className="font-tamara-display text-[1.15rem] tracking-[0.3em] text-tamara-shell uppercase">Tamara</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="-mr-2 flex h-11 w-11 items-center justify-center text-2xl text-tamara-shell"
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
                className="border-b border-tamara-shell/12 py-5 font-tamara-display text-[1.7rem] text-tamara-shell"
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

/* ------------------------------------------------- availability bar */

export function AvailabilityBar({ variant = 'hero' }: { variant?: 'hero' | 'panel' }) {
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const [f, setF] = useState({ arrive: '', depart: '', adults: '2', children: '0', villa: villas[1].name, name: '', phone: '' });

  const nights = useMemo(() => {
    if (!f.arrive || !f.depart) return 0;
    const a = new Date(f.arrive).getTime();
    const d = new Date(f.depart).getTime();
    return d > a ? Math.round((d - a) / 86_400_000) : 0;
  }, [f.arrive, f.depart]);

  const villa = villas.find((v) => v.name === f.villa) ?? villas[0];
  const nightly = Number(villa.rate.replace(/[₹,]/g, ''));
  const estimate = nights * nightly;

  const ready = variant === 'hero' ? Boolean(f.arrive && f.depart && nights > 0) : f.name.trim().length > 1 && f.phone.trim().length >= 8;

  const msg = [
    'Hello Tamara Backwaters, I would like to check availability.',
    '',
    f.name ? `Name: ${f.name}` : '',
    f.phone ? `Phone: ${f.phone}` : '',
    `Villa: ${f.villa}`,
    `Arrive: ${f.arrive || '—'}`,
    `Depart: ${f.depart || '—'}`,
    nights ? `Nights: ${nights}` : '',
    `Guests: ${f.adults} adults, ${f.children} children`,
  ]
    .filter(Boolean)
    .join('\n');

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setF((p) => ({ ...p, [k]: e.target.value }));

  const field =
    'w-full min-h-[46px] border border-tamara-shell/20 bg-transparent px-3 py-2.5 text-[0.9rem] text-tamara-shell focus:border-tamara-coral focus:outline-none';
  const label = 'mb-1.5 block text-[0.62rem] tracking-[0.18em] text-tamara-shell/50 uppercase';

  if (variant === 'hero') {
    return (
      <form
        onSubmit={(e) => e.preventDefault()}
        className="mt-10 grid grid-cols-2 gap-3 border border-tamara-shell/20 bg-tamara-deep/60 p-4 backdrop-blur-md lg:grid-cols-[1fr_1fr_0.8fr_0.8fr_auto] lg:items-end"
      >
        <div>
          <label className={label} htmlFor="t-arrive">
            Arrive
          </label>
          <input id="t-arrive" type="date" min={today} className={field} value={f.arrive} onChange={set('arrive')} />
        </div>
        <div>
          <label className={label} htmlFor="t-depart">
            Depart
          </label>
          <input id="t-depart" type="date" min={f.arrive || today} className={field} value={f.depart} onChange={set('depart')} />
        </div>
        <div>
          <label className={label} htmlFor="t-adults">
            Adults
          </label>
          <select id="t-adults" className={field} value={f.adults} onChange={set('adults')}>
            {['1', '2', '3', '4', '5', '6'].map((n) => (
              <option key={n} className="bg-tamara-deep">
                {n}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="t-children">
            Children
          </label>
          <select id="t-children" className={field} value={f.children} onChange={set('children')}>
            {['0', '1', '2', '3'].map((n) => (
              <option key={n} className="bg-tamara-deep">
                {n}
              </option>
            ))}
          </select>
        </div>
        <a
          href={ready ? `https://wa.me/${tamara.whatsappRaw}?text=${encodeURIComponent(msg)}` : '#enquire'}
          target={ready ? '_blank' : undefined}
          rel="noopener noreferrer"
          onClick={() => ready && track('whatsapp_click', { demo: 'resort', from: 'hero_availability' })}
          className="col-span-2 inline-flex min-h-[46px] items-center justify-center bg-tamara-coral px-7 text-[0.72rem] tracking-[0.18em] text-tamara-deep uppercase transition-colors hover:bg-tamara-shell lg:col-span-1"
        >
          {nights > 0 ? `Check ${nights} ${nights === 1 ? 'night' : 'nights'}` : 'Check availability'}
        </a>
      </form>
    );
  }

  return (
    <form onSubmit={(e) => e.preventDefault()} className="border border-tamara-shell/15 p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="p-name">
            Name
          </label>
          <input id="p-name" className={field} value={f.name} onChange={set('name')} placeholder="Deepa Sharma" />
        </div>
        <div>
          <label className={label} htmlFor="p-phone">
            Phone / WhatsApp
          </label>
          <input id="p-phone" type="tel" inputMode="tel" className={field} value={f.phone} onChange={set('phone')} placeholder="94471 12200" />
        </div>
        <div>
          <label className={label} htmlFor="p-arrive">
            Arrive
          </label>
          <input id="p-arrive" type="date" min={today} className={field} value={f.arrive} onChange={set('arrive')} />
        </div>
        <div>
          <label className={label} htmlFor="p-depart">
            Depart
          </label>
          <input id="p-depart" type="date" min={f.arrive || today} className={field} value={f.depart} onChange={set('depart')} />
        </div>
        <div>
          <label className={label} htmlFor="p-villa">
            Villa
          </label>
          <select id="p-villa" className={field} value={f.villa} onChange={set('villa')}>
            {villas.map((v) => (
              <option key={v.name} className="bg-tamara-deep">
                {v.name}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={label} htmlFor="p-adults">
              Adults
            </label>
            <select id="p-adults" className={field} value={f.adults} onChange={set('adults')}>
              {['1', '2', '3', '4', '5', '6'].map((n) => (
                <option key={n} className="bg-tamara-deep">
                  {n}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={label} htmlFor="p-children">
              Children
            </label>
            <select id="p-children" className={field} value={f.children} onChange={set('children')}>
              {['0', '1', '2', '3'].map((n) => (
                <option key={n} className="bg-tamara-deep">
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {nights > 0 && (
        <div className="mt-6 flex flex-wrap items-baseline justify-between gap-3 border-t border-tamara-shell/15 pt-5">
          <p className="text-[0.85rem] text-tamara-shell/60">
            {nights} {nights === 1 ? 'night' : 'nights'} in a {villa.name}, breakfast included
          </p>
          <p className="font-tamara-display text-[1.5rem] text-tamara-coral">
            ≈ ₹{estimate.toLocaleString('en-IN')}
          </p>
        </div>
      )}

      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <a
          href={ready ? `https://wa.me/${tamara.whatsappRaw}?text=${encodeURIComponent(msg)}` : undefined}
          aria-disabled={!ready}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => ready && track('whatsapp_click', { demo: 'resort', from: 'enquiry_panel' })}
          className={`inline-flex min-h-[52px] flex-1 items-center justify-center px-8 text-[0.74rem] tracking-[0.18em] uppercase transition-colors ${
            ready
              ? 'bg-tamara-coral text-tamara-deep hover:bg-tamara-shell'
              : 'cursor-not-allowed border border-tamara-shell/15 text-tamara-shell/35'
          }`}
        >
          Send the enquiry
        </a>
        <a
          href={`tel:+${tamara.phoneRaw}`}
          onClick={() => track('call_click', { demo: 'resort', from: 'enquiry_panel' })}
          className="inline-flex min-h-[52px] items-center justify-center border border-tamara-shell/22 px-8 text-[0.74rem] tracking-[0.18em] uppercase transition-colors hover:border-tamara-shell"
        >
          Call the front desk
        </a>
      </div>

      <p className="mt-5 text-[0.8rem] leading-relaxed text-tamara-shell/45">
        Rates shown are indicative and exclude taxes. We confirm exact availability and the final tariff by reply,
        usually within an hour between 8am and 9pm IST.
      </p>
    </form>
  );
}

export function TamaraMobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] grid grid-cols-2 border-t border-tamara-shell/15 bg-tamara-deep/97 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden">
      <a
        href={`tel:+${tamara.phoneRaw}`}
        onClick={() => track('call_click', { demo: 'resort', from: 'mobile_bar' })}
        className="flex min-h-[56px] items-center justify-center text-[0.72rem] tracking-[0.18em] text-tamara-shell/85 uppercase"
      >
        Call
      </a>
      <a
        href="#enquire"
        className="flex min-h-[56px] items-center justify-center bg-tamara-coral text-[0.72rem] tracking-[0.18em] text-tamara-deep uppercase"
      >
        Check dates
      </a>
    </div>
  );
}
