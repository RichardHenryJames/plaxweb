'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { countries, countryOf, flagSrc, PRIORITY_ISO, type Country } from '@/lib/countries';

/**
 * Country picker for the phone field.
 *
 * This is a hand-built combobox rather than a <select>, and that is a real
 * cost, so it should be justified: an <option> can only contain text, which
 * means a native select cannot show a flag image. Emoji flags do not solve it
 * either — Windows has no flag glyphs and renders them as two letters.
 *
 * What the custom control buys beyond flags is search. Scrolling a native list
 * of 182 countries on a phone is genuinely unpleasant; typing three letters is
 * not. That is the part that actually helps someone filling in the form.
 *
 * What it costs is that the country cannot be changed without JavaScript. The
 * value still submits — it is a real hidden input, pre-set from the visitor's
 * own country — so a no-JS visitor can still send the enquiry, they just
 * cannot change the prefix. That is an acceptable trade for a form that is
 * useless without JavaScript anyway, since it posts through a server action.
 */

const ORDERED: Country[] = [
  ...PRIORITY_ISO.map((iso) => countryOf(iso)),
  ...countries.filter((c) => !PRIORITY_ISO.includes(c.iso)),
];
const PRIORITY_COUNT = PRIORITY_ISO.length;

function Flag({ iso, className = '' }: { iso: string; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={flagSrc(iso)}
      alt=""
      width={21}
      height={14}
      loading="lazy"
      decoding="async"
      // A ring rather than a border: several flags are white at the edge and
      // would otherwise dissolve into the field behind them.
      className={`h-[14px] w-[21px] shrink-0 rounded-[1px] object-cover ring-1 ring-ink/15 ${className}`}
    />
  );
}

export function CountrySelect({
  value,
  onChange,
  name,
}: {
  value: string;
  onChange: (iso: string) => void;
  name: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);

  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listId = useId();

  const selected = countryOf(value);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ORDERED;
    // Dialling code matches too, so someone who knows "+971" but not how we
    // spell the country still finds it.
    const digits = q.replace(/[^0-9]/g, '');
    return ORDERED.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.iso.toLowerCase() === q ||
        (digits.length > 0 && c.dial.startsWith(digits))
    );
  }, [query]);

  // The highlighted row belongs to the result set it was chosen against, so it
  // resets during render rather than in an effect — by the time an effect ran,
  // a stale index would already have been used to render a highlight.
  const [activeFor, setActiveFor] = useState(query);
  if (activeFor !== query) {
    setActiveFor(query);
    setActive(0);
  }

  useEffect(() => {
    if (!open) return;
    searchRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const onPointer = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onPointer);
    };
  }, [open]);

  // Keeps the highlighted row in view when moving through a long list with the
  // keyboard, which is the whole point of having arrow keys.
  useEffect(() => {
    if (!open) return;
    listRef.current?.querySelector<HTMLElement>(`[data-i="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [active, open]);

  const commit = (c: Country) => {
    onChange(c.iso);
    setOpen(false);
    setQuery('');
  };

  const onSearchKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[active]) commit(results[active]);
    } else if (e.key === 'Tab') {
      setOpen(false);
    }
  };

  return (
    // The wrapper is lifted while open, not just the panel. Without it the
    // fields further down the form — which come later in paint order — showed
    // through the bottom of the list.
    <div ref={rootRef} className={`relative shrink-0 ${open ? 'z-50' : ''}`}>
      {/* The value the form actually posts. Set before any of this renders, so
          it is correct even if the visitor never opens the list. */}
      <input type="hidden" name={name} value={selected.iso} />

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-label={`Country code: ${selected.name}, plus ${selected.dial}. Change`}
        className="flex h-[46px] min-h-[46px] w-[6.9rem] items-center gap-1.5 rounded-[3px] rounded-r-none border border-r-0 border-rule bg-white pr-1.5 pl-3 text-left transition-colors hover:bg-paper-2 focus:border-ink focus:outline-none"
      >
        <Flag iso={selected.iso} />
        <span className="min-w-0 flex-1 truncate font-mono text-[0.86rem] text-ink">+{selected.dial}</span>
        <span aria-hidden className="text-[0.6rem] text-ink-3">
          ▾
        </span>
      </button>

      {open && (
        <div className="absolute top-[calc(100%+4px)] left-0 z-50 w-[min(20rem,calc(100vw-2.5rem))] overflow-hidden rounded-[4px] border border-rule bg-white shadow-[0_20px_50px_-16px_rgba(0,0,0,0.35)]">
          <div className="border-b border-rule p-2">
            <input
              ref={searchRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onSearchKey}
              placeholder="Search country or code"
              aria-label="Search countries"
              aria-controls={listId}
              className="h-9 w-full min-w-0 rounded-[3px] border border-rule px-2.5 text-[0.9rem] focus:border-ink focus:outline-none"
            />
          </div>

          <ul ref={listRef} id={listId} role="listbox" aria-label="Country" className="max-h-64 overflow-y-auto py-1">
            {results.length === 0 && <li className="px-3 py-3 text-[0.86rem] text-ink-3">No country matches that.</li>}
            {results.map((c, i) => (
              // role="none" so the option below is a direct child of the
              // listbox in the accessibility tree, which the role requires.
              <li key={c.iso} data-i={i} role="none">
                <button
                  type="button"
                  role="option"
                  aria-selected={c.iso === selected.iso}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => commit(c)}
                  className={`flex w-full items-center gap-2.5 px-3 py-2 text-left text-[0.9rem] transition-colors ${
                    i === active ? 'bg-paper-2' : ''
                  } ${c.iso === selected.iso ? 'font-medium' : ''}`}
                >
                  <Flag iso={c.iso} />
                  <span className="min-w-0 flex-1 truncate">{c.name}</span>
                  <span className="shrink-0 font-mono text-[0.8rem] text-ink-3">+{c.dial}</span>
                </button>
                {/* Only meaningful in the unfiltered list, where the first few
                    are the markets we sell into most. */}
                {!query && i === PRIORITY_COUNT - 1 && <hr className="my-1 border-rule" />}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
