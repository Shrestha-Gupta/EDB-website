import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-linear-to-br from-[#FFF8F0] via-[#FFF5EB] to-[#FFEFD5]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Logo with heartbeat animation */}
        <motion.div
          className="flex flex-col items-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.img
            src="https://res.cloudinary.com/dml0jlwlv/image/upload/v1765559411/The_Editorial_Board_Logo..1.0_cgrovj.png"
            alt="The Editorial Board"
            className="h-40 md:h-48 object-contain"
            animate={{
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: [0.4, 0, 0.6, 1],
            }}
          />

          {/* Beckoning Creativity text */}
          <motion.h2
            className="text-3xl md:text-4xl font-serif text-transparent bg-clip-text bg-linear-to-r from-orange-600 via-amber-500 to-orange-600 font-bold tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              opacity: { delay: 0.5, duration: 0.8 },
              y: { delay: 0.5, duration: 0.8 },
              backgroundPosition: {
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              },
            }}
            style={{
              backgroundSize: "200% 200%",
            }}
          >
            Beckoning Creati‘wit’y
          </motion.h2>
        </motion.div>

        {/* Loading bar */}
        <motion.div
          className="w-64 h-1 bg-orange-100 rounded-full overflow-hidden mt-8"
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 256 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.div
            className="h-full bg-linear-to-r from-orange-500 via-amber-400 to-orange-500 rounded-full"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Loading percentage */}
        <motion.p
          className="text-orange-600 text-sm font-medium tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          {progress}%
        </motion.p>
      </div>

      {/* Floating particles effect */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-orange-400/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  );
}
