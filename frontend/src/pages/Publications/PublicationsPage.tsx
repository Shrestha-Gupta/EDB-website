import { motion } from 'framer-motion'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ParticlesBackground from '../../components/ParticlesBackground/ParticlesBackground'

type TabType = 'all' | 'newsletter' | 'magazine'

const newsletters = [
  {
    id: 1,
    title: 'TIRESIA - Volume 16, Issue 3',
    type: 'NEWSLETTER',
    year: '2025',
    coverImage: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765572664/WhatsApp_Image_2025-12-12_at_22.44.56_2_gjepmx.jpg',
    description: 'The June Issue of TIRESIA brings you a collection of thought-provoking articles, creative pieces, and insights from our university community. Featuring interviews, campus buzz, tech insights, and much more.',
    pages: 150,
    contributors: 35,
    downloadUrl: 'https://ogclndqjxchntpvsnhkp.supabase.co/storage/v1/object/public/TheEDB/vol%2016%20issue3.pdf'
  },
  {
    id: 2,
    title: 'TIRESIA - Volume 16, Issue 2',
    type: 'NEWSLETTER',
    year: '2025',
    coverImage: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765572664/WhatsApp_Image_2025-12-12_at_22.44.56_1_wzbldy.jpg',
    description: 'The May Issue of TIRESIA brings you a collection of thought-provoking articles, creative pieces, and insights from our university community. Featuring interviews, campus buzz, tech insights, and much more.',
    pages: 150,
    contributors: 32,
    downloadUrl: 'https://ogclndqjxchntpvsnhkp.supabase.co/storage/v1/object/public/TheEDB/vol%2016%20issue%20%202.pdf'
  },
  {
    id: 3,
    title: 'TIRESIA - Volume 16, Issue 1',
    type: 'NEWSLETTER',
    year: '2025',
    coverImage: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765572664/WhatsApp_Image_2025-12-12_at_22.44.56_ffabep.jpg',
    description: 'A celebration of diverse voices and perspectives. This edition features student poetry, faculty essays, and multimedia content that showcase the rich tapestry of our academic community.',
    pages: 145,
    contributors: 30,
    downloadUrl: 'https://ogclndqjxchntpvsnhkp.supabase.co/storage/v1/object/public/TheEDB/vol%2016%20issue%201.pdf'
  }
]

const magazines = [
  {
    id: 4,
    title: 'Malvika - Annual Magazine 2024',
    type: 'ANNUAL MAGAZINE',
    year: '2024',
    coverImage: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765572664/WhatsApp_Image_2025-12-12_at_22.44.43_dhbora.jpg',
    description: 'Our flagship annual publication featuring the finest poetry, prose, and essays from students and faculty. A comprehensive anthology celebrating creativity and scholarly discourse.',
    pages: 240,
    contributors: 45,
    downloadUrl: 'https://ogclndqjxchntpvsnhkp.supabase.co/storage/v1/object/public/TheEDB/malvika.pdf'
  },
  {
    id: 5,
    title: 'Malvika - Annual Magazine 2023',
    type: 'ANNUAL MAGAZINE',
    year: '2023',
    coverImage: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765572664/WhatsApp_Image_2025-12-12_at_22.44.43_1_soyehf.jpg',
    description: 'A vibrant exploration of culture, arts, and heritage. Featuring stunning visual essays, interviews with artists, and reflections on the cultural significance of our diverse campus.',
    pages: 220,
    contributors: 42,
    downloadUrl: 'https://ogclndqjxchntpvsnhkp.supabase.co/storage/v1/object/public/TheEDB/malvika23.pdf'
  }
]

const allPublications = [...newsletters, ...magazines]

export default function PublicationsPage() {
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<TabType>('all')
  const [currentLatestIndex, setCurrentLatestIndex] = useState(0)

  const getPublications = () => {
    switch (activeTab) {
      case 'newsletter':
        return newsletters
      case 'magazine':
        return magazines
      default:
        return allPublications
    }
  }

  const publications = getPublications()
  const latestIssue = newsletters[currentLatestIndex]

  const handlePrevLatest = () => {
    setCurrentLatestIndex((prev) => (prev === 0 ? newsletters.length - 1 : prev - 1))
  }

  const handleNextLatest = () => {
    setCurrentLatestIndex((prev) => (prev === newsletters.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="bg-brand-white min-h-screen pt-24 pb-20 px-6 relative">
      <ParticlesBackground />
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

        {/* Latest Issue Carousel */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="flex justify-center mb-8">
            <motion.div
              className="inline-block bg-linear-to-r from-orange-50 to-red-50 border-3 border-brand-orange text-black px-6 py-2.5 rounded-xl font-bold text-lg tracking-wider shadow-lg"
              style={{
                boxShadow: '0 0 20px rgba(255, 140, 105, 0.5), 0 0 40px rgba(255, 140, 105, 0.3)'
              }}
              animate={{
                boxShadow: [
                  '0 0 20px rgba(255, 140, 105, 0.5), 0 0 40px rgba(255, 140, 105, 0.3)',
                  '0 0 25px rgba(255, 140, 105, 0.7), 0 0 50px rgba(255, 140, 105, 0.4)',
                  '0 0 20px rgba(255, 140, 105, 0.5), 0 0 40px rgba(255, 140, 105, 0.3)'
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              LATEST ISSUE
            </motion.div>
          </div>
          
          <div className="relative max-w-6xl mx-auto">
            {/* Navigation Buttons */}
            <motion.button
              onClick={handlePrevLatest}
              className="absolute -left-4 md:left-2 top-1/2 -translate-y-1/2 z-20 bg-brand-orange/80 backdrop-blur-sm text-white p-3 rounded-full shadow-xl hover:bg-brand-orange border-2 border-white"
              style={{
                boxShadow: '0 4px 15px rgba(255, 140, 105, 0.5)'
              }}
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 140, 105, 1)' }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
            </motion.button>
            
            <motion.button
              onClick={handleNextLatest}
              className="absolute -right-4 md:right-2 top-1/2 -translate-y-1/2 z-20 bg-brand-orange/80 backdrop-blur-sm text-white p-3 rounded-full shadow-xl hover:bg-brand-orange border-2 border-white"
              style={{
                boxShadow: '0 4px 15px rgba(255, 140, 105, 0.5)'
              }}
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 140, 105, 1)' }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
            </motion.button>

            {/* Latest Issue Card */}
            <motion.div
              key={currentLatestIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="grid md:grid-cols-2 gap-8 p-8">
                {/* Left: Cover Image */}
                <div className="relative">
                  <motion.img
                    src={latestIssue.coverImage}
                    alt={latestIssue.title}
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Right: Details */}
                <div className="flex flex-col justify-center">
                  <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">{latestIssue.title}</h2>
                  
                  <p className="text-gray-700 mb-8 leading-relaxed">
                    {latestIssue.description}
                  </p>

                  {/* Info Section */}
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-brand-orange" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                      </svg>
                      <div>
                        <p className="text-xs text-gray-500 uppercase">Published By</p>
                        <p className="font-semibold">The Editorial Board, MMMUT</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-brand-orange" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="text-xs text-gray-500 uppercase">Release Date</p>
                        <p className="font-semibold">May 2024</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-brand-orange" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                      </svg>
                      <div>
                        <p className="text-xs text-gray-500 uppercase">Category</p>
                        <span className="inline-block bg-yellow-400 text-black px-4 py-1 rounded-full font-bold text-sm">
                          Magazine
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedPdf(latestIssue.downloadUrl)
                      }}
                      className="flex-1 bg-brand-orange text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand-red active:bg-brand-red focus:bg-brand-orange transition-colors focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View PDF
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {newsletters.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentLatestIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentLatestIndex === index ? 'bg-brand-orange w-8' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          className="flex gap-4 justify-center mb-12 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <button
            onClick={() => setActiveTab('all')}
            className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all duration-300 border-3 ${
              activeTab === 'all'
                ? 'bg-brand-orange text-white border-brand-orange shadow-xl scale-105'
                : 'bg-white text-black border-black hover:bg-gray-100 shadow-md'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            All
          </button>
          <button
            onClick={() => setActiveTab('newsletter')}
            className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all duration-300 border-3 ${
              activeTab === 'newsletter'
                ? 'bg-brand-orange text-white border-brand-orange shadow-xl scale-105'
                : 'bg-white text-black border-black hover:bg-gray-100 shadow-md'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            Newsletter
          </button>
          <button
            onClick={() => setActiveTab('magazine')}
            className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all duration-300 border-3 ${
              activeTab === 'magazine'
                ? 'bg-brand-orange text-white border-brand-orange shadow-xl scale-105'
                : 'bg-white text-black border-black hover:bg-gray-100 shadow-md'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Annual Magazine
          </button>
        </motion.div>

        {/* Publications Grid - All Cards */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16"
        >
          {publications.map((pub) => (
            <motion.div
              key={pub.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -8, boxShadow: '0 15px 30px rgba(0,0,0,0.2)' }}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg border-2 border-gray-200 hover:border-brand-orange transition-all duration-300">
                {/* Book Cover with Image */}
                <div className="h-64 relative overflow-hidden">
                  <motion.img 
                    src={pub.coverImage} 
                    alt={pub.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  />
                  {/* Badge */}
                  <div className="absolute top-3 right-3 bg-brand-orange text-white px-3 py-1 rounded-full font-bold text-xs z-10">
                    {pub.type}
                  </div>
                  
                  {/* Hover Overlay with Preview */}
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 p-4">
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedPdf(pub.downloadUrl)
                      }}
                      className="bg-white text-black px-5 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-100 active:bg-gray-200 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View
                    </motion.button>
                    
                    <motion.a
                      href={pub.downloadUrl}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="bg-brand-orange text-white px-5 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-brand-red active:bg-brand-red focus:bg-brand-orange text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download
                    </motion.a>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-lg font-serif font-bold mb-1 line-clamp-2">{pub.title}</h3>
                  <div className="text-sm text-gray-500 mb-2">{pub.year}</div>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                    {pub.description}
                  </p>
                  
                  {/* Stats */}
                  <div className="flex gap-4 text-xs text-gray-500">
                    <div>{pub.pages} pages</div>
                    <div>{pub.contributors} contributors</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced PDF Viewer Modal */}
        {selectedPdf && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPdf(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-3xl w-full max-w-7xl h-[95vh] flex flex-col shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b-2 border-gray-200 bg-linear-to-r from-brand-orange to-brand-red">
                <div>
                  <h3 className="text-2xl font-bold text-white">PDF Preview</h3>
                  <p className="text-white/80 text-sm">View and download your publication</p>
                </div>
                <div className="flex items-center gap-4">
                  <motion.a
                    href={selectedPdf}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-brand-orange px-6 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-100 active:bg-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download
                  </motion.a>
                  <motion.button
                    onClick={() => setSelectedPdf(null)}
                    className="text-white hover:text-gray-200 p-2 rounded-lg hover:bg-white/20 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>
              </div>
              <div className="flex-1 w-full bg-gray-100 p-4">
                <iframe
                  src={`${selectedPdf}#toolbar=1&navpanes=1&scrollbar=1`}
                  className="w-full h-full rounded-lg shadow-inner bg-white"
                  title="PDF Viewer"
                />
              </div>
            </motion.div>
          </motion.div>
        )}


      </motion.div>
    </div>
  )
}
