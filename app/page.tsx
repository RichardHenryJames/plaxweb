import { redirect } from 'next/navigation';
import { site } from '@/lib/site';

/**
 * The portfolio is mounted at /web so it can sit under plaxlabs.com/web.
 * Anyone landing on the origin root goes straight there.
 */
export default function RootPage() {
  redirect(site.basePath);
}
