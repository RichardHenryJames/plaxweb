'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Applies the scroll-reveal transition to every [data-reveal] element on the
 * page with a single shared observer. Elements reveal once and are then
 * unobserved, so long pages stay cheap. Re-scans on route change because the
 * layout that hosts this does not remount.
 *
 * Markup opts in with `data-reveal` (plus an optional `--reveal-delay` for a
 * stagger).
 */
export function RevealProvider() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));

    if (reduce || !('IntersectionObserver' in window)) {
      nodes.forEach((n) => n.setAttribute('data-reveal', 'in'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute('data-reveal', 'in');
          io.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );

    nodes.forEach((n) => {
      // Anything already on screen at load should not fade in.
      if (n.getBoundingClientRect().top < window.innerHeight * 0.92) {
        n.setAttribute('data-reveal', 'in');
      } else {
        io.observe(n);
      }
    });

    return () => io.disconnect();
  }, [pathname]);

  return null;
}
