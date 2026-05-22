import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Flame, ArrowRight, SlidersHorizontal, Bean } from 'lucide-react';
import { Link } from './Router';
import CoffeeCup from './CoffeeCup';
import { getMenuItems } from '../data/coffeeDb';

export default function MenuView() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const menuItems = getMenuItems();

  const categories = ['All', ...new Set(menuItems.map(item => item.category))];
  const filteredItems = selectedCategory === 'All'
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-cream-gradient text-brand-dark pt-32 pb-24 px-4 select-none relative overflow-hidden">
      
      {/* Ambient background orbs */}
      <div className="absolute top-1/4 left-1/5 w-[500px] h-[500px] bg-brand-caramel/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/5 w-[400px] h-[400px] bg-brand-primary/6 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center">
        
        {/* Page Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-xs font-bold tracking-[0.35em] text-brand-caramel uppercase font-montserrat block">
            Craft Selection
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-playfair font-bold text-brand-dark">
            Our <em className="text-brand-primary not-italic">Menu</em>
          </h1>
          <p className="text-brand-muted text-sm font-poppins max-w-md mx-auto leading-relaxed">
            Discover our carefully curated selection of single-origin beans, house-blended syrups, and custom recipe preparations.
          </p>
          <div className="w-16 h-0.5 bg-brand-caramel/50 mx-auto rounded-full mt-4" />
        </div>

        {/* Category Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-16 max-w-3xl">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-brand-beige border border-brand-primary/15 rounded-full text-xs font-bold text-brand-muted font-montserrat uppercase mr-2">
            <SlidersHorizontal size={11} />
            Filter
          </div>
          {categories.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold font-montserrat uppercase tracking-wider transition-all duration-300 border ${
                  active
                    ? 'bg-brand-primary border-brand-primary text-brand-cream shadow-warm-sm'
                    : 'bg-brand-beige border-brand-primary/20 text-brand-muted hover:border-brand-primary/50 hover:text-brand-dark'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl px-2"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.35 }}
                whileHover={{ y: -6 }}
                className="group bg-white/70 border border-brand-primary/12 rounded-[32px] p-6 flex flex-col justify-between hover:border-brand-primary/35 transition-all duration-300 shadow-warm-sm hover:shadow-warm-md backdrop-blur-sm"
              >
                <div>
                  {/* Product Image Container */}
                  <div className="relative w-full h-52 rounded-2xl bg-brand-latte/60 border border-brand-primary/8 flex items-center justify-center overflow-hidden mb-6">
                    {/* Warm glow blob */}
                    <div className="absolute w-36 h-36 bg-brand-caramel/20 rounded-full blur-2xl z-0" />
                    
                    <CoffeeCup
                      size="w-36 h-36"
                      rotation={item.rotation || 0}
                      animateFloat={true}
                      hoverScale={1.06}
                      shadow={false}
                      imgFilter={item.imgFilter}
                    />

                    {/* Spec overlay */}
                    <div className="absolute bottom-3 left-3 right-3 flex justify-between text-[9px] font-bold font-montserrat uppercase tracking-wider text-brand-muted">
                      <span className="flex items-center gap-1">
                        <Compass size={9} />
                        {item.origin.split(' ')[0]}
                      </span>
                      <span className="flex items-center gap-1">
                        <Flame size={9} />
                        {item.roast.split(' ')[0]}
                      </span>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="space-y-2.5 text-left">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold font-montserrat text-brand-caramel uppercase tracking-widest">
                        {item.category}
                      </span>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Bean
                            key={i}
                            size={10}
                            className={i < item.strength ? 'text-brand-primary fill-brand-primary' : 'text-brand-primary/20'}
                          />
                        ))}
                      </div>
                    </div>

                    <h2 className="font-playfair font-bold text-xl text-brand-dark group-hover:text-brand-primary transition-colors duration-300 leading-snug">
                      {item.name}
                    </h2>

                    <p className="text-xs font-poppins text-brand-muted leading-relaxed line-clamp-3">
                      {item.description}
                    </p>

                    {/* Flavor tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.tags?.slice(0, 2).map((tag, i) => (
                        <span key={i} className="text-[9px] px-2.5 py-1 rounded-full bg-brand-beige border border-brand-primary/15 text-brand-muted font-montserrat font-bold uppercase tracking-wide">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-5">
                  <Link
                    href={`/menu/${item.slug}`}
                    className="w-full py-3.5 rounded-2xl bg-brand-primary/8 border border-brand-primary/25 hover:bg-brand-primary hover:border-brand-primary text-brand-primary hover:text-brand-cream text-xs font-bold font-montserrat tracking-widest text-center flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-warm-sm"
                  >
                    EXPLORE RECIPE
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <p className="text-brand-muted font-poppins text-sm">
              No creations found in this category yet.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
