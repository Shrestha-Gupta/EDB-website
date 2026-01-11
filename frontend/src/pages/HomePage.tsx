import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Hero from "../components/Hero/Hero";
import About from "../components/About/About";
import Publications from "../components/Publications/Publications";
import Contact from "../components/Contact/Contact";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

interface HomePageProps {
  onOpenRegistration?: () => void;
}

// Arunoday Coming Soon CTA Section
const ArunodayCTA = () => {
  return (
    <section className="relative py-4 md:py-16 overflow-hidden">
      {/* Content */}
      <div className="relative max-w-6xl mx-auto px-4 md:px-8">
        <motion.div
          className="relative rounded-3xl overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Content Container */}
          <div className="relative z-10 p-8 md:p-12 lg:p-16 text-center">
            {/* Coming Soon Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center px-4 bg-amber-100 backdrop-blur-sm border border-amber-300/50 rounded-full mb-6"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-600"></span>
              </span>
              <span className="text-amber-700 font-semibold text-sm tracking-wide uppercase">
                Rising Soon
              </span>
            </motion.div>
            
            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-stone-900 mb-4"
            >
              Arunoday'26<span className="text-amber-500">.</span>
            </motion.h2>
            
            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-stone-600 text-lg md:text-xl max-w-2xl mx-auto mb-8 font-light"
            >
              The Literary Extravaganza of MMMUT
            </motion.p>
          
            
            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <Link
                to="/arunoday-live"
                className="inline-flex items-center gap-2 px-8 py-4 text-black hover:shadow-lg font-bold text-lg rounded-full hover:scale-115 transition-all duration-300"
              >
                <span>Learn more</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default function HomePage({ onOpenRegistration }: HomePageProps) {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Hero onOpenRegistration={onOpenRegistration} />
      <ArunodayCTA />
      <About />
      <Publications />
      <Contact />
    </motion.div>
  );
}
