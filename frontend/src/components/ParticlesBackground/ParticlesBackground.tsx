import { useEffect, useMemo, useState, memo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";
import { useDevicePerformance } from "../../hooks/useDevicePerformance";

function ParticlesBackgroundComponent() {
  const [engineReady, setEngineReady] = useState(false);
  const { isMobile, shouldReduceAnimations, isLowEndDevice } = useDevicePerformance();

  useEffect(() => {
    // Don't load particles engine on low-end devices
    if (isLowEndDevice && isMobile) return;
    
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setEngineReady(true));
  }, [isLowEndDevice, isMobile]);

  const [isSmall, setIsSmall] = useState<boolean>(false);

  useEffect(() => {
    const check = () =>
      setIsSmall(typeof window !== "undefined" && window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const options = useMemo<ISourceOptions>(
    () => ({
      background: {
        color: {
          value: "transparent",
        },
      },
      fullScreen: {
        enable: false,
        zIndex: 0,
      },
      // Much lower FPS for mobile - Chrome mobile struggles with high FPS
      fpsLimit: shouldReduceAnimations ? 30 : (isSmall ? 45 : 60),
      interactivity: {
        events: {
          // Disable all interactivity on mobile for performance
          onHover: {
            enable: !shouldReduceAnimations && !isSmall,
            mode: "grab",
          },
          resize: {
            enable: true,
          },
        },
        modes: {
          grab: {
            distance: 100,
            links: {
              opacity: 0.2,
            },
          },
        },
      },
      particles: {
        color: {
          value: ["#FF8C42", "#FFD700", "#FDE68A"],
        },
        links: {
          color: "#FF8C42",
          distance: shouldReduceAnimations ? 100 : 150,
          // Disable links on mobile - major performance saver
          enable: !shouldReduceAnimations && !isSmall,
          opacity: 0.1,
          width: 1,
        },
        move: {
          enable: true,
          // Much slower movement on mobile
          speed: shouldReduceAnimations ? 0.3 : (isSmall ? 0.5 : 0.8),
          direction: "none",
          random: false,
          straight: false,
          outModes: {
            default: "bounce",
          },
        },
        number: {
          density: {
            enable: true,
            // Larger area per particle = fewer particles
            width: shouldReduceAnimations ? 400 : (isSmall ? 200 : 800),
            height: shouldReduceAnimations ? 400 : (isSmall ? 200 : 800),
          },
          // Drastically reduced particle count for mobile
          value: shouldReduceAnimations ? 8 : (isSmall ? 12 : 8),
        },
        opacity: {
          value: { min: 0.03, max: shouldReduceAnimations ? 0.1 : 0.15 },
          // Disable opacity animation on mobile
          animation: {
            enable: !shouldReduceAnimations,
            speed: 0.5,
            sync: false,
          },
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: shouldReduceAnimations ? 2 : 3 },
          // Disable size animation on mobile
          animation: {
            enable: false,
          },
        },
      },
      detectRetina: !shouldReduceAnimations,
      // Pause when not visible for performance
      pauseOnBlur: true,
      pauseOnOutsideViewport: true,
    }),
    [isSmall, shouldReduceAnimations]
  );

  // Don't render particles at all on low-end mobile devices
  if (isLowEndDevice && isMobile) {
    return null;
  }

  // Wait for engine to be ready
  if (!engineReady) {
    return null;
  }

  return (
    <Particles
      id="tsparticles"
      options={options}
      className="absolute inset-0 w-full h-full pointer-events-none will-change-transform"
    />
  );
}

// Memoize to prevent unnecessary re-renders
const ParticlesBackground = memo(ParticlesBackgroundComponent);
export default ParticlesBackground;
