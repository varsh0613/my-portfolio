"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"

type NodeKind = "foundation" | "pivot" | "experience" | "milestone" | "future"

interface MonthEvent {
  monthLabel: string
  title: string
  description: string
  tags: string[]
  type: NodeKind
}

interface YearGroup {
  year: number
  nodeType: NodeKind
  events: MonthEvent[]
}

/** Smooth path drawn to pass through the year anchor points below (viewBox 0–100). */
const spineD =
  "M 9 84 Q 16 79 22 72 Q 30 64 38 56 Q 46 48 54 42 Q 64 34 74 26 Q 82 20 90 12"

/** Year markers sit on the path (centre ≈ curve), so they read as stops along the route—not floating. */
const yearNodePositions: { x: number; y: number }[] = [
  { x: 9, y: 84 },
  { x: 22, y: 72 },
  { x: 38, y: 56 },
  { x: 54, y: 42 },
  { x: 90, y: 12 },
]

const yearGroups: YearGroup[] = [
  {
    year: 2020,
    nodeType: "foundation",
    events: [
      {
        monthLabel: "Aug 2020",
        title: "B.Sc begins — Loyola Academy",
        description:
          "Started Biotechnology, Chemistry & Genetics: labs, molecular biology, and quantitative science foundations that later fed healthcare analytics.",
        tags: ["B.Sc", "Biotech", "Chemistry", "Genetics", "Loyola Academy"],
        type: "foundation",
      },
    ],
  },
  {
    year: 2022,
    nodeType: "experience",
    events: [
      {
        monthLabel: "Dec 2022",
        title: "V4G — Voice for Girls (15-day NGO camp)",
        description:
          "Camp with adolescent girls from marginalised communities: careers, menstrual health, and honest sex-ed where those topics are rarely discussed openly.",
        tags: ["NGO", "Career Guidance", "Menstruation Ed", "Sex Ed", "Community Work"],
        type: "experience",
      },
    ],
  },
  {
    year: 2024,
    nodeType: "experience",
    events: [
      {
        monthLabel: "Feb 2024",
        title: "LABX — International Biotech Conference (organised)",
        description:
          "Ran LABX on campus: research showcases, logistics, and on-floor coordination for an international biotech conference.",
        tags: ["Conference", "Biotech", "Organisation", "Research Coordination"],
        type: "experience",
      },
      {
        monthLabel: "Apr 2024",
        title: "B.Sc graduated — Loyola Academy",
        description:
          "Completed B.Sc in Biotechnology, Chemistry & Genetics (Apr 2024): labs, genetics, and research discipline carried forward into analytics work.",
        tags: ["Graduation", "B.Sc", "Loyola Academy", "Biotech"],
        type: "pivot",
      },
      {
        monthLabel: "2024",
        title: "MBA begins — Anurag University · Business Analytics",
        description:
          "Joined MBA Business Analytics: statistics at scale, decision science, BI stacks—bridging biology intuition to boardroom-ready analytics.",
        tags: ["MBA", "Business Analytics", "Anurag University"],
        type: "experience",
      },
      {
        monthLabel: "Aug 2024",
        title: "Home tutoring — intensive teaching stretch",
        description:
          "One-to-one teaching: rebuilding confidence in maths and science, custom practice arcs, and exam strategy for students who needed structure.",
        tags: ["Tutoring", "Teaching", "STEM", "Mentoring"],
        type: "experience",
      },
    ],
  },
  {
    year: 2025,
    nodeType: "milestone",
    events: [
      {
        monthLabel: "Mar 2025",
        title: "BI Battle — internal hackathon (coordinator)",
        description:
          "Coordination for BI Battle: team onboarding, judging logistics, and energy across competing analytics squads.",
        tags: ["Hackathon", "Coordination", "Student Engagement"],
        type: "milestone",
      },
      {
        monthLabel: "Oct–Dec 2025",
        title: "Tech Mahindra — Tech Support Intern",
        description:
          "Enterprise tech support: ticket triage, customer communication, SLAs, and debugging under pressure.",
        tags: ["Tech Mahindra", "Internship", "Tech Support", "Enterprise IT"],
        type: "experience",
      },
      {
        monthLabel: "Dec 2025",
        title: "Access Health International — Project Consultant (Govt. of Odisha)",
        description:
          "Public-health programme work: stakeholder sync, documentation, analytics-adjacent support, and turning messy operations into clear deliverables.",
        tags: ["Access Health", "Public Health", "Odisha", "Consulting"],
        type: "experience",
      },
      {
        monthLabel: "2025",
        title: "Completed portfolio pieces — GEMMA, chemotherapy survival, credit risk",
        description:
          "Shipped EMS risk intelligence (GEMMA), oncology survival modelling, and credit-risk classification with reporting—code and visuals on GitHub.",
        tags: ["GEMMA", "Survival Analysis", "Credit Risk", "Power BI", "Python"],
        type: "milestone",
      },
    ],
  },
  {
    year: 2026,
    nodeType: "future",
    events: [
      {
        monthLabel: "May 2026 â€” Present",
        title: "Discover BioInsights â€” Clinical Operations & Analytics Intern",
        description:
          "Cross-functional startup work on an HMIS-style healthcare system with an operational analytics dashboard, covering ER and clinical workflows, UI/UX restructuring, and system organization.",
        tags: ["Discover BioInsights", "HMIS", "Clinical Operations", "Operational Analytics", "UI/UX"],
        type: "experience",
      },
      {
        monthLabel: "2026",
        title: "CATALYST — clinical AI pipeline (in progress)",
        description:
          "Building cohort-aligned trial assessment with explainability and Streamlit delivery. Final report and evaluation still in progress.",
        tags: ["CATALYST", "Clinical AI", "SHAP", "Streamlit", "In progress"],
        type: "future",
      },
      {
        monthLabel: "2026",
        title: "PULSE — sentiment & market signals (in progress)",
        description:
          "FinBERT + market data + modelling for directional signals. Ongoing build; final write-up and backtest summary not finished yet.",
        tags: ["PULSE", "FinBERT", "XGBoost", "In progress"],
        type: "future",
      },
      {
        monthLabel: "2026",
        title: "SHIELD — graph fraud detection (in progress)",
        description:
          "GNN-based transaction-network analysis. Architecture and experiments advancing; final report and full evaluation still to close out.",
        tags: ["SHIELD", "GNN", "Fraud", "In progress"],
        type: "future",
      },
      {
        monthLabel: "Mar 2026",
        title: "BizHack — business hackathon (overall coordinator)",
        description:
          "Execution lead: vendors, welcome kits, negotiation support, hosting, student comms, crowd flow.",
        tags: ["BizHack", "Leadership", "Vendor Management", "Events"],
        type: "experience",
      },
      {
        monthLabel: "Mar 2026",
        title: "Access Health — consultant chapter wrap",
        description:
          "Handover of Access Health deliverables and lessons into the next healthcare analytics chapter.",
        tags: ["Access Health", "Consulting", "Handover"],
        type: "experience",
      },
      {
        monthLabel: "Aug 2026",
        title: "MBA graduation — healthcare analytics & risk",
        description:
          "MBA Business Analytics (Aug 2026), focusing on healthcare analytics and risk with biotech as a differentiated lens.",
        tags: ["Graduation", "Healthcare Analytics", "Risk", "MBA"],
        type: "future",
      },
    ],
  },
]

const typeColors = {
  foundation: { bg: "bg-[#1B4332]", border: "border-[#52B788]", dot: "bg-[#52B788]" },
  pivot: { bg: "bg-[#8B6914]", border: "border-[#D4A421]", dot: "bg-[#D4A421]" },
  experience: { bg: "bg-[#2D6A4F]", border: "border-[#52B788]", dot: "bg-[#52B788]" },
  milestone: { bg: "bg-[#1B4332]", border: "border-[#52B788]", dot: "bg-[#8B6914]" },
  future: { bg: "bg-[#52B788]", border: "border-[#1B4332]", dot: "bg-[#1B4332]" },
}

function YearNode({
  year,
  nodeType,
  index,
  isActive,
  onClick,
}: {
  year: number
  nodeType: NodeKind
  index: number
  isActive: boolean
  onClick: () => void
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const colors = typeColors[nodeType]
  const pos = yearNodePositions[index] ?? { x: 12, y: 80 }

  return (
    <motion.div
      ref={ref}
      className="absolute cursor-pointer group z-10"
      style={{
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        transform: "translate(-50%, -50%)",
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={onClick}
    >
      <motion.div
        className={`absolute inset-0 rounded-full ${colors.border} border-2`}
        animate={isActive ? { scale: [1, 1.45, 1], opacity: [1, 0, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ transform: "translate(-22%, -22%)", width: "145%", height: "145%" }}
      />

      <motion.div
        className={`relative min-w-[4.5rem] h-16 px-2 rounded-full ${colors.bg} ${colors.border} border-2 flex items-center justify-center shadow-lg ring-2 ring-[#F5F2EC]/90`}
        whileHover={{ scale: 1.08 }}
        animate={isActive ? { scale: 1.06 } : { scale: 1 }}
      >
        <span className="text-[#F5F2EC] text-sm font-mono font-bold tabular-nums">{year}</span>
        <div className={`absolute inset-0 rounded-full ${colors.dot} opacity-20 blur-md`} />
      </motion.div>
    </motion.div>
  )
}

function JourneyPath() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
      <defs>
        <linearGradient id="pathGradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1B4332" />
          <stop offset="50%" stopColor="#2D6A4F" />
          <stop offset="100%" stopColor="#52B788" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="1" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <motion.path
        d={spineD}
        fill="none"
        stroke="url(#pathGradient)"
        strokeWidth="0.85"
        strokeOpacity="0.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#glow)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
      />
      <motion.path
        d={spineD}
        fill="none"
        stroke="url(#pathGradient)"
        strokeWidth="0.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
      />

      {yearNodePositions.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="0.9" fill="#F5F2EC" stroke="#1B4332" strokeWidth="0.25" opacity={0.95} />
      ))}
    </svg>
  )
}

function YearDetailCard({
  group,
  isVisible,
  onClear,
}: {
  group: YearGroup | null
  isVisible: boolean
  onClear: () => void
}) {
  const colors = group ? typeColors[group.nodeType] : typeColors.foundation

  return (
    <motion.div
      className="bg-[#F5F2EC] border border-[#DDD8CE] rounded-lg p-6 shadow-xl w-full max-w-lg max-h-[min(70vh,560px)] overflow-y-auto"
      initial={{ opacity: 0, y: 16 }}
      animate={isVisible && group ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.28 }}
    >
      {group && (
        <>
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${colors.dot}`} />
              <span className="font-mono text-sm text-[#2D6A4F] tracking-wider font-bold tabular-nums">
                {group.year}
              </span>
            </div>
            <button
              type="button"
              onClick={onClear}
              className="font-mono text-[10px] text-[#999] hover:text-[#1A1A1A] uppercase shrink-0"
            >
              Close
            </button>
          </div>

          <p className="font-mono text-[9px] text-[#999] tracking-wider uppercase mb-3">Timeline in this year</p>

          <ul className="space-y-0 border-l-2 border-[#52B788]/40 pl-4 ml-1">
            {group.events.map((ev, i) => {
              const c = typeColors[ev.type]
              return (
                <li key={i} className="relative pb-5 last:pb-0">
                  <span
                    className={`absolute -left-[calc(0.25rem+5px)] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-[#F5F2EC] ${c.dot}`}
                  />
                  <p className="font-mono text-[10px] text-[#8B6914] tracking-wider mb-1">{ev.monthLabel}</p>
                  <h3 className="font-serif text-base text-[#1A1A1A] mb-2 leading-snug">{ev.title}</h3>
                  <p className="text-xs text-[#666] leading-relaxed mb-2">{ev.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {ev.tags.map((tag, j) => (
                      <span
                        key={j}
                        className="px-2 py-0.5 text-[10px] font-mono bg-[#2D6A4F]/10 text-[#2D6A4F] rounded border border-[#52B788]/25"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </li>
              )
            })}
          </ul>
        </>
      )}
    </motion.div>
  )
}

export function JourneyTimeline() {
  const [activeYearIndex, setActiveYearIndex] = useState<number | null>(null)

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="font-serif text-3xl text-[#1A1A1A] mb-2">Research Log</h2>
        <p className="text-sm text-[#666] max-w-lg mx-auto">
          Each year sits on the path as a stop along the route. Click a year to open the detailed entries.
        </p>
      </div>

      <div className="relative w-full aspect-[16/11] min-h-[300px] bg-gradient-to-br from-[#FAFAF7] to-[#F5F2EC] rounded-xl border border-[#DDD8CE] overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(to right, #DDD8CE 1px, transparent 1px),
              linear-gradient(to bottom, #DDD8CE 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        <JourneyPath />

        {yearGroups.map((g, index) => (
          <YearNode
            key={g.year}
            year={g.year}
            nodeType={g.nodeType}
            index={index}
            isActive={activeYearIndex === index}
            onClick={() => setActiveYearIndex(activeYearIndex === index ? null : index)}
          />
        ))}

        <div className="absolute bottom-3 left-3 flex items-center gap-2 pointer-events-none">
          <div className="w-2 h-2 rounded-full bg-[#1B4332]" />
          <span className="text-xs font-mono text-[#666]">START</span>
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-2 pointer-events-none">
          <span className="text-xs font-mono text-[#666]">NOW</span>
          <div className="w-2 h-2 rounded-full bg-[#52B788]" />
        </div>
      </div>

      <div className="mt-6 flex justify-center min-h-[120px]">
        <YearDetailCard
          group={activeYearIndex !== null ? yearGroups[activeYearIndex] : null}
          isVisible={activeYearIndex !== null}
          onClear={() => setActiveYearIndex(null)}
        />
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-4">
        {(
          [
            ["foundation", "Foundation"],
            ["pivot", "Pivot"],
            ["experience", "Experience"],
            ["milestone", "Milestone"],
            ["future", "Future"],
          ] as const
        ).map(([type, label]) => {
          const colors = typeColors[type]
          return (
            <div key={type} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${colors.dot}`} />
              <span className="text-xs font-mono text-[#666]">{label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
