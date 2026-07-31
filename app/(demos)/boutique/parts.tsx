'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { kaanchi, pieces, type Piece } from './data';
import { track } from '@/lib/analytics';

const NAV = [
  ['#edit', 'The edit'],
  ['#craft', 'Craft'],
  ['#measure', 'Made to measure'],
  ['#visit', 'Visit'],
] as const;

export function KaanchiNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <div className="bg-kaanchi-ink text-kaanchi-ivory">
        <p className="mx-auto max-w-[78rem] px-5 py-2 text-center text-[0.72rem] tracking-[0.14em] uppercase sm:px-8">
          Aavani, the festive edit — nine pieces, runs of twelve
        </p>
      </div>

      <header className="sticky top-0 z-50 border-b border-kaanchi-ink/12 bg-kaanchi-ivory/95 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] max-w-[78rem] items-center justify-between gap-4 px-5 sm:px-8">
            <a href="#top" className="flex min-h-11 items-center font-kaanchi-display text-[1.7rem] leading-none tracking-[0.1em] text-kaanchi-ink">
            KAANCHI
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
            {NAV.map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="text-[0.78rem] tracking-[0.12em] text-kaanchi-mute uppercase transition-colors hover:text-kaanchi-plum"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${kaanchi.whatsappRaw}?text=${encodeURIComponent('Hello Kaanchi, I would like to ask about the Aavani edit.')}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('whatsapp_click', { demo: 'boutique', from: 'header' })}
              className="hidden bg-kaanchi-plum px-5 py-2.5 text-[0.72rem] tracking-[0.16em] text-kaanchi-ivory uppercase transition-colors hover:bg-kaanchi-ink sm:inline-flex"
            >
              Order on WhatsApp
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="-mr-2 flex h-11 w-11 items-center justify-center md:hidden"
              aria-label="Open menu"
            >
              <span aria-hidden className="relative block h-[9px] w-6">
                <span className="absolute inset-x-0 top-0 h-px bg-kaanchi-ink" />
                <span className="absolute inset-x-0 bottom-0 h-px bg-kaanchi-ink" />
              </span>
            </button>
          </div>
        </div>

        {open && (
          <div className="fixed inset-0 z-[60] flex flex-col bg-kaanchi-ivory md:hidden">
            <div className="flex h-[72px] items-center justify-between px-5">
              <span className="font-kaanchi-display text-[1.7rem] tracking-[0.1em] text-kaanchi-ink">KAANCHI</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="-mr-2 flex h-11 w-11 items-center justify-center text-2xl text-kaanchi-ink"
                aria-label="Close menu"
              >
                <span aria-hidden>×</span>
              </button>
            </div>
            <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center gap-1 px-5 pb-24">
              {NAV.map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="border-b border-kaanchi-ink/10 py-5 font-kaanchi-display text-[2rem] text-kaanchi-ink"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}

/* ------------------------------------------------------- catalogue */

const CATEGORIES = ['All', 'Saree', 'Occasion', 'Everyday'] as const;

function PieceDetail({ piece, onClose }: { piece: Piece; onClose: () => void }) {
  const [size, setSize] = useState(piece.sizes[0]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const msg = `Hello Kaanchi, I would like to order the ${piece.name} (${piece.price}), size ${size}. Is it available?`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={piece.name}
      className="fixed inset-0 z-[70] flex items-end justify-center bg-kaanchi-ink/55 p-0 sm:items-center sm:p-6"
    >
      <button type="button" aria-label="Close" onClick={onClose} className="absolute inset-0 cursor-default" />

      <div className="relative max-h-[92svh] w-full max-w-4xl overflow-y-auto bg-kaanchi-ivory">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-10 flex h-10 w-10 items-center justify-center bg-kaanchi-ivory/90 text-xl text-kaanchi-ink"
          aria-label="Close"
        >
          <span aria-hidden>×</span>
        </button>

        <div className="grid sm:grid-cols-2">
          <div className="relative aspect-[4/5] sm:aspect-auto sm:min-h-[32rem]">
            <Image src={piece.image.src} alt={piece.image.alt} fill sizes="(min-width:640px) 45vw, 100vw" className="object-cover" />
          </div>

          <div className="p-6 sm:p-9">
            <p className="text-[0.68rem] tracking-[0.2em] text-kaanchi-plum uppercase">{piece.category}</p>
            <h3 className="mt-3 font-kaanchi-display text-[1.9rem] leading-tight text-kaanchi-ink">{piece.name}</h3>
            <p className="mt-2 font-kaanchi-display text-[1.4rem] text-kaanchi-plum">{piece.price}</p>

            <p className="mt-5 text-[0.94rem] leading-relaxed text-kaanchi-ink/75">{piece.note}</p>

            <dl className="mt-6 space-y-2.5 border-t border-kaanchi-ink/12 pt-5 text-[0.86rem]">
              {[
                ['Fabric', piece.fabric],
                ['Origin', piece.weave],
                ['Availability', piece.lead],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-4">
                  <dt className="w-24 shrink-0 text-[0.7rem] tracking-[0.12em] text-kaanchi-mute uppercase">{k}</dt>
                  <dd className="text-kaanchi-ink/80">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6">
              <span className="mb-2 block text-[0.7rem] tracking-[0.12em] text-kaanchi-mute uppercase">Size</span>
              <div className="flex flex-wrap gap-2">
                {piece.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    aria-pressed={size === s}
                    className={`min-h-[42px] border px-4 text-[0.85rem] transition-colors ${
                      size === s
                        ? 'border-kaanchi-ink bg-kaanchi-ink text-kaanchi-ivory'
                        : 'border-kaanchi-ink/20 text-kaanchi-ink/70 hover:border-kaanchi-ink/50'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <a
              href={`https://wa.me/${kaanchi.whatsappRaw}?text=${encodeURIComponent(msg)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('whatsapp_click', { demo: 'boutique', from: 'piece_detail', piece: piece.id })}
              className="mt-7 inline-flex min-h-[52px] w-full items-center justify-center bg-kaanchi-plum px-8 text-[0.76rem] tracking-[0.16em] text-kaanchi-ivory uppercase transition-colors hover:bg-kaanchi-ink"
            >
              Order on WhatsApp
            </a>
            <a
              href="#measure"
              onClick={onClose}
              className="mt-3 inline-flex min-h-[48px] w-full items-center justify-center border border-kaanchi-ink/20 px-8 text-[0.76rem] tracking-[0.16em] text-kaanchi-ink uppercase transition-colors hover:border-kaanchi-ink"
            >
              Book a fitting instead
            </a>
            <p className="mt-4 text-[0.78rem] leading-relaxed text-kaanchi-mute">
              We reply with a payment link and a photograph of the exact piece before anything is charged.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Catalogue() {
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>('All');
  const [open, setOpen] = useState<Piece | null>(null);
  const list = cat === 'All' ? pieces : pieces.filter((p) => p.category === cat);

  return (
    <>
      <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 border-b border-kaanchi-ink/12 pb-4">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            aria-pressed={cat === c}
            className={`relative min-h-[36px] px-1 pb-1 text-[0.8rem] tracking-[0.12em] uppercase transition-colors ${
              cat === c ? 'text-kaanchi-plum' : 'text-kaanchi-mute hover:text-kaanchi-ink'
            }`}
          >
            {c}
            <span
              aria-hidden
              className={`absolute -bottom-[17px] left-0 h-px w-full origin-left bg-kaanchi-plum transition-transform duration-300 ${
                cat === c ? 'scale-x-100' : 'scale-x-0'
              }`}
            />
          </button>
        ))}
        <span className="ml-auto text-[0.78rem] text-kaanchi-mute">{list.length} pieces</span>
      </div>

      <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p, i) => (
          <article key={p.id} data-reveal style={{ ['--reveal-delay' as string]: `${(i % 3) * 70}ms` }}>
            <button
              type="button"
              onClick={() => setOpen(p)}
              className="group block w-full text-left"
              aria-label={`View ${p.name}`}
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-kaanchi-ink/5">
                <Image
                  src={p.image.src}
                  alt={p.image.alt}
                  fill
                  sizes="(min-width:1024px) 30vw, (min-width:640px) 46vw, 92vw"
                  className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]"
                />
                <span className="absolute inset-x-0 bottom-0 translate-y-full bg-kaanchi-ink/85 py-3 text-center text-[0.72rem] tracking-[0.16em] text-kaanchi-ivory uppercase transition-transform duration-300 group-hover:translate-y-0">
                  View details
                </span>
              </div>
              <h3 className="mt-4 font-kaanchi-display text-[1.32rem] leading-tight text-kaanchi-ink">{p.name}</h3>
              <p className="mt-1 text-[0.78rem] text-kaanchi-mute">{p.weave}</p>
              <p className="mt-2 flex items-baseline justify-between gap-3">
                <span className="font-kaanchi-display text-[1.15rem] text-kaanchi-plum">{p.price}</span>
                <span className="text-[0.74rem] tracking-[0.1em] text-kaanchi-mute uppercase">{p.lead}</span>
              </p>
            </button>
          </article>
        ))}
      </div>

      {open && <PieceDetail piece={open} onClose={() => setOpen(null)} />}
    </>
  );
}

/* --------------------------------------------------- made to measure */

export function FittingForm() {
  const [f, setF] = useState({ name: '', phone: '', interest: pieces[0].name, date: '', occasion: '', note: '' });
  const ready = f.name.trim().length > 1 && f.phone.trim().length >= 8;

  const msg = [
    'Hello Kaanchi, I would like to book a fitting at the Alwarpet studio.',
    '',
    `Name: ${f.name || '—'}`,
    `Phone: ${f.phone || '—'}`,
    `Interested in: ${f.interest}`,
    `Preferred date: ${f.date || 'flexible'}`,
    f.occasion ? `Occasion: ${f.occasion}` : '',
    f.note ? `Note: ${f.note}` : '',
  ]
    .filter(Boolean)
    .join('\n');

  const field =
    'w-full min-h-[48px] border border-kaanchi-ink/18 bg-white px-4 py-3 text-[0.94rem] text-kaanchi-ink placeholder:text-kaanchi-mute/70 focus:border-kaanchi-plum focus:outline-none';
  const label = 'mb-2 block text-[0.68rem] tracking-[0.16em] text-kaanchi-mute uppercase';
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF((p) => ({ ...p, [k]: e.target.value }));

  return (
    <form onSubmit={(e) => e.preventDefault()} className="border border-kaanchi-ink/12 bg-white p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="b-name">
            Name
          </label>
          <input id="b-name" className={field} value={f.name} onChange={set('name')} placeholder="Lakshmi Narayan" />
        </div>
        <div>
          <label className={label} htmlFor="b-phone">
            Phone / WhatsApp
          </label>
          <input id="b-phone" type="tel" inputMode="tel" className={field} value={f.phone} onChange={set('phone')} placeholder="98402 23311" />
        </div>
        <div className="sm:col-span-2">
          <label className={label} htmlFor="b-interest">
            Which piece
          </label>
          <select id="b-interest" className={field} value={f.interest} onChange={set('interest')}>
            {pieces.map((p) => (
              <option key={p.id}>{p.name}</option>
            ))}
            <option>Something made from scratch</option>
          </select>
        </div>
        <div>
          <label className={label} htmlFor="b-date">
            Preferred date
          </label>
          <input id="b-date" type="date" className={field} value={f.date} onChange={set('date')} />
        </div>
        <div>
          <label className={label} htmlFor="b-occasion">
            Occasion &amp; date
          </label>
          <input id="b-occasion" className={field} value={f.occasion} onChange={set('occasion')} placeholder="Wedding reception, 8 Nov" />
        </div>
        <div className="sm:col-span-2">
          <label className={label} htmlFor="b-note">
            Anything else
          </label>
          <textarea
            id="b-note"
            rows={2}
            className={`${field} resize-y`}
            value={f.note}
            onChange={set('note')}
            placeholder="Colours you cannot wear, an existing blouse to match, a heirloom saree to work around…"
          />
        </div>
      </div>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <a
          href={ready ? `https://wa.me/${kaanchi.whatsappRaw}?text=${encodeURIComponent(msg)}` : undefined}
          aria-disabled={!ready}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => ready && track('whatsapp_click', { demo: 'boutique', from: 'fitting' })}
          className={`inline-flex min-h-[52px] flex-1 items-center justify-center px-8 text-[0.76rem] tracking-[0.16em] uppercase transition-colors ${
            ready
              ? 'bg-kaanchi-plum text-kaanchi-ivory hover:bg-kaanchi-ink'
              : 'cursor-not-allowed border border-kaanchi-ink/15 text-kaanchi-mute'
          }`}
        >
          Request the appointment
        </a>
        <a
          href={`tel:+${kaanchi.phoneRaw}`}
          onClick={() => track('call_click', { demo: 'boutique', from: 'fitting' })}
          className="inline-flex min-h-[52px] items-center justify-center border border-kaanchi-ink/20 px-8 text-[0.76rem] tracking-[0.16em] text-kaanchi-ink uppercase transition-colors hover:border-kaanchi-ink"
        >
          {kaanchi.phoneDisplay}
        </a>
      </div>
    </form>
  );
}

export function KaanchiMobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] grid grid-cols-2 border-t border-kaanchi-ink/12 bg-kaanchi-ivory pb-[env(safe-area-inset-bottom)] md:hidden">
      <a
        href="#measure"
        className="flex min-h-[56px] items-center justify-center text-[0.74rem] tracking-[0.14em] text-kaanchi-ink uppercase"
      >
        Book a fitting
      </a>
      <a
        href={`https://wa.me/${kaanchi.whatsappRaw}?text=${encodeURIComponent('Hello Kaanchi, I would like to ask about the Aavani edit.')}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track('whatsapp_click', { demo: 'boutique', from: 'mobile_bar' })}
        className="flex min-h-[56px] items-center justify-center bg-kaanchi-plum text-[0.74rem] tracking-[0.14em] text-kaanchi-ivory uppercase"
      >
        WhatsApp
      </a>
    </div>
  );
}
