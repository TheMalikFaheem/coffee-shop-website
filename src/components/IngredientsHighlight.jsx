import React from 'react';
import { motion } from 'framer-motion';
import { Bean, Droplets, Leaf, Milk, ArrowRight } from 'lucide-react';

const HIGHLIGHTS = [
  {
    icon: Bean,
    title: 'High-Altitude Beans',
    description: '100% Arabica beans sourced directly from single-origin micro-lots in Huila, Colombia and Nyeri, Kenya. Slow-roasted in-house to unlock unique local terroirs.',
    accent: 'text-brand-primary',
    bg: 'bg-brand-primary/10',
    border: 'border-brand-primary/20',
    large: true,
  },
  {
    icon: Milk,
    title: 'Artisanal Plant Milks',
    description: 'From organic macadamia milk to custom barista-blend oat and almond milks, selected to froth into a velvety, glassy microfoam at exactly 60°C.',
    accent: 'text-brand-caramel',
    bg: 'bg-brand-caramel/10',
    border: 'border-brand-caramel/20',
    large: false,
  },
  {
    icon: Droplets,
    title: 'House-Made Syrups',
    description: 'We cook raw Madagascar vanilla pods, Belgian cocoa ganache, and organic salted caramel in-house. Zero artificial sweeteners, zero preservatives.',
    accent: 'text-amber-600',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    large: false,
  },
  {
    icon: Leaf,
    title: 'Botanical Accents',
    description: 'Fresh organic peppermint extract, forest honey, lime zests, and real cacao nibs — combined to craft clean, crisp, and refreshing café flavors.',
    accent: 'text-emerald-600',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    large: true,
  },
];

const PROCESS = [
  { step: '01', label: 'Source', desc: 'Direct trade from farms' },
  { step: '02', label: 'Roast', desc: 'Precision in-house roasting' },
  { step: '03', label: 'Brew', desc: 'Expert barista technique' },
  { step: '04', label: 'Serve', desc: 'Perfect every cup, always' },
];

export default function IngredientsHighlight() {
  return (
    <section className="relative py-28 bg-brand-latte/60 px-4 overflow-hidden w-full select-none" id="ingredients-highlight">
      
      {/* Ambient blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-caramel/8 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col items-center relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 space-y-3"
        >
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
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 w-full mb-16">
          {/* Large card 1 — spans 5 cols, 2 rows */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -6 }}
            className="md:col-span-5 md:row-span-2 bg-white/70 border border-brand-primary/12 p-8 rounded-[32px] flex flex-col justify-between space-y-6 hover:border-brand-primary/30 hover:shadow-warm-md transition-all duration-300 backdrop-blur-sm shadow-warm-sm group relative overflow-hidden min-h-[280px]"
          >
            {/* Background blob */}
            <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-brand-primary/8 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />

            <div className="space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center border border-brand-primary/20">
                <Bean className="w-7 h-7 text-brand-primary" />
              </div>
              <h3 className="font-playfair font-bold text-2xl text-brand-dark leading-tight">
                High-Altitude <br />Arabica Beans
              </h3>
              <p className="text-sm font-poppins text-brand-muted leading-relaxed">
                100% Arabica beans sourced directly from single-origin micro-lots in Huila, Colombia and Nyeri, Kenya. Slow-roasted in-house to unlock unique local terroirs and extraordinary flavor complexity.
              </p>
            </div>
            <div className="flex items-center gap-2 text-brand-primary font-bold font-montserrat text-xs tracking-widest group-hover:gap-3 transition-all duration-300">
              LEARN MORE <ArrowRight size={13} />
            </div>
          </motion.div>

          {/* Small card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -5 }}
            className="md:col-span-7 bg-white/70 border border-brand-caramel/15 p-7 rounded-[28px] flex flex-col justify-between space-y-4 hover:border-brand-caramel/30 hover:shadow-warm-md transition-all duration-300 backdrop-blur-sm shadow-warm-sm group relative overflow-hidden"
          >
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-brand-caramel/10 rounded-full blur-2xl" />
            <div className="space-y-3 relative">
              <div className="w-12 h-12 rounded-2xl bg-brand-caramel/10 flex items-center justify-center border border-brand-caramel/20">
                <Milk className="w-6 h-6 text-brand-caramel" />
              </div>
              <h3 className="font-playfair font-bold text-xl text-brand-dark leading-tight">
                Artisanal Plant Milks
              </h3>
              <p className="text-xs font-poppins text-brand-muted leading-relaxed">
                From organic macadamia milk to custom barista-blend oat and almond milks, selected to froth into a velvety microfoam at exactly 60°C.
              </p>
            </div>
          </motion.div>

          {/* Small card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -5 }}
            className="md:col-span-4 bg-white/70 border border-amber-500/15 p-7 rounded-[28px] flex flex-col justify-between space-y-4 hover:border-amber-500/30 hover:shadow-warm-md transition-all duration-300 backdrop-blur-sm shadow-warm-sm group relative overflow-hidden"
          >
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-amber-500/8 rounded-full blur-2xl" />
            <div className="space-y-3 relative">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                <Droplets className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="font-playfair font-bold text-xl text-brand-dark leading-tight">
                House-Made Syrups
              </h3>
              <p className="text-xs font-poppins text-brand-muted leading-relaxed">
                Madagascar vanilla, Belgian cocoa ganache, organic salted caramel. Zero artificial sweeteners.
              </p>
            </div>
          </motion.div>

          {/* Large card 4 — spans 3 cols */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -6 }}
            className="md:col-span-3 bg-white/70 border border-emerald-500/15 p-7 rounded-[28px] flex flex-col justify-between space-y-4 hover:border-emerald-500/30 hover:shadow-warm-md transition-all duration-300 backdrop-blur-sm shadow-warm-sm group relative overflow-hidden"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-emerald-500/8 rounded-full blur-3xl" />
            <div className="space-y-3 relative">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                <Leaf className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-playfair font-bold text-xl text-brand-dark leading-tight">
                Botanical Accents
              </h3>
              <p className="text-xs font-poppins text-brand-muted leading-relaxed">
                Peppermint, forest honey, lime zests, and real cacao nibs — for clean, crisp café flavors.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Process Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="w-full bg-white/50 border border-brand-primary/12 rounded-3xl p-8 backdrop-blur-sm shadow-warm-sm"
        >
          <p className="text-center text-[10px] font-bold font-montserrat uppercase tracking-[0.3em] text-brand-caramel mb-8">
            Our Process
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative">
            {PROCESS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex flex-col items-center text-center relative"
              >
                {/* Connector line (between steps) */}
                {i < PROCESS.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-[calc(50%+28px)] right-[calc(-50%+28px)] h-px bg-gradient-to-r from-brand-caramel/40 to-brand-caramel/10" />
                )}

                <div className="w-12 h-12 rounded-full bg-brand-primary/10 border-2 border-brand-primary/25 flex items-center justify-center mb-3 relative z-10 bg-white">
                  <span className="font-playfair font-black text-brand-primary text-sm">{item.step}</span>
                </div>
                <h4 className="font-playfair font-bold text-base text-brand-dark mb-1">{item.label}</h4>
                <p className="text-[11px] font-poppins text-brand-muted leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
