import NextImage from 'next/image';
import type { Photo } from '@/lib/images';
import { cn } from '@/lib/cn';

type Props = {
  photo: Photo;
  /** Tailwind classes for the wrapper — this is where you set aspect + radius. */
  className?: string;
  /** Classes applied to the <img> itself, e.g. object-position or a grade. */
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  /** Optional caption rendered under the frame. */
  caption?: string;
};

/**
 * Standard photo frame: fills its wrapper, lazy by default, always has alt
 * text (it comes from the manifest). Keeps `sizes` explicit so we never ship
 * a 1800px file to a 380px slot.
 */
export function Frame({ photo, className, imgClassName, sizes = '100vw', priority, caption }: Props) {
  const frame = (
    <div className={cn('relative overflow-hidden bg-black/5', className)}>
      <NextImage
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn('object-cover', imgClassName)}
      />
    </div>
  );

  if (!caption) return frame;

  return (
    <figure className="flex flex-col gap-3">
      {frame}
      <figcaption className="text-[0.8rem] leading-relaxed opacity-70">{caption}</figcaption>
    </figure>
  );
}
