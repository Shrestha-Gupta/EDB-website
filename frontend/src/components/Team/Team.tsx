import { motion } from 'framer-motion'

export default function Team() {
  const teamMembers = [
    {
      id: 1,
      name: 'Editor-in-Chief',
      role: 'Overall Vision & Direction',
      color: 'border-brand-red',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    },
    {
      id: 2,
      name: 'Managing Editor',
      role: 'Editorial Operations',
      color: 'border-brand-gold',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      )
    },
    {
      id: 3,
      name: 'Content Curator',
      role: 'Content Selection & Review',
      color: 'border-brand-teal',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-brand-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )
    },
    {
      id: 4,
      name: 'Design Lead',
      role: 'Visual & Layout Design',
      color: 'border-brand-red',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      )
    },
    {
      id: 5,
      name: 'Associate Editor',
      role: 'Manuscript Review',
      color: 'border-brand-gold',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      id: 6,
      name: 'Contributors',
      role: 'Creative Submissions',
      color: 'border-brand-teal',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-brand-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    }
  ]

  return (
    <section id="team" className="bg-brand-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-4xl font-serif font-bold bg-linear-to-r from-brand-black to-brand-scarlet bg-clip-text text-transparent mb-12 text-center">
          Our Team
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              className={`border-l-4 ${member.color} bg-brand-white/50 p-8 hover:shadow-lg transition-shadow duration-300`}
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="mb-4"
              >
                {member.icon}
              </motion.div>
              <h4 className="text-xl font-serif font-bold text-brand-black mb-2">
                {member.name}
              </h4>
              <p className="text-brand-black/60 font-medium">{member.role}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-16 bg-brand-orange/5 border-4 border-brand-gold p-8 text-center shadow-lg"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 text-brand-scarlet mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </motion.svg>
          <h4 className="text-2xl font-serif font-bold bg-linear-to-r from-brand-red to-brand-orange bg-clip-text text-transparent mb-4">
            Join Our Team
          </h4>
          <p className="text-brand-black/70 mb-6 max-w-2xl mx-auto">
            Are you passionate about literature, design, or editorial work? We're always looking for dedicated individuals to join The Editorial Board.
          </p>
          <motion.button 
            className="group bg-linear-to-r from-brand-red to-brand-scarlet hover:shadow-lg text-white font-bold py-2 px-6 transition-all duration-200 flex items-center gap-2 mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            LEARN MORE
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
        </motion.div>
      </div>
    </section>
  )
}
