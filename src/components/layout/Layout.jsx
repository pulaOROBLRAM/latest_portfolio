import Header from './Header'
import Footer from './Footer'
import ThemeToggle from '../ThemeToggle'

function Layout({ landing, children }) {
  return (
    <div className="app-canvas">
      <ThemeToggle />
      <Header />
      <div className="app-landing">
        {landing}
      </div>
      <main className="app-main">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
