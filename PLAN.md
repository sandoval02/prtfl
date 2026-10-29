# gpscrypt.me | Cinematic Portfolio Plan

## Website overview
Single-page, scroll-told portfolio for Geoff Sandoval. Next.js static export (SEO: every word is in the HTML), three.js hero, GSAP + ScrollTrigger + Lenis from CDN. Hosted on GitHub Pages at gpscrypt.me.

## Core positioning
**Software Developer · Aspiring Penetration Tester.** "I build software, then I try to break it." Builder and breaker in one person is the hook.

## Brand personality
Calm confidence, night-shift focus, precise. Premium, not "hacker cliché". Few words, huge type.

## Visual direction
Black void (`#050806`), emerald rim light (`#3dffb0`), subtle orange warmth (`#ff7a1a`), off-white type (`#ece9e2`). Film grain over everything. Haze, glow, deep blacks.

## Higgsfield asset generation
Current account is **free**: face-reference images need Basic+, Seedance 2.0 1080p needs Plus (~120 credits per 10 s clip).
Current site uses: Z Image background plates (`void`, `builder`, `lab`) + your real cutout portrait with CSS rim lighting.

When upgraded, generate with `seedance_2_0`, `resolution: 1080p`, `mode: std`, `duration: 10`, `aspect_ratio: 16:9`, `generate_audio: false`, your photo as `image_references`, then set the paths in `app/site.js → videos`:

1. **HERO ORBIT** (`/hero.mp4`): I stand confident in a black-void studio with emerald rim lighting and subtle orange warmth, wearing a black tailored suit. Camera does one slow 360° orbit around me. Cinematic, premium, calm confidence. Haze, film grain.
2. **THE BUILDER** (`/builder.mp4`): I sit at a dark desk at night surrounded by floating holographic screens: code editors, terminals, network maps, security dashboards, glowing emerald with orange accents. Slow cinematic push-in.
3. **THE LAB** (`/lab.mp4`): I walk toward camera down a dark server-room corridor lined with glowing racks and screens of terminals and CTF scoreboards, warm orange light behind me. I stop in a relaxed hero pose. "Welcome to the lab."

## Website structure
1. **Hero**: giant name behind the portrait, three.js orbit rings + rising dust, intro curtain → masked char reveal. On scroll the name splits apart and the portrait recedes.
2. **Animated stats strip**: four count-up numbers (edit real values in `site.js`).
3. **Mission**: one huge sentence; words light up as you scroll.
4. **Three pillars**: Build / Break / Secure.
5. **Story**: Builder plate pinned full-screen; three chapters cross-fade (Student → Builder → Breaker) with a progress line.
6. **Services & community**: big hover rows (emerald fill wipes up) + skill chips.
7. **Featured work**: "Welcome to the lab." Parallax corridor plate, then recruiter-ready case studies (`site.js → projects`): browser-frame screenshot slot (animated placeholder until an image is set) with a shutter-wipe reveal, count-up metrics, tech stack, and Features / Techniques / Security columns.
8. **Final CTA**: velocity-reactive outline marquee + magnetic email button.
9. **Footer**: links + giant `gpscrypt.me` wordmark.

## Visual style guide
| Token | Value |
|---|---|
| Background | `#050806` |
| Text | `#ece9e2` / muted `#8b948f` |
| Accent | emerald `#3dffb0`, orange `#ff7a1a` |
| Lines | `rgba(236,233,226,.12)` |
| Radius | cards 1.25rem, buttons pill |

## Typography
- **Syne 800**: display, uppercase, tight tracking, up to 13rem.
- **Inter**: body.
- **JetBrains Mono**: labels, eyebrows, nav (uppercase, wide tracking).

## Animation direction
Expo-out easing, long durations (1.2–2.6 s), staggered chars. Nothing bounces except the magnetic button release. Scroll-scrubbed motion for anything tied to reading.

## Interaction design
Custom blend-mode cursor that grows on links, magnetic CTA, hover wipes on service rows, card lift + emerald glow, mouse-parallax on the 3D rings.

## Scroll behavior
Lenis smooth scroll on GSAP's ticker (ScrollTrigger stays in sync). Pinned story on ≥900px. Anchor links scroll through Lenis.

## Mobile behavior
No pinning below 900px (chapters stack), grids collapse, cursor off on touch, hero meta trimmed, type sizes clamp to viewport. `prefers-reduced-motion` disables all motion.

## Technical implementation
- `app/site.js`: all content.
- `app/page.js`: semantic, server-rendered sections + JSON-LD Person.
- `app/Motion.js`: CDN scripts + every GSAP/Lenis animation.
- `app/Scene.js`: three.js rings/dust, pauses offscreen.
- `app/globals.css`: style system.
- `.github/workflows/deploy.yml`: build + deploy to Pages on every push (least-privilege token).
- CDN scripts carry Subresource Integrity hashes.
