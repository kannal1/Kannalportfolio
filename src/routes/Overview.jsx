import { useMemo, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ReactFlow, ReactFlowProvider, Background, Controls, MiniMap,
  useReactFlow, useNodesState, useEdgesState,
} from '@xyflow/react'
import { motion } from 'framer-motion'
import { nodeTypes } from '../nodes/Nodes'
import ParallaxBg from '../components/ParallaxBg'
import { flowProps } from '../lib/flowProps'
import { identity, approach, about, projects } from '../data/projects'

const POS = {
  identity: { x: 0, y: 0 },
  approach: [{ x: -430, y: -90 }, { x: -430, y: 200 }, { x: -430, y: 490 }],
  projects: { creb: { x: 720, y: -210 }, cgb: { x: 1180, y: -30 }, '3eco': { x: 720, y: 330 }, ola: { x: 1180, y: 470 } },
  about: { x: -40, y: 780 },
  contact: { x: 640, y: 1000 },
}

function frameCount(p) { return p.groups.reduce((n, g) => n + g.frames.length, 0) + (p.compare ? 1 : 0) }

function edge(id, s, t, animated = false, accent) {
  return { id, source: s, target: t, type: 'smoothstep', animated, style: { strokeWidth: 1.5, stroke: accent || 'rgba(237,234,227,.18)', strokeOpacity: accent ? 0.5 : 1 } }
}

function Board() {
  const { fitView } = useReactFlow()
  const navigate = useNavigate()

  const onOpen = useCallback((id) => navigate(`/work/${id}`), [navigate])
  const onTour = useCallback(() => fitView({ duration: 900, padding: 0.16 }), [fitView])

  const n0 = useMemo(() => {
    const n = [{ id: 'identity', type: 'identity', position: POS.identity, data: { ...identity, onTour } }]
    approach.forEach((a, i) => n.push({ id: `appr-${i}`, type: 'approach', position: POS.approach[i], data: a }))
    projects.forEach((p) => n.push({ id: p.id, type: 'project', position: POS.projects[p.id], data: { ...p, count: frameCount(p), onOpen } }))
    n.push({ id: 'about', type: 'about', position: POS.about, data: about })
    n.push({ id: 'contact', type: 'contact', position: POS.contact, data: identity })
    return n
  }, [onOpen, onTour])

  const e0 = useMemo(() => [
    edge('e-i-creb', 'identity', 'creb', true, '#FF2E3A'),
    edge('e-i-cgb', 'identity', 'cgb', true, '#E0A53B'),
    edge('e-i-3eco', 'identity', '3eco', true, '#2FB6A6'),
    edge('e-i-ola', 'identity', 'ola', true, '#7CE38B'),
    edge('e-creb-cgb', 'creb', 'cgb'),
    edge('e-3eco-ola', '3eco', 'ola'),
    edge('e-appr-i', 'appr-0', 'identity'),
    edge('e-i-about', 'identity', 'about'),
    edge('e-about-contact', 'about', 'contact', true, '#FF2E3A'),
  ], [])

  const [nodes, , onNodesChange] = useNodesState(n0)
  const [edges, , onEdgesChange] = useEdgesState(e0)

  useEffect(() => { const t = setTimeout(() => fitView({ duration: 1000, padding: 0.16 }), 100); return () => clearTimeout(t) }, [fitView])

  return (
    <ReactFlow
      {...flowProps}
      nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes} fitView fitViewOptions={{ padding: 0.16 }}
      className="rf-root">
      <ParallaxBg accent="#FF2E3A" />
      <Background color="#1c1c22" gap={28} size={1.5} />
      <Controls showInteractive={false} position="bottom-right" />
      <MiniMap pannable zoomable position="bottom-left"
        nodeColor={(n) => (n.type === 'project' ? '#FF2E3A' : '#3a3a42')} maskColor="rgba(11,11,13,.78)" />
    </ReactFlow>
  )
}

export default function Overview() {
  const navigate = useNavigate()
  return (
    <motion.div className="route" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <div className="chrome">
        <div className="brand"><span className="b-dot" />Kannal Umayan</div>
        <span className="hint">Drag to pan · scroll to zoom · click a case to enter its board</span>
        <div className="chrome-actions">
          <a className="chip" href="/scroll.html" data-cursor="READ">Scroll view</a>
          <a className="chip solid" href={`mailto:${identity.email}`} data-cursor="HI">Let’s talk</a>
        </div>
      </div>
      <ReactFlowProvider><Board /></ReactFlowProvider>
    </motion.div>
  )
}
