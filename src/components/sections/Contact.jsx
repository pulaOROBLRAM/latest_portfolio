import { useCallback, useState } from 'react'

const INITIAL_FORM_DATA = {
  name: '',
  email: '',
  message: ''
}

function Contact() {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA)

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here (connect to email service later)
    console.log('Form submitted:', formData)
    alert('Message sent! (Demo mode)')
    setFormData(INITIAL_FORM_DATA)
  }

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/pulaOROBLRAM'},
    { name: 'LinkedIn', url: 'https://linkedin.com/in/akitwdra'},
    { name: 'Facebook', url: 'https://facebook.com/akitwdra'},
    { name: 'Email', url: 'mailto:akitwdra@gmail.com'}
  ]

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
              rows="4"
              className="form-input resize-none"
              placeholder="Tell me about your project..."
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition"
          >
            Send message →
          </button>
        </form>
      </div>
    </section>
  )
}

export default Contact