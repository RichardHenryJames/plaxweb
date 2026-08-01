const QA = [
  {
    q: 'Can I just get one of these demo websites for my business?',
    a: 'Yes, that is what they are for. We take the demo closest to your business, replace the fictional brand with yours, restructure whatever does not fit, and shoot or source the photography. It is faster and cheaper than starting from a blank page, and you already know what you are getting.',
  },
  {
    q: 'Do I need to buy a domain and hosting separately?',
    a: 'A domain is yours to own, so we ask you to buy it (about $12 or ₹900 a year from any registrar — Cloudflare, Namecheap, GoDaddy), or we buy it and transfer it to you. Hosting is included: these sites run on Vercel, which is free at small-business traffic and stays fast without a server to maintain.',
  },
  {
    q: 'Will my website show up on Google?',
    a: 'We handle the on-page part properly: titles, descriptions, structured data, a sitemap, fast loading and clean headings. We also set up or clean up your Google Business Profile, which is what actually drives local searches in any city. Ranking for competitive terms takes months and usually needs ongoing work; we will tell you honestly what to expect.',
  },
  {
    q: 'Can my team update the content ourselves?',
    a: 'For most Starter and Business sites, text and price changes are quick for us and included for the first 30 days, then charged in small blocks. If you need to publish regularly, whether that is offers, notices or new products, we add a content manager so your team can edit without touching code.',
  },
  {
    q: 'How do enquiries reach me?',
    a: 'Every form emails you instantly and can also drop into WhatsApp, Slack or a Google Sheet. Where WhatsApp is how your customers already talk to businesses, the buttons are pre-filled WhatsApp messages and click-to-call. Where it is not, the same buttons become SMS, iMessage or a booking link. We set this to your market, not ours.',
  },
  {
    q: 'What do you need from me to start?',
    a: 'Your logo if you have one, a rough list of services or products with prices, any existing photos, and 30 minutes on a call. We write the first draft of the copy. If your photos are weak, we will say so and suggest a shoot or licensed alternatives.',
  },
  {
    q: 'What are the payment terms?',
    a: '40% to start, 40% when the design is approved, 20% before launch. A proper invoice for every payment, with GST where it applies. We take bank transfer, card and international payment links, and we quote in your currency. If you cancel before the design stage, the first instalment covers the work done and nothing more is owed.',
  },
  {
    q: 'Where are your clients based?',
    a: 'The studio works in English with businesses anywhere, and our published prices are shown in ₹ and $ for that reason — we also quote in AED, GBP and EUR. Several demos are set in Indian cities because that is where a lot of our work has been, but nothing about the build is specific to one country: currency, language, payment methods, booking flows and the way customers get in touch are all set to your market. Calls are scheduled around your time zone, not ours.',
  },
];

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 border-b border-rule py-20 sm:py-28">
      <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="font-mono text-[0.66rem] tracking-[0.2em] text-flame uppercase">Before you ask</p>
            <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.2rem)] leading-[1.03] font-extrabold tracking-[-0.032em]">
              Before you ask.
            </h2>
          </div>

          <div className="divide-y divide-rule border-t border-b border-rule">
            {QA.map((item) => (
              <details key={item.q} className="group">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-[1.02rem] leading-snug font-medium marker:content-none [&::-webkit-details-marker]:hidden">
                  <span>{item.q}</span>
                  <span
                    aria-hidden
                    className="relative mt-2 h-3 w-3 shrink-0 text-flame transition-transform duration-300 group-open:rotate-45"
                  >
                    <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-current" />
                    <span className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-current" />
                  </span>
                </summary>
                <p className="max-w-2xl pr-8 pb-6 text-[0.97rem] leading-relaxed text-ink-2">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Same content, shaped for schema.org FAQPage. */
export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: QA.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};
