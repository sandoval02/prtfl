'use client';
import Script from 'next/script';

// Subresource Integrity: the browser refuses a file whose hash doesn't match (tampered CDN).
const CDN = [
  ['https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js', 'sha512-NcZdtrT77bJr4STcmsGAESr06BYGE8woZdSdEgqnpyqac7sugNO+Tr4bGwGF3MsnEkGKhU2KL2xh6Ec+BqsaHA=='],
  ['https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js', 'sha512-P2IDYZfqSwjcSjX0BKeNhwRUH8zRPGlgcWl5n6gBLzdi4Y5/0O4zaXrtO4K9TZK6Hn1BenYpKowuCavNandERg=='],
  ['https://cdn.jsdelivr.net/npm/lenis@1.3.4/dist/lenis.min.js', 'sha256-Z/D+DPxnImnO1r8M9EkTyj16YCNaifmpPGb1dnrepyk='],
];

const ready = () => document.documentElement.classList.add('ready');

// Splits text into word (and char) spans for kinetic type. Words stay unbreakable;
// a visually-hidden copy keeps the text readable for screen readers.
function split(el, by = 'char') {
  const text = el.textContent.trim();
  el.textContent = '';
  const out = [];
  text.split(/\s+/).forEach((word, i) => {
    if (i) el.append(' ');
    const w = document.createElement('span');
    w.className = 'word';
    w.setAttribute('aria-hidden', 'true');
    if (by === 'word') {
      w.textContent = word;
      out.push(w);
    } else {
      for (const c of word) {
        const s = document.createElement('span');
        s.className = 'char';
        s.textContent = c;
        w.append(s);
        out.push(s);
      }
    }
    el.append(w);
  });
  const sr = document.createElement('span');
  sr.className = 'sr-only';
  sr.textContent = text;
  el.append(sr);
  return out;
}

function init() {
  const { gsap, ScrollTrigger, Lenis } = window;
  if (!gsap || !ScrollTrigger || !Lenis || window.__motion) return;
  window.__motion = true;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return ready();

  gsap.registerPlugin(ScrollTrigger);
  document.documentElement.classList.add('motion');

  // Smooth scroll driven by GSAP's ticker so ScrollTrigger stays in sync.
  const lenis = new Lenis({ lerp: 0.085 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  document.querySelectorAll('a[href^="#"]').forEach((a) =>
    a.addEventListener('click', (e) => {
      e.preventDefault();
      lenis.scrollTo(a.getAttribute('href') === '#top' ? 0 : a.getAttribute('href'), { duration: 1.6 });
    })
  );

  // Intro (curtain lifts via CSS when .ready lands)
  const nameChars = gsap.utils.toArray('.hero-name .line').flatMap((l) => split(l));
  gsap.timeline({ delay: 0.55, defaults: { ease: 'expo.out', duration: 1.6 } })
    .from('.hero-bg > *', { scale: 1.3, opacity: 0, duration: 2.6 })
    .from(nameChars, { yPercent: 115, rotate: 6, stagger: 0.035 }, 0.2)
    .from('.hero-me img', { opacity: 0, y: 120, scale: 1.1, duration: 2.2 }, 0.35)
    .from('.hero-me', { '--blur': '40px', duration: 2.6 }, 0.35)
    .from('.scene', { opacity: 0, duration: 2 }, 0.8)
    .from('.hero-meta > *, .nav > *', { opacity: 0, y: 24, stagger: 0.08 }, 1.1);
  ready();

  // Hero exit: name splits apart, portrait recedes
  gsap.timeline({ scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } })
    .to('.hero-name .line:first-child', { xPercent: -25 }, 0)
    .to('.hero-name .line:last-child', { xPercent: 25 }, 0)
    .to('.hero-me', { yPercent: 18, scale: 0.86, filter: 'blur(8px)', opacity: 0.3 }, 0)
    .to('.hero-bg', { scale: 1.15, opacity: 0.4 }, 0);

  // Big headings: chars flip up in 3D out of their word masks
  gsap.utils.toArray('.kinetic').forEach((h) =>
    gsap.from(split(h), {
      yPercent: 110, rotationX: -90, transformOrigin: '50% 100%', transformPerspective: 600,
      stagger: 0.025, duration: 1.2, ease: 'expo.out',
      scrollTrigger: { trigger: h, start: 'top 85%' },
    })
  );

  // Mission paragraph tilts upright as it scrolls in
  gsap.fromTo('.scrub-words', { rotationX: 30, transformPerspective: 1000, transformOrigin: '50% 100%' }, {
    rotationX: 0, ease: 'none', scrollTrigger: { trigger: '.mission', start: 'top bottom', end: 'center center', scrub: true },
  });

  // Pillars fold down like cards
  gsap.from('.pillar', {
    rotationX: -80, y: 60, opacity: 0, transformOrigin: '50% 0%', transformPerspective: 900,
    stagger: 0.15, duration: 1.4, ease: 'expo.out',
    scrollTrigger: { trigger: '.pillar-grid', start: 'top 85%' },
  });

  // Mission: words light up as you scroll
  gsap.utils.toArray('.scrub-words').forEach((p) =>
    gsap.fromTo(split(p, 'word'), { opacity: 0.12 }, {
      opacity: 1, stagger: 0.1, ease: 'none',
      scrollTrigger: { trigger: p, start: 'top 80%', end: 'bottom 50%', scrub: true },
    })
  );

  // Stats count-up
  gsap.utils.toArray('[data-count]').forEach((el) => {
    const o = { v: 0 };
    el.textContent = '0';
    gsap.to(o, {
      v: +el.dataset.count, duration: 2.2, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%' },
      onUpdate: () => (el.textContent = Math.round(o.v)),
    });
  });

  // Generic staggered reveals
  gsap.utils.toArray('[data-reveal]').forEach((group) =>
    gsap.from(group.children, {
      y: 80, opacity: 0, stagger: 0.12, duration: 1.2, ease: 'expo.out',
      scrollTrigger: { trigger: group, start: 'top 85%' },
    })
  );

  // Parallax plates (data-parallax="n" sets the travel in %, default 12)
  gsap.utils.toArray('[data-parallax]').forEach((el) => {
    const a = +el.dataset.parallax || 12;
    gsap.fromTo(el, { yPercent: -a }, { yPercent: a, ease: 'none', scrollTrigger: { trigger: el.parentElement, scrub: true } });
  });

  // Project frames swing in from 3D and open like a shutter (alternating sides)
  gsap.utils.toArray('.case-media').forEach((m, i) =>
    gsap.fromTo(m, {
      clipPath: 'inset(14% 10% 14% 10% round 1.25rem)', scale: 0.94,
      rotationX: 16, rotationY: i % 2 ? -14 : 14, transformPerspective: 1400,
    }, {
      clipPath: 'inset(0% 0% 0% 0% round 1.25rem)', scale: 1, rotationX: 0, rotationY: 0, ease: 'none',
      scrollTrigger: { trigger: m, start: 'top 95%', end: 'top 40%', scrub: true },
    })
  );

  const mm = gsap.matchMedia();
  mm.add('(min-width: 900px)', () => {
    // Story: pinned, chapters cross-fade while the plate slowly pushes in
    const chapters = gsap.utils.toArray('.chapter');
    const tl = gsap.timeline({
      scrollTrigger: { trigger: '.story', start: 'top top', end: `+=${chapters.length * 90}%`, scrub: 1, pin: true },
    });
    tl.fromTo('.story-bg', { scale: 1.25 }, { scale: 1, duration: chapters.length, ease: 'none' }, 0);
    tl.fromTo('.story-progress i', { scaleX: 0 }, { scaleX: 1, duration: chapters.length, ease: 'none' }, 0);
    chapters.forEach((c, i) => {
      if (i) tl.fromTo(c, { opacity: 0, yPercent: 40 }, { opacity: 1, yPercent: 0, duration: 0.4 }, i - 0.2);
      if (i < chapters.length - 1) tl.to(c, { opacity: 0, yPercent: -40, duration: 0.4 }, i + 0.6);
    });
  });

  // Marquee that speeds up with scroll velocity
  const marquee = gsap.to('.marquee-track', { xPercent: -50, repeat: -1, duration: 28, ease: 'none' });
  ScrollTrigger.create({
    onUpdate: (self) => {
      marquee.timeScale(1 + Math.min(Math.abs(self.getVelocity()) / 250, 8));
      gsap.to(marquee, { timeScale: 1, duration: 1.2, delay: 0.1, overwrite: true });
    },
  });

  // Pointer niceties (desktop only)
  if (matchMedia('(pointer: fine)').matches) {
    const cursor = document.querySelector('.cursor');
    const cx = gsap.quickTo(cursor, 'x', { duration: 0.45, ease: 'power3' });
    const cy = gsap.quickTo(cursor, 'y', { duration: 0.45, ease: 'power3' });
    addEventListener('pointermove', (e) => { cx(e.clientX); cy(e.clientY); });
    document.querySelectorAll('a, button').forEach((el) => {
      el.addEventListener('pointerenter', () => cursor.classList.add('big'));
      el.addEventListener('pointerleave', () => cursor.classList.remove('big'));
    });
    document.querySelectorAll('.magnetic').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * 0.35, y: (e.clientY - r.top - r.height / 2) * 0.35, duration: 0.4 });
      });
      el.addEventListener('pointerleave', () => gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.4)' }));
    });
  }
}

export default function Motion() {
  return CDN.map(([src, integrity]) => (
    <Script key={src} src={src} integrity={integrity} crossOrigin="anonymous" strategy="afterInteractive" onReady={init} />
  ));
}
