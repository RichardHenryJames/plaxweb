'use client';

import { useEffect, useState } from 'react';
import { getDemo } from '@/lib/demos';
import { track } from '@/lib/analytics';
import { whatsappUrl } from '@/lib/site';

/**
 * The "skip the form" WhatsApp link, written from whatever is in the form.
 *
 * Plenty of people fill in half the form, decide it is quicker to just message,
 * and abandon what they typed. The message they then send opens with nothing —
 * so the enquiry arrives anonymous and everything they had already told us is
 * lost. This reads the form as they fill it in.
 *
 * It reads all three fields that say anything useful, not just the name. The
 * demo and category arrive two different ways: in the URL when someone clicked
 * through from a demo, or from the dropdowns when they landed on the page cold
 * and chose for themselves. Watching only the URL meant a visitor who picked
 * "Property Enquiry Website" by hand still got a message that said nothing
 * about property.
 *
 * It listens to the form's events rather than lifting the fields into shared
 * state. The link only needs a value at the moment it is clicked, so sharing
 * state would mean re-rendering the whole form on every keystroke to keep one
 * href current. The two components also sit in different columns of the page.
 */

type Live = { name: string; demo: string; category: string };

export function WhatsAppSkip({
  solution,
  brand,
  className,
  children,
}: {
  /** From the URL, when the visitor arrived straight from a demo. */
  solution?: string;
  brand?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const [live, setLive] = useState<Live>({ name: '', demo: '', category: '' });

  useEffect(() => {
    const form = document.querySelector('form');
    if (!form) return;

    const read = () => {
      const value = (sel: string) =>
        form.querySelector<HTMLInputElement | HTMLSelectElement>(sel)?.value.trim() ?? '';
      const name = value('input[name="name"]');
      setLive({
        // A single letter is a typo in progress, and reads worse than no name.
        name: name.length >= 2 ? name : '',
        demo: value('select[name="referenceDemo"]'),
        category: value('select[name="category"]'),
      });
    };

    read();
    // A select fires input in every current browser, but change is what it has
    // always fired, and listening for both costs nothing.
    form.addEventListener('input', read);
    form.addEventListener('change', read);
    return () => {
      form.removeEventListener('input', read);
      form.removeEventListener('change', read);
    };
  }, []);

  // What they picked in the form beats what the URL said: it is the more
  // recent statement of what they actually want.
  const picked = live.demo && live.demo !== 'none' ? getDemo(live.demo) : undefined;
  const wantSolution = picked?.solution.name ?? solution;
  const wantBrand = picked?.brand ?? brand;

  const opening = live.name ? `Hi PlaxWeb, this is ${live.name}.` : 'Hi PlaxWeb,';

  let about: string;
  if (wantSolution) {
    about = ` I would like a ${wantSolution} for my business${wantBrand ? ` (saw the ${wantBrand} demo)` : ''}.`;
  } else if (live.category) {
    // "Real estate / Builder" is a filing label, not something anyone says.
    const trade = live.category.split(' / ')[0].toLowerCase();
    about = ` I run a ${trade} business and would like a quote for a website.`;
  } else {
    about = ' I would like a quote for a website.';
  }

  return (
    <a
      href={whatsappUrl(`${opening}${about}`)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() =>
        track('whatsapp_click', {
          from: 'skip_form',
          named: live.name ? 'yes' : 'no',
          demo: live.demo || 'none',
        })
      }
      className={className}
    >
      {children}
    </a>
  );
}
