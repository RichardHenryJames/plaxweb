'use client';

import { useEffect } from 'react';
import { track, type PlaxEvent } from '@/lib/analytics';

/** Fires one page-level event on mount. Server components can't use hooks. */
export function TrackView({ event, props }: { event: PlaxEvent; props?: Record<string, string | number | boolean> }) {
  useEffect(() => {
    track(event, props);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
