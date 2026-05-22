import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Compass, Flame, Leaf, Coffee, Info, Tag, Layers, Bean, Calendar, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { Link, useRouter } from './Router';
import CoffeeCup from './CoffeeCup';
import { getMenuItemBySlug } from '../data/coffeeDb';

export default function MenuDetailView({ slug }) {
  const { navigate } = useRouter();
  const item = getMenuItemBySlug(slug);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showStickyPanel, setShowStickyPanel] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Scroll handler to toggle bottom sticky panel visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setShowStickyPanel(true);
      } else {
        setShowStickyPanel(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!item) {
    return (
      <div className="min-h-screen bg-[#032B2B] text-white flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-sm">
          <Info size={48} className="text-brand-accent mx-auto animate-bounce" />
          <h2 className="text-2xl font-bold font-montserrat uppercase">Recipe Not Found</h2>
          <p className="text-brand-textMuted text-sm font-poppins">
            The specialty drink you are looking for does not exist in our current seasonal showcase.
          </p>
          <Link href="/menu" className="inline-block mt-4 px-6 py-2.5 bg-brand-primary text-white text-xs font-bold font-montserrat tracking-widest rounded-full uppercase">
            Back to Menu
          </Link>
        </div>
      </div>
    );
  }

  // Generate mock gallery close-ups using filters on our primary PNG to maintain single visual identity
  const galleryImages = [
    { src: '/coffee.png', label: 'Primary Blend', filter: item.imgFilter },
    { src: '/coffee.png', label: 'Roast Profile', filter: `${item.imgFilter} saturate(1.4) contrast(1.15)` },
    { src: '/coffee.png', label: 'Pour & Texture', filter: `${item.imgFilter} hue-rotate-[15deg] brightness(1.05)` },
  ];

  return (
    <div className="min-h-screen bg-[#032B2B] text-white pt-28 pb-32 px-4 relative select-none">
      
      {/* Background elements */}
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-[#021A1A] to-transparent z-0" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Navigation & Header */}
        <div className="mb-12">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-xs font-bold font-montserrat text-brand-textMuted hover:text-white uppercase tracking-wider transition-colors duration-300"
          >
            <ArrowLeft size={14} />
            Back to Catalog
          </Link>
        </div>

        {/* 1. CINEMATIC HERO AREA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          
          {/* Left Side Content (5 cols) */}
          <div className="lg:col-span-4 space-y-6 text-left">
            <div className="space-y-2">
              <span className="text-xs font-bold tracking-[0.2em] text-brand-accent uppercase font-montserrat block">
                {item.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-black font-montserrat uppercase tracking-tight text-white leading-none">
                {item.name}
              </h1>
              <div className="w-16 h-1 bg-brand-primary rounded-full mt-2" />
            </div>

            <div className="flex flex-wrap gap-2.5">
              <span className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-bold font-montserrat text-brand-accent uppercase tracking-wider">
                <Compass size={12} />
                {item.origin}
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-bold font-montserrat text-brand-textMuted uppercase tracking-wider">
                <Flame size={12} />
                {item.roast}
              </span>
            </div>

            <p className="text-brand-textMuted text-sm font-poppins leading-relaxed">
              {item.description}
            </p>

            <div className="space-y-2.5 pt-4 border-t border-white/5">
              <span className="text-xs font-bold tracking-widest text-brand-accent font-montserrat uppercase block">
                Flavor Palette
              </span>
              <div className="flex flex-wrap gap-2">
                {item.flavorNotes?.map((note, index) => (
                  <span
                    key={index}
                    className="text-xs px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-light font-poppins font-medium"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Center Cinematic Coffee Cup (4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center relative min-h-[300px] md:min-h-[350px]">
            <div className={`absolute w-[240px] h-[320px] ${item.shapeBg} rounded-[50px] opacity-80 shadow-[0_20px_50px_rgba(0,0,0,0.4)] blur-[2px] z-0`} />
            
            {/* Visual shine circle */}
            <div className="absolute w-[280px] h-[280px] bg-brand-accent/20 rounded-full blur-[70px] pointer-events-none z-0" />
            
            <div className="relative z-10">
              <CoffeeCup
                size="w-64 h-64 md:w-72 h-72"
                rotation={item.rotation}
                animateFloat={true}
                hoverScale={1.05}
                shadow={true}
                imgFilter={galleryImages[activeImageIndex].filter}
              />
            </div>

            {/* Float Watermark Banner */}
            <span className="text-stroke text-8xl font-black font-montserrat uppercase tracking-widest absolute opacity-10 select-none pointer-events-none z-0 rotate-90 translate-x-20">
              {item.bannerText}
            </span>
          </div>

          {/* Right Side Info (4 cols) */}
          <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-[35px] p-8 space-y-6 text-left backdrop-blur-md">
            <div>
              <span className="text-[10px] tracking-widest font-extrabold text-brand-accent font-montserrat uppercase block">
                Serving Detail
              </span>
              <h3 className="text-lg font-bold font-montserrat text-white uppercase">
                Barista Notes
              </h3>
              <div className="w-8 h-0.5 bg-brand-primary mt-1" />
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold font-montserrat uppercase tracking-wider text-brand-textMuted">
                  Presentation Style
                </span>
                <p className="text-sm font-semibold font-poppins text-white">
                  {item.servingStyle}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold font-montserrat uppercase tracking-wider text-brand-textMuted">
                  Roast Intensity
                </span>
                <div className="flex items-center gap-1.5 mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Bean
                      key={i}
                      size={12}
                      className={i < item.strength ? 'text-brand-accent fill-brand-accent drop-shadow-[0_0_2px_rgba(0,168,98,0.5)]' : 'text-white/20'}
                    />
                  ))}
                  <span className="text-xs font-bold text-white/60 ml-2">({item.strength}/5)</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                  <span className="text-[9px] font-bold font-montserrat uppercase tracking-wider text-brand-textMuted block">
                    Energy
                  </span>
                  <span className="text-sm font-black font-montserrat text-white">{item.nutrition.calories}</span>
                </div>
                <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                  <span className="text-[9px] font-bold font-montserrat uppercase tracking-wider text-brand-textMuted block">
                    Caffeine
                  </span>
                  <span className="text-sm font-black font-montserrat text-white">{item.nutrition.caffeine}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 2. IMAGE GALLERY SLIDER */}
        <div className="mb-24 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold font-montserrat uppercase tracking-wider">Visual Gallery</h2>
            <p className="text-xs font-poppins text-brand-textMuted max-w-sm mx-auto">
              Inspect the detail cards, coffee texture, and color notes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {galleryImages.map((img, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                className={`group bg-white/5 border rounded-[28px] p-6 flex flex-col items-center justify-between cursor-pointer transition-all duration-300 ${
                  activeImageIndex === i 
                    ? 'border-brand-accent bg-white/[0.08] shadow-[0_10px_25px_rgba(0,168,98,0.15)]' 
                    : 'border-white/10 hover:border-white/20'
                }`}
                onClick={() => setActiveImageIndex(i)}
              >
                <div className="relative w-full h-32 flex items-center justify-center bg-brand-dark/30 rounded-2xl overflow-hidden mb-4 border border-white/5">
                  <img
                    src={img.src}
                    alt={img.label}
                    className="w-24 h-24 object-contain transition-transform duration-300 group-hover:scale-110"
                    style={{ filter: img.filter }}
                  />
                  <div className="absolute top-2 right-2 p-1.5 bg-black/40 rounded-full text-white/50 group-hover:text-white transition-colors duration-300">
                    <ZoomIn size={12} />
                  </div>
                </div>
                <span className="text-[10px] font-bold font-montserrat uppercase tracking-wider text-white">
                  {img.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 3. INGREDIENTS CARDS SECTION */}
        <div className="mb-24 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold tracking-[0.2em] text-brand-accent uppercase font-montserrat">
              Elements
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold font-montserrat uppercase tracking-wider text-white">
              Sourced Ingredients
            </h2>
            <div className="w-12 h-1 bg-brand-primary mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {item.ingredients.map((ing, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 text-left flex flex-col justify-between space-y-4 hover:border-brand-primary/30 transition-all duration-300"
              >
                <div className="space-y-3">
                  <span className="px-2 py-0.5 text-[8px] font-extrabold font-montserrat tracking-wider uppercase bg-brand-accent/15 border border-brand-accent/30 rounded text-brand-accent">
                    {ing.type}
                  </span>
                  <h4 className="font-montserrat font-bold text-white text-base leading-tight">
                    {ing.name}
                  </h4>
                </div>
                <div>
                  <div className="text-xs font-bold text-brand-light font-montserrat mb-1">
                    Portion: <span className="text-white/60 font-semibold font-poppins">{ing.amount}</span>
                  </div>
                  <p className="text-[10px] text-brand-textMuted font-poppins leading-relaxed">
                    {ing.note}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 4. PREPARATION TIMELINE SECTION */}
        <div className="mb-12 max-w-3xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold tracking-[0.2em] text-brand-accent uppercase font-montserrat">
              Method
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold font-montserrat uppercase tracking-wider text-white">
              Preparation Steps
            </h2>
            <div className="w-12 h-1 bg-brand-primary mx-auto rounded-full" />
          </div>

          {/* Timeline Grid */}
          <div className="relative border-l border-white/10 ml-4 md:ml-6 space-y-8 text-left py-2">
            {item.preparation.map((prep, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-8 md:pl-10 group"
              >
                {/* Timeline node number bullet */}
                <div className="absolute -left-4 w-8 h-8 rounded-full bg-brand-dark border-2 border-brand-primary flex items-center justify-center font-montserrat font-black text-xs text-brand-accent group-hover:border-brand-accent transition-colors duration-300 z-10 shadow-[0_0_10px_rgba(0,130,72,0.3)]">
                  {prep.step}
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-brand-primary/20 transition-all duration-300">
                  <p className="text-xs md:text-sm font-semibold font-poppins text-white/95 leading-relaxed">
                    {prep.action}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      {/* 5. BOTTOM STICKY GLASSMETRIC INFORMATION BAR */}
      <AnimatePresence>
        {showStickyPanel && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="fixed bottom-6 left-4 right-4 max-w-4xl mx-auto z-40 bg-brand-dark/80 backdrop-blur-xl border border-white/15 rounded-full px-6 py-3.5 flex items-center justify-between text-left shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
          >
            {/* Left Block: Drink Identity */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center shrink-0 border border-white/10 shadow-[0_0_10px_rgba(0,130,72,0.3)]">
                <Coffee size={18} className="text-white fill-white/10" />
              </div>
              <div className="hidden sm:block">
                <h4 className="font-montserrat font-black text-xs uppercase tracking-wider text-white line-clamp-1">
                  {item.name}
                </h4>
                <p className="text-[9px] font-poppins font-medium text-brand-textMuted uppercase tracking-wider">
                  {item.origin.split(' ')[0]} / {item.roast.split(' ')[0]}
                </p>
              </div>
            </div>

            {/* Center Block: Stats Grid */}
            <div className="flex gap-4 md:gap-8 items-center justify-center mx-4 overflow-hidden">
              {/* Strength */}
              <div className="flex flex-col items-center justify-center border-r border-white/10 pr-4 shrink-0">
                <span className="text-[8px] font-bold font-montserrat uppercase tracking-wider text-brand-textMuted block mb-0.5">Strength</span>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Bean
                      key={i}
                      size={9}
                      className={i < item.strength ? 'text-brand-accent fill-brand-accent' : 'text-white/20'}
                    />
                  ))}
                </div>
              </div>
              {/* Calories */}
              <div className="flex flex-col items-center justify-center border-r border-white/10 pr-4 shrink-0">
                <span className="text-[8px] font-bold font-montserrat uppercase tracking-wider text-brand-textMuted block mb-0.5">Energy</span>
                <span className="text-[10px] font-black font-montserrat text-white">{item.nutrition.calories}</span>
              </div>
              {/* Caffeine */}
              <div className="flex flex-col items-center justify-center shrink-0">
                <span className="text-[8px] font-bold font-montserrat uppercase tracking-wider text-brand-textMuted block mb-0.5">Caffeine</span>
                <span className="text-[10px] font-black font-montserrat text-white">{item.nutrition.caffeine}</span>
              </div>
            </div>

            {/* Right Block: Back Link Button */}
            <Link
              href="/menu"
              className="px-5 py-2 bg-brand-primary text-white hover:bg-brand-accent text-[10px] font-bold font-montserrat tracking-widest rounded-full uppercase transition-all duration-300 shadow-md flex items-center gap-1.5 shrink-0"
            >
              MENU
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
