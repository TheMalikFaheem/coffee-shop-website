import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
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
      }, 5000);
    }
  };

  return (
    <section className="relative py-20 bg-brand-beige px-4 md:px-8 select-none w-full" id="contact-section">
      
      {/* Ambient blur */}
      <div className="absolute top-1/2 left-1/4 w-[350px] h-[350px] bg-brand-caramel/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch w-full relative z-10">

        {/* LEFT: Contact Form Card */}
        <div className="bg-white/75 backdrop-blur-md rounded-[35px] p-8 border border-brand-primary/15 shadow-warm-md flex flex-col justify-between min-h-[340px]">
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
                className="space-y-5 flex-1 flex flex-col justify-between"
              >
                <div className="space-y-4">
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
                      className={`w-full bg-brand-beige border rounded-xl px-4 py-3 text-sm font-poppins text-brand-dark focus:outline-none transition-all duration-300 placeholder:text-brand-muted/50 ${
                        errors.name
                          ? 'border-red-400 focus:border-red-400 focus:ring-1 focus:ring-red-300'
                          : 'border-brand-primary/20 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/25'
                      }`}
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
                      className={`w-full bg-brand-beige border rounded-xl px-4 py-3 text-sm font-poppins text-brand-dark focus:outline-none transition-all duration-300 placeholder:text-brand-muted/50 ${
                        errors.email
                          ? 'border-red-400 focus:border-red-400 focus:ring-1 focus:ring-red-300'
                          : 'border-brand-primary/20 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/25'
                      }`}
                    />
                    {errors.email && (
                      <span className="text-[10px] font-bold text-red-500 mt-1 block">{errors.email}</span>
                    )}
                  </div>
                </div>

                <div className="pt-4">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3.5 rounded-full bg-brand-primary hover:bg-brand-mocha text-brand-cream text-xs font-bold font-montserrat tracking-widest shadow-warm-sm transition-colors duration-300"
                  >
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
                className="flex-1 flex flex-col items-center justify-center text-center space-y-3 py-8"
              >
                <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
                  <CheckCircle2 size={48} className="text-brand-primary stroke-[2]" />
                </motion.div>
                <h3 className="font-playfair font-bold text-xl text-brand-dark">Message Sent!</h3>
                <p className="text-xs font-poppins text-brand-muted max-w-xs leading-relaxed">
                  Thank you for reaching out. Our team will get back to you shortly.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT: CTA Box */}
        <div className="bg-brand-primary rounded-[35px] p-8 shadow-warm-lg flex flex-col justify-between text-left relative overflow-hidden min-h-[340px]">
          {/* Decorative blob */}
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
        </div>

      </div>
    </section>
  );
}
