import { Handle, Position } from '@xyflow/react'
import { motion } from 'framer-motion'

// invisible handles on all sides so edges can attach cleanly
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

const enter = {
  initial: { opacity: 0, y: 14, scale: 0.985 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
}

export function IdentityNode({ data }) {
  return (
    <motion.div className="node identity" {...enter}>
      <span className="node-label"><span className="dot" />KANNAL.UMAYAN / HELLO</span>
      <div className="kicker"><span className="pip" />{data.kicker}</div>
      <h1>{data.titleA}<br />{data.titleB} <span className="serif">{data.titleSerif}</span></h1>
      <p className="sub">{data.sub}</p>
      <div className="actions">
        <a className="btn btn-primary" href={`mailto:${data.email}`} data-cursor="SAY HI">Available for roles</a>
        <button className="btn btn-ghost" onClick={data.onTour} data-cursor="GO">Tour the work →</button>
      </div>
      <Ports />
    </motion.div>
  )
}

export function ProjectNode({ data }) {
  return (
    <motion.div className="node proj" {...enter}
      onClick={() => data.onOpen(data.id)} data-cursor="OPEN">
      <span className="node-label"><span className="dot" />FRAME / {data.no}</span>
      <div className="proj-cover">
        <img src={data.cover} alt={data.name} loading="lazy" draggable="false" />
        <span className="badge">{data.no} · CASE STUDY</span>
      </div>
      <div className="proj-body">
        <div className="proj-tags">{data.tags}</div>
        <h3 className="proj-name">{data.name}</h3>
        <p className="proj-line">{data.line}</p>
        <div className="proj-foot">
          <span className="proj-open">OPEN FRAME <i>→</i></span>
          <span className="proj-count">{data.count} screens</span>
        </div>
      </div>
      <Ports />
    </motion.div>
  )
}

export function ApproachNode({ data }) {
  return (
    <motion.div className="node card approach" {...enter}>
      <span className="node-label"><span className="dot" />APPROACH / {data.no}</span>
      <div className="no">{data.no}</div>
      <div className="h">{data.h}</div>
      <p className="p">{data.p}</p>
      <Ports />
    </motion.div>
  )
}

export function AboutNode({ data }) {
  return (
    <motion.div className="node about" {...enter}>
      <span className="node-label"><span className="dot" />ABOUT / KANNAL</span>
      <div className="lead">I’m Kannal. {data.lead}</div>
      <div className="blocks">
        {data.blocks.map((b) => (
          <div key={b.h}>
            <div className="bh">{b.h}</div>
            {b.p && <p className="p">{b.p}</p>}
            {b.tags && <div className="tags">{b.tags.map((t) => <span key={t}>{t}</span>)}</div>}
          </div>
        ))}
      </div>
      <Ports />
    </motion.div>
  )
}

export function ContactNode({ data }) {
  return (
    <motion.div className="node contact" {...enter}>
      <span className="node-label"><span className="dot" />CONTACT / AVAILABLE</span>
      <a className="big" href={`mailto:${data.email}`} data-cursor="EMAIL">
        Let’s build<br />something <span className="serif">good.</span>
      </a>
      <div className="row">
        <a href={`mailto:${data.email}`}>{data.email}</a>
        <a href={data.linkedin} target="_blank" rel="noopener">LinkedIn ↗</a>
      </div>
      <Ports />
    </motion.div>
  )
}

export const nodeTypes = {
  identity: IdentityNode,
  project: ProjectNode,
  approach: ApproachNode,
  about: AboutNode,
  contact: ContactNode,
}
