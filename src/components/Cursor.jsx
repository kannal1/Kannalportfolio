import { useEffect, useRef } from 'react'

// Figma-style labeled cursor. Follows pointer on rAF; reads [data-cursor] for
// its label and interactive targets for hover. Hidden on touch via CSS.
export default function Cursor() {
  const ring = useRef(null)
  const dot = useRef(null)
  const label = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(pointer:coarse)').matches) return
    const r = ring.current, d = dot.current, l = label.current
    let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y, raf

    const loop = () => {
      rx += (x - rx) * 0.2; ry += (y - ry) * 0.2
      r.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`
      d.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%)`
      raf = requestAnimationFrame(loop)
    }
    loop()

    const move = (e) => {
      x = e.clientX; y = e.clientY
      const t = e.target.closest('[data-cursor]')
      const hot = e.target.closest('a,button,[data-cursor],.react-flow__node')
      if (t) { r.classList.add('label'); r.classList.remove('hover'); l.textContent = t.getAttribute('data-cursor') }
      else if (hot) { r.classList.add('hover'); r.classList.remove('label') }
      else { r.classList.remove('hover', 'label') }
    }
    const down = () => r.classList.add('down')
    const up = () => r.classList.remove('down')
    addEventListener('pointermove', move); addEventListener('pointerdown', down); addEventListener('pointerup', up)
    return () => {
      cancelAnimationFrame(raf)
      removeEventListener('pointermove', move); removeEventListener('pointerdown', down); removeEventListener('pointerup', up)
    }
  }, [])

  return (
    <>
      <div className="cursor" ref={ring}><span className="clabel" ref={label} /></div>
      <div className="cursor-dot" ref={dot} />
    </>
  )
}
