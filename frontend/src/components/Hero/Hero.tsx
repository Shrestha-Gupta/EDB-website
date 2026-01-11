import { Link } from 'react-router-dom';
import { useIsMobile } from '../../hooks/useDevicePerformance';

interface HeroProps {
  onOpenRegistration?: () => void;
}

export default function Hero({ onOpenRegistration }: HeroProps) {
  const isMobile = useIsMobile();
  
  return (
    <section className="bg-white min-h-screen flex items-center justify-center px-4 md:px-6 lg:px-8 2xl:px-12 relative overflow-hidden -mt-18 md:pt-0">
      {/* 1. Background: Pattern + Gradient Tint */}
      <div className="absolute inset-0 z-0 pointer-events-none -top-20">
        {/* INCREASED DOT SIZE: Changed 1px to 3px and spacing to 30px */}
        <div className="absolute inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_3px,transparent_3px)] bg-size-[30px_30px]"></div>

        {/* Gradient Overlay to fade the pattern and add the Orange Tint */}
        <div className="absolute inset-0 bg-linear-to-b from-orange-50/60 via-white/90 to-white"></div>
      </div>

      {/* 2. Background Logo with Pop-out Animation - simplified on mobile */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0">
        <img
          src="https://res.cloudinary.com/dml0jlwlv/image/upload/v1765559411/The_Editorial_Board_Logo..1.0_cgrovj.png"
          alt="Background Logo"
          loading="eager"
          className="w-75 h-75 md:w-150 md:h-150 2xl:w-200 2xl:h-200 object-contain will-change-transform"
          style={{
            opacity: 0.08,
            animation: isMobile ? "none" : "popOut 2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          }}
        />
      </div>

      {/* 3. Main Content */}
      <div className="text-center max-w-5xl 2xl:max-w-6xl 3xl:max-w-7xl mx-auto relative z-10 md:pt-0 flex flex-col items-center">
        {/* Registrations Open Button */}
        <button
          onClick={onOpenRegistration}
          className="mb-4 px-6 py-2.5 bg-linear-to-r from-orange-500 via-amber-500 to-orange-600 text-white font-semibold rounded-full shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer animate-pulse hover:animate-none"
          style={{
            animation: isMobile
              ? "fadeIn 0.5s ease-out forwards, pulse 2s ease-in-out infinite"
              : "fadeInUp 1.0s ease-out 0.3s both",
          }}
        >
          <span className="flex items-center gap-2">
            <span className="text-lg">🎉</span>
            <span>Registrations Open for Arunoday'26!</span>
            <span className="text-lg">🎉</span>
          </span>
        </button>

        {/* Sanskrit Text - disable blinking cursor on mobile */}
        <div className="inline-block mb-6 relative">
          <p
            className="text-orange-600 text-lg md:text-2xl font-serif font-semibold overflow-hidden whitespace-nowrap pr-1"
            style={{
              borderRight: isMobile ? 'none' : '4px solid #fb923c',
              animation: isMobile 
                ? "none" 
                : "typeWriter 3s steps(30) 0.5s both, blinkCursor 0.75s step-end infinite",
            }}
          >
            योगः कर्मसु कौशलम्
          </p>
        </div>

        {/* Main Heading 1 */}
        <h1
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl 2xl:text-[10rem] 3xl:text-[11rem] font-serif font-bold bg-linear-to-r from-gray-900 via-gray-800 to-orange-900 bg-clip-text text-transparent mb-2 tracking-tight leading-tight will-change-transform"
          style={{
            animation: isMobile
              ? "fadeIn 0.5s ease-out forwards"
              : "slideInLeft 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both",
          }}
        >
          Where Words
        </h1>

        {/* Main Heading 2 */}
        <h1
          className="text-6xl sm:text-7xl md:text-8xl lg:text-8xl 2xl:text-9xl 3xl:text-[10rem] font-serif font-bold bg-linear-to-r from-orange-600 via-amber-500 to-orange-400 bg-clip-text text-transparent mb-8 italic pr-2 leading-tight will-change-transform"
          style={{
            animation: isMobile
              ? "fadeIn 0.5s ease-out 0.2s forwards"
              : "slideInRight 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.7s both",
          }}
        >
          Find Their Voice
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg md:text-2xl 2xl:text-3xl text-gray-600 mb-12 max-w-2xl 2xl:max-w-3xl mx-auto leading-relaxed font-light"
          style={{
            animation: isMobile
              ? "fadeIn 0.5s ease-out 0.3s forwards"
              : "fadeInUp 1.0s ease-out 1.2s both",
          }}
        >
          A literary journal celebrating creativity, culture, and scholarly
          discourse at Madan Mohan Malaviya University of Technology.
        </p>

        {/* Optional CTA Button */}
        <Link to="/publications">
          <button
            className="bg-orange-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-orange-700 hover:shadow-orange-500/30 transition-all duration-300 transform active:scale-95 md:hover:-translate-y-1 cursor-pointer"
            style={{
              animation: isMobile
                ? "fadeIn 0.5s ease-out 0.4s forwards"
                : "fadeInUp 1.0s ease-out 1.4s both",
            }}
          >
            Read Latest Issue
          </button>
        </Link>
      </div>

      {/* 4. CSS Keyframes - optimized for performance */}
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
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>
    </section>
  );
}
