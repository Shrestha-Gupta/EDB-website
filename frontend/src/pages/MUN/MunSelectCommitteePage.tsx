import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ParticlesBackground from "../../components/ParticlesBackground/ParticlesBackground";

// MUN Committee Selection is now CLOSED
const MunSelectCommitteePage = () => {
  return (
    <div className="bg-stone-50 min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 2xl:px-12 relative overflow-x-hidden font-sans text-stone-800">
      <ParticlesBackground />

      <div className="absolute top-0 right-0 w-125 h-125 bg-amber-200/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-125 h-125 bg-orange-200/20 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        className="max-w-xl 2xl:max-w-2xl mx-auto relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <Link to="/mun" className="text-amber-600 hover:text-amber-700 text-sm font-medium">
            ← Back to MUN
          </Link>
        </div>

        <motion.div
          className="bg-white rounded-2xl p-8 border border-stone-200 shadow-xl text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* Closed Banner */}
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4">
              <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-2">
              Registrations Closed<span className="text-red-600">.</span>
            </h1>
            <p className="text-stone-600 mt-4 max-w-md mx-auto">
              Thank you for your interest in MMMUT Model United Nations 2026. 
              Unfortunately, registrations and committee selection for this event have now closed.
            </p>
          </div>

          {/* Info Box */}
          <div className="bg-amber-50 rounded-xl p-6 mb-6 border border-amber-200 text-left">
            <h3 className="font-semibold text-amber-800 mb-2">📅 What's Next?</h3>
            <p className="text-sm text-amber-700">
              If you have already registered, please log in to access your dashboard and view your allotment details.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/mun/login"
              className="px-8 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              Login to Dashboard
            </Link>
            <Link
              to="/mun"
              className="px-8 py-3 bg-stone-200 text-stone-700 font-bold rounded-lg hover:bg-stone-300 transition-all"
            >
              Back to MUN Page
            </Link>
          </div>

          {/* Contact Info */}
          <div className="mt-8 pt-6 border-t border-stone-200">
            <p className="text-sm text-stone-500">
              Have questions? Contact us at{" "}
              <a href="mailto:edb.mmmut@gmail.com" className="text-amber-600 hover:underline">
                edb.mmmut@gmail.com
              </a>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MunSelectCommitteePage;
