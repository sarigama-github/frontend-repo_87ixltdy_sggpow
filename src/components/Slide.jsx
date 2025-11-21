import React from 'react'

function Slide({ title, subtitle, points = [], kicker, footer, children, index, total }) {
  return (
    <section className="w-full h-full flex flex-col justify-between">
      <header className="mb-6">
        {kicker && (
          <div className="text-xs uppercase tracking-widest text-blue-300/80 mb-2">{kicker}</div>
        )}
        <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">{title}</h2>
        {subtitle && <p className="text-blue-200/90 mt-3 text-lg md:text-xl">{subtitle}</p>}
      </header>

      {children ? (
        <div className="flex-1">{children}</div>
      ) : (
        <ul className="grid gap-3 md:gap-4 list-disc pl-5 text-blue-100/90 text-base md:text-lg">
          {points.map((p, i) => (
            <li key={i} className="marker:text-blue-400/80">{p}</li>
          ))}
        </ul>
      )}

      <footer className="mt-8 flex items-center justify-between text-blue-300/70 text-sm">
        <span>Slide {index + 1} of {total}</span>
        {footer && <span>{footer}</span>}
      </footer>
    </section>
  )
}

export default Slide
