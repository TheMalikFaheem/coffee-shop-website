import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, ChevronRight } from 'lucide-react';
import { Link } from './Router';
import { getBlogPosts } from '../data/coffeeDb';

export default function BlogPreview() {
  // Load the first three articles
  const posts = getBlogPosts().slice(0, 3);

  return (
    <section className="relative py-28 bg-[#032B2B] px-4 overflow-hidden w-full select-none" id="blog-preview">
      {/* Background radial gradient */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-3">
          <span className="text-xs font-bold tracking-[0.25em] text-brand-accent uppercase font-montserrat">
            VERDANT JOURNAL
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-montserrat text-white uppercase tracking-wider">
            Stories & Craft
          </h2>
          <div className="w-16 h-1 bg-brand-primary mx-auto rounded-full mt-3" />
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full px-4 mb-16">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-brand-primary/30 transition-all duration-300 shadow-lg"
            >
              {/* Cover Image Container */}
              <div className="relative h-48 w-full overflow-hidden bg-brand-dark">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Float Category Tag */}
                {post.tags && post.tags[0] && (
                  <span className="absolute top-4 left-4 text-[9px] font-bold font-montserrat uppercase tracking-wider bg-brand-primary px-2.5 py-1 rounded-md text-white">
                    {post.tags[0]}
                  </span>
                )}
              </div>

              {/* Text content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  {/* Date and Read Time Row */}
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

                {/* Read Link */}
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold font-montserrat text-white group-hover:text-brand-accent transition-colors duration-300"
                >
                  READ ARTICLE
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform duration-300 text-brand-primary" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Browse All CTA */}
        <Link
          href="/blog"
          className="px-8 py-3 bg-white/5 border border-white/10 text-white rounded-full font-bold font-montserrat text-xs tracking-widest hover:bg-white hover:text-brand-dark hover:shadow-xl transition-all duration-300"
        >
          BROWSE ALL JOURNAL ENTRIES
        </Link>

      </div>
    </section>
  );
}
