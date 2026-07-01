import { useCallback, useEffect, useState } from 'react'
import { playThemeTransition } from '../utils/playThemeTransition'

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

async function applyTheme(theme, { animate = false } = {}) {
  const update = () => {
    document.documentElement.setAttribute('data-theme', theme)
    document.body.setAttribute('data-theme', theme)
  }

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!animate || prefersReduced) {
    update()
    return
  }

  const transition = playThemeTransition(theme, { onBlocked: update })
  await transition
}

applyTheme(getInitialTheme())

export function useTheme() {
  const [theme, setThemeState] = useState(getInitialTheme)

  useEffect(() => {
    if (getStoredTheme()) return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      const next = getSystemTheme()
      applyTheme(next, { animate: false })
      setThemeState(next)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const setTheme = useCallback((next) => {
    applyTheme(next, { animate: false })
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
      applyTheme(next, { animate: true })
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
