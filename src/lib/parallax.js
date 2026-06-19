import { useEffect, useRef, useState } from 'react'

// Normalized pointer position (-1..1) on rAF, for decorative parallax/tilt.
// Disabled under reduced-motion / coarse pointer (returns 0,0).
export function usePointer() {
  const [p, setP] = useState({ x: 0, y: 0 })
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) return
    if (window.matchMedia('(pointer:coarse)').matches) return
    let tx = 0, ty = 0, raf
    const onMove = (e) => {
      tx = (e.clientX / innerWidth - 0.5) * 2
      ty = (e.clientY / innerHeight - 0.5) * 2
    }
    const loop = () => {
      setP((c) => {
        const nx = c.x + (tx - c.x) * 0.08
        const ny = c.y + (ty - c.y) * 0.08
        return Math.abs(nx - c.x) < 0.001 && Math.abs(ny - c.y) < 0.001 ? c : { x: nx, y: ny }
      })
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('pointermove', onMove)
    loop()
    return () => { window.removeEventListener('pointermove', onMove); cancelAnimationFrame(raf) }
  }, [])
  return p
}

// Per-element tilt on hover. Returns handlers + a ref'd style object.
export function useTilt(max = 6) {
  const ref = useRef(null)
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion:reduce)').matches
  const onMove = (e) => {
    if (reduced || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    ref.current.style.setProperty('--rx', `${(-py * max).toFixed(2)}deg`)
    ref.current.style.setProperty('--ry', `${(px * max).toFixed(2)}deg`)
  }
  const onLeave = () => {
    if (!ref.current) return
    ref.current.style.setProperty('--rx', '0deg')
    ref.current.style.setProperty('--ry', '0deg')
  }
  return { ref, onMove, onLeave }
}
