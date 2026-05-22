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
        'float':          'float 7s ease-in-out infinite',
        'float-delayed':  'float 7s ease-in-out infinite 3.5s',
        'spin-slow':      'spin 30s linear infinite',
        'marquee':        'marquee 28s linear infinite',
        'pulse-soft':     'pulse-soft 3s ease-in-out infinite',
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
        'pulse-soft': {
          '0%, 100%': { opacity: '0.6' },
          '50%':      { opacity: '1' },
        }
      },
      boxShadow: {
        'warm-sm':  '0 4px 15px rgba(139, 94, 60, 0.12)',
        'warm-md':  '0 8px 30px rgba(139, 94, 60, 0.18)',
        'warm-lg':  '0 20px 60px rgba(139, 94, 60, 0.22)',
        'warm-xl':  '0 30px 80px rgba(75, 50, 38, 0.25)',
        'cream-inner': 'inset 0 2px 8px rgba(139, 94, 60, 0.08)',
      }
    },
  },
  plugins: [],
}
