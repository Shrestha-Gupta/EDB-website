import { useState, useRef, type MouseEvent } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import ParticlesBackground from "../../components/ParticlesBackground/ParticlesBackground";
import SEO, { seoConfigs } from "../../components/SEO/SEO";
import StarBorder from "../../components/StarBorder/StarBorder";
import { Calendar, MapPin, Users, Mic2, MessageSquare, ArrowRight, Send, CheckCircle, AlertCircle, Clock, ChevronDown, Sparkles } from "lucide-react";
import { type DebateRegistrationData, registerForDebate } from "../../services/debateService";

// Tilted Card Component for Why Participate section
interface TiltCardItem {
  icon: string;
  title: string;
  desc: string;
  gradient: string;
  borderColor: string;
}

const TiltCard = ({ item, index }: { item: TiltCardItem; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateXValue = ((e.clientY - centerY) / (rect.height / 2)) * -10;
    const rotateYValue = ((e.clientX - centerX) / (rect.width / 2)) * 10;
    rotateX.set(rotateXValue);
    rotateY.set(rotateYValue);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group perspective-1000"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: 'preserve-3d',
        }}
        className={`relative bg-white rounded-2xl p-6 shadow-lg border-2 ${item.borderColor} overflow-hidden cursor-pointer transition-shadow duration-300 hover:shadow-2xl`}
      >
        {/* Shine effect */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.5) 45%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.5) 55%, transparent 60%)',
            transform: 'translateX(-100%)',
            animation: 'shine 1.5s ease-in-out forwards',
          }}
        />
        
        {/* Card content with 3D depth */}
        <div className="relative z-10 text-center" style={{ transform: 'translateZ(30px)' }}>
          <motion.div 
            className={`w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-2xl md:text-3xl shadow-lg`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            {item.icon}
          </motion.div>
          <h3 className="font-bold text-base md:text-lg text-stone-900 mb-2">{item.title}</h3>
          <p className="text-stone-600 text-xs md:text-sm">{item.desc}</p>
        </div>
      </motion.div>
      
      <style>{`
        @keyframes shine {
          100% { transform: translateX(100%); }
        }
        .perspective-1000 { perspective: 1000px; }
      `}</style>
    </motion.div>
  );
};

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
            className="w-full h-full object-cover opacity-70"
          />
          {/* Dark overlay for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/60 via-stone-900/40 to-stone-50" />
          {/* Noise texture overlay */}
          <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }} />
        </div>

        {/* Content */}
        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-center px-4">
            {/* Main Title */}
            <motion.h1
              className="text-4xl md:text-6xl lg:text-8xl font-serif font-bold text-white mb-4 md:mb-6 drop-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              Annual Debate
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-red-400">
                Competition
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-base md:text-xl lg:text-2xl text-stone-900 font-serif italic max-w-3xl mx-auto leading-relaxed mb-6 md:mb-8 drop-shadow-lg px-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              "Where words become weapons and ideas ignite change."
            </motion.p>

            {/* Registration Open Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="mb-10"
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full text-white font-bold shadow-lg shadow-green-500/30">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                </span>
                Registrations Open!
              </div>
            </motion.div>

            {/* Event Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-3 md:gap-6 mb-8 md:mb-10 px-2"
            >
              <motion.div 
                className="flex items-center gap-2 md:gap-3 bg-gradient-to-r from-amber-500/90 to-orange-500/90 backdrop-blur-sm px-3 py-2 md:px-5 md:py-3 rounded-xl border border-amber-400/50 shadow-lg"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(251, 146, 60, 0.4)" }}
              >
                <Calendar className="w-5 h-5 md:w-6 md:h-6 text-white" />
                <span className="text-sm md:text-lg font-bold text-white">17 - 19 Feb 2026</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-2 md:gap-3 bg-gradient-to-r from-amber-500/90 to-orange-500/90 backdrop-blur-sm px-3 py-2 md:px-5 md:py-3 rounded-xl border border-amber-400/50 shadow-lg"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(251, 146, 60, 0.4)" }}
              >
                <MapPin className="w-5 h-5 md:w-6 md:h-6 text-white" />
                <span className="text-sm md:text-lg font-bold text-white">MMMUT Campus</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-2 md:gap-3 bg-gradient-to-r from-amber-500/90 to-orange-500/90 backdrop-blur-sm px-3 py-2 md:px-5 md:py-3 rounded-xl border border-amber-400/50 shadow-lg"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(251, 146, 60, 0.4)" }}
              >
                <Users className="w-5 h-5 md:w-6 md:h-6 text-white" />
                <span className="text-sm md:text-lg font-bold text-white">Solo Participation</span>
              </motion.div>
            </motion.div>

            {/* CTA Button with Star Border */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
            >
              <StarBorder
                as="button"
                onClick={scrollToRegister}
                color="rgb(251, 146, 60)"
                speed="4s"
                className="shadow-2xl shadow-orange-500/30"
              >
                <div className="px-6 py-4 md:px-10 md:py-5 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 bg-[length:200%_100%] hover:bg-[position:100%_0] transition-all duration-500 rounded-[calc(1rem-2px)] flex items-center gap-2 md:gap-3">
                  <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  <span className="text-base md:text-lg font-bold text-white">Register Now</span>
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-white group-hover:translate-x-1 transition-transform" />
                </div>
              </StarBorder>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8" />
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
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 transform -translate-y-1/2 rounded-full" />
            
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              {rounds.map((round, index) => (
                <motion.div
                  key={round.abbr}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="relative"
                >
                  <StarBorder
                    as="div"
                    color={index === 0 ? '#3b82f6' : '#ef4444'}
                    speed="5s"
                  >
                    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border-t-4 h-full"
                      style={{ borderImage: `linear-gradient(to right, ${index === 0 ? '#3b82f6, #06b6d4' : '#ef4444, #f97316'}) 1` }}
                    >
                      {/* Round number badge */}
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold text-white bg-gradient-to-r ${round.color} mb-4`}>
                        <Clock className="w-4 h-4" />
                        {round.round}
                      </div>
                      
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${round.color} text-white shadow-lg flex-shrink-0`}>
                          {round.icon}
                        </div>
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
                  </StarBorder>
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
              { icon: "🎯", title: "Sharpen Skills", desc: "Enhance critical thinking & public speaking", gradient: "from-blue-500 to-cyan-500", borderColor: "border-blue-300" },
              { icon: "🏆", title: "Win Prizes", desc: "Exciting rewards for top performers", gradient: "from-amber-500 to-orange-500", borderColor: "border-amber-300" },
              { icon: "📜", title: "Certificates", desc: "Recognition for all participants", gradient: "from-green-500 to-emerald-500", borderColor: "border-green-300" },
              { icon: "🤝", title: "Network", desc: "Connect with like-minded debaters", gradient: "from-purple-500 to-pink-500", borderColor: "border-purple-300" },
            ].map((item, i) => (
              <TiltCard key={i} item={item} index={i} />
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
                {/* Form card with glow effect */}
                <div className="relative group">
                  {/* Glow effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 via-red-500 to-amber-500 rounded-2xl opacity-30 group-hover:opacity-50 blur-sm transition-all duration-500" />
                  
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
                            <Sparkles className="w-5 h-5" />
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
          <div className="border-l-4 border-red-500 bg-red-50/50 p-6 md:p-8 rounded-r-2xl">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              Have questions about the competition? Reach out to our coordinators!
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <a 
                href="tel:+917392817787"
                className="flex items-center gap-4 bg-white p-5 rounded-xl border-2 border-red-200 hover:border-red-400 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="shrink-0">
                  <div className="w-14 h-14 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center group-hover:from-red-200 group-hover:to-orange-200 transition-colors">
                    <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <div className="font-bold text-lg text-stone-900">Shlok</div>
                  <div className="text-red-600 font-semibold">+91 7392817787</div>
                  <div className="text-stone-500 text-sm">Event Coordinator</div>
                </div>
              </a>
              
              <a 
                href="tel:+918115303806"
                className="flex items-center gap-4 bg-white p-5 rounded-xl border-2 border-red-200 hover:border-red-400 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="shrink-0">
                  <div className="w-14 h-14 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center group-hover:from-red-200 group-hover:to-orange-200 transition-colors">
                    <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <div className="font-bold text-lg text-stone-900">Anurag Bannerjee</div>
                  <div className="text-red-600 font-semibold">+91 7004324717</div>
                  <div className="text-stone-500 text-sm">Event Coordinator</div>
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
