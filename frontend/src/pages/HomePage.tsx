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



// Featured Events Section
const FeaturedEvents = () => {
  const events = [
    {
      name: "Arunoday",
      subtitle: "The Literary Extravaganza",
      icon: "🌅",
      description: "When dawn breaks upon the realm of words. Narratives are spoken, shaped, and tested.",
      link: "/arunoday-live#winners",
      eventType: null
    },
    {
      name: "Model United Nations",
      subtitle: "Diplomatic Excellence",
      icon: "🇺🇳",
      description: "Step into the shoes of world leaders. Debate, negotiate, and make history.",
      link: "/mun#mun-winners",
      eventType: null
    },
    {
      name: "Pralekh",
      subtitle: "Newsletter Writing",
      icon: "📝",
      description: "Express your thoughts through compelling and creative newsletter writing.",
      link: "/arunoday-live#winners",
      eventType: null
    },
    {
      name: "Plotlines",
      subtitle: "Creative Writing",
      icon: "✍️",
      description: "Craft captivating stories and let your imagination run wild on paper.",
      link: "/arunoday-live#winners",
      eventType: null
    },
    {
      name: "Open Mic",
      subtitle: "Poetry & Performance",
      icon: "🎤",
      description: "Take the stage and share your voice through poetry, spoken word, or performance.",
      link: "/arunoday-live#winners",
      eventType: null
    },
  ];

  return (
    <section className="relative py-16 md:py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-2">
            Featured Events
          </h2>
          <div className="w-16 h-1 bg-amber-600 mb-6"></div>
          <p className="text-stone-600 max-w-2xl">
            Celebrating excellence and achievement at MMMUT's premier literary and cultural fest
          </p>
        </motion.div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {events.map((event, index) => (
            <motion.div
              key={event.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="border-t-4 border-amber-600 bg-white p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                <h3 className="text-xl font-serif font-bold text-stone-900 mb-1">{event.name}</h3>
                <p className="text-amber-600 font-medium text-sm mb-4 pb-4 border-b border-stone-100">{event.subtitle}</p>
                <p className="text-stone-600 text-sm leading-relaxed mb-6 flex-grow">
                  {event.description}
                </p>
                <Link
                  to={event.link}
                  className="inline-flex items-center gap-2 text-stone-900 hover:text-amber-600 font-medium text-sm transition-colors group-hover:gap-3"
                >
                  View Winners
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
          className="mt-12"
        >
          <Link
            to="/events"
            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white font-medium transition-colors"
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

export default function HomePage() {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <SEO {...seoConfigs.home} />
      <Hero />
      <ArunodayCTA />
      <FeaturedEvents />
      <About />
      <Publications />
      <Contact />
    </motion.div>
  );
}
