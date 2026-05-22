import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, Coffee, AlertCircle } from 'lucide-react';
import { adminLogin } from '../data/coffeeDb';

export default function AdminLogin({ onSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    // Small delay for UX feel
    await new Promise((r) => setTimeout(r, 600));
    const success = adminLogin(username.trim(), password);
    setLoading(false);
    if (success) {
      onSuccess();
    } else {
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-brand-espresso flex items-center justify-center px-4 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-primary/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-brand-caramel/8 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-md"
      >
        {/* Brand Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-full bg-brand-primary flex items-center justify-center mx-auto mb-5 shadow-warm-lg">
            <Coffee size={28} className="text-brand-cream" />
          </div>
          <h1 className="text-3xl font-playfair font-bold text-brand-cream">N² Admin</h1>
          <p className="text-brand-cream/45 text-xs font-montserrat tracking-[0.2em] uppercase mt-1">
            Dashboard Access
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-brand-cream/[0.06] backdrop-blur-xl border border-brand-cream/12 rounded-3xl p-8 shadow-warm-xl">
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Username */}
            <div className="space-y-1.5">
              <label htmlFor="admin-username" className="text-[10px] font-bold font-montserrat uppercase tracking-[0.2em] text-brand-cream/50 block">
                Username
              </label>
              <input
                id="admin-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                autoComplete="username"
                className="w-full bg-brand-cream/8 border border-brand-cream/15 rounded-xl px-4 py-3.5 text-sm font-poppins text-brand-cream focus:outline-none focus:border-brand-caramel/60 transition-colors placeholder:text-brand-cream/25"
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label htmlFor="admin-password" className="text-[10px] font-bold font-montserrat uppercase tracking-[0.2em] text-brand-cream/50 block">
                Password
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  autoComplete="current-password"
                  className="w-full bg-brand-cream/8 border border-brand-cream/15 rounded-xl px-4 py-3.5 pr-12 text-sm font-poppins text-brand-cream focus:outline-none focus:border-brand-caramel/60 transition-colors placeholder:text-brand-cream/25"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-cream/40 hover:text-brand-cream/80 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 bg-red-500/12 border border-red-400/25 rounded-xl px-4 py-3"
              >
                <AlertCircle size={14} className="text-red-400 shrink-0" />
                <p className="text-xs font-poppins text-red-300">{error}</p>
              </motion.div>
            )}

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full py-4 bg-brand-primary hover:bg-brand-mocha text-brand-cream rounded-2xl font-bold font-montserrat text-xs tracking-widest uppercase transition-all duration-300 shadow-warm-md flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    className="w-4 h-4 border-2 border-brand-cream/30 border-t-brand-cream rounded-full"
                  />
                  Verifying...
                </>
              ) : (
                <>
                  <Lock size={14} />
                  Sign In to Dashboard
                </>
              )}
            </motion.button>

          </form>
        </div>

        <p className="text-center text-brand-cream/20 text-[10px] font-montserrat uppercase tracking-wider mt-8">
          N Squared Café — Admin Portal
        </p>
      </motion.div>
    </div>
  );
}
