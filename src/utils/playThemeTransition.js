const FADE_IN_MS = 400
const EXIT_MS = 700
const REVEAL_MS = 900
const FADE_OUT_MS = 450
const BLOCK_MS = FADE_IN_MS + EXIT_MS
const CONTENT_END_MS = BLOCK_MS + REVEAL_MS
const TOTAL_MS = CONTENT_END_MS + FADE_OUT_MS

let active = false

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function applyTimingVars(root) {
  root.style.setProperty('--tt-fade-in', `${FADE_IN_MS}ms`)
  root.style.setProperty('--tt-exit', `${EXIT_MS}ms`)
  root.style.setProperty('--tt-reveal', `${REVEAL_MS}ms`)
  root.style.setProperty('--tt-fade-out', `${FADE_OUT_MS}ms`)
  root.style.setProperty('--tt-exit-delay', `${FADE_IN_MS}ms`)
  root.style.setProperty('--tt-reveal-delay', `${BLOCK_MS}ms`)
  root.style.setProperty('--tt-fade-out-delay', `${CONTENT_END_MS}ms`)
  root.style.setProperty('--tt-travel', '2.75rem')
}

function lockInput() {
  active = true
  document.documentElement.classList.add('theme-transition-active')
  document.getElementById('root')?.setAttribute('inert', '')
}

function unlockInput() {
  active = false
  document.documentElement.classList.remove('theme-transition-active')
  document.getElementById('root')?.removeAttribute('inert')
}

export function isThemeTransitionActive() {
  return active
}

export function playThemeTransition(toTheme, { onBlocked } = {}) {
  if (prefersReducedMotion()) {
    onBlocked?.()
    return Promise.resolve()
  }

  return new Promise((resolve) => {
    const root = document.createElement('div')
    root.className = `theme-transition theme-transition--to-${toTheme}`
    root.setAttribute('aria-hidden', 'true')
    root.innerHTML = `
      <div class="theme-transition__sky">
        <div class="theme-transition__sun" aria-hidden="true"></div>
        <div class="theme-transition__moon" aria-hidden="true"></div>
      </div>
      <div class="theme-transition__curtain" aria-hidden="true"></div>`

    applyTimingVars(root)

    let finished = false
    const finish = () => {
      if (finished) return
      finished = true
      root.removeEventListener('animationend', handleOverlayEnd)
      clearTimeout(blockTimer)
      clearTimeout(finishTimer)
      root.remove()
      unlockInput()
      resolve()
    }

    const handleOverlayEnd = (event) => {
      if (event.target !== root || event.animationName !== 'theme-overlay-out') return
      finish()
    }

    lockInput()
    document.body.appendChild(root)

    const blockTimer = setTimeout(() => {
      root.querySelector('.theme-transition__sky')?.classList.add('is-blocked')
      onBlocked?.()
    }, BLOCK_MS)

    root.addEventListener('animationend', handleOverlayEnd)
    const finishTimer = setTimeout(finish, TOTAL_MS + 50)
  })
}
