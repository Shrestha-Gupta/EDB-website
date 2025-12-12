export default function Team() {
  const teamMembers = [
    {
      id: 1,
      name: 'Editor-in-Chief',
      role: 'Overall Vision & Direction',
      color: 'border-brand-red'
    },
    {
      id: 2,
      name: 'Managing Editor',
      role: 'Editorial Operations',
      color: 'border-brand-gold'
    },
    {
      id: 3,
      name: 'Content Curator',
      role: 'Content Selection & Review',
      color: 'border-brand-teal'
    },
    {
      id: 4,
      name: 'Design Lead',
      role: 'Visual & Layout Design',
      color: 'border-brand-red'
    },
    {
      id: 5,
      name: 'Associate Editor',
      role: 'Manuscript Review',
      color: 'border-brand-gold'
    },
    {
      id: 6,
      name: 'Contributors',
      role: 'Creative Submissions',
      color: 'border-brand-teal'
    }
  ]

  return (
    <section id="team" className="bg-brand-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-4xl font-serif font-bold bg-gradient-to-r from-brand-black to-brand-scarlet bg-clip-text text-transparent mb-12 text-center">
          Our Team
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className={`border-l-4 ${member.color} bg-brand-white/50 p-8 hover:shadow-lg transition-shadow duration-300`}
            >
              <h4 className="text-xl font-serif font-bold text-brand-black mb-2">
                {member.name}
              </h4>
              <p className="text-brand-black/60 font-medium">{member.role}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-brand-orange/5 border-4 border-brand-gold p-8 text-center shadow-lg">
          <h4 className="text-2xl font-serif font-bold bg-gradient-to-r from-brand-red to-brand-orange bg-clip-text text-transparent mb-4">
            Join Our Team
          </h4>
          <p className="text-brand-black/70 mb-6 max-w-2xl mx-auto">
            Are you passionate about literature, design, or editorial work? We're always looking for dedicated individuals to join The Editorial Board.
          </p>
          <button className="bg-gradient-to-r from-brand-red to-brand-scarlet hover:shadow-lg text-white font-bold py-2 px-6 transition-all duration-200">
            LEARN MORE
          </button>
        </div>
      </div>
    </section>
  )
}
