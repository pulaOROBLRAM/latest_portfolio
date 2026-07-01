import { useCallback, useEffect, useRef, useState } from 'react'

const STORAGE_KEY = 'theme'

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function getStoredTheme() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'dark' || stored === 'light') return stored
  } catch {
    // localStorage unavailable
  }
  return null
}

function getInitialTheme() {
  return getStoredTheme() ?? getSystemTheme() ?? 'light'
}

function applyTheme(theme, { animate = false } = {}) {
  const update = () => {
    document.documentElement.setAttribute('data-theme', theme)
    document.body.setAttribute('data-theme', theme)
  }

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!animate || prefersReduced || !document.startViewTransition) {
    update()
    return
  }

  document.startViewTransition(update)
}

applyTheme(getInitialTheme())

export function useTheme() {
  const [theme, setThemeState] = useState(getInitialTheme)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    applyTheme(theme, { animate: true })
  }, [theme])

  useEffect(() => {
    if (getStoredTheme()) return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => setThemeState(getSystemTheme())

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const setTheme = useCallback((next) => {
    setThemeState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // localStorage unavailable
    }
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeState((current) => {
      const next = current === 'dark' ? 'light' : 'dark'
      try {
        localStorage.setItem(STORAGE_KEY, next)
      } catch {
        // localStorage unavailable
      }
      return next
    })
  }, [])

  return { theme, setTheme, toggleTheme, isDark: theme === 'dark' }
}
