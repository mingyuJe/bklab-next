type Props = { name: string; className?: string };

export default function EquipmentIcon({ name, className }: Props) {
  const common = {
    viewBox: '0 0 80 60',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    className,
  };

  switch (name) {
    case 'furnace-low':
      return (
        <svg {...common}>
          <rect x="10" y="20" width="60" height="35" rx="2" />
          <rect x="20" y="30" width="40" height="20" />
          <line x1="14" y1="40" x2="18" y2="40" strokeLinecap="round" />
          <circle cx="22" cy="15" r="2" />
          <circle cx="30" cy="15" r="2" />
        </svg>
      );
    case 'furnace-high':
      return (
        <svg {...common}>
          <rect x="10" y="20" width="60" height="35" rx="2" />
          <rect x="20" y="30" width="40" height="20" />
          <text x="40" y="42" textAnchor="middle" fontSize="8" fontFamily="JetBrains Mono, monospace" fill="currentColor">1700°C</text>
        </svg>
      );
    case 'ball-mill':
      return (
        <svg {...common}>
          <circle cx="40" cy="30" r="20" />
          <circle cx="35" cy="25" r="3" fill="currentColor" />
          <circle cx="45" cy="32" r="2.5" fill="currentColor" />
          <circle cx="38" cy="35" r="2" fill="currentColor" />
          <line x1="40" y1="5" x2="40" y2="10" />
          <line x1="20" y1="50" x2="60" y2="50" />
        </svg>
      );
    case 'press':
      return (
        <svg {...common}>
          <rect x="20" y="10" width="40" height="8" />
          <line x1="40" y1="18" x2="40" y2="30" />
          <rect x="15" y="30" width="50" height="15" />
          <line x1="20" y1="50" x2="60" y2="50" />
        </svg>
      );
    case 'vacuum-press':
      return (
        <svg {...common}>
          <rect x="15" y="15" width="50" height="35" rx="2" />
          <circle cx="40" cy="32" r="10" />
          <text x="40" y="36" textAnchor="middle" fontSize="6" fontFamily="JetBrains Mono, monospace" fill="currentColor">600°C</text>
        </svg>
      );
    case 'ultrasonic':
      return (
        <svg {...common}>
          <rect x="15" y="20" width="50" height="30" rx="2" />
          <circle cx="40" cy="35" r="8" />
          <line x1="32" y1="35" x2="48" y2="35" strokeDasharray="2 2" />
        </svg>
      );
    case 'pld':
      return (
        <svg {...common}>
          <circle cx="40" cy="30" r="20" />
          <line x1="10" y1="30" x2="20" y2="30" strokeWidth="3" stroke="#2266d1" />
          <circle cx="50" cy="25" r="2" fill="currentColor" />
          <path d="M 50 27 L 55 30 L 60 28 L 65 32" strokeDasharray="1 1" />
          <rect x="35" y="40" width="10" height="2" fill="currentColor" />
        </svg>
      );
    case 'tube-furnace':
      return (
        <svg {...common}>
          <rect x="5" y="25" width="70" height="15" rx="2" />
          <line x1="20" y1="22" x2="20" y2="43" />
          <line x1="60" y1="22" x2="60" y2="43" />
          <text x="40" y="36" textAnchor="middle" fontSize="6" fontFamily="JetBrains Mono, monospace" fill="currentColor">1200°C</text>
        </svg>
      );
    case 'rf-sputter':
      return (
        <svg {...common}>
          <circle cx="40" cy="30" r="22" />
          <circle cx="40" cy="20" r="3" fill="#2266d1" />
          <circle cx="32" cy="35" r="3" fill="#10a6c8" />
          <circle cx="48" cy="35" r="3" fill="#7c3aed" />
          <line x1="40" y1="23" x2="40" y2="32" />
          <line x1="35" y1="35" x2="45" y2="35" />
        </svg>
      );
    case 'multi-sputter':
      return (
        <svg {...common}>
          <circle cx="40" cy="30" r="22" />
          <circle cx="30" cy="22" r="2.5" fill="#2266d1" />
          <circle cx="50" cy="22" r="2.5" fill="#2266d1" />
          <circle cx="22" cy="35" r="2.5" fill="#2266d1" />
          <circle cx="58" cy="35" r="2.5" fill="#2266d1" />
          <circle cx="40" cy="42" r="2.5" fill="#2266d1" />
        </svg>
      );
    case 'ebeam':
      return (
        <svg {...common}>
          <rect x="15" y="15" width="50" height="35" />
          <path d="M 25 25 L 30 35 L 35 30 L 40 25" stroke="#2266d1" strokeWidth="2" />
          <line x1="45" y1="30" x2="55" y2="30" strokeDasharray="2 2" />
          <circle cx="40" cy="45" r="2" fill="currentColor" />
        </svg>
      );
    case 'glad':
      return (
        <svg {...common}>
          <rect x="15" y="15" width="50" height="35" />
          <path d="M 25 35 Q 40 20, 55 35" stroke="#7c3aed" strokeWidth="2" />
          <text x="40" y="48" textAnchor="middle" fontSize="6" fontFamily="JetBrains Mono, monospace" fill="currentColor">GLAD</text>
        </svg>
      );
    case 'xrd':
      return (
        <svg {...common}>
          <path d="M 10 50 L 25 30 L 35 35 L 45 15 L 55 40 L 70 25" stroke="#2266d1" strokeWidth="2" />
          <line x1="10" y1="50" x2="70" y2="50" />
          <line x1="10" y1="50" x2="10" y2="10" />
        </svg>
      );
    case 'sem':
      return (
        <svg {...common}>
          <circle cx="40" cy="30" r="15" />
          <circle cx="40" cy="30" r="8" />
          <circle cx="40" cy="30" r="2" fill="currentColor" />
          <line x1="40" y1="10" x2="40" y2="15" />
          <line x1="40" y1="45" x2="40" y2="50" />
        </svg>
      );
    case 'afm':
      return (
        <svg {...common}>
          <rect x="20" y="10" width="40" height="40" />
          <circle cx="40" cy="30" r="10" />
          <line x1="35" y1="25" x2="45" y2="25" strokeWidth="0.8" />
          <line x1="35" y1="30" x2="45" y2="30" strokeWidth="0.8" />
          <line x1="35" y1="35" x2="45" y2="35" strokeWidth="0.8" />
        </svg>
      );
    case 'ferroelectric':
      return (
        <svg {...common}>
          <rect x="15" y="20" width="50" height="25" rx="2" />
          <path d="M 20 35 L 30 30 L 40 32 L 50 28 L 60 30" stroke="#2266d1" strokeWidth="1.5" />
        </svg>
      );
    case 'te':
      return (
        <svg {...common}>
          <rect x="15" y="20" width="50" height="25" rx="2" />
          <text x="40" y="36" textAnchor="middle" fontSize="10" fontFamily="JetBrains Mono, monospace" fill="currentColor">ZT</text>
        </svg>
      );
    case 'ppms':
      return (
        <svg {...common}>
          <rect x="15" y="15" width="50" height="35" />
          <line x1="25" y1="25" x2="25" y2="45" />
          <line x1="35" y1="25" x2="35" y2="45" />
          <line x1="45" y1="25" x2="45" y2="45" />
          <line x1="55" y1="25" x2="55" y2="45" />
          <text x="40" y="20" textAnchor="middle" fontSize="5" fontFamily="JetBrains Mono, monospace" fill="currentColor">PPMS</text>
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <rect x="20" y="20" width="40" height="20" rx="2" />
        </svg>
      );
  }
}
