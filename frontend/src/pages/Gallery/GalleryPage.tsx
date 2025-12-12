import { motion } from 'framer-motion'
import { useState } from 'react'

const galleryCategories = ['All', 'Events', 'Campus', 'Workshops', 'Celebrations']

const images = [
  { id: 1, category: 'Events', title: 'Literary Festival 2024', color: 'from-brand-red to-brand-scarlet' },
  { id: 2, category: 'Campus', title: 'Editorial Board Office', color: 'from-brand-orange to-brand-gold' },
  { id: 3, category: 'Workshops', title: 'Creative Writing Workshop', color: 'from-brand-gold to-brand-yellow' },
  { id: 4, category: 'Celebrations', title: 'Book Launch Ceremony', color: 'from-brand-cyan to-brand-teal' },
  { id: 5, category: 'Events', title: 'Poetry Slam Night', color: 'from-brand-scarlet to-brand-orange' },
  { id: 6, category: 'Campus', title: 'Reading Corner', color: 'from-brand-teal to-brand-cyan' },
  { id: 7, category: 'Workshops', title: 'Photography Session', color: 'from-brand-gold to-brand-orange' },
  { id: 8, category: 'Celebrations', title: 'Annual Awards', color: 'from-brand-red to-brand-gold' },
  { id: 9, category: 'Events', title: 'Guest Lecture Series', color: 'from-brand-cyan to-brand-gold' }
]

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
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const filteredImages = selectedCategory === 'All'
    ? images
    : images.filter(img => img.category === selectedCategory)

  return (
    <div className="bg-brand-white min-h-screen pt-24 pb-20 px-6">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-6xl md:text-7xl font-serif font-bold bg-linear-to-r from-brand-gold via-brand-orange to-brand-scarlet bg-clip-text text-transparent mb-6">
            Gallery
          </h1>
          <p className="text-xl text-brand-black/70 max-w-3xl mx-auto">
            Capturing moments of creativity, collaboration, and celebration at The Editorial Board.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex gap-4 justify-center mb-12 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {galleryCategories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 font-bold border-2 transition-all ${
                selectedCategory === category
                  ? 'bg-linear-to-r from-brand-orange to-brand-gold text-white border-transparent'
                  : 'border-brand-gold text-brand-black hover:border-brand-orange'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          className="grid md:grid-cols-3 gap-6"
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
              onClick={() => setSelectedImage(image.id)}
            >
              <div className="relative overflow-hidden shadow-xl border-4 border-brand-gold hover:border-brand-scarlet transition-all duration-300">
                {/* Image Placeholder */}
                <div className={`aspect-square bg-linear-to-br ${image.color} relative overflow-hidden`}>
                  <motion.div
                    className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  
                  {/* Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                      whileHover={{ scale: 1.2, rotate: 180 }}
                      transition={{ duration: 0.4 }}
                    >
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </motion.div>
                  </div>

                  {/* Title Overlay */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-6"
                    initial={{ y: 100 }}
                    whileHover={{ y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-white font-bold text-lg">{image.title}</h3>
                    <p className="text-white/80 text-sm">{image.category}</p>
                  </motion.div>
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
