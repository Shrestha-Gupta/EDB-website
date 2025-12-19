import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

export default function ParticlesBackground() {
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    });
  }, []);

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
      fpsLimit: 120,
      interactivity: {
        events: {
          onHover: {
            enable: !isSmall,
            mode: isSmall ? undefined : "grab",
          },
          resize: {
            enable: true,
          },
        },
        modes: {
          grab: {
            distance: 140,
            links: {
              opacity: 0.3,
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
          distance: 150,
          enable: !isSmall,
          opacity: isSmall ? 0.06 : 0.12,
          width: 1,
        },
        move: {
          enable: true,
          speed: isSmall ? 0.6 : 1,
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
          },
          value: isSmall ? 18 : 40,
        },
        opacity: {
          value: { min: isSmall ? 0.02 : 0.05, max: isSmall ? 0.12 : 0.18 },
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: isSmall ? 2 : 3 },
        },
      },
      detectRetina: true,
    }),
    [isSmall]
  );

  return (
    <Particles
      id="tsparticles"
      options={options}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
