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
    <div className="min-h-screen bg-cream-gradient text-brand-dark pt-32 pb-24 px-4 select-none relative overflow-hidden">

      {/* Ambient background orbs */}
      <div className="absolute top-1/4 left-1/5 w-[500px] h-[500px] bg-brand-caramel/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/5 w-[400px] h-[400px] bg-brand-primary/6 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10 flex flex-col items-center">

        {/* Page Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-xs font-bold tracking-[0.35em] text-brand-caramel uppercase font-montserrat block">
            Verdant Press
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-playfair font-bold text-brand-dark">
            The <em className="text-brand-primary not-italic">Journal</em>
          </h1>
          <p className="text-brand-muted text-sm font-poppins max-w-md mx-auto leading-relaxed">
            Stories about our sourcing travels, roasting science, and guides to slow home brewing.
          </p>
          <div className="w-16 h-0.5 bg-brand-caramel/50 mx-auto rounded-full mt-4" />
        </div>

        {/* Featured Article Banner */}
        {featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="group w-full max-w-5xl bg-white/70 border border-brand-primary/12 rounded-[35px] overflow-hidden hover:border-brand-primary/35 transition-all duration-300 shadow-warm-md hover:shadow-warm-lg mb-16 grid grid-cols-1 lg:grid-cols-12 items-stretch backdrop-blur-sm"
          >
            {/* Featured Image */}
            <div className="lg:col-span-7 relative min-h-[260px] sm:min-h-[340px] overflow-hidden bg-brand-beige">
              <img
                src={featuredPost.coverImage}
                alt={featuredPost.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#F6F1EA]/80 lg:from-transparent to-transparent z-10" />
              <span className="absolute top-6 left-6 text-[10px] font-bold font-montserrat uppercase tracking-wider bg-brand-primary px-3 py-1.5 rounded-lg text-brand-cream z-20 shadow-warm-sm">
                Featured Article
              </span>
            </div>

            {/* Featured Content */}
            <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-6 text-left">
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-[10px] font-bold font-montserrat text-brand-muted uppercase tracking-wider">
                  <span className="flex items-center gap-1.5"><Calendar size={11} />{featuredPost.date}</span>
                  <span className="flex items-center gap-1.5"><BookOpen size={11} />{featuredPost.readTime}</span>
                </div>

                <h2 className="font-playfair font-bold text-2xl sm:text-3xl text-brand-dark group-hover:text-brand-primary transition-colors duration-300 leading-tight">
                  {featuredPost.title}
                </h2>

                <p className="text-xs font-poppins text-brand-muted leading-relaxed line-clamp-4">
                  {featuredPost.description}
                </p>
              </div>

              {/* Author + CTA */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 border-t border-brand-primary/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-brand-beige border border-brand-primary/20 flex items-center justify-center text-brand-primary">
                    <User size={13} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold font-montserrat uppercase block text-brand-dark">{featuredPost.author}</span>
                    <span className="text-[8px] font-poppins text-brand-muted uppercase block leading-none">{featuredPost.role || 'Contributor'}</span>
                  </div>
                </div>
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-full bg-brand-primary hover:bg-brand-mocha text-brand-cream text-xs font-bold font-montserrat tracking-widest transition-all duration-300 shadow-warm-sm"
                >
                  READ STORY
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {/* Articles Grid */}
        {gridPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl px-2">
            {gridPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex flex-col bg-white/70 border border-brand-primary/12 rounded-[30px] overflow-hidden hover:border-brand-primary/35 hover:shadow-warm-md transition-all duration-300 shadow-warm-sm backdrop-blur-sm"
              >
                {/* Cover Image */}
                <div className="relative h-56 w-full overflow-hidden bg-brand-beige">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-cream/60 to-transparent" />
                  {post.tags?.[0] && (
                    <span className="absolute top-4 left-4 text-[9px] font-bold font-montserrat uppercase tracking-wider bg-brand-primary px-2.5 py-1 rounded-md text-brand-cream">
                      {post.tags[0]}
                    </span>
                  )}
                </div>

                {/* Article Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5 text-left">
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 text-[10px] font-bold font-montserrat text-brand-muted uppercase tracking-wider">
                      <span className="flex items-center gap-1"><Calendar size={10} />{post.date}</span>
                      <span className="flex items-center gap-1"><BookOpen size={10} />{post.readTime}</span>
                    </div>

                    <h3 className="font-playfair font-bold text-xl text-brand-dark group-hover:text-brand-primary transition-colors duration-300 line-clamp-2 leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-xs font-poppins text-brand-muted leading-relaxed line-clamp-3">
                      {post.description}
                    </p>
                  </div>

                  {/* Author + CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-brand-primary/10">
                    <span className="text-[9px] font-bold font-montserrat text-brand-muted uppercase tracking-wider">
                      By {post.author}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold font-montserrat text-brand-primary hover:text-brand-mocha transition-colors duration-300"
                    >
                      READ STORY
                      <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!featuredPost && gridPosts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-brand-muted font-poppins text-sm">No entries yet in the coffee journal.</p>
          </div>
        )}

      </div>
    </div>
  );
}
