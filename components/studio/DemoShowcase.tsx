'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useId, useState } from 'react';
import type { DemoEntry } from '@/lib/demos';
import { track } from '@/lib/analytics';
import { site } from '@/lib/site';
import { cn } from '@/lib/cn';

export type PreviewView = 'desktop' | 'mobile';

/** Window aspect ratios the two frames present, as height ÷ width. */
const DESKTOP_RATIO = 10 / 16;
const MOBILE_RATIO = 19.5 / 9;

/**
 * How far the screenshot can slide up inside its frame, as a percentage of the
 * image's own height. Derived from the real capture dimensions so the pan
 * always stops exactly at the bottom of the shot.
 */
function panDistance(imgW: number, imgH: number, windowRatio: number) {
  const visible = windowRatio / (imgH / imgW);
  return Math.max(0, Math.min(0.88, 1 - visible)) * 100;
}

function DeviceToggle({
  value,
  onChange,
  labelledBy,
  tone = 'light',
}: {
  value: PreviewView;
  onChange: (v: PreviewView) => void;
  labelledBy?: string;
  tone?: 'light' | 'dark';
}) {
  const dark = tone === 'dark';
  return (
    <div
      role="group"
      aria-label="Preview device"
      aria-labelledby={labelledBy}
      className={cn(
        'relative inline-flex shrink-0 rounded-full p-[3px]',
        dark ? 'bg-white/10' : 'bg-ink/8'
      )}
    >
      <span
        aria-hidden
        className={cn(
          'absolute top-[3px] bottom-[3px] left-[3px] w-[calc(50%-3px)] rounded-full transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]',
          dark ? 'bg-white' : 'bg-ink',
          value === 'mobile' && 'translate-x-full'
        )}
      />
      {(['desktop', 'mobile'] as const).map((v) => (
        <button
          key={v}
          type="button"
          onClick={() => onChange(v)}
          aria-pressed={value === v}
          className={cn(
            'relative z-10 inline-flex min-h-[34px] items-center gap-1.5 rounded-full px-3 text-[0.76rem] font-medium transition-colors duration-300 sm:px-4',
            value === v ? (dark ? 'text-ink' : 'text-paper') : dark ? 'text-white/70' : 'text-ink-3'
          )}
        >
          <span aria-hidden>
            {v === 'desktop' ? (
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden>
                <rect x="0.75" y="1.75" width="14.5" height="9.5" rx="1.25" stroke="currentColor" strokeWidth="1.5" />
                <path d="M5 14.25h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden>
                <rect x="3.75" y="0.75" width="8.5" height="14.5" rx="1.75" stroke="currentColor" strokeWidth="1.5" />
                <path d="M7 13.25h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            )}
          </span>
          {v === 'desktop' ? 'Desktop' : 'Mobile'}
        </button>
      ))}
    </div>
  );
}

/**
 * The preview stage. Both device frames occupy the same box so switching never
 * changes the page height; they cross-fade with a short scale. In mobile view
 * the desktop shot stays as a dimmed backdrop, which quietly makes the point
 * that the two were designed together.
 */
export function PreviewStage({
  demo,
  view,
  className,
  priority,
  sizes = '(min-width:1280px) 42vw, (min-width:1024px) 46vw, 92vw',
}: {
  demo: DemoEntry;
  view: PreviewView;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const p = demo.preview;
  if (!p) return null;

  const desktopPan = panDistance(p.desktop.width, p.desktop.height, DESKTOP_RATIO);
  const mobilePan = panDistance(p.mobile.width, p.mobile.height, MOBILE_RATIO);
  const isMobile = view === 'mobile';

  return (
    <div className={cn('group/stage relative aspect-[16/10] w-full overflow-hidden', className)}>
      {/* Desktop — browser frame */}
      <div
        className={cn(
          'absolute inset-0 origin-center transition-[opacity,transform,filter] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
          isMobile ? 'scale-[1.04] opacity-25 blur-[3px]' : 'scale-100 opacity-100 blur-0'
        )}
      >
        <div className="flex h-full flex-col overflow-hidden rounded-[8px] border border-ink/12 bg-white shadow-[0_2px_10px_-4px_rgba(20,18,15,0.25)]">
          <div className="flex h-6 shrink-0 items-center gap-1.5 border-b border-ink/8 bg-paper-2 px-2.5 sm:h-7 sm:px-3">
            <span aria-hidden className="flex gap-1">
              <span className="h-[5px] w-[5px] rounded-full bg-ink/18" />
              <span className="h-[5px] w-[5px] rounded-full bg-ink/18" />
              <span className="h-[5px] w-[5px] rounded-full bg-ink/18" />
            </span>
            <span className="truncate font-mono text-[0.55rem] text-ink-3 sm:text-[0.6rem]">
              {site.domain}
              {site.basePath}/{demo.slug}
            </span>
          </div>
          <div className="relative flex-1 overflow-hidden bg-paper-2">
            <Image
              src={p.desktop.src}
              alt={`The ${demo.brand} website on a desktop screen`}
              width={p.desktop.width}
              height={p.desktop.height}
              sizes={sizes}
              priority={priority}
              placeholder="blur"
              blurDataURL={p.desktop.blurDataURL}
              style={{ ['--pan' as string]: `-${desktopPan}%` }}
              className="absolute inset-x-0 top-0 h-auto w-full transition-transform duration-[5000ms] ease-linear group-hover/stage:translate-y-[var(--pan)] motion-reduce:transition-none motion-reduce:group-hover/stage:translate-y-0"
            />
          </div>
        </div>
      </div>

      {/* Mobile — phone frame */}
      <div
        className={cn(
          'pointer-events-none absolute inset-0 flex items-center justify-center transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
          isMobile ? 'scale-100 opacity-100' : 'scale-[0.88] opacity-0'
        )}
      >
        <div className="relative h-[92%] overflow-hidden rounded-[16px] border-[5px] border-ink bg-ink shadow-[0_18px_40px_-18px_rgba(20,18,15,0.55)] sm:rounded-[20px] sm:border-[6px]">
          <div className="relative h-full overflow-hidden rounded-[11px] sm:rounded-[14px]" style={{ aspectRatio: '9 / 19.5' }}>
            <Image
              src={p.mobile.src}
              alt={`The ${demo.brand} website on a phone`}
              width={p.mobile.width}
              height={p.mobile.height}
              sizes="220px"
              placeholder="blur"
              blurDataURL={p.mobile.blurDataURL}
              style={{ ['--pan' as string]: `-${mobilePan}%` }}
              className="absolute inset-x-0 top-0 h-auto w-full transition-transform duration-[5000ms] ease-linear group-hover/stage:translate-y-[var(--pan)] motion-reduce:transition-none motion-reduce:group-hover/stage:translate-y-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/** One catalogue entry: solution, preview with a device toggle, and the way in. */
export function SolutionCard({ demo, index, priority }: { demo: DemoEntry; index: number; priority: boolean }) {
  const [view, setView] = useState<PreviewView>('desktop');
  const headingId = useId();
  const s = demo.solution;

  return (
    <article
      className="flex min-w-0 flex-col"
      data-reveal
      style={{ ['--reveal-delay' as string]: `${(index % 2) * 80}ms` }}
    >
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
        <p className="flex min-w-0 items-baseline gap-3 font-mono text-[0.62rem] tracking-[0.16em] text-ink-3 uppercase">
          <span>{String(index + 1).padStart(2, '0')}</span>
          <span aria-hidden className="hidden h-px w-8 bg-rule sm:block" />
          <span className="truncate">{demo.industry}</span>
        </p>
        <DeviceToggle
          value={view}
          labelledBy={headingId}
          onChange={(v) => {
            setView(v);
            track('demo_preview_toggle', { demo: demo.slug, view: v });
          }}
        />
      </div>

      <Link
        href={`${site.basePath}/${demo.slug}`}
        onClick={() => track('demo_open', { demo: demo.slug, from: 'showcase_preview', view })}
        className="group mt-4 block rounded-[10px] bg-paper-2 p-3 transition-colors duration-500 hover:bg-ink/6 sm:p-4"
        aria-label={`Open the live ${demo.brand} demo`}
      >
        <PreviewStage demo={demo} view={view} priority={priority} />
        <span className="mt-3 flex items-center justify-between gap-3 text-[0.78rem] text-ink-3">
          <span className="truncate">
            {demo.brand} · {demo.location}
          </span>
          <span className="shrink-0 font-medium text-ink transition-colors group-hover:text-flame">
            View live demo <span aria-hidden>→</span>
          </span>
        </span>
      </Link>

      <h3 id={headingId} className="mt-6 font-display text-[1.55rem] leading-tight font-bold tracking-[-0.025em] sm:text-[1.75rem]">
        {s.name}
      </h3>
      <p className="mt-3 text-[0.97rem] leading-relaxed text-ink-2">{s.outcome}</p>

      <ul className="mt-5 grid gap-x-6 gap-y-1.5 text-[0.82rem] text-ink-3 sm:grid-cols-2">
        {s.core.slice(0, 6).map((f) => (
          <li key={f} className="flex items-baseline gap-2.5">
            <span aria-hidden className="h-px w-2.5 shrink-0 -translate-y-[0.2em] bg-rule" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-rule pt-4 text-[0.82rem] text-ink-3">
        <span>
          Live in <span className="font-medium text-ink">{s.timeline}</span>
        </span>
        <span aria-hidden className="h-3 w-px bg-rule" />
        <span>Fixed-price proposal</span>
        <Link
          href={`${site.basePath}/contact?demo=${demo.slug}&view=${view}`}
          onClick={() => track('demo_cta_click', { demo: demo.slug, cta: 'showcase_quote', view })}
          className="ml-auto inline-flex min-h-[36px] items-center border-b border-ink pb-0.5 font-medium text-ink transition-colors hover:border-flame hover:text-flame"
        >
          Get this for my business
        </Link>
      </div>
    </article>
  );
}

/**
 * A lead project, given the room a real portfolio gives its best work: the
 * screenshot runs nearly the full width and the writing sits beside it rather
 * than beneath a thumbnail.
 */
export function FeatureRow({ demo, index, priority }: { demo: DemoEntry; index: number; priority: boolean }) {
  const [view, setView] = useState<PreviewView>('desktop');
  const headingId = useId();
  const s = demo.solution;
  const flip = index % 2 === 1;

  return (
    <article className="grid min-w-0 items-center gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-14 xl:gap-20" data-reveal>
      <Link
        href={`${site.basePath}/${demo.slug}`}
        onClick={() => track('demo_open', { demo: demo.slug, from: 'featured_preview', view })}
        className={cn(
          'group block min-w-0 rounded-[12px] bg-paper-2 p-3 transition-colors duration-500 hover:bg-ink/6 sm:p-5',
          flip && 'lg:order-2'
        )}
        aria-label={`Open the live ${demo.brand} demo`}
      >
        <PreviewStage demo={demo} view={view} priority={priority} sizes="(min-width:1024px) 58vw, 92vw" />
        <span className="mt-3 flex items-center justify-between gap-3 text-[0.8rem] text-ink-3">
          <span className="truncate">
            {demo.brand} · {demo.location}
          </span>
          <span className="shrink-0 font-medium text-ink transition-colors group-hover:text-flame">
            Open it <span aria-hidden>→</span>
          </span>
        </span>
      </Link>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
          <p className="flex min-w-0 items-baseline gap-3 font-mono text-[0.62rem] tracking-[0.16em] text-ink-3 uppercase">
            <span className="text-flame">{String(index + 1).padStart(2, '0')}</span>
            <span aria-hidden className="h-px w-8 bg-rule" />
            <span className="truncate">{demo.industry}</span>
          </p>
          <DeviceToggle
            value={view}
            labelledBy={headingId}
            onChange={(v) => {
              setView(v);
              track('demo_preview_toggle', { demo: demo.slug, view: v, from: 'featured' });
            }}
          />
        </div>

        <h3
          id={headingId}
          className="mt-5 font-display text-[clamp(1.6rem,2.6vw,2.15rem)] leading-[1.1] font-extrabold tracking-[-0.028em]"
        >
          {s.name}
        </h3>
        <p className="mt-4 text-[1rem] leading-relaxed text-ink-2">{s.outcome}</p>

        <p className="mt-5 border-l-2 border-flame/35 pl-4 text-[0.9rem] leading-relaxed text-ink-3">
          <span className="text-ink-2">{s.before}</span>
          <span aria-hidden className="mx-2 text-flame">
            →
          </span>
          {s.after}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-rule pt-5 text-[0.85rem] text-ink-3">
          <span>
            Live in <span className="font-medium text-ink">{s.timeline}</span>
          </span>
          <span aria-hidden className="h-3 w-px bg-rule" />
          <span>Fixed-price proposal</span>
          <Link
            href={`${site.basePath}/contact?demo=${demo.slug}&view=${view}`}
            onClick={() => track('demo_cta_click', { demo: demo.slug, cta: 'featured_quote', view })}
            className="ml-auto inline-flex min-h-[40px] items-center rounded-full bg-ink px-5 text-[0.85rem] font-medium text-paper transition-colors hover:bg-flame"
          >
            Get this for my business
          </Link>
        </div>
      </div>
    </article>
  );
}

/**
 * A supporting project. Small, quiet and quick to scan — its job is to show
 * range, not to compete with the lead three for attention.
 */
export function CompactCard({ demo, index }: { demo: DemoEntry; index: number }) {
  const s = demo.solution;
  return (
    <article className="flex min-w-0 flex-col" data-reveal style={{ ['--reveal-delay' as string]: `${(index % 3) * 70}ms` }}>
      <Link
        href={`${site.basePath}/${demo.slug}`}
        onClick={() => track('demo_open', { demo: demo.slug, from: 'compact_card', view: 'desktop' })}
        className="group block min-w-0"
      >
        <span className="block overflow-hidden rounded-[10px] bg-paper-2 p-2 transition-colors duration-500 group-hover:bg-ink/6">
          <PreviewStage demo={demo} view="desktop" sizes="(min-width:1024px) 30vw, 90vw" />
        </span>
        <span className="mt-4 flex items-baseline gap-3 font-mono text-[0.6rem] tracking-[0.16em] text-ink-3 uppercase">
          <span className="truncate">{demo.industry}</span>
        </span>
        <h3 className="mt-2 font-display text-[1.15rem] leading-snug font-bold tracking-[-0.02em] transition-colors group-hover:text-flame">
          {s.name}
        </h3>
      </Link>
      <p className="mt-2 text-[0.88rem] leading-relaxed text-ink-3">{s.after}</p>
      <p className="mt-3 text-[0.8rem] text-ink-3">
        Live in <span className="font-medium text-ink">{s.timeline}</span>
      </p>
    </article>
  );
}

export { DeviceToggle };
