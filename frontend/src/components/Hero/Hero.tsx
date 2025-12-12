export default function Hero() {
  return (
    <section className="bg-brand-white min-h-screen flex items-start md:items-center justify-center px-6 pt-24 md:pt-0 relative overflow-hidden">
      {/* Background Logo with Low Opacity and Pop-out Animation */}
      <div className="absolute top-32 left-1/2 -translate-x-1/2 pointer-events-none">
        <img
          src="https://res.cloudinary.com/dml0jlwlv/image/upload/v1765559411/The_Editorial_Board_Logo..1.0_cgrovj.png"
          alt="Background Logo"
          className="w-150 h-150 object-contain opacity-15"
          style={{
            animation: 'popOutTop 2.5s ease-out forwards'
          }}
        />
      </div>

      <div className="text-center max-w-4xl mx-auto relative z-10">
        {/* Sanskrit Text with Writing Animation */}
        <p className="text-brand-teal text-lg mb-8 font-serif font-semibold overflow-hidden whitespace-nowrap inline-block"
           style={{
             animation: 'typeWriter 3.5s steps(19) 0.5s both, fadeInOpacity 0.8s ease-out 0.5s both'
           }}>
          योगः कर्मसु कौशलम्
        </p>

        {/* Main Heading with Slide-in Animation */}
        <h2 className="text-5xl md:text-7xl font-serif font-bold bg-linear-to-r from-brand-black to-brand-red bg-clip-text text-transparent mb-4 animate-[slideInLeft_1s_ease-out_0.5s_both]"
            style={{
              animation: 'slideInLeft 1.8s ease-out 0.8s both'
            }}>
          Where Words
        </h2>
        <h2 className="text-5xl md:text-6xl font-serif font-bold bg-linear-to-r from-brand-red via-brand-orange to-brand-gold bg-clip-text text-transparent mb-8 italic animate-[slideInRight_1s_ease-out_0.7s_both]"
            style={{
              animation: 'slideInRight 1.8s ease-out 1.2s both'
            }}>
          Find Their Voice
        </h2>

        {/* Subtitle with Fade-in Animation */}
        <p className="text-lg md:text-xl text-brand-black/70 mb-12 max-w-2xl mx-auto leading-relaxed animate-[fadeIn_1s_ease-out_0.9s_both]"
           style={{
             animation: 'fadeIn 1.5s ease-out 1.6s both'
           }}>
          A literary journal celebrating creativity, culture, and scholarly discourse
          at Madan Mohan Malaviya University of Technology.
        </p>
      </div>

      {/* CSS Keyframes */}
      <style>{`
        @keyframes popOutTop {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.3);
            opacity: 0.2;
          }
          100% {
            transform: scale(1);
            opacity: 0.15;
          }
        }

        @keyframes typeWriter {
          0% {
            width: 0;
          }
          100% {
            width: 100%;
          }
        }

        @keyframes fadeInOpacity {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes fadeInDown {
          0% {
            opacity: 0;
            transform: translateY(-30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          0% {
            opacity: 0;
            transform: translateX(-100px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          0% {
            opacity: 0;
            transform: translateX(100px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  )
}
