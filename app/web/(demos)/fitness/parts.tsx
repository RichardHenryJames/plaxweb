'use client';

import { useEffect, useState } from 'react';
import { iron, timetable, type Slot } from './data';
import { track } from '@/lib/analytics';

const NAV = [
  ['#train', 'Train'],
  ['#timetable', 'Timetable'],
  ['#coaches', 'Coaches'],
  ['#membership', 'Membership'],
  ['#trial', 'Free trial'],
] as const;

export function IronNav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

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
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? 'border-b border-iron-steel bg-iron-black/96 backdrop-blur-md' : ''
      }`}
    >
      <div className="mx-auto flex h-[68px] max-w-[84rem] items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#top" className="flex min-h-11 items-center font-iron-display text-[1.35rem] leading-none tracking-[0.02em] text-white uppercase">
          Iron<span className="text-iron-volt">house</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {NAV.slice(0, 4).map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="text-[0.8rem] font-semibold tracking-[0.14em] text-white/65 uppercase transition-colors hover:text-iron-volt"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#trial"
            className="hidden bg-iron-volt px-5 py-2.5 text-[0.78rem] font-bold tracking-[0.12em] text-iron-black uppercase transition-colors hover:bg-white sm:inline-flex"
          >
            Free trial
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="-mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
            aria-label="Open menu"
          >
            <span aria-hidden className="relative block h-[11px] w-6">
              <span className="absolute inset-x-0 top-0 h-[2px] bg-white" />
              <span className="absolute inset-x-0 bottom-0 h-[2px] bg-white" />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-iron-black lg:hidden">
          <div className="flex h-[68px] items-center justify-between px-5">
            <span className="font-iron-display text-[1.35rem] text-white uppercase">
              Iron<span className="text-iron-volt">house</span>
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="-mr-2 flex h-11 w-11 items-center justify-center text-2xl text-white"
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
                className="border-b border-iron-steel py-5 font-iron-display text-[2.4rem] leading-none text-white uppercase"
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

/* ----------------------------------------------------------- timetable */

const TYPE_STYLE: Record<Slot['type'], string> = {
  Strength: 'border-iron-volt text-iron-volt',
  Conditioning: 'border-orange-400 text-orange-400',
  Hybrid: 'border-sky-400 text-sky-400',
  Open: 'border-iron-smoke text-iron-smoke',
};

export function Timetable() {
  const [day, setDay] = useState(0);

  return (
    <div className="mt-10">
      {/* Mobile: one day at a time. Desktop: the whole week. */}
      <div className="lg:hidden">
        <div className="scroll-x -mx-5 flex gap-2 px-5">
          {timetable.map((d, i) => (
            <button
              key={d.day}
              type="button"
              onClick={() => setDay(i)}
              aria-pressed={i === day}
              className={`min-h-[42px] shrink-0 border px-4 text-[0.78rem] font-semibold tracking-[0.1em] uppercase transition-colors ${
                i === day ? 'border-iron-volt bg-iron-volt text-iron-black' : 'border-iron-steel text-white/60'
              }`}
            >
              {d.day.slice(0, 3)}
            </button>
          ))}
        </div>

        <ul className="mt-6">
          {timetable[day].slots.map((s) => (
            <li key={s.time + s.name} className="flex items-center gap-4 border-b border-iron-steel py-4">
              <span className="w-[3.6rem] shrink-0 font-iron-display text-[1.25rem] text-white">{s.time}</span>
              <span className="min-w-0 flex-1">
                <span className="block text-[0.98rem] font-semibold text-white">{s.name}</span>
                <span className="block text-[0.82rem] text-iron-smoke">{s.coach}</span>
              </span>
              <span className={`shrink-0 border px-2 py-1 text-[0.62rem] font-semibold tracking-[0.1em] uppercase ${TYPE_STYLE[s.type]}`}>
                {s.type}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="hidden lg:grid lg:grid-cols-7 lg:gap-px lg:bg-iron-steel">
        {timetable.map((d) => (
          <div key={d.day} className="bg-iron-black p-4">
            <h3 className="font-iron-display text-[1.05rem] tracking-[0.06em] text-white uppercase">{d.day}</h3>
            <ul className="mt-4 space-y-3">
              {d.slots.map((s) => (
                <li key={s.time + s.name} className={`border-l-2 pl-3 ${TYPE_STYLE[s.type].split(' ')[0]}`}>
                  <p className="font-iron-display text-[1.05rem] text-white">{s.time}</p>
                  <p className="mt-0.5 text-[0.85rem] leading-snug font-semibold text-white/85">{s.name}</p>
                  <p className="text-[0.78rem] text-iron-smoke">{s.coach}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
        {(['Strength', 'Conditioning', 'Hybrid', 'Open'] as const).map((t) => (
          <span key={t} className="flex items-center gap-2 text-[0.78rem] text-iron-smoke">
            <span aria-hidden className={`h-3 w-[2px] ${TYPE_STYLE[t].split(' ')[0].replace('border-', 'bg-')}`} />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* --------------------------------------------------------- free trial */

export function TrialForm() {
  const [f, setF] = useState({ name: '', phone: '', goal: 'Get stronger', experience: 'Trained before, took a break', day: '' });
  const [sent, setSent] = useState(false);
  const ready = f.name.trim().length > 1 && f.phone.trim().length >= 8;

  const msg = [
    'Hi Ironhouse, I would like to book a free trial session.',
    '',
    `Name: ${f.name || '—'}`,
    `Phone: ${f.phone || '—'}`,
    `Goal: ${f.goal}`,
    `Experience: ${f.experience}`,
    `Preferred day: ${f.day || 'any'}`,
  ].join('\n');

  const field =
    'w-full min-h-[50px] border border-iron-steel bg-iron-coal px-4 py-3 text-[0.95rem] text-white placeholder:text-iron-smoke/70 focus:border-iron-volt focus:outline-none';
  const label = 'mb-2 block text-[0.7rem] font-semibold tracking-[0.16em] text-iron-smoke uppercase';
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setF((p) => ({ ...p, [k]: e.target.value }));

  if (sent) {
    return (
      <div className="border-2 border-iron-volt bg-iron-coal p-8 sm:p-10">
        <p className="text-[0.7rem] font-semibold tracking-[0.18em] text-iron-volt uppercase">Booked</p>
        <h3 className="mt-3 font-iron-display text-[2.2rem] leading-none text-white uppercase">See you on the floor</h3>
        <p className="mt-4 max-w-md text-[0.98rem] leading-relaxed text-white/70">
          A coach will call to lock the time. Bring shoes with a flat sole, a bottle, and nothing else. The first
          session is a movement screen — you will not be thrown into a class.
        </p>
        <a
          href={`https://wa.me/${iron.whatsappRaw}?text=${encodeURIComponent(msg)}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('whatsapp_click', { demo: 'fitness', from: 'trial_success' })}
          className="mt-6 inline-flex bg-iron-volt px-7 py-3.5 text-[0.8rem] font-bold tracking-[0.12em] text-iron-black uppercase"
        >
          Message us on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (ready) {
          setSent(true);
          track('lead_submit', { demo: 'fitness', form: 'free_trial' });
        }
      }}
      className="border border-iron-steel bg-iron-coal p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="i-name">
            Name
          </label>
          <input id="i-name" required className={field} value={f.name} onChange={set('name')} placeholder="Harish V." />
        </div>
        <div>
          <label className={label} htmlFor="i-phone">
            Mobile
          </label>
          <input id="i-phone" required type="tel" inputMode="tel" className={field} value={f.phone} onChange={set('phone')} placeholder="97018 82020" />
        </div>
        <div>
          <label className={label} htmlFor="i-goal">
            What are you here for
          </label>
          <select id="i-goal" className={field} value={f.goal} onChange={set('goal')}>
            {['Get stronger', 'Lose fat', 'Both', 'Come back after an injury', 'Train for an event'].map((g) => (
              <option key={g} className="bg-iron-coal">
                {g}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="i-exp">
            Training history
          </label>
          <select id="i-exp" className={field} value={f.experience} onChange={set('experience')}>
            {['Complete beginner', 'Trained before, took a break', 'Train regularly', 'Compete or have competed'].map((g) => (
              <option key={g} className="bg-iron-coal">
                {g}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={label} htmlFor="i-day">
            Which day suits you
          </label>
          <input id="i-day" type="date" className={field} value={f.day} onChange={set('day')} />
        </div>
      </div>

      <button
        type="submit"
        disabled={!ready}
        className="mt-7 inline-flex min-h-[56px] w-full items-center justify-center bg-iron-volt px-8 text-[0.85rem] font-bold tracking-[0.14em] text-iron-black uppercase transition-colors hover:bg-white disabled:cursor-not-allowed disabled:bg-iron-steel disabled:text-iron-smoke"
      >
        Book the free session
      </button>
      <p className="mt-4 text-[0.82rem] leading-relaxed text-iron-smoke">
        One free session, no card, no joining fee, and nobody will call you eleven times afterwards.
      </p>
    </form>
  );
}

export function IronMobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] grid grid-cols-2 border-t border-iron-steel bg-iron-black/97 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden">
      <a
        href={`tel:+${iron.phoneRaw}`}
        onClick={() => track('call_click', { demo: 'fitness', from: 'mobile_bar' })}
        className="flex min-h-[56px] items-center justify-center text-[0.78rem] font-semibold tracking-[0.12em] text-white/85 uppercase"
      >
        Call
      </a>
      <a
        href="#trial"
        className="flex min-h-[56px] items-center justify-center bg-iron-volt text-[0.78rem] font-bold tracking-[0.12em] text-iron-black uppercase"
      >
        Free trial
      </a>
    </div>
  );
}
