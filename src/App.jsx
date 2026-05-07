import Layout from './components/layout/Layout'
import Hero from './components/sections/Hero'

function App() {
  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-6">
        <Hero />
      </div>
    </Layout>
  )
}

export default App