import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, ChevronRight } from 'lucide-react';
import { Link } from './Router';
import { getBlogPosts } from '../data/coffeeDb';

export default function BlogPreview() {
  const posts = getBlogPosts().slice(0, 3);

  return (
    <section className="relative py-28 bg-cream-gradient px-4 overflow-hidden w-full select-none" id="blog-preview">
      
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-caramel/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col items-center relative z-10">

        {/* Section Header */}
        <div className="text-center mb-16 space-y-3">
          <span className="text-xs font-bold tracking-[0.3em] text-brand-caramel uppercase font-montserrat block">
            Verdant Journal
          </span>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-brand-dark">
            Stories &amp; <em className="text-brand-primary not-italic">Craft</em>
          </h2>
          <div className="w-14 h-0.5 bg-brand-caramel/50 mx-auto rounded-full mt-3" />
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 w-full px-2 mb-14">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col bg-white/70 border border-brand-primary/12 rounded-3xl overflow-hidden hover:border-brand-primary/35 hover:shadow-warm-md transition-all duration-300 shadow-warm-sm backdrop-blur-sm"
            >
              {/* Cover Image */}
              <div className="relative h-48 w-full overflow-hidden bg-brand-beige">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-cream/50 to-transparent" />
                {post.tags?.[0] && (
                  <span className="absolute top-4 left-4 text-[9px] font-bold font-montserrat uppercase tracking-wider bg-brand-primary px-2.5 py-1 rounded-md text-brand-cream">
                    {post.tags[0]}
                  </span>
                )}
              </div>

              {/* Text Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-4 text-[10px] font-bold font-montserrat text-brand-muted uppercase tracking-wider">
                    <span className="flex items-center gap-1"><Calendar size={9} />{post.date}</span>
                    <span className="flex items-center gap-1"><BookOpen size={9} />{post.readTime}</span>
                  </div>

                  <h3 className="font-playfair font-bold text-lg text-brand-dark group-hover:text-brand-primary transition-colors duration-300 line-clamp-2 leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs font-poppins text-brand-muted leading-relaxed line-clamp-3">
                    {post.description}
                  </p>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold font-montserrat text-brand-primary group-hover:text-brand-mocha transition-colors duration-300"
                >
                  READ ARTICLE
                  <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform duration-300" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Browse All CTA */}
        <Link
          href="/blog"
          className="px-8 py-3.5 bg-brand-primary hover:bg-brand-mocha text-brand-cream border border-brand-primary rounded-full font-bold font-montserrat text-xs tracking-widest transition-all duration-300 shadow-warm-sm hover:shadow-warm-md"
        >
          BROWSE ALL JOURNAL ENTRIES
        </Link>

      </div>
    </section>
  );
}
