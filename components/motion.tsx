'use client'

import { useEffect } from 'react'

const SCRUB = 0.6

export function Motion() {
  useEffect(() => {
    let restore: (() => void) | undefined
    let cancelled = false
    let started = false
    let timer = 0

    const paintHud = () => {
      const main = document.getElementById('main')
      const hud = document.getElementById('hud')
      const hudYear = document.getElementById('hudYear')
      const themeMeta = document.getElementById('theme-color')
      if (!main || !hud || !hudYear) return
      const line = 72
      let top = main.querySelector<HTMLElement>('.scene')
      if (!top) return
      for (const scene of main.querySelectorAll<HTMLElement>('.scene')) {
        if (scene.getBoundingClientRect().top <= line) top = scene
      }
      const cs = getComputedStyle(top)
      hud.style.setProperty('--hud-ink', cs.getPropertyValue('--ink').trim())
      hud.style.setProperty('--hud-bg', cs.getPropertyValue('--bg').trim())
      hud.style.setProperty('--hud-accent', (cs.getPropertyValue('--name') || cs.getPropertyValue('--accent')).trim())
      if (themeMeta) themeMeta.setAttribute('content', cs.getPropertyValue('--bg').trim())
      hudYear.textContent = top.dataset.year ?? ''
      hud.classList.toggle('is-solid', top.id === 'contact' && top.getBoundingClientRect().top < -2)
    }

    const boot = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      if (cancelled) return

      gsap.registerPlugin(ScrollTrigger)
      ScrollTrigger.config({ ignoreMobileResize: true })
      if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
      if (!location.hash && window.scrollY < 12) window.scrollTo(0, 0)

      const main = document.getElementById('main')
      const hud = document.getElementById('hud')
      const hudYear = document.getElementById('hudYear')
      const themeMeta = document.getElementById('theme-color')
      if (!main || !hud || !hudYear) return

      const scenes = [...main.querySelectorAll<HTMLElement>('.scene')]
      const state = { tapeYear: 2021 }
      let current: HTMLElement | null = null

      const syncHud = () => {
        const line = 72
        let top = scenes[0]
        if (!top) return
        for (const scene of scenes) {
          if (scene.getBoundingClientRect().top <= line) top = scene
        }
        if (top !== current) {
          current = top
          const cs = getComputedStyle(top)
          const ink = cs.getPropertyValue('--ink').trim()
          const bg = cs.getPropertyValue('--bg').trim()
          const accent = cs.getPropertyValue('--name').trim() || cs.getPropertyValue('--accent').trim()
          hud.style.setProperty('--hud-ink', ink)
          hud.style.setProperty('--hud-bg', bg)
          hud.style.setProperty('--hud-accent', accent)
          if (themeMeta) themeMeta.setAttribute('content', bg)
        }
        const tape = top.id === 'rewind'
        hud.classList.toggle('is-rewinding', tape && state.tapeYear > 2021 && state.tapeYear < 2026)
        hudYear.textContent = tape ? String(state.tapeYear) : (top.dataset.year ?? '')
        const contact = top.id === 'contact'
        hud.classList.toggle('is-solid', contact && top.getBoundingClientRect().top < -2)
      }

      const measureBands = () => {
        for (const stage of main.querySelectorAll<HTMLElement>('.co .stage')) {
          const first = stage.querySelector('.co__copy')?.firstElementChild as HTMLElement | null
          if (first) stage.style.setProperty('--band', `${first.offsetTop}px`)
        }
      }
      measureBands()

      const H = () => window.innerHeight
      const narrow = () => window.matchMedia('(max-width: 760px), (orientation: portrait) and (max-width: 1100px), (max-height: 500px) and (orientation: landscape)').matches

      const mm = gsap.matchMedia()
      const always: Array<{ kill: () => void }> = []

      always.push(
        ScrollTrigger.create({
          start: 0,
          end: 'max',
          onUpdate: syncHud,
          onRefresh: () => {
            measureBands()
            syncHud()
          },
        }),
      )

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        let lenis: { raf: (time: number) => void; destroy: () => void } | null = null
        let ticker: ((time: number) => void) | null = null
        let dead = false
        const root = document.documentElement

        const progressTween = gsap.to('.progress i', {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
        })
        always.push(progressTween)

        let removePointer = () => {}
        let unsize = () => {}

        const ctx = gsap.context(() => {
          const parallax = (tl: gsap.core.Timeline, stage: Element, span: number, from0 = false) => {
            const amp = () => (narrow() ? 0.1 : 0.3)
            stage.querySelectorAll<HTMLElement>('.prop').forEach((prop) => {
              const depth = Number(prop.dataset.depth) || 0.4
              const rot = Number(prop.dataset.rot) || 0
              tl.fromTo(
                prop,
                { y: () => (from0 ? 0 : H() * amp() * depth), rotation: from0 ? rot : rot - 10 * depth },
                { y: () => -H() * (from0 ? 0.55 : amp()) * depth, rotation: rot + 10 * depth, duration: span, ease: 'none' },
                0,
              )
            })
            const pattern = stage.querySelector('.pattern')
            if (pattern) tl.fromTo(pattern, { yPercent: 7 }, { yPercent: -7, duration: span, ease: 'none' }, 0)
          }

          const hero = main.querySelector<HTMLElement>('.hero')
          if (hero) {
            const stage = hero.querySelector('.stage')
            const words = hero.querySelectorAll('.hero__word')
            const tl = gsap.timeline({
              defaults: { ease: 'none' },
              scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom bottom', scrub: SCRUB, invalidateOnRefresh: true },
            })
            if (stage) parallax(tl, stage, 1, true)
            if (words[0]) tl.to(words[0], { xPercent: -28, duration: 1 }, 0)
            if (words[1]) tl.to(words[1], { xPercent: 28, duration: 1 }, 0)
            tl.to('.hero__duck', { y: () => -H() * 0.5, rotation: 50, duration: 1 }, 0)
            tl.to(['.hero__row', '.hero__eyebrow', '.hero__cue'], { y: () => -H() * 0.12, opacity: 0, duration: 0.5 }, 0)
            if (stage) tl.fromTo(stage, { scale: 1, '--dim': 0 }, { scale: 0.9, '--dim': 0.62, duration: 1, ease: 'power1.in' }, 0)
          }

          const sceneTimeline = (section: Element) =>
            gsap.timeline({
              defaults: { ease: 'none' },
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom bottom',
                scrub: SCRUB,
                invalidateOnRefresh: true,
              },
            })

          const cover = (tl: gsap.core.Timeline, stage: Element) => {
            tl.fromTo(stage, { scale: 1, '--dim': 0 }, { scale: 0.9, '--dim': 0.62, duration: 1, ease: 'power1.in' }, 2)
          }

          const rewind = main.querySelector<HTMLElement>('.rewind')
          if (rewind) {
            const stage = rewind.querySelector('.stage')
            const yearEl = document.getElementById('rewindYear')
            const tc = document.getElementById('rewindTc')
            const tl = sceneTimeline(rewind)
            if (stage) tl.fromTo(stage, { '--r': '40px' }, { '--r': '0px', duration: 1 }, 0)
            const counter = { v: 2021 }
            tl.to(
              counter,
              {
                v: 2026,
                duration: 1.2,
                ease: 'power1.inOut',
                onUpdate: () => {
                  const y = Math.round(counter.v)
                  state.tapeYear = y
                  if (yearEl) yearEl.textContent = String(y)
                  if (tc) {
                    const secs = Math.max(0, Math.round((counter.v - 2021) * 900))
                    const hh = String(Math.floor(secs / 3600)).padStart(2, '0')
                    const mm = String(Math.floor(secs / 60) % 60).padStart(2, '0')
                    const ss = String(secs % 60).padStart(2, '0')
                    tc.textContent = `SP ${hh}:${mm}:${ss}`
                  }
                  if (current?.id === 'rewind') hudYear.textContent = String(y)
                },
              },
              0.35,
            )
            tl.from('.rewind__copy > *', { y: 28, opacity: 0, duration: 0.35, stagger: 0.06, ease: 'power2.out' }, 0.3)
            if (stage) cover(tl, stage)
          }

          main.querySelectorAll<HTMLElement>('.co').forEach((section) => {
            const stage = section.querySelector('.stage')
            const tl = sceneTimeline(section)
            if (stage) {
              tl.fromTo(stage, { '--r': '40px' }, { '--r': '0px', duration: 1 }, 0)
              parallax(tl, stage, 3)
            }
            const tapes = section.querySelectorAll('.tape__in')
            if (tapes.length) tl.fromTo(tapes, { xPercent: 0 }, { xPercent: -50, duration: 3 }, 0)
            tl.from(
              section.querySelectorAll('.prop__in'),
              {
                scale: 0.2,
                opacity: 0,
                rotation: (i: number) => (i % 2 ? 45 : -45),
                duration: 0.55,
                stagger: 0.08,
                ease: 'back.out(1.5)',
              },
              0.28,
            )
            tl.from(
              section.querySelectorAll('.co__name .char'),
              { yPercent: 115, rotation: 9, duration: 0.45, stagger: 0.03, ease: 'power3.out' },
              0.36,
            )
            tl.from(section.querySelectorAll('.co__meta > *'), { y: 18, opacity: 0, duration: 0.3, stagger: 0.05, ease: 'power2.out' }, 0.44)
            const words = section.querySelectorAll('.co__line .w')
            if (words.length) tl.from(words, { opacity: 0.1, y: 10, duration: 0.3, stagger: 0.01, ease: 'power1.out' }, 0.56)
            section.querySelectorAll('.stat').forEach((stat, i) => {
              const at = 0.66 + i * 0.08
              tl.from(stat, { y: 20, opacity: 0, duration: 0.28 }, at)
              tl.fromTo(stat, { '--rule': 0 }, { '--rule': 1, duration: 0.35 }, at)
            })
            const foot = section.querySelector('.co__foot')
            if (foot) tl.from(foot, { y: 14, opacity: 0, duration: 0.28 }, 0.98)
            if (stage) cover(tl, stage)
          })

          const projects = main.querySelector<HTMLElement>('.projects')
          const track = document.getElementById('track')
          const end = main.querySelector<HTMLElement>('.end')
          if (projects && track) {
            const stage = projects.querySelector('.stage')
            const dist = () => Math.max(0, track.scrollWidth - window.innerWidth)
            const size = () => {
              root.classList.add('is-motion')
              projects.style.height = `${Math.round(H() * 2.05 + dist())}px`
            }
            size()
            ScrollTrigger.addEventListener('refreshInit', size)
            unsize = () => ScrollTrigger.removeEventListener('refreshInit', size)

            gsap
              .timeline({ scrollTrigger: { trigger: projects, start: 'top bottom', end: 'top top', scrub: SCRUB } })
              .from('.projects__title span', { yPercent: 60, opacity: 0, stagger: 0.1, ease: 'power3.out', duration: 0.5 }, 0.45)
              .from('.projects__lede, .projects__links, .projects__note', { y: 30, opacity: 0, stagger: 0.06, ease: 'power2.out', duration: 0.4 }, 0.55)

            const pattern = stage?.querySelector('.pattern')
            if (pattern) {
              gsap.to(pattern, {
                xPercent: -8,
                ease: 'none',
                scrollTrigger: {
                  trigger: projects,
                  start: 'top top',
                  end: () => `+=${dist()}`,
                  scrub: SCRUB,
                  invalidateOnRefresh: true,
                },
              })
            }

            const slide = gsap.to(track, {
              x: () => -dist(),
              ease: 'none',
              scrollTrigger: {
                trigger: projects,
                start: 'top top',
                end: () => `+=${dist()}`,
                scrub: SCRUB,
                invalidateOnRefresh: true,
              },
            })

            if (stage && end) {
              gsap
                .timeline({ scrollTrigger: { trigger: end, start: 'top bottom', end: 'top top', scrub: SCRUB } })
                .fromTo(stage, { scale: 1, '--dim': 0 }, { scale: 0.9, '--dim': 0.62, ease: 'power1.in' })
            }

            main.querySelectorAll<HTMLElement>('.card').forEach((card) => {
              const tilt = Number(card.dataset.tilt) || 1
              gsap.fromTo(
                card,
                { rotation: tilt * 7, y: 70 },
                {
                  rotation: tilt * 1.5,
                  y: 0,
                  ease: 'power1.out',
                  scrollTrigger: { trigger: card, containerAnimation: slide, start: 'left right', end: 'center 60%', scrub: SCRUB },
                },
              )
              const art = card.querySelector('.card__art img')
              if (art) {
                gsap.fromTo(
                  art,
                  { xPercent: 12, rotation: tilt * 10 },
                  {
                    xPercent: -12,
                    rotation: -tilt * 6,
                    ease: 'none',
                    scrollTrigger: { trigger: card, containerAnimation: slide, start: 'left right', end: 'right left', scrub: SCRUB },
                  },
                )
              }
            })
          }

          if (end) {
            const tl = gsap.timeline({ scrollTrigger: { trigger: end, start: 'top bottom', end: 'top top', scrub: SCRUB } })
            tl.fromTo(end, { '--r': '40px' }, { '--r': '0px', ease: 'none', duration: 1 }, 0)
            tl.from('.end__title .char', { yPercent: 110, rotation: 8, stagger: 0.02, duration: 0.4, ease: 'power3.out' }, 0.45)
            tl.from(['.end__inner > .eyebrow', '.end__lede', '.end__actions'], { y: 30, opacity: 0, stagger: 0.05, duration: 0.3, ease: 'power2.out' }, 0.55)
          }

          if (window.matchMedia('(pointer: fine)').matches) {
            document.documentElement.classList.add('has-pointer')
            const movers = new Map<HTMLElement, { x: (v: number) => void; y: (v: number) => void; d: number }>()
            const onMove = (event: PointerEvent) => {
              const line = 80
              let scene = scenes[0]
              if (!scene) return
              for (const item of scenes) if (item.getBoundingClientRect().top <= line) scene = item
              const spot = scene.querySelector<HTMLElement>('.pattern--spot')
              if (spot) {
                const rect = spot.getBoundingClientRect()
                spot.style.setProperty('--spx', `${(((event.clientX - rect.left) / rect.width) * 100).toFixed(1)}%`)
                spot.style.setProperty('--spy', `${(((event.clientY - rect.top) / rect.height) * 100).toFixed(1)}%`)
              }
              const nx = event.clientX / window.innerWidth - 0.5
              const ny = event.clientY / window.innerHeight - 0.5
              scene.querySelectorAll<HTMLElement>('.prop').forEach((prop) => {
                let mover = movers.get(prop)
                if (!mover) {
                  const inner = prop.querySelector('.prop__in')
                  if (!inner) return
                  mover = {
                    x: gsap.quickTo(inner, 'x', { duration: 0.9, ease: 'power3.out' }),
                    y: gsap.quickTo(inner, 'y', { duration: 0.9, ease: 'power3.out' }),
                    d: Number(prop.dataset.depth) || 0.4,
                  }
                  movers.set(prop, mover)
                }
                mover.x(-nx * 60 * mover.d)
                mover.y(-ny * 44 * mover.d)
              })
            }
            window.addEventListener('pointermove', onMove, { passive: true })
            removePointer = () => window.removeEventListener('pointermove', onMove)
          }
        }, main)

        import('lenis')
          .then(({ default: Lenis }) => {
            if (dead || cancelled) return
            const instance = new Lenis({
              lerp: 0.09,
              smoothWheel: true,
              syncTouch: false,
              wheelMultiplier: 0.95,
              touchMultiplier: 1,
              autoRaf: false,
              anchors: { duration: 1, lock: false },
              stopInertiaOnNavigate: true,
              allowNestedScroll: true,
              respectReducedMotion: true,
            })
            lenis = instance
            instance.on('scroll', ScrollTrigger.update)
            ticker = (time: number) => instance.raf(time * 1000)
            gsap.ticker.add(ticker)
            gsap.ticker.lagSmoothing(0)
          })
          .catch(() => {
            /* Native scrolling stays in place if smooth scroll cannot start. */
          })

        return () => {
          dead = true
          unsize()
          removePointer()
          if (ticker) gsap.ticker.remove(ticker)
          lenis?.destroy()
          ctx.revert()
          root.classList.remove('is-motion', 'has-pointer')
          const projects = main.querySelector<HTMLElement>('.projects')
          if (projects) projects.style.height = ''
        }
      })

      document.fonts.ready.then(() => {
        if (!cancelled) {
          measureBands()
          ScrollTrigger.refresh()
        }
      })

      restore = () => {
        mm.revert()
        always.forEach((item) => item.kill())
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      }
      syncHud()
    }

    const start = () => {
      if (started || cancelled) return
      started = true
      window.clearTimeout(timer)
      if (idle) window.cancelIdleCallback?.(idle)
      void boot().catch(() => {
        /* Leave the page on native scrolling. */
      })
    }

    paintHud()
    window.addEventListener('scroll', paintHud, { passive: true })
    // After the first paint, not on the first input. Idle yields to the hero,
    // and the timeout covers browsers without requestIdleCallback.
    const win = window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number }
    const idle = win.requestIdleCallback?.(() => start(), { timeout: 450 })
    timer = window.setTimeout(start, 500)

    return () => {
      cancelled = true
      window.clearTimeout(timer)
      if (idle) window.cancelIdleCallback?.(idle)
      window.removeEventListener('scroll', paintHud)
      restore?.()
    }
  }, [])

  return null
}
