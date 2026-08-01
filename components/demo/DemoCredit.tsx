import Link from 'next/link';
import { quoteUrl, site } from '@/lib/site';
import { otherDemos } from '@/lib/demos';
import { serviceForDemo } from '@/lib/services';
import { cn } from '@/lib/cn';

/**
 * Sits in each demo's own footer, styled to match that demo. It is the honest
 * "this is a demo" disclosure — the floating chrome is the shortcut.
 *
 * It also carries the only crawlable links out of a demo. Demos are noindex,
 * so their job here is to pass authority up to the service page that explains
 * the work and sideways to related demos, rather than to rank themselves.
 *
 * The Service and breadcrumb schema used to be emitted here. It moved to the
 * service page, where the surrounding content actually agrees with it.
 */
export function DemoCredit({ slug, className }: { slug: string; className?: string }) {
  const others = otherDemos(slug, 3);
  const service = serviceForDemo(slug);

  return (
    <div className={cn('flex flex-col gap-5 text-[0.78rem] leading-relaxed', className)}>
      <div className="flex flex-col gap-x-6 gap-y-2 sm:flex-row sm:items-center sm:justify-between">
        <p>
          A fictional business. Website designed &amp; built by{' '}
          <Link href={site.home} className="underline underline-offset-4 hover:no-underline">
            PlaxWeb
          </Link>
          .
        </p>
        <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <Link href={quoteUrl(slug)} className="underline underline-offset-4 hover:no-underline">
            Build something like this
          </Link>
          {service && (
            <Link
              href={`${site.basePath}/${service.slug}`}
              className="underline underline-offset-4 hover:no-underline"
            >
              About {service.primary}
            </Link>
          )}
        </p>
      </div>

      <nav aria-label="Other website demos" className="flex flex-wrap items-baseline gap-x-4 gap-y-1 opacity-80">
        <span>Also built:</span>
        {others.map((d) => (
          <Link
            key={d.slug}
            href={`${site.basePath}/${d.slug}`}
            className="inline-flex min-h-6 items-center underline underline-offset-4 hover:no-underline"
          >
            {d.solution.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
