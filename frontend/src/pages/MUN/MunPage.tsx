import { motion } from "framer-motion";
import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import ParticlesBackground from "../../components/ParticlesBackground/ParticlesBackground";
import SEO, { seoConfigs } from "../../components/SEO/SEO";
// import { useAuth } from "../../context/AuthContext";
import { Calendar, MapPin, Users, Award, FileText, ArrowRight, Globe, Mic } from "lucide-react";

// Countdown target date - January 18, 2026 at 00:00:00
const TARGET_DATE = new Date("2026-01-18T00:00:00").getTime();

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const MunPage = () => {
  // const { isAuthenticated } = useAuth();

  // Countdown state
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = TARGET_DATE - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

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
    { title: "High Commendation", description: "Excellence in diplomacy", icon: "🥈" },
    { title: "Special Mention", description: "Notable contribution", icon: "🥉" },
    { title: "Best Position Paper", description: "Outstanding research", icon: "📄" },
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
    <div className="bg-stone-50 min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-x-hidden font-sans text-stone-800">
      <SEO {...seoConfigs.mun} />
      <ParticlesBackground />

      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-amber-200/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-125 h-125 bg-orange-200/20 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Hero Section */}
        <div className="text-center mb-16">
          {/* Coming Soon Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-100 border border-amber-300 rounded-full text-amber-700 font-medium"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-600"></span>
              </span>
              Coming Soon
            </motion.div>
          </motion.div>

          {/* OLD: Registrations Live Badge
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
          */}

          {/* Main Title */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-stone-900 mb-6 drop-shadow-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
          >
            Model United<span className="text-amber-600">.</span>
            <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-600 to-orange-500">
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

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="mb-10"
          >
            <h2 className="text-xl font-medium text-stone-700 mb-6">
              Registrations Opening In
            </h2>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {timeUnits.map((unit, index) => (
                <motion.div
                  key={unit.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                  className="bg-white/90 backdrop-blur-sm border border-amber-200 rounded-2xl p-4 md:p-6 shadow-lg min-w-[80px] md:min-w-[100px]"
                >
                  <div className="text-3xl md:text-5xl font-bold bg-linear-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
                    {String(unit.value).padStart(2, "0")}
                  </div>
                  <div className="text-xs md:text-sm text-stone-500 uppercase tracking-wider mt-1">
                    {unit.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Event Info */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-6 text-stone-600 mb-8"
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-600" />
              <span>January 18-19, 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-600" />
              <span>MMMUT Campus</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-amber-600" />
              <span>100+ Delegates</span>
            </div>
          </motion.div>

          {/* View Committees Button (only option when countdown is active) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.35 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a
              href="#committees"
              className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-amber-500/25"
            >
              View Committees
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>

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
        </div>

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
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-serif font-bold text-stone-900 text-center mb-4">
            Committees
          </h2>
          <p className="text-stone-600 text-center max-w-2xl mx-auto mb-10">
            Choose your committee and represent your country on the world stage
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {committees.map((committee, index) => (
              <motion.div
                key={committee.abbr}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-linear-to-br from-amber-400/20 to-orange-400/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300" />
                <div className="relative bg-white/90 backdrop-blur-sm border border-stone-200/50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 bg-linear-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center text-amber-600">
                      {committee.icon}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">{committee.abbr}</span>
                      <h3 className="text-xl font-bold text-stone-900">{committee.name}</h3>
                    </div>
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
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.45 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-serif font-bold text-stone-900 text-center mb-4">
            Awards & Recognition
          </h2>
          <p className="text-stone-600 text-center max-w-2xl mx-auto mb-10">
            Outstanding delegates will be recognized with prestigious awards
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {awards.map((award, index) => (
              <motion.div
                key={award.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                className="bg-white/80 backdrop-blur-sm border border-amber-200/50 rounded-2xl p-4 text-center shadow-lg"
              >
                <span className="text-3xl mb-2 block">{award.icon}</span>
                <h3 className="font-bold text-stone-900 text-sm mb-1">{award.title}</h3>
                <p className="text-stone-500 text-xs">{award.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Resources Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.55 }}
          className="mb-16"
        >
          <div className="bg-linear-to-br from-amber-100 to-orange-100 rounded-3xl p-8 md:p-12 border border-amber-200/50 shadow-xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-serif font-bold mb-2 text-stone-900">
                  Delegate Resources
                </h3>
                <p className="text-stone-600">
                  Download background guides, rules of procedure, and other essential materials
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors"
                >
                  <FileText className="w-5 h-5" />
                  Background Guide
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-stone-800 hover:bg-stone-700 text-white font-semibold rounded-xl transition-colors"
                >
                  <Award className="w-5 h-5" />
                  Rules of Procedure
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
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="text-center"
        >
          <h3 className="text-2xl font-serif font-bold text-stone-900 mb-4">
            Stay Tuned!
          </h3>
          <p className="text-stone-600 mb-6 max-w-2xl mx-auto">
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
      </motion.div>
    </div>
  );
};

export default MunPage;
