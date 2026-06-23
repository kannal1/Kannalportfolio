import { useRef, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion'
import {
  RevealText, Reveal, ParallaxImage, ScrubWords, CountUp, useMagnetic,
} from '../components/Motion'
import BrowserFrame from '../components/BrowserFrame'
import { EnterContext } from '../lib/enter'
import { projects, identity, about } from '../data/projects'
import { EO } from '../lib/motion'

const KEYWORDS = ['Fintech', 'Design Systems', '0 to 1 Products', 'Trust', 'B2B Platforms', 'Motion', 'Engineer-minded']

const STATS = [
  { v: '2,000', k: 'active investors, up from 400' },
  { v: '$4M', k: 'in value held, up from $400k' },
  { v: '~70%', k: 'conversion lift across the journey' },
]

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const entered = useContext(EnterContext)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0])
  const lift = useTransform(scrollYProgress, [0, 1], [0, -90])

  const line = {
    hidden: { y: '116%' },
    visible: (i) => ({ y: '0%', transition: { duration: reduce ? 0.3 : 1.1, ease: EO, delay: reduce ? 0 : 0.05 + i * 0.12 } }),
  }
  const stage = (delay) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 22 },
    animate: entered ? { opacity: 1, y: 0 } : (reduce ? { opacity: 0 } : { opacity: 0, y: 22 }),
    transition: { duration: reduce ? 0.3 : 0.85, ease: EO, delay: reduce ? 0 : delay },
  })

  return (
    <header className="hero" ref={ref}>
      <div className="hero-aura" aria-hidden="true" />

      <motion.div className="hero-inner" style={{ opacity: fade, y: reduce ? 0 : lift }}>
        <motion.div className="hero-eyebrow" {...stage(0.02)}>
          Product Designer <b>/</b> Bengaluru <b>/</b> Available 2026
        </motion.div>

        <motion.h1 className="hero-name" initial="hidden" animate={entered ? 'visible' : 'hidden'}>
          <span className="ln" style={{ overflow: 'hidden', display: 'block' }}>
            <motion.span style={{ display: 'inline-block' }} custom={0} variants={line}>Kannal</motion.span>
          </span>
          <span className="ln" style={{ overflow: 'hidden', display: 'block' }}>
            <motion.span className="out" style={{ display: 'inline-block' }} custom={1} variants={line}>Umayan</motion.span>
          </span>
        </motion.h1>

        <div className="hero-row">
          <motion.div className="hero-thesis" {...stage(0.55)}>
            Clarity people trust with their <span className="accent">money.</span>
          </motion.div>
          <motion.div className="hero-aside" {...stage(0.68)}>
            <p>The only designer at Compound, where I shipped two live fintech products and the systems behind them. Engineer turned designer: I render complexity legible.</p>
            <div className="hero-meta">
              <span>Now<b>Compound</b></span>
              <span>Discipline<b>Product, end to end</b></span>
              <span>Before<b>.NET engineer</b></span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </header>
  )
}

function Statement() {
  return (
    <section className="stm">
      <div className="wrap">
        <div className="stm-k">The thesis</div>
        <ScrubWords className="stm-words"
          text="I came to design from engineering. That is why my handoffs hold, and why I design the states people skip: the errors, the empty screens, the moment someone decides to trust an app with their money." />
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="stats">
      <div className="wrap stats-grid">
        {STATS.map((s, i) => (
          <Reveal key={s.k} className="stat" delay={i * 0.08}>
            <div className="stat-v"><CountUp value={s.v} /></div>
            <div className="stat-k">{s.k}</div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function WorkProject({ p }) {
  const navigate = useNavigate()
  const reduce = useReducedMotion()
  return (
    <motion.div className="wproj" onClick={() => navigate(`/work/${p.id}`)}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 56, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.2 }} transition={{ duration: reduce ? 0.35 : 0.9, ease: EO }}>
      <div className="wproj-top">
        <div className="wproj-lead">
          <span className="wproj-no">P-{p.no}</span>
          <h3 className="wproj-name">{p.name}</h3>
        </div>
        <div className="wproj-right">
          <span className="wproj-tags">{p.tags}</span>
          <p className="wproj-line">{p.line}</p>
          <span className="wproj-go">View case study <Arrow /></span>
        </div>
      </div>
      <div className="wproj-media">
        {p.coverFrame === 'browser'
          ? <BrowserFrame url={p.coverUrl}><ParallaxImage src={p.cover} alt={`${p.name}, shipped product`} depth={8} /></BrowserFrame>
          : <ParallaxImage src={p.cover} alt={`${p.name}, shipped product`} depth={8} />}
      </div>
    </motion.div>
  )
}

function Work() {
  return (
    <section className="work" id="work">
      <div className="wrap">
        <div className="work-head">
          <RevealText as="h2" text="Selected work" />
          <Reveal className="wc" delay={0.1}>Four projects<br />2024 to 2026</Reveal>
        </div>
        <div className="wprojs">
          {projects.map((p) => <WorkProject key={p.id} p={p} />)}
        </div>
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
          <span key={i} className={i % 2 ? 'dim' : ''}>{k}<b>/</b></span>
        ))}
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="about" id="about">
      <div className="wrap about-grid">
        <RevealText className="about-lead"
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
  const mag = useMagnetic(0.16)
  return (
    <>
      <section className="contact" id="contact">
        <div className="wrap">
          <Reveal>
            <div className="contact-k">Available for senior product roles, 2026</div>
            <motion.a ref={mag.ref} onMouseMove={mag.onMouseMove} onMouseLeave={mag.onMouseLeave} style={{ x: mag.x, y: mag.y }}
              className="contact-big" href={`mailto:${identity.email}`}>
              Let&rsquo;s build <span className="accent">good.</span>
            </motion.a>
            <div><a className="contact-mail" href={`mailto:${identity.email}`}>{identity.email}</a></div>
          </Reveal>
        </div>
      </section>
      <footer className="foot">
        <span>&copy; 2026 Kannal Umayan</span>
        <a href={identity.linkedin} target="_blank" rel="noopener">LinkedIn</a>
        <span>Bengaluru, India</span>
      </footer>
    </>
  )
}

export default function Home() {
  return (
    <div id="top">
      <Hero />
      <Statement />
      <Stats />
      <Work />
      <Marquee />
      <About />
      <Contact />
    </div>
  )
}
