/**
 * The objection nobody says out loud.
 *
 * Every owner being sold a website has already seen a $40 theme. Ignoring
 * that makes our price look arbitrary. Conceding the cases where a template is
 * genuinely the right call is what makes the rest of it believable — this is
 * not an argument against templates, it is a line between two different jobs.
 */
const points: [string, string][] = [
  ['We start with the enquiry, not the layout', 'The salon booking request arrives with service, stylist and time already filled in.'],
  ['Your prices, your rooms, your photographs', 'Your own service menus, fee tables, floor plans and tariffs, in place of placeholder copy.'],
  ['The phone version gets its own layout', 'Open any demo at 390px. Nothing is pinch-to-zoom or out of thumb reach.'],
  ['You own it outright', 'Code, domain and content are yours. No monthly licence for the site itself.'],
];

export function WhyNotATemplate() {
  return (
    <section className="border-b border-rule py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="min-w-0">
            <p className="font-mono text-[0.66rem] tracking-[0.2em] text-flame uppercase">The fair question</p>
            <h2 className="mt-4 font-display text-[clamp(1.8rem,4vw,2.7rem)] leading-[1.06] font-extrabold tracking-[-0.03em]">
              Why not just buy a&nbsp;$40 template?
            </h2>
            <p className="mt-5 text-[1rem] leading-relaxed text-ink-2">
              If you need your name, address, phone number and a few photographs, buy one. It will be live this week
              and we will tell you so on the call.
            </p>
            <p className="mt-4 text-[1rem] leading-relaxed text-ink-2">
              Come to us when the website has a job to do: taking bookings, qualifying enquiries, filling an admission
              list, showing inventory, cutting the same phone call you answer ten times a day.
            </p>
          </div>

          <ol className="min-w-0 divide-y divide-rule border-t border-rule">
            {points.map(([title, body], i) => (
              <li key={title} className="flex gap-5 py-5 sm:gap-8" data-reveal style={{ ['--reveal-delay' as string]: `${i * 60}ms` }}>
                <span aria-hidden className="mt-1 font-mono text-[0.7rem] text-flame">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-[1.05rem] leading-snug font-bold tracking-[-0.015em]">{title}</h3>
                  <p className="mt-1.5 text-[0.92rem] leading-relaxed text-ink-3">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
