import { useEffect, useRef } from 'react'

function ProjectModal({ project, onClose }) {
  const dialogRef = useRef(null)
  const titleId = project ? `project-modal-title-${project.id}` : undefined

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (project) {
      if (!dialog.open) {
        dialog.showModal()
      }
      document.body.style.overflow = 'hidden'
    } else if (dialog.open) {
      dialog.close()
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [project])

  const handleClose = () => {
    onClose()
  }

  const handleBackdropClick = (event) => {
    if (event.target === dialogRef.current) {
      handleClose()
    }
  }

  if (!project) return null

  const hasContributions = project.contributions?.length > 0

  return (
    <dialog
      ref={dialogRef}
      className="project-modal"
      aria-labelledby={titleId}
      onCancel={handleClose}
      onClick={handleBackdropClick}
    >
      <div className="project-modal__panel">
        <button
          type="button"
          className="project-modal__close"
          onClick={handleClose}
          aria-label="Close project details"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
              d="M5 5l10 10M15 5L5 15"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="project-modal__body">
          <div className="project-modal__header">
            <h2 id={titleId} className="project-modal__title">
              {project.title}
            </h2>
            <span className="project-modal__year">{project.year}</span>
          </div>

          <p className="project-modal__meta">{project.category}</p>

          <p className="project-modal__description">{project.description}</p>

          {hasContributions && (
            <div className="project-modal__contributions">
              <h3 className="project-modal__contributions-title">Contributions</h3>
              <ul className="project-modal__contributions-list">
                {project.contributions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </dialog>
  )
}

export default ProjectModal
