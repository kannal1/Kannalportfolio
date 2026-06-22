import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { motion, useScroll } from 'framer-motion'
import Home from './routes/Home'
import CaseStudy from './routes/CaseStudy'
import Nav from './components/Nav'
import LoadGate from './components/LoadGate'
import { EnterContext } from './lib/enter'
import { useLenis } from './lib/useLenis'

function Progress() {
  const { scrollYProgress } = useScroll()
  return <motion.div className="progress" style={{ scaleX: scrollYProgress, width: '100%' }} />
}

function ScrollManager({ lenisRef }) {
  const { pathname } = useLocation()
  useEffect(() => {
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true })
    window.scrollTo(0, 0)
  }, [pathname, lenisRef])
  return null
}

function Shell() {
  const lenisRef = useLenis()
  const location = useLocation()
  const [entered, setEntered] = useState(false)

  // Lenis is created stopped; release it only once the gate lifts.
  useEffect(() => {
    if (entered && lenisRef.current) {
      lenisRef.current.start()
      lenisRef.current.scrollTo(0, { immediate: true })
    }
  }, [entered, lenisRef])

  return (
    <EnterContext.Provider value={entered}>
      <div className="vignette" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <Nav />
      <Progress />
      <ScrollManager lenisRef={lenisRef} />
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/work/:id" element={<CaseStudy />} />
        <Route path="*" element={<Home />} />
      </Routes>
      {!entered && <LoadGate onDone={() => setEntered(true)} />}
    </EnterContext.Provider>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  )
}
