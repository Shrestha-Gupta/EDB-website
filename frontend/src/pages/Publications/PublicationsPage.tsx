import { motion } from 'framer-motion'
import { useState } from 'react'

const publications = [
  {
    id: 1,
    title: 'Voices of MMMUT - Volume 5',
    type: 'ANNUAL ANTHOLOGY',
    year: '2024',
    coverImage: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765572664/WhatsApp_Image_2025-12-12_at_22.44.43_dhbora.jpg',
    description: 'Our flagship publication featuring the finest poetry, prose, and essays from students and faculty.',
    pages: 240,
    contributors: 45,
    downloadUrl: 'https://ogclndqjxchntpvsnhkp.supabase.co/storage/v1/object/public/TheEDB/malvika.pdf'
  },
  {
    id: 2,
    title: 'Technical Tales',
    type: 'QUARTERLY JOURNAL',
    year: '2024',
    coverImage: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765572664/WhatsApp_Image_2025-12-12_at_22.44.43_dhbora.jpg',
    description: 'Creative writing from the technical perspective - where engineering meets literature.',
    pages: 120,
    contributors: 28,
    downloadUrl: 'https://ogclndqjxchntpvsnhkp.supabase.co/storage/v1/object/public/TheEDB/malvika.pdf'
  },
  {
    id: 3,
    title: 'The Canvas Collection',
    type: 'DIGITAL MAGAZINE',
    year: '2024',
    coverImage: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765572664/WhatsApp_Image_2025-12-12_at_22.44.43_dhbora.jpg',
    description: 'A digital-first publication exploring contemporary themes and experimental forms.',
    pages: 180,
    contributors: 35,
    downloadUrl: 'https://ogclndqjxchntpvsnhkp.supabase.co/storage/v1/object/public/TheEDB/malvika.pdf'
  },
  {
    id: 4,
    title: 'Alumni Reflections',
    type: 'SPECIAL EDITION',
    year: '2023',
    coverImage: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765572664/WhatsApp_Image_2025-12-12_at_22.44.43_dhbora.jpg',
    description: 'Stories and experiences from our distinguished alumni across the globe.',
    pages: 200,
    contributors: 52,
    downloadUrl: 'https://ogclndqjxchntpvsnhkp.supabase.co/storage/v1/object/public/TheEDB/malvika.pdf'
  },
  {
    id: 5,
    title: 'TIRESIA - Volume 16, Issue 2',
    type: 'QUARTERLY MAGAZINE',
    year: '2024',
    coverImage: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765572664/WhatsApp_Image_2025-12-12_at_22.44.56_1_wzbldy.jpg',
    description: 'The May Issue of TIRESIA brings you a collection of thought-provoking articles, creative pieces, and insights from our university community. Featuring interviews, campus buzz, tech insights, and much more.',
    pages: 150,
    contributors: 32,
    downloadUrl: 'https://ogclndqjxchntpvsnhkp.supabase.co/storage/v1/object/public/TheEDB/vol%2016%20issue%20%202.pdf'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12
    }
  }
}

const publicationVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5
    }
  }
}

export default function PublicationsPage() {
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null)

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
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-6xl md:text-7xl font-serif font-bold bg-linear-to-r from-brand-red via-brand-orange to-brand-gold bg-clip-text text-transparent mb-6">
            Publications
          </h1>
          <p className="text-xl text-brand-black/70 max-w-3xl mx-auto">
            Discover our collection of literary works, journals, and anthologies that showcase the creative brilliance of MMMUT.
          </p>
        </motion.div>

        {/* Publications Grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {publications.map((pub) => (
            <motion.div
              key={pub.id}
              variants={publicationVariants}
              whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
              className="group cursor-pointer"
            >
              <div className="bg-white border-3 border-black overflow-hidden shadow-xl">
                {/* Book Cover with Image */}
                <div className="h-96 relative overflow-hidden">
                  <img 
                    src={pub.coverImage} 
                    alt={pub.title}
                    className="w-full h-full object-cover"
                  />
                  {/* NEW Badge */}
                  <div className="absolute top-4 right-4 bg-white text-black px-4 py-1.5 rounded-full font-bold text-xs z-10">
                    NEW
                  </div>
                  
                  {/* Hover Overlay with Preview/Download */}
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <motion.button
                      onClick={() => setSelectedPdf(pub.downloadUrl)}
                      className="bg-white text-black px-6 py-3 rounded font-bold flex items-center gap-2 hover:bg-gray-100"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Preview
                    </motion.button>
                    
                    <motion.a
                      href={pub.downloadUrl}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#FF8C69] text-white px-6 py-3 rounded font-bold flex items-center gap-2 hover:bg-[#ff7a54]"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download
                    </motion.a>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 bg-white border-t-3 border-black">
                  <div className="text-xs font-semibold mb-2 tracking-widest text-brand-red">{pub.type}</div>
                  <h3 className="text-3xl font-serif font-bold mb-2">{pub.title}</h3>
                  <div className="text-lg text-gray-600 mb-4">{pub.year}</div>
                  
                  <p className="text-gray-700 mb-6 text-base leading-relaxed">
                    {pub.description}
                  </p>

                  {/* Stats */}
                  <div className="flex gap-8 mb-8 text-sm">
                    <div className="text-black font-medium">
                      {pub.pages} pages
                    </div>
                    <div className="text-black font-medium">
                      {pub.contributors} contributors
                    </div>
                  </div>

                  {/* Download Button */}
                  <motion.a
                    href={pub.downloadUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block border-3 border-black text-black font-bold py-3 px-12 hover:bg-black hover:text-white transition-colors duration-300 text-center w-auto"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    DOWNLOAD
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* PDF Viewer Modal */}
        {selectedPdf && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPdf(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-lg w-full max-w-6xl h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-lg font-bold">PDF Preview</h3>
                <button
                  onClick={() => setSelectedPdf(null)}
                  className="text-gray-500 hover:text-black"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <iframe
                src={selectedPdf}
                className="flex-1 w-full"
                title="PDF Viewer"
              />
            </motion.div>
          </motion.div>
        )}

        {/* Submission Guidelines */}
        <motion.div
          className="mt-20 grid md:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {/* Submit Work */}
          <div className="bg-linear-to-br from-brand-red/10 to-brand-orange/10 border-4 border-brand-red p-10">
            <h2 className="text-3xl font-serif font-bold bg-linear-to-r from-brand-red to-brand-orange bg-clip-text text-transparent mb-4">
              Submit Your Work
            </h2>
            <p className="text-brand-black/70 mb-6">
              We accept submissions year-round. Share your creativity with the MMMUT community.
            </p>
            <ul className="space-y-3 text-brand-black/70 mb-8">
              <li className="flex items-start gap-2">
                <span className="text-brand-red font-bold">•</span>
                <span>Poetry, prose, essays, and artwork</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-red font-bold">•</span>
                <span>Original, unpublished work only</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-red font-bold">•</span>
                <span>Follow submission guidelines</span>
              </li>
            </ul>
            <motion.button
              className="bg-linear-to-r from-brand-red to-brand-red text-white font-bold py-3 px-8 w-full"
              whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(196, 30, 58, 0.3)' }}
              whileTap={{ scale: 0.98 }}
            >
              SUBMIT NOW
            </motion.button>
          </div>

          {/* Guidelines */}
          <div className="bg-linear-to-br from-brand-gold/10 to-brand-yellow/10 border-4 border-brand-gold p-10">
            <h2 className="text-3xl font-serif font-bold bg-linear-to-r from-brand-orange to-brand-gold bg-clip-text text-transparent mb-4">
              Submission Guidelines
            </h2>
            <p className="text-brand-black/70 mb-6">
              Please review our guidelines before submitting your work.
            </p>
            <ul className="space-y-3 text-brand-black/70 mb-8">
              <li className="flex items-start gap-2">
                <span className="text-brand-gold font-bold">•</span>
                <span>Maximum 3,000 words for prose</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-gold font-bold">•</span>
                <span>Up to 5 poems per submission</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-gold font-bold">•</span>
                <span>High-resolution images for artwork</span>
              </li>
            </ul>
            <motion.button
              className="border-2 border-brand-gold text-brand-black font-bold py-3 px-8 w-full hover:bg-brand-gold/10"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              VIEW FULL GUIDELINES
            </motion.button>
          </div>
        </motion.div>

        {/* Archive CTA */}
        <motion.div
          className="mt-12 bg-brand-cyan/10 border-4 border-brand-cyan p-12 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <h2 className="text-4xl font-serif font-bold text-brand-cyan mb-4">
            Explore Our Archive
          </h2>
          <p className="text-xl text-brand-black/70 mb-8">
            Browse through decades of literary excellence and creativity
          </p>
          <motion.button
            className="bg-brand-cyan hover:bg-brand-teal text-white font-bold py-4 px-10 text-lg"
            whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0, 149, 182, 0.3)' }}
            whileTap={{ scale: 0.95 }}
          >
            VIEW ARCHIVE
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  )
}
