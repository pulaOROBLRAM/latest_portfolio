import Header from './Header'
import Footer from './Footer'

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-24">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout