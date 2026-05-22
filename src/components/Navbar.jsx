import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Database, Coffee } from 'lucide-react';
import { Link, useRouter } from './Router';

export default function Navbar() {
  const { path, navigate } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Menu items config: name and path/handler
  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '#about', sectionId: 'about-brand' },
    { name: 'Contact', href: '#contact', sectionId: 'contact-section' }
  ];

  // Helper to check if item is currently active
  const isItemActive = (item) => {
    if (item.href === '/') {
      return path === '/' || path === '';
    }
    return path.startsWith(item.href);
  };

  const handleLinkClick = (e, item) => {
    if (item.sectionId) {
      e.preventDefault();
      setMobileMenuOpen(false);
      
      if (path === '/' || path === '') {
        const el = document.getElementById(item.sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate('/');
        // Wait for page to render, then scroll
        setTimeout(() => {
          const el = document.getElementById(item.sectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 150);
      }
    } else {
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 px-4 max-w-7xl mx-auto w-full select-none">
      {/* Main Container Pill: Luxury Dark Green Glass */}
      <div className="bg-brand-dark/70 backdrop-blur-xl rounded-full px-6 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.4)] flex items-center justify-between border border-white/10 transition-all duration-300">
        
        {/* Left: Brand Logo & Title */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_15px_rgba(0,130,72,0.6)]">
            <Coffee size={20} className="text-white fill-white/10 group-hover:rotate-12 transition-transform duration-300" />
          </div>
          <span className="font-montserrat font-extrabold tracking-widest text-white text-lg group-hover:text-brand-accent transition-colors duration-300">
            VERDANT
          </span>
          <span className="text-[10px] tracking-wider text-brand-primary font-bold uppercase hidden sm:inline-block border border-brand-primary/30 px-2 py-0.5 rounded-full bg-brand-primary/5">
            CAFÉ
          </span>
        </Link>

        {/* Center: Navigation Menu (Desktop) */}
        <div className="hidden md:flex items-center gap-2">
          {menuItems.map((item) => {
            const active = isItemActive(item);
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item)}
                className={`relative py-2 px-4 text-sm font-semibold tracking-wide transition-colors font-poppins duration-300 rounded-full ${
                  active 
                    ? 'text-white' 
                    : 'text-brand-textMuted hover:text-white'
                }`}
              >
                <span className="relative z-10">{item.name}</span>
                {active && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 bg-white/5 rounded-full border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right: CMS Dashboard Access */}
        <div className="flex items-center gap-2 text-white">
          <Link
            href="/admin"
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold font-montserrat uppercase tracking-wider transition-all duration-300 border ${
              path === '/admin'
                ? 'bg-brand-primary border-brand-accent text-white shadow-[0_0_15px_rgba(0,168,98,0.4)]'
                : 'bg-white/5 border-white/10 text-brand-textMuted hover:text-white hover:bg-white/10'
            }`}
            title="CMS Console"
          >
            <Database size={14} className="animate-pulse" />
            <span className="hidden sm:inline">CMS Admin</span>
          </Link>

          {/* Hamburger Menu (Mobile) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-300 text-brand-textMuted hover:text-white"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={20} className="stroke-[2.5]" /> : <Menu size={20} className="stroke-[2.5]" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-20 left-4 right-4 z-40 bg-brand-dark/95 backdrop-blur-lg rounded-3xl p-6 shadow-2xl flex flex-col gap-3 border border-white/10 md:hidden"
          >
            {menuItems.map((item) => {
              const active = isItemActive(item);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item)}
                  className={`py-3 px-4 rounded-xl text-lg font-semibold font-poppins transition-all duration-300 ${
                    active
                      ? 'bg-brand-primary text-white shadow-[0_4px_15px_rgba(0,130,72,0.3)]'
                      : 'text-brand-textMuted hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
            
            <div className="w-full h-px bg-white/10 my-1" />
            
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-3 px-4 rounded-xl text-lg font-semibold font-poppins transition-all duration-300 flex items-center gap-3 ${
                path === '/admin'
                  ? 'bg-brand-accent text-white'
                  : 'text-brand-textMuted hover:bg-white/5 hover:text-white'
              }`}
            >
              <Database size={18} />
              CMS Console Admin
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
