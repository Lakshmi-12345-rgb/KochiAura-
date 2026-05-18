import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Coins, 
  MapPin, 
  Bed, 
  Star, 
  TrendingUp, 
  Coffee,
  Heart,
  ArrowRight,
  RefreshCcw,
  Zap
} from 'lucide-react';
import { Property } from '../types';
import { UserPreferences, recommendProperties } from '../services/recommendationService';

interface AIPropertyMatchmakerProps {
  properties: Property[];
  onPropertyClick: (property: Property) => void;
  onClose?: () => void;
}

const STEPS = [
  'BUDGET',
  'LOCATION',
  'BEDROOMS',
  'AMENITIES',
  'LIFESTYLE',
  'GOALS',
  'RESULTS'
] as const;

type Step = typeof STEPS[number];

export default function AIPropertyMatchmaker({ properties, onPropertyClick, onClose }: AIPropertyMatchmakerProps) {
  const [currentStep, setCurrentStep] = useState<Step>('BUDGET');
  const [preferences, setPreferences] = useState<UserPreferences>({
    budget: 100000000, // Default 10Cr
    amenities: [],
    lifestyle: [],
    investmentGoals: 'Lifestyle'
  });
  const [recommendations, setRecommendations] = useState<Property[]>([]);

  const handleNext = () => {
    const currentIndex = STEPS.indexOf(currentStep);
    if (currentIndex < STEPS.length - 1) {
      setCurrentStep(STEPS[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const currentIndex = STEPS.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(STEPS[currentIndex - 1]);
    }
  };

  useEffect(() => {
    if (currentStep === 'RESULTS') {
      const results = recommendProperties(properties, preferences);
      setRecommendations(results);
    }
  }, [currentStep, preferences, properties]);

  const toggleSelection = (list: string[], item: string, key: keyof UserPreferences) => {
    const newList = list.includes(item) 
      ? list.filter(i => i !== item) 
      : [...list, item];
    setPreferences(prev => ({ ...prev, [key]: newList }));
  };

  return (
    <div className="flex flex-col h-full bg-black/95 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#d4af37]/20 blur-[80px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-amber-600/10 blur-[60px]" />
      </div>

      {/* Progress Header */}
      <div className="px-6 pt-5 pb-4 border-b border-[#d4af37]/20 relative z-10 flex flex-col space-y-3">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-[#d4af37]" />
          <h2 className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#d4af37]">Matchmaker Discovery</h2>
        </div>
        <div className="flex space-x-1 h-0.5 w-full bg-neutral-900 overflow-hidden">
          {STEPS.map((step, idx) => (
            <div 
              key={step}
              className={`h-full transition-all duration-500 ${
                STEPS.indexOf(currentStep) >= idx ? 'bg-[#d4af37] flex-1' : 'w-0'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="flex-1 overflow-y-auto p-6 relative z-10 custom-scrollbar">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {currentStep === 'BUDGET' && (
              <div className="space-y-8 py-4">
                <StepHeader icon={<Coins />} title="Investment Threshold" subtitle="Define the ceiling for your upcoming portfolio asset." />
                <div className="space-y-6">
                  <div className="text-center">
                    <span className="text-4xl font-serif text-[#d4af37] tracking-tight">₹{(preferences.budget / 10000000).toFixed(1)} <span className="text-xl">Cr</span></span>
                  </div>
                  <input 
                    type="range" 
                    min="20000000" 
                    max="200000000" 
                    step="5000000"
                    value={preferences.budget}
                    onChange={(e) => setPreferences(prev => ({ ...prev, budget: parseInt(e.target.value) }))}
                    className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#d4af37]"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-neutral-600 uppercase tracking-widest">
                    <span>Low Entry (2 Cr)</span>
                    <span>High Prime (20 Cr+)</span>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 'LOCATION' && (
              <div className="space-y-6">
                <StepHeader icon={<MapPin />} title="Geographic Anchor" subtitle="Where should your legacy be rooted?" />
                <div className="grid grid-cols-1 gap-3">
                  {['Marine Drive', 'Fort Kochi', 'Kakkanad', 'Panampilly Nagar', 'Kumbalangi'].map(loc => (
                    <button
                      key={loc}
                      onClick={() => {
                        setPreferences(prev => ({ ...prev, location: loc }));
                        handleNext();
                      }}
                      className={`p-4 text-left rounded-xl border transition-all ${
                        preferences.location === loc 
                          ? 'bg-[#d4af37]/10 border-[#d4af37] text-white shadow-[0_0_15px_rgba(212,175,55,0.1)]' 
                          : 'bg-neutral-900/50 border-neutral-800 text-neutral-400 hover:border-[#d4af37]/30'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{loc}</span>
                        {preferences.location === loc && <Check className="w-4 h-4 text-[#d4af37]" />}
                      </div>
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      setPreferences(prev => ({ ...prev, location: undefined }));
                      handleNext();
                    }}
                    className="p-4 text-center rounded-xl border border-dashed border-neutral-800 text-[10px] font-mono uppercase tracking-widest text-neutral-600 hover:text-white transition-colors"
                  >
                    Skip Preference
                  </button>
                </div>
              </div>
            )}

            {currentStep === 'BEDROOMS' && (
              <div className="space-y-8 py-4 text-center">
                <StepHeader icon={<Bed />} title="Spatial Provisioning" subtitle="Determining the required volume for your private sanctuary." />
                <div className="flex justify-center items-center space-x-6">
                  {[3, 4, 5, 6].map(num => (
                    <button
                      key={num}
                      onClick={() => setPreferences(prev => ({ ...prev, bedrooms: num }))}
                      className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all ${
                        preferences.bedrooms === num 
                          ? 'bg-[#d4af37] border-[#d4af37] text-black scale-110 shadow-lg shadow-[#d4af37]/20'
                          : 'bg-neutral-900 border-neutral-800 text-neutral-500 hover:border-neutral-600'
                      }`}
                    >
                      <span className="text-lg font-bold">{num}</span>
                    </button>
                  ))}
                </div>
                <p className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest pt-4">Minimum bedrooms required</p>
              </div>
            )}

            {currentStep === 'AMENITIES' && (
              <div className="space-y-6">
                <StepHeader icon={<Star />} title="Luxury Credentials" subtitle="Select the essential comforts for your lifestyle." />
                <div className="grid grid-cols-2 gap-3">
                  {[
                    'Private Pool', 'Boat Pier', 'Roof Garden', 
                    'Home Cinema', 'Elevator', 'Smart Security',
                    'Gymnasium', 'Staff Quarters'
                  ].map(item => (
                    <button
                      key={item}
                      onClick={() => toggleSelection(preferences.amenities, item, 'amenities')}
                      className={`p-3 text-xs text-left rounded-lg border transition-all ${
                        preferences.amenities.includes(item)
                          ? 'bg-[#d4af37]/10 border-[#d4af37] text-white'
                          : 'bg-neutral-900/40 border-neutral-800 text-neutral-500 hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <div className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center ${
                           preferences.amenities.includes(item) ? 'bg-[#d4af37] border-[#d4af37]' : 'border-neutral-700'
                        }`}>
                          {preferences.amenities.includes(item) && <Check className="w-2.5 h-2.5 text-black" />}
                        </div>
                        <span>{item}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 'LIFESTYLE' && (
              <div className="space-y-6">
                <StepHeader icon={<Heart />} title="Lifestyle Vibe" subtitle="Which atmosphere aligns with your daily rhythm?" />
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { label: '🏙️ Metropolitan High-Life', id: 'metro' },
                    { label: '🌊 Serene Waterfront', id: 'waterfront' },
                    { label: '🏛️ Colonial Heritage', id: 'heritage' },
                    { label: '🌴 Tropical Sanctuary', id: 'tropical' }
                  ].map(vibe => (
                    <button
                      key={vibe.id}
                      onClick={() => toggleSelection(preferences.lifestyle, vibe.id, 'lifestyle')}
                      className={`p-4 text-left rounded-xl border transition-all ${
                        preferences.lifestyle.includes(vibe.id)
                          ? 'bg-[#d4af37]/10 border-[#d4af37] text-white shadow-[0_0_15px_rgba(212,175,55,0.1)]'
                          : 'bg-neutral-900/50 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{vibe.label}</span>
                        {preferences.lifestyle.includes(vibe.id) && <Check className="w-4 h-4 text-[#d4af37]" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 'GOALS' && (
              <div className="space-y-6">
                <StepHeader icon={<TrendingUp />} title="Strategic Intent" subtitle="What defines the ultimate success of this acquisition?" />
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { label: 'Asset Appreciation', id: 'Appreciation', desc: 'Focus on maximum capital growth in prime areas' },
                    { label: 'Yield Generation', id: 'Rental', desc: 'Optimized for high-end boutique rentals' },
                    { label: 'Primary Residence', id: 'Lifestyle', desc: 'Prioritizing immediate comfort and family luxury' },
                    { label: 'Inter-generational Legacy', id: 'Legacy', desc: 'Heritage and trophy assets for future lines' }
                  ].map(goal => (
                    <button
                      key={goal.id}
                      onClick={() => setPreferences(prev => ({ ...prev, investmentGoals: goal.id as any }))}
                      className={`p-4 text-left rounded-xl border transition-all ${
                        preferences.investmentGoals === goal.id
                          ? 'bg-[#d4af37]/10 border-[#d4af37] text-white shadow-[0_0_15px_rgba(212,175,55,0.1)]'
                          : 'bg-neutral-900/50 border-neutral-800 text-neutral-400 hover:border-neutral-800'
                      }`}
                    >
                      <h4 className="text-sm font-bold mb-1">{goal.label}</h4>
                      <p className="text-[10px] text-neutral-500 font-sans leading-relaxed">{goal.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 'RESULTS' && (
              <div className="space-y-6">
                <StepHeader icon={<Zap />} title="Bespoke Curation" subtitle="The system has identified these top-tier holdings for you." />
                <div className="space-y-4">
                  {recommendations.length > 0 ? (
                    recommendations.slice(0, 3).map((prop, idx) => (
                      <motion.div
                        key={prop.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.15 }}
                        onClick={() => onPropertyClick(prop)}
                        className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-4 flex items-center space-x-4 cursor-pointer group hover:border-[#d4af37]/40 transition-all active:scale-98"
                      >
                        <div className="w-16 h-16 rounded-xl overflow-hidden border border-neutral-800">
                          <img src={prop.mainImage} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <h4 className="text-white text-sm font-serif truncate group-hover:text-[#d4af37] transition-colors">{prop.title}</h4>
                            <span className="text-[10px] font-mono text-[#d4af37] font-bold shrink-0">{prop.price}</span>
                          </div>
                          <div className="flex items-center text-[9px] text-neutral-500 font-mono uppercase tracking-widest mt-1">
                            <MapPin className="w-2.5 h-2.5 mr-1" />
                            {prop.location.split(',')[0]}
                          </div>
                          <div className="flex items-center space-x-3 mt-2">
                             <div className="flex items-center text-[9px] text-neutral-400">
                               <Sparkles className="w-2.5 h-2.5 mr-1 text-emerald-400" />
                               <span>98% Match</span>
                             </div>
                             <div className="h-1 flex-1 bg-neutral-800 rounded-full overflow-hidden">
                               <div className="h-full bg-emerald-500 w-[98%]" />
                             </div>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="p-12 text-center border border-dashed border-neutral-800 rounded-3xl">
                      <p className="text-neutral-500 text-xs font-mono uppercase tracking-widest">No matching holdings found</p>
                      <button 
                        onClick={() => setCurrentStep('BUDGET')}
                        className="mt-4 text-[#d4af37] text-[10px] font-mono uppercase underline flex items-center justify-center mx-auto"
                      >
                        <RefreshCcw className="w-3 h-3 mr-2" /> Reset Search
                      </button>
                    </div>
                  )}

                  <div className="pt-6 border-t border-neutral-900 flex justify-center">
                    <button 
                      onClick={() => setCurrentStep('BUDGET')}
                      className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500 hover:text-white transition-colors"
                    >
                      Refind Search Parameters
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Footer */}
      {currentStep !== 'RESULTS' && (
        <div className="p-6 border-t border-neutral-900 bg-neutral-950/80 backdrop-blur-md flex items-center justify-between relative z-20">
          <button
            onClick={handleBack}
            className={`flex items-center text-[10px] font-mono uppercase tracking-widest transition-all ${
              currentStep === 'BUDGET' ? 'opacity-0 pointer-events-none' : 'text-neutral-500 hover:text-white'
            }`}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </button>

          <button
            onClick={handleNext}
            className="group flex items-center space-x-2 px-6 py-2.5 bg-[#d4af37] text-black rounded-full text-[10px] font-mono font-bold uppercase tracking-[0.2em] hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-[#d4af37]/20"
          >
            <span>Proceed</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}

      {currentStep === 'RESULTS' && (
        <div className="p-6 border-t border-neutral-900 bg-black flex flex-col space-y-4 relative z-20">
          <button
            onClick={onClose}
            className="w-full py-3 border border-neutral-800 text-white rounded-xl text-[10px] font-mono uppercase tracking-widest hover:bg-white/5 transition-all"
          >
            Close Discovery
          </button>
          <div className="flex items-center justify-center text-[9px] text-neutral-600 font-mono uppercase tracking-[0.3em]">
             Provided by Aura AI Engine v4.0
          </div>
        </div>
      )}
    </div>
  );
}

function StepHeader({ icon, title, subtitle }: { icon: React.ReactNode, title: string, subtitle: string }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-3 text-[#d4af37]">
        <div className="p-2 bg-[#d4af37]/10 rounded-lg border border-[#d4af37]/20">
          {React.cloneElement(icon as React.ReactElement, { className: 'w-5 h-5' })}
        </div>
        <h3 className="text-xl font-serif text-white">{title}</h3>
      </div>
      <p className="text-xs text-neutral-500 leading-relaxed font-light">{subtitle}</p>
    </div>
  );
}
