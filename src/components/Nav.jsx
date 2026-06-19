import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Nav() {
  const navigate = useNavigate()
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
      <button className="n-id" onClick={() => navigate('/')} data-cursor="TOP">KU</button>
      <div className="n-right">
        <a className="n-link" href="#work">Work</a>
        <a className="n-link" href="#about">About</a>
        <a className="n-link" href="mailto:kannal2242@gmail.com" data-cursor="WRITE">Contact</a>
        <span className="n-clock">BLR {clock}</span>
      </div>
    </nav>
  )
}
