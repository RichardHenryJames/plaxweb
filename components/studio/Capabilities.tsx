const ITEMS = [
  {
    title: 'Business websites',
    body: 'The five to twelve pages a real business needs — services, pricing, proof, team, location, contact. Written to be read on a phone in ninety seconds.',
  },
  {
    title: 'Enquiry & booking flows',
    body: 'Appointment requests, admission enquiries, site-visit bookings, table reservations. Fields chosen so your team can act on the lead without a follow-up call.',
  },
  {
    title: 'Menus, catalogues & tariffs',
    body: 'Menus that load instantly instead of a PDF nobody can pinch-zoom. Product and package catalogues with prices, sizes and a WhatsApp order button.',
  },
  {
    title: 'WhatsApp & call routing',
    body: 'Every enquiry route ends where Indian customers actually are. Pre-filled WhatsApp messages, click-to-call, and a lead copy in your inbox.',
  },
  {
    title: 'Local SEO groundwork',
    body: 'Titles, descriptions, structured data, sitemap, image alt text and a Google Business Profile checklist so you show up when someone searches your area.',
  },
  {
    title: 'Speed & Core Web Vitals',
    body: 'Images sized and re-encoded per device, fonts self-hosted, almost no JavaScript. Pages open before your customer decides to leave.',
  },
];

export function Capabilities() {
  return (
    <section id="build" className="scroll-mt-20 border-b border-rule py-20 sm:py-28">
      <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="font-mono text-[0.66rem] tracking-[0.2em] text-flame uppercase">What we build</p>
            <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.2rem)] leading-[1.03] font-extrabold tracking-[-0.032em]">
              We build the six things a business site has to do.
            </h2>
            <p className="mt-5 max-w-md text-[1rem] leading-relaxed text-ink-2">
              Everything else is decoration. If a section on your website does not help someone decide, understand or
              get in touch, we will argue against building it.
            </p>
          </div>

          <ul>
            {ITEMS.map((item, i) => (
              <li
                key={item.title}
                data-reveal
                style={{ ['--reveal-delay' as string]: `${i * 60}ms` }}
                className="grid grid-cols-[2.2rem_1fr] gap-x-4 border-t border-rule py-7 first:border-t-0 first:pt-0 sm:grid-cols-[3rem_1fr] sm:gap-x-6"
              >
                <span className="pt-1 font-mono text-[0.68rem] tracking-widest text-flame">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-display text-[1.28rem] leading-snug font-semibold tracking-[-0.02em] sm:text-[1.4rem]">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 max-w-2xl text-[0.98rem] leading-relaxed text-ink-2">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
