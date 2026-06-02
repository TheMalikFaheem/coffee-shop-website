import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bean, Compass, Flame, ChevronRight, ChevronDown } from 'lucide-react';
import CoffeeCup from './CoffeeCup';
import CoffeeBeans from './CoffeeBeans';
import { Link } from './Router';

// Animated steam wisps rendered as SVG paths
function SteamWisps() {
  return (
    <div className="absolute bottom-[calc(100%+10px)] left-1/2 -translate-x-1/2 w-32 h-20 pointer-events-none z-20">
      <svg viewBox="0 0 120 80" className="w-full h-full overflow-visible">
        {/* Wisp 1 */}
        <path
          d="M 40,75 C 40,60 50,55 45,40 C 40,25 50,20 48,5"
          fill="none"
          stroke="rgba(246,241,234,0.55)"
          strokeWidth="3"
          strokeLinecap="round"
          className="animate-steam"
          style={{ filter: 'blur(1.5px)' }}
        />
        {/* Wisp 2 */}
        <path
          d="M 60,75 C 58,60 68,52 62,38 C 56,24 66,16 62,2"
          fill="none"
          stroke="rgba(246,241,234,0.40)"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="animate-steam-delayed"
          style={{ filter: 'blur(1.5px)' }}
        />
        {/* Wisp 3 */}
        <path
          d="M 78,75 C 80,60 70,54 76,40 C 82,26 72,18 76,4"
          fill="none"
          stroke="rgba(246,241,234,0.30)"
          strokeWidth="2"
          strokeLinecap="round"
          className="animate-steam-delayed2"
          style={{ filter: 'blur(1.5px)' }}
        />
      </svg>
    </div>
  );
}

// Animated stat counter
function StatCounter({ value, label, delay = 0 }) {
  const [displayed, setDisplayed] = useState(0);
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const target = parseInt(value.replace(/\D/g, ''));
    let start = 0;
    const duration = 1400;
    const startTime = performance.now();
    const tick = (now) => {
      const elapsed = now - startTime - delay * 1000;
      if (elapsed < 0) { requestAnimationFrame(tick); return; }
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value, delay]);

  const suffix = value.replace(/[0-9]/g, '');

  return (
    <div ref={ref} className="flex flex-col items-center gap-1">
      <span className="font-playfair font-black text-2xl md:text-3xl text-brand-primary tracking-tight">
        {displayed}{suffix}
      </span>
      <span className="text-[10px] font-bold font-montserrat uppercase tracking-[0.2em] text-brand-muted">
        {label}
      </span>
    </div>
  );
}

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

export default function HeroSection({ activeProduct }) {
  const cupContainerRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Parallax tilt on mouse move
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!cupContainerRef.current) return;
      const rect = cupContainerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      setTilt({ x: -dy * 8, y: dx * 8 });
    };
    const reset = () => setTilt({ x: 0, y: 0 });
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', reset);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', reset);
    };
  }, []);

  return (
    <section className="w-full min-h-screen pt-36 pb-20 flex items-center justify-center overflow-hidden relative select-none bg-cream-gradient">
      
      {/* Drifting ambient orbs */}
      <div className="absolute top-1/4 left-[15%] w-[560px] h-[560px] bg-brand-caramel/10 rounded-full blur-[130px] pointer-events-none animate-drift-slow" />
      <div className="absolute bottom-1/4 right-[12%] w-[420px] h-[420px] bg-brand-primary/8 rounded-full blur-[110px] pointer-events-none animate-drift-slow-alt" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-brand-gold/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Floating decorative coffee beans */}
      <CoffeeBeans count={8} lightMode={true} />

      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 items-center w-full">

          {/* COLUMN 1: Editorial Copy */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left space-y-7 order-2 lg:order-1">
            
            {/* Origin & Roast pills */}
            <motion.div
              key={`pills-${activeProduct.id}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2.5 flex-wrap"
            >
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
            </motion.div>

            {/* Title block */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`title-${activeProduct.id}`}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
                className="space-y-3"
              >
                <p className="text-xs font-bold tracking-[0.3em] text-brand-caramel uppercase font-montserrat">
                  {activeProduct.subtitle}
                </p>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-playfair font-bold text-brand-dark leading-[0.95] tracking-tight">
                  {activeProduct.name.split(' ').slice(0, -1).join(' ')}
                  <span className="block text-gradient-gold italic">
                    {activeProduct.name.split(' ').pop()}
                  </span>
                </h1>
                <div className="w-16 h-0.5 bg-gradient-to-r from-brand-caramel to-transparent rounded-full mt-3" />
              </motion.div>
            </AnimatePresence>

            {/* Description */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`desc-${activeProduct.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-brand-muted text-sm md:text-base font-poppins leading-relaxed max-w-md"
              >
                {activeProduct.description}
              </motion.p>
            </AnimatePresence>

            {/* Flavor notes */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`flavor-${activeProduct.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="space-y-2.5"
              >
                <span className="text-[10px] font-bold tracking-[0.25em] text-brand-caramel/80 font-montserrat uppercase block">
                  Flavor Profiles
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeProduct.flavorNotes?.map((note, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.07 + 0.2 }}
                      className="text-xs px-3.5 py-1.5 rounded-full bg-brand-primary/8 border border-brand-primary/20 text-brand-primary font-poppins font-medium"
                    >
                      {note}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* CTA */}
            <div className="pt-1 flex items-center gap-4">
              <Link
                href={`/menu/${activeProduct.slug}`}
                id="hero-explore-cta"
                className="glow-btn inline-flex items-center gap-2.5 bg-brand-primary hover:bg-brand-mocha text-brand-cream px-8 py-4 rounded-full font-bold font-montserrat text-xs tracking-widest shadow-warm-md transition-all duration-300 group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2.5">
                  EXPLORE RECIPE
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-brand-caramel/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
              </Link>

              {/* Stat mini pills */}
              <div className="hidden sm:flex gap-3">
                <div className="text-center">
                  <div className="font-playfair font-bold text-lg text-brand-primary">{activeProduct.nutrition?.calories}</div>
                  <div className="text-[9px] font-montserrat font-bold text-brand-muted uppercase tracking-wider">Cal</div>
                </div>
                <div className="w-px h-8 bg-brand-primary/15 self-center" />
                <div className="text-center">
                  <div className="font-playfair font-bold text-lg text-brand-primary">{activeProduct.nutrition?.caffeine}</div>
                  <div className="text-[9px] font-montserrat font-bold text-brand-muted uppercase tracking-wider">Caffeine</div>
                </div>
              </div>
            </div>

            {/* Hero stats row */}
            <div className="flex gap-8 pt-2 border-t border-brand-primary/10">
              <StatCounter value="142+" label="Blends" delay={0} />
              <StatCounter value="8" label="Origins" delay={0.15} />
              <StatCounter value="4.9★" label="Rating" delay={0.3} />
            </div>
          </div>

          {/* COLUMN 2: Floating Coffee Cup with parallax tilt */}
          <div
            ref={cupContainerRef}
            className="lg:col-span-4 relative flex items-center justify-center min-h-[340px] md:min-h-[460px] order-1 lg:order-2"
            style={{ perspective: '800px' }}
          >
            
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

            {/* Coffee cup with parallax tilt */}
            <div
              className="relative z-10 w-full flex justify-center flex-col items-center"
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: 'transform 0.15s ease-out',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Steam wisps above cup */}
              <div className="relative">
                <SteamWisps />
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
            </div>

            {/* Warm ambient glow */}
            <div className="absolute w-[300px] h-[300px] bg-brand-caramel/15 rounded-full blur-[80px] pointer-events-none z-0 animate-pulse-soft" />
          </div>

          {/* COLUMN 3: Spec Sheet Panel — glassmorphic */}
          <div className="lg:col-span-3 flex flex-col space-y-5 order-3 justify-center glass-dark rounded-3xl p-6 shadow-warm-md border border-brand-caramel/20 relative overflow-hidden">
            {/* Gold accent line top */}
            <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-brand-caramel/60 to-transparent" />

            <div>
              <span className="text-[9px] tracking-[0.22em] font-extrabold text-brand-caramel font-montserrat uppercase block">
                Spec Sheet
              </span>
              <h3 className="text-base font-playfair font-bold text-brand-cream mt-0.5">
                Blend Profile
              </h3>
              <div className="w-8 h-0.5 bg-brand-caramel/40 mt-1.5" />
            </div>

            {/* Strength */}
            <div className="space-y-1.5 border-b border-brand-cream/8 pb-4">
              <span className="text-[10px] text-brand-cream/50 font-poppins block">
                Caffeine / Roast Strength
              </span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`str-${activeProduct.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex gap-1.5 items-center"
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Bean
                      key={i}
                      size={14}
                      className={`transition-all duration-500 ${
                        i < activeProduct.strength
                          ? 'text-brand-caramel fill-brand-caramel scale-110'
                          : 'text-brand-cream/15'
                      }`}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Serving */}
            <div className="space-y-1 border-b border-brand-cream/8 pb-4">
              <span className="text-[10px] text-brand-cream/50 font-poppins block">
                Serving Style
              </span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={`serve-${activeProduct.id}`}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-sm font-bold text-brand-cream font-montserrat uppercase tracking-wide block"
                >
                  {activeProduct.servingStyle}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Key ingredients */}
            <div className="space-y-2 border-b border-brand-cream/8 pb-4">
              <span className="text-[10px] text-brand-cream/50 font-poppins block">
                Key Elements
              </span>
              <ul className="text-xs space-y-1.5 text-brand-cream/80 font-poppins">
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
              <span className="text-[10px] text-brand-cream/50 font-poppins block">
                Quick Facts
              </span>
              <div className="grid grid-cols-2 gap-2 text-[10px] font-bold font-montserrat">
                <div className="bg-brand-cream/8 px-2.5 py-2 rounded-xl border border-brand-cream/10 text-brand-cream">
                  <div className="text-[8px] text-brand-cream/40 mb-0.5">CAL</div>
                  {activeProduct.nutrition?.calories}
                </div>
                <div className="bg-brand-cream/8 px-2.5 py-2 rounded-xl border border-brand-cream/10 text-brand-cream">
                  <div className="text-[8px] text-brand-cream/40 mb-0.5">CAFF</div>
                  {activeProduct.nutrition?.caffeine}
                </div>
              </div>
            </div>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-brand-caramel/60 to-transparent" />
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-brand-muted z-10"
      >
        <span className="text-[9px] font-montserrat font-bold uppercase tracking-[0.3em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} className="text-brand-caramel" />
        </motion.div>
      </motion.div>
    </section>
  );
}
