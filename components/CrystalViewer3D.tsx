'use client';

/**
 * CrystalViewer3D — Phase 2
 *
 * Interactive 3D viewer for three crystal systems relevant to BK Lab.
 *   - Cubic       SrTiO₃     Perovskite oxide thin films
 *   - Tetragonal  BaTiO₃     Ferroelectric devices
 *   - Hexagonal   Bi₂Te₃     Thermoelectric materials
 *
 * UI: 3 toggle buttons + 3D canvas + bottom info strip.
 * Interaction: auto-rotate → mouse drag (with momentum) → free rotate.
 *
 * Vanilla Three.js (no R3F). Pointer events for unified mouse+touch.
 */

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

type CrystalType = 'cubic' | 'tetragonal' | 'hexagonal' | 'pld';

type CrystalInfo = {
  name: string;
  formula: string;
  subtitle: string;
  params: string;
};

const CRYSTAL_INFO: Record<CrystalType, CrystalInfo> = {
  cubic: {
    name: 'Cubic',
    formula: 'SrTiO₃',
    subtitle: 'Perovskite oxide thin films',
    params: 'a = b = c · α = β = γ = 90°',
  },
  tetragonal: {
    name: 'Tetragonal',
    formula: 'BaTiO₃',
    subtitle: 'Ferroelectric devices',
    params: 'a = b ≠ c · α = β = γ = 90°',
  },
  hexagonal: {
    name: 'Hexagonal',
    formula: 'Bi₂Te₃',
    subtitle: 'Thermoelectric materials',
    params: 'a = b ≠ c · γ = 120°',
  },
  pld: {
    name: 'PLD',
    formula: 'ABO₃',
    subtitle: 'Pulsed laser deposition · epitaxial growth',
    params: 'KrF · 248 nm · 10 Hz',
  },
};

// Atom color palette (matches site)
const A_COLOR = 0x2266d1; // blue (large cation)
const B_COLOR = 0x7c3aed; // violet (small cation / Bi)
const O_COLOR = 0x94a3b8; // gray (O / Te outer)
const O2_COLOR = 0x10a6c8; // cyan (Te accent)

export default function CrystalViewer3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [crystalType, setCrystalType] = useState<CrystalType>('cubic');

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ============ Scene / camera / renderer ============
    const width = mount.clientWidth;
    const height = mount.clientHeight;
    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.5); // closer than before — fills the card

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // ============ Lighting ============
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const key = new THREE.DirectionalLight(0xffffff, 0.6);
    key.position.set(5, 5, 5);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xc0d6f5, 0.3);
    fill.position.set(-5, -2, 3);
    scene.add(fill);

    // ============ Build the requested crystal ============
    // Group A: the crystal itself (rotates with user drag)
    const crystalGroup = new THREE.Group();
    scene.add(crystalGroup);

    // Group B: small xyz axis indicator (also rotates with the crystal)
    const axisGroup = new THREE.Group();
    crystalGroup.add(axisGroup);

    // Track all resources to dispose on cleanup
    const disposables: Array<THREE.BufferGeometry | THREE.Material> = [];
    const mkMat = (color: number, opts: { roughness?: number; opacity?: number } = {}) => {
      const m = new THREE.MeshStandardMaterial({
        color,
        roughness: opts.roughness ?? 0.4,
        metalness: 0.05,
        transparent: opts.opacity !== undefined,
        opacity: opts.opacity ?? 1,
      });
      disposables.push(m);
      return m;
    };
    const mkLineMat = (color: number, opacity: number) => {
      const m = new THREE.LineBasicMaterial({ color, transparent: true, opacity });
      disposables.push(m);
      return m;
    };
    const mkSphere = (r: number) => {
      const g = new THREE.SphereGeometry(r, 32, 24);
      disposables.push(g);
      return g;
    };
    const mkLine = (a: THREE.Vector3, b: THREE.Vector3, mat: THREE.LineBasicMaterial) => {
      const g = new THREE.BufferGeometry().setFromPoints([a, b]);
      disposables.push(g);
      return new THREE.Line(g, mat);
    };

    // Lattice parameters by crystal type (PLD doesn't use this; dummy values OK)
    const lattice = {
      cubic: { a: 1.5, b: 1.5, c: 1.5, gamma: 90 },
      tetragonal: { a: 1.4, b: 1.4, c: 1.75, gamma: 90 },
      hexagonal: { a: 1.5, b: 1.5, c: 1.8, gamma: 120 },
      pld: { a: 1.5, b: 1.5, c: 1.5, gamma: 90 },
    }[crystalType];

    // Edge material (light blue lines for unit cell)
    const edgeMat = mkLineMat(0x2266d1, 0.35);
    const bondMat = mkLineMat(0x7c3aed, 0.5);
    const vdwMat = mkLineMat(0x94a3b8, 0.4);

    if (crystalType === 'cubic' || crystalType === 'tetragonal') {
      // ---------- Cubic / Tetragonal perovskite ABO₃ ----------
      const halfA = lattice.a / 2;
      const halfB = lattice.b / 2;
      const halfC = lattice.c / 2;

      const aMat = mkMat(A_COLOR);
      const bMat = mkMat(B_COLOR);
      const oMat = mkMat(O_COLOR, { roughness: 0.55 });

      const aGeom = mkSphere(0.18);
      const bGeom = mkSphere(0.13);
      const oGeom = mkSphere(0.08);

      // A at 8 corners
      [
        [-halfA, -halfB, -halfC], [+halfA, -halfB, -halfC],
        [-halfA, +halfB, -halfC], [+halfA, +halfB, -halfC],
        [-halfA, -halfB, +halfC], [+halfA, -halfB, +halfC],
        [-halfA, +halfB, +halfC], [+halfA, +halfB, +halfC],
      ].forEach(([x, y, z]) => {
        const m = new THREE.Mesh(aGeom, aMat);
        m.position.set(x, y, z);
        crystalGroup.add(m);
      });

      // B at body center
      // For tetragonal BaTiO₃, B-site is displaced along c (ferroelectric polarization)
      const bOffset = crystalType === 'tetragonal' ? 0.08 : 0;
      const bMesh = new THREE.Mesh(bGeom, bMat);
      bMesh.position.set(0, 0, bOffset);
      crystalGroup.add(bMesh);

      // O at 6 face centers (for tetragonal, slight tetragonal distortion)
      const faces: [number, number, number][] = [
        [+halfA, 0, 0], [-halfA, 0, 0],
        [0, +halfB, 0], [0, -halfB, 0],
        [0, 0, +halfC], [0, 0, -halfC],
      ];
      faces.forEach(([x, y, z]) => {
        const m = new THREE.Mesh(oGeom, oMat);
        m.position.set(x, y, z);
        crystalGroup.add(m);
      });

      // 12 edges of the (potentially elongated) cube
      const corners = [
        [-halfA, -halfB, -halfC], [+halfA, -halfB, -halfC],
        [-halfA, +halfB, -halfC], [+halfA, +halfB, -halfC],
        [-halfA, -halfB, +halfC], [+halfA, -halfB, +halfC],
        [-halfA, +halfB, +halfC], [+halfA, +halfB, +halfC],
      ];
      const edges = [
        [0, 1], [1, 3], [3, 2], [2, 0], // bottom
        [4, 5], [5, 7], [7, 6], [6, 4], // top
        [0, 4], [1, 5], [2, 6], [3, 7], // verticals
      ];
      edges.forEach(([i, j]) => {
        const p1 = new THREE.Vector3(...(corners[i] as [number, number, number]));
        const p2 = new THREE.Vector3(...(corners[j] as [number, number, number]));
        crystalGroup.add(mkLine(p1, p2, edgeMat));
      });

      // B-O bonds
      faces.forEach(([x, y, z]) => {
        const p1 = new THREE.Vector3(0, 0, bOffset);
        const p2 = new THREE.Vector3(x, y, z);
        crystalGroup.add(mkLine(p1, p2, bondMat));
      });
    } else if (crystalType === 'hexagonal') {
      // ---------- Hexagonal Bi₂Te₃ quintuple-layer structure ----------
      // Bi₂Te₃ is a layered van der Waals crystal:
      //   - One quintuple layer (QL) = Te(1) − Bi − Te(2) − Bi − Te(1)
      //   - Adjacent QLs are bonded only by van der Waals interaction (gap, no covalent bonds)
      //
      // For the visualization we draw the *conventional* hexagonal cell —
      // a hexagonal prism — so the top-down view shows a clear regular hexagon.
      // Inside the prism we stack 3 QLs with vdW gaps between them.

      const teMat = mkMat(O2_COLOR, { roughness: 0.5 });
      const biMat = mkMat(B_COLOR);
      const teGeom = mkSphere(0.10);
      const biGeom = mkSphere(0.13);

      // Hexagonal prism in-plane radius
      const hexR = 0.95;

      // In-plane atomic sites: 1 center + 6 hex corners (close-packed style).
      // This makes each atomic plane visibly hexagonal.
      const hexInPlane: [number, number][] = [[0, 0]];
      for (let i = 0; i < 6; i++) {
        const ang = (i * Math.PI) / 3; // 0, 60, 120, ...
        // Slightly inset from the cell boundary so atoms sit inside the prism
        const r = hexR * 0.62;
        hexInPlane.push([r * Math.cos(ang), r * Math.sin(ang)]);
      }

      // QL geometry — Te(1)-Bi-Te(2)-Bi-Te(1) along c, with big vdW gap between QLs
      const planeYs = [-0.22, -0.11, 0, +0.11, +0.22];
      const planeAtoms = ['Te', 'Bi', 'Te', 'Bi', 'Te'];
      const qlHeight = 0.44;
      const vdwGap = 0.55;
      const qlPitch = qlHeight + vdwGap;
      const numQLs = 3;

      for (let q = 0; q < numQLs; q++) {
        const qlY = (q - (numQLs - 1) / 2) * qlPitch;
        planeYs.forEach((py, planeIdx) => {
          const atom = planeAtoms[planeIdx];
          const mat = atom === 'Te' ? teMat : biMat;
          const geom = atom === 'Te' ? teGeom : biGeom;
          hexInPlane.forEach(([px, pz]) => {
            const m = new THREE.Mesh(geom, mat);
            m.position.set(px, qlY + py, pz);
            crystalGroup.add(m);
          });
        });

        // vdW gap visualization: dashed vertical lines above this QL (except topmost)
        if (q < numQLs - 1) {
          const gapY1 = qlY + qlHeight / 2;
          const gapY2 = qlY + qlPitch - qlHeight / 2;
          hexInPlane.forEach(([px, pz]) => {
            const segs = 4;
            for (let s = 0; s < segs; s += 2) {
              const y1 = gapY1 + (gapY2 - gapY1) * (s / segs);
              const y2 = gapY1 + (gapY2 - gapY1) * ((s + 1) / segs);
              crystalGroup.add(
                mkLine(new THREE.Vector3(px, y1, pz), new THREE.Vector3(px, y2, pz), vdwMat)
              );
            }
          });
        }
      }

      // ============ Hexagonal prism unit-cell wireframe ============
      // Top hex (6 vertices) + bottom hex (6 vertices) + 6 vertical edges = 18 edges total
      const halfC = (numQLs * qlPitch - vdwGap) / 2 + 0.18;
      const topVerts: THREE.Vector3[] = [];
      const botVerts: THREE.Vector3[] = [];
      for (let i = 0; i < 6; i++) {
        const ang = (i * Math.PI) / 3;
        const x = hexR * Math.cos(ang);
        const z = hexR * Math.sin(ang);
        topVerts.push(new THREE.Vector3(x, +halfC, z));
        botVerts.push(new THREE.Vector3(x, -halfC, z));
      }
      // Top hexagon edges
      for (let i = 0; i < 6; i++) {
        crystalGroup.add(mkLine(topVerts[i], topVerts[(i + 1) % 6], edgeMat));
      }
      // Bottom hexagon edges
      for (let i = 0; i < 6; i++) {
        crystalGroup.add(mkLine(botVerts[i], botVerts[(i + 1) % 6], edgeMat));
      }
      // 6 vertical edges
      for (let i = 0; i < 6; i++) {
        crystalGroup.add(mkLine(topVerts[i], botVerts[i], edgeMat));
      }
    } else if (crystalType === 'pld') {
      // ---------- PLD Growth schematic ----------
      // Cross-section of a PLD chamber:
      //   - Substrate at top (with already-deposited thin film)
      //   - Target disk at bottom (rotating)
      //   - Laser pulse entering from the left, striking target
      //   - Plume expanding from target toward substrate (cone)
      //   - Atoms flying from plume toward substrate, accumulating
      // The whole thing animates: pulse arrives → plume burst → atoms travel → repeat.

      // Substrate (top): thin slab + film stack
      const subMat = mkMat(0xcbd5e1, { roughness: 0.6 });
      const subGeom = new THREE.BoxGeometry(2.2, 0.12, 0.6);
      disposables.push(subGeom);
      const sub = new THREE.Mesh(subGeom, subMat);
      sub.position.set(0, 1.1, 0);
      crystalGroup.add(sub);

      // Deposited film layer (under the substrate position, growing downward visually)
      const filmMat = mkMat(0x7c3aed, { roughness: 0.4, opacity: 0.6 });
      const filmGeom = new THREE.BoxGeometry(2.0, 0.06, 0.55);
      disposables.push(filmGeom);
      const film = new THREE.Mesh(filmGeom, filmMat);
      film.position.set(0, 1.01, 0);
      crystalGroup.add(film);

      // Target (bottom): rotating disk
      const targetMat = mkMat(0x2266d1, { roughness: 0.35 });
      const targetGeom = new THREE.CylinderGeometry(0.55, 0.55, 0.12, 32);
      disposables.push(targetGeom);
      const target = new THREE.Mesh(targetGeom, targetMat);
      target.position.set(0, -1.1, 0);
      crystalGroup.add(target);
      // Tag for animation
      target.userData.isTarget = true;

      // Target holder / shaft (below target, going down)
      const shaftMat = mkMat(0x64748b, { roughness: 0.5 });
      const shaftGeom = new THREE.CylinderGeometry(0.12, 0.12, 0.5, 16);
      disposables.push(shaftGeom);
      const shaft = new THREE.Mesh(shaftGeom, shaftMat);
      shaft.position.set(0, -1.45, 0);
      crystalGroup.add(shaft);

      // Plume — a cone expanding from target to substrate
      // We draw as a tapered cylinder with emissive purple material.
      const plumeMat = new THREE.MeshStandardMaterial({
        color: 0x7c3aed,
        emissive: 0x7c3aed,
        emissiveIntensity: 0.6,
        transparent: true,
        opacity: 0.35,
        roughness: 1,
      });
      disposables.push(plumeMat);
      const plumeGeom = new THREE.CylinderGeometry(0.45, 0.12, 1.95, 32, 1, true);
      disposables.push(plumeGeom);
      const plume = new THREE.Mesh(plumeGeom, plumeMat);
      plume.position.set(0, 0.02, 0);
      crystalGroup.add(plume);
      plume.userData.isPlume = true;

      // Inner brighter core of the plume
      const plumeCoreMat = new THREE.MeshStandardMaterial({
        color: 0xc4b5fd,
        emissive: 0xc4b5fd,
        emissiveIntensity: 0.8,
        transparent: true,
        opacity: 0.5,
        roughness: 1,
      });
      disposables.push(plumeCoreMat);
      const plumeCoreGeom = new THREE.CylinderGeometry(0.18, 0.06, 1.9, 24, 1, true);
      disposables.push(plumeCoreGeom);
      const plumeCore = new THREE.Mesh(plumeCoreGeom, plumeCoreMat);
      plumeCore.position.set(0, 0.05, 0);
      crystalGroup.add(plumeCore);
      plumeCore.userData.isPlume = true;

      // Laser beam — comes from the left, hits target at an angle
      const laserMat = new THREE.MeshStandardMaterial({
        color: 0x10a6c8,
        emissive: 0x10a6c8,
        emissiveIntensity: 1.2,
        transparent: true,
        opacity: 0.8,
        roughness: 0,
      });
      disposables.push(laserMat);
      const laserGeom = new THREE.CylinderGeometry(0.03, 0.03, 1.6, 12);
      disposables.push(laserGeom);
      const laser = new THREE.Mesh(laserGeom, laserMat);
      // Position the laser beam to enter from upper-left and hit the target center
      laser.position.set(-0.7, -0.45, 0);
      laser.rotation.z = Math.PI / 3.5; // tilt so it points down-right to the target
      crystalGroup.add(laser);
      laser.userData.isLaser = true;

      // Flying atoms — small spheres that travel from target to substrate
      const atomMatA = mkMat(0x2266d1);
      const atomMatB = mkMat(0x7c3aed);
      const atomMatO = mkMat(0x94a3b8);
      const atomGeom = mkSphere(0.05);
      const numAtoms = 14;
      const flyingAtoms: { mesh: THREE.Mesh; phase: number; x: number; z: number; color: number }[] = [];
      for (let i = 0; i < numAtoms; i++) {
        const colorIdx = i % 3;
        const mat = [atomMatA, atomMatB, atomMatO][colorIdx];
        const m = new THREE.Mesh(atomGeom, mat);
        // Spread atoms in a cone path with random x/z offset
        const x = (Math.random() - 0.5) * 0.6;
        const z = (Math.random() - 0.5) * 0.4;
        flyingAtoms.push({
          mesh: m,
          phase: Math.random(),
          x,
          z,
          color: colorIdx,
        });
        crystalGroup.add(m);
      }
      // Store atoms on the group for animation access
      crystalGroup.userData.flyingAtoms = flyingAtoms;
      crystalGroup.userData.isPLD = true;

      // Chamber wall hint (very subtle dotted rectangle around everything)
      const chamberMat = mkLineMat(0x94a3b8, 0.25);
      const cw = 1.5, ch = 1.6, cd = 0.7;
      const cVerts: THREE.Vector3[] = [
        new THREE.Vector3(-cw, -ch, -cd), new THREE.Vector3(+cw, -ch, -cd),
        new THREE.Vector3(+cw, +ch, -cd), new THREE.Vector3(-cw, +ch, -cd),
        new THREE.Vector3(-cw, -ch, +cd), new THREE.Vector3(+cw, -ch, +cd),
        new THREE.Vector3(+cw, +ch, +cd), new THREE.Vector3(-cw, +ch, +cd),
      ];
      const cEdges = [
        [0,1],[1,2],[2,3],[3,0],
        [4,5],[5,6],[6,7],[7,4],
        [0,4],[1,5],[2,6],[3,7],
      ];
      cEdges.forEach(([i,j]) => crystalGroup.add(mkLine(cVerts[i], cVerts[j], chamberMat)));
    }

    // ============ Small xyz axis indicator (corner of crystal) ============
    // (skip for PLD scene — it's a schematic, not a unit cell)
    if (crystalType !== 'pld') {
      const axisLen = 0.35;
      const axisMatX = mkLineMat(0xdc2626, 0.7); // red = a (x)
      const axisMatY = mkLineMat(0x16a34a, 0.7); // green = b (y)
      const axisMatZ = mkLineMat(0x2563eb, 0.7); // blue = c (z)
      const origin = new THREE.Vector3(-1.2, -1.0, 0);
      axisGroup.add(mkLine(origin, origin.clone().add(new THREE.Vector3(axisLen, 0, 0)), axisMatX));
      axisGroup.add(mkLine(origin, origin.clone().add(new THREE.Vector3(0, axisLen, 0)), axisMatY));
      axisGroup.add(mkLine(origin, origin.clone().add(new THREE.Vector3(0, 0, axisLen)), axisMatZ));
    }

    // Initial tilt (hex needs a different angle so all 3 atomic columns are visible)
    if (crystalType === 'hexagonal') {
      crystalGroup.rotation.x = -0.15;
      crystalGroup.rotation.y = 0.3;
    } else if (crystalType === 'pld') {
      crystalGroup.rotation.x = -0.15;
      crystalGroup.rotation.y = 0.4;
    } else {
      crystalGroup.rotation.x = -0.3;
      crystalGroup.rotation.y = 0.5;
    }

    // ============ Mouse drag rotation + auto-rotate + momentum ============
    let isDragging = false;
    let lastX = 0;
    let lastY = 0;
    let userInteracted = false;
    let velocityX = 0;
    let velocityY = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      userInteracted = true;
      lastX = e.clientX;
      lastY = e.clientY;
      velocityX = 0;
      velocityY = 0;
      try { renderer.domElement.setPointerCapture(e.pointerId); } catch {}
      renderer.domElement.style.cursor = 'grabbing';
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      const s = (2 * Math.PI) / 360;
      crystalGroup.rotation.y += dx * s;
      crystalGroup.rotation.x += dy * s;
      velocityX = dx * s;
      velocityY = dy * s;
    };
    const onPointerUp = (e: PointerEvent) => {
      isDragging = false;
      try { renderer.domElement.releasePointerCapture(e.pointerId); } catch {}
      renderer.domElement.style.cursor = 'grab';
    };

    renderer.domElement.style.cursor = 'grab';
    renderer.domElement.style.touchAction = 'none';
    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('pointerup', onPointerUp);
    renderer.domElement.addEventListener('pointercancel', onPointerUp);
    renderer.domElement.addEventListener('pointerleave', onPointerUp);

    // ============ Resize ============
    const onResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    // ============ Animation ============
    let animFrame = 0;
    const startTime = performance.now();
    const animate = () => {
      animFrame = requestAnimationFrame(animate);
      const t = (performance.now() - startTime) / 1000; // seconds

      if (!isDragging) {
        if (!userInteracted) {
          crystalGroup.rotation.y += 0.004;
        } else {
          crystalGroup.rotation.y += velocityX;
          crystalGroup.rotation.x += velocityY;
          velocityX *= 0.92;
          velocityY *= 0.92;
          if (Math.abs(velocityX) < 0.0005) velocityX = 0;
          if (Math.abs(velocityY) < 0.0005) velocityY = 0;
        }
      }

      // PLD-specific animation
      if (crystalType === 'pld' && crystalGroup.userData.isPLD) {
        // Pulse cycle: 1.0 s per pulse
        const period = 1.0;
        const phase = (t % period) / period; // 0..1

        crystalGroup.traverse((obj) => {
          // Spin target slowly
          if (obj.userData.isTarget) {
            obj.rotation.y = t * 0.5;
          }
          // Laser: bright at the start of pulse, fades quickly
          if (obj.userData.isLaser && obj instanceof THREE.Mesh) {
            const mat = obj.material as THREE.MeshStandardMaterial;
            const intensity = phase < 0.1 ? (1 - phase / 0.1) : 0;
            mat.opacity = 0.2 + 0.7 * intensity;
            mat.emissiveIntensity = 0.5 + 1.5 * intensity;
          }
          // Plume: expands after the laser pulse, then fades
          if (obj.userData.isPlume && obj instanceof THREE.Mesh) {
            const mat = obj.material as THREE.MeshStandardMaterial;
            // Plume is brightest just after the pulse, fades by mid-cycle
            const plumeIntensity = phase < 0.5 ? Math.sin(phase * Math.PI * 2) : 0;
            const baseOpacity = mat === (obj.material as THREE.MeshStandardMaterial) ? 0.15 : 0.15;
            mat.opacity = 0.15 + 0.45 * Math.max(0, plumeIntensity);
            mat.emissiveIntensity = 0.3 + 0.7 * Math.max(0, plumeIntensity);
            // Slight pulsing scale
            const s = 1 + 0.05 * Math.max(0, plumeIntensity);
            obj.scale.set(s, 1, s);
          }
        });

        // Animate flying atoms: travel from target (y=-1.1) to substrate (y=1.1)
        const atoms = crystalGroup.userData.flyingAtoms as Array<{
          mesh: THREE.Mesh;
          phase: number;
          x: number;
          z: number;
          color: number;
        }>;
        atoms.forEach((a) => {
          // Each atom has its own phase offset so they're staggered
          const localPhase = (t / 1.5 + a.phase) % 1;
          // Atom rises from -1.0 to 1.05
          const yStart = -1.0;
          const yEnd = 1.05;
          const y = yStart + (yEnd - yStart) * localPhase;
          // Slight outward spread as it rises (cone shape)
          const spread = 0.3 + localPhase * 0.8;
          a.mesh.position.set(a.x * spread, y, a.z * spread);
          // Fade in at start and fade out near end
          const mat = a.mesh.material as THREE.MeshStandardMaterial;
          const fadeIn = Math.min(1, localPhase / 0.1);
          const fadeOut = localPhase > 0.92 ? Math.max(0, (1 - localPhase) / 0.08) : 1;
          mat.opacity = 0.9 * fadeIn * fadeOut;
          mat.transparent = true;
        });
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animFrame);
      ro.disconnect();
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('pointerup', onPointerUp);
      renderer.domElement.removeEventListener('pointercancel', onPointerUp);
      renderer.domElement.removeEventListener('pointerleave', onPointerUp);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
    };
  }, [crystalType]);

  const info = CRYSTAL_INFO[crystalType];

  // ============ JSX ============
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* 3D canvas — flex:1 to fill */}
      <div
        ref={mountRef}
        style={{ flex: 1, width: '100%', minHeight: 0, position: 'relative' }}
        aria-label={`Interactive 3D ${info.name} crystal structure of ${info.formula}`}
        role="img"
      />

      {/* Axis legend (top-left of canvas, absolute) — hidden for PLD scene */}
      {crystalType !== 'pld' && (
        <div
          style={{
            position: 'absolute',
            top: 12,
            left: 14,
            fontFamily: 'var(--mono)',
            fontSize: 9,
            letterSpacing: '0.1em',
            color: 'var(--muted)',
            opacity: 0.7,
            pointerEvents: 'none',
            lineHeight: 1.6,
          }}
        >
          <div><span style={{ color: '#dc2626' }}>━</span> a</div>
          <div><span style={{ color: '#16a34a' }}>━</span> b</div>
          <div><span style={{ color: '#2563eb' }}>━</span> c</div>
        </div>
      )}

      {/* Lattice params (top-right) */}
      <div
        style={{
          position: 'absolute',
          top: 12,
          right: 14,
          fontFamily: 'var(--mono)',
          fontSize: 9,
          letterSpacing: '0.05em',
          color: 'var(--muted)',
          opacity: 0.7,
          textAlign: 'right',
          pointerEvents: 'none',
          lineHeight: 1.5,
        }}
      >
        {info.params}
      </div>

      {/* Toggle buttons */}
      <div
        style={{
          display: 'flex',
          gap: 6,
          padding: '8px 14px 4px',
          justifyContent: 'center',
        }}
      >
        {(['cubic', 'tetragonal', 'hexagonal', 'pld'] as CrystalType[]).map((t) => {
          const active = t === crystalType;
          return (
            <button
              key={t}
              onClick={() => setCrystalType(t)}
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 10,
                letterSpacing: '0.08em',
                padding: '5px 11px',
                borderRadius: 999,
                border: active ? '1px solid var(--blue)' : '1px solid var(--line)',
                background: active ? 'var(--blue)' : 'transparent',
                color: active ? '#fff' : 'var(--ink-soft)',
                cursor: 'pointer',
                textTransform: 'uppercase',
                transition: 'all 0.15s ease',
              }}
            >
              {CRYSTAL_INFO[t].name}
            </button>
          );
        })}
      </div>

      {/* Bottom info strip */}
      <div
        style={{
          padding: '4px 18px 8px',
          textAlign: 'center',
          fontFamily: 'var(--mono)',
          fontSize: 10,
          color: 'var(--muted)',
          letterSpacing: '0.05em',
          lineHeight: 1.6,
        }}
      >
        <div>
          <span style={{ color: 'var(--ink-soft)', fontWeight: 500 }}>{info.formula}</span>
          {' · '}
          <span>{info.subtitle}</span>
        </div>
        <div style={{ opacity: 0.55, fontSize: 9, marginTop: 2 }}>DRAG TO ROTATE</div>
      </div>
    </div>
  );
}
