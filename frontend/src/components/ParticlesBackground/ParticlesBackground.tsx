import { useEffect, useMemo } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import type { ISourceOptions } from '@tsparticles/engine'

export default function ParticlesBackground() {
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    })
  }, [])

  const options = useMemo<ISourceOptions>(
    () => ({
      background: {
        color: {
          value: 'transparent'
        }
      },
      fullScreen: {
        enable: false,
        zIndex: 0
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: 'grab'
          },
          resize: {
            enable: true
          }
        },
        modes: {
          grab: {
            distance: 140,
            links: {
              opacity: 0.3
            }
          }
        }
      },
      particles: {
        color: {
          value: ['#D91B1B', '#FF8C42', '#FFD700']
        },
        links: {
          color: '#D91B1B',
          distance: 150,
          enable: true,
          opacity: 0.2,
          width: 1
        },
        move: {
          enable: true,
          speed: 1,
          direction: 'none',
          random: false,
          straight: false,
          outModes: {
            default: 'bounce'
          }
        },
        number: {
          density: {
            enable: true
          },
          value: 60
        },
        opacity: {
          value: { min: 0.1, max: 0.4 }
        },
        shape: {
          type: 'circle'
        },
        size: {
          value: { min: 1, max: 3 }
        }
      },
      detectRetina: true
    }),
    []
  )

  return (
    <Particles
      id="tsparticles"
      options={options}
      className="absolute inset-0 w-full h-full"
    />
  )
}
