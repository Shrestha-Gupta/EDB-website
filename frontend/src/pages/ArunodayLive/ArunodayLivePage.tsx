import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ParticlesBackground from "../../components/ParticlesBackground/ParticlesBackground";
import SEO, { seoConfigs } from "../../components/SEO/SEO";
import { ArunodayRegistrationForm } from "../../components/ArunodayRegistrationForm";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

const ArunodayLivePage = () => {
  const scrollToForm = () => {
    document.getElementById("registration-form")?.scrollIntoView({ behavior: "smooth" });
  };

  // Main Events - All Arunoday events
  const mainEvents = [
    { 
      name: "Model United Nations", 
      subtitle: "Diplomatic Excellence", 
      eligibility: "Open to All Years", 
      description: "Step into the shoes of world leaders. Debate, negotiate, and make history.",
      link: "/mun"
    },
    { 
      name: "Pralekh", 
      subtitle: "Newsletter Writing", 
      eligibility: "Open to All Years", 
      description: "Express your thoughts through compelling and creative newsletter writing.",
      link: "/dashboard"
    },
    { 
      name: "Plotlines", 
      subtitle: "Creative Writing", 
      eligibility: "Open to All Years", 
      description: "Craft captivating stories and let your imagination run wild on paper.",
      link: "/dashboard"
    },
    { 
      name: "Open Mic", 
      subtitle: "Poetry & Performance", 
      eligibility: "Open to All Years", 
      description: "Take the stage and share your voice through poetry, spoken word, or performance.",
      link: "/dashboard"
    },
  ];

  const highlights = [
    { title: "4+", subtitle: "Events" },
    { title: "500+", subtitle: "Participants" },
    { title: "Assured", subtitle: "Cash Prizes" },
    { title: "3", subtitle: "Days" },
  ];

  return (
    <div className="bg-stone-50 min-h-screen pb-20 relative overflow-x-hidden font-sans text-stone-800">
      <SEO {...seoConfigs.arunodayLive} />
      <ParticlesBackground />

      {/* Hero Section with Rising Sun Background - starts right below header */}
      <div className="relative pt-24">
        {/* Rising Sun Background Image */}
        <div className="absolute inset-0 h-[450px] md:h-[500px] overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?q=80&w=2000&auto=format&fit=crop" 
            alt="Arunoday Rising Sun"
            className="w-full h-full object-cover opacity-60"
          />
          {/* Gradient overlay to blend into page background */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-stone-50/60 to-stone-50" />
          {/* Noise texture overlay */}
          <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }} />
        </div>

        {/* Content */}
        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-center">
            {/* Main Title */}
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-stone-900 mb-6 drop-shadow-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
            >
              Arunoday <span className="text-amber-600">'26</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              className="text-xl md:text-2xl text-stone-600 font-serif italic max-w-3xl mx-auto leading-relaxed mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              "Where creativity meets culture, and talents find their stage."
            </motion.p>

            {/* Event Info */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              className="flex flex-wrap justify-center gap-6 text-stone-600 mb-8"
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-600" />
                <span>January 17-20, 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-600" />
                <span>MMMUT Campus</span>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.button
              onClick={scrollToForm}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-amber-500/25"
            >
              Register Now
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
      
      {/* Decorative Background Elements */}
      <div className="absolute top-[500px] right-0 w-125 h-125 bg-amber-200/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-125 h-125 bg-orange-200/20 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {highlights.map((item, index) => (
            <motion.div
              key={item.subtitle}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
              className="relative text-center py-8"
            >
              <div className="text-5xl md:text-6xl font-serif font-bold text-stone-900 mb-2">{item.title}</div>
              <div className="text-stone-600 text-sm uppercase tracking-widest font-medium">{item.subtitle}</div>
              {/* Subtle bottom border */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-amber-400/40" />
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Events Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-3">
              Featured Events
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Register now and showcase your talents at MMMUT's premier literary and cultural fest
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {mainEvents.map((event, index) => (
              <motion.div
                key={event.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative bg-white border-2 border-stone-100 hover:border-amber-200/60 transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden"
              >
                {/* Top orangish accent bar */}
                <div className="h-1 bg-gradient-to-r from-orange-400 to-amber-500" />
                
                <div className="p-8">
                  <div className="mb-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-2xl font-serif font-bold text-stone-900 mb-1 group-hover:text-amber-700 transition-colors">{event.name}</h3>
                        <p className="text-amber-600 text-sm font-medium tracking-wide">{event.subtitle}</p>
                      </div>
                      <span className="text-xs text-green-700 bg-green-50 px-3 py-1.5 rounded font-medium uppercase tracking-wide">
                        Open
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-stone-600 mb-6 leading-relaxed">
                    {event.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-5 border-t border-stone-100">
                    <span className="text-sm text-stone-500 font-medium">
                      {event.eligibility}
                    </span>
                    <Link
                      to={event.link}
                      className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-orange-300 text-orange-600 hover:bg-orange-300 hover:text-orange-900 font-medium transition-all duration-300 text-sm"
                    >
                      Register
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Registration Form Section */}
        <motion.div
          id="registration-form"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mb-16"
        >
          <ArunodayRegistrationForm />
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="text-center py-16 border-t-2 border-stone-200"
        >
          <h3 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-stone-900">
            Join Arunoday '26
          </h3>
          <p className="text-stone-600 mb-8 max-w-2xl mx-auto text-lg">
            Be part of MMMUT's literary and cultural celebration
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-all duration-300"
            >
              View Dashboard
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/mun"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white font-semibold rounded-xl transition-all duration-300"
            >
              MUN Details
            </Link>
          </div>
        </motion.div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="text-center text-stone-500 text-sm mt-12"
        >
          For queries, contact us at{" "}
          <a href="mailto:edbrd028@gmail.com" className="text-amber-600 hover:underline">
            edbrd028@gmail.com
          </a>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default ArunodayLivePage;
