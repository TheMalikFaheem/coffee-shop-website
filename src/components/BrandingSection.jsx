import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import CoffeeCup from './CoffeeCup';
import CoffeeBeans from './CoffeeBeans';

const STATS = [
  { value: 500, suffix: 'K+', label: 'Cups Served' },
  { value: 12,  suffix: '',   label: 'Countries' },
  { value: 4.9, suffix: '★',  label: 'Avg Rating', isDecimal: true },
];

function AnimatedCounter({ value, suffix, label, isDecimal, delay = 0 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.6 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const duration = 1600;
    const startTime = performance.now();
    const tick = (now) => {
      const elapsed = now - startTime - delay * 1000;
      if (elapsed < 0) { requestAnimationFrame(tick); return; }
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(isDecimal ? (eased * value).toFixed(1) : Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value, delay, isDecimal]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: delay }}
      className="flex flex-col items-center gap-1.5"
    >
      <span className="font-playfair font-black text-4xl md:text-5xl text-brand-cream tracking-tight">
        {count}{suffix}
      </span>
      <span className="text-[10px] font-bold font-montserrat uppercase tracking-[0.25em] text-brand-caramel/70">
        {label}
      </span>
    </motion.div>
  );
}

export default function BrandingSection() {
  return (
    <section className="relative py-32 overflow-hidden w-full select-none bg-mesh-warm" id="about-brand">
      
      {/* Floating background beans */}
      <CoffeeBeans count={6} lightMode={false} />

      {/* Top gradient fade */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-brand-espresso/60 to-transparent pointer-events-none z-0" />

      {/* Big typography watermark */}
      <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none select-none z-0 overflow-hidden">
        <h2 className="font-playfair font-black text-6xl md:text-8xl lg:text-[130px] uppercase text-center leading-none tracking-wider text-brand-cream/[0.04]">
          UNMATCHED
        </h2>
        <h2 className="font-playfair font-black text-6xl md:text-8xl lg:text-[130px] uppercase text-center leading-none tracking-wider text-brand-cream/[0.03] mt-4">
          QUALITY
        </h2>
      </div>

      {/* Scrolling brand ribbon 1 — forward */}
      <div className="absolute top-[28%] left-0 right-0 h-14 bg-brand-primary/90 flex items-center z-10 origin-center rotate-[-3deg] scale-105 shadow-warm-lg border-y border-brand-caramel/20">
        <div className="w-full overflow-hidden whitespace-nowrap flex py-2 select-none">
          <div className="animate-marquee flex gap-16 text-brand-cream font-montserrat font-black text-lg md:text-xl tracking-widest uppercase">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i}>VERDANT CAFÉ &nbsp;·&nbsp; EST. 2026</span>
            ))}
          </div>
          <div className="animate-marquee flex gap-16 text-brand-cream font-montserrat font-black text-lg md:text-xl tracking-widest uppercase" aria-hidden="true">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i}>VERDANT CAFÉ &nbsp;·&nbsp; EST. 2026</span>
            ))}
          </div>
        </div>
      </div>

      {/* Scrolling brand ribbon 2 — reverse (bottom) */}
      <div className="absolute bottom-[28%] left-0 right-0 h-12 bg-brand-caramel/25 flex items-center z-10 origin-center rotate-[2deg] scale-105 border-y border-brand-caramel/15">
        <div className="w-full overflow-hidden whitespace-nowrap flex py-2 select-none">
          <div className="animate-marquee-reverse flex gap-14 text-brand-cream/70 font-montserrat font-bold text-sm md:text-base tracking-[0.25em] uppercase">
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i}>SINGLE ORIGIN &nbsp;·&nbsp; ARTISAN ROAST &nbsp;·&nbsp; HANDCRAFTED</span>
            ))}
          </div>
          <div className="animate-marquee-reverse flex gap-14 text-brand-cream/70 font-montserrat font-bold text-sm md:text-base tracking-[0.25em] uppercase" aria-hidden="true">
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i}>SINGLE ORIGIN &nbsp;·&nbsp; ARTISAN ROAST &nbsp;·&nbsp; HANDCRAFTED</span>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-20 flex flex-col items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full mt-16">

          {/* Left Quote Card */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-end text-center lg:text-right space-y-4 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7 }}
              className="glass-dark p-7 rounded-3xl max-w-sm border border-brand-caramel/20 text-left relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-caramel/40 to-transparent" />
              <div className="text-5xl font-playfair text-brand-caramel/50 leading-none mb-3 select-none">"</div>
              <p className="text-brand-cream/85 font-poppins text-sm md:text-base leading-relaxed">
                At Verdant Café, every single coffee bean is roasted to perfection — ensuring that every sip becomes a story of rich flavor and warmth.
              </p>
              <div className="mt-5 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-caramel/40 flex items-center justify-center text-xs font-bold font-montserrat text-brand-cream">
                  E.M
                </div>
                <div>
                  <p className="text-[11px] font-bold font-montserrat text-brand-cream">Elena Moretti</p>
                  <p className="text-[10px] text-brand-cream/50 font-poppins">Head Roastmaster</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Central Floating Cup */}
          <div className="lg:col-span-4 flex justify-center order-1 lg:order-2 my-10 lg:my-0">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ type: 'spring', stiffness: 100, damping: 15 }}
              className="relative"
            >
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full bg-brand-caramel/15 blur-[60px] scale-110" />
              <CoffeeCup
                size="w-64 h-64 md:w-80 md:h-80 lg:w-[360px] lg:h-[360px]"
                rotation={5}
                animateFloat={true}
                hoverScale={1.05}
                shadow={true}
              />
            </motion.div>
          </div>

          {/* Right Quote Card */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 order-3">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7 }}
              className="glass-dark p-7 rounded-3xl max-w-sm border border-brand-caramel/20 text-left relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-caramel/40 to-transparent" />
              <div className="text-5xl font-playfair text-brand-caramel/50 leading-none mb-3 select-none">"</div>
              <p className="text-brand-cream/85 font-poppins text-sm md:text-base leading-relaxed">
                We craft premium selections using custom milk, cream, and toppings blends — redesigning standard coffee habits into luxurious, cinematic café moments.
              </p>
              <div className="mt-5 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-primary/40 flex items-center justify-center text-xs font-bold font-montserrat text-brand-cream">
                  K.L
                </div>
                <div>
                  <p className="text-[11px] font-bold font-montserrat text-brand-cream">Kenji Larsson</p>
                  <p className="text-[10px] text-brand-cream/50 font-poppins">Founder & Barista</p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Animated Stats Row */}
        <div className="mt-24 grid grid-cols-3 gap-8 w-full max-w-2xl">
          <div className="col-span-3 h-px bg-gradient-to-r from-transparent via-brand-caramel/25 to-transparent mb-4" />
          {STATS.map((stat, i) => (
            <AnimatedCounter key={i} {...stat} delay={i * 0.15} />
          ))}
          <div className="col-span-3 h-px bg-gradient-to-r from-transparent via-brand-caramel/25 to-transparent mt-4" />
        </div>

      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-brand-espresso/40 to-transparent pointer-events-none z-0" />
    </section>
  );
}
