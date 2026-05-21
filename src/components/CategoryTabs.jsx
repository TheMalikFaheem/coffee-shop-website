import React from 'react';
import { motion } from 'framer-motion';

/**
 * CategoryTabs component.
 * Allows filtering products below by categories: Drinks, Food, At Home, Merchandise.
 */
export default function CategoryTabs({ activeTab, onSelectTab }) {
  const tabs = ['Drinks', 'Food', 'At Home', 'Merchandise'];

  return (
    <div className="w-full flex justify-center py-8 bg-[#022121] border-y border-white/5 relative z-10 px-4 select-none">
      <div className="bg-brand-dark/90 p-1.5 rounded-full flex flex-wrap sm:flex-nowrap gap-1 items-center justify-center border border-white/10 shadow-[0_10px_25px_rgba(0,0,0,0.15)] max-w-lg w-full">
        {tabs.map((tab) => {
          const isActive = activeTab.toLowerCase() === tab.toLowerCase();
          return (
            <button
              key={tab}
              onClick={() => onSelectTab(tab)}
              className="relative py-2.5 px-6 rounded-full text-xs sm:text-sm font-bold font-montserrat uppercase tracking-wider transition-colors duration-300 focus:outline-none flex-1 whitespace-nowrap"
            >
              <span className={`relative z-10 ${isActive ? 'text-brand-dark' : 'text-brand-light/80 hover:text-white'}`}>
                {tab}
              </span>
              
              {isActive && (
                <motion.div
                  layoutId="activeTabBg"
                  className="absolute inset-0 bg-white rounded-full shadow-md"
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
