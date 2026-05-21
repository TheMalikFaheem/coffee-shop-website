import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProductPreviewSlider from './components/ProductPreviewSlider';
import CategoryTabs from './components/CategoryTabs';
import ProductCarousel from './components/ProductCarousel';
import BrandingSection from './components/BrandingSection';
import PopularSection from './components/PopularSection';
import BranchesSection from './components/BranchesSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

// Hero Coffee Products
const HERO_PRODUCTS = [
  {
    id: 1,
    name: 'FRAPPUCCINO COFFEE DELIGHT',
    subtitle: 'WHERE EVERY CUP TELLS A STORY.',
    description: 'Indulge in the perfect blend of coffee and ice – the Frappuccino is your cold coffee escape. Elevate your coffee moment with a classic, ice Frappuccino delight.',
    price: '$8.6',
    shapeBg: 'bg-brand-primary', // Full Starbucks green shape background
    bannerText: 'FRAPPUCCINO',
    rotation: -12,
    imgFilter: '', // Standard rich color
  },
  {
    id: 2,
    name: 'CARAMEL TWIST FRAPP',
    subtitle: 'INDULGE IN SWEET HARMONY.',
    description: 'Rich buttery caramel sauce meets ice, fresh milk, and brewed espresso for a sweet, creamy harmony. Completed with whipped cream and dark caramel drizzle.',
    price: '$9.2',
    shapeBg: 'bg-[#B07238]', // Warm caramel/brown shape background
    bannerText: 'CARAMEL',
    rotation: 18,
    imgFilter: 'hue-rotate-[15deg] sepia(0.3) saturate(1.2) contrast(1.1)', // Warm caramel tint
  },
  {
    id: 3,
    name: 'VANILLA BEAN FRAPP',
    subtitle: 'A CRUSH OF CREAMY BLISS.',
    description: 'A rich, smooth, and creamy blend of real vanilla bean pods, cold milk, and crushed ice. Finished with whipped cream to elevate your sweet vanilla cravings.',
    price: '$8.8',
    shapeBg: 'bg-[#7A988D]', // Sage green shape background
    bannerText: 'VANILLA',
    rotation: -5,
    imgFilter: 'brightness(1.15) saturate(0.75)', // Vanilla cream tint
  },
];

export default function App() {
  const [activeProduct, setActiveProduct] = useState(HERO_PRODUCTS[0]);
  const [activeCategory, setActiveCategory] = useState('Drinks');
  const [cartCount, setCartCount] = useState(0);
  const [toastMessage, setToastMessage] = useState(null);

  // Triggered when any item is added to the cart
  const handleAddToCart = (product) => {
    setCartCount((prev) => prev + 1);
    
    // Build customization message if exists
    let message = `Added ${product.name} to cart!`;
    if (product.customizations) {
      message = `Added ${product.name} (${product.customizations.milk}, ${product.customizations.cream}) to cart!`;
    }

    setToastMessage(message);

    // Clear toast after 3 seconds
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-brand-dark text-white selection:bg-brand-primary selection:text-white font-poppins relative overflow-x-hidden">
      
      {/* Fixed Sticky Header */}
      <Navbar cartCount={cartCount} />

      {/* Main Page Layout Stack */}
      <main className="w-full flex flex-col items-center">
        
        {/* HERO AREA (Hero Section + Integrated Product Preview Slider) */}
        <div className="w-full relative bg-[#021A1A]">
          <HeroSection 
            activeProduct={activeProduct} 
            onAddToCart={handleAddToCart} 
          />
          <ProductPreviewSlider 
            products={HERO_PRODUCTS} 
            activeProduct={activeProduct} 
            onSelectProduct={setActiveProduct} 
          />
        </div>

        {/* CATEGORIES SECTION */}
        <CategoryTabs 
          activeTab={activeCategory} 
          onSelectTab={setActiveCategory} 
        />

        {/* CUSTOM COFFEE CAROUSEL */}
        <ProductCarousel onAddToCart={handleAddToCart} />

        {/* BRANDING QUALITY STATEMENT */}
        <BrandingSection />

        {/* POPULAR SELECTIONS */}
        <PopularSection onAddToCart={handleAddToCart} />

        {/* BRANCH LOCATIONS MAPS */}
        <BranchesSection />

        {/* CONTACT FORM & CTA */}
        <ContactSection />

      </main>

      {/* FOOTER */}
      <Footer />

      {/* FLOATING ACTION TOAST BAR */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 bg-brand-primary border border-brand-accent/30 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 max-w-sm"
          >
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <ShoppingCart size={16} className="text-white" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold font-montserrat uppercase tracking-wider text-brand-light">Item Added</p>
              <p className="text-xs font-semibold font-poppins text-white mt-0.5 line-clamp-2 leading-tight">
                {toastMessage}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
