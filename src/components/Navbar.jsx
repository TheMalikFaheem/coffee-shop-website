import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Coffee, CalendarDays } from 'lucide-react';
import { Link, useRouter } from './Router';

export default function Navbar() {
  const { path, navigate } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Home',    href: '/' },
    { name: 'Menu',    href: '/menu' },
    { name: 'Journal', href: '/blog' },
    { name: 'About',   href: '#about',   sectionId: 'about-brand' },
    { name: 'Contact', href: '#contact', sectionId: 'contact-section' },
  ];

  const isItemActive = (item) => {
    if (item.href === '/') return path === '/' || path === '';
    return path.startsWith(item.href) && !item.sectionId;
  };

  const handleLinkClick = (e, item) => {
    if (item.sectionId) {
      e.preventDefault();
      setMobileMenuOpen(false);
      if (path === '/' || path === '') {
        document.getElementById(item.sectionId)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/');
        setTimeout(() => {
          document.getElementById(item.sectionId)?.scrollIntoView({ behavior: 'smooth' });
        }, 180);
      }
    } else {
      setMobileMenuOpen(false);
    }
  };

  const handleReserve = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (path === '/' || path === '') {
      document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 180);
    }
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -8 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.06 + 0.1, duration: 0.35, ease: 'easeOut' }
    }),
  };

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 px-4 max-w-7xl mx-auto w-full select-none" id="main-navbar">
      {/* Floating Pill Container */}
      <motion.div
        animate={{
          boxShadow: scrolled
            ? '0 8px 40px rgba(139,94,60,0.22), 0 2px 8px rgba(43,29,23,0.10)'
            : '0 4px 20px rgba(139,94,60,0.10)',
        }}
        transition={{ duration: 0.3 }}
        className="bg-[#F6F1EA]/92 backdrop-blur-xl rounded-full px-5 py-2.5 flex items-center justify-between border border-[#B9805D]/20 transition-all duration-300"
      >
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <motion.div
            whileHover={{ scale: 1.08, rotate: -5 }}
            transition={{ type: 'spring', stiffness: 400, damping: 12 }}
            className="w-9 h-9 rounded-full bg-brand-primary flex items-center justify-center shadow-warm-sm"
          >
            <Coffee size={18} className="text-brand-cream" />
          </motion.div>
          <div className="flex flex-col leading-none">
            <span className="font-playfair font-bold text-brand-dark text-base tracking-wide group-hover:text-brand-primary transition-colors duration-300">
              Verdant
            </span>
            <span className="text-[8px] font-montserrat font-bold tracking-[0.2em] text-brand-muted uppercase">
              Coffee Co.
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-0.5">
          {menuItems.map((item, i) => {
            const active = isItemActive(item);
            return (
              <motion.div
                key={item.name}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={navItemVariants}
              >
                <Link
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item)}
                  className={`relative py-2 px-4 text-sm font-semibold tracking-wide transition-colors duration-300 rounded-full font-poppins ${
                    active
                      ? 'text-brand-primary'
                      : 'text-brand-muted hover:text-brand-dark'
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>
                  {active && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-brand-primary/8 rounded-full border border-brand-primary/20"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Right: Reserve CTA + Mobile Burger */}
        <div className="flex items-center gap-3">
          {/* Reserve a Table CTA */}
          <motion.button
            onClick={handleReserve}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.35 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            id="nav-reserve-btn"
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary hover:bg-brand-mocha text-brand-cream text-[11px] font-bold font-montserrat tracking-widest uppercase shadow-warm-sm transition-colors duration-300 relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-brand-caramel/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
            <CalendarDays size={13} />
            <span>Reserve</span>
          </motion.button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full hover:bg-brand-primary/10 border border-transparent hover:border-brand-primary/20 transition-all duration-300 text-brand-muted hover:text-brand-dark"
            aria-label="Toggle Mobile Menu"
            id="mobile-menu-toggle"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={mobileMenuOpen ? 'close' : 'open'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </motion.div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.96 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="absolute top-20 left-4 right-4 z-40 bg-[#F6F1EA]/97 backdrop-blur-xl rounded-3xl p-6 shadow-warm-xl flex flex-col gap-2 border border-brand-primary/15 md:hidden"
          >
            {menuItems.map((item) => {
              const active = isItemActive(item);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item)}
                  className={`py-3 px-4 rounded-2xl text-base font-semibold font-poppins transition-all duration-300 ${
                    active
                      ? 'bg-brand-primary text-brand-cream shadow-warm-sm'
                      : 'text-brand-muted hover:bg-brand-primary/8 hover:text-brand-dark'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
            <div className="w-full h-px bg-brand-primary/12 my-1" />
            <button
              onClick={handleReserve}
              className="py-3 px-4 rounded-2xl text-base font-semibold font-poppins bg-brand-primary text-brand-cream text-center flex items-center justify-center gap-2 shadow-warm-sm"
            >
              <CalendarDays size={16} />
              Reserve a Table
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
