import { useCallback, useState } from 'react'

const INITIAL_FORM_DATA = {
  name: '',
  email: '',
  message: ''
}

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'

function Contact() {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA)
  const [botcheck, setBotcheck] = useState('')
  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
    setStatus('idle')
    setErrorMessage('')
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
    if (!accessKey) {
      setStatus('error')
      setErrorMessage(
        'Contact form is not configured. Add VITE_WEB3FORMS_ACCESS_KEY to .env.local (see .env.example).'
      )
      return
    }

    setStatus('submitting')
    setErrorMessage('')

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Portfolio contact from ${formData.name}`,
          from_name: formData.name,
          replyto: formData.email,
          botcheck
        })
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to send message. Please try again.')
      }

      setStatus('success')
      setFormData(INITIAL_FORM_DATA)
      setBotcheck('')
    } catch (err) {
      setStatus('error')
      setErrorMessage(
        err instanceof Error ? err.message : 'Failed to send message. Please try again.'
      )
    }
  }

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/pulaOROBLRAM'},
    { name: 'LinkedIn', url: 'https://linkedin.com/in/akitwdra'},
    { name: 'Facebook', url: 'https://facebook.com/akitwdra'},
    { name: 'Email', url: 'mailto:akitwdra@gmail.com'}
  ]

  const isSubmitting = status === 'submitting'

  return (
    <section id="contact" className="py-20 sm:py-28 border-t border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
        {/* Left column - Info */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-4">
            Let's work<br />together
          </h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Have a project in mind? Looking for a collaborator? 
            I'd love to hear from you.
          </p>
          
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
              Find me on
            </h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition"
                >
                  <span>{social.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right column - Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="botcheck"
            value={botcheck}
            onChange={(e) => setBotcheck(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="form-honeypot"
          />

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              className="form-input"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              className="form-input"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              rows="4"
              className="form-input resize-none"
              placeholder="Tell me about your project..."
            />
          </div>

          <div className="space-y-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-3 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending…' : 'Send message →'}
            </button>

            {status === 'success' && (
              <p className="form-status form-status--success" role="status">
                Message sent! I'll get back to you soon.
              </p>
            )}
            {status === 'error' && (
              <p className="form-status form-status--error" role="alert">
                {errorMessage}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}

export default Contact
