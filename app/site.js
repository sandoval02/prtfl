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

  // Featured case studies. image: put a screenshot in public/projects/ and set its path; '' shows the animated placeholder.
  // metrics: a whole-number value counts up on scroll.
  projects: [
    {
      title: 'gpscrypt.me',
      bar: 'gpscrypt.me',
      kind: 'Web Development · Personal',
      year: '2026',
      summary:
        'The site you’re on. A cinematic, scroll-told portfolio with real-time 3D — statically exported for speed and SEO, and shipped by CI to a custom domain.',
      image: '/projects/portfolio.webp',
      metrics: [
        { value: '98', suffix: '%', label: 'Image weight cut' },
        { value: '100', suffix: '%', label: 'Pre-rendered HTML' },
        { value: '0', label: 'Servers to attack' },
      ],
      stack: ['Next.js 16', 'React 19', 'three.js', 'GSAP', 'ScrollTrigger', 'Lenis', 'GitHub Actions', 'GitHub Pages'],
      features: [
        'Kinetic, character-split typography',
        'Pinned scroll storytelling with cross-fading chapters',
        'Real-time WebGL orbit rings and particles',
        'Magnetic and scroll-velocity-reactive interactions',
        'Fully responsive and reduced-motion aware',
      ],
      techniques: [
        'Static export — every word is in the HTML for search engines',
        'Smooth scroll on GSAP’s ticker, synced with ScrollTrigger',
        'AI-generated scene plates composited with CSS masks',
        'WebP image pipeline with sharp (≈10 MB → under 250 KB)',
        'WebGL render loop pauses off-screen (IntersectionObserver)',
      ],
      security: [
        'Static-only architecture: no server, database or form backend',
        'Subresource Integrity hashes on every CDN script',
        'Least-privilege CI token: read code, write Pages — nothing else',
        'Lockfile-pinned dependencies installed with npm ci',
        'HTTPS-only on a custom domain',
      ],
      links: { live: 'https://gpscrypt.me', code: 'https://github.com/sandoval02/prtfl' },
    },
    {
      title: 'System Administration Portfolio',
      bar: 'bsit-sysadmin ~ ssh verified',
      kind: 'System Administration · ITEP 414',
      year: '2026',
      summary:
        'A semester-long lab portfolio: planning the enterprise infrastructure of a 20-person startup, then deploying, networking and securing Ubuntu and Windows servers — every step documented.',
      image: '',
      metrics: [
        { value: '20', label: 'Employees planned for' },
        { value: '2', label: 'Server OSes deployed' },
        { value: '3-2-1', label: 'Backup strategy' },
      ],
      stack: ['Ubuntu Server 22.04 LTS', 'Windows Server', 'OpenSSH', 'DHCP', 'Virtual machines', 'Microsoft Defender', 'draw.io', 'Linux CLI'],
      features: [
        'Enterprise infrastructure plan for QWERTY Solution Inc. (20 staff, 4 departments)',
        'Network topology: ISP → firewall → router → core switch → department LANs',
        'Ubuntu Server and Windows Server VMs installed and configured',
        'OpenSSH remote access and DHCP networking, verified end to end',
        'BIOS vs UEFI research and a Linux boot sequence flowchart',
      ],
      techniques: [
        'Requirements-driven planning per department and headcount',
        'VLAN segmentation and redundancy design: SLA fiber, LTE failover, RAID',
        'Manual disk partitioning and CLI package management',
        'Professional technical writing: installation guide and manual',
      ],
      security: [
        'Perimeter firewall plus VLAN isolation between departments',
        'Least privilege, regular patching, MFA and a password manager (NIST SP 800-63B)',
        '3-2-1 backups following CISA guidance',
        'Remote administration over encrypted SSH; servers patched right after install',
      ],
      links: { code: 'https://github.com/sandoval02/BSIT-SystemAdministration-Portfolio' },
    },
  ],
};
