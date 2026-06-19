import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Overview from './routes/Overview'
import CaseBoard from './routes/CaseBoard'
import Cursor from './components/Cursor'

// vermilion wipe that sweeps on every route change
function Wipe() {
  const { pathname } = useLocation()
  return (
    <AnimatePresence>
      <motion.div key={pathname} className="wipe" aria-hidden="true"
        initial={{ scaleY: 1 }} animate={{ scaleY: 0 }} exit={{ scaleY: 0 }}
        transition={{ duration: 0.6, ease: [0.7, 0, 0.2, 1] }} style={{ transformOrigin: 'bottom' }} />
    </AnimatePresence>
  )
}

function Intro({ onDone }) {
  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches
    const t = setTimeout(onDone, reduce ? 200 : 2100)
    return () => clearTimeout(t)
  }, [onDone])
  return (
    <motion.div className="intro" onClick={onDone}
      initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}>
      <div className="i-id">KANNAL UMAYAN — PRODUCT DESIGNER</div>
      <motion.div className="i-big" initial={{ y: 26, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
        The work, on an<br />infinite <span className="serif">canvas.</span>
      </motion.div>
      <div className="i-row"><span>BENGALURU, INDIA</span><span>ENTERING BOARD…</span></div>
    </motion.div>
  )
}

function Shell() {
  const location = useLocation()
  const [intro, setIntro] = useState(true)
  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Cursor />
      <Wipe />
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Overview />} />
        <Route path="/work/:id" element={<CaseBoard />} />
        <Route path="*" element={<Overview />} />
      </Routes>
      <AnimatePresence>{intro && <Intro key="intro" onDone={() => setIntro(false)} />}</AnimatePresence>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  )
}
