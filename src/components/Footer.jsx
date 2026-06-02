import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Coffee, Instagram, Twitter, Youtube, MapPin, Clock } from 'lucide-react';
import { Link } from './Router';

const FOOTER_LINKS = {
  'Quick Links': [
    { name: 'Home', href: '/' },
    { name: 'Our Menu', href: '/menu' },
    { name: 'Journal', href: '/blog' },
    { name: 'About Us', href: '#about-brand' },
    { name: 'Contact', href: '#contact-section' },
  ],
  'Menu Highlights': [
    { name: 'Ethiopia Yirgacheffe', href: '/menu' },
    { name: 'Colombia Huila', href: '/menu' },
    { name: 'Kenya Nyeri AA', href: '/menu' },
    { name: 'Cold Brew Reserve', href: '/menu' },
    { name: 'Espresso Classico', href: '/menu' },
  ],
};

const SOCIAL_LINKS = [
  { icon: Instagram, label: 'Instagram', href: '#instagram' },
  { icon: Twitter, label: 'Twitter', href: '#twitter' },
  { icon: Youtube, label: 'YouTube', href: '#youtube' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() && /\S+@\S+\.\S+/.test(email)) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="relative bg-brand-espresso pt-0 pb-12 px-4 md:px-8 overflow-hidden select-none w-full">

      {/* Wave divider SVG */}
      <div className="wave-divider -mb-1">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 80" className="w-full" preserveAspectRatio="none">
          <path
            fill="#4B3226"
            fillOpacity="1"
            d="M0,48 C240,80 480,0 720,40 C960,80 1200,20 1440,48 L1440,80 L0,80 Z"
          />
        </svg>
      </div>

      {/* Ambient warm orbs */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-brand-caramel/8 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 pt-16">

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* COL 1: Brand Identity */}
          <div className="sm:col-span-2 lg:col-span-1 flex flex-col space-y-5">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-brand-primary flex items-center justify-center shadow-warm-sm">
                <Coffee size={20} className="text-brand-cream" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-playfair font-bold text-brand-cream text-lg tracking-wide">Verdant</span>
                <span className="text-[9px] font-montserrat font-bold tracking-[0.2em] text-brand-cream/40 uppercase">Coffee Co.</span>
              </div>
            </div>

            <p className="text-brand-cream/45 font-poppins text-xs leading-relaxed">
              A modern artisanal coffee brand crafting cinematic café experiences through single-origin blends and premium recipe showcases.
            </p>

            {/* Location */}
            <div className="flex items-start gap-2 text-brand-cream/40">
              <MapPin size={12} className="shrink-0 mt-0.5" />
              <span className="text-xs font-poppins">14 Roastery Lane, London EC1A 2NP</span>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-2 text-brand-cream/40">
              <Clock size={12} className="shrink-0 mt-0.5" />
              <span className="text-xs font-poppins">Mon–Sun: 7am – 10pm</span>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 pt-1">
              {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-full bg-brand-cream/8 border border-brand-cream/12 flex items-center justify-center text-brand-cream/45 hover:text-brand-caramel hover:border-brand-caramel/40 hover:bg-brand-cream/12 transition-colors duration-300"
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* COL 2: Quick Links */}
          <div className="flex flex-col space-y-4">
            <h4 className="font-playfair font-bold text-sm text-brand-cream/80 tracking-wide">Quick Links</h4>
            <div className="w-8 h-px bg-brand-caramel/30 rounded-full" />
            <ul className="space-y-2.5">
              {FOOTER_LINKS['Quick Links'].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-xs font-poppins text-brand-cream/45 hover:text-brand-caramel transition-colors duration-300 flex items-center gap-1.5 group"
                  >
                    <span className="w-3 h-px bg-brand-caramel/30 group-hover:w-5 group-hover:bg-brand-caramel transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COL 3: Menu Highlights */}
          <div className="flex flex-col space-y-4">
            <h4 className="font-playfair font-bold text-sm text-brand-cream/80 tracking-wide">Featured Blends</h4>
            <div className="w-8 h-px bg-brand-caramel/30 rounded-full" />
            <ul className="space-y-2.5">
              {FOOTER_LINKS['Menu Highlights'].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-xs font-poppins text-brand-cream/45 hover:text-brand-caramel transition-colors duration-300 flex items-center gap-1.5 group"
                  >
                    <span className="w-3 h-px bg-brand-caramel/30 group-hover:w-5 group-hover:bg-brand-caramel transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COL 4: Newsletter */}
          <div className="flex flex-col space-y-4">
            <h4 className="font-playfair font-bold text-sm text-brand-cream/80 tracking-wide">Stay in the Loop</h4>
            <div className="w-8 h-px bg-brand-caramel/30 rounded-full" />
            <p className="text-xs font-poppins text-brand-cream/40 leading-relaxed">
              Get seasonal updates, new blend drops, and barista tips — straight to your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="relative flex items-center mt-1">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={subscribed}
                className="w-full bg-brand-cream/8 border border-brand-cream/15 rounded-full px-5 py-3 pr-14 text-xs font-poppins text-brand-cream focus:outline-none focus:border-brand-caramel/50 transition-colors placeholder:text-brand-cream/25"
                aria-label="Newsletter email"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`absolute right-1.5 p-2.5 rounded-full flex items-center justify-center transition-colors duration-300 shadow-md ${
                  subscribed ? 'bg-emerald-600 text-white' : 'bg-brand-caramel text-brand-cream hover:bg-brand-primary'
                }`}
                aria-label="Subscribe"
              >
                {subscribed ? <Check size={15} className="stroke-[3]" /> : <ArrowRight size={15} className="stroke-[2.5]" />}
              </motion.button>
            </form>

            <AnimatePresence>
              {subscribed ? (
                <motion.span
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-[10px] font-bold text-brand-caramel block"
                >
                  Welcome to the club! ☕
                </motion.span>
              ) : (
                <span className="text-[10px] font-bold text-brand-cream/30 block leading-normal">
                  No spam. Just warm stories &amp; seasonal updates.
                </span>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Cinematic watermark */}
        <div className="w-full flex justify-center mb-8 select-none pointer-events-none overflow-hidden">
          <h2 className="font-playfair font-black text-6xl sm:text-8xl md:text-[120px] tracking-widest text-brand-cream/[0.03] uppercase leading-none">
            VERDANT
          </h2>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-brand-cream/8 flex flex-col sm:flex-row items-center justify-between text-[10px] font-bold font-montserrat text-brand-cream/30 gap-4">
          <span>© 2026 VERDANT COFFEE CO. ALL RIGHTS RESERVED.</span>
          <div className="flex gap-5">
            <a href="#privacy" className="hover:text-brand-cream/70 transition-colors duration-300">PRIVACY</a>
            <a href="#terms" className="hover:text-brand-cream/70 transition-colors duration-300">TERMS</a>
            <a href="#sitemap" className="hover:text-brand-cream/70 transition-colors duration-300">SITEMAP</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
