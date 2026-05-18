import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Sparkles, Compass, Key, User, Bot, HelpCircle, LayoutGrid, Wand2, Zap } from 'lucide-react';
import { Property } from '../types';
import { streamAuraResponse } from '../services/geminiService';
import AIPropertyMatchmaker from './AIPropertyMatchmaker';

interface AIChatConciergeProps {
  properties: Property[];
  onPropertyClick: (property: Property) => void;
}

interface Message {
  role: 'user' | 'model';
  text: string;
}

export default function AIChatConcierge({ properties, onPropertyClick }: AIChatConciergeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'matchmaker'>('chat');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: "Welcome, esteemed visitor. I am Aura, your elite real-estate concierge. Allow me to guide you through the finest boutique holdings in Kochi. Ask me about custom backwater retreats, heritage estates in Fort Kochi, or pricing trends for HNWIs. How can I serve your investment aspirations today?"
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamedResponse, setStreamedResponse] = useState('');
  
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamedResponse]);

  const presetQuestions = [
    {
      label: "🌊 View waterfront penthouses",
      query: "Which penthouses in your Kochi list have premium backwater views, and what are their exclusive features?"
    },
    {
      label: "📈 Dubai NRI investment advice",
      query: "I am an NRI business owner from Dubai looking for safe long-term property appreciation in Kochi. What locations do you highly recommend?"
    }
  ];

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isStreaming) return;

    const userMsg = textToSend.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInputVal('');
    setIsStreaming(true);
    setStreamedResponse('');

    const historyPayload = messages.map(msg => ({
      role: msg.role === 'model' ? 'model' as const : 'user' as const,
      parts: [{ text: msg.text }]
    }));

    try {
      await streamAuraResponse(
        userMsg,
        properties,
        undefined, 
        historyPayload,
        (chunk) => {
          setStreamedResponse(prev => prev + chunk);
        },
        (completedText) => {
          setMessages(prev => [...prev, { role: 'model', text: completedText }]);
          setStreamedResponse('');
          setIsStreaming(false);
        }
      );
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: "Concierge system temporarily offline. Please ensure Gemini secret key is registered." }]);
      setIsStreaming(false);
    }
  };

  return (
    <div id="ai-chat-concierge-root" className="fixed bottom-6 right-6 z-40 font-sans">
      
      {/* Floating Toggle Bubble */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        id="floating-chat-bubble"
        className="w-14 h-14 rounded-full bg-gradient-to-r from-[#b38f12] via-[#d4af37] to-[#b38f12] text-black shadow-[0_10px_30px_rgba(212,175,55,0.4)] flex items-center justify-center cursor-pointer border border-black/25 relative group"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <X className="w-6 h-6 text-black" key="close" />
          ) : (
            <MessageSquare className="w-6 h-6 text-black" key="open" />
          )}
        </AnimatePresence>
        
        {!isOpen && (
          <span className="absolute inset-0 rounded-full border-2 border-[#d4af37] animate-ping opacity-30" />
        )}

        {!isOpen && (
          <div className="absolute right-16 bg-neutral-950 text-white border border-[#d4af37]/30 text-[10px] uppercase font-mono tracking-widest px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-xl">
            👑 Ask Aura Concierge
          </div>
        )}
      </motion.button>

      {/* Main Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            id="ai-chat-panel"
            className="absolute bottom-18 right-0 w-[calc(100vw-2.5rem)] sm:w-[420px] h-[580px] bg-[#0c0c0c] border border-[#d4af37]/45 rounded-2xl shadow-[0_15px_45px_rgba(0,0,0,0.85),0_0_25px_rgba(212,175,55,0.12)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-neutral-950 border-b border-neutral-800/80 flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center">
                  <Sparkles className="w-4.5 h-4.5 text-[#d4af37] animate-pulse" />
                </div>
                <div>
                  <h3 className="text-[13px] font-semibold text-white tracking-wide uppercase font-mono flex items-center">
                    AURA • {activeTab === 'chat' ? 'EXECUTIVE' : 'MATCHMAKER'}
                  </h3>
                  <span className="text-[10px] text-[#d4af37] font-mono tracking-widest uppercase flex items-center">
                    <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 animate-ping" />
                    Luxury Interface
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-1 capitalize">
                <button 
                  onClick={() => setActiveTab(activeTab === 'chat' ? 'matchmaker' : 'chat')}
                  className="p-2 text-neutral-400 hover:text-[#d4af37] transition-all"
                  title={activeTab === 'chat' ? "Switch to Matchmaker" : "Switch to General Chat"}
                >
                  {activeTab === 'chat' ? <Wand2 className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-neutral-950 text-neutral-400 hover:text-[#d4af37] rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-hidden relative">
              <AnimatePresence mode="wait">
                {activeTab === 'matchmaker' ? (
                  <motion.div 
                    key="matchmaker"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="h-full"
                  >
                    <AIPropertyMatchmaker 
                      properties={properties} 
                      onPropertyClick={onPropertyClick} 
                      onClose={() => setActiveTab('chat')}
                    />
                  </motion.div>
                ) : (
                  <motion.div 
                    key="chat"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="h-full flex flex-col"
                  >
                    {/* Message Body Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-[#0c0c0c] to-black scrollbar-thin scrollbar-thumb-neutral-900">
                      
                      {messages.map((msg, i) => (
                        <div
                          key={i}
                          className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`flex items-start max-w-[85%] space-x-2 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}>
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border uppercase text-[10px] font-mono ${
                              msg.role === 'user'
                                ? 'bg-neutral-800 text-[#d4af37] border-neutral-700'
                                : 'bg-neutral-950 text-white border-[#d4af37]/30'
                            }`}>
                              {msg.role === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                            </div>
                            
                            <div className={`p-3 rounded-xl text-xs leading-relaxed font-sans ${
                              msg.role === 'user'
                                ? 'bg-[#d4af37]/10 border border-[#d4af37]/35 text-neutral-100 rounded-tr-none'
                                : 'bg-neutral-900/80 border border-neutral-800 text-neutral-200 rounded-tl-none whitespace-pre-wrap'
                            }`}>
                              {msg.text}
                            </div>
                          </div>
                        </div>
                      ))}

                      {isStreaming && (
                        <div className="flex justify-start">
                          <div className="flex items-start max-w-[85%] space-x-2">
                            <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 bg-neutral-950 border border-[#d4af37]/30 text-white">
                              <Bot className="w-3.5 h-3.5" />
                            </div>
                            <div className="p-3 rounded-xl text-xs leading-relaxed font-sans bg-neutral-900/80 border border-[#d4af37]/20 text-neutral-200 rounded-tl-none whitespace-pre-wrap">
                              {streamedResponse || "..."}
                              {isStreaming && <span className="inline-block w-1.5 h-3.5 bg-[#d4af37] ml-1.5 animate-pulse" />}
                            </div>
                          </div>
                        </div>
                      )}

                      <div ref={bottomRef} />
                    </div>

                    {/* Quick Presets Menu */}
                    <div className="p-3 border-t border-neutral-900/70 bg-neutral-950/70 shrink-0">
                      <div className="flex flex-wrap gap-1.5">
                        <button 
                          onClick={() => setActiveTab('matchmaker')}
                          className="text-[10px] text-black font-bold bg-[#d4af37] border border-[#d4af37] px-3 py-1.5 rounded-md transition-all hover:scale-105 active:scale-95 flex items-center shadow-lg shadow-[#d4af37]/20"
                        >
                          <Zap className="w-3 h-3 mr-1.5" /> Guided Discovery
                        </button>
                        {presetQuestions.map((q, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSend(q.query)}
                            disabled={isStreaming}
                            className="text-[10px] text-neutral-400 hover:text-[#d4af37] bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 hover:border-[#d4af37]/40 px-2.5 py-1.5 rounded-md transition-colors text-left font-sans block truncate max-w-[150px] disabled:opacity-40 cursor-pointer"
                          >
                            {q.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Chat Input Field Form */}
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSend(inputVal);
                      }}
                      className="p-3.5 bg-neutral-950 border-t border-neutral-900 flex items-center space-x-2 shrink-0"
                    >
                      <input
                        type="text"
                        value={inputVal}
                        onChange={(e) => setInputVal(e.target.value)}
                        disabled={isStreaming}
                        placeholder="Ask Aura about boutique assets..."
                        className="flex-1 bg-neutral-900 border border-neutral-800 focus:border-[#d4af37] hover:border-neutral-700 text-xs text-neutral-200 p-2.5 rounded-lg outline-none transition-colors placeholder:text-neutral-600 disabled:opacity-50"
                      />
                      <button
                        type="submit"
                        disabled={!inputVal.trim() || isStreaming}
                        className="p-2.5 bg-[#d4af37] disabled:bg-neutral-800 hover:brightness-110 active:scale-95 text-black disabled:text-neutral-600 rounded-lg transition-transform duration-200 cursor-pointer"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
