// Trackpad-friendly canvas controls (Figma/tldraw style):
//   two-finger drag  → pan      (panOnScroll)
//   pinch            → zoom     (zoomOnPinch)
//   ctrl/⌘ + scroll  → zoom     (handled as pinch by react-flow)
// Plain wheel-zoom is OFF so a laptop trackpad never jumps while panning.
export const flowProps = {
  panOnScroll: true,
  panOnScrollSpeed: 0.5,
  zoomOnScroll: false,
  zoomOnPinch: false, // handled by <FastZoom/> for Figma-speed zoom
  zoomOnDoubleClick: false,
  preventScrolling: true,
  panOnDrag: true,
  minZoom: 0.06,
  maxZoom: 2.6,
  proOptions: { hideAttribution: true },
  nodesConnectable: false,
}
