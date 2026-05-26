'use client';

import { useState } from 'react';

type Props = {
  src?: string;
  alt: string;
};

/**
 * HighlightImage — shows the image, or a subtle "image coming soon" tile if missing or broken.
 * Client component because we need onError to fall back gracefully.
 */
export default function HighlightImage({ src, alt }: Props) {
  const [errored, setErrored] = useState(false);

  if (!src || errored) {
    return (
      <div
        style={{
          aspectRatio: '4 / 3',
          marginBottom: 18,
          borderRadius: 8,
          background:
            'linear-gradient(135deg, var(--surface-soft) 0%, var(--surface-tint) 100%)',
        }}
      />
    );
  }
  return (
    <div
      style={{
        aspectRatio: '4 / 3',
        marginBottom: 18,
        borderRadius: 8,
        overflow: 'hidden',
        background:
          'linear-gradient(135deg, var(--surface-soft) 0%, var(--surface-tint) 100%)',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        onError={() => setErrored(true)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />
    </div>
  );
}
