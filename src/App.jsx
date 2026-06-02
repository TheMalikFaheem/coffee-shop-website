import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProductPreviewSlider from './components/ProductPreviewSlider';
import BrandingSection from './components/BrandingSection';
import PopularSection from './components/PopularSection';
import IngredientsHighlight from './components/IngredientsHighlight';
import TestimonialsSection from './components/TestimonialsSection';
import ExperienceSection from './components/ExperienceSection';
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
          <div className="w-full relative bg-[#F6F1EA]">
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

          {/* Testimonials — worldwide guest reviews */}
          <TestimonialsSection />

          {/* Ingredients Showcase cards */}
          <IngredientsHighlight />

          {/* Visit Our Café experience section */}
          <ExperienceSection />

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
      <div className="min-h-screen bg-cream-gradient flex flex-col items-center justify-center py-20 text-center select-none">
        <div className="space-y-5 max-w-sm px-4">
          <p className="text-xs font-bold font-montserrat tracking-[0.25em] text-brand-caramel uppercase">404 — Page Not Found</p>
          <h2 className="text-4xl font-playfair font-bold text-brand-dark">Lost in the Blend?</h2>
          <p className="text-brand-muted text-sm font-poppins leading-relaxed">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            href="/"
            className="inline-block mt-4 px-7 py-3 bg-brand-primary hover:bg-brand-mocha text-brand-cream text-xs font-bold font-montserrat tracking-widest rounded-full uppercase shadow-warm-sm transition-colors duration-300"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-brand-cream text-brand-dark selection:bg-brand-primary selection:text-brand-cream font-poppins relative overflow-x-hidden">
      
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
