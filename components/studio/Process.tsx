const STEPS = [
  {
    day: 'Day 1',
    title: 'A 30-minute call',
    body: 'What you sell, who buys it, and what a good week looks like. We pick the closest demo and note what has to change.',
  },
  {
    day: 'Day 2–4',
    title: 'Structure & quote',
    body: 'You get a page-by-page plan, a fixed price and a delivery date. No hourly billing, no surprise line items.',
  },
  {
    day: 'Week 1–2',
    title: 'Design & build',
    body: 'We write the copy, art-direct the photography and build the site. You review a live link, not a PDF.',
  },
  {
    day: 'Week 2–4',
    title: 'Launch & handover',
    body: 'Domain, SSL, analytics, Google Business Profile and a 20-minute walkthrough so your team can update content.',
  },
];

export function Process() {
  return (
    <section id="process" className="scroll-mt-20 bg-ink py-20 text-paper sm:py-28">
      <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="font-mono text-[0.66rem] tracking-[0.2em] text-flame-lit uppercase">How a project runs</p>
          <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.2rem)] leading-[1.03] font-extrabold tracking-[-0.032em]">
            Four steps. Two to four weeks. One fixed price.
          </h2>
        </div>

        <ol className="mt-14 grid gap-px overflow-hidden border border-paper/12 bg-paper/12 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <li
              key={step.title}
              data-reveal
              style={{ ['--reveal-delay' as string]: `${i * 80}ms` }}
              className="flex flex-col bg-ink p-7 sm:p-8"
            >
              <span className="font-mono text-[0.62rem] tracking-[0.18em] text-flame-lit uppercase">{step.day}</span>
              <h3 className="mt-5 font-display text-[1.35rem] leading-snug font-semibold tracking-[-0.02em]">
                {step.title}
              </h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-paper/62">{step.body}</p>
              <span aria-hidden className="mt-auto pt-10 font-display text-[2.6rem] leading-none font-extrabold text-paper/10">
                {String(i + 1).padStart(2, '0')}
              </span>
            </li>
          ))}
        </ol>

        <p className="mt-10 max-w-2xl text-[0.95rem] leading-relaxed text-paper/55">
          Content is the usual reason a website is late. We write the first draft from your existing material and the
          demo you picked, so you are editing rather than staring at a blank page.
        </p>
      </div>
    </section>
  );
}
