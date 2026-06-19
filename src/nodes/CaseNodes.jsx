import { useState, useRef } from 'react'
import { Handle, Position } from '@xyflow/react'
import { motion } from 'framer-motion'
import { useTilt } from '../lib/parallax'

const enter = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
}

function Ports() {
  return (
    <>
      <Handle type="target" position={Position.Left} />
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Right} />
      <Handle type="source" position={Position.Bottom} />
    </>
  )
}

function Title({ title, serif }) {
  return <h3>{title}{serif ? <> <span className="serif">{serif}</span></> : null}</h3>
}

// ── image frame ──────────────────────────────────────────────
export function FrameNode({ data }) {
  const tilt = useTilt(7)
  return (
    <motion.div className={`cframe k-${data.kind}`} {...enter}
      style={{ width: data.w, '--accent': data.accent }}
      onClick={() => data.onZoom(data.src, data.caption)} data-cursor="ZOOM">
      <div className="cframe-shell" ref={tilt.ref} onMouseMove={tilt.onMove} onMouseLeave={tilt.onLeave}>
        <div className="cframe-img" style={{ width: data.w, height: data.h }}>
          <img src={data.src} alt={data.caption} loading="lazy" draggable="false" />
          <span className="cframe-glow" />
        </div>
      </div>
      <div className="cframe-cap"><span className="cf-dot" />{data.caption}</div>
      <Ports />
    </motion.div>
  )
}

// ── section header (spatial label for a lane) ────────────────
export function GroupNode({ data }) {
  return (
    <motion.div className="cgroup" {...enter} style={{ '--accent': data.accent }}>
      <div className="cgroup-no">{data.index}</div>
      <h3>{data.title}</h3>
      <p>{data.blurb}</p>
      <Ports />
    </motion.div>
  )
}

// ── project hero / title card ────────────────────────────────
export function CaseHeroNode({ data }) {
  const h = data.hero
  return (
    <motion.div className="chero" {...enter} style={{ '--accent': data.accent }}>
      <span className="node-label"><span className="dot" />CASE {data.no} / {data.id.toUpperCase()}</span>
      <div className="chero-tags">{h.eyebrow}</div>
      <h1>{h.title}{h.titleSerif ? <> <span className="serif">{h.titleSerif}</span></> : null}</h1>
      <p className="chero-line">{h.lead}</p>
      <div className="chero-meta">
        {h.meta.map((m) => (
          <div key={m.k} className="cm"><div className="cm-k">{m.k}</div><div className="cm-v">{m.v}</div></div>
        ))}
      </div>
      <div className="chero-actions">
        <button className="btn btn-primary" onClick={data.onFit} data-cursor="FIT">Fit the board ⤢</button>
        <button className="btn btn-ghost" onClick={data.onHome} data-cursor="BACK">← All work</button>
      </div>
      <Ports />
    </motion.div>
  )
}

// ── narrative chapter (context / solution / reflection) ──────
export function StoryNode({ data }) {
  return (
    <motion.div className={`cstory${data.kind === 'reflection' ? ' is-reflection' : ''}`} {...enter} style={{ '--accent': data.accent }}>
      <div className="cstory-label">{data.label}</div>
      <Title title={data.title} serif={data.titleSerif} />
      {data.body.map((p, i) => <p key={i}>{p}</p>)}
      <Ports />
    </motion.div>
  )
}

// ── steps chapter (process / gaps / roles) ───────────────────
export function StepsNode({ data }) {
  return (
    <motion.div className="csteps" {...enter} style={{ '--accent': data.accent }}>
      <div className="cstory-label">{data.label}</div>
      <Title title={data.title} serif={data.titleSerif} />
      <div className="csteps-list">
        {(data.items || []).map((it, i) => (
          <div key={i} className="cstep">
            <div className="cstep-n">{it.n || String(i + 1).padStart(2, '0')}</div>
            <div>
              <h4>{it.title}</h4>
              <p>{it.body}</p>
            </div>
          </div>
        ))}
      </div>
      <Ports />
    </motion.div>
  )
}

// ── impact chapter (metric band) ─────────────────────────────
export function ImpactNode({ data }) {
  return (
    <motion.div className="cimpact" {...enter} style={{ '--accent': data.accent }}>
      <div className="cstory-label">{data.label}</div>
      <div className="cimpact-row">
        {(data.metrics || []).map((m) => (
          <div key={m.k} className="cim">
            <div className="cim-v">{m.v}</div>
            <div className="cim-k">{m.k}{m.sub ? <em> · {m.sub}</em> : null}</div>
          </div>
        ))}
      </div>
      {data.body && data.body.map((p, i) => <p key={i} className="cimpact-note">{p}</p>)}
      <Ports />
    </motion.div>
  )
}

// ── drag-to-compare wireframe → shipped (cgb) ────────────────
export function CompareNode({ data }) {
  const [pos, setPos] = useState(50)
  const box = useRef(null)
  const move = (e) => {
    const r = box.current.getBoundingClientRect()
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - r.left
    setPos(Math.max(0, Math.min(100, (x / r.width) * 100)))
  }
  const down = (e) => {
    e.stopPropagation(); move(e)
    const up = () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up) }
    window.addEventListener('pointermove', move); window.addEventListener('pointerup', up)
  }
  return (
    <motion.div className="cframe" {...enter} style={{ width: data.w, '--accent': data.accent }}>
      <div className="ccompare" ref={box} style={{ width: data.w, height: data.h }}
        onPointerDown={down} data-cursor="DRAG" onClick={(e) => e.stopPropagation()}>
        <img className="cc-after" src={data.after} alt="Shipped UI" draggable="false" />
        <div className="cc-before" style={{ width: `${pos}%` }}>
          <img src={data.before} alt="Wireframe" style={{ width: data.w }} draggable="false" />
        </div>
        <span className="cc-tag tl">WIREFRAME</span>
        <span className="cc-tag tr">SHIPPED</span>
        <div className="cc-handle" style={{ left: `${pos}%` }} />
      </div>
      <div className="cframe-cap"><span className="cf-dot" />Same dashboard, wireframe to shipped. Drag.</div>
      <Ports />
    </motion.div>
  )
}

export const caseNodeTypes = {
  frame: FrameNode,
  group: GroupNode,
  casehero: CaseHeroNode,
  compare: CompareNode,
  story: StoryNode,
  steps: StepsNode,
  impact: ImpactNode,
}
