import { useRef, useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform, useSpring, useMotionValue, useReducedMotion } from 'framer-motion'
import { Parallax, RevealText, Reveal, useMagnetic } from '../components/Motion'
import Metric from '../components/Metric'
import { EnterContext } from '../lib/enter'
import { projects, identity, about } from '../data/projects'
import { EO } from '../lib/motion'

const KEYWORDS = ['Fintech', 'Design Systems', '0 → 1 Products', 'Motion', 'B2B Platforms', 'Engineer-minded', 'Trust & Money']

function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const entered = useContext(EnterContext)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -160])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 220])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const blobY = useTransform(scrollYProgress, [0, 1], [0, -300])

  // pointer parallax
  const mx = useSpring(0, { stiffness: 60, damping: 20 })
  const my = useSpring(0, { stiffness: 60, damping: 20 })
  const bx = useTransform(mx, (v) => -v)
  const by = useTransform(my, (v) => -v)
  useEffect(() => {
    if (reduce) return
    const m = (e) => { mx.set((e.clientX / innerWidth - 0.5) * 40); my.set((e.clientY / innerHeight - 0.5) * 40) }
    addEventListener('pointermove', m); return () => removeEventListener('pointermove', m)
  }, [mx, my, reduce])

  // timed assemble after the load gate
  const lineV = {
    hidden: { y: '115%' },
    visible: (i) => ({ y: '0%', transition: { duration: reduce ? 0.3 : 1, ease: EO, delay: reduce ? 0 : 0.1 + i * 0.12 } }),
  }
  const stage = (delay) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 18 },
    animate: entered ? { opacity: 1, y: 0 } : (reduce ? { opacity: 0 } : { opacity: 0, y: 18 }),
    transition: { duration: reduce ? 0.3 : 0.8, ease: EO, delay: reduce ? 0 : delay },
  })

  return (
    <header className="hero" ref={ref}>
      <motion.div className="hero-bg" style={{ y: reduce ? 0 : blobY }}>
        <motion.div className="hero-blob a" style={{ x: mx, y: my }} />
        <motion.div className="hero-blob b" style={{ x: bx, y: by }} />
        <div className="hero-grid" />
      </motion.div>

      <motion.div className="hero-inner" style={{ opacity: fade }}>
        <motion.div className="hero-kicker" {...stage(0.02)}>
          <span className="dot" />Product Designer · Bengaluru · Available 2026
        </motion.div>
        <motion.h1 className="hero-name" initial="hidden" animate={entered ? 'visible' : 'hidden'}>
          <span className="ln"><motion.em custom={0} variants={lineV} style={{ y: reduce ? 0 : y1 }}>Kannal</motion.em></span>
          <span className="ln"><motion.em custom={1} variants={lineV} className="stroke" style={{ y: reduce ? 0 : y2 }}>Umayan</motion.em></span>
        </motion.h1>
        <motion.div className="hero-thesis" {...stage(0.5)}>
          Clarity people trust with their <span className="g">money.</span>
        </motion.div>
        <div className="hero-sub">
          <motion.p {...stage(0.62)}>
            The only designer at Compound, where I shipped two live fintech products and the systems behind them. Engineer turned designer: I render complexity legible.
          </motion.p>
          <motion.span className="scroll-cue" {...stage(0.82)}><i />Scroll</motion.span>
        </div>
      </motion.div>
    </header>
  )
}

function Manifesto() {
  return (
    <section className="manifesto">
      <div className="wrap">
        <RevealText className="big" text="I came to design from engineering. That is why my handoffs hold up, and why I design the states people skip: the errors, the empty screens, the exact moment someone decides to trust an app with their money." />
        <Reveal className="meta" delay={0.1}>
          <div><div className="mk">Currently</div><div className="mv">Sole product designer at Compound, two live financial products end to end.</div></div>
          <div><div className="mk">Background</div><div className="mv">Two years writing .NET before design. I know what is hard to build.</div></div>
          <div><div className="mk">Looking for</div><div className="mv">A senior product role on a team that ships real work to real users.</div></div>
        </Reveal>
        <Reveal className="quant" delay={0.12}>
          <Metric value="2,000" label="Active investors" sub="from 400" />
          <Metric value="$4M" label="Value held" sub="from $400k" />
          <Metric value="~70%" label="Conversion lift" sub="across the journey" />
        </Reveal>
      </div>
    </section>
  )
}

function Work() {
  const navigate = useNavigate()
  const reduce = useReducedMotion()
  const [active, setActive] = useState(null)
  const [shown, setShown] = useState(projects[0].id)
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 220, damping: 28, mass: 0.5 })
  const sy = useSpring(py, { stiffness: 220, damping: 28, mass: 0.5 })
  const onMove = (e) => { px.set(e.clientX - 190); py.set(e.clientY - 150) }
  const shownP = projects.find((p) => p.id === shown)

  return (
    <section className="work" id="work" onMouseMove={reduce ? undefined : onMove}>
      <div className="work-head">
        <h2>Selected work</h2>
        <span className="count num">{String(projects.length).padStart(2, '0')} — fintech · B2B ops · automotive</span>
      </div>
      <div className={`worklist${active ? ' has-hover' : ''}`}>
        {projects.map((p) => (
          <div className="wrow" key={p.id} data-cursor="OPEN"
            onMouseEnter={() => { setActive(p.id); setShown(p.id) }}
            onMouseLeave={() => setActive((a) => (a === p.id ? null : a))}
            onClick={() => navigate(`/work/${p.id}`)}>
            <span className="w-no">P-{p.no}</span>
            <h3 className="w-name">{p.name}</h3>
            <span className="w-tags">{p.tags}</span>
            <span className="w-go">View →</span>
          </div>
        ))}
      </div>
      <motion.div className="work-preview" style={{ x: sx, y: sy }}
        animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.92 }} transition={{ duration: 0.4, ease: EO }}>
        {shownP && <img src={shownP.cover} alt={shownP.name} draggable="false" />}
      </motion.div>
    </section>
  )
}

function Marquee() {
  const row = [...KEYWORDS, ...KEYWORDS]
  return (
    <section className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {row.map((k, i) => (
          <span key={i} className={i % 3 === 1 ? 'fill' : ''}>{k}<b style={{ marginLeft: 50 }}>✦</b></span>
        ))}
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="section" id="about">
      <div className="wrap about-grid">
        <RevealText as="h2" className="about-lead"
          text="I like the boring parts most people skip. Error states. Empty screens. The exact moment someone decides whether to trust an app with their money." />
        <Reveal className="about-side" delay={0.1}>
          {about.blocks.map((b) => (
            <div key={b.h}>
              <div className="ab-k">{b.h}</div>
              {b.p && <p>{b.p}</p>}
              {b.tags && <div className="tags">{b.tags.map((t) => <span key={t}>{t}</span>)}</div>}
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

function Contact() {
  const mag = useMagnetic(0.18)
  return (
    <>
      <section className="contact" id="contact">
        <Reveal>
          <div className="c-big">
            <motion.a ref={mag.ref} onMouseMove={mag.onMouseMove} onMouseLeave={mag.onMouseLeave} style={{ x: mag.x, y: mag.y }}
              href={`mailto:${identity.email}`} data-cursor="WRITE">Let’s<br />build <span className="g">good.</span></motion.a>
          </div>
        </Reveal>
        <div className="c-row">
          <a href={`mailto:${identity.email}`} data-cursor="WRITE">{identity.email}</a>
          <a href={identity.linkedin} target="_blank" rel="noopener" data-cursor="OPEN">LinkedIn ↗</a>
          <a href="#top">Back to top ↑</a>
        </div>
      </section>
      <footer className="foot">
        <span>© 2026 Kannal Umayan</span>
        <span>Designed &amp; built from scratch</span>
        <span>Bengaluru, India</span>
      </footer>
    </>
  )
}

export default function Home() {
  return (
    <div id="top">
      <Hero />
      <Manifesto />
      <Work />
      <Marquee />
      <About />
      <Contact />
    </div>
  )
}
