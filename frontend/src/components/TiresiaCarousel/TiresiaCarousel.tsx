import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import { ChevronLeft, ChevronRight, Download, Eye, X } from 'lucide-react'

// TIRESIA magazine issues data
const tiresiaIssues = [
  {
    id: 1,
    coverImage: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765572664/WhatsApp_Image_2025-12-12_at_22.44.56_2_gjepmx.jpg',
    title: 'TIRESIA',
    subtitle: 'Volume 16, Issue 3 - Eclectic Essence',
    description: 'The May Issue of TIRESIA brings you a collection of thought-provoking articles, creative pieces, and insights from our university community. Featuring interviews, campus buzz, tech insights, and much more.',
    publishedBy: 'The Editorial Board, MMMUT',
    releaseDate: 'June 2025',
    category: 'Newsletter',
    downloadUrl: 'https://ogclndqjxchntpvsnhkp.supabase.co/storage/v1/object/public/TheEDB/vol%2016%20issue3.pdf'
  },
  {
    id: 2,
    coverImage: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765572664/WhatsApp_Image_2025-12-12_at_22.44.56_1_wzbldy.jpg',
    title: 'TIRESIA',
    subtitle: 'Volume 16, Issue 2 - Eclectic Essence',
    description: 'Our latest installment explores the intersection of technology and creativity. Dive into articles about AI, digital art, and the future of online communities within our vibrant campus ecosystem.',
    publishedBy: 'The Editorial Board, MMMUT',
    releaseDate: 'May 2025',
    category: 'Newsletter',
    downloadUrl: 'https://ogclndqjxchntpvsnhkp.supabase.co/storage/v1/object/public/TheEDB/vol%2016%20issue%20%202.pdf'
  },
  {
    id: 3,
    coverImage: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765572664/WhatsApp_Image_2025-12-12_at_22.44.56_ffabep.jpg',
    title: 'TIRESIA',
    subtitle: 'Volume 16, Issue 1 - Eclectic Essence',
    description: 'A celebration of diverse voices and perspectives. This special edition features student poetry, faculty essays, and multimedia content that showcase the rich tapestry of our academic community.',
    publishedBy: 'The Editorial Board, MMMUT',
    releaseDate: 'January 2025',
    category: 'Newsletter',
    downloadUrl: 'https://ogclndqjxchntpvsnhkp.supabase.co/storage/v1/object/public/TheEDB/vol%2016%20issue%201.pdf'
  },
  {
    id: 4,
    coverImage: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765572664/WhatsApp_Image_2025-12-12_at_22.44.43_dhbora.jpg',
    title: 'TIRESIA',
    subtitle: 'Volume 15, Issue 3 - Sustainable Stories',
    description: 'Exploring sustainability, innovation, and social responsibility. This issue features groundbreaking research, personal narratives, and creative works addressing global challenges.',
    publishedBy: 'The Editorial Board, MMMUT',
    releaseDate: 'September 2023',
    category: 'Magazine',
    downloadUrl: 'https://ogclndqjxchntpvsnhkp.supabase.co/storage/v1/object/public/TheEDB/malvika.pdf'
  },
  {
    id: 5,
    coverImage: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765572664/WhatsApp_Image_2025-12-12_at_22.44.43_1_soyehf.jpg',
    title: 'Malavika',
    subtitle: 'Volume 15, Issue 2 - Cultural Crossroads',
    description: 'A vibrant exploration of culture, arts, and heritage. Featuring stunning visual essays, interviews with artists, and reflections on the cultural significance of our diverse campus.',
    publishedBy: 'The Editorial Board, MMMUT',
    releaseDate: 'June 2023',
    category: 'Magazine',
    downloadUrl: 'https://ogclndqjxchntpvsnhkp.supabase.co/storage/v1/object/public/TheEDB/malvika23.pdf'
  },
 
  
]

export default function TiresiaCarousel() {
  const [swiperRef, setSwiperRef] = useState<any>(null)
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null)

  return (
    <section className="py-10 md:py-20">
      <div className="relative px-4 sm:px-8 md:px-12 lg:px-16">
        {/* Left Side Navigation Button */}
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(217, 27, 27, 0.5)' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => swiperRef?.slidePrev()}
          className="absolute -left-2 sm:left-0 top-1/2 -translate-y-1/2 z-20 bg-brand-red hover:bg-brand-red/90 text-white p-2 sm:p-3 md:p-4 rounded-full transition-all duration-300 shadow-2xl flex items-center justify-center"
          aria-label="Previous issue"
          title="Slide Left"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" strokeWidth={3} />
        </motion.button>

        {/* Right Side Navigation Button */}
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(217, 27, 27, 0.5)' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => swiperRef?.slideNext()}
          className="absolute -right-2 sm:right-0 top-1/2 -translate-y-1/2 z-20 bg-brand-red hover:bg-brand-red/90 text-white p-2 sm:p-3 md:p-4 rounded-full transition-all duration-300 shadow-2xl flex items-center justify-center"
          aria-label="Next issue"
          title="Slide Right"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" strokeWidth={3} />
        </motion.button>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{
            clickable: true,
            bulletActiveClass: 'bg-brand-red',
            bulletClass: 'w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-gray-300 cursor-pointer transition-colors duration-300',
            renderBullet: (_index, className) => 
              `<span class="${className}"></span>`
          }}
          onSwiper={setSwiperRef}
          className="pb-12 md:pb-16"
        >
          {tiresiaIssues.map((issue) => (
            <SwiperSlide key={issue.id}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="p-4 sm:p-6 md:p-8 lg:p-12 bg-white rounded-lg"
              >
                <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-start">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center justify-center relative group"
                  >
                    <div className="w-full max-w-sm mx-auto relative">
                      <img
                        src={issue.coverImage}
                        alt={issue.title}
                        className="w-full h-auto rounded-lg shadow-2xl"
                      />
                      <div className="absolute inset-0 rounded-lg bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 sm:gap-4 p-2">
                        <motion.button
                          onClick={() => setSelectedPdf(issue.downloadUrl)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-white text-brand-black px-3 sm:px-4 md:px-6 py-2 md:py-3 rounded-lg font-bold flex items-center gap-1 sm:gap-2 hover:bg-gray-100 transition-colors text-xs sm:text-sm md:text-base"
                        >
                          <Eye className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2} />
                          <span className="hidden sm:inline">Preview</span>
                          <span className="sm:hidden">View</span>
                        </motion.button>
                        <motion.a
                          href={issue.downloadUrl}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-[#FF8C42] text-white px-3 sm:px-4 md:px-6 py-2 md:py-3 rounded-lg font-bold flex items-center gap-1 sm:gap-2 hover:bg-[#ff7a2e] transition-colors text-xs sm:text-sm md:text-base"
                        >
                          <Download className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2} />
                          <span className="hidden sm:inline">Download</span>
                          <span className="sm:hidden">Get</span>
                        </motion.a>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="flex flex-col justify-start"
                  >
                    <div className="inline-flex items-center gap-2 mb-4 md:mb-6 w-fit">
                      <div className="bg-[#FFE4E1] px-3 md:px-4 py-1 md:py-1.5 rounded-full">
                        <span className="text-[#D91B1B] font-bold text-xs tracking-wider">
                          LATEST ISSUE
                        </span>
                      </div>
                    </div>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-brand-black mb-2">
                      {issue.title}
                    </h2>

                    <p className="text-base sm:text-lg md:text-xl text-brand-black italic mb-4 md:mb-6">
                      {issue.subtitle}
                    </p>

                    <p className="text-sm sm:text-base md:text-lg text-brand-black/70 leading-relaxed mb-6 md:mb-8">
                      {issue.description}
                    </p>

                    <div className="border-t border-gray-300 my-4 md:my-6"></div>

                    <div className="space-y-3 sm:space-y-4 md:space-y-5 mb-6 md:mb-10">
                      <div className="flex items-start gap-3 md:gap-4">
                        <div className="mt-0.5 sm:mt-1">
                          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#D91B1B]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 10H9" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-brand-black/60 tracking-wider uppercase mb-1">Published By</p>
                          <p className="text-sm sm:text-base font-semibold text-brand-black">{issue.publishedBy}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 md:gap-4">
                        <div className="mt-0.5 sm:mt-1">
                          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#D91B1B]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-brand-black/60 tracking-wider uppercase mb-1">Release Date</p>
                          <p className="text-sm sm:text-base font-semibold text-brand-black">{issue.releaseDate}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 md:gap-4">
                        <div className="mt-0.5 sm:mt-1">
                          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#D91B1B]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-brand-black/60 tracking-wider uppercase mb-2">Category</p>
                          <span className="bg-[#FFD700] text-brand-black font-bold text-xs sm:text-sm px-3 sm:px-5 py-1 sm:py-1.5 rounded-full inline-block">
                            {issue.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                      <motion.button
                        onClick={() => setSelectedPdf(issue.downloadUrl)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white border-2 border-brand-black text-brand-black font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-brand-black/5 transition-colors text-sm sm:text-base"
                      >
                        <Eye className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2} />
                        Preview
                      </motion.button>
                      <motion.a
                        href={issue.downloadUrl}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-linear-to-r from-[#FF8C42] to-[#D91B1B] hover:from-[#ff7a2e] hover:to-[#c41818] text-white font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 text-sm sm:text-base"
                      >
                        <Download className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2} />
                        <span className="hidden sm:inline">Download Full Issue</span>
                        <span className="sm:hidden">Download</span>
                      </motion.a>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-8 md:mt-12 lg:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
      >
        <div className="bg-linear-to-br from-brand-red/10 to-brand-orange/10 p-4 sm:p-5 md:p-6 rounded-lg text-center">
          <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-red mb-1 sm:mb-2">{tiresiaIssues.length}</div>
          <p className="text-brand-black/70 font-medium text-xs sm:text-sm md:text-base">Total Issues</p>
        </div>
        <div className="bg-linear-to-br from-brand-gold/10 to-brand-yellow/10 p-4 sm:p-5 md:p-6 rounded-lg text-center">
          <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-gold mb-1 sm:mb-2">15+</div>
          <p className="text-brand-black/70 font-medium text-xs sm:text-sm md:text-base">Volumes</p>
        </div>
        <div className="bg-linear-to-br from-brand-cyan/10 to-brand-teal/10 p-4 sm:p-5 md:p-6 rounded-lg text-center">
          <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-cyan mb-1 sm:mb-2">500+</div>
          <p className="text-brand-black/70 font-medium text-xs sm:text-sm md:text-base">Contributors</p>
        </div>
        <div className="bg-linear-to-br from-brand-orange/10 to-brand-red/10 p-4 sm:p-5 md:p-6 rounded-lg text-center">
          <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-orange mb-1 sm:mb-2">2014</div>
          <p className="text-brand-black/70 font-medium text-xs sm:text-sm md:text-base">Since</p>
        </div>
      </motion.div>

      <AnimatePresence>
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
              exit={{ scale: 0.9 }}
              className="bg-white rounded-lg w-full max-w-6xl h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b">
                <h3 className="text-xl font-bold text-brand-black">PDF Preview</h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedPdf(null)}
                  className="text-gray-500 hover:text-brand-black transition-colors"
                >
                  <X className="w-6 h-6" strokeWidth={2} />
                </motion.button>
              </div>
              <iframe
                src={selectedPdf}
                className="flex-1 w-full"
                title="PDF Viewer"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
