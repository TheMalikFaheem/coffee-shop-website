import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Flame, ArrowRight, SlidersHorizontal, Bean } from 'lucide-react';
import { Link } from './Router';
import CoffeeCup from './CoffeeCup';
import { getMenuItems } from '../data/coffeeDb';

export default function MenuView() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const menuItems = getMenuItems();

  // Extract unique categories (plus 'All')
  const categories = ['All', ...new Set(menuItems.map(item => item.category))];

  // Filter items
  const filteredItems = selectedCategory === 'All'
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#032B2B] text-white pt-32 pb-24 px-4 select-none relative overflow-hidden">
      
      {/* Background blurs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-primary/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-accent/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center">
        
        {/* Page Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-xs font-bold tracking-[0.3em] text-brand-accent uppercase font-montserrat block">
            Craft Selection
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-montserrat uppercase tracking-tight">
            The <span className="text-brand-accent">Menu</span>
          </h1>
          <p className="text-brand-textMuted text-sm font-poppins max-w-md mx-auto leading-relaxed">
            Discover our carefully curated selection of single-origin beans, house-boiled syrups, and custom recipe preparations.
          </p>
          <div className="w-20 h-1 bg-brand-primary mx-auto rounded-full mt-4" />
        </div>

        {/* Categories / Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-16 max-w-3xl">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-brand-textMuted font-montserrat uppercase mr-2">
            <SlidersHorizontal size={12} />
            Filters
          </div>
          {categories.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-5 py-2.5 rounded-full text-xs font-bold font-montserrat uppercase tracking-wider transition-all duration-300 border ${
                  active
                    ? 'border-brand-primary text-white bg-brand-primary shadow-[0_5px_15px_rgba(0,130,72,0.3)]'
                    : 'border-white/10 text-brand-textMuted bg-white/5 hover:border-white/30 hover:text-white'
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl px-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -6 }}
                className="group bg-white/5 border border-white/10 rounded-[35px] p-6 flex flex-col justify-between hover:border-brand-primary/30 transition-all duration-300 shadow-[0_15px_30px_rgba(0,0,0,0.2)]"
              >
                <div>
                  {/* Floating Coffee Image Container */}
                  <div className="relative w-full h-48 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center overflow-hidden mb-6">
                    {/* Glowing background blob */}
                    <div className={`absolute w-32 h-32 rounded-full ${item.shapeBg} opacity-10 blur-xl z-0`} />
                    
                    <CoffeeCup
                      size="w-36 h-36"
                      rotation={item.rotation || 0}
                      animateFloat={true}
                      hoverScale={1.05}
                      shadow={true}
                      imgFilter={item.imgFilter}
                    />

                    {/* Quick Specs overlay */}
                    <div className="absolute bottom-3 left-3 right-3 flex justify-between text-[9px] font-bold font-montserrat uppercase tracking-wider text-brand-textMuted">
                      <span className="flex items-center gap-1">
                        <Compass size={10} />
                        {item.origin.split(' ')[0]}
                      </span>
                      <span className="flex items-center gap-1">
                        <Flame size={10} />
                        {item.roast.split(' ')[0]}
                      </span>
                    </div>
                  </div>

                  {/* Metadata and Title */}
                  <div className="space-y-2 text-left">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold font-montserrat text-brand-accent uppercase tracking-widest">
                        {item.category}
                      </span>
                      <div className="flex gap-0.5 items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Bean
                            key={i}
                            size={10}
                            className={i < item.strength ? 'text-brand-accent fill-brand-accent' : 'text-white/20'}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <h2 className="font-montserrat font-extrabold text-xl tracking-tight text-white group-hover:text-brand-accent transition-colors duration-300">
                      {item.name}
                    </h2>
                    
                    <p className="text-xs font-poppins text-brand-textMuted leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Bottom link button */}
                <div className="pt-6">
                  <Link
                    href={`/menu/${item.slug}`}
                    className="w-full py-3 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-primary text-white hover:bg-brand-primary text-xs font-bold font-montserrat tracking-widest text-center flex items-center justify-center gap-1.5 transition-all duration-300 hover:shadow-[0_4px_15px_rgba(0,130,72,0.3)]"
                  >
                    EXPLORE RECIPE DETAILS
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <p className="text-brand-textMuted font-poppins text-sm">
              No creations found in this category.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
