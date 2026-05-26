export default function CrystalVisual() {
  return (
    <svg
      viewBox="0 0 400 380"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="bondGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2266d1" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#10a6c8" stopOpacity="0.5" />
        </linearGradient>
        <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2266d1" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#2266d1" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="filmGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2266d1" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#10a6c8" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id="filmGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#10a6c8" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#2266d1" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      <g stroke="url(#bondGrad)" strokeWidth="0.6" fill="none" opacity="0.55">
        <line x1="0" y1="60" x2="400" y2="60" />
        <line x1="0" y1="120" x2="400" y2="120" />
        <line x1="0" y1="180" x2="400" y2="180" />
        <line x1="0" y1="240" x2="400" y2="240" />
        <line x1="60" y1="0" x2="60" y2="380" />
        <line x1="140" y1="0" x2="140" y2="380" />
        <line x1="220" y1="0" x2="220" y2="380" />
        <line x1="300" y1="0" x2="300" y2="380" />
        <line x1="380" y1="0" x2="380" y2="380" />
      </g>

      <g stroke="url(#bondGrad)" strokeWidth="0.4" opacity="0.3">
        <line x1="0" y1="0" x2="400" y2="380" />
        <line x1="400" y1="0" x2="0" y2="380" />
      </g>

      <circle cx="140" cy="120" r="60" fill="url(#nodeGlow)">
        <animate attributeName="r" values="50;80;50" dur="6s" repeatCount="indefinite" />
      </circle>
      <circle cx="300" cy="240" r="50" fill="url(#nodeGlow)" opacity="0.7">
        <animate attributeName="r" values="40;70;40" dur="7s" begin="2s" repeatCount="indefinite" />
      </circle>

      <g>
        <circle cx="60" cy="60" r="3" fill="#2266d1">
          <animate attributeName="r" values="3;5;3" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="140" cy="120" r="3.5" fill="#10a6c8">
          <animate attributeName="r" values="3.5;6;3.5" dur="3.5s" begin="0.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;1;0.7" dur="3.5s" begin="0.4s" repeatCount="indefinite" />
        </circle>
        <circle cx="220" cy="60" r="3" fill="#2266d1">
          <animate attributeName="r" values="3;5;3" dur="4s" begin="1s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;1;0.7" dur="4s" begin="1s" repeatCount="indefinite" />
        </circle>
        <circle cx="300" cy="120" r="3.5" fill="#7c3aed">
          <animate attributeName="r" values="3.5;6;3.5" dur="3.2s" begin="1.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;1;0.7" dur="3.2s" begin="1.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="380" cy="60" r="3" fill="#10a6c8">
          <animate attributeName="r" values="3;5;3" dur="3.8s" begin="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="60" cy="180" r="3" fill="#7c3aed">
          <animate attributeName="r" values="3;5;3" dur="4.2s" begin="0.3s" repeatCount="indefinite" />
        </circle>
        <circle cx="220" cy="180" r="3.5" fill="#2266d1">
          <animate attributeName="r" values="3.5;6;3.5" dur="3.5s" begin="2.2s" repeatCount="indefinite" />
        </circle>
        <circle cx="380" cy="180" r="3" fill="#10a6c8">
          <animate attributeName="r" values="3;5;3" dur="3.7s" begin="1.7s" repeatCount="indefinite" />
        </circle>
        <circle cx="140" cy="240" r="3.5" fill="#7c3aed">
          <animate attributeName="r" values="3.5;6;3.5" dur="3.3s" begin="1.3s" repeatCount="indefinite" />
        </circle>
        <circle cx="300" cy="240" r="3.5" fill="#2266d1">
          <animate attributeName="r" values="3.5;6;3.5" dur="3.6s" begin="0.7s" repeatCount="indefinite" />
        </circle>
      </g>

      <g>
        <rect x="40" y="300" width="320" height="6" rx="3" fill="url(#filmGrad1)">
          <animate attributeName="opacity" values="0.85;1;0.85" dur="4s" repeatCount="indefinite" />
        </rect>
        <rect x="60" y="315" width="280" height="4" rx="2" fill="url(#filmGrad2)" opacity="0.7">
          <animate attributeName="opacity" values="0.5;0.8;0.5" dur="5s" begin="1s" repeatCount="indefinite" />
        </rect>
        <rect x="80" y="326" width="240" height="3" rx="1.5" fill="url(#filmGrad2)" opacity="0.5">
          <animate attributeName="opacity" values="0.3;0.6;0.3" dur="6s" begin="2s" repeatCount="indefinite" />
        </rect>
        <line x1="20" y1="350" x2="380" y2="350" stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="2 3" />
        <text x="200" y="366" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#94a3b8" letterSpacing="0.1em">SUBSTRATE</text>
      </g>

      <text x="20" y="22" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#2266d1" letterSpacing="0.15em" fontWeight="500">EPITAXIAL HETEROSTRUCTURE</text>
    </svg>
  );
}
