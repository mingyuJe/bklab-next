/**
 * Research topic visuals — abstract SVG illustrations.
 *
 * Three variants, each tuned to one research direction:
 *   - "oxide"          → perovskite lattice + thin-film layers + domain boundaries
 *   - "thermoelectric" → Bi₂Te₃ quintuple layers + carrier flow + ZT curve
 *   - "ferroelectric"  → polarization domains + P-E hysteresis loop + device stack
 *
 * Usage:
 *   <ResearchVisual id="oxide" />
 *   <ResearchVisual id="thermoelectric" />
 *   <ResearchVisual id="ferroelectric" />
 *
 * Designed to fill any container with `width: 100%; aspect-ratio: 4/3`.
 */

type VisualId = 'oxide' | 'thermoelectric' | 'ferroelectric';

export default function ResearchVisual({ id }: { id: VisualId }) {
  switch (id) {
    case 'oxide':
      return <OxideVisual />;
    case 'thermoelectric':
      return <ThermoelectricVisual />;
    case 'ferroelectric':
      return <FerroelectricVisual />;
  }
}

/* ============================================================
   01. Multifunctional Oxide Thin Films
   Concept: Real ABO₃ perovskite cross-section (A at corners,
            B at body-center, O on B–O–B bond lines forming an
            octahedral cage projected in 2D), 2DEG at the
            interface between two oxides (interface line, not
            a whole layer), single substrate→film "epi" arrow.
   ============================================================ */
function OxideVisual() {
  // Perovskite 2D projection: a = 56 px ≈ 4 Å (larger = clearer)
  // We draw a compact 6×3 unit-cell window so the A/B/O pattern is unmistakable.
  // - A-cations at every (n·a, m·a) — cube corners
  // - B-cations at ((n+0.5)·a, (m+0.5)·a) — cube body center
  // - O on every edge midpoint:
  //     · horizontal edges → O at ((n+0.5)·a, m·a)
  //     · vertical edges   → O at (n·a, (m+0.5)·a)
  const a = 54;
  const xStart = 88;
  const yStart = 30;
  const cols = 8; // unit cells along x → 9 A-cation columns
  const rows = 3; // unit cells along y → 4 A-cation rows

  const aSites: [number, number][] = [];
  const bSites: [number, number][] = [];
  const oSites: [number, number][] = [];

  // A: every corner (cols+1) × (rows+1)
  for (let r = 0; r <= rows; r++) {
    for (let c = 0; c <= cols; c++) {
      aSites.push([xStart + c * a, yStart + r * a]);
    }
  }
  // B: every body center cols × rows
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      bSites.push([xStart + (c + 0.5) * a, yStart + (r + 0.5) * a]);
    }
  }
  // O on horizontal edge midpoints: cols × (rows+1)
  for (let r = 0; r <= rows; r++) {
    for (let c = 0; c < cols; c++) {
      oSites.push([xStart + (c + 0.5) * a, yStart + r * a]);
    }
  }
  // O on vertical edge midpoints: (cols+1) × rows
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c <= cols; c++) {
      oSites.push([xStart + c * a, yStart + (r + 0.5) * a]);
    }
  }

  return (
    <svg
      viewBox="0 0 600 450"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-labelledby="oxide-title oxide-desc"
    >
      <title id="oxide-title">Multifunctional oxide thin films</title>
      <desc id="oxide-desc">
        Perovskite ABO₃ oxide heterostructure: top-down lattice view with
        A-site, B-site, and O atoms, plus a stacked cross-section showing
        two oxide layers on a substrate with a 2DEG at the interface.
      </desc>

      <defs>
        <linearGradient id="ox-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f8fbff" />
          <stop offset="100%" stopColor="#e6eef9" />
        </linearGradient>

        {/* Interfacial 2DEG glow — narrow */}
        <linearGradient id="ox-2deg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10a6c8" stopOpacity="0" />
          <stop offset="50%" stopColor="#10a6c8" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#10a6c8" stopOpacity="0" />
        </linearGradient>

        {/* Layer fills */}
        <linearGradient id="ox-layer-top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.08" />
        </linearGradient>
        <linearGradient id="ox-layer-bot" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2266d1" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#2266d1" stopOpacity="0.08" />
        </linearGradient>

        <marker id="ox-arrowhead" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill="#2266d1" />
        </marker>
      </defs>

      {/* Background */}
      <rect width="600" height="450" fill="url(#ox-bg)" />

      {/* ===== Top: zoomed-in perovskite lattice (top-down view) ===== */}

      {/*
        Bond drawing strategy:
        In ABO₃ perovskite (top-down [001] projection):
          A-cation: cube corners
          B-cation: body center
          O: octahedron vertices around B, in-plane O sits on the B–O–B line
             (between two adjacent B sites along x or y).
        So the *meaningful chemical bonds in 2D projection* are B–O–B chains,
        NOT the corner-to-corner grid lines.

        We draw B–O–B bonds as dark short segments around each B site, and
        keep the A-corner outline very faint (just to convey the cubic unit cell).
      */}

      {/* Faint cube outlines (A to A) — purely structural reference, NOT a bond */}
      <g stroke="#cbd5e1" strokeWidth="0.4" opacity="0.6">
        {/* horizontal lines: (rows+1) rows of horizontal segments, each with `cols` segments */}
        {Array.from({ length: rows + 1 }, (_, r) =>
          Array.from({ length: cols }, (_, c) => (
            <line
              key={`gh-${r}-${c}`}
              x1={xStart + c * a}
              y1={yStart + r * a}
              x2={xStart + (c + 1) * a}
              y2={yStart + r * a}
            />
          ))
        )}
        {/* vertical lines: rows × (cols+1) */}
        {Array.from({ length: rows }, (_, r) =>
          Array.from({ length: cols + 1 }, (_, c) => (
            <line
              key={`gv-${r}-${c}`}
              x1={xStart + c * a}
              y1={yStart + r * a}
              x2={xStart + c * a}
              y2={yStart + (r + 1) * a}
            />
          ))
        )}
      </g>

      {/* B–O–B bonds (the real chemical connectivity in perovskite) — drawn as four short
          segments radiating from each B site toward its 4 in-plane O neighbors */}
      <g stroke="#7c3aed" strokeWidth="0.9" opacity="0.55">
        {bSites.map(([bx, by], i) => (
          <g key={`bond-${i}`}>
            {/* up */}
            <line x1={bx} y1={by} x2={bx} y2={by - a / 2} />
            {/* down */}
            <line x1={bx} y1={by} x2={bx} y2={by + a / 2} />
            {/* left */}
            <line x1={bx} y1={by} x2={bx - a / 2} y2={by} />
            {/* right */}
            <line x1={bx} y1={by} x2={bx + a / 2} y2={by} />
          </g>
        ))}
      </g>

      {/* A-site cations (cube corners) — larger, blue */}
      <g>
        {aSites.map(([x, y], i) => (
          <circle key={`A-${i}`} cx={x} cy={y} r="5" fill="#2266d1">
            <animate
              attributeName="opacity"
              values="0.75;1;0.75"
              dur={`${3 + (i % 4) * 0.5}s`}
              begin={`${(i * 0.15) % 2.5}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </g>

      {/* B-site cations (cube body centers) — smaller, purple */}
      <g>
        {bSites.map(([x, y], i) => (
          <circle key={`B-${i}`} cx={x} cy={y} r="3.5" fill="#7c3aed">
            <animate
              attributeName="opacity"
              values="0.7;1;0.7"
              dur={`${3.5 + (i % 3) * 0.4}s`}
              begin={`${(i * 0.2) % 2.5}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </g>

      {/* O anions — small, on B-O-B bonds */}
      <g>
        {oSites.map(([x, y], i) => (
          <circle key={`O-${i}`} cx={x} cy={y} r="1.8" fill="#94a3b8" />
        ))}
      </g>

      {/* Scale bar across one unit cell (placed below the lattice) */}
      <g transform={`translate(${xStart}, ${yStart + rows * a + 18})`}>
        <line x1="0" y1="0" x2={a} y2="0" stroke="#0e1b2a" strokeWidth="1" />
        <line x1="0" y1="-3" x2="0" y2="3" stroke="#0e1b2a" strokeWidth="1" />
        <line x1={a} y1="-3" x2={a} y2="3" stroke="#0e1b2a" strokeWidth="1" />
        <text
          x={a / 2}
          y="14"
          textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
          fontSize="9"
          fill="#0e1b2a"
        >
          a ≈ 4 Å
        </text>
      </g>

      {/* Legend (top-left of lattice area) */}
      <g transform="translate(20, 36)">
        <circle cx="6" cy="0" r="5" fill="#2266d1" />
        <text x="16" y="3" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#0e1b2a">A</text>
        <circle cx="6" cy="18" r="3.5" fill="#7c3aed" />
        <text x="16" y="21" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#0e1b2a">B</text>
        <circle cx="6" cy="36" r="1.8" fill="#94a3b8" />
        <text x="16" y="39" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#0e1b2a">O</text>
      </g>

      {/* ABO₃ formula */}
      <text
        x="20"
        y="92"
        fontFamily="JetBrains Mono, monospace"
        fontSize="9"
        fill="#2266d1"
        letterSpacing="0.1em"
        fontWeight="500"
      >
        ABO₃
      </text>

      {/* ===== Bottom: heterostructure cross-section ===== */}
      <g>
        {/* Top oxide layer (e.g. BiFeO₃) */}
        <rect x="80" y="240" width="440" height="50" rx="2" fill="url(#ox-layer-top)" stroke="#7c3aed" strokeWidth="0.5" />
        {/* Bottom oxide layer (e.g. SrTiO₃ buffer) */}
        <rect x="80" y="290" width="440" height="40" rx="2" fill="url(#ox-layer-bot)" stroke="#2266d1" strokeWidth="0.5" />

        {/* 2DEG at the interface — narrow band, not a layer */}
        <rect x="80" y="287" width="440" height="6" fill="url(#ox-2deg)">
          <animate attributeName="opacity" values="0.7;1;0.7" dur="3.5s" repeatCount="indefinite" />
        </rect>

        {/* Substrate */}
        <rect x="60" y="330" width="480" height="70" rx="2" fill="#cbd5e1" opacity="0.55" stroke="#94a3b8" strokeWidth="0.5" />
        {/* Substrate hatching */}
        <g stroke="#64748b" strokeWidth="0.4" opacity="0.4">
          {Array.from({ length: 24 }, (_, i) => (
            <line key={`sub${i}`} x1={60 + i * 20} y1="330" x2={80 + i * 20} y2="400" />
          ))}
        </g>

        {/* Layer labels (right side, outside the diagram) */}
        <text x="530" y="270" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#7c3aed" fontWeight="500">
          Film
        </text>
        <text x="530" y="315" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#2266d1" fontWeight="500">
          Buffer
        </text>
        <text x="530" y="365" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#64748b" fontWeight="500">
          Substrate
        </text>

        {/* 2DEG callout */}
        <line x1="280" y1="293" x2="280" y2="220" stroke="#10a6c8" strokeWidth="0.5" strokeDasharray="2 2" />
        <text x="285" y="218" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#10a6c8" fontWeight="500">
          2DEG @ interface
        </text>

        {/* Epitaxial growth direction (substrate → film), single arrow */}
        <line
          x1="50"
          y1="395"
          x2="50"
          y2="245"
          stroke="#2266d1"
          strokeWidth="1"
          markerEnd="url(#ox-arrowhead)"
          opacity="0.7"
        />
        <text
          x="45"
          y="220"
          textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
          fontSize="8"
          fill="#2266d1"
          letterSpacing="0.1em"
        >
          epi
        </text>
      </g>

      {/* Top-right title strip */}
      <text
        x="580"
        y="22"
        textAnchor="end"
        fontFamily="JetBrains Mono, monospace"
        fontSize="9"
        fill="#2266d1"
        letterSpacing="0.15em"
        fontWeight="500"
      >
        OXIDE HETEROSTRUCTURE
      </text>
    </svg>
  );
}

/* ============================================================
   02. Thermoelectric Materials
   Concept: Bi₂Te₃-like quintuple-layer structure on the left,
            heat→electricity conversion arrows in the middle,
            ZT vs T curve on the right.
   ============================================================ */
function ThermoelectricVisual() {
  return (
    <svg
      viewBox="0 0 600 450"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-labelledby="te-title te-desc"
    >
      <title id="te-title">Thermoelectric materials</title>
      <desc id="te-desc">
        Abstract visualization of thermoelectric conversion: layered Bi₂Te₃
        structure on the left, electron and phonon flow in the middle, and
        a ZT figure-of-merit curve on the right.
      </desc>

      <defs>
        <linearGradient id="te-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff8f3" />
          <stop offset="100%" stopColor="#fef0e1" />
        </linearGradient>

        {/* Hot-side gradient (red/orange) */}
        <linearGradient id="te-hot" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#f97316" stopOpacity="0.25" />
        </linearGradient>
        {/* Cold-side gradient (blue) */}
        <linearGradient id="te-cold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2266d1" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#10a6c8" stopOpacity="0.55" />
        </linearGradient>
        {/* Sample body */}
        <linearGradient id="te-sample" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0e1b2a" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#0e1b2a" stopOpacity="0.3" />
        </linearGradient>
      </defs>

      <rect width="600" height="450" fill="url(#te-bg)" />

      {/* Subtle grid */}
      <g stroke="#d97706" strokeWidth="0.3" opacity="0.15">
        {Array.from({ length: 13 }, (_, i) => (
          <line key={`gv${i}`} x1={i * 50} y1="0" x2={i * 50} y2="450" />
        ))}
        {Array.from({ length: 10 }, (_, i) => (
          <line key={`gh${i}`} x1="0" y1={i * 50} x2="600" y2={i * 50} />
        ))}
      </g>

      {/* ===== Left: Bi₂Te₃ quintuple layers with vdW gaps =====
          Each QL stacked along c-axis has 5 atomic planes in order:
              Te(1) — Bi — Te(2) — Bi — Te(1)
          Te(1) is the surface Te that bonds via van der Waals to the
          adjacent QL; Te(2) is the central Te.  Between QLs is the
          vdW gap (no covalent bond), drawn as a dashed strip.
      */}
      <g transform="translate(56, 110)">
        {[0, 1, 2, 3].map((qlIdx) => {
          const qlHeight = 44; // 5 sublayers × 8 px + paddings
          const qlY = qlIdx * (qlHeight + 12); // 12 px vdW gap between QLs
          return (
            <g key={qlIdx} transform={`translate(0, ${qlY})`}>
              {/* QL bounding box (subtle) */}
              <rect x="0" y="0" width="170" height={qlHeight} rx="2" fill="#0e1b2a" opacity="0.06" />

              {/* Five atomic planes — y offsets within the QL */}
              {/* Plane 1: Te (outer, top)   y=6 */}
              {/* Plane 2: Bi                y=15 */}
              {/* Plane 3: Te (center)       y=22 */}
              {/* Plane 4: Bi                y=29 */}
              {/* Plane 5: Te (outer, bottom) y=38 */}

              {/* Top Te plane (outer — vdW surface) */}
              {[15, 35, 55, 75, 95, 115, 135, 155].map((x, j) => (
                <circle key={`te1-${j}`} cx={x} cy="6" r="2.4" fill="#10a6c8" opacity="0.85" />
              ))}
              {/* Upper Bi plane — offset by half-spacing */}
              {[25, 45, 65, 85, 105, 125, 145].map((x, j) => (
                <circle key={`bi1-${j}`} cx={x} cy="15" r="3.6" fill="#7c3aed">
                  <animate
                    attributeName="opacity"
                    values="0.75;1;0.75"
                    dur={`${3.5 + (j % 3) * 0.3}s`}
                    begin={`${j * 0.2 + qlIdx * 0.15}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              ))}
              {/* Central Te plane */}
              {[15, 35, 55, 75, 95, 115, 135, 155].map((x, j) => (
                <circle key={`te2-${j}`} cx={x} cy="22" r="2.4" fill="#10a6c8" opacity="0.95" />
              ))}
              {/* Lower Bi plane */}
              {[25, 45, 65, 85, 105, 125, 145].map((x, j) => (
                <circle key={`bi2-${j}`} cx={x} cy="29" r="3.6" fill="#7c3aed">
                  <animate
                    attributeName="opacity"
                    values="0.75;1;0.75"
                    dur={`${3.5 + (j % 3) * 0.3}s`}
                    begin={`${j * 0.2 + qlIdx * 0.15 + 1.5}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              ))}
              {/* Bottom Te plane (outer — vdW surface) */}
              {[15, 35, 55, 75, 95, 115, 135, 155].map((x, j) => (
                <circle key={`te3-${j}`} cx={x} cy="38" r="2.4" fill="#10a6c8" opacity="0.85" />
              ))}

              {/* vdW gap below this QL (except the last) */}
              {qlIdx < 3 && (
                <line
                  x1="0"
                  y1={qlHeight + 6}
                  x2="170"
                  y2={qlHeight + 6}
                  stroke="#94a3b8"
                  strokeWidth="0.7"
                  strokeDasharray="3 3"
                  opacity="0.7"
                />
              )}
            </g>
          );
        })}

        {/* QL bracket — show one QL grouping for clarity (positioned below the stack, not to the side) */}
        <g stroke="#7c3aed" strokeWidth="0.8" fill="none">
          <path d="M -8 0 L -14 0 L -14 44 L -8 44" />
        </g>
        <text
          x="-18"
          y="26"
          textAnchor="end"
          fontFamily="JetBrains Mono, monospace"
          fontSize="9"
          fill="#7c3aed"
          fontWeight="500"
        >
          1 QL
        </text>

        {/* Title above */}
        <text
          x="85"
          y="-22"
          textAnchor="middle"
          fontFamily="Inter Tight, sans-serif"
          fontSize="11"
          fill="#7c3aed"
          fontWeight="600"
        >
          Bi₂Te₃ <tspan fontFamily="JetBrains Mono, monospace" fontSize="9" letterSpacing="0.1em">· QUINTUPLE LAYERS</tspan>
        </text>
        <text
          x="85"
          y="-10"
          textAnchor="middle"
          fontFamily="Inter Tight, sans-serif"
          fontSize="9"
          fill="#64748b"
        >
          Te–Bi–Te–Bi–Te  /  van der Waals gap
        </text>

        {/* Atom legend */}
        <g transform="translate(0, 240)">
          <circle cx="6" cy="0" r="3.6" fill="#7c3aed" />
          <text x="16" y="3" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#0e1b2a">Bi</text>
          <circle cx="50" cy="0" r="2.4" fill="#10a6c8" />
          <text x="60" y="3" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#0e1b2a">Te</text>
        </g>
      </g>

      {/* ===== Middle: heat & charge flow arrows ===== */}
      <g transform="translate(225, 120)">
        {/* Hot strip on top */}
        <rect x="0" y="0" width="120" height="18" rx="2" fill="url(#te-hot)" />
        <text x="60" y="13" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#7c2d12" fontWeight="500">
          T_hot
        </text>
        {/* Cold strip on bottom */}
        <rect x="0" y="222" width="120" height="18" rx="2" fill="url(#te-cold)" />
        <text x="60" y="235" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#0c4a6e" fontWeight="500">
          T_cold
        </text>

        {/* Heat flux arrows (red, top→bottom) */}
        <g stroke="#dc2626" strokeWidth="1.5" fill="none" markerEnd="url(#arrow-hot)">
          <line x1="20" y1="22" x2="20" y2="218">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
          </line>
          <line x1="60" y1="22" x2="60" y2="218">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" begin="0.5s" repeatCount="indefinite" />
          </line>
          <line x1="100" y1="22" x2="100" y2="218">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" begin="1s" repeatCount="indefinite" />
          </line>
        </g>

        {/* Charge-carrier (n-type majority, e⁻) flow — diffusion from hot to cold */}
        <g>
          {[0, 1, 2].map((i) => (
            <circle
              key={`car-${i}`}
              cx={75 + i * 10 - 10}
              cy={50}
              r="3.5"
              fill="#2266d1"
              stroke="#fff"
              strokeWidth="0.5"
            >
              <animate
                attributeName="cy"
                values={`50;215;50`}
                dur={`${3.5 + i * 0.5}s`}
                begin={`${i * 1.0}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                dur={`${3.5 + i * 0.5}s`}
                begin={`${i * 1.0}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </g>
        {/* Carrier-type label */}
        <text
          x="75"
          y="180"
          textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10"
          fill="#2266d1"
          fontWeight="500"
        >
          e⁻
        </text>

        {/* Middle label */}
        <text
          x="60"
          y="135"
          textAnchor="middle"
          fontFamily="Fraunces, serif"
          fontSize="18"
          fill="#0e1b2a"
          fontStyle="italic"
        >
          ΔT → V
        </text>
        <text
          x="60"
          y="155"
          textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
          fontSize="9"
          fill="#64748b"
          letterSpacing="0.1em"
        >
          Seebeck
        </text>
      </g>

      <defs>
        <marker id="arrow-hot" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill="#dc2626" />
        </marker>
      </defs>

      {/* ===== Right: ZT curve ===== */}
      <g transform="translate(385, 100)">
        {/* Axes */}
        <line x1="0" y1="220" x2="180" y2="220" stroke="#0e1b2a" strokeWidth="1" />
        <line x1="0" y1="220" x2="0" y2="40" stroke="#0e1b2a" strokeWidth="1" />

        {/* Y axis label */}
        <text
          x="-25"
          y="135"
          fontFamily="Fraunces, serif"
          fontSize="16"
          fill="#0e1b2a"
          fontStyle="italic"
          transform="rotate(-90, -25, 135)"
        >
          ZT
        </text>
        {/* X axis label */}
        <text
          x="90"
          y="245"
          textAnchor="middle"
          fontFamily="Fraunces, serif"
          fontSize="14"
          fill="#0e1b2a"
          fontStyle="italic"
        >
          T (K)
        </text>

        {/* Grid lines */}
        <g stroke="#94a3b8" strokeWidth="0.4" opacity="0.4" strokeDasharray="2 3">
          <line x1="0" y1="80" x2="180" y2="80" />
          <line x1="0" y1="130" x2="180" y2="130" />
          <line x1="0" y1="180" x2="180" y2="180" />
          <line x1="60" y1="40" x2="60" y2="220" />
          <line x1="120" y1="40" x2="120" y2="220" />
        </g>

        {/* Curve 1: bulk reference — peaks lower and at lower T (around 350K typical for Bi₂Te₃) */}
        <path
          d="M 0 215 C 30 200, 55 170, 70 160 C 85 152, 100 158, 130 175 C 155 188, 175 198, 180 200"
          fill="none"
          stroke="#94a3b8"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          opacity="0.7"
        />
        <circle cx="70" cy="160" r="3" fill="#94a3b8" opacity="0.8" />
        <text
          x="80"
          y="155"
          fontFamily="Inter Tight, sans-serif"
          fontSize="10"
          fill="#64748b"
        >
          bulk (Bi₂Te₃)
        </text>

        {/* Curve 2: BK Lab engineered — peaks higher AND at higher T (microstructured / nanostructured) */}
        <path
          d="M 0 210 C 30 190, 65 130, 95 80 C 115 65, 135 70, 160 110 C 170 130, 178 145, 180 150"
          fill="none"
          stroke="#dc2626"
          strokeWidth="2.2"
        >
          <animate
            attributeName="stroke-opacity"
            values="0.75;1;0.75"
            dur="3.5s"
            repeatCount="indefinite"
          />
        </path>
        {/* Peak marker on the engineered curve */}
        <circle cx="100" cy="74" r="4" fill="#dc2626">
          <animate attributeName="r" values="4;6;4" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <text
          x="108"
          y="68"
          fontFamily="JetBrains Mono, monospace"
          fontSize="9"
          fill="#dc2626"
          fontWeight="500"
        >
          ZT ↑
        </text>

        {/* Curve label */}
        <text
          x="140"
          y="100"
          fontFamily="JetBrains Mono, monospace"
          fontSize="8"
          fill="#dc2626"
          fontWeight="500"
        >
          engineered
        </text>

        {/* Title */}
        <text
          x="90"
          y="22"
          textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
          fontSize="9"
          fill="#7c2d12"
          letterSpacing="0.1em"
          fontWeight="500"
        >
          FIGURE OF MERIT
        </text>
      </g>

      {/* Top-right title strip */}
      <text
        x="560"
        y="22"
        textAnchor="end"
        fontFamily="JetBrains Mono, monospace"
        fontSize="9"
        fill="#dc2626"
        letterSpacing="0.15em"
        fontWeight="500"
      >
        THERMOELECTRIC CONVERSION
      </text>
    </svg>
  );
}

/* ============================================================
   03. Ferroelectric & Piezoelectric Devices
   Concept: P-E hysteresis loop on the left, switching domain
            structure on the right (up/down polarization with
            domain walls), device stack underneath.
   ============================================================ */
function FerroelectricVisual() {
  return (
    <svg
      viewBox="0 0 600 450"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-labelledby="fe-title fe-desc"
    >
      <title id="fe-title">Ferroelectric and piezoelectric devices</title>
      <desc id="fe-desc">
        Abstract visualization of ferroelectric switching: P-E hysteresis loop
        on the left, polarization domain structure with up and down arrows
        on the right, and a thin-film capacitor device stack at the bottom.
      </desc>

      <defs>
        <linearGradient id="fe-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#faf5ff" />
          <stop offset="100%" stopColor="#ede9fe" />
        </linearGradient>

        {/* Up-polarization domain (purple) */}
        <linearGradient id="fe-up" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.12" />
        </linearGradient>
        {/* Down-polarization domain (cyan) */}
        <linearGradient id="fe-down" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10a6c8" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#10a6c8" stopOpacity="0.32" />
        </linearGradient>

        {/* Electrodes */}
        <linearGradient id="fe-electrode" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#475569" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#1e293b" stopOpacity="0.95" />
        </linearGradient>

        <marker id="fe-arrow-up" viewBox="0 0 10 10" refX="5" refY="0" markerWidth="5" markerHeight="5" orient="0">
          <path d="M0 8 L5 0 L10 8 Z" fill="#7c3aed" />
        </marker>
        <marker id="fe-arrow-down" viewBox="0 0 10 10" refX="5" refY="10" markerWidth="5" markerHeight="5" orient="0">
          <path d="M0 2 L5 10 L10 2 Z" fill="#10a6c8" />
        </marker>
      </defs>

      <rect width="600" height="450" fill="url(#fe-bg)" />

      {/* Subtle grid */}
      <g stroke="#7c3aed" strokeWidth="0.3" opacity="0.15">
        {Array.from({ length: 13 }, (_, i) => (
          <line key={`gv${i}`} x1={i * 50} y1="0" x2={i * 50} y2="450" />
        ))}
        {Array.from({ length: 10 }, (_, i) => (
          <line key={`gh${i}`} x1="0" y1={i * 50} x2="600" y2={i * 50} />
        ))}
      </g>

      {/* ===== Left: P-E hysteresis loop ===== */}
      <g transform="translate(40, 60)">
        {/*
          Coordinate system inside this group:
          - Box: 0..220 × 0..220, origin at (110, 110)
          - +E to the right (x: 110 → 220), −E to the left (x: 110 → 0)
          - +P upward (y: 110 → 0),       −P downward (y: 110 → 220)
          - Saturation polarization Ps at y = 50  (top)   and y = 170 (bottom)
          - Remanent polarization Pr at y = 70    and y = 150
          - Coercive field Ec at x = 85 (−Ec)     and x = 135 (+Ec)

          Two branches are exact 180° point reflections about (110, 110) so the
          loop is symmetric in both E and P.
        */}

        {/* Axes */}
        <line x1="0" y1="110" x2="220" y2="110" stroke="#0e1b2a" strokeWidth="1" />
        <line x1="110" y1="0" x2="110" y2="220" stroke="#0e1b2a" strokeWidth="1" />

        {/* Axis labels */}
        <text
          x="218"
          y="106"
          textAnchor="end"
          fontFamily="Fraunces, serif"
          fontSize="14"
          fill="#0e1b2a"
          fontStyle="italic"
        >
          E
        </text>
        <text
          x="114"
          y="10"
          fontFamily="Fraunces, serif"
          fontSize="14"
          fill="#0e1b2a"
          fontStyle="italic"
        >
          P
        </text>

        {/*
          Upper branch (sweep from −Es to +Es going right):
          Start at (10, 170) negative saturation.
          Rise gradually toward −Ec, then steep climb through +Ec,
          then saturate toward (210, 50).

          Path uses cubic Bézier C with control points placed so the
          curve is steepest near +Ec and flattens at saturation.
        */}
        {/*
          Branches designed so that:
          - Upper branch crosses the P-axis (x=110) at y=78  (this is +Pr)
          - Lower branch crosses the P-axis at        y=142  (this is −Pr)
          - Upper branch crosses E-axis (y=110) at    x=85   (this is −Ec, polarization flip)
          - Lower branch crosses E-axis at            x=135  (this is +Ec)

          Path strategy: split each branch into TWO cubic Béziers, joined at
          the remanent point (+Pr or −Pr). This guarantees the curve actually
          passes through ±Pr, ±Ec, and saturates near ±Es.

          UPPER BRANCH (left → right):
            seg A:  (10, 175)  →  (110, 78)
              - must pass through (85, 110) i.e. −Ec on the way
              - control points keep curve "S-shaped": flat near start, steep
                between −Ec and +Pr.
            seg B:  (110, 78)  →  (210, 45)
              - must pass through (135, 50) i.e. just above +Ec, near saturation
              - flattens toward +Es.
        */}
        {/*
          Hysteresis loop drawn as two cubic-Bezier curves.
          Anchors on upper branch (the curve traversed E: −Es → +Es):
            (10, 175)  −Es
            (85, 130)  near −Ec, just starting to switch
            (110, 78)  +Pr exact (P-axis crossing)
            (135, 55)  near +Ec, near saturation
            (210, 45)  +Es
          Anchors on lower branch (E: −Es → +Es, but on the lower path back from +Es):
            (10, 175)  −Es
            (85, 165)  hasn't switched yet
            (110, 142) −Pr exact
            (135, 90)  switching past +Ec
            (210, 45)  +Es
          Each 4-segment cubic Bezier is designed so y is monotonically decreasing
          (no backswitching artifacts).  Control points lie on the same monotone path.
          The two branches share endpoints (10,175) and (210,45) → closed loop.
        */}
        <path
          d="M 10 175 C 35 174, 60 170, 85 130 C 90 110, 100 90, 110 78 C 115 70, 125 60, 135 55 C 160 50, 185 47, 210 45"
          fill="none"
          stroke="#7c3aed"
          strokeWidth="2.2"
          strokeLinecap="round"
        >
          <animate attributeName="stroke-opacity" values="0.75;1;0.75" dur="3.5s" repeatCount="indefinite" />
        </path>

        {/* LOWER BRANCH — point reflection about (110, 110), so the loop is symmetric. */}
        <path
          d="M 10 175 C 35 173, 60 170, 85 165 C 95 160, 105 150, 110 142 C 120 130, 130 110, 135 90 C 160 50, 185 46, 210 45"
          fill="none"
          stroke="#7c3aed"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.85"
        >
          <animate attributeName="stroke-opacity" values="0.65;0.9;0.65" dur="3.5s" begin="0.5s" repeatCount="indefinite" />
        </path>

        {/* Arrows showing sweep direction (placed in the steep region) */}
        <g>
          {/* Upper branch: rightward sweep, place at the steepest part (near −Ec going up) */}
          <polygon points="100,93 92,90 92,98" fill="#7c3aed" opacity="0.95" />
          {/* Lower branch: leftward sweep, mirror image */}
          <polygon points="120,127 128,130 128,122" fill="#7c3aed" opacity="0.8" />
        </g>

        {/* Annotation: +Pr (remanent polarization, intersection with P-axis on upper branch) */}
        <circle cx="110" cy="78" r="3" fill="#7c3aed" />
        <line x1="110" y1="78" x2="138" y2="48" stroke="#64748b" strokeWidth="0.5" strokeDasharray="2 2" />
        <text
          x="142"
          y="46"
          fontFamily="JetBrains Mono, monospace"
          fontSize="9"
          fill="#7c3aed"
          fontWeight="500"
        >
          +Pr
        </text>

        {/* −Pr (lower branch crossing of P-axis) */}
        <circle cx="110" cy="142" r="3" fill="#7c3aed" />
        <line x1="110" y1="142" x2="82" y2="172" stroke="#64748b" strokeWidth="0.5" strokeDasharray="2 2" />
        <text
          x="78"
          y="174"
          textAnchor="end"
          fontFamily="JetBrains Mono, monospace"
          fontSize="9"
          fill="#7c3aed"
          fontWeight="500"
        >
          −Pr
        </text>

        {/* Coercive field markers — at the actual intersection of the branches with the E-axis */}
        <circle cx="92" cy="110" r="3" fill="#10a6c8" />
        <circle cx="128" cy="110" r="3" fill="#10a6c8" />
        <text
          x="92"
          y="124"
          textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
          fontSize="8"
          fill="#0c4a6e"
        >
          −Ec
        </text>
        <text
          x="128"
          y="124"
          textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
          fontSize="8"
          fill="#0c4a6e"
        >
          +Ec
        </text>

        {/* Saturation indicators (dotted lines to Ps levels) */}
        <line x1="0" y1="50" x2="210" y2="50" stroke="#94a3b8" strokeWidth="0.4" strokeDasharray="2 3" opacity="0.5" />
        <line x1="10" y1="170" x2="220" y2="170" stroke="#94a3b8" strokeWidth="0.4" strokeDasharray="2 3" opacity="0.5" />
        <text
          x="218"
          y="48"
          textAnchor="end"
          fontFamily="JetBrains Mono, monospace"
          fontSize="8"
          fill="#94a3b8"
        >
          +Ps
        </text>
        <text
          x="2"
          y="180"
          fontFamily="JetBrains Mono, monospace"
          fontSize="8"
          fill="#94a3b8"
        >
          −Ps
        </text>

        {/* Title */}
        <text
          x="110"
          y="240"
          textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
          fontSize="9"
          fill="#7c3aed"
          letterSpacing="0.15em"
          fontWeight="500"
        >
          P–E HYSTERESIS
        </text>
      </g>

      {/* ===== Right: domain structure ===== */}
      <g transform="translate(320, 60)">
        {/* Frame */}
        <rect x="0" y="0" width="240" height="220" rx="2" fill="white" stroke="#7c3aed" strokeWidth="0.8" opacity="0.9" />

        {/* Domain regions with up/down polarization */}
        {/* Up domain 1 (left) */}
        <rect x="0" y="0" width="65" height="220" fill="url(#fe-up)" />
        {/* Down domain (middle) */}
        <rect x="65" y="0" width="55" height="220" fill="url(#fe-down)" />
        {/* Up domain 2 */}
        <rect x="120" y="0" width="70" height="220" fill="url(#fe-up)" />
        {/* Down domain (right) */}
        <rect x="190" y="0" width="50" height="220" fill="url(#fe-down)" />

        {/* Domain walls (vertical dashed) */}
        <line x1="65" y1="0" x2="65" y2="220" stroke="#0e1b2a" strokeWidth="0.6" strokeDasharray="3 2" opacity="0.5" />
        <line x1="120" y1="0" x2="120" y2="220" stroke="#0e1b2a" strokeWidth="0.6" strokeDasharray="3 2" opacity="0.5" />
        <line x1="190" y1="0" x2="190" y2="220" stroke="#0e1b2a" strokeWidth="0.6" strokeDasharray="3 2" opacity="0.5" />

        {/* Up arrows */}
        <g>
          {[
            [22, 50], [42, 90], [22, 130], [42, 170],
            [140, 50], [165, 90], [140, 130], [165, 170], [180, 200],
          ].map(([x, y], i) => (
            <g key={`up-${i}`}>
              <line
                x1={x}
                y1={y + 14}
                x2={x}
                y2={y - 8}
                stroke="#7c3aed"
                strokeWidth="1.8"
                markerEnd="url(#fe-arrow-up)"
              >
                <animate
                  attributeName="opacity"
                  values="0.7;1;0.7"
                  dur={`${3 + (i % 3) * 0.4}s`}
                  begin={`${i * 0.15}s`}
                  repeatCount="indefinite"
                />
              </line>
            </g>
          ))}
        </g>

        {/* Down arrows */}
        <g>
          {[
            [82, 50], [98, 90], [82, 130], [98, 170],
            [208, 50], [220, 90], [208, 130], [220, 170],
          ].map(([x, y], i) => (
            <g key={`down-${i}`}>
              <line
                x1={x}
                y1={y - 8}
                x2={x}
                y2={y + 14}
                stroke="#10a6c8"
                strokeWidth="1.8"
                markerEnd="url(#fe-arrow-down)"
              >
                <animate
                  attributeName="opacity"
                  values="0.6;1;0.6"
                  dur={`${3.5 + (i % 3) * 0.3}s`}
                  begin={`${i * 0.2}s`}
                  repeatCount="indefinite"
                />
              </line>
            </g>
          ))}
        </g>

        {/* Switching event (one arrow flipping) */}
        <g transform="translate(98, 200)">
          <circle cx="0" cy="0" r="12" fill="none" stroke="#dc2626" strokeWidth="1" opacity="0.6">
            <animate attributeName="r" values="6;18;6" dur="2.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;0;0.8" dur="2.5s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* Title */}
        <text
          x="120"
          y="240"
          textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
          fontSize="9"
          fill="#7c3aed"
          letterSpacing="0.15em"
          fontWeight="500"
        >
          DOMAIN STRUCTURE
        </text>
      </g>

      {/* ===== Bottom: device stack (capacitor cross-section) ===== */}
      <g transform="translate(80, 340)">
        {/* Top electrode */}
        <rect x="0" y="0" width="440" height="14" rx="1" fill="url(#fe-electrode)" />
        <text
          x="-8"
          y="11"
          textAnchor="end"
          fontFamily="JetBrains Mono, monospace"
          fontSize="9"
          fill="#475569"
        >
          Top
        </text>
        {/* Ferroelectric layer */}
        <rect x="0" y="14" width="440" height="28" fill="url(#fe-up)" stroke="#7c3aed" strokeWidth="0.5" />
        {/* Mini domain arrows inside */}
        <g>
          {[40, 100, 160, 220, 280, 340, 400].map((x, i) => (
            <line
              key={i}
              x1={x}
              y1={36}
              x2={x}
              y2={22}
              stroke="#7c3aed"
              strokeWidth="1.2"
              markerEnd="url(#fe-arrow-up)"
              opacity="0.8"
            />
          ))}
        </g>
        <text
          x="-8"
          y="32"
          textAnchor="end"
          fontFamily="JetBrains Mono, monospace"
          fontSize="9"
          fill="#7c3aed"
          fontWeight="500"
        >
          FE
        </text>
        {/* Bottom electrode */}
        <rect x="0" y="42" width="440" height="14" rx="1" fill="url(#fe-electrode)" />
        <text
          x="-8"
          y="53"
          textAnchor="end"
          fontFamily="JetBrains Mono, monospace"
          fontSize="9"
          fill="#475569"
        >
          Bottom
        </text>
        {/* Substrate */}
        <rect x="0" y="56" width="440" height="22" fill="#cbd5e1" opacity="0.5" stroke="#94a3b8" strokeWidth="0.5" />
        <text
          x="-8"
          y="71"
          textAnchor="end"
          fontFamily="JetBrains Mono, monospace"
          fontSize="9"
          fill="#64748b"
        >
          Sub
        </text>

        {/* Bias voltage connector on the right */}
        <line x1="445" y1="7" x2="475" y2="7" stroke="#0e1b2a" strokeWidth="0.8" />
        <line x1="445" y1="49" x2="475" y2="49" stroke="#0e1b2a" strokeWidth="0.8" />
        <line x1="475" y1="7" x2="475" y2="49" stroke="#0e1b2a" strokeWidth="0.8" />
        <text
          x="482"
          y="32"
          fontFamily="Fraunces, serif"
          fontSize="13"
          fill="#0e1b2a"
          fontStyle="italic"
        >
          V
        </text>
      </g>

      {/* Top-right title strip */}
      <text
        x="560"
        y="22"
        textAnchor="end"
        fontFamily="JetBrains Mono, monospace"
        fontSize="9"
        fill="#7c3aed"
        letterSpacing="0.15em"
        fontWeight="500"
      >
        FERROELECTRIC SWITCHING
      </text>
    </svg>
  );
}
