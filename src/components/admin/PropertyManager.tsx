import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Filter, 
  ChevronRight, 
  X, 
  Image as ImageIcon,
  Check,
  MoreVertical,
  Maximize2,
  MapPin,
  Tag
} from 'lucide-react';
import { Property } from '../../types';

interface PropertyManagerProps {
  properties: Property[];
  onAdd: (property: Partial<Property>) => void;
  onEdit: (property: Property) => void;
  onDelete: (id: string) => void;
}

export default function PropertyManager({ properties, onAdd, onEdit, onDelete }: PropertyManagerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingMode, setIsAddingMode] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  const filteredProperties = properties.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-neutral-900/40 backdrop-blur-xl border border-neutral-800 p-4 rounded-2xl">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input 
            type="text" 
            placeholder="Search holdings by title or location..."
            className="w-full bg-black/50 border border-neutral-800 rounded-xl py-2 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-[#d4af37]/50 transition-colors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-xl text-xs font-mono tracking-widest uppercase transition-colors">
            <Filter className="w-3.5 h-3.5 mr-2" />
            Filters
          </button>
          <button 
            onClick={() => setIsAddingMode(true)}
            className="flex-1 sm:flex-none flex items-center justify-center px-4 py-2 bg-[#d4af37] hover:brightness-110 text-black rounded-xl text-xs font-mono font-bold tracking-widest uppercase transition-all shadow-lg shadow-[#d4af37]/10"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Entry
          </button>
        </div>
      </div>

      {/* Properties Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredProperties.map((prop) => (
            <motion.div
              key={prop.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-neutral-900/40 backdrop-blur-xl border border-neutral-800 rounded-2xl overflow-hidden group hover:border-[#d4af37]/30 transition-all flex flex-col"
            >
              {/* Card Image Cover */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={prop.mainImage} 
                  alt={prop.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-60" />
                <div className="absolute top-3 right-3 flex space-x-2">
                  <button 
                    onClick={() => setEditingProperty(prop)}
                    className="p-2 bg-black/60 backdrop-blur-md rounded-lg text-white hover:text-[#d4af37] transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => onDelete(prop.id)}
                    className="p-2 bg-black/60 backdrop-blur-md rounded-lg text-white hover:text-rose-500 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="absolute bottom-3 left-3">
                  <span className={`text-[9px] px-2 py-0.5 rounded-full uppercase font-mono tracking-wider backdrop-blur-md border border-white/10 ${
                    prop.status === 'Available' ? 'bg-emerald-500/20 text-emerald-400' :
                    prop.status === 'Sold' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-sky-500/20 text-sky-400'
                  }`}>
                    {prop.status}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2 text-[#d4af37]">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em]">{prop.type}</span>
                  <span className="text-sm font-bold font-mono">{prop.price}</span>
                </div>
                <h3 className="text-lg font-serif text-white mb-1 group-hover:text-[#d4af37] transition-colors line-clamp-1">{prop.title}</h3>
                <div className="flex items-center text-neutral-500 text-[10px] mb-4">
                  <MapPin className="w-3 h-3 mr-1" />
                  {prop.location}
                </div>
                
                <div className="grid grid-cols-3 gap-2 mt-auto pt-4 border-t border-neutral-800 text-[10px] text-neutral-400 font-mono uppercase tracking-widest">
                  <div className="flex flex-col">
                    <span className="text-neutral-600 mb-0.5">Area</span>
                    <span className="text-white">{prop.area.split(' ')[0]}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-neutral-600 mb-0.5">Beds</span>
                    <span className="text-white">{prop.bedrooms}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-neutral-600 mb-0.5">Baths</span>
                    <span className="text-white">{prop.bathrooms}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Status Legend */}
      <div className="flex items-center justify-center space-x-6 py-4 bg-black/30 rounded-xl border border-neutral-900 border-dashed">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          <span className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest">Available</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]" />
          <span className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest">Sold</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.5)]" />
          <span className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest">Rented</span>
        </div>
      </div>

      {/* Property Form Modal (Add/Edit) */}
      <AnimatePresence>
        {(isAddingMode || editingProperty) && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/90 backdrop-blur-md overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-4xl bg-[#0a0a0a] border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl"
            >
              {/* Form Header */}
              <div className="p-6 border-b border-neutral-800 bg-neutral-900/50 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-serif text-white">{editingProperty ? 'Edit Portfolio Entry' : 'Create New Portfolio Listing'}</h2>
                  <p className="text-[10px] font-mono text-[#d4af37] uppercase tracking-widest mt-1">
                    {editingProperty ? `ID: ${editingProperty.id}` : 'Drafting System Entry'}
                  </p>
                </div>
                <button 
                  onClick={() => { setIsAddingMode(false); setEditingProperty(null); }}
                  className="p-2 hover:bg-white/5 rounded-full text-neutral-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Body - Scrollable */}
              <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <form className="space-y-8">
                  {/* Basic Info Section */}
                  <div className="space-y-4">
                    <h3 className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest border-b border-neutral-900 pb-2">Core Registry Attributes</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormInput label="Title/Designation" placeholder="e.g. The Zenith Sky Penthouse" defaultValue={editingProperty?.title} />
                      <FormInput label="Location Node" placeholder="e.g. Marine Drive, Kochi" defaultValue={editingProperty?.location} />
                      <div className="grid grid-cols-2 gap-4">
                        <FormInput label="Price Designation" placeholder="₹8.5 Cr" defaultValue={editingProperty?.price} />
                        <FormSelect 
                          label="Holding Status" 
                          options={['Available', 'Sold', 'Rented']} 
                          defaultValue={editingProperty?.status}
                        />
                      </div>
                      <FormSelect 
                        label="Property Type" 
                        options={['Penthouse', 'Heritage Villa', 'Smart Mansion', 'Urban Duplex', 'Waterfront Retreat', 'Sky Villa']} 
                        defaultValue={editingProperty?.type}
                      />
                    </div>
                  </div>

                  {/* Specs Section */}
                  <div className="space-y-4">
                    <h3 className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest border-b border-neutral-900 pb-2">Spatial Configuration</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <FormInput label="Bedrooms" type="number" placeholder="5" defaultValue={editingProperty?.bedrooms} />
                      <FormInput label="Bathrooms" type="number" placeholder="6" defaultValue={editingProperty?.bathrooms} />
                      <FormInput label="Area (Sq.Ft.)" placeholder="6,200" defaultValue={editingProperty?.area.split(' ')[0]} />
                    </div>
                  </div>

                  {/* Imagery & Media */}
                  <div className="space-y-4">
                    <h3 className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest border-b border-neutral-900 pb-2">Visual Acquisition Media</h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-32 h-20 bg-neutral-900 rounded-lg flex items-center justify-center border border-neutral-800 border-dashed overflow-hidden shrink-0">
                          {editingProperty?.mainImage ? (
                            <img src={editingProperty.mainImage} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <ImageIcon className="w-6 h-6 text-neutral-700" />
                          )}
                        </div>
                        <div className="flex-1">
                          <label className="block text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-1.5">Master View URL</label>
                          <input 
                            type="text" 
                            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-2 px-4 text-xs text-white focus:outline-none focus:border-[#d4af37]/30"
                            placeholder="https://images.unsplash.com/..."
                            defaultValue={editingProperty?.mainImage}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Narratives */}
                  <div className="space-y-4">
                    <h3 className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest border-b border-neutral-900 pb-2">Portfolio Narrative</h3>
                    <textarea 
                      rows={4}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-3 px-4 text-xs text-white focus:outline-none focus:border-[#d4af37]/30 placeholder:text-neutral-700"
                      placeholder="Enter the luxury narrative for this asset..."
                      defaultValue={editingProperty?.description}
                    />
                  </div>
                </form>
              </div>

              {/* Form Footer */}
              <div className="p-6 border-t border-neutral-800 bg-neutral-900/30 flex items-center justify-end space-x-4">
                <button 
                  onClick={() => { setIsAddingMode(false); setEditingProperty(null); }}
                  className="px-6 py-2.5 text-[10px] font-mono uppercase tracking-widest text-neutral-500 hover:text-white transition-colors"
                >
                  Discard Draft
                </button>
                <button 
                  className="px-8 py-2.5 bg-[#d4af37] text-black text-[10px] font-mono font-bold uppercase tracking-[0.2em] rounded-xl hover:brightness-110 active:scale-95 transition-all flex items-center"
                  onClick={() => { setIsAddingMode(false); setEditingProperty(null); }}
                >
                  <Check className="w-4 h-4 mr-2" />
                  {editingProperty ? 'Authorize Changes' : 'Publish Asset'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FormInput({ label, type = 'text', placeholder, defaultValue }: any) {
  return (
    <div className="space-y-1.5 text-left">
      <label className="block text-[10px] font-mono text-neutral-500 uppercase tracking-widest">{label}</label>
      <input 
        type={type} 
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-2 px-4 text-xs text-white focus:outline-none focus:border-[#d4af37]/30 placeholder:text-neutral-800"
      />
    </div>
  );
}

function FormSelect({ label, options, defaultValue }: any) {
  return (
    <div className="space-y-1.5 text-left">
      <label className="block text-[10px] font-mono text-neutral-500 uppercase tracking-widest">{label}</label>
      <select 
        defaultValue={defaultValue}
        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-2 px-4 text-xs text-white focus:outline-none focus:border-[#d4af37]/30 appearance-none cursor-pointer"
      >
        {options.map((opt: string) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
