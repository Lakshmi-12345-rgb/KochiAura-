import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  Phone, 
  Calendar, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  Search, 
  Filter,
  MoreHorizontal,
  ChevronRight,
  User,
  ArrowRight,
  X,
  ExternalLink
} from 'lucide-react';
import { Inquiry } from '../../types';

interface LeadsManagerProps {
  inquiries: Inquiry[];
  onUpdateStatus: (id: string, status: Inquiry['status']) => void;
}

export default function LeadsManager({ inquiries, onUpdateStatus }: LeadsManagerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  const filteredInquiries = inquiries.filter(i => 
    i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.propertyName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: Inquiry['status']) => {
    switch (status) {
      case 'New': return 'text-sky-400 bg-sky-500/10 border-sky-500/20';
      case 'Contacted': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'Qualified': return 'text-[#d4af37] bg-[#d4af37]/10 border-[#d4af37]/20';
      case 'Closed': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      default: return 'text-neutral-400 bg-neutral-500/10 border-neutral-500/20';
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-180px)] overflow-hidden">
      {/* Sidebar List */}
      <div className="w-full lg:w-96 flex flex-col gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input 
            type="text" 
            placeholder="Search leads by name, email..."
            className="w-full bg-neutral-900/40 border border-neutral-800 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-[#d4af37]/30 transition-all font-mono"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* List Container */}
        <div className="flex-1 overflow-y-auto bg-neutral-900/20 border border-neutral-900 rounded-2xl flex flex-col divide-y divide-neutral-900 custom-scrollbar">
          {filteredInquiries.map((inq) => (
            <button
              key={inq.id}
              onClick={() => setSelectedInquiry(inq)}
              className={`p-4 text-left hover:bg-white/[0.02] transition-all group relative ${selectedInquiry?.id === inq.id ? 'bg-[#d4af37]/5 border-l-2 border-l-[#d4af37]' : ''}`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="text-xs font-serif text-white group-hover:text-[#d4af37] transition-colors">{inq.name}</span>
                <span className="text-[8px] font-mono text-neutral-600 uppercase tracking-tighter">
                  {new Date(inq.date).toLocaleDateString()}
                </span>
              </div>
              <div className="text-[10px] text-neutral-500 font-mono mb-2 truncate">{inq.email}</div>
              <div className="flex items-center justify-between">
                <span className={`text-[8px] px-1.5 py-0.5 rounded uppercase font-mono tracking-wider border ${getStatusColor(inq.status)}`}>
                  {inq.status}
                </span>
                {inq.propertyName && (
                  <span className="text-[8px] text-[#d4af37] flex items-center font-mono uppercase tracking-[0.1em] max-w-[120px] truncate italic">
                    <ArrowRight className="w-2.5 h-2.5 mr-1 shrink-0" />
                    {inq.propertyName}
                  </span>
                )}
              </div>
            </button>
          ))}
          {filteredInquiries.length === 0 && (
            <div className="p-8 text-center text-neutral-600 font-mono text-[10px] uppercase tracking-widest mt-10">
              No matching leads found
            </div>
          )}
        </div>
      </div>

      {/* Detail Panel */}
      <div className="flex-1 bg-neutral-900/40 backdrop-blur-xl border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        {selectedInquiry ? (
          <AnimatePresence mode="wait">
            <motion.div 
              key={selectedInquiry.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col h-full"
            >
              {/* Detail Header */}
              <div className="p-8 border-b border-neutral-800 flex items-start justify-between bg-black/40">
                <div className="flex items-center space-x-5">
                  <div className="w-16 h-16 rounded-2xl bg-[#d4af37]/10 flex items-center justify-center border border-[#d4af37]/20">
                    <User className="w-8 h-8 text-[#d4af37]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-serif text-white">{selectedInquiry.name}</h2>
                    <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest mt-1">Lead Registry • {selectedInquiry.id}</p>
                    <div className="flex items-center space-x-3 mt-3">
                      <span className={`text-[10px] px-2.5 py-1 rounded-full uppercase font-mono tracking-widest border ${getStatusColor(selectedInquiry.status)}`}>
                        {selectedInquiry.status}
                      </span>
                      <span className="text-[10px] text-neutral-600 font-mono flex items-center">
                        <Clock className="w-3.5 h-3.5 mr-1" />
                        Inquiry recieved {new Date(selectedInquiry.date).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2.5 bg-neutral-800/50 hover:bg-neutral-800 rounded-xl text-neutral-400 hover:text-white transition-all border border-neutral-700/30">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Detail Body */}
              <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
                {/* Contact Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ContactInfoCard 
                    icon={<Mail className="w-4 h-4" />} 
                    label="Email Protocol" 
                    value={selectedInquiry.email} 
                    action={() => window.location.href = `mailto:${selectedInquiry.email}`}
                  />
                  <ContactInfoCard 
                    icon={<Phone className="w-4 h-4" />} 
                    label="Telephone Line" 
                    value={selectedInquiry.phone} 
                    action={() => window.location.href = `tel:${selectedInquiry.phone}`}
                  />
                </div>

                {/* Inquiry Content */}
                <div className="space-y-4">
                  <h3 className="text-[11px] font-mono text-[#d4af37] uppercase tracking-[0.3em] font-semibold border-b border-neutral-800 pb-2">Client Briefing</h3>
                  <div className="bg-black/50 p-6 rounded-2xl border border-neutral-800 relative">
                    <MessageSquare className="absolute -top-3 -right-3 w-8 h-8 text-neutral-800/50" />
                    <p className="text-sm text-neutral-300 leading-relaxed italic">
                      "{selectedInquiry.message}"
                    </p>
                  </div>
                </div>

                {/* Property Context */}
                {selectedInquiry.propertyName && (
                  <div className="space-y-4">
                    <h3 className="text-[11px] font-mono text-neutral-500 uppercase tracking-[0.3em] font-semibold border-b border-neutral-800 pb-2">Contextual Holding</h3>
                    <div className="bg-neutral-900/50 p-4 rounded-xl border border-neutral-800 flex items-center justify-between group">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-neutral-800 rounded-lg flex items-center justify-center border border-neutral-700 italic text-[#d4af37] font-serif">
                          ⚜
                        </div>
                        <div>
                          <p className="text-xs font-mono text-[#d4af37] uppercase tracking-widest leading-none mb-1">Target Asset</p>
                          <h4 className="text-white font-serif">{selectedInquiry.propertyName}</h4>
                        </div>
                      </div>
                      <button className="flex items-center px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-[10px] text-neutral-300 rounded font-mono uppercase tracking-widest transition-all">
                        Asset Files
                        <ExternalLink className="w-3 h-3 ml-2" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Detail Footer - Actions */}
              <div className="p-8 border-t border-neutral-800 bg-neutral-950/50 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest mr-2">Transition State:</span>
                  <div className="flex bg-black/40 p-1 rounded-xl border border-neutral-800">
                    {['New', 'Contacted', 'Qualified', 'Closed'].map((s) => (
                      <button 
                        key={s}
                        onClick={() => onUpdateStatus(selectedInquiry.id, s as any)}
                        className={`px-3 py-1.5 rounded-lg text-[9px] font-mono uppercase tracking-widest transition-all ${
                          selectedInquiry.status === s 
                          ? 'bg-[#d4af37] text-black font-bold' 
                          : 'text-neutral-500 hover:text-white'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="px-6 py-2.5 bg-white text-black text-[10px] font-mono font-bold uppercase tracking-[0.2em] rounded-xl hover:brightness-90 active:scale-95 transition-all">
                    Generate Lead PDF
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
            <div className="w-20 h-20 rounded-3xl bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-6">
              <Mail className="w-10 h-10 text-neutral-800" />
            </div>
            <h3 className="text-xl font-serif text-neutral-400">Select a lead to visualize Dossier</h3>
            <p className="text-[10px] font-mono text-neutral-600 uppercase tracking-[0.3em] mt-3">Kochi Aura CRM Terminal v2.1</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ContactInfoCard({ icon, label, value, action }: any) {
  return (
    <div className="bg-neutral-900/30 p-4 rounded-2xl border border-neutral-800/50 flex flex-col">
      <div className="flex items-center text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-3">
        <span className="p-1.5 bg-neutral-950 rounded-lg text-[#d4af37] mr-2 border border-neutral-800">{icon}</span>
        {label}
      </div>
      <div className="flex items-end justify-between">
        <span className="text-sm font-mono text-white truncate max-w-[200px]">{value}</span>
        <button 
          onClick={action}
          className="p-1.5 hover:bg-white/5 rounded text-neutral-500 hover:text-[#d4af37] transition-all"
        >
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
