import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, ArrowRight, Layers, CreditCard, Ruler, MapPin, Star, Sparkles } from 'lucide-react';
import { Property } from '../types';

interface PropertyComparisonProps {
  isOpen: boolean;
  onClose: () => void;
  properties: Property[];
  onRemove: (id: string) => void;
}

export default function PropertyComparison({ isOpen, onClose, properties, onRemove }: PropertyComparisonProps) {
  if (properties.length === 0) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl overflow-hidden flex flex-col pt-16 md:pt-20"
        >
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 p-4 md:p-6 flex items-center justify-between border-b border-neutral-900 bg-black/50 backdrop-blur-md z-20">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-[#d4af37]/10 rounded-lg border border-[#d4af37]/20">
                <Layers className="w-5 h-5 text-[#d4af37]" />
              </div>
              <div>
                <h2 className="text-xl font-serif text-white italic">Aesthetic Comparison</h2>
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500">Side-by-side Portfolio Analysis</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Comparison Table Container */}
          <div className="flex-1 overflow-x-auto custom-scrollbar">
            <div className="min-w-max p-6 md:p-8 flex items-start">
              
              {/* Feature Labels Column */}
              <div className="w-48 md:w-60 shrink-0 sticky left-0 z-10 bg-black/80 backdrop-blur-xl border-r border-[#d4af37]/10 pt-48 md:pt-60 pr-4">
                <ComparisonLabel label="Investment Level" icon={<CreditCard className="w-3.5 h-3.5" />} />
                <ComparisonLabel label="Structural Type" icon={<Layers className="w-3.5 h-3.5" />} />
                <ComparisonLabel label="Total Living Area" icon={<Ruler className="w-3.5 h-3.5" />} />
                <ComparisonLabel label="Strategic Location" icon={<MapPin className="w-3.5 h-3.5" />} />
                <ComparisonLabel label="Elite Bedrooms" icon={<Check className="w-3.5 h-3.5" />} />
                <ComparisonLabel label="Luxury Bathrooms" icon={<Check className="w-3.5 h-3.5" />} />
                <ComparisonLabel label="Key Prestige Features" icon={<Star className="w-3.5 h-3.5" />} className="h-48" />
                <ComparisonLabel label="Staging Motif" icon={<Sparkles className="w-3.5 h-3.5" />} />
              </div>

              {/* Property Columns */}
              <div className="flex space-x-4 md:space-x-6 pb-20">
                {properties.map((property) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="w-72 md:w-80 group"
                  >
                    {/* Property Card Header */}
                    <div className="relative mb-6 rounded-2xl overflow-hidden border border-neutral-900 bg-neutral-950 aspect-[4/3] group-hover:border-[#d4af37]/30 transition-all">
                      <img 
                        src={property.mainImage} 
                        alt={property.title} 
                        className="w-full h-full object-cover brightness-75 group-hover:scale-105 transition-transform duration-700" 
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                      
                      <button 
                         onClick={() => onRemove(property.id)}
                         className="absolute top-3 right-3 p-1.5 bg-black/60 backdrop-blur-md rounded-lg text-white/50 border border-white/10 hover:text-red-400 hover:border-red-400/50 transition-all cursor-pointer opacity-0 group-hover:opacity-100"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>

                      <div className="absolute bottom-4 left-4 right-4 space-y-1">
                        <h3 className="text-white font-serif text-lg leading-tight group-hover:text-[#d4af37] transition-colors">{property.title}</h3>
                        <span className="text-[10px] font-mono text-[#d4af37] uppercase tracking-widest bg-[#d4af37]/10 px-2 py-0.5 rounded border border-[#d4af37]/20 inline-block">
                          {property.status}
                        </span>
                      </div>
                    </div>

                    {/* Feature Data */}
                    <div className="space-y-0">
                      <ComparisonValue value={property.price} className="text-white font-serif text-lg" />
                      <ComparisonValue value={property.type} />
                      <ComparisonValue value={property.area} />
                      <ComparisonValue value={property.location.split(',')[0]} />
                      <ComparisonValue value={property.bedrooms} />
                      <ComparisonValue value={property.bathrooms} />
                      <div className="h-48 pt-3 pb-3 border-b border-neutral-900/50">
                        <ul className="space-y-2">
                          {property.features.slice(0, 4).map((f, i) => (
                            <li key={i} className="flex items-start text-[10px] leading-relaxed text-neutral-400 italic">
                               <Check className="w-3 h-3 text-[#d4af37] shrink-0 mt-0.5 mr-2" />
                               <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <ComparisonValue value={property.virtualStagingConcepts[0]?.style || 'Custom'} highlight />
                    </div>

                    {/* Action Button */}
                    <button className="w-full mt-8 py-3 bg-[#d4af37] text-black font-bold font-mono text-[10px] uppercase tracking-[0.2em] rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[#d4af37]/10 cursor-pointer">
                      Acquisition Desk
                    </button>
                  </motion.div>
                ))}

                {/* Add More Placeholder */}
                {properties.length < 4 && (
                  <div className="w-72 md:w-80 h-full border-2 border-dashed border-neutral-800 rounded-3xl flex flex-col items-center justify-center p-8 text-center space-y-4 opacity-40 hover:opacity-100 transition-all">
                     <div className="w-16 h-16 rounded-full border border-neutral-700 flex items-center justify-center">
                        <PlusIcon className="w-6 h-6 text-neutral-500" />
                     </div>
                     <div className="space-y-1">
                       <p className="text-white font-serif">Compare Another</p>
                       <p className="text-[10px] font-mono uppercase text-neutral-600 tracking-wider">Select from portfolio</p>
                     </div>
                  </div>
                )}
              </div>

            </div>
          </div>
          
          {/* Footer Warning */}
          <div className="p-4 border-t border-neutral-900 bg-black text-center">
             <p className="text-[9px] font-mono text-neutral-600 uppercase tracking-widest">
               Values accurate for the Q2 2024 Kochi Luxury Real Estate Report. Pricing subject to final portfolio desk valuation.
             </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ComparisonLabel({ label, icon, className = "" }: { label: string, icon: React.ReactNode, className?: string }) {
  return (
    <div className={`h-14 flex items-center space-x-2.5 text-neutral-500 border-b border-neutral-900/50 ${className}`}>
      <span className="p-1.5 bg-neutral-900/50 rounded-lg border border-neutral-800">{icon}</span>
      <span className="text-[10px] uppercase font-mono tracking-widest font-bold">{label}</span>
    </div>
  );
}

function ComparisonValue({ value, className = "", highlight = false }: { value: string | number, className?: string, highlight?: boolean }) {
  return (
    <div className="h-14 flex items-center border-b border-neutral-900/50">
      <span className={`text-xs font-sans ${highlight ? 'text-[#d4af37] font-semibold italic' : 'text-neutral-300'} ${className}`}>
        {value}
      </span>
    </div>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
    </svg>
  );
}
