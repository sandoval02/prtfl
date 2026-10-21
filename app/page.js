import Scene from './Scene';
import { site } from './site';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  jobTitle: site.role,
  knowsAbout: [...site.skills, ...site.security],
  url: site.url,
  sameAs: Object.values(site.socials),
};

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
        title: r.name.replace(/[-_]/g, ' '),
        desc: r.description || 'No description yet.',
        tags: [r.language, ...r.topics].filter(Boolean).slice(0, 4),
        link: r.homepage || r.html_url,
      }));
  } catch {
    return [];
  }
}

export default async function Home() {
  const projects = [...site.projects, ...(await getRepos())];
  const [host, tld] = new URL(site.url).hostname.split('.');
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="nav">
        <a href="#top" className="logo">{host}<span>.{tld}</span></a>
        <div>
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <header id="top" className="hero">
        <img src="/hero.webp" alt="" className="hero-bg" />
        <Scene />
        <div className="hero-text">
          <p className="eyebrow">{'// '}{site.role}</p>
          <h1>{site.name}</h1>
          <p className="lead">{site.tagline}</p>
          <a href="#work" className="btn">View my work</a>
        </div>
      </header>

      <main>
        <section id="about">
          <h2>About</h2>
          <p className="lead">
            I&apos;m a software developer who builds web apps that feel alive, and an aspiring
            penetration tester sharpening offensive security skills in labs and CTFs.
          </p>
          <h3 className="sub">Development</h3>
          <ul className="chips">
            {site.skills.map((s) => <li key={s}>{s}</li>)}
          </ul>
          <h3 className="sub">Security</h3>
          <ul className="chips pink">
            {site.security.map((s) => <li key={s}>{s}</li>)}
          </ul>
        </section>

        <section id="work">
          <h2>Selected Work</h2>
          <div className="grid">
            {projects.map((p) => (
              <article key={p.title} className="card">
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <ul className="chips small">{p.tags.map((t) => <li key={t}>{t}</li>)}</ul>
                <a href={p.link}>View project →</a>
              </article>
            ))}
          </div>
        </section>

        <section id="contact">
          <h2>Let&apos;s build the future</h2>
          <a href={`mailto:${site.email}`} className="btn">{site.email}</a>
          <p className="socials">
            {Object.entries(site.socials).map(([k, v]) => <a key={k} href={v} rel="me">{k}</a>)}
          </p>
        </section>
      </main>

      <footer>© {new Date().getFullYear()} {site.name}</footer>
    </>
  );
}
