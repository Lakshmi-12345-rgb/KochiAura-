import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, ShieldCheck, MapPin, Landmark, ArrowRight, Zap, Target, PieChart } from 'lucide-react';
import SEO from '../components/SEO';

export default function InvestmentGuidePage() {
  return (
    <div className="pt-24 min-h-screen bg-[#070707] text-neutral-300">
      <SEO 
        title="Kochi Real Estate Investment Guide 2024 | Aura Kochi"
        description="Comprehensive guide on Kochi's luxury real estate market. Analysis of Marine Drive, Fort Kochi, and Kakkanad for HNI and NRI investors."
      />

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#d4af3710,transparent_60%)]" />
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 max-w-3xl"
          >
            <div className="inline-flex items-center space-x-2 bg-[#d4af37]/10 px-4 py-2 rounded-full border border-[#d4af37]/30">
              <TrendingUp className="w-4 h-4 text-[#d4af37]" />
              <span className="text-[10px] font-mono text-[#d4af37] uppercase tracking-widest">Market Intelligence</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-serif text-white tracking-tight italic leading-tight">
              The <span className="text-[#d4af37]">Blueprint</span> for <br />
              Kochi Capital Growth.
            </h1>
            <p className="text-lg text-neutral-400 font-sans leading-relaxed">
              Kochi is emerging as the premier HNI investment hub of South India. This guide explores why the gateway to Kerala is the most resilient luxury market in the region.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats/Quick Facts */}
      <section className="py-12 border-y border-neutral-900 bg-neutral-950/40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatBox label="Avg. Appreciation" value="12.5%" sub="Year-on-year Growth" />
            <StatBox label="Rental Yield" value="4.2%" sub="Luxury Segment" />
            <StatBox label="HNI Net Migration" value="+18%" sub="Fort Kochi Arrivals" />
            <StatBox label="Total Transaction" value="840 Cr+" sub="Luxury Q1 2024" />
          </div>
        </div>
      </section>

      {/* Deep Content Section */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-16">
            
            <ContentBlock 
              title="Strategic Hub: The Rise of the Silver Line"
              icon={<Zap className="w-6 h-6" />}
              content={`Kochi's infrastructure development, including the Kochi Metro expansion and the upcoming Silver Line semi-high-speed rail, is drastically reducing travel times. Properties along the waterfront and within a 5km radius of IT hubs like Kakkanad are seeing unprecedented valuation jumps.`}
            />

            <ContentBlock 
              title="Historical Resiliance: Fort Kochi's Immortal Appeal"
              icon={<Landmark className="w-6 h-6" />}
              content={`Unlike standard modern apartments, heritage villas in Fort Kochi and Mattancherry function as 'Liquid History'. With limited stock and strict architectural preservation laws, these assets have historical immunity to market fluctuations.`}
            />

            <div className="bg-neutral-900/40 rounded-3xl border border-neutral-800 p-8 md:p-12 space-y-8">
              <h3 className="text-2xl font-serif text-white italic">Top Investment Corridors</h3>
              <div className="space-y-6">
                <CorridorItem 
                  name="Marine Drive Ext." 
                  potential="High Appreciation" 
                  desc="The future 'Gold Coast' for luxury high-rises with sunset vistas."
                />
                <CorridorItem 
                  name="Vyttila - Panampilly" 
                  potential="Stable Yields" 
                  desc="Prestige residential clusters with established rental demand."
                />
                <CorridorItem 
                  name="Kakkanad IT Zone" 
                  potential="Massive Demand" 
                  desc="High occupancy rates due to the influx of global tech talent."
                />
              </div>
            </div>

            <ContentBlock 
              title="The NRI Advantage: Regulatory Ease"
              icon={<ShieldCheck className="w-6 h-6" />}
              content={`Revised FEMA regulations and RERA transparency have made Kochi a safe haven for NRI capital. Our portfolio desk specializes in assisting expatriates with repatriation of funds and tax-efficient acquisition structures.`}
            />

          </div>

          {/* Sidebar / Tools */}
          <div className="lg:col-span-4 space-y-8">
            <div className="sticky top-28 space-y-8">
              
              <div className="p-8 rounded-3xl border border-[#d4af37]/30 bg-[#d4af37]/5 space-y-6">
                <Target className="w-10 h-10 text-[#d4af37]" />
                <h4 className="text-xl font-serif text-white">Investment Readiness Score</h4>
                <p className="text-xs text-neutral-400 font-mono uppercase tracking-widest leading-relaxed">
                  Calculate your portfolio potential with our AI-powered investment modeling engine.
                </p>
                <button className="w-full py-4 bg-[#d4af37] text-black font-bold font-mono text-[10px] uppercase tracking-widest rounded-xl hover:scale-105 transition-all">
                  Launch Analyzer
                </button>
              </div>

              <div className="p-8 rounded-3xl border border-neutral-800 bg-neutral-900/30 space-y-6">
                <div className="flex items-center space-x-2 text-white">
                  <PieChart className="w-5 h-5" />
                  <h4 className="text-sm font-serif">Detailed Market Report</h4>
                 </div>
                 <p className="text-xs text-neutral-500 leading-relaxed">
                   Download our 42-page PDF analysis of Kochi's real estate trends for Q3 2024.
                 </p>
                 <button className="w-full flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-neutral-400 hover:text-[#d4af37] transition-colors border-b border-neutral-800 pb-2">
                   <span>Download PDF</span>
                   <ArrowRight className="w-4 h-4" />
                 </button>
              </div>

            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

function StatBox({ label, value, sub }: { label: string, value: string, sub: string }) {
  return (
    <div className="text-center space-y-1">
      <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block">{label}</span>
      <h3 className="text-2xl font-serif text-[#d4af37] italic">{value}</h3>
      <p className="text-[9px] text-neutral-700 font-mono uppercase tracking-wider">{sub}</p>
    </div>
  );
}

function ContentBlock({ title, content, icon }: { title: string, content: string, icon: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-neutral-900 rounded-2xl border border-neutral-800 text-[#d4af37]">
          {icon}
        </div>
        <h2 className="text-2xl md:text-3xl font-serif text-white italic">{title}</h2>
      </div>
      <p className="text-sm md:text-base leading-relaxed text-neutral-400 font-sans">
        {content}
      </p>
    </div>
  );
}

function CorridorItem({ name, potential, desc }: { name: string, potential: string, desc: string }) {
  return (
    <div className="group border-l border-neutral-800 pl-6 space-y-1 hover:border-[#d4af37] transition-all">
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-serif text-white">{name}</h4>
        <span className="text-[10px] font-mono text-[#d4af37] uppercase tracking-widest">{potential}</span>
      </div>
      <p className="text-xs text-neutral-500 leading-relaxed italic">{desc}</p>
    </div>
  );
}
