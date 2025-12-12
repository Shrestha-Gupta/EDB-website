export default function Hero() {
  return (
    <section className="bg-brand-white min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Logo with Low Opacity */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img
          src="https://res.cloudinary.com/dml0jlwlv/image/upload/v1765559411/The_Editorial_Board_Logo..1.0_cgrovj.png"
          alt="Background Logo"
          className="w-150 h-150 object-contain opacity-15"
        />
      </div>

      <div className="text-center max-w-4xl mx-auto relative z-10">
        {/* Sanskrit Text */}
        <p className="text-brand-teal text-lg mb-8 font-serif font-semibold">
          योगः कर्मसु कौशलम्
        </p>

        {/* Main Heading */}
        <h2 className="text-5xl md:text-7xl font-serif font-bold bg-linear-to-r from-brand-black to-brand-red bg-clip-text text-transparent mb-4">
          Where Words
        </h2>
        <h2 className="text-5xl md:text-6xl font-serif font-bold bg-linear-to-r from-brand-red via-brand-orange to-brand-gold bg-clip-text text-transparent mb-8 italic">
          Find Their Voice
        </h2>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-brand-black/70 mb-12 max-w-2xl mx-auto leading-relaxed">
          A literary journal celebrating creativity, culture, and scholarly discourse
          at Madan Mohan Malaviya University of Technology.
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-6 justify-center flex-wrap">
          <button className="bg-linear-to-r from-brand-red to-brand-red hover:shadow-lg text-white font-bold py-3 px-8 transition-all duration-200 flex items-center gap-2 group">
            EXPLORE OUR WORKS
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
          <button className="border-2 border-brand-black text-brand-black hover:border-brand-red hover:text-brand-red hover:bg-brand-orange/10 font-bold py-3 px-8 transition-all duration-200 flex items-center gap-2 group">
            <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            LEARN MORE
          </button>
        </div>
      </div>
    </section>
  )
}
