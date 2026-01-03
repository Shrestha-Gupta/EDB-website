import { useState, useEffect, useMemo } from 'react';

interface DevicePerformance {
  isMobile: boolean;
  isLowEndDevice: boolean;
  prefersReducedMotion: boolean;
  shouldReduceAnimations: boolean;
  devicePixelRatio: number;
}

/**
 * Hook to detect device performance capabilities and mobile status.
 * Used to conditionally reduce animations and effects for better performance.
 */
export function useDevicePerformance(): DevicePerformance {
  const [isMobile, setIsMobile] = useState(false);
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check if mobile based on screen width and touch capability
    const checkMobile = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 768;
      setIsMobile(isTouchDevice && isSmallScreen);
    };

    // Check for low-end device indicators
    const checkLowEndDevice = () => {
      // Check hardware concurrency (number of logical processors)
      const lowCores = navigator.hardwareConcurrency ? navigator.hardwareConcurrency <= 4 : false;
      
      // Check device memory (in GB) - Chrome only
      const lowMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory 
        ? (navigator as Navigator & { deviceMemory?: number }).deviceMemory! <= 4 
        : false;
      
      // Check connection type for slow networks
      const connection = (navigator as Navigator & { connection?: { effectiveType?: string } }).connection;
      const slowConnection = connection?.effectiveType === '2g' || connection?.effectiveType === 'slow-2g';
      
      // Check if running on battery (when available)
      // Mobile Chrome tends to throttle more aggressively
      const isChromeMobile = /Chrome/.test(navigator.userAgent) && /Mobile/.test(navigator.userAgent);
      
      setIsLowEndDevice(lowCores || lowMemory || slowConnection || isChromeMobile);
    };

    // Check for prefers-reduced-motion
    const checkReducedMotion = () => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      
      // Listen for changes
      const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    };

    checkMobile();
    checkLowEndDevice();
    const cleanup = checkReducedMotion();

    // Re-check on resize
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      cleanup?.();
    };
  }, []);

  const shouldReduceAnimations = useMemo(() => {
    return isMobile || isLowEndDevice || prefersReducedMotion;
  }, [isMobile, isLowEndDevice, prefersReducedMotion]);

  return {
    isMobile,
    isLowEndDevice,
    prefersReducedMotion,
    shouldReduceAnimations,
    devicePixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio : 1,
  };
}

/**
 * Simplified hook for just checking mobile status
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 768;
      setIsMobile(isTouchDevice || isSmallScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}

export default useDevicePerformance;
