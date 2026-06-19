import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { motion, useScroll } from 'framer-motion'
import Home from './routes/Home'
import CaseStudy from './routes/CaseStudy'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
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
  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Cursor />
      <Nav />
      <Progress />
      <ScrollManager lenisRef={lenisRef} />
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/work/:id" element={<CaseStudy />} />
        <Route path="*" element={<Home />} />
      </Routes>
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
