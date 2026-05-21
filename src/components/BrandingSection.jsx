import React from 'react';
import { motion } from 'framer-motion';
import CoffeeCup from './CoffeeCup';
import CoffeeBeans from './CoffeeBeans';

export default function BrandingSection() {
  // SVG for hand-drawn curved decorative arrow
  const CurvedArrow = ({ className = "", rotate = 0 }) => (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={`w-16 h-16 text-brand-accent/60 opacity-60 ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <path 
        d="M20 20C40 20 60 40 50 70M50 70L38 64M50 70L58 60" 
        stroke="currentColor" 
        strokeWidth="3.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <section className="relative py-32 bg-[#021A1A] overflow-hidden w-full select-none" id="rewards">
      
      {/* Background Floating Beans */}
      <CoffeeBeans count={6} />

      {/* Decorative Blur Circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Background Big Typography Watermark */}
      <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none select-none z-0">
        <h2 className="text-stroke font-montserrat font-black text-6xl md:text-8xl lg:text-[130px] uppercase text-center leading-none tracking-wider opacity-10">
          UNMATCHED
        </h2>
        <h2 className="text-white font-montserrat font-black text-6xl md:text-8xl lg:text-[130px] uppercase text-center leading-none tracking-wider opacity-5 mt-4">
          QUALITY
        </h2>
      </div>

      {/* Diagonal Scrolling Starbucks Ribbon - Top Ribbon */}
      <div className="absolute top-1/3 left-0 right-0 h-14 bg-brand-primary/95 flex items-center z-10 origin-center rotate-[-4deg] scale-105 shadow-2xl border-y border-brand-accent/20">
        <div className="w-full overflow-hidden whitespace-nowrap flex py-2 select-none">
          <div className="animate-marquee flex gap-16 text-white font-montserrat font-black text-lg md:text-xl tracking-widest uppercase">
            <span>STARBUCKS</span>
            <span>STARBUCKS</span>
            <span>STARBUCKS</span>
            <span>STARBUCKS</span>
            <span>STARBUCKS</span>
            <span>STARBUCKS</span>
            <span>STARBUCKS</span>
            <span>STARBUCKS</span>
          </div>
          <div className="animate-marquee flex gap-16 text-white font-montserrat font-black text-lg md:text-xl tracking-widest uppercase" aria-hidden="true">
            <span>STARBUCKS</span>
            <span>STARBUCKS</span>
            <span>STARBUCKS</span>
            <span>STARBUCKS</span>
            <span>STARBUCKS</span>
            <span>STARBUCKS</span>
            <span>STARBUCKS</span>
            <span>STARBUCKS</span>
          </div>
        </div>
      </div>

      {/* Center Layout Container */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-20 flex flex-col items-center">
        
        {/* Main 3-column Stack for Desktop, Vertical Stack for Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full mt-12">
          
          {/* Left Description Block (Lg: 3 columns) */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-end text-center lg:text-right space-y-4 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="glass-card p-6 rounded-3xl max-w-sm border border-white/10"
            >
              <p className="text-brand-light font-poppins text-sm md:text-base leading-relaxed">
                At Starbucks, every single coffee bean is roasted to perfection, ensuring that every sip becomes a story of rich flavor and warmth.
              </p>
            </motion.div>
            
            {/* Curved Arrow pointing to the cup (pointing right/down) */}
            <div className="hidden lg:block mr-8 transform rotate-12">
              <CurvedArrow rotate={60} />
            </div>
          </div>

          {/* Central Giant Floating Cup (Lg: 4 columns) */}
          <div className="lg:col-span-4 flex justify-center order-1 lg:order-2 my-8 lg:my-0">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
            >
              <CoffeeCup 
                size="w-64 h-64 md:w-80 h-80 lg:w-[380px] lg:h-[380px]" 
                rotation={5}
                animateFloat={true}
                hoverScale={1.05}
                shadow={true}
              />
            </motion.div>
          </div>

          {/* Right Description Block (Lg: 3 columns) */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 order-3 lg:order-3">
            {/* Curved Arrow pointing to the cup (pointing left/up) */}
            <div className="hidden lg:block ml-8 transform -rotate-12">
              <CurvedArrow rotate={240} />
            </div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="glass-card p-6 rounded-3xl max-w-sm border border-white/10"
            >
              <p className="text-brand-light font-poppins text-sm md:text-base leading-relaxed">
                We craft our premium selections using custom milk, cream, and toppings blends, redesigning standard coffee habits into a luxurious coffee moment.
              </p>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
