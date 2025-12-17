export default function Hero() {
  return (
    <section className="bg-white min-h-screen flex items-center justify-center px-6 relative overflow-hidden -mt-20 pt-20">
      {/* 1. Background: Pattern + Gradient Tint */}
      <div className="absolute inset-0 z-0 pointer-events-none -top-20">
        {/* INCREASED DOT SIZE: Changed 1px to 3px and spacing to 30px */}
        <div className="absolute inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_3px,transparent_3px)] [background-size:30px_30px]"></div>

        {/* Gradient Overlay to fade the pattern and add the Orange Tint */}
        <div className="absolute inset-0 bg-gradient-to-b from-orange-50/60 via-white/90 to-white"></div>
      </div>

      {/* 2. Background Logo with Pop-out Animation */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0">
        <img
          src="https://res.cloudinary.com/dml0jlwlv/image/upload/v1765559411/The_Editorial_Board_Logo..1.0_cgrovj.png"
          alt="Background Logo"
          className="w-[300px] h-[300px] md:w-[600px] md:h-[600px] object-contain opacity-0"
          style={{
            animation: "popOut 2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          }}
        />
      </div>

      {/* 3. Main Content */}
      <div className="text-center max-w-5xl mx-auto relative z-10 pt-20 md:pt-0">
        {/* Sanskrit Text */}
        <div className="inline-block mb-6 relative">
          <p
            className="text-orange-600 text-lg md:text-2xl font-serif font-semibold overflow-hidden whitespace-nowrap border-r-4 border-orange-400 pr-1"
            style={{
              animation:
                "typeWriter 3s steps(30) 0.5s both, blinkCursor 0.75s step-end infinite",
            }}
          >
            योगः कर्मसु कौशलम्
          </p>
        </div>

        {/* Main Heading 1 */}
        <h1
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-orange-900 bg-clip-text text-transparent mb-2 tracking-tight leading-tight"
          style={{
            animation:
              "slideInLeft 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both",
          }}
        >
          Where Words
        </h1>

        {/* Main Heading 2 */}
        <h1
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-bold bg-gradient-to-r from-orange-600 via-amber-500 to-orange-400 bg-clip-text text-transparent mb-8 italic pr-2 leading-tight"
          style={{
            animation:
              "slideInRight 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.7s both",
          }}
        >
          Find Their Voice
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed font-light"
          style={{
            animation: "fadeInUp 1.0s ease-out 1.2s both",
          }}
        >
          A literary journal celebrating creativity, culture, and scholarly
          discourse at Madan Mohan Malaviya University of Technology.
        </p>

        {/* Optional CTA Button */}
        <button
          className="bg-orange-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-orange-700 hover:shadow-orange-500/30 transition-all duration-300 transform hover:-translate-y-1"
          style={{
            animation: "fadeInUp 1.0s ease-out 1.4s both",
          }}
        >
          Read Latest Issue
        </button>
      </div>

      {/* 4. CSS Keyframes */}
      <style>{`
        @keyframes popOut {
          0% { transform: scale(0.5); opacity: 0; }
          100% { transform: scale(1); opacity: 0.08; }
        }
        @keyframes typeWriter {
          from { width: 0; }
          to { width: 100%; }
        }
        @keyframes blinkCursor {
          from, to { border-color: transparent; }
          50% { border-color: #f97316; }
        }
        @keyframes slideInLeft {
          0% { opacity: 0; transform: translateX(-50px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          0% { opacity: 0; transform: translateX(50px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
