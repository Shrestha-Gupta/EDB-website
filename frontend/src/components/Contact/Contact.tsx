import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Upload, X } from 'lucide-react'
import ParticlesBackground from '../ParticlesBackground/ParticlesBackground'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{type: 'success' | 'error', message: string} | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (submitStatus) setSubmitStatus(null)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const removeFile = () => {
    setSelectedFile(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Create FormData to handle text fields + file
      const data = new FormData()
      data.append('name', formData.name)
      data.append('email', formData.email)
      data.append('subject', formData.subject)
      data.append('message', formData.message)
      if (selectedFile) {
        data.append('image', selectedFile)
      }

      // NOTE: Do not set Content-Type header manually when using FormData; 
      // the browser sets it automatically with the boundary.
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        body: data, 
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setSubmitStatus({ type: 'success', message: result.message })
        setFormData({ name: '', email: '', subject: '', message: '' })
        setSelectedFile(null)
      } else {
        setSubmitStatus({ type: 'error', message: result.message || 'Failed to send message' })
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus({ 
        type: 'error', 
        message: 'Network error. Please make sure the backend server is running.' 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="min-h-screen relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background with Subtle Warm Tint */}
      <div className="absolute inset-0 bg-linear-to-br from-stone-50 via-orange-50/30 to-amber-50/20" />
      
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
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-4">
            Get in Touch
          </h1>
          <div className="w-24 h-1 bg-linear-to-r from-orange-400 via-amber-300 to-orange-400 mx-auto rounded-full opacity-80" />
        </motion.div>

        {/* Contact Container */}
        <div className="grid lg:grid-cols-5 gap-0 bg-white rounded-3xl shadow-xl overflow-hidden border border-orange-100/50">
          
          {/* Left Panel - Contact Information */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 bg-linear-to-br from-orange-600 via-orange-500 to-amber-500 p-8 sm:p-10 md:p-12 text-white relative overflow-hidden"
          >
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-10 -translate-y-10 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-600/20 rounded-full -translate-x-10 translate-y-10 blur-3xl" />
            
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-serif font-bold mb-6 text-white">Contact Information</h2>
                <p className="text-orange-50 mb-10 leading-relaxed text-lg font-light">
                  Have a story to share? Want to contribute to the next edition of Tiresia? 
                  Reach out to us for collaborations, queries, or just to say hello.
                </p>

                {/* Contact Details */}
                <div className="space-y-8">
                  <div className="flex items-start gap-4 group">
                    <div className="p-3 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors backdrop-blur-sm">
                      <Phone className="w-5 h-5 text-amber-100" />
                    </div>
                    <div>
                      <p className="text-xs text-orange-200 uppercase tracking-wider mb-1">Phone</p>
                      <p className="font-medium text-lg text-white">+91 123 456 7890</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="p-3 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors backdrop-blur-sm">
                      <Mail className="w-5 h-5 text-amber-100" />
                    </div>
                    <div>
                      <p className="text-xs text-orange-200 uppercase tracking-wider mb-1">Email</p>
                      <p className="font-medium text-lg text-white">editorial@mmmut.ac.in</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="p-3 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors backdrop-blur-sm">
                      <MapPin className="w-5 h-5 text-amber-100" />
                    </div>
                    <div>
                      <p className="text-xs text-orange-200 uppercase tracking-wider mb-1">Location</p>
                      <p className="font-medium text-lg text-white">MMMUT Campus,<br/>Gorakhpur, UP - 273010</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Socials / Extra Info */}
              <div className="mt-12 pt-8 border-t border-white/20">
                <p className="text-sm text-orange-100 italic font-serif">
                  "योगः कर्मसु कौशलम्"
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
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 group-focus-within:text-orange-500 transition-colors">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-orange-400 transition-all text-gray-700 placeholder:text-gray-300 bg-transparent"
                    required
                  />
                </div>
                <div className="group">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 group-focus-within:text-orange-500 transition-colors">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-orange-400 transition-all text-gray-700 placeholder:text-gray-300 bg-transparent"
                    required
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 group-focus-within:text-orange-500 transition-colors">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Regarding Article Submission..."
                  className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-orange-400 transition-all text-gray-700 placeholder:text-gray-300 bg-transparent"
                  required
                />
              </div>

              <div className="group">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 group-focus-within:text-orange-500 transition-colors">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  rows={4}
                  className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-orange-400 transition-all text-gray-700 placeholder:text-gray-300 bg-transparent resize-none"
                  required
                ></textarea>
              </div>

              {/* Image Upload Section - New Addition */}
              <div className="group">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Upload Attachment (Optional)</label>
                <div className="flex items-center gap-4">
                  <label 
                    htmlFor="file-upload" 
                    className="flex items-center gap-2 cursor-pointer bg-orange-50 hover:bg-orange-100 text-orange-700 px-4 py-2 rounded-lg border border-orange-200 transition-colors text-sm font-medium"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Choose File</span>
                    <input 
                      id="file-upload" 
                      type="file" 
                      className="hidden" 
                      accept="image/*,.pdf" 
                      onChange={handleFileChange}
                    />
                  </label>
                  {selectedFile ? (
                    <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-md border border-gray-200">
                      <span className="text-sm text-gray-600 truncate max-w-50">{selectedFile.name}</span>
                      <button 
                        type="button" 
                        onClick={removeFile}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400 italic">No file selected</span>
                  )}
                </div>
              </div>

              {/* Status Message */}
              {submitStatus && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg text-sm font-medium ${
                    submitStatus.type === 'success' 
                      ? 'bg-green-50 text-green-700 border border-green-100' 
                      : 'bg-red-50 text-red-700 border border-red-100'
                  }`}
                >
                  {submitStatus.message}
                </motion.div>
              )}

              <div className="pt-4">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-linear-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-3.5 px-10 rounded-xl shadow-lg hover:shadow-orange-500/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transition-all transform active:scale-95"
                  whileHover={!isSubmitting ? { y: -2 } : {}}
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
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