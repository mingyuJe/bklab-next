'use client';

/**
 * Client-only wrapper around CrystalViewer3D.
 * Required because Next.js 15 server components can't use `dynamic` with ssr:false,
 * and CrystalViewer3D needs the browser (window, WebGL).
 *
 * Renders the static SVG (CrystalVisual) as a placeholder while the Three.js
 * chunk is being downloaded.
 */

import dynamic from 'next/dynamic';
import CrystalVisual from './CrystalVisual';

const CrystalViewer3D = dynamic(() => import('./CrystalViewer3D'), {
  ssr: false,
  loading: () => <CrystalVisual />,
});

export default function CrystalViewer3DClient() {
  return <CrystalViewer3D />;
}
