function About() {
  const languages = ["Python", "Java", "Kotlin", "JavaScript", "PHP", "C", "C++", "C#"]
  const frameworks = ["React", "FastAPI", "TensorFlow/TF Lite", "ASP.NET"]
  const mlAi = ["Transfer Learning", "Incremental Learning", "Model Deployment", "Dataset Auditing", "Data Preprocessing"]
  const tools = ["ML Classification", "Computer Vision", "OpenCV", "Agile", "Git", "VS Code", "Figma", "Postman", "Docker"]

  return (
    <section id="about" className="py-16 sm:py-20 lg:py-28 border-t border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12 lg:gap-20">
        {/* Left column */}
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 mb-4 sm:mb-6">
            About me
          </h2>
          <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-500 leading-relaxed">
            <p>
              I'm an ML Engineer and full-stack developer specializing in building intelligent 
              applications that solve real-world problems. With expertise across the full stack and machine learning,
              I bridge the gap between frontend experiences and backend intelligence.
            </p>
            <p>
              My focus is on creating efficient, scalable solutions — whether that's deploying 
              TensorFlow models, building responsive React interfaces, or architecting FastAPI backends.
            </p>
          </div>
        </div>

        {/* Right column - Skills with responsive wrapping */}
        <div className="space-y-5 sm:space-y-6">
          <div>
            <h3 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wide mb-2 sm:mb-3">
              Languages
            </h3>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {languages.map((skill) => (
                <span key={skill} className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-gray-100 text-gray-700 text-xs sm:text-sm rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wide mb-2 sm:mb-3">
              Frameworks
            </h3>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {frameworks.map((skill) => (
                <span key={skill} className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-gray-100 text-gray-700 text-xs sm:text-sm rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wide mb-2 sm:mb-3">
              ML & AI
            </h3>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {mlAi.map((skill) => (
                <span key={skill} className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-gray-100 text-gray-700 text-xs sm:text-sm rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wide mb-2 sm:mb-3">
              Tools
            </h3>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {tools.map((skill) => (
                <span key={skill} className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-gray-100 text-gray-700 text-xs sm:text-sm rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About