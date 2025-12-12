import { useState } from 'react'
import { motion } from 'framer-motion'

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
        <h3 className="text-4xl font-serif font-bold bg-linear-to-r from-brand-black to-brand-red bg-clip-text text-transparent mb-4 text-center">
          Get in Touch
        </h3>
        <p className="text-center text-brand-black/60 mb-12">
          Have a submission or inquiry? We'd love to hear from you!
        </p>

        <form onSubmit={handleSubmit} className="bg-brand-white border-4 border-brand-gold p-8 md:p-12 shadow-lg">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="flex items-center gap-2 text-brand-black font-bold mb-2">
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-brand-red"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </motion.svg>
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full border-2 border-brand-gold/50 p-3 focus:outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-orange/20 transition-all"
                required
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-brand-black font-bold mb-2">
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-brand-orange"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </motion.svg>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="w-full border-2 border-brand-gold/50 p-3 focus:outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-orange/20 transition-all"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="flex items-center gap-2 text-brand-black font-bold mb-2">
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-brand-gold"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </motion.svg>
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="What's this about?"
              className="w-full border-2 border-brand-gold/50 p-3 focus:outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-orange/20 transition-all"
              required
            />
          </div>

          <div className="mb-6">
            <label className="flex items-center gap-2 text-brand-black font-bold mb-2">
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-brand-cyan"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </motion.svg>
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message here..."
              rows={6}
              className="w-full border-2 border-brand-gold/50 p-3 focus:outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-orange/20 transition-all resize-none"
              required
            ></textarea>
          </div>

          <motion.button
            type="submit"
            className="group w-full bg-linear-to-r from-brand-red to-brand-red hover:shadow-lg text-white font-bold py-3 transition-all duration-200 flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            SEND MESSAGE
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </motion.svg>
          </motion.button>
        </form>

        {/* Contact Info */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <motion.div 
            className="text-center border-t-4 border-brand-gold pt-4"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              className="flex justify-center mb-2"
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-brand-red"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </motion.div>
            <h4 className="text-brand-red font-bold mb-2">Email</h4>
            <p className="text-brand-black/70">editorial@mmmut.ac.in</p>
          </motion.div>
          <motion.div 
            className="text-center border-t-4 border-brand-orange pt-4"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              className="flex justify-center mb-2"
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-brand-orange"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </motion.div>
            <h4 className="text-brand-orange font-bold mb-2">Phone</h4>
            <p className="text-brand-black/70">+91 (XXX) XXX-XXXX</p>
          </motion.div>
          <motion.div 
            className="text-center border-t-4 border-brand-cyan pt-4"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              className="flex justify-center mb-2"
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-brand-cyan"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </motion.div>
            <h4 className="text-brand-cyan font-bold mb-2">Address</h4>
            <p className="text-brand-black/70">MMMUT, Gorakhpur</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
