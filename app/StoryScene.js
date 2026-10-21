'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Story background: a corridor of floating holographic screens. Scrolling through the
// (pinned) story section flies the camera forward to the builder photo at the far end.
const TERM = [
  '$ nmap -sV 10.0.0.12', '22/tcp   open  ssh    OpenSSH 8.9', '443/tcp  open  https', '$ pytest -q',
  '186 passed in 41.2s', '$ curl -I https://tugon.live', 'HTTP/2 200', '$ git push origin main', '✓ deployed',
];

const rng = (s) => () => ((s = (s * 16807) % 2147483647) / 2147483647);

function screen(kind, seed) {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 300;
  const g = c.getContext('2d');
  const r = rng(seed);
  g.fillStyle = 'rgba(4,16,11,0.94)';
  g.fillRect(0, 0, 512, 300);
  g.fillStyle = 'rgba(61,255,176,0.16)';
  g.fillRect(0, 0, 512, 24);
  ['#ff7a1a', '#3dffb0', '#46524c'].forEach((col, i) => { g.fillStyle = col; g.beginPath(); g.arc(16 + i * 16, 12, 4, 0, 7); g.fill(); });
  const em = '#3dffb0', or = '#ff7a1a', fg = '#cfd8d2';
  if (kind === 'code') {
    for (let y = 40; y < 290; y += 16) {
      let x = 20 + Math.floor(r() * 4) * 18;
      while (x < 470 && r() > 0.2) {
        const w = 20 + r() * 80;
        g.fillStyle = [em, or, fg, '#6b7a72'][Math.floor(r() * 4)];
        g.globalAlpha = 0.85;
        g.fillRect(x, y, w, 6);
        x += w + 8;
      }
    }
  } else if (kind === 'term') {
    g.font = '15px monospace';
    TERM.slice(Math.floor(r() * 3)).forEach((t, i) => { g.fillStyle = t.startsWith('$') ? em : fg; g.fillText(t, 18, 50 + i * 26); });
  } else if (kind === 'graph') {
    const pts = Array.from({ length: 14 }, () => [30 + r() * 450, 40 + r() * 240]);
    g.strokeStyle = 'rgba(61,255,176,0.5)';
    pts.forEach((p, i) => { const q = pts[(i * 5 + 3) % pts.length]; g.beginPath(); g.moveTo(...p); g.lineTo(...q); g.stroke(); });
    pts.forEach((p, i) => { g.fillStyle = i % 4 ? em : or; g.beginPath(); g.arc(...p, 5, 0, 7); g.fill(); });
  } else {
    for (let i = 0; i < 9; i++) { const h = 30 + r() * 170; g.fillStyle = i % 3 ? em : or; g.globalAlpha = 0.8; g.fillRect(30 + i * 50, 270 - h, 30, h); }
    g.globalAlpha = 1;
    g.strokeStyle = fg;
    g.beginPath();
    for (let x = 20; x < 500; x += 30) g.lineTo(x, 80 + Math.sin(x / 40 + seed) * 30 + r() * 20);
    g.stroke();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export default function StoryScene({ fallback }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const section = el.closest('section');
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true });
    } catch {
      return; // no WebGL: the builder photo (CSS background) stays as the story backdrop
    }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050806);
    scene.fog = new THREE.Fog(0x050806, 5, 28);
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 60);

    const N = 12, GAP = 2.4, r = rng(7);
    const kinds = ['code', 'term', 'graph', 'bars'];
    const screens = Array.from({ length: N }, (_, i) => {
      const geo = new THREE.PlaneGeometry(2.4, 1.4);
      const mesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ map: screen(kinds[i % 4], i + 3), transparent: true, opacity: 0.9 }));
      const edge = new THREE.LineSegments(
        new THREE.EdgesGeometry(geo),
        new THREE.LineBasicMaterial({ color: i % 3 ? 0x3dffb0 : 0xff7a1a, transparent: true, opacity: 0.8 })
      );
      mesh.add(edge);
      const side = i % 2 ? 1 : -1;
      mesh.position.set(side * (1.6 + r() * 1.8), (r() - 0.45) * 3.6, -i * GAP);
      mesh.rotation.y = -side * (0.35 + r() * 0.25);
      mesh.userData.y = mesh.position.y;
      scene.add(mesh);
      return mesh;
    });

    // The builder photo waits at the end of the corridor
    const endZ = -N * GAP - 3;
    new THREE.TextureLoader().load(fallback, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      const plane = new THREE.Mesh(new THREE.PlaneGeometry(16, 9), new THREE.MeshBasicMaterial({ map: tex, fog: false, transparent: true, opacity: 0.55 }));
      plane.position.z = endZ;
      scene.add(plane);
    });

    const P = 700, pos = new Float32Array(P * 3);
    for (let i = 0; i < P; i++) pos.set([(r() - 0.5) * 12, (r() - 0.5) * 7, 4 - r() * (N * GAP + 6)], i * 3);
    scene.add(new THREE.Points(
      new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(pos, 3)),
      new THREE.PointsMaterial({ color: 0x9dffd8, size: 0.03, transparent: true, opacity: 0.7 })
    ));

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = el;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    addEventListener('resize', resize);

    const mouse = { x: 0, y: 0 };
    const move = (e) => { mouse.x = e.clientX / innerWidth - 0.5; mouse.y = e.clientY / innerHeight - 0.5; };
    addEventListener('pointermove', move);

    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(section);

    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let id, z = 4;
    const tick = (t) => {
      id = requestAnimationFrame(tick);
      if (!visible) return;
      // Progress through the story: across the pin spacer on desktop, across the section otherwise
      const host = section.parentElement.classList.contains('pin-spacer') ? section.parentElement : section;
      const b = host.getBoundingClientRect();
      const p = Math.min(Math.max(-b.top / Math.max(b.height - innerHeight, 1), 0), 1);
      z += (4 + p * (endZ + 9 - 4) - z) * 0.08; // eased dolly
      camera.position.set(mouse.x * 0.8 + Math.sin(p * Math.PI) * 0.6, -mouse.y * 0.5, z);
      camera.lookAt(mouse.x * 0.4, 0, z - 6);
      if (!still) screens.forEach((s, i) => (s.position.y = s.userData.y + Math.sin(t * 0.0007 + i) * 0.08));
      renderer.render(scene, camera);
    };
    id = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(id);
      io.disconnect();
      removeEventListener('resize', resize);
      removeEventListener('pointermove', move);
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  }, [fallback]);

  // The photo shows until WebGL paints over it (and stays if WebGL is unavailable).
  return <div ref={ref} className="story-bg story-3d" style={{ backgroundImage: `url(${fallback})` }} aria-hidden="true" />;
}
