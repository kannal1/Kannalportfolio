import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion, useMotionValueEvent } from 'framer-motion'
import { EO } from '../lib/motion'

/* ──────────────────────────────────────────────────────────────────────────
   The State Machine. A phone pins to the viewport and scrubs through its own
   real states as you scroll. Built to make the "design the states people skip"
   thesis something the reader feels, not just reads.
   Crossfades opacity only. Collapses to a static stack under reduced motion.
   ────────────────────────────────────────────────────────────────────────── */

function StateLayer({ p, i, n, s }) {
  const a = i / n, b = (i + 1) / n, f = (1 / n) * 0.4
  // first state is solid from the top; last stays solid to the end.
  const points = [i === 0 ? -1 : a - f, i === 0 ? 0 : a + f, i === n - 1 ? 1 : b - f, i === n - 1 ? 2 : b + f]
  const vals = [i === 0 ? 1 : 0, 1, 1, i === n - 1 ? 1 : 0]
  const opacity = useTransform(p, points, vals)
  return <motion.img className="sm-screen" src={s.src} alt={s.label} style={{ opacity }} draggable="false" />
}

function Fallback({ states }) {
  return (
    <div className="sm-stack">
      {states.map((s, i) => (
        <div className="sm-stack-row" key={i}>
          <div className="sm-device static"><img src={s.src} alt={s.label} draggable="false" /></div>
          <div className="sm-stack-body">
            <div className="sm-tick on"><span>{String(i + 1).padStart(2, '0')}</span>{s.label}</div>
            <p className="sm-note">{s.note}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function StateMachine({ states, title = 'Every state' }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const n = states.length
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const [active, setActive] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(Math.max(0, Math.min(n - 1, Math.floor(v * n + 0.0001))))
  })

  if (reduce) return <Fallback states={states} />

  return (
    <section className="sm" ref={ref} style={{ height: `${n * 90 + 20}vh` }}>
      <div className="sm-sticky">
        <div className="sm-inner">
          <div className="sm-device">
            {states.map((s, i) => <StateLayer key={i} p={scrollYProgress} i={i} n={n} s={s} />)}
          </div>
          <div className="sm-side">
            <div className="sm-k">{title}</div>
            <div className="sm-ticks">
              {states.map((s, i) => (
                <div className={`sm-tick${i === active ? ' on' : ''}`} key={i}>
                  <span>{String(i + 1).padStart(2, '0')}</span>{s.label}
                </div>
              ))}
            </div>
            <div className="sm-notes">
              {states.map((s, i) => (
                <motion.p className="sm-note" key={i}
                  animate={{ opacity: i === active ? 1 : 0, y: i === active ? 0 : 10 }}
                  transition={{ duration: 0.45, ease: EO }} aria-hidden={i !== active}>
                  {s.note}
                </motion.p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
