import { motion } from "framer-motion";
import ParticlesBackground from "../../components/ParticlesBackground/ParticlesBackground";
import SEO, { seoConfigs } from "../../components/SEO/SEO";
import { Calendar, MapPin, Users, Mic2, MessageSquare, ArrowRight, Clock, Target, Trophy, Award, UserPlus } from "lucide-react";

const ADCPage = () => {
  const rounds = [
    {
      round: "Round 1",
      name: "Group Discussion",
      abbr: "GD",
      date: "17th February 2026",
      icon: <MessageSquare className="w-8 h-8" />,
      description: "Showcase your analytical thinking and communication skills in dynamic group discussions. Top performers advance to the final round.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      round: "Final Round",
      name: "Debate",
      abbr: "DEBATE",
      date: "19th February 2026",
      icon: <Mic2 className="w-8 h-8" />,
      description: "The ultimate battle of words! Qualified candidates compete head-to-head in intense debate rounds to claim the championship.",
      color: "from-red-500 to-orange-500",
    },
  ];

  return (
    <div className="bg-stone-50 min-h-screen pb-20 relative overflow-x-hidden font-sans text-stone-800">
      <SEO {...seoConfigs.adc} />
      <ParticlesBackground />

      {/* Hero Section with Debate Stage Background */}
      <div className="relative pt-24">
        {/* Debate Stage Background Image */}
        <div className="absolute inset-0 h-[450px] md:h-[500px] overflow-hidden">
          <img
            src="https://res.cloudinary.com/dt7cr6zuz/image/upload/v1770818820/abc_qvyigh.jpg"
            alt="Debate Stage"
            className="w-full h-full object-cover opacity-85"
          />
          {/* Gradient overlay to blend into page background */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-stone-50/20 to-stone-50" />
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
              Annual Debate
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-amber-700 to-yellow-800">
                Competition
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-xl md:text-2xl text-stone-600 font-serif italic max-w-3xl mx-auto leading-relaxed mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              "Where words become weapons and ideas ignite change."
            </motion.p>

            {/* Event Postponed Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="mb-10"
            >
              <div className="inline-block bg-amber-100 border-2 border-amber-400 rounded-full px-6 py-3">
                <h2 className="text-2xl md:text-3xl font-semibold text-amber-800 flex items-center justify-center gap-3">
                  <Clock className="w-6 h-6" />
                  Event Postponed
                </h2>
              </div>
            </motion.div>

            {/* Event Info */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-8 md:gap-12 text-stone-700 mb-8"
            >
              <motion.div
                className="flex items-center gap-3"
                whileInView={{ scale: [1, 1.05, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Calendar className="w-7 h-7 text-amber-600" />
                <span className="text-lg md:text-xl font-medium">17 - 19 Feb 2026</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-3"
                whileInView={{ scale: [1, 1.05, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <MapPin className="w-7 h-7 text-amber-600" />
                <span className="text-lg md:text-xl font-medium">MMMUT Campus</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-3"
                whileInView={{ scale: [1, 1.05, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Users className="w-7 h-7 text-amber-600" />
                <span className="text-lg md:text-xl font-medium">Solo Participation</span>
              </motion.div>
            </motion.div>

            {/* Info Message */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="max-w-2xl mx-auto bg-amber-50 border border-amber-200 rounded-xl p-6 text-center"
            >
              <p className="text-stone-700 text-lg">
                The Annual Debate Competition has been postponed. New dates will be announced soon.<br />
                Stay tuned for updates!
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Competition Format Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-3">
              Competition Format
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mb-4"></div>
            <p className="text-stone-600 text-lg max-w-2xl mx-auto">
              Two rounds. One champion. Are you ready to prove your mettle?
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-green-500 transform -translate-y-1/2 rounded-full" />
            
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              {rounds.map((round, index) => (
                <motion.div
                  key={round.abbr}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="relative"
                >
                  <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl border-t-4 h-full transition-all duration-300 cursor-pointer group"
                    style={{ borderImage: `linear-gradient(to right, ${index === 0 ? '#3b82f6, #06b6d4' : '#ef4444, #f97316'}) 1` }}
                  >
                    {/* Round number badge */}
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold text-white bg-gradient-to-r ${round.color} mb-4`}>
                      <Clock className="w-4 h-4" />
                      {round.round}
                    </div>
                    
                    <div className="flex items-start gap-4 mb-4">
                      <motion.div 
                        className={`p-3 rounded-xl bg-gradient-to-br ${round.color} text-white shadow-lg flex-shrink-0`}
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {round.icon}
                      </motion.div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-serif font-bold text-stone-900">{round.name}</h3>
                        <p className="text-stone-500 font-medium flex items-center gap-2 mt-1 text-sm md:text-base">
                          <Calendar className="w-4 h-4" />
                          {round.date}
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-stone-600 leading-relaxed text-sm md:text-base">{round.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Why Participate Section - Tilted Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-3">
              Why Participate?
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mb-4"></div>
            <p className="text-stone-600 text-lg">Discover the benefits of joining the competition</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Target className="w-7 h-7 md:w-8 md:h-8" />, title: "Sharpen Skills", desc: "Enhance critical thinking & public speaking", gradient: "from-blue-500 to-cyan-500", borderColor: "#93c5fd" },
              { icon: <Trophy className="w-7 h-7 md:w-8 md:h-8" />, title: "Win Prizes", desc: "Exciting rewards for top performers", gradient: "from-amber-500 to-orange-500", borderColor: "#fcd34d" },
              { icon: <Award className="w-7 h-7 md:w-8 md:h-8" />, title: "Certificates", desc: "Recognition for all participants", gradient: "from-green-500 to-emerald-500", borderColor: "#86efac" },
              { icon: <UserPlus className="w-7 h-7 md:w-8 md:h-8" />, title: "Network", desc: "Connect with like-minded debaters", gradient: "from-purple-500 to-pink-500", borderColor: "#d8b4fe" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white rounded-2xl p-6 shadow-lg border-2 hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                style={{ borderColor: item.borderColor }}
              >
                <div className="text-center">
                  <motion.div
                    className={`w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white shadow-lg group-hover:shadow-xl`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {item.icon}
                  </motion.div>
                  <h3 className="font-bold text-base md:text-lg text-stone-900 mb-2">{item.title}</h3>
                  <p className="text-stone-600 text-xs md:text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Registration Section - Postponed Message */}
        <motion.div
          id="register-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-3">
              Registration Status
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto mb-4"></div>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 p-10 rounded-2xl text-center shadow-xl">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
              >
                <Clock className="w-20 h-20 text-amber-600 mx-auto mb-6" />
              </motion.div>
              <h3 className="text-3xl font-bold text-amber-900 mb-4">
                Event Postponed
              </h3>
              <p className="text-amber-800 text-lg mb-6">
                The Annual Debate Competition has been postponed to a later date. We appreciate your understanding and interest in participating.
              </p>
              <div className="bg-white/60 rounded-xl p-4 mb-6">
                <p className="text-amber-900 font-medium">
                  📅 New dates will be announced soon<br />
                  📧 Registered participants will be notified via email
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl transition-colors inline-flex items-center justify-center gap-2"
                >
                  Contact Us
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href="/events"
                  className="px-8 py-3 bg-white hover:bg-stone-50 text-amber-800 border-2 border-amber-300 font-bold rounded-xl transition-colors inline-flex items-center justify-center gap-2"
                >
                  View Other Events
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Important Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-l-4 border-orange-500 rounded-r-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-serif font-bold text-stone-900 mb-4 flex items-center gap-3">
              <span className="text-2xl">📋</span>
              Important Information
            </h3>
            <ul className="space-y-3 text-stone-700">
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold">•</span>
                <span>This is a <strong>solo participation</strong> event. Each participant competes individually.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold">•</span>
                <span>Round 1 (Group Discussion) will be held on <strong>17th February 2026</strong>.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold">•</span>
                <span>Only qualified candidates from GD will proceed to the <strong>Debate round on 19th February</strong>.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold">•</span>
                <span>The topic for the debate will be informed in advance while that for GD will be told on spot.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold">•</span>
                <span>Participants must carry their <strong>college ID card</strong> on the event day.</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Contact Coordinator */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="border-l-4 border-orange-500 bg-stone-50 p-6 md:p-8 rounded-r-2xl">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center shadow-sm">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-stone-900 mb-1">Need Help?</h3>
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                  Available to assist
                </div>
              </div>
            </div>

            <p className="text-stone-600 mb-6">
              Have questions about certificates or results? Our coordinators are here!
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <a
                href="tel:+917004324717"
                className="flex items-center gap-3 bg-white p-4 rounded-xl border border-orange-300 hover:shadow-md transition-all duration-300"
              >
                <div className="shrink-0">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <div className="font-bold text-stone-900">Anurag Banerjee</div>
                  <div className="text-orange-600 font-medium">+91 7004324717</div>
                </div>
              </a>

              <a
                href="tel:+918115303806"
                className="flex items-center gap-3 bg-white p-4 rounded-xl border border-orange-300 hover:shadow-md transition-all duration-300"
              >
                <div className="shrink-0">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <div className="font-bold text-stone-900">Ritesh Yadav</div>
                  <div className="text-orange-600 font-medium">+91 8115303806</div>
                </div>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Footer Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center pt-12 border-t border-stone-200"
        >
          <p className="text-stone-900 italic font-serif text-lg font-medium">
            "The aim of argument, or of discussion, should not be victory, but progress."
          </p>
          <p className="text-stone-900 mt-2 font-semibold">— Joseph Joubert</p>
        </motion.div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="text-center text-stone-500 text-sm mt-8"
        >
          For queries, contact us at{" "}
          <a href="mailto:edbrd028@gmail.com" className="text-orange-600 hover:underline font-medium">
            edbrd028@gmail.com
          </a>
        </motion.p>
      </div>
    </div>
  );
};

export default ADCPage;
