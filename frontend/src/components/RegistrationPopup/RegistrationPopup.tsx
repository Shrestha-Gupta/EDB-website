import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface RegistrationPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegistrationPopup = ({ isOpen, onClose }: RegistrationPopupProps) => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    onClose();
    navigate("/arunoday-live");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl w-full max-w-md 2xl:max-w-lg overflow-hidden border border-orange-500/30 shadow-2xl shadow-orange-500/20"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative p-6 pb-4">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="text-center">
                <motion.div
                  className="inline-block mb-4"
                  animate={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                >
                  <span className="text-6xl">🎉</span>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-orange-400 via-amber-400 to-orange-500 mb-2">
                    Arunoday'26
                  </h2>
                  <p className="text-gray-300 text-lg font-medium">
                    Registrations Are Now Open!
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 pb-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <p className="text-gray-400 mb-2">
                  The Annual Cultural Festival of MMMUT
                </p>
                <div className="flex justify-center gap-4 my-4">
                  <div className="text-center">
                    <span className="text-2xl">🎭</span>
                    <p className="text-xs text-gray-500 mt-1">Events</p>
                  </div>
                  <div className="text-center">
                    <span className="text-2xl">🎵</span>
                    <p className="text-xs text-gray-500 mt-1">Music</p>
                  </div>
                  <div className="text-center">
                    <span className="text-2xl">💃</span>
                    <p className="text-xs text-gray-500 mt-1">Dance</p>
                  </div>
                  <div className="text-center">
                    <span className="text-2xl">🎨</span>
                    <p className="text-xs text-gray-500 mt-1">Art</p>
                  </div>
                </div>
                <p className="text-amber-400/80 text-sm font-medium">
                  ✨ Join us for 3 days of unforgettable experiences!
                </p>
              </motion.div>
            </div>

            {/* CTA Button */}
            <div className="p-6 pt-2">
              <motion.button
                onClick={handleRegisterClick}
                className="w-full py-4 bg-linear-to-r from-orange-500 via-amber-500 to-orange-600 text-white text-lg font-bold rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center justify-center gap-2">
                  Register Now
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </motion.button>
              
              <button
                onClick={onClose}
                className="w-full mt-3 py-2 text-gray-400 hover:text-gray-300 text-sm transition-colors"
              >
                Maybe Later
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RegistrationPopup;
