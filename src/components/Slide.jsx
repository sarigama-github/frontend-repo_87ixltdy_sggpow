import React from 'react'
import { motion } from 'framer-motion'

function Slide({ title, subtitle, points = [], kicker, footer, children, index = 0, total = 1, imageUrl }) {
  const palettes = [
    { from: 'from-blue-500', to: 'to-cyan-400', soft: 'bg-blue-500/10' },
    { from: 'from-fuchsia-500', to: 'to-pink-400', soft: 'bg-fuchsia-500/10' },
    { from: 'from-emerald-500', to: 'to-teal-400', soft: 'bg-emerald-500/10' },
    { from: 'from-amber-500', to: 'to-orange-400', soft: 'bg-amber-500/10' },
    { from: 'from-violet-500', to: 'to-indigo-400', soft: 'bg-violet-500/10' },
  ]
  const theme = palettes[index % palettes.length]

  const listVariants = {
    hidden: { opacity: 0, y: 8 },
    show: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.06, delayChildren: 0.1 }
    }
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 10, filter: 'blur(2px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: 'spring', stiffness: 400, damping: 28 } }
  }

  return (
    <section className="w-full h-full flex flex-col justify-between relative overflow-hidden">
      {/* Cinematic background (optional) */}
      {imageUrl && (
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.05, x: 0, y: 0, opacity: 0 }}
            animate={{ scale: 1.15, x: -10, y: -6, opacity: 0.6 }}
            transition={{ duration: 18, ease: 'easeInOut' }}
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'saturate(1.1) contrast(1.05) brightness(0.9)'
            }}
          />
          {/* Color wash */}
          <div className={`absolute inset-0 bg-gradient-to-b ${theme.from} ${theme.to} opacity-20 mix-blend-screen`} />
          {/* Vignette */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'radial-gradient(circle at center, rgba(0,0,0,0) 40%, rgba(2,6,23,0.55) 85%)'
          }} />
          {/* Light streak / lens flare */}
          <motion.div
            className="absolute -top-20 -left-32 h-72 w-[120%] rotate-12"
            initial={{ opacity: 0.0 }}
            animate={{ opacity: [0.05, 0.12, 0.05] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0) 100%)',
              filter: 'blur(12px)'
            }}
          />
        </div>
      )}

      {/* decorative backdrop */}
      <div className="pointer-events-none absolute inset-0">
        <div className={`absolute -top-24 -left-24 h-56 w-56 rounded-full ${theme.soft} blur-3xl`} />
        <div className={`absolute -bottom-24 -right-24 h-64 w-64 rounded-full ${theme.soft} blur-3xl`} />
        <div className="absolute inset-x-0 top-1/3 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <header className="mb-6 relative">
        {kicker && (
          <span className={`inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/80 bg-white/5 border border-white/10 px-2 py-1 rounded-full`}> 
            <span className={`h-1.5 w-1.5 rounded-full bg-gradient-to-br ${theme.from} ${theme.to}`} />
            {kicker}
          </span>
        )}
        <h2 className={`mt-3 text-3xl md:text-5xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-br ${theme.from} ${theme.to}`}>
          {title}
        </h2>
        {subtitle && <p className="text-blue-100/90 mt-3 text-lg md:text-xl">{subtitle}</p>}
      </header>

      {children ? (
        <div className="flex-1 relative">{children}</div>
      ) : (
        <motion.ul
          variants={listVariants}
          initial="hidden"
          animate="show"
          className="grid gap-3 md:gap-4 list-disc pl-5 text-blue-50/90 text-base md:text-lg relative"
        >
          {points.map((p, i) => (
            <motion.li key={i} variants={itemVariants} className="marker:text-white/60">
              {p}
            </motion.li>
          ))}
        </motion.ul>
      )}

      <footer className="mt-8 flex items-center justify-between text-blue-200/80 text-sm relative">
        <span>Slide {index + 1} of {total}</span>
        {footer && <span className="bg-white/5 px-2 py-1 rounded-md border border-white/10">{footer}</span>}
      </footer>
    </section>
  )
}

export default Slide
