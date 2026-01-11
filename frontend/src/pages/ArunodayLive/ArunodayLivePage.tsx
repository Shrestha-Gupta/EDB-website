import { motion } from "framer-motion";
import { ArunodayRegistrationForm } from "../../components/ArunodayRegistrationForm";
import ParticlesBackground from "../../components/ParticlesBackground/ParticlesBackground";

const ArunodayLivePage = () => {
  const scrollToForm = () => {
    document.getElementById("registration-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const events = [
    { name: "Dance Competition", time: "10:00 AM", venue: "Main Stage", icon: "💃" },
    { name: "Music Night", time: "2:00 PM", venue: "Auditorium", icon: "🎵" },
    { name: "Drama Performance", time: "4:00 PM", venue: "Open Theater", icon: "🎭" },
    { name: "Art Exhibition", time: "11:00 AM", venue: "Gallery Hall", icon: "🎨" },
    { name: "Poetry Slam", time: "3:00 PM", venue: "Literary Club", icon: "📝" },
    { name: "Band Performance", time: "7:00 PM", venue: "Main Stage", icon: "🎸" },
  ];

  const highlights = [
    { title: "50+", subtitle: "Events", icon: "🎯" },
    { title: "5000+", subtitle: "Participants", icon: "👥" },
    { title: "₹5L+", subtitle: "Prize Pool", icon: "🏆" },
    { title: "3 Days", subtitle: "Of Fun", icon: "🎉" },
  ];

  return (
    <div className="bg-stone-50 min-h-screen pt-24 pb-20 px-4 sm:px-6 relative overflow-x-hidden font-sans text-stone-800">
      <ParticlesBackground />
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-amber-200/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-125 h-125 bg-orange-200/20 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        className="max-w-7xl mx-auto relative z-10"
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
          
          <h1 className="text-6xl md:text-8xl font-serif font-bold text-stone-900 mb-6 drop-shadow-sm">
            Arunoday'26<span className="text-amber-600">.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-stone-600 font-serif italic max-w-3xl mx-auto leading-relaxed">
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

        {/* Events Schedule */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4">
              Featured{" "}
              <span className="text-amber-600">Events</span>
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              A glimpse of the exciting events awaiting you at Arunoday'26
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <motion.div
                key={event.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="p-6 bg-white rounded-2xl border border-stone-200 shadow-lg shadow-stone-200/50 hover:shadow-xl hover:border-amber-200 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                    {event.icon}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-stone-900 group-hover:text-amber-600 transition-colors">
                      {event.name}
                    </h3>
                    <p className="text-stone-600 mt-1 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {event.time}
                    </p>
                    <p className="text-stone-500 text-sm mt-1 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {event.venue}
                    </p>
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
