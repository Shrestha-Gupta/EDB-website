import { motion } from 'framer-motion'
import { useState } from 'react'
import ParticlesBackground from '../../components/ParticlesBackground/ParticlesBackground'
import PageHero from '../../components/PageHero/PageHero'
import galleryData from '../../data/galleryData.json'

const galleryCategories = galleryData.categories
const images = galleryData.images

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
}

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5
    }
  }
}

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredImages = selectedCategory === 'All'
    ? images
    : images.filter(img => img.category === selectedCategory)

  return (
    <div className="bg-stone-50 min-h-screen pt-24 pb-20 px-4 sm:px-6 relative overflow-x-hidden font-sans text-stone-800">
      <ParticlesBackground />
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-amber-200/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-125 h-125 bg-orange-200/20 rounded-full blur-[100px] pointer-events-none" />
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
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

        {/* Gallery Grid */}
        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={selectedCategory}
        >
          {filteredImages.map((image) => (
            <motion.div
              key={image.id}
              variants={imageVariants}
              className="group cursor-pointer"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 bg-white border border-stone-200/60 hover:border-amber-200">
                {/* Image */}
                <div className="aspect-square relative overflow-hidden">
                  <motion.img 
                    src={image.imageUrl} 
                    alt={image.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                  {/* Title Overlay */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 p-6 transform"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="transform group-hover:translate-y-0 translate-y-2 transition-transform duration-300">
                      <h3 className="text-white font-bold text-xl mb-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                        {image.title}
                      </h3>
                      <div className="h-1 w-12 bg-linear-to-r from-amber-500 to-orange-500 rounded-full mb-2 transform origin-left group-hover:scale-x-150 transition-transform duration-300" />
                      <p className="text-white font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                        View Details →
                      </p>
                    </div>
                  </motion.div>

                  {/* Shimmer Effect on Hover */}
                  <motion.div
                    className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Upload CTA */}
        <motion.div
          className="mt-20 bg-linear-to-r from-brand-orange/10 to-brand-gold/10 border-4 border-brand-orange p-12 text-center"
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
            className="bg-linear-to-r from-brand-orange to-brand-gold text-white font-bold py-4 px-10 text-lg"
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
