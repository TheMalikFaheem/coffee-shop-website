import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Coffee } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() && /\S+@\S+\.\S+/.test(email)) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="relative bg-brand-espresso pt-24 pb-12 px-4 md:px-8 overflow-hidden select-none w-full border-t border-brand-cream/8">

      {/* Ambient warm orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-caramel/8 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">

        {/* LEFT: Brand Identity */}
        <div className="md:col-span-6 flex flex-col items-center md:items-start text-center md:text-left space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Brand Icon */}
            <div className="w-14 h-14 rounded-full bg-brand-primary flex items-center justify-center shadow-warm-sm">
              <Coffee size={24} className="text-brand-cream" />
            </div>

            {/* Circular Crest SVG */}
            <div className="relative w-20 h-20 shrink-0">
              <svg viewBox="0 0 120 120" className="w-full h-full text-brand-cream/20" xmlns="http://www.w3.org/2000/svg">
                <circle cx="60" cy="60" r="52" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" fill="none" />
                <circle cx="60" cy="60" r="44" stroke="currentColor" strokeWidth="0.8" fill="none" />
                <path id="textPath-footer" d="M 60,60 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
                <text fontSize="5.5" fontFamily="Montserrat" fontWeight="900" fill="currentColor" letterSpacing="0.8">
                  <textPath href="#textPath-footer" startOffset="0%">• VERDANT COFFEE CO. EST. 2026 • ROASTERY</textPath>
                </text>
              </svg>
            </div>
          </div>

          <div className="space-y-3">
            <span className="font-playfair font-bold text-2xl tracking-wide text-brand-cream block">
              Verdant Coffee Co.
            </span>
            <p className="text-brand-cream/55 font-poppins text-xs leading-relaxed max-w-sm">
              A modern artisanal coffee brand crafting cinematic café experiences through single-origin blends and premium recipe showcases.
            </p>
          </div>
        </div>

        {/* RIGHT: Newsletter */}
        <div className="md:col-span-6 flex flex-col items-center md:items-end text-center md:text-right space-y-4">
          <div className="w-full max-w-sm text-left md:text-right">
            <h3 className="font-playfair font-bold text-lg text-brand-cream mb-1">
              Stay in the Loop
            </h3>
            <p className="text-[10px] font-montserrat font-bold text-brand-cream/45 uppercase tracking-[0.18em] mb-4">
              Subscribe to the Journal
            </p>

            <form onSubmit={handleSubscribe} className="relative mt-2 flex items-center">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={subscribed}
                className="w-full bg-brand-cream/8 border border-brand-cream/15 rounded-full px-5 py-3.5 pr-14 text-xs font-poppins text-brand-cream focus:outline-none focus:border-brand-caramel/50 transition-colors placeholder:text-brand-cream/25"
                aria-label="Subscribe email input"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`absolute right-1.5 p-2.5 rounded-full flex items-center justify-center transition-colors duration-300 shadow-md ${
                  subscribed ? 'bg-brand-primary text-brand-cream' : 'bg-brand-caramel text-brand-cream hover:bg-brand-primary'
                }`}
                aria-label="Subscribe submit"
              >
                {subscribed ? <Check size={16} className="stroke-[3]" /> : <ArrowRight size={16} className="stroke-[2.5]" />}
              </motion.button>
            </form>

            <AnimatePresence>
              {subscribed ? (
                <motion.span
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="text-[10px] font-bold text-brand-caramel mt-2 block"
                >
                  Welcome to the club! ☕
                </motion.span>
              ) : (
                <span className="text-[10px] font-bold text-brand-cream/35 mt-2 block leading-normal">
                  No spam. Just warm stories and seasonal menu updates.
                </span>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>

      {/* Cinematic watermark */}
      <div className="w-full flex justify-center mt-20 select-none pointer-events-none overflow-hidden">
        <h2 className="font-playfair font-black text-6xl sm:text-8xl md:text-[130px] tracking-widest text-brand-cream/[0.03] uppercase leading-none">
          VERDANT
        </h2>
      </div>

      {/* Copyright */}
      <div className="max-w-6xl mx-auto mt-6 pt-6 border-t border-brand-cream/8 flex flex-col sm:flex-row items-center justify-between text-[10px] font-bold font-montserrat text-brand-cream/30 gap-4">
        <span>© 2026 VERDANT COFFEE CO. ALL RIGHTS RESERVED.</span>
        <div className="flex gap-5">
          <a href="#privacy" className="hover:text-brand-cream/70 transition-colors duration-300">PRIVACY</a>
          <a href="#terms" className="hover:text-brand-cream/70 transition-colors duration-300">TERMS</a>
        </div>
      </div>

    </footer>
  );
}
