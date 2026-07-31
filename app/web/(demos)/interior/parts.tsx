'use client';

import { useEffect, useState } from 'react';
import { mitti } from './data';
import { track } from '@/lib/analytics';

const NAV = [
  ['#work', 'Work'],
  ['#approach', 'Approach'],
  ['#materials', 'Materials'],
  ['#fees', 'Fees'],
  ['#studio', 'Studio'],
] as const;

export function MittiNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-mitti-char/10 bg-mitti-linen/94 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-[78rem] items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#top" className="flex min-h-11 items-center font-mitti-display text-[1.25rem] tracking-[0.14em] text-mitti-char uppercase">
          Studio Mitti
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {NAV.map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="text-[0.82rem] font-light tracking-[0.08em] text-mitti-stone transition-colors hover:text-mitti-clay"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="#enquire"
            className="hidden border-b border-mitti-char pb-0.5 text-[0.82rem] tracking-[0.08em] text-mitti-char transition-colors hover:border-mitti-clay hover:text-mitti-clay sm:inline-flex"
          >
            Enquire
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="-mr-2 flex h-11 w-11 items-center justify-center md:hidden"
            aria-label="Open menu"
          >
            <span aria-hidden className="relative block h-[9px] w-6">
              <span className="absolute inset-x-0 top-0 h-px bg-mitti-char" />
              <span className="absolute inset-x-0 bottom-0 h-px bg-mitti-char" />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-mitti-linen md:hidden">
          <div className="flex h-[72px] items-center justify-between px-5">
            <span className="font-mitti-display text-[1.25rem] tracking-[0.14em] text-mitti-char uppercase">
              Studio Mitti
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="-mr-2 flex h-11 w-11 items-center justify-center text-2xl text-mitti-char"
              aria-label="Close menu"
            >
              <span aria-hidden>×</span>
            </button>
          </div>
          <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center gap-1 px-5 pb-20">
            {[...NAV, ['#enquire', 'Enquire'] as const].map(([href, label]) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="border-b border-mitti-char/10 py-5 font-mitti-display text-[1.9rem] text-mitti-char"
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

/* --------------------------------------------------------- enquiry */

export function ProjectEnquiry() {
  const [f, setF] = useState({
    name: '',
    phone: '',
    email: '',
    type: 'Private residence',
    area: '',
    budget: '₹40 – 80 lakh',
    timing: 'In the next 3 months',
    note: '',
  });
  const [sent, setSent] = useState(false);
  const ready = f.name.trim().length > 1 && f.phone.trim().length >= 8;

  const field =
    'w-full min-h-[48px] border-b border-mitti-char/22 bg-transparent px-0 py-3 text-[0.98rem] font-light text-mitti-char placeholder:text-mitti-stone/60 focus:border-mitti-clay focus:outline-none';
  const label = 'mb-1 block text-[0.68rem] tracking-[0.18em] text-mitti-stone uppercase';
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF((p) => ({ ...p, [k]: e.target.value }));

  if (sent) {
    return (
      <div className="border-t border-mitti-char/20 pt-10">
        <p className="text-[0.68rem] tracking-[0.2em] text-mitti-clay uppercase">Thank you</p>
        <h3 className="mt-4 font-mitti-display text-[2rem] leading-tight text-mitti-char">
          We will write back within two working days.
        </h3>
        <p className="mt-4 max-w-md text-[0.98rem] leading-relaxed font-light text-mitti-stone">
          One of the partners reads every enquiry. If your project is not something we can do well, we will say so and
          suggest two practices who can.
        </p>
        <a
          href={`mailto:${mitti.email}`}
          className="mt-6 inline-block border-b border-mitti-char pb-1 text-[0.92rem] text-mitti-char"
        >
          {mitti.email}
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
          track('lead_submit', { demo: 'interior', form: 'project_enquiry' });
        }
      }}
    >
      <div className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="m-name">
            Your name
          </label>
          <input id="m-name" required className={field} value={f.name} onChange={set('name')} placeholder="Anjali Rao" />
        </div>
        <div>
          <label className={label} htmlFor="m-phone">
            Phone
          </label>
          <input id="m-phone" required type="tel" inputMode="tel" className={field} value={f.phone} onChange={set('phone')} placeholder="98450 00000" />
        </div>
        <div>
          <label className={label} htmlFor="m-email">
            Email
          </label>
          <input id="m-email" type="email" className={field} value={f.email} onChange={set('email')} placeholder="you@example.com" />
        </div>
        <div>
          <label className={label} htmlFor="m-type">
            Project type
          </label>
          <select id="m-type" className={field} value={f.type} onChange={set('type')}>
            {['Private residence', 'Apartment renovation', 'Weekend house', 'Workplace', 'Retail or hospitality'].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="m-area">
            Approximate area
          </label>
          <input id="m-area" className={field} value={f.area} onChange={set('area')} placeholder="2,000 sq ft" />
        </div>
        <div>
          <label className={label} htmlFor="m-budget">
            Budget
          </label>
          <select id="m-budget" className={field} value={f.budget} onChange={set('budget')}>
            {['Under ₹40 lakh', '₹40 – 80 lakh', '₹80 lakh – 1.5 Cr', 'Above ₹1.5 Cr', 'Not sure yet'].map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={label} htmlFor="m-timing">
            When would you want to start
          </label>
          <select id="m-timing" className={field} value={f.timing} onChange={set('timing')}>
            {['As soon as possible', 'In the next 3 months', 'In 6 months', 'Still planning'].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={label} htmlFor="m-note">
            Tell us about the space
          </label>
          <textarea
            id="m-note"
            rows={3}
            className={`${field} resize-y`}
            value={f.note}
            onChange={set('note')}
            placeholder="What is not working, who lives there, anything you want to keep…"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={!ready}
        className="mt-10 inline-flex min-h-[52px] items-center justify-center bg-mitti-char px-9 text-[0.85rem] tracking-[0.12em] text-mitti-linen uppercase transition-colors hover:bg-mitti-clay disabled:cursor-not-allowed disabled:bg-mitti-stone/40"
      >
        Send enquiry
      </button>
      <p className="mt-5 max-w-md text-[0.84rem] leading-relaxed font-light text-mitti-stone">
        We take on fourteen projects a year. If our next slot is six months away, we will tell you that in the first
        reply rather than the third meeting.
      </p>
    </form>
  );
}
