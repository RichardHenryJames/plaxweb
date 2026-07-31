'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { catalogue } from '@/lib/demos';
import { track } from '@/lib/analytics';
import { site } from '@/lib/site';
import { DeviceToggle, PreviewStage, type PreviewView } from './DemoShowcase';

const ROTATE_MS = 4600;

/**
 * The hero proof: a real screenshot of a real demo, in a real device frame,
 * with the desktop/mobile switch right there. It cycles slowly so a visitor
 * sees three or four different industries without touching anything — and
 * stops the moment they interact, because at that point they are steering.
 */
export function HeroDevice() {
  const [index, setIndex] = useState(0);
  const [view, setView] = useState<PreviewView>('desktop');
  const [paused, setPaused] = useState(false);
  const frame = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % catalogue.length), ROTATE_MS);
    return () => clearInterval(t);
  }, [paused]);

  const demo = catalogue[index];

  return (
    <div
      ref={frame}
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
    >
      <div className="flex items-center justify-between gap-4">
        <p aria-live="polite" className="min-w-0 text-[0.82rem] text-ink-3">
          <span className="font-medium text-ink">{demo.solution.name}</span>
          <span className="mx-2 text-rule">·</span>
          <span className="truncate">{demo.brand}</span>
        </p>
        <DeviceToggle
          value={view}
          onChange={(v) => {
            setView(v);
            setPaused(true);
            track('demo_preview_toggle', { demo: demo.slug, view: v, from: 'hero' });
          }}
        />
      </div>

      <div className="relative mt-3 rounded-[12px] bg-paper-2 p-3 sm:p-4">
        {catalogue.map((d, i) => (
          <div
            key={d.slug}
            aria-hidden={i !== index}
            className={`transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              i === index ? 'opacity-100' : 'pointer-events-none absolute inset-3 opacity-0 sm:inset-4'
            }`}
          >
            {/* Only the active shot (and the one queued next) is ever mounted,
                so the hero never downloads twenty screenshots. */}
            {(i === index || i === (index + 1) % catalogue.length) && (
              <PreviewStage
                demo={d}
                view={view}
                priority={i === 0}
                sizes="(min-width:1280px) 46vw, (min-width:1024px) 50vw, 92vw"
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div role="tablist" aria-label="Choose a demo to preview" className="flex gap-1.5 sm:flex-1">
          {catalogue.map((d, i) => (
            <button
              key={d.slug}
              role="tab"
              aria-selected={i === index}
              aria-label={d.solution.name}
              onClick={() => {
                setIndex(i);
                setPaused(true);
              }}
              className="group/dot flex h-7 min-w-6 flex-1 items-center"
            >
              <span
                aria-hidden
                className={`h-[3px] w-full rounded-full transition-colors duration-300 ${
                  i === index ? 'bg-flame' : 'bg-rule group-hover/dot:bg-ink/35'
                }`}
              />
            </button>
          ))}
        </div>
        <Link
          href={`${site.basePath}/${demo.slug}`}
          onClick={() => track('demo_open', { demo: demo.slug, from: 'hero', view })}
          className="inline-flex min-h-[32px] shrink-0 self-start border-b border-ink pb-0.5 text-[0.82rem] font-medium transition-colors hover:border-flame hover:text-flame sm:self-auto"
        >
          Open this demo <span aria-hidden>&nbsp;→</span>
        </Link>
      </div>
    </div>
  );
}
