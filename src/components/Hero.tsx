import { motion } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck, Play, Compass, Key } from 'lucide-react';

interface HeroProps {
  onScrollToProperties: () => void;
  onOpenLeadForm: () => void;
}

export default function Hero({ onScrollToProperties, onOpenLeadForm }: HeroProps) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 md:px-8 bg-black overflow-hidden font-sans">
      
      {/* Background Cinematic Video/Image Overlay with heavy black & gold atmospheric gradients */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920&auto=format&fit=crop"
          alt="Luxury waterfront twilight background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-35"
        />
        {/* Layered custom gradients to match the recipe 12 luxury mood style */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
        {/* Gold shimmers */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#d4af37]/5 blur-[120px] rounded-full pointer-events-none" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto text-center space-y-8 px-2">
        
        {/* Elite micro-label */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center space-x-2 bg-neutral-900/80 border border-[#d4af37]/40 px-4 py-2 rounded-full backdrop-blur-md"
        >
          <Sparkles className="w-4 h-4 text-[#d4af37] animate-pulse" />
          <span className="text-[10px] sm:text-xs uppercase font-mono tracking-[0.25em] text-[#d4af37] font-semibold">
            INTRODUCING KOCHI'S UNRIVALED MAJESTY
          </span>
        </motion.div>

        {/* Grand Headline with refined recipe 12 serif style */}
        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl font-light font-serif tracking-tight text-white leading-[1.08] max-w-4xl mx-auto"
          >
            Sovereign Waterfronts. <br />
            <span className="font-semibold bg-gradient-to-r from-[#b38f12] via-[#f3e5ab] to-[#d4af37] bg-clip-text text-transparent">
              Restored Legacies.
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="text-neutral-400 font-sans text-xs sm:text-sm md:text-base max-w-xl mx-auto leading-relaxed"
          >
            Experience a curated portfolio of elite sky-penthouses, high-grade smart villas, and century-old restored colonial estates across Marine Drive, Fort Kochi, and Kumbalangi.
          </motion.p>
        </div>

        {/* Elegant structural grid markers for architectural touch */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto py-6 border-y border-neutral-800/60 bg-neutral-950/20 backdrop-blur-xs rounded"
        >
          <div className="text-center md:border-r border-neutral-900/60">
            <span className="block text-2xl font-serif font-bold text-[#d4af37]">₹8.5 Cr+</span>
            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block mt-1">Average Portfolio Entry</span>
          </div>
          <div className="text-center md:border-r border-neutral-900/60">
            <span className="block text-2xl font-serif font-bold text-white">100% Verified</span>
            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block mt-1">Elite Vastu Designs</span>
          </div>
          <div className="text-center md:border-r border-neutral-900/60 col-span-1">
            <span className="block text-2xl font-serif font-bold text-[#d4af37]">Aura AI</span>
            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block mt-1">Staging Concierge</span>
          </div>
          <div className="text-center col-span-1">
            <span className="block text-2xl font-serif font-bold text-white">Private Berth</span>
            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block mt-1">Peninsula Retaining</span>
          </div>
        </motion.div>

        {/* Hero Actions Call To Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4"
        >
          <button
            onClick={onScrollToProperties}
            id="explore-properties-cta"
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#b38f12] via-[#d4af37] to-[#b38f12] hover:brightness-115 active:scale-[0.98] text-black font-semibold rounded text-xs uppercase tracking-widest font-mono font-bold transition-all shadow-[0_5px_25px_rgba(212,175,55,0.3)] flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>Explore Kochi Holdings</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </button>
          
          <button
            onClick={onOpenLeadForm}
            id="book-private-tour-cta"
            className="w-full sm:w-auto px-8 py-3.5 bg-neutral-950 hover:bg-neutral-900 text-[#d4af37] border border-[#d4af37]/60 hover:border-[#d4af37] rounded text-xs uppercase tracking-widest font-mono font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Compass className="w-4 h-4" />
            <span>Consult VIP Portfolio Desk</span>
          </button>
        </motion.div>

        {/* Shimmer line scroll indicator */}
        <div className="pt-10 flex flex-col items-center">
          <span className="text-[9px] uppercase font-mono tracking-[0.25em] text-neutral-600 block mb-2">Scroll To Discover Luxury</span>
          <div className="w-1 h-12 rounded bg-gradient-to-b from-[#d4af37] to-transparent animate-pulse" />
        </div>

      </div>

    </section>
  );
}
