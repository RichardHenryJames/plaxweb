'use client';

import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';
import { setSourceDemo, track } from '@/lib/analytics';
import { site } from '@/lib/site';
import { otherDemos, type DemoEntry } from '@/lib/demos';
import { PreviewStage, type PreviewView } from '@/components/studio/DemoShowcase';

/**
 * The one piece of PlaxWeb that appears inside a demo.
 *
 * It has to do two jobs at once. For someone browsing the portfolio it is a
 * quiet credit and a way back. For someone who arrived straight from a
 * WhatsApp message, an ad or a search result — which is most people — it is
 * the entire sales layer: what this solution is, what it costs, how long it
 * takes, and how to ask for it.
 *
 * So it stays a small badge until it is opened, then becomes a proper panel.
 */
export function DemoChrome({ demo }: { demo: DemoEntry }) {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const [view, setView] = useState<PreviewView>('desktop');
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setSourceDemo(demo.slug);
    track('demo_open', { demo: demo.slug, industry: demo.industry });
  }, [demo.slug, demo.industry]);

  // Full label while the visitor is still at the top and discovering the page;
  // shrinks to the mark once they start reading, so it stops sitting on top of
  // the demo's own content on a phone.
  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 520);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [open]);

  const siblings = otherDemos(demo.slug, 3);
  const s = demo.solution;

  return (
    <div
      ref={rootRef}
      className="fixed bottom-20 left-3 z-[70] print:hidden sm:bottom-5 sm:left-5"
      data-plax-demo-chrome
    >
      {open && (
        <>
          {/* On a phone the panel covers most of the screen, so the demo behind
              it is dimmed rather than left competing for attention. */}
          <div
            aria-hidden
            onClick={() => setOpen(false)}
            className="fixed inset-0 -z-10 bg-black/45 sm:hidden"
          />
          <div
            id={panelId}
            role="dialog"
            aria-label={`${s.name} — by PlaxWeb`}
            className="mb-2 flex max-h-[min(76svh,40rem)] w-[min(24rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-xl border border-white/12 bg-[#100f0e] text-[#f2efe9] shadow-[0_28px_70px_-20px_rgba(0,0,0,0.7)]"
          >
            <div className="flex shrink-0 items-start justify-between gap-3 border-b border-white/10 px-4 py-3">
              <div className="min-w-0">
                <p className="font-mono text-[0.6rem] tracking-[0.16em] text-[#f0733f] uppercase">Built by PlaxWeb</p>
                <p className="mt-1 text-[0.95rem] leading-snug font-medium">{s.name}</p>
              </div>
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="-mt-1 -mr-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-lg text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            >
              <span aria-hidden>×</span>
            </button>
          </div>

<div className="flex-1 overflow-y-auto overscroll-contain px-4 pt-4 pb-4">
            <p className="text-[0.88rem] leading-relaxed text-white/70">{s.outcome}</p>

            <div className="mt-4 rounded-lg bg-white/[0.04] p-2.5">
              <div className="mb-2 flex items-center justify-between gap-2">
                <span className="font-mono text-[0.58rem] tracking-[0.14em] text-white/40 uppercase">
                  Same site, both screens
                </span>
                <div className="flex gap-1 rounded-full bg-white/10 p-[2px]">
                  {(['desktop', 'mobile'] as const).map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => {
                        setView(v);
                        track('demo_preview_toggle', { demo: demo.slug, view: v, from: 'chrome' });
                      }}
                      aria-pressed={view === v}
                      className={`min-h-[26px] rounded-full px-2.5 text-[0.66rem] transition-colors ${
                        view === v ? 'bg-white text-[#100f0e]' : 'text-white/65'
                      }`}
                    >
                      {v === 'desktop' ? 'Desktop' : 'Mobile'}
                    </button>
                  ))}
                </div>
              </div>
              <PreviewStage demo={demo} view={view} sizes="360px" className="rounded-md" />
            </div>

            <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-white/10">
              <div className="bg-[#100f0e] px-3 py-2.5">
                <dt className="font-mono text-[0.56rem] tracking-[0.12em] text-white/40 uppercase">Solutions from</dt>
                <dd className="mt-0.5 text-[0.92rem] font-medium">{s.priceFrom}</dd>
              </div>
              <div className="bg-[#100f0e] px-3 py-2.5">
                <dt className="font-mono text-[0.56rem] tracking-[0.12em] text-white/40 uppercase">Live in</dt>
                <dd className="mt-0.5 text-[0.92rem] font-medium">{s.timeline}</dd>
              </div>
            </dl>

            <ul className="mt-4 space-y-1.5">
              {s.core.slice(0, 5).map((f) => (
                <li key={f} className="flex gap-2.5 text-[0.83rem] leading-relaxed text-white/70">
                  <span aria-hidden className="mt-[0.62em] h-px w-2.5 shrink-0 bg-[#f0733f]" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-5 border-t border-white/10 pt-3">
              <p className="font-mono text-[0.58rem] tracking-[0.14em] text-white/35 uppercase">Other industries</p>
              <ul className="mt-1.5">
                {siblings.map((d) => (
                  <li key={d.slug}>
                    <Link
                      href={`${site.basePath}/${d.slug}`}
                      onClick={() => track('demo_switch', { from: demo.slug, to: d.slug })}
                      className="flex min-h-[36px] items-center justify-between gap-3 text-[0.84rem] text-white/70 transition-colors hover:text-white"
                    >
                      <span className="truncate">{d.solution.name}</span>
                      <span aria-hidden className="shrink-0 text-white/30">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

              <p className="mt-4 text-[0.72rem] leading-relaxed text-white/35">
                {demo.brand} is a fictional business created to demonstrate this solution. Your site would carry your
                brand, your services and your photographs.
              </p>
            </div>

            {/* Pinned, because on a phone the panel scrolls and the ask must
                never be the thing that scrolls out of sight. */}
            <div className="shrink-0 border-t border-white/10 bg-[#100f0e] px-4 pt-3 pb-4">
              <Link
                href={`${site.basePath}/contact?demo=${demo.slug}&view=${view}`}
                onClick={() => track('demo_cta_click', { demo: demo.slug, cta: 'chrome_quote', view })}
                className="inline-flex min-h-[46px] w-full items-center justify-center rounded-full bg-[#c23d18] px-4 text-[0.9rem] font-medium text-white transition-colors hover:bg-[#a63413]"
              >
                Get this for my business
              </Link>
              <Link
                href={site.basePath}
                onClick={() => track('demo_cta_click', { demo: demo.slug, cta: 'chrome_portfolio' })}
                className="mt-2 inline-flex min-h-[36px] w-full items-center justify-center text-[0.82rem] text-white/60 transition-colors hover:text-white"
              >
                See all ten solutions
              </Link>
            </div>
          </div>
        </>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? 'Close the PlaxWeb panel' : 'Want this website for your business? Open the PlaxWeb panel'}
        className="flex min-h-[38px] items-center gap-2 rounded-full border border-white/12 bg-[#100f0e]/92 py-2 pl-2 text-[#f2efe9] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.55)] backdrop-blur-sm transition-[padding,background-color] duration-300 hover:bg-[#100f0e] data-[compact=true]:pr-2 data-[compact=false]:pr-3.5"
        data-compact={compact && !open}
      >
        <span
          aria-hidden
          className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#c23d18] text-[0.7rem] leading-none font-bold text-white"
        >
          P
        </span>
        <span
          aria-hidden
          className={`overflow-hidden text-[0.78rem] whitespace-nowrap transition-[max-width,opacity] duration-300 ${
            compact && !open ? 'max-w-0 opacity-0' : 'max-w-[16rem] opacity-100'
          }`}
        >
          {open ? 'Demo by PlaxWeb' : 'Want this for your business?'}
        </span>
        <span
          aria-hidden
          className={`text-[0.6rem] text-white/45 transition-[max-width,opacity] duration-300 ${
            compact && !open ? 'max-w-0 overflow-hidden opacity-0' : 'max-w-4 opacity-100'
          }`}
        >
          {open ? '▾' : '▴'}
        </span>
      </button>
    </div>
  );
}
