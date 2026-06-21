import { useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion'
import { ParallaxImage, RevealText, Reveal } from '../components/Motion'
import { byId, projects } from '../data/projects'
import { caseStudies } from '../data/caseStudies'
import { ia } from '../data/ia'

const EO = [0.16, 1, 0.3, 1]

// Information architecture map: a root node feeding labelled section columns.
function IAMap({ data }) {
  return (
    <div className="ia-map">
      <div className="ia-root">
        <span className="ia-root-k">Root</span>
        <span className="ia-root-t">{data.root}</span>
        <span className="ia-root-s">{data.rootSub}</span>
      </div>
      <div className="ia-grid">
        {data.sections.map((s, i) => (
          <motion.div className="ia-col" key={s.title}
            initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, ease: EO, delay: (i % 3) * 0.07 }}>
            <div className="ia-col-h"><span className="ia-n">{s.n}</span>{s.title}</div>
            <ul>
              {s.items.map((it, j) => (
                <li key={it}><span className="ia-sub">{s.n}.{j + 1}</span>{it}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function Gallery({ frames }) {
  if (!frames || !frames.length) return null
  return (
    <div className="cs-gallery">
      {frames.map((f) => (
        <ParallaxImage key={f.src} src={f.src} caption={`${f.caption} · ${f.dim}px`} wide={f.ar >= 1.9} portrait={f.ar < 0.8} />
      ))}
    </div>
  )
}

function Headline({ title, serif }) {
  return (
    <>
      <RevealText as="span" text={title} />
      {serif && <> <RevealText as="span" className="em-serif" text={serif} delay={0.12} /></>}
    </>
  )
}

function StepsList({ items }) {
  return (
    <div className="cs-steps">
      {(items || []).map((it, i) => (
        <Reveal key={i} className="cs-step" delay={i * 0.05}>
          <div className="sn">{it.n || String(i + 1).padStart(2, '0')}</div>
          <div><h4>{it.title}</h4><p>{it.body}</p></div>
        </Reveal>
      ))}
    </div>
  )
}

function ImpactAct({ c, index }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const numY = useSpring(useTransform(scrollYProgress, [0, 1], ['-26%', '26%']), { stiffness: 60, damping: 24, mass: 0.6 })
  const rowY = useSpring(useTransform(scrollYProgress, [0, 1], [80, -80]), { stiffness: 90, damping: 28, mass: 0.4 })
  return (
    <section className="cs-act cs-impact-act" ref={ref}>
      <motion.span className="cs-act-num" style={{ y: reduce ? 0 : numY }} aria-hidden="true">{String(index + 1).padStart(2, '0')}</motion.span>
      <div className="cs-act-inner">
        <Reveal className="cs-act-k">{c.label}</Reveal>
        <h2 className="cs-act-h"><Headline title={c.title} serif={c.titleSerif} /></h2>
        <motion.div className="cs-impact-row" style={{ y: reduce ? 0 : rowY }}>
          {(c.metrics || []).map((m, i) => (
            <Reveal key={m.k} delay={i * 0.08}>
              <div className="iv">{m.v}</div>
              <div className="ik">{m.k}{m.sub ? <em> · {m.sub}</em> : null}</div>
            </Reveal>
          ))}
        </motion.div>
        {c.body && <Reveal delay={0.1}><p className="cs-impact-note">{c.body[0]}</p></Reveal>}
      </div>
    </section>
  )
}

function ReflectionAct({ c }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const numY = useSpring(useTransform(scrollYProgress, [0, 1], ['-22%', '22%']), { stiffness: 60, damping: 24, mass: 0.6 })
  return (
    <section className="cs-act cs-reflect" ref={ref}>
      <motion.span className="cs-act-num ghost" style={{ y: reduce ? 0 : numY }} aria-hidden="true">FIN</motion.span>
      <div className="cs-reflect-inner">
        <Reveal className="cs-act-k">{c.label}</Reveal>
        <h2 className="cs-reflect-h"><Headline title={c.title} serif={c.titleSerif} /></h2>
        {c.body && c.body.map((p, i) => <Reveal key={i} delay={0.1 + i * 0.06}><p>{p}</p></Reveal>)}
      </div>
    </section>
  )
}

function Chapter({ c, group, index }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const numY = useSpring(useTransform(scrollYProgress, [0, 1], ['-28%', '28%']), { stiffness: 60, damping: 24, mass: 0.6 })
  const headY = useSpring(useTransform(scrollYProgress, [0, 1], [70, -70]), { stiffness: 90, damping: 28, mass: 0.4 })

  if (c.kind === 'impact') return <ImpactAct c={c} index={index} />
  if (c.kind === 'reflection') return <ReflectionAct c={c} />

  const isSteps = c.kind === 'process' || c.kind === 'gaps'
  return (
    <>
      <section className="cs-act" ref={ref}>
        <motion.span className="cs-act-num" style={{ y: reduce ? 0 : numY }} aria-hidden="true">{String(index + 1).padStart(2, '0')}</motion.span>
        <div className="cs-act-inner">
          <Reveal className="cs-act-k">{c.label}</Reveal>
          <motion.h2 className="cs-act-h" style={{ y: reduce ? 0 : headY }}><Headline title={c.title} serif={c.titleSerif} /></motion.h2>
          <div className="cs-act-body">
            {c.body && c.body.map((p, i) => <Reveal key={i} delay={i * 0.05}><p>{p}</p></Reveal>)}
            {isSteps && <StepsList items={c.items} />}
          </div>
        </div>
      </section>
      {group && <Gallery frames={group.frames} />}
    </>
  )
}

function CsHero({ project, story }) {
  const h = story.hero
  return (
    <header className="cs-hero">
      <div className="cs-hero-inner">
        <Reveal className="cs-tags">Plate P-{project.no} · {h.eyebrow}</Reveal>
        <h1>
          <RevealText text={h.title} />
          {h.titleSerif && <RevealText text={h.titleSerif} delay={0.2} />}
        </h1>
        <Reveal className="cs-lead" delay={0.2}>{h.lead}</Reveal>
        <Reveal className="cs-meta" delay={0.3}>
          {h.meta.map((m) => <div key={m.k}><div className="mk">{m.k}</div><div className="mv">{m.v}</div></div>)}
        </Reveal>
      </div>
    </header>
  )
}

// cover image as its own full-width parallax band, the same on every case page
function Cover({ project }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useSpring(useTransform(scrollYProgress, [0, 1], ['-14%', '14%']), { stiffness: 80, damping: 26, mass: 0.5 })
  return (
    <div className="cs-cover" ref={ref}>
      <motion.img src={project.cover} alt={`${project.name} product`} style={{ y: reduce ? 0 : y }} draggable="false" />
      <span className="cs-shot-cap">{project.short} · shipped product</span>
    </div>
  )
}

export default function CaseStudy() {
  const { id } = useParams()
  const navigate = useNavigate()
  const project = byId[id]
  const story = caseStudies[id]

  useEffect(() => { window.scrollTo(0, 0); if (!project) navigate('/') }, [id, project, navigate])
  if (!project || !story) return null

  const groups = Object.fromEntries(project.groups.map((g) => [g.key, g]))
  const idx = projects.findIndex((p) => p.id === id)
  const next = projects[(idx + 1) % projects.length]

  return (
    <motion.div style={{ '--accent': project.accent }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <CsHero project={project} story={story} />
      <Cover project={project} />
      {story.chapters.map((c, i) => (
        <Chapter key={i} c={c} group={c.groupKey ? groups[c.groupKey] : null} index={i} />
      ))}
      {ia[id] && (
        <section className="cs-chapter ia-section">
          <div className="ia-inner">
            <Reveal className="cs-ch-k">Information architecture</Reveal>
            <RevealText as="h2" text="One map the whole team agreed on" />
            {ia[id].intro && <Reveal className="ia-intro" delay={0.1}><p>{ia[id].intro}</p></Reveal>}
            <IAMap data={ia[id]} />
          </div>
        </section>
      )}
      <section className="cs-next" onClick={() => navigate(`/work/${next.id}`)} data-cursor="NEXT">
        <img src={next.cover} alt={next.name} />
        <div>
          <div className="nk">Next project · P-{next.no}</div>
          <div className="nt">{next.name}</div>
        </div>
      </section>
      <footer className="foot">
        <span>© 2026 Kannal Umayan</span>
        <button onClick={() => navigate('/')} data-cursor="HOME">All work ↑</button>
        <span>{project.short}</span>
      </footer>
    </motion.div>
  )
}
