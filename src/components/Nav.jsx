import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useMagnetic } from './Motion'

export default function Nav() {
  const navigate = useNavigate()
  const mag = useMagnetic(0.4)
  const [shrink, setShrink] = useState(false)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (v) => setShrink(v > 40))

  return (
    <nav className={`nav${shrink ? ' shrink' : ''}`}>
      <motion.button className="n-id" ref={mag.ref} onMouseMove={mag.onMouseMove} onMouseLeave={mag.onMouseLeave}
        style={{ x: mag.x, y: mag.y }} onClick={() => navigate('/')}>Kannal<b>.</b></motion.button>
      <div className="n-right">
        <a className="n-link hide-sm" href="#work">Work</a>
        <a className="n-link hide-sm" href="#about">About</a>
        <a className="n-link" href="mailto:kannal2242@gmail.com">Contact</a>
      </div>
    </nav>
  )
}
