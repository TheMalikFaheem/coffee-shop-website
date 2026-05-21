import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, User, Menu, X } from 'lucide-react';

export default function Navbar({ cartCount = 0 }) {
  const [activeItem, setActiveItem] = useState('Home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = ['Home', 'Menu', 'Rewards', 'Gift Cards'];

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 px-4 max-w-7xl mx-auto w-full select-none">
      {/* Main Container Pill */}
      <div className="glass-nav rounded-full px-6 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.15)] flex items-center justify-between border border-white/20 transition-all duration-300">
        
        {/* Left: Starbucks Logo */}
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            {/* Starbucks inspired crown emblem SVG */}
            <svg viewBox="0 0 100 100" fill="none" className="w-7 h-7 text-white" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 95C74.8528 95 95 74.8528 95 50C95 25.1472 74.8528 5 50 5C25.1472 5 5 25.1472 5 50C5 74.8528 25.1472 95 50 95Z" stroke="currentColor" strokeWidth="4"/>
              <path d="M50 20C40 28 35 38 35 48C35 63 50 78 50 78C50 78 65 63 65 48C65 38 60 28 50 20Z" fill="currentColor"/>
              <circle cx="50" cy="42" r="5" fill="#008248"/>
              <path d="M42 55C45 52 55 52 58 55" stroke="#008248" strokeWidth="3" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="font-montserrat font-extrabold tracking-widest text-[#032B2B] text-lg hidden sm:inline-block">
            STARBUCKS
          </span>
        </div>

        {/* Center: Navigation Menu (Desktop) */}
        <div className="hidden md:flex items-center gap-6">
          {menuItems.map((item) => {
            const isActive = activeItem === item;
            return (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                onClick={() => setActiveItem(item)}
                className="relative py-1.5 px-3.5 text-sm font-semibold tracking-wide transition-colors font-poppins duration-300 text-brand-dark/80 hover:text-brand-primary"
              >
                <span className="relative z-10">{item}</span>
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 bg-brand-primary/10 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {/* Micro underline indicator */}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-brand-primary transition-all duration-300 group-hover:w-full group-hover:left-0" />
              </a>
            );
          })}
        </div>

        {/* Right: Icons + Mobile Hamburger */}
        <div className="flex items-center gap-4 text-brand-dark">
          {/* User Icon */}
          <button className="p-2 rounded-full hover:bg-black/5 transition-colors duration-300" aria-label="Profile">
            <User size={20} className="stroke-[2.5]" />
          </button>

          {/* Cart Icon with Badge */}
          <button className="p-2 rounded-full hover:bg-black/5 transition-colors duration-300 relative" aria-label="Cart">
            <ShoppingBag size={20} className="stroke-[2.5]" />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute top-0 right-0 w-5 h-5 rounded-full bg-brand-accent text-white text-[10px] font-bold flex items-center justify-center border-2 border-white"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* Hamburger Menu (Mobile) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full hover:bg-black/5 transition-colors duration-300"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={20} className="stroke-[2.5]" /> : <Menu size={20} className="stroke-[2.5]" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-18 left-4 right-4 z-40 bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl flex flex-col gap-4 border border-white/20 md:hidden"
          >
            {menuItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                onClick={() => {
                  setActiveItem(item);
                  setMobileMenuOpen(false);
                }}
                className={`py-3 px-4 rounded-xl text-lg font-semibold font-poppins transition-colors duration-300 ${
                  activeItem === item
                    ? 'bg-brand-primary text-white'
                    : 'text-brand-dark hover:bg-brand-primary/5 hover:text-brand-primary'
                }`}
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
