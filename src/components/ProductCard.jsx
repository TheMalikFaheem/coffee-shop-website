import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Plus, Check } from 'lucide-react';
import CoffeeCup from './CoffeeCup';

const MILK_OPTIONS = [
  { name: 'Whole Milk', price: 0 },
  { name: 'Oat Milk', price: 0.8 },
  { name: 'Almond Milk', price: 0.7 },
  { name: 'Coconut Milk', price: 0.9 },
];

const CREAM_OPTIONS = [
  { name: 'No Whip', price: 0 },
  { name: 'Regular Whip', price: 0.5 },
  { name: 'Extra Whip', price: 0.75 },
];

const TOPPING_OPTIONS = [
  { name: 'No Topping', price: 0 },
  { name: 'Cocoa Powder', price: 0.4 },
  { name: 'Caramel Drizzle', price: 0.6 },
  { name: 'Chocolate Chips', price: 0.8 },
];

export default function ProductCard({ product, isActive, onClick, onAddToCart }) {
  const [selectedMilk, setSelectedMilk] = useState(MILK_OPTIONS[0]);
  const [selectedCream, setSelectedCream] = useState(CREAM_OPTIONS[0]);
  const [selectedToppings, setSelectedToppings] = useState(TOPPING_OPTIONS[0]);
  
  // State to track which custom dropdown is currently open ('milk', 'cream', 'toppings', or null)
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Compute total price
  const totalPrice = useMemo(() => {
    return (product.basePrice + selectedMilk.price + selectedCream.price + selectedToppings.price).toFixed(2);
  }, [product.basePrice, selectedMilk, selectedCream, selectedToppings]);

  const handleDropdownToggle = (type, e) => {
    e.stopPropagation(); // Avoid triggering card selection
    if (activeDropdown === type) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(type);
    }
  };

  const handleSelectOption = (type, option, e) => {
    e.stopPropagation();
    if (type === 'milk') setSelectedMilk(option);
    if (type === 'cream') setSelectedCream(option);
    if (type === 'toppings') setSelectedToppings(option);
    setActiveDropdown(null);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart({
      ...product,
      customizations: {
        milk: selectedMilk.name,
        cream: selectedCream.name,
        toppings: selectedToppings.name,
      },
      price: totalPrice,
    });
  };

  // Dropdown list component
  const DropdownList = ({ type, currentOption, options }) => (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`absolute left-0 right-0 mt-1 z-30 rounded-xl shadow-xl overflow-hidden max-h-48 overflow-y-auto border ${
        isActive 
          ? 'bg-brand-primary border-brand-accent/30 text-white' 
          : 'bg-white border-gray-200 text-brand-dark'
      }`}
    >
      {options.map((option) => {
        const isSelected = option.name === currentOption.name;
        return (
          <button
            key={option.name}
            type="button"
            onClick={(e) => handleSelectOption(type, option, e)}
            className={`w-full text-left px-3 py-2 text-xs font-semibold flex items-center justify-between transition-colors ${
              isSelected
                ? isActive ? 'bg-brand-accent text-white' : 'bg-brand-primary/10 text-brand-primary'
                : isActive ? 'hover:bg-brand-accent/20' : 'hover:bg-gray-100'
            }`}
          >
            <span>{option.name}</span>
            <span className="flex items-center gap-1">
              {option.price > 0 && `+$${option.price.toFixed(2)}`}
              {isSelected && <Check size={12} className="stroke-[3]" />}
            </span>
          </button>
        );
      })}
    </motion.div>
  );

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -8 }}
      className={`relative rounded-3xl p-6 flex flex-col justify-between cursor-pointer select-none transition-smooth ${
        isActive
          ? 'bg-brand-primary text-white glow-card-active scale-105 z-10 border border-brand-accent/30'
          : 'glass-card text-brand-dark bg-white border border-gray-100 shadow-md scale-95'
      } w-full min-h-[460px] max-w-[280px] sm:max-w-xs mx-auto`}
    >
      {/* Product Image Floating out of Card */}
      <div className="flex justify-center -mt-16 mb-4 h-40">
        <CoffeeCup
          size="w-36 h-36 md:w-40 h-40"
          rotation={isActive ? 5 : -10}
          animateFloat={isActive}
          hoverScale={1.1}
          shadow={false} // Don't draw individual shadows as we have custom card layouts
          imgFilter={product.imgFilter}
        />
      </div>

      {/* Card Info */}
      <div className="flex-1 flex flex-col justify-start">
        <h3 className={`font-montserrat font-black text-lg tracking-wide uppercase text-center mt-2 ${
          isActive ? 'text-white' : 'text-brand-dark'
        }`}>
          {product.name}
        </h3>
        
        {/* Customized Selectors List */}
        <div className="mt-5 space-y-3 relative">
          
          {/* Milk Dropdown */}
          <div className="relative">
            <span className={`text-[10px] font-bold font-montserrat uppercase tracking-wider ${
              isActive ? 'text-brand-light/70' : 'text-gray-400'
            }`}>
              Milk Option
            </span>
            <button
              onClick={(e) => handleDropdownToggle('milk', e)}
              className={`w-full flex items-center justify-between mt-1 px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
                isActive
                  ? 'bg-white/10 border-white/15 text-white hover:bg-white/20'
                  : 'bg-gray-50 border-gray-200 text-brand-dark hover:bg-gray-100'
              }`}
            >
              <span>{selectedMilk.name}</span>
              <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === 'milk' ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {activeDropdown === 'milk' && (
                <DropdownList type="milk" currentOption={selectedMilk} options={MILK_OPTIONS} />
              )}
            </AnimatePresence>
          </div>

          {/* Cream Dropdown */}
          <div className="relative">
            <span className={`text-[10px] font-bold font-montserrat uppercase tracking-wider ${
              isActive ? 'text-brand-light/70' : 'text-gray-400'
            }`}>
              Whipped Cream
            </span>
            <button
              onClick={(e) => handleDropdownToggle('cream', e)}
              className={`w-full flex items-center justify-between mt-1 px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
                isActive
                  ? 'bg-white/10 border-white/15 text-white hover:bg-white/20'
                  : 'bg-gray-50 border-gray-200 text-brand-dark hover:bg-gray-100'
              }`}
            >
              <span>{selectedCream.name}</span>
              <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === 'cream' ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {activeDropdown === 'cream' && (
                <DropdownList type="cream" currentOption={selectedCream} options={CREAM_OPTIONS} />
              )}
            </AnimatePresence>
          </div>

          {/* Toppings Dropdown */}
          <div className="relative">
            <span className={`text-[10px] font-bold font-montserrat uppercase tracking-wider ${
              isActive ? 'text-brand-light/70' : 'text-gray-400'
            }`}>
              Topping Drizzle
            </span>
            <button
              onClick={(e) => handleDropdownToggle('toppings', e)}
              className={`w-full flex items-center justify-between mt-1 px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
                isActive
                  ? 'bg-white/10 border-white/15 text-white hover:bg-white/20'
                  : 'bg-gray-50 border-gray-200 text-brand-dark hover:bg-gray-100'
              }`}
            >
              <span>{selectedToppings.name}</span>
              <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === 'toppings' ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {activeDropdown === 'toppings' && (
                <DropdownList type="toppings" currentOption={selectedToppings} options={TOPPING_OPTIONS} />
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* Card Footer: Price & CTA */}
      <div className="mt-6 pt-4 border-t border-dashed border-gray-200/20 flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <span className={`text-[9px] font-bold uppercase tracking-wider ${isActive ? 'text-brand-light/60' : 'text-gray-400'}`}>
            Price
          </span>
          <span className={`text-xl font-extrabold font-poppins ${isActive ? 'text-white' : 'text-brand-dark'}`}>
            ${totalPrice}
          </span>
        </div>

        <motion.button
          onClick={handleAddToCart}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-4 py-2.5 rounded-full text-xs font-bold font-montserrat tracking-wider shadow-md flex items-center gap-1 transition-all ${
            isActive
              ? 'bg-white text-brand-primary hover:bg-brand-light'
              : 'bg-brand-primary text-white hover:bg-brand-accent'
          }`}
        >
          <Plus size={14} className="stroke-[2.5]" />
          ADD TO CART
        </motion.button>
      </div>

    </motion.div>
  );
}
