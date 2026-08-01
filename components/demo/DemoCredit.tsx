import Link from 'next/link';
import { quoteUrl, site } from '@/lib/site';
import { getDemo, otherDemos } from '@/lib/demos';
import { breadcrumbSchema, jsonLd, serviceSchema } from '@/lib/metadata';
import { cn } from '@/lib/cn';

/**
 * Sits in each demo's own footer, styled to match that demo. It is the honest
 * "this is a demo" disclosure — the floating chrome is the shortcut.
 *
 * It also carries the only crawlable links between demos. The in-demo switcher
 * lives inside a panel that is not rendered until it is opened, so before this
 * every demo was a dead end that linked to /contact and nothing else. Three
 * sideways links per page is enough for a crawler to see the set as related
 * work rather than eleven unconnected pages.
 *
 * The service and breadcrumb schema are emitted here too, because this is the
 * one component every demo already renders and it knows the slug.
 */
export function DemoCredit({ slug, className }: { slug: string; className?: string }) {
  const demo = getDemo(slug);
  const others = otherDemos(slug, 3);

  return (
    <div className={cn('flex flex-col gap-5 text-[0.78rem] leading-relaxed', className)}>
      {demo && (
        <>
          <script {...jsonLd(serviceSchema(demo))} />
          <script {...jsonLd(breadcrumbSchema(demo))} />
        </>
      )}
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
          <Link href={site.home} className="underline underline-offset-4 hover:no-underline">
            See other demos
          </Link>
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
