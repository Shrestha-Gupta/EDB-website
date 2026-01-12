import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Hero from "../components/Hero/Hero";
import About from "../components/About/About";
import Publications from "../components/Publications/Publications";
import Contact from "../components/Contact/Contact";
import SEO, { seoConfigs } from "../components/SEO/SEO";
import { ArrowRight } from "lucide-react";

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

// Featured Events Section
const FeaturedEvents = () => {
  const events = [
    { 
      name: "Model United Nations", 
      subtitle: "Diplomatic Excellence", 
      icon: "🇺🇳", 
      description: "Step into the shoes of world leaders. Debate, negotiate, and make history.",
      link: "/mun"
    },
    { 
      name: "Pralekh", 
      subtitle: "Hindi Essay Writing", 
      icon: "📝", 
      description: "Express your thoughts in the beautiful language of Hindi through compelling essays.",
      link: "/dashboard"
    },
    { 
      name: "Plotlines", 
      subtitle: "Creative Writing", 
      icon: "✍️", 
      description: "Craft captivating stories and let your imagination run wild on paper.",
      link: "/dashboard"
    },
    { 
      name: "Open Mic", 
      subtitle: "Poetry & Performance", 
      icon: "🎤", 
      description: "Take the stage and share your voice through poetry, spoken word, or performance.",
      link: "/dashboard"
    },
  ];

  return (
    <section className="relative py-16 md:py-24 bg-stone-100/50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 border border-green-300 rounded-full text-green-700 font-medium text-sm mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
            </span>
            Registrations Live
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-4">
            Featured Events
          </h2>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Register now and showcase your talents at MMMUT's premier literary and cultural fest
          </p>
        </motion.div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event, index) => (
            <motion.div
              key={event.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-linear-to-br from-amber-400/20 to-orange-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300" />
              
              <div className="relative bg-white border border-stone-200/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                <span className="text-4xl mb-4">{event.icon}</span>
                <h3 className="text-lg font-bold text-stone-900 mb-1">{event.name}</h3>
                <p className="text-amber-600 font-medium text-sm mb-3">{event.subtitle}</p>
                <p className="text-stone-600 text-sm leading-relaxed mb-4 flex-grow">
                  {event.description}
                </p>
                <Link
                  to={event.link}
                  className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold text-sm transition-colors"
                >
                  Register Now
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-10"
        >
          <Link
            to="/arunoday-live"
            className="inline-flex items-center gap-2 px-8 py-3 bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-amber-500/25"
          >
            View All Events
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

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
          
        </motion.div>
      </div>
    </section>
  );
};

export default function HomePage({ onOpenRegistration }: HomePageProps) {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <SEO {...seoConfigs.home} />
      <Hero onOpenRegistration={onOpenRegistration} />
      <ArunodayCTA />
      <FeaturedEvents />
      <About />
      <Publications />
      <Contact />
    </motion.div>
  );
}
