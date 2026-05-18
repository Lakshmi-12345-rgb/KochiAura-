import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, User, Mail, Phone, MessageSquare, Clock, ArrowRight, CheckCircle } from 'lucide-react';
import { leadService } from '../services/leadService';
import { Property } from '../types';

interface InquiryFormProps {
  property?: Property;
  type?: 'inquiry' | 'visit';
  onSuccess?: () => void;
}

export default function InquiryForm({ property, type = 'inquiry', onSuccess }: InquiryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    preferredTime: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await leadService.submitInquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        category: type === 'visit' ? 'Schedule Visit' : 'Property Inquiry',
        propertyName: property?.title,
        propertyId: property?.id,
        preferredTime: type === 'visit' ? formData.preferredTime : undefined
      });
      setIsSuccess(true);
      if (onSuccess) setTimeout(onSuccess, 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-8 text-center bg-emerald-500/5 border border-emerald-500/20 rounded-2xl"
      >
        <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-serif text-white mb-2">Registration Complete</h3>
        <p className="text-neutral-400 text-sm leading-relaxed max-w-xs mx-auto">
          Your interest in <span className="text-[#d4af37] font-medium">{property?.title}</span> has been logged. Our elite concierge team will reach out within 2 hours.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 flex items-center">
            <User className="w-3 h-3 mr-1.5" /> Full Name
          </label>
          <input
            required
            type="text"
            className="w-full bg-neutral-900/50 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/20 outline-none transition-all"
            placeholder="Reji Vault"
            value={formData.name}
            onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 flex items-center">
            <Mail className="w-3 h-3 mr-1.5" /> Private Email
          </label>
          <input
            required
            type="email"
            className="w-full bg-neutral-900/50 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/20 outline-none transition-all"
            placeholder="reji@aura.com"
            value={formData.email}
            onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 flex items-center">
            <Phone className="w-3 h-3 mr-1.5" /> Mobile Registry
          </label>
          <input
            required
            type="tel"
            className="w-full bg-neutral-900/50 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/20 outline-none transition-all"
            placeholder="+91 9000 0000 00"
            value={formData.phone}
            onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
          />
        </div>
        {type === 'visit' && (
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 flex items-center">
              <Clock className="w-3 h-3 mr-1.5" /> Preferred Schedule
            </label>
            <select
              required
              className="w-full bg-neutral-900/50 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:border-[#d4af37] outline-none transition-all appearance-none"
              value={formData.preferredTime}
              onChange={e => setFormData(p => ({ ...p, preferredTime: e.target.value }))}
            >
              <option value="" disabled>Select Slot</option>
              <option value="Morning (10:00 - 12:00)">Morning (10:00 - 12:00)</option>
              <option value="Afternoon (14:00 - 17:00)">Afternoon (14:00 - 17:00)</option>
              <option value="Sunset (17:00 - 19:00)">Sunset (17:00 - 19:00)</option>
            </select>
          </div>
        )}
      </div>

      <div className="space-y-1.5">
        <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 flex items-center">
          <MessageSquare className="w-3 h-3 mr-1.5" /> Advanced Briefing / Requirements
        </label>
        <textarea
          rows={4}
          className="w-full bg-neutral-900/50 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:border-[#d4af37] outline-none transition-all resize-none"
          placeholder="Specify if you require a specific Vastu audit or a private security personnel walkthrough..."
          value={formData.message}
          onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
        />
      </div>

      <button
        disabled={isSubmitting}
        className="group w-full py-4 bg-[#d4af37] text-black rounded-xl text-xs font-mono font-bold uppercase tracking-[0.3em] flex items-center justify-center space-x-3 transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-50"
      >
        <span>{isSubmitting ? 'Transmitting...' : (type === 'visit' ? 'Request Site Visit' : 'Submit Private Inquiry')}</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
      
      <p className="text-center text-[9px] font-mono text-neutral-600 uppercase tracking-widest">
        By submitting, you agree to our private disclosure protocols.
      </p>
    </form>
  );
}
