import React from 'react';
import { motion } from 'framer-motion';
import { Compass, ChevronRight, Star } from 'lucide-react';
import CoffeeCup from './CoffeeCup';
import { Link } from './Router';
import { getMenuItems } from '../data/coffeeDb';

export default function PopularSection() {
  const popularItems = getMenuItems().slice(0, 3);

  return (
    <section className="relative py-28 bg-brand-beige/50 px-4 overflow-hidden w-full select-none" id="popular-section">
      
      {/* Ambient orbs */}
      <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full bg-brand-caramel/12 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-brand-primary/8 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col items-center">

        {/* Section Header */}
        <div className="text-center mb-20 space-y-3">
          <span className="text-xs font-bold tracking-[0.3em] text-brand-caramel uppercase font-montserrat block">
            Barista Recommendations
          </span>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-brand-dark">
            Popular <em className="text-brand-primary not-italic">Creations</em>
          </h2>
          <div className="w-14 h-0.5 bg-brand-caramel/50 mx-auto rounded-full" />
        </div>

        {/* 3 Featured Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch w-full max-w-6xl px-4">
          {popularItems.map((item, index) => {
            const isFeatured = index === 1;
            const badges = ['Trending', "Chef's Pick", 'Seasonal'];

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -8 }}
                className={`relative rounded-[32px] p-8 flex flex-col justify-between transition-all duration-300 border w-full max-w-xs sm:max-w-sm mx-auto ${
                  isFeatured
                    ? 'bg-brand-primary border-brand-primary text-brand-cream shadow-warm-xl scale-105 z-10'
                    : 'bg-white/75 border-brand-primary/15 text-brand-dark hover:border-brand-primary/40 hover:shadow-warm-md shadow-warm-sm backdrop-blur-sm'
                }`}
              >
                {/* Badge */}
                <div className="absolute top-6 left-6 flex items-center gap-1.5">
                  <Star size={11} className={`fill-current ${isFeatured ? 'text-brand-latte animate-pulse-soft' : 'text-brand-caramel animate-pulse-soft'}`} />
                  <span className={`text-[10px] font-extrabold font-montserrat uppercase tracking-wider ${isFeatured ? 'text-brand-latte' : 'text-brand-caramel'}`}>
                    {badges[index]}
                  </span>
                </div>

                {/* Coffee Cup */}
                <div className="relative flex justify-center w-full h-44 mt-6">
                  <CoffeeCup
                    size="w-36 h-36 md:w-40 md:h-40"
                    rotation={item.rotation}
                    animateFloat={isFeatured}
                    hoverScale={1.06}
                    shadow={false}
                    imgFilter={item.imgFilter}
                  />
                </div>

                {/* Content */}
                <div className="mt-8 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-2">
                    <span className={`text-[10px] font-bold font-montserrat uppercase tracking-wider block ${isFeatured ? 'text-brand-latte/80' : 'text-brand-caramel'}`}>
                      {(item.origin || item.roast) 
                        ? [item.origin?.split(' ')[0], item.roast?.split(' ')[0]].filter(Boolean).join(' / ')
                        : item.category
                      }
                    </span>
                    <h3 className="font-playfair font-bold text-xl leading-tight">
                      {item.name}
                    </h3>
                    <p className={`text-xs font-poppins line-clamp-3 leading-relaxed ${isFeatured ? 'text-brand-latte/75' : 'text-brand-muted'}`}>
                      {item.description}
                    </p>
                  </div>

                  <Link
                    href={`/menu/${item.slug}`}
                    className={`w-full py-3.5 rounded-2xl text-xs font-bold font-montserrat tracking-widest text-center flex items-center justify-center gap-1.5 transition-all duration-300 ${
                      isFeatured
                        ? 'bg-brand-cream text-brand-primary hover:bg-brand-latte hover:shadow-warm-sm'
                        : 'bg-brand-primary/8 text-brand-primary border border-brand-primary/25 hover:bg-brand-primary hover:text-brand-cream hover:shadow-warm-sm'
                    }`}
                  >
                    EXPLORE RECIPE
                    <ChevronRight size={13} />
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
