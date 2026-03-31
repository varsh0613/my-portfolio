"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { LabWallDecor } from "@/components/lab-wall-decor"

// Lab colors matching the concept
const LAB_COLORS = {
  cream: "#F5F2EC",
  forest: "#1B4332",
  forest2: "#2D6A4F",
  forest3: "#52B788",
  ink: "#1A1A1A",
  gold: "#8B6914",
}

// Microscope SVG Component
function MicroscopeSVG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 120" className={className} fill="none">
      {/* Base */}
      <rect x="20" y="100" width="60" height="15" rx="2" fill={LAB_COLORS.ink} />
      <rect x="30" y="90" width="40" height="12" rx="1" fill="#333" />
      
      {/* Arm */}
      <rect x="42" y="30" width="16" height="65" rx="2" fill={LAB_COLORS.ink} />
      
      {/* Stage */}
      <rect x="25" y="70" width="50" height="6" rx="1" fill="#444" />
      
      {/* Head */}
      <rect x="38" y="20" width="24" height="15" rx="3" fill={LAB_COLORS.forest2} />
      
      {/* Eyepiece */}
      <ellipse cx="50" cy="12" rx="8" ry="6" fill={LAB_COLORS.ink} />
      <ellipse cx="50" cy="8" rx="6" ry="4" fill="#222" />
      
      {/* Objectives */}
      <rect x="36" y="55" width="6" height="18" rx="2" fill={LAB_COLORS.forest3} />
      <rect x="47" y="52" width="6" height="21" rx="2" fill={LAB_COLORS.forest3} />
      <rect x="58" y="55" width="6" height="18" rx="2" fill={LAB_COLORS.forest3} />
      
      {/* Focus knobs */}
      <circle cx="25" cy="50" r="6" fill="#555" />
      <circle cx="75" cy="50" r="6" fill="#555" />
    </svg>
  )
}

// Beaker SVG Component
function BeakerSVG({ color, className }: { color: string; className?: string }) {
  return (
    <svg viewBox="0 0 50 80" className={className} fill="none">
      {/* Glass */}
      <path 
        d="M10 10 L10 65 Q10 75 25 75 Q40 75 40 65 L40 10" 
        stroke="rgba(255,255,255,0.4)" 
        strokeWidth="2" 
        fill="rgba(255,255,255,0.1)"
      />
      {/* Liquid */}
      <path 
        d="M12 35 L12 63 Q12 73 25 73 Q38 73 38 63 L38 35 Z" 
        fill={color}
        opacity="0.7"
      />
      {/* Rim */}
      <path d="M8 10 L42 10" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
      {/* Measurements */}
      <line x1="38" y1="25" x2="42" y2="25" stroke="rgba(255,255,255,0.3)" />
      <line x1="38" y1="40" x2="42" y2="40" stroke="rgba(255,255,255,0.3)" />
      <line x1="38" y1="55" x2="42" y2="55" stroke="rgba(255,255,255,0.3)" />
    </svg>
  )
}

function ConicalFlaskSVG({ color, className }: { color: string; className?: string }) {
  return (
    <svg viewBox="0 0 60 90" className={className} fill="none">
      {/* Glass */}
      <path
        d="M26 6H34V22L46 76C47 82 43 86 36 86H24C17 86 13 82 14 76L26 22V6Z"
        stroke="rgba(255,255,255,0.45)"
        strokeWidth="2"
        fill="rgba(255,255,255,0.08)"
      />
      {/* Liquid */}
      <path
        d="M18 56L16 76C15.5 80 18.3 82 23 82H37C41.7 82 44.5 80 44 76L42 56C37 59 23 59 18 56Z"
        fill={color}
        opacity="0.65"
      />
      {/* Neck highlight */}
      <path d="M30 6V22" stroke="rgba(255,255,255,0.32)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

// Monitor SVG Component
function MonitorSVG({ content, className }: { content: string[]; className?: string }) {
  return (
    <svg viewBox="0 0 160 120" className={className} fill="none">
      {/* Monitor frame */}
      <rect x="5" y="5" width="150" height="90" rx="4" fill={LAB_COLORS.ink} />
      {/* Screen */}
      <rect x="10" y="10" width="140" height="80" rx="2" fill="#0A1F12" />
      {/* Screen glow */}
      <rect x="10" y="10" width="140" height="80" rx="2" fill={LAB_COLORS.forest3} opacity="0.1" />
      
      {/* Content lines */}
      {content.map((line, i) => (
        <text key={i} x="20" y={30 + i * 18} fill={LAB_COLORS.forest3} fontSize="10" fontFamily="monospace">
          {line}
        </text>
      ))}
      
      {/* Data visualization bars */}
      <rect x="20" y="70" width="30" height="8" rx="1" fill={LAB_COLORS.forest3} opacity="0.6" />
      <rect x="55" y="70" width="45" height="8" rx="1" fill={LAB_COLORS.forest3} opacity="0.4" />
      <rect x="105" y="70" width="25" height="8" rx="1" fill={LAB_COLORS.gold} opacity="0.5" />
      
      {/* Stand */}
      <rect x="70" y="95" width="20" height="15" fill={LAB_COLORS.ink} />
      <rect x="55" y="108" width="50" height="8" rx="2" fill={LAB_COLORS.ink} />
    </svg>
  )
}

function DeskMonitor({
  label,
  sublabel,
  content,
  onClick,
  className,
}: {
  label: string
  sublabel: string
  content: string[]
  onClick: () => void
  className?: string
}) {
  return (
    <LabObject label={label} sublabel={sublabel} onClick={onClick} className={className} hoverScale={1.02}>
      <div className="relative">
        <motion.div
          className="w-36"
          style={{
            transformOrigin: "bottom center",
            transform: "perspective(700px) rotateX(-7deg)",
          }}
          whileHover={{ rotateZ: -0.35 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
        >
          <MonitorSVG content={content} className="w-full drop-shadow-xl" />
        </motion.div>

        {/* Stand */}
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-4 w-10 h-5 bg-[#1A1A1A] rounded-sm opacity-90" />
        <div
          className="absolute left-1/2 -bottom-7 w-20 h-3 bg-[#2A2A2A] rounded-sm opacity-95"
          style={{ transform: "translateX(-50%) perspective(600px) rotateX(55deg)" }}
        />
      </div>
    </LabObject>
  )
}

// Actual DNA Double Helix Component
function DNADoubleHelix({ className }: { className?: string }) {
  // Prevent hydration mismatches by rendering the animated SVG only after mount.
  // (SSR + client can produce slightly different floating-point string outputs.)
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  const segments = 16
  const height = 200
  const step = height / segments
  const amp = 14
  const phaseStep = 0.55

  const buildStrand = (phaseShift: number) => {
    const pts = Array.from({ length: segments + 1 }, (_, i) => {
      const t = i * phaseStep
      const y = i * step
      const x = 30 + Math.sin(t + phaseShift) * amp
      return { x, y, t }
    })

    let d = `M ${pts[0].x} ${pts[0].y}`
    for (let i = 0; i < segments; i++) {
      const p0 = pts[i]
      const p1 = pts[i + 1]
      const tMid = (p0.t + p1.t) / 2
      const cx = 30 + Math.sin(tMid + phaseShift) * amp
      const cy = (p0.y + p1.y) / 2
      d += ` Q ${cx} ${cy}, ${p1.x} ${p1.y}`
    }
    return d
  }
  
  if (!mounted) {
    return <svg viewBox="0 0 60 200" className={className} fill="none" />
  }

  return (
    <svg viewBox="0 0 60 200" className={className} fill="none">
      <defs>
        <linearGradient id="dnaGlow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={LAB_COLORS.forest3} stopOpacity="0.8" />
          <stop offset="50%" stopColor={LAB_COLORS.gold} stopOpacity="0.6" />
          <stop offset="100%" stopColor={LAB_COLORS.forest2} stopOpacity="0.8" />
        </linearGradient>
      </defs>
      
      {/* DNA strands - two helical curves */}
      <motion.path
        d={buildStrand(0)}
        stroke={LAB_COLORS.forest3}
        strokeWidth="2.6"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      
      <motion.path
        d={buildStrand(Math.PI)}
        stroke={LAB_COLORS.forest2}
        strokeWidth="2.6"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut", delay: 0.3 }}
      />
      
      {/* Base pairs (rungs of the ladder) */}
      {Array.from({ length: segments }).map((_, i) => {
        const y = i * step + step / 2
        const phase = i * phaseStep + phaseStep / 2
        const x1 = 30 + Math.sin(phase) * amp
        const x2 = 30 + Math.sin(phase + Math.PI) * amp
        
        return (
          <motion.g key={i}>
            <motion.line
              x1={Math.min(x1, x2) + 5}
              y1={y}
              x2={Math.max(x1, x2) - 5}
              y2={y}
              stroke="url(#dnaGlow)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 0.7, scaleX: 1 }}
              transition={{ delay: 0.45 + i * 0.06, duration: 0.28 }}
            />
            {/* Nucleotide dots */}
            <motion.circle
              cx={Math.min(x1, x2) + 3}
              cy={y}
              r="3"
              fill={i % 2 === 0 ? LAB_COLORS.forest3 : LAB_COLORS.gold}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.55 + i * 0.06 }}
            />
            <motion.circle
              cx={Math.max(x1, x2) - 3}
              cy={y}
              r="3"
              fill={i % 2 === 0 ? LAB_COLORS.gold : LAB_COLORS.forest3}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.55 + i * 0.06 }}
            />
          </motion.g>
        )
      })}
    </svg>
  )
}

// Floating Particle
function Particle({ delay, duration, x, y, size }: { delay: number; duration: number; x: number; y: number; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        top: `${y}%`,
        backgroundColor: LAB_COLORS.forest3,
        boxShadow: `0 0 ${size * 2}px ${LAB_COLORS.forest3}60`,
      }}
      animate={{
        y: [-20, 20, -20],
        opacity: [0.3, 0.8, 0.3],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  )
}

// Interactive Lab Object with persistent label
function LabObject({ 
  children, 
  label,
  sublabel,
  onClick,
  className,
  showLabel = true,
  hoverScale = 1.05
}: { 
  children: React.ReactNode
  label: string
  sublabel?: string
  onClick: () => void
  className?: string
  showLabel?: boolean
  hoverScale?: number
}) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div
      className={`relative cursor-pointer pointer-events-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-[#52B788]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F2EC] ${className}`}
      data-lab-clickable="true"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onClick()
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={label}
      whileHover={{ scale: hoverScale, z: 20 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {showLabel && (
        /* Persistent small label */
        <div className="absolute top-1.5 left-1.5 whitespace-nowrap z-10 pointer-events-none">
          <div className="font-mono text-[8px] tracking-wider uppercase text-[#666] bg-[#F5F2EC]/85 px-2 py-0.5 rounded-sm border border-[#DDD8CE]/60">
            {sublabel || label}
          </div>
        </div>
      )}
      
      {children}
      
      {/* Glow effect on hover */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 -z-10 rounded-lg pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            background: `radial-gradient(circle, ${LAB_COLORS.forest3}30 0%, transparent 70%)`,
            filter: "blur(20px)",
            transform: "scale(1.5)",
          }}
        />
      )}
    </motion.div>
  )
}

// Lab Desk with perspective
function LabDesk({ onNavigate }: { onNavigate: (section: string) => void }) {
  return (
    <div
      className="relative w-[980px] max-w-[92vw] h-[320px] pointer-events-none"
      style={{ perspective: "1200px" }}
    >
      {/* Desk shadow on floor */}
      <div
        className="absolute left-1/2 bottom-[-22px] w-[88%] h-12 -translate-x-1/2 rounded-full opacity-70 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,0,0,0.34) 0%, transparent 70%)",
          filter: "blur(12px)",
        }}
      />

      {/* Bench + drawers */}
      <div className="absolute left-0 right-0 bottom-0">
        {false && (
          <>
        {/* Drawer pedestal (left) */}
        <div
          className="absolute left-[6%] bottom-[0px] w-40 h-28 rounded-md border border-white/10"
          style={{
            background: "linear-gradient(180deg, rgba(40,40,40,0.75) 0%, rgba(18,18,18,0.75) 100%)",
            boxShadow: "0 18px 50px rgba(0,0,0,0.25)",
          }}
        >
          <div className="px-3 py-2 border-b border-white/10 flex items-center justify-between">
            <div className="font-mono text-[8px] tracking-wider text-[#F5F2EC]/70 uppercase">Bench Unit</div>
            <div className="w-2 h-2 rounded-full bg-[#8B6914] opacity-75" />
          </div>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="px-3 py-2 border-b border-white/10 last:border-b-0">
              <div className="flex items-center justify-between">
                <div className="font-mono text-[8px] tracking-wider text-[#F5F2EC]/55 uppercase">Drawer</div>
                <div className="w-8 h-2 rounded-sm bg-[#F5F2EC]/12 border border-white/10" />
              </div>
            </div>
          ))}
        </div>
          </>
        )}

        {/* Bench surface */}
        <div
          className="relative h-10 rounded-md border border-white/10"
          style={{
            background: "linear-gradient(180deg, #4A443D 0%, #3D3630 100%)",
            transform: "rotateX(66deg)",
            transformOrigin: "bottom center",
            boxShadow: "0 26px 70px rgba(0,0,0,0.35)",
          }}
        />

        {/* Bench front */}
        <div
          className="h-24 rounded-b-md -mt-2 border border-white/10"
          style={{
            background: "linear-gradient(180deg, #3D3630 0%, #26211D 100%)",
            boxShadow: "0 18px 60px rgba(0,0,0,0.12) inset",
          }}
        />

        {/* Backsplash strip */}
        <div
          className="absolute left-1/2 top-[-26px] w-[76%] h-6 -translate-x-1/2 rounded-md border border-white/10 pointer-events-none"
          style={{
            background: "linear-gradient(180deg, rgba(245,242,236,0.18) 0%, rgba(245,242,236,0.06) 100%)",
            backdropFilter: "blur(6px)",
            boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
          }}
        />
      </div>

      {/* Workstation objects ON the bench */}
      <div className="absolute inset-0">
        {/* Microscope (left) */}
        <div className="absolute left-[10%] bottom-[96px] pointer-events-auto z-20">
          <div
            className="absolute left-1/2 -translate-x-1/2 bottom-[-10px] w-20 h-6 rounded-full opacity-70 pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(0,0,0,0.28) 0%, transparent 70%)", filter: "blur(6px)" }}
          />
          <LabObject
            label="Analysis"
            sublabel="Microscope"
            onClick={() => onNavigate("timeline")}
            className="w-20"
            hoverScale={1.03}
          >
            <MicroscopeSVG className="w-full drop-shadow-xl" />
          </LabObject>
        </div>

        {/* Decorative glassware beside microscope (non-clickable) */}
        <div className="absolute left-[18%] bottom-[92px] flex items-end gap-1.5 pointer-events-none opacity-90">
          <ConicalFlaskSVG color={LAB_COLORS.forest3} className="w-10 h-14 drop-shadow-lg" />
          <BeakerSVG color={LAB_COLORS.gold} className="w-8 h-12 drop-shadow-lg" />
          <ConicalFlaskSVG color="#4A90A4" className="w-9 h-13 drop-shadow-lg" />
        </div>

        {false && (
          <>
        {/* Monitor (disabled) */}
        <div className="absolute left-[26%] bottom-[132px] pointer-events-auto">
          <LabObject
            label="Timeline"
            sublabel="Research Log"
            onClick={() => onNavigate("timeline")}
            className="w-40"
            hoverScale={1.02}
          >
            <MonitorSVG content={["EXPERIMENT LOG", "2020 → 2026", "> 6 years"]} className="w-full drop-shadow-xl" />
          </LabObject>
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-4 w-10 h-5 bg-[#1A1A1A] rounded-sm opacity-90" />
          <div
            className="absolute left-1/2 -bottom-7 w-20 h-3 bg-[#2A2A2A] rounded-sm opacity-95"
            style={{ transform: "translateX(-50%) perspective(600px) rotateX(55deg)" }}
          />
        </div>
          </>
        )}

        <div className="absolute left-[30%] bottom-[132px] pointer-events-auto z-10">
          <LabObject
            label="Dashboards"
            sublabel="Computer"
            onClick={() => onNavigate("dashboards")}
            className="w-40"
            hoverScale={1.02}
          >
            <MonitorSVG content={["SURVIVAL ANALYSIS", "AUC: 0.92", "F1: 0.88"]} className="w-full drop-shadow-xl" />
          </LabObject>
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-4 w-10 h-5 bg-[#1A1A1A] rounded-sm opacity-90" />
          <div
            className="absolute left-1/2 -bottom-7 w-20 h-3 bg-[#2A2A2A] rounded-sm opacity-95"
            style={{ transform: "translateX(-50%) perspective(600px) rotateX(55deg)" }}
          />
        </div>

        {/* Laptop (center) */}
        <div className="absolute left-[52%] bottom-[96px] -translate-x-1/2 pointer-events-auto z-15">
          <Laptop onClick={() => onNavigate("credentials")} />
        </div>

        {/* Beakers + tubes (right) */}
        {false && (
          <>
            <div className="absolute left-[68%] bottom-[96px] pointer-events-auto">
              <LabObject
                label="Credentials"
                sublabel="Certificates"
                onClick={() => onNavigate("credentials")}
                className="flex gap-1"
                hoverScale={1.03}
              >
                <BeakerSVG color={LAB_COLORS.forest3} className="w-6 h-12" />
                <BeakerSVG color={LAB_COLORS.gold} className="w-6 h-12" />
                <BeakerSVG color="#4A90A4" className="w-6 h-12" />
              </LabObject>
            </div>

            <div className="absolute left-[78%] bottom-[112px] pointer-events-auto">
              <TestTubeRack />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// Whiteboard Component
function Whiteboard({
  onClick,
  className,
  style,
}: {
  onClick: () => void
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div className={className} style={style} data-lab-clickable="true">
      <LabObject
        label="About"
        sublabel="About Me"
        onClick={onClick}
        className="w-[320px] max-w-[78vw]"
        showLabel={false}
        hoverScale={1.02}
      >
        <div className="relative">
        {/* Frame */}
        <div
          className="absolute inset-0 bg-[#3A342E] rounded-md border border-white/10"
          style={{ transform: "translate(-4px, -4px)" }}
        />

        {/* Neon tube light */}
        <motion.div
          className="absolute -top-5 left-1/2 -translate-x-1/2 w-[88%] h-[10px] rounded-full pointer-events-none"
          style={{
            background: `linear-gradient(90deg, rgba(82,183,136,0) 0%, rgba(82,183,136,0.55) 20%, rgba(45,106,79,0.55) 55%, rgba(82,183,136,0.55) 80%, rgba(82,183,136,0) 100%)`,
            filter: "drop-shadow(0 0 12px rgba(82,183,136,0.45))",
          }}
          animate={{ opacity: [0.75, 1, 0.85] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
          className="absolute -top-5 left-1/2 -translate-x-1/2 w-[88%] h-[12px] rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, rgba(82,183,136,0.35) 0%, rgba(82,183,136,0.12) 35%, transparent 70%)`,
            filter: "blur(6px)",
          }}
        />

        {/* Chalkboard */}
        <div
          className="relative rounded-md p-4 shadow-lg border border-white/10 overflow-hidden"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,31,18,0.96) 0%, rgba(6,18,11,0.96) 100%)",
            boxShadow: "0 18px 70px rgba(0,0,0,0.22), 0 0 0 1px rgba(255,255,255,0.06) inset",
          }}
        >
          {/* Chalk smudge */}
          <div
            className="absolute inset-0 rounded-md pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 20% 30%, rgba(245,242,236,0.09) 0%, transparent 35%), radial-gradient(circle at 75% 70%, rgba(245,242,236,0.07) 0%, transparent 40%)",
              opacity: 0.75,
              mixBlendMode: "screen",
            }}
          />

          <div className="flex items-start justify-between gap-4 relative">
            <div>
              <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-[#F5F2EC]/70 mb-1">
                ABOUT ME
              </p>
              <p className="font-serif text-[18px] leading-tight text-[#F5F2EC]/90">Varshitha Sirigiri</p>
              <p className="font-mono text-[8px] tracking-wider text-[#52B788]/80 mt-2">
                Click to open profile terminal
              </p>
            </div>

            <div className="text-right">
              <p className="font-mono text-[8px] tracking-wider text-[#F5F2EC]/55">{"> MBA · BA"}</p>
              <p className="font-mono text-[8px] tracking-wider text-[#F5F2EC]/55">{"> Healthcare · Risk"}</p>
              <p className="font-mono text-[8px] tracking-wider text-[#F5F2EC]/55">{"> Aug 2026"}</p>
            </div>
          </div>

          {/* Chalk pieces */}
          <div className="absolute -bottom-3 right-3 flex items-center gap-1.5 pointer-events-none">
            <div className="w-6 h-1.5 rounded-sm bg-[#F5F2EC]/70 shadow-sm" />
            <div className="w-4 h-1.5 rounded-sm bg-[#F5F2EC]/55 shadow-sm" />
            <div className="w-5 h-1.5 rounded-sm bg-[#8B6914]/60 shadow-sm" />
          </div>
        </div>
        </div>
      </LabObject>
    </div>
  )
}

function ArchiveCabinet({
  onClick,
  className,
  style,
}: {
  onClick: () => void
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div className={className} style={style} data-lab-clickable="true">
      <LabObject label="Projects" sublabel="Case Files" onClick={onClick} className="w-full" hoverScale={1.02}>
        <div className="relative">
        <div
          className="absolute left-1/2 -translate-x-1/2 -bottom-5 w-[92%] h-10 rounded-full opacity-70 pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(0,0,0,0.32) 0%, transparent 70%)",
            filter: "blur(10px)",
          }}
        />
        <div
          className="rounded-lg border border-white/10 overflow-hidden"
          style={{
            background: "linear-gradient(180deg, rgba(72,72,72,0.98) 0%, rgba(22,22,22,0.98) 100%)",
            boxShadow: "0 18px 60px rgba(0,0,0,0.28)",
          }}
        >
          <div className="px-3 py-2 border-b border-white/10 flex items-center justify-between">
            <div className="font-mono text-[9px] tracking-wider text-[#F5F2EC]/75 uppercase">Archive</div>
            <div className="w-2 h-2 rounded-full bg-[#52B788] opacity-80" />
          </div>

          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="relative px-3 py-2 border-b border-white/10 last:border-b-0">
              <div className="flex items-center justify-between">
                <div className="font-mono text-[8px] tracking-wider text-[#F5F2EC]/60 uppercase">
                  Drawer {String(i + 1).padStart(2, "0")}
                </div>
                <div className="w-7 h-2 rounded-sm bg-[#F5F2EC]/12 border border-white/10" />
              </div>
              <div className="absolute left-3 right-3 bottom-1 h-px bg-[#52B788]/15" />
            </div>
          ))}
        </div>

        {/* Cabinet feet */}
        <div className="absolute -bottom-3 left-3 w-2.5 h-3 bg-black/35 rounded-sm" />
        <div className="absolute -bottom-3 right-3 w-2.5 h-3 bg-black/35 rounded-sm" />
      </div>
      </LabObject>
    </div>
  )
}

// Test Tube Rack
function TestTubeRack() {
  const colors = [LAB_COLORS.forest3, LAB_COLORS.gold, "#4A90A4", LAB_COLORS.forest2, "#9B59B6"]
  
  return (
    <div className="relative flex items-end gap-1">
      {colors.map((color, i) => (
        <motion.div
          key={i}
          className="relative"
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
        >
          {/* Tube */}
          <div 
            className="w-2.5 h-10 rounded-b-full border border-white/30"
            style={{ background: `linear-gradient(180deg, transparent 0%, transparent 30%, ${color}90 30%, ${color} 100%)` }}
          />
          {/* Cap */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-1.5 rounded-t-sm bg-white/20" />
        </motion.div>
      ))}
      {/* Rack base */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-2 bg-[#444] rounded-sm" />
    </div>
  )
}

// Laptop
function Laptop({ onClick }: { onClick: () => void }) {
  return (
    <LabObject
      label="Credentials"
      sublabel="Experiments"
      onClick={onClick}
      className="relative"
    >
      {/* Screen */}
      <motion.div 
        className="w-24 h-16 bg-[#1A1A1A] rounded-t-sm relative overflow-hidden"
        style={{ 
          transformOrigin: "bottom center",
          transform: "perspective(500px) rotateX(-5deg)",
        }}
      >
        {/* Screen display */}
        <div className="absolute inset-1 bg-[#0A1510] rounded-sm overflow-hidden">
          {/* Animated code lines */}
          {Array.from({ length: 4 }).map((_, i) => (
            <motion.div
              key={i}
              className="h-1 rounded-full my-1 mx-1.5"
              style={{ 
                backgroundColor: i % 2 === 0 ? LAB_COLORS.forest3 : LAB_COLORS.gold,
                // Deterministic widths to keep server/client HTML identical.
                width: `${30 + ((i * 37) % 51)}%`,
                opacity: 0.6,
              }}
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
        
        {/* Screen glow */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ 
            background: `radial-gradient(ellipse at center, ${LAB_COLORS.forest3}15 0%, transparent 70%)` 
          }}
        />
      </motion.div>
      
      {/* Base */}
      <div className="w-28 h-2 bg-[#2A2A2A] rounded-b-sm -mt-0.5 mx-auto" 
        style={{ transform: "perspective(500px) rotateX(45deg)" }}
      />
    </LabObject>
  )
}

// Main Lab Scene
export function LabScene3D({ onNavigate }: { onNavigate: (section: string) => void }) {
  return (
    <div
      className="w-full h-screen overflow-hidden relative"
      style={{
        background: `linear-gradient(180deg, ${LAB_COLORS.cream} 0%, #E8E4DB 100%)`,
      }}
    >
      {/* Ambient gradients */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 22% 28%, rgba(82,183,136,0.10) 0%, transparent 34%), radial-gradient(circle at 78% 24%, rgba(139,105,20,0.09) 0%, transparent 36%), radial-gradient(circle at 50% 78%, rgba(26,26,26,0.08) 0%, transparent 48%)",
        }}
      />

      {/* Main 2D Lab Stage */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{
          background: "linear-gradient(180deg, rgba(250,250,247,0.98) 0%, rgba(239,235,226,0.98) 100%)",
          boxShadow: "0 12px 40px rgba(0,0,0,0.08) inset",
        }}
        initial={{ opacity: 0, scale: 0.98, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <LabWallDecor variant="hero" className="opacity-[0.48]" />

        {/* Ceiling light */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[42%] h-2 rounded-full bg-black/18 pointer-events-none" />
        <div className="absolute top-[13px] left-1/2 -translate-x-1/2 w-[40%] h-[6px] rounded-full bg-[#D6FFF0]/85 pointer-events-none" />
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[56%] h-10 rounded-full pointer-events-none"
          style={{
            background: [
              `radial-gradient(circle, ${LAB_COLORS.forest3}30 0%, transparent 72%)`,
              "radial-gradient(circle, rgba(214,255,240,0.45) 0%, transparent 55%)",
            ].join(", "),
            filter: "blur(2px)",
          }}
        />

        {/* Right side poster and cabinet */}
        <Whiteboard
          onClick={() => onNavigate("about")}
          className="absolute top-[20%] right-[7%] z-20"
          style={{ transform: "scale(0.95)" }}
        />
        <ArchiveCabinet
          onClick={() => onNavigate("projects")}
          className="absolute bottom-[16%] right-[8%] w-44 z-20"
        />

        {/* Left floating DNA accents */}
        <motion.div
          className="absolute top-[23%] left-[8%] w-14 h-48 pointer-events-none hidden md:block"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <DNADoubleHelix className="w-full h-full opacity-60" />
        </motion.div>
        <motion.div
          className="absolute top-[18%] right-[34%] w-14 h-48 pointer-events-none hidden md:block"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          <DNADoubleHelix className="w-full h-full opacity-55" />
        </motion.div>

        {/* Desk strip */}
        <div className="absolute left-0 right-0 bottom-[6%] h-[16%] bg-[#2A2521] border-t border-white/10 shadow-[0_-20px_70px_rgba(0,0,0,0.35)_inset]" />

        {/* Workstation cluster */}
        <div className="absolute bottom-[11%] left-[40%] -translate-x-1/2 scale-[0.92] origin-bottom z-20">
          <LabDesk onNavigate={onNavigate} />
        </div>
      </motion.div>
    </div>
  )
}
