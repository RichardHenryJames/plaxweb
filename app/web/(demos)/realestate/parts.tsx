'use client';

import { useEffect, useMemo, useState } from 'react';
import { configs, project, type Config } from './data';
import { track } from '@/lib/analytics';

const NAV = [
  ['#project', 'The project'],
  ['#homes', 'Homes'],
  ['#amenities', 'Amenities'],
  ['#location', 'Location'],
  ['#visit', 'Site visit'],
] as const;

export function EstateNav() {
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
        solid ? 'border-b border-estate-sand/15 bg-estate-deep/96 backdrop-blur-md' : ''
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-[82rem] items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#top" className="flex min-h-11 flex-col justify-center leading-tight">
          <span className="block font-estate-display text-[1.3rem] font-medium tracking-[0.02em] text-estate-stone">
            Aashray Grove
          </span>
          <span className="block text-[0.58rem] tracking-[0.22em] text-estate-brass uppercase">
            by {project.developer}
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {NAV.slice(0, 4).map(([href, label]) => (
            <a key={href} href={href} className="text-[0.86rem] text-estate-stone/70 transition-colors hover:text-estate-brass">
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#visit"
            className="hidden bg-estate-brass px-5 py-2.5 text-[0.84rem] font-medium text-estate-deep transition-colors hover:bg-estate-stone sm:inline-flex"
          >
            Book a site visit
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="-mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
            aria-label="Open menu"
          >
            <span aria-hidden className="relative block h-[10px] w-6">
              <span className="absolute inset-x-0 top-0 h-[1.5px] bg-estate-stone" />
              <span className="absolute inset-x-0 bottom-0 h-[1.5px] bg-estate-stone" />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-estate-deep lg:hidden">
          <div className="flex h-[72px] items-center justify-between px-5">
            <span className="font-estate-display text-[1.3rem] font-medium text-estate-stone">Aashray Grove</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="-mr-2 flex h-11 w-11 items-center justify-center text-2xl text-estate-stone"
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
                className="border-b border-estate-sand/12 py-5 font-estate-display text-[1.9rem] font-light text-estate-stone"
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

/* ----------------------------------------------------- floor plans */

function FloorPlan({ config }: { config: Config }) {
  return (
    <svg
      viewBox="0 0 100 86"
      role="img"
      aria-label={`Indicative floor plan for the ${config.name}`}
      className="w-full"
    >
      <rect x="0" y="0" width="100" height="86" fill="none" />
      {config.plan.map(([x, y, w, h, label]) => (
        <g key={label}>
          <rect
            x={x}
            y={y}
            width={w}
            height={h}
            fill="var(--color-estate-stone)"
            fillOpacity="0.06"
            stroke="var(--color-estate-brass)"
            strokeWidth="0.6"
          />
          <text
            x={x + w / 2}
            y={y + h / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="2.6"
            fill="var(--color-estate-stone)"
            fillOpacity="0.75"
            fontFamily="var(--font-inter-tight)"
          >
            {label}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function HomeSelector() {
  const [id, setId] = useState(configs[1].id);
  const config = configs.find((c) => c.id === id) ?? configs[0];

  return (
    <div className="mt-10">
      <div role="tablist" aria-label="Villa configurations" className="scroll-x -mx-5 flex gap-3 px-5 sm:mx-0 sm:px-0">
        {configs.map((c) => (
          <button
            key={c.id}
            role="tab"
            aria-selected={c.id === id}
            onClick={() => setId(c.id)}
            className={`shrink-0 border px-5 py-3 text-left transition-colors ${
              c.id === id
                ? 'border-estate-brass bg-estate-brass/12 text-estate-stone'
                : 'border-estate-sand/18 text-estate-stone/65 hover:border-estate-sand/40'
            }`}
          >
            <span className="block text-[0.92rem] font-medium">{c.name}</span>
            <span className="mt-0.5 block text-[0.78rem] text-estate-stone/50">
              {c.built} · {c.price}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div className="min-w-0 border border-estate-sand/15 bg-estate-deep/45 p-5 sm:p-8">
          <p className="text-[0.68rem] tracking-[0.18em] text-estate-brass uppercase">Indicative plan · not to scale</p>
          <div className="mt-5">
            <FloorPlan config={config} />
          </div>
        </div>

        <div className="min-w-0">
          <h3 className="font-estate-display text-[1.9rem] leading-tight font-medium">{config.name}</h3>
          <dl className="mt-6 grid grid-cols-2 gap-px bg-estate-sand/15 sm:grid-cols-4">
            {[
              ['Built-up', config.built],
              ['Plot', config.plot],
              ['Price', config.price.replace(' onwards', '')],
              ['Status', config.available],
            ].map(([k, v]) => (
              <div key={k} className="bg-estate-forest p-4">
                <dt className="text-[0.64rem] tracking-[0.14em] text-estate-stone/45 uppercase">{k}</dt>
                <dd className="mt-1.5 text-[0.9rem] font-medium">{v}</dd>
              </div>
            ))}
          </dl>

          <ul className="mt-7 space-y-3">
            {config.rooms.map((r) => (
              <li key={r} className="flex gap-3 text-[0.95rem] text-estate-stone/80">
                <span aria-hidden className="mt-[0.65em] h-px w-4 shrink-0 bg-estate-brass" />
                {r}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#visit"
              className="inline-flex min-h-[50px] items-center justify-center bg-estate-brass px-7 text-[0.9rem] font-medium text-estate-deep transition-colors hover:bg-estate-stone"
            >
              Book a site visit
            </a>
            <a
              href="#emi"
              className="inline-flex min-h-[50px] items-center justify-center border border-estate-sand/25 px-7 text-[0.9rem] transition-colors hover:border-estate-stone"
            >
              Work out the EMI
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------- EMI calculator */

const inr = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Math.round(n));

export function EmiCalculator() {
  const [configId, setConfigId] = useState(configs[1].id);
  const config = configs.find((c) => c.id === configId) ?? configs[0];
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(8.6);
  const [years, setYears] = useState(20);

  const { emi, principal, totalInterest } = useMemo(() => {
    const p = config.priceValue * (1 - downPct / 100);
    const r = rate / 12 / 100;
    const n = years * 12;
    const e = r === 0 ? p / n : (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return { emi: e, principal: p, totalInterest: e * n - p };
  }, [config.priceValue, downPct, rate, years]);

  const slider = 'range-control text-estate-brass';
  const label = 'flex items-baseline justify-between gap-4 text-[0.85rem]';

  return (
    <div id="emi" className="scroll-mt-24 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
      <div>
        <div className="space-y-7">
          <div>
            <span className="mb-2.5 block text-[0.68rem] tracking-[0.16em] text-estate-stone/50 uppercase">
              Configuration
            </span>
            <div className="flex flex-wrap gap-2">
              {configs.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setConfigId(c.id)}
                  aria-pressed={c.id === configId}
                  className={`min-h-[42px] border px-4 text-[0.85rem] transition-colors ${
                    c.id === configId
                      ? 'border-estate-brass bg-estate-brass text-estate-deep'
                      : 'border-estate-sand/20 text-estate-stone/70 hover:border-estate-sand/45'
                  }`}
                >
                  {c.name.replace(' Garden Villa', '').replace(' Courtyard Villa', '').replace(', corner', '')}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={label} htmlFor="e-down">
              <span className="text-estate-stone/70">Down payment</span>
              <span className="font-medium">
                {downPct}% · {inr(config.priceValue * (downPct / 100))}
              </span>
            </label>
            <input
              id="e-down"
              type="range"
              min={10}
              max={60}
              step={5}
              value={downPct}
              onChange={(e) => setDownPct(Number(e.target.value))}
              className={`mt-3 ${slider}`}
            />
          </div>

          <div>
            <label className={label} htmlFor="e-rate">
              <span className="text-estate-stone/70">Interest rate</span>
              <span className="font-medium">{rate.toFixed(2)}% p.a.</span>
            </label>
            <input
              id="e-rate"
              type="range"
              min={7}
              max={12}
              step={0.05}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className={`mt-3 ${slider}`}
            />
          </div>

          <div>
            <label className={label} htmlFor="e-years">
              <span className="text-estate-stone/70">Tenure</span>
              <span className="font-medium">{years} years</span>
            </label>
            <input
              id="e-years"
              type="range"
              min={5}
              max={30}
              step={1}
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className={`mt-3 ${slider}`}
            />
          </div>
        </div>

        <p className="mt-8 text-[0.82rem] leading-relaxed text-estate-stone/45">
          Indicative only. Actual rate, eligibility and processing fees are set by your lender. Stamp duty and
          registration are payable separately and are not included above.
        </p>
      </div>

      <div className="self-start border border-estate-brass/40 bg-estate-deep p-7 sm:p-9">
        <p className="text-[0.68rem] tracking-[0.18em] text-estate-brass uppercase">Monthly instalment</p>
        <p className="mt-3 font-estate-display text-[clamp(2.4rem,6vw,3.4rem)] leading-none font-medium text-estate-stone">
          {inr(emi)}
        </p>
        <p className="mt-2 text-[0.88rem] text-estate-stone/55">for {years} years</p>

        <dl className="mt-8 space-y-3 border-t border-estate-sand/15 pt-6 text-[0.9rem]">
          {[
            ['Villa price', inr(config.priceValue)],
            ['Down payment', inr(config.priceValue * (downPct / 100))],
            ['Loan amount', inr(principal)],
            ['Total interest', inr(totalInterest)],
            ['Total outflow', inr(principal + totalInterest + config.priceValue * (downPct / 100))],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4">
              <dt className="text-estate-stone/60">{k}</dt>
              <dd className="font-medium">{v}</dd>
            </div>
          ))}
        </dl>

        <a
          href="#visit"
          className="mt-8 inline-flex min-h-[50px] w-full items-center justify-center bg-estate-brass px-7 text-[0.9rem] font-medium text-estate-deep transition-colors hover:bg-estate-stone"
        >
          Talk to the sales team
        </a>
      </div>
    </div>
  );
}

/* -------------------------------------------------------- enquiry */

export function SiteVisitForm() {
  const [f, setF] = useState({ name: '', phone: '', config: configs[1].name, date: '', slot: '11:00', budget: '₹2 – 3 Cr' });
  const ready = f.name.trim().length > 1 && f.phone.trim().length >= 8;

  const msg = [
    'Hello Aashray Grove, I would like to book a site visit.',
    '',
    `Name: ${f.name || '—'}`,
    `Phone: ${f.phone || '—'}`,
    `Interested in: ${f.config}`,
    `Budget: ${f.budget}`,
    `Preferred visit: ${f.date || 'any day'} at ${f.slot}`,
  ].join('\n');

  const field =
    'w-full min-h-[48px] border border-estate-sand/20 bg-estate-deep px-4 py-3 text-[0.94rem] text-estate-stone placeholder:text-estate-stone/35 focus:border-estate-brass focus:outline-none';
  const label = 'mb-2 block text-[0.68rem] tracking-[0.16em] text-estate-stone/50 uppercase';
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setF((p) => ({ ...p, [k]: e.target.value }));

  return (
    <form onSubmit={(e) => e.preventDefault()} className="border border-estate-sand/15 p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="r-name">
            Name
          </label>
          <input id="r-name" className={field} value={f.name} onChange={set('name')} placeholder="Suresh Iyer" />
        </div>
        <div>
          <label className={label} htmlFor="r-phone">
            Mobile
          </label>
          <input id="r-phone" type="tel" inputMode="tel" className={field} value={f.phone} onChange={set('phone')} placeholder="98456 61200" />
        </div>
        <div>
          <label className={label} htmlFor="r-config">
            Interested in
          </label>
          <select id="r-config" className={field} value={f.config} onChange={set('config')}>
            {configs.map((c) => (
              <option key={c.id} className="bg-estate-deep">
                {c.name}
              </option>
            ))}
            <option className="bg-estate-deep">Not decided yet</option>
          </select>
        </div>
        <div>
          <label className={label} htmlFor="r-budget">
            Budget
          </label>
          <select id="r-budget" className={field} value={f.budget} onChange={set('budget')}>
            {['Under ₹2 Cr', '₹2 – 3 Cr', '₹3 – 4 Cr', 'Above ₹4 Cr'].map((b) => (
              <option key={b} className="bg-estate-deep">
                {b}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="r-date">
            Visit date
          </label>
          <input id="r-date" type="date" className={field} value={f.date} onChange={set('date')} />
        </div>
        <div>
          <label className={label} htmlFor="r-slot">
            Preferred time
          </label>
          <select id="r-slot" className={field} value={f.slot} onChange={set('slot')}>
            {['10:00', '11:00', '12:00', '15:00', '16:00', '17:00'].map((s) => (
              <option key={s} className="bg-estate-deep">
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <a
          href={ready ? `https://wa.me/${project.whatsappRaw}?text=${encodeURIComponent(msg)}` : undefined}
          aria-disabled={!ready}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => ready && track('whatsapp_click', { demo: 'realestate', from: 'site_visit' })}
          className={`inline-flex min-h-[52px] flex-1 items-center justify-center px-8 text-[0.92rem] font-medium transition-colors ${
            ready
              ? 'bg-estate-brass text-estate-deep hover:bg-estate-stone'
              : 'cursor-not-allowed border border-estate-sand/15 text-estate-stone/35'
          }`}
        >
          Request the visit
        </a>
        <a
          href={`tel:+${project.phoneRaw}`}
          onClick={() => track('call_click', { demo: 'realestate', from: 'site_visit' })}
          className="inline-flex min-h-[52px] items-center justify-center border border-estate-sand/25 px-8 text-[0.92rem] transition-colors hover:border-estate-stone"
        >
          {project.phoneDisplay}
        </a>
      </div>

      <p className="mt-5 text-[0.8rem] leading-relaxed text-estate-stone/45">
        A cab can be arranged from Sarjapur Road junction. Site visits run Monday to Sunday; the show villa is open
        until 6pm.
      </p>
    </form>
  );
}

export function EstateMobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] grid grid-cols-3 border-t border-estate-sand/15 bg-estate-deep/97 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden">
      <a
        href={`tel:+${project.phoneRaw}`}
        onClick={() => track('call_click', { demo: 'realestate', from: 'mobile_bar' })}
        className="flex min-h-[56px] items-center justify-center text-[0.84rem] text-estate-stone/85"
      >
        Call
      </a>
      <a
        href="#emi"
        className="flex min-h-[56px] items-center justify-center border-x border-estate-sand/15 text-[0.84rem] text-estate-stone/85"
      >
        EMI
      </a>
      <a href="#visit" className="flex min-h-[56px] items-center justify-center bg-estate-brass text-[0.84rem] font-medium text-estate-deep">
        Site visit
      </a>
    </div>
  );
}
