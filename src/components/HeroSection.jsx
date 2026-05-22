import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bean, Compass, Award, Flame, ChevronRight } from 'lucide-react';
import CoffeeCup from './CoffeeCup';
import CoffeeBeans from './CoffeeBeans';
import { Link } from './Router';

export default function HeroSection({ activeProduct }) {
  // Render strength indicator using coffee bean icons
  const renderStrength = (strength) => {
    return (
      <div className="flex gap-1.5 items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <Bean
            key={i}
            size={14}
            className={`transition-all duration-500 ${
              i < strength
                ? 'text-brand-accent fill-brand-accent drop-shadow-[0_0_4px_rgba(0,168,98,0.6)] scale-110'
                : 'text-white/20'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="w-full min-h-screen pt-32 pb-16 flex items-center justify-center overflow-hidden bg-transparent relative select-none">
      {/* Background Floating Beans */}
      <CoffeeBeans count={8} />

      {/* Hero Content Container */}
      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 z-10">
        
        {/* 3-Column Grid for Desktop (Left: Text copy, Center: Floating cup, Right: Specifications) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
          
          {/* COLUMN 1: Editorial Description & Info (5 columns) */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left space-y-6 order-2 lg:order-1">
            
            {/* Origin & Roast tag */}
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-bold font-montserrat uppercase tracking-wider text-brand-accent">
                <Compass size={12} />
                {activeProduct.origin}
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-bold font-montserrat uppercase tracking-wider text-brand-textMuted">
                <Flame size={12} />
                {activeProduct.roast}
              </span>
            </div>

            {/* Product Title */}
            <div className="space-y-2">
              <p className="text-xs md:text-sm font-bold tracking-[0.25em] text-brand-primary uppercase font-montserrat">
                {activeProduct.subtitle}
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-montserrat text-white leading-none">
                {activeProduct.name.split(' ').slice(0, -1).join(' ')} <span className="text-brand-accent">{activeProduct.name.split(' ').pop()}</span>
              </h1>
              <div className="w-20 h-1 bg-brand-primary/60 rounded-full mt-4" />
            </div>

            {/* Product Description */}
            <p className="text-brand-textMuted text-sm md:text-base font-poppins leading-relaxed max-w-md">
              {activeProduct.description}
            </p>

            {/* Flavor Notes Grid */}
            <div className="space-y-2">
              <span className="text-xs font-bold tracking-widest text-brand-accent/80 font-montserrat uppercase block">
                Flavor Profiles
              </span>
              <div className="flex flex-wrap gap-2">
                {activeProduct.flavorNotes?.map((note, index) => (
                  <span
                    key={index}
                    className="text-xs px-3 py-1 rounded-lg bg-brand-primary/10 border border-brand-primary/20 text-brand-light font-poppins font-medium"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Premium CTA Button */}
            <div className="pt-2">
              <Link
                href={`/menu/${activeProduct.slug}`}
                className="glow-btn inline-flex items-center gap-2 bg-white hover:bg-brand-light text-brand-dark px-8 py-3.5 rounded-full font-bold font-montserrat text-xs tracking-widest shadow-[0_10px_25px_rgba(0,0,0,0.3)] transition-all duration-300 group"
              >
                DISCOVER RECIPE & DETAILS
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform duration-300 text-brand-primary" />
              </Link>
            </div>
          </div>

          {/* COLUMN 2: Central Floating Coffee Cup Visual (4 columns) */}
          <div className="lg:col-span-4 relative flex items-center justify-center min-h-[300px] md:min-h-[400px] order-1 lg:order-2">
            
            {/* Big Colored Background Shape with gradient */}
            <motion.div
              key={`shape-${activeProduct.id}`}
              initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className={`absolute w-[240px] h-[320px] md:w-[280px] md:h-[380px] ${activeProduct.shapeBg} rounded-[50px] shadow-[0_25px_60px_rgba(0,0,0,0.5)] z-0 flex items-center justify-center overflow-hidden`}
            >
              {/* Internal glow radial gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/10" />
            </motion.div>

            {/* Large outline banner watermark behind the cup */}
            <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none select-none z-0 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`giant-${activeProduct.id}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center leading-none"
                >
                  <span className="text-stroke text-7xl md:text-8xl font-black font-montserrat tracking-widest uppercase opacity-15 rotate-90 translate-x-20 md:translate-x-24">
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
                  initial={{ scale: 0.6, rotate: -35, opacity: 0 }}
                  animate={{ scale: 1, rotate: activeProduct.rotation, opacity: 1 }}
                  exit={{ scale: 0.6, rotate: 35, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 90, damping: 14 }}
                >
                  <CoffeeCup
                    size="w-60 h-60 md:w-72 h-72 lg:w-80 lg:h-80"
                    rotation={activeProduct.rotation}
                    animateFloat={true}
                    hoverScale={1.08}
                    shadow={true}
                    imgFilter={activeProduct.imgFilter}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Spotlight lighting filter effect behind the cup */}
            <div className="absolute w-[300px] h-[300px] bg-brand-accent/20 rounded-full blur-[80px] pointer-events-none z-0" />
          </div>

          {/* COLUMN 3: Technical Specifications Panel (3 columns) */}
          <div className="lg:col-span-3 flex flex-col space-y-6 order-3 justify-center text-left bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
            
            {/* Header */}
            <div>
              <span className="text-[10px] tracking-[0.2em] font-extrabold text-brand-accent font-montserrat uppercase block">
                Spec Sheet
              </span>
              <h3 className="text-lg font-bold font-montserrat text-white uppercase tracking-wider">
                Blend Profile
              </h3>
              <div className="w-10 h-0.5 bg-brand-primary mt-1" />
            </div>

            {/* Strength indicator */}
            <div className="space-y-1.5 border-b border-white/5 pb-4">
              <span className="text-xs text-brand-textMuted font-poppins block">
                Caffeine / Roast Strength
              </span>
              {renderStrength(activeProduct.strength)}
            </div>

            {/* Preparation style */}
            <div className="space-y-1 border-b border-white/5 pb-4">
              <span className="text-xs text-brand-textMuted font-poppins block">
                Serving Style
              </span>
              <span className="text-sm font-bold text-white font-montserrat uppercase tracking-wider block">
                {activeProduct.servingStyle}
              </span>
            </div>

            {/* Key ingredients summary */}
            <div className="space-y-2 border-b border-white/5 pb-4">
              <span className="text-xs text-brand-textMuted font-poppins block">
                Key Elements
              </span>
              <ul className="text-xs space-y-1 text-white/90 font-poppins">
                {activeProduct.ingredients?.slice(0, 3).map((ing, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-brand-accent rounded-full" />
                    <span className="font-semibold">{ing.name}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Nutritional Preview */}
            <div className="space-y-1.5">
              <span className="text-xs text-brand-textMuted font-poppins block">
                Quick Facts
              </span>
              <div className="grid grid-cols-2 gap-2 text-[10px] font-bold font-montserrat text-white/70">
                <div className="bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/5">
                  CAL: {activeProduct.nutrition?.calories}
                </div>
                <div className="bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/5">
                  CAFF: {activeProduct.nutrition?.caffeine}
                </div>
              </div>
            </div>
            
          </div>

        </div>
      </div>
    </section>
  );
}
