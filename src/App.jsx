import React, { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Slide from './components/Slide'

const slides = [
  {
    kicker: 'AIOne',
    title: 'The Universal AI Hub',
    subtitle: 'All AI tools in one place, neatly organized, instantly usable',
    footer: 'aio.one • @AIOne',
    imageUrl: 'https://images.unsplash.com/photo-1558981285-6f0c94958bb6?q=80&w=1600&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1534759846116-57968a6b2502?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=800&auto=format&fit=crop'
    ],
    points: [
      { text: 'Instantly search, compare, and launch the best AI for any task', imageUrl: 'https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?q=80&w=400&auto=format&fit=crop' },
      { text: 'Unified look, billing, and history across providers', imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=400&auto=format&fit=crop' },
      { text: 'Keyboard-first with powerful shortcuts and templates' }
    ]
  },
  {
    title: 'The Problem',
    imageUrl: 'https://images.unsplash.com/photo-1534759846116-57968a6b2502?q=80&w=1600&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1526378716734-2ad948a999f8?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551281043-8adf6f7f5315?q=80&w=800&auto=format&fit=crop'
    ],
    points: [
      { text: 'Fragmented tools, models, and experiences', imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=400&auto=format&fit=crop' },
      { text: 'Hard to find the right AI for the job', imageUrl: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=400&auto=format&fit=crop' },
      { text: 'Inconsistent UX, pricing, and trust signals' }
    ]
  },
  {
    title: 'Our Solution',
    subtitle: 'One app to discover, compare, and use the best AI for any job',
    imageUrl: 'https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?q=80&w=1600&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1558944351-c37d7abcfb49?q=80&w=800&auto=format&fit=crop'
    ],
    points: [
      { text: 'Aggregates trusted AI tools and models', imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=400&auto=format&fit=crop' },
      { text: 'Unified search with best-match suggestions', imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop' },
      { text: 'Consistent UX and billing across providers' }
    ]
  },
  {
    title: 'What It Does',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1600&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?q=80&w=800&auto=format&fit=crop'
    ],
    points: [
      { text: 'Curated catalog by category', imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=400&auto=format&fit=crop' },
      { text: 'Meta-search with side-by-side results', imageUrl: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=400&auto=format&fit=crop' },
      { text: 'One-tap launch and smart routing' }
    ]
  },
  {
    title: 'UX Highlights',
    imageUrl: 'https://images.unsplash.com/photo-1526378716734-2ad948a999f8?q=80&w=1600&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1558944351-c37d7abcfb49?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?q=80&w=800&auto=format&fit=crop'
    ],
    points: [
      { text: 'One search bar + quick actions', imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=400&auto=format&fit=crop' },
      { text: 'Compare 2–3 providers at once', imageUrl: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=400&auto=format&fit=crop' },
      { text: 'Spaces for shareable projects' }
    ]
  },
  {
    title: 'Trust, Safety, and Privacy',
    imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1600&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=800&auto=format&fit=crop'
    ],
    points: [
      { text: 'Local redaction before requests leave device', imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop' },
      { text: 'Clear provenance and benchmarks', imageUrl: 'https://images.unsplash.com/photo-1526378716734-2ad948a999f8?q=80&w=400&auto=format&fit=crop' },
      { text: 'Opt-in sharing; zero-knowledge vault' }
    ]
  },
  {
    title: 'Differentiation',
    imageUrl: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1526378716734-2ad948a999f8?q=80&w=800&auto=format&fit=crop'
    ],
    points: [
      { text: 'An operating layer over many models', imageUrl: 'https://images.unsplash.com/photo-1551281043-8adf6f7f5315?q=80&w=400&auto=format&fit=crop' },
      { text: 'Neutral, quality-first routing', imageUrl: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=400&auto=format&fit=crop' },
      { text: 'Consistent UX and billing' }
    ]
  },
  {
    title: 'Business Model',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1551281043-8adf6f7f5315?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1526378716734-2ad948a999f8?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop'
    ],
    points: [
      { text: 'Freemium and Plus/Pro tiers', imageUrl: 'https://images.unsplash.com/photo-1468528883336-6dfcce6330c2?q=80&w=400&auto=format&fit=crop' },
      { text: 'Rev-share marketplace', imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop' },
      { text: 'Partner API for productivity tools' }
    ]
  },
  {
    title: 'Go-to-Market',
    imageUrl: 'https://images.unsplash.com/photo-1468528883336-6dfcce6330c2?q=80&w=1600&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1468528883336-6dfcce6330c2?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?q=80&w=800&auto=format&fit=crop'
    ],
    points: [
      { text: 'Focus on students and knowledge workers', imageUrl: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=400&auto=format&fit=crop' },
      { text: 'Browser extension + web app', imageUrl: 'https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?q=80&w=400&auto=format&fit=crop' },
      { text: 'Influencer-led tutorials and partnerships' }
    ]
  },
  {
    title: 'Roadmap & Call to Action',
    imageUrl: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1600&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1558944351-c37d7abcfb49?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1468528883336-6dfcce6330c2?q=80&w=800&auto=format&fit=crop'
    ],
    points: [
      { text: 'Q1–Q3 feature milestones', imageUrl: 'https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=400&auto=format&fit=crop' },
      { text: 'Join waitlist or apply as a provider', imageUrl: 'https://images.unsplash.com/photo-1558944351-c37d7abcfb49?q=80&w=400&auto=format&fit=crop' },
      { text: 'Be a curator and shape the catalog' }
    ]
  }
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
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12 min-h-[calc(100vh-120px)]">
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
