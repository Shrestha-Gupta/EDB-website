import { motion } from 'framer-motion'
import { useState } from 'react'

const teamMembers = [
  {
    id: 1,
    name: 'Chief Editor',
    role: 'Overall Vision & Direction',
    description: 'Leading the editorial board with vision and excellence',
    color: 'from-brand-red to-brand-scarlet',
    image: ''
  },
  {
    id: 2,
    name: 'Managing Editor',
    role: 'Editorial Operations',
    description: 'Managing day-to-day editorial operations',
    color: 'from-brand-orange to-brand-gold',
    image: ''
  },
  {
    id: 3,
    name: 'Content Curator',
    role: 'Content Selection & Review',
    description: 'Curating the finest literary works',
    color: 'from-brand-cyan to-brand-teal',
    image: ''
  },
  {
    id: 4,
    name: 'Design Lead',
    role: 'Visual & Layout Design',
    description: 'Crafting beautiful visual experiences',
    color: 'from-brand-scarlet to-brand-orange',
    image: ''
  },
  {
    id: 5,
    name: 'Associate Editor',
    role: 'Manuscript Review',
    description: 'Reviewing and refining submissions',
    color: 'from-brand-gold to-brand-yellow',
    image: ''
  },
  {
    id: 6,
    name: 'Social Media Manager',
    role: 'Digital Presence',
    description: 'Managing our online community',
    color: 'from-brand-teal to-brand-cyan',
    image: ''
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

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

export default function TeamPage() {
  const [selectedMember, setSelectedMember] = useState<number | null>(null)

  return (
    <div className="bg-brand-white min-h-screen pt-24 pb-20 px-6">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Page Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-6xl md:text-7xl font-serif font-bold bg-gradient-to-r from-brand-red via-brand-orange to-brand-gold bg-clip-text text-transparent mb-6">
            Our Team
          </h1>
          <p className="text-xl text-brand-black/70 max-w-3xl mx-auto">
            Meet the passionate individuals behind The Editorial Board, dedicated to fostering creativity and literary excellence at MMMUT.
          </p>
        </motion.div>

        {/* Team Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              variants={cardVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              onClick={() => setSelectedMember(member.id)}
              className="group cursor-pointer"
            >
              <div className="bg-brand-white border-2 border-brand-gold hover:border-brand-scarlet transition-all duration-300 overflow-hidden shadow-lg">
                {/* Card Header with Gradient */}
                <div className={`h-40 bg-gradient-to-br ${member.color} flex items-center justify-center relative overflow-hidden`}>
                  <motion.div
                    className="absolute inset-0 bg-black/20"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="relative z-10 w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-4xl font-bold">
                    {member.name.charAt(0)}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-serif font-bold text-brand-black mb-2 group-hover:text-brand-scarlet transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-brand-orange font-semibold mb-3">{member.role}</p>
                  <p className="text-brand-black/70">{member.description}</p>
                </div>

                {/* Animated Border */}
                <motion.div
                  className="h-1 bg-gradient-to-r from-brand-gold to-brand-scarlet"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Join Team CTA */}
        <motion.div
          className="mt-20 bg-gradient-to-br from-brand-orange/10 to-brand-gold/10 border-4 border-brand-gold p-12 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-4xl font-serif font-bold bg-gradient-to-r from-brand-red to-brand-orange bg-clip-text text-transparent mb-6">
            Join Our Team
          </h2>
          <p className="text-xl text-brand-black/70 mb-8 max-w-2xl mx-auto">
            We're always looking for passionate individuals who share our vision for literary excellence and creative expression.
          </p>
          <motion.button
            className="bg-gradient-to-r from-brand-red to-brand-scarlet text-white font-bold py-4 px-10 text-lg"
            whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(196, 30, 58, 0.3)' }}
            whileTap={{ scale: 0.95 }}
          >
            APPLY NOW
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  )
}
