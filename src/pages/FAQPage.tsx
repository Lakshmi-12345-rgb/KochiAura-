import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, HelpCircle, ShieldCheck, CreditCard, Key, Compass } from 'lucide-react';
import SEO from '../components/SEO';

const FAQ_DATA = [
  {
    category: 'Acquisition Process',
    icon: <Key className="w-4 h-4" />,
    items: [
      {
        q: "What documents are required for an NRI acquisition?",
        a: "NRIs require a valid passport, OCI card (if applicable), PAN card, and a designated NRE/NRO bank account. Aura Kochi's legal desk handles the entire PIS (Portfolio Investment Scheme) documentation and registration process."
      },
      {
        q: "How do I book a private property viewing?",
        a: "Viewings are held strictly by appointment. You can request a slot via our Portfolio Desk. For international clients, we offer UHD 3D VR immersive walkthroughs via Matterport prior to physical inspection."
      },
      {
        q: "Does Aura Kochi handle legal and registration due diligence?",
        a: "Yes. Every property in our portfolio is vetted by our in-house legal team. We provide a 'Clean Title' certificate and handle the entire Stamp Duty and Registration process at the Sub-Registrar office."
      }
    ]
  },
  {
    category: 'Vastushastra & Design',
    icon: <Compass className="w-4 h-4" />,
    items: [
      {
        q: "Are all Aura Kochi properties Vastu compliant?",
        a: "Most of our legacy holdings are built according to traditional Thachu Shastra guidelines. For newer developments, we offer secondary Vastu auditing and can suggest minor structural staging to ensure optimal energy flow."
      },
      {
        q: "Can I customize the interior design before moving in?",
        a: "Our Royal Bespoke service allows for architectural customization. You can use our AI Staging tool to preview concepts, which our partner architects then translate into reality."
      }
    ]
  },
  {
    category: 'Financials & Tax',
    icon: <CreditCard className="w-4 h-4" />,
    items: [
      {
        q: "What are the tax implications of luxury property in Kerala?",
        a: "Property owners are subject to annual municipal taxes and potential capital gains tax upon resale. Our financial desk provides a detailed tax roadmap for every investor based on their residency status."
      },
      {
        q: "Does Aura Kochi offer in-house financing?",
        a: "While we do not provide direct loans, we have exclusive partnerships with HDFC, ICICI, and SBI's HNI desks to provide prioritized loan processing at competitive rates for our portfolio holdings."
      }
    ]
  }
];

export default function FAQPage() {
  return (
    <div className="pt-24 min-h-screen bg-[#070707] text-neutral-300">
      <SEO 
        title="FAQ | Luxury Real Estate Kochi Investor Guide"
        description="Find answers to common questions about buying luxury villas, NRI property laws, and Vastu compliance in Kochi's premium real estate market."
      />

      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 relative z-10 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center space-x-2 bg-[#d4af37]/10 px-4 py-2 rounded-full border border-[#d4af37]/30"
          >
            <HelpCircle className="w-4 h-4 text-[#d4af37]" />
            <span className="text-[10px] font-mono text-[#d4af37] uppercase tracking-widest">Support Intelligence</span>
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-serif text-white tracking-tight italic">
            Essential <span className="text-[#d4af37]">Inquiries</span>
          </h1>
          <p className="text-neutral-500 max-w-xl mx-auto text-sm font-sans leading-relaxed">
            Everything you need to know about navigating the elite property markets of Kochi, from legal blueprints to architectural ethics.
          </p>
        </div>
      </section>

      {/* Accordion Component Area */}
      <section className="pb-32">
        <div className="max-w-4xl mx-auto px-4 space-y-12">
          {FAQ_DATA.map((category, idx) => (
            <div key={idx} className="space-y-6">
              <div className="flex items-center space-x-3 border-b border-neutral-900 pb-4">
                <div className="text-[#d4af37]">{category.icon}</div>
                <h2 className="text-xs font-mono uppercase tracking-[0.3em] font-bold text-white/50">{category.category}</h2>
              </div>
              <div className="space-y-4">
                {category.items.map((item, i) => (
                  <FAQItem key={i} question={item.q} answer={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-neutral-950/80 border-t border-neutral-900">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
           <ShieldCheck className="w-10 h-10 text-[#d4af37] mx-auto opacity-40" />
           <h3 className="text-xl font-serif text-white italic">Still Have Questions?</h3>
           <p className="text-sm text-neutral-500 font-sans max-w-md mx-auto">
             Our lead concierge is available for one-on-one consultations to clarify complex acquisition structures.
           </p>
           <button className="px-10 py-4 bg-transparent border border-neutral-800 text-white font-bold font-mono text-[11px] uppercase tracking-widest rounded-xl hover:bg-neutral-900 transition-all cursor-pointer">
             Speak with a Specialist
           </button>
        </div>
      </section>
    </div>
  );
}

interface FAQItemProps {
  question: string;
  answer: string;
  key?: React.Key;
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`overflow-hidden rounded-2xl border transition-all duration-300 ${isOpen ? 'bg-neutral-900/50 border-[#d4af37]/30' : 'bg-neutral-900/20 border-neutral-800/40 hover:border-neutral-700'}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex items-center justify-between text-left cursor-pointer"
      >
        <span className="text-sm md:text-base font-serif text-white/90 group-hover:text-white transition-colors">{question}</span>
        {isOpen ? <Minus className="w-4 h-4 text-[#d4af37]" /> : <Plus className="w-4 h-4 text-neutral-600" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 pb-6 pt-0 text-sm text-neutral-400 font-sans leading-relaxed border-t border-white/5 mt-2">
              <p className="pt-4">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
