import { useMemo, useState, useCallback, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ReactFlow, ReactFlowProvider, Background, Controls, MiniMap,
  useReactFlow, useNodesState, useEdgesState,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { AnimatePresence, motion } from 'framer-motion'
import { caseNodeTypes } from '../nodes/CaseNodes'
import ParallaxBg from '../components/ParallaxBg'
import Lightbox from '../components/Lightbox'
import FastZoom from '../lib/FastZoom'
import { flowProps } from '../lib/flowProps'
import { byId, projects } from '../data/projects'
import { caseStudies } from '../data/caseStudies'

// layout constants
const NARR_X = 0, NARR_W = 540, LANE_X = NARR_W + 220
const GAP = 64, LANE_GAP = 200, HERO_H = 600, HEADER_W = 300, HEAD_TO_FRAMES = 96

const TYPE = { narrative: 'story', reflection: 'story', process: 'steps', gaps: 'steps', impact: 'impact' }

// rough vertical footprint of a narrative chapter, so lanes don't overlap
function estimateChapter(c) {
  let h = 140
  if (c.body) h += c.body.reduce((s, p) => s + Math.ceil(p.length / 46) * 27 + 16, 0)
  if (c.items) h += c.items.length * 104
  if (c.metrics) h += 150
  return h + 50
}

function spineEdge(from, to, accent) {
  return { id: `e-${from}-${to}`, source: from, target: to, type: 'smoothstep', animated: true, style: { stroke: accent, strokeWidth: 1.6, strokeOpacity: 0.55 } }
}
function thinEdge(from, to, accent) {
  return { id: `e-${from}-${to}`, source: from, target: to, type: 'smoothstep', style: { stroke: accent, strokeWidth: 1.2, strokeOpacity: 0.28 } }
}

function frameNodesForGroup(group, project, x, y, onZoom, withCompare) {
  const out = []
  let cx = x, maxH = 0
  if (withCompare && project.compare) {
    const cw = 460, ch = Math.round(cw / 1.2)
    out.push({ node: { id: 'compare', type: 'compare', position: { x: cx, y }, data: { ...project.compare, w: cw, h: ch, accent: project.accent } } })
    cx += cw + GAP; maxH = Math.max(maxH, ch)
  }
  group.frames.forEach((f, fi) => {
    out.push({ node: { id: `${group.key}-${fi}`, type: 'frame', position: { x: cx, y }, data: { ...f, accent: project.accent, onZoom } } })
    cx += f.w + GAP; maxH = Math.max(maxH, f.h + 44)
  })
  return { out, maxH, firstId: withCompare && project.compare ? 'compare' : (group.frames.length ? `${group.key}-0` : null) }
}

// chapter-driven board: narrative spine on the left, image lanes to the right
function buildStoryBoard(project, story, onZoom, onFit, onHome) {
  const nodes = [], edges = []
  const groupsByKey = Object.fromEntries(project.groups.map((g) => [g.key, g]))
  const used = new Set()

  nodes.push({ id: 'hero', type: 'casehero', position: { x: NARR_X, y: 0 }, draggable: true, data: { no: project.no, id: project.id, accent: project.accent, hero: story.hero, onFit, onHome } })

  let y = HERO_H + LANE_GAP
  let prev = 'hero'

  story.chapters.forEach((c, ci) => {
    const id = `ch-${ci}`
    nodes.push({ id, type: TYPE[c.kind] || 'story', position: { x: NARR_X, y }, data: { ...c, accent: project.accent } })
    edges.push(spineEdge(prev, id, project.accent))
    prev = id

    let laneH = estimateChapter(c)
    const g = c.groupKey && groupsByKey[c.groupKey]
    if (g && !used.has(c.groupKey)) {
      used.add(c.groupKey)
      const withCompare = project.compare && c.groupKey === 'overview'
      const { out, maxH, firstId } = frameNodesForGroup(g, project, LANE_X, y, onZoom, withCompare)
      out.forEach((o) => nodes.push(o.node))
      if (firstId) edges.push(thinEdge(id, firstId, project.accent))
      laneH = Math.max(laneH, maxH)
    }
    y += laneH + LANE_GAP
  })

  // any image group not referenced by a chapter: append as a labelled lane
  project.groups.forEach((g, gi) => {
    if (used.has(g.key)) return
    const hid = `g-${g.key}`
    nodes.push({ id: hid, type: 'group', position: { x: NARR_X, y }, data: { title: g.title, blurb: g.blurb, index: String(gi + 1).padStart(2, '0'), accent: project.accent } })
    edges.push(spineEdge(prev, hid, project.accent)); prev = hid
    const { out, maxH, firstId } = frameNodesForGroup(g, project, LANE_X, y, onZoom, false)
    out.forEach((o) => nodes.push(o.node))
    if (firstId) edges.push(thinEdge(hid, firstId, project.accent))
    y += Math.max(220, maxH) + LANE_GAP
  })

  return { nodes, edges }
}

// fallback when no written case study exists yet: image lanes only
function buildBasicBoard(project, onZoom, onFit, onHome) {
  const nodes = [{ id: 'hero', type: 'casehero', position: { x: 0, y: 0 }, draggable: true, data: { no: project.no, id: project.id, accent: project.accent, onFit, onHome, hero: { eyebrow: project.tags, title: project.name, titleSerif: '', lead: project.line, meta: project.metrics.map((m) => ({ k: m.k, v: m.v })) } } }]
  const edges = []
  let y = 0, prev = 'hero'
  const laneX = 540 + 200
  project.groups.forEach((g, gi) => {
    const hid = `g-${g.key}`
    nodes.push({ id: hid, type: 'group', position: { x: laneX, y }, data: { title: g.title, blurb: g.blurb, index: String(gi + 1).padStart(2, '0'), accent: project.accent } })
    edges.push(spineEdge(prev, hid, project.accent)); prev = hid
    let x = laneX + HEADER_W + HEAD_TO_FRAMES, maxH = 220
    const wc = project.compare && gi === 0
    const { out, maxH: mh, firstId } = frameNodesForGroup(g, project, x, y, onZoom, wc)
    out.forEach((o) => nodes.push(o.node)); maxH = Math.max(maxH, mh)
    if (firstId) edges.push(thinEdge(hid, firstId, project.accent))
    y += maxH + 240
  })
  return { nodes, edges }
}

function Board({ project, story }) {
  const { fitView } = useReactFlow()
  const navigate = useNavigate()
  const [zoom, setZoom] = useState(null)

  const onZoom = useCallback((src, caption) => setZoom({ src, caption }), [])
  const onFit = useCallback(() => fitView({ duration: 900, padding: 0.12 }), [fitView])
  const onHome = useCallback(() => navigate('/'), [navigate])

  const { nodes: n0, edges: e0 } = useMemo(
    () => (story ? buildStoryBoard(project, story, onZoom, onFit, onHome) : buildBasicBoard(project, onZoom, onFit, onHome)),
    [project, story, onZoom, onFit, onHome],
  )
  const [nodes, , onNodesChange] = useNodesState(n0)
  const [edges, , onEdgesChange] = useEdgesState(e0)

  useEffect(() => {
    const t = setTimeout(() => fitView({ nodes: [{ id: 'hero' }], duration: 800, padding: 0.55 }), 120)
    return () => clearTimeout(t)
  }, [fitView, project.id])

  useEffect(() => {
    const k = (e) => { if (e.key === 'f') onFit() }
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [onFit])

  return (
    <>
      <ReactFlow
        {...flowProps}
        nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange}
        nodeTypes={caseNodeTypes}
        fitView fitViewOptions={{ padding: 0.5 }} className="rf-root">
        <FastZoom min={flowProps.minZoom} max={flowProps.maxZoom} />
        <ParallaxBg accent={project.accent} />
        <Background color="#1c1c22" gap={30} size={1.4} />
        <Controls showInteractive={false} position="bottom-right" />
        <MiniMap pannable zoomable position="bottom-left"
          nodeColor={(nd) => (nd.type === 'frame' || nd.type === 'compare' ? project.accent : '#3a3a42')}
          maskColor="rgba(11,11,13,.8)" />
      </ReactFlow>
      <AnimatePresence>
        {zoom && <Lightbox {...zoom} accent={project.accent} onClose={() => setZoom(null)} />}
      </AnimatePresence>
    </>
  )
}

export default function CaseBoard() {
  const { id } = useParams()
  const navigate = useNavigate()
  const project = byId[id]
  const story = caseStudies[id] || null

  useEffect(() => { if (!project) navigate('/') }, [project, navigate])
  if (!project) return null

  const idx = projects.findIndex((p) => p.id === id)
  const next = projects[(idx + 1) % projects.length]

  return (
    <motion.div className="route" style={{ '--accent': project.accent }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <div className="chrome">
        <button className="brand" onClick={() => navigate('/')} data-cursor="HOME">
          <span className="b-dot" />Kannal Umayan
        </button>
        <span className="hint">{project.no} · {project.short} — drag to pan · pinch to zoom · click a frame · press F to fit</span>
        <div className="chrome-actions">
          <button className="chip" onClick={() => navigate(`/work/${next.id}`)} data-cursor="NEXT">Next: {next.short} →</button>
          <a className="chip solid" href="mailto:kannal2242@gmail.com" data-cursor="HI">Let’s talk</a>
        </div>
      </div>
      <ReactFlowProvider><Board project={project} story={story} /></ReactFlowProvider>
    </motion.div>
  )
}
