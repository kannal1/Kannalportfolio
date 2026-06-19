import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion'
import { Parallax, RevealText, Reveal } from '../components/Motion'
import { projects, identity, about } from '../data/projects'

const EO = [0.16, 1, 0.3, 1]
const KEYWORDS = ['Fintech', 'Design Systems', '0 → 1 Products', 'Motion', 'B2B Platforms', 'Engineer-minded', 'Trust & Money']

function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -160])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 220])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const blobY = useTransform(scrollYProgress, [0, 1], [0, -300])

  // pointer parallax
  const mx = useSpring(0, { stiffness: 60, damping: 20 })
  const my = useSpring(0, { stiffness: 60, damping: 20 })
  useEffect(() => {
    if (reduce) return
    const m = (e) => { mx.set((e.clientX / innerWidth - 0.5) * 40); my.set((e.clientY / innerHeight - 0.5) * 40) }
    addEventListener('pointermove', m); return () => removeEventListener('pointermove', m)
  }, [mx, my, reduce])

  const lineV = {
    hidden: { y: '115%' },
    visible: (i) => ({ y: '0%', transition: { duration: 1, ease: EO, delay: 0.15 + i * 0.12 } }),
  }

  return (
    <header className="hero" ref={ref}>
      <motion.div className="hero-bg" style={{ y: reduce ? 0 : blobY }}>
        <motion.div className="hero-blob a" style={{ x: mx, y: my }} />
        <motion.div className="hero-blob b" style={{ x: useTransform(mx, (v) => -v), y: useTransform(my, (v) => -v) }} />
        <div className="hero-grid" />
      </motion.div>

      <motion.div className="hero-inner" style={{ opacity: fade }}>
        <motion.div className="hero-kicker" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, duration: 0.8 }}>
          <span className="dot" />Product Designer · Bengaluru · Available 2026
        </motion.div>
        <motion.h1 className="hero-name" initial="hidden" animate="visible">
          <span className="ln"><motion.em custom={0} variants={lineV} style={{ y: reduce ? 0 : y1 }}>Kannal</motion.em></span>
          <span className="ln"><motion.em custom={1} variants={lineV} className="stroke" style={{ y: reduce ? 0 : y2 }}>Umayan</motion.em></span>
        </motion.h1>
        <div className="hero-sub">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }}>
            I design apps people trust with their money. The only designer at Compound, where I shipped two live fintech products and the systems behind them.
          </motion.p>
          <motion.span className="scroll-cue" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
            <i />Scroll
          </motion.span>
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
      </div>
    </section>
  )
}

function Work() {
  const navigate = useNavigate()
  const ref = useRef(null)
  const trackRef = useRef(null)
  const reduce = useReducedMotion()
  const [range, setRange] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -range])
  const xs = useSpring(x, { stiffness: 110, damping: 28, mass: 0.4 })

  useEffect(() => {
    const calc = () => { if (trackRef.current) setRange(Math.max(0, trackRef.current.scrollWidth - innerWidth + 48)) }
    calc(); addEventListener('resize', calc); return () => removeEventListener('resize', calc)
  }, [])

  return (
    <section className="work" id="work" ref={ref} style={{ height: `${projects.length * 80 + 50}vh` }}>
      <div className="work-sticky">
        <div className="work-head">
          <h2>Selected work</h2>
          <span className="count">{String(projects.length).padStart(2, '0')} projects · drag-free scroll</span>
        </div>
        <motion.div className="work-track" ref={trackRef} style={{ x: reduce ? 0 : xs }}>
          {projects.map((p) => (
            <article className="panel" key={p.id} onClick={() => navigate(`/work/${p.id}`)} data-cursor="OPEN" style={{ '--accent': p.accent }}>
              <span className="panel-no">{p.no}</span>
              <div className="panel-media">
                <img src={p.cover} alt={p.name} loading="lazy" draggable="false" />
              </div>
              <div className="panel-info">
                <div>
                  <div className="pl">{p.tags}</div>
                  <h3>{p.name}</h3>
                </div>
                <span className="pcta">View case →</span>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
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
  return (
    <>
      <section className="contact" id="contact">
        <Reveal>
          <div className="c-big">
            <a href={`mailto:${identity.email}`} data-cursor="WRITE">Let’s<br />build <span className="g">good.</span></a>
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
