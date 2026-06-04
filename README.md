# Kannal Umayan - Portfolio

Multi-page portfolio site with Work and Play sections. Mobile responsive. Glassmorphism + scroll effects on hero areas. Ready to host.

## File structure

```
portfolio/
├── index.html              ← Homepage (Work grid + Play teaser)
├── creb.html               ← Case Study 1
├── cgb.html                ← Case Study 2
├── 3eco.html               ← Case Study 3
├── play.html               ← Motion & experiments page
├── resume.html             ← Styled resume
├── resume-plain.html       ← ATS-friendly resume
├── parallax.js             <- Shared scroll effects
├── images/                 ← Screen exports + video posters
└── videos/                 ← Compressed motion pieces
```

## What's in the Play page

Three motion design pieces, each embedded as autoplaying muted loop. Videos pause when scrolled off-screen to save bandwidth.

1. **Connected Car Cluster** - automotive UI motion concept
2. **Mountains - Biome Selection** - casual game UI concept
3. **Dynamic Island Pay** - micro-interaction study

Videos already compressed and embedded. No further action needed for Play page.

## Images to export from Figma (Work pages)

Export each at 2x resolution (Retina-ready), save as PNG, drop into `/images/` folder.

### Homepage thumbnails (3 images)
- `creb-card.png` - CREB dashboard mockup
- `cgb-card.png` - CGB onboarding or plan tiers mockup
- `3eco-card.png` - 3Eco CS Revenue or ACPro timeline mockup

### CREB case study (5 images)
- `creb-hero.png` - Wide hero composite
- `creb-dashboard-desktop.png`
- `creb-dashboard-mobile.png`
- `creb-withdraw.png` - composite of withdraw flow
- `creb-daily-interest.png` - mobile cards + desktop table

### CGB case study (5 images)
- `cgb-hero.png` - Wide hero composite
- `cgb-onboarding.png` - All 4 carousel screens
- `cgb-dashboard.png` - Desktop + mobile dashboard
- `cgb-purchase.png` - Purchase wizard composite
- `cgb-withdraw.png` - Withdraw Interest composite

### 3Eco case study (5 images)
- `3eco-hero.png` - Wide hero composite
- `3eco-cs-revenue.png`
- `3eco-cpro-checklist.png`
- `3eco-acpro-timeline.png`
- `3eco-penalty-admin.png`

## How to host this - 5 minute deploy

### Option 1: Netlify Drop (fastest)
1. Go to https://app.netlify.com/drop
2. Drag the entire `portfolio` folder into the browser window
3. Get a live URL instantly

### Option 2: Vercel
1. Go to https://vercel.com/new
2. Drag the folder or connect a GitHub repo
3. Deploy

All free. Netlify Drop is fastest.

## Before you ship

1. **Edit Play page descriptions** if needed - the descriptions are my best draft. Read each and edit any sentence that doesn't match how you'd describe the piece.
2. **Update portfolio URL after launch** - the resume currently links to the local `index.html`; replace the label target with your live domain once deployed.
3. **Verify CGB/3Eco text** - these were drafted from our conversation. Edit anything that doesn't sound like you.
4. **Keep every file together when uploading** - all HTML files, `parallax.js`, `images/`, and `videos/` need to stay at the site root.

That's it. Drag to Netlify Drop and you're live.
