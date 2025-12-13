import { useEffect } from 'react'

export function useSmoothScroll() {
  useEffect(() => {
    // Simple smooth scroll implementation
    const smoothScrollTo = (target: Element) => {
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset
      const startPosition = window.pageYOffset
      const distance = targetPosition - startPosition
      const duration = 1000
      let start: number | null = null

      const step = (timestamp: number) => {
        if (!start) start = timestamp
        const progress = timestamp - start
        const progressPercentage = Math.min(progress / duration, 1)
        
        const easeInOutCubic = (t: number): number => {
          return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
        }
        
        window.scrollTo(0, startPosition + distance * easeInOutCubic(progressPercentage))
        
        if (progress < duration) {
          window.requestAnimationFrame(step)
        }
      }
      
      window.requestAnimationFrame(step)
    }

    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement
      if (target.hash) {
        e.preventDefault()
        const element = document.querySelector(target.hash)
        if (element) {
          smoothScrollTo(element)
        }
      }
    }

    document.addEventListener('click', handleSmoothScroll)
    
    return () => {
      document.removeEventListener('click', handleSmoothScroll)
    }
  }, [])
}
