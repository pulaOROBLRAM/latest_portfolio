import { useEffect, useRef, useState } from 'react'
import { useTheme } from '../hooks/useTheme'

const SCROLL_TOP_THRESHOLD = 8
const SCROLL_FALLBACK_MS = 800

function ensureAtTop() {
  if (window.scrollY <= SCROLL_TOP_THRESHOLD) {
    return Promise.resolve()
  }

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' })

  return new Promise((resolve) => {
    const done = () => {
      if (window.scrollY <= SCROLL_TOP_THRESHOLD) {
        cleanup()
      }
    }

    const cleanup = () => {
      window.removeEventListener('scroll', done)
      clearTimeout(fallback)
      resolve()
    }

    window.addEventListener('scroll', done, { passive: true })
    const fallback = setTimeout(cleanup, SCROLL_FALLBACK_MS)
    done()
  })
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const busyRef = useRef(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const isDark = theme === 'dark'
  const nextMode = isDark ? 'Light' : 'Dark'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_TOP_THRESHOLD)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = async () => {
    if (busyRef.current) return

    busyRef.current = true
    try {
      await ensureAtTop()
      toggleTheme()
    } finally {
      busyRef.current = false
    }
  }

  const ariaLabel = isScrolled
    ? `Scroll to top and switch to ${nextMode.toLowerCase()} mode`
    : `Switch to ${nextMode.toLowerCase()} mode`

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={ariaLabel}
      className="theme-toggle"
    >
      <span className="theme-toggle__icon" aria-hidden="true">
        {isDark ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </span>
      <span className="theme-toggle__label">{nextMode} mode</span>
    </button>
  )
}

export default ThemeToggle
