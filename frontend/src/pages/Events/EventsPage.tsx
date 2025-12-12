import { motion } from 'framer-motion'
import { useState } from 'react'

const events = [
  {
    id: 1,
    title: 'Annual Literary Festival 2025',
    date: 'March 15-17, 2025',
    type: 'Festival',
    description: 'Three days of literary workshops, poetry readings, and cultural performances.',
    status: 'upcoming',
    color: 'brand-red'
  },
  {
    id: 2,
    title: 'Creative Writing Workshop',
    date: 'February 10, 2025',
    type: 'Workshop',
    description: 'Interactive session on fiction writing techniques with renowned authors.',
    status: 'upcoming',
    color: 'brand-orange'
  },
  {
    id: 3,
    title: 'Poetry Slam Competition',
    date: 'January 28, 2025',
    type: 'Competition',
    description: 'Open mic poetry competition for students across all departments.',
    status: 'registration-open',
    color: 'brand-gold'
  },
  {
    id: 4,
    title: 'Book Launch: Voices of MMMUT',
    date: 'December 20, 2024',
    type: 'Book Launch',
    description: 'Launch of our annual anthology featuring student and faculty works.',
    status: 'past',
    color: 'brand-cyan'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

const eventCardVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

export default function EventsPage() {
  const [filter, setFilter] = useState<string>('all')

  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter(event => event.status === filter)

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
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-6xl md:text-7xl font-serif font-bold bg-gradient-to-r from-brand-scarlet via-brand-orange to-brand-gold bg-clip-text text-transparent mb-6">
            Events
          </h1>
          <p className="text-xl text-brand-black/70 max-w-3xl mx-auto">
            Explore our calendar of literary events, workshops, and competitions designed to inspire creativity and foster community.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="flex gap-4 justify-center mb-12 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {['all', 'upcoming', 'registration-open', 'past'].map((filterType) => (
            <motion.button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-6 py-3 font-bold border-2 transition-all ${
                filter === filterType
                  ? 'bg-gradient-to-r from-brand-red to-brand-scarlet text-white border-transparent'
                  : 'border-brand-gold text-brand-black hover:border-brand-scarlet'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filterType.toUpperCase().replace('-', ' ')}
            </motion.button>
          ))}
        </motion.div>

        {/* Events Grid */}
        <motion.div
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={filter}
        >
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              variants={eventCardVariants}
              className="group"
            >
              <div className="bg-brand-white border-4 border-brand-gold hover:border-brand-scarlet transition-all duration-300 overflow-hidden shadow-xl">
                <div className="grid md:grid-cols-[300px_1fr] gap-0">
                  {/* Event Date Card */}
                  <div className={`bg-gradient-to-br from-${event.color} to-brand-gold p-8 flex flex-col justify-center items-center text-white relative overflow-hidden`}>
                    <motion.div
                      className="absolute inset-0 bg-black/10"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                    />
                    <div className="relative z-10 text-center">
                      <div className="text-5xl font-bold mb-2">
                        {event.date.split(' ')[1].replace(',', '')}
                      </div>
                      <div className="text-xl font-semibold uppercase">
                        {event.date.split(' ')[0]}
                      </div>
                      <div className="mt-4 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                        <span className="text-sm font-bold">{event.type}</span>
                      </div>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-3xl font-serif font-bold text-brand-black group-hover:text-brand-scarlet transition-colors">
                        {event.title}
                      </h3>
                      <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                        event.status === 'upcoming' ? 'bg-brand-orange/20 text-brand-orange' :
                        event.status === 'registration-open' ? 'bg-brand-gold/20 text-brand-gold' :
                        'bg-gray-200 text-gray-600'
                      }`}>
                        {event.status.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                    <p className="text-lg text-brand-black/70 mb-6">
                      {event.description}
                    </p>
                    <div className="flex gap-4">
                      <motion.button
                        className="bg-gradient-to-r from-brand-red to-brand-scarlet text-white font-bold py-3 px-8"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        LEARN MORE
                      </motion.button>
                      {event.status === 'registration-open' && (
                        <motion.button
                          className="border-2 border-brand-gold text-brand-black font-bold py-3 px-8 hover:bg-brand-gold/10"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          REGISTER NOW
                        </motion.button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Submit Event CTA */}
        <motion.div
          className="mt-20 bg-gradient-to-r from-brand-scarlet/10 to-brand-orange/10 border-4 border-brand-orange p-12 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className="text-4xl font-serif font-bold bg-gradient-to-r from-brand-scarlet to-brand-orange bg-clip-text text-transparent mb-4">
            Have an Event Idea?
          </h2>
          <p className="text-xl text-brand-black/70 mb-8">
            We're always open to new ideas and collaborations!
          </p>
          <motion.button
            className="bg-gradient-to-r from-brand-orange to-brand-gold text-white font-bold py-4 px-10 text-lg"
            whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(255, 140, 66, 0.3)' }}
            whileTap={{ scale: 0.95 }}
          >
            SUBMIT PROPOSAL
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  )
}
