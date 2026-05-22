import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Compass, Flame, Coffee, Info, Bean, ZoomIn } from 'lucide-react';
import { Link } from './Router';
import CoffeeCup from './CoffeeCup';
import { getMenuItemBySlug } from '../data/coffeeDb';

export default function MenuDetailView({ slug }) {
  const item = getMenuItemBySlug(slug);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showStickyPanel, setShowStickyPanel] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowStickyPanel(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!item) {
    return (
      <div className="min-h-screen bg-cream-gradient text-brand-dark flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-5 max-w-sm">
          <Info size={48} className="text-brand-caramel mx-auto animate-bounce" />
          <h2 className="text-2xl font-playfair font-bold text-brand-dark">Recipe Not Found</h2>
          <p className="text-brand-muted text-sm font-poppins">
            This specialty drink is not currently in our seasonal showcase.
          </p>
          <Link href="/menu" className="inline-block mt-4 px-7 py-3 bg-brand-primary text-brand-cream text-xs font-bold font-montserrat tracking-widest rounded-full uppercase shadow-warm-sm hover:bg-brand-mocha transition-colors duration-300">
            Back to Menu
          </Link>
        </div>
      </div>
    );
  }

  const galleryImages = [
    { src: '/coffee.png', label: 'Primary Blend',   filter: item.imgFilter },
    { src: '/coffee.png', label: 'Roast Profile',   filter: `${item.imgFilter} saturate(1.4) contrast(1.15)` },
    { src: '/coffee.png', label: 'Pour & Texture',  filter: `${item.imgFilter} hue-rotate(15deg) brightness(1.05)` },
  ];

  return (
    <div className="min-h-screen bg-cream-gradient text-brand-dark pt-28 pb-36 px-4 relative select-none overflow-hidden">
      
      {/* Ambient background orbs */}
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-brand-latte/60 to-transparent z-0 pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-brand-caramel/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-brand-primary/6 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Back Nav */}
        <div className="mb-12">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-xs font-bold font-montserrat text-brand-muted hover:text-brand-primary uppercase tracking-wider transition-colors duration-300"
          >
            <ArrowLeft size={14} />
            Back to Menu
          </Link>
        </div>

        {/* 1. CINEMATIC HERO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-28">

          {/* Left: Editorial content */}
          <div className="lg:col-span-4 space-y-6 text-left">
            <div className="space-y-2.5">
              <span className="text-xs font-bold tracking-[0.25em] text-brand-caramel uppercase font-montserrat block">
                {item.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-playfair font-bold text-brand-dark leading-tight">
                {item.name}
              </h1>
              <div className="w-12 h-0.5 bg-brand-caramel/50 rounded-full mt-2" />
            </div>

            <div className="flex flex-wrap gap-2.5">
              {item.origin && (
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-beige border border-brand-primary/20 rounded-full text-xs font-bold font-montserrat text-brand-primary uppercase tracking-wider">
                  <Compass size={11} />
                  {item.origin}
                </span>
              )}
              {item.roast && (
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-beige border border-brand-primary/12 rounded-full text-xs font-bold font-montserrat text-brand-muted uppercase tracking-wider">
                  <Flame size={11} />
                  {item.roast}
                </span>
              )}
            </div>

            <p className="text-brand-muted text-sm font-poppins leading-relaxed">
              {item.description}
            </p>

            <div className="space-y-2.5 pt-4 border-t border-brand-primary/10">
              <span className="text-[10px] font-bold tracking-widest text-brand-caramel font-montserrat uppercase block">
                Flavor Palette
              </span>
              <div className="flex flex-wrap gap-2">
                {item.flavorNotes?.map((note, i) => (
                  <span key={i} className="text-xs px-3.5 py-1.5 rounded-full bg-brand-primary/8 border border-brand-primary/20 text-brand-primary font-poppins font-medium">
                    {note}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Center: Cinematic Cup */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center relative min-h-[320px] md:min-h-[380px]">
            <div className="absolute w-[260px] h-[340px] bg-gradient-to-b from-brand-beige to-brand-latte rounded-[60px] shadow-warm-xl z-0" />
            <div className="absolute w-[300px] h-[300px] bg-brand-caramel/15 rounded-full blur-[70px] pointer-events-none z-0" />
            
            <div className="relative z-10">
              <CoffeeCup
                size="w-64 h-64 md:w-72 md:h-72"
                rotation={item.rotation}
                animateFloat={true}
                hoverScale={1.05}
                shadow={false}
                imgFilter={galleryImages[activeImageIndex].filter}
              />
            </div>

            <span className="text-stroke-warm text-8xl font-black font-playfair uppercase tracking-widest absolute opacity-15 select-none pointer-events-none z-0 rotate-90 translate-x-24">
              {item.bannerText}
            </span>
          </div>

          {/* Right: Barista Notes Panel */}
          <div className="lg:col-span-4 bg-white/65 border border-brand-primary/12 rounded-3xl p-8 space-y-6 text-left backdrop-blur-md shadow-warm-md">
            <div>
              <span className="text-[9px] tracking-widest font-extrabold text-brand-caramel font-montserrat uppercase block">
                Serving Detail
              </span>
              <h3 className="text-lg font-playfair font-bold text-brand-dark mt-0.5">
                Barista Notes
              </h3>
              <div className="w-8 h-0.5 bg-brand-primary/35 mt-1.5" />
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold font-montserrat uppercase tracking-wider text-brand-muted block">
                  Presentation Style
                </span>
                <p className="text-sm font-semibold font-poppins text-brand-dark">
                  {item.servingStyle}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold font-montserrat uppercase tracking-wider text-brand-muted block">
                  Roast Intensity
                </span>
                <div className="flex items-center gap-1.5 mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Bean
                      key={i}
                      size={13}
                      className={i < item.strength ? 'text-brand-primary fill-brand-primary' : 'text-brand-primary/20'}
                    />
                  ))}
                  <span className="text-xs font-bold text-brand-muted ml-2 font-poppins">({item.strength}/5)</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-brand-primary/10">
                {[
                  { label: 'Energy',   value: item.nutrition.calories },
                  { label: 'Caffeine', value: item.nutrition.caffeine },
                  { label: 'Sugar',    value: item.nutrition.sugar },
                  { label: 'Fat',      value: item.nutrition.fat },
                ].map((stat, i) => (
                  <div key={i} className="bg-brand-beige p-3 rounded-2xl border border-brand-primary/10">
                    <span className="text-[9px] font-bold font-montserrat uppercase tracking-wider text-brand-muted block">
                      {stat.label}
                    </span>
                    <span className="text-sm font-black font-montserrat text-brand-dark">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* 2. GALLERY */}
        <div className="mb-24 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold tracking-[0.25em] text-brand-caramel uppercase font-montserrat block">Gallery</span>
            <h2 className="text-2xl font-playfair font-bold text-brand-dark">Visual Study</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {galleryImages.map((img, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                className={`group bg-white/65 border rounded-3xl p-6 flex flex-col items-center justify-between cursor-pointer transition-all duration-300 shadow-warm-sm ${
                  activeImageIndex === i
                    ? 'border-brand-primary bg-white/85 shadow-warm-md'
                    : 'border-brand-primary/12 hover:border-brand-primary/35'
                }`}
                onClick={() => setActiveImageIndex(i)}
              >
                <div className="relative w-full h-32 flex items-center justify-center bg-brand-latte/50 rounded-2xl overflow-hidden mb-4 border border-brand-primary/8">
                  <img
                    src={img.src}
                    alt={img.label}
                    className="w-24 h-24 object-contain transition-transform duration-300 group-hover:scale-110"
                    style={{ filter: img.filter }}
                  />
                  <div className="absolute top-2 right-2 p-1.5 bg-brand-primary/10 rounded-full text-brand-muted group-hover:text-brand-primary transition-colors duration-300">
                    <ZoomIn size={12} />
                  </div>
                </div>
                <span className="text-[10px] font-bold font-montserrat uppercase tracking-wider text-brand-dark">
                  {img.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 3. INGREDIENTS */}
        <div className="mb-24 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold tracking-[0.25em] text-brand-caramel uppercase font-montserrat block">Elements</span>
            <h2 className="text-2xl md:text-3xl font-playfair font-bold text-brand-dark">Sourced Ingredients</h2>
            <div className="w-10 h-0.5 bg-brand-caramel/50 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {item.ingredients.map((ing, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white/65 border border-brand-primary/12 rounded-2xl p-6 text-left flex flex-col justify-between space-y-4 hover:border-brand-primary/35 hover:shadow-warm-sm transition-all duration-300 backdrop-blur-sm"
              >
                <div className="space-y-3">
                  <span className="px-2.5 py-1 text-[8px] font-extrabold font-montserrat tracking-wider uppercase bg-brand-caramel/12 border border-brand-caramel/25 rounded-full text-brand-caramel">
                    {ing.type}
                  </span>
                  <h4 className="font-playfair font-bold text-brand-dark text-base leading-tight">
                    {ing.name}
                  </h4>
                </div>
                <div>
                  <div className="text-xs font-bold text-brand-primary font-montserrat mb-1">
                    Portion: <span className="text-brand-muted font-semibold font-poppins">{ing.amount}</span>
                  </div>
                  <p className="text-[10px] text-brand-muted font-poppins leading-relaxed">
                    {ing.note}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 4. PREPARATION TIMELINE */}
        <div className="mb-12 max-w-3xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold tracking-[0.25em] text-brand-caramel uppercase font-montserrat block">Method</span>
            <h2 className="text-2xl md:text-3xl font-playfair font-bold text-brand-dark">Preparation Steps</h2>
            <div className="w-10 h-0.5 bg-brand-caramel/50 mx-auto rounded-full" />
          </div>

          <div className="relative border-l-2 border-brand-primary/15 ml-4 md:ml-6 space-y-8 py-2 text-left">
            {item.preparation.map((prep, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-8 md:pl-10 group"
              >
                <div className="absolute -left-4 w-8 h-8 rounded-full bg-brand-cream border-2 border-brand-primary flex items-center justify-center font-montserrat font-black text-xs text-brand-primary group-hover:bg-brand-primary group-hover:text-brand-cream transition-all duration-300 z-10 shadow-warm-sm">
                  {prep.step}
                </div>
                <div className="bg-white/65 border border-brand-primary/12 rounded-2xl p-5 hover:border-brand-primary/30 hover:shadow-warm-sm transition-all duration-300 backdrop-blur-sm">
                  <p className="text-xs md:text-sm font-poppins text-brand-dark leading-relaxed">
                    {prep.action}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      {/* 5. STICKY BOTTOM PANEL */}
      <AnimatePresence>
        {showStickyPanel && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            className="fixed bottom-5 left-4 right-4 max-w-4xl mx-auto z-40 bg-[#F6F1EA]/90 backdrop-blur-2xl border border-brand-primary/20 rounded-full px-6 py-3.5 flex items-center justify-between shadow-warm-xl"
          >
            {/* Left: Identity */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center shrink-0 shadow-warm-sm">
                <Coffee size={17} className="text-brand-cream" />
              </div>
              <div className="hidden sm:block">
                <h4 className="font-playfair font-bold text-sm text-brand-dark line-clamp-1">
                  {item.name}
                </h4>
                {(item.origin || item.roast) && (
                  <p className="text-[9px] font-poppins font-medium text-brand-muted uppercase tracking-wider">
                    {[item.origin?.split(' ')[0], item.roast?.split(' ')[0]].filter(Boolean).join(' / ')}
                  </p>
                )}
              </div>
            </div>

            {/* Center: Stats */}
            <div className="flex gap-5 md:gap-8 items-center justify-center mx-4 overflow-hidden">
              <div className="flex flex-col items-center border-r border-brand-primary/15 pr-5 shrink-0">
                <span className="text-[8px] font-bold font-montserrat uppercase tracking-wider text-brand-muted block mb-0.5">Strength</span>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Bean key={i} size={9} className={i < item.strength ? 'text-brand-primary fill-brand-primary' : 'text-brand-primary/20'} />
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center border-r border-brand-primary/15 pr-5 shrink-0">
                <span className="text-[8px] font-bold font-montserrat uppercase tracking-wider text-brand-muted block mb-0.5">Calories</span>
                <span className="text-[10px] font-black font-montserrat text-brand-dark">{item.nutrition.calories}</span>
              </div>
              <div className="flex flex-col items-center shrink-0">
                <span className="text-[8px] font-bold font-montserrat uppercase tracking-wider text-brand-muted block mb-0.5">Caffeine</span>
                <span className="text-[10px] font-black font-montserrat text-brand-dark">{item.nutrition.caffeine}</span>
              </div>
            </div>

            {/* Right: Back button */}
            <Link
              href="/menu"
              className="px-5 py-2.5 bg-brand-primary hover:bg-brand-mocha text-brand-cream text-[10px] font-bold font-montserrat tracking-widest rounded-full uppercase transition-all duration-300 shadow-warm-sm flex items-center gap-1.5 shrink-0"
            >
              ← MENU
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
