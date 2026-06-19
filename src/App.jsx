import { useState, useMemo, useCallback, useEffect } from 'react'
import {
  ReactFlow, ReactFlowProvider, Background, Controls, MiniMap,
  useReactFlow, useNodesState, useEdgesState,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { AnimatePresence, motion } from 'framer-motion'
import { nodeTypes } from './nodes/Nodes'
import DetailPanel from './DetailPanel'
import Cursor from './Cursor'
import { identity, approach, about, projects } from './data/projects'

const POS = {
  identity: { x: 0, y: 0 },
  approach: [{ x: -430, y: -90 }, { x: -430, y: 200 }, { x: -430, y: 490 }],
  projects: { creb: { x: 720, y: -210 }, cgb: { x: 1180, y: -30 }, '3eco': { x: 720, y: 330 }, ola: { x: 1180, y: 470 } },
  about: { x: -40, y: 780 },
  contact: { x: 640, y: 1000 },
}

function edge(id, source, target, animated = false) {
  return { id, source, target, type: 'smoothstep', animated, style: { strokeWidth: 1.5 } }
}

function Board() {
  const { fitView } = useReactFlow()
  const [open, setOpen] = useState(null)

  const onOpen = useCallback((id) => {
    fitView({ nodes: [{ id }], duration: 800, padding: 0.45 })
    setTimeout(() => setOpen(id), 360)
  }, [fitView])

  const onTour = useCallback(() => fitView({ duration: 900, padding: 0.18 }), [fitView])

  const initialNodes = useMemo(() => {
    const n = []
    n.push({ id: 'identity', type: 'identity', position: POS.identity, data: { ...identity, onTour }, draggable: true })
    approach.forEach((a, i) => n.push({ id: `appr-${i}`, type: 'approach', position: POS.approach[i], data: a }))
    projects.forEach((p) => n.push({
      id: p.id, type: 'project', position: POS.projects[p.id],
      data: { ...p, count: p.shots.length, onOpen },
    }))
    n.push({ id: 'about', type: 'about', position: POS.about, data: about })
    n.push({ id: 'contact', type: 'contact', position: POS.contact, data: identity })
    return n
  }, [onOpen, onTour])

  const initialEdges = useMemo(() => [
    edge('e-i-creb', 'identity', 'creb', true),
    edge('e-i-cgb', 'identity', 'cgb', true),
    edge('e-i-3eco', 'identity', '3eco', true),
    edge('e-i-ola', 'identity', 'ola', true),
    edge('e-creb-cgb', 'creb', 'cgb'),
    edge('e-3eco-ola', '3eco', 'ola'),
    edge('e-appr-i', 'appr-0', 'identity'),
    edge('e-i-about', 'identity', 'about'),
    edge('e-about-contact', 'about', 'contact', true),
  ], [])

  const [nodes, , onNodesChange] = useNodesState(initialNodes)
  const [edges, , onEdgesChange] = useEdgesState(initialEdges)

  // frame the whole board once on mount
  useEffect(() => { const t = setTimeout(() => fitView({ duration: 1000, padding: 0.16 }), 100); return () => clearTimeout(t) }, [fitView])

  const current = projects.find((p) => p.id === open)

  return (
    <>
      <ReactFlow
        nodes={nodes} edges={edges}
        onNodesChange={onNodesChange} onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        minZoom={0.15} maxZoom={2.2}
        proOptions={{ hideAttribution: true }}
        fitView fitViewOptions={{ padding: 0.16 }}
        nodesConnectable={false} elementsSelectable
        className="rf-root"
      >
        <Background color="#1c1c22" gap={28} size={1.5} />
        <Controls showInteractive={false} position="bottom-right" />
        <MiniMap pannable zoomable position="bottom-left"
          nodeColor={(n) => (n.type === 'project' ? '#FF2E3A' : '#3a3a42')}
          maskColor="rgba(11,11,13,.78)" />
      </ReactFlow>

      <AnimatePresence>
        {current && <DetailPanel key={current.id} project={current} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </>
  )
}

function Intro({ onDone }) {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches
    const t = setTimeout(onDone, reduce ? 200 : 2000)
    return () => clearTimeout(t)
  }, [onDone])
  return (
    <motion.div className="intro"
      initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
      onClick={onDone}>
      <div className="i-id">KANNAL UMAYAN — PRODUCT DESIGNER</div>
      <motion.div className="i-big"
        initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
        An infinite canvas of <span className="serif">the work.</span>
      </motion.div>
      <div className="i-row"><span>BENGALURU, INDIA</span><span>ENTERING BOARD…</span></div>
    </motion.div>
  )
}

export default function App() {
  const [intro, setIntro] = useState(true)
  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Cursor />

      <div className="chrome">
        <div className="brand"><span className="b-dot" />Kannal Umayan</div>
        <span className="hint">Drag to pan · Scroll to zoom · Click a frame</span>
        <div className="chrome-actions">
          <a className="chip" href="/scroll.html" data-cursor="READ">Scroll view</a>
          <a className="chip solid" href={`mailto:${identity.email}`} data-cursor="HI">Let’s talk</a>
        </div>
      </div>

      <ReactFlowProvider><Board /></ReactFlowProvider>

      <AnimatePresence>{intro && <Intro key="intro" onDone={() => setIntro(false)} />}</AnimatePresence>
    </>
  )
}
