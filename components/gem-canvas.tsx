'use client'

import { useEffect, useRef } from 'react'

type V = [number, number, number]

const FACES: [number, number, number][] = [
  [0, 1, 2],
  [0, 2, 3],
  [0, 3, 4],
  [0, 4, 1],
  [5, 2, 1],
  [5, 3, 2],
  [5, 4, 3],
  [5, 1, 4],
]

const COLORS = ['#FF4A1C', '#FFD23F', '#FFF6E4', '#C4310E', '#FF8A5B', '#F0B429', '#FFE9A0', '#E23B12']

function rot(v: V, ax: number, ay: number): V {
  const cx = Math.cos(ax)
  const sx = Math.sin(ax)
  const cy = Math.cos(ay)
  const sy = Math.sin(ay)
  const y = v[1] * cx - v[2] * sx
  const z = v[1] * sx + v[2] * cx
  const x = v[0] * cy + z * sy
  const z2 = -v[0] * sy + z * cy
  return [x, y, z2]
}

export default function GemCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const verts: V[] = [
      [0, -1, 0],
      [1, 0, 0],
      [0, 0, 1],
      [-1, 0, 0],
      [0, 0, -1],
      [0, 1, 0],
    ]

    let raf = 0
    let visible = true
    const draw = (now: number) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75)
      const size = canvas.clientWidth || 200
      const px = Math.round(size * dpr)
      if (canvas.width !== px) {
        canvas.width = px
        canvas.height = px
      }
      ctx.clearRect(0, 0, px, px)
      const ay = reduced ? 0.6 : now / 1400
      const ax = reduced ? 0.4 : 0.45 + Math.sin(now / 1800) * 0.25
      const projected = verts.map((v) => rot(v, ax, ay))
      const faces = FACES.map((f, i) => {
        const a = projected[f[0]]!
        const b = projected[f[1]]!
        const c = projected[f[2]]!
        const depth = (a[2] + b[2] + c[2]) / 3
        return { f, i, depth, a, b, c }
      }).sort((p, q) => p.depth - q.depth)

      const s = px * 0.34
      const cx = px / 2
      const cy = px / 2 + px * 0.02
      for (const face of faces) {
        const pts = [face.a, face.b, face.c]
        ctx.beginPath()
        pts.forEach((p, idx) => {
          const x = cx + p[0] * s
          const y = cy + p[1] * s
          if (idx === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        })
        ctx.closePath()
        ctx.fillStyle = COLORS[face.i % COLORS.length]!
        ctx.fill()
        ctx.lineWidth = Math.max(2, px * 0.012)
        ctx.strokeStyle = '#141414'
        ctx.stroke()
      }
      if (!reduced && visible) raf = requestAnimationFrame(draw)
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting)
      if (visible && !reduced) {
        cancelAnimationFrame(raf)
        raf = requestAnimationFrame(draw)
      }
    })
    io.observe(canvas)
    const onHide = () => {
      if (document.hidden) {
        visible = false
        cancelAnimationFrame(raf)
      } else if (!reduced) {
        visible = true
        raf = requestAnimationFrame(draw)
      }
    }
    document.addEventListener('visibilitychange', onHide)
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      document.removeEventListener('visibilitychange', onHide)
    }
  }, [])

  return <canvas ref={ref} className="gem-canvas" aria-hidden="true" />
}
