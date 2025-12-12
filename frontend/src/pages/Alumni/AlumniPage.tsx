import { motion } from 'framer-motion'
import { useState } from 'react'

const batches = [
  { year: '2020-2024', members: 42, achievements: 'Published 3 anthologies, 12 awards' },
  { year: '2016-2020', members: 38, achievements: 'Founded digital magazine, national recognition' },
  { year: '2012-2016', members: 35, achievements: 'First inter-college festival, 8 publications' },
  { year: '2008-2012', members: 40, achievements: 'Established editorial board legacy' }
]

const featuredAlumni = [
  {
    id: 1,
    name: 'Dr. Priya Sharma',
    batch: '2016-2020',
    role: 'Published Author & Professor',
    achievement: 'Published 3 novels, teaches Creative Writing at Delhi University',
    color: 'from-brand-red to-brand-scarlet'
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    batch: '2012-2016',
    role: 'Journalist & Editor',
    achievement: 'Chief Editor at The Times of India, Lucknow Edition',
    color: 'from-brand-orange to-brand-gold'
  },
  {
    id: 3,
    name: 'Anjali Verma',
    batch: '2008-2012',
    role: 'Digital Content Strategist',
    achievement: 'Leading content strategy for Fortune 500 companies',
    color: 'from-brand-cyan to-brand-teal'
  }
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
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

export default function AlumniPage() {
  const [selectedBatch, setSelectedBatch] = useState<string>('2020-2024')

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
          <h1 className="text-6xl md:text-7xl font-serif font-bold bg-gradient-to-r from-brand-scarlet via-brand-orange to-brand-gold bg-clip-text text-transparent mb-6">
            Alumni & Archive
          </h1>
          <p className="text-xl text-brand-black/70 max-w-3xl mx-auto">
            Celebrating the legacy and achievements of our distinguished alumni who continue to inspire generations.
          </p>
        </motion.div>

        {/* Batch Timeline */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-4xl font-serif font-bold bg-gradient-to-r from-brand-black to-brand-scarlet bg-clip-text text-transparent mb-8 text-center">
            Batch Archives
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {batches.map((batch) => (
              <motion.div
                key={batch.year}
                className={`border-4 p-6 cursor-pointer transition-all ${
                  selectedBatch === batch.year
                    ? 'border-brand-scarlet bg-brand-scarlet/10'
                    : 'border-brand-gold hover:border-brand-orange'
                }`}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedBatch(batch.year)}
              >
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-brand-red to-brand-orange bg-clip-text text-transparent mb-2">
                    {batch.year}
                  </div>
                  <div className="text-brand-black/60 mb-4">{batch.members} Members</div>
                  <p className="text-sm text-brand-black/70">{batch.achievements}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Featured Alumni */}
        <motion.div
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-4xl font-serif font-bold bg-gradient-to-r from-brand-black to-brand-scarlet bg-clip-text text-transparent mb-12 text-center">
            Featured Alumni
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredAlumni.map((alumni) => (
              <motion.div
                key={alumni.id}
                variants={itemVariants}
                className="group"
              >
                <div className="bg-brand-white border-4 border-brand-gold hover:border-brand-scarlet transition-all duration-300 overflow-hidden shadow-xl">
                  {/* Profile Header */}
                  <div className={`h-48 bg-gradient-to-br ${alumni.color} flex items-center justify-center relative overflow-hidden`}>
                    <motion.div
                      className="absolute inset-0 bg-black/20"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                    />
                    <div className="relative z-10 w-28 h-28 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-5xl font-bold border-4 border-white/30">
                      {alumni.name.charAt(0)}
                    </div>
                  </div>

                  {/* Profile Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-serif font-bold text-brand-black mb-1 group-hover:text-brand-scarlet transition-colors">
                      {alumni.name}
                    </h3>
                    <p className="text-brand-orange font-semibold mb-2">{alumni.batch}</p>
                    <p className="text-brand-cyan font-semibold mb-3">{alumni.role}</p>
                    <p className="text-brand-black/70 text-sm">{alumni.achievement}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Canvas Section */}
        <motion.div
          className="bg-gradient-to-br from-brand-gold/10 to-brand-orange/10 border-4 border-brand-gold p-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className="text-4xl font-serif font-bold bg-gradient-to-r from-brand-orange to-brand-gold bg-clip-text text-transparent mb-6 text-center">
            Alumni Canvas
          </h2>
          <p className="text-xl text-brand-black/70 text-center mb-8 max-w-3xl mx-auto">
            Share your experiences, memories, and wisdom with current and future board members. Your stories inspire the next generation!
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <motion.button
              className="bg-gradient-to-r from-brand-orange to-brand-gold text-white font-bold py-4 px-10 text-lg"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(255, 140, 66, 0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              SHARE YOUR STORY
            </motion.button>
            <motion.button
              className="border-2 border-brand-gold text-brand-black font-bold py-4 px-10 text-lg hover:bg-brand-gold/10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              READ STORIES
            </motion.button>
          </div>
        </motion.div>

        {/* Stay Connected */}
        <motion.div
          className="mt-12 bg-gradient-to-r from-brand-cyan/10 to-brand-teal/10 border-4 border-brand-cyan p-12 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <h2 className="text-4xl font-serif font-bold text-brand-cyan mb-4">
            Stay Connected
          </h2>
          <p className="text-xl text-brand-black/70 mb-8">
            Join our alumni network and stay updated with the latest news and events
          </p>
          <div className="flex gap-4 justify-center">
            <motion.button
              className="bg-brand-cyan hover:bg-brand-teal text-white font-bold py-3 px-8"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              JOIN NETWORK
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
