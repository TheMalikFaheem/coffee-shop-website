import React from 'react';
import { motion } from 'framer-motion';
import { Bean, Droplets, Leaf, Milk } from 'lucide-react';

const HIGHLIGHTS = [
  {
    icon: Bean,
    title: 'High-Altitude Beans',
    description: '100% Arabica beans sourced directly from single-origin micro-lots in Huila, Colombia and Nyeri, Kenya. Slow-roasted in-house to unlock unique local terroirs.',
    accent: 'text-brand-primary',
    bg: 'bg-brand-primary/10',
    border: 'border-brand-primary/20',
  },
  {
    icon: Milk,
    title: 'Artisanal Plant Milks',
    description: 'From organic macadamia milk to custom barista-blend oat and almond milks, selected to froth into a velvety, glassy microfoam at exactly 60°C.',
    accent: 'text-brand-caramel',
    bg: 'bg-brand-caramel/10',
    border: 'border-brand-caramel/20',
  },
  {
    icon: Droplets,
    title: 'House-Made Syrups',
    description: 'We cook raw Madagascar vanilla pods, Belgian cocoa ganache, and organic salted caramel in-house. Zero artificial sweeteners, zero preservatives.',
    accent: 'text-amber-600',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
  },
  {
    icon: Leaf,
    title: 'Botanical Accents',
    description: 'Fresh organic peppermint extract, forest honey, lime zests, and real cacao nibs — combined to craft clean, crisp, and refreshing café flavors.',
    accent: 'text-emerald-600',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
  },
];

export default function IngredientsHighlight() {
  return (
    <section className="relative py-28 bg-brand-latte/60 px-4 overflow-hidden w-full select-none" id="ingredients-highlight">
      
      {/* Ambient blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-caramel/8 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col items-center relative z-10">

        {/* Section Header */}
        <div className="text-center mb-20 space-y-3">
          <span className="text-xs font-bold tracking-[0.3em] text-brand-caramel uppercase font-montserrat block">
            Pure &amp; Ethical
          </span>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-brand-dark">
            Sourced for <em className="text-brand-primary not-italic">Perfection</em>
          </h2>
          <p className="text-brand-muted text-sm font-poppins max-w-lg mx-auto leading-relaxed mt-2">
            Every creation is built upon a foundation of clean ingredients, ensuring an authentic taste profile with every single pour.
          </p>
          <div className="w-14 h-0.5 bg-brand-caramel/50 mx-auto rounded-full mt-3" />
        </div>

        {/* Highlight Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full px-2">
          {HIGHLIGHTS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-white/70 border border-brand-primary/12 p-7 rounded-[28px] flex flex-col justify-between space-y-5 hover:border-brand-primary/30 hover:shadow-warm-md transition-all duration-300 backdrop-blur-sm shadow-warm-sm"
              >
                <div className="space-y-4">
                  {/* Icon Badge */}
                  <div className={`w-12 h-12 rounded-2xl ${item.bg} flex items-center justify-center border ${item.border}`}>
                    <Icon className={`w-6 h-6 ${item.accent}`} />
                  </div>

                  <h3 className="font-playfair font-bold text-lg text-brand-dark leading-tight">
                    {item.title}
                  </h3>
                </div>

                <p className="text-xs font-poppins text-brand-muted leading-relaxed">
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
