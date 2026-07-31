import { RevealProvider } from '@/components/ui/RevealProvider';

/**
 * Demos share almost nothing on purpose — no header, no footer, no palette.
 * This layout only supplies the scroll-reveal observer. Everything a visitor
 * can see belongs to the individual demo.
 */
export default function DemosLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <RevealProvider />
    </>
  );
}
