KANNAL UMAYAN — Portfolio
=========================

An infinite-canvas portfolio. The whole site IS a pannable, zoomable
drafting-table file. No scroll view.

DESIGN — "Vellum Spec"
----------------------
Warm bone-vellum paper, a cool slate-blue blueprint grid, graphite ink, and
one earthen pen per project (slate / terracotta / green / ochre). Instrument
Serif for display, Inter Tight for reading, JetBrains Mono for the instrument
layer (dimensions, plate numbers, HUD). Engineering title block on every
board, museum labels under every frame, dimension callouts that appear on
zoom-in (semantic zoom), registration marks, and a true dark "blueprint
negative" toggle. Motion is transform/opacity only, ease-out, no bounce.
Design tokens and rules came from an art-direction workflow (3 directions,
judged, then a taste + contrast critic).

RUN
---
  npm install
  npm run dev        # http://localhost:5173
  npm run build      # -> dist/  (Vercel auto-detects Vite)

STACK
-----
Vite + React 18, @xyflow/react (canvas), framer-motion (motion), react-router.

  src/routes/Overview.jsx   index sheet: identity, four project plates, about, contact
  src/routes/CaseBoard.jsx  /work/:id — chapter-driven case board (spine + frame lanes)
  src/nodes/                node types (identity/plate, frame/story/steps/impact/hero)
  src/components/Spec.jsx    HUD, engineering title block, dark toggle
  src/components/ParallaxBg  registration marks in the canvas plane
  src/lib/FastZoom.jsx       Figma-speed pinch / ctrl-wheel zoom toward cursor
  src/lib/flowProps.js       trackpad controls (two-finger pan, pinch zoom)
  src/data/projects.js       project meta + frames (sized from real dims.json)
  src/data/caseStudies.js    full written case studies, keyed by id

Deploy: push to Vercel. Build = vite build, output = dist. SPA rewrite for
/work/:id in vercel.json.
