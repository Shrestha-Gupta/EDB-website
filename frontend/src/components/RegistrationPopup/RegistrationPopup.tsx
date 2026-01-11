import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface RegistrationPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegistrationPopup = ({ isOpen, onClose }: RegistrationPopupProps) => {
  const navigate = useNavigate();

  const handleLearnMoreClick = () => {
    onClose();
    navigate("/arunoday-live");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Glassmorphism Modal */}
          <motion.div
            className="relative w-full max-w-md 2xl:max-w-lg overflow-hidden rounded-3xl"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glassmorphism Background - More Transparent */}
            <div className="absolute inset-0 bg-white/5 backdrop-blur-xl" />
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-rose-500/10" />
            <div className="absolute inset-0 border border-white/15 rounded-3xl" />
            
            {/* Decorative Glow Effects */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-400/30 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-orange-400/30 rounded-full blur-3xl" />

            {/* Content Container */}
            <div className="relative z-10">
              {/* Header */}
              <div className="relative p-8 pb-4">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full backdrop-blur-sm"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                <div className="text-center">
                  {/* Animated Icon */}
                  <motion.div
                    className="inline-block mb-4"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  >
                    <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-amber-400/30 to-orange-500/30 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                      <span className="text-5xl">🌅</span>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-3 drop-shadow-lg">
                      Arunoday '26<span className="text-amber-400">.</span>
                    </h2>
                    
                    {/* Coming Soon Badge */}
                    <motion.div
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full"
                      animate={{ scale: [1, 1.03, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
                      </span>
                      <span className="text-amber-300 font-semibold text-sm tracking-wide uppercase">
                        Rising Soon
                      </span>
                    </motion.div>
                  </motion.div>
                </div>
              </div>

              {/* Content */}
              <div className="px-8 pb-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-center"
                >
                  <p className="text-white/70 text-lg mb-6 font-light">
                    The Literary Extravaganza of MMMUT is about to begin!
                  </p>
                  
                  <p className="text-amber-300/90 text-sm font-medium">
                    ✨ 3 Days of Unforgettable Experiences Await!
                  </p>
                </motion.div>
              </div>

              {/* CTA Button */}
              <div className="p-8 pt-4">
                <motion.button
                  onClick={handleLearnMoreClick}
                  className="w-full py-4 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 text-white text-lg font-bold rounded-2xl shadow-lg shadow-amber-400/30 hover:shadow-amber-400/50 transition-all duration-300 backdrop-blur-sm"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center justify-center gap-2">
                    Learn More
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </motion.button>
                
                <button
                  onClick={onClose}
                  className="w-full mt-4 py-2 text-white/50 hover:text-white/80 text-sm transition-colors font-medium"
                >
                  Remind Me Later
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RegistrationPopup;
