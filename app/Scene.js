'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Fixed WebGL layer behind the page. In the hero: orbit rings around the portrait.
// On scroll the rings collapse into a wireframe core that travels between sections.
// [section, x, y, core scale, rings 0..1] — a key applies when its section reaches mid-screen.
const KEYS = [
  ['.hero', 0, 0, 0, 1],
  ['#mission', 2.4, 0.1, 1, 0],
  ['.pillars', -2.6, -0.2, 0.85, 0],
  ['.services', 2.6, 0, 0.8, 0],
  ['#work', -2.6, 0.2, 0.7, 0],
  ['#contact', 0, 0, 1.4, 0],
];
const lerp = (a, b, f) => a + (b - a) * f;
const smooth = (f) => f * f * (3 - 2 * f);

export default function Scene() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0.4, 7);
    const world = new THREE.Group();
    scene.add(world);

    const additive = { transparent: true, blending: THREE.AdditiveBlending };
    const RING_OPACITY = [0.9, 0.55, 0.18];
    const rings = new THREE.Group();
    const ringMeshes = [
      [2.6, 0x3dffb0, [1.25, 0, 0.2]],
      [3.1, 0xff7a1a, [1.1, 0.5, -0.3]],
      [3.6, 0xffffff, [1.4, -0.4, 0.1]],
    ].map(([r, color, rot]) => {
      const m = new THREE.Mesh(new THREE.TorusGeometry(r, 0.006, 8, 256), new THREE.MeshBasicMaterial({ color, ...additive }));
      m.rotation.set(...rot);
      rings.add(m);
      return m;
    });

    const wire = (color, opacity) => new THREE.MeshBasicMaterial({ color, wireframe: true, opacity, ...additive });
    const shell = new THREE.Mesh(new THREE.IcosahedronGeometry(1.4, 1), wire(0x3dffb0, 0.5));
    const inner = new THREE.Mesh(new THREE.OctahedronGeometry(0.7, 0), wire(0xff7a1a, 0.85));
    const halo = new THREE.Points(
      new THREE.BufferGeometry().setFromPoints(
        Array.from({ length: 500 }, () => new THREE.Vector3().randomDirection().multiplyScalar(1.9 + Math.random() * 0.6))
      ),
      new THREE.PointsMaterial({ color: 0x9dffd8, size: 0.022, opacity: 0.7, ...additive })
    );
    const core = new THREE.Group();
    core.add(shell, inner, halo);
    world.add(rings, core);

    const N = 900;
    const pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) pos.set([(Math.random() - 0.5) * 14, (Math.random() - 0.5) * 9, (Math.random() - 0.5) * 6], i * 3);
    const dustGeo = new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(pos, 3));
    scene.add(new THREE.Points(dustGeo, new THREE.PointsMaterial({ color: 0x9dffd8, size: 0.025, opacity: 0.6, ...additive })));

    const resize = () => {
      renderer.setSize(innerWidth, innerHeight);
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
    };
    resize();
    addEventListener('resize', resize);

    const mouse = { x: 0, y: 0 };
    const move = (e) => { mouse.x = e.clientX / innerWidth - 0.5; mouse.y = e.clientY / innerHeight - 0.5; };
    addEventListener('pointermove', move);

    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let id, frame = 0, keyY = [], lastY = scrollY, spin = 0;
    const tick = (t) => {
      id = requestAnimationFrame(tick);
      const y = scrollY, dy = y - lastY;
      lastY = y;

      // Section positions move when pins/fonts settle; re-measure twice a second.
      if (frame++ % 30 === 0)
        keyY = KEYS.map(([s], i) => {
          const n = document.querySelector(s);
          return i && n ? n.getBoundingClientRect().top + y - innerHeight * 0.5 : 0;
        });
      let i = 0;
      while (i < KEYS.length - 2 && y >= keyY[i + 1]) i++;
      const f = smooth(Math.min(Math.max((y - keyY[i]) / (keyY[i + 1] - keyY[i] || 1), 0), 1));
      const [, x0, y0, s0, r0] = KEYS[i], [, x1, y1, s1, r1] = KEYS[i + 1];
      const narrow = camera.aspect < 1; // phones: keep the core centred and dim behind text
      const cx = lerp(x0, x1, f) * (narrow ? 0.25 : 1), cy = lerp(y0, y1, f), rv = lerp(r0, r1, f);
      const dim = narrow ? 0.45 : 1;

      core.position.set(cx, cy, 0);
      core.scale.setScalar(Math.max(lerp(s0, s1, f), 1e-4));
      rings.position.set(cx * (1 - rv), cy * (1 - rv), 0); // rings shrink into the core as the hero leaves
      rings.scale.setScalar(lerp(0.25, 1, rv));
      ringMeshes.forEach((m, k) => (m.material.opacity = RING_OPACITY[k] * rv));
      shell.material.opacity = 0.26 * dim; // low enough that text over it stays readable
      inner.material.opacity = 0.5 * dim;
      halo.material.opacity = 0.6 * dim;

      // Idle spin plus a kick from scroll speed
      spin += still ? 0 : 0.003 + Math.min(Math.abs(dy) * 0.0005, 0.06);
      shell.rotation.set(spin * 0.7, spin, 0);
      inner.rotation.set(-spin, -spin * 1.3, 0);
      halo.rotation.y = -spin * 0.4;
      const s = still ? 0 : t * 0.001;
      ringMeshes.forEach((r, k) => (r.rotation.z = s * (0.15 + k * 0.07) * (k % 2 ? -1 : 1)));
      world.rotation.y += (mouse.x * 0.5 - world.rotation.y) * 0.05;
      world.rotation.x += (mouse.y * 0.3 - world.rotation.x) * 0.05;
      if (!still) {
        for (let k = 1; k < pos.length; k += 3) pos[k] = pos[k] > 4.5 ? -4.5 : pos[k] + 0.004;
        dustGeo.attributes.position.needsUpdate = true;
      }
      renderer.render(scene, camera);
    };
    id = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(id);
      removeEventListener('resize', resize);
      removeEventListener('pointermove', move);
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={ref} className="scene" aria-hidden="true" />;
}
