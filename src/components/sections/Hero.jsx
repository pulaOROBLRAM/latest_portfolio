function Hero() {
  return (
    <section id="hero" className="min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-5rem)] flex items-center py-8 sm:py-12">
      <div className="w-full">
        <div className="inline-block mb-4 sm:mb-5 px-2.5 sm:px-3 py-1 text-xs font-medium tracking-wide bg-gray-100 rounded-full">
          ML Engineer & Full-Stack Developer
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-4 sm:mb-5 leading-tight">
          Building intelligent
          <br />
          applications with
          <br />
        </h1>
        <p className="text-base sm:text-lg text-gray-500 max-w-xl mb-6 sm:mb-8">
          ML Engineer and full-stack developer specializing in computer vision, 
          model deployment, and scalable web applications.
        </p>
        <div className="flex flex-col xs:flex-row gap-3 sm:gap-4">
          <a 
            href="#work" 
            className="px-5 sm:px-6 py-2.5 sm:py-3 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition text-center"
          >
            View work →
          </a>
          <a 
            href="#contact" 
            className="px-5 sm:px-6 py-2.5 sm:py-3 border border-gray-200 text-gray-700 text-sm font-medium rounded-full hover:border-gray-400 transition text-center"
          >
            Get in touch
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero