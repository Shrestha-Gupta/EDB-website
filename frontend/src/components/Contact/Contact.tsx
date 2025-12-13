import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin } from 'lucide-react'

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
    <section id="contact" className="min-h-screen bg-linear-to-br from-gray-50 via-white to-amber-50/20 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-5 gap-0 bg-white rounded-3xl shadow-2xl overflow-hidden">
          
          {/* Left Panel - Contact Information */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 bg-linear-to-br from-brand-cyan via-brand-teal to-brand-cyan/90 p-8 sm:p-10 md:p-12 text-white relative overflow-hidden"
          >
            {/* Decorative circle */}
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-20 translate-y-20" />
            
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Contact Information</h2>
              <p className="text-white/90 mb-12 leading-relaxed">
                We'll create high-quality linkable content and build at least 40 high-authority.
              </p>

              {/* Contact Details */}
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 mt-1 shrink-0" />
                  <div>
                    <p className="font-medium">+8801779717686</p>
                    <p className="font-medium">+988678363866</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 mt-1 shrink-0" />
                  <div>
                    <p className="font-medium">editorial@mmmut.ac.in</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 mt-1 shrink-0" />
                  <div>
                    <p className="font-medium">MMMUT, Gorakhpur, UP</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Panel - Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 p-8 sm:p-10 md:p-12"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name and Email Row */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs text-gray-500 mb-2">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Trangely"
                    className="w-full border-b-2 border-gray-300 pb-2 focus:outline-none focus:border-brand-cyan transition-colors text-black placeholder:text-gray-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-2">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="hello@nurency.com"
                    className="w-full border-b-2 border-gray-300 pb-2 focus:outline-none focus:border-brand-cyan transition-colors text-black placeholder:text-gray-400"
                    required
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs text-gray-500 mb-2">Your Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="I want to hire you quickly"
                  className="w-full border-b-2 border-gray-300 pb-2 focus:outline-none focus:border-brand-cyan transition-colors text-black placeholder:text-gray-400"
                  required
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs text-brand-cyan mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write here your message"
                  rows={6}
                  className="w-full border-b-2 border-brand-cyan pb-2 focus:outline-none focus:border-brand-cyan transition-colors text-black placeholder:text-gray-400 resize-none"
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="bg-brand-cyan hover:bg-brand-teal text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
