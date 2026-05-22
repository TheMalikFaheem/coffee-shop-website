import React from 'react';
import { motion } from 'framer-motion';

/**
 * ProductPreviewSlider component.
 * Allows the user to select from 3 premium coffee flavors inside the Hero section.
 */
export default function ProductPreviewSlider({ products, activeProduct, onSelectProduct }) {
  return (
    <div className="max-w-7xl mx-auto w-full px-4 md:px-8 flex justify-start -mt-20 md:-mt-28 mb-16 relative z-20">
      <div className="flex gap-4 items-center bg-brand-cream/80 backdrop-blur-md px-5 py-3 rounded-3xl border border-brand-primary/10 shadow-warm-md">
        {products.map((product) => {
          const isActive = activeProduct.id === product.id;
          return (
            <button
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className="relative focus:outline-none transition-transform duration-300 active:scale-95"
              aria-label={`Switch to ${product.name}`}
            >
              {/* Highlight Circle Container */}
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ${
                  isActive 
                    ? 'bg-brand-primary p-0.5 shadow-warm-sm scale-110' 
                    : 'bg-brand-primary/10 hover:bg-brand-primary/20 p-0.5'
                }`}
              >
                <div 
                  className={`w-full h-full rounded-full flex items-center justify-center overflow-hidden transition-colors duration-500 ${
                    isActive ? 'bg-brand-cream' : 'bg-brand-cream/50'
                  }`}
                >
                  <img
                    src="/coffee.png"
                    alt={product.name}
                    className="w-11 h-11 object-contain transition-transform duration-300"
                    style={{ 
                      filter: product.imgFilter ? `drop-shadow(0 4px 6px rgba(0,0,0,0.3)) ${product.imgFilter}` : 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))',
                      transform: isActive ? 'scale(1.1) rotate(0deg)' : 'scale(0.9) rotate(-15deg)'
                    }}
                    draggable="false"
                  />
                </div>
              </div>

              {/* Active Dot indicator */}
              {isActive && (
                <motion.div
                  layoutId="sliderDot"
                  className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-brand-primary rounded-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
