import { motion } from 'framer-motion'

export default function Team() {
  const finalYearTeam = [
    {
      id: 1,
      name: 'John Doe',
      branch: 'Computer Science & Engineering',
      image: 'https://via.placeholder.com/200',
      skills: ['Content', 'Design'],
      linkedin: '#',
      github: '#',
      website: '#'
    },
    {
      id: 2,
      name: 'Jane Smith',
      branch: 'Computer Science & Engineering',
      image: 'https://via.placeholder.com/200',
      skills: ['Editorial', 'Writing'],
      linkedin: '#',
      github: '#',
      website: '#'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      branch: 'Computer Science & Engineering',
      image: 'https://via.placeholder.com/200',
      skills: ['Technical', 'Management'],
      linkedin: '#',
      github: '#',
      website: '#'
    }
  ]

  const preFinalYearTeam = [
    {
      id: 4,
      name: 'Sarah Wilson',
      branch: 'Computer Science & Engineering',
      image: 'https://via.placeholder.com/200',
      skills: ['Design', 'Creative'],
      linkedin: '#',
      github: '#',
      website: '#'
    },
    {
      id: 5,
      name: 'David Brown',
      branch: 'Computer Science & Engineering',
      image: 'https://via.placeholder.com/200',
      skills: ['Research', 'Analytics'],
      linkedin: '#',
      github: '#',
      website: '#'
    },
    {
      id: 6,
      name: 'Emily Davis',
      branch: 'Computer Science & Engineering',
      image: 'https://via.placeholder.com/200',
      skills: ['Content', 'Editorial'],
      linkedin: '#',
      github: '#',
      website: '#'
    }
  ]

  const sophomoreTeam = [
    {
      id: 7,
      name: 'Alex Martinez',
      branch: 'Computer Science & Engineering',
      image: 'https://via.placeholder.com/200',
      skills: ['Writing', 'Research'],
      linkedin: '#',
      github: '#',
      website: '#'
    },
    {
      id: 8,
      name: 'Lisa Anderson',
      branch: 'Computer Science & Engineering',
      image: 'https://via.placeholder.com/200',
      skills: ['Design', 'Development'],
      linkedin: '#',
      github: '#',
      website: '#'
    },
    {
      id: 9,
      name: 'Chris Taylor',
      branch: 'Computer Science & Engineering',
      image: 'https://via.placeholder.com/200',
      skills: ['Content', 'Social Media'],
      linkedin: '#',
      github: '#',
      website: '#'
    }
  ]

  const renderTeamSection = (title: string, members: typeof finalYearTeam, accentColor: string) => (
    <div className="mb-20">
      <h4 className={`text-3xl font-serif font-bold bg-linear-to-r ${accentColor} bg-clip-text text-transparent mb-8 text-center`}>
        {title}
      </h4>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {members.map((member) => (
          <motion.div
            key={member.id}
            className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="p-8">
              {/* Profile Image */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-brand-gold"
                  />
                </div>
              </div>

              {/* Name */}
              <h5 className="text-xl font-bold text-brand-black text-center mb-2">
                {member.name}
              </h5>

              {/* Role Badge */}
              <div className="flex justify-center mb-3">
                <span className="bg-brand-red/10 text-brand-red text-sm font-semibold px-3 py-1 rounded-full">
                  executive
                </span>
              </div>

              {/* Branch */}
              <p className="text-brand-black/60 text-sm text-center mb-4">
                {member.branch}
              </p>

              {/* Skills Tags */}
              {member.skills && member.skills.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {member.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-brand-orange/10 text-brand-orange text-xs font-medium px-3 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}

              {/* Social Icons */}
              <div className="flex justify-center gap-4 mb-4 pt-4 border-t border-gray-100">
                <a href={member.linkedin} className="text-brand-black/40 hover:text-brand-cyan transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a href={member.github} className="text-brand-black/40 hover:text-brand-black transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href={member.website} className="text-brand-black/40 hover:text-brand-gold transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                  </svg>
                </a>
              </div>

              {/* View Profile Button */}
              <motion.button
                className="w-full bg-brand-red hover:bg-brand-red text-white font-semibold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View Profile
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                </svg>
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )

  return (
    <section id="team" className="bg-brand-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-4xl font-serif font-bold bg-linear-to-r from-brand-black to-brand-red bg-clip-text text-transparent mb-16 text-center">
          Our Team
        </h3>

        {/* Final Year Team */}
        {renderTeamSection('Final Year Team', finalYearTeam, 'from-brand-red to-brand-red')}

        {/* Pre-Final Year Team */}
        {renderTeamSection('Pre-Final Year Team', preFinalYearTeam, 'from-brand-orange to-brand-gold')}

        {/* Sophomore Team */}
        {renderTeamSection('Sophomore Team', sophomoreTeam, 'from-brand-cyan to-brand-teal')}

        <motion.div 
          className="mt-16 bg-brand-orange/5 border-4 border-brand-gold p-8 text-center shadow-lg"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 text-brand-red mx-auto mb-4"
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
            className="group bg-linear-to-r from-brand-red to-brand-red hover:shadow-lg text-white font-bold py-2 px-6 transition-all duration-200 flex items-center gap-2 mx-auto"
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
