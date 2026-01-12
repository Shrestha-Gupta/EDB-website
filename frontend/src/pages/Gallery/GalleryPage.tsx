import { motion } from 'framer-motion'
import { useState } from 'react'
import ParticlesBackground from '../../components/ParticlesBackground/ParticlesBackground'
import PageHero from '../../components/PageHero/PageHero'
import galleryData from '../../data/galleryData.json'
import { useIsMobile } from '../../hooks/useDevicePerformance'
import SEO, { seoConfigs } from '../../components/SEO/SEO'

const galleryCategories = galleryData.categories
const images = galleryData.images


export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const isMobile = useIsMobile()

  const filteredImages = selectedCategory === 'All'
    ? images
    : images.filter(img => img.category === selectedCategory)

  return (
    <div className="bg-stone-50 min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 2xl:px-12 relative overflow-x-hidden font-sans text-stone-800">
      <SEO {...seoConfigs.gallery} />
      <ParticlesBackground />
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-amber-200/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-125 h-125 bg-orange-200/20 rounded-full blur-[100px] pointer-events-none" />
      <motion.div
        className="max-w-7xl 2xl:max-w-8xl 3xl:max-w-9xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: isMobile ? 0.3 : 0.8 }}
      >
        {/* Header */}
        {/* Header */}
        <PageHero 
          title="Gallery" 
          subtitle="Captured Moments"
          description="Capturing moments of creativity, collaboration, and celebration at The Editorial Board."
        />

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap gap-3 justify-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {galleryCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`
                px-6 py-2 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 relative overflow-hidden group
                ${selectedCategory === category
                  ? 'text-white shadow-lg shadow-amber-900/20'
                  : 'text-stone-600 hover:text-amber-700 bg-white border border-stone-200'}
              `}
            >
              {selectedCategory === category && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-linear-to-r from-amber-600 to-orange-600"
                />
              )}
              <span className="relative z-10">{category.toUpperCase()}</span>
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid - Pinterest Style Masonry */}
        <motion.div
          className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5 3xl:columns-6 gap-6 space-y-6"
          layout={!isMobile}
        >
          {filteredImages.map((image) => (
            <motion.div
              key={image.id}
              layout={!isMobile}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: isMobile ? 0.2 : 0.5 }}
              className="break-inside-avoid mb-6 relative group w-full"
            >
              <div className="relative overflow-hidden rounded-3xl bg-gray-200">
                <img
                  src={image.imageUrl}
                  alt={image.category}
                  className="w-full h-auto object-cover md:transform md:transition-transform md:duration-700 md:group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Pinterest-like Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6 text-white">

                  
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-xs font-medium uppercase tracking-wider backdrop-blur-sm bg-black/20 text-center inline-block px-2 py-1 rounded-md">
                      {image.category}
                    </p>
                  </div>
                </div>

                {/* Subtle sheen effect */}
                <div className="absolute inset-0 pointer-events-none bg-linear-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Upload CTA */}
        <motion.div
          className="mt-20 bg-linear-to-r from-brand-orange/10 to-brand-gold/10 border-4 border-brand-orange p-12 text-center text-black"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className="text-4xl font-serif font-bold bg-linear-to-r from-brand-orange to-brand-gold bg-clip-text text-transparent mb-4">
            Share Your Moments
          </h2>
          <p className="text-xl text-brand-black/70 mb-8">
            Have photos from our events? Share them with the community!
          </p>
          <motion.button
            className="bg-linear-to-r from-brand-orange to-brand-gold text-black font-bold py-4 px-10 text-lg rounded-full"
            whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(255, 140, 66, 0.3)' }}
            whileTap={{ scale: 0.95 }}
          >
            UPLOAD PHOTOS
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  )
}
