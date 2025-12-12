import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Handle form submission here
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <section id="contact" className="bg-brand-white py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-4xl font-serif font-bold bg-gradient-to-r from-brand-black to-brand-scarlet bg-clip-text text-transparent mb-4 text-center">
          Get in Touch
        </h3>
        <p className="text-center text-brand-black/60 mb-12">
          Have a submission or inquiry? We'd love to hear from you!
        </p>

        <form onSubmit={handleSubmit} className="bg-brand-white border-4 border-brand-gold p-8 md:p-12 shadow-lg">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-brand-black font-bold mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full border-2 border-brand-gold/50 p-3 focus:outline-none focus:border-brand-scarlet focus:ring-2 focus:ring-brand-orange/20 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-brand-black font-bold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="w-full border-2 border-brand-gold/50 p-3 focus:outline-none focus:border-brand-scarlet focus:ring-2 focus:ring-brand-orange/20 transition-all"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-brand-black font-bold mb-2">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="What's this about?"
              className="w-full border-2 border-brand-gold/50 p-3 focus:outline-none focus:border-brand-scarlet focus:ring-2 focus:ring-brand-orange/20 transition-all"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-brand-black font-bold mb-2">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message here..."
              rows={6}
              className="w-full border-2 border-brand-gold/50 p-3 focus:outline-none focus:border-brand-scarlet focus:ring-2 focus:ring-brand-orange/20 transition-all resize-none"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-brand-red to-brand-scarlet hover:shadow-lg text-white font-bold py-3 transition-all duration-200"
          >
            SEND MESSAGE
          </button>
        </form>

        {/* Contact Info */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="text-center border-t-4 border-brand-gold pt-4">
            <h4 className="text-brand-scarlet font-bold mb-2">Email</h4>
            <p className="text-brand-black/70">editorial@mmmut.ac.in</p>
          </div>
          <div className="text-center border-t-4 border-brand-orange pt-4">
            <h4 className="text-brand-orange font-bold mb-2">Phone</h4>
            <p className="text-brand-black/70">+91 (XXX) XXX-XXXX</p>
          </div>
          <div className="text-center border-t-4 border-brand-cyan pt-4">
            <h4 className="text-brand-cyan font-bold mb-2">Address</h4>
            <p className="text-brand-black/70">MMMUT, Gorakhpur</p>
          </div>
        </div>
      </div>
    </section>
  )
}
