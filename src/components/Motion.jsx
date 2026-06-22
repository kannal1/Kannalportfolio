import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion'
import { EO, SPRING_DRIFT, SPRING_GLIDE } from '../lib/motion'

// Scroll-linked parallax for content blocks.
export function Parallax({ children, distance = 120, className, style }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const yRaw = useTransform(scrollYProgress, [0, 1], [distance, -distance])
  const y = useSpring(yRaw, SPRING_GLIDE)
  return (
    <div ref={ref} className={className} style={style}>
      <motion.div style={{ y: reduce ? 0 : y }}>{children}</motion.div>
    </div>
  )
}

// Magnetic pull toward the pointer (lerp ~0.3). Spread {ref,onMouseMove,onMouseLeave}
// onto a motion element and bind style={{x,y}}. No-op on coarse pointers.
export function useMagnetic(strength = 0.3) {
  const ref = useRef(null)
  const x = useSpring(0, { stiffness: 150, damping: 15, mass: 0.4 })
  const y = useSpring(0, { stiffness: 150, damping: 15, mass: 0.4 })
  const coarse = typeof window !== 'undefined' && window.matchMedia('(pointer:coarse)').matches
  const onMouseMove = (e) => {
    if (coarse || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const onMouseLeave = () => { x.set(0); y.set(0) }
  return { ref, x, y, onMouseMove, onMouseLeave }
}

// Word-by-word mask reveal with a focus-pull (blur 6px -> 0). Big headline workhorse.
export function RevealText({ text, className, as = 'div', delay = 0, stagger = 0.045 }) {
  const reduce = useReducedMotion()
  const Tag = motion[as] || motion.div
  const words = text.split(' ')
  const hidden = reduce ? { opacity: 0 } : { y: '110%', opacity: 0, filter: 'blur(6px)' }
  const visible = { y: '0%', opacity: 1, filter: 'blur(0px)', transition: { duration: reduce ? 0.3 : 0.8, ease: EO } }
  return (
    <Tag className={className}
      initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }}
      variants={{ visible: { transition: { staggerChildren: reduce ? 0 : stagger, delayChildren: delay } } }}>
      {words.map((w, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }}>
          <motion.span style={{ display: 'inline-block' }} variants={{ hidden, visible }}>
            {w}{i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

// Fade, rise, and focus-pull on view.
export function Reveal({ children, className, y = 40, delay = 0, once = true }) {
  const reduce = useReducedMotion()
  return (
    <motion.div className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once, amount: 0.3 }} transition={{ duration: reduce ? 0.3 : 0.7, ease: EO, delay }}>
      {children}
    </motion.div>
  )
}

// Big uniform image frame: oversized image with EXTREME internal parallax,
// plus a focus-pull entrance. Frame size is fixed (even across all pages).
export function ParallaxImage({ src, caption, wide, portrait }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const yRaw = useTransform(scrollYProgress, [0, 1], portrait ? ['-8%', '8%'] : ['-17%', '17%'])
  const y = useSpring(yRaw, SPRING_DRIFT)
  return (
    <motion.div className={`cs-shot${wide ? ' span2' : ''}${portrait ? ' portrait' : ''}`} ref={ref} data-cursor="VIEW"
      initial={reduce ? { opacity: 0 } : { opacity: 0, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.2 }} transition={{ duration: reduce ? 0.3 : 0.9, ease: EO }}>
      <motion.img src={src} alt={caption} loading="lazy" draggable="false" style={{ y: reduce ? 0 : y }} />
      {caption && <span className="cs-shot-cap">{caption}</span>}
    </motion.div>
  )
}
