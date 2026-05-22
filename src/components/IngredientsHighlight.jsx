import React from 'react';
import { motion } from 'framer-motion';
import { Bean, Droplets, Leaf, Milk } from 'lucide-react';

const HIGHLIGHTS = [
  {
    icon: Bean,
    title: 'High-Altitude Beans',
    description: '100% Arabica beans sourced directly from single-origin micro-lots in Huila, Colombia and Nyeri, Kenya. Slow-roasted in-house to unlock unique local terroirs.',
    accent: 'text-brand-accent'
  },
  {
    icon: Milk,
    title: 'Artisanal Plant Milks',
    description: 'From organic macadamia milk to custom barista-blend oat and almond milks, selected to froth into a velvety, glassy microfoam at exactly 60°C.',
    accent: 'text-brand-primary'
  },
  {
    icon: Droplets,
    title: 'House-Made Syrups',
    description: 'We boil raw Madagascar vanilla pods, Belgian cocoa ganache, and organic salted caramel in-house. Zero artificial sweeteners, zero preservatives.',
    accent: 'text-amber-500'
  },
  {
    icon: Leaf,
    title: 'Botanical Accents',
    description: 'Fresh organic peppermint extract, forest honey, lime zests, and real cacao nibs are combined to craft clean, crisp, and refreshing cafe flavors.',
    accent: 'text-emerald-500'
  }
];

export default function IngredientsHighlight() {
  return (
    <section className="relative py-28 bg-[#021A1A] px-4 overflow-hidden w-full select-none" id="ingredients-highlight">
      {/* Background blurs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center mb-20 space-y-3">
          <span className="text-xs font-bold tracking-[0.25em] text-brand-accent uppercase font-montserrat">
            PURE & ETHICAL
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-montserrat text-white uppercase tracking-wider">
            Sourced for Perfection
          </h2>
          <p className="text-brand-textMuted text-sm font-poppins max-w-lg mx-auto leading-relaxed mt-2">
            Every creation is built upon a foundation of clean ingredients, ensuring an authentic taste profile with every single pour.
          </p>
          <div className="w-16 h-1 bg-brand-primary mx-auto rounded-full mt-3" />
        </div>

        {/* Highlight Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full px-4">
          {HIGHLIGHTS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="bg-white/5 border border-white/10 p-6 rounded-[28px] flex flex-col justify-between space-y-4 hover:border-brand-primary/30 transition-all duration-300 backdrop-blur-sm"
              >
                <div className="space-y-4">
                  {/* Glowing icon badge */}
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                    <Icon className={`w-6 h-6 ${item.accent}`} />
                  </div>
                  
                  <h3 className="font-montserrat font-bold text-lg text-white tracking-wide">
                    {item.title}
                  </h3>
                </div>

                <p className="text-xs font-poppins text-brand-textMuted leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
