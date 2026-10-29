# gpscrypt.me | Geoff Sandoval

Portfolio of a **software developer and aspiring penetration tester**: I build web and mobile apps, then try to break them.

**Live → [gpscrypt.me](https://gpscrypt.me)**

[![gpscrypt.me front page](docs/home-dark.jpg)](https://gpscrypt.me)

<table>
  <tr>
    <td width="72%"><img src="docs/home-light.jpg" alt="Front page in light mode"></td>
    <td width="28%"><img src="docs/home-mobile.jpg" alt="Front page on mobile"></td>
  </tr>
  <tr>
    <td align="center"><sub>Light mode</sub></td>
    <td align="center"><sub>Mobile</sub></td>
  </tr>
</table>

## Featured work

| Project | What it is | Stack |
|---|---|---|
| **Tugon** | Emergency-response platform for Liliw, live at [tugon.live](https://www.tugon.live) | Flutter · FastAPI · PostgreSQL · Redis |
| **Applischo** | Scholarship management: applications, exams, explainable scoring, payouts | Next.js · TypeScript · Supabase |
| **Eterna** | Artisan marketplace with buyer, seller, rider and admin portals | React · Flask · PostgreSQL · Socket.IO |
| **System Administration Portfolio** | Enterprise infrastructure plan and server deployment labs | Ubuntu Server · Windows Server · OpenSSH |

## How this site is built

- **Next.js 16** static export, every word is pre-rendered HTML for SEO (JSON-LD, sitemap, Open Graph)
- **three.js**: orbit rings and a grid floor in the hero that collapse into a wireframe core travelling with the scroll, plus a fly-through corridor of holographic screens behind the story
- **GSAP + ScrollTrigger + Lenis**: kinetic type, a typing terminal, pinned storytelling, 3D card reveals, a pointer-driven ghost trail, smooth scroll
- **Light & dark mode**: every colour is a theme token; the 3D scenes recolour live
- **Fast on phones**: lower 3D resolution and particle counts, no per-frame blur or blend effects; falls back gracefully when WebGL is unavailable
- **GitHub Actions → GitHub Pages** on a custom domain

## Security

- Static hosting only: no server, database or form backend to attack
- Subresource Integrity hashes on every CDN script
- Least-privilege CI token (read code, write Pages)
- Lockfile-pinned dependencies installed with `npm ci`

## Run locally

```bash
npm ci
npm run dev      # http://localhost:3000
npm run build    # static site in out/
```

All text, projects and stats live in [`app/site.js`](app/site.js).
