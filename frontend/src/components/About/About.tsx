import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id="about" className="bg-brand-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Logo */}
          

          {/* Content */}
          <div>
            <h3 className="text-4xl font-serif font-bold bg-linear-to-r from-brand-black to-brand-red bg-clip-text text-transparent mb-6">
              About Us
            </h3>
            <p className="text-lg text-brand-black/70 mb-6 leading-relaxed">
              The Editorial Board is a prestigious literary journal at Madan Mohan Malaviya University of Technology, dedicated to fostering creativity, scholarly discourse, and cultural expression.
            </p>
            <p className="text-lg text-brand-black/70 mb-6 leading-relaxed">
              We celebrate diverse voices, innovative ideas, and literary excellence from students, faculty, and contributors around the globe.
            </p>

            {/* Key Points */}
            <div className="space-y-4">
              <motion.div 
                className="flex gap-4 items-center"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-brand-red shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </motion.svg>
                <p className="text-brand-black/80">Curated literary excellence</p>
              </motion.div>
              <motion.div 
                className="flex gap-4 items-center"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-brand-cyan shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </motion.svg>
                <p className="text-brand-black/80">Platform for emerging voices</p>
              </motion.div>
              <motion.div 
                className="flex gap-4 items-center"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-brand-gold shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </motion.svg>
                <p className="text-brand-black/80">Cultural and scholarly discourse</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
