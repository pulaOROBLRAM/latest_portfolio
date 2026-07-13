import { useState, useEffect, useRef, useLayoutEffect } from 'react'

function Header() {
  const [activeSection, setActiveSection] = useState('hero')
  const [indicator, setIndicator] = useState({ left: 0, width: 0, ready: false })
  const pillsRef = useRef(null)
  const pillRefs = useRef({})

  const navLinks = [
    { name: 'Work', href: '#work' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ]

  useEffect(() => {
    const sections = ['hero', 'work', 'about', 'contact'].map(id =>
      document.getElementById(id)
    ).filter(Boolean)

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120

      let current = 'hero'

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (!section) continue
        const top = section.getBoundingClientRect().top + window.scrollY
        if (top <= scrollPosition) {
          current = section.id
          break
        }
      }

      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useLayoutEffect(() => {
    const updateIndicator = () => {
      const container = pillsRef.current
      const activeEl = pillRefs.current[activeSection]

      if (!container || !activeEl) {
        setIndicator((prev) => ({ ...prev, ready: false }))
        return
      }

      const containerRect = container.getBoundingClientRect()
      const activeRect = activeEl.getBoundingClientRect()

      setIndicator({
        left: activeRect.left - containerRect.left,
        width: activeRect.width,
        ready: true,
      })
    }

    updateIndicator()
    window.addEventListener('resize', updateIndicator)
    return () => window.removeEventListener('resize', updateIndicator)
  }, [activeSection])

  return (
    <header className="site-header">
      <nav className="max-w-5xl mx-auto px-6 py-4 sm:py-1 flex justify-between items-center">
        <a href="#hero" className="site-header__logo" aria-label="Khaki — home">
          <span className="site-header__logo-mark" aria-hidden="true" />
        </a>

        <ul className="hidden sm:flex gap-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className={`site-header__link text-sm ${
                  activeSection === link.href.substring(1) ? 'site-header__link--active' : ''
                }`}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        <div ref={pillsRef} className="site-header__pills sm:hidden">
          <span
            className={`site-header__pill-indicator${indicator.ready ? ' site-header__pill-indicator--ready' : ''}`}
            aria-hidden="true"
            style={{
              transform: `translateX(${indicator.left}px)`,
              width: indicator.width,
            }}
          />
          <ul className="site-header__pills-list" role="list">
            {navLinks.map((link) => {
              const id = link.href.substring(1)
              const isActive = activeSection === id

              return (
                <li key={link.name}>
                  <a
                    ref={(el) => {
                      pillRefs.current[id] = el
                    }}
                    href={link.href}
                    className={`site-header__pill${isActive ? ' site-header__pill--active' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.name}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header
