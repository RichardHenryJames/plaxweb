'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { track } from '@/lib/analytics';
import { site } from '@/lib/site';

/**
 * Root-relative, not bare fragments. These sections only exist on the home
 * page, so `#demos` did nothing at all on /contact — it just rewrote the hash
 * and left the visitor where they were.
 */
const NAV = [
  { href: '/#demos', label: 'Demos' },
  { href: '/#build', label: 'What we build' },
  { href: '/#process', label: 'Process' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/#faq', label: 'FAQ' },
];

export function StudioHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menu ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(false);
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [menu]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-paper/92 backdrop-blur-md transition-[border-color,box-shadow] duration-300 ${
          scrolled ? 'border-b border-rule' : 'border-b border-transparent'
        }`}
      >
      <div className="mx-auto flex h-16 max-w-[84rem] items-center justify-between gap-6 px-5 sm:px-8">
        <Link href={site.home} className="group flex min-h-11 items-baseline gap-2 py-2" aria-label="PlaxWeb home">
          <span className="font-display text-[1.35rem] leading-none font-extrabold tracking-[-0.03em]">
            Plax<span className="text-flame">Web</span>
          </span>
          <span className="hidden font-mono text-[0.6rem] tracking-[0.18em] text-ink-3 uppercase sm:inline">
            by PlaxLabs
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative text-[0.9rem] text-ink-2 transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-flame after:transition-all after:duration-300 hover:text-ink hover:after:w-full"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={`${site.basePath}/contact`}
            onClick={() => track('contact_start', { from: 'header' })}
            className="hidden rounded-full bg-ink px-5 py-2.5 text-[0.85rem] font-medium text-paper transition-colors hover:bg-flame sm:inline-flex"
          >
            Get a quote
          </Link>
          <button
            type="button"
            onClick={() => setMenu(true)}
            className="-mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
            aria-label="Open menu"
            aria-expanded={menu}
          >
            <span aria-hidden className="relative block h-3 w-6">
              <span className="absolute inset-x-0 top-0 h-px bg-ink" />
              <span className="absolute inset-x-0 top-1/2 h-px bg-ink" />
              <span className="absolute inset-x-0 bottom-0 h-px bg-ink" />
            </span>
          </button>
        </div>
      </div>
      </header>

      {/* Deliberately a sibling of <header>, not a child. The header carries a
          backdrop-filter, which makes it the containing block for any
          position:fixed descendant — inset-0 then resolved against the 64px
          header instead of the viewport, so the panel painted a 64px strip of
          background and its links spilled over the page. */}
      {menu && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-paper lg:hidden">
          <div className="flex h-16 items-center justify-between px-5 sm:px-8">
            <span className="font-display text-[1.35rem] leading-none font-extrabold tracking-[-0.03em]">
              Plax<span className="text-flame">Web</span>
            </span>
            <button
              type="button"
              onClick={() => setMenu(false)}
              className="-mr-2 flex h-11 w-11 items-center justify-center text-2xl leading-none"
              aria-label="Close menu"
            >
              <span aria-hidden>×</span>
            </button>
          </div>
          <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center gap-1 px-5 pb-24 sm:px-8">
            {NAV.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenu(false)}
                className="border-b border-rule py-4 font-display text-[1.9rem] leading-tight font-semibold tracking-[-0.02em]"
              >
                <span className="mr-4 font-mono text-[0.7rem] font-normal tracking-widest text-ink-3">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {item.label}
              </a>
            ))}
            <Link
              href={`${site.basePath}/contact`}
              onClick={() => {
                setMenu(false);
                track('contact_start', { from: 'mobile_menu' });
              }}
              className="mt-8 rounded-full bg-flame px-6 py-4 text-center text-[0.95rem] font-medium text-white"
            >
              Get a quote
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
