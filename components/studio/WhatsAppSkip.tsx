'use client';

import { useEffect, useState } from 'react';
import { track } from '@/lib/analytics';
import { whatsappUrl } from '@/lib/site';

/**
 * The "skip the form" WhatsApp link, written from whatever is in the form.
 *
 * Plenty of people fill in half the form, decide it is quicker to just message,
 * and abandon what they typed. The message they then send opens with nothing —
 * so the enquiry arrives anonymous and everything they had already told us is
 * lost. This reads the form as they type and puts their name into the message.
 *
 * It listens to the form's input events rather than lifting the fields into
 * shared state. The link only needs a value at the moment it is clicked, so
 * sharing state would mean re-rendering the whole form on every keystroke to
 * keep one href current. The two components also sit in different columns of
 * the page, and threading a context between them for one string is more
 * machinery than the problem deserves.
 */
export function WhatsAppSkip({
  solution,
  brand,
  className,
  children,
}: {
  /** Set when the visitor arrived from a demo, which the server already knows. */
  solution?: string;
  brand?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const [name, setName] = useState('');

  useEffect(() => {
    const form = document.querySelector('form');
    if (!form) return;

    const read = () => {
      const field = form.querySelector<HTMLInputElement>('input[name="name"]');
      // A single word is enough to open with; anything shorter is a typo in
      // progress and reads worse than no name at all.
      const typed = field?.value.trim() ?? '';
      setName(typed.length >= 2 ? typed : '');
    };

    read();
    form.addEventListener('input', read);
    return () => form.removeEventListener('input', read);
  }, []);

  const opening = name ? `Hi PlaxWeb, this is ${name}.` : 'Hi PlaxWeb,';
  const about = solution
    ? ` I would like a ${solution}${brand ? ` for my business (saw the ${brand} demo)` : ''}.`
    : ' I would like a quote for a website.';

  return (
    <a
      href={whatsappUrl(`${opening}${about}`)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track('whatsapp_click', { from: 'skip_form', named: name ? 'yes' : 'no' })}
      className={className}
    >
      {children}
    </a>
  );
}
