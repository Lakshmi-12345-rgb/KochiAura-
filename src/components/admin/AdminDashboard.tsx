import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Home, 
  Users, 
  Settings, 
  LogOut, 
  Bell, 
  Search,
  ChevronLeft,
  Menu,
  ShieldCheck,
  Zap,
  Grid3X3,
  ExternalLink,
  Crown
} from 'lucide-react';
import DashboardOverview from './DashboardOverview';
import PropertyManager from './PropertyManager';
import LeadsManager from './LeadsManager';
import { Property, Inquiry } from '../../types';
import { PROPERTIES, MOCK_INQUIRIES } from '../../data/properties';

export default function AdminDashboard({ onExit }: { onExit: () => void }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'properties' | 'leads' | 'settings'>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Local state to simulate "Live" data persistence within the session
  const [properties, setProperties] = useState<Property[]>(PROPERTIES);
  const [inquiries, setInquiries] = useState<Inquiry[]>(MOCK_INQUIRIES);

  const handleUpdateInquiryStatus = (id: string, status: Inquiry['status']) => {
    setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, status } : inq));
  };

  const handleDeleteProperty = (id: string) => {
    if (confirm('Critical Action: Ensure you wish to purge this asset registry entry?')) {
      setProperties(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className="fixed inset-0 z-[60] bg-[#050505] text-neutral-300 font-sans flex overflow-hidden">
      
      {/* Sidebar Navigation */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="h-full bg-black border-r border-neutral-900 flex flex-col relative z-20"
      >
        {/* Sidebar Header */}
        <div className="p-6 h-20 flex items-center border-b border-neutral-900 overflow-hidden shrink-0">
          <div className="flex items-center space-x-3 min-w-[200px]">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#d4af37] to-[#8a6d1c] flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(212,175,55,0.3)]">
              <span className="text-black text-sm">⚜</span>
            </div>
            <div className={`transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 invisible'}`}>
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#d4af37] block leading-none">Aura Kochi</span>
              <span className="text-xs font-serif font-bold text-white block mt-0.5 tracking-wider">ROYAL CONSOLE</span>
            </div>
          </div>
        </div>

        {/* Sidebar Links */}
        <div className="flex-1 py-8 px-4 space-y-2 overflow-y-auto custom-scrollbar">
          <SidebarLink 
            icon={<LayoutDashboard className="w-5 h-5" />} 
            label="Overview" 
            isActive={activeTab === 'overview'} 
            onClick={() => setActiveTab('overview')} 
            isOpen={isSidebarOpen}
          />
          <SidebarLink 
            icon={<Home className="w-5 h-5" />} 
            label="Holdings" 
            isActive={activeTab === 'properties'} 
            onClick={() => setActiveTab('properties')} 
            isOpen={isSidebarOpen}
            badge={properties.length.toString()}
          />
          <SidebarLink 
            icon={<Users className="w-5 h-5" />} 
            label="Lead Registry" 
            isActive={activeTab === 'leads'} 
            onClick={() => setActiveTab('leads')} 
            isOpen={isSidebarOpen}
            badge={inquiries.filter(i => i.status === 'New').length.toString()}
          />
          <div className="pt-8 mb-2">
            <span className={`text-[9px] font-mono uppercase tracking-[0.2em] text-neutral-600 px-4 transition-opacity ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>Sytem Management</span>
          </div>
          <SidebarLink 
            icon={<Settings className="w-5 h-5" />} 
            label="Console Config" 
            isActive={activeTab === 'settings'} 
            onClick={() => setActiveTab('settings')} 
            isOpen={isSidebarOpen}
          />
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-neutral-900 mt-auto">
          <button 
            onClick={onExit}
            className="w-full flex items-center space-x-3 p-3 rounded-xl text-neutral-500 hover:text-rose-500 hover:bg-rose-500/5 transition-all group overflow-hidden"
          >
            <LogOut className="w-5 h-5 shrink-0 group-hover:scale-110 transition-transform" />
            <span className={`text-xs font-mono uppercase tracking-widest transition-opacity ${isSidebarOpen ? 'opacity-100' : 'opacity-0 invisible'}`}>Terminiate Session</span>
          </button>
        </div>

        {/* Collapse Toggle */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -right-3 top-24 w-6 h-6 bg-neutral-800 border border-neutral-700 rounded-full flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-700 transition-all shadow-xl z-30"
        >
          {isSidebarOpen ? <ChevronLeft className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
        </button>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#080808] relative">
        
        {/* Animated Background Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#d4af37]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        {/* Top Navbar */}
        <header className="h-20 border-b border-neutral-900 px-8 flex items-center justify-between shrink-0 bg-black/20 backdrop-blur-sm relative z-10">
          <div className="flex items-center space-x-4">
            <h1 className="text-sm font-mono uppercase tracking-[0.2em] text-[#d4af37] font-semibold">
              {activeTab === 'overview' && 'Executive Summary'}
              {activeTab === 'properties' && 'Portfolio Asset Manager'}
              {activeTab === 'leads' && 'Communications Registry'}
              {activeTab === 'settings' && 'System Parameters'}
            </h1>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center px-3 py-1 bg-neutral-900/50 border border-neutral-800 rounded-full text-[9px] font-mono uppercase tracking-widest text-neutral-500">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-2 shadow-[0_0_8px_rgba(16,185,129,1)]" />
              Environment Secure
            </div>
            
            <button className="relative p-2 text-neutral-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#d4af37] rounded-full border-2 border-[#050505]" />
            </button>

            <div className="flex items-center space-x-3 pl-6 border-l border-neutral-800">
              <div className="text-right hidden sm:block">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#d4af37] block leading-none">Broker Admin</span>
                <span className="text-xs font-serif text-white block mt-1 tracking-wider">Reji K. Vault</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center p-[1px] overflow-hidden group hover:border-[#d4af37]/50 transition-all cursor-pointer">
                <img 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop" 
                  alt="Admin Avatar" 
                  className="w-full h-full object-cover rounded-xl grayscale group-hover:grayscale-0 transition-all"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Section Content */}
        <div className="flex-1 overflow-y-auto p-8 relative z-10 custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="max-w-7xl mx-auto h-full"
            >
              {activeTab === 'overview' && <DashboardOverview properties={properties} inquiries={inquiries} />}
              {activeTab === 'properties' && (
                <PropertyManager 
                  properties={properties} 
                  onDelete={handleDeleteProperty}
                  onAdd={() => {}} // Integration point
                  onEdit={() => {}} // Integration point
                />
              )}
              {activeTab === 'leads' && (
                <LeadsManager 
                  inquiries={inquiries}
                  onUpdateStatus={handleUpdateInquiryStatus}
                />
              )}
              {activeTab === 'settings' && (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center space-y-6 max-w-md">
                    <div className="w-20 h-20 bg-[#d4af37]/10 rounded-3xl flex items-center justify-center border border-[#d4af37]/20 mx-auto">
                      <Zap className="w-10 h-10 text-[#d4af37]" />
                    </div>
                    <h2 className="text-3xl font-serif text-white">Console Configuration</h2>
                    <p className="text-sm text-neutral-500 leading-relaxed font-light">
                      Global system parameters, AI concierge API thresholds, and secure blockchain title registry integration toggles reside here.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <SettingsCard label="UI Scaling" value="Optimized" />
                      <SettingsCard label="Encryption" value="AES-256" />
                      <SettingsCard label="Cloud Sync" value="Verified" />
                      <SettingsCard label="Broker ID" value="K-882-99" />
                    </div>
                    <button className="w-full py-3 bg-neutral-900 border border-neutral-800 text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-500 rounded-xl hover:text-[#d4af37] hover:border-[#d4af37]/30 transition-all">
                      Authorise System Override
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function SidebarLink({ icon, label, isActive, onClick, isOpen, badge }: any) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center justify-between p-3.5 rounded-xl transition-all group relative ${
        isActive 
          ? 'bg-[#d4af37]/10 text-white shadow-[0_4px_15px_rgba(0,0,0,0.5)] border border-[#d4af37]/10' 
          : 'text-neutral-500 hover:text-neutral-300 hover:bg-white/5'
      }`}
    >
      <div className="flex items-center space-x-3">
        <span className={`${isActive ? 'text-[#d4af37]' : 'group-hover:text-neutral-300'}`}>
          {icon}
        </span>
        <span className={`text-[10px] font-mono font-bold uppercase tracking-[0.2em] transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 invisible'}`}>
          {label}
        </span>
      </div>
      {(badge && isOpen) && (
        <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded leading-none ${isActive ? 'bg-[#d4af37] text-black' : 'bg-neutral-800 text-neutral-500'}`}>
          {badge}
        </span>
      )}
      {isActive && (
        <motion.div 
          layoutId="sidebar-indicator"
          className="absolute left-0 top-1/4 bottom-1/4 w-[3px] bg-[#d4af37] rounded-r shadow-[0_0_8px_#d4af37]"
        />
      )}
    </button>
  );
}

function SettingsCard({ label, value }: { label: string, value: string }) {
  return (
    <div className="p-4 bg-black border border-neutral-900 rounded-2xl flex flex-col items-center">
      <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-600 mb-1">{label}</span>
      <span className="text-xs font-mono text-[#d4af37] font-bold">{value}</span>
    </div>
  );
}
