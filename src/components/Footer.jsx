import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';

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
    <footer className="relative bg-gradient-to-b from-[#021A1A] to-[#011010] pt-24 pb-12 px-4 md:px-8 overflow-hidden select-none w-full border-t border-white/5">
      
      {/* Central Content Container */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* LEFT COLUMN: Logo & Crest Emblem (Md: 6 columns) */}
        <div className="md:col-span-6 flex flex-col items-center md:items-start text-center md:text-left space-y-6">
          {/* Logo & Emblem Row */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Starbucks Crown Logo */}
            <div className="w-14 h-14 rounded-full bg-brand-primary flex items-center justify-center shadow-lg">
              <svg viewBox="0 0 100 100" fill="none" className="w-10 h-10 text-white" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 95C74.8528 95 95 74.8528 95 50C95 25.1472 74.8528 5 50 5C25.1472 5 5 25.1472 5 50C5 74.8528 25.1472 95 50 95Z" stroke="currentColor" strokeWidth="4"/>
                <path d="M50 20C40 28 35 38 35 48C35 63 50 78 50 78C50 78 65 63 65 48C65 38 60 28 50 20Z" fill="currentColor"/>
                <circle cx="50" cy="42" r="5" fill="#008248"/>
                <path d="M42 55C45 52 55 52 58 55" stroke="#008248" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </div>

            {/* Circular Crest */}
            <div className="relative w-20 h-20 shrink-0">
              <svg viewBox="0 0 120 120" className="w-full h-full text-brand-accent/25" xmlns="http://www.w3.org/2000/svg">
                <circle cx="60" cy="60" r="52" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" fill="none" />
                <circle cx="60" cy="60" r="44" stroke="currentColor" strokeWidth="0.8" fill="none" />
                <path id="textPath-crest" d="M 60,60 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
                <text fontSize="5.5" fontFamily="Montserrat" fontWeight="900" fill="currentColor" letterSpacing="0.8">
                  <textPath href="#textPath-crest" startOffset="0%">• VERDANT COFFEE CO. EST. 2026 • ROASTERY</textPath>
                </text>
                <path d="M 60 40 L 60 80 M 40 60 L 80 60" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 3" opacity="0.5" />
              </svg>
            </div>
          </div>

          <div className="space-y-3">
            <span className="font-montserrat font-black text-xl tracking-widest text-white">
              VERDANT
            </span>
            <p className="text-brand-textMuted font-poppins text-xs leading-relaxed max-w-sm">
              Discover the blend with a modern coffee moment. Our craft single-origin blends, reimagined in a luxurious dark green aesthetic.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Subscribe Form (Md: 6 columns) */}
        <div className="md:col-span-6 flex flex-col items-center md:items-end text-center md:text-right space-y-4">
          <div className="w-full max-w-sm text-left md:text-right">
            <h3 className="font-montserrat font-black text-sm tracking-widest text-white uppercase mb-2">
              SUBSCRIBE
            </h3>
            
            <form onSubmit={handleSubscribe} className="relative mt-2 flex items-center">
              <input
                type="email"
                placeholder="ENTER YOUR EMAIL..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={subscribed}
                className="w-full bg-white/5 border border-white/10 rounded-full px-5 py-3.5 pr-14 text-xs font-semibold tracking-wide text-white focus:outline-none focus:border-brand-accent transition-colors placeholder:text-white/20 placeholder:font-bold"
                aria-label="Subscribe Email Input"
              />
              
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`absolute right-1.5 p-2 rounded-full flex items-center justify-center transition-colors duration-300 shadow-md ${
                  subscribed ? 'bg-brand-accent text-white' : 'bg-brand-primary text-white hover:bg-brand-accent'
                }`}
                aria-label="Subscribe Submit"
              >
                {subscribed ? <Check size={18} className="stroke-[3]" /> : <ArrowRight size={18} className="stroke-[2.5]" />}
              </motion.button>
            </form>
            
            <AnimatePresence>
              {subscribed ? (
                <motion.span
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="text-[10px] font-bold text-brand-accent mt-2 block"
                >
                  Successfully subscribed! Welcome to the club.
                </motion.span>
              ) : (
                <span className="text-[10px] font-bold text-brand-textMuted mt-2 block leading-normal">
                  Join the Club! Subscribe to our newsletter for exclusive updates and offers.
                </span>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>

      {/* Cinematic Faded Watermark at Bottom */}
      <div className="w-full flex justify-center mt-20 select-none pointer-events-none opacity-5">
        <h2 className="font-montserrat font-black text-6xl sm:text-8xl md:text-[140px] tracking-widest text-[#008248] uppercase leading-none">
          VERDANT
        </h2>
      </div>

      {/* Copywrite details */}
      <div className="max-w-6xl mx-auto mt-6 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[10px] font-bold font-montserrat text-brand-textMuted/60 gap-4">
        <span>© 2026 VERDANT COFFEE CO. ALL RIGHTS RESERVED.</span>
        <div className="flex gap-4">
          <a href="#privacy" className="hover:text-white transition-colors">PRIVACY POLICY</a>
          <a href="#terms" className="hover:text-white transition-colors">TERMS OF USE</a>
        </div>
      </div>

    </footer>
  );
}
