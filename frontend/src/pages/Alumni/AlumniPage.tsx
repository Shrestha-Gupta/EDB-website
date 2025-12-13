import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Award, BookOpen, Users, TrendingUp, MessageSquare, Linkedin, Globe } from 'lucide-react'
// Ensure this path is correct
import ParticlesBackground from '../../components/ParticlesBackground/ParticlesBackground'

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
  const [displayedText, setDisplayedText] = useState('')
  const fullText = 'Alumni & Legacy'
  
  useEffect(() => {
    let currentIndex = 0
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(typingInterval)
      }
    }, 100)
    
    return () => clearInterval(typingInterval)
  }, [])

  return (
    <div className="bg-white min-h-screen relative overflow-hidden">
      {/* Background Particles - fixed to allow clicking */}
      <div className="absolute inset-0 pointer-events-none">
        <ParticlesBackground />
      </div>

      {/* Hero Section with Image */}
      <motion.div 
        className="relative h-[60vh] md:h-[70vh] overflow-hidden group"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <motion.img 
            src="https://res.cloudinary.com/dml0jlwlv/image/upload/v1765643612/atal_r2cyx8.jpg"
            alt="Alumni"
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          {/* Overlay: Warm Sunset Gradient (Softer) */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-orange-800/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center justify-center px-6">
          <motion.div
            className="text-center max-w-4xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h1 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 tracking-tight leading-tight"
              style={{ 
                textShadow: '0 4px 20px rgba(0,0,0,0.9), 0 0 30px rgba(251, 146, 60, 0.3)' // Lighter orange shadow
              }}
            >
              <span style={{ color: '#ffffff' }}>{displayedText}</span>
              {/* Softer orange cursor */}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-1 h-16 sm:h-20 md:h-24 lg:h-28 bg-orange-400 ml-2 align-middle"
              />
            </h1>
            {/* Softer gradient line */}
            <div className="w-32 h-1 bg-gradient-to-r from-orange-500 via-amber-300 to-orange-500 mx-auto mb-6 rounded-full" />
            <p 
              className="text-xl sm:text-2xl md:text-3xl text-gray-100 mb-8 font-light"
              style={{ 
                textShadow: '0 2px 10px rgba(0,0,0,0.8)'
              }}
            >
              Celebrating the legacy and achievements of our distinguished alumni.
            </p>
            {/* Softer button colors */}
            <motion.button
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-orange-400/30 focus:outline-none border-2 border-orange-500"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Join Alumni Network
            </motion.button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/50 rounded-full" />
          </div>
        </motion.div>
      </motion.div>

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

        {/* Batch Timeline */}
        <motion.div
          className="py-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="text-center mb-12">
            {/* Softer text gradient */}
            <h2 className="text-4xl sm:text-5xl font-serif font-bold bg-gradient-to-r from-orange-700 via-orange-500 to-amber-400 bg-clip-text text-transparent mb-4">
              Batch Archives
            </h2>
            {/* Softer line gradient */}
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 mx-auto rounded-full" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {batches.map((batch) => {
              const Icon = batch.icon
              return (
                <motion.div
                  key={batch.year}
                  // Softer selected state and lighter hover border
                  className={`relative overflow-hidden rounded-3xl p-6 cursor-pointer transition-all duration-300 ${
                    selectedBatch === batch.year
                      ? 'bg-gradient-to-br from-orange-500 to-amber-400 text-white shadow-xl shadow-orange-400/20'
                      : 'bg-white border border-gray-100 hover:border-orange-200 shadow-md hover:shadow-lg'
                  }`}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedBatch(batch.year)}
                >
                  <div className="relative z-10 text-center">
                    {/* Softer unselected icon color */}
                    <Icon className={`w-10 h-10 mx-auto mb-3 ${selectedBatch === batch.year ? 'text-white' : 'text-orange-500'}`} />
                    <div className={`text-2xl font-bold mb-2 ${selectedBatch === batch.year ? 'text-white' : 'text-gray-900'}`}>
                      {batch.year}
                    </div>
                    <div className={`mb-3 font-semibold ${selectedBatch === batch.year ? 'text-white/90' : 'text-gray-600'}`}>
                      {batch.members} Members
                    </div>
                    <p className={`text-sm ${selectedBatch === batch.year ? 'text-white/80' : 'text-gray-500'}`}>
                      {batch.achievements}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Featured Alumni */}
        <motion.div
          className="py-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="text-center mb-12">
            {/* Softer text gradient */}
            <h2 className="text-4xl sm:text-5xl font-serif font-bold bg-gradient-to-r from-orange-700 via-orange-500 to-amber-400 bg-clip-text text-transparent mb-4">
              Featured Alumni
            </h2>
            {/* Softer line gradient */}
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 mx-auto mb-4 rounded-full" />
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet the accomplished individuals who have made significant contributions in their respective fields
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredAlumni.map((alumni) => (
              <motion.div
                key={alumni.id}
                variants={itemVariants}
                className="group h-full"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
                  {/* Profile Image Area - Lighter gradient placeholder */}
                  <div className="relative h-64 bg-gradient-to-br from-amber-100 to-orange-50 overflow-hidden flex items-center justify-center">
                    {alumni.image ? (
                      <img src={alumni.image} alt={alumni.name} className="w-full h-full object-cover" />
                    ) : (
                      // Softer text color for placeholder
                      <div className="w-24 h-24 bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-orange-500 text-4xl font-serif font-bold border-4 border-white">
                        {alumni.name.charAt(0)}
                      </div>
                    )}
                    {/* Overlay on Hover */}
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Profile Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    {/* Softer hover color */}
                    <h3 className="text-xl font-serif font-bold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors">
                      {alumni.name}
                    </h3>
                    {/* Softer batch color */}
                    <p className="text-sm text-orange-500 font-bold mb-3">{alumni.batch}</p>
                    
                    <div className="mb-4 flex-grow">
                        <p className="text-sm text-gray-800 font-semibold">{alumni.currentPosition}</p>
                        <p className="text-xs text-gray-500 mb-2">{alumni.company}</p>
                        <p className="text-sm text-gray-600 italic">"{alumni.achievement}"</p>
                    </div>
                    
                    {/* Social Links - Softer hover color */}
                    <div className="flex gap-4 pt-4 border-t border-gray-100 mt-auto">
                      <a href={alumni.linkedin} className="text-gray-400 hover:text-orange-500 transition-colors">
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a href={alumni.website} className="text-gray-400 hover:text-orange-500 transition-colors">
                        <Globe className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Alumni Canvas Section */}
        <motion.div
          // Very subtle background tint and border
          className="py-16 my-16 bg-gradient-to-br from-amber-50/50 to-orange-50/50 rounded-3xl border border-orange-50"
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
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-amber-400 mx-auto mb-6 rounded-full" />
            <p className="text-xl text-gray-700 mb-10 leading-relaxed">
              Share your experiences, memories, and wisdom with current and future board members. Your stories inspire the next generation!
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              {/* Softer primary button */}
              <motion.button
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-xl text-lg shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Share Your Story
              </motion.button>
              {/* Softer secondary button border and text */}
              <motion.button
                className="bg-white text-orange-600 border-2 border-orange-100 hover:border-orange-400 font-bold py-4 px-10 rounded-xl text-lg transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Read Stories
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Stay Connected */}
        <motion.div
          // Softer gradient background
          className="my-16 bg-gradient-to-br from-orange-700 via-orange-500 to-amber-500 rounded-3xl p-12 text-center text-white shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Users className="w-16 h-16 mx-auto mb-6 text-white/90" />
          <h2 className="text-4xl sm:text-5xl font-serif font-bold mb-4">
            Stay Connected
          </h2>
          <div className="w-24 h-1 bg-white/50 mx-auto mb-6 rounded-full" />
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join our alumni network and stay updated with the latest news, events, and opportunities.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            {/* Softer text color */}
            <motion.button
              className="bg-white text-orange-600 hover:bg-orange-50 font-bold py-4 px-10 rounded-xl text-lg transition-all duration-300 shadow-lg"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Join Network
            </motion.button>
            <motion.button
              className="border-2 border-white/80 text-white bg-transparent hover:bg-white/10 font-bold py-4 px-10 rounded-xl text-lg transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Alumni
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}