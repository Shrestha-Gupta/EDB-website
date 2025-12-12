import { motion } from 'framer-motion'

const publications = [
  {
    id: 1,
    title: 'Voices of MMMUT - Volume 5',
    type: 'Annual Anthology',
    year: '2024',
    cover: 'bg-linear-to-br from-brand-red to-brand-red',
    description: 'Our flagship publication featuring the finest poetry, prose, and essays from students and faculty.',
    pages: 240,
    contributors: 45
  },
  {
    id: 2,
    title: 'Technical Tales',
    type: 'Quarterly Journal',
    year: '2024',
    cover: 'bg-linear-to-br from-brand-orange to-brand-gold',
    description: 'Creative writing from the technical perspective - where engineering meets literature.',
    pages: 120,
    contributors: 28
  },
  {
    id: 3,
    title: 'The Canvas Collection',
    type: 'Digital Magazine',
    year: '2024',
    cover: 'bg-linear-to-br from-brand-cyan to-brand-teal',
    description: 'A digital-first publication exploring contemporary themes and experimental forms.',
    pages: 180,
    contributors: 35
  },
  {
    id: 4,
    title: 'Alumni Reflections',
    type: 'Special Edition',
    year: '2023',
    cover: 'bg-linear-to-br from-brand-gold to-brand-yellow',
    description: 'Stories and experiences from our distinguished alumni across the globe.',
    pages: 200,
    contributors: 52
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12
    }
  }
}

const publicationVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5
    }
  }
}

export default function PublicationsPage() {

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
          <h1 className="text-6xl md:text-7xl font-serif font-bold bg-linear-to-r from-brand-red via-brand-orange to-brand-gold bg-clip-text text-transparent mb-6">
            Publications
          </h1>
          <p className="text-xl text-brand-black/70 max-w-3xl mx-auto">
            Discover our collection of literary works, journals, and anthologies that showcase the creative brilliance of MMMUT.
          </p>
        </motion.div>

        {/* Publications Grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {publications.map((pub) => (
            <motion.div
              key={pub.id}
              variants={publicationVariants}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              <div className="bg-brand-white border-4 border-brand-gold hover:border-brand-red transition-all duration-300 overflow-hidden shadow-2xl">
                {/* Book Cover */}
                <div className={`${pub.cover} h-80 relative overflow-hidden flex items-center justify-center`}>
                  <motion.div
                    className="absolute inset-0 bg-black/20"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="relative z-10 text-center text-white p-8">
                    <div className="text-sm font-bold mb-4 uppercase tracking-wide">{pub.type}</div>
                    <h3 className="text-4xl font-serif font-bold mb-2">{pub.title}</h3>
                    <div className="text-xl font-semibold">{pub.year}</div>
                  </div>

                  {/* Floating Badge */}
                  <motion.div
                    className="absolute top-4 right-4 bg-white text-brand-black px-4 py-2 rounded-full font-bold text-sm shadow-lg"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, type: 'spring' }}
                  >
                    NEW
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-brand-black/70 mb-6 line-clamp-3">
                    {pub.description}
                  </p>

                  {/* Stats */}
                  <div className="flex gap-6 mb-6 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-brand-orange rounded-full"></div>
                      <span className="text-brand-black/60">{pub.pages} pages</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-brand-cyan rounded-full"></div>
                      <span className="text-brand-black/60">{pub.contributors} contributors</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4">
                    <motion.button
                      className="flex-1 bg-linear-to-r from-brand-red to-brand-red text-white font-bold py-3"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      READ ONLINE
                    </motion.button>
                    <motion.button
                      className="border-2 border-brand-gold text-brand-black font-bold py-3 px-6 hover:bg-brand-gold/10"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      DOWNLOAD
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Submission Guidelines */}
        <motion.div
          className="mt-20 grid md:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {/* Submit Work */}
          <div className="bg-linear-to-br from-brand-red/10 to-brand-orange/10 border-4 border-brand-red p-10">
            <h2 className="text-3xl font-serif font-bold bg-linear-to-r from-brand-red to-brand-orange bg-clip-text text-transparent mb-4">
              Submit Your Work
            </h2>
            <p className="text-brand-black/70 mb-6">
              We accept submissions year-round. Share your creativity with the MMMUT community.
            </p>
            <ul className="space-y-3 text-brand-black/70 mb-8">
              <li className="flex items-start gap-2">
                <span className="text-brand-red font-bold">•</span>
                <span>Poetry, prose, essays, and artwork</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-red font-bold">•</span>
                <span>Original, unpublished work only</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-red font-bold">•</span>
                <span>Follow submission guidelines</span>
              </li>
            </ul>
            <motion.button
              className="bg-linear-to-r from-brand-red to-brand-red text-white font-bold py-3 px-8 w-full"
              whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(196, 30, 58, 0.3)' }}
              whileTap={{ scale: 0.98 }}
            >
              SUBMIT NOW
            </motion.button>
          </div>

          {/* Guidelines */}
          <div className="bg-linear-to-br from-brand-gold/10 to-brand-yellow/10 border-4 border-brand-gold p-10">
            <h2 className="text-3xl font-serif font-bold bg-linear-to-r from-brand-orange to-brand-gold bg-clip-text text-transparent mb-4">
              Submission Guidelines
            </h2>
            <p className="text-brand-black/70 mb-6">
              Please review our guidelines before submitting your work.
            </p>
            <ul className="space-y-3 text-brand-black/70 mb-8">
              <li className="flex items-start gap-2">
                <span className="text-brand-gold font-bold">•</span>
                <span>Maximum 3,000 words for prose</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-gold font-bold">•</span>
                <span>Up to 5 poems per submission</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-gold font-bold">•</span>
                <span>High-resolution images for artwork</span>
              </li>
            </ul>
            <motion.button
              className="border-2 border-brand-gold text-brand-black font-bold py-3 px-8 w-full hover:bg-brand-gold/10"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              VIEW FULL GUIDELINES
            </motion.button>
          </div>
        </motion.div>

        {/* Archive CTA */}
        <motion.div
          className="mt-12 bg-brand-cyan/10 border-4 border-brand-cyan p-12 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <h2 className="text-4xl font-serif font-bold text-brand-cyan mb-4">
            Explore Our Archive
          </h2>
          <p className="text-xl text-brand-black/70 mb-8">
            Browse through decades of literary excellence and creativity
          </p>
          <motion.button
            className="bg-brand-cyan hover:bg-brand-teal text-white font-bold py-4 px-10 text-lg"
            whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0, 149, 182, 0.3)' }}
            whileTap={{ scale: 0.95 }}
          >
            VIEW ARCHIVE
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  )
}
