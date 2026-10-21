'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Scene() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 6;

    // Wireframe core + solid glowing inner shape
    const knot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(1.3, 0.38, 220, 24),
      new THREE.MeshBasicMaterial({ color: 0x00f0ff, wireframe: true, transparent: true, opacity: 0.55 })
    );
    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.7, 1),
      new THREE.MeshBasicMaterial({ color: 0xff2bd6, wireframe: true })
    );
    scene.add(knot, core);

    // Star field
    const pts = new Float32Array(1500 * 3).map(() => (Math.random() - 0.5) * 30);
    const stars = new THREE.Points(
      new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(pts, 3)),
      new THREE.PointsMaterial({ color: 0x9d7bff, size: 0.03 })
    );
    scene.add(stars);

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

    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let id;
    const tick = (t) => {
      const s = still ? 0 : t * 0.001;
      knot.rotation.set(s * 0.3 + mouse.y, s * 0.4 + mouse.x, 0);
      core.rotation.set(-s, -s * 0.7, 0);
      stars.rotation.y = s * 0.02;
      renderer.render(scene, camera);
      id = requestAnimationFrame(tick);
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
