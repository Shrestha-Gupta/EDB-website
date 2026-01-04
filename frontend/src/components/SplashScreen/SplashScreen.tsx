import { motion } from "framer-motion";
import { useMemo } from "react";
import { useDevicePerformance } from "../../hooks/useDevicePerformance";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const { shouldReduceAnimations } = useDevicePerformance();

  // Generate particles only once, and fewer on mobile
  const particles = useMemo(() => {
    const count = shouldReduceAnimations ? 6 : 20;
    return [...Array(count)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 2 + Math.random() * 2,
      delay: Math.random() * 2,
    }));
  }, [shouldReduceAnimations]);

  return (
    <motion.div
      className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-linear-to-br from-[#FFF8F0] via-[#FFF5EB] to-[#FFEFD5]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: shouldReduceAnimations ? 0.3 : 0.8, ease: "easeInOut" }}
    >
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Logo with heartbeat animation - simplified on mobile */}
        <motion.div
          className="flex flex-col items-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: shouldReduceAnimations ? 0.3 : 0.8 }}
        >
          <motion.img
            src="https://res.cloudinary.com/dml0jlwlv/image/upload/v1765559411/The_Editorial_Board_Logo..1.0_cgrovj.png"
            alt="The Editorial Board"
            className="h-40 md:h-48 object-contain will-change-transform"
            animate={shouldReduceAnimations ? {} : {
              scale: [1, 1.08, 1],
            }}
            transition={shouldReduceAnimations ? {} : {
              duration: 1.5,
              repeat: Infinity,
              ease: [0.4, 0, 0.6, 1],
            }}
          />

          {/* Beckoning Creativity text - simplified animation on mobile */}
          <motion.h2
            className="text-3xl md:text-4xl font-serif text-transparent bg-clip-text bg-linear-to-r from-orange-600 via-amber-500 to-orange-600 font-bold tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              opacity: { delay: 0.3, duration: shouldReduceAnimations ? 0.3 : 0.8 },
              y: { delay: 0.3, duration: shouldReduceAnimations ? 0.3 : 0.8 },
            }}
          >
            Beckoning Creati'wit'y
          </motion.h2>
        </motion.div>

        {/* Loading bar */}
        <motion.div
          className="w-64 h-1 bg-orange-100 rounded-full overflow-hidden mt-8"
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 256 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <motion.div
            className="h-full bg-linear-to-r from-orange-500 via-amber-400 to-orange-500 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
            onAnimationComplete={() => setTimeout(onComplete, 200)}
          />
        </motion.div>
      </div>

      {/* Floating particles effect - reduced count and simplified on mobile */}
      {!shouldReduceAnimations && particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-orange-400/30 rounded-full will-change-transform"
          style={{
            left: particle.left,
            top: particle.top,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Static decorative dots for mobile instead of animated particles */}
      {shouldReduceAnimations && (
        <>
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-orange-300/20 rounded-full" />
          <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-amber-300/20 rounded-full" />
          <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-orange-200/20 rounded-full" />
          <div className="absolute bottom-1/3 right-1/3 w-1.5 h-1.5 bg-amber-200/20 rounded-full" />
        </>
      )}
    </motion.div>
  );
}
