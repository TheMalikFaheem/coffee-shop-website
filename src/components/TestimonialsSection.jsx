import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Amara Osei',
    location: 'London, UK',
    initials: 'AO',
    color: 'from-amber-700 to-amber-900',
    rating: 5,
    quote: 'I've visited cafés across Europe, but Verdant\'s Ethiopian single-origin is something else entirely. The fruit-forward notes are extraordinary — like drinking a liquid story.',
    drink: 'Ethiopia Yirgacheffe',
  },
  {
    name: 'Sophie Laurent',
    location: 'Paris, France',
    initials: 'SL',
    color: 'from-rose-700 to-rose-900',
    rating: 5,
    quote: 'The latte art alone is worth the visit. But the Colombian blend? Mon dieu. Rich, velvety, and the perfect balance of caramel and citrus. I order it every morning now.',
    drink: 'Colombia Huila',
  },
  {
    name: 'Marcus Chen',
    location: 'Singapore',
    initials: 'MC',
    color: 'from-blue-800 to-blue-950',
    rating: 5,
    quote: 'Verdant redefines what a coffee experience should feel like. The atmosphere, the quality, the detail in every cup — this is the pinnacle of third-wave coffee culture.',
    drink: 'Kenya Nyeri AA',
  },
  {
    name: 'Fatima Al-Rashid',
    location: 'Dubai, UAE',
    initials: 'FA',
    color: 'from-emerald-700 to-emerald-900',
    rating: 5,
    quote: 'I flew in specifically to try the new seasonal blend and it was absolutely worth it. This is not just coffee — it is a full sensory performance. Verdant has ruined me for other cafés.',
    drink: 'Guatemala Antigua',
  },
  {
    name: 'Yuki Tanaka',
    location: 'Tokyo, Japan',
    initials: 'YT',
    color: 'from-purple-700 to-purple-900',
    rating: 5,
    quote: 'The precision and care put into each cup rivals the finest Japanese café culture. The cold brew with macadamia milk is a masterpiece in restraint and balance.',
    drink: 'Cold Brew Reserve',
  },
  {
    name: 'James Whitfield',
    location: 'New York, USA',
    initials: 'JW',
    color: 'from-slate-600 to-slate-800',
    rating: 5,
    quote: 'As a coffee journalist, I\'ve tasted thousands of cups. Verdant\'s espresso is one of the most technically perfect shots I\'ve had. A must-visit for any serious coffee lover.',
    drink: 'Espresso Classico',
  },
];

function TestimonialCard({ testimonial, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      className="flex-shrink-0 w-80 glass-dark rounded-3xl p-6 border border-brand-caramel/20 relative overflow-hidden group hover:border-brand-caramel/40 transition-all duration-300 hover:shadow-warm-md"
      style={{ minWidth: '320px' }}
    >
      {/* Top accent */}
      <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-brand-caramel/50 to-transparent" />

      {/* Quote icon */}
      <div className="absolute top-5 right-5 opacity-15">
        <Quote size={32} className="text-brand-caramel fill-brand-caramel" />
      </div>

      {/* Stars */}
      <div className="flex gap-0.5 mb-4">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} size={13} className="text-brand-gold fill-brand-gold" />
        ))}
      </div>

      {/* Quote */}
      <p className="text-brand-cream/80 font-poppins text-sm leading-relaxed mb-6 line-clamp-4">
        "{testimonial.quote}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-xs font-black font-montserrat text-white shrink-0`}>
          {testimonial.initials}
        </div>
        <div>
          <p className="text-[12px] font-bold font-montserrat text-brand-cream">
            {testimonial.name}
          </p>
          <p className="text-[10px] text-brand-cream/50 font-poppins">
            {testimonial.location} · {testimonial.drink}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function TestimonialsSection() {
  // Duplicate for seamless loop
  const duplicated = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="relative py-24 overflow-hidden w-full select-none bg-brand-espresso" id="testimonials">
      
      {/* Ambient orbs */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-brand-caramel/8 rounded-full blur-[150px] pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-brand-primary/10 rounded-full blur-[130px] pointer-events-none -translate-y-1/2" />

      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-brand-espresso to-transparent z-10 pointer-events-none" />

      <div className="relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 px-4 space-y-3"
        >
          <span className="text-xs font-bold tracking-[0.3em] text-brand-caramel uppercase font-montserrat block">
            From Our Guests
          </span>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-brand-cream">
            Loved <em className="text-gradient-gold not-italic">Worldwide</em>
          </h2>
          <p className="text-brand-cream/50 font-poppins text-sm max-w-sm mx-auto leading-relaxed">
            Coffee enthusiasts from across the globe share their Verdant experience.
          </p>
          <div className="w-14 h-0.5 bg-gradient-to-r from-transparent via-brand-caramel/50 to-transparent mx-auto rounded-full" />
        </motion.div>

        {/* Marquee Row 1 — forward */}
        <div className="relative mb-5">
          {/* Left fade */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-brand-espresso to-transparent z-10 pointer-events-none" />
          {/* Right fade */}
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-brand-espresso to-transparent z-10 pointer-events-none" />

          <div className="flex gap-5 overflow-hidden">
            <div className="flex gap-5 animate-marquee" style={{ animationDuration: '35s' }}>
              {TESTIMONIALS.map((t, i) => (
                <TestimonialCard key={`a-${i}`} testimonial={t} index={i} />
              ))}
            </div>
            <div className="flex gap-5 animate-marquee" style={{ animationDuration: '35s' }} aria-hidden="true">
              {TESTIMONIALS.map((t, i) => (
                <TestimonialCard key={`b-${i}`} testimonial={t} index={i} />
              ))}
            </div>
          </div>
        </div>

        {/* Marquee Row 2 — reverse */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-brand-espresso to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-brand-espresso to-transparent z-10 pointer-events-none" />

          <div className="flex gap-5 overflow-hidden">
            <div className="flex gap-5 animate-marquee-reverse" style={{ animationDuration: '40s' }}>
              {[...TESTIMONIALS].reverse().map((t, i) => (
                <TestimonialCard key={`c-${i}`} testimonial={t} index={i} />
              ))}
            </div>
            <div className="flex gap-5 animate-marquee-reverse" style={{ animationDuration: '40s' }} aria-hidden="true">
              {[...TESTIMONIALS].reverse().map((t, i) => (
                <TestimonialCard key={`d-${i}`} testimonial={t} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-brand-espresso to-transparent z-10 pointer-events-none" />
    </section>
  );
}
