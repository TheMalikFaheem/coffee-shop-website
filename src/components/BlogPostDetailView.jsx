import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, BookOpen, User, Tag, ChevronRight } from 'lucide-react';
import { Link } from './Router';
import { getBlogPostBySlug, getBlogPosts } from '../data/coffeeDb';

export default function BlogPostDetailView({ slug }) {
  const post = getBlogPostBySlug(slug);
  const allPosts = getBlogPosts();
  
  // Select related posts (excluding current one)
  const relatedPosts = allPosts
    .filter(p => p.slug !== slug)
    .slice(0, 2);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#032B2B] text-white flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-sm">
          <ArrowLeft size={48} className="text-brand-accent mx-auto animate-bounce" />
          <h2 className="text-2xl font-bold font-montserrat uppercase">Article Not Found</h2>
          <p className="text-brand-textMuted text-sm font-poppins">
            This journal entry does not exist or has been archived.
          </p>
          <Link href="/blog" className="inline-block mt-4 px-6 py-2.5 bg-brand-primary text-white text-xs font-bold font-montserrat tracking-widest rounded-full uppercase">
            Back to Journal
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#032B2B] text-white pt-28 pb-32 px-4 relative select-none">
      
      {/* Background blurs */}
      <div className="absolute top-0 left-0 right-0 h-[400px] bg-gradient-to-b from-[#021A1A] to-transparent z-0" />
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Navigation & Header */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold font-montserrat text-brand-textMuted hover:text-white uppercase tracking-wider transition-colors duration-300"
          >
            <ArrowLeft size={14} />
            Back to Journal
          </Link>
        </div>

        {/* Editorial Article Header */}
        <div className="text-left space-y-6 mb-12">
          {/* Tags */}
          <div className="flex gap-2">
            {post.tags?.map((tag, i) => (
              <span key={i} className="text-[10px] font-bold font-montserrat uppercase tracking-wider text-brand-accent border border-brand-accent/30 px-2.5 py-0.5 rounded-full bg-brand-accent/5">
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black font-montserrat uppercase tracking-tight text-white leading-tight">
            {post.title}
          </h1>

          {/* Byline / Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/5">
            
            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-brand-accent font-montserrat font-extrabold text-sm">
                <User size={16} />
              </div>
              <div>
                <span className="text-xs font-bold font-montserrat uppercase block text-white">
                  {post.author}
                </span>
                <span className="text-[10px] font-poppins font-medium text-brand-textMuted uppercase block leading-none mt-0.5">
                  {post.role || 'Contributor'}
                </span>
              </div>
            </div>

            {/* Read / Date info */}
            <div className="flex items-center gap-4 text-[10px] font-bold font-montserrat text-brand-textMuted uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <Calendar size={12} />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <BookOpen size={12} />
                {post.readTime}
              </span>
            </div>

          </div>
        </div>

        {/* Large Cover Image */}
        <div className="relative h-[300px] md:h-[450px] w-full rounded-[35px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.4)] mb-16 border border-white/10 bg-brand-dark">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        {/* Article Body Content (Spacious, Single-column reading flow) */}
        <article className="max-w-2xl mx-auto text-left space-y-6 mb-24">
          {post.content.map((block, index) => {
            if (block.type === 'paragraph') {
              return (
                <p 
                  key={index} 
                  className="text-white/80 font-poppins text-sm md:text-base leading-relaxed tracking-wide"
                >
                  {block.text}
                </p>
              );
            }
            if (block.type === 'quote') {
              return (
                <motion.blockquote
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="border-l-4 border-brand-accent bg-brand-primary/5 pl-6 py-5 pr-4 my-8 rounded-r-2xl border-y border-r border-white/5 relative overflow-hidden"
                >
                  <p className="font-montserrat font-extrabold text-brand-light italic text-base md:text-lg leading-relaxed">
                    "{block.text}"
                  </p>
                  <span className="block text-[10px] font-bold font-montserrat text-brand-accent uppercase tracking-wider mt-3">
                    — {block.author || post.author}
                  </span>
                </motion.blockquote>
              );
            }
            return null;
          })}
        </article>

        {/* Related Articles Footer */}
        {relatedPosts.length > 0 && (
          <div className="pt-16 border-t border-white/10 max-w-3xl mx-auto space-y-10">
            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold font-montserrat uppercase tracking-wider text-white">Related Reading</h3>
              <div className="w-10 h-0.5 bg-brand-primary mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map((rPost) => (
                <Link
                  key={rPost.id}
                  href={`/blog/${rPost.slug}`}
                  className="group flex flex-col bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-brand-primary/30 transition-all duration-300 shadow-md text-left"
                >
                  <div className="h-40 w-full overflow-hidden bg-brand-dark">
                    <img
                      src={rPost.coverImage}
                      alt={rPost.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <span className="text-[9px] font-bold font-montserrat text-brand-textMuted uppercase tracking-wider block">
                        {rPost.date}
                      </span>
                      <h4 className="font-montserrat font-bold text-base text-white group-hover:text-brand-accent transition-colors duration-300 line-clamp-2 leading-snug">
                        {rPost.title}
                      </h4>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold font-montserrat text-white group-hover:text-brand-accent transition-colors duration-300">
                      READ STORY
                      <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform duration-300" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
