import { type ReactNode, memo } from 'react';
import { motion } from 'framer-motion';

interface StarBorderProps {
  children: ReactNode;
  as?: 'button' | 'div' | 'a';
  className?: string;
  color?: string;
  speed?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

function StarBorderComponent({
  children,
  as: Component = 'button',
  className = '',
  color = 'rgb(249, 115, 22)',
  speed = '6s',
  onClick,
  disabled = false,
  type = 'button',
}: StarBorderProps) {
  const MotionComponent = motion[Component];

  return (
    <MotionComponent
      onClick={onClick}
      disabled={disabled}
      type={Component === 'button' ? type : undefined}
      className={`relative inline-block overflow-hidden rounded-2xl p-[2px] ${className}`}
      style={
        {
          '--star-color': color,
          '--star-speed': speed,
        } as React.CSSProperties
      }
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      {/* Animated gradient border */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          animation: `star-movement-border ${speed} linear infinite`,
        }}
      />
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          animation: `star-movement-border ${speed} linear infinite`,
          animationDelay: `-${parseFloat(speed) / 2}s`,
          transform: 'rotate(180deg)',
        }}
      />

      {/* Inner content wrapper */}
      <div className="relative z-10 rounded-[calc(1rem-2px)] bg-white">
        {children}
      </div>

      {/* CSS Keyframes */}
      <style>{`
        @keyframes star-movement-border {
          0% {
            transform: translateX(-100%) rotate(0deg);
          }
          100% {
            transform: translateX(100%) rotate(360deg);
          }
        }
      `}</style>
    </MotionComponent>
  );
}

const StarBorder = memo(StarBorderComponent);
export default StarBorder;
