import React from 'react';
import { motion } from 'framer-motion';
import CoffeeCup from './CoffeeCup';
import CoffeeBeans from './CoffeeBeans';

export default function BrandingSection() {
  return (
    <section className="relative py-32 bg-brand-espresso overflow-hidden w-full select-none" id="about-brand">
      
      {/* Floating background beans */}
      <CoffeeBeans count={6} lightMode={false} />

      {/* Central warm ambient blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-caramel/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Big typography watermark */}
      <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none select-none z-0 overflow-hidden">
        <h2 className="font-playfair font-black text-6xl md:text-8xl lg:text-[130px] uppercase text-center leading-none tracking-wider text-brand-cream/[0.04]">
          UNMATCHED
        </h2>
        <h2 className="font-playfair font-black text-6xl md:text-8xl lg:text-[130px] uppercase text-center leading-none tracking-wider text-brand-cream/[0.03] mt-4">
          QUALITY
        </h2>
      </div>

      {/* Scrolling brand ribbon */}
      <div className="absolute top-1/3 left-0 right-0 h-14 bg-brand-primary/90 flex items-center z-10 origin-center rotate-[-3deg] scale-105 shadow-warm-lg border-y border-brand-caramel/20">
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

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-20 flex flex-col items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full mt-16">

          {/* Left Quote Card */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-end text-center lg:text-right space-y-4 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="bg-brand-cream/8 backdrop-blur-sm p-7 rounded-3xl max-w-sm border border-brand-cream/12 text-left"
            >
              <div className="text-4xl font-playfair text-brand-caramel/40 leading-none mb-3 select-none">"</div>
              <p className="text-brand-cream/85 font-poppins text-sm md:text-base leading-relaxed">
                At Verdant Café, every single coffee bean is roasted to perfection — ensuring that every sip becomes a story of rich flavor and warmth.
              </p>
            </motion.div>
          </div>

          {/* Central Floating Cup */}
          <div className="lg:col-span-4 flex justify-center order-1 lg:order-2 my-10 lg:my-0">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            >
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
              transition={{ duration: 0.6 }}
              className="bg-brand-cream/8 backdrop-blur-sm p-7 rounded-3xl max-w-sm border border-brand-cream/12 text-left"
            >
              <div className="text-4xl font-playfair text-brand-caramel/40 leading-none mb-3 select-none">"</div>
              <p className="text-brand-cream/85 font-poppins text-sm md:text-base leading-relaxed">
                We craft premium selections using custom milk, cream, and toppings blends — redesigning standard coffee habits into luxurious, cinematic café moments.
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
