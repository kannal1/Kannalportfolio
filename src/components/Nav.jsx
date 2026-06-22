import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useMagnetic } from './Motion'

export default function Nav() {
  const navigate = useNavigate()
  const mag = useMagnetic(0.45)
  const [clock, setClock] = useState('')
  useEffect(() => {
    const tick = () => {
      const t = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' })
      setClock(t)
    }
    tick(); const id = setInterval(tick, 10000)
    return () => clearInterval(id)
  }, [])
  return (
    <nav className="nav">
      <motion.button className="n-id" ref={mag.ref} onMouseMove={mag.onMouseMove} onMouseLeave={mag.onMouseLeave}
        style={{ x: mag.x, y: mag.y }} onClick={() => navigate('/')} data-cursor="TOP">KU</motion.button>
      <div className="n-right">
        <a className="n-link" href="#work">Work</a>
        <a className="n-link" href="#about">About</a>
        <a className="n-link" href="mailto:kannal2242@gmail.com" data-cursor="WRITE">Contact</a>
        <span className="n-clock num">BLR {clock}</span>
      </div>
    </nav>
  )
}
