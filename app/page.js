import Scene from './Scene';
import Motion from './Motion';
import { site } from './site';

const score = (r) => r.stargazers_count * 3 + r.forks_count + (r.description ? 2 : 0) + (r.homepage ? 2 : 0);

// Runs once at build time (static export), so repos refresh on every deploy.
async function getRepos() {
  try {
    // Token (set in CI) only raises the rate limit; this endpoint returns public repos only.
    const headers = process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {};
    const res = await fetch(`https://api.github.com/users/${site.github}/repos?sort=updated&per_page=100`, { headers });
    if (!res.ok) throw new Error(res.status);
    return (await res.json())
      .filter((r) => !r.fork && !r.archived && r.name.toLowerCase() !== site.github.toLowerCase())
      // "best" = popularity + presentability; ties keep API order (most recently updated)
      .sort((a, b) => score(b) - score(a))
      .slice(0, 6)
      .map((r) => ({
        title: r.name.replace(/[-_]/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2'),
        desc: r.description || 'No description yet.',
        tags: [r.language, ...r.topics].filter(Boolean).slice(0, 4),
        link: r.homepage || r.html_url,
      }));
  } catch {
    return [];
  }
}

// Seedance clip if provided, otherwise the generated still.
const Media = ({ img, video, ...p }) =>
  video ? <video src={video} poster={img} autoPlay muted loop playsInline {...p} /> : <img src={img} alt="" {...p} />;

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  jobTitle: site.role,
  url: site.url,
  image: `${site.url}/me.webp`,
  knowsAbout: [...site.skills, ...site.security],
  sameAs: Object.values(site.socials),
};

const pad = (n) => String(n + 1).padStart(2, '0');

export default async function Home() {
  const projects = [...site.projects, ...(await getRepos())];
  const [host, tld] = new URL(site.url).hostname.split('.');
  const [first, ...rest] = site.name.split(' ');

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="loader" aria-hidden="true"><span>{host}.{tld}</span></div>
      <div className="grain" aria-hidden="true" />
      <div className="cursor" aria-hidden="true" />

      <nav className="nav">
        <a href="#top" className="logo">{host}<span>.{tld}</span></a>
        <div>
          <a href="#mission">Mission</a>
          <a href="#work">Work</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <header id="top" className="hero">
        <div className="hero-bg"><Media img="/void.webp" video={site.videos.hero} /></div>
        <h1 className="hero-name">
          <span className="line">{first}</span>{' '}
          <span className="line outline">{rest.join(' ')}</span>
        </h1>
        <Scene />
        <div className="hero-me">
          <img src="/me.webp" alt={`Portrait of ${site.name}`} width="756" height="1356" fetchPriority="high" />
        </div>
        <div className="hero-meta">
          <p className="mono">{site.role}</p>
          <p className="mono scroll-cue">Scroll <i /></p>
          <p className="mono">Based in {site.location}</p>
        </div>
      </header>

      <main>
        {/* ── STATS ── */}
        <section className="stats" aria-label="Quick stats" data-reveal>
          {site.stats.map((s) => (
            <div key={s.label}>
              <strong><span data-count={s.value}>{s.value}</span>{s.suffix}</strong>
              <span className="mono">{s.label}</span>
            </div>
          ))}
        </section>

        {/* ── MISSION ── */}
        <section id="mission" className="mission">
          <p className="mono eyebrow">(01) Mission</p>
          <p className="scrub-words">{site.mission}</p>
        </section>

        {/* ── PILLARS ── */}
        <section className="pillars">
          <p className="mono eyebrow">(02) What drives me</p>
          <h2 className="kinetic">Build. Break. Secure.</h2>
          <div className="pillar-grid" data-reveal>
            {site.pillars.map((p, i) => (
              <article key={p.title} className="pillar">
                <span className="mono">{pad(i)}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ── STORY ── */}
        <section className="story" aria-label="My story">
          <Media img="/builder.webp" video={site.videos.builder} className="story-bg" />
          <div className="story-shade" />
          <p className="mono eyebrow">(03) The story</p>
          <div className="chapters">
            {site.story.map((c, i) => (
              <article key={c.title} className="chapter">
                <span className="mono">Chapter {pad(i)}</span>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </article>
            ))}
          </div>
          <div className="story-progress" aria-hidden="true"><i /></div>
        </section>

        {/* ── SERVICES / COMMUNITY ── */}
        <section className="services">
          <p className="mono eyebrow">(04) What I do</p>
          <h2 className="kinetic">Services &amp; community</h2>
          <ul data-reveal>
            {site.services.map((s, i) => (
              <li key={s.title}>
                <span className="mono">{pad(i)}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <span className="arrow" aria-hidden="true">↗</span>
              </li>
            ))}
          </ul>
          <div className="skills">
            <h3 className="mono">Development</h3>
            <ul className="chips">{site.skills.map((s) => <li key={s}>{s}</li>)}</ul>
            <h3 className="mono">Security</h3>
            <ul className="chips orange">{site.security.map((s) => <li key={s}>{s}</li>)}</ul>
          </div>
        </section>

        {/* ── WORK ── */}
        <section id="work" className="work">
          <div className="work-bg"><Media img="/lab.webp" video={site.videos.lab} data-parallax /></div>
          <div className="work-inner">
            <p className="mono eyebrow">(05) Featured work</p>
            <h2 className="kinetic">Welcome to the lab.</h2>
            <div className="grid" data-reveal>
              {projects.map((p) => (
                <a key={p.title} href={p.link} className="card">
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <ul className="chips small">{p.tags.map((t) => <li key={t}>{t}</li>)}</ul>
                  <span className="mono">View project ↗</span>
                </a>
              ))}
              <a href={site.socials.GitHub} className="card more">
                <h3>More on GitHub</h3>
                <span className="mono">github.com/{site.github} ↗</span>
              </a>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section id="contact" className="cta">
          <div className="marquee" aria-hidden="true">
            <div className="marquee-track">
              {[0, 1].map((k) => <span key={k}>Build — Break — Secure — Build — Break — Secure — </span>)}
            </div>
          </div>
          <h2 className="kinetic">Let&apos;s build something secure.</h2>
          <a href={`mailto:${site.email}`} className="btn magnetic">{site.email}</a>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-top">
          <p className="mono">© {new Date().getFullYear()} {site.name}</p>
          <p className="footer-links">
            {Object.entries(site.socials).map(([k, v]) => <a key={k} href={v} rel="me">{k}</a>)}
            <a href={`mailto:${site.email}`}>Email</a>
            <a href="#top">Back to top ↑</a>
          </p>
        </div>
        <p className="wordmark" aria-hidden="true">{host}<span>.{tld}</span></p>
      </footer>

      <Motion />
    </>
  );
}
