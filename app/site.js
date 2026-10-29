// Edit this file to make the site yours.
const github = 'sandoval02';

export const site = {
  url: 'https://gpscrypt.me',
  name: 'Geoff Sandoval',
  role: 'Software Developer · Aspiring Penetration Tester',
  tagline: 'I build fast, reliable software, and I learn to break it so I can make it secure.',
  email: 'hello@gpscrypt.me', // set up as a forwarding alias in Namecheap → Email Forwarding
  location: 'Philippines', // ← change if needed
  // SEO: shown in Google results (keep description ~150 chars).
  seoTitle: 'Geoff Sandoval | Software Developer & Aspiring Penetration Tester',
  seoDescription:
    'Geoff Sandoval is a software developer and aspiring penetration tester in the Philippines, building secure web and mobile apps with Next.js and Flutter.',
  // Google Search Console → "HTML tag" method: paste only the content="..." value here.
  googleVerification: '',
  github,
  socials: {
    GitHub: `https://github.com/${github}`,
  },

  // availability: '' hides the badge. resume: e.g. '/resume.pdf' (put the file in public/).
  availability: 'Open to internships & junior roles',
  resume: '',

  // Counted from the featured repos (Oct 2026).
  stats: [
    { value: 670, suffix: '+', label: 'Commits on featured projects' },
    { value: 480, suffix: '', label: 'API endpoints across projects' },
    { value: 4, suffix: '', label: 'Full-stack projects built' },
  ],

  mission:
    'I build software that feels effortless, then I try to break it. The best developers think like attackers.',

  pillars: [
    { title: 'Build', text: 'Full-stack web and mobile apps with React, Next.js, Flutter and Python APIs, fast and built to last.' },
    { title: 'Break', text: 'Ethical hacking in labs and CTFs: recon, exploitation, privilege escalation. Learning how systems fail.' },
    { title: 'Secure', text: 'Hashed credentials, rate limits, role guards and least privilege: security designed in, not bolted on.' },
  ],

  story: [
    { title: 'The Student', text: 'BS Information Technology. Weekly system-administration labs taught me how real systems run and how they break.' },
    { title: 'The Builder', text: 'Late nights turning ideas into shipped software: an emergency-response platform, a scholarship system, an artisan marketplace.' },
    { title: 'The Breaker', text: 'Now training as a penetration tester. Every system I build, I want to know exactly how it could fall.' },
  ],

  // Skills section, one card per category. Taken from the featured projects' real dependencies.
  skillGroups: [
    { name: 'Languages', items: ['TypeScript', 'JavaScript', 'Python', 'Dart', 'SQL'] },
    { name: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS', 'shadcn/ui', 'Three.js', 'GSAP', 'Redux Toolkit', 'MUI', 'Vite'] },
    { name: 'Mobile', items: ['Flutter', 'Firebase Cloud Messaging', 'Google ML Kit', 'Google Maps'] },
    { name: 'Backend', items: ['FastAPI', 'Flask', 'REST APIs', 'WebSockets', 'Socket.IO', 'Better Auth'] },
    { name: 'Databases', items: ['PostgreSQL', 'Supabase', 'Redis', 'Prisma', 'SQLAlchemy'] },
    { name: 'AI', items: ['Gemini API', 'OpenAI API', 'Ollama'] },
    { name: 'Tools & DevOps', items: ['Git', 'Docker', 'pytest', 'Render', 'Vercel', 'Linux', 'System Administration'] },
    { name: 'Security', items: ['Networking', 'Nmap', 'Burp Suite', 'OWASP Top 10', 'Wireshark', 'TryHackMe / HTB'] },
  ],

  // Featured projects. image: put a screenshot in public/projects/ and set its path (16:10, e.g. 1280×800); '' shows no image.
  // imageNote: optional caption on the image, e.g. for an anonymized client mockup.
  // links: '' hides the button (private repos would 404).
  projects: [
    {
      title: 'Tugon',
      kind: 'Mobile App + Admin Dashboard · Emergency response',
      year: '2026',
      role: 'Full-stack developer · team of 2 · ~66% of commits',
      summary:
        'Emergency-response platform for the municipality of Liliw. Citizens report incidents from the mobile app; staff dispatch and track responders live from a web command center, and AI helps triage reports.',
      image: '/projects/tugon.webp',
      metrics: [
        { value: '216', label: 'API endpoints' },
        { value: '58', label: 'Mobile screens' },
        { value: '70', label: 'Admin pages' },
        { value: '10', label: 'User roles' },
      ],
      stack: ['Flutter', 'Dart', 'FastAPI', 'Python', 'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Three.js (React Three Fiber)', 'GSAP', 'Vite', 'PostgreSQL (Supabase)', 'Prisma', 'SQLAlchemy', 'Redis', 'Better Auth', 'Firebase Cloud Messaging', 'Google ML Kit', 'Gemini API', 'OpenAI API', 'Ollama', 'Leaflet / Google Maps', 'Recharts', 'Cloudinary', 'pytest', 'Render'],
      features: [
        'Citizens report incidents with photos and voice input',
        'Web command center: dispatch, live tracking, incidents and evacuation',
        'Separate officer portal for patrols, attendance and reports',
        'Live responder tracking on a map over WebSockets',
        'Mission dispatch with push notifications; GPS and face-match attendance',
        'AI report triage with descriptive and predictive analytics',
      ],
      techniques: [
        'Async FastAPI with a pooled, pre-warmed PostgreSQL connection',
        'Admin on Next.js with Prisma (34 models), TanStack Table and Recharts',
        'Redis rate limiting with an in-memory fallback',
        'TTL response cache that is invalidated on writes',
        'Multi-provider AI router with priority and cooldown fallback',
        '186 automated API tests with pytest',
      ],
      security: [
        'bcrypt password hashing',
        'JWT sessions with an active-account check on every request',
        'Role-based guard on 39 admin endpoints; admin routes split by role',
        'Session JWT kept in an httpOnly cookie, forwarded server-side',
        'Per-IP and per-account rate limits on login, signup and OTP',
        'Hashed, expiring email OTPs capped at 5 attempts',
      ],
      links: { live: 'https://www.tugon.live', code: '' },
    },
    {
      title: 'Applischo',
      kind: 'Web App · Scholarship management',
      year: '2025',
      role: 'Full-stack developer · solo project',
      summary:
        'A scholarship management system I designed and built end to end: applications, online exams, evaluation, approval and payouts in one place. A rule-based scorer explains every recommendation, and staff make the final decision.',
      image: '/projects/applischo.webp',
      metrics: [
        { value: '155', label: 'API endpoints' },
        { value: '34', label: 'Database tables' },
        { value: '5', label: 'User roles' },
      ],
      stack: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS 4', 'PostgreSQL (Supabase)', 'Supabase Storage', 'Resend', 'MediaPipe', 'Vercel'],
      features: [
        'Applicants build a profile and see rule-by-rule eligibility',
        'Online exams with a timer, anti-cheat flags and a camera check',
        'Weighted, explainable scoring that staff can adjust with a reason',
        'Authority approves, returns or rejects, with bulk approval',
        'Renewals, payout batches and claim tracking for scholars',
      ],
      techniques: [
        'Eligibility rules stored as data and run by one pure rule engine',
        'Weighted scoring with anomaly flags and plain-language reasons',
        'Application workflow defined in a single transition table',
        'Fuzzy duplicate detection using a Dice similarity score',
        'Server-owned exam clock with a disconnect policy',
      ],
      security: [
        'bcrypt password hashing',
        'Signed httpOnly session cookie, rechecked against the database per request',
        'Role-based access in middleware and on API routes',
        'OTPs stored as keyed hashes, 10-minute expiry, 5 tries',
        'Parameterized SQL, Row Level Security, AES-256-GCM for stored API keys',
      ],
      links: { live: '', code: '' },
    },
    {
      title: 'Eterna',
      kind: 'E-commerce · 3rd-year project',
      year: '2025',
      role: 'Full-stack developer · solo build',
      summary:
        'Marketplace for local artisans with separate buyer, seller, rider and admin portals. Includes checkout, a commission wallet, live chat and an AI shopping assistant.',
      image: '',
      metrics: [
        { value: '109', label: 'API endpoints' },
        { value: '33', label: 'Pages' },
        { value: '4', label: 'User roles' },
      ],
      stack: ['React 19', 'TypeScript', 'Redux Toolkit', 'Tailwind CSS 4', 'MUI', 'Flask', 'PostgreSQL', 'Socket.IO', 'Cloudinary', 'PayPal'],
      features: [
        'Buyers browse products, check out and track orders',
        'Seller portal for products, orders and analytics',
        'Rider portal for deliveries, with order QR codes from checkout',
        'Real-time chat between buyers, sellers and riders',
        'AI shopping assistant that answers from the live product catalog',
      ],
      techniques: [
        'Feature-based modules on both the React app and the Flask API',
        'Access and refresh tokens signed with separate secrets',
        'Wallet ledger with a configurable commission on each order',
        'Socket.IO rooms for real-time messaging',
        'Admin approval workflow for new users, sellers and riders',
      ],
      security: [
        'bcrypt password hashing',
        'Parameterized SQL queries throughout',
        'Role guards for buyer, seller, rider and admin API routes',
        'Email OTP verification with a 5-minute expiry',
        'Secrets and API keys read from environment variables',
      ],
      links: { live: '', code: '' },
    },
    {
      title: 'System Administration Portfolio',
      kind: 'System Administration · ITEP 414',
      year: '2026',
      role: 'Coursework · solo',
      summary:
        'A semester-long lab portfolio: planning the enterprise infrastructure of a 20-person startup, then deploying, networking and securing Ubuntu and Windows servers, with every step documented.',
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
      links: { live: '', code: 'https://github.com/sandoval02/BSIT-SystemAdministration-Portfolio' },
    },
  ],
};
