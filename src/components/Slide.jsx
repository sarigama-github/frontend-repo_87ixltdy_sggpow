import React, { useMemo } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

function Slide({ title, subtitle, points = [], kicker, footer, children, index = 0, total = 1, imageUrl, photos = [] }) {
  const palettes = [
    { from: 'from-blue-500', to: 'to-cyan-400', soft: 'bg-blue-500/10', glow: 'shadow-blue-500/30' },
    { from: 'from-fuchsia-500', to: 'to-pink-400', soft: 'bg-fuchsia-500/10', glow: 'shadow-fuchsia-500/30' },
    { from: 'from-emerald-500', to: 'to-teal-400', soft: 'bg-emerald-500/10', glow: 'shadow-emerald-500/30' },
    { from: 'from-amber-500', to: 'to-orange-400', soft: 'bg-amber-500/10', glow: 'shadow-amber-500/30' },
    { from: 'from-violet-500', to: 'to-indigo-400', soft: 'bg-violet-500/10', glow: 'shadow-violet-500/30' },
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

  // Mouse parallax
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useTransform(my, [-0.5, 0.5], [6, -6])
  const rotateY = useTransform(mx, [-0.5, 0.5], [-6, 6])
  const glowX = useTransform(mx, [-0.5, 0.5], ['10%', '90%'])
  const glowY = useTransform(my, [-0.5, 0.5], ['10%', '90%'])

  const onMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mx.set(x)
    my.set(y)
  }

  const collage = useMemo(() => photos.slice(0, 3), [photos])

  return (
    <motion.section
      onMouseMove={onMouseMove}
      style={{ perspective: 1200 }}
      className="w-full h-full flex flex-col justify-between relative overflow-hidden group"
    >
      {/* Cinematic background */}
      {imageUrl && (
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.05, x: 0, y: 0, opacity: 0 }}
            animate={{ scale: 1.18, x: -12, y: -8, opacity: 0.65 }}
            transition={{ duration: 18, ease: 'easeInOut' }}
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'saturate(1.15) contrast(1.08) brightness(0.9)'
            }}
          />
          {/* Color wash */}
          <div className={`absolute inset-0 bg-gradient-to-b ${theme.from} ${theme.to} opacity-25 mix-blend-screen`} />
          {/* Vignette */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'radial-gradient(circle at center, rgba(0,0,0,0) 40%, rgba(2,6,23,0.6) 85%)'
          }} />
          {/* Lens flare sweep */}
          <motion.div
            className="absolute -top-24 -left-48 h-80 w-[140%] rotate-12"
            initial={{ opacity: 0.0 }}
            animate={{ opacity: [0.04, 0.12, 0.04] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0) 100%)',
              filter: 'blur(14px)'
            }}
          />
          {/* Film grain */}
          <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay" style={{
            backgroundImage: 'url(https://grainy-gradients.vercel.app/noise.svg)'
          }} />
        </div>
      )}

      {/* Floating particles */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 16 }).map((_, i) => (
          <motion.span
            key={i}
            className={`absolute h-1 w-1 rounded-full ${theme.soft}`}
            initial={{ x: Math.random() * 800, y: Math.random() * 420, opacity: 0 }}
            animate={{
              x: [null, (Math.random() * 800)],
              y: [null, (Math.random() * 420)],
              opacity: [0, 0.8, 0]
            }}
            transition={{ duration: 10 + Math.random() * 12, repeat: Infinity, ease: 'easeInOut', delay: Math.random() * 3 }}
            style={{ filter: 'blur(0.5px)' }}
          />
        ))}
      </div>

      {/* decorative backdrop */}
      <div className="pointer-events-none absolute inset-0">
        <div className={`absolute -top-24 -left-24 h-56 w-56 rounded-full ${theme.soft} blur-3xl`} />
        <div className={`absolute -bottom-24 -right-24 h-64 w-64 rounded-full ${theme.soft} blur-3xl`} />
        <div className="absolute inset-x-0 top-1/3 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <motion.div style={{ rotateX, rotateY }} className="relative flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="min-w-0">
          <header className="mb-6 relative">
            {kicker && (
              <span className={`inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/80 bg-white/5 border border-white/10 px-2 py-1 rounded-full`}> 
                <span className={`h-1.5 w-1.5 rounded-full bg-gradient-to-br ${theme.from} ${theme.to}`} />
                {kicker}
              </span>
            )}
            <h2 className={`mt-3 text-3xl md:text-5xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-br ${theme.from} ${theme.to} drop-shadow-[0_0_20px_rgba(59,130,246,0.25)]`}>
              {title}
            </h2>
            {subtitle && <p className="text-blue-100/90 mt-3 text-lg md:text-xl">{subtitle}</p>}
            {/* Animated underline */}
            <motion.div
              className={`h-[2px] mt-3 w-24 bg-gradient-to-r ${theme.from} ${theme.to} rounded-full`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              style={{ transformOrigin: 'left' }}
            />
          </header>

          {children ? (
            <div className="relative">{children}</div>
          ) : (
            <motion.ul
              variants={listVariants}
              initial="hidden"
              animate="show"
              className="grid gap-3 md:gap-4 text-blue-50/90 text-base md:text-lg relative"
            >
              {points.map((p, i) => {
                const item = typeof p === 'string' ? { text: p } : p
                return (
                  <motion.li key={i} variants={itemVariants} className="flex items-start gap-3">
                    {item.imageUrl && (
                      <motion.img
                        src={item.imageUrl}
                        alt=""
                        className={`h-12 w-16 md:h-14 md:w-20 object-cover rounded-md border border-white/10 shadow-xl ${theme.glow}`}
                        whileHover={{ scale: 1.04 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      />
                    )}
                    <span className="marker:text-white/60 leading-relaxed">{item.text}</span>
                  </motion.li>
                )
              })}
            </motion.ul>
          )}

          <footer className="mt-8 flex items-center justify-between text-blue-200/80 text-sm relative">
            <span>Slide {index + 1} of {total}</span>
            {footer && <span className="bg-white/5 px-2 py-1 rounded-md border border-white/10">{footer}</span>}
          </footer>
        </div>

        {/* Right-side photo collage ("actual photos right to the text") */}
        {collage.length > 0 && (
          <div className="relative hidden lg:flex items-center justify-center">
            <div className="relative w-full max-w-sm">
              {collage.map((src, i) => (
                <motion.img
                  key={i}
                  src={src}
                  alt=""
                  className={`absolute rounded-xl shadow-2xl border border-white/10 object-cover ${theme.glow}`}
                  style={{
                    height: i === 1 ? 220 : 160,
                    width: i === 1 ? '88%' : '64%',
                    top: i === 0 ? 0 : i === 1 ? 80 : 210,
                    left: i === 0 ? '12%' : i === 1 ? '6%' : '42%',
                    filter: 'saturate(1.1) contrast(1.05)'
                  }}
                  initial={{ opacity: 0, y: 12, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 24, delay: 0.08 * i }}
                  whileHover={{ scale: 1.03 }}
                />
              ))}
              {/* Cursor-follow glow */}
              <motion.div
                className={`pointer-events-none absolute -inset-6 rounded-3xl bg-gradient-to-br ${theme.from} ${theme.to} opacity-20 blur-2xl`}
                style={{ maskImage: `radial-gradient(220px 220px at ${glowX} ${glowY}, black, transparent)` }}
              />
            </div>
          </div>
        )}
      </motion.div>
    </motion.section>
  )
}

export default Slide
