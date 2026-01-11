import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ParticlesBackground from "../../components/ParticlesBackground/ParticlesBackground";

const ArunodayLivePage = () => {
  // Target date: January 16, 2026 at 11:59 PM IST
  const targetDate = new Date("2026-01-16T23:59:00+05:30").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="bg-stone-50 min-h-screen relative overflow-x-hidden font-sans text-stone-800 flex items-center justify-center">
      <ParticlesBackground />
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-amber-200/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-125 h-125 bg-orange-200/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-amber-300/10 to-orange-300/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        className="max-w-5xl mx-auto relative z-10 text-center px-4 py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Coming Soon Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-center gap-3 text-amber-700 font-bold tracking-widest uppercase text-sm mb-8"
        >
          <span className="h-px w-12 bg-amber-700/40"></span>
          Coming Soon
          <span className="h-px w-12 bg-amber-700/40"></span>
        </motion.div>

        {/* Main Title */}
        <motion.h1 
          className="text-6xl md:text-8xl 2xl:text-9xl font-serif font-bold text-stone-900 mb-6 drop-shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
        >
          Arunoday'26<span className="text-amber-600">.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          className="text-xl md:text-2xl 2xl:text-3xl text-stone-600 font-serif italic max-w-3xl mx-auto leading-relaxed mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          "Where creativity meets culture, and talents find their stage."
        </motion.p>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mb-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto">
            {timeUnits.map((unit, index) => (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                className="relative group"
              >
                {/* Glowing background */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                
                {/* Card */}
                <div className="relative bg-white/80 backdrop-blur-sm border border-amber-200/50 rounded-3xl p-6 md:p-8 shadow-xl shadow-amber-900/5 hover:shadow-amber-900/10 transition-all duration-300">
                  {/* Number */}
                  <motion.span 
                    className="block text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-amber-600 to-orange-500"
                    key={unit.value}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {String(unit.value).padStart(2, '0')}
                  </motion.span>
                  
                  {/* Label */}
                  <span className="block text-stone-500 font-medium text-sm md:text-base mt-2 uppercase tracking-wider">
                    {unit.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Divider dots */}
        <motion.div 
          className="flex justify-center gap-2 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <div className="w-2 h-2 rounded-full bg-amber-400/60" />
          <div className="w-2 h-2 rounded-full bg-amber-500/80" />
          <div className="w-2 h-2 rounded-full bg-amber-400/60" />
        </motion.div>

        {/* Feature Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.45 }}
          className="space-y-4"
        >
          <p className="text-lg md:text-xl text-stone-600 max-w-2xl mx-auto">
            Get ready for three unforgettable days of music, dance, drama, art, and more.
          </p>
          
          {/* Pulsing notification badge */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-100 border border-amber-300 rounded-full text-amber-700 font-medium"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-600"></span>
            </span>
            Registrations Opening Soon!
          </motion.div>
        </motion.div>

        {/* Decorative icons */}
        <motion.div 
          className="flex justify-center gap-8 mt-16 text-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ArunodayLivePage;

/* 
=== ORIGINAL CODE (COMMENTED OUT) ===

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
      
      <div className="absolute top-0 right-0 w-125 h-125 bg-amber-200/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-125 h-125 bg-orange-200/20 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        className="max-w-7xl 2xl:max-w-8xl 3xl:max-w-9xl mx-auto relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        ... (rest of original content)
      </motion.div>
    </div>
  );
};

export default ArunodayLivePage;
*/
