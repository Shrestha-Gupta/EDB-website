import { useRef, useEffect, useState, memo, type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface PixelCardProps {
  children: ReactNode;
  className?: string;
  gap?: number;
  speed?: number;
  colors?: string;
  noFocus?: boolean;
}

function PixelCardComponent({
  children,
  className = '',
  gap = 5,
  speed = 35,
  colors = '#f97316,#ef4444,#3b82f6,#06b6d4',
  noFocus = false,
}: PixelCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const animationRef = useRef<number | undefined>(undefined);
  const timeRef = useRef(0);

  const isActive = isHovered || (!noFocus && isFocused);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const colorArray = colors.split(',');

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
    };

    const drawPixels = () => {
      const rect = container.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      if (!isActive) return;

      const pixelSize = gap;
      const cols = Math.ceil(rect.width / pixelSize);
      const rows = Math.ceil(rect.height / pixelSize);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          // Only draw border pixels
          const isBorder = i === 0 || i === cols - 1 || j === 0 || j === rows - 1;
          if (!isBorder) continue;

          const noise = Math.sin((i + timeRef.current) * 0.5) * Math.cos((j + timeRef.current) * 0.5);
          const opacity = (noise + 1) / 2 * 0.8 + 0.2;

          const colorIndex = Math.floor((i + j + Math.floor(timeRef.current)) % colorArray.length);
          const color = colorArray[colorIndex];

          ctx.globalAlpha = opacity;
          ctx.fillStyle = color;
          ctx.fillRect(i * pixelSize, j * pixelSize, pixelSize - 1, pixelSize - 1);
        }
      }
    };

    const animate = () => {
      timeRef.current += 0.02 * speed / 10;
      drawPixels();
      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(container);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      resizeObserver.disconnect();
    };
  }, [isActive, gap, speed, colors]);

  return (
    <motion.div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Pixel canvas overlay */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-10"
        style={{ opacity: isActive ? 1 : 0, transition: 'opacity 0.3s ease' }}
      />
      
      {/* Card content */}
      <div className="relative z-0">
        {children}
      </div>
    </motion.div>
  );
}

const PixelCard = memo(PixelCardComponent);
export default PixelCard;
