import { useEffect } from 'react'
import { useReactFlow, useStore } from '@xyflow/react'

// Figma-speed pinch / ctrl+wheel zoom. react-flow's built-in pinch steps too
// small on a trackpad, and exposes no speed knob, so we own the gesture:
// intercept ctrl/meta wheel (that is what a trackpad pinch emits), zoom toward
// the cursor with a strong step, and let react-flow keep plain two-finger pan.
export default function FastZoom({ speed = 0.05, min = 0.06, max = 2.6 }) {
  const { getViewport, setViewport } = useReactFlow()
  const domNode = useStore((s) => s.domNode)

  useEffect(() => {
    const el = domNode || document.querySelector('.react-flow')
    if (!el) return

    const onWheel = (e) => {
      if (!e.ctrlKey && !e.metaKey) return // plain scroll stays as pan
      e.preventDefault()
      e.stopPropagation()

      let d = e.deltaY
      if (e.deltaMode === 1) d *= 16 // line units -> px
      // strong, clamped step so one pinch/notch moves like Figma
      let factor = Math.exp(-d * speed)
      factor = Math.min(2.5, Math.max(0.4, factor)) // cap per-event jump

      const rect = el.getBoundingClientRect()
      const px = e.clientX - rect.left
      const py = e.clientY - rect.top
      const { x, y, zoom } = getViewport()
      const nz = Math.min(max, Math.max(min, zoom * factor))
      if (nz === zoom) return
      // keep the flow point under the cursor fixed while zooming
      const fx = (px - x) / zoom
      const fy = (py - y) / zoom
      setViewport({ x: px - fx * nz, y: py - fy * nz, zoom: nz })
    }

    el.addEventListener('wheel', onWheel, { passive: false, capture: true })
    return () => el.removeEventListener('wheel', onWheel, { capture: true })
  }, [domNode, getViewport, setViewport, speed, min, max])

  return null
}
