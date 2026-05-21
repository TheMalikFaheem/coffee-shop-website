import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';

const CAROUSEL_PRODUCTS = [
  {
    id: 'c1',
    name: 'Caramel Latte',
    basePrice: 5.50,
    imgFilter: 'hue-rotate-[15deg] sepia(0.3) saturate(1.2) contrast(1.1)', // Golden caramel tint
  },
  {
    id: 'c2',
    name: 'Mocha Frapp',
    basePrice: 6.20,
    imgFilter: '', // Standard rich mocha cup
  },
  {
    id: 'c3',
    name: 'Vanilla Bean',
    basePrice: 5.80,
    imgFilter: 'brightness(1.1) saturate(0.8)', // Creamy vanilla tint
  },
  {
    id: 'c4',
    name: 'Hazelnut Brew',
    basePrice: 6.00,
    imgFilter: 'hue-rotate-[340deg] saturate(1.1) contrast(1.05)', // Warm hazelnut tint
  },
];

export default function ProductCarousel({ onAddToCart }) {
  // Mocha Frapp is active by default (index 1) as shown in the Starbucks UI mockup
  const [activeIndex, setActiveIndex] = useState(1);

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? CAROUSEL_PRODUCTS.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === CAROUSEL_PRODUCTS.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <section className="relative py-24 bg-brand-dark px-4 overflow-hidden w-full select-none" id="menu">
      
      {/* Background Decorative Rings */}
      <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full bg-brand-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-brand-accent/5 blur-[120px] pointer-events-none" />

      {/* Outer wrapper */}
      <div className="max-w-7xl mx-auto relative flex flex-col items-center">
        
        {/* Navigation Arrows & Section container */}
        <div className="w-full flex items-center justify-between gap-4 mb-16 px-4 md:px-12">
          
          {/* Left Arrow Button */}
          <motion.button
            onClick={handlePrev}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 rounded-full border border-white/20 bg-[#022121]/60 hover:bg-brand-primary hover:border-brand-primary text-white flex items-center justify-center transition-all duration-300 shadow-lg cursor-pointer shrink-0 z-20"
            aria-label="Previous Coffee"
          >
            <ChevronLeft size={24} className="stroke-[2.5]" />
          </motion.button>

          {/* Section Header */}
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold font-montserrat tracking-tight text-white uppercase">
              SELECT YOUR <span className="text-brand-accent">CRAFT</span>
            </h2>
            <p className="text-brand-textMuted text-xs sm:text-sm font-poppins mt-2 max-w-sm mx-auto">
              Choose your cup and customize milk, cream, and toppings to create your perfect escape.
            </p>
          </div>

          {/* Right Arrow Button */}
          <motion.button
            onClick={handleNext}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 rounded-full border border-white/20 bg-[#022121]/60 hover:bg-brand-primary hover:border-brand-primary text-white flex items-center justify-center transition-all duration-300 shadow-lg cursor-pointer shrink-0 z-20"
            aria-label="Next Coffee"
          >
            <ChevronRight size={24} className="stroke-[2.5]" />
          </motion.button>

        </div>

        {/* Carousel Slider Window */}
        <div className="w-full overflow-visible relative flex items-center justify-center">
          
          {/* Cards Flex Row with responsive layout */}
          <div className="hidden lg:grid grid-cols-4 gap-6 w-full max-w-5xl px-4 items-center">
            {CAROUSEL_PRODUCTS.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                isActive={activeIndex === idx}
                onClick={() => setActiveIndex(idx)}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>

          {/* Mobile/Tablet Adaptive Slider View (fades the active item) */}
          <div className="flex lg:hidden w-full max-w-sm px-4 justify-center items-center relative min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, scale: 0.95 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="w-full flex justify-center"
              >
                <ProductCard
                  product={CAROUSEL_PRODUCTS[activeIndex]}
                  isActive={true} // In mobile view, the single visible item is always styled active
                  onClick={null}
                  onAddToCart={onAddToCart}
                />
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Dots indicator */}
        <div className="flex gap-2.5 justify-center mt-12">
          {CAROUSEL_PRODUCTS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2 rounded-full transition-all duration-500 ${
                activeIndex === idx ? 'w-8 bg-brand-accent' : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
