const LINES = [
  'Compiling personality (tsc --strict)…',
  'Tree-shaking the bad jokes…',
  'Rehydrating (drinking water)…',
  'Removing unused JavaScript (most of it)…',
  'Asking the rubber duck…',
]

/**
 * Parse-time boot. Ticks look the curtain up by id so a hydration swap
 * cannot leave the timers on a detached node. The page stays in the DOM.
 */
const BOOT = `
(function () {
  var lines = ${JSON.stringify(LINES)}
  function reduce() {
    try { return matchMedia('(prefers-reduced-motion: reduce)').matches } catch (e) { return false }
  }
  function seen() {
    try { return sessionStorage.getItem('rs-seen') === '1' } catch (e) { return false }
  }
  function curtain() { return document.getElementById('loader') }
  function hide() {
    var el = curtain()
    if (el) el.style.setProperty('display', 'none', 'important')
  }
  var phase = (reduce() || seen()) ? 'skip' : 'run'
  function markSkip() {
    var el = curtain()
    if (el) el.classList.add('is-skip')
  }
  if (phase === 'skip') {
    hide()
    markSkip()
    var skips = 0
    var keep = setInterval(function () {
      hide()
      markSkip()
      if (++skips > 24) clearInterval(keep)
    }, 80)
    return
  }
  function blockScroll(e) {
    if (phase === 'done') return
    e.preventDefault()
  }
  function onKey(e) {
    if (phase === 'done') return
    var k = e.key
    if (k === ' ' || k === 'ArrowDown' || k === 'ArrowUp' || k === 'PageDown' || k === 'PageUp' || k === 'Home' || k === 'End') e.preventDefault()
  }
  window.addEventListener('wheel', blockScroll, { passive: false })
  window.addEventListener('touchmove', blockScroll, { passive: false })
  window.addEventListener('keydown', onKey)
  function unlock() {
    window.removeEventListener('wheel', blockScroll)
    window.removeEventListener('touchmove', blockScroll)
    window.removeEventListener('keydown', onKey)
  }
  var i = 0
  var cycle = setInterval(function () {
    if (phase !== 'run') return
    var el = curtain()
    var line = el && el.querySelector('.loader__line')
    i = (i + 1) % lines.length
    if (line) line.textContent = lines[i]
  }, 420)
  var start = performance.now()
  function tick(now) {
    if (phase !== 'run') return
    var el = curtain()
    var pct = el && el.querySelector('b')
    var t = Math.min(1, (now - start) / 560)
    if (pct) pct.textContent = String(Math.round((1 - Math.pow(1 - t, 2)) * 92))
    if (t < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
  function finish() {
    if (phase !== 'run') return
    phase = 'leaving'
    clearInterval(cycle)
    clearTimeout(fail)
    var el = curtain()
    var pct = el && el.querySelector('b')
    var line = el && el.querySelector('.loader__line')
    if (pct) pct.textContent = '100'
    if (line) line.textContent = 'Ready. Mostly.'
    if (el && !el.classList.contains('is-leave')) el.classList.add('is-leave')
    try { sessionStorage.setItem('rs-seen', '1') } catch (e) {}
    setTimeout(function () {
      phase = 'done'
      hide()
      unlock()
    }, 1100)
  }
  var fail = setTimeout(finish, 1700)
  setTimeout(finish, 680)
  var guard = 0
  var watch = setInterval(function () {
    guard += 1
    var el = curtain()
    if (phase === 'leaving' && el && !el.classList.contains('is-leave')) el.classList.add('is-leave')
    if (phase === 'done') {
      hide()
      unlock()
      clearInterval(watch)
    } else if (guard > 16) {
      phase = 'done'
      hide()
      unlock()
      clearInterval(watch)
    }
  }, 120)
})()
`

export function Loader() {
  return (
    <>
      <div className="loader" id="loader" aria-hidden="true" suppressHydrationWarning>
        <p className="loader__mark">
          RS<i>®</i>
        </p>
        <p className="loader__line" suppressHydrationWarning>
          {LINES[0]}
        </p>
        <p className="loader__pct">
          <b suppressHydrationWarning>0</b>%
        </p>
      </div>
      <script dangerouslySetInnerHTML={{ __html: BOOT }} />
      <script
        dangerouslySetInnerHTML={{
          __html:
            "setTimeout(function(){var el=document.getElementById('loader');if(el)el.style.setProperty('display','none','important')},2400)",
        }}
      />
    </>
  )
}
