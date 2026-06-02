import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, ChevronDown } from 'lucide-react';

const TOPICS = ['General Inquiry', 'Wholesale Sourcing', 'Private Events', 'Press & Media', 'Career Opportunities'];

// Confetti burst on success
function ConfettiBurst() {
  const pieces = Array.from({ length: 18 });
  const colors = ['#8B5E3C', '#B9805D', '#C9963A', '#F6F1EA', '#6F4A35', '#EFE4D6'];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[35px]">
      {pieces.map((_, i) => {
        const angle = (i / pieces.length) * 360;
        const distance = 40 + Math.random() * 60;
        const x = Math.cos((angle * Math.PI) / 180) * distance;
        const y = Math.sin((angle * Math.PI) / 180) * distance;
        const color = colors[i % colors.length];
        return (
          <motion.div
            key={i}
            style={{ backgroundColor: color }}
            initial={{ x: '50%', y: '40%', scale: 1, opacity: 1 }}
            animate={{
              x: `calc(50% + ${x}px)`,
              y: `calc(40% + ${y}px)`,
              scale: 0.3,
              opacity: 0,
              rotate: Math.random() * 360
            }}
            transition={{ duration: 1.0, delay: i * 0.03, ease: 'easeOut' }}
            className="absolute w-2.5 h-2.5 rounded-sm"
          />
        );
      })}
    </div>
  );
}

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [topic, setTopic] = useState('');
  const [topicOpen, setTopicOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const tempErrors = {};
    if (!name.trim()) tempErrors.name = 'Name is required';
    if (!email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = 'Email is invalid';
    }
    if (!message.trim()) tempErrors.message = 'Message is required';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setName('');
        setEmail('');
        setMessage('');
        setTopic('');
      }, 5500);
    }
  };

  const inputBase = 'w-full bg-brand-beige border rounded-xl px-4 py-3 text-sm font-poppins text-brand-dark focus:outline-none transition-all duration-300 placeholder:text-brand-muted/50';
  const inputNormal = 'border-brand-primary/20 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/15';
  const inputError = 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-300/20';

  return (
    <section className="relative py-20 bg-brand-beige px-4 md:px-8 select-none w-full" id="contact-section">
      
      {/* Ambient blur */}
      <div className="absolute top-1/2 left-1/4 w-[350px] h-[350px] bg-brand-caramel/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-1/4 w-[280px] h-[280px] bg-brand-primary/6 rounded-full blur-[80px] pointer-events-none -translate-y-1/2" />

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch w-full relative z-10">

        {/* LEFT: Contact Form Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/75 backdrop-blur-md rounded-[35px] p-8 border border-brand-primary/15 shadow-warm-md flex flex-col justify-between min-h-[520px] relative overflow-hidden"
        >
          {/* Top accent line */}
          <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-brand-primary/30 to-transparent" />

          <h2 className="font-playfair font-bold text-2xl text-brand-dark text-left mb-6">
            Get in Touch
          </h2>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-4 flex-1 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Topic Select */}
                  <div className="text-left relative">
                    <label className="text-[10px] font-bold font-montserrat uppercase tracking-wider text-brand-muted block mb-1.5">
                      Topic
                    </label>
                    <button
                      type="button"
                      onClick={() => setTopicOpen(!topicOpen)}
                      className="w-full bg-brand-beige border border-brand-primary/20 rounded-xl px-4 py-3 text-sm font-poppins text-left flex items-center justify-between hover:border-brand-primary/40 transition-colors duration-300"
                    >
                      <span className={topic ? 'text-brand-dark' : 'text-brand-muted/50'}>
                        {topic || 'Select a topic...'}
                      </span>
                      <motion.div animate={{ rotate: topicOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                        <ChevronDown size={15} className="text-brand-muted" />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {topicOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -8, scaleY: 0.9 }}
                          animate={{ opacity: 1, y: 0, scaleY: 1 }}
                          exit={{ opacity: 0, y: -8, scaleY: 0.9 }}
                          transition={{ duration: 0.18 }}
                          className="absolute top-[calc(100%+4px)] left-0 right-0 bg-white rounded-2xl border border-brand-primary/15 shadow-warm-md z-30 overflow-hidden"
                          style={{ transformOrigin: 'top' }}
                        >
                          {TOPICS.map((t) => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => { setTopic(t); setTopicOpen(false); }}
                              className="w-full text-left px-4 py-3 text-sm font-poppins text-brand-dark hover:bg-brand-primary/6 hover:text-brand-primary transition-colors duration-200"
                            >
                              {t}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Name */}
                  <div className="text-left">
                    <label htmlFor="name-input" className="text-[10px] font-bold font-montserrat uppercase tracking-wider text-brand-muted block mb-1.5">
                      Name
                    </label>
                    <input
                      id="name-input"
                      type="text"
                      placeholder="Your name..."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`${inputBase} ${errors.name ? inputError : inputNormal}`}
                    />
                    {errors.name && (
                      <span className="text-[10px] font-bold text-red-500 mt-1 block">{errors.name}</span>
                    )}
                  </div>

                  {/* Email */}
                  <div className="text-left">
                    <label htmlFor="email-input" className="text-[10px] font-bold font-montserrat uppercase tracking-wider text-brand-muted block mb-1.5">
                      Email
                    </label>
                    <input
                      id="email-input"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`${inputBase} ${errors.email ? inputError : inputNormal}`}
                    />
                    {errors.email && (
                      <span className="text-[10px] font-bold text-red-500 mt-1 block">{errors.email}</span>
                    )}
                  </div>

                  {/* Message */}
                  <div className="text-left">
                    <label htmlFor="message-input" className="text-[10px] font-bold font-montserrat uppercase tracking-wider text-brand-muted block mb-1.5">
                      Message
                    </label>
                    <textarea
                      id="message-input"
                      placeholder="Tell us what's on your mind..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={3}
                      className={`${inputBase} ${errors.message ? inputError : inputNormal} resize-none`}
                    />
                    {errors.message && (
                      <span className="text-[10px] font-bold text-red-500 mt-1 block">{errors.message}</span>
                    )}
                  </div>
                </div>

                <div className="pt-2">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    id="contact-submit-btn"
                    className="w-full py-3.5 rounded-full bg-brand-primary hover:bg-brand-mocha text-brand-cream text-xs font-bold font-montserrat tracking-widest shadow-warm-sm transition-colors duration-300 relative overflow-hidden group"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-brand-caramel/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                    SEND MESSAGE
                  </motion.button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex-1 flex flex-col items-center justify-center text-center space-y-4 py-8 relative"
              >
                <ConfettiBurst />
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ repeat: 2, duration: 0.5 }}
                >
                  <CheckCircle2 size={56} className="text-brand-primary stroke-[1.5]" />
                </motion.div>
                <h3 className="font-playfair font-bold text-2xl text-brand-dark">Message Sent!</h3>
                <p className="text-sm font-poppins text-brand-muted max-w-xs leading-relaxed">
                  Thank you for reaching out. Our team will get back to you within 24 hours over a warm cup.
                </p>
                <span className="text-2xl">☕</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* RIGHT: CTA Box */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-brand-primary rounded-[35px] p-8 shadow-warm-lg flex flex-col justify-between text-left relative overflow-hidden min-h-[520px]"
        >
          {/* Decorative blobs */}
          <div className="absolute -top-16 -right-16 w-52 h-52 bg-brand-caramel/25 rounded-full blur-[50px] pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-brand-mocha/40 rounded-full blur-[40px] pointer-events-none" />

          <div className="space-y-5 pt-2 relative z-10">
            <span className="text-[10px] font-bold font-montserrat uppercase tracking-[0.25em] text-brand-latte/70 block">
              Verdant Coffee Co.
            </span>
            <h3 className="font-playfair font-bold text-4xl lg:text-5xl text-brand-cream leading-none">
              Let's Brew Something Together
            </h3>
            <p className="text-brand-latte/80 font-poppins text-sm md:text-base leading-relaxed max-w-sm">
              Whether it's a brand event, wholesale sourcing, or a private tasting — we'd love to connect over a cup.
            </p>

            {/* Divider */}
            <div className="w-12 h-0.5 bg-brand-caramel/40 rounded-full" />

            {/* Quick info */}
            <div className="space-y-3">
              {[
                { label: 'Email', value: 'hello@verdant.coffee' },
                { label: 'Phone', value: '+44 20 7946 0958' },
                { label: 'Hours', value: 'Mon–Sun: 7am – 10pm' },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="text-[9px] font-bold font-montserrat uppercase tracking-wider text-brand-latte/50 w-10">{label}</span>
                  <span className="text-xs font-poppins text-brand-latte/80">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-6 relative z-10">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 45 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              className="w-14 h-14 rounded-full bg-brand-cream text-brand-primary flex items-center justify-center shadow-warm-sm cursor-pointer hover:bg-brand-latte transition-colors duration-300"
            >
              <ArrowRight size={24} />
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
