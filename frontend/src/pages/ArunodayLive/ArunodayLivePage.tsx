import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ParticlesBackground from "../../components/ParticlesBackground/ParticlesBackground";
import SEO, { seoConfigs } from "../../components/SEO/SEO";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import type { EventType } from "../../services/eventsApi";


import WinnersShowcase from "../../components/WinnersShowcase/WinnersShowcase";

const ArunodayLivePage = () => {
  const { isAuthenticated } = useAuth();

  const scrollToWinners = () => {
    document.getElementById("winners-section")?.scrollIntoView({ behavior: "smooth" });
  };

  // Main Events - All Arunoday events
  const mainEvents = [
    {
      name: "Model United Nations",
      subtitle: "Diplomatic Excellence",
      eligibility: "Open to All Years",
      description: "Step into the shoes of world leaders. Debate, negotiate, and make history.",
      link: "/mun",
      eventType: null
    },
    {
      name: "Pralekh",
      subtitle: "Newsletter Writing",
      eligibility: "Open to All Years",
      description: "Express your thoughts through compelling and creative newsletter writing.",
      link: "/dashboard",
      eventType: "pralekh" as EventType
    },
    {
      name: "Plotlines",
      subtitle: "Creative Writing",
      eligibility: "Open to All Years",
      description: "Craft captivating stories and let your imagination run wild on paper.",
      link: "/dashboard",
      eventType: "plotlines" as EventType
    },
    {
      name: "Open Mic",
      subtitle: "Poetry & Performance",
      eligibility: "Open to All Years",
      description: "Take the stage and share your voice through poetry, spoken word, or performance.",
      link: "/dashboard",
      eventType: "openmic" as EventType
    },
  ];

  const highlights = [
    { title: "4+", subtitle: "Events" },
    { title: "200+", subtitle: "Participants" },
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

            {/* Event Concluded Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="mb-8"
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-stone-700 flex items-center justify-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-stone-500"></span>
                </span>
                Event Concluded
              </h2>
            </motion.div>

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
              onClick={scrollToWinners}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-amber-500/25"
            >
              View Winners
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute top-[500px] right-0 w-125 h-125 bg-amber-200/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-125 h-125 bg-orange-200/20 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        className="max-w-[95rem] mx-auto relative z-10 px-4 sm:px-6 lg:px-8"
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

        {/* Winners Section */}
        <motion.div
          id="winners-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-24"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-stone-900 mb-6">
              Hall of Victory
            </h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full mb-6"></div>
            <p className="text-stone-600 max-w-2xl mx-auto text-lg">
              Celebrating the rising stars who outshined the competition.
            </p>
          </div>

          <WinnersShowcase />
        </motion.div>

        {/* Featured Events Section */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-3">
              Event Highlights
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              A glimpse into the diverse events that made Arunoday '26 memorable
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
                <div className="h-1 bg-gradient-to-r from-orange-400 to-amber-500" />
                
                <div className="p-8">
                  <div className="mb-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-2xl font-serif font-bold text-stone-900 mb-1 group-hover:text-amber-700 transition-colors">{event.name}</h3>
                        <p className="text-amber-600 text-sm font-medium tracking-wide">{event.subtitle}</p>
                      </div>
                      <span className="text-xs text-stone-500 bg-stone-100 px-3 py-1.5 rounded font-medium uppercase tracking-wide">
                        Concluded
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
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div> */}


        {/* Call Coordinators Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-16 mb-12"
        >
          <div className="border-l-4 border-amber-600 bg-amber-50/30 p-6 md:p-8">
            <div className="flex items-start gap-3 mb-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-stone-900 mb-1">Need Help?</h3>
                <div className="flex items-center gap-2 text-sm text-green-700">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  Available to assist
                </div>
              </div>
            </div>

            <p className="text-stone-600 mb-6">
              Have questions regarding the event results? Our coordinators are here!
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <a
                href="tel:+917004324717"
                className="flex items-center gap-3 bg-white p-4 rounded-lg border border-amber-200 hover:border-amber-400 hover:shadow-md transition-all duration-300 group"
              >
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                    <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-stone-900">Anurag Banerjee</div>
                  <div className="text-sm text-amber-600">+91 7004324717</div>
                </div>
              </a>

              <a
                href="tel:+918115303806"
                className="flex items-center gap-3 bg-white p-4 rounded-lg border border-amber-200 hover:border-amber-400 hover:shadow-md transition-all duration-300 group"
              >
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                    <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-stone-900">Ritesh Yadav</div>
                  <div className="text-sm text-amber-600">+91 8115303806</div>
                </div>
              </a>
            </div>
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

