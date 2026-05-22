import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, BookOpen, User, ChevronRight } from 'lucide-react';
import { Link } from './Router';
import { getBlogPostBySlug, getBlogPosts } from '../data/coffeeDb';

export default function BlogPostDetailView({ slug }) {
  const post = getBlogPostBySlug(slug);
  const allPosts = getBlogPosts();
  const relatedPosts = allPosts.filter(p => p.slug !== slug).slice(0, 2);

  if (!post) {
    return (
      <div className="min-h-screen bg-cream-gradient text-brand-dark flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-5 max-w-sm">
          <ArrowLeft size={48} className="text-brand-caramel mx-auto animate-bounce" />
          <h2 className="text-2xl font-playfair font-bold text-brand-dark">Article Not Found</h2>
          <p className="text-brand-muted text-sm font-poppins">
            This journal entry does not exist or has been archived.
          </p>
          <Link href="/blog" className="inline-block mt-4 px-7 py-3 bg-brand-primary text-brand-cream text-xs font-bold font-montserrat tracking-widest rounded-full uppercase shadow-warm-sm hover:bg-brand-mocha transition-colors">
            Back to Journal
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-gradient text-brand-dark pt-28 pb-32 px-4 relative select-none overflow-hidden">

      {/* Ambient background */}
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-brand-latte/60 to-transparent z-0 pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-brand-caramel/7 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">

        {/* Back Navigation */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold font-montserrat text-brand-muted hover:text-brand-primary uppercase tracking-wider transition-colors duration-300"
          >
            <ArrowLeft size={14} />
            Back to Journal
          </Link>
        </div>

        {/* Article Header */}
        <div className="text-left space-y-6 mb-12">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.tags?.map((tag, i) => (
              <span key={i} className="text-[10px] font-bold font-montserrat uppercase tracking-wider text-brand-caramel border border-brand-caramel/35 px-3 py-1 rounded-full bg-brand-caramel/8">
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-brand-dark leading-tight">
            {post.title}
          </h1>

          {/* Byline */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-brand-primary/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-beige border border-brand-primary/20 flex items-center justify-center text-brand-primary">
                <User size={16} />
              </div>
              <div>
                <span className="text-xs font-bold font-montserrat uppercase block text-brand-dark">{post.author}</span>
                <span className="text-[10px] font-poppins text-brand-muted uppercase block leading-none mt-0.5">{post.role || 'Contributor'}</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-[10px] font-bold font-montserrat text-brand-muted uppercase tracking-wider">
              <span className="flex items-center gap-1.5"><Calendar size={11} />{post.date}</span>
              <span className="flex items-center gap-1.5"><BookOpen size={11} />{post.readTime}</span>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="relative h-[300px] md:h-[460px] w-full rounded-3xl overflow-hidden shadow-warm-lg mb-16 bg-brand-beige">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-cream/35 to-transparent" />
        </div>

        {/* Article Body */}
        <article className="max-w-2xl mx-auto text-left space-y-7 mb-24">
          {post.content.map((block, index) => {
            if (block.type === 'paragraph') {
              return (
                <p
                  key={index}
                  className="text-brand-dark/80 font-poppins text-sm md:text-base leading-relaxed tracking-wide"
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
                  className="border-l-4 border-brand-caramel bg-brand-beige/60 pl-6 py-6 pr-5 my-8 rounded-r-3xl relative overflow-hidden"
                >
                  <div className="absolute top-4 left-4 text-5xl font-playfair text-brand-caramel/20 leading-none select-none">"</div>
                  <p className="font-playfair italic text-brand-dark text-lg md:text-xl leading-relaxed">
                    "{block.text}"
                  </p>
                  <span className="block text-[10px] font-bold font-montserrat text-brand-caramel uppercase tracking-wider mt-4">
                    — {block.author || post.author}
                  </span>
                </motion.blockquote>
              );
            }
            return null;
          })}
        </article>

        {/* Related Reading */}
        {relatedPosts.length > 0 && (
          <div className="pt-16 border-t border-brand-primary/10 max-w-3xl mx-auto space-y-10">
            <div className="text-center space-y-2">
              <h3 className="text-xl font-playfair font-bold text-brand-dark">Further Reading</h3>
              <div className="w-10 h-0.5 bg-brand-caramel/50 mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((rPost) => (
                <Link
                  key={rPost.id}
                  href={`/blog/${rPost.slug}`}
                  className="group flex flex-col bg-white/70 border border-brand-primary/12 rounded-3xl overflow-hidden hover:border-brand-primary/35 hover:shadow-warm-md transition-all duration-300 shadow-warm-sm text-left backdrop-blur-sm"
                >
                  <div className="h-40 w-full overflow-hidden bg-brand-beige">
                    <img
                      src={rPost.coverImage}
                      alt={rPost.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <span className="text-[9px] font-bold font-montserrat text-brand-muted uppercase tracking-wider block">
                        {rPost.date}
                      </span>
                      <h4 className="font-playfair font-bold text-base text-brand-dark group-hover:text-brand-primary transition-colors duration-300 line-clamp-2 leading-snug">
                        {rPost.title}
                      </h4>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold font-montserrat text-brand-primary">
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
