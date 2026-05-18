import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Award, Users, History, Landmark, Sparkles } from 'lucide-react';
import SEO from '../components/SEO';

export default function AboutPage() {
  return (
    <div className="pt-24 min-h-screen bg-[#070707] text-neutral-300">
      <SEO 
        title="About Aura Kochi | Luxury Real Estate Heritage"
        description="Discover the legacy of Aura Kochi. We are a boutique real estate collective specializing in historical restorations and elite luxury acquisitions in Kochi."
      />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#d4af37]/10 to-transparent" />
        <div className="max-w-6xl mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center space-x-2 bg-[#d4af37]/10 px-4 py-2 rounded-full border border-[#d4af37]/30">
              <History className="w-4 h-4 text-[#d4af37]" />
              <span className="text-[10px] font-mono text-[#d4af37] uppercase tracking-widest">Our Legacy</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif text-white tracking-tight italic leading-tight">
              Curating <span className="text-[#d4af37]">Royal Heritage</span> <br />
              Since 1988.
            </h1>
            <p className="text-sm md:text-base text-neutral-400 max-w-2xl mx-auto font-sans leading-relaxed">
              Aura Kochi is not just a real estate firm; we are the custodians of Kochi's architectural soul. From historic Fort Kochi mansions to futuristic Marine Drive penthouses.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-24 border-t border-neutral-900 bg-neutral-950/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValueCard 
              icon={<ShieldCheck className="w-6 h-6" />}
              title="Uncompromising Integrity"
              description="Every holding in our portfolio undergoes a rigorous 120-point digital and physical restoration audit."
            />
            <ValueCard 
              icon={<Landmark className="w-6 h-6" />}
              title="Architectural Curation"
              description="We specialize in properties that offer more than space—they offer a historical narrative and cultural significance."
            />
            <ValueCard 
              icon={<Award className="w-6 h-6" />}
              title="Elite Concierge"
              description="Our relationship begins where the transaction ends, providing bespoke estate management for global HNIs."
            />
          </div>
        </div>
      </section>

      {/* Timeline/Story Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 space-y-16">
          <div className="text-center">
            <h2 className="text-3xl font-serif text-white mb-4">The Evolution of Excellence</h2>
            <div className="h-px w-24 bg-[#d4af37] mx-auto opacity-50" />
          </div>

          <div className="space-y-12">
            <StoryMilestone 
              year="1988"
              title="Foundation in Fort Kochi"
              description="Started as a boutique restoration studio specializing in Dutch and Portuguese era villas."
            />
            <StoryMilestone 
              year="2005"
              title="Expansion into Luxury High-Rise"
              description="Pioneered the first luxury waterfront apartments in Marine Drive, setting new standards for Kochi's skyline."
            />
            <StoryMilestone 
              year="2024"
              title="The Digital Vanguard"
              description="Integrating AI staging and 3D VR immersion into every acquisition, bridging tradition with the future."
            />
          </div>
        </div>
      </section>

      {/* Team CTA */}
      <section className="py-24 bg-[#0a0a0a] border-y border-neutral-900">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <Users className="w-12 h-12 text-[#d4af37] mx-auto opacity-50" />
          <h2 className="text-2xl font-serif text-white italic">Connect with our Lead Portfolio Strategists</h2>
          <p className="text-sm text-neutral-400 font-sans max-w-lg mx-auto">
            Our team consists of architects, historians, and financial advisors dedicated to securing your legacy.
          </p>
          <button className="px-10 py-4 bg-[#d4af37] text-black font-bold font-mono text-[11px] uppercase tracking-widest rounded-xl hover:scale-105 transition-transform cursor-pointer">
            Meet The Partners
          </button>
        </div>
      </section>
    </div>
  );
}

function ValueCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 rounded-2xl bg-neutral-900/30 border border-neutral-800 hover:border-[#d4af37]/30 transition-all group">
      <div className="w-12 h-12 bg-[#d4af37]/10 flex items-center justify-center rounded-xl text-[#d4af37] mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-serif text-white mb-4 italic">{title}</h3>
      <p className="text-sm text-neutral-500 leading-relaxed">{description}</p>
    </div>
  );
}

function StoryMilestone({ year, title, description }: { year: string, title: string, description: string }) {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
      <div className="shrink-0">
        <span className="text-2xl font-serif text-[#d4af37] italic border-b border-[#d4af37]/30 pb-1">{year}</span>
      </div>
      <div className="space-y-2">
        <h4 className="text-lg font-serif text-white">{title}</h4>
        <p className="text-sm text-neutral-500 font-sans leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
