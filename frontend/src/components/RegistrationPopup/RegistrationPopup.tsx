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
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Simple Premium Modal */}
          <motion.div
            className="relative w-full max-w-md bg-white/90 backdrop-blur-md shadow-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Gold Border */}
            <div className="h-1 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 relative z-10" />
            
            {/* Rising Sun Image */}
            <div className="relative h-40 overflow-hidden z-10">
              <img 
                src="https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?q=80&w=1000&auto=format&fit=crop" 
                alt="Rising Sun"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/90" />
            </div>
            
            {/* Content with Yellowish Dot Pattern Background */}
            <div className="p-10 pt-6 relative z-10">
              {/* Dot Pattern Background - Only for content area */}
              <div className="absolute inset-0 bg-white bg-[radial-gradient(#e5e7eb_2px,transparent_2px)] bg-size-[20px_20px] pointer-events-none" />
              <div className="absolute inset-0 bg-linear-to-b from-orange-50/40 via-amber-50/30 to-white/50 pointer-events-none" />
              
              {/* Content over pattern */}
              <div className="relative z-10">
              
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-[-156px] right-4 text-white hover:text-stone-100 transition-colors z-10 bg-black/20 backdrop-blur-sm rounded-full p-1.5"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Title */}
              <div className="text-center mb-6">
                <h2 className="text-3xl font-serif font-bold text-stone-900 mb-2">
                  Arunoday '26
                </h2>
                
                {/* Subtitle */}
                <p className="text-stone-600 text-sm uppercase tracking-widest font-medium">
                  Literary Extravaganza
                </p>
              </div>
              
              {/* Divider */}
              <div className="h-px bg-stone-200 my-6" />
              
              {/* Description */}
              <div className="text-center mb-8">
                <p className="text-stone-700 text-base leading-relaxed mb-3">
                  An exclusive celebration of literature and culture at MMMUT
                </p>
                <p className="text-amber-700 text-sm font-medium">
                  3 Days of Literary Excellence • Rising Soon
                </p>
              </div>
              
              {/* Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleLearnMoreClick}
                  className="w-full py-3 px-6 bg-stone-900 text-white text-sm font-semibold uppercase tracking-wider hover:bg-stone-800 transition-colors"
                >
                  Learn More
                </button>
                
                <button
                  onClick={onClose}
                  className="w-full py-2 text-stone-500 text-sm hover:text-stone-700 transition-colors"
                >
                  Not Now
                </button>
              </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RegistrationPopup;
