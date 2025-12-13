import { motion, useAnimation } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Award, BookOpen, Users, TrendingUp, MessageSquare, Link as LinkIcon } from 'lucide-react'
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
    <div className="bg-white min-h-screen relative">
      <ParticlesBackground />
      {/* Hero Section with Image */}
      <motion.div 
        className="relative h-[60vh] md:h-[70vh] overflow-hidden group"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Background Image with Hover Effect */}
        <div className="absolute inset-0">
          <motion.img 
            src="https://res.cloudinary.com/dml0jlwlv/image/upload/v1765643612/atal_r2cyx8.jpg"
            alt="Alumni"
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          {/* Enhanced Overlay for Better Text Visibility */}
          <div className="absolute inset-0 bg-linear-to-br from-black/50 via-black/40 to-brand-cyan/20" />
          {/* Additional gradient from bottom for better readability */}
          <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
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
                color: '#ffffff',
                textShadow: '0 4px 20px rgba(0,0,0,0.9), 0 2px 10px rgba(0,0,0,0.8), 0 0 30px rgba(34,211,238,0.3)'
              }}
            >
              <span style={{ color: '#ffffff' }}>{displayedText}</span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-1 h-16 sm:h-20 md:h-24 lg:h-28 bg-brand-cyan ml-2 align-middle"
              />
            </h1>
            <div className="w-32 h-1 bg-linear-to-r from-brand-gold via-brand-orange to-brand-gold mx-auto mb-6" />
            <p 
              className="text-xl sm:text-2xl md:text-3xl text-white mb-8 font-light"
              style={{ 
                textShadow: '0 2px 15px rgba(0,0,0,0.9), 0 1px 8px rgba(0,0,0,0.8)'
              }}
            >
              Celebrating the legacy and achievements of our distinguished alumni who continue to inspire generations
            </p>
            <motion.button
              className="bg-brand-gold hover:bg-brand-orange active:bg-brand-orange focus:bg-brand-gold text-black font-bold py-4 px-10 rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2"
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
        className="max-w-7xl mx-auto px-6"
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
                  className="bg-white/90 backdrop-blur-lg rounded-3xl p-6 sm:p-8 text-center shadow-xl border border-brand-gold/20"
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <Icon className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-3 text-brand-cyan" />
                  <div className="text-3xl sm:text-4xl font-bold text-black mb-2">{stat.value}</div>
                  <p className="text-sm sm:text-base text-gray-600 font-medium">{stat.label}</p>
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
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-black mb-4">
              Batch Archives
            </h2>
            <div className="w-24 h-1 bg-linear-to-r from-brand-gold to-brand-orange mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {batches.map((batch) => {
              const Icon = batch.icon
              return (
                <motion.div
                  key={batch.year}
                  className={`relative overflow-hidden rounded-3xl p-6 cursor-pointer transition-all duration-300 ${
                    selectedBatch === batch.year
                      ? 'bg-linear-to-br from-brand-cyan to-brand-teal text-white shadow-2xl'
                      : 'bg-white/90 backdrop-blur-lg hover:bg-linear-to-br hover:from-brand-gold/10 hover:to-brand-orange/10 border border-brand-gold/30 hover:border-brand-gold shadow-lg'
                  }`}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedBatch(batch.year)}
                >
                  <div className="relative z-10 text-center">
                    <Icon className={`w-10 h-10 mx-auto mb-3 ${selectedBatch === batch.year ? 'text-white' : 'text-brand-cyan'}`} />
                    <div className={`text-3xl font-bold mb-2 ${selectedBatch === batch.year ? 'text-white' : 'text-black'}`}>
                      {batch.year}
                    </div>
                    <div className={`mb-3 font-semibold ${selectedBatch === batch.year ? 'text-white/90' : 'text-gray-600'}`}>
                      {batch.members} Members
                    </div>
                    <p className={`text-sm ${selectedBatch === batch.year ? 'text-white/80' : 'text-gray-600'}`}>
                      {batch.achievements}
                    </p>
                  </div>
                  {selectedBatch === batch.year && (
                    <motion.div
                      className="absolute inset-0 bg-white/5"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
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
          animate="visible"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-black mb-4">
              Featured Alumni
            </h2>
            <div className="w-24 h-1 bg-linear-to-r from-brand-gold to-brand-orange mx-auto mb-4" />
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet the accomplished individuals who have made significant contributions in their respective fields
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredAlumni.map((alumni, index) => (
              <motion.div
                key={alumni.id}
                variants={itemVariants}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="bg-white/90 backdrop-blur-lg rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-brand-gold/20 hover:border-brand-gold">
                  {/* Profile Image */}
                  <div className="relative h-64 bg-linear-to-br from-brand-cyan via-brand-teal to-brand-cyan overflow-hidden">
                    {alumni.image ? (
                      <img src={alumni.image} alt={alumni.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-5xl font-bold border-4 border-white/30">
                          {alumni.name.charAt(0)}
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                  </div>

                  {/* Profile Content */}
                  <div className="p-5">
                    <h3 className="text-xl font-serif font-bold text-black mb-2 group-hover:text-brand-cyan transition-colors leading-tight">
                      {alumni.name}
                    </h3>
                    <p className="text-sm text-brand-orange font-semibold mb-2">{alumni.batch}</p>
                    <p className="text-sm text-gray-700 font-medium mb-2">{alumni.currentPosition}</p>
                    <p className="text-xs text-gray-600 mb-3">{alumni.company}</p>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">{alumni.achievement}</p>
                    
                    {/* Social Links */}
                    <div className="flex gap-3 pt-3 border-t border-gray-200">
                      <a
                        href={alumni.linkedin}
                        className="text-gray-600 hover:text-brand-cyan transition-colors"
                        aria-label="LinkedIn"
                      >
                        <LinkIcon className="w-5 h-5" />
                      </a>
                      <a
                        href={alumni.website}
                        className="text-gray-600 hover:text-brand-cyan transition-colors"
                        aria-label="Website"
                      >
                        <MessageSquare className="w-5 h-5" />
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
          className="py-16 bg-linear-to-br from-brand-gold/5 to-brand-orange/5 rounded-3xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="max-w-4xl mx-auto text-center px-6">
            <MessageSquare className="w-16 h-16 mx-auto mb-6 text-brand-gold" />
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-black mb-6">
              Alumni Canvas
            </h2>
            <div className="w-24 h-1 bg-linear-to-r from-brand-gold to-brand-orange mx-auto mb-6" />
            <p className="text-xl text-gray-700 mb-10 leading-relaxed">
              Share your experiences, memories, and wisdom with current and future board members. Your stories inspire the next generation!
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <motion.button
                className="bg-linear-to-r from-brand-gold to-brand-orange hover:from-brand-orange hover:to-brand-gold active:from-brand-gold active:to-brand-orange focus:from-brand-gold focus:to-brand-orange text-white font-bold py-4 px-10 rounded-xl text-lg shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Share Your Story
              </motion.button>
              <motion.button
                className="border-2 border-brand-gold text-black bg-white active:bg-brand-gold/10 focus:bg-white hover:bg-brand-gold/10 font-bold py-4 px-10 rounded-xl text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2"
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
          className="my-16 bg-linear-to-br from-brand-cyan via-brand-teal to-brand-cyan rounded-3xl p-12 text-center text-white shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <Users className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-4xl sm:text-5xl font-serif font-bold mb-4">
            Stay Connected
          </h2>
          <div className="w-24 h-1 bg-white/50 mx-auto mb-6" />
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join our alumni network and stay updated with the latest news, events, and opportunities
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <motion.button
              className="bg-white text-brand-cyan active:bg-gray-100 focus:bg-white font-bold py-4 px-10 rounded-xl text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-cyan"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Join Network
            </motion.button>
            <motion.button
              className="border-2 border-white text-white bg-transparent active:bg-white/10 focus:bg-transparent font-bold py-4 px-10 rounded-xl text-lg hover:bg-white/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-cyan"
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
