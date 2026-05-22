import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProductPreviewSlider from './components/ProductPreviewSlider';
import BrandingSection from './components/BrandingSection';
import PopularSection from './components/PopularSection';
import IngredientsHighlight from './components/IngredientsHighlight';
import BlogPreview from './components/BlogPreview';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import MenuView from './components/MenuView';
import MenuDetailView from './components/MenuDetailView';
import BlogView from './components/BlogView';
import BlogPostDetailView from './components/BlogPostDetailView';
import AdminView from './components/AdminView';
import { Router, useRouter, Link } from './components/Router';
import { getMenuItems } from './data/coffeeDb';

function AppContent() {
  const { path } = useRouter();
  const [heroProducts, setHeroProducts] = useState([]);
  const [activeProduct, setActiveProduct] = useState(null);

  // Synchronize dynamic products catalog with state
  const loadData = () => {
    const items = getMenuItems();
    // Slice first 3 products for the home hero selection
    const activeSlice = items.slice(0, 3);
    setHeroProducts(activeSlice);
    
    if (activeSlice.length > 0) {
      setActiveProduct((prev) => {
        if (prev) {
          const match = activeSlice.find((p) => p.slug === prev.slug);
          if (match) return match;
        }
        return activeSlice[0];
      });
    }
  };

  useEffect(() => {
    loadData();
    // Listen for custom CMS events so lists update in real-time
    window.addEventListener('coffee_db_update', loadData);
    return () => window.removeEventListener('coffee_db_update', loadData);
  }, []);

  // Conditional rendering router map
  const renderView = () => {
    if (path === '/' || path === '') {
      return (
        <>
          {/* Main Hero Slider visual wrapper */}
          <div className="w-full relative bg-[#021A1A]">
            {activeProduct && <HeroSection activeProduct={activeProduct} />}
            {heroProducts.length > 0 && activeProduct && (
              <ProductPreviewSlider
                products={heroProducts}
                activeProduct={activeProduct}
                onSelectProduct={setActiveProduct}
              />
            )}
          </div>

          {/* Popular creations selection */}
          <PopularSection />

          {/* Branding statement section */}
          <BrandingSection />

          {/* Ingredients Showcase cards */}
          <IngredientsHighlight />

          {/* Blog/Journal preview grid */}
          <BlogPreview />

          {/* Contact form card */}
          <ContactSection />
        </>
      );
    }

    if (path === '/menu') {
      return <MenuView />;
    }

    if (path.startsWith('/menu/')) {
      const slug = path.replace('/menu/', '');
      return <MenuDetailView slug={slug} />;
    }

    if (path === '/blog') {
      return <BlogView />;
    }

    if (path.startsWith('/blog/')) {
      const slug = path.replace('/blog/', '');
      return <BlogPostDetailView slug={slug} />;
    }

    if (path === '/admin') {
      return <AdminView />;
    }

    // 404 Route Not Found fallback block
    return (
      <div className="min-h-screen bg-[#032B2B] flex flex-col items-center justify-center py-20 text-center select-none">
        <div className="space-y-4 max-w-sm px-4">
          <h2 className="text-3xl font-black font-montserrat text-white uppercase tracking-wider">404 - NOT FOUND</h2>
          <p className="text-brand-textMuted text-xs font-poppins">
            The premium catalog route you requested is unavailable or has been changed.
          </p>
          <Link
            href="/"
            className="inline-block mt-4 px-6 py-2.5 bg-brand-primary text-white text-xs font-bold font-montserrat tracking-widest rounded-full uppercase"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-brand-dark text-white selection:bg-brand-primary selection:text-white font-poppins relative overflow-x-hidden">
      
      {/* Global Header */}
      <Navbar />

      {/* Dynamic View container with Framer Motion transitions */}
      <main className="w-full flex flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={path}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="w-full"
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Footer */}
      <Footer />

    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
