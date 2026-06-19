import { useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Lightbox({ src, caption, accent, onClose }) {
  useEffect(() => {
    const k = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [onClose])
  return (
    <motion.div className="lightbox" style={{ '--accent': accent }} onClick={onClose} data-cursor="CLOSE"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <motion.figure
        initial={{ scale: 0.94, y: 12, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}>
        <img src={src} alt={caption} />
        <figcaption><span className="lb-dot" />{caption}</figcaption>
      </motion.figure>
      <button className="lb-close" onClick={onClose} aria-label="Close">✕ <span>esc</span></button>
    </motion.div>
  )
}
