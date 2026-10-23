import type { CSSProperties } from 'react'
import { Loader } from './loader'
import { Motion } from './motion'
import artMeta from '@/lib/art-meta.json'
import { HEALTH, HERO_PROPS, JOBS, PROJECTS, SKILLS, profile, type Theme, type ToyProp } from '@/lib/content'

function ToyImg({ name, sizes, lazy, className = 'prop__img' }: { name: string; sizes: string; lazy: boolean; className?: string }) {
  const meta = artMeta[name as keyof typeof artMeta]
  const base = `/portfolio-yen/img/${name}`
  return (
    <picture>
      <source type="image/avif" srcSet={`${base}-sm.avif ${meta.smW}w, ${base}.avif ${meta.w}w`} sizes={sizes} />
      <img
        className={className}
        src={`${base}.webp`}
        srcSet={`${base}-sm.webp ${meta.smW}w, ${base}.webp ${meta.w}w`}
        sizes={sizes}
        alt=""
        width={meta.w}
        height={meta.h}
        loading={lazy ? 'lazy' : 'eager'}
        decoding="async"
        draggable={false}
      />
    </picture>
  )
}

function Words({ text }: { text: string }) {
  return text.split(/(\s+)/).map((part, i) =>
    /^\s+$/.test(part) ? (
      <span key={i}>{part}</span>
    ) : (
      <span className="w" key={i}>
        {part}
      </span>
    ),
  )
}

function Chars({ text, staggerFrom }: { text: string; staggerFrom?: number }) {
  let n = 0
  return (
    <>
      {Array.from(text).map((c, i) => {
        if (c === ' ') return <span key={i}> </span>
        const delay = staggerFrom === undefined ? undefined : (staggerFrom + n) * 0.05
        n += 1
        return (
          <span className="char" style={delay === undefined ? undefined : { animationDelay: `${delay}s` }} key={`${c}-${i}`}>
            {c}
          </span>
        )
      })}
    </>
  )
}

function themeStyle(theme: Theme): CSSProperties {
  return {
    ['--bg' as string]: theme.bg,
    ['--ink' as string]: theme.ink,
    ['--accent' as string]: theme.accent,
    ['--soft' as string]: theme.soft,
    ['--name' as string]: theme.name,
    ['--star' as string]: theme.star,
  }
}

function propStyle(p: ToyProp, i: number): CSSProperties {
  return {
    ['--x' as string]: p.x,
    ['--y' as string]: p.y,
    ['--w' as string]: p.w,
    ['--mw' as string]: p.mw ?? p.w,
    ['--mx' as string]: p.mx ?? p.x,
    ['--my' as string]: p.my ?? p.y,
    ['--dur' as string]: `${(5.2 + ((i * 1.37) % 2.6)).toFixed(2)}s`,
    ['--delay' as string]: `${(-i * 1.1).toFixed(2)}s`,
  }
}

function Prop({ p, i, eager = false }: { p: ToyProp; i: number; eager?: boolean }) {
  return (
    <div className="prop" data-depth={p.depth} data-rot={p.rot ?? 0} style={{ ...propStyle(p, i), transform: `rotate(${p.rot ?? 0}deg)` }}>
      <div className="prop__c">
        <div className="prop__in">
          <ToyImg name={p.img} sizes={`(max-width: 1100px) ${p.mw ?? p.w}vw, ${p.w}vw`} lazy={!eager} />
        </div>
      </div>
    </div>
  )
}

function Tape({ words }: { words: string[] }) {
  const row = [...words, ...words]
  return (
    <div className="tape" aria-hidden="true">
      {[0, 1].map((copy) => (
        <div className="tape__in" key={copy}>
          {row.map((word, i) => (
            <span key={`${copy}-${i}`}>{word}</span>
          ))}
        </div>
      ))}
    </div>
  )
}

const year = new Date().getFullYear()

export function Site() {
  return (
    <>
      <Loader />
      <a className="skip" href="#bajaj">
        Skip to work
      </a>
      <header className="hud" id="hud">
        <a className="hud__logo" href="#top" data-goto="#top" aria-label={`${profile.name}, back to top`}>
          Roshan
        </a>
        <p className="hud__year" aria-hidden="true">
          <span className="hud__rew">▶▶</span>
          <b id="hudYear">{year}</b>
        </p>
        <nav className="hud__nav" aria-label="Primary">
          <a className="hud__link" href="#bajaj" data-goto="#bajaj">
            Work
          </a>
          <a className="hud__link hud__link--desk" href="#projects" data-goto="#projects">
            Projects
          </a>
          <a className="hud__cta" href="#contact" data-goto="#contact">
            Links
          </a>
        </nav>
      </header>
      <div className="progress" aria-hidden="true">
        <i />
      </div>
      <div className="grain" aria-hidden="true" />

      <main id="main">
        <section className="scene hero" id="top" data-year={year}>
          <div className="sticky">
            <div className="stage">
              <div className="pattern pattern--dots" aria-hidden="true" />
              <div className="props" aria-hidden="true">
                  {HERO_PROPS.map((p, i) => (
                    <Prop key={p.toy} p={p} i={i} eager />
                  ))}
              </div>
              <div className="hero__copy safe">
                <div className="hero__top">
                  <p className="eyebrow hero__eyebrow">
                    <span>Portfolio</span>
                    <span>{profile.location}</span>
                    <span>Since {profile.since}</span>
                  </p>
                  <p className="eyebrow hero__cue">
                    Scroll. One chapter per job. <span aria-hidden="true">↓</span>
                  </p>
                </div>
                <h1 className="hero__name" aria-label={profile.name}>
                  <span className="hero__word" aria-hidden="true">
                    <Chars text={profile.first} staggerFrom={0} />
                  </span>
                  <span className="hero__word" aria-hidden="true">
                    <Chars text={profile.last} staggerFrom={profile.first.length} />
                    <span className="hero__duck" aria-hidden="true">
                      <span className="hero__duck-in">
                        <ToyImg name="hero-duck" sizes="(max-width: 760px) 26vw, 13vw" lazy={false} />
                      </span>
                    </span>
                  </span>
                </h1>
                <div className="hero__row">
                  <p className="hero__lede">
                    Senior frontend and fullstack engineer. 6 years on <mark>enterprise and product</mark> web
                    applications. React, Next.js and Node.js. <em>Based in Mumbai.</em>
                  </p>
                  <ul className="hero__chips" aria-label="At a glance">
                    <li>
                      <b>6</b>
                      <span>years</span>
                    </li>
                    <li>
                      <b>3</b>
                      <span>companies</span>
                    </li>
                    <li>
                      <b>React</b>
                      <span>Next.js</span>
                    </li>
                    <li>
                      <b>Mumbai</b>
                      <span>India</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {JOBS.map((job, index) => {
          const longest = Math.max(...job.lines.map((line) => line.length))
          return (
            <section
              key={job.id}
              className={`scene co co--${job.id}`}
              id={job.id}
              data-year={job.year}
              style={themeStyle(job.theme)}
            >
              <div className="sticky">
                <div className="stage">
                  <div className={`pattern pattern--${job.pattern}`} aria-hidden="true" />
                  <div className="props" aria-hidden="true">
                    {job.props.map((p, i) => (
                      <Prop key={p.toy} p={p} i={i} />
                    ))}
                  </div>
                  <div className="co__copy safe">
                    <p className="co__meta eyebrow">
                      <span className="co__idx">
                        {String(index + 1).padStart(2, '0')} / {String(JOBS.length).padStart(2, '0')}
                      </span>
                      <span>{job.when}</span>
                      <span>{job.where}</span>
                      <span className="co__role">{job.role}</span>
                    </p>
                    <h2
                      className={`co__name${job.lines.length > 1 ? ' is-two' : ''}${job.mark ? ' has-reg' : ''}`}
                      style={{ ['--len' as string]: longest }}
                      aria-label={job.label}
                    >
                      {job.lines.map((line) => (
                        <span className="line" aria-hidden="true" key={line}>
                          <span className="line__in">
                            <Chars text={line} />
                          </span>
                        </span>
                      ))}
                    </h2>
                    <p className="co__line">
                      <Words text={job.line} />
                    </p>
                    <ul className="co__stats" style={{ ['--n' as string]: job.stats.length }}>
                      {job.stats.map((stat) => (
                        <li className="stat" key={stat.text}>
                          <b className="stat__num is-word">{stat.text}</b>
                          <span className="stat__label">{stat.label}</span>
                        </li>
                      ))}
                    </ul>
                    {job.foot ? <p className="co__foot">{job.foot}</p> : null}
                  </div>
                  <Tape words={job.tape} />
                </div>
              </div>
            </section>
          )
        })}

        <section className="scene rewind" id="rewind" data-year="2021">
          <div className="sticky">
            <div className="stage">
              <div className="rewind__scan" aria-hidden="true" />
              <div className="rewind__osd" aria-hidden="true">
                <span className="rewind__rew">▶▶ FF</span>
                <span className="rewind__tc" id="rewindTc">
                  SP 00:00:00
                </span>
              </div>
              <div className="rewind__copy safe">
                <p className="eyebrow">Back to now</p>
                <p className="rewind__year" aria-hidden="true">
                  <span id="rewindYear">2021</span>
                </p>
                <p className="rewind__line">
                  Three jobs, newest first, from 2021 to now. The tape runs forward for selected work.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="scene projects" id="projects" data-year={year}>
          <div className="sticky">
            <div className="stage">
              <div className="pattern pattern--grid" aria-hidden="true" />
              <div className="projects__track" id="track">
                <header className="projects__intro">
                  <div className="projects__feature">
                    <div>
                      <p className="eyebrow">Featured · solo build</p>
                      <h2 className="projects__title" aria-label={HEALTH.name}>
                        <span>Health</span>
                        <span>Shield</span>
                      </h2>
                    </div>
                    <div className="projects__toy" aria-hidden="true">
                      <ToyImg name="p-organ" sizes="(max-width: 760px) 28vw, 150px" lazy className="feature__img" />
                    </div>
                  </div>
                  <p className="projects__lede">{HEALTH.blurb}</p>
                  <ul className="flex flex-wrap gap-2" aria-label="HealthShield stack">
                    {HEALTH.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-current px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <div className="projects__links">
                    <a className="btn btn--light" href={HEALTH.url} target="_blank" rel="noopener noreferrer">
                      Live site
                    </a>
                    <a className="btn" href={HEALTH.portal} target="_blank" rel="noopener noreferrer">
                      Doctor portal
                    </a>
                    <a className="btn" href={HEALTH.source} target="_blank" rel="noopener noreferrer">
                      Source
                    </a>
                  </div>
                  <p className="projects__note">{HEALTH.note}</p>
                  <p className="projects__hint">
                    Keep scrolling <span aria-hidden="true">→</span>
                  </p>
                </header>
                <div className="projects__cards">
                  {PROJECTS.map((project, i) => (
                    <article
                      key={project.id}
                      className="card"
                      style={{ ['--c-bg' as string]: project.bg, ['--c-ink' as string]: project.ink }}
                      data-tilt={i % 2 ? 1 : -1}
                    >
                      <div className="card__art" aria-hidden="true">
                        <ToyImg name={project.img} sizes="(max-width: 760px) 70vw, 22vw" lazy className="card__pic" />
                      </div>
                      <div className="card__top">
                        <span>
                          {String(i + 1).padStart(2, '0')} · {project.kicker}
                        </span>
                      </div>
                      <h3 className="card__name">{project.name}</h3>
                      <p className="card__blurb">{project.blurb}</p>
                      <ul className="card__tags">
                        {project.tags.map((tag) => (
                          <li key={tag}>{tag}</li>
                        ))}
                      </ul>
                      {project.links ? (
                        <div className="card__links">
                          {project.links.map((link) => (
                            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.aria}>
                              {link.label}
                            </a>
                          ))}
                        </div>
                      ) : (
                        <p className="card__meta">{project.kicker}</p>
                      )}
                    </article>
                  ))}
                </div>
                <aside className="projects__more">
                  <p className="eyebrow">Public links</p>
                  <ul className="more__list">
                    <li>
                      <a href={profile.github} target="_blank" rel="me noopener noreferrer">
                        GitHub
                      </a>
                    </li>
                    <li>
                      <a href="https://github.com/Roshan190/form-ninja" target="_blank" rel="noopener noreferrer">
                        form-ninja
                      </a>
                    </li>
                    <li>
                      <a href={HEALTH.source} target="_blank" rel="noopener noreferrer">
                        health-shield
                      </a>
                    </li>
                    <li>
                      <a href={HEALTH.url} target="_blank" rel="noopener noreferrer">
                        health-shield.in
                      </a>
                    </li>
                  </ul>
                  <a className="btn btn--light" href={`${profile.github}?tab=repositories`} target="_blank" rel="noopener noreferrer">
                    Repositories ↗
                  </a>
                </aside>
              </div>
            </div>
          </div>
        </section>

        <footer className="scene end" id="contact" data-year={year}>
          <div className="end__inner">
            <p className="eyebrow">That’s the scroll</p>
            <h2 className="end__title" aria-label="Find me online.">
              <span aria-hidden="true">
                <Chars text="Find me" />
              </span>
              <span aria-hidden="true">
                <Chars text="online" />
                <i>.</i>
              </span>
            </h2>
            <p className="end__lede">
              Senior frontend and fullstack engineer in Mumbai. GitHub and LinkedIn are the public links. HealthShield
              and Form Ninja are linked above.
            </p>
            <div className="end__actions">
              <a className="btn btn--big" href={profile.github} target="_blank" rel="me noopener noreferrer">
                GitHub ↗
              </a>
              <a className="btn" href={profile.linkedin} target="_blank" rel="me noopener noreferrer">
                LinkedIn ↗
              </a>
            </div>
            <div className="end__grid">
              <div>
                <h3>Education</h3>
                <ul>
                  <li>
                    <b>Mumbai University</b> · B.Sc. Computer Science, 2018–2021
                  </li>
                </ul>
                <h3>Certification</h3>
                <ul>
                  <li>The Complete 2024 Web Development Bootcamp, Udemy (2021)</li>
                </ul>
              </div>
              <div>
                <h3>Toolbox</h3>
                <ul className="end__tags">
                  {SKILLS.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="end__fine">
              Built with Next.js, TypeScript, Tailwind, GSAP and Lenis. Poster layout and motion adapted from{' '}
              <a href="https://github.com/davidyen1124/portfolio">David Yen’s portfolio</a> (MIT). This page does not use
              analytics or tracking. © {year} {profile.name}.
            </p>
          </div>
        </footer>
      </main>
      <Motion />
    </>
  )
}
