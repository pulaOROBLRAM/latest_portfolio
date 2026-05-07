import Layout from './components/layout/Layout'
import Hero from './components/sections/Hero'
import Work from './components/sections/Work'
import About from './components/sections/About'

function App() {
  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-6">
        <Hero />
        <Work />
        <About />
      </div>
    </Layout>
  )
}

export default App