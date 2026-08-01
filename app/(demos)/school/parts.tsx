'use client';

import { useEffect, useState } from 'react';
import { notices, school } from './data';
import { track } from '@/lib/analytics';

const NAV = [
  ['#admissions', 'Admissions'],
  ['#academics', 'Academics'],
  ['#results', 'Results'],
  ['#campus', 'Campus'],
  ['#enquiry', 'Enquire'],
] as const;

export function NoticeTicker() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % notices.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="bg-school-deep text-school-paper">
      <div className="mx-auto flex max-w-[82rem] items-center gap-4 px-5 py-2 sm:px-8">
        <span className="shrink-0 rounded-sm bg-school-gold px-2 py-0.5 text-[0.62rem] font-semibold tracking-[0.14em] text-school-deep uppercase">
          Notice
        </span>
        <p key={i} aria-live="polite" className="truncate text-[0.82rem] text-school-paper/85">
          {notices[i]}
        </p>
      </div>
    </div>
  );
}

export function SchoolNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-school-line bg-school-paper/97 backdrop-blur-md">
      <div className="mx-auto flex h-[74px] max-w-[82rem] items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#top" className="flex min-h-11 items-center gap-3">
          <span
            aria-hidden
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-school-navy font-school-display text-[1.05rem] font-bold text-school-navy"
          >
            R
          </span>
          <span className="leading-tight">
            <span className="block font-school-display text-[1.02rem] font-bold text-school-navy sm:text-[1.15rem]">
              Rosewood International
            </span>
            <span className="block text-[0.6rem] tracking-[0.18em] text-school-navy/55 uppercase">
              Nashik · Est. {school.established}
            </span>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {NAV.slice(0, 4).map(([href, label]) => (
            <a key={href} href={href} className="text-[0.88rem] text-school-navy/75 transition-colors hover:text-school-crimson">
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#enquiry"
            className="hidden rounded-sm bg-school-crimson px-5 py-2.5 text-[0.85rem] font-semibold text-white transition-colors hover:bg-school-navy sm:inline-flex"
          >
            Admission enquiry
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="-mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
            aria-label="Open menu"
          >
            <span aria-hidden className="relative block h-[10px] w-6">
              <span className="absolute inset-x-0 top-0 h-[2px] bg-school-navy" />
              <span className="absolute inset-x-0 bottom-0 h-[2px] bg-school-navy" />
            </span>
          </button>
        </div>
      </div>
      </header>

      {/* A sibling of <header>, not a child. The header carries a
          backdrop-filter, which makes it the containing block for any
          position:fixed descendant — inset-0 then resolved against the 74px
          header instead of the viewport, so the panel painted a 74px strip and
          its links spilled transparently over the hero. */}
      {open && (
        <div className="fixed inset-0 z-[80] flex flex-col bg-school-paper lg:hidden">
          <div className="flex h-[74px] items-center justify-between border-b border-school-line px-5">
            <span className="font-school-display text-[1.1rem] font-bold text-school-navy">Rosewood International</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="-mr-2 flex h-11 w-11 items-center justify-center text-2xl text-school-navy"
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
                className="border-b border-school-line py-4 font-school-display text-[1.5rem] font-semibold text-school-navy"
              >
                {label}
              </a>
            ))}
            <a
              href={`tel:+${school.admissionsRaw}`}
              className="mt-6 rounded-sm bg-school-crimson py-4 text-center font-semibold text-white"
            >
              Call admissions
            </a>
          </nav>
        </div>
      )}
    </>
  );
}

/* -------------------------------------------------------- enquiry */

const GRADES = [
  'Nursery',
  'Junior KG',
  'Senior KG',
  'Class I',
  'Class II',
  'Class III',
  'Class IV',
  'Class V',
  'Class VI',
  'Class VII',
  'Class VIII',
  'Class IX',
  'Class XI — Science',
  'Class XI — Commerce',
  'Class XI — Humanities',
];

export function AdmissionEnquiry() {
  const [f, setF] = useState({
    parent: '',
    child: '',
    grade: 'Class I',
    phone: '',
    email: '',
    locality: '',
    transport: 'Yes',
    message: '',
  });
  const [sent, setSent] = useState('');
  const ready = f.parent.trim().length > 1 && f.phone.trim().length >= 8;

  const field =
    'w-full min-h-[48px] rounded-sm border border-school-line bg-white px-4 py-3 text-[0.95rem] text-school-navy placeholder:text-school-navy/35 focus:border-school-navy focus:outline-none';
  const label = 'mb-1.5 block text-[0.8rem] font-medium text-school-navy';

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF((p) => ({ ...p, [k]: e.target.value }));

  if (sent) {
    return (
      <div className="rounded-sm border-2 border-school-navy bg-white p-8 sm:p-10">
        <p className="text-[0.72rem] font-semibold tracking-[0.16em] text-school-crimson uppercase">Enquiry received</p>
        <h3 className="mt-3 font-school-display text-[1.8rem] leading-tight font-bold text-school-navy">
          Reference no. {sent}
        </h3>
        <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-school-navy/70">
          The admissions desk will call you within two working days with a campus-visit slot and email the prospectus
          and fee structure. Keep the reference number for your records.
        </p>
        <a
          href={`tel:+${school.admissionsRaw}`}
          className="mt-6 inline-flex rounded-sm bg-school-navy px-6 py-3 text-[0.9rem] font-semibold text-white"
        >
          Call admissions instead — {school.admissionsDisplay}
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (ready) {
          setSent(`RIS/26/${Math.floor(Math.random() * 9000) + 1000}`);
          track('lead_submit', { demo: 'school', form: 'admission_enquiry' });
        }
      }}
      className="rounded-sm border border-school-line bg-white p-6 sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="s-parent">
            Parent / guardian name
          </label>
          <input id="s-parent" required className={field} value={f.parent} onChange={set('parent')} placeholder="Rajesh Pawar" />
        </div>
        <div>
          <label className={label} htmlFor="s-child">
            Child’s name
          </label>
          <input id="s-child" className={field} value={f.child} onChange={set('child')} placeholder="Aarav Pawar" />
        </div>
        <div>
          <label className={label} htmlFor="s-grade">
            Applying for
          </label>
          <select id="s-grade" className={field} value={f.grade} onChange={set('grade')}>
            {GRADES.map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="s-phone">
            Mobile number
          </label>
          <input id="s-phone" required type="tel" inputMode="tel" className={field} value={f.phone} onChange={set('phone')} placeholder="90280 12345" />
        </div>
        <div>
          <label className={label} htmlFor="s-email">
            Email
          </label>
          <input id="s-email" type="email" className={field} value={f.email} onChange={set('email')} placeholder="you@example.com" />
        </div>
        <div>
          <label className={label} htmlFor="s-locality">
            Your locality
          </label>
          <input id="s-locality" className={field} value={f.locality} onChange={set('locality')} placeholder="College Road, Nashik" />
        </div>
        <div className="sm:col-span-2">
          <span className={label}>Do you need school transport?</span>
          <div className="flex gap-2">
            {['Yes', 'No', 'Not sure yet'].map((o) => (
              <button
                key={o}
                type="button"
                onClick={() => setF((p) => ({ ...p, transport: o }))}
                aria-pressed={f.transport === o}
                className={`min-h-[42px] rounded-sm border px-5 text-[0.88rem] transition-colors ${
                  f.transport === o
                    ? 'border-school-navy bg-school-navy text-white'
                    : 'border-school-line text-school-navy/70 hover:border-school-navy/60'
                }`}
              >
                {o}
              </button>
            ))}
          </div>
        </div>
        <div className="sm:col-span-2">
          <label className={label} htmlFor="s-msg">
            Questions for the admissions desk <span className="font-normal text-school-navy/50">(optional)</span>
          </label>
          <textarea
            id="s-msg"
            rows={3}
            className={`${field} resize-y`}
            value={f.message}
            onChange={set('message')}
            placeholder="Mid-session transfer, learning support, sibling already studying here…"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={!ready}
        className="mt-7 inline-flex min-h-[52px] w-full items-center justify-center rounded-sm bg-school-crimson px-8 text-[0.95rem] font-semibold text-white transition-colors hover:bg-school-navy disabled:cursor-not-allowed disabled:bg-school-navy/25 sm:w-auto"
      >
        Submit enquiry
      </button>
      <p className="mt-4 text-[0.82rem] leading-relaxed text-school-navy/60">
        Submitting an enquiry does not register your child. Registration opens 1 October and is a separate form with a
        ₹1,500 fee.
      </p>
    </form>
  );
}

export function SchoolMobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] grid grid-cols-2 border-t border-school-line bg-school-paper pb-[env(safe-area-inset-bottom)] lg:hidden">
      <a
        href={`tel:+${school.admissionsRaw}`}
        onClick={() => track('call_click', { demo: 'school', from: 'mobile_bar' })}
        className="flex min-h-[56px] items-center justify-center text-[0.86rem] font-medium text-school-navy"
      >
        Call admissions
      </a>
      <a href="#enquiry" className="flex min-h-[56px] items-center justify-center bg-school-crimson text-[0.86rem] font-semibold text-white">
        Enquire now
      </a>
    </div>
  );
}
