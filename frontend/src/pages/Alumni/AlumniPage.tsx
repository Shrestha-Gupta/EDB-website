import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Award, BookOpen, Users, TrendingUp, MessageSquare, Linkedin, Globe, ChevronLeft, ChevronRight } from 'lucide-react'
// Ensure this path is correct
import ParticlesBackground from '../../components/ParticlesBackground/ParticlesBackground'
import PageHero from '../../components/PageHero/PageHero'

const batches = [
  { year: '2020-2024', members: 42, achievements: 'Published 3 anthologies, 12 awards', icon: Award },
  { year: '2016-2020', members: 38, achievements: 'Founded digital magazine, national recognition', icon: BookOpen },
  { year: '2012-2016', members: 35, achievements: 'First inter-college festival, 8 publications', icon: Users },
  { year: '2008-2012', members: 40, achievements: 'Established editorial board legacy', icon: TrendingUp }
]

const featuredAlumni = [
  {
    id: 1,
    name: 'Dr. Priya Sharma',
    batch: '2016-2020',
    role: 'Published Author & Professor',
    achievement: 'Published 3 novels, teaches Creative Writing at Delhi University',
    currentPosition: 'Professor of Creative Writing',
    company: 'Delhi University',
    image: '',
    linkedin: '#',
    website: '#'
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    batch: '2012-2016',
    role: 'Journalist & Editor',
    achievement: 'Chief Editor at The Times of India, Lucknow Edition',
    currentPosition: 'Chief Editor',
    company: 'The Times of India',
    image: '',
    linkedin: '#',
    website: '#'
  },
  {
    id: 3,
    name: 'Anjali Verma',
    batch: '2008-2012',
    role: 'Digital Content Strategist',
    achievement: 'Leading content strategy for Fortune 500 companies',
    currentPosition: 'Content Strategist',
    company: 'Fortune 500',
    image: '',
    linkedin: '#',
    website: '#'
  },
  {
    id: 4,
    name: 'Amit Patel',
    batch: '2020-2024',
    role: 'Tech Writer & Blogger',
    achievement: 'Leading tech blog with 1M+ monthly readers',
    currentPosition: 'Founder & Writer',
    company: 'TechInsights Blog',
    image: '',
    linkedin: '#',
    website: '#'
  }
]

const stats = [
  { label: 'Total Alumni', value: '500+', icon: Users },
  { label: 'Publications', value: '150+', icon: BookOpen },
  { label: 'Awards Won', value: '75+', icon: Award },
  { label: 'Success Stories', value: '200+', icon: TrendingUp }
]

const alumniGallery = [
  { year: '2021', image: 'https://res.cloudinary.com/dzqtx9kms/image/upload/v1767363842/2021_tm6cpm.jpg' },
  { year: '2020', image: 'https://res.cloudinary.com/dzqtx9kms/image/upload/v1767363843/2020_hn5bqf.jpg' },
  { year: '2019', image: 'https://res.cloudinary.com/dzqtx9kms/image/upload/v1767363842/2019_w1gtu9.jpg' },
  { year: '2018', image: 'https://res.cloudinary.com/dzqtx9kms/image/upload/v1767363841/2018_drwlg2.jpg' },
  { year: '2017', image: 'https://res.cloudinary.com/dzqtx9kms/image/upload/v1767363841/2017_rjglwn.jpg' }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  }
}

export default function AlumniPage() {
  const [selectedBatch, setSelectedBatch] = useState<string>('2020-2024')
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  const handlePrevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev === 0 ? alumniGallery.length - 1 : prev - 1))
  }

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev === alumniGallery.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="bg-stone-50 min-h-screen pt-24 pb-20 px-4 sm:px-6 relative overflow-x-hidden font-sans text-stone-800">
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
        className="max-w-7xl mx-auto px-6 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Stats Section */}
        <motion.div
          className="py-16 -mt-20 relative z-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  // Lighter border
                  className="bg-white/95 backdrop-blur-lg rounded-3xl p-6 sm:p-8 text-center shadow-xl border border-orange-50"
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  {/* Softer icon color */}
                  <Icon className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-3 text-orange-500" />
                  <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <p className="text-sm sm:text-base text-gray-500 font-medium">{stat.label}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>



        {/* Gallery Section */}
        <motion.div
           className="py-16"
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-serif font-bold bg-linear-to-r from-orange-700 via-orange-500 to-amber-400 bg-clip-text text-transparent mb-4">
              Legacy in Frames
            </h2>
            <div className="w-24 h-1 bg-linear-to-r from-orange-500 via-amber-400 to-orange-500 mx-auto rounded-full" />
          </div>

          <div className="relative max-w-5xl mx-auto px-4">
            {/* Arrows */}
             <button
              onClick={handlePrevPhoto}
              className="absolute left-0 md:-left-12 top-1/2 -translate-y-1/2 z-20 bg-orange-500 text-white p-3 rounded-full shadow-lg hover:bg-orange-600 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNextPhoto}
               className="absolute right-0 md:-right-12 top-1/2 -translate-y-1/2 z-20 bg-orange-500 text-white p-3 rounded-full shadow-lg hover:bg-orange-600 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="relative overflow-hidden rounded-3xl bg-black shadow-2xl aspect-video group">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPhotoIndex}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0"
                  >
                    <img 
                        src={alumniGallery[currentPhotoIndex].image} 
                        alt={`Batch of ${alumniGallery[currentPhotoIndex].year}`}
                        className="w-full h-full object-contain"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-4xl font-serif font-bold mb-2 text-white" style={{ color: 'white' }}>{alumniGallery[currentPhotoIndex].year}</h3>
                        <p className="text-white text-lg font-medium" style={{ color: 'white' }}>Batch Memories</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
            </div>
             {/* Dots */}
             <div className="flex justify-center gap-2 mt-6">
              {alumniGallery.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPhotoIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentPhotoIndex === index
                      ? "bg-orange-500 w-8"
                      : "bg-gray-300 hover:bg-orange-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>



        {/* Alumni Canvas Section */}
        <motion.div
          // Very subtle background tint and border
          className="py-16 my-16 bg-linear-to-br from-amber-50/50 to-orange-50/50 rounded-3xl border border-orange-50"
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