// All portfolio content lives here. Nodes + detail panels read from this.
// Images resolve from /public/images (served at /images/...).

export const identity = {
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
  { no: 'C', h: 'One system, not fifty screens', p: 'I’d rather build one set of components everyone reuses than redraw the same thing fifty times. It keeps the whole product feeling like it came from one place.' },
]

export const about = {
  lead: 'I came into design from engineering, and I like the boring parts most people skip: error states, empty screens, and the exact moment someone decides whether to trust an app with their money.',
  blocks: [
    { h: 'Currently', p: 'The only product designer at Compound. I own two live financial products from research through launch, and everything after.' },
    { h: 'Toolkit', tags: ['Figma', 'Prototyping', 'Design systems', 'Webflow', 'HTML/CSS/JS', '.NET background', 'Motion', 'User research'] },
    { h: 'Looking for', p: 'A senior product role on a team that cares about craft and actually ships to real users.' },
  ],
}

export const projects = [
  {
    id: 'creb',
    no: '01',
    name: 'Compound Real Estate Bonds',
    tags: 'Consumer fintech · Compound · since 2024',
    line: 'I rebuilt the whole CREB experience: signing up, verifying ID, buying bonds, taking money out, the reports, and the design system that ties it all together.',
    cover: 'images/creb-hero.png',
    href: 'creb.html',
    metrics: [
      { v: '2,000', k: 'active investors', sub: 'from 400' },
      { v: '$4M', k: 'value held', sub: 'from $400k' },
      { v: '~70%', k: 'conversion lift', sub: '' },
    ],
    shots: [
      'images/creb-dashboard-desktop.png',
      'images/creb-light-dashboard.png',
      'images/creb-screen-bonds.png',
      'images/creb-screen-buy-bonds.png',
      'images/creb-screen-calculator.png',
      'images/creb-withdraw-desktop.png',
      'images/creb-screen-plaid-idv.png',
      'images/creb-user-flow.png',
      'images/creb-wireframe-labeled.png',
      'images/creb-sitemap.png',
    ],
  },
  {
    id: 'cgb',
    no: '02',
    name: 'Compound Gold Bonds',
    tags: 'Premium fintech · Compound · 2025',
    line: 'A gold-bond product for serious investors. New brand, every screen built from scratch, done in three months.',
    cover: 'images/cgb-hero.png',
    href: 'cgb.html',
    compare: { before: 'images/cgb-wireframe-hifi.png', after: 'images/cgb-screen-dashboard.png' },
    shots: [
      'images/cgb-screen-dashboard.png',
      'images/cgb-screen-buy-bonds.png',
      'images/cgb-screen-calculator.png',
      'images/cgb-screen-customize-invest.png',
      'images/cgb-screen-plaid-trust.png',
      'images/cgb-ui-kit.png',
      'images/cgb-design-system.png',
      'images/cgb-user-flow.png',
      'images/cgb-sitemap.png',
    ],
  },
  {
    id: '3eco',
    no: '03',
    name: '3Eco: one platform, four users',
    tags: 'B2B operations · Fibonalabs',
    line: 'Delivery software with four very different users. Instead of one screen for everyone, I gave each role exactly what their job needs.',
    cover: 'images/3eco-hero.png',
    href: '3eco.html',
    roles: ['Coordinator', 'Driver', 'Compliance', 'Admin'],
    shots: [
      'images/3eco-hero.png',
      'images/3eco-cs-revenue-complete.png',
      'images/3eco-cs-revenue-add.png',
      'images/3eco-cs-revenue-edit.png',
      'images/3eco-cpro-checklist.png',
      'images/3eco-acpro-timeline.png',
      'images/3eco-penalty-admin.png',
    ],
  },
  {
    id: 'ola',
    no: '04',
    name: 'Ola: read at 60 km/h',
    tags: 'Automotive UI · Ola',
    line: 'The screen on an electric scooter. You only get half a second to read it while riding, so I put speed and range first and pushed everything else out of the way.',
    cover: 'images/ola-home-ready.png',
    href: 'ola.html',
    shots: [
      'images/ola-home-ready.png',
      'images/ola-home-park.png',
      'images/ola-settings-display.png',
      'images/ola-settings-sound.png',
      'images/ola-settings-bluetooth.png',
      'images/ola-passcode.png',
      'images/ola-modals.png',
    ],
  },
]
