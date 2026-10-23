import Scene from './Scene';
import StoryScene from './StoryScene';
import ThemeToggle from './ThemeToggle';
import Motion from './Motion';
import { site } from './site';

// Seedance clip if provided, otherwise the generated still.
const Media = ({ img, video, ...p }) =>
  video ? <video src={video} poster={img} autoPlay muted loop playsInline {...p} /> : <img src={img} alt="" {...p} />;

// Structured data: lets Google tie the name, this site, GitHub and the projects to one person.
const person = { '@id': `${site.url}/#person` };
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person', ...person, name: site.name, url: site.url, image: `${site.url}/me.webp`,
      jobTitle: ['Software Developer', 'Aspiring Penetration Tester'], description: site.seoDescription,
      address: { '@type': 'PostalAddress', addressCountry: 'PH' },
      knowsAbout: [...site.skills, ...site.security], sameAs: Object.values(site.socials),
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

const pad = (n) => String(n + 1).padStart(2, '0');

// External links open in a new tab so visitors keep the portfolio open.
const ext = { target: '_blank', rel: 'noopener noreferrer' };

function Case({ p, i, total }) {
  // With a live site the whole browser frame is a link to it.
  const Frame = p.links.live ? 'a' : 'div';
  const frameProps = p.links.live ? { href: p.links.live, ...ext, 'aria-label': `Open ${p.title} live site` } : {};
  return (
    <article className="case">
      <Frame className="case-media" {...frameProps}>
        <div className="case-bar" aria-hidden="true"><i /><i /><i /><span className="mono">{p.bar}{p.links.live && ' ↗'}</span></div>
        <div className="case-shot">
          {p.image ? (
            <img src={p.image} alt={`${p.title} preview`} loading="lazy" data-parallax="4" />
          ) : (
            <div className="case-placeholder" aria-hidden="true">
              <span className="ph-ring" />
              <span className="ph-index">{pad(i)}</span>
              <span className="mono ph-caption">Preview coming soon</span>
            </div>
          )}
          {p.links.live && <span className="case-visit mono" aria-hidden="true">Visit {p.bar} ↗</span>}
        </div>
      </Frame>

      <div className="case-info">
        <p className="mono case-meta">
          <span>{pad(i)} / {pad(total - 1)}</span>
          <span>{p.kind} · {p.year}</span>
        </p>
        <h3>{p.title}</h3>
        <p className="mono case-role">{p.role}</p>
        <p className="case-summary">{p.summary}</p>
        {p.metrics.length > 0 && (
          <dl className="case-metrics">
            {p.metrics.map((m) => (
              <div key={m.label}>
                <dt className="mono">{m.label}</dt>
                <dd>{/^\d+$/.test(m.value) ? <span data-count={m.value}>{m.value}</span> : m.value}{m.suffix}</dd>
              </div>
            ))}
          </dl>
        )}
        <ul className="chips small" aria-label="Tech stack">{p.stack.map((t) => <li key={t}>{t}</li>)}</ul>
        <p className="case-links">
          {p.links.live && <a href={p.links.live} className="btn-ghost" {...ext}>Live site ↗</a>}
          {p.links.code && <a href={p.links.code} className="btn-ghost" {...ext}>View code ↗</a>}
        </p>
      </div>

      <div className="case-details" data-reveal>
        {[['Features', p.features], ['Techniques', p.techniques], ['Security', p.security]].map(([h, items]) => (
          <div key={h} className={h === 'Security' ? 'sec' : undefined}>
            <h4 className="mono">{h}</h4>
            <ul>{items.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
        ))}
      </div>
    </article>
  );
}

export default function Home() {
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
          <ThemeToggle />
          <a href="#contact" className="nav-hire">Hire me</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <header id="top" className="hero">
        <div className="hero-bg"><Media img="/void.webp" video={site.videos.hero} /></div>
        <div className="hero-title">
          <h1 className="hero-name">
            <span className="line">{first}</span>{' '}
            <span className="line outline">{rest.join(' ')}</span>
          </h1>
          {/* phones/tablets: the role sits under the name (the bottom meta line is covered there) */}
          <p className="hero-role mono">{site.role}</p>
        </div>
        <Scene />
        <div className="hero-me">
          {/* ghost trail: tinted echoes that lag behind pointer and scroll motion */}
          {[0, 1, 2].map((k) => <img key={k} src="/me.webp" alt="" aria-hidden="true" className="ghost" width="756" height="1356" />)}
          <img src="/me.webp" alt={`Portrait of ${site.name}`} width="756" height="1356" fetchPriority="high" className="me" />
        </div>
        <div className="hero-cards">
          <div className="term" aria-hidden="true">
            <div className="case-bar"><i /><i /><i /><span className="mono">geoff@gpscrypt:~</span></div>
            <div className="term-body">
              {site.terminal.map((l) => (
                <div key={l.cmd}>
                  <p className="t-cmd"><b>$</b> <span data-type>{l.cmd}</span></p>
                  {l.out.map((o) => <p key={o} className="t-out" data-type>{o}</p>)}
                </div>
              ))}
              <p className="t-cmd"><b>$</b> <i className="caret" /></p>
            </div>
          </div>
          <aside className="hire" aria-label="For recruiters">
            <div className="case-bar"><i /><i /><i /><span className="mono">hire.sh</span>{site.availability && <b className="live" aria-hidden="true" />}</div>
            <div className="sh">
              <p className="sh-c sh-hide">#!/usr/bin/env bash</p>
              {site.availability && <p><span className="sh-k">STATUS</span>=<span className="sh-s">&quot;{site.availability.toLowerCase()}&quot;</span></p>}
              <ul className="sh-hide">
                {site.highlights.map((h) => (
                  <li key={h.k}>
                    <span className="sh-k">{h.k}</span>=
                    {h.list ? (
                      <span className="sh-p">({h.list.map((x, i) => <span key={x}>{i ? ' ' : ''}<span className="sh-s">{x}</span></span>)})</span>
                    ) : h.href ? (
                      <a href={h.href} className="sh-s" {...ext}>&quot;{h.v}&quot; ↗</a>
                    ) : (
                      <span className="sh-s">&quot;{h.v}&quot;</span>
                    )}
                    {h.note && <span className="sh-c"> # {h.note}</span>}
                  </li>
                ))}
              </ul>
              <p className="hire-cta">
                <a href="#work" className="btn magnetic"><span aria-hidden="true">$ </span>./view_projects.sh</a>
                <a href="#contact" className="btn-ghost"><span aria-hidden="true">$ </span>./contact.sh</a>
                {site.resume && <a href={site.resume} className="btn-ghost" download><span aria-hidden="true">$ </span>wget resume.pdf</a>}
              </p>
            </div>
          </aside>
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
          <div className="pillar-grid">
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
          {site.videos.builder
            ? <Media img="/builder.webp" video={site.videos.builder} className="story-bg" />
            : <StoryScene fallback="/builder.webp" />}
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
          <div className="work-head">
            <div className="work-bg"><Media img="/lab.webp" video={site.videos.lab} data-parallax /></div>
            <div className="work-inner">
              <p className="mono eyebrow">(05) Featured work</p>
              <h2 className="kinetic">Welcome to the lab.</h2>
              <p className="work-lead">
                {site.projects.length} builds — from cinematic front-ends to enterprise infrastructure — each with the
                stack, techniques and security decisions behind it.
              </p>
            </div>
          </div>
          <div className="cases">
            {site.projects.map((p, i) => <Case key={p.title} p={p} i={i} total={site.projects.length} />)}
          </div>
          <a href={site.socials.GitHub} className="more mono">More on GitHub — github.com/{site.github} ↗</a>
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
