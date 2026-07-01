import { useState, useEffect } from 'react'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

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
        if (section && section.offsetTop <= scrollPosition) {
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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640 && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isMenuOpen])

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

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="site-header__menu-btn sm:hidden p-2"
          aria-label="Toggle menu"
        >
          <div className="w-6 h-5 relative flex flex-col justify-between">
            <span className={`site-header__bar w-full h-0.5 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`site-header__bar w-full h-0.5 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`site-header__bar w-full h-0.5 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>

        <div
          className={`site-header__drawer fixed inset-x-0 top-[61px] transition-all duration-300 sm:hidden ${
            isMenuOpen ? 'opacity-100 visible max-h-96' : 'opacity-0 invisible max-h-0'
          } overflow-hidden`}
        >
          <ul className="flex flex-col py-6 space-y-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`site-header__drawer-link block px-6 py-2 text-base ${
                    activeSection === link.href.substring(1) ? 'site-header__drawer-link--active' : ''
                  }`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header
