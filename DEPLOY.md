# Deploying this portfolio

This is a plain static website - HTML, CSS, JS, images, videos. No build step,
no framework, no server code. Any static host will serve it. Below are three
ways to get it live, easiest first.

## What's in this folder

```
index.html        homepage (cinematic horizontal showcase)
creb.html         CREB case study
cgb.html          CGB case study
3eco.html         3Eco case study
ola.html          Ola Scooter side project
play.html         motion / video pieces
resume.html       styled resume
resume-plain.html ATS-friendly resume
parallax.js      shared scroll effects
images/           35 image files (screenshots, posters)
videos/           3 motion clips for the play page
netlify.toml      config for Netlify (clean URLs + caching)
vercel.json       config for Vercel
_redirects        config for Cloudflare Pages / Netlify
```

**The single most important rule:** all of these files must stay TOGETHER in
the same folder when you upload. The homepage links to `creb.html`, which links
to `cgb.html`, and so on - they find each other by sitting side by side. If
`index.html` ends up in one place and `creb.html` in another, you get the
"origin returned error code" / 404 you saw before. That error means the host
couldn't find the file - almost always because not everything got uploaded
together.

---

## Option A - Netlify Drop (no account setup, ~60 seconds)

1. Go to https://app.netlify.com/drop
2. Open this `kannal-portfolio` folder on your computer.
3. Select ALL the files inside it (Ctrl/Cmd+A) - not the folder, the contents.
4. Drag them onto the Netlify Drop page.
5. Wait for upload. Netlify gives you a live URL like
   `random-name-123.netlify.app`.
6. Click any project card - it should open the case study. No error.

To use your own name: in the site settings, rename the site or add a custom
domain.

---

## Option B - Vercel

1. Install the Vercel CLI: `npm i -g vercel` (needs Node.js).
2. In a terminal, `cd` into this folder.
3. Run `vercel` and follow the prompts (accept defaults).
4. It deploys and prints a live URL.

Or use the Vercel dashboard: New Project → import → drag the folder contents.

---

## Option C - GitHub Pages

1. Create a new GitHub repository.
2. Upload ALL files from this folder to the repo root (keep `images/` and
   `videos/` as folders).
3. Repo Settings → Pages → Source: "Deploy from a branch" → branch `main`,
   folder `/ (root)` → Save.
4. Wait a minute; your site appears at
   `https://yourusername.github.io/reponame/`.

Note: on GitHub Pages the clean-URL configs above don't apply, so links keep
their `.html` (which is fine - they're written that way).

---

## If you STILL see "origin returned error code" after deploying

It's not the code - it's a file/upload issue on the host. Check, in order:

1. **Did every file upload?** Open the host's file browser or deploy log and
   confirm all 8 `.html` files plus `parallax.js`, `images/`, and
   `videos/` are there at the site root. If `creb.html` is missing, that's the
   404.

2. **Case sensitivity.** Hosts treat `Creb.html` and `creb.html` as different
   files. The links use lowercase. Don't let anything rename them.

3. **Right folder level.** `index.html` must be at the site root, not nested
   inside another folder. If your host shows the site as
   `yoursite.com/kannal-portfolio/index.html`, you uploaded the folder instead
   of its contents - re-upload the contents.

4. **Videos missing.** If the play page shows dark boxes, the `videos/*.mp4`
   files didn't upload (they're larger). Re-upload the `videos/` folder.

Once all files are present at the root, every page opens and every card works.
