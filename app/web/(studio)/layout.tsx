import { studioFontClass } from '@/lib/fonts';
import { StudioHeader } from '@/components/studio/StudioHeader';
import { StudioFooter } from '@/components/studio/StudioFooter';
import { RevealProvider } from '@/components/ui/RevealProvider';

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${studioFontClass} min-h-dvh bg-paper font-sans text-ink`}>
      <a
        href="#main"
        className="sr-only rounded bg-ink px-4 py-3 text-sm text-paper focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100]"
      >
        Skip to content
      </a>
      <StudioHeader />
      <main id="main">{children}</main>
      <StudioFooter />
      <RevealProvider />
    </div>
  );
}
