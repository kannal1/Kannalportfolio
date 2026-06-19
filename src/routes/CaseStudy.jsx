import { useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { Parallax, RevealText, Reveal } from '../components/Motion'
import { byId, projects } from '../data/projects'
import { caseStudies } from '../data/caseStudies'

function span(kind) { return kind === 'phone' ? 'tall' : (kind === 'wide' || kind === 'pano') ? 'wide' : '' }

function Gallery({ frames }) {
  if (!frames || !frames.length) return null
  return (
    <div className="cs-gallery">
      {frames.map((f, i) => (
        <Parallax key={f.src} distance={i % 2 ? 70 : 40} className={`cs-shot ${span(f.kind)}`}>
          <img src={f.src} alt={f.caption} loading="lazy" />
          <span className="cs-shot-cap">{f.caption} · {f.dim}px</span>
        </Parallax>
      ))}
    </div>
  )
}

function Chapter({ c, group }) {
  if (c.kind === 'impact') {
    return (
      <section className="cs-impact">
        <div className="cs-ch-k" style={{ maxWidth: 1180, margin: '0 auto 30px' }}>{c.label}</div>
        <div className="row">
          {(c.metrics || []).map((m) => (
            <Reveal key={m.k}>
              <div className="iv">{m.v}</div>
              <div className="ik">{m.k}{m.sub ? <em> · {m.sub}</em> : null}</div>
            </Reveal>
          ))}
        </div>
        {c.body && <p style={{ maxWidth: 1180, margin: '32px auto 0', color: 'var(--fg-dim)', fontSize: 17, lineHeight: 1.6 }}>{c.body[0]}</p>}
      </section>
    )
  }
  const isSteps = c.kind === 'process' || c.kind === 'gaps'
  return (
    <>
      <section className="cs-chapter">
        <div className="wrap">
          <Reveal className="cs-ch-k">{c.label}</Reveal>
          <div className="cs-ch-grid">
            <RevealText as="h2" text={`${c.title}${c.titleSerif ? ' ' + c.titleSerif : ''}`} />
            <div className="cs-ch-body">
              {c.body && c.body.map((p, i) => <Reveal key={i} delay={i * 0.05}><p>{p}</p></Reveal>)}
              {isSteps && (
                <div className="cs-steps">
                  {(c.items || []).map((it, i) => (
                    <Reveal key={i} className="cs-step" delay={i * 0.05}>
                      <div className="sn">{it.n || String(i + 1).padStart(2, '0')}</div>
                      <div><h4>{it.title}</h4><p>{it.body}</p></div>
                    </Reveal>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      {group && <Gallery frames={group.frames} />}
    </>
  )
}

function CsHero({ project, story }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '24%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const h = story.hero
  return (
    <header className="cs-hero" ref={ref}>
      <div className="cs-hero-media">
        <motion.img src={project.cover} alt={project.name} style={{ y: reduce ? 0 : y, scale: reduce ? 1 : scale }} />
      </div>
      <div className="cs-hero-inner">
        <Reveal className="cs-tags">Plate P-{project.no} · {h.eyebrow}</Reveal>
        <h1>
          <RevealText text={h.title} />
          {h.titleSerif && <RevealText text={h.titleSerif} delay={0.2} className="" />}
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
    <motion.div style={{ '--accent': project.accent }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <CsHero project={project} story={story} />
      {story.chapters.map((c, i) => (
        <Chapter key={i} c={c} group={c.groupKey ? groups[c.groupKey] : null} />
      ))}
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
