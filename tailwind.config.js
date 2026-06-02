/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // Core backgrounds
          cream:      '#F6F1EA',  // Warm cream - primary bg
          beige:      '#E9DDCF',  // Soft beige - secondary bg
          latte:      '#F3E7DA',  // Latte cream - section bg
          parchment:  '#EFE4D6',  // Parchment - card bg

          // Accents & CTAs
          primary:    '#8B5E3C',  // Coffee brown
          mocha:      '#6F4A35',  // Mocha brown - darker CTA
          caramel:    '#B9805D',  // Caramel - hover/accent
          espresso:   '#4B3226',  // Espresso - dark accents
          gold:       '#C9963A',  // Warm gold - premium accent
          velvet:     '#2A1810',  // Deep velvet - ultra dark bg
          bronze:     '#A0673A',  // Bronze - mid accent

          // Text
          dark:       '#2B1D17',  // Dark espresso - primary text
          muted:      '#7A6A5F',  // Soft muted brown-gray - secondary text
          light:      '#F6F1EA',  // Cream - inverted text
        }
      },
      fontFamily: {
        playfair: ['Playfair Display', 'Georgia', 'serif'],
        poppins:  ['Poppins', 'sans-serif'],
        inter:    ['Inter', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      animation: {
        'float':            'float 7s ease-in-out infinite',
        'float-delayed':    'float 7s ease-in-out infinite 3.5s',
        'spin-slow':        'spin 30s linear infinite',
        'spin-slow-rev':    'spin-rev 25s linear infinite',
        'marquee':          'marquee 28s linear infinite',
        'marquee-reverse':  'marquee-reverse 32s linear infinite',
        'pulse-soft':       'pulse-soft 3s ease-in-out infinite',
        'shimmer':          'shimmer 2.5s linear infinite',
        'drift-slow':       'drift 18s ease-in-out infinite',
        'drift-slow-alt':   'drift-alt 22s ease-in-out infinite',
        'border-spin':      'border-spin 4s linear infinite',
        'count-up':         'count-up 1.5s ease-out forwards',
        'steam':            'steam 2.5s ease-out infinite',
        'steam-delayed':    'steam 2.5s ease-out infinite 0.8s',
        'steam-delayed2':   'steam 2.5s ease-out infinite 1.6s',
        'fade-up':          'fade-up 0.7s ease-out forwards',
        'grain':            'grain 8s steps(10) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-18px)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%':   { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        'spin-rev': {
          '0%':   { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.6' },
          '50%':      { opacity: '1' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%':      { transform: 'translate(40px, -30px) scale(1.08)' },
          '66%':      { transform: 'translate(-25px, 20px) scale(0.95)' },
        },
        'drift-alt': {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%':      { transform: 'translate(-35px, 25px) scale(1.06)' },
          '66%':      { transform: 'translate(30px, -20px) scale(0.97)' },
        },
        'border-spin': {
          '0%':   { '--border-angle': '0deg' },
          '100%': { '--border-angle': '360deg' },
        },
        steam: {
          '0%':   { transform: 'translateY(0) scaleX(1)', opacity: '0.7' },
          '50%':  { transform: 'translateY(-30px) scaleX(1.4)', opacity: '0.4' },
          '100%': { transform: 'translateY(-60px) scaleX(0.8)', opacity: '0' },
        },
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%':      { transform: 'translate(-5%, -10%)' },
          '20%':      { transform: 'translate(-15%, 5%)' },
          '30%':      { transform: 'translate(7%, -25%)' },
          '40%':      { transform: 'translate(-5%, 25%)' },
          '50%':      { transform: 'translate(-15%, 10%)' },
          '60%':      { transform: 'translate(15%, 0%)' },
          '70%':      { transform: 'translate(0%, 15%)' },
          '80%':      { transform: 'translate(3%, 35%)' },
          '90%':      { transform: 'translate(-10%, 10%)' },
        },
      },
      boxShadow: {
        'warm-sm':    '0 4px 15px rgba(139, 94, 60, 0.12)',
        'warm-md':    '0 8px 30px rgba(139, 94, 60, 0.18)',
        'warm-lg':    '0 20px 60px rgba(139, 94, 60, 0.22)',
        'warm-xl':    '0 30px 80px rgba(75, 50, 38, 0.25)',
        'warm-2xl':   '0 50px 120px rgba(75, 50, 38, 0.35)',
        'warm-glow':  '0 0 60px rgba(185, 128, 93, 0.40), 0 0 120px rgba(139, 94, 60, 0.20)',
        'gold-glow':  '0 0 40px rgba(201, 150, 58, 0.40), 0 0 80px rgba(201, 150, 58, 0.15)',
        'cream-inner':'inset 0 2px 8px rgba(139, 94, 60, 0.08)',
        'card-hover': '0 25px 60px rgba(139, 94, 60, 0.22), 0 0 0 1px rgba(139, 94, 60, 0.12)',
      },
      backgroundImage: {
        'shimmer-warm': 'linear-gradient(105deg, transparent 40%, rgba(185,128,93,0.15) 50%, transparent 60%)',
        'gradient-warm-radial': 'radial-gradient(ellipse at center, rgba(185,128,93,0.15) 0%, transparent 70%)',
        'gradient-espresso': 'linear-gradient(135deg, #4B3226 0%, #2A1810 100%)',
        'gradient-gold':     'linear-gradient(135deg, #C9963A 0%, #B9805D 50%, #8B5E3C 100%)',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
