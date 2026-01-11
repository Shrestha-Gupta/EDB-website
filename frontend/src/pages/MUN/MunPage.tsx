import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ParticlesBackground from "../../components/ParticlesBackground/ParticlesBackground";

const MunPage = () => {
  // Target date: January 17, 2026 at 11:59 PM IST (24 hours after Arunoday)
  const targetDate = new Date("2026-01-17T23:59:00+05:30").getTime();

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
        transition={{ duration: 0.5 }}
      >
        {/* Coming Soon Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 text-amber-700 font-bold tracking-widest uppercase text-sm mb-8"
        >
          <span className="h-px w-12 bg-amber-700/40"></span>
          Coming Soon
          <span className="h-px w-12 bg-amber-700/40"></span>
        </motion.div>

        {/* Main Title */}
        <motion.h1 
          className="text-6xl md:text-8xl 2xl:text-9xl font-serif font-bold text-stone-900 mb-6 drop-shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Model United<span className="text-amber-600">.</span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500">
            Nations
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          className="text-xl md:text-2xl 2xl:text-3xl text-stone-600 font-serif italic max-w-3xl mx-auto leading-relaxed mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          "Step into the shoes of world leaders. Debate. Negotiate. Make history."
        </motion.p>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto">
            {timeUnits.map((unit, index) => (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
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
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="w-2 h-2 rounded-full bg-amber-400/60" />
          <div className="w-2 h-2 rounded-full bg-amber-500/80" />
          <div className="w-2 h-2 rounded-full bg-amber-400/60" />
        </motion.div>

        {/* Feature Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="space-y-4"
        >
          <p className="text-lg md:text-xl text-stone-600 max-w-2xl mx-auto">
            Get ready for an immersive diplomatic experience with debates, negotiations, and resolutions.
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
      </motion.div>
    </div>
  );
};

export default MunPage;

/* 
=== ORIGINAL CODE (COMMENTED OUT) ===

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ParticlesBackground from "../../components/ParticlesBackground/ParticlesBackground";
import { getEvents } from "../../services/munApi";
import type { MunEvent } from "../../services/munApi";
import { useAuth } from "../../context/AuthContext";

const MunPage = () => {
  const { isAuthenticated } = useAuth();
  const [events, setEvents] = useState<MunEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const committees = [
    {
      name: "UN Human Rights Council",
      abbr: "UNHRC",
      description: "Promoting and protecting human rights around the globe. The UNHRC addresses situations of human rights violations and makes recommendations on them.",
    },
    {
      name: "International Press",
      abbr: "IP",
      description: "Report on committee proceedings, interview delegates, and produce news articles capturing the essence of diplomatic discussions.",
    },
  ];

  const awards = [
    { title: "Best Delegate", description: "Outstanding overall performance" },
    { title: "Best Position Paper", description: "Excellence in research" },
    { title: "Best Orator", description: "Exceptional public speaking" },
    { title: "Best Resolution", description: "Well-drafted resolution" },
    { title: "Best Journalist", description: "Outstanding reporting" },
  ];

  return (
    <div className="bg-stone-50 min-h-screen relative overflow-x-hidden font-sans">
      <ParticlesBackground />

      <div className="absolute top-20 right-0 w-125 h-125 bg-amber-100/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-[50%] left-0 w-100 h-100 bg-orange-100/30 rounded-full blur-[80px] pointer-events-none" />

      ... (rest of original content including Hero, About, Agenda, Resources, Committees, Awards, Steps, Events, CTA sections)
    </div>
  );
};

export default MunPage;
*/
