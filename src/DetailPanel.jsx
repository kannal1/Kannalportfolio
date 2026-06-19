import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

function Compare({ before, after }) {
  const [pos, setPos] = useState(50)
  const box = useRef(null)
  const drag = (e) => {
    const r = box.current.getBoundingClientRect()
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - r.left
    setPos(Math.max(0, Math.min(100, (x / r.width) * 100)))
  }
  const start = () => {
    const move = (e) => drag(e)
    const up = () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up) }
    window.addEventListener('pointermove', move); window.addEventListener('pointerup', up)
  }
  return (
    <div className="compare" ref={box} onPointerDown={(e) => { drag(e); start() }} data-cursor="DRAG">
      <img className="after" src={after} alt="Final UI" />
      <div className="before" style={{ width: `${pos}%` }}><img src={before} alt="Wireframe" style={{ width: box.current ? box.current.offsetWidth : '100%' }} /></div>
      <span className="ctag tl">WIREFRAME</span>
      <span className="ctag tr">FINAL UI</span>
      <div className="handle" style={{ left: `${pos}%` }} />
    </div>
  )
}

export default function DetailPanel({ project, onClose }) {
  return (
    <>
      <motion.div className="scrim" onClick={onClose}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }} />
      <motion.aside className="panel"
        initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 320, damping: 38 }}>
        <div className="panel-head">
          <button className="panel-close" onClick={onClose} data-cursor="CLOSE" aria-label="Close">✕</button>
          <div className="panel-tags">{project.no} · {project.tags}</div>
          <h2>{project.name}</h2>
          <p className="lead">{project.line}</p>
          {project.metrics && (
            <div className="panel-metrics">
              {project.metrics.map((m) => (
                <div key={m.k}>
                  <div className="m-v">{m.v}</div>
                  <div className="m-k">{m.k} {m.sub && <em>· {m.sub}</em>}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="panel-body">
          <div className="panel-grid">
            {project.compare && <Compare before={project.compare.before} after={project.compare.after} />}
            {project.shots.map((src, i) => {
              const wide = /hero|dashboard|flow|sitemap|timeline|kit|system/.test(src)
              return (
                <motion.div key={src} className={`shot${wide ? ' wide' : ''}`}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: Math.min(i * 0.04, 0.3), ease: [0.16, 1, 0.3, 1] }}>
                  <img src={src} alt={`${project.name} screen ${i + 1}`} loading="lazy" />
                </motion.div>
              )
            })}
          </div>
        </div>
        <div className="panel-foot">
          <span className="proj-count">{project.shots.length} frames · {project.id.toUpperCase()}</span>
          <a className="chip solid" href={project.href} data-cursor="OPEN">Open full case study →</a>
        </div>
      </motion.aside>
    </>
  )
}
