// Edit this file to make the site yours.
const github = 'sandoval02'; // public repos are pulled in at build time

export const site = {
  url: 'https://gpscrypt.me',
  name: 'Geoff Sandoval',
  role: 'Software Developer · Aspiring Penetration Tester',
  tagline: 'I build fast, immersive software — and learn to break it, so I can make it secure.',
  email: 'hello@gpscrypt.me', // set up as a forwarding alias in Namecheap → Email Forwarding
  github,
  socials: {
    GitHub: `https://github.com/${github}`,
  },
  skills: ['JavaScript', 'React', 'Next.js', 'Node.js', 'Python', 'Three.js', 'Git', 'System Administration'],
  security: ['Linux', 'Networking', 'Nmap', 'Burp Suite', 'OWASP Top 10', 'Wireshark', 'TryHackMe / HTB'],
  // Featured projects shown before your GitHub repos — add ones that aren't public repos.
  projects: [],
};
