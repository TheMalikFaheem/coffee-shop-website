import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Instagram, Twitter, CalendarDays, ArrowRight } from 'lucide-react';

const PHOTOS = [
  { src: '/cafe-interior.jpg', alt: 'Our cozy café interior', wide: true },
  { src: '/barista-latte.jpg', alt: 'Barista crafting latte art' },
  { src: '/coffee-beans.jpg', alt: 'Premium single-origin coffee beans' },
  { src: '/cafe-exterior.jpg', alt: 'Verdant café storefront', wide: true },
];

export default function ExperienceSection() {
  const scrollToContact = (e) => {
    e.preventDefault();
    document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative py-24 bg-brand-espresso overflow-hidden w-full select-none" id="experience-section">
      
      {/* Ambient orbs */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-brand-caramel/8 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px] bg-brand-primary/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span className="font-playfair font-black text-[120px] md:text-[200px] text-brand-cream/[0.02] uppercase tracking-widest select-none leading-none">
          VISIT
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-3"
        >
          <span className="text-xs font-bold tracking-[0.3em] text-brand-caramel uppercase font-montserrat block">
            Find Us
          </span>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-brand-cream">
            Visit Our <em className="text-gradient-gold not-italic">Café</em>
          </h2>
          <div className="w-14 h-0.5 bg-gradient-to-r from-transparent via-brand-caramel/50 to-transparent mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* LEFT: Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-8"
          >
            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Address */}
              <div className="glass-dark rounded-2xl p-5 border border-brand-caramel/20 relative overflow-hidden">
                <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-brand-caramel/40 to-transparent" />
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-brand-primary/30 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin size={16} className="text-brand-caramel" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold font-montserrat uppercase tracking-widest text-brand-caramel/70 mb-1">Location</p>
                    <p className="text-brand-cream font-poppins text-sm leading-relaxed">
                      14 Roastery Lane<br />
                      The Coffee Quarter<br />
                      London, EC1A 2NP
                    </p>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="glass-dark rounded-2xl p-5 border border-brand-caramel/20 relative overflow-hidden">
                <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-brand-caramel/40 to-transparent" />
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-brand-primary/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock size={16} className="text-brand-caramel" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold font-montserrat uppercase tracking-widest text-brand-caramel/70 mb-1">Hours</p>
                    <div className="text-brand-cream font-poppins text-sm space-y-0.5">
                      <p>Mon – Fri: 7am – 9pm</p>
                      <p>Sat – Sun: 8am – 10pm</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="glass-dark rounded-2xl p-5 border border-brand-caramel/20 relative overflow-hidden">
                <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-brand-caramel/40 to-transparent" />
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-brand-primary/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone size={16} className="text-brand-caramel" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold font-montserrat uppercase tracking-widest text-brand-caramel/70 mb-1">Contact</p>
                    <p className="text-brand-cream font-poppins text-sm">+44 20 7946 0958</p>
                    <p className="text-brand-cream/60 font-poppins text-xs mt-0.5">hello@verdant.coffee</p>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="glass-dark rounded-2xl p-5 border border-brand-caramel/20 relative overflow-hidden">
                <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-brand-caramel/40 to-transparent" />
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-brand-primary/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Instagram size={16} className="text-brand-caramel" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold font-montserrat uppercase tracking-widest text-brand-caramel/70 mb-2">Follow Us</p>
                    <div className="flex gap-3">
                      <a href="#instagram" aria-label="Instagram" className="text-brand-cream/60 hover:text-brand-caramel transition-colors duration-300">
                        <Instagram size={18} />
                      </a>
                      <a href="#twitter" aria-label="Twitter" className="text-brand-cream/60 hover:text-brand-caramel transition-colors duration-300">
                        <Twitter size={18} />
                      </a>
                    </div>
                    <p className="text-brand-cream/50 font-poppins text-xs mt-1">@verdantcoffeeco</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="relative rounded-3xl overflow-hidden border border-brand-caramel/20 h-48 bg-brand-velvet/50">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="w-14 h-14 rounded-full bg-brand-primary/30 flex items-center justify-center border-2 border-brand-caramel/40">
                  <MapPin size={24} className="text-brand-caramel" />
                </div>
                <div className="text-center">
                  <p className="text-brand-cream font-playfair font-bold text-base">Verdant Coffee Co.</p>
                  <p className="text-brand-cream/50 font-poppins text-xs mt-0.5">14 Roastery Lane, London</p>
                </div>
                {/* Grid pattern overlay */}
                <div className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, #F6F1EA 0px, #F6F1EA 1px, transparent 1px, transparent 30px), repeating-linear-gradient(90deg, #F6F1EA 0px, #F6F1EA 1px, transparent 1px, transparent 30px)'
                  }}
                />
              </div>
            </div>

            {/* Book a Table CTA */}
            <motion.button
              onClick={scrollToContact}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              id="experience-book-btn"
              className="relative w-full py-4 rounded-2xl bg-brand-primary hover:bg-brand-mocha text-brand-cream font-bold font-montserrat text-sm tracking-widest uppercase flex items-center justify-center gap-3 shadow-warm-lg transition-colors duration-300 overflow-hidden group pulse-ring"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-brand-caramel/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl" />
              <CalendarDays size={18} />
              <span className="relative z-10">Book a Table</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
            </motion.button>
          </motion.div>

          {/* RIGHT: Photo Mosaic */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="grid grid-cols-2 grid-rows-3 gap-3 h-[560px]"
          >
            {/* Café interior — tall left */}
            <div className="row-span-2 rounded-3xl overflow-hidden relative group">
              <img
                src="/cafe-interior.jpg"
                alt="Our cozy café interior"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-espresso/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="text-[9px] font-bold font-montserrat uppercase tracking-wider text-brand-cream/80 bg-brand-espresso/60 backdrop-blur-sm px-2.5 py-1 rounded-full">
                  Interior
                </span>
              </div>
            </div>

            {/* Barista — top right */}
            <div className="rounded-3xl overflow-hidden relative group">
              <img
                src="/barista-latte.jpg"
                alt="Barista crafting latte art"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-espresso/50 via-transparent to-transparent" />
            </div>

            {/* Coffee beans — mid right */}
            <div className="rounded-3xl overflow-hidden relative group">
              <img
                src="/coffee-beans.jpg"
                alt="Premium arabica coffee beans"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-espresso/50 via-transparent to-transparent" />
            </div>

            {/* Café exterior — full bottom row */}
            <div className="col-span-2 rounded-3xl overflow-hidden relative group">
              <img
                src="/cafe-exterior.jpg"
                alt="Verdant café storefront at dusk"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-espresso/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="text-[9px] font-bold font-montserrat uppercase tracking-wider text-brand-cream/80 bg-brand-espresso/60 backdrop-blur-sm px-2.5 py-1 rounded-full">
                  Our Storefront
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
