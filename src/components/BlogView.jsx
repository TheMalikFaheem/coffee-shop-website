import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, ArrowRight, User } from 'lucide-react';
import { Link } from './Router';
import { getBlogPosts } from '../data/coffeeDb';

export default function BlogView() {
  const posts = getBlogPosts();
  const featuredPost = posts[0];
  const gridPosts = posts.slice(1);

  return (
    <div className="min-h-screen bg-[#032B2B] text-white pt-32 pb-24 px-4 select-none relative overflow-hidden">
      
      {/* Background blurs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-primary/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-accent/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10 flex flex-col items-center">
        
        {/* Page Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-xs font-bold tracking-[0.3em] text-brand-accent uppercase font-montserrat block">
            Verdant Press
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-montserrat uppercase tracking-tight">
            The <span className="text-brand-accent">Journal</span>
          </h1>
          <p className="text-brand-textMuted text-sm font-poppins max-w-md mx-auto leading-relaxed">
            Read about our sourcing travels, coffee roasting science, and guides to slow home brewing.
          </p>
          <div className="w-20 h-1 bg-brand-primary mx-auto rounded-full mt-4" />
        </div>

        {/* 1. FEATURED ARTICLE BANNER */}
        {featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="group w-full max-w-5xl bg-white/5 border border-white/10 rounded-[35px] overflow-hidden hover:border-brand-primary/30 transition-all duration-300 shadow-[0_20px_40px_rgba(0,0,0,0.3)] mb-16 grid grid-cols-1 lg:grid-cols-12 items-stretch"
          >
            {/* Featured Image (7 cols on desktop) */}
            <div className="lg:col-span-7 relative min-h-[260px] sm:min-h-[320px] overflow-hidden bg-brand-dark">
              <img
                src={featuredPost.coverImage}
                alt={featuredPost.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/80 lg:from-transparent to-transparent z-10" />
              
              <span className="absolute top-6 left-6 text-[10px] font-bold font-montserrat uppercase tracking-wider bg-brand-primary px-3 py-1.5 rounded-lg text-white z-20 shadow-md">
                Featured Article
              </span>
            </div>

            {/* Featured Content (5 cols on desktop) */}
            <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-6 text-left relative z-20">
              <div className="space-y-4">
                {/* Meta row */}
                <div className="flex items-center gap-4 text-[10px] font-bold font-montserrat text-brand-textMuted uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={12} />
                    {featuredPost.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <BookOpen size={12} />
                    {featuredPost.readTime}
                  </span>
                </div>

                {/* Title */}
                <h2 className="font-montserrat font-extrabold text-2xl sm:text-3xl text-white group-hover:text-brand-accent transition-colors duration-300 leading-tight">
                  {featuredPost.title}
                </h2>

                {/* Description */}
                <p className="text-xs font-poppins text-brand-textMuted leading-relaxed line-clamp-4">
                  {featuredPost.description}
                </p>
              </div>

              {/* Author & CTA Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-brand-accent font-montserrat font-extrabold text-xs">
                    <User size={12} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold font-montserrat uppercase block text-white">
                      {featuredPost.author}
                    </span>
                    <span className="text-[8px] font-poppins font-medium text-brand-textMuted uppercase block leading-none">
                      {featuredPost.role || 'Contributor'}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-full bg-brand-primary hover:bg-brand-accent text-white text-xs font-bold font-montserrat tracking-widest transition-all duration-300 shadow-md"
                >
                  READ STORY
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {/* 2. ARTICLES GRID */}
        {gridPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl px-4">
            {gridPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex flex-col bg-white/5 border border-white/10 rounded-[30px] overflow-hidden hover:border-brand-primary/30 transition-all duration-300 shadow-lg"
              >
                {/* Image */}
                <div className="relative h-56 w-full overflow-hidden bg-brand-dark">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {post.tags && post.tags[0] && (
                    <span className="absolute top-4 left-4 text-[9px] font-bold font-montserrat uppercase tracking-wider bg-brand-primary px-2.5 py-1 rounded-md text-white">
                      {post.tags[0]}
                    </span>
                  )}
                </div>

                {/* Text */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5 text-left">
                  <div className="space-y-3">
                    {/* Meta Row */}
                    <div className="flex items-center gap-4 text-[10px] font-bold font-montserrat text-brand-textMuted uppercase tracking-wider">
                      <span className="flex items-center gap-1">
                        <Calendar size={10} />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen size={10} />
                        {post.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-montserrat font-bold text-lg text-white group-hover:text-brand-accent transition-colors duration-300 line-clamp-2 leading-snug">
                      {post.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs font-poppins text-brand-textMuted leading-relaxed line-clamp-3">
                      {post.description}
                    </p>
                  </div>

                  {/* Author & CTA Row */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="text-[9px] font-bold font-montserrat text-brand-light uppercase tracking-wider">
                      By {post.author}
                    </span>
                    
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold font-montserrat text-white group-hover:text-brand-accent transition-colors duration-300"
                    >
                      READ STORY
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300 text-brand-primary" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          gridPosts.length === 0 && !featuredPost && (
            <div className="text-center py-20">
              <p className="text-brand-textMuted font-poppins text-sm">
                No entries found in the coffee journal.
              </p>
            </div>
          )
        )}

      </div>
    </div>
  );
}
