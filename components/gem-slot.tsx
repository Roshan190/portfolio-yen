'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { ToyArt } from './toys'

const GemCanvas = dynamic(() => import('./gem-canvas'), { ssr: false })

export function GemSlot() {
  const [on, setOn] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const win = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
      cancelIdleCallback?: (id: number) => void
    }
    let idle = 0
    let timer = 0
    if (win.requestIdleCallback) idle = win.requestIdleCallback(() => setOn(true), { timeout: 1200 })
    else timer = window.setTimeout(() => setOn(true), 400)
    return () => {
      if (idle && win.cancelIdleCallback) win.cancelIdleCallback(idle)
      if (timer) window.clearTimeout(timer)
    }
  }, [])

  return (
    <div className="gem-slot">
      <ToyArt id="gem" />
      {on ? <GemCanvas /> : null}
    </div>
  )
}
