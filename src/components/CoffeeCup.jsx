import React from 'react';
import { motion } from 'framer-motion';

/**
 * Reusable CoffeeCup component.
 * Ensures the single coffee cup PNG is styled and animated consistently.
 *
 * @param {string} size - Tailwind width and height class (e.g. "w-64 h-64")
 * @param {number} rotation - Initial rotation angle in degrees
 * @param {boolean} animateFloat - Whether the cup has a gentle vertical float animation
 * @param {number} hoverScale - Scale factor on cursor hover
 * @param {boolean} shadow - Whether to render a dynamic shadow underneath
 * @param {string} className - Additional CSS class names
 */
export default function CoffeeCup({
  size = "w-64 h-64",
  rotation = 0,
  animateFloat = true,
  hoverScale = 1.05,
  shadow = true,
  className = "",
  imgFilter = ""
}) {
  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      {/* Cup Image wrapper */}
      <motion.div
        animate={
          animateFloat
            ? {
                y: [0, -15, 0],
                rotate: rotation,
              }
            : {
                y: 0,
                rotate: rotation,
              }
        }
        transition={{
          y: {
            repeat: Infinity,
            repeatType: "reverse",
            duration: 5,
            ease: "easeInOut"
          },
          rotate: { duration: 0.5, ease: "easeOut" }
        }}
        whileHover={{ scale: hoverScale }}
        className={`${size} relative z-10 select-none cursor-pointer`}
      >
        <img
          src="/coffee.png"
          alt="Premium Starbucks Coffee Cup"
          className="w-full h-full object-contain"
          style={{ filter: imgFilter ? `drop-shadow(0px 15px 20px rgba(0,0,0,0.4)) ${imgFilter}` : 'drop-shadow(0px 15px 20px rgba(0,0,0,0.4))' }}
          draggable="false"
        />
      </motion.div>

      {/* Dynamic shadow */}
      {shadow && (
        <motion.div
          animate={
            animateFloat
              ? {
                  scale: [1, 0.8, 1],
                  opacity: [0.6, 0.3, 0.6],
                }
              : {
                  scale: 1,
                  opacity: 0.6,
                }
          }
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 5,
            ease: "easeInOut"
          }}
          className="absolute -bottom-4 z-0 h-4 w-[60%] rounded-full bg-black/60 blur-md pointer-events-none"
        />
      )}
    </div>
  );
}
