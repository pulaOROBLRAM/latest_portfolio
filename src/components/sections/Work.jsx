function Work() {
  const projects = [
    {
      id: 1,
      title: "SkinSight AI",
      category: "Web-App",
      year: "2025",
      image: "https://placehold.co/600x400/e5e7eb/9ca3af?text=Project+1"
    }
  ]

  return (
    <section id="work" className="py-20 sm:py-28">
      <div className="mb-12 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-3">
          Selected work
        </h2>
        <p className="text-gray-500 max-w-md">
          A collection of my projects, from concept to launch.
        </p>
      </div>

      {/* Responsive Grid - 1 column on mobile, 2 on tablet, 3 on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {projects.map((project) => (
          <a 
            key={project.id}
            href="#" 
            className="group cursor-pointer"
          >
            <div className="overflow-hidden rounded-2xl bg-gray-100 mb-4">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {project.category}
                </p>
              </div>
              <span className="text-sm text-gray-400">
                {project.year}
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

export default Work