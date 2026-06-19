import { useEffect, useRef } from 'react'

// Difference-blend dot that swells into a labelled disc over interactive things.
export default function Cursor() {
  const dot = useRef(null)
  const label = useRef(null)
  useEffect(() => {
    if (matchMedia('(pointer:coarse)').matches) return
    const d = dot.current, l = label.current
    let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y, raf
    const loop = () => {
      cx += (x - cx) * 0.22; cy += (y - cy) * 0.22
      d.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`
      raf = requestAnimationFrame(loop)
    }
    loop()
    const move = (e) => {
      x = e.clientX; y = e.clientY
      const t = e.target.closest('[data-cursor]')
      const hot = e.target.closest('a,button,[data-cursor]')
      if (t) { d.classList.add('big'); l.textContent = t.getAttribute('data-cursor') }
      else if (hot) { d.classList.add('big'); l.textContent = '' }
      else d.classList.remove('big')
    }
    addEventListener('pointermove', move)
    return () => { cancelAnimationFrame(raf); removeEventListener('pointermove', move) }
  }, [])
  return <div className="cursor" ref={dot}><span className="clabel" ref={label} /></div>
}
