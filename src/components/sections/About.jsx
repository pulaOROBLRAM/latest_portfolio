function About() {
  const languages = ["Python", "Java", "Kotlin", "JavaScript", "PHP", "C", "C++", "C#"]
  
  const frameworks = ["React", "FastAPI", "TensorFlow/TF Lite", "ASP.NET"]
  
  const mlAi = ["Transfer Learning", "Incremental Learning", "Model Deployment", "Dataset Auditing", "Data Preprocessing"]
  
  const tools = ["Machine Learning (Classification)", "Computer Vision (Image Classification)", "OpenCV basics", "Agile Development", "Git", "VS Code", "Figma", "Postman", "Docker"]

  return (
    <section id="about" className="py-20 sm:py-28 border-t border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
        {/* Left column - Bio */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-6">
            About me
          </h2>
          <div className="space-y-4 text-gray-500 leading-relaxed">
            <p>
              I'm a developer and AI engineer specializing in building intelligent applications 
              that solve real-world problems. With expertise across the full stack and machine learning,
              I bridge the gap between frontend experiences and backend intelligence.
            </p>
            <p>
              My focus is on creating efficient, scalable solutions — whether that's deploying 
              TensorFlow models, building responsive React interfaces, or architecting FastAPI backends.
            </p>
            <p>
              I believe in clean code, continuous learning, and technology that makes a difference.
              Currently exploring computer vision and incremental learning techniques.
            </p>
          </div>
        </div>

        {/* Right column - Skills */}
        <div className="space-y-6">
          {/* Languages */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
              Languages
            </h3>
            <div className="flex flex-wrap gap-2">
              {languages.map((skill) => (
                <span key={skill} className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Frameworks */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
              Frameworks
            </h3>
            <div className="flex flex-wrap gap-2">
              {frameworks.map((skill) => (
                <span key={skill} className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* ML & AI */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
              Machine Learning & AI
            </h3>
            <div className="flex flex-wrap gap-2">
              {mlAi.map((skill) => (
                <span key={skill} className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
              Tools & Concepts
            </h3>
            <div className="flex flex-wrap gap-2">
              {tools.map((skill) => (
                <span key={skill} className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full">
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