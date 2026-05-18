import React, { useState } from 'react';
import { PROPERTIES } from '../data/properties';
import PropertiesGrid from '../components/PropertiesGrid';
import PropertyModal from '../components/PropertyModal';
import PropertyComparison from '../components/PropertyComparison';
import SEO from '../components/SEO';

export default function ApartmentsPage() {
  const [selectedProperty, setSelectedProperty] = useState<any | null>(null);
  const [compareList, setCompareList] = useState<any[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  const apartmentsOnly = PROPERTIES.filter(p => 
    p.type.toLowerCase().includes('apartment') || 
    p.type.toLowerCase().includes('penthouse') || 
    p.type.toLowerCase().includes('condo')
  );

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
        title="Luxury Apartments in Kochi | Waterfront Penthouses"
        description="Discover exclusive high-rise living in Marine Drive and Kakkanad. Premium waterfront apartments and world-class penthouses in Kochi."
      />
      
      <div className="py-20 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-serif text-white mb-4 italic">
          Sky <span className="text-[#d4af37]">Holdings</span>
        </h1>
        <p className="text-neutral-500 max-w-xl mx-auto text-sm font-sans uppercase tracking-[0.2em]">
          Premium Apartments & Waterfront Penthouses
        </p>
      </div>

      <PropertiesGrid 
        properties={apartmentsOnly}
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
