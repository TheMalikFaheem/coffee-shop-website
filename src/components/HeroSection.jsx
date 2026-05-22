import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bean, Compass, Flame, ChevronRight } from 'lucide-react';
import CoffeeCup from './CoffeeCup';
import CoffeeBeans from './CoffeeBeans';
import { Link } from './Router';

export default function HeroSection({ activeProduct }) {

  const renderStrength = (strength) => (
    <div className="flex gap-1.5 items-center">
      {Array.from({ length: 5 }).map((_, i) => (
        <Bean
          key={i}
          size={14}
          className={`transition-all duration-500 ${
            i < strength
              ? 'text-brand-primary fill-brand-primary drop-shadow-sm scale-110'
              : 'text-brand-primary/20'
          }`}
        />
      ))}
    </div>
  );

  return (
    <section className="w-full min-h-screen pt-36 pb-20 flex items-center justify-center overflow-hidden relative select-none bg-cream-gradient">
      
      {/* Ambient cream blur orbs */}
      <div className="absolute top-1/4 left-1/5 w-[500px] h-[500px] bg-brand-caramel/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/5 w-[400px] h-[400px] bg-brand-primary/8 rounded-full blur-[100px] pointer-events-none" />

      {/* Floating decorative coffee beans */}
      <CoffeeBeans count={7} lightMode={true} />

      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 items-center w-full">

          {/* COLUMN 1: Editorial Copy */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left space-y-7 order-2 lg:order-1">
            
            {/* Origin & Roast pills */}
            <div className="flex items-center gap-2.5 flex-wrap">
              {activeProduct.origin && (
                <span className="flex items-center gap-1.5 px-3.5 py-1.5 bg-brand-beige border border-brand-primary/20 rounded-full text-xs font-bold font-montserrat uppercase tracking-wider text-brand-primary shadow-warm-sm">
                  <Compass size={11} />
                  {activeProduct.origin}
                </span>
              )}
              {activeProduct.roast && (
                <span className="flex items-center gap-1.5 px-3.5 py-1.5 bg-brand-beige border border-brand-primary/15 rounded-full text-xs font-bold font-montserrat uppercase tracking-wider text-brand-muted">
                  <Flame size={11} />
                  {activeProduct.roast}
                </span>
              )}
            </div>

            {/* Title block */}
            <div className="space-y-3">
              <p className="text-xs font-bold tracking-[0.3em] text-brand-caramel uppercase font-montserrat">
                {activeProduct.subtitle}
              </p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-playfair font-bold text-brand-dark leading-[0.95] tracking-tight">
                {activeProduct.name.split(' ').slice(0, -1).join(' ')}
                <span className="block text-brand-primary italic">
                  {activeProduct.name.split(' ').pop()}
                </span>
              </h1>
              <div className="w-16 h-0.5 bg-brand-caramel/50 rounded-full mt-3" />
            </div>

            {/* Description */}
            <p className="text-brand-muted text-sm md:text-base font-poppins leading-relaxed max-w-md">
              {activeProduct.description}
            </p>

            {/* Flavor notes */}
            <div className="space-y-2.5">
              <span className="text-[10px] font-bold tracking-[0.25em] text-brand-caramel/80 font-montserrat uppercase block">
                Flavor Profiles
              </span>
              <div className="flex flex-wrap gap-2">
                {activeProduct.flavorNotes?.map((note, i) => (
                  <span
                    key={i}
                    className="text-xs px-3.5 py-1.5 rounded-full bg-brand-primary/8 border border-brand-primary/20 text-brand-primary font-poppins font-medium"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-1">
              <Link
                href={`/menu/${activeProduct.slug}`}
                id="hero-explore-cta"
                className="glow-btn inline-flex items-center gap-2.5 bg-brand-primary hover:bg-brand-mocha text-brand-cream px-8 py-4 rounded-full font-bold font-montserrat text-xs tracking-widest shadow-warm-md transition-all duration-300 group"
              >
                EXPLORE RECIPE
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>

          {/* COLUMN 2: Floating Coffee Cup */}
          <div className="lg:col-span-4 relative flex items-center justify-center min-h-[340px] md:min-h-[460px] order-1 lg:order-2">
            
            {/* Soft glowing background oval */}
            <motion.div
              key={`bg-${activeProduct.id}`}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="absolute w-[260px] h-[340px] md:w-[300px] md:h-[400px] bg-gradient-to-b from-brand-beige to-brand-latte rounded-[60px] shadow-warm-xl z-0"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-brand-caramel/20 via-transparent to-brand-cream/30 rounded-[60px]" />
            </motion.div>

            {/* Watermark text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={`mark-${activeProduct.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-stroke-warm text-8xl md:text-9xl font-black font-playfair tracking-widest uppercase opacity-20 rotate-90 translate-x-24"
                >
                  {activeProduct.bannerText}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Coffee cup */}
            <div className="relative z-10 w-full flex justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`cup-${activeProduct.id}`}
                  initial={{ scale: 0.65, rotate: -30, opacity: 0 }}
                  animate={{ scale: 1, rotate: activeProduct.rotation, opacity: 1 }}
                  exit={{ scale: 0.65, rotate: 30, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 90, damping: 14 }}
                >
                  <CoffeeCup
                    size="w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80"
                    rotation={activeProduct.rotation}
                    animateFloat={true}
                    hoverScale={1.06}
                    shadow={true}
                    imgFilter={activeProduct.imgFilter}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Warm ambient glow */}
            <div className="absolute w-[300px] h-[300px] bg-brand-caramel/15 rounded-full blur-[80px] pointer-events-none z-0" />
          </div>

          {/* COLUMN 3: Spec Sheet Panel */}
          <div className="lg:col-span-3 flex flex-col space-y-5 order-3 justify-center bg-white/60 border border-brand-primary/12 rounded-3xl p-6 backdrop-blur-md shadow-warm-md">
            
            <div>
              <span className="text-[9px] tracking-[0.22em] font-extrabold text-brand-caramel font-montserrat uppercase block">
                Spec Sheet
              </span>
              <h3 className="text-base font-playfair font-bold text-brand-dark mt-0.5">
                Blend Profile
              </h3>
              <div className="w-8 h-0.5 bg-brand-primary/40 mt-1.5" />
            </div>

            {/* Strength */}
            <div className="space-y-1.5 border-b border-brand-primary/8 pb-4">
              <span className="text-[10px] text-brand-muted font-poppins block">
                Caffeine / Roast Strength
              </span>
              {renderStrength(activeProduct.strength)}
            </div>

            {/* Serving */}
            <div className="space-y-1 border-b border-brand-primary/8 pb-4">
              <span className="text-[10px] text-brand-muted font-poppins block">
                Serving Style
              </span>
              <span className="text-sm font-bold text-brand-dark font-montserrat uppercase tracking-wide block">
                {activeProduct.servingStyle}
              </span>
            </div>

            {/* Key ingredients */}
            <div className="space-y-2 border-b border-brand-primary/8 pb-4">
              <span className="text-[10px] text-brand-muted font-poppins block">
                Key Elements
              </span>
              <ul className="text-xs space-y-1.5 text-brand-dark/85 font-poppins">
                {activeProduct.ingredients?.slice(0, 3).map((ing, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-brand-caramel rounded-full shrink-0" />
                    <span className="font-medium">{ing.name}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick facts */}
            <div className="space-y-1.5">
              <span className="text-[10px] text-brand-muted font-poppins block">
                Quick Facts
              </span>
              <div className="grid grid-cols-2 gap-2 text-[10px] font-bold font-montserrat text-brand-muted">
                <div className="bg-brand-beige px-2.5 py-2 rounded-xl border border-brand-primary/10 text-brand-dark">
                  <div className="text-[8px] text-brand-muted mb-0.5">CAL</div>
                  {activeProduct.nutrition?.calories}
                </div>
                <div className="bg-brand-beige px-2.5 py-2 rounded-xl border border-brand-primary/10 text-brand-dark">
                  <div className="text-[8px] text-brand-muted mb-0.5">CAFF</div>
                  {activeProduct.nutrition?.caffeine}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
