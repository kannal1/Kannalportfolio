import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionTemplate, useReducedMotion } from 'framer-motion'
import { SPRING_GLIDE } from '../lib/motion'

// The one live render: as it passes through the viewport, the wireframe wipes
// away to reveal the shipped UI. Real product transformation, not a flat PNG.
export default function BeforeAfter({ before, after }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const p = useSpring(useTransform(scrollYProgress, [0, 1], [3, 97]), SPRING_GLIDE)
  const clip = useMotionTemplate`inset(0 ${p}% 0 0)`
  const left = useTransform(p, (v) => `${100 - v}%`)
  return (
    <section className="ba-wrap">
      <div className="ba-head">
        <span className="ba-k">Live render</span>
        <h3>Wireframe to shipped</h3>
      </div>
      <div className="ba" ref={ref} data-cursor="SCROLL">
        <img className="ba-after" src={after} alt="Shipped UI" draggable="false" />
        <motion.img className="ba-before" src={before} alt="Wireframe"
          style={reduce ? { clipPath: 'inset(0 50% 0 0)' } : { clipPath: clip }} draggable="false" />
        <motion.div className="ba-line" style={reduce ? { left: '50%' } : { left }} />
        <span className="ba-tag tl">Wireframe</span>
        <span className="ba-tag tr">Shipped</span>
      </div>
    </section>
  )
}
