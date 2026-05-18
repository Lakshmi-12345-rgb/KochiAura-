import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Phone, X, Send, CheckCircle2, ArrowRight } from 'lucide-react';
import { leadService } from '../services/leadService';

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const [showCallback, setShowCallback] = useState(false);
  const [formState, setFormState] = useState({ name: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await leadService.submitInquiry({
        name: formState.name,
        phone: formState.phone,
        email: 'callback@request.local',
        message: 'Client requested a quick callback via floating widget.',
        category: 'Request Callback'
      });
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setShowCallback(false);
        setFormState({ name: '', phone: '' });
      }, 3000);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end space-y-4">
      
      {/* Callback Form Popup */}
      <AnimatePresence>
        {showCallback && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="bg-neutral-900 border border-[#d4af37]/30 rounded-2xl p-6 w-80 shadow-2xl mb-4"
          >
            {isSuccess ? (
              <div className="text-center py-4 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="text-white font-serif">Acknowledged</h4>
                <p className="text-[10px] text-neutral-400 font-mono uppercase tracking-widest">A concierge will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleCallbackSubmit} className="space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-[#d4af37]">Request Callback</h4>
                  <button type="button" onClick={() => setShowCallback(false)} className="text-neutral-500 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-3">
                  <input
                    required
                    type="text"
                    placeholder="Your Name"
                    className="w-full bg-black border border-neutral-800 rounded-lg p-3 text-xs text-white outline-none focus:border-[#d4af37] transition-colors"
                    value={formState.name}
                    onChange={e => setFormState(prev => ({ ...prev, name: e.target.value }))}
                  />
                  <input
                    required
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full bg-black border border-neutral-800 rounded-lg p-3 text-xs text-white outline-none focus:border-[#d4af37] transition-colors"
                    value={formState.phone}
                    onChange={e => setFormState(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#d4af37] text-black font-mono font-bold text-[10px] uppercase tracking-widest rounded-lg hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'Requesting...' : 'Request Call'}
                </button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Buttons */}
      <div className="flex flex-col space-y-3">
        {/* Callback Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowCallback(!showCallback)}
          className="w-12 h-12 bg-white text-black rounded-full shadow-xl flex items-center justify-center group relative"
        >
          <Phone className="w-5 h-5" />
          <span className="absolute right-14 px-3 py-1.5 bg-neutral-900 border border-neutral-800 text-[9px] font-mono uppercase tracking-widest text-white rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Request Callback
          </span>
        </motion.button>

        {/* WhatsApp Button */}
        <motion.a
          href="https://wa.me/919000000000" // Placeholder
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl flex items-center justify-center relative overflow-hidden group shadow-[0_0_20px_rgba(37,211,102,0.3)]"
        >
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <MessageSquare className="w-6 h-6 fill-current" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full border-2 border-white flex items-center justify-center text-[8px] font-bold">1</span>
        </motion.a>
      </div>
    </div>
  );
}
