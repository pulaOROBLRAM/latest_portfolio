import { useCallback, useEffect, useRef, useState } from 'react'

const CLOSE_DURATION_MS = 220

function getCloseDuration() {
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return 0
  }
  return CLOSE_DURATION_MS
}

function ProjectModal({ project, onClose }) {
  const dialogRef = useRef(null)
  const closeTimeoutRef = useRef(null)
  const isClosingRef = useRef(false)

  const [displayProject, setDisplayProject] = useState(null)
  const [isClosing, setIsClosing] = useState(false)
  const [prevProject, setPrevProject] = useState(null)

  if (project !== prevProject) {
    setPrevProject(project)
    if (project) {
      setDisplayProject(project)
      setIsClosing(false)
    }
  }

  useEffect(() => {
    if (!project) return

    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    isClosingRef.current = false
  }, [project])

  useEffect(() => {
    if (!displayProject) return

    const dialog = dialogRef.current
    if (dialog && !dialog.open) {
      dialog.showModal()
    }
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = ''
    }
  }, [displayProject])

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current)
      }
      document.body.style.overflow = ''
    }
  }, [])

  const requestClose = useCallback(() => {
    if (isClosingRef.current || !displayProject) return
    isClosingRef.current = true
    setIsClosing(true)

    closeTimeoutRef.current = setTimeout(() => {
      const dialog = dialogRef.current
      if (dialog?.open) {
        dialog.close()
      }
      document.body.style.overflow = ''
      isClosingRef.current = false
      setIsClosing(false)
      setDisplayProject(null)
      onClose()
    }, getCloseDuration())
  }, [displayProject, onClose])

  const handleCancel = (event) => {
    event.preventDefault()
    requestClose()
  }

  const handleBackdropClick = (event) => {
    if (event.target === dialogRef.current) {
      requestClose()
    }
  }

  if (!displayProject) return null

  const titleId = `project-modal-title-${displayProject.id}`
  const hasContributions = displayProject.contributions?.length > 0

  return (
    <dialog
      ref={dialogRef}
      className="project-modal"
      data-state={isClosing ? 'closing' : 'open'}
      aria-labelledby={titleId}
      onCancel={handleCancel}
      onClick={handleBackdropClick}
    >
      <div className="project-modal__panel">
        <button
          type="button"
          className="project-modal__close"
          onClick={requestClose}
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
              {displayProject.title}
            </h2>
            <span className="project-modal__year">{displayProject.year}</span>
          </div>

          <p className="project-modal__meta">{displayProject.category}</p>

          <p className="project-modal__description">{displayProject.description}</p>

          {hasContributions && (
            <div className="project-modal__contributions">
              <h3 className="project-modal__contributions-title">Contributions</h3>
              <ul className="project-modal__contributions-list">
                {displayProject.contributions.map((item) => (
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
