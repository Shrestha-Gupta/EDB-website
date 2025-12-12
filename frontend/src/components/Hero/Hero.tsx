export default function Hero() {
  return (
    <section className="bg-brand-white min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Logo with Low Opacity */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img
          src="https://res.cloudinary.com/dml0jlwlv/image/upload/v1765559411/The_Editorial_Board_Logo..1.0_cgrovj.png"
          alt="Background Logo"
          className="w-[600px] h-[600px] object-contain opacity-15"
        />
      </div>

      <div className="text-center max-w-4xl mx-auto relative z-10">
        {/* Sanskrit Text */}
        <p className="text-brand-teal text-lg mb-8 font-serif italic">
          विद्या ध्वनि विभ्रमम्
        </p>

        {/* Main Heading */}
        <h2 className="text-5xl md:text-7xl font-serif font-bold bg-gradient-to-r from-brand-black to-brand-scarlet bg-clip-text text-transparent mb-4">
          Where Words
        </h2>
        <h2 className="text-5xl md:text-6xl font-serif font-bold bg-gradient-to-r from-brand-scarlet via-brand-orange to-brand-gold bg-clip-text text-transparent mb-8 italic">
          Find Their Voice
        </h2>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-brand-black/70 mb-12 max-w-2xl mx-auto leading-relaxed">
          A literary journal celebrating creativity, culture, and scholarly discourse
          at Madan Mohan Malaviya University of Technology.
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-6 justify-center flex-wrap">
          <button className="bg-gradient-to-r from-brand-red to-brand-scarlet hover:shadow-lg text-white font-bold py-3 px-8 transition-all duration-200">
            EXPLORE OUR WORKS
          </button>
          <button className="border-2 border-brand-black text-brand-black hover:border-brand-scarlet hover:text-brand-scarlet hover:bg-brand-orange/10 font-bold py-3 px-8 transition-all duration-200">
            LEARN MORE
          </button>
        </div>
      </div>
    </section>
  )
}
