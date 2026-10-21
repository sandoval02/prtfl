'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Orbit rings + rising haze particles behind the hero portrait.
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

    const group = new THREE.Group();
    scene.add(group);

    const rings = [
      [2.6, 0x3dffb0, 0.9, [1.25, 0, 0.2]],
      [3.1, 0xff7a1a, 0.55, [1.1, 0.5, -0.3]],
      [3.6, 0xffffff, 0.18, [1.4, -0.4, 0.1]],
    ].map(([r, color, opacity, rot]) => {
      const m = new THREE.Mesh(
        new THREE.TorusGeometry(r, 0.006, 8, 256),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity, blending: THREE.AdditiveBlending })
      );
      m.rotation.set(...rot);
      group.add(m);
      return m;
    });

    const N = 900;
    const pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) pos.set([(Math.random() - 0.5) * 14, (Math.random() - 0.5) * 9, (Math.random() - 0.5) * 6], i * 3);
    const dustGeo = new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const dust = new THREE.Points(
      dustGeo,
      new THREE.PointsMaterial({ color: 0x9dffd8, size: 0.025, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending })
    );
    scene.add(dust);

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

    // Only render while the hero is on screen.
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);

    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let id;
    const tick = (t) => {
      id = requestAnimationFrame(tick);
      if (!visible) return;
      const s = still ? 0 : t * 0.001;
      rings.forEach((r, i) => (r.rotation.z = s * (0.15 + i * 0.07) * (i % 2 ? -1 : 1)));
      group.rotation.y += (mouse.x * 0.5 - group.rotation.y) * 0.05;
      group.rotation.x += (mouse.y * 0.3 - group.rotation.x) * 0.05;
      if (!still) {
        for (let i = 1; i < pos.length; i += 3) pos[i] = pos[i] > 4.5 ? -4.5 : pos[i] + 0.004;
        dustGeo.attributes.position.needsUpdate = true;
      }
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
  }, []);

  return <div ref={ref} className="scene" aria-hidden="true" />;
}
