// ─────────────────────────────────────────────────────────────────────────
// Single source of truth. Frames are sized from REAL image dimensions
// (dims.json, generated from the PNG/JPEG headers) so nothing is squashed.
// ─────────────────────────────────────────────────────────────────────────
import dims from './dims.json'

export const identity = {
  name: 'Kannal Umayan',
  role: 'Product Designer',
  place: 'Bengaluru, India',
  kicker: 'PRODUCT DESIGNER · BENGALURU, INDIA',
  titleA: 'I design apps people',
  titleB: 'trust with their',
  titleSerif: 'money.',
  sub: "I'm the only designer at Compound, a fintech company in Bengaluru. I've shipped two of their products start to finish, and I built the design systems behind them. I used to write code, so I think about how things get built, not just how they look.",
  email: 'kannal2242@gmail.com',
  linkedin: 'https://www.linkedin.com/in/kannal-umayan-809120235',
}

export const approach = [
  { no: 'A', h: 'I know how it gets built', p: 'Testing taught me how software breaks. Writing it taught me how it’s put together. So I design the states people skip, like errors and empty screens, and I don’t ask engineers for things that can’t ship.' },
  { no: 'B', h: 'Trust is the funnel', p: 'In a money app, people stop when they get nervous. So I spend most of my time on the scary moments, like linking a bank or making a first deposit, and make them feel safe before I ask for anything.' },
  { no: 'C', h: 'One system, not fifty screens', p: 'I’d rather build one set of components everyone reuses than redraw the same thing fifty times. It keeps the whole product feel like it came from one place.' },
]

export const about = {
  lead: 'I came into design from engineering, and I like the boring parts most people skip: error states, empty screens, and the exact moment someone decides whether to trust an app with their money.',
  blocks: [
    { h: 'Currently', p: 'The only product designer at Compound. I own two live financial products from research through launch, and everything after.' },
    { h: 'Toolkit', tags: ['Figma', 'Prototyping', 'Design systems', 'Webflow', 'HTML/CSS/JS', '.NET background', 'Motion', 'User research'] },
    { h: 'Looking for', p: 'A senior product role on a team that cares about craft and actually ships to real users.' },
  ],
}

// humanize a filename into a caption
function cap(file, project) {
  let s = file.replace(/\.(png|jpg|jpeg)$/i, '')
  s = s.replace(new RegExp(`^${project}-?`), '')
  s = s.replace(/-/g, ' ').replace(/\b(ui|ira|idv|cs|cpro|acpro)\b/gi, (m) => m.toUpperCase())
  s = s.replace(/\b(mobile|desktop|hifi|lofi|alt)\b/g, '').trim()
  return s.charAt(0).toUpperCase() + s.slice(1) || project
}

function frame(file, project, label) {
  const d = dims[file] || { w: 1200, h: 800, ar: 1.5 }
  const ar = d.ar || 1.5
  // kind drives the on-canvas frame width; height follows the real ratio
  let kind = 'card', w = 360
  if (ar < 0.6) { kind = 'phone'; w = 232 }
  else if (ar < 1.25) { kind = 'card'; w = 360 }
  else if (ar < 1.9) { kind = 'wide'; w = 600 }
  else { kind = 'pano'; w = 760 }
  return { src: `/images/${file}`, kind, w, h: Math.round(w / ar), ar, dim: `${d.w} × ${d.h}`, caption: label || cap(file, project) }
}

// build a project's grouped frames
function build(project, groups) {
  return groups.map((g) => ({
    ...g,
    frames: g.files.map((f) => (Array.isArray(f) ? frame(f[0], project, f[1]) : frame(f, project))),
  }))
}

export const projects = [
  {
    id: 'creb', no: '01', accent: '#2C5F7C', accent2: '#E2E8EC',
    name: 'Compound Real Estate Bonds',
    short: 'Real Estate Bonds',
    tags: 'Consumer fintech, Compound, since 2024',
    line: 'I rebuilt the whole CREB experience: signing up, verifying ID, buying bonds, taking money out, the reports, and the design system that ties it all together.',
    cover: '/images/creb-r-dashboard-web.png',
    coverFrame: 'browser', coverUrl: 'app.compoundbanc.com',
    metrics: [
      { v: '2,000', k: 'active investors', sub: 'from 400' },
      { v: '$4M', k: 'value held', sub: 'from $400k' },
      { v: '~70%', k: 'conversion lift', sub: '' },
    ],
    groups: build('creb', [
      { key: 'overview', title: 'Overview', blurb: 'The shipped product, end to end.', files: [['creb-f-howitworks.png', 'How CREB works'], ['creb-r-autorecur.png', 'Auto-investment plan'], ['creb-r-reinvest.png', 'Reinvesting earnings']] },
      { key: 'trust', title: 'Onboarding & trust', blurb: 'Identity, bank, and security, each explained before it asks.', files: [['creb-f-idv.png', 'Identity check, Plaid IDV'], ['creb-f-plaid-bank.png', 'Link a bank, Plaid'], ['creb-f-2fa.png', 'Two-factor authentication'], ['creb-f-verified.png', 'Verified account']] },
      { key: 'invest', title: 'Invest & redeem', blurb: 'Deposit funds, buy bonds, watch interest compound.', files: [['creb-r-purchase.png', 'Purchase bonds'], ['creb-r-deposits.png', 'Deposit funds'], ['creb-f-purchase-success.png', 'Purchase confirmed']] },
      { key: 'withdraw', title: 'Withdraw, every state', blurb: 'Request, success, failure. The states most people skip.', files: [['creb-r-withdraw.png', 'Withdraw'], ['creb-r-withdraw-success.png', 'Withdrawal successful'], ['creb-r-withdraw-failed.png', 'Withdrawal failed']] },
      { key: 'system', title: 'System & flows', blurb: 'The map behind the screens.', files: [['creb-user-flow.png', 'End-to-end user flow'], ['creb-sitemap.png', 'Sitemap'], ['creb-wireframe-labeled.png', 'Annotated wireframes']] },
    ]),
  },
  {
    id: 'cgb', no: '02', accent: '#A24A33', accent2: '#F2E5E0',
    name: 'Compound Gold Bonds',
    short: 'Gold Bonds',
    tags: 'Premium fintech, Compound, 2025',
    line: 'A gold-bond product for serious investors. New brand, every screen built from scratch, done in three months.',
    cover: '/images/cgb-f-bonds.png',
    coverFrame: 'browser', coverUrl: 'gold.compoundbanc.com',
    compare: { before: '/images/cgb-wireframe-hifi.png', after: '/images/cgb-screen-dashboard.png' },
    metrics: [
      { v: '3 mo', k: 'brand to ship', sub: 'solo' },
      { v: '1', k: 'design system', sub: 'from scratch' },
      { v: '100%', k: 'screens custom', sub: '' },
    ],
    groups: build('cgb', [
      { key: 'overview', title: 'Overview', blurb: 'A calmer, premium register for gold.', files: [['cgb-f-bonds.png', 'Gold bonds dashboard'], ['cgb-f-bond-detail.png', 'Bond detail']] },
      { key: 'buy', title: 'Buy & customize', blurb: 'Shape an investment, review terms, then confirm with confidence.', files: [['cgb-f-buy.png', 'Buy gold bonds'], ['cgb-f-terms.png', 'Review and accept terms'], ['cgb-f-success.png', 'Purchase confirmed']] },
      { key: 'trust', title: 'Accreditation & banking', blurb: 'Self-accreditation, banking, and verification, made reassuring.', files: [['cgb-f-accreditation.png', 'Self-accreditation'], ['cgb-f-networth.png', 'Net-worth qualification'], ['cgb-f-verified.png', 'Accreditation verified'], ['cgb-f-deposits.png', 'Deposits and banking']] },
      { key: 'system', title: 'Brand & system', blurb: 'The logo, the kit, the rules.', files: [['cgb-logo.png', 'Logo'], ['cgb-ui-kit.png', 'UI kit'], ['cgb-design-system.png', 'Design system']] },
    ]),
  },
  {
    id: '3eco', no: '03', accent: '#3D6B4E', accent2: '#E4ECE6',
    name: '3Eco: one platform, four users',
    short: 'one platform, four users',
    tags: 'B2B operations, Fibonalabs',
    line: 'Delivery software with four very different users. Instead of one screen for everyone, I gave each role exactly what their job needs.',
    cover: '/images/eco-r-1.png',
    metrics: [
      { v: '4', k: 'distinct roles', sub: 'one platform' },
      { v: '1', k: 'shared system', sub: '' },
      { v: 'B2B', k: 'operations', sub: 'Fibonalabs' },
    ],
    groups: build('3eco', [
      { key: 'overview', title: 'Overview', blurb: 'One platform, tuned per role.', files: [['eco-r-1.png', 'Revenue console, CS view']] },
      { key: 'revenue', title: 'Revenue console', blurb: 'Add, edit, complete. Dense surfaces for power users.', files: [['eco-r-2.png', 'Revenue, multi-step entry'], ['eco-r-6.png', 'Revenue summary']] },
      { key: 'roles', title: 'Role surfaces', blurb: 'Each role gets a surface tuned to its day.', files: [['eco-r-4.png', 'Role surface'], ['eco-r-5.png', 'Role surface']] },
    ]),
  },
  {
    id: 'ola', no: '04', accent: '#9A6A24', accent2: '#F0E8D8',
    name: 'Ola: read at 60 km/h',
    short: 'read at 60 km/h',
    tags: 'Automotive UI, Ola',
    line: 'The screen on an electric scooter. You only get half a second to read it while riding, so I put speed and range first and pushed everything else out of the way.',
    cover: '/images/ola-r-ready.png',
    metrics: [
      { v: '0.5s', k: 'glance budget', sub: 'at speed' },
      { v: '2', k: 'numbers first', sub: 'speed, range' },
      { v: 'HMI', k: 'cluster UI', sub: 'Ola' },
    ],
    groups: build('ola', [
      { key: 'cluster', title: 'The cluster', blurb: 'Ready and parked. Speed and range own the screen.', files: [['ola-r-ready.png', 'Cluster, ready'], ['ola-r-park.png', 'Cluster, parked']] },
      { key: 'settings', title: 'Settings', blurb: 'Display, sound, bluetooth, reachable and never in the way.', files: [['ola-r-display.png', 'Display settings'], ['ola-r-sound.png', 'Sound settings'], ['ola-r-bt.png', 'Bluetooth']] },
      { key: 'secure', title: 'Security & modals', blurb: 'Passcode and interrupts, sized for a glance.', files: [['ola-r-passcode.png', 'Passcode'], ['ola-r-modal.png', 'Interrupt modal']] },
    ]),
  },
]

export const byId = Object.fromEntries(projects.map((p) => [p.id, p]))
