import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion'

const EO = [0.16, 1, 0.3, 1]

// Scroll-linked parallax. `distance` px traveled across the element's pass
// through the viewport; negative speeds move against the scroll.
export function Parallax({ children, distance = 120, className, style }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const yRaw = useTransform(scrollYProgress, [0, 1], [distance, -distance])
  const y = useSpring(yRaw, { stiffness: 120, damping: 30, mass: 0.4 })
  return (
    <div ref={ref} className={className} style={style}>
      <motion.div style={{ y: reduce ? 0 : y }}>{children}</motion.div>
    </div>
  )
}

// Word-by-word mask reveal, triggered in view. Big headline workhorse.
export function RevealText({ text, className, as = 'div', delay = 0, stagger = 0.045 }) {
  const Tag = motion[as] || motion.div
  const words = text.split(' ')
  return (
    <Tag className={className}
      initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }}
      variants={{ visible: { transition: { staggerChildren: stagger, delayChildren: delay } } }}>
      {words.map((w, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }}>
          <motion.span style={{ display: 'inline-block' }}
            variants={{ hidden: { y: '110%' }, visible: { y: '0%', transition: { duration: 0.8, ease: EO } } }}>
            {w}{i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

// Simple fade-and-rise on view.
export function Reveal({ children, className, y = 40, delay = 0, once = true }) {
  return (
    <motion.div className={className}
      initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.3 }} transition={{ duration: 0.7, ease: EO, delay }}>
      {children}
    </motion.div>
  )
}
