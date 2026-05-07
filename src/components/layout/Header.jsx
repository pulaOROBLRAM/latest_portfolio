import { useState, useEffect } from 'react'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  const navLinks = [
    { name: 'Work', href: '#work' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ]

  // Smooth scroll function
  const handleScroll = (e, targetId) => {
    e.preventDefault()
    const target = document.querySelector(targetId)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
      window.history.pushState(null, '', targetId)
    }
  }

  // Track active section on scroll - FIXED
  useEffect(() => {
    const sections = ['hero', 'work', 'about', 'contact'].map(id => 
      document.getElementById(id)
    ).filter(Boolean)
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120 // Offset for header
      
      // Find which section is currently in view
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
    handleScroll() // Call once to set initial state
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on window resize
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
    <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
      <nav className="max-w-5xl mx-auto px-6 py-4 sm:py-5 flex justify-between items-center">
        {/* Logo */}
        <a 
          href="#hero" 
          onClick={(e) => handleScroll(e, '#hero')}
          className="text-xl font-medium tracking-tight text-gray-900 hover:text-gray-600 transition"
        >
          Khaki
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden sm:flex gap-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className={`text-sm transition ${
                  activeSection === link.href.substring(1)
                    ? 'text-gray-900 font-medium'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="sm:hidden p-2 text-gray-900 hover:text-gray-600 transition"
          aria-label="Toggle menu"
        >
          <div className="w-6 h-5 relative flex flex-col justify-between">
            <span className={`w-full h-0.5 bg-gray-900 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-full h-0.5 bg-gray-900 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-full h-0.5 bg-gray-900 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-x-0 top-[61px] bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all duration-300 sm:hidden ${
            isMenuOpen ? 'opacity-100 visible max-h-96' : 'opacity-0 invisible max-h-0'
          } overflow-hidden`}
        >
          <ul className="flex flex-col py-6 space-y-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className={`block px-6 py-2 text-base transition ${
                    activeSection === link.href.substring(1)
                      ? 'text-gray-900 font-medium bg-gray-50'
                      : 'text-gray-500 hover:text-gray-900'
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