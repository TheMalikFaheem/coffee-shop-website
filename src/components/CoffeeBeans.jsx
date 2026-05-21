import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * Renders a detailed vector coffee bean SVG.
 */
export const CoffeeBeanSVG = ({ className = "w-8 h-8", style = {} }) => (
  <svg 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    style={style}
  >
    {/* Bean main shadow base */}
    <path d="M12 50C12 25 28 12 50 12C72 12 88 25 88 50C88 75 72 88 50 88C28 88 12 75 12 50Z" fill="#2E1C0C"/>
    {/* Bean main body */}
    <path d="M15 50C15 28 30 15 50 15C70 15 85 28 85 50C85 72 70 85 50 85C30 85 15 72 15 50Z" fill="#4E311A"/>
    {/* Organic high-light curve */}
    <path d="M28 50C28 36 38 26 50 26" stroke="#6E482A" stroke-width="4.5" stroke-linecap="round"/>
    {/* Inner detail shadow */}
    <path d="M49 17C41 35 56 65 49 83" stroke="#1D1107" stroke-width="6" stroke-linecap="round" fill="none"/>
    {/* Center winding crack */}
    <path d="M50 17C42 35 58 65 50 83" stroke="#2B1B0F" stroke-width="3" stroke-linecap="round" fill="none"/>
  </svg>
);

/**
 * Generates float-animated decorative background beans.
 */
export default function CoffeeBeans({ count = 5 }) {
  // Generate random drift metrics for each bean
  const beans = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 90 + 5, // Keep slightly inside bounds
      y: Math.random() * 90 + 5,
      size: Math.random() * 20 + 16, // 16px to 36px
      rotation: Math.random() * 360,
      duration: Math.random() * 10 + 10, // Slow float (10s to 20s)
      delay: Math.random() * -10, // Pre-start animation
      driftX: Math.random() * 30 - 15,
      driftY: Math.random() * 30 - 15,
      rotateDrift: Math.random() * 120 - 60 // Rotate -60deg to +60deg relative to base
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {beans.map((bean) => (
        <motion.div
          key={bean.id}
          className="absolute opacity-25 filter blur-[0.4px]"
          style={{
            left: `${bean.x}%`,
            top: `${bean.y}%`,
          }}
          animate={{
            x: [0, bean.driftX, 0],
            y: [0, bean.driftY, 0],
            rotate: [bean.rotation, bean.rotation + bean.rotateDrift, bean.rotation],
          }}
          transition={{
            duration: bean.duration,
            delay: bean.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <CoffeeBeanSVG style={{ width: `${bean.size}px`, height: `${bean.size}px` }} />
        </motion.div>
      ))}
    </div>
  );
}
