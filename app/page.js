import ThemeToggle from './ThemeToggle';
import Reveal from './Reveal';
import Carousel from './Carousel';
import { site } from './site';
import * as si from 'simple-icons';

// Structured data: lets Google tie the name, this site, GitHub and the projects to one person.
const person = { '@id': `${site.url}/#person` };
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person', ...person, name: site.name, url: site.url, image: `${site.url}/me.webp`,
      jobTitle: ['Software Developer', 'Aspiring Penetration Tester'], description: site.seoDescription,
      address: { '@type': 'PostalAddress', addressCountry: 'PH' },
      knowsAbout: site.skillGroups.flatMap((g) => g.items), sameAs: Object.values(site.socials),
    },
    { '@type': 'WebSite', '@id': `${site.url}/#website`, url: site.url, name: site.name, inLanguage: 'en', publisher: person },
    { '@type': 'ProfilePage', url: site.url, name: site.seoTitle, mainEntity: person, about: person },
    {
      '@type': 'ItemList', name: 'Featured projects',
      itemListElement: site.projects.map((p, i) => ({
        '@type': 'ListItem', position: i + 1,
        item: {
          '@type': 'CreativeWork', name: p.title, description: p.summary, creator: person, dateCreated: p.year,
          keywords: p.stack.join(', '), ...(p.links.live || p.links.code ? { url: p.links.live || p.links.code } : {}),
        },
      })),
    },
  ],
};

// External links open in a new tab so visitors keep the portfolio open.
const ext = { target: '_blank', rel: 'noopener noreferrer' };

// Tech badges, matched by name prefix ("React 19" → react). Logos come from simple-icons and are
// inlined into the HTML at build time, so nothing is fetched at runtime. A plain hex = no logo exists, dot only.
const BRAND = {
  typescript: si.siTypescript, javascript: si.siJavascript, python: si.siPython, dart: si.siDart,
  flutter: si.siFlutter, react: si.siReact, redux: si.siRedux, 'next.js': si.siNextdotjs, fastapi: si.siFastapi,
  flask: si.siFlask, postgresql: si.siPostgresql, supabase: si.siSupabase, prisma: si.siPrisma,
  sqlalchemy: si.siSqlalchemy, redis: si.siRedis, firebase: si.siFirebase, gemini: si.siGooglegemini,
  leaflet: si.siLeaflet, render: si.siRender, tailwind: si.siTailwindcss, resend: si.siResend,
  mediapipe: si.siMediapipe, vercel: si.siVercel, mui: si.siMui, 'socket.io': si.siSocketdotio,
  cloudinary: si.siCloudinary, paypal: si.siPaypal, ubuntu: si.siUbuntu, linux: si.siLinux, git: si.siGit,
  'three.js': si.siThreedotjs, gsap: si.siGsap, vite: si.siVite, 'shadcn/ui': si.siShadcnui,
  'better auth': si.siBetterauth, ollama: si.siOllama, 'google ml kit': si.siGoogle, 'google maps': si.siGooglemaps,
  pytest: si.siPytest, docker: si.siDocker, 'openai api': '10A37F', 'draw.io': si.siDiagramsdotnet, burp: si.siBurpsuite, owasp: si.siOwasp,
  wireshark: si.siWireshark, tryhackme: si.siTryhackme,
  windows: '0078D4', microsoft: '0078D4', openssh: '6B7280', nmap: '4682B4',
};
// Near-black or near-white brands (Next.js, Better Auth…) use the text colour so they stay visible in both themes.
const colour = (hex) => {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
  const l = 0.299 * r + 0.587 * g + 0.114 * b;
  return l < 60 || l > 235 ? 'var(--fg)' : `#${hex}`;
};

const Tags = ({ items, ...p }) => (
  <ul className="tags" {...p}>
    {items.map((t) => {
      const b = BRAND[Object.keys(BRAND).find((k) => t.toLowerCase().startsWith(k))];
      if (!b) return <li key={t}>{t}</li>;
      const icon = typeof b === 'object' && b;
      return (
        <li key={t} className={icon ? 'brand logo-tag' : 'brand'} style={{ '--c': colour(icon ? icon.hex : b) }}>
          {icon && <svg viewBox="0 0 24 24" aria-hidden="true"><path d={icon.path} /></svg>}
          {t}
        </li>
      );
    })}
  </ul>
);

const Media = ({ p, children }) =>
  p.links.live ? (
    <a href={p.links.live} className="project-media" aria-label={`Open ${p.title} live site`} {...ext}>{children}</a>
  ) : (
    <div className="project-media">{children}</div>
  );

function Project({ p }) {
  return (
    <article className="project card" data-reveal>
      {p.slides && <div className="project-media"><Carousel slides={p.slides} title={p.title} /></div>}
      {p.image && (
        // With a live site, the screenshot links to it too
        <Media p={p}>
          <img src={p.image} alt={`${p.title} ${p.imageNote ? 'preview' : 'screenshot'}`} loading="lazy" width="1280" height="800" />
          {p.imageNote && <span className="image-note">{p.imageNote}</span>}
        </Media>
      )}

      <div className="project-body">
        <p className="meta">{p.kind} · {p.year}</p>
        <h3>{p.title}</h3>
        <p className="project-role">{p.role}</p>
        <p>{p.summary}</p>

        {p.metrics.length > 0 && (
          <dl className="metrics">
            {p.metrics.map((m) => (
              <div key={m.label}>
                <dt>{m.label}</dt>
                <dd>{m.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <Tags items={p.stack} aria-label="Tech stack" />

        <details>
          <summary>Features, techniques &amp; security</summary>
          <div className="details-grid">
            {[['Features', p.features], ['Techniques', p.techniques], ['Security', p.security]].map(([h, items]) => (
              <div key={h}>
                <h4>{h}</h4>
                <ul>{items.map((x) => <li key={x}>{x}</li>)}</ul>
              </div>
            ))}
          </div>
        </details>

        {(p.links.live || p.links.code) && (
          <p className="actions">
            {p.links.live && <a href={p.links.live} className="btn" {...ext}>Live site ↗</a>}
            {p.links.code && <a href={p.links.code} className="btn btn-outline" {...ext}>Source code ↗</a>}
          </p>
        )}
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="nav">
        <div className="container nav-inner">
          <a href="#top" className="logo">
            <img src="/logo.png" alt="" width="128" height="128" className="on-light" />
            <img src="/logo-light.png" alt="" width="128" height="128" className="on-dark" />
            <span>{site.name.toLowerCase()}<b>.</b></span>
          </a>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <header id="top" className="container hero">
        <div className="hero-text" data-reveal>
          {site.availability && <p className="badge"><i aria-hidden="true" />{site.availability}</p>}
          <h1>{site.name}</h1>
          <p className="hero-role">{site.role}</p>
          <p className="hero-tagline">{site.tagline}</p>
          <p className="actions">
            <a href="#projects" className="btn">View projects</a>
            <a href={`mailto:${site.email}`} className="btn btn-outline">Contact me</a>
            {site.resume && <a href={site.resume} className="btn btn-outline" download>Download résumé</a>}
          </p>
          <p className="hero-meta">
            {site.location} · <a href={site.socials.GitHub} {...ext} rel="me noopener noreferrer">github.com/{site.github}</a>
          </p>
        </div>
        <div className="hero-photo" data-reveal>
          <img src="/me.webp" alt={`Portrait of ${site.name}`} width="756" height="1356" fetchPriority="high" />
        </div>
      </header>

      <main>
        <section className="container stats" aria-label="At a glance" data-reveal>
          {site.stats.map((s) => (
            <div key={s.label}>
              <strong>{s.value}{s.suffix}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </section>

        <section id="about" className="container section">
          <h2 data-reveal>About</h2>
          <div className="about" data-reveal>
            <p className="lead">{site.mission}</p>
            <ol className="timeline">
              {site.story.map((c) => (
                <li key={c.title}>
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="pillars">
            {site.pillars.map((p) => (
              <article key={p.title} className="card" data-reveal>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="container section">
          <h2 data-reveal>Selected projects</h2>
          <div className="projects">
            {site.projects.map((p) => <Project key={p.title} p={p} />)}
          </div>
          <p className="more"><a href={site.socials.GitHub} {...ext}>More on GitHub ↗</a></p>
        </section>

        <section id="skills" className="container section">
          <h2 data-reveal>Skills</h2>
          <div className="skills" data-reveal>
            {site.skillGroups.map((g) => (
              <div key={g.name} className="card">
                <h3>{g.name}</h3>
                <Tags items={g.items} />
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="container section contact" data-reveal>
          <h2>Let&apos;s work together</h2>
          <p>{site.availability ? `${site.availability}. ` : ''}The fastest way to reach me is by email.</p>
          <p className="actions">
            <a href={`mailto:${site.email}`} className="btn">{site.email}</a>
            <a href={site.socials.GitHub} className="btn btn-outline" {...ext}>GitHub ↗</a>
          </p>
        </section>
      </main>

      <footer className="container footer">
        <p>© {new Date().getFullYear()} {site.name}</p>
        <a href="#top">Back to top ↑</a>
      </footer>

      <Reveal />
    </>
  );
}
