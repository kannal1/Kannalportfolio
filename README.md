KANNAL UMAYAN — Portfolio
=========================

Two front doors, one body of work.

HOME — infinite canvas (React)
------------------------------
A Figma-style board: pan, zoom, drag. Identity node wired to four project
frames; click a frame to zoom in and open a detail panel (full screen gallery,
metrics, CGB drag-compare slider) that deep-links to the full case study.

  npm install
  npm run dev        # http://localhost:5173
  npm run build      # -> dist/  (Vercel auto-detects Vite)

Stack: Vite + React 18, @xyflow/react (canvas), framer-motion (motion).
Motion rules (Emil Kowalski / Impeccable / Taste): transform+opacity only,
ease-out enters, faster exits, no bounce/elastic, prefers-reduced-motion honored.

  src/App.jsx          board layout, edges, intro, chrome, zoom-to-frame
  src/nodes/Nodes.jsx  node types (identity/project/approach/about/contact)
  src/DetailPanel.jsx  slide-in case panel + drag-compare slider
  src/Cursor.jsx       labeled cursor
  src/data/projects.js ALL content (copy, images, metrics) — edit here

SCROLL SITE — original (vanilla, no build)
-------------------------------------------
Preserved at /scroll.html with the four case studies (creb/cgb/3eco/ola.html).
Vanilla HTML/CSS/JS, three.js + Lenis vendored. Reachable from the canvas
"Scroll view" chip. All assets live in /public.

Deploy: push to Vercel. Build = `vite build`, output = `dist`. cleanUrls on.
