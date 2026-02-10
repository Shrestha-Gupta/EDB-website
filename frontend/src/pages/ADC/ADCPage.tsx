import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ParticlesBackground from "../../components/ParticlesBackground/ParticlesBackground";
import SEO, { seoConfigs } from "../../components/SEO/SEO";
import { Calendar, MapPin, Users, Mic2, MessageSquare, ArrowRight, Send, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { type DebateRegistrationData, registerForDebate } from "../../services/debateService";

const ADCPage = () => {
  const [formData, setFormData] = useState<DebateRegistrationData>({
    fullName: '',
    branch: '',
    rollNo: '',
    contactNumber: '',
    email: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await registerForDebate(formData);
      setSuccess(true);
      setFormData({
        fullName: '',
        branch: '',
        rollNo: '',
        contactNumber: '',
        email: '',
      });
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToRegister = () => {
    document.getElementById("register-section")?.scrollIntoView({ behavior: "smooth" });
  };

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
            src="https://res.cloudinary.com/dwdx4kjgx/image/upload/v1770657827/download_1_njaxom.jpg" 
            alt="Debate Stage"
            className="w-full h-full object-cover opacity-50"
          />
          {/* Gradient overlay to blend into page background */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-stone-50/70 to-stone-50" />
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

            {/* Registration Open Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="mb-10"
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-stone-700 flex items-center justify-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                Registrations Open
              </h2>
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

            {/* CTA Button */}
            <motion.button
              onClick={scrollToRegister}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-amber-500/25"
            >
              Register Now
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-16">
        
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
              { icon: "🎯", title: "Sharpen Skills", desc: "Enhance critical thinking & public speaking", gradient: "from-blue-500 to-cyan-500", borderColor: "#93c5fd" },
              { icon: "🏆", title: "Win Prizes", desc: "Exciting rewards for top performers", gradient: "from-amber-500 to-orange-500", borderColor: "#fcd34d" },
              { icon: "📜", title: "Certificates", desc: "Recognition for all participants", gradient: "from-green-500 to-emerald-500", borderColor: "#86efac" },
              { icon: "🤝", title: "Network", desc: "Connect with like-minded debaters", gradient: "from-purple-500 to-pink-500", borderColor: "#d8b4fe" },
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
                    className={`w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-2xl md:text-3xl shadow-lg group-hover:shadow-xl`}
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

        {/* Registration Section */}
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
              Register Now
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mb-4"></div>
            <p className="text-stone-600 text-lg">
              Secure your spot in the competition. Limited seats available!
            </p>
          </div>

          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="max-w-2xl mx-auto"
              >
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 p-10 rounded-2xl text-center shadow-xl">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.5 }}
                  >
                    <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                  </motion.div>
                  <h3 className="text-3xl font-bold text-green-800 mb-4">
                    Registration Successful! 🎉
                  </h3>
                  <p className="text-green-700 text-lg mb-6">
                    You're officially registered for the Annual Debate Competition. A confirmation email has been sent to your registered email address.
                  </p>
                  <div className="bg-white/60 rounded-xl p-4 mb-6">
                    <p className="text-green-800 font-medium">
                      📅 Round 1 (GD): 17th February 2026<br />
                      📍 Venue: MMMUT Campus
                    </p>
                  </div>
                  <button
                    onClick={() => setSuccess(false)}
                    className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-colors"
                  >
                    Register Another Participant
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-2xl mx-auto"
              >
                {/* Form card with subtle glow effect */}
                <div className="relative group">
                  {/* Subtle glow effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 via-red-500 to-amber-500 rounded-2xl opacity-10 group-hover:opacity-20 blur-sm transition-all duration-500" />
                  
                  <div className="relative bg-white rounded-2xl p-6 md:p-10 shadow-xl border border-orange-200/50">
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-center gap-3"
                      >
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <p>{error}</p>
                      </motion.div>
                    )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="fullName" className="block text-sm font-semibold text-stone-700 mb-2">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          required
                          value={formData.fullName}
                          onChange={handleChange}
                          className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl px-4 py-3.5 text-stone-900 focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
                          placeholder="Enter your full name"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="rollNo" className="block text-sm font-semibold text-stone-700 mb-2">
                          Roll Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="rollNo"
                          name="rollNo"
                          required
                          value={formData.rollNo}
                          onChange={handleChange}
                          className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl px-4 py-3.5 text-stone-900 focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
                          placeholder="University Roll No."
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="branch" className="block text-sm font-semibold text-stone-700 mb-2">
                          Branch / Course <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="branch"
                          name="branch"
                          required
                          value={formData.branch}
                          onChange={handleChange}
                          className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl px-4 py-3.5 text-stone-900 focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
                          placeholder="e.g. B.Tech CSE"
                        />
                      </div>

                      <div>
                        <label htmlFor="contactNumber" className="block text-sm font-semibold text-stone-700 mb-2">
                          Contact Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          id="contactNumber"
                          name="contactNumber"
                          required
                          value={formData.contactNumber}
                          onChange={handleChange}
                          className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl px-4 py-3.5 text-stone-900 focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
                          placeholder="WhatsApp number preferred"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-stone-700 mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl px-4 py-3.5 text-stone-900 focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div className="pt-4">
                      <motion.button
                        type="submit"
                        disabled={isLoading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="relative w-full overflow-hidden bg-gradient-to-r from-red-600 via-orange-500 to-red-600 bg-[length:200%_100%] hover:bg-[position:100%_0] text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-500/30 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500"
                      >
                        {/* Animated border glow */}
                        <span className="absolute inset-0 rounded-xl border-2 border-white/20 animate-pulse" />
                        {isLoading ? (
                          <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <>
                            <span className="text-lg">Submit Registration</span>
                            <Send className="w-5 h-5" />
                          </>
                        )}
                      </motion.button>
                    </div>
                  </form>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
                <span>Topics for both rounds will be announced on the spot.</span>
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
