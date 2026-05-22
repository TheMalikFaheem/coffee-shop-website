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
      // Simulate form submission
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setName('');
        setEmail('');
      }, 5000);
    }
  };

  return (
    <section className="relative py-20 bg-brand-dark px-4 md:px-8 select-none w-full" id="contact-section">
      {/* Decorative Blur BG */}
      <div className="absolute top-1/2 left-1/4 w-[350px] h-[350px] bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid Container */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch w-full">
        
        {/* LEFT SIDE: Contact Form Card */}
        <div className="glass-card rounded-[35px] p-8 border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.25)] flex flex-col justify-between min-h-[320px]">
          <h2 className="font-montserrat font-black text-2xl tracking-widest text-left text-white mb-6 uppercase">
            CONTACT
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
                  {/* Name field */}
                  <div className="text-left">
                    <label htmlFor="name-input" className="text-[10px] font-bold font-montserrat uppercase tracking-wider text-brand-textMuted block mb-1.5">
                      Name
                    </label>
                    <input
                      id="name-input"
                      type="text"
                      placeholder="ENTER YOUR NAME..."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm font-semibold tracking-wide text-white focus:outline-none transition-all duration-300 placeholder:text-white/20 placeholder:font-bold ${
                        errors.name 
                          ? 'border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500' 
                          : 'border-white/10 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/50'
                      }`}
                    />
                    {errors.name && (
                      <span className="text-[10px] font-bold text-red-400 mt-1 block">{errors.name}</span>
                    )}
                  </div>

                  {/* Email field */}
                  <div className="text-left">
                    <label htmlFor="email-input" className="text-[10px] font-bold font-montserrat uppercase tracking-wider text-brand-textMuted block mb-1.5">
                      Email
                    </label>
                    <input
                      id="email-input"
                      type="email"
                      placeholder="ENTER YOUR EMAIL..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm font-semibold tracking-wide text-white focus:outline-none transition-all duration-300 placeholder:text-white/20 placeholder:font-bold ${
                        errors.email 
                          ? 'border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500' 
                          : 'border-white/10 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/50'
                      }`}
                    />
                    {errors.email && (
                      <span className="text-[10px] font-bold text-red-400 mt-1 block">{errors.email}</span>
                    )}
                  </div>
                </div>

                <div className="pt-4">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3.5 rounded-full bg-brand-primary hover:bg-brand-accent text-white text-xs font-bold font-montserrat tracking-widest shadow-md transition-colors duration-300"
                  >
                    SUBMIT
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
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <CheckCircle2 size={48} className="text-brand-accent stroke-[2.5]" />
                </motion.div>
                <h3 className="font-montserrat font-black text-lg text-white uppercase tracking-wider">
                  MESSAGE SENT!
                </h3>
                <p className="text-xs font-poppins text-brand-textMuted max-w-xs leading-relaxed">
                  Thank you for reaching out to us. Our support barista team will get back to you shortly.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT SIDE: Green CTA Box */}
        <div className="bg-brand-primary rounded-[35px] p-8 border border-brand-accent/20 shadow-[0_15px_40px_rgba(0,130,72,0.2)] flex flex-col justify-between text-left relative overflow-hidden min-h-[320px]">
          {/* Abstract leaf shape decoration in background */}
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-brand-accent/20 rounded-full blur-[40px] pointer-events-none" />
          
          <div className="space-y-4 pt-4">
            <h3 className="font-montserrat font-black text-4xl lg:text-5xl text-white tracking-wide uppercase leading-none">
              THANK YOU!
            </h3>
            <p className="text-brand-light font-poppins text-sm md:text-base leading-relaxed max-w-sm">
              Hang tight! We’re coming your way soon with freshly brewed stories and coffee designs.
            </p>
          </div>

          <div className="flex justify-end pt-6">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="w-16 h-16 rounded-full bg-white text-brand-primary flex items-center justify-center shadow-lg cursor-pointer hover:bg-brand-dark hover:text-white transition-colors duration-300"
              aria-label="Thank You CTA"
            >
              <ArrowRight size={28} className="stroke-[2.5]" />
            </motion.button>
          </div>
        </div>

      </div>
    </section>
  );
}
