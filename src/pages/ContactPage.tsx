import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Clock, Send, ShieldCheck, Globe } from 'lucide-react';
import SEO from '../components/SEO';

export default function ContactPage() {
  return (
    <div className="pt-24 min-h-screen bg-[#070707] text-neutral-300">
      <SEO 
        title="Contact Aura Kochi | Private Portfolio Inquiry"
        description="Connect with our lead portfolio desk for exclusive property viewings, investment consultations, and luxury estate inquiries in Kochi."
      />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#d4af3715,transparent_50%)]" />
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center space-x-2 bg-[#d4af37]/10 px-4 py-2 rounded-full border border-[#d4af37]/30">
                <Globe className="w-4 h-4 text-[#d4af37]" />
                <span className="text-[10px] font-mono text-[#d4af37] uppercase tracking-widest">Global Desk</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-serif text-white tracking-tight italic">
                Direct Line to <br />
                <span className="text-[#d4af37]">Acquisition Excellence</span>
              </h1>
              <p className="text-neutral-400 font-sans leading-relaxed">
                Whether you are looking to acquire a piece of history or seeking guidance on your next major waterfront development, our specialists are ready to assist.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Content Grid */}
      <section className="py-20 bg-neutral-950/30 border-y border-neutral-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Information Side */}
            <div className="lg:col-span-5 space-y-12">
              <div className="space-y-8">
                <ContactInfoItem 
                  icon={<Mail className="w-5 h-5" />}
                  label="Private Inquiry"
                  value="concierge@aurakochi.com"
                  sub="Response within 2 hours"
                />
                <ContactInfoItem 
                  icon={<Phone className="w-5 h-5" />}
                  label="Direct Line"
                  value="+91 9845-001-KCH"
                  sub="Mon-Sat, 9AM - 8PM IST"
                />
                <ContactInfoItem 
                  icon={<MapPin className="w-5 h-5" />}
                  label="Portfolio Office"
                  value="12th Floor, Imperial Tower, Marine Drive, Kochi, Kerala 682031"
                  sub="Viewing by appointment only"
                />
              </div>

              <div className="p-8 rounded-2xl bg-gradient-to-br from-[#d4af37]/10 to-transparent border border-[#d4af37]/20 space-y-4">
                 <ShieldCheck className="w-8 h-8 text-[#d4af37]" />
                 <h3 className="text-lg font-serif text-white italic">Privacy Guaranteed</h3>
                 <p className="text-xs text-neutral-400 leading-relaxed font-mono uppercase tracking-wider">
                   All inquiries are handled through our encrypted private desk. Your personal data and acquisition interests remain strictly confidential.
                 </p>
              </div>
            </div>

            {/* Form Side */}
            <div className="lg:col-span-7">
              <div className="bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 p-8 md:p-12 rounded-3xl space-y-8 shadow-2xl">
                <div className="space-y-2">
                  <h2 className="text-2xl font-serif text-white">Send a Brief</h2>
                  <p className="text-xs text-neutral-500 font-mono uppercase tracking-widest">Awaiting your requirements</p>
                </div>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-[0.2em]">Full Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-black border border-neutral-800 rounded-xl p-4 text-sm text-white focus:border-[#d4af37] outline-none transition-all"
                      placeholder="e.g. Adv. Arjun Menon"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-[0.2em]">Email Address</label>
                    <input 
                      type="email" 
                      className="w-full bg-black border border-neutral-800 rounded-xl p-4 text-sm text-white focus:border-[#d4af37] outline-none transition-all"
                      placeholder="arjun@example.com"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-[0.2em]">Interest Type</label>
                    <select className="w-full bg-black border border-neutral-800 rounded-xl p-4 text-sm text-white focus:border-[#d4af37] outline-none transition-all appearance-none">
                      <option>Historic Legacy Villa</option>
                      <option>Waterfront Penthouse</option>
                      <option>Investment Land</option>
                      <option>Commercial Portfolio</option>
                    </select>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-[0.2em]">Your Message / Brief</label>
                    <textarea 
                      rows={4}
                      className="w-full bg-black border border-neutral-800 rounded-xl p-4 text-sm text-white focus:border-[#d4af37] outline-none transition-all resize-none"
                      placeholder="Detail your requirements or specific holding of interest..."
                    />
                  </div>
                  <div className="md:col-span-2 pt-4">
                    <button className="w-full py-4 bg-[#d4af37] text-black font-bold font-mono text-[11px] uppercase tracking-widest rounded-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center space-x-2">
                      <Send className="w-4 h-4" />
                      <span>Transmit Brief</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Map Placeholder Section */}
      <section className="h-96 w-full relative bg-neutral-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full bg-[linear-gradient(rgba(20,20,20,0.8),rgba(20,20,20,0.8)),url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center" />
        </div>
        <div className="relative z-10 text-center space-y-4">
           <MapPin className="w-10 h-10 text-[#d4af37] mx-auto animate-bounce" />
           <p className="text-xs font-mono uppercase tracking-[0.4em] text-white">Kochi Global Headquarters</p>
           <p className="text-[10px] text-neutral-500 max-w-xs mx-auto leading-relaxed">Integrated Navigation via Google Maps Available to VIP Visitors Only.</p>
        </div>
      </section>
    </div>
  );
}

function ContactInfoItem({ icon, label, value, sub }: { icon: React.ReactNode, label: string, value: string, sub: string }) {
  return (
    <div className="flex space-x-6 items-start group">
      <div className="w-12 h-12 shrink-0 bg-neutral-900 border border-neutral-800 rounded-2xl flex items-center justify-center text-[#d4af37] group-hover:border-[#d4af37]/50 transition-all shadow-lg">
        {icon}
      </div>
      <div className="space-y-1">
        <h4 className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest font-bold">{label}</h4>
        <p className="text-lg font-serif text-white group-hover:text-[#d4af37] transition-colors">{value}</p>
        <p className="text-xs text-neutral-600 font-sans italic">{sub}</p>
      </div>
    </div>
  );
}
