import { motion } from 'framer-motion'

export default function Works() {
  const works = [
    {
      id: 1,
      title: 'Poetry Collection',
      category: 'Literature',
      image: 'bg-brand-gold/20',
      description: 'Explore our curated collection of contemporary poetry',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      id: 2,
      title: 'Essays & Articles',
      category: 'Scholarship',
      image: 'bg-brand-teal/20',
      description: 'Scholarly discourse and critical analysis',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-brand-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      id: 3,
      title: 'Creative Prose',
      category: 'Fiction',
      image: 'bg-brand-red/20',
      description: 'Original short stories and narrative works',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      )
    },
    {
      id: 4,
      title: 'Visual Arts',
      category: 'Multimedia',
      image: 'bg-brand-gold/20',
      description: 'Artwork, photography, and digital creations',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    }
  ]

  return (
    <section id="works" className="bg-brand-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-4xl font-serif font-bold bg-linear-to-r from-brand-black to-brand-red bg-clip-text text-transparent mb-12 text-center">
          Our Works
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {works.map((work) => (
            <motion.div
              key={work.id}
              className="bg-brand-white border-2 border-brand-gold hover:shadow-xl hover:border-brand-red transition-all duration-300 overflow-hidden group cursor-pointer"
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className={`${work.image} h-40 flex items-center justify-center`}>
                <motion.div
                  className="text-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {work.icon}
                  <p className="text-brand-black/50 text-sm font-medium mt-2">{work.category}</p>
                </motion.div>
              </div>
              <div className="p-6">
                <h4 className="text-lg font-serif font-bold text-brand-black mb-2 group-hover:text-brand-red transition-colors">
                  {work.title}
                </h4>
                <p className="text-sm text-brand-black/60">{work.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <motion.button 
            className="group border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-white font-bold py-3 px-8 transition-all duration-200 flex items-center gap-2 mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            VIEW ALL WORKS
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </motion.svg>
          </motion.button>
        </div>
      </div>
    </section>
  )
}
