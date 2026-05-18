import { useState } from 'react';
import { PROPERTIES, TESTIMONIALS } from '../data/properties';
import Hero from '../components/Hero';
import PropertiesGrid from '../components/PropertiesGrid';
import Testimonials from '../components/Testimonials';
import CTAContact from '../components/CTAContact';
import PropertyModal from '../components/PropertyModal';
import PropertyComparison from '../components/PropertyComparison';
import AIChatConcierge from '../components/AIChatConcierge';
import MortgageCalculator from '../components/MortgageCalculator';
import FloatingContact from '../components/FloatingContact';
import NewsletterSection from '../components/NewsletterSection';
import { Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function HomePage() {
  const [selectedProperty, setSelectedProperty] = useState<any | null>(null);
  const [compareList, setCompareList] = useState<any[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [prefilledProperty, setPrefilledProperty] = useState<string>('');

  const toggleCompare = (property: any) => {
    setCompareList(prev => {
      const exists = prev.find(p => p.id === property.id);
      if (exists) {
        return prev.filter(p => p.id !== property.id);
      }
      if (prev.length >= 4) return prev; // Limit to 4 for comparison
      return [...prev, property];
    });
  };

  const handleOpenLeadForm = (propertyName: string) => {
    setPrefilledProperty(propertyName);
    const element = document.getElementById('contact-desk');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Cinematic Hero Segment */}
      <Hero 
        onScrollToProperties={() => scrollToSection('properties-section')}
        onOpenLeadForm={() => handleOpenLeadForm('')}
      />

      {/* Filterable Listings Area */}
      <PropertiesGrid 
        properties={PROPERTIES}
        onSelectProperty={(property) => setSelectedProperty(property)}
        compareList={compareList}
        onToggleCompare={toggleCompare}
        onOpenCompare={() => setIsCompareOpen(true)}
      />

      {/* Testimonials Segment */}
      <Testimonials 
        testimonials={TESTIMONIALS}
      />

      {/* Investment Modeling Tool */}
      <MortgageCalculator />

      {/* New Experience CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/5 via-transparent to-[#d4af37]/5 pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 relative">
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="bg-neutral-950/40 backdrop-blur-xl border border-[#d4af37]/20 rounded-3xl p-8 md:p-16 text-center space-y-8"
           >
              <div className="inline-flex items-center space-x-2 bg-[#d4af37]/10 px-4 py-2 rounded-full border border-[#d4af37]/30">
                <Sparkles className="w-4 h-4 text-[#d4af37]" />
                <span className="text-[10px] font-mono text-[#d4af37] uppercase tracking-widest">Global Exposure</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-serif text-white max-w-3xl mx-auto leading-tight italic">
                Curate your next legacy acquisition with Kochi's premier <span className="text-[#d4af37] underline decoration-neutral-800">royal portfolio desk</span>.
              </h2>
              <p className="text-sm text-neutral-400 max-w-xl mx-auto font-sans leading-relaxed">
                Join an exclusive circle of international investors. Our private brief includes off-market listings and architectural heritage reports not available to the public.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <button 
                  onClick={() => scrollToSection('contact-desk')}
                  className="w-full sm:w-auto px-8 py-4 bg-[#d4af37] text-black font-bold font-mono text-[11px] uppercase tracking-widest rounded-xl hover:scale-105 transition-transform cursor-pointer"
                >
                  Request Private Catalog
                </button>
                <button 
                  onClick={() => scrollToSection('properties-section')}
                  className="w-full sm:w-auto px-8 py-4 bg-transparent border border-neutral-800 text-white font-bold font-mono text-[11px] uppercase tracking-widest rounded-xl hover:bg-neutral-900 transition-all cursor-pointer flex items-center justify-center space-x-2"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
           </motion.div>
        </div>
      </section>

      {/* Vetted Lead Generation Form Desk */}
      <CTAContact 
        properties={PROPERTIES}
        prefilledProperty={prefilledProperty}
      />

      {/* Newsletter Section */}
      <NewsletterSection />

      <FloatingContact />

      {/* Interactive AI Chat Concierge panel */}
      <AIChatConcierge 
        properties={PROPERTIES} 
        onPropertyClick={(property) => setSelectedProperty(property)}
      />

      {/* Property Details window (Modal overlay) */}
      {selectedProperty && (
        <PropertyModal 
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          onOpenLeadForm={handleOpenLeadForm}
        />
      )}

      {/* Luxury Property Comparison Overlay */}
      <PropertyComparison 
        isOpen={isCompareOpen}
        properties={compareList}
        onClose={() => setIsCompareOpen(false)}
        onRemove={(id) => setCompareList(prev => prev.filter(p => p.id !== id))}
      />
    </>
  );
}
