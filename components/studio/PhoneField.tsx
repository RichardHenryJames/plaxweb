'use client';

import { useEffect, useState } from 'react';
import { DEFAULT_COUNTRY, countries, countryOf, flagOf, isCountry, PRIORITY_ISO } from '@/lib/countries';

/**
 * Phone entry, split into the country and the number.
 *
 * People know their own number as the national one — an Indian owner thinks
 * "ten digits", not "+91 then ten digits". Asking for the international form
 * is the most reliable way to collect a number that cannot be dialled, so the
 * field asks for what they already know and assembles the rest.
 *
 * The country is submitted as an ISO code, not a dialling code, because
 * dialling codes are not unique (+1 is the US and Canada). The server rebuilds
 * the number from the ISO code, so a tampered hidden field cannot produce a
 * mismatched country and prefix.
 *
 * `detected` is the country resolved from the request on the server, where the
 * page had access to it. When it is absent — on the statically rendered home
 * page — the component asks the geo endpoint once, after mount. Either way the
 * select is a real, working control before any of that resolves, so a failed
 * lookup costs the visitor a scroll rather than the ability to enquire.
 */

const priority = PRIORITY_ISO.map((iso) => countryOf(iso));
const rest = countries.filter((c) => !PRIORITY_ISO.includes(c.iso));

/**
 * Shared field styling without a width. The two controls here size themselves
 * — the select to a fixed width, the input to whatever is left — so they
 * cannot inherit the full-width rule the other fields use.
 */
export const FIELD_BASE =
  'min-h-[46px] rounded-[3px] border border-rule bg-white px-3.5 py-3 text-[0.95rem] text-ink transition-colors placeholder:text-ink-3/60 focus:border-ink focus:outline-none';

export function PhoneField({
  id,
  detected,
  error,
  onEdit,
  describedBy,
}: {
  id: (n: string) => string;
  detected?: string;
  error?: string;
  onEdit: () => void;
  describedBy?: string;
}) {
  const [iso, setIso] = useState(() => (detected && isCountry(detected) ? detected.toUpperCase() : DEFAULT_COUNTRY));
  // Set once the visitor touches the dropdown, so a late geo response cannot
  // overwrite a deliberate choice.
  const [chosen, setChosen] = useState(false);

  useEffect(() => {
    if (detected || chosen) return;
    const ac = new AbortController();
    fetch('/api/geo', { signal: ac.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d?.country && isCountry(d.country)) setIso((current) => (chosen ? current : d.country));
      })
      .catch(() => {
        // Offline, blocked, or not running behind an edge network. The default
        // stands and the visitor can still pick.
      });
    return () => ac.abort();
  }, [detected, chosen]);

  const country = countryOf(iso);
  const hint = country.nsn ? `${country.nsn} digits` : 'National number';

  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <label htmlFor={id('phone')} className="mb-1.5 text-[0.8rem] font-medium text-ink-2">
          Phone / WhatsApp
        </label>
        <span className="mb-1.5 font-mono text-[0.6rem] tracking-[0.1em] text-ink-3 uppercase">{hint}</span>
      </div>

      <div className="flex">
        {/* Two controls, one visual field: the seam between them is a single
            rule rather than two adjacent borders. */}
        <div className="relative shrink-0">
          <select
            name="phoneCountry"
            aria-label="Country dialling code"
            value={iso}
            onChange={(e) => {
              setChosen(true);
              setIso(e.target.value);
              onEdit();
            }}
            // Fixed width, not content width: a native select sizes itself to
            // its widest option, and "Central African Republic +236" would
            // leave no room for the number on a phone.
            className={`${FIELD_BASE} w-[7.25rem] shrink-0 appearance-none rounded-r-none border-r-0 pr-7 pl-3 font-mono text-[0.86rem]`}
          >
            <optgroup label="Common">
              {priority.map((c) => (
                <option key={c.iso} value={c.iso}>
                  {/* Flag then code, and nothing else. Windows has no flag
                      glyphs and falls back to the two regional-indicator
                      letters, which is the country code — so this reads as
                      "IN +91" there and "🇮🇳 +91" everywhere else. Adding the
                      ISO code as well produced "IN IN +91" on Windows. */}
                  {flagOf(c.iso)} +{c.dial}
                </option>
              ))}
            </optgroup>
            <optgroup label="All countries">
              {rest.map((c) => (
                <option key={c.iso} value={c.iso}>
                  {flagOf(c.iso)} {c.name} +{c.dial}
                </option>
              ))}
            </optgroup>
          </select>
          <span
            aria-hidden
            className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-[0.65rem] text-ink-3"
          >
            ▾
          </span>
        </div>

        <input
          id={id('phone')}
          name="phone"
          type="tel"
          required
          inputMode="numeric"
          autoComplete="tel-national"
          maxLength={15}
          // A text input defaults to twenty characters wide, and that intrinsic
          // width becomes a floor for the whole form's min-content size — which
          // in a single-column grid made every sibling 406px wide at a 390px
          // viewport. It stretches to fill the row anyway.
          size={10}
          placeholder={country.nsn ? '9'.repeat(Math.min(country.nsn, 12)) : '9876543210'}
          className={`${FIELD_BASE} min-w-0 flex-1 rounded-l-none`}
          onInput={onEdit}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
        />
      </div>

      <p className="mt-1.5 text-[0.78rem] text-ink-3">
        Just the local number. We add +{country.dial} for {country.name}.
      </p>

      {error && (
        <p id={describedBy} className="mt-1 text-[0.8rem] text-flame">
          {error}
        </p>
      )}
    </div>
  );
}
