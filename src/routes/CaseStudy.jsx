import { useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion'
import { ParallaxImage, RevealText, Reveal } from '../components/Motion'
import { byId, projects } from '../data/projects'
import { caseStudies } from '../data/caseStudies'
import { ia } from '../data/ia'
import BeforeAfter from '../components/BeforeAfter'
import { EO, SPRING_DRIFT, SPRING_GLIDE } from '../lib/motion'

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
        <div key={f.src} className={`cs-shot${f.ar >= 1.9 ? ' span2' : ''}${f.ar < 0.8 ? ' portrait' : ''}`} style={{ aspectRatio: String(f.ar) }}>
          <ParallaxImage src={f.src} alt={f.caption} depth={0} zoom={false} />
          <span className="cs-shot-cap">{f.caption}</span>
        </div>
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
  const numY = useSpring(useTransform(scrollYProgress, [0, 1], ['-26%', '26%']), SPRING_DRIFT)
  const rowY = useSpring(useTransform(scrollYProgress, [0, 1], [80, -80]), SPRING_GLIDE)
  return (
    <section className="cs-act cs-impact-act" ref={ref}>
      <motion.span className="cs-act-num" style={{ y: reduce ? 0 : numY }} aria-hidden="true">{String(index + 1).padStart(2, '0')}</motion.span>
      <div className="cs-act-inner">
        <Reveal className="cs-act-k">{c.label}</Reveal>
        <h2 className="cs-act-h"><Headline title={c.title} serif={c.titleSerif} /></h2>
        <motion.div className="cs-impact-row" style={{ y: reduce ? 0 : rowY }}>
          {(c.metrics || []).map((m, i) => (
            <Reveal key={m.k} delay={i * 0.08}>
              <div className="iv num">{m.v}</div>
              <div className="ik">{m.k}{m.sub ? <span className="stat-sub num">{m.sub}</span> : null}</div>
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
  const numY = useSpring(useTransform(scrollYProgress, [0, 1], ['-22%', '22%']), SPRING_DRIFT)
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
  const numY = useSpring(useTransform(scrollYProgress, [0, 1], ['-28%', '28%']), SPRING_DRIFT)
  const headY = useSpring(useTransform(scrollYProgress, [0, 1], [70, -70]), SPRING_GLIDE)

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
      <div className="cs-hero-aura" aria-hidden="true" />
      <div className="cs-hero-inner">
        <Reveal className="cs-tags">Project P-{project.no} / {h.eyebrow}</Reveal>
        <h1>
          <RevealText as="span" text={h.title} />
          {h.titleSerif && <> <RevealText as="span" className="em-serif" text={h.titleSerif} delay={0.2} /></>}
        </h1>
        <Reveal className="cs-lead" delay={0.2}>{h.lead}</Reveal>
        <Reveal className="cs-meta" delay={0.3}>
          {h.meta.map((m) => <div key={m.k}><div className="mk">{m.k}</div><div className="mv">{m.v}</div></div>)}
        </Reveal>
      </div>
    </header>
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <CsHero project={project} story={story} />
      <div className="cs-cover">
        <ParallaxImage src={project.cover} alt={`${project.name}, shipped product`} depth={10} zoom={false} eager />
        <span className="cap">{project.short}, shipped product</span>
      </div>
      {project.compare && <BeforeAfter before={project.compare.before} after={project.compare.after} />}
      {story.chapters.map((c, i) => (
        <Chapter key={i} c={c} group={c.groupKey ? groups[c.groupKey] : null} index={i} />
      ))}
      {ia[id] && (
        <section className="ia-section">
          <div className="ia-inner">
            <Reveal className="ia-k">Information architecture</Reveal>
            <RevealText as="h2" text="One map the whole team agreed on" />
            {ia[id].intro && <Reveal className="ia-intro" delay={0.1}><p>{ia[id].intro}</p></Reveal>}
            <IAMap data={ia[id]} />
          </div>
        </section>
      )}
      <section className="cs-next" onClick={() => navigate(`/work/${next.id}`)}>
        <ParallaxImage src={next.cover} alt="" depth={8} zoom={false} />
        <div>
          <div className="nk">Next project / P-{next.no}</div>
          <div className="nt">{next.name}</div>
        </div>
      </section>
      <footer className="foot">
        <span>&copy; 2026 Kannal Umayan</span>
        <button onClick={() => navigate('/')}>All work</button>
        <span>{project.short}</span>
      </footer>
    </motion.div>
  )
}
