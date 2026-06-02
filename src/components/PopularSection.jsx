import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Star, DollarSign } from 'lucide-react';
import CoffeeCup from './CoffeeCup';
import { Link } from './Router';
import { getMenuItems } from '../data/coffeeDb';

const PRICES = ['$5.90', '$6.50', '$7.20'];

function StarRating({ rating = 5, featured = false }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.07, duration: 0.3 }}
        >
          <Star
            size={11}
            className={`${i < rating ? 'fill-current' : 'opacity-30'} ${featured ? 'text-brand-latte' : 'text-brand-gold'}`}
          />
        </motion.div>
      ))}
    </div>
  );
}

export default function PopularSection() {
  const popularItems = getMenuItems().slice(0, 3);

  return (
    <section className="relative py-28 bg-brand-beige/50 px-4 overflow-hidden w-full select-none" id="popular-section">
      
      {/* Ambient orbs */}
      <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full bg-brand-caramel/12 blur-[120px] pointer-events-none animate-drift-slow" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-brand-primary/8 blur-[120px] pointer-events-none animate-drift-slow-alt" />

      <div className="max-w-7xl mx-auto flex flex-col items-center">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 space-y-3"
        >
          <span className="text-xs font-bold tracking-[0.3em] text-brand-caramel uppercase font-montserrat block">
            Barista Recommendations
          </span>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-brand-dark">
            Popular <em className="text-brand-primary not-italic">Creations</em>
          </h2>
          <div className="w-14 h-0.5 bg-gradient-to-r from-transparent via-brand-caramel/50 to-transparent mx-auto rounded-full" />
        </motion.div>

        {/* 3 Featured Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch w-full max-w-6xl px-4">
          {popularItems.map((item, index) => {
            const isFeatured = index === 1;
            const badges = ['Trending', "Most Loved", 'Seasonal'];
            const ratings = [4, 5, 4];

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`relative rounded-[32px] flex flex-col justify-between transition-all duration-500 border w-full max-w-xs sm:max-w-sm mx-auto shimmer-card ${
                  isFeatured
                    ? 'gradient-border bg-brand-primary text-brand-cream shadow-warm-2xl scale-105 z-10'
                    : 'bg-white/75 border-brand-primary/15 text-brand-dark hover:border-brand-primary/40 hover:shadow-card-hover shadow-warm-sm backdrop-blur-sm tilt-card'
                }`}
                whileHover={isFeatured ? { y: -6, scale: 1.06 } : { y: -8 }}
              >
                {/* Price badge */}
                <div className={`absolute top-5 right-5 flex items-center gap-0.5 px-2.5 py-1.5 rounded-full text-[11px] font-black font-montserrat ${
                  isFeatured ? 'bg-brand-cream/15 text-brand-cream' : 'bg-brand-primary/8 border border-brand-primary/20 text-brand-primary'
                }`}>
                  {PRICES[index]}
                </div>

                {/* Badge */}
                <div className="absolute top-5 left-5 flex items-center gap-1.5">
                  <Star size={11} className={`fill-current ${isFeatured ? 'text-brand-gold animate-pulse-soft' : 'text-brand-caramel animate-pulse-soft'}`} />
                  <span className={`text-[10px] font-extrabold font-montserrat uppercase tracking-wider ${isFeatured ? 'text-brand-gold' : 'text-brand-caramel'}`}>
                    {badges[index]}
                  </span>
                </div>

                {/* Glow blob inside featured */}
                {isFeatured && (
                  <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-brand-caramel/20 rounded-full blur-[60px] pointer-events-none" />
                )}

                <div className="p-8 pt-14">
                  {/* Coffee Cup */}
                  <div className="relative flex justify-center w-full h-44 mb-2">
                    {isFeatured && (
                      <div className="absolute inset-0 bg-brand-caramel/10 rounded-full blur-3xl scale-75 translate-y-4" />
                    )}
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
                  <div className="mt-4 flex flex-col justify-between space-y-4">
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

                      {/* Star rating */}
                      <StarRating rating={ratings[index]} featured={isFeatured} />

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
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
