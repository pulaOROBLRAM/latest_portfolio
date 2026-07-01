const EXIT_MS = 200
const REVEAL_MS = 250
const DURATION_MS = EXIT_MS + REVEAL_MS

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function playThemeTransition(toTheme, { onBlocked } = {}) {
  if (prefersReducedMotion()) {
    onBlocked?.()
    return Promise.resolve()
  }

  return new Promise((resolve) => {
    const root = document.createElement('div')
    root.className = `theme-transition theme-transition--to-${toTheme}`
    root.innerHTML = `
      <div class="theme-transition__sky">
        <div class="theme-transition__sun" aria-hidden="true"></div>
        <div class="theme-transition__moon" aria-hidden="true"></div>
      </div>
      <div class="theme-transition__curtain" aria-hidden="true"></div>`

    let finished = false
    const finish = () => {
      if (finished) return
      finished = true
      root.remove()
      resolve()
    }

    document.body.appendChild(root)

    const blockTimer = setTimeout(() => onBlocked?.(), EXIT_MS)
    const risingBody = toTheme === 'dark'
      ? root.querySelector('.theme-transition__moon')
      : root.querySelector('.theme-transition__sun')

    const cleanup = () => {
      clearTimeout(blockTimer)
      risingBody?.removeEventListener('animationend', finish)
    }

    risingBody?.addEventListener('animationend', () => {
      cleanup()
      finish()
    }, { once: true })

    setTimeout(() => {
      cleanup()
      finish()
    }, DURATION_MS + 80)
  })
}
