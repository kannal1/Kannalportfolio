import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { EO } from '../lib/motion'

// A performed entrance: hold until fonts are ready, run a mono 0->100 count,
// then lift the curtain and signal the hero to assemble. Lenis starts on done.
// Resolves instantly under reduced motion.
export default function LoadGate({ onDone }) {
  const [count, setCount] = useState(0)
  const [lifting, setLifting] = useState(false)
  const done = useRef(false)

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion:reduce)').matches) { onDone(); return }

    const MIN = 1100
    const t0 = performance.now()
    let raf
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / MIN)
      setCount(Math.round(p * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const fonts = document.fonts ? document.fonts.ready : Promise.resolve()
    const wait = new Promise((r) => setTimeout(r, MIN))
    Promise.all([fonts, wait]).then(() => {
      if (done.current) return
      done.current = true
      setCount(100)
      setLifting(true)
      setTimeout(onDone, 760)
    })
    return () => cancelAnimationFrame(raf)
  }, [onDone])

  return (
    <motion.div className="loader" aria-hidden="true"
      initial={{ y: 0 }} animate={{ y: lifting ? '-100%' : 0 }}
      transition={{ duration: 0.8, ease: EO }}>
      <div className="loader-top">
        <span>Kannal Umayan</span>
        <span>Product Designer</span>
      </div>
      <div className="loader-big">{String(count).padStart(3, '0')}<i>.</i></div>
      <div className="loader-bar"><motion.i style={{ scaleX: count / 100 }} /></div>
    </motion.div>
  )
}
