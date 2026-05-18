import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, Calendar, Send, Copy, CheckCircle2, User, Landmark, ShieldAlert, FileText, Sparkles } from 'lucide-react';
import { Property } from '../types';

interface CTAContactProps {
  properties: Property[];
  prefilledProperty: string;
}

export default function CTAContact({ properties, prefilledProperty }: CTAContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyInterest: prefilledProperty || '',
    investorStatus: 'NRI Executive (GCC/Global)',
    preferences: ''
  });

  const [composedLink, setComposedLink] = useState('');
  const [copyState, setCopyState] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Sync prefilled property
  useEffect(() => {
    if (prefilledProperty) {
      setFormData(prev => ({ ...prev, propertyInterest: prefilledProperty }));
    }
  }, [prefilledProperty]);

  // Generate mailto link dynamically based on fields
  useEffect(() => {
    const emailTo = 'rejik1509@gmail.com';
    const subject = encodeURIComponent(`[KOCHI ROYAL PORTFOLIO] Luxury Consultation - ${formData.name || 'Client'}`);
    
    const bodyContent = `Dear Kochi Royal Estates Portfolio Desk (Reji K.),

I would like to execute a formal inquiry concerning premium property listings in Kochi.

Below are my vetted investment coordinates:
- Client Name: ${formData.name || '[Please Provide]'}
- Contact Phone: ${formData.phone || '[Please Provide]'}
- Contact Email: ${formData.email || '[Please Provide]'}
- Property Of Interest: ${formData.propertyInterest || 'Unspecified (Reviewing All Holdings)'}
- Client Demographics Category: ${formData.investorStatus}

- Personal Curated Requirements:
${formData.preferences || 'Requesting a general overview of investment schedules, Vastu compliance certificates, and pricing tiers.'}

I look forward to syncing schedules with your boutique chef concierge or lead coordinator for a private waterside inspection.

Warm regards,
${formData.name || 'Investor Representative'}`;

    setComposedLink(`mailto:${emailTo}?subject=${subject}&body=${encodeURIComponent(bodyContent)}`);
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCopyCredentials = () => {
    navigator.clipboard.writeText(formData.name ? `Client: ${formData.name}\nPhone: ${formData.phone}\nProperty of Interest: ${formData.propertyInterest}\nRequirements: ${formData.preferences}` : "Please fill out the coordinates.");
    setCopyState(true);
    setTimeout(() => setCopyState(false), 2000);
  };

  const executeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    // Explicitly navigate to composed mailto link to open local email handler addressed to rejik1509@gmail.com
    window.location.href = composedLink;
  };

  return (
    <section id="contact-desk" className="py-24 px-4 md:px-8 bg-neutral-950 font-sans border-t border-neutral-900 relative">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        
        {/* Callout Info Column (Left Bed) */}
        <div className="lg:col-span-5 space-y-7 flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-xs uppercase font-mono tracking-[0.25em] text-[#d4af37] font-semibold flex items-center">
              <Landmark className="w-4 h-4 mr-2" /> LEAD ACQUISITIONS DESK
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-wide leading-tight font-semibold text-shadow-gold">
              Claim Your Address <br />
              <span className="bg-gradient-to-r from-[#b38f12] via-[#f3e5ab] to-[#d4af37] bg-clip-text text-transparent">
                With Elite Discretion
              </span>
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed font-light">
              Your inquiries are directly routed to the personal portfolio inbox of our Managing Broker (<span className="text-[#d4af37] font-semibold">rejik1509@gmail.com</span>). Complete the form on the right to compose your customized buying parameters and securely auto-draft your elite viewings request.
            </p>
          </div>

          {/* Contact Details Cards */}
          <div className="space-y-3.5">
            <div className="flex items-center space-x-3.5 bg-neutral-900/40 p-3.5 rounded border border-neutral-900 hover:border-[#d4af37]/30 transition-colors">
              <Mail className="w-5 h-5 text-[#d4af37]" />
              <div>
                <span className="text-[10px] font-mono text-neutral-500 uppercase block">DIRECT EMAIL CONDUIT</span>
                <a href="mailto:rejik1509@gmail.com" className="text-xs text-neutral-200 font-semibold hover:text-[#d4af37]">
                  rejik1509@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-3.5 bg-neutral-900/40 p-3.5 rounded border border-neutral-900 hover:border-[#d4af37]/30 transition-colors">
              <Phone className="w-5 h-5 text-[#d4af37]" />
              <div>
                <span className="text-[10px] font-mono text-neutral-500 uppercase block">VIP CONSULTATION ALIGNMENT</span>
                <span className="text-xs text-neutral-200 font-semibold">+91 944 700 AURA</span>
              </div>
            </div>

            <div className="flex items-center space-x-3.5 bg-neutral-900/40 p-3.5 rounded border border-neutral-900 hover:border-[#d4af37]/30 transition-colors">
              <Calendar className="w-5 h-5 text-[#d4af37]" />
              <div>
                <span className="text-[10px] font-mono text-neutral-500 uppercase block">COMMITTED RESPONSE TIMES</span>
                <span className="text-xs text-neutral-300">Within 2 Hours (Ultra VIP Priority Desk)</span>
              </div>
            </div>
          </div>

          <div className="bg-[#d4af37]/5 p-4 rounded border border-[#d4af37]/15">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#d4af37] font-semibold block mb-1">
              🔒 Privacy Assured
            </span>
            <p className="text-[10px] text-neutral-500 leading-normal">
              No third-party marketing, zero algorithmic newsletters. Pure, high-end, client-broker relationships.
            </p>
          </div>

        </div>

        {/* Lead Form Panel (Right Bed) */}
        <div className="lg:col-span-7 bg-[#0b0b0b] border border-[#d4af37]/45 rounded-xl p-6 sm:p-8 shadow-[0_0_40px_rgba(212,175,55,0.06)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/2 blur-3xl pointer-events-none" />

          <form onSubmit={executeSubmit} className="space-y-4 font-sans">
            
            {/* Header Form */}
            <div className="border-b border-neutral-800 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase font-mono">
                  Dossier Request Coordinates
                </h3>
                <span className="text-[10px] text-neutral-500 italic block">Addressed to: rejik1509@gmail.com</span>
              </div>
              <Sparkles className="w-4 h-4 text-[#d4af37] animate-pulse" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono tracking-widest text-[#d4af37] font-semibold block">Your Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-600 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                    className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#d4af37] text-xs text-neutral-200 pl-10 pr-4 py-2.5 rounded outline-none transition-all placeholder:text-neutral-700"
                  />
                </div>
              </div>

              {/* Contact Email */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono tracking-widest text-[#d4af37] font-semibold block">Your Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-600 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. investor@global.com"
                    className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#d4af37] text-xs text-neutral-200 pl-10 pr-4 py-2.5 rounded outline-none transition-all placeholder:text-neutral-700"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Contact Phone */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono tracking-widest text-[#d4af37] font-semibold block">Contact Number</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-neutral-600 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. +91 90000 00000"
                    className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#d4af37] text-xs text-neutral-200 pl-10 pr-4 py-2.5 rounded outline-none transition-all placeholder:text-neutral-700"
                  />
                </div>
              </div>

              {/* Selected Property */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono tracking-widest text-[#d4af37] font-semibold block">Holdings of Interest</label>
                <select
                  name="propertyInterest"
                  value={formData.propertyInterest}
                  onChange={handleInputChange}
                  className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#d4af37] text-xs text-neutral-300 px-3.5 py-2.5 rounded outline-none transition-all"
                >
                  <option value="">Let Aura Concierge Suggest...</option>
                  {properties.map(p => (
                    <option key={p.id} value={p.title}>{p.title} ({p.location})</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Investor Demographic Status */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-mono tracking-widest text-[#d4af37] font-semibold block">Client Verification Group</label>
              <select
                name="investorStatus"
                value={formData.investorStatus}
                onChange={handleInputChange}
                className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#d4af37] text-xs text-neutral-300 px-3.5 py-2.5 rounded outline-none transition-all"
              >
                <option value="NRI Executive (GCC/Global)">NRI Executive (GCC/Global)</option>
                <option value="Domestic Tech Investor / CXO">Domestic Tech Investor / CXO</option>
                <option value="Boutique Hospitality Partner">Boutique Hospitality Partner</option>
                <option value="Vastu Compliance Conscious Family">Vastu Compliance Conscious Family</option>
              </select>
            </div>

            {/* Preferences / Custom Requests */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 block mb-1">Custom Architectural / Booking Requests</label>
              <textarea
                name="preferences"
                value={formData.preferences}
                onChange={handleInputChange}
                rows={3}
                placeholder="Briefly describe your desired viewings timeline, custom Vastu layout requirements, or interior staging options..."
                className="w-full bg-neutral-950 border border-neutral-800 hover:border-neutral-750 focus:border-[#d4af37] rounded p-3 text-xs text-neutral-200 outline-none transition-colors placeholder:text-neutral-700 focus:ring-1 focus:ring-[#d4af37]/20"
              />
            </div>

            {/* Simulated actions bar */}
            <div className="flex flex-col sm:flex-row gap-3 pt-3">
              <button
                type="button"
                onClick={handleCopyCredentials}
                className="flex-[2] py-3 bg-neutral-900 hover:bg-neutral-850 border border-neutral-850 hover:border-neutral-700 text-neutral-300 text-xs tracking-wider uppercase font-mono font-bold rounded transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                {copyState ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span className="text-green-400">Copied Coordinates!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Request Copy</span>
                  </>
                )}
              </button>

              <button
                type="submit"
                className="flex-[3] py-2.5 bg-gradient-to-r from-[#b38f12] via-[#d4af37] to-[#b38f12] hover:brightness-110 active:scale-[0.98] text-black font-semibold rounded text-xs uppercase tracking-widest font-mono font-bold transition-all shadow-[0_5px_22px_rgba(212,175,55,0.25)] flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Send className="w-4 h-4 text-black" />
                <span>Compose Official Mail</span>
              </button>
            </div>

            {formSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg text-center mt-2"
              >
                <p className="text-[11px] text-green-400">
                  Compose window launched! Reaching direct desk at <span className="underline font-bold font-mono">rejik1509@gmail.com</span>. Please click "Send" in your email client to finalise.
                </p>
              </motion.div>
            )}

          </form>

        </div>

      </div>
    </section>
  );
}
