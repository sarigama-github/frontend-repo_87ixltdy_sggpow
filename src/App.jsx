import React, { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Slide from './components/Slide'

const slides = [
  {
    kicker: 'AIOne',
    title: 'The Universal AI Hub',
    subtitle: 'All AI tools in one place, neatly organized, instantly usable',
    footer: 'aio.one • @AIOne',
  },
  {
    title: 'The Problem',
    points: [
      'AI tools are fragmented across websites, apps, models, and APIs',
      'Hard to find the right tool for the task',
      'Inconsistent UX, pricing, and trust signals',
      'Context switching and learning curves slow adoption',
    ],
  },
  {
    title: 'Our Solution',
    subtitle: 'One app to discover, compare, and use the best AI for any job',
    points: [
      'Aggregates trusted AI tools and models',
      'Auto-sorted by categories, tasks, and user intent',
      'Unified search with fast best-match suggestions',
      'Consistent UX and billing across providers',
    ],
  },
  {
    title: 'What It Does',
    points: [
      'Catalog: curated directory by category (writing, coding, design, research, etc.)',
      'Meta-search: cross-search across providers with side-by-side results',
      'One-tap launch: consistent command bar for any tool',
      'Smart routing: picks best tool/model for your request',
      'Unified history: prompts, outputs, and sources in one timeline',
    ],
  },
  {
    title: 'Categories & Use Cases',
    points: [
      'Create: copywriting, ads, social posts, pitch decks',
      'Code: debug, refactor, tests, explain code',
      'Design: logos, mockups, edits, illustrations, 3D',
      'Learn: tutoring, test prep, languages',
      'Research: review, summarization, citations',
      'Workflows: notes, email replies, spreadsheets',
      'Media: voice, music, video generation',
      'Assistants: travel, shopping, finance, legal basics',
    ],
  },
  {
    title: 'How It Works',
    points: [
      'Discovery: vetted database with quality scores',
      'Normalized APIs: adapters to a common interface',
      'Orchestrator: routes by quality/cost/latency',
      'Safety layer: redaction, policy checks, guardrails',
      'Caching: speed and cost optimization',
    ],
  },
  {
    title: 'UX Highlights',
    points: [
      'One search bar + categories + quick actions',
      'Intent chips: Summarize, Translate, Generate Image, Debug, etc.',
      'Compare view: results from 2–3 tools side by side',
      'Spaces: shareable project collections',
      'Keyboard-first: global shortcuts; accessible design',
    ],
  },
  {
    title: 'Trust, Safety, and Privacy',
    points: [
      'Local redaction before requests leave device',
      'Clear provenance: which tool, when, model version',
      'Opt-in data sharing; zero-knowledge vault',
      'Ratings and benchmarks for transparency',
      'Compliance options for education and enterprise',
    ],
  },
  {
    title: 'Differentiation',
    points: [
      'Not another model—an operating layer over many',
      'Neutral, quality-first routing (no lock-in)',
      'Consistent UX and billing across tools',
      'Real-time benchmarks and explainable selection',
    ],
  },
  {
    title: 'Business Model',
    points: [
      'Freemium with limited runs and providers',
      'Plus ($7.99/mo): unlimited categories, compare, Spaces',
      'Pro ($19.99/mo): teams, compliance, custom routing, SSO',
      'Rev-share marketplace with premium providers',
      'Partner API for browsers and productivity suites',
    ],
  },
  {
    title: 'Go-to-Market',
    points: [
      'Focus: students and knowledge workers',
      'Browser extension + web app for fast adoption',
      'Influencer tutorials: “Compare 3 AIs at once”',
      'Partnerships: LMS, note-taking, cloud drives',
      'Community curation: leaderboards and templates',
    ],
  },
  {
    title: 'Roadmap & Call to Action',
    points: [
      'Q1: catalog, unified search, compare view, redaction',
      'Q2: smart routing v1, templates, extension, mobile beta',
      'Q3: team workspaces, enterprise controls, marketplace',
      'Join waitlist, become a curator, or apply as a provider',
    ],
  },
]

function App() {
  const [current, setCurrent] = useState(0)
  const total = slides.length

  const go = (dir) => {
    setCurrent((c) => {
      const n = c + dir
      if (n < 0) return 0
      if (n >= total) return total - 1
      return n
    })
  }

  const jump = (n) => setCurrent(Math.max(0, Math.min(total - 1, n)))

  const progress = useMemo(() => ((current + 1) / total) * 100, [current, total])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
      if (e.key.toLowerCase() === 'h') jump(0)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const transition = { type: 'spring', damping: 24, stiffness: 260 }

  return (
    <div className="min-h-screen bg-slate-950 text-blue-50 relative overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-gradient-to-br from-fuchsia-500/20 to-pink-400/20 blur-3xl"
          animate={{ x: [0, 20, -10, 0], y: [0, -10, 10, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-400/20 blur-3xl"
          animate={{ x: [0, -10, 20, 0], y: [0, 15, -10, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.06),transparent_60%)]" />
      </motion.div>

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-4 md:px-8 py-4 border-b border-white/5 bg-slate-900/40 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/20" />
          <span className="text-sm md:text-base text-blue-200/90">AIOne Presentation</span>
        </div>
        <div className="flex items-center gap-2 text-xs md:text-sm">
          <button onClick={() => jump(0)} className="px-3 py-1 rounded bg-white/5 hover:bg-white/10">Home</button>
          <a href="/test" className="px-3 py-1 rounded bg-white/5 hover:bg-white/10">System Test</a>
        </div>
      </div>

      {/* Slide container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-12 min-h-[calc(100vh-120px)]">
        <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 md:p-10 shadow-2xl shadow-blue-900/20 min-h-[60vh] flex overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 30, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -30, scale: 0.98 }}
              transition={transition}
              className="flex-1"
            >
              <Slide
                {...slides[current]}
                index={current}
                total={total}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.button whileTap={{ scale: 0.96 }} onClick={() => go(-1)} className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10">Prev</motion.button>
            <motion.button whileTap={{ scale: 0.96 }} onClick={() => go(1)} className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10">Next</motion.button>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-blue-300/80">{current + 1} / {total}</span>
            <div className="w-48 md:w-72 h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 via-fuchsia-500 to-cyan-400"
                style={{ width: `${progress}%` }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={transition}
              />
            </div>
          </div>
        </div>

        {/* Keyboard hints */}
        <div className="mt-4 text-center text-xs text-blue-300/60">
          Tip: Arrow keys to navigate • H to return Home
        </div>
      </div>
    </div>
  )
}

export default App
