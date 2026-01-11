import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArunodayRegistrationForm } from "../../components/ArunodayRegistrationForm";
import ParticlesBackground from "../../components/ParticlesBackground/ParticlesBackground";

const ArunodayLivePage = () => {
  const scrollToForm = () => {
    document.getElementById("registration-form")?.scrollIntoView({ behavior: "smooth" });
  };

  // Main Events - All Arunoday events
  const mainEvents = [
    { name: "Arunoday Round 1", subtitle: "Rising Soon", eligibility: "First Year Only", status: "coming-soon", icon: "🌅", description: "The inaugural round of Arunoday - exclusively for first year students to showcase their talents." },
    { name: "Model United Nations", subtitle: "Starting January 18, 2026", eligibility: "Open to All Years", status: "registrations-open", icon: "🇺🇳", description: "Step into the shoes of world leaders. Debate, negotiate, and make history.", link: "/mun/register" },
    { name: "Dance Competition", time: "10:00 AM", venue: "Main Stage", icon: "💃", eligibility: "Open to All" },
    { name: "Music Night", time: "2:00 PM", venue: "Auditorium", icon: "🎵", eligibility: "Open to All" },
    { name: "Drama Performance", time: "4:00 PM", venue: "Open Theater", icon: "🎭", eligibility: "Open to All" },
    { name: "Art Exhibition", time: "11:00 AM", venue: "Gallery Hall", icon: "🎨", eligibility: "Open to All" },
    { name: "Poetry Slam", time: "3:00 PM", venue: "Literary Club", icon: "📝", eligibility: "Open to All" },
    { name: "Band Performance", time: "7:00 PM", venue: "Main Stage", icon: "🎸", eligibility: "Open to All" },
  ];

  // Featured Events - Pralekh and Spandhan only
  const featuredEvents = [
    { 
      name: "Pralekh", 
      subtitle: "Newsletter Event",
      icon: "📰", 
      description: "The flagship newsletter competition where wordsmiths craft compelling stories and articles.",
      eligibility: "Open to All",
      highlights: ["Article Writing", "Editorial Design", "News Reporting"]
    },
    { 
      name: "Spandhan", 
      subtitle: "Cultural Extravaganza",
      icon: "✨", 
      description: "A vibrant celebration of arts and culture featuring diverse performances and exhibitions.",
      eligibility: "Open to All",
      highlights: ["Live Performances", "Art Showcase", "Cultural Exchange"]
    },
  ];

  const highlights = [
    { title: "50+", subtitle: "Events", icon: "🎯" },
    { title: "5000+", subtitle: "Participants", icon: "👥" },
    { title: "₹5L+", subtitle: "Prize Pool", icon: "🏆" },
    { title: "3 Days", subtitle: "Of Fun", icon: "🎉" },
  ];

  return (
    <div className="bg-stone-50 min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 2xl:px-12 relative overflow-x-hidden font-sans text-stone-800">
      <ParticlesBackground />
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-amber-200/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-125 h-125 bg-orange-200/20 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        className="max-w-7xl 2xl:max-w-8xl 3xl:max-w-9xl mx-auto relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero Section */}
        <motion.div className="text-center mb-16 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 text-amber-700 font-bold tracking-widest uppercase text-sm"
          >
            <span className="h-px w-12 bg-amber-700/40"></span>
            The Annual Cultural Festival
            <span className="h-px w-12 bg-amber-700/40"></span>
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl 2xl:text-9xl 3xl:text-[10rem] font-serif font-bold text-stone-900 mb-6 drop-shadow-sm">
            Arunoday'26<span className="text-amber-600">.</span>
          </h1>
          
          <p className="text-xl md:text-2xl 2xl:text-3xl text-stone-600 font-serif italic max-w-3xl 2xl:max-w-4xl mx-auto leading-relaxed">
            "Where creativity meets culture, and talents find their stage."
          </p>
        </motion.div>

        {/* Registration CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <motion.span
            className="inline-block px-4 py-2 bg-amber-100 border border-amber-300 rounded-full text-amber-700 text-sm font-medium mb-6"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🔥 Registrations Open Now!
          </motion.span>

          <h2 className="text-3xl md:text-5xl font-serif font-bold text-stone-900 mb-6">
            Experience the{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-600 to-orange-500">
              Magic
            </span>{" "}
            of Culture
          </h2>

          <p className="text-stone-600 text-lg md:text-xl mb-10 leading-relaxed">
            Join us for three unforgettable days of music, dance, drama, art, and more.
            Arunoday'26 brings together the brightest talents from across the nation.
          </p>

          <motion.button
            onClick={scrollToForm}
            className="px-10 py-4 bg-linear-to-r from-amber-600 to-orange-600 text-white text-lg font-bold rounded-full shadow-lg shadow-amber-900/20 hover:shadow-amber-900/30 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Register Now 🚀
          </motion.button>
        </motion.div>

        {/* Highlights Section */}
        <section className="mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-white rounded-2xl border border-stone-200 shadow-lg shadow-stone-200/50 hover:shadow-xl hover:border-amber-200 transition-all duration-300"
              >
                <span className="text-4xl mb-3 block">{item.icon}</span>
                <h3 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-amber-600 to-orange-500">
                  {item.title}
                </h3>
                <p className="text-stone-600 mt-1">{item.subtitle}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Main Competitions - Arunoday Round 1 & MUN */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4">
              Main <span className="text-amber-600">Competitions</span>
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              The flagship events of Arunoday'26 - Don't miss out!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Arunoday Round 1 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative p-8 bg-linear-to-br from-amber-50 to-orange-50 rounded-3xl border-2 border-amber-200 shadow-xl overflow-hidden"
            >
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full animate-pulse">
                  Coming Soon
                </span>
              </div>
              <span className="text-6xl mb-4 block">🌅</span>
              <h3 className="text-2xl md:text-3xl font-bold text-stone-900 mb-2">
                Arunoday Round 1
              </h3>
              <span className="text-amber-600 font-semibold text-lg">Rising Soon</span>
              <div className="mt-4 mb-4">
                <span className="inline-block px-4 py-2 bg-amber-100 border border-amber-300 text-amber-800 rounded-full text-sm font-medium">
                  🎓 First Year Students Only
                </span>
              </div>
              <p className="text-stone-600 leading-relaxed">
                The inaugural round of Arunoday - exclusively for first year students to showcase their talents and kickstart their journey.
              </p>
              <button
                disabled
                className="mt-6 w-full px-6 py-3 bg-stone-300 text-stone-500 font-semibold rounded-full cursor-not-allowed"
              >
                Registrations Opening Soon
              </button>
            </motion.div>

            {/* MUN */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative p-8 bg-linear-to-br from-blue-50 to-indigo-50 rounded-3xl border-2 border-blue-200 shadow-xl overflow-hidden"
            >
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                  Registrations Open
                </span>
              </div>
              <span className="text-6xl mb-4 block">🇺🇳</span>
              <h3 className="text-2xl md:text-3xl font-bold text-stone-900 mb-2">
                Model United Nations
              </h3>
              <span className="text-blue-600 font-semibold text-lg">Starting January 18, 2026</span>
              <div className="mt-4 mb-4">
                <span className="inline-block px-4 py-2 bg-blue-100 border border-blue-300 text-blue-800 rounded-full text-sm font-medium">
                  🌍 Open to All Years
                </span>
              </div>
              <p className="text-stone-600 leading-relaxed">
                Step into the shoes of world leaders. Debate global issues, negotiate with diplomacy, and make history at our MUN conference.
              </p>
              <Link
                to="/mun/register"
                className="mt-6 w-full px-6 py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 inline-block text-center"
              >
                Register for MUN →
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Featured Events - Pralekh & Spandhan */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4">
              Featured <span className="text-amber-600">Events</span>
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Signature events that define the spirit of Arunoday
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {featuredEvents.map((event, index) => (
              <motion.div
                key={event.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="p-8 bg-white rounded-3xl border border-stone-200 shadow-xl hover:shadow-2xl hover:border-amber-200 transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-5xl">{event.icon}</span>
                  <div>
                    <h3 className="text-2xl font-bold text-stone-900">{event.name}</h3>
                    <span className="text-amber-600 font-medium">{event.subtitle}</span>
                  </div>
                </div>
                <p className="text-stone-600 mb-4 leading-relaxed">{event.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {event.highlights.map((highlight) => (
                    <span key={highlight} className="px-3 py-1 bg-stone-100 text-stone-600 text-sm rounded-full">
                      {highlight}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-stone-500 flex items-center gap-1">
                    <span>👥</span> {event.eligibility}
                  </span>
                  <button
                    onClick={scrollToForm}
                    className="text-amber-600 font-semibold hover:text-amber-700 transition-colors"
                  >
                    Register →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* All Events */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4">
              All <span className="text-amber-600">Events</span>
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Complete lineup of events at Arunoday'26
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mainEvents.map((event, index) => (
              <motion.div
                key={event.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className={`p-6 rounded-2xl border shadow-lg transition-all duration-300 group ${
                  event.status === 'coming-soon' 
                    ? 'bg-amber-50 border-amber-200 hover:border-amber-300' 
                    : event.status === 'registrations-open'
                    ? 'bg-blue-50 border-blue-200 hover:border-blue-300'
                    : 'bg-white border-stone-200 hover:border-amber-200 hover:shadow-xl'
                }`}
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                    {event.icon}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-stone-900 group-hover:text-amber-600 transition-colors">
                      {event.name}
                    </h3>
                    {event.subtitle && (
                      <p className="text-amber-600 font-medium text-sm">{event.subtitle}</p>
                    )}
                    {event.time && (
                      <p className="text-stone-600 mt-1 flex items-center gap-2 text-sm">
                        <span>🕐</span> {event.time}
                      </p>
                    )}
                    {event.venue && (
                      <p className="text-stone-500 text-sm flex items-center gap-2">
                        <span>📍</span> {event.venue}
                      </p>
                    )}
                    <p className="text-stone-500 text-xs mt-2 flex items-center gap-1">
                      <span>👥</span> {event.eligibility}
                    </p>
                    {event.link && (
                      <Link
                        to={event.link}
                        className="inline-block mt-3 text-blue-600 font-medium text-sm hover:underline"
                      >
                        Register →
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center bg-white rounded-3xl p-10 md:p-16 border border-stone-200 shadow-xl shadow-stone-200/50 mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-stone-900 mb-4">
            Don't Miss Out!
          </h2>
          <p className="text-stone-600 text-lg mb-8 max-w-2xl mx-auto">
            Limited spots available. Register now to secure your place at the most anticipated cultural fest of the year.
          </p>
          <motion.button
            onClick={scrollToForm}
            className="px-12 py-4 bg-linear-to-r from-amber-600 to-orange-600 text-white text-lg font-bold rounded-full shadow-lg shadow-amber-900/20 hover:shadow-amber-900/30 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Register for Arunoday'26 🎉
          </motion.button>
        </motion.div>

        {/* Registration Form Section */}
        <section className="mb-20">
          <ArunodayRegistrationForm />
        </section>
      </motion.div>
    </div>
  );
};

export default ArunodayLivePage;
