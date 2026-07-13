import { useState } from 'react'

import ProjectModal from '../ProjectModal'



function Work() {

  const [loadedImages, setLoadedImages] = useState({})

  const [selectedProject, setSelectedProject] = useState(null)



  const projects = [

    {

      id: 1,
      title: "Skinsight AI v1",
      category: "WebApp",
      year: "2025",
      description: "An ML-powered skin analysis tool that delivers personalized recommendations based on user photos, offering a smart initial assessment that seamlessly connects you with skincare professionals.",
      image: "images/skinsight.png",
      contributions: [

        "Designed and developed the initial version of the app with a FastAPI backend for secure image uploads, preprocessing, and ML inference.",
        "Collaborated in an Agile team to gather requirements and iterate on features across development cycles.",
        "Integrated the skin analysis ML model after auditing datasets to validate quality and accuracy.",
        "Identified and removed mislabeled and low-quality samples to improve validation reliability and model performance.",
        "Conducted end-to-end, integration, and regression testing to ensure stability and compliance before release."

      ],
    },
    {
      id: 2,
      title: "Skinsight AI v2",
      category: "WebApp",
      year: "2026",
      description: "An AI-powered dermatology platform leveraging Gemini to deliver clinically validated assessments and highly personalized skincare regimens.",
      image: "images/skinsight.png",

      contributions: [

        "Researched, analyzed, and integrated data frameworks for a new suite of assessments, successfully launching them within the application.",
        "Strengthened application security by implementing strict validation protocols for payload dimensions, image types, and content MIME types.",
        "Conducted rigorous QA testing and validation on new assessments and AI model performance, ensuring maximum accuracy and system reliability."
      
      ]
    }
  ]



  const handleImageLoad = (id) => {

    setLoadedImages(prev => ({ ...prev, [id]: true }))

  }



  return (

    <section id="work" className="py-16 sm:py-20 lg:py-28">

      <div className="mb-10 sm:mb-12 lg:mb-16">

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 mb-2 sm:mb-3">

          Selected work

        </h2>

        <p className="text-sm sm:text-base text-gray-500 max-w-md">

          A collection of my recent projects, from concept to launch.

        </p>

      </div>



      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 lg:gap-8">

        {projects.map((project) => (

          <button

            key={project.id}

            type="button"

            onClick={() => setSelectedProject(project)}

            className="group cursor-pointer block text-left w-full"

          >

            <div className="relative overflow-hidden rounded-lg sm:rounded-2xl bg-gray-100 mb-2 sm:mb-4 aspect-square sm:aspect-[4/3]">

              {!loadedImages[project.id] && (

                <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse" />

              )}

              <img

                src={project.image}

                alt={project.title}

                className={`w-full h-full object-cover transition-all duration-500 ${

                  loadedImages[project.id] ? 'opacity-100' : 'opacity-0'

                } group-hover:scale-105 transition-transform duration-500`}

                onLoad={() => handleImageLoad(project.id)}

                onError={(e) => {

                  e.target.src = "https://placehold.co/600x400/e5e7eb/9ca3af?text=Image+Not+Found"

                  handleImageLoad(project.id)

                }}

              />

            </div>



            <div>

              <div className="flex justify-between items-start gap-1 sm:gap-2 mb-0.5 sm:mb-1">

                <h3 className="font-semibold text-gray-900 text-xs sm:text-base leading-tight">

                  {project.title}

                </h3>

                <span className="text-[10px] sm:text-xs text-gray-400 flex-shrink-0">

                  {project.year}

                </span>

              </div>

              <p className="text-[10px] sm:text-sm text-gray-500 mb-0.5 sm:mb-1">

                {project.category}

              </p>

              <p className="hidden sm:block text-xs sm:text-sm text-gray-400 line-clamp-2">

                {project.description}

              </p>

            </div>

          </button>

        ))}

      </div>



      <ProjectModal

        project={selectedProject}

        onClose={() => setSelectedProject(null)}

      />

    </section>

  )

}



export default Work

