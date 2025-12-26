import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Award, BookOpen, Users, TrendingUp, MessageSquare, Linkedin, Globe } from 'lucide-react'
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

        {/* Batch Timeline */}
        <motion.div
          className="py-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="text-center mb-12">
            {/* Softer text gradient */}
            <h2 className="text-4xl sm:text-5xl font-serif font-bold bg-linear-to-r from-orange-700 via-orange-500 to-amber-400 bg-clip-text text-transparent mb-4">
              Batch Archives
            </h2>
            {/* Softer line gradient */}
            <div className="w-24 h-1 bg-linear-to-r from-orange-500 via-amber-400 to-orange-500 mx-auto rounded-full" />
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
                      ? 'bg-linear-to-br from-orange-500 to-amber-400 text-white shadow-xl shadow-orange-400/20'
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
            <h2 className="text-4xl sm:text-5xl font-serif font-bold bg-linear-to-r from-orange-700 via-orange-500 to-amber-400 bg-clip-text text-transparent mb-4">
              Featured Alumni
            </h2>
            {/* Softer line gradient */}
            <div className="w-24 h-1 bg-linear-to-r from-orange-500 via-amber-400 to-orange-500 mx-auto mb-4 rounded-full" />
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
                  <div className="relative h-64 bg-linear-to-br from-amber-100 to-orange-50 overflow-hidden flex items-center justify-center">
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
                  <div className="p-6 flex flex-col grow">
                    {/* Softer hover color */}
                    <h3 className="text-xl font-serif font-bold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors">
                      {alumni.name}
                    </h3>
                    {/* Softer batch color */}
                    <p className="text-sm text-orange-500 font-bold mb-3">{alumni.batch}</p>
                    
                    <div className="mb-4 grow">
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