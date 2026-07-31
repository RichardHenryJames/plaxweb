import Link from 'next/link';
import { quoteUrl, site } from '@/lib/site';
import { cn } from '@/lib/cn';

/**
 * Sits in each demo's own footer, styled to match that demo. It is the honest
 * "this is a demo" disclosure — the floating chrome is the shortcut.
 */
export function DemoCredit({ slug, className }: { slug: string; className?: string }) {
  return (
    <div
      className={cn(
        'flex flex-col gap-x-6 gap-y-2 text-[0.78rem] leading-relaxed sm:flex-row sm:items-center sm:justify-between',
        className
      )}
    >
      <p>
        A fictional business. Website designed &amp; built by{' '}
        <Link href={site.home} className="underline underline-offset-4 hover:no-underline">
          PlaxWeb
        </Link>
        .
      </p>
      <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
        <Link href={quoteUrl(slug)} className="underline underline-offset-4 hover:no-underline">
          Get a website like this
        </Link>
        <Link href={site.home} className="underline underline-offset-4 hover:no-underline">
          See other demos
        </Link>
      </p>
    </div>
  );
}
