import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Bed, Bath, Maximize2, MapPin, Compass, Briefcase, Zap, FileText, ChevronRight, CheckCircle2, Copy, Sparkles, Send, Eye, Calendar, Mail } from 'lucide-react';
import { Property } from '../types';
import { getAIEstimateReport } from '../services/geminiService';
import ThreeDVirtualTour from './ThreeDVirtualTour';
import InquiryForm from './InquiryForm';
import SEO from './SEO';

interface PropertyModalProps {
  property: Property;
  onClose: () => void;
  onOpenLeadForm: (propertyName: string) => void;
}

export default function PropertyModal({ property, onClose, onOpenLeadForm }: PropertyModalProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'aiPreview' | 'virtualTour' | 'contact'>('details');
  const [contactMode, setContactMode] = useState<'inquiry' | 'visit'>('inquiry');
  const [activeImage, setActiveImage] = useState(property.mainImage);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage for before/after split
  const [stagingStyle, setStagingStyle] = useState(property.virtualStagingConcepts[0]?.style || 'Modern Imperial Gold');
  const [customAIRequirement, setCustomAIRequirement] = useState('');
  const [aiReport, setAiReport] = useState<string>('');
  const [loadingAI, setLoadingAI] = useState(false);
  const [reportState, setReportState] = useState<'idle' | 'generated' | 'copied'>('idle');

  const generateReport = async () => {
    setLoadingAI(true);
    setAiReport('');
    try {
      const report = await getAIEstimateReport(property, stagingStyle, customAIRequirement);
      setAiReport(report);
      setReportState('generated');
    } catch (e) {
      setAiReport('System temporary overload. Please activate with your GEMINI_API_KEY in secrets.');
    } finally {
      setLoadingAI(false);
    }
  };

  const copyReport = () => {
    navigator.clipboard.writeText(aiReport);
    setReportState('copied');
    setTimeout(() => setReportState('generated'), 2000);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  const beforeImage = property.virtualStagingConcepts[0]?.beforeImage || 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop';
  const afterImage = property.virtualStagingConcepts[0]?.image || property.mainImage;

  return (
    <AnimatePresence>
      <div id="property-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/95 backdrop-blur-md overflow-y-auto">
        <SEO 
          title={`${property.title} | ${property.price}`}
          description={property.description.substring(0, 160)}
          image={property.mainImage}
          url={`https://kochi-aura.com/properties/${property.id}`}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-6xl bg-[#0a0a0a] border border-[#d4af37]/40 rounded-xl shadow-[0_0_50px_rgba(212,175,55,0.15)] overflow-hidden text-neutral-200 my-auto"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800/80 bg-neutral-950/70 shrink-0">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#d4af37] bg-[#d4af37]/10 px-2.5 py-1 rounded">
                {property.type}
              </span>
              <h2 className="text-xl sm:text-2xl font-serif text-white tracking-wide mt-1.5 font-semibold text-shadow-gold">
                {property.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              id="close-modal-btn"
              className="p-1.5 text-neutral-400 hover:text-[#d4af37] bg-neutral-900 border border-neutral-800 hover:border-[#d4af37]/50 rounded-full transition-colors duration-300 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-y-auto min-h-0">
            {/* Visual Panel (Left Column) */}
            <div className="lg:col-span-6 p-6 border-r border-neutral-900/60 bg-gradient-to-b from-neutral-950 to-[#0c0c0c] overflow-y-auto custom-scrollbar lg:h-[75vh]">
              
              {activeTab === 'virtualTour' ? (
                /* Immersive in-app 3D Virtual Tour */
                <div id="property-virtual-tour-view">
                  <ThreeDVirtualTour property={property} />
                </div>
              ) : activeTab === 'aiPreview' ? (
                /* Staging Before/After Preview Mode */
                <div id="property-ai-staging-view" className="space-y-4">
                  <div className="relative h-64 sm:h-96 w-full rounded-lg overflow-hidden border border-[#d4af37]/30 select-none bg-neutral-950">
                    <img
                      src={beforeImage}
                      alt="Raw Structure Shell"
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <img
                      src={afterImage}
                      alt="Staged Interior Design Model"
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{ clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)` }}
                    />
                    <div
                      className="absolute top-0 bottom-0 w-1 bg-[#d4af37] cursor-ew-resize flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.7)]"
                      style={{ left: `${sliderPosition}%` }}
                    >
                      <div className="w-8 h-8 rounded-full bg-[#d4af37] border-2 border-black flex items-center justify-center shadow-lg -translate-x-[0.1px]">
                        <span className="text-[10px] text-black font-bold">⇌</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 bg-neutral-950/80 p-3 rounded-lg border border-neutral-800">
                    <span className="text-xs font-mono text-neutral-400">Raw</span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={sliderPosition}
                      onChange={handleSliderChange}
                      className="flex-1 accent-[#d4af37] h-1.5 bg-neutral-800 rounded-lg cursor-ew-resize"
                    />
                    <span className="text-xs font-mono text-[#d4af37] font-bold">Luxury</span>
                  </div>
                </div>
              ) : (
                /* Gallery View (default for details, specs, contact) */
                <div id="property-gallery-view" className="space-y-4">
                  <div className="relative h-64 sm:h-80 w-full rounded-lg overflow-hidden border border-neutral-800 group shadow-lg bg-neutral-950">
                    <img
                      src={activeImage}
                      alt={property.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <div className="flex items-center text-white bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full text-xs border border-[#d4af37]/30">
                        <MapPin className="w-3.5 h-3.5 text-[#d4af37] mr-1.5" />
                        {property.location}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-5 gap-2 mt-3">
                    <button
                      onClick={() => setActiveImage(property.mainImage)}
                      className={`h-14 rounded overflow-hidden border-2 transition-all cursor-pointer ${
                        activeImage === property.mainImage ? 'border-[#d4af37]' : 'border-neutral-800'
                      }`}
                    >
                      <img src={property.mainImage} alt="Main" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                    {property.galleryImages.slice(0, 4).map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImage(img)}
                        className={`h-14 rounded overflow-hidden border-2 transition-all cursor-pointer ${
                          activeImage === img ? 'border-[#d4af37]' : 'border-neutral-800'
                        }`}
                      >
                        <img src={img} alt={`Gallery ${i+1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </button>
                    ))}
                  </div>

                  {/* Summary Bar */}
                  <div className="grid grid-cols-3 gap-3 bg-neutral-950/90 py-3.5 px-4 rounded-lg border border-neutral-800 text-center">
                    <div>
                      <Bed className="w-4 h-4 mx-auto text-[#d4af37] mb-1" />
                      <span className="block font-serif text-lg font-semibold text-white">{property.bedrooms}</span>
                      <span className="text-[9px] text-neutral-500 uppercase font-mono">Beds</span>
                    </div>
                    <div className="border-x border-neutral-800">
                      <Bath className="w-4 h-4 mx-auto text-[#d4af37] mb-1" />
                      <span className="block font-serif text-lg font-semibold text-white">{property.bathrooms}</span>
                      <span className="text-[9px] text-neutral-500 uppercase font-mono">Baths</span>
                    </div>
                    <div>
                      <Maximize2 className="w-4 h-4 mx-auto text-[#d4af37] mb-1" />
                      <span className="block font-serif text-lg font-semibold text-white">{property.area.split(' ')[0]}</span>
                      <span className="text-[9px] text-neutral-500 uppercase font-mono">Sq.Ft</span>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-neutral-900">
                     <h4 className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#d4af37]">Portfolio Details</h4>
                     <p className="text-xs leading-relaxed text-neutral-400 font-sans italic">
                        The {property.title} represents a pinnacle of {property.type} architecture in the {property.location.split(',')[0]} district.
                     </p>
                  </div>
                </div>
              )}
            </div>

            {/* Information Column (Right Column) */}
            <div className="lg:col-span-6 p-6 flex flex-col bg-gradient-to-b from-[#090909] to-neutral-950 lg:h-[75vh] overflow-y-auto custom-scrollbar">
              
              {/* Tab Navigation */}
              <div className="flex border-b border-neutral-800 mb-6 shrink-0 gap-1 overflow-x-auto no-scrollbar">
                {[
                  { id: 'details', label: 'Briefing', icon: <FileText className="w-3.5 h-3.5 mr-1.5" /> },
                  { id: 'specs', label: 'Specs', icon: <Briefcase className="w-3.5 h-3.5 mr-1.5" /> },
                  { id: 'aiPreview', label: 'Staging', icon: <Sparkles className="w-3.5 h-3.5 mr-1.5" /> },
                  { id: 'virtualTour', label: '3D VR', icon: <Compass className="w-3.5 h-3.5 mr-1.5" /> },
                  { id: 'contact', label: 'Acquisition', icon: <Zap className="w-3.5 h-3.5 mr-1.5" /> }
                ].map((tab) => (
                  <motion.button
                    key={tab.id}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`pb-3 px-4 text-[10px] uppercase tracking-widest font-mono font-bold transition-all border-b-2 whitespace-nowrap flex items-center cursor-pointer ${
                      activeTab === tab.id ? 'text-[#d4af37] border-[#d4af37]' : 'text-neutral-500 border-transparent hover:text-neutral-300'
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </motion.button>
                ))}
              </div>

              {/* Tab Content Display */}
              <div className="flex-1 min-h-0">
                <AnimatePresence mode="wait">
                  {activeTab === 'details' && (
                    <motion.div 
                      key="details" 
                      initial="hidden"
                      animate="show"
                      variants={{
                        hidden: { opacity: 0 },
                        show: {
                          opacity: 1,
                          transition: { staggerChildren: 0.07 }
                        }
                      }}
                      className="space-y-6"
                    >
                      <motion.div variants={{ hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0 } }} className="space-y-4">
                        <h3 className="text-2xl font-serif text-white tracking-tight">{property.price}</h3>
                        <p className="text-sm leading-relaxed text-neutral-300 font-sans">{property.description}</p>
                      </motion.div>
                      <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }} className="grid grid-cols-1 gap-2.5">
                        {property.features.map((feature, idx) => (
                          <motion.div 
                            key={idx} 
                            variants={{ hidden: { opacity: 0, x: -5 }, show: { opacity: 1, x: 0 } }}
                            className="flex items-center text-[11px] text-neutral-400 bg-neutral-900/30 p-3 rounded-lg border border-neutral-800/40"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37] mr-3 shrink-0" />
                            {feature}
                          </motion.div>
                        ))}
                      </motion.div>
                    </motion.div>
                  )}

                  {activeTab === 'specs' && (
                    <motion.div key="specs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1">
                      {Object.entries(property.specs).map(([key, val], idx) => (
                        <div key={idx} className="flex justify-between items-center p-4 border-b border-neutral-900 bg-neutral-950/20">
                          <span className="text-neutral-500 font-mono text-[10px] uppercase tracking-widest">{key}</span>
                          <span className="text-white text-xs font-medium">{val}</span>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {activeTab === 'aiPreview' && (
                    <motion.div key="ai" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                       <div className="bg-[#d4af37]/5 p-4 rounded-xl border border-[#d4af37]/20">
                         <h4 className="text-[10px] font-mono text-[#d4af37] uppercase tracking-widest mb-2">Design Intelligence</h4>
                         <p className="text-xs text-neutral-400 leading-relaxed italic">
                           Choose a pre-defined aesthetic concept or provide custom prompts to generate a luxury staging report.
                         </p>
                       </div>
                       
                       <div className="grid grid-cols-2 gap-2">
                         {property.virtualStagingConcepts.concat([{style: 'Royal Maharaja', image: '', beforeImage: '', description: ''}]).map((concept, i) => (
                           <button
                             key={i}
                             onClick={() => setStagingStyle(concept.style)}
                             className={`px-4 py-3 text-left rounded-xl border transition-all text-[10px] uppercase font-mono tracking-widest ${
                               stagingStyle === concept.style ? 'bg-[#d4af37] text-black border-[#d4af37]' : 'bg-neutral-900/40 border-neutral-800 text-neutral-500 hover:border-neutral-700'
                             }`}
                           >
                             {concept.style}
                           </button>
                         ))}
                       </div>

                       <div className="space-y-4">
                         <textarea
                           value={customAIRequirement}
                           onChange={(e) => setCustomAIRequirement(e.target.value)}
                           placeholder="Describe your design ethos..."
                           className="w-full bg-black border border-neutral-800 rounded-xl p-4 text-xs text-white outline-none focus:border-[#d4af37] transition-all min-h-[80px]"
                         />
                         <button
                           onClick={generateReport}
                           disabled={loadingAI}
                           className="w-full py-4 bg-[#d4af37] text-black font-bold font-mono text-[10px] uppercase tracking-[0.2em] rounded-xl flex items-center justify-center space-x-2"
                         >
                           {loadingAI ? <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" /> : <Sparkles className="w-4 h-4" />}
                           <span>{loadingAI ? 'Generating Concept...' : 'Generate AI Staging Report'}</span>
                         </button>
                       </div>

                       {aiReport && (
                         <div className="p-5 bg-neutral-950 border border-neutral-800 rounded-xl space-y-3">
                           <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-neutral-500">
                             <span>Concept Brief</span>
                             <button onClick={copyReport} className="text-[#d4af37]">{reportState === 'copied' ? 'Copied' : 'Copy'}</button>
                           </div>
                           <p className="text-xs text-neutral-300 leading-relaxed whitespace-pre-wrap">{aiReport}</p>
                         </div>
                       )}
                    </motion.div>
                  )}

                  {activeTab === 'contact' && (
                    <motion.div key="contact" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                      <div className="flex items-center space-x-1 bg-neutral-900/50 p-1 rounded-xl border border-neutral-800 sticky top-0 z-10 bg-neutral-950">
                        <button
                          onClick={() => setContactMode('inquiry')}
                          className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-lg text-[10px] font-mono uppercase tracking-widest transition-all ${
                            contactMode === 'inquiry' ? 'bg-[#d4af37] text-black shadow-lg' : 'text-neutral-500 hover:text-white'
                          }`}
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Direct Inquiry</span>
                        </button>
                        <button
                          onClick={() => setContactMode('visit')}
                          className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-lg text-[10px] font-mono uppercase tracking-widest transition-all ${
                            contactMode === 'visit' ? 'bg-[#d4af37] text-black shadow-lg' : 'text-neutral-500 hover:text-white'
                          }`}
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Schedule Visit</span>
                        </button>
                      </div>

                      <div className="p-1 px-2">
                        <InquiryForm 
                          property={property} 
                          type={contactMode} 
                          onSuccess={() => {
                            // Optional: Close modal after some time or just stay on success screen
                          }}
                        />
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'virtualTour' && (
                    <motion.div key="vr" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 flex flex-col items-center justify-center h-full text-center">
                       <div className="w-20 h-20 bg-[#d4af37]/10 rounded-full flex items-center justify-center border border-[#d4af37]/20">
                         <Compass className="w-10 h-10 text-[#d4af37] animate-spin-slow" />
                       </div>
                       <div className="space-y-3">
                         <h4 className="text-xl font-serif text-white">Full-Scale VR Immersion</h4>
                         <p className="text-sm text-neutral-500 max-w-xs mx-auto font-sans">
                           The interactive blueprint on the left allows for spatial navigation. For UHD Matterport panoramas, request access below.
                         </p>
                       </div>
                       <button className="px-8 py-4 bg-neutral-900 border border-neutral-800 text-[#d4af37] rounded-xl text-[10px] font-mono uppercase tracking-widest flex items-center space-x-2 hover:bg-neutral-800 transition-all">
                         <Eye className="w-4 h-4" />
                         <span>Load Executive Viewport</span>
                       </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

