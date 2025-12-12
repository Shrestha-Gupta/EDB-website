export default function About() {
  return (
    <section id="about" className="bg-brand-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Logo Placeholder */}
          <div className="flex justify-center">
            <div className="w-64 h-64 bg-sun-gradient rounded-full flex items-center justify-center shadow-2xl border-8 border-white">
              <div className="text-center text-white">
                <p className="text-2xl font-serif font-bold">MMMUT</p>
                <p className="text-sm mt-2">Editorial Board</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <h3 className="text-4xl font-serif font-bold bg-gradient-to-r from-brand-black to-brand-scarlet bg-clip-text text-transparent mb-6">
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
              <div className="flex gap-4">
                <div className="w-3 h-3 bg-brand-scarlet rounded-full mt-2 flex-shrink-0 shadow-md"></div>
                <p className="text-brand-black/80">Curated literary excellence</p>
              </div>
              <div className="flex gap-4">
                <div className="w-3 h-3 bg-brand-cyan rounded-full mt-2 flex-shrink-0 shadow-md"></div>
                <p className="text-brand-black/80">Platform for emerging voices</p>
              </div>
              <div className="flex gap-4">
                <div className="w-3 h-3 bg-brand-gold rounded-full mt-2 flex-shrink-0 shadow-md"></div>
                <p className="text-brand-black/80">Cultural and scholarly discourse</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
