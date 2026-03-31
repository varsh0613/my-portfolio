// Custom hand-crafted SVG icons that match the lab/research aesthetic
// Colors: forest green (#1B4332, #2D6A4F, #52B788), gold (#8B6914), cream (#F5F2EC)

export function MicroscopeIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Eyepiece */}
      <path d="M24 6C25.1046 6 26 6.89543 26 8V14C26 15.1046 25.1046 16 24 16C22.8954 16 22 15.1046 22 14V8C22 6.89543 22.8954 6 24 6Z" fill="#2D6A4F"/>
      {/* Body tube */}
      <path d="M21 14H27V24C27 25.6569 25.6569 27 24 27C22.3431 27 21 25.6569 21 24V14Z" fill="#1B4332"/>
      {/* Objective lens */}
      <circle cx="24" cy="30" r="4" fill="#52B788"/>
      <circle cx="24" cy="30" r="2" fill="#1B4332"/>
      {/* Stage */}
      <rect x="14" y="33" width="20" height="3" rx="1" fill="#2D6A4F"/>
      {/* Arm */}
      <path d="M28 20V36C28 37.1046 27.1046 38 26 38H22C20.8954 38 20 37.1046 20 36V20" stroke="#1B4332" strokeWidth="2"/>
      {/* Base */}
      <path d="M12 42H36C37.1046 42 38 41.1046 38 40V38C38 36.8954 37.1046 36 36 36H12C10.8954 36 10 36.8954 10 38V40C10 41.1046 10.8954 42 12 42Z" fill="#1B4332"/>
      {/* Focus knob */}
      <circle cx="32" cy="28" r="3" fill="#8B6914"/>
      <circle cx="32" cy="28" r="1.5" fill="#1B4332"/>
    </svg>
  )
}

export function BeakerIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Beaker outline */}
      <path d="M14 8H34V10C34 10 36 10 36 12V38C36 40 34 42 32 42H16C14 42 12 40 12 38V12C12 10 14 10 14 10V8Z" stroke="#2D6A4F" strokeWidth="2" fill="none"/>
      {/* Liquid */}
      <path d="M14 24C14 24 18 26 24 26C30 26 34 24 34 24V38C34 39.1046 33.1046 40 32 40H16C14.8954 40 14 39.1046 14 38V24Z" fill="#52B788" fillOpacity="0.6"/>
      {/* Bubbles */}
      <circle cx="18" cy="32" r="2" fill="#52B788" fillOpacity="0.8"/>
      <circle cx="26" cy="34" r="1.5" fill="#52B788" fillOpacity="0.8"/>
      <circle cx="22" cy="30" r="1" fill="#52B788" fillOpacity="0.8"/>
      {/* Measurement lines */}
      <path d="M14 18H18M14 24H16M14 30H18M14 36H16" stroke="#2D6A4F" strokeWidth="1" strokeOpacity="0.5"/>
      {/* Rim */}
      <path d="M14 8H34" stroke="#1B4332" strokeWidth="2" strokeLinecap="round"/>
      {/* Spout */}
      <path d="M34 8L38 6" stroke="#1B4332" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

export function DNAIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* DNA double helix */}
      <path d="M16 6C16 6 20 10 24 10C28 10 32 6 32 6" stroke="#2D6A4F" strokeWidth="2" strokeLinecap="round"/>
      <path d="M16 14C16 14 20 18 24 18C28 18 32 14 32 14" stroke="#52B788" strokeWidth="2" strokeLinecap="round"/>
      <path d="M16 22C16 22 20 26 24 26C28 26 32 22 32 22" stroke="#2D6A4F" strokeWidth="2" strokeLinecap="round"/>
      <path d="M16 30C16 30 20 34 24 34C28 34 32 30 32 30" stroke="#52B788" strokeWidth="2" strokeLinecap="round"/>
      <path d="M16 38C16 38 20 42 24 42C28 42 32 38 32 38" stroke="#2D6A4F" strokeWidth="2" strokeLinecap="round"/>
      {/* Backbone strands */}
      <path d="M16 6V42" stroke="#1B4332" strokeWidth="2" strokeLinecap="round"/>
      <path d="M32 6V42" stroke="#1B4332" strokeWidth="2" strokeLinecap="round"/>
      {/* Base pair dots */}
      <circle cx="20" cy="10" r="1.5" fill="#8B6914"/>
      <circle cx="28" cy="10" r="1.5" fill="#8B6914"/>
      <circle cx="20" cy="26" r="1.5" fill="#8B6914"/>
      <circle cx="28" cy="26" r="1.5" fill="#8B6914"/>
      <circle cx="20" cy="42" r="1.5" fill="#8B6914"/>
      <circle cx="28" cy="42" r="1.5" fill="#8B6914"/>
    </svg>
  )
}

export function MonitorIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Monitor frame */}
      <rect x="6" y="8" width="36" height="26" rx="2" fill="#1B4332"/>
      {/* Screen */}
      <rect x="8" y="10" width="32" height="22" rx="1" fill="#0A1F12"/>
      {/* Data visualization */}
      <path d="M12 26L18 20L24 24L30 16L36 22" stroke="#52B788" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Grid lines */}
      <path d="M12 18H36M12 22H36M12 26H36" stroke="#2D6A4F" strokeWidth="0.5" strokeOpacity="0.3"/>
      {/* Data points */}
      <circle cx="18" cy="20" r="2" fill="#52B788"/>
      <circle cx="24" cy="24" r="2" fill="#52B788"/>
      <circle cx="30" cy="16" r="2" fill="#8B6914"/>
      {/* Stand */}
      <path d="M20 34H28V36H20V34Z" fill="#2D6A4F"/>
      <path d="M16 36H32V38C32 39.1046 31.1046 40 30 40H18C16.8954 40 16 39.1046 16 38V36Z" fill="#1B4332"/>
    </svg>
  )
}

export function FolderIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Folder back */}
      <path d="M6 14C6 12.8954 6.89543 12 8 12H18L22 16H40C41.1046 16 42 16.8954 42 18V38C42 39.1046 41.1046 40 40 40H8C6.89543 40 6 39.1046 6 38V14Z" fill="#2D6A4F"/>
      {/* Folder front flap */}
      <path d="M6 18H42V38C42 39.1046 41.1046 40 40 40H8C6.89543 40 6 39.1046 6 38V18Z" fill="#1B4332"/>
      {/* Tab */}
      <path d="M6 14C6 12.8954 6.89543 12 8 12H18L22 16H6V14Z" fill="#52B788"/>
      {/* Document lines */}
      <rect x="14" y="24" width="20" height="2" rx="1" fill="#52B788" fillOpacity="0.4"/>
      <rect x="14" y="30" width="14" height="2" rx="1" fill="#52B788" fillOpacity="0.4"/>
      {/* Corner fold */}
      <path d="M36 24L42 18V24H36Z" fill="#0F2318"/>
    </svg>
  )
}

export function TimelineIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Main timeline path - curved journey */}
      <path 
        d="M8 40C8 40 12 38 16 32C20 26 20 22 24 20C28 18 28 26 32 24C36 22 40 14 40 8" 
        stroke="#2D6A4F" 
        strokeWidth="2" 
        strokeLinecap="round"
        fill="none"
      />
      {/* Milestone nodes */}
      <circle cx="8" cy="40" r="4" fill="#1B4332" stroke="#52B788" strokeWidth="2"/>
      <circle cx="16" cy="32" r="3" fill="#52B788"/>
      <circle cx="24" cy="20" r="4" fill="#1B4332" stroke="#52B788" strokeWidth="2"/>
      <circle cx="32" cy="24" r="3" fill="#8B6914"/>
      <circle cx="40" cy="8" r="4" fill="#1B4332" stroke="#52B788" strokeWidth="2"/>
      {/* Connection dots */}
      <circle cx="12" cy="36" r="1.5" fill="#52B788" fillOpacity="0.5"/>
      <circle cx="20" cy="26" r="1.5" fill="#52B788" fillOpacity="0.5"/>
      <circle cx="28" cy="22" r="1.5" fill="#52B788" fillOpacity="0.5"/>
      <circle cx="36" cy="16" r="1.5" fill="#52B788" fillOpacity="0.5"/>
      {/* Arrow head */}
      <path d="M40 8L36 12L38 8L36 4L40 8Z" fill="#52B788"/>
    </svg>
  )
}

export function CertificateIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Document */}
      <rect x="8" y="6" width="32" height="36" rx="2" fill="#F5F2EC" stroke="#2D6A4F" strokeWidth="2"/>
      {/* Header line */}
      <rect x="14" y="12" width="20" height="3" rx="1" fill="#1B4332"/>
      {/* Content lines */}
      <rect x="14" y="20" width="20" height="2" rx="1" fill="#2D6A4F" fillOpacity="0.3"/>
      <rect x="14" y="26" width="16" height="2" rx="1" fill="#2D6A4F" fillOpacity="0.3"/>
      {/* Seal/Badge */}
      <circle cx="32" cy="34" r="6" fill="#8B6914"/>
      <circle cx="32" cy="34" r="4" fill="#52B788"/>
      <path d="M30 34L31.5 35.5L34.5 32" stroke="#F5F2EC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Ribbon */}
      <path d="M28 38L26 44L28 42L30 44L28 38Z" fill="#1B4332"/>
      <path d="M36 38L38 44L36 42L34 44L36 38Z" fill="#1B4332"/>
    </svg>
  )
}

export function TerminalIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Terminal window */}
      <rect x="6" y="8" width="36" height="32" rx="4" fill="#1B4332"/>
      {/* Title bar */}
      <rect x="6" y="8" width="36" height="8" rx="4" fill="#2D6A4F"/>
      <rect x="6" y="12" width="36" height="4" fill="#2D6A4F"/>
      {/* Window controls */}
      <circle cx="12" cy="12" r="2" fill="#FF5F56"/>
      <circle cx="18" cy="12" r="2" fill="#FFBD2E"/>
      <circle cx="24" cy="12" r="2" fill="#27C93F"/>
      {/* Command prompt */}
      <path d="M12 24L16 28L12 32" stroke="#52B788" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Command text */}
      <rect x="20" y="27" width="16" height="2" rx="1" fill="#52B788" fillOpacity="0.7"/>
      {/* Cursor */}
      <rect x="12" y="34" width="8" height="2" rx="1" fill="#52B788">
        <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite"/>
      </rect>
    </svg>
  )
}

export function ChartIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background */}
      <rect x="6" y="6" width="36" height="36" rx="4" fill="#0A1F12"/>
      {/* Grid */}
      <path d="M12 12V36M18 12V36M24 12V36M30 12V36M36 12V36" stroke="#2D6A4F" strokeWidth="0.5" strokeOpacity="0.3"/>
      <path d="M12 12H36M12 18H36M12 24H36M12 30H36M12 36H36" stroke="#2D6A4F" strokeWidth="0.5" strokeOpacity="0.3"/>
      {/* Bar chart */}
      <rect x="14" y="22" width="4" height="14" rx="1" fill="#52B788"/>
      <rect x="22" y="16" width="4" height="20" rx="1" fill="#2D6A4F"/>
      <rect x="30" y="26" width="4" height="10" rx="1" fill="#8B6914"/>
      {/* Trend line */}
      <path d="M12 28L16 22L24 16L32 26L36 20" stroke="#52B788" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Data points */}
      <circle cx="16" cy="22" r="2" fill="#52B788"/>
      <circle cx="24" cy="16" r="2" fill="#52B788"/>
      <circle cx="32" cy="26" r="2" fill="#8B6914"/>
    </svg>
  )
}

export function LabFlaskIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Flask neck */}
      <path d="M20 6H28V16L36 36C37 38 35.5 42 32 42H16C12.5 42 11 38 12 36L20 16V6Z" stroke="#2D6A4F" strokeWidth="2" fill="none"/>
      {/* Cork */}
      <rect x="18" y="4" width="12" height="4" rx="1" fill="#8B6914"/>
      {/* Liquid */}
      <path d="M14 34L20 22V16H28V22L34 34C34.5 35 34 38 32 38H16C14 38 13.5 35 14 34Z" fill="#52B788" fillOpacity="0.6"/>
      {/* Bubbles */}
      <circle cx="20" cy="32" r="2" fill="#52B788" fillOpacity="0.8"/>
      <circle cx="26" cy="28" r="1.5" fill="#52B788" fillOpacity="0.8"/>
      <circle cx="24" cy="34" r="1" fill="#52B788" fillOpacity="0.8"/>
      {/* Highlight */}
      <path d="M16 36C16 36 18 34 24 34" stroke="#F5F2EC" strokeWidth="1" strokeOpacity="0.3" strokeLinecap="round"/>
    </svg>
  )
}

// Export all icons as a map for easy access
export const LabIcons = {
  microscope: MicroscopeIcon,
  beaker: BeakerIcon,
  dna: DNAIcon,
  monitor: MonitorIcon,
  folder: FolderIcon,
  timeline: TimelineIcon,
  certificate: CertificateIcon,
  terminal: TerminalIcon,
  chart: ChartIcon,
  flask: LabFlaskIcon,
}
