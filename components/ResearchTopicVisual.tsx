/**
 * ResearchTopicVisual
 *
 * Shows the topic image if provided in research.json (e.g. /images/research/oxide-thin-films.jpg),
 * otherwise falls back to the abstract SVG visual from ResearchVisual.tsx.
 *
 * Once you drop real .jpg/.png images into /public/images/research/ with the matching filenames,
 * the page will automatically use them instead of the SVG.
 *
 * Image priority:
 *   1. If `image` prop is non-empty AND the file exists at that path → show <img>
 *   2. Otherwise → show <ResearchVisual id={...} />
 *
 * Note: Next.js cannot statically check whether the file exists at build time without trying to
 * load it. So we use a regular <img> with onError to swap to the SVG when loading fails.
 */
'use client';

import { useState } from 'react';
import ResearchVisual from './ResearchVisual';

type VisualId = 'oxide' | 'thermoelectric' | 'ferroelectric';

type Props = {
  id: VisualId;
  image?: string;
  alt: string;
};

export default function ResearchTopicVisual({ id, image, alt }: Props) {
  const [errored, setErrored] = useState(false);

  // No image path set OR loading failed → fall back to SVG
  if (!image || errored) {
    return <ResearchVisual id={id} />;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={image}
      alt={alt}
      onError={() => setErrored(true)}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
      }}
    />
  );
}
