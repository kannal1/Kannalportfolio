import { useViewport } from '@xyflow/react'

// Layered depth that reacts to canvas pan/zoom. Each layer translates at a
// fraction of the viewport pan, so far layers lag near ones → real parallax.
// Rendered as a (fixed-space) child of <ReactFlow>, behind the nodes.
export default function ParallaxBg({ accent = '#FF2E3A' }) {
  const { x, y, zoom } = useViewport()
  const layer = (rate) => ({
    transform: `translate3d(${x * rate}px, ${y * rate}px, 0) scale(${1 + (zoom - 1) * rate * 0.5})`,
  })
  return (
    <div className="pbg" aria-hidden="true">
      {/* faint glow blobs, deepest layer */}
      <div className="pbg-blobs" style={{ ...layer(0.12), '--a': accent }} />
      {/* oversized ghost numerals, mid layer */}
      <div className="pbg-glyphs" style={layer(0.28)}>
        <span style={{ left: '6%', top: '12%' }}>01</span>
        <span style={{ left: '78%', top: '20%' }}>02</span>
        <span style={{ left: '14%', top: '66%' }}>03</span>
        <span style={{ left: '64%', top: '74%' }}>04</span>
      </div>
      {/* hairline crosshair grid, near layer */}
      <div className="pbg-cross" style={layer(0.6)} />
    </div>
  )
}
