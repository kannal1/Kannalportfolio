import { useRef, useEffect, useState } from 'react'
import {
  motion, useScroll, useTransform, useSpring, useReducedMotion,
  useInView, useMotionValue, animate, useMotionValueEvent,
} from 'framer-motion'
import { EO, SPRING_DRIFT, SPRING_GLIDE } from '../lib/motion'

/* ──────────────────────────────────────────────────────────────────────────
   Motion language for the ultra-luxury build.
   Everything degrades to static / instant under prefers-reduced-motion.
   ────────────────────────────────────────────────────────────────────────── */

// Word-by-word mask reveal with a focus-pull (blur 8 -> 0). The headline workhorse.
export function RevealText({ text, className, as = 'div', delay = 0, stagger = 0.05, once = true, amount = 0.5 }) {
  const reduce = useReducedMotion()
  const Tag = motion[as] || motion.div
  const words = String(text).split(' ')
  const hidden = reduce ? { opacity: 0 } : { y: '120%', opacity: 0, filter: 'blur(8px)' }
  const visible = { y: '0%', opacity: 1, filter: 'blur(0px)', transition: { duration: reduce ? 0.3 : 0.95, ease: EO } }
  return (
    <Tag className={className}
      initial="hidden" whileInView="visible" viewport={{ once, amount }}
      variants={{ visible: { transition: { staggerChildren: reduce ? 0 : stagger, delayChildren: delay } } }}>
      {words.map((w, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top', paddingBottom: '0.08em' }}>
          <motion.span style={{ display: 'inline-block', willChange: 'transform' }} variants={{ hidden, visible }}>
            {w}{i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

// Character-stagger mask reveal. Reserved for the single biggest moment (hero name).
export function RevealChars({ text, className, as = 'div', delay = 0, stagger = 0.035 }) {
  const reduce = useReducedMotion()
  const Tag = motion[as] || motion.div
  const chars = [...String(text)]
  const hidden = reduce ? { opacity: 0 } : { y: '108%' }
  const visible = { y: '0%', opacity: 1, transition: { duration: reduce ? 0.3 : 1.05, ease: EO } }
  return (
    <Tag className={className} aria-label={text}
      initial="hidden" animate="visible"
      variants={{ visible: { transition: { staggerChildren: reduce ? 0 : stagger, delayChildren: delay } } }}>
      {chars.map((c, i) => (
        <span key={i} aria-hidden="true" style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top', paddingBottom: '0.1em' }}>
          <motion.span style={{ display: 'inline-block', willChange: 'transform' }} variants={{ hidden, visible }}>
            {c === ' ' ? ' ' : c}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

// Fade, rise, focus-pull on view. The general-purpose entrance.
export function Reveal({ children, className, y = 44, delay = 0, once = true, amount = 0.3, style }) {
  const reduce = useReducedMotion()
  return (
    <motion.div className={className} style={style}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y, filter: 'blur(7px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once, amount }} transition={{ duration: reduce ? 0.35 : 0.85, ease: EO, delay }}>
      {children}
    </motion.div>
  )
}

// Scroll-scrubbed word reveal: words brighten from faint to full as the block
// crosses the viewport. The luxe "statement" device.
export function ScrubWords({ text, className }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.35'] })
  const words = String(text).split(' ')
  if (reduce) return <p ref={ref} className={className}>{text}</p>
  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => {
        const a = i / words.length
        const b = (i + 1) / words.length
        return <ScrubWord key={i} p={scrollYProgress} a={a} b={b}>{w}</ScrubWord>
      })}
    </p>
  )
}
function ScrubWord({ p, a, b, children }) {
  // floor at 0.5 so un-scrolled words still meet WCAG AA contrast; brightens to full on scroll
  const opacity = useTransform(p, [a, b], [0.5, 1])
  return <motion.span aria-hidden="true" style={{ opacity, display: 'inline-block', marginRight: '0.26em' }}>{children}</motion.span>
}

// Oversized image frame with internal parallax drift + a slow zoom-out reveal.
// `depth` scales the drift; `zoom` adds an entrance scale settle.
export function ParallaxImage({ src, alt, className = '', depth = 14, zoom = true, eager = false, fit = 'cover' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const drift = depth > 0
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const yRaw = useTransform(scrollYProgress, [0, 1], [`-${depth}%`, `${depth}%`])
  const y = useSpring(yRaw, SPRING_DRIFT)
  // depth 0 = no overscan, no drift: the image fits its frame exactly (no crop).
  return (
    <div ref={ref} className={`px-frame ${className}`}>
      <motion.img
        src={src} alt={alt} draggable="false" loading={eager ? 'eager' : 'lazy'}
        style={{ y: (reduce || !drift) ? 0 : y, height: drift ? '120%' : '100%', objectFit: fit }}
        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: zoom ? 1.12 : 1, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: reduce ? 0.4 : 1.3, ease: EO }}
      />
    </div>
  )
}

// Magnetic pull toward the pointer. No-op on coarse pointers / reduced motion.
export function useMagnetic(strength = 0.3) {
  const ref = useRef(null)
  const x = useSpring(0, { stiffness: 150, damping: 15, mass: 0.45 })
  const y = useSpring(0, { stiffness: 150, damping: 15, mass: 0.45 })
  const off = typeof window !== 'undefined' &&
    (window.matchMedia('(pointer:coarse)').matches || window.matchMedia('(prefers-reduced-motion:reduce)').matches)
  const onMouseMove = (e) => {
    if (off || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const onMouseLeave = () => { x.set(0); y.set(0) }
  return { ref, x, y, onMouseMove, onMouseLeave }
}

// True count-up. Parses prefix / number / suffix from a display string
// ("$4M" -> $ 4 M, "2,000" -> 2000, "~70%" -> ~ 70 %). Animates on view.
function parseValue(raw) {
  const m = String(raw).match(/^([^\d.-]*)([\d.,]+)(.*)$/)
  if (!m) return { prefix: '', num: null, suffix: String(raw), decimals: 0, hasComma: false }
  const prefix = m[1] || ''
  const numStr = m[2]
  const suffix = m[3] || ''
  const hasComma = numStr.includes(',')
  const clean = numStr.replace(/,/g, '')
  const decimals = clean.includes('.') ? clean.split('.')[1].length : 0
  return { prefix, num: parseFloat(clean), suffix, decimals, hasComma }
}
export function CountUp({ value, className }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const { prefix, num, suffix, decimals, hasComma } = parseValue(value)
  const mv = useMotionValue(0)
  const [disp, setDisp] = useState(num === null ? value : `${prefix}0${suffix}`)

  useEffect(() => {
    if (num === null) { setDisp(value); return }
    if (reduce || !inView) {
      if (!inView && !reduce) return
      const fmt = (n) => (hasComma ? Math.round(n).toLocaleString('en-US') : n.toFixed(decimals))
      setDisp(`${prefix}${fmt(num)}${suffix}`)
      return
    }
    const controls = animate(mv, num, {
      duration: 1.6, ease: EO,
      onUpdate: (v) => {
        const fmt = hasComma ? Math.round(v).toLocaleString('en-US') : v.toFixed(decimals)
        setDisp(`${prefix}${fmt}${suffix}`)
      },
    })
    return controls.stop
  }, [inView, num, reduce]) // eslint-disable-line

  return <span ref={ref} className={`num ${className || ''}`}>{disp}</span>
}

// Sticky scroll-progress value for a target element (0..1), spring-smoothed.
export function useSectionProgress(offset = ['start end', 'end start']) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset })
  const smooth = useSpring(scrollYProgress, SPRING_GLIDE)
  return { ref, progress: smooth, raw: scrollYProgress }
}

export { useMotionValueEvent }
