/**
 * Decorative organic shapes.
 *
 * Flat colour blocks read as cheap; a single soft shape behind the type gives
 * the block depth without adding an image to download or a library to load.
 * These are hand-drawn beziers rather than generated noise, so they stay the
 * same on every render and can be positioned deliberately.
 *
 * Purely decorative, so every one is aria-hidden and none carries meaning that
 * is not also in the text.
 */

const PATHS = {
  // A soft, slightly lopsided mass — the kind of shape you get from spilling
  // something, rather than from a shape tool.
  spill:
    'M182 22c46 12 78 46 96 92 18 46 22 100-4 142-26 42-82 72-136 78-54 6-106-12-140-48C-36 250-52 196-40 148-28 100 12 58 66 34 108 15 146 12 182 22Z',
  // Longer and flatter, for wide blocks where a circle would look like a hole.
  drift:
    'M300 30c60 18 104 62 118 118 14 56-2 124-46 168-44 44-116 64-186 56-70-8-138-44-172-98-34-54-34-126 4-176C56 18 130-8 196 2c40 6 72 14 104 28Z',
};

export function Blob({
  shape = 'spill',
  className = '',
}: {
  shape?: keyof typeof PATHS;
  className?: string;
}) {
  return (
    <svg
      aria-hidden
      focusable="false"
      viewBox={shape === 'spill' ? '-60 0 380 350' : '-60 -20 560 380'}
      className={className}
      preserveAspectRatio="xMidYMid slice"
    >
      <path d={PATHS[shape]} fill="currentColor" />
    </svg>
  );
}
