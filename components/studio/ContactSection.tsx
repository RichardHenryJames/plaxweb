import Link from 'next/link';
import { LeadForm } from './LeadForm';
import { WhatsAppSkip } from './WhatsAppSkip';
import { Blob } from '@/components/ui/Blob';
import { site } from '@/lib/site';

/**
 * The closing block, and the only place on the site that goes full colour.
 *
 * Everything above it is paper and ink, so this reads as arrival rather than
 * decoration — the page has been quiet for its whole length and then commits.
 * Two soft shapes sit behind the type at very low contrast: a flat colour
 * panel this size looks like a printing error, and a shape gives it depth
 * without an image to download.
 *
 * The headline is set as large as the column allows. By this point the
 * visitor has already seen the work; what is left is to make the next step
 * unmissable, and a modest heading here would undersell it.
 */
export function ContactSection() {
  return (
    <section id="contact" className="relative isolate scroll-mt-20 overflow-hidden bg-flame py-20 text-white sm:py-28">
      {/* Deliberately low contrast. These should register as depth, not as
          graphics competing with the headline. */}
      <Blob
        shape="spill"
        className="pointer-events-none absolute -top-24 -left-32 h-[36rem] w-[36rem] text-white/[0.07] sm:-left-20"
      />
      <Blob
        shape="drift"
        className="pointer-events-none absolute -right-40 -bottom-40 hidden h-[42rem] w-[52rem] text-black/[0.06] lg:block"
      />

      <div className="relative mx-auto max-w-[84rem] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="font-mono text-[0.66rem] tracking-[0.2em] text-white/70 uppercase">Get a quote</p>
            <h2 className="mt-5 font-display text-[clamp(3rem,9vw,6.5rem)] leading-[0.9] font-extrabold tracking-[-0.045em]">
              Let&rsquo;s
              <br />
              talk.
            </h2>
            <p className="mt-7 max-w-md text-[1.05rem] leading-relaxed text-white/85">
              Tell us which demo was closest and what your business actually needs. You get a fixed price, a delivery
              date and an honest note on what we would change, usually within a working day.
            </p>

            {/* Two routes, equally weighted. Plenty of owners will never fill
                in a form but will happily send a message. */}
            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">
              <WhatsAppSkip className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-white px-7 text-[0.93rem] font-medium text-flame transition-colors hover:bg-ink hover:text-white">
                Message us on WhatsApp
              </WhatsAppSkip>
              <a
                href={`tel:+${site.phoneRaw}`}
                className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-white/50 px-7 text-[0.93rem] font-medium transition-colors hover:border-white hover:bg-white/10"
              >
                {site.phoneDisplay}
              </a>
            </div>

            <dl className="mt-10 grid gap-6 border-t border-white/25 pt-7 sm:grid-cols-2">
              <div>
                <dt className="font-mono text-[0.62rem] tracking-[0.16em] text-white/65 uppercase">Studio hours</dt>
                <dd className="mt-1.5 text-[0.95rem] text-white">{site.hours}</dd>
              </div>
              <div>
                <dt className="font-mono text-[0.62rem] tracking-[0.16em] text-white/65 uppercase">Not sure yet</dt>
                <dd className="mt-1.5 text-[0.95rem] text-white">
                  <Link href="/#services" className="underline underline-offset-4 hover:no-underline">
                    Find your industry
                  </Link>{' '}
                  instead.
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[0.62rem] tracking-[0.16em] text-white/65 uppercase">See the work</dt>
                <dd className="mt-1.5 text-[0.95rem] text-white">
                  <a
                    href={site.social.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 hover:no-underline"
                  >
                    {site.social.instagram.handle}
                  </a>{' '}
                  on {site.social.instagram.name}.
                </dd>
              </div>
            </dl>
          </div>

          <LeadForm compact />
        </div>
      </div>
    </section>
  );
}
