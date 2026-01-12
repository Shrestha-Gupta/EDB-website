import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState, useRef } from 'react'
import { MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react'
// Ensure this path is correct
import ParticlesBackground from '../../components/ParticlesBackground/ParticlesBackground'
import PageHero from '../../components/PageHero/PageHero'
import SEO, { seoConfigs } from '../../components/SEO/SEO'

const alumniGallery = [
  
  { year: '2025', image: 'https://res.cloudinary.com/dzqtx9kms/image/upload/v1767363842/2021_tm6cpm.jpg' },
  { year: '2024', image: 'https://res.cloudinary.com/dzqtx9kms/image/upload/v1767363843/2020_hn5bqf.jpg' },
  { year: '2023', image: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1767864885/WhatsApp_Image_2026-01-08_at_13.35.39_rchea5.jpg' },
  { year: '2022', image: 'https://res.cloudinary.com/dzqtx9kms/image/upload/v1767363842/2019_w1gtu9.jpg' },
  { year: '2021', image: 'https://res.cloudinary.com/dzqtx9kms/image/upload/v1767363841/2018_drwlg2.jpg' },
  
  { year: '2020', image: 'https://res.cloudinary.com/dzqtx9kms/image/upload/v1767363841/2017_rjglwn.jpg' },
  { year: '2019', image: 'https://res.cloudinary.com/dwdx4kjgx/image/upload/v1767765140/WhatsApp_Image_2026-01-07_at_9.15.56_AM_vwajx7.jpg' },
  { year: '2018', image: 'https://res.cloudinary.com/dwdx4kjgx/image/upload/v1767765140/WhatsApp_Image_2026-01-07_at_9.16.12_AM_v7kyc3.jpg' },
  { year: '2017', image: 'https://res.cloudinary.com/dwdx4kjgx/image/upload/v1767765141/WhatsApp_Image_2026-01-07_at_9.16.04_AM_tq0d7z.jpg' }
]



export default function AlumniPage() {

  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const galleryRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ["start end", "end start"]
  })
  
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.85])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3])

  const handlePrevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev === 0 ? alumniGallery.length - 1 : prev - 1))
  }

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev === alumniGallery.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="bg-stone-50 min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 2xl:px-12 relative overflow-x-hidden font-sans text-stone-800">
      <SEO {...seoConfigs.alumni} />
      <ParticlesBackground />
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-amber-200/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-125 h-125 bg-orange-200/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Hero Section */}
      <div className="px-6">
        <PageHero 
            title="Alumni & Legacy" 
            subtitle="Our History"
            description="Celebrating the legacy and achievements of our distinguished alumni."
        />
      </div>

      <motion.div
        className="max-w-7xl 2xl:max-w-8xl 3xl:max-w-9xl mx-auto px-6 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Quote Section */}
        <motion.div
          className="py-16 -mt-10 relative z-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-6">
              {/* Vertical black bar */}
              <div className="w-4.5 bg-gray-900 self-stretch min-h-[80px] rounded-full" />
              <div>
                <p className="text-2xl sm:text-3xl md:text-4xl font-serif italic text-gray-700 leading-relaxed mb-4">
                  "Crafted in Alba's bold strokes, preserved in Papyrus's ancient elegance, our alumni's voices echo through every draft, every edition, and every story yet to be told."
                </p>
                
              </div>
            </div>
          </div>
        </motion.div>

        {/* Description Section */}
        <motion.div
          className="pb-12 relative z-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          
        </motion.div>
      </motion.div>

      {/* Gallery Section - Full Width */}
      <motion.div
        ref={galleryRef}
        className="py-8 sm:py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-6 sm:mb-12 px-4 sm:px-6">
          <h2 className="text-4xl sm:text-5xl 2xl:text-6xl 3xl:text-7xl font-serif font-bold bg-linear-to-r from-orange-700 via-orange-500 to-amber-400 bg-clip-text text-transparent mb-4">
            Legacy in Frames
          </h2>
          <div className="w-24 h-1 bg-linear-to-r from-orange-500 via-amber-400 to-orange-500 mx-auto rounded-full" />
        </div>

        <motion.div 
          className="relative w-full"
          style={{ scale, opacity }}
        >
          {/* Arrows */}
          <button
            onClick={handlePrevPhoto}
            className="absolute left-2 sm:left-8 lg:left-16 top-1/2 -translate-y-1/2 z-20 bg-orange-500 text-white p-2 sm:p-4 rounded-full shadow-lg hover:bg-orange-600 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={handleNextPhoto}
            className="absolute right-2 sm:right-8 lg:right-16 top-1/2 -translate-y-1/2 z-20 bg-orange-500 text-white p-2 sm:p-4 rounded-full shadow-lg hover:bg-orange-600 transition-colors"
          >
            <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>

          {/* Full-width image container */}
          <div className="relative overflow-hidden bg-black shadow-2xl aspect-video sm:aspect-21/9 lg:aspect-2.5/1 group">
            {/* Logo watermark */}
            <div className="absolute top-2 right-2 sm:top-6 sm:right-6 z-10">
              <img 
                src="https://res.cloudinary.com/dml0jlwlv/image/upload/v1765559411/The_Editorial_Board_Logo..1.0_cgrovj.png"
                alt="The Editorial Board"
                className="w-10 h-10 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-contain opacity-90"
              />
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPhotoIndex}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <img 
                  src={alumniGallery[currentPhotoIndex].image} 
                  alt={`Batch of ${alumniGallery[currentPhotoIndex].year}`}
                  className="w-full h-full object-cover"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-linear-to-r from-black/40 via-transparent to-black/40" />
                
                {/* Year and text overlay */}
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 p-4 sm:p-10 lg:p-16"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <h3 
                    className="text-4xl sm:text-7xl lg:text-8xl font-serif font-bold mb-1 sm:mb-2"
                    style={{ 
                      color: '#ffffff', 
                      textShadow: '2px 2px 8px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.7)',
                      WebkitTextStroke: '1px rgba(255,255,255,0.3)'
                    }}
                  >
                    {alumniGallery[currentPhotoIndex].year}
                  </h3>
                  <p 
                    className="text-base sm:text-xl lg:text-2xl font-medium tracking-wide"
                    style={{ 
                      color: '#ffffff', 
                      textShadow: '1px 1px 4px rgba(0,0,0,0.9)' 
                    }}
                  >
                    Batch Memories
                  </p>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Dots */}
          <div className="flex justify-center gap-2 sm:gap-3 mt-4 sm:mt-8">
            {alumniGallery.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPhotoIndex(index)}
                className={`h-2 sm:h-3 rounded-full transition-all duration-300 ${
                  currentPhotoIndex === index
                    ? "bg-orange-500 w-8 sm:w-10"
                    : "bg-gray-300 hover:bg-orange-300 w-2 sm:w-3"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Rest of content */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Alumni Canvas Section */}
        <motion.div
          // Very subtle background tint and border
          className="py-10 sm:py-16 my-8 sm:my-16 bg-linear-to-br from-amber-50/50 to-orange-50/50 rounded-3xl border border-orange-50"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-4xl mx-auto text-center px-6">
            {/* Softer icon */}
            <MessageSquare className="w-16 h-16 mx-auto mb-6 text-orange-400" />
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 mb-6">
              Alumni Canvas
            </h2>
            {/* Softer line gradient */}
            <div className="w-24 h-1 bg-linear-to-r from-orange-500 to-amber-400 mx-auto mb-6 rounded-full" />
            <p className="text-xl text-gray-700 mb-10 leading-relaxed">
              Share your experiences, memories, and wisdom with current and future board members. Your stories inspire the next generation!
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              {/* Softer primary button */}
              <Link to="/contact">
                <motion.button
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-xl text-lg shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Share Your Story
                </motion.button>
              </Link>
              {/* Softer secondary button border and text */}
              <Link to="/canvas">
                <motion.button
                  className="bg-white text-orange-600 border-2 border-orange-100 hover:border-orange-400 font-bold py-4 px-10 rounded-xl text-lg transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Read Stories
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Stay Connected */}
        <motion.div
          className="my-16 bg-linear-to-br from-brand-red/10 to-brand-orange/10 border-4 border-brand-red p-12 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold bg-linear-to-r from-brand-red to-brand-orange bg-clip-text text-transparent mb-6">
            Stay Connected
          </h2>
          <p className="text-xl text-brand-black/70 mb-8 max-w-2xl mx-auto">
            Join our alumni network and stay updated with the latest news, events, and opportunities.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/contact" className="w-full sm:w-auto inline-block">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-linear-to-r from-brand-red to-brand-red text-black font-bold py-4 px-12 text-lg rounded-3xl cursor-pointer text-center md:hover:shadow-lg shadow-2xl hover:shadow-orange-900/20 transition-all"
              >
                Join Network
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}