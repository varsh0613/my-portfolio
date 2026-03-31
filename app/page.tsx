"use client"

import { useState, useEffect, Suspense } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  MicroscopeIcon, 
  MonitorIcon, 
  TimelineIcon, 
  TerminalIcon, 
  CertificateIcon,
  BeakerIcon,
  ChartIcon,
  DNAIcon,
  FolderIcon
} from "@/components/lab-icons"
import { JourneyTimeline } from "@/components/journey-timeline"
import { LabWallDecor } from "@/components/lab-wall-decor"
import { LabScene3D } from "@/components/lab-scene-3d"
import BlogCarousel from "@/BlogCarousel"
import type { Dashboard } from "@/lib/dashboards"

// Panel types
type PanelType = "about" | "projects" | "dashboards" | "timeline" | "credentials" | null

// Case files: set each item's `github` to that project's repository URL (or README) in this array.
const caseFiles = [
  {
    id: "CATALYST",
    domain: "Clinical AI Decisioning",
    title: "CATALYST — Cohort-Aligned Trial & Likelihood Assessment System (2026)",
    description:
      "Ongoing build (2026): clinical AI pipeline for cohort-aligned trial assessment with ranked recommendations, response-style scoring, SHAP-driven explainability, and a Streamlit surface. Final evaluation report and write-up still in progress.",
    tags: ["Python", "XGBoost", "SHAP", "KMeans", "NLP", "Streamlit"],
    status: "In progress",
    metrics: [
      { label: "Cohort Input", value: "Ranked trials" },
      { label: "Response Confidence", value: "Probability scores" },
      { label: "Explainability", value: "SHAP drivers" },
      { label: "Delivery", value: "Streamlit UI" },
    ],
    pipeline: [
      "Biomarker Stratification",
      "Trial Matching",
      "Response Prediction",
      "Recommendation Engine",
      "Streamlit Deployment",
    ],
    results:
      "Interim build: pipeline direction and UI are advancing; final metrics, held-out evaluation, and written report are not finished yet. Updated results will go to GitHub when the report is complete.",
    insight:
      "Quantifying uncertainty with explanations makes clinical recommendations easier to trust and audit.",
    github: "https://github.com/varsh0613",
    color: "forest",
  },
  {
    id: "GEMMA",
    domain: "Government Risk Intelligence",
    title: "GEMMA — Government EMS Risk Intelligence Platform (2025)",
    description:
      "Analysed 108,000+ emergency medical service incidents across Odisha’s multi-modal EMS network to identify operational risk patterns, service delay clusters, and resource bottlenecks. Built a full-stack analytics platform with a React/FastAPI backend exposing risk-scored incident data, delay heatmaps, and SLA breach visualizations. Delivered compliance-ready summary reports.",
    tags: ["Python", "FastAPI", "React", "Power BI", "Excel"],
    status: "Completed",
    metrics: [
      { label: "Incidents Analysed", value: "108,000+" },
      { label: "Signals", value: "Risk + delay clusters" },
      { label: "Platform", value: "React/FastAPI" },
      { label: "Outputs", value: "Compliance reports" },
    ],
    pipeline: [
      "Incident Ingestion",
      "Risk Pattern Modelling",
      "SLA / Delay Visuals",
      "Dashboard Publishing",
      "Report Delivery",
    ],
    results:
      "Analysed 108,000+ EMS incidents: risk and delay clusters, bottleneck signals, and SLA-style views in a React/FastAPI stack with stakeholder summaries. Numbers, maps, and exportable reports are on GitHub.",
    insight:
      "Treating delays and backlog as structured signals makes EMS risk actionable instead of anecdotal.",
    github: "https://github.com/varsh0613",
    color: "gold",
  },
  {
    id: "CHEMO-SURV",
    domain: "Oncology Survival Modelling",
    title: "Chemotherapy Survival Analysis — Patient Outcome Risk Modelling (2025)",
    description:
      "Applied Random Forest classification and Kaplan–Meier survival analysis to oncology patient datasets, identifying clinical and demographic risk factors predictive of adverse outcomes. Generated risk stratification outputs and feature importance profiles enabling clinically-meaningful patient segmentation for treatment planning support.",
    tags: ["Python", "scikit-learn", "Kaplan–Meier", "Power BI", "Excel"],
    status: "Completed",
    metrics: [
      { label: "Classification", value: "Random Forest" },
      { label: "Survival Analysis", value: "Kaplan–Meier" },
      { label: "Risk Stratification", value: "Clinically-meaningful" },
      { label: "Reporting", value: "Power BI outputs" },
    ],
    pipeline: [
      "Data Prep + EDA",
      "Risk Classification",
      "Survival Curves",
      "Feature Importance",
      "Risk Stratification Dashboards",
    ],
    results:
      "Random Forest classifier for adverse-outcome risk (reported hold-out accuracy about 0.88—replace with your final validation). Kaplan–Meier curves, risk tiers, and feature importance exported to Power BI. Full evaluation notebooks are on GitHub.",
    insight:
      "Interpretable survival and risk strata support treatment planning more than a single probability alone.",
    github: "https://github.com/varsh0613",
    color: "blue",
  },
  {
    id: "CREDIT-RISK",
    domain: "Financial Risk Analytics",
    title: "Credit Risk Analytics — ML-Based Customer Risk Classification (2025)",
    description:
      "Developed machine learning models for customer risk classification under real-world conditions of severe class imbalance, implementing SMOTE oversampling and threshold optimization. Produced a validated feature importance framework and risk scoring methodology aligned with financial compliance standards.",
    tags: ["Python", "scikit-learn", "SMOTE", "Excel", "Power BI"],
    status: "Completed",
    metrics: [
      { label: "Imbalance Handling", value: "SMOTE" },
      { label: "Threshold Optimisation", value: "Validated" },
      { label: "Risk Scoring", value: "Compliance-aligned" },
      { label: "Reporting", value: "Power BI framework" },
    ],
    pipeline: [
      "Data Cleaning",
      "Class Balancing (SMOTE)",
      "Feature Engineering",
      "Model Training",
      "Threshold Optimisation",
      "Risk Scoring + Reporting",
    ],
    results:
      "SMOTE-balanced training with tuned decision thresholds; feature importance and customer risk scores packaged for reporting. Confusion matrices, PR curves, and compliance-oriented notes are in the repo.",
    insight:
      "Finance models need calibrated thresholds and traceable features, not raw accuracy alone.",
    github: "https://github.com/varsh0613",
    color: "forest",
  },
  {
    id: "PULSE",
    domain: "Market Sentiment Intelligence",
    title: "PULSE — Market Sentiment & Financial Signal Intelligence Engine (2026)",
    description:
      "Ongoing (2026): financial intelligence work that scrapes news, runs FinBERT sentiment, pulls Yahoo Finance features, and trains XGBoost for directional signals. Final backtests, documentation, and consolidated report are still outstanding.",
    tags: ["Python", "FinBERT", "XGBoost", "NLP", "Yahoo Finance", "BeautifulSoup"],
    status: "In progress",
    metrics: [
      { label: "Sentiment Engine", value: "FinBERT" },
      { label: "Signal Output", value: "Directional + confidence" },
      { label: "Modelling", value: "XGBoost" },
      { label: "Data Sources", value: "News + Yahoo Finance" },
    ],
    pipeline: [
      "News Scraping",
      "FinBERT Sentiment",
      "Stock Data Integration",
      "Feature Engineering",
      "XGBoost Modelling",
      "Signal Serving",
    ],
    results:
      "Work in progress: feature pipeline and modelling are evolving; final performance summary and report will be published to GitHub when the project is closed out.",
    insight:
      "Sentiment works best when encoded as features and evaluated against price outcomes, not headlines alone.",
    github: "https://github.com/varsh0613",
    color: "gold",
  },
  {
    id: "SHIELD",
    domain: "Fraud Detection (Graph AI)",
    title: "SHIELD — Suspicious Heuristic & Irregular Entity Linkage Detector (2026)",
    description:
      "Ongoing (2026): GNN-based fraud analytics on transaction graphs—multi-hop signals, anomaly patterns, and ring-style behaviour. Full evaluation, ablations, and final technical report are not complete yet.",
    tags: ["Python", "GNN", "PyTorch Geometric", "NetworkX", "Fraud Detection"],
    status: "In progress",
    metrics: [
      { label: "Graph Model", value: "GNN architecture" },
      { label: "Detection Focus", value: "Fraud rings + anomalies" },
      { label: "Framework", value: "PyTorch Geometric" },
      { label: "Evaluation", value: "Pattern-level detection" },
    ],
    pipeline: [
      "Graph Construction",
      "Multi-hop Relationship Modelling",
      "Anomaly Detection",
      "Fraud Ring Identification",
      "Evaluation + Reporting",
    ],
    results:
      "In progress: graph construction and model experiments underway; final metrics, figures, and write-up will land on GitHub after the report is finished.",
    insight:
      "Coordinated fraud shows up as structure in the graph, not only as row-level outliers.",
    github: "https://github.com/varsh0613",
    color: "blue",
  },
  {
    id: "COMING-SOON",
    domain: "Next Build",
    title: "Major project coming soon",
    description:
      "A new case file is in progress. The full pipeline, evaluation artefacts, and insights will be added once the current iteration is ready.",
    tags: ["TBA"],
    status: "In progress",
    metrics: [
      { label: "Timeline", value: "TBA" },
      { label: "Focus", value: "Research + build" },
      { label: "Deliverables", value: "Pipeline + UI" },
      { label: "Status", value: "Major project coming soon" },
    ],
    pipeline: [],
    results: "Work in progress—no public results yet.",
    insight:
      "Next release will document the full pipeline, evaluation, and deployment path here and on GitHub.",
    github: "https://github.com/varsh0613",
    color: "amber",
  }
]

type AssetCategory = "certificates" | "dashboards" | "personal" | "designs" | "resume"

const assetUrl = (category: AssetCategory, fileName: string) =>
  `/api/assets/${encodeURIComponent(category)}/${encodeURIComponent(fileName)}`

function getFileExt(fileName: string) {
  const idx = fileName.lastIndexOf(".")
  if (idx < 0) return ""
  return fileName.slice(idx + 1).toLowerCase()
}

function isImageFile(fileName: string) {
  const ext = getFileExt(fileName)
  return ["png", "jpg", "jpeg", "webp", "gif", "svg"].includes(ext)
}

function isVideoFile(fileName: string) {
  const ext = getFileExt(fileName)
  return ["mp4", "webm", "mov"].includes(ext)
}

function isPdfFile(fileName: string) {
  return getFileExt(fileName) === "pdf"
}

/** Profile deck — all “myself*” photos in /personal; add entries if you add files. */
const profileDeckPhotos = [
  { file: "myself.jpg", label: "Portrait — lead profile shot" },
  { file: "myself2.jpeg", label: "Campus & leadership moments" },
  { file: "myself 3.jpeg", label: "Conference — presenting on stage" },
] as const

const collegePhotoRoll = [
  {
    file: "tejas 1.png",
    category: "personal" as const,
    caption: "Tejas — cultural night (photo 1): on-stage / team moment from the annual showcase.",
  },
  {
    file: "Tejas 2.png",
    category: "personal" as const,
    caption: "Tejas — cultural night (photo 2): second angle from the same run of performances.",
  },
  {
    file: "sc award.png",
    category: "personal" as const,
    caption: "Student Council — award / recognition moment from council work and college representation.",
  },
  {
    file: "labx.png",
    category: "personal" as const,
    caption: "LABX — international biotech conference hosted at college; behind-the-scenes / floor moment.",
  },
  {
    file: "ngl1.png",
    category: "personal" as const,
    caption: "NGL (Next Gen Leaders) — session / cohort moment from the leadership programme.",
  },
  {
    file: "BI battle 1st prize.png",
    category: "personal" as const,
    caption: "BI Battle — internal MBA analytics hackathon; first-prize finish with the team.",
  },
  {
    file: "bizhack  (1).jpeg",
    category: "personal" as const,
    caption: "BizHack — business hackathon coordination / floor energy (hosting & student engagement).",
  },
  {
    file: "indah drapes.jpg",
    category: "designs" as const,
    caption: "Design work — Indah Drapes collateral / visual layout (client-facing creative).",
  },
  {
    file: "bizhack case portal.png",
    category: "designs" as const,
    caption: "BizHack — case competition portal UI / screen (event digital experience).",
  },
] as const

const credentials = [
  {
    issuer: "DataCamp",
    name: "Intermediate SQL",
    color: "forest",
    fileName: "dc intermediate sql.pdf",
  },
  {
    issuer: "DataCamp",
    name: "Introduction to Power BI",
    color: "forest",
    fileName: "dc introduction to powerbi.pdf",
  },
  {
    issuer: "DataCamp",
    name: "Introduction to R",
    color: "forest",
    fileName: "dc introduction to R.pdf",
  },
  {
    issuer: "DataCamp",
    name: "ML for Business",
    color: "forest",
    fileName: "datacamp ML for business.png",
  },
  {
    issuer: "DataCamp",
    name: "Understanding Artificial Intelligence",
    color: "forest",
    fileName: "dc understanding artificial intelligence.pdf",
  },
  {
    issuer: "HP Life",
    name: "HP Life Certification",
    color: "blue",
    fileName: "HP life.png",
  },
  {
    issuer: "Infosys",
    name: "Python Certification",
    color: "gold",
    fileName: "python infosys cert.pdf",
  },
  {
    issuer: "LinkedIn",
    name: "Statistics Foundations",
    color: "blue",
    fileName: "CertificateOfCompletion_Statistics Foundations 1 The Basics.pdf",
  },
  {
    issuer: "Open University",
    name: "Open University Certificate",
    color: "amber",
    fileName: "open university.pdf",
  },
] satisfies Array<{
  issuer: string
  name: string
  color: "forest" | "gold" | "blue" | "amber"
  fileName: string
}>

// Note: Dashboards are now loaded dynamically from the /dashboards folder via the API
// See /lib/dashboards.ts and /app/api/dashboards/route.ts for the dynamic loading logic

const skills = {
  "Analytics & Programming": {
    core: ["Excel / Sheets", "SQL", "Python"],
    secondary: ["Pandas", "NumPy", "scikit-learn", "R", "Jupyter"]
  },
  "Visualisation & BI": {
    core: ["Power BI", "Tableau"],
    secondary: ["Data Storytelling", "Dashboard Design", "matplotlib", "seaborn"]
  },
  "Domain": {
    core: ["Healthcare Analytics", "Risk Analysis"],
    secondary: ["Survival Analysis", "Kaplan-Meier", "Cox Regression", "Biostatistics", "Public Health", "Financial Risk"]
  },
  "Business & Consulting": {
    core: ["Project Management", "Stakeholder Communication"],
    secondary: ["Consulting Delivery", "Research & Synthesis", "Public Speaking", "Documentation"]
  }
}

// Nav Component
function NavStrip({ onNavigate }: { onNavigate: (panel: PanelType) => void }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-12 flex items-center justify-between px-6 bg-[#F5F2EC]/90 backdrop-blur-md border-b border-[#DDD8CE]">
      <div className="flex items-center gap-2 font-mono text-xs text-[#2D6A4F] tracking-wider">
        <span className="w-2 h-2 rounded-full bg-[#52B788] animate-pulse" />
        VS LAB — ACTIVE SESSION
      </div>
      
      <div className="flex gap-6">
        {[
          { key: "about", label: "About", Icon: TerminalIcon },
          { key: "projects", label: "Projects", Icon: FolderIcon },
          { key: "dashboards", label: "Dashboards", Icon: ChartIcon },
          { key: "timeline", label: "Timeline", Icon: TimelineIcon },
          { key: "credentials", label: "Credentials", Icon: CertificateIcon }
        ].map(({ key, label, Icon }) => (
          <motion.button
            key={key}
            onClick={() => onNavigate(key as PanelType)}
            className="relative flex items-center gap-1.5 px-2 py-1 rounded-sm font-mono text-[10px] tracking-wider uppercase text-[#666] hover:text-[#2D6A4F] transition-colors group"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <span className="absolute inset-0 rounded-sm bg-[#52B788]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <motion.span className="relative z-10 group-hover:rotate-12 transition-transform">
              <Icon className="w-3.5 h-3.5" />
            </motion.span>
            <span className="relative z-10">{label}</span>
            <span className="absolute -bottom-1 left-0 right-0 h-px bg-[#52B788] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </motion.button>
        ))}
      </div>
      
      <div className="font-mono text-[10px] text-[#999] tracking-wider">
        Hyderabad · MBA '26
      </div>
    </nav>
  )
}

// Hero Overlay with lab name and CTA
function HeroOverlay({ onNavigate }: { onNavigate: (panel: PanelType) => void }) {
  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center z-10">
      {/* Lab Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#2D6A4F] border border-[#52B788] bg-[#52B788]/10 px-4 py-1.5 rounded-full">
          Research Lab · Healthcare Analytics · Risk Analysis
        </span>
      </motion.div>
      
      {/* Main Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center mt-6"
      >
        <p className="font-serif text-lg text-[#666] mb-2">The VS Lab of</p>
        <h1 className="font-serif text-6xl md:text-8xl font-light text-[#1A1A1A] tracking-tight">
          Varshitha
        </h1>
        <h1 className="font-serif text-6xl md:text-8xl font-light italic text-[#2D6A4F] tracking-tight -mt-2">
          Sirigiri
        </h1>
      </motion.div>
      
      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="font-mono text-xs tracking-wider text-[#666] mt-6 uppercase"
      >
        MBA · Business Analytics · B.Sc Biotech · Graduating Aug 2026
      </motion.p>
      
      {/* Entry hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mt-10 flex items-center gap-3 text-[#999]"
      >
        <span className="w-10 h-px bg-[#DDD8CE]" />
        <span className="font-mono text-[10px] tracking-wider">Click any lab object to explore</span>
        <span className="w-10 h-px bg-[#DDD8CE]" />
      </motion.div>
    </div>
  )
}

// Panel Components
function PanelWrapper({ 
  isOpen, 
  onClose, 
  title, 
  subtitle,
  children 
}: { 
  isOpen: boolean
  onClose: () => void
  title: string
  subtitle: string
  children: React.ReactNode
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-[#1B1E18]/60 backdrop-blur-sm"
          />
          
          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-x-4 top-[5vh] bottom-[5vh] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[min(92vw,960px)] z-[101] bg-[#FAFAF7] border border-[#DDD8CE] rounded-xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#DDD8CE] bg-[#EDE9E0]">
              <div className="flex items-center gap-4">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                  <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
                </div>
                <div>
                  <p className="font-mono text-[9px] tracking-wider text-[#2D6A4F] uppercase">{subtitle}</p>
                  <h2 className="font-serif text-xl text-[#1A1A1A]">{title}</h2>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full border border-[#DDD8CE] flex items-center justify-center text-[#666] hover:bg-[#1A1A1A] hover:text-[#FAFAF7] hover:border-[#1A1A1A] transition-all"
              >
                ×
              </button>
            </div>
            
            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

type LifeDetail = "blog" | "tutoring" | "ngo" | "college"

function ProfilePhotoDeck() {
  const n = profileDeckPhotos.length
  const [order, setOrder] = useState<number[]>(() => profileDeckPhotos.map((_, i) => i))

  const peelTop = () => {
    setOrder((prev) => {
      if (prev.length < 2) return prev
      const top = prev[prev.length - 1]
      return [top, ...prev.slice(0, -1)]
    })
  }

  return (
    <div className="bg-[#EDE9E0] border border-[#DDD8CE] rounded-lg p-5 overflow-hidden flex flex-col h-full min-h-0">
      <p className="font-mono text-[9px] tracking-wider text-[#999] uppercase mb-1 shrink-0">Profile deck</p>
      <p className="text-xs text-[#666] mb-3 shrink-0">
        Click the top card to peel it to the back and reveal the photo underneath. All shots are from the same “myself” set in your personal folder.
      </p>

      <div className="relative flex-1 min-h-[320px] overflow-hidden rounded-xl bg-[#E8E4DB]/50">
        <LabWallDecor variant="panel" />

        <div className="relative z-[1] flex h-full min-h-[300px] w-full flex-1 items-center justify-center touch-manipulation overflow-hidden px-3 py-5 sm:px-6 sm:py-8 md:px-8 md:py-10">
          {/* Large clip region so a fanned deck reads clearly without spilling out */}
          <div className="relative mx-auto h-[min(88vw,480px)] w-[min(92vw,360px)] min-h-[360px] max-h-[500px] sm:h-[min(72vh,480px)] sm:w-[340px] md:w-[360px] overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              {order.map((photoIndex, stackDepth) => {
                const p = profileDeckPhotos[photoIndex]
                const isTop = stackDepth === n - 1
                const y = stackDepth * 10
                const scale = 0.84 + stackDepth * 0.08
                const rot = -5 + stackDepth * 5
                const x = stackDepth === 0 ? -4 : stackDepth === 1 ? 2 : 0
                return (
                  <motion.button
                    type="button"
                    key={photoIndex}
                    onClick={(e) => {
                      e.stopPropagation()
                      if (isTop) peelTop()
                    }}
                    className={`absolute left-1/2 top-1/2 box-border rounded-xl border-[3px] border-white shadow-2xl overflow-hidden bg-[#2D2D2D] ${
                      isTop ? "cursor-pointer ring-2 ring-[#52B788]/50" : "cursor-default pointer-events-none"
                    }`}
                    style={{
                      zIndex: 10 + stackDepth,
                      width: "min(100%, 300px)",
                      maxWidth: "100%",
                      aspectRatio: "3 / 4",
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${rot}deg) scale(${scale})`,
                      transformOrigin: "center center",
                    }}
                    aria-label={isTop ? `Top card: ${p.label}. Click to see next photo.` : undefined}
                  >
                    <img
                      src={assetUrl("personal", p.file)}
                      alt={p.label}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/75 to-transparent pt-10 pb-3 px-3 text-left">
                      <p className="font-mono text-[9px] tracking-wider text-white/90 uppercase">{p.file}</p>
                      <p className="text-xs text-white/95 font-medium leading-snug">{p.label}</p>
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <p className="text-center font-mono text-[9px] text-[#999] mt-3 shrink-0 uppercase tracking-wider">
        {n} cards · tap top to cycle
      </p>
    </div>
  )
}

function AboutPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [showMore, setShowMore] = useState(false)
  const [lifeDetail, setLifeDetail] = useState<LifeDetail | null>(null)

  useEffect(() => {
    if (!isOpen) setLifeDetail(null)
  }, [isOpen])

  return (
    <>
    <PanelWrapper isOpen={isOpen} onClose={onClose} title="Varshitha Sirigiri" subtitle="Profile Terminal">
      {/* Terminal + photo deck — matched height on md+ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 md:items-stretch">
        <div className="bg-[#1A1A1A] rounded-lg p-5 font-mono text-sm min-h-[440px] md:min-h-[520px] flex flex-col">
          <div className="flex gap-1.5 mb-4 pb-3 border-b border-white/10 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
          </div>
          
          <div className="space-y-1 flex-1 min-h-0">
            <p><span className="text-[#52B788]">vs@vs:~$ </span><span className="text-white">whoami</span></p>
            <p className="text-white/60 pl-4">Varshitha Sirigiri — MBA Business Analytics · B.Sc Biotech, Chem, Genetics</p>
            
            <p><span className="text-[#52B788]">vs@vs:~$ </span><span className="text-white">focus</span></p>
            <p className="text-white/60 pl-4">Healthcare Analytics · Risk Analysis · Data-driven Decision Making</p>
            
            <p><span className="text-[#52B788]">vs@vs:~$ </span><span className="text-white">status</span></p>
            <p className="text-[#52B788]/90 pl-4">● Available from August 2026 · Hyderabad, India</p>
            
            <p><span className="text-[#52B788]">vs@vs:~$ </span><span className="text-white">last_deployment</span></p>
            <p className="text-white/60 pl-4">Project Consultant · Access Health International · Govt. of Odisha</p>
            
            <p className="flex items-center"><span className="text-[#52B788]">vs@vs:~$ </span><span className="w-2 h-4 bg-[#52B788] ml-1 animate-pulse" /></p>
          </div>
        </div>

        <div className="min-h-[440px] md:min-h-[520px] flex flex-col">
          <ProfilePhotoDeck />
        </div>
      </div>
      
      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        {[
          { label: "Education · Current", value: "MBA — Business Analytics", sub: "Anurag University · Graduating Aug 2026" },
          { label: "Education · Foundation", value: "B.Sc — Biotechnology, Chemistry & Genetics", sub: "Loyola Academy · completed Apr 2024" },
          { label: "Last Role", value: "Project Consultant", sub: "Access Health International · Dec '25–Mar '26" },
          { label: "Previous Role", value: "Tech Support Intern", sub: "Tech Mahindra · Oct–Dec '25" }
        ].map((item, i) => (
          <div key={i} className="bg-[#EDE9E0] border border-[#DDD8CE] rounded-lg p-4">
            <p className="font-mono text-[8px] tracking-wider text-[#999] uppercase mb-2">{item.label}</p>
            <p className="text-sm font-medium text-[#1A1A1A]">{item.value}</p>
            <p className="text-xs text-[#666] mt-1">{item.sub}</p>
          </div>
        ))}
      </div>
      
      {/* Skills */}
      <h3 className="font-serif text-lg text-[#1A1A1A] mb-4 pt-4 border-t border-[#DDD8CE]">Skills & Toolkit</h3>
      
      {Object.entries(skills).map(([category, { core, secondary }]) => (
        <div key={category} className="mb-4">
          <p className="font-mono text-[9px] tracking-wider text-[#999] uppercase mb-2">{category}</p>
          <div className="flex flex-wrap gap-1.5">
            {core.map(skill => (
              <span key={skill} className="px-3 py-1 text-xs bg-[#2D6A4F]/10 text-[#2D6A4F] border border-[#52B788]/30 rounded-full font-medium">
                {skill}
              </span>
            ))}
            {secondary.map(skill => (
              <span key={skill} className="px-3 py-1 text-xs bg-[#EDE9E0] text-[#666] border border-[#DDD8CE] rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
      
      {/* Know More */}
      <button
        onClick={() => setShowMore(!showMore)}
        className="flex items-center gap-2 font-mono text-[10px] tracking-wider uppercase text-[#2D6A4F] border border-[#52B788] bg-[#52B788]/10 px-4 py-2 rounded mt-4 hover:bg-[#2D6A4F] hover:text-white transition-all"
      >
        Know more about me
        <span className={`transition-transform ${showMore ? 'rotate-180' : ''}`}>▼</span>
      </button>
      
      <AnimatePresence>
        {showMore && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              {/* Blog — carousel only after click */}
              <div className="bg-[#EDE9E0] border border-[#DDD8CE] rounded-lg p-4 flex flex-col min-h-[200px]">
                <div className="flex items-center gap-2 mb-2">
                  <BeakerIcon className="w-5 h-5 text-[#2D6A4F]" />
                  <p className="text-sm font-medium text-[#1A1A1A]">Blog</p>
                </div>
                <p className="text-xs text-[#666] leading-relaxed mb-3 flex-1">
                  Long-form notes on analytics craft, messy datasets, and what actually changed how I think about risk and healthcare problems—not polished LinkedIn fluff, but the real iterations.
                </p>
                <button
                  type="button"
                  onClick={() => setLifeDetail("blog")}
                  className="font-mono text-[10px] tracking-wider uppercase text-[#2D6A4F] border border-[#52B788] bg-[#52B788]/10 px-3 py-2 rounded hover:bg-[#2D6A4F] hover:text-white transition-all w-full text-center"
                >
                  Open blog carousel →
                </button>
              </div>

              {/* Home Tutoring — text-first; no unrelated “hosting” photos */}
              <div className="bg-[#EDE9E0] border border-[#DDD8CE] rounded-lg p-4 flex flex-col min-h-[200px]">
                <div className="flex items-center gap-2 mb-2">
                  <DNAIcon className="w-5 h-5 text-[#2D6A4F]" />
                  <p className="text-sm font-medium text-[#1A1A1A]">Home Tutoring</p>
                </div>
                <p className="text-xs text-[#666] leading-relaxed mb-3 flex-1">
                  From Aug 2024 through Oct 2025 I ran an almost daily teaching rhythm—custom question banks, “explain it like I’m five” breakdowns for calculus and chemistry, and ruthless exam simulation. Students arrived overwhelmed and left with structured confidence; several jumped full letter grades once the mental model clicked.
                </p>
                <button
                  type="button"
                  onClick={() => setLifeDetail("tutoring")}
                  className="font-mono text-[10px] tracking-wider uppercase text-[#2D6A4F] border border-[#52B788] bg-[#52B788]/10 px-3 py-2 rounded hover:bg-[#2D6A4F] hover:text-white transition-all w-full text-center"
                >
                  Full story →
                </button>
              </div>

              {/* NGO */}
              <div className="bg-[#EDE9E0] border border-[#DDD8CE] rounded-lg p-4 flex flex-col min-h-[200px]">
                <div className="flex items-center gap-2 mb-2">
                  <CertificateIcon className="w-5 h-5 text-[#2D6A4F]" />
                  <p className="text-sm font-medium text-[#1A1A1A]">NGO — Voice for Girls</p>
                </div>
                <p className="text-xs text-[#666] leading-relaxed mb-3 flex-1">
                  Fifteen consecutive days in Dec 2022 with V4G: early-morning setup, facilitation blocks on careers and consent-adjacent education, and quiet 1:1 conversations girls don’t get in a typical classroom. It rewired how I think about dignity, access, and the responsibility of anyone with a microphone.
                </p>
                <button
                  type="button"
                  onClick={() => setLifeDetail("ngo")}
                  className="font-mono text-[10px] tracking-wider uppercase text-[#2D6A4F] border border-[#52B788] bg-[#52B788]/10 px-3 py-2 rounded hover:bg-[#2D6A4F] hover:text-white transition-all w-full text-center"
                >
                  Camp photos & captions →
                </button>
              </div>

              {/* College life */}
              <div className="bg-[#EDE9E0] border border-[#DDD8CE] rounded-lg p-4 flex flex-col min-h-[200px]">
                <div className="flex items-center gap-2 mb-2">
                  <FolderIcon className="w-5 h-5 text-[#2D6A4F]" />
                  <p className="text-sm font-medium text-[#1A1A1A]">College life & events</p>
                </div>
                <p className="text-xs text-[#666] leading-relaxed mb-3 flex-1">
                  Tejas stages, LABX biotech conference ops, NGL cohort work, a BI Battle first-place analytics sprint, BizHack leadership on the floor, Student Council recognition, plus serious design deliverables (Indah drapes, BizHack portal). Each file in the gallery is labelled to match the actual moment—open the modal to read per-photo context.
                </p>
                <button
                  type="button"
                  onClick={() => setLifeDetail("college")}
                  className="font-mono text-[10px] tracking-wider uppercase text-[#2D6A4F] border border-[#52B788] bg-[#52B788]/10 px-3 py-2 rounded hover:bg-[#2D6A4F] hover:text-white transition-all w-full text-center"
                >
                  Gallery with file labels →
                </button>
              </div>
            </div>
            
            {/* Principles */}
            <div className="bg-[#1B4332] rounded-lg p-5 mt-4">
              <p className="font-mono text-[9px] tracking-wider text-white/30 uppercase mb-4">Principles</p>
              <ul className="space-y-3">
                {[
                  "Data without context is noise. Ask better questions first.",
                  "The biology background isn't a detour — it's a different map of the same territory.",
                  "A good risk framework makes uncertainty legible, not invisible.",
                  "Healthcare is the most human thing we try to organise.",
                  "The best insight is the one the room wasn't expecting but immediately recognises as true."
                ].map((principle, i) => (
                  <li key={i} className="flex gap-3 text-sm text-white/65">
                    <span className="font-serif italic text-white/20">{i + 1}.</span>
                    {principle}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PanelWrapper>

    <AnimatePresence>
      {isOpen && lifeDetail && (
        <motion.div
          role="dialog"
          aria-modal="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-[#1B1E18]/65 backdrop-blur-sm"
          onClick={() => setLifeDetail(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            className={`bg-[#FAFAF7] w-full max-h-[min(88vh,720px)] overflow-y-auto rounded-xl border border-[#DDD8CE] p-6 shadow-2xl ${
              lifeDetail === "blog" ? "max-w-3xl" : "max-w-2xl"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3 mb-4">
              <h3 className="font-serif text-xl text-[#1A1A1A]">
                {lifeDetail === "blog" && "Blog"}
                {lifeDetail === "tutoring" && "Home Tutoring"}
                {lifeDetail === "ngo" && "NGO — Voice for Girls"}
                {lifeDetail === "college" && "College life & events"}
              </h3>
              <button
                type="button"
                onClick={() => setLifeDetail(null)}
                className="shrink-0 w-9 h-9 rounded-full border border-[#DDD8CE] text-[#666] hover:bg-[#1A1A1A] hover:text-[#FAFAF7] transition-colors"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            {lifeDetail === "blog" && (
              <div className="rounded-lg border border-[#DDD8CE] bg-[#FAFAF7] p-3">
                <BlogCarousel />
              </div>
            )}

            {lifeDetail === "tutoring" && (
              <div className="space-y-4 text-sm text-[#666] leading-relaxed">
                <p>
                  Across Aug 2024–Oct 2025 I treated tutoring like a product: diagnostic first session, weekly sprint plans, and homework that forced retrieval—not passive reading. I rebuilt fundamentals for students who had “always been bad at maths” until the framing changed.
                </p>
                <p>
                  Sessions ran long when needed; parents saw grade trajectories move from barely passing to confident As and Bs once exam technique matched conceptual clarity. I’m absurdly proud of the kids who started shy and ended up arguing solutions with me.
                </p>
                <p className="text-xs text-[#999] font-mono uppercase tracking-wider">
                  No gallery here — previous images were from hosting events, not tutoring.
                </p>
              </div>
            )}

            {lifeDetail === "ngo" && (
              <>
                <p className="text-sm text-[#666] leading-relaxed mb-4">
                  Fifteen days with Voice for Girls: sunrise prep, facilitated modules on careers and body literacy, and difficult questions handled without flinching. The camp didn’t feel like charity—it felt like transferring agency.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(
                    [
                      {
                        file: "v4g1.jpeg",
                        caption:
                          "v4g1.jpeg — Opening cohort moment: girls settling into the first trust-building circle before we moved into structured modules.",
                      },
                      {
                        file: "v4g2.jpeg",
                        caption:
                          "v4g2.jpeg — Facilitation block: group discussion on career paths and what “choice” actually looks like in their contexts.",
                      },
                      {
                        file: "v4g3.jpeg",
                        caption:
                          "v4g3.jpeg — Health and dignity segment: menstruation education with practical, non-stigmatising language and Q&A.",
                      },
                      {
                        file: "v4g4.jpeg",
                        caption:
                          "v4g4.jpeg — Closing stretch: lighter energy, photos, and commitments the girls chose for themselves going forward.",
                      },
                    ] as const
                  ).map(({ file, caption }) => (
                    <figure key={file} className="rounded-lg border border-[#DDD8CE] overflow-hidden bg-white">
                      <img
                        src={assetUrl("personal", file)}
                        alt={caption}
                        className="w-full h-40 sm:h-44 object-cover"
                      />
                      <figcaption className="text-xs text-[#555] leading-snug p-3 bg-[#EDE9E0]/80">{caption}</figcaption>
                    </figure>
                  ))}
                </div>
              </>
            )}

            {lifeDetail === "college" && (
              <>
                <p className="text-sm text-[#666] leading-relaxed mb-4">
                  Below, each filename matches how you organised the folder—Tejas, LABX, NGL, BI Battle, BizHack, SC award, and design exports—so visitors see the real story behind every still.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {collegePhotoRoll.map(({ file, category, caption }) => (
                    <figure key={file} className="rounded-lg border border-[#DDD8CE] overflow-hidden bg-white">
                      <img
                        src={assetUrl(category, file)}
                        alt={caption}
                        className="w-full h-40 sm:h-44 object-cover"
                      />
                      <figcaption className="text-xs text-[#555] leading-snug p-3 bg-[#EDE9E0]/80">
                        <span className="font-mono text-[10px] text-[#2D6A4F] block mb-1">{file}</span>
                        {caption}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  )
}

function ProjectsPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [selectedCase, setSelectedCase] = useState<typeof caseFiles[0] | null>(null)
  const [activeTab, setActiveTab] = useState(0)
  
  const colorMap = {
    forest: { bg: "bg-[#2D6A4F]/10", border: "border-[#52B788]/30", text: "text-[#2D6A4F]", bar: "bg-[#2D6A4F]" },
    gold: { bg: "bg-[#8B6914]/10", border: "border-[#8B6914]/30", text: "text-[#8B6914]", bar: "bg-[#8B6914]" },
    blue: { bg: "bg-[#2E5995]/10", border: "border-[#2E5995]/30", text: "text-[#2E5995]", bar: "bg-[#2E5995]" },
    amber: { bg: "bg-[#B45309]/10", border: "border-[#B45309]/30", text: "text-[#B45309]", bar: "bg-[#B45309]" }
  }
  
  return (
    <PanelWrapper isOpen={isOpen} onClose={onClose} title="Projects" subtitle="Case Files — Active Investigations">
      {!selectedCase ? (
        <>
          <p className="text-sm text-[#666] mb-6">
            Each project is an investigation. Click a case file to explore the methodology, data, and findings.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {caseFiles.map((file) => {
              const colors = colorMap[file.color as keyof typeof colorMap]
              return (
                <motion.button
                  key={file.id}
                  onClick={() => { setSelectedCase(file); setActiveTab(0) }}
                  whileHover={{ y: -4 }}
                  className={`text-left bg-[#EDE9E0] border border-[#DDD8CE] rounded-lg p-5 relative overflow-hidden hover:border-[#52B788] transition-colors`}
                >
                  <div className={`absolute top-0 left-0 right-0 h-1 ${colors.bar}`} />
                  <p className="font-mono text-[9px] text-[#999] tracking-wider mb-2">CASE FILE · {file.id} · {file.domain.toUpperCase()}</p>
                  <h3 className="font-serif text-lg text-[#1A1A1A] mb-2">{file.title}</h3>
                  <p className="text-xs text-[#666] line-clamp-2 mb-3">{file.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {file.tags.slice(0, 4).map(tag => (
                      <span key={tag} className="px-2 py-0.5 text-[9px] font-mono border border-[#DDD8CE] text-[#999] rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className={`font-mono text-[10px] ${colors.text} tracking-wider`}>Open case file →</p>
                </motion.button>
              )
            })}
          </div>
        </>
      ) : (
        <>
          {/* Back button */}
          <button
            onClick={() => setSelectedCase(null)}
            className="font-mono text-[10px] tracking-wider text-[#666] hover:text-[#2D6A4F] mb-4 flex items-center gap-2"
          >
            ← All Cases
          </button>
          
          {/* Case header */}
          <div className="flex gap-2 mb-4">
            <span className={`px-3 py-1 text-[9px] font-mono rounded ${colorMap[selectedCase.color as keyof typeof colorMap].bg} ${colorMap[selectedCase.color as keyof typeof colorMap].border} ${colorMap[selectedCase.color as keyof typeof colorMap].text} border`}>
              {selectedCase.domain}
            </span>
            <span className="px-3 py-1 text-[9px] font-mono rounded bg-[#2D6A4F]/10 border border-[#52B788]/30 text-[#2D6A4F]">
              {selectedCase.status}
            </span>
          </div>
          
          <h3 className="font-serif text-2xl text-[#1A1A1A] mb-4">{selectedCase.title}</h3>
          
          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {selectedCase.metrics.map((m, i) => (
              <div key={i} className="bg-[#EDE9E0] border border-[#DDD8CE] rounded-lg p-3">
                <p className="font-serif text-2xl text-[#2D6A4F]">{m.value}</p>
                <p className="font-mono text-[8px] text-[#999] tracking-wider uppercase mt-1">{m.label}</p>
              </div>
            ))}
          </div>
          
          {/* Tabs */}
          <div className="flex gap-1 bg-[#EDE9E0] p-1 rounded-lg border border-[#DDD8CE] w-fit mb-6">
            {["Overview", "Method", "Results", "Insight"].map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`px-4 py-1.5 font-mono text-[10px] tracking-wider uppercase rounded transition-all ${
                  activeTab === i 
                    ? "bg-[#FAFAF7] text-[#2D6A4F] shadow-sm" 
                    : "text-[#666] hover:text-[#2D6A4F]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          {/* Tab content */}
          <div className="text-sm text-[#666] leading-relaxed">
            {activeTab === 0 && <p>{selectedCase.description}</p>}
            {activeTab === 1 && (
              <>
                <p className="mb-4">Pipeline:</p>
                <div className="flex flex-wrap items-center gap-2 bg-[#EDE9E0] border border-[#DDD8CE] rounded-lg p-4">
                  {selectedCase.pipeline.map((step, i) => (
                    <div key={i} className="flex items-center">
                      <span className="px-3 py-1.5 bg-[#2D6A4F]/10 border border-[#52B788]/30 text-[#2D6A4F] text-xs font-mono rounded hover:bg-[#2D6A4F] hover:text-white transition-all cursor-default">
                        {step}
                      </span>
                      {i < selectedCase.pipeline.length - 1 && (
                        <span className="mx-2 text-[#DDD8CE]">→</span>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
            {activeTab === 2 && (
              <div className="space-y-4">
                <p className="text-[#1A1A1A] leading-relaxed">{selectedCase.results}</p>
                <p className="text-xs text-[#888] leading-relaxed">
                  Detailed metrics, charts, and notebooks are documented in the GitHub repository linked below.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-[#EEE]">
                  {selectedCase.metrics.map((m, i) => (
                    <div key={i} className="flex justify-between items-center bg-[#EDE9E0] border border-[#DDD8CE] rounded-lg p-3">
                      <span className="text-[#666]">{m.label}</span>
                      <span className="font-mono font-medium text-[#2D6A4F]">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === 3 && (
              <div className="bg-[#EDE9E0] border border-[#DDD8CE] rounded-lg p-5">
                <p className="text-sm text-[#1A1A1A] leading-relaxed">{selectedCase.insight}</p>
                <p className="font-mono text-[9px] text-[#999] tracking-wider mt-4 uppercase">Case {selectedCase.id} · takeaway</p>
              </div>
            )}
          </div>
          
          {/* GitHub link */}
          <a
            href={selectedCase.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 font-mono text-[10px] tracking-wider text-[#2D6A4F] hover:underline"
          >
            View on GitHub →
          </a>
        </>
      )}
    </PanelWrapper>
  )
}

function DashboardsPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [dashboards, setDashboards] = useState<Dashboard[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isOpen) return

    const fetchDashboards = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch("/api/dashboards")
        if (!response.ok) throw new Error("Failed to load dashboards")
        const data = await response.json()
        setDashboards(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load dashboards")
        console.error("Error fetching dashboards:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboards()
  }, [isOpen])

  return (
    <PanelWrapper isOpen={isOpen} onClose={onClose} title="Dashboards" subtitle="Active Experiments">
      <p className="text-sm text-[#666] mb-6">
        Live analytical screens from active and completed investigations. Each dashboard represents a data story.
      </p>
      
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <ChartIcon className="w-8 h-8 animate-spin text-[#2D6A4F]" />
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-red-700">Error: {error}</p>
        </div>
      )}

      {!isLoading && dashboards.length === 0 && !error && (
        <div className="text-center py-12">
          <ChartIcon className="w-12 h-12 text-[#DDD8CE] mx-auto mb-3" />
          <p className="text-sm text-[#999]">No dashboards found</p>
          <p className="text-xs text-[#CCC] mt-1">Add files to the /dashboards folder to see them here</p>
        </div>
      )}

      {!isLoading && dashboards.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {dashboards.map((dash, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4, rotate: 1 }}
              className="bg-[#2E2E2E] border border-white/10 rounded-lg overflow-hidden"
            >
              <div className="aspect-video bg-[#EDE9E0] flex items-center justify-center relative overflow-hidden">
                {isImageFile(dash.thumbFileName) ? (
                  <img
                    src={assetUrl('dashboards', dash.thumbFileName)}
                    alt={dash.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-90"
                  />
                ) : isVideoFile(dash.thumbFileName) ? (
                  <video
                    src={assetUrl('dashboards', dash.thumbFileName)}
                    className="absolute inset-0 w-full h-full object-cover opacity-95"
                    muted
                    playsInline
                    preload="metadata"
                    controls={false}
                    aria-label={`${dash.title} preview`}
                  />
                ) : isPdfFile(dash.thumbFileName) ? (
                  <iframe
                    title={`${dash.title} PDF preview`}
                    src={`${assetUrl('dashboards', dash.thumbFileName)}#view=FitH&toolbar=0`}
                    className="absolute inset-0 w-full h-full border-0 bg-[#f4f4f0]"
                  />
                ) : (
                  <ChartIcon className="w-12 h-12 text-[#1B4332] opacity-20" />
                )}
                <span className={`absolute top-2 right-2 px-2 py-0.5 text-[8px] font-mono text-white rounded ${
                  dash.tool === "Power BI" ? "bg-[#2E5995]" : "bg-[#2D6A4F]"
                }`}>
                  {dash.tool}
                </span>
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-white/85">{dash.title}</p>
                <p className="text-[10px] text-white/40 mt-1">{dash.desc}</p>

                <a
                  href={assetUrl('dashboards', dash.fileName)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 font-mono text-[10px] tracking-wider text-[#F5F2EC] hover:underline"
                >
                  Open {getFileExt(dash.fileName).toUpperCase()} →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </PanelWrapper>
  )
}

function TimelinePanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <PanelWrapper isOpen={isOpen} onClose={onClose} title="Timeline" subtitle="Research Log">
      <JourneyTimeline />
    </PanelWrapper>
  )
}

function CredentialsPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const colorMap = {
    forest: { bg: "bg-[#2D6A4F]/10", border: "border-[#52B788]/30", text: "text-[#2D6A4F]" },
    gold: { bg: "bg-[#8B6914]/10", border: "border-[#8B6914]/30", text: "text-[#8B6914]" },
    blue: { bg: "bg-[#2E5995]/10", border: "border-[#2E5995]/30", text: "text-[#2E5995]" },
    amber: { bg: "bg-[#B45309]/10", border: "border-[#B45309]/30", text: "text-[#B45309]" }
  }
  
  return (
    <PanelWrapper isOpen={isOpen} onClose={onClose} title="Certifications" subtitle="Credentials Folder">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {credentials.map((cred, i) => {
          const colors = colorMap[cred.color as keyof typeof colorMap]
          const fileUrl = assetUrl('certificates', cred.fileName)
          const ext = getFileExt(cred.fileName)
          return (
            <motion.div
              key={i}
              whileHover={{ y: -2 }}
              className="bg-[#EDE9E0] border border-[#DDD8CE] rounded-lg p-4 hover:border-[#52B788] transition-colors flex flex-col"
            >
              <span className={`inline-block px-2 py-0.5 text-[8px] font-mono tracking-wider uppercase rounded mb-3 ${colors.bg} ${colors.border} ${colors.text} border`}>
                {cred.issuer}
              </span>
              <p className="text-sm font-medium text-[#1A1A1A] mb-2">{cred.name}</p>
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] text-[#2D6A4F] hover:underline flex items-center gap-1"
              >
                Open {ext.toUpperCase()} →
              </a>
            </motion.div>
          )
        })}
      </div>
    </PanelWrapper>
  )
}

// Contact Footer
function ContactFooter() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 h-14 flex items-center justify-between px-6 bg-[#F5F2EC]/90 backdrop-blur-md border-t border-[#DDD8CE]">
      <div className="flex items-center gap-6">
        <a 
          href="mailto:sirigirivarshitha@gmail.com" 
          className="font-mono text-xs text-[#2D6A4F] hover:underline"
        >
          sirigirivarshitha@gmail.com
        </a>
        <div className="flex gap-2">
          <a 
            href="http://www.linkedin.com/in/s-varshitha-8962a6229" 
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] tracking-wider uppercase text-[#666] border border-[#DDD8CE] px-3 py-1.5 rounded hover:border-[#2D6A4F] hover:text-[#2D6A4F] transition-all"
          >
            LinkedIn
          </a>
          <a 
            href="https://github.com/varsh0613" 
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] tracking-wider uppercase text-[#666] border border-[#DDD8CE] px-3 py-1.5 rounded hover:border-[#2D6A4F] hover:text-[#2D6A4F] transition-all"
          >
            GitHub
          </a>
          <a 
            href="/api/assets/resume/Varshitha_Sirigiri_Resume.docx"
            download="Varshitha_Sirigiri_Resume.docx"
            className="font-mono text-[10px] tracking-wider uppercase text-[#F5F2EC] bg-[#1B4332] px-3 py-1.5 rounded hover:bg-[#2D6A4F] transition-all"
          >
            Resume ↓
          </a>
        </div>
      </div>
      <p className="font-mono text-[10px] text-[#999] tracking-wider">
        MBA Business Analytics · Available Aug 2026
      </p>
    </footer>
  )
}

// Main Page Component
export default function LabPage() {
  const [activePanel, setActivePanel] = useState<PanelType>(null)
  
  const handleNavigate = (panel: PanelType | string) => {
    setActivePanel(panel as PanelType)
  }
  
  return (
    <main className="relative min-h-screen bg-[#F5F2EC]">
      {/* Navigation */}
      <NavStrip onNavigate={handleNavigate} />
      
      {/* 3D Lab Scene */}
      <Suspense fallback={
        <div className="w-full h-screen bg-[#F5F2EC] flex items-center justify-center">
          <DNAIcon className="w-16 h-16 animate-pulse" />
        </div>
      }>
        <LabScene3D onNavigate={handleNavigate} />
      </Suspense>
      
      {/* Hero Overlay */}
      <HeroOverlay onNavigate={handleNavigate} />
      
      {/* Panels */}
      <AboutPanel isOpen={activePanel === "about"} onClose={() => setActivePanel(null)} />
      <ProjectsPanel isOpen={activePanel === "projects"} onClose={() => setActivePanel(null)} />
      <DashboardsPanel isOpen={activePanel === "dashboards"} onClose={() => setActivePanel(null)} />
      <TimelinePanel isOpen={activePanel === "timeline"} onClose={() => setActivePanel(null)} />
      <CredentialsPanel isOpen={activePanel === "credentials"} onClose={() => setActivePanel(null)} />
      
      {/* Contact Footer */}
      <ContactFooter />
    </main>
  )
}
