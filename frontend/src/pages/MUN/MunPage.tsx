import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ParticlesBackground from "../../components/ParticlesBackground/ParticlesBackground";
import SEO, { seoConfigs } from "../../components/SEO/SEO";
import { useAuth } from "../../context/AuthContext";
import { Calendar, MapPin, Users, Globe, Mic, ArrowRight } from "lucide-react";
import MunWinnersShowcase from "../../components/MunWinnersShowcase/MunWinnersShowcase";

const MunPage = () => {
  const { isAuthenticated } = useAuth();
  
  const scrollToWinners = () => {
    document.getElementById("mun-winners")?.scrollIntoView({ behavior: "smooth" });
  };



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

            {/* Event Concluded Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="mb-10"
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
        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <button
            onClick={scrollToWinners}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-amber-500/25"
          >
            View Winners
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <Link
            to="/mun/dashboard"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white border border-stone-200 text-stone-700 font-semibold rounded-xl hover:bg-stone-50 transition-colors"
          >
            Dashboard
          </Link>
        </motion.div>

        {/* Winners Section */}
        <motion.div
          id="mun-winners"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-24"
        >
          <MunWinnersShowcase />
        </motion.div>

        {/* Agenda Section */}
        <motion.div
          id="agenda"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-2">
            Agenda
          </h2>
          <div className="w-16 h-1 bg-amber-600 mb-10"></div>
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-l-4 border-amber-600 p-8 shadow-md">
            <h3 className="text-2xl font-serif font-bold text-stone-900 mb-4">
              Deliberation on the ongoing armed conflict in the Republic of Sudan
            </h3>
            <p className="text-stone-700 leading-relaxed text-lg">
              With special emphasis on human rights violations, the humanitarian crisis, and the impact of external support and proxy actors on civilian protection and regional stability.
            </p>
          </div>
        </motion.div>

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

        {/* Resources Section & CTA removed/condensed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center pt-12 border-t border-stone-200"
        >
           <p className="text-stone-500 italic">
             "Diplomacy is the art of letting someone else have your way."
           </p>
        </motion.div>


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
              Have questions about certificates or results? Our coordinators are here!
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
