import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
import ParticlesBackground from "../../components/ParticlesBackground/ParticlesBackground";
import SEO, { seoConfigs } from "../../components/SEO/SEO";
// import { useAuth } from "../../context/AuthContext";
import { Calendar, MapPin, Users, Award, FileText, Globe, Mic } from "lucide-react";

const MunPage = () => {
  // const { isAuthenticated } = useAuth();

  const committees = [
    {
      name: "UN Human Rights Council",
      abbr: "UNHRC",
      icon: <Globe className="w-8 h-8" />,
      description: "Promoting and protecting human rights around the globe. The UNHRC addresses situations of human rights violations and makes recommendations on them.",
    },
    {
      name: "International Press",
      abbr: "IP",
      icon: <Mic className="w-8 h-8" />,
      description: "Report on committee proceedings, interview delegates, and produce news articles capturing the essence of diplomatic discussions.",
    },
  ];

  const awards = [
    { title: "Best Delegate", description: "Outstanding overall performance", icon: "🏆" },
    { title: "Best Orator", description: "Excellence in diplomacy", icon: "🎤" },
    { title: "Best Resolution", description: "Notable contribution", icon: "📋" },
    { title: "Best Position Paper", description: "Outstanding research", icon: "📝" },
    { title: "Best Journalist", description: "Outstanding reporting", icon: "📰" },
  ];

  /* COMMENTED OUT - Registration Steps (for when registrations go live)
  const steps = [
    { step: 1, title: "Login / Sign Up", description: "Create your account or login to get started" },
    { step: 2, title: "Complete Profile", description: "Fill in your delegate details and preferences" },
    { step: 3, title: "Apply for Committee", description: "Select your preferred committee and country" },
    { step: 4, title: "Get Confirmed", description: "Receive confirmation and prepare for MUN" },
  ];
  */

  return (
    <div className="bg-stone-50 min-h-screen pb-20 relative overflow-x-hidden font-sans text-stone-800">
      <SEO {...seoConfigs.mun} />
      <ParticlesBackground />

      {/* Hero Section with UNGA Background - starts right below header */}
      <div className="relative pt-24">
        {/* UNGA Background Image */}
        <div className="absolute inset-0 h-[450px] md:h-[500px] overflow-hidden">
          <img 
            src="/unga-hall.webp" 
            alt="United Nations General Assembly"
            className="w-full h-full object-cover opacity-60"
          />
          {/* Gradient overlay to blend into page background */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-stone-50/50 to-stone-50" />
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
          <div className="text-center">
            {/* Main Title */}
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-stone-900 mb-6 drop-shadow-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
            >
              Model United
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-amber-700 to-yellow-800">
                Nations
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-xl md:text-2xl text-stone-600 font-serif italic max-w-3xl mx-auto leading-relaxed mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              "Step into the shoes of world leaders. Debate. Negotiate. Make history."
            </motion.p>

            {/* Registrations Opening Soon */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="mb-10"
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-stone-700">
                Registrations Opening Soon
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
                <span className="text-lg md:text-xl font-medium">January 18, 2025</span>
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
                <span className="text-lg md:text-xl font-medium">100+ Delegates</span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Main Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-6">
        {/* COMMENTED OUT - CTA Buttons (for when registrations go live)
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link
            to={isAuthenticated ? "/mun/dashboard" : "/login"}
            className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-amber-500/25"
          >
            {isAuthenticated ? "Go to Dashboard" : "Login to Register"}
            <ArrowRight className="w-5 h-5" />
          </Link>
          <a
            href="#committees"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white border border-stone-200 text-stone-700 font-semibold rounded-xl hover:bg-stone-50 transition-colors"
          >
            View Committees
          </a>
        </motion.div>
        */}

        {/* COMMENTED OUT - Registration Steps (for when registrations go live)
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-serif font-bold text-stone-900 text-center mb-10">
            How to Register
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                className="relative"
              >
                <div className="bg-white/80 backdrop-blur-sm border border-amber-200/50 rounded-2xl p-6 text-center shadow-lg h-full">
                  <div className="w-12 h-12 mx-auto mb-4 bg-linear-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-stone-900 mb-2">{item.title}</h3>
                  <p className="text-stone-600 text-sm">{item.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-amber-400" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
        */}

        {/* Committees Section */}
        <motion.div
          id="committees"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-2">
            Committees
          </h2>
          <div className="w-16 h-1 bg-amber-600 mb-10"></div>
          <div className="grid md:grid-cols-2 gap-6">
            {committees.map((committee, index) => (
              <motion.div
                key={committee.abbr}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group"
              >
                <div className="border-t-4 border-amber-600 bg-white p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="mb-4">
                    <span className="text-sm font-bold text-amber-600 uppercase tracking-wide">{committee.abbr}</span>
                    <h3 className="text-2xl font-serif font-bold text-stone-900 mt-1">{committee.name}</h3>
                  </div>
                  <p className="text-stone-600 leading-relaxed">{committee.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Awards Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-2">
            Awards & Recognition
          </h2>
          <div className="w-16 h-1 bg-amber-600 mb-10"></div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {awards.map((award, index) => (
              <motion.div
                key={award.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl mb-3 text-stone-700">{award.icon}</div>
                <h3 className="font-semibold text-stone-900 text-sm">{award.title}</h3>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Resources Section */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-l-4 border-amber-600 p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-serif font-bold mb-2 text-stone-900">
                  Delegate Resources
                </h3>
                <p className="text-stone-600 mb-1">
                  Essential materials for preparation
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-green-700">
                  <span className="relative flex h-2 w-2">
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
                  </span>
                  Available Now
                </span>
              </div>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="https://drive.google.com/file/d/1Zqq0XbiX9Mn6jq5OTBgexwl6d6x3VSCl/view?usp=sharing" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-stone-200 text-stone-700 font-medium hover:bg-amber-50 hover:border-amber-300 transition-all duration-300"
                >
                  <FileText className="w-5 h-5 text-amber-600" />
                  Sample Position Paper
                </a>
                <a 
                  href="https://drive.google.com/file/d/1vkDxRvyP3OkbUmJqd9bIHiTgC9FlRdvj/view?usp=drive_link" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-stone-200 text-stone-700 font-medium hover:bg-amber-50 hover:border-amber-300 transition-all duration-300"
                >
                  <Award className="w-5 h-5 text-amber-600" />
                  MUN Guidebook
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* COMMENTED OUT - Final CTA (for when registrations go live)
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="text-center"
        >
          <h3 className="text-2xl font-serif font-bold text-stone-900 mb-4">
            Ready to Make Your Voice Heard?
          </h3>
          <p className="text-stone-600 mb-6 max-w-2xl mx-auto">
            Join delegates from across the country and experience the thrill of diplomatic discourse
          </p>
          <Link
            to={isAuthenticated ? "/mun/dashboard" : "/login"}
            className="inline-flex items-center gap-2 px-10 py-4 bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-amber-500/25 text-lg"
          >
            {isAuthenticated ? "Go to Dashboard" : "Login to Register"}
            <ArrowRight className="w-6 h-6" />
          </Link>
        </motion.div>
        */}

        {/* Stay Tuned CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="border-t border-stone-200 pt-12"
        >
          <h3 className="text-2xl font-serif font-bold text-stone-900 mb-3">
            Stay Updated
          </h3>
          <p className="text-stone-600 max-w-2xl">
            Registrations will open soon. Follow us for updates and be ready to represent your nation.
          </p>
        </motion.div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.65 }}
          className="text-center text-stone-500 text-sm mt-12"
        >
          For queries, contact us at{" "}
          <a href="mailto:edbrd028@gmail.com" className="text-amber-600 hover:underline">
            edbrd028@gmail.com
          </a>
        </motion.p>
      </div>
    </div>
  );
};

export default MunPage;
