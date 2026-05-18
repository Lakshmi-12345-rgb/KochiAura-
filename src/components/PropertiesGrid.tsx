import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Property } from '../types';
import { Search, SlidersHorizontal, Bed, Bath, Maximize2, Compass, ArrowRight, Sparkles } from 'lucide-react';

interface PropertiesGridProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  compareList: Property[];
  onToggleCompare: (property: Property) => void;
  onOpenCompare: () => void;
}

export default function PropertiesGrid({ 
  properties, 
  onSelectProperty, 
  compareList, 
  onToggleCompare,
  onOpenCompare
}: PropertiesGridProps) {
  const [selectedType, setSelectedType] = useState<string>('All');
  const [maxPriceCr, setMaxPriceCr] = useState<number>(15); // Crores
  const [searchQuery, setSearchQuery] = useState<string>('');

  const propertyTypes = useMemo(() => {
    return ['All', ...Array.from(new Set(properties.map(p => p.type)))];
  }, [properties]);

  const isInCompare = (id: string) => compareList.some(p => p.id === id);

  // Filter Logic
  const filteredProperties = useMemo(() => {
    return properties.filter(p => {
      const matchesType = selectedType === 'All' || p.type === selectedType;
      
      // Convert numeric price (in Crores)
      const priceInCr = p.priceNumeric / 10000000;
      const matchesPrice = priceInCr <= maxPriceCr;

      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.type.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesType && matchesPrice && matchesSearch;
    });
  }, [properties, selectedType, maxPriceCr, searchQuery]);

  return (
    <section id="properties-section" className="py-24 px-4 md:px-8 bg-neutral-950 font-sans border-t border-neutral-900">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center md:text-left md:flex md:items-end md:justify-between border-b border-neutral-900 pb-8">
          <div className="space-y-2">
            <span className="text-xs uppercase font-mono tracking-widest text-[#d4af37] font-semibold">
              EXCLUSIVE LISTINGS • ERNAKULAM STATE
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-white font-semibold">
              Illustrious Portfolio
            </h2>
          </div>
          <p className="max-w-md text-neutral-400 text-xs sm:text-sm mt-3 md:mt-0 leading-relaxed font-light">
            Each address is carefully inspected to meet absolute safety benchmarks, structural longevity, superior materials quality, and authentic Vastu coordinates.
          </p>
        </div>

        {/* Filter Toolbar Container */}
        <div className="bg-[#0b0b0b] border border-neutral-900 p-5 rounded-xl space-y-5 shadow-2xl relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/2 to-transparent opacity-50 pointer-events-none rounded-xl" />
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Search Bar */}
            <div className="md:col-span-4 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, location or keywords..."
                className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#d4af37] text-xs text-neutral-200 pl-11 pr-4 py-2.5 rounded outline-none transition-all placeholder:text-neutral-600 focus:ring-1 focus:ring-[#d4af37]/20"
              />
            </div>

            {/* Price Slider */}
            <div className="md:col-span-4 flex items-center space-x-3 bg-neutral-950/80 px-4 py-2 rounded border border-neutral-800">
              <span className="text-[10px] uppercase font-mono text-neutral-400 whitespace-nowrap shrink-0">Budget Limit</span>
              <input
                type="range"
                min="4"
                max="15"
                step="0.5"
                value={maxPriceCr}
                onChange={(e) => setMaxPriceCr(Number(e.target.value))}
                className="w-full accent-[#d4af37] h-1 bg-neutral-800 rounded-lg cursor-pointer"
              />
              <span className="text-[#d4af37] font-serif hover:scale-105 transition-all text-xs font-semibold whitespace-nowrap">
                ₹{maxPriceCr} Cr
              </span>
            </div>

            {/* Sorting Info */}
            <div className="md:col-span-4 flex items-center justify-end space-x-1.5 text-neutral-500 text-[10px] font-mono uppercase tracking-wider">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Showing {filteredProperties.length} elite holdings in Kochi</span>
            </div>

          </div>

          {/* Tag Filter Selector */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-neutral-900/50">
            {propertyTypes.map((type, i) => (
              <button
                key={i}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-1.5 text-[11px] font-mono tracking-wider uppercase rounded-full transition-all cursor-pointer ${
                  selectedType === type
                    ? 'bg-[#d4af37] text-black font-semibold shadow-md shadow-[#d4af37]/15 scale-102'
                    : 'bg-neutral-950 border border-neutral-850 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

        </div>

        {/* Listings Project Grid */}
        {filteredProperties.length > 0 ? (
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProperties.map((property) => (
              <motion.div
                key={property.id}
                layout
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
                }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                onClick={() => onSelectProperty(property)}
                id={`property-card-${property.id}`}
                className="group bg-[#0b0b0b] border border-neutral-900 hover:border-[#d4af37]/50 rounded-xl overflow-hidden cursor-pointer transition-all duration-400 shadow-xl shadow-black/40 flex flex-col justify-between relative"
              >
                {/* Visual Image container with shimmers */}
                <div className="relative h-56 overflow-hidden bg-neutral-950">
                  <img
                    src={property.mainImage}
                    alt={property.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  
                  {/* Subtle black translucent frame gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
                  
                  {/* Absolute badges */}
                  <span className="absolute top-3 left-3 bg-black/75 backdrop-blur-sm text-[#d4af37] border border-[#d4af37]/30 text-[9px] uppercase font-mono tracking-widest px-2.5 py-1 rounded">
                    {property.type}
                  </span>

                  {/* Compare Toggle Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleCompare(property);
                    }}
                    className={`absolute top-3 right-3 p-2 rounded-lg border transition-all cursor-pointer ${
                      isInCompare(property.id)
                        ? 'bg-[#d4af37] border-[#d4af37] text-black shadow-lg shadow-[#d4af37]/20'
                        : 'bg-black/60 border-neutral-800 text-white/50 hover:text-white hover:border-neutral-600'
                    }`}
                  >
                    <Compass className="w-3.5 h-3.5" />
                    {isInCompare(property.id) && (
                      <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                      </span>
                    )}
                  </button>

                  <span className="absolute bottom-3 right-3 bg-black/80 text-[#d4af37] font-serif text-sm font-semibold px-3 py-1 rounded border border-neutral-800">
                    {property.price}
                  </span>
                </div>

                {/* Card Info Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <h3 className="text-base font-serif text-white group-hover:text-[#d4af37] transition-colors duration-300 font-semibold truncate">
                      {property.title}
                    </h3>
                    <div className="flex items-center text-neutral-400 font-sans text-xs">
                      <Compass className="w-3.5 h-3.5 mr-1 text-[#d4af37]" />
                      <span>{property.location}</span>
                    </div>
                  </div>

                  <p className="text-neutral-500 font-sans text-xs mt-3.5 line-clamp-2 leading-relaxed">
                    {property.description}
                  </p>

                  {/* Feature highlights bar */}
                  <div className="grid grid-cols-3 gap-2 mt-4 pt-3.5 border-t border-neutral-900/80 text-center text-neutral-300">
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-neutral-500 font-mono block">Beds</span>
                      <div className="flex items-center justify-center text-white text-xs">
                        <Bed className="w-3.5 h-3.5 mr-1 text-[#d4af37]" />
                        <span>{property.bedrooms}</span>
                      </div>
                    </div>
                    <div className="space-y-0.5 border-x border-neutral-900/80">
                      <span className="text-[10px] text-neutral-500 font-mono block">Baths</span>
                      <div className="flex items-center justify-center text-white text-xs">
                        <Bath className="w-3.5 h-3.5 mr-1 text-[#d4af37]" />
                        <span>{property.bathrooms}</span>
                      </div>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-neutral-500 font-mono block">Size</span>
                      <div className="flex items-center justify-center text-white text-xs">
                        <Maximize2 className="w-3.5 h-3.5 mr-1 text-[#d4af37]" />
                        <span className="truncate">{property.area.split(' ')[0]}</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Shimmer button interactive footer */}
                <div className="px-5 py-3.5 bg-neutral-950/60 border-t border-neutral-900 flex items-center justify-between group-hover:bg-[#0c0c0c] transition-colors">
                  <span className="text-[9px] uppercase font-mono tracking-widest text-neutral-500 flex items-center">
                    <Sparkles className="w-3 h-3 text-[#d4af37] mr-1" /> View Virtual Tour
                  </span>
                  <div className="flex items-center text-xs text-[#d4af37] font-semibold font-serif group-hover:translate-x-1.5 transition-transform duration-300">
                    <span className="mr-1">Configure Space</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16 bg-[#0b0b0b] border border-neutral-900 rounded-xl space-y-4">
            <SlidersHorizontal className="w-8 h-8 text-[#d4af37] mx-auto animate-bounce" />
            <div className="space-y-1">
              <h3 className="text-base text-white font-serif font-semibold">No Elite Properties Match Your Parameters</h3>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                Please reduce your filters or adjust your price limits. Or write custom staging commands inside our floating AI Advisor tool!
              </p>
            </div>
          </div>
        )}

        {/* Floating Compare Bar */}
        <motion.div
           initial={{ y: 100, opacity: 0 }}
           animate={{ 
             y: compareList.length > 0 ? 0 : 100,
             opacity: compareList.length > 0 ? 1 : 0 
           }}
           className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-2xl"
        >
          <div className="bg-black/80 backdrop-blur-xl border border-[#d4af37]/30 rounded-2xl p-4 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
             <div className="flex items-center space-x-4">
                <div className="flex -space-x-3">
                  {compareList.map((p) => (
                    <div key={p.id} className="w-10 h-10 rounded-full border-2 border-black overflow-hidden bg-neutral-900">
                      <img src={p.mainImage} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
                <div>
                   <p className="text-xs font-serif text-white">{compareList.length} Holdings Selected</p>
                   <p className="text-[9px] font-mono text-[#d4af37] uppercase tracking-widest">Awaiting Side-by-side Analysis</p>
                </div>
             </div>
             <div className="flex items-center space-x-3">
                <button 
                  onClick={onOpenCompare}
                  className="px-6 py-2.5 bg-[#d4af37] text-black font-bold font-mono text-[10px] uppercase tracking-widest rounded-xl hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                >
                  Analyze Now
                </button>
             </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
