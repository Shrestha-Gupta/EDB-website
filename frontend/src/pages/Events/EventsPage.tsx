import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { MapPin, ArrowRight } from 'lucide-react'
import ParticlesBackground from '../../components/ParticlesBackground/ParticlesBackground'
import SEO, { seoConfigs } from '../../components/SEO/SEO'

// --- Data Configuration ---
const events = [
  {
    id: 1,
    title: 'Arunoday',
    subtitle: 'The Literary Extravaganza',
    date: 'February 10, 2025',
    day: '10',
    month: 'FEB',
    type: 'Workshop',
    description: 'When dawn breaks upon the realm of words, Arunoday \'26 unfolds, where narratives are spoken, shaped, and tested. Guided by The Editorial Board, language is treated as both craft and responsibility. Enter and witness the narrative being unveiled and carried forward.',
    status: 'registration-open',
    location: 'MPH',
    theme: 'from-orange-500 to-amber-500',
    image: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1768374921/grey-new-12_n96vgh.jpg'
  },
  {
  id: 2,
  title: 'MUN',
  subtitle: 'Model United Nations Conference',
  date: 'February 10, 2025',
  day: '10',
  month: 'FEB',
  type: 'Workshop',
  description: 'Model United Nations (MUN) at Arunoday ’26 is a dynamic diplomatic simulation that brings global discourse to life. Delegates represent nations, engage in structured debate, negotiate policies, and collaboratively draft resolutions on pressing international issues. Guided by The Editorial Board, the conference fosters critical thinking, diplomacy, leadership, and responsible communication, offering participants an immersive experience in international relations and global decision-making.',
  status: 'registration-open',
  location: 'MPH',
  theme: 'from-orange-500 to-amber-500',
  image: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1768374455/Mun_Poster_z1qvoj.jpg'
},

  {
    id: 3,
    title: 'Abhyudaya 2025',
    subtitle: 'Annual Art Culture and Literary Fest',
    date: 'March 15-17, 2025',
    day: '15',
    month: 'MAR',
    type: 'Festival',
    description: 'Our flagship event celebrating literature, culture, and art. Three days of grand symposiums, celebrity panels, and cultural evenings.',
    status: 'upcoming',
    location: 'MPH',
    theme: 'from-amber-700 to-orange-600',
    image: 'https://res.cloudinary.com/dzqtx9kms/image/upload/v1768167902/Screenshot_2026-01-12_031442_s2uwpb.png'
  },
  {
    id: 4,
    title: 'Vagmita',
    subtitle: 'The Poetry Slam',
    date: 'January 28, 2025',
    day: '28',
    month: 'JAN',
    type: 'Competition',
    description: 'Celebrating eloquence. An open mic and slam poetry competition where words weave magic. Open to all departments.',
    status: 'past',
    location: 'Open Air Theatre',
    theme: 'from-yellow-600 to-amber-600',
    image: 'https://res.cloudinary.com/dwdx4kjgx/image/upload/v1767466802/WhatsApp_Image_2026-01-04_at_12.26.42_AM_muatti.jpg'
  },
  {
    id: 5,
    title: 'Annual Debate Competition',
    subtitle: 'Battle of Perspectives',
    date: 'December 20, 2024',
    day: '20',
    month: 'DEC',
    type: 'Debate',
    description: 'A classic parliamentary debate fostering critical thinking and public speaking excellence among students.',
    status: 'past',
    location: 'Senate Hall',
    theme: 'from-stone-600 to-stone-800',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 6,
    title: 'Annual Photoshoot',
    subtitle: 'Capturing Memories',
    date: 'April 05, 2025',
    day: '05',
    month: 'APR',
    type: 'Social',
    description: 'The traditional board photoshoot. A day of bonding, styling, and capturing the faces behind the words.',
    status: 'upcoming',
    location: 'Campus Garden',
    theme: 'from-amber-600 to-yellow-500',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop'
  }
]

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } }
}

export default function EventsPage() {
  const [filter, setFilter] = useState('all')

  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter(event => event.status === filter)

  return (
    <div className="bg-stone-50 min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 2xl:px-12 relative overflow-x-hidden font-sans text-stone-800">
      <SEO {...seoConfigs.events} />
      <ParticlesBackground />
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-amber-200/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-125 h-125 bg-orange-200/20 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        className="max-w-7xl 2xl:max-w-8xl 3xl:max-w-9xl mx-auto relative z-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* --- Hero Section --- */}
        <motion.div className="text-center mb-16 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 text-amber-700 font-bold tracking-widest uppercase text-sm"
          >
            <span className="h-px w-12 bg-amber-700/40"></span>
            The Editorial Board
            <span className="h-px w-12 bg-amber-700/40"></span>
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl 2xl:text-9xl 3xl:text-[10rem] font-serif font-bold text-stone-900 mb-6 drop-shadow-sm">
            Events<span className="text-amber-600">.</span>
          </h1>
          
          <p className="text-xl md:text-2xl 2xl:text-3xl text-stone-600 font-serif italic max-w-3xl 2xl:max-w-4xl mx-auto leading-relaxed">
            "A curation of literary excellence, cultural festivities, and intellectual discourse."
          </p>
        </motion.div>

        {/* --- Filters --- */}
        <motion.div 
          className="flex flex-wrap gap-3 justify-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {['all', 'upcoming', 'rising-soon', 'past'].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`
                px-6 py-2 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 relative overflow-hidden group
                ${filter === filterType 
                  ? 'text-white shadow-lg shadow-amber-900/20' 
                  : 'text-stone-600 hover:text-amber-700 bg-white border border-stone-200'}
              `}
            >
              {filter === filterType && (
                <motion.div 
                  layoutId="activePill"
                  className="absolute inset-0 bg-linear-to-r from-amber-600 to-orange-600"
                />
              )}
              <span className="relative z-10">{filterType.toUpperCase().replace('-', ' ')}</span>
            </button>
          ))}
        </motion.div>

        {/* --- Events List --- */}
        <motion.div className="space-y-8" layout>
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((event) => (
              <motion.div
                key={event.id}
                layout
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="group perspective"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-xl shadow-stone-200/50 hover:shadow-2xl hover:shadow-amber-900/10 transition-all duration-500 border border-stone-100 flex flex-col md:flex-row relative">
                  
                  {/* Left: Image */ }
                  <div className="md:w-72 relative overflow-hidden h-64 md:h-auto">
                    <div className={`absolute inset-0 bg-linear-to-br ${event.theme} opacity-20 mix-blend-overlay z-10`} />
                    <img
                      src={event.image || 'https://images.unsplash.com/photo-1544928147-79a794764d68?q=80&w=1000'}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>

                  {/* Right: Content */}
                  <div className="flex-1 p-8 md:p-10 flex flex-col justify-between relative bg-stone-50/50">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-amber-600 font-bold uppercase tracking-wider text-xs mb-1">
                            {event.subtitle}
                          </h4>
                          <h3 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 group-hover:text-amber-700 transition-colors">
                            {event.title}
                          </h3>
                        </div>
                        <span className={`
                          hidden md:inline-flex px-3 py-1 rounded border text-xs font-bold uppercase tracking-wider
                          ${event.status === 'upcoming' ? 'border-amber-500 text-amber-700 bg-amber-50' : 
                            event.status === 'rising-soon' ? 'border-orange-500 text-orange-700 bg-orange-50' : 
                            'border-stone-300 text-stone-500 bg-stone-100'}
                        `}>
                          {event.status.replace('-', ' ')}
                        </span>
                      </div>

                      <p className="text-stone-600 text-lg leading-relaxed mb-6 font-light">
                        {event.description}
                      </p>

                      <div className="flex flex-wrap gap-6 text-sm text-stone-500 font-medium mb-8">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-amber-500" />
                          {event.location}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 pt-6 border-t border-stone-200">
                      <a href=""><button className="bg-stone-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-amber-600 transition-colors flex items-center gap-2 group/btn">
                        View Details
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button></a>
                      
                      {event.status === 'registration-open' && (
                       <a href=""> <button className="text-stone-900 px-8 py-3 rounded-lg font-bold border-2 border-stone-900 hover:bg-stone-900 hover:text-white transition-all">
                          Register Now
                        </button></a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* --- Call to Action --- */}
        <motion.div 
          className="mt-24 bg-linear-to-br from-brand-red/10 to-brand-orange/10 border-4 border-brand-red p-12 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold bg-linear-to-r from-brand-red to-brand-orange bg-clip-text text-transparent mb-6">
            Propose an Event
          </h2>
          <p className="text-xl text-brand-black/70 max-w-2xl mx-auto mb-10">
            Do you have a vision for a literary workshop or a cultural phenomenon? 
            <br />We provide the platform, you provide the creativity.
          </p>
            <Link to="/contact" className="w-full sm:w-auto inline-block">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-linear-to-r from-brand-red to-brand-red text-black font-bold py-4 px-12 text-lg rounded-3xl cursor-pointer text-center md:hover:shadow-lg shadow-2xl hover:shadow-orange-900/20 transition-all"
              >
                Submit Proposal
              </motion.button>
            </Link>
        </motion.div>

        {/* Footer spacing */}
        <div className="h-12"></div>
      </motion.div>
    </div>
  )
}