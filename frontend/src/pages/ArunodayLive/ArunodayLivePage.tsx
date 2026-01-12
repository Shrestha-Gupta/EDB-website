import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ParticlesBackground from "../../components/ParticlesBackground/ParticlesBackground";
import SEO, { seoConfigs } from "../../components/SEO/SEO";
import { Calendar, MapPin, Users, Trophy, Sparkles, ArrowRight } from "lucide-react";

const ArunodayLivePage = () => {
  // Main Events - All Arunoday events
  const mainEvents = [
    { 
      name: "Model United Nations", 
      subtitle: "Diplomatic Excellence", 
      eligibility: "Open to All Years", 
      status: "live", 
      icon: "🇺🇳", 
      description: "Step into the shoes of world leaders. Debate, negotiate, and make history.",
      link: "/mun"
    },
    { 
      name: "Pralekh", 
      subtitle: "Hindi Essay Writing", 
      eligibility: "Open to All Years", 
      status: "live", 
      icon: "📝", 
      description: "Express your thoughts in the beautiful language of Hindi through compelling essays.",
      link: "/dashboard"
    },
    { 
      name: "Plotlines", 
      subtitle: "Creative Writing", 
      eligibility: "Open to All Years", 
      status: "live", 
      icon: "✍️", 
      description: "Craft captivating stories and let your imagination run wild on paper.",
      link: "/dashboard"
    },
    { 
      name: "Open Mic", 
      subtitle: "Poetry & Performance", 
      eligibility: "Open to All Years", 
      status: "live", 
      icon: "🎤", 
      description: "Take the stage and share your voice through poetry, spoken word, or performance.",
      link: "/dashboard"
    },
  ];

  const highlights = [
    { title: "4+", subtitle: "Events", icon: <Calendar className="w-6 h-6" /> },
    { title: "500+", subtitle: "Participants", icon: <Users className="w-6 h-6" /> },
    { title: "₹50K+", subtitle: "Prize Pool", icon: <Trophy className="w-6 h-6" /> },
    { title: "3 Days", subtitle: "Of Creativity", icon: <Sparkles className="w-6 h-6" /> },
  ];

  return (
    <div className="bg-stone-50 min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-x-hidden font-sans text-stone-800">
      <SEO {...seoConfigs.arunodayLive} />
      <ParticlesBackground />
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-amber-200/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-125 h-125 bg-orange-200/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-linear-to-r from-amber-300/10 to-orange-300/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Hero Section */}
        <div className="text-center mb-16">
          {/* Live Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-100 border border-green-300 rounded-full text-green-700 font-medium"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-600"></span>
              </span>
              Registrations Live!
            </motion.div>
          </motion.div>

          {/* Main Title */}
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-stone-900 mb-6 drop-shadow-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
          >
            Arunoday'26<span className="text-amber-600">.</span>
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
            className="flex flex-wrap justify-center gap-6 text-stone-600"
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-600" />
              <span>January 20-22, 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-600" />
              <span>MMMUT Campus</span>
            </div>
          </motion.div>
        </div>

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {highlights.map((item, index) => (
            <motion.div
              key={item.subtitle}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.25 + index * 0.05 }}
              className="bg-white/80 backdrop-blur-sm border border-amber-200/50 rounded-2xl p-6 text-center shadow-lg"
            >
              <div className="w-12 h-12 mx-auto mb-3 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600">
                {item.icon}
              </div>
              <div className="text-3xl font-bold text-stone-900">{item.title}</div>
              <div className="text-stone-500 text-sm">{item.subtitle}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Events Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-4">
              Featured Events
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Register now and showcase your talents at MMMUT's premier literary and cultural fest
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {mainEvents.map((event, index) => (
              <motion.div
                key={event.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.35 + index * 0.05 }}
                className="group relative"
              >
                {/* Glowing background on hover */}
                <div className="absolute inset-0 bg-linear-to-br from-amber-400/20 to-orange-400/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300" />
                
                <div className="relative bg-white/90 backdrop-blur-sm border border-stone-200/50 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <span className="text-4xl">{event.icon}</span>
                      <div>
                        <h3 className="text-xl font-bold text-stone-900">{event.name}</h3>
                        <p className="text-amber-600 font-medium text-sm">{event.subtitle}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full uppercase">
                      Live
                    </span>
                  </div>
                  
                  <p className="text-stone-600 mb-4 text-sm leading-relaxed">
                    {event.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-stone-500 bg-stone-100 px-3 py-1 rounded-full">
                      {event.eligibility}
                    </span>
                    <Link
                      to={event.link}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-xl transition-all duration-300 text-sm shadow-lg shadow-amber-500/25"
                    >
                      Register Now
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="bg-linear-to-br from-stone-800 to-stone-900 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
            <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4">
              Ready to Showcase Your Talent?
            </h3>
            <p className="text-stone-300 mb-6 max-w-2xl mx-auto">
              Don't miss this opportunity to be part of MMMUT's biggest literary and cultural celebration. 
              Register now and let your creativity shine!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors shadow-lg"
              >
                Go to Dashboard
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/mun"
                className="inline-flex items-center gap-2 px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-colors border border-white/20"
              >
                MUN Details
              </Link>
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
