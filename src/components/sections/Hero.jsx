function Hero() {
  return (
    <section className="min-h-[calc(100vh-5rem)] flex items-center py-12">
      <div className="w-full">
        <div className="inline-block mb-5 px-3 py-1 text-xs font-medium tracking-wide bg-gray-100 rounded-full">
          Product Designer & Developer
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-5">
          Creating digital
          <br />
          experiences that
          <br />
          <span className="border-b-4 border-gray-300">feel effortless</span>
        </h1>
        <p className="text-base sm:text-lg text-gray-500 max-w-xl mb-8">
          I'm Enrich, a minimalist designer and front-end developer focused on clean interfaces and intentional interactions.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <a 
            href="#work" 
            className="px-6 py-3 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition text-center"
          >
            View work →
          </a>
          <a 
            href="#contact" 
            className="px-6 py-3 border border-gray-200 text-gray-700 text-sm font-medium rounded-full hover:border-gray-400 transition text-center"
          >
            Get in touch
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero