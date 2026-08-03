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
  { href: '/#services', label: 'By industry' },
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
            className="hidden rounded-full bg-flame px-5 py-2.5 text-[0.85rem] font-medium text-white transition-colors hover:bg-ink sm:inline-flex"
          >
            Get a quote
          </Link>
          <button
            type="button"
            onClick={() => setMenu((open) => !open)}
            className="-mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
            aria-label={menu ? 'Close menu' : 'Open menu'}
            aria-expanded={menu}
          >
            {/* The bars fold into a cross rather than being swapped for one.
                The same three lines move, so the button reads as one control
                changing state instead of two icons trading places. */}
            <span aria-hidden className="relative block h-3 w-6">
              <span
                className={`absolute inset-x-0 h-px bg-ink transition-transform duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                  menu ? 'top-1/2 rotate-45' : 'top-0 rotate-0'
                }`}
              />
              <span
                className={`absolute inset-x-0 top-1/2 h-px bg-ink transition-opacity duration-200 motion-reduce:transition-none ${
                  menu ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute inset-x-0 h-px bg-ink transition-transform duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                  menu ? 'bottom-1/2 -rotate-45' : 'bottom-0 rotate-0'
                }`}
              />
            </span>
          </button>
        </div>
      </div>
      </header>

      {/* Deliberately a sibling of <header>, not a child. The header carries a
          backdrop-filter, which makes it the containing block for any
          position:fixed descendant — inset-0 then resolved against the 64px
          header instead of the viewport, so the panel painted a 64px strip of
          background and its links spilled over the page.

          It also stays mounted rather than being conditionally rendered. An
          element that only exists while open can animate in but never out —
          it is gone from the DOM before the closing transition can run. Kept
          mounted, `inert` takes it out of the tab order and the accessibility
          tree while closed, which a hidden-but-present panel would otherwise
          pollute. */}
      <div
        inert={!menu}
        className={`fixed inset-x-0 top-16 bottom-0 z-[60] overflow-hidden lg:hidden ${
          menu ? '' : 'pointer-events-none'
        }`}
      >
        {/* Dims the page rather than replacing it. The visitor keeps their
            place, which a full-screen takeover throws away. */}
        <div
          onClick={() => setMenu(false)}
          className={`absolute inset-0 bg-ink/25 backdrop-blur-[2px] transition-opacity duration-500 ease-out motion-reduce:transition-none ${
            menu ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Hangs from under the header and retracts back behind it. The parent
            clips the overshoot, so -translate-y-full reads as sliding up into
            the header rather than flying off the top of the screen.

            The easing matters more than the duration here: this curve moves
            almost all of the distance early and settles slowly, which is what
            makes it feel weighted rather than merely slow.

            The shadow is applied only while open. Closed, the panel's bottom
            edge rests exactly on the header's, so a downward drop shadow was
            still painting a dark band across the top of the page — the shadow
            of something nobody could see.

            `translate` is listed explicitly. Tailwind v4 implements
            -translate-y-full with the standalone CSS `translate` property
            rather than `transform`, so a transition naming only `transform`
            covers nothing and the panel teleports. The built-in
            transition-transform utility includes translate for exactly this
            reason; an arbitrary property list has to say so itself. */}
        <div
          className={`relative max-h-full origin-top overflow-y-auto rounded-b-[1.75rem] bg-paper transition-[translate,box-shadow] duration-[620ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
            menu
              ? 'translate-y-0 border-b border-rule shadow-[0_30px_60px_-24px_rgba(20,18,15,0.45)]'
              : '-translate-y-full border-b border-transparent shadow-none'
          }`}
        >
          <nav aria-label="Mobile" className="flex flex-col px-5 pt-2 pb-7 sm:px-8">
            {NAV.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenu(false)}
                // Staggered so the eye is led down the list instead of having
                // five lines appear at once. Delays only apply on the way in;
                // on the way out everything leaves together with the panel,
                // because a staggered exit reads as hesitation.
                style={{ transitionDelay: menu ? `${120 + i * 55}ms` : '0ms' }}
                className={`flex items-baseline gap-4 border-b border-rule py-4 font-display text-[1.6rem] leading-tight font-semibold tracking-[-0.02em] transition-[opacity,translate] duration-500 ease-out motion-reduce:transition-none ${
                  menu ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
                }`}
              >
                <span className="font-mono text-[0.68rem] font-normal tracking-widest text-ink-3">
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
              style={{ transitionDelay: menu ? `${120 + NAV.length * 55}ms` : '0ms' }}
              className={`mt-6 rounded-full bg-flame px-6 py-4 text-center text-[0.95rem] font-medium text-white transition-[opacity,translate] duration-500 ease-out motion-reduce:transition-none ${
                menu ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
              }`}
            >
              Get a quote
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
