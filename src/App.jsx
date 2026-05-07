import Layout from './components/layout/Layout'
import Hero from './components/sections/Hero'
import Work from './components/sections/Work'
import About from './components/sections/About'
import Contact from './components/sections/Contact'

function App() {
  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-6">
        <Hero />
        <Work />
        <About />
        <Contact />
      </div>
    </Layout>
  )
}

export default App