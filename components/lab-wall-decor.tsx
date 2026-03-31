"use client"

import { useId } from "react"

type LabWallDecorProps = {
  variant: "panel" | "hero"
  className?: string
}

/** Wall-hanging lab motifs: DNA ribbons, constellations, molecules (panel = About deck; hero = landing). */
export function LabWallDecor({ variant, className = "" }: LabWallDecorProps) {
  const rid = useId().replace(/:/g, "")
  const gradId = `lw-fade-${rid}`

  if (variant === "panel") {
    return (
      <svg
        className={`absolute inset-0 h-full w-full pointer-events-none text-[#1B4332] ${className}`}
        viewBox="0 0 320 520"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2D6A4F" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#2D6A4F" stopOpacity="0.12" />
          </linearGradient>
        </defs>

        <line x1="28" y1="0" x2="28" y2="22" stroke="currentColor" strokeWidth="0.9" opacity="0.35" />
        <circle cx="28" cy="24" r="2.2" fill="currentColor" opacity="0.4" />
        <path
          d="M 22 34 Q 34 48 22 62 Q 34 76 22 90 Q 34 104 22 118 Q 34 132 22 146"
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth="1.4"
          opacity="0.55"
        />
        <path
          d="M 34 34 Q 22 48 34 62 Q 22 76 34 90 Q 22 104 34 118 Q 22 132 34 146"
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth="1.4"
          opacity="0.55"
        />
        {[46, 62, 78, 94, 110, 126].map((y, i) => (
          <line key={i} x1="22" y1={y} x2="34" y2={y} stroke="currentColor" strokeWidth="0.6" opacity="0.28" />
        ))}

        <line x1="288" y1="0" x2="275" y2="36" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
        <g stroke="currentColor" strokeWidth="0.7" fill="currentColor" opacity="0.4">
          <circle cx="262" cy="44" r="2" />
          <circle cx="278" cy="52" r="1.6" />
          <circle cx="292" cy="46" r="2.2" />
          <circle cx="286" cy="64" r="1.4" />
          <circle cx="270" cy="70" r="1.8" />
          <line x1="262" y1="44" x2="278" y2="52" opacity="0.5" />
          <line x1="278" y1="52" x2="292" y2="46" opacity="0.5" />
          <line x1="292" y1="46" x2="286" y2="64" opacity="0.5" />
          <line x1="286" y1="64" x2="270" y2="70" opacity="0.5" />
        </g>

        <line x1="248" y1="0" x2="248" y2="168" stroke="currentColor" strokeWidth="0.7" opacity="0.28" />
        <polygon
          points="248,178 262,186 262,202 248,210 234,202 234,186"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.38"
        />
        <circle cx="248" cy="194" r="2.5" fill="#52B788" opacity="0.35" />

        <line x1="18" y1="520" x2="40" y2="420" stroke="currentColor" strokeWidth="0.7" opacity="0.22" />
        <g stroke="currentColor" strokeWidth="0.9" fill="none" opacity="0.35">
          <line x1="40" y1="418" x2="58" y2="398" />
          <line x1="40" y1="418" x2="22" y2="398" />
          <line x1="40" y1="418" x2="40" y2="392" />
          <circle cx="58" cy="396" r="4" />
          <circle cx="22" cy="396" r="4" />
          <circle cx="40" cy="388" r="3.5" />
        </g>

        <line x1="160" y1="0" x2="160" y2="16" stroke="currentColor" strokeWidth="0.6" opacity="0.25" />
        <ellipse cx="160" cy="36" rx="22" ry="10" fill="none" stroke="currentColor" strokeWidth="0.7" opacity="0.22" />
        <circle cx="160" cy="36" r="2.5" fill="#52B788" opacity="0.3" />
      </svg>
    )
  }

  const g2 = `lw-fade2-${rid}`
  return (
    <svg
      className={`absolute inset-0 z-0 h-full w-full pointer-events-none text-[#1B4332] ${className}`}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id={g2} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2D6A4F" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#2D6A4F" stopOpacity="0.08" />
        </linearGradient>
      </defs>

      {/* Left wall — thread + DNA */}
      <line x1="6" y1="0" x2="6" y2="5" stroke="currentColor" strokeWidth="0.12" opacity="0.35" />
      <circle cx="6" cy="5.6" r="0.35" fill="currentColor" opacity="0.4" />
      <path
        d="M 4.5 8 Q 7.5 14 4.5 20 Q 7.5 26 4.5 32 Q 7.5 38 4.5 44"
        fill="none"
        stroke={`url(#${g2})`}
        strokeWidth="0.2"
        opacity="0.5"
      />
      <path
        d="M 7.5 8 Q 4.5 14 7.5 20 Q 4.5 26 7.5 32 Q 4.5 38 7.5 44"
        fill="none"
        stroke={`url(#${g2})`}
        strokeWidth="0.2"
        opacity="0.5"
      />
      {[14, 20, 26, 32, 38].map((y, i) => (
        <line key={i} x1="4.5" y1={y} x2="7.5" y2={y} stroke="currentColor" strokeWidth="0.08" opacity="0.25" />
      ))}

      {/* Right wall — constellation */}
      <line x1="94" y1="0" x2="91" y2="6" stroke="currentColor" strokeWidth="0.1" opacity="0.3" />
      <g fill="currentColor" stroke="currentColor" strokeWidth="0.06" opacity="0.38">
        <circle cx="88" cy="8" r="0.35" />
        <circle cx="92" cy="9.5" r="0.28" />
        <circle cx="95" cy="8.2" r="0.32" />
        <circle cx="93.5" cy="11" r="0.22" />
        <circle cx="89.5" cy="12" r="0.28" />
        <line x1="88" y1="8" x2="92" y2="9.5" opacity="0.6" />
        <line x1="92" y1="9.5" x2="95" y2="8.2" opacity="0.6" />
        <line x1="95" y1="8.2" x2="93.5" y2="11" opacity="0.6" />
        <line x1="93.5" y1="11" x2="89.5" y2="12" opacity="0.6" />
      </g>

      {/* Upper centre — hanging ring */}
      <line x1="50" y1="0" x2="50" y2="7" stroke="currentColor" strokeWidth="0.08" opacity="0.28" />
      <polygon
        points="50,8.5 53.2,10.2 53.2,13.5 50,15.2 46.8,13.5 46.8,10.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.12"
        opacity="0.32"
      />

      {/* Far left molecule */}
      <line x1="3" y1="100" x2="8" y2="78" stroke="currentColor" strokeWidth="0.08" opacity="0.2" />
      <g stroke="currentColor" strokeWidth="0.1" fill="none" opacity="0.3">
        <line x1="8" y1="77" x2="12" y2="72" />
        <line x1="8" y1="77" x2="4" y2="72" />
        <circle cx="12" cy="71.5" r="0.55" />
        <circle cx="4" cy="71.5" r="0.55" />
      </g>

      {/* Far right benzene thread */}
      <line x1="97" y1="0" x2="97" y2="28" stroke="currentColor" strokeWidth="0.08" opacity="0.22" />
      <polygon
        points="97,30 99,31.2 99,34 97,35.2 95,34 95,31.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.1"
        opacity="0.28"
      />

      {/* Mid-left second strand */}
      <line x1="14" y1="0" x2="14" y2="4" stroke="currentColor" strokeWidth="0.06" opacity="0.22" />
      <path
        d="M 12 6 Q 16 12 12 18 Q 16 24 12 30"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.12"
        opacity="0.22"
      />
      <path
        d="M 16 6 Q 12 12 16 18 Q 12 24 16 30"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.12"
        opacity="0.22"
      />

      {/* Bottom right stars */}
      <line x1="96" y1="100" x2="93" y2="88" stroke="currentColor" strokeWidth="0.06" opacity="0.18" />
      <g fill="currentColor" opacity="0.28">
        <circle cx="91" cy="86" r="0.25" />
        <circle cx="93.5" cy="84" r="0.2" />
        <circle cx="89" cy="83" r="0.22" />
      </g>

      {/* Soft orbit mid-right */}
      <ellipse cx="72" cy="22" rx="5" ry="2.2" fill="none" stroke="currentColor" strokeWidth="0.08" opacity="0.18" />
      <circle cx="72" cy="22" r="0.28" fill="#52B788" opacity="0.25" />
    </svg>
  )
}
