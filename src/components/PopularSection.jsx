import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import CoffeeCup from './CoffeeCup';

const POPULAR_ITEMS = [
  {
    id: 'p1',
    name: 'Mocha Brew',
    basePrice: '5.20',
    type: 'green', // Green banner styling
    imgFilter: 'saturate(1.2) contrast(1.1)',
    hasCartIcon: true,
  },
  {
    id: 'p2',
    name: 'Vanilla Latte',
    basePrice: '5.90',
    type: 'white-active', // Central elevated white card
    imgFilter: 'brightness(1.05) saturate(0.9)',
    hasCartIcon: false,
  },
  {
    id: 'p3',
    name: 'Vanilla Latte',
    basePrice: '5.90',
    type: 'white', // Standard white card
    imgFilter: 'brightness(1.05) saturate(0.9)',
    hasCartIcon: false,
  },
];

export default function PopularSection({ onAddToCart }) {
  return (
    <section className="relative py-24 bg-brand-dark px-4 overflow-hidden w-full select-none" id="rewards">
      
      {/* Decorative radial gradients */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-brand-primary/5 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full bg-brand-accent/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Section Header with Green Accent Banner */}
        <div className="relative mb-20 flex justify-center">
          <div className="bg-white text-brand-dark font-montserrat font-black text-2xl md:text-3xl px-12 py-3 rounded-md shadow-lg uppercase relative overflow-hidden flex items-center justify-center">
            <span>POPULAR</span>
            {/* Green accent fold/ribbon at the right */}
            <div className="absolute right-0 top-0 bottom-0 w-3 bg-brand-accent transform skew-x-12 translate-x-1" />
          </div>
        </div>

        {/* 3 Featured Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-center w-full max-w-5xl px-4">
          
          {POPULAR_ITEMS.map((item, index) => {
            const isCenter = index === 1; // Vanilla Latte A (Center) is elevated
            const isGreen = item.type === 'green';

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: isCenter ? -12 : -8 }}
                className={`relative rounded-3xl p-6 flex flex-col items-center justify-between transition-smooth border ${
                  isGreen
                    ? 'bg-[#022121]/90 border-brand-accent/30 text-white min-h-[380px] shadow-lg'
                    : isCenter
                    ? 'bg-white border-gray-100 text-brand-dark scale-105 min-h-[420px] shadow-[0_15px_35px_rgba(0,130,72,0.15)] z-10'
                    : 'bg-white border-gray-100 text-brand-dark min-h-[380px] shadow-md'
                } w-full max-w-[280px] sm:max-w-xs mx-auto`}
              >
                
                {/* Coffee Cup Container with optional center overlay icon */}
                <div className="relative flex justify-center w-full h-36 mt-4">
                  <CoffeeCup
                    size="w-32 h-32 md:w-36 h-36"
                    rotation={isGreen ? -10 : isCenter ? 5 : 0}
                    animateFloat={isCenter}
                    hoverScale={1.1}
                    shadow={false}
                    imgFilter={item.imgFilter}
                  />

                  {/* Optional Green Circle Cart Icon overlayed on the cup */}
                  {item.hasCartIcon && (
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ repeat: Infinity, duration: 3 }}
                      className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-brand-primary border border-brand-accent/30 flex items-center justify-center shadow-lg z-20 cursor-pointer hover:bg-brand-accent transition-colors duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart({ ...item, price: item.basePrice });
                      }}
                    >
                      <ShoppingCart size={16} className="text-white fill-white" />
                    </motion.div>
                  )}
                </div>

                {/* Info Text */}
                <div className="text-center mt-6 w-full flex-1 flex flex-col justify-end">
                  
                  {/* Left green flag banner for MOCHA BREW */}
                  {isGreen ? (
                    <div className="w-full bg-brand-primary/20 border border-brand-primary py-2.5 rounded-2xl relative overflow-hidden mb-2">
                      <h3 className="font-montserrat font-black text-sm tracking-widest uppercase text-white">
                        {item.name}
                      </h3>
                      {/* Ribbon left-right fold shadows */}
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-accent" />
                      <div className="absolute right-0 top-0 bottom-0 w-1 bg-brand-accent" />
                    </div>
                  ) : (
                    <div className="mb-4">
                      <h3 className="font-montserrat font-black text-lg tracking-wide uppercase text-brand-dark">
                        {item.name}
                      </h3>
                      <span className="text-sm font-bold font-poppins text-brand-primary">
                        ${item.basePrice}
                      </span>
                    </div>
                  )}

                  {/* Bottom Action Button */}
                  {!isGreen && (
                    <motion.button
                      onClick={() => onAddToCart({ ...item, price: item.basePrice })}
                      whileTap={{ scale: 0.95 }}
                      className="w-full py-2.5 rounded-full bg-brand-primary text-white text-xs font-bold font-montserrat tracking-widest hover:bg-brand-accent transition-colors duration-300 shadow-md"
                    >
                      ADD TO CART
                    </motion.button>
                  )}

                  {isGreen && (
                    <div className="h-2" /> // spacing helper for balance
                  )}

                </div>

              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
