import React from 'react';
import { motion } from 'framer-motion';
import { Compass, ChevronRight, Star } from 'lucide-react';
import CoffeeCup from './CoffeeCup';
import { Link } from './Router';
import { getMenuItems } from '../data/coffeeDb';

export default function PopularSection() {
  // Load the first three items as our "featured popular drinks"
  const popularItems = getMenuItems().slice(0, 3);

  return (
    <section className="relative py-28 bg-[#032B2B] px-4 overflow-hidden w-full select-none" id="popular-section">
      
      {/* Decorative background blurs */}
      <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full bg-brand-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-brand-accent/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center mb-20 space-y-3">
          <span className="text-xs font-bold tracking-[0.25em] text-brand-accent uppercase font-montserrat">
            Barista Recommendations
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-montserrat text-white uppercase tracking-wider">
            Popular Creations
          </h2>
          <div className="w-16 h-1 bg-brand-primary mx-auto rounded-full" />
        </div>

        {/* 3 Featured Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch w-full max-w-6xl px-4">
          
          {popularItems.map((item, index) => {
            // Give the middle card a prominent visual style (white card accent, as specified by the palette guidelines)
            const isFeatured = index === 1;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -8 }}
                className={`relative rounded-[32px] p-8 flex flex-col justify-between transition-all duration-300 border ${
                  isFeatured
                    ? 'bg-white border-white text-brand-dark shadow-[0_20px_50px_rgba(0,130,72,0.25)] scale-105 z-10'
                    : 'bg-white/5 border-white/10 text-white hover:border-brand-primary/40 hover:bg-white/[0.08] shadow-[0_15px_35px_rgba(0,0,0,0.2)]'
                } w-full max-w-xs sm:max-w-sm mx-auto`}
              >
                {/* Popular Badge */}
                <div className="absolute top-6 left-6 flex items-center gap-1">
                  <Star size={12} className={isFeatured ? "text-brand-primary fill-brand-primary animate-pulse" : "text-brand-accent fill-brand-accent animate-pulse"} />
                  <span className={`text-[10px] font-extrabold font-montserrat uppercase tracking-wider ${isFeatured ? 'text-brand-primary' : 'text-brand-accent'}`}>
                    {index === 0 ? 'Trending' : index === 1 ? 'Chef Pick' : 'Seasonal'}
                  </span>
                </div>

                {/* Floating Coffee Cup Image */}
                <div className="relative flex justify-center w-full h-44 mt-6">
                  <CoffeeCup
                    size="w-36 h-36 md:w-40 h-40"
                    rotation={item.rotation}
                    animateFloat={isFeatured}
                    hoverScale={1.05}
                    shadow={true}
                    imgFilter={item.imgFilter}
                  />
                </div>

                {/* Content Block */}
                <div className="mt-8 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-2">
                    <span className={`text-[10px] font-bold font-montserrat uppercase tracking-wider block ${isFeatured ? 'text-brand-primary/80' : 'text-brand-accent/80'}`}>
                      {item.origin.split(' ')[0]} / {item.roast.split(' ')[0]}
                    </span>
                    <h3 className="font-montserrat font-extrabold text-xl tracking-tight leading-tight">
                      {item.name}
                    </h3>
                    <p className={`text-xs font-poppins line-clamp-3 leading-relaxed ${isFeatured ? 'text-gray-600' : 'text-brand-textMuted'}`}>
                      {item.description}
                    </p>
                  </div>

                  {/* Action Link */}
                  <Link
                    href={`/menu/${item.slug}`}
                    className={`w-full py-3 rounded-2xl text-xs font-bold font-montserrat tracking-widest text-center flex items-center justify-center gap-1.5 transition-all duration-300 ${
                      isFeatured
                        ? 'bg-brand-primary text-white hover:bg-brand-dark hover:shadow-[0_5px_15px_rgba(0,130,72,0.3)]'
                        : 'bg-white/10 text-white border border-white/10 hover:bg-white hover:text-brand-dark hover:shadow-[0_5px_15px_rgba(255,255,255,0.15)]'
                    }`}
                  >
                    EXPLORE RECIPE
                    <ChevronRight size={14} />
                  </Link>
                </div>

              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
