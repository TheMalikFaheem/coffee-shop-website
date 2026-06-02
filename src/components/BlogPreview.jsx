import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Calendar, ChevronRight, Tag } from 'lucide-react';
import { Link } from './Router';
import { getBlogPosts } from '../data/coffeeDb';

const ALL_CATEGORIES = ['All', 'Brewing', 'Origins', 'Lifestyle', 'Recipes'];

export default function BlogPreview() {
  const allPosts = getBlogPosts();
  const [activeCategory, setActiveCategory] = useState('All');

  // Map posts to categories cyclically for display purposes
  const categoryMap = ['Brewing', 'Origins', 'Lifestyle', 'Recipes', 'Brewing', 'Origins'];
  const taggedPosts = allPosts.slice(0, 6).map((p, i) => ({
    ...p,
    displayCategory: p.tags?.[0] ? p.tags[0] : categoryMap[i % categoryMap.length],
  }));

  const filteredPosts = activeCategory === 'All'
    ? taggedPosts
    : taggedPosts.filter(p => p.displayCategory?.toLowerCase().includes(activeCategory.toLowerCase()) || p.tags?.some(t => t.toLowerCase().includes(activeCategory.toLowerCase())));

  const featured = filteredPosts[0];
  const rest = filteredPosts.slice(1, 3);

  return (
    <section className="relative py-28 bg-cream-gradient px-4 overflow-hidden w-full select-none" id="blog-preview">
      
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-caramel/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-brand-primary/6 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col items-center relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 space-y-3"
        >
          <span className="text-xs font-bold tracking-[0.3em] text-brand-caramel uppercase font-montserrat block">
            Verdant Journal
          </span>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-brand-dark">
            Stories &amp; <em className="text-brand-primary not-italic">Craft</em>
          </h2>
          <div className="w-14 h-0.5 bg-brand-caramel/50 mx-auto rounded-full mt-3" />
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-12"
        >
          <Tag size={11} className="text-brand-muted" />
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold font-montserrat uppercase tracking-wider transition-all duration-300 border ${
                activeCategory === cat
                  ? 'bg-brand-primary border-brand-primary text-brand-cream shadow-warm-sm'
                  : 'bg-brand-beige border-brand-primary/20 text-brand-muted hover:border-brand-primary/50 hover:text-brand-dark'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Featured + 2-stack Layout */}
        <AnimatePresence mode="wait">
          {featured ? (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-5 gap-7 w-full mb-12"
            >
              {/* Featured Article — 3 cols */}
              <Link
                href={`/blog/${featured.slug}`}
                className="lg:col-span-3 group flex flex-col bg-white/70 border border-brand-primary/12 rounded-3xl overflow-hidden hover:border-brand-primary/35 hover:shadow-warm-md transition-all duration-400 shadow-warm-sm backdrop-blur-sm"
              >
                {/* Image */}
                <div className="relative h-64 w-full overflow-hidden bg-brand-beige">
                  <img
                    src={featured.coverImage}
                    alt={featured.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ transition: 'transform 0.7s ease' }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-brand-dark/20 to-transparent" />
                  
                  {/* Category badge */}
                  {featured.tags?.[0] && (
                    <span className="absolute top-4 left-4 text-[9px] font-bold font-montserrat uppercase tracking-wider bg-brand-primary px-2.5 py-1 rounded-md text-brand-cream">
                      {featured.tags[0]}
                    </span>
                  )}
                  
                  {/* Featured label */}
                  <span className="absolute top-4 right-4 text-[9px] font-bold font-montserrat uppercase tracking-wider bg-brand-gold/90 px-2.5 py-1 rounded-md text-brand-velvet">
                    Featured
                  </span>

                  {/* Title overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-playfair font-bold text-2xl text-brand-cream leading-snug group-hover:text-brand-latte transition-colors duration-300">
                      {featured.title}
                    </h3>
                    <div className="flex items-center gap-4 text-[10px] font-bold font-montserrat text-brand-cream/60 uppercase tracking-wider mt-2">
                      <span className="flex items-center gap-1"><Calendar size={9} />{featured.date}</span>
                      <span className="flex items-center gap-1"><BookOpen size={9} />{featured.readTime}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom text */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-sm font-poppins text-brand-muted leading-relaxed line-clamp-3">
                    {featured.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold font-montserrat text-brand-primary group-hover:text-brand-mocha transition-colors duration-300">
                    READ FULL ARTICLE
                    <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </div>
              </Link>

              {/* 2 stacked smaller cards — 2 cols */}
              <div className="lg:col-span-2 flex flex-col gap-5">
                {rest.map((post, index) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col bg-white/70 border border-brand-primary/12 rounded-3xl overflow-hidden hover:border-brand-primary/35 hover:shadow-warm-md transition-all duration-300 shadow-warm-sm backdrop-blur-sm flex-1"
                  >
                    {/* Compact image */}
                    <div className="relative h-36 w-full overflow-hidden bg-brand-beige">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-cream/40 to-transparent" />
                      {post.tags?.[0] && (
                        <span className="absolute top-3 left-3 text-[9px] font-bold font-montserrat uppercase tracking-wider bg-brand-primary px-2 py-0.5 rounded-md text-brand-cream">
                          {post.tags[0]}
                        </span>
                      )}
                    </div>

                    <div className="p-4 flex flex-col gap-2 flex-1">
                      <div className="flex items-center gap-3 text-[10px] font-bold font-montserrat text-brand-muted uppercase tracking-wider">
                        <span className="flex items-center gap-1"><Calendar size={9} />{post.date}</span>
                        <span className="flex items-center gap-1"><BookOpen size={9} />{post.readTime}</span>
                      </div>
                      <h3 className="font-playfair font-bold text-base text-brand-dark group-hover:text-brand-primary transition-colors duration-300 line-clamp-2 leading-snug">
                        {post.title}
                      </h3>
                      <span className="mt-auto inline-flex items-center gap-1 text-xs font-bold font-montserrat text-brand-primary group-hover:text-brand-mocha transition-colors duration-300">
                        READ <ChevronRight size={11} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-20 text-center text-brand-muted font-poppins text-sm mb-12"
            >
              No articles in this category yet.
            </motion.div>
          )}
        </AnimatePresence>

        {/* Browse All CTA */}
        <Link
          href="/blog"
          className="px-8 py-3.5 bg-brand-primary hover:bg-brand-mocha text-brand-cream border border-brand-primary rounded-full font-bold font-montserrat text-xs tracking-widest transition-all duration-300 shadow-warm-sm hover:shadow-warm-md flex items-center gap-2 group"
        >
          BROWSE ALL JOURNAL ENTRIES
          <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform duration-300" />
        </Link>

      </div>
    </section>
  );
}
