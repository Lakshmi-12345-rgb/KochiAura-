import React, { useState } from 'react';
import { PROPERTIES } from '../data/properties';
import PropertiesGrid from '../components/PropertiesGrid';
import PropertyModal from '../components/PropertyModal';
import PropertyComparison from '../components/PropertyComparison';
import SEO from '../components/SEO';

export default function VillasPage() {
  const [selectedProperty, setSelectedProperty] = useState<any | null>(null);
  const [compareList, setCompareList] = useState<any[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  const villasOnly = PROPERTIES.filter(p => p.type.toLowerCase().includes('villa') || p.type.toLowerCase().includes('mansion'));

  const toggleCompare = (property: any) => {
    setCompareList(prev => {
      const exists = prev.find(p => p.id === property.id);
      if (exists) return prev.filter(p => p.id !== property.id);
      if (prev.length >= 4) return prev;
      return [...prev, property];
    });
  };

  return (
    <div className="pt-24 min-h-screen bg-[#070707]">
      <SEO 
        title="Luxury Villas in Kochi | Royal Estates Collection"
        description="Explore the finest selection of heritage and contemporary luxury villas in Kochi. Private mansions in Fort Kochi and expansive waterfront estates."
      />
      
      <div className="py-20 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-serif text-white mb-4 italic">
          Bespoke <span className="text-[#d4af37]">Villas</span>
        </h1>
        <p className="text-neutral-500 max-w-xl mx-auto text-sm font-sans uppercase tracking-[0.2em]">
          The Definitive Portfolio of Kochi's Private Estates
        </p>
      </div>

      <PropertiesGrid 
        properties={villasOnly}
        onSelectProperty={(property) => setSelectedProperty(property)}
        compareList={compareList}
        onToggleCompare={toggleCompare}
        onOpenCompare={() => setIsCompareOpen(true)}
      />

      {selectedProperty && (
        <PropertyModal 
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          onOpenLeadForm={() => {}}
        />
      )}

      <PropertyComparison 
        isOpen={isCompareOpen}
        properties={compareList}
        onClose={() => setIsCompareOpen(false)}
        onRemove={(id) => setCompareList(prev => prev.filter(p => p.id !== id))}
      />
    </div>
  );
}
