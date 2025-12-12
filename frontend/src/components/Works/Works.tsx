export default function Works() {
  const works = [
    {
      id: 1,
      title: 'Poetry Collection',
      category: 'Literature',
      image: 'bg-brand-gold/20',
      description: 'Explore our curated collection of contemporary poetry'
    },
    {
      id: 2,
      title: 'Essays & Articles',
      category: 'Scholarship',
      image: 'bg-brand-teal/20',
      description: 'Scholarly discourse and critical analysis'
    },
    {
      id: 3,
      title: 'Creative Prose',
      category: 'Fiction',
      image: 'bg-brand-red/20',
      description: 'Original short stories and narrative works'
    },
    {
      id: 4,
      title: 'Visual Arts',
      category: 'Multimedia',
      image: 'bg-brand-gold/20',
      description: 'Artwork, photography, and digital creations'
    }
  ]

  return (
    <section id="works" className="bg-brand-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-4xl font-serif font-bold bg-gradient-to-r from-brand-black to-brand-scarlet bg-clip-text text-transparent mb-12 text-center">
          Our Works
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {works.map((work) => (
            <div
              key={work.id}
              className="bg-brand-white border-2 border-brand-gold hover:shadow-xl hover:border-brand-scarlet transition-all duration-300 overflow-hidden group cursor-pointer"
            >
              <div className={`${work.image} h-40 flex items-center justify-center`}>
                <div className="text-center">
                  <p className="text-brand-black/50 text-sm font-medium">{work.category}</p>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-lg font-serif font-bold text-brand-black mb-2 group-hover:text-brand-scarlet transition-colors">
                  {work.title}
                </h4>
                <p className="text-sm text-brand-black/60">{work.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="border-2 border-brand-scarlet text-brand-scarlet hover:bg-brand-scarlet hover:text-white font-bold py-3 px-8 transition-all duration-200">
            VIEW ALL WORKS
          </button>
        </div>
      </div>
    </section>
  )
}
