// Edit this file to make the site yours.
const github = 'sandoval02'; // public repos are pulled in at build time

export const site = {
  url: 'https://gpscrypt.me',
  name: 'Geoff Sandoval',
  role: 'Software Developer · Aspiring Penetration Tester',
  tagline: 'I build fast, immersive software — and learn to break it, so I can make it secure.',
  email: 'hello@gpscrypt.me', // set up as a forwarding alias in Namecheap → Email Forwarding
  location: 'Philippines', // ← change if needed
  github,
  socials: {
    GitHub: `https://github.com/${github}`,
  },

  // Drop Seedance clips into public/ and set them here (e.g. '/hero.mp4'); empty = still image.
  videos: { hero: '', builder: '', lab: '' },

  // ⚠ Placeholder numbers — set your real ones.
  stats: [
    { value: 2, suffix: '+', label: 'Years writing code' },
    { value: 30, suffix: '+', label: 'Labs & CTF rooms' },
    { value: 5, suffix: '+', label: 'Projects shipped' },
    { value: 100, suffix: '%', label: 'Curiosity' },
  ],

  mission:
    'I build software that feels effortless — then I try to break it. The best developers think like attackers.',

  pillars: [
    { title: 'Build', text: 'Full-stack web apps with React, Next.js and Node — fast, accessible, built to last.' },
    { title: 'Break', text: 'Ethical hacking in labs and CTFs: recon, exploitation, privilege escalation. Learning how systems fail.' },
    { title: 'Secure', text: 'System administration and secure-by-default habits: hardening, least privilege, clean deployments.' },
  ],

  story: [
    { title: 'The Student', text: 'BS Information Technology. Weekly system-administration labs taught me how real systems run — and how they break.' },
    { title: 'The Builder', text: 'Late nights turning ideas into code: web apps, tools, interfaces — and this very site.' },
    { title: 'The Breaker', text: 'Now training as a penetration tester. Every system I build, I want to know exactly how it could fall.' },
  ],

  services: [
    { title: 'Web Development', text: 'Next.js / React sites and apps, SEO-ready from day one.' },
    { title: 'Immersive UI & 3D', text: 'Three.js scenes, motion and scroll storytelling.' },
    { title: 'Security Reviews', text: 'Recon, vulnerability scanning and hardening checklists for small projects.' },
    { title: 'Community', text: 'CTFs, write-ups and open source — learning in public.' },
  ],

  skills: ['JavaScript', 'React', 'Next.js', 'Node.js', 'Python', 'Three.js', 'Git', 'System Administration'],
  security: ['Linux', 'Networking', 'Nmap', 'Burp Suite', 'OWASP Top 10', 'Wireshark', 'TryHackMe / HTB'],

  // Featured projects shown before your GitHub repos — add ones that aren't public repos.
  projects: [],
};
