import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CoffeeCup from './CoffeeCup';
import CoffeeBeans from './CoffeeBeans';

export default function HeroSection({ activeProduct, onAddToCart }) {
  return (
    <section className="w-full min-h-screen pt-28 pb-12 flex items-center justify-center overflow-hidden bg-transparent relative select-none">
      {/* Dynamic Background Beans */}
      <CoffeeBeans count={8} />

      {/* Hero Content Container */}
      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 z-10">
        {/* Hero Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          
          {/* LEFT SIDE: Copy & Call To Action (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left">
            
            {/* Subtitle with reveal animation */}
            <motion.div
              key={`subtitle-${activeProduct.id}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs md:text-sm font-bold tracking-widest text-brand-accent uppercase mb-2 font-montserrat"
            >
              {activeProduct.subtitle}
            </motion.div>

            {/* Heading with spring transition */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight font-montserrat text-white leading-none mb-6"
            >
              WHAT'S <span className="text-brand-accent">YOURS?</span>
            </motion.h1>

            {/* Animating product info transitions on switch */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProduct.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl md:text-2xl font-bold font-montserrat text-brand-light uppercase tracking-wide">
                    {activeProduct.name}
                  </h2>
                  <div className="w-16 h-1 bg-brand-accent mt-2 rounded-full" />
                </div>

                <p className="text-brand-textMuted text-sm md:text-base font-poppins leading-relaxed max-w-md">
                  {activeProduct.description}
                </p>

                {/* Price & Rating Row */}
                <div className="flex items-center gap-6 pt-2">
                  <div className="flex flex-col">
                    <span className="text-xs tracking-wider text-brand-accent font-bold font-montserrat uppercase">
                      BEST RATING
                    </span>
                    <span className="text-3xl font-extrabold text-white font-poppins mt-0.5">
                      {activeProduct.price}
                    </span>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <div className="pt-2">
                  <motion.button
                    onClick={() => onAddToCart(activeProduct)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="glow-btn bg-white hover:bg-brand-light text-brand-dark px-8 py-3.5 rounded-full font-bold font-montserrat text-sm tracking-widest shadow-xl flex items-center gap-2 transition-all duration-300"
                  >
                    ADD TO CART
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT SIDE: Animated Visual Stack (7 Columns) */}
          <div className="lg:col-span-7 relative flex items-center justify-center min-h-[400px] md:min-h-[500px]">
            
            {/* Big Colored Background Shape */}
            <motion.div
              key={`shape-${activeProduct.id}`}
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className={`absolute w-[280px] h-[360px] md:w-[350px] md:h-[450px] ${activeProduct.shapeBg} rounded-[50px] shadow-[0_25px_60px_rgba(0,0,0,0.4)] z-0`}
            />

            {/* Giant Outline Text */}
            <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none select-none z-0 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`giant-${activeProduct.id}`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center leading-none"
                >
                  <span className="text-stroke-active text-6xl md:text-8xl font-black font-montserrat tracking-widest uppercase opacity-20 rotate-90 translate-x-20 md:translate-x-28">
                    {activeProduct.bannerText}
                  </span>
                  <span className="text-white text-6xl md:text-8xl font-black font-montserrat tracking-widest uppercase opacity-10 rotate-90 translate-x-20 md:translate-x-28 mt-2">
                    {activeProduct.bannerText}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Interactive Floating Coffee Cup Wrapper */}
            <div className="relative z-10 w-full flex justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`cup-${activeProduct.id}`}
                  initial={{ scale: 0.6, rotate: -45, opacity: 0 }}
                  animate={{ scale: 1, rotate: activeProduct.rotation, opacity: 1 }}
                  exit={{ scale: 0.6, rotate: 45, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                >
                  <CoffeeCup
                    size="w-72 h-72 md:w-[420px] md:h-[420px]"
                    rotation={activeProduct.rotation}
                    animateFloat={true}
                    hoverScale={1.05}
                    shadow={true}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Additional decorative floating elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute top-1/4 left-1/4 z-20 pointer-events-none"
            >
              <div className="w-3 h-3 rounded-full bg-brand-accent blur-[2px] opacity-60" />
            </motion.div>
            
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-1/4 right-1/4 z-20 pointer-events-none"
            >
              <div className="w-5 h-5 rounded-full bg-brand-primary blur-[3px] opacity-40" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
