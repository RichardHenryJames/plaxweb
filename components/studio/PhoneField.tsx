'use client';

import { useEffect, useState } from 'react';
import { DEFAULT_COUNTRY, countryOf, isCountry } from '@/lib/countries';
import { CountrySelect } from './CountrySelect';

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
 * picker is a real, working control before any of that resolves, so a failed
 * lookup costs the visitor a couple of taps rather than the ability to enquire.
 */

/**
 * Shared field styling without a width. The two controls here size themselves
 * — the picker to a fixed width, the input to whatever is left — so they
 * cannot inherit the full-width rule the other fields use.
 */
export const FIELD_BASE =
  'min-h-[46px] rounded-[3px] border border-rule bg-white px-3.5 py-3 text-[0.95rem] text-ink transition-colors placeholder:text-ink-3/60 focus:border-ink focus:outline-none';

export function PhoneField({
  id,
  detected,
  defaultNumber,
  error,
  onEdit,
  describedBy,
}: {
  id: (n: string) => string;
  detected?: string;
  /** Handed back after a rejected submit, so the number is not retyped. */
  defaultNumber?: string;
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

  return (
    <div>
      <label htmlFor={id('phone')} className="mb-1.5 block text-[0.8rem] font-medium text-ink-2">
        Phone / WhatsApp
      </label>

      <div className="flex">
        <CountrySelect
          name="phoneCountry"
          value={iso}
          onChange={(next) => {
            setChosen(true);
            setIso(next);
            onEdit();
          }}
        />

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
          defaultValue={defaultNumber ?? ''}
          // The placeholder carries the expected length, which is why there is
          // no separate "10 digits" label: the field can say it itself.
          placeholder={country.nsn ? '9'.repeat(Math.min(country.nsn, 12)) : '9876543210'}
          className={`${FIELD_BASE} min-w-0 flex-1 rounded-l-none aria-invalid:border-flame aria-invalid:bg-flame-soft/25`}
          onInput={onEdit}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
        />
      </div>

      {error && (
        <p id={describedBy} className="mt-1.5 text-[0.8rem] text-flame">
          {error}
        </p>
      )}
    </div>
  );
}
