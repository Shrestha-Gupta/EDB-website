import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import ParticlesBackground from '../ParticlesBackground/ParticlesBackground'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData)
      setIsSubmitting(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
      alert("Message sent successfully!")
    }, 1500)
  }

  return (
    <section id="contact" className="min-h-screen relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background with Orange Tint */}
      <div className="absolute inset-0 bg-linear-to-br from-gray-50 via-white to-orange-50/40" />
      
      {/* Particles Layer */}
      <div className="absolute inset-0 pointer-events-none">
        <ParticlesBackground />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            Get in Touch
          </h1>
          <div className="w-24 h-1 bg-linear-to-r from-orange-600 via-amber-500 to-orange-600 mx-auto rounded-full" />
        </motion.div>

        {/* Contact Container */}
        <div className="grid lg:grid-cols-5 gap-0 bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          
          {/* Left Panel - Contact Information */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 bg-linear-to-br from-orange-700 via-orange-600 to-amber-600 p-8 sm:p-10 md:p-12 text-white relative overflow-hidden"
          >
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-10 -translate-y-10 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/20 rounded-full -translate-x-10 translate-y-10 blur-3xl" />
            
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-serif font-bold mb-6">Contact Information</h2>
                <p className="text-orange-50 mb-10 leading-relaxed text-lg">
                  Have a story to share? Want to contribute to the next edition of Tiresia? 
                  Reach out to us for collaborations, queries, or just to say hello.
                </p>

                {/* Contact Details */}
                <div className="space-y-8">
                  <div className="flex items-start gap-4 group">
                    <div className="p-3 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                      <Phone className="w-6 h-6 text-amber-200" />
                    </div>
                    <div>
                      <p className="text-xs text-orange-200 uppercase tracking-wider mb-1">Phone</p>
                      <p className="font-medium text-lg">+91 123 456 7890</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="p-3 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                      <Mail className="w-6 h-6 text-amber-200" />
                    </div>
                    <div>
                      <p className="text-xs text-orange-200 uppercase tracking-wider mb-1">Email</p>
                      <p className="font-medium text-lg">editorial@mmmut.ac.in</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="p-3 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                      <MapPin className="w-6 h-6 text-amber-200" />
                    </div>
                    <div>
                      <p className="text-xs text-orange-200 uppercase tracking-wider mb-1">Location</p>
                      <p className="font-medium text-lg">MMMUT Campus,<br/>Gorakhpur, UP - 273010</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Socials / Extra Info */}
              <div className="mt-12 pt-8 border-t border-white/20">
                <p className="text-sm text-orange-100 italic">
                  "Yogah Karmasu Kaushalam"
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Panel - Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 p-8 sm:p-10 md:p-12 bg-white"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="group">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 group-focus-within:text-orange-600 transition-colors">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full border-b-2 border-gray-200 py-2 focus:outline-none focus:border-orange-500 transition-all text-gray-800 placeholder:text-gray-300 bg-transparent"
                    required
                  />
                </div>
                <div className="group">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 group-focus-within:text-orange-600 transition-colors">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full border-b-2 border-gray-200 py-2 focus:outline-none focus:border-orange-500 transition-all text-gray-800 placeholder:text-gray-300 bg-transparent"
                    required
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 group-focus-within:text-orange-600 transition-colors">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Regarding Article Submission..."
                  className="w-full border-b-2 border-gray-200 py-2 focus:outline-none focus:border-orange-500 transition-all text-gray-800 placeholder:text-gray-300 bg-transparent"
                  required
                />
              </div>

              <div className="group">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 group-focus-within:text-orange-600 transition-colors">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  rows={4}
                  className="w-full border-b-2 border-gray-200 py-2 focus:outline-none focus:border-orange-500 transition-all text-gray-800 placeholder:text-gray-300 bg-transparent resize-none"
                  required
                ></textarea>
              </div>

              <div className="pt-4">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-gradient-to-r from-orange-600 to-amber-500 text-white font-bold py-4 px-10 rounded-xl shadow-lg hover:shadow-orange-500/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message <Send className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  )
}