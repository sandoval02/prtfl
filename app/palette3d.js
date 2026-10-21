import * as THREE from 'three';

// 3D colours per theme. Additive glow only works on dark; light mode draws solid, darker lines.
export const PALETTES = {
  dark: { em: 0x3dffb0, or: 0xff7a1a, w: 0xffffff, dust: 0x9dffd8, bg: 0x050806, blending: THREE.AdditiveBlending },
  light: { em: 0x00875a, or: 0xc2410c, w: 0x2b302d, dust: 0x00875a, bg: 0xf4f2ec, blending: THREE.NormalBlending },
};

// Phones/tablets: lower resolution and fewer particles keep the 3D at 60fps.
export const LOW_POWER = typeof window !== 'undefined' && matchMedia('(max-width: 900px), (pointer: coarse)').matches;
export const renderOptions = () => ({ antialias: !LOW_POWER, powerPreference: 'high-performance' });
export const pixelRatio = () => Math.min(devicePixelRatio, LOW_POWER ? 1.25 : 2);

export const currentPalette = () => PALETTES[document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'];

/** Recolour [material, role] pairs now and on every theme toggle. Returns an unsubscribe. */
export function bindTheme(pairs, extra = () => {}) {
  const apply = () => {
    const p = currentPalette();
    pairs.forEach(([m, role]) => {
      m.color.setHex(p[role]);
      m.blending = p.blending;
      m.needsUpdate = true;
    });
    extra(p);
  };
  apply();
  addEventListener('themechange', apply);
  return () => removeEventListener('themechange', apply);
}
