function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50 border-b border-gray-100">
      <nav className="max-w-5xl mx-auto px-6 py-5 flex justify-between items-center">
        <ul className="flex gap-8 text-sm">
          <li><a href="#work" className="hover:text-gray-600 transition">Work</a></li>
          <li><a href="#about" className="hover:text-gray-600 transition">About</a></li>
          <li><a href="#contact" className="hover:text-gray-600 transition">Contact</a></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header