import { LeadForm } from './LeadForm';
import { WhatsAppSkip } from './WhatsAppSkip';
import { site } from '@/lib/site';

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-20 bg-paper-2 py-20 sm:py-28">
      <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="font-mono text-[0.66rem] tracking-[0.2em] text-flame uppercase">Get a quote</p>
            <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.2rem)] leading-[1.03] font-extrabold tracking-[-0.032em]">
              Tell us which demo you liked.
            </h2>
            <p className="mt-5 max-w-md text-[1rem] leading-relaxed text-ink-2">
              That single answer tells us more than a brief. We reply with a fixed price, a delivery date and what we
              would change for your business.
            </p>

            {/* Two routes, equally weighted. Plenty of owners will never fill
                in a form but will happily send a message. */}
            <WhatsAppSkip className="mt-7 inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full border border-ink px-6 text-[0.92rem] font-medium transition-colors hover:bg-ink hover:text-paper">
              Message us on WhatsApp
            </WhatsAppSkip>
            <p className="mt-3 text-[0.82rem] text-ink-3">Or fill in the form. It takes about twenty seconds.</p>

            <dl className="mt-9 space-y-5 border-t border-rule pt-7">
              <div>
                <dt className="font-mono text-[0.62rem] tracking-[0.16em] text-ink-3 uppercase">Prefer to talk</dt>
                <dd className="mt-1.5">
                  <a href={`tel:+${site.phoneRaw}`} className="text-[1.05rem] font-medium underline-offset-4 hover:underline">
                    {site.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[0.62rem] tracking-[0.16em] text-ink-3 uppercase">Studio hours</dt>
                <dd className="mt-1.5 text-[0.95rem] text-ink-2">{site.hours}</dd>
              </div>
            </dl>
          </div>

          <LeadForm compact />
        </div>
      </div>
    </section>
  );
}
