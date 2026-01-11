import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/swiper-bundle.css'
import PDFViewer from '../components/PDFViewer/PDFViewer'
import PageHero from '../components/PageHero/PageHero'
import ParticlesBackground from '../components/ParticlesBackground/ParticlesBackground'

interface MagazineIssue {
  id: number
  title: string
  volume: string
  subtitle: string
  description: string
  coverImage: string
  pdfUrl: string
  publishedBy: string
  releaseDate: string
  category: string
}

// Sample data - replace with your actual data
const magazineIssues: MagazineIssue[] = [
  {
    id: 1,
    title: 'TIRESIA',
    volume: 'Volume 16, Issue 2',
    subtitle: 'Eclectic Essence',
    description: 'The May Issue of TIRESIA brings you a collection of thought-provoking articles, creative pieces, and insights from our university community. Featuring interviews, campus buzz, tech insights, and much more.',
    coverImage: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765572664/WhatsApp_Image_2025-12-12_at_22.44.43_dhbora.jpg',
    pdfUrl: 'https://ogclndqjxchntpvsnhkp.supabase.co/storage/v1/object/public/TheEDB/malvika.pdf',
    publishedBy: 'The Editorial Board, MMMUT',
    releaseDate: 'May 2024',
    category: 'Magazine'
  },
  // Add more issues as needed
]

export default function MagazineIssues() {
  const [selectedIssue, setSelectedIssue] = useState<MagazineIssue | null>(null)

  return (
    <div className="bg-stone-50 min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 2xl:px-12 relative overflow-x-hidden font-sans text-stone-800">
      <ParticlesBackground />
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-amber-200/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-125 h-125 bg-orange-200/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="max-w-7xl 2xl:max-w-8xl 3xl:max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        {/* Header */}
        <PageHero 
          title="Magazine Issues" 
          subtitle="Publications"
          description="Explore our latest publications and archived editions"
        />

        {/* Carousel */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation
            loop={true}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="magazine-swiper"
          >
            {magazineIssues.map((issue) => (
              <SwiperSlide key={issue.id}>
                <motion.div
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative h-64 bg-linear-to-br from-gray-800 to-gray-900 group">
                    <img
                      src={issue.coverImage}
                      alt={issue.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-[#FF8C69] text-white px-3 py-1 rounded-full text-xs font-bold">
                      LATEST ISSUE
                    </div>
                    
                    {/* Preview and Download Buttons Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      <motion.button
                        onClick={() => setSelectedIssue(issue)}
                        className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-gray-100 transition-colors shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                        Preview
                      </motion.button>
                      
                      <motion.a
                        href={issue.pdfUrl}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#FF8C69] text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-[#ff7a52] transition-colors shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        Download
                      </motion.a>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{issue.title}</h3>
                    <p className="text-sm text-gray-600 italic mb-3">{issue.volume} - {issue.subtitle}</p>
                    <p className="text-gray-700 mb-4 line-clamp-3">{issue.description}</p>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <svg className="w-5 h-5 text-[#FF8C69]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{issue.publishedBy}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <svg className="w-5 h-5 text-[#FF8C69]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{issue.releaseDate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <svg className="w-5 h-5 text-[#FF8C69]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                        </svg>
                        <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold">
                          {issue.category}
                        </span>
                      </div>
                    </div>

                    <motion.button
                      className="w-full bg-[#FF8C69] text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-[#ff7a52] transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      Download Full Issue
                    </motion.button>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* PDF Viewer Modal */}
        <AnimatePresence>
          {selectedIssue && selectedIssue.pdfUrl && (
            <motion.div
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedIssue(null)}
            >
              <motion.div
                className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900">{selectedIssue.title}</h2>
                  <button
                    onClick={() => setSelectedIssue(null)}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="h-[calc(90vh-80px)]">
                  <PDFViewer pdfUrl={selectedIssue.pdfUrl} />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        .magazine-swiper {
          padding: 20px 10px 50px;
        }
        
        .magazine-swiper .swiper-pagination-bullet {
          background: #FF8C69;
          width: 12px;
          height: 12px;
        }
        
        .magazine-swiper .swiper-pagination-bullet-active {
          background: #ff7a52;
          width: 32px;
          border-radius: 6px;
        }
        
        .magazine-swiper .swiper-button-next,
        .magazine-swiper .swiper-button-prev {
          color: #FF8C69;
          background: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .magazine-swiper .swiper-button-next:after,
        .magazine-swiper .swiper-button-prev:after {
          font-size: 20px;
        }
      `}</style>
    </div>
  )
}
