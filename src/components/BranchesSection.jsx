import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const BRANCHES = [
  {
    city: 'NEW YORK',
    address: '1600 Pennsylvania Ave NW, Washington, DC 20500',
  },
  {
    city: 'LOS ANGELES',
    address: '1313 Disneyland Dr, Anaheim, CA 92802',
  },
  {
    city: 'CHICAGO',
    address: '233 S Wacker Dr, Chicago, IL 60606',
  },
  {
    city: 'MIAMI',
    address: '1100 Lincoln Rd, Miami Beach, FL 33139',
  },
];

// Vector Map Component to act as our thumbnail placeholder
const VectorMapThumbnail = () => (
  <svg 
    viewBox="0 0 200 120" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className="w-full h-full bg-[#021f1f] transition-transform duration-500 ease-out group-hover:scale-110"
  >
    {/* Map grid lines */}
    <path d="M 0 30 H 200 M 0 60 H 200 M 0 90 H 200" stroke="rgba(255,255,255,0.05)" strokeWidth="1.2" />
    <path d="M 50 0 V 120 M 100 0 V 120 M 150 0 V 120" stroke="rgba(255,255,255,0.05)" strokeWidth="1.2" />
    
    {/* Winding roads */}
    <path d="M -10 35 Q 70 15 110 65 T 210 45" stroke="rgba(255,255,255,0.12)" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    <path d="M 40 -10 Q 75 75 145 130" stroke="rgba(255,255,255,0.12)" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    
    {/* Green park shapes */}
    <rect x="15" y="65" width="45" height="35" rx="6" fill="#008248" fillOpacity="0.15" />
    <rect x="125" y="15" width="55" height="40" rx="8" fill="#008248" fillOpacity="0.15" />
    
    {/* Glowing Map pin */}
    <g transform="translate(100, 52)" className="filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
      <path d="M0 0C-3 -3 -7 -7 -7 -12C-7 -17 -3.5 -21 0 -21C3.5 -21 7 -17 7 -12C7 -7 3 -3 0 0Z" fill="#00A862" />
      <circle cx="0" cy="-12" r="3" fill="white" />
    </g>
  </svg>
);

export default function BranchesSection() {
  return (
    <section className="relative py-28 bg-[#021A1A] px-4 md:px-8 select-none w-full" id="gift-cards">
      {/* Decorative gradients */}
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-brand-primary/5 blur-[120px] pointer-events-none" />

      {/* Main Container Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full">
        
        {/* LEFT COLUMN: Vertical Title Banner (Lg: 3 columns) */}
        <div className="lg:col-span-3 flex justify-center lg:justify-start">
          <div className="bg-white text-brand-dark px-8 py-10 rounded-[35px] shadow-[0_15px_40px_rgba(0,0,0,0.2)] flex flex-row lg:flex-col items-center justify-center gap-6 w-full lg:w-44 select-none border border-white/20">
            <MapPin size={24} className="text-brand-primary stroke-[2.5]" />
            <div className="flex flex-row lg:flex-col items-center gap-1.5 md:gap-3 text-center">
              {/* Stack letters vertically on desktop, horizontally on mobile */}
              <span className="font-montserrat font-black text-xl tracking-widest hidden lg:block">O</span>
              <span className="font-montserrat font-black text-xl tracking-widest hidden lg:block">U</span>
              <span className="font-montserrat font-black text-xl tracking-widest hidden lg:block">R</span>
              
              <span className="font-montserrat font-black text-xl tracking-widest hidden lg:block mt-3">B</span>
              <span className="font-montserrat font-black text-xl tracking-widest hidden lg:block">R</span>
              <span className="font-montserrat font-black text-xl tracking-widest hidden lg:block">A</span>
              <span className="font-montserrat font-black text-xl tracking-widest hidden lg:block">N</span>
              <span className="font-montserrat font-black text-xl tracking-widest hidden lg:block">C</span>
              <span className="font-montserrat font-black text-xl tracking-widest hidden lg:block">H</span>
              <span className="font-montserrat font-black text-xl tracking-widest hidden lg:block">E</span>
              <span className="font-montserrat font-black text-xl tracking-widest hidden lg:block">S</span>

              {/* Mobile text version */}
              <span className="font-montserrat font-black text-lg tracking-widest uppercase lg:hidden">
                OUR BRANCHES
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: 2x2 Locations Grid (Lg: 9 columns) */}
        <div className="lg:col-span-9 flex flex-col justify-between">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {BRANCHES.map((branch, index) => (
              <motion.div
                key={branch.city}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative bg-[#022121]/90 rounded-3xl p-5 border border-white/5 flex items-center gap-4 hover:border-brand-accent/40 hover:shadow-[0_8px_30px_rgba(0,168,98,0.15)] transition-all duration-300 cursor-pointer"
              >
                {/* Map Thumbnail wrapper */}
                <div className="w-24 h-20 rounded-2xl overflow-hidden shrink-0 border border-white/10 relative shadow-inner">
                  <VectorMapThumbnail />
                </div>

                {/* Branch Info details */}
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-montserrat font-black text-sm tracking-widest text-white group-hover:text-brand-accent transition-colors duration-300">
                    {branch.city}
                  </h3>
                  <p className="text-brand-textMuted font-poppins text-xs leading-normal mt-1 truncate-2-lines">
                    {branch.address}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom MORE link */}
          <div className="w-full flex justify-center mt-10">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="text-xs font-bold font-montserrat tracking-widest text-brand-textMuted hover:text-brand-accent transition-colors duration-300 border-b-2 border-brand-textMuted/20 hover:border-brand-accent pb-1"
            >
              MORE BRANCHES
            </motion.button>
          </div>
        </div>

      </div>
    </section>
  );
}
