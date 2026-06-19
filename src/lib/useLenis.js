import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

// Buttery momentum scroll. framer-motion's useScroll reads the native scroll
// that Lenis drives, so all scroll-linked parallax stays in sync.
export function useLenis() {
  const ref = useRef(null)
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion:reduce)').matches) return
    const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 1, smoothWheel: true })
    ref.current = lenis
    if (typeof window !== 'undefined') window.__lenis = lenis
    let raf
    const loop = (t) => { lenis.raf(t); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); lenis.destroy(); ref.current = null }
  }, [])
  return ref
}
