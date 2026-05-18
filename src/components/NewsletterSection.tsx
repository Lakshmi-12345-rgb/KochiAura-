import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Sparkles, Send, Check } from 'lucide-react';
import { leadService } from '../services/leadService';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await leadService.submitInquiry({
        name: 'Newsletter Subscriber',
        email,
        phone: 'N/A',
        message: 'Subscribed to luxury newsletter',
        category: 'Newsletter'
      });
      setIsSuccess(true);
      setEmail('');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 relative overflow-hidden bg-black border-t border-neutral-900">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#d4af37]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      
      <div className="max-w-4xl mx-auto px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="flex items-center justify-center space-x-2 text-[#d4af37]">
            <Sparkles className="w-4 h-4" />
            <span className="text-[10px] font-mono uppercase tracking-[0.4em]">Inside Aura</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight">The Executive Ledger</h2>
          <p className="text-neutral-500 max-w-xl mx-auto text-sm leading-relaxed font-light">
            Receive early-access briefings on off-market penthouses and heritage restorations before they reach the public registry.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto relative mt-8">
            <div className="relative group">
              <input
                required
                type="email"
                placeholder="reji@estate.local"
                className="w-full bg-neutral-900/50 border border-neutral-800 rounded-full py-4 pl-6 pr-16 text-sm text-white focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/20 outline-none transition-all placeholder:text-neutral-700"
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={isSuccess || isSubmitting}
              />
              <button
                type="submit"
                disabled={isSubmitting || isSuccess}
                className={`absolute right-2 top-2 bottom-2 px-6 rounded-full font-mono font-bold text-[10px] uppercase tracking-widest transition-all ${
                  isSuccess 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-[#d4af37] text-black hover:brightness-110 active:scale-95'
                }`}
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                ) : isSuccess ? (
                  <Check className="w-4 h-4" />
                ) : (
                  'Subscribe'
                )}
              </button>
            </div>
            {isSuccess && (
              <motion.p 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest mt-4"
              >
                Welcome to the registry. Your verification is pending.
              </motion.p>
            )}
          </form>

          <div className="pt-8 flex justify-center items-center space-x-12 grayscale opacity-40">
             <div className="text-[10px] font-mono uppercase tracking-tighter">VOGUE</div>
             <div className="text-[10px] font-mono uppercase tracking-tighter italic">ARCHITECTURAL DIGEST</div>
             <div className="text-[10px] font-mono uppercase tracking-tighter">FORBES</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
