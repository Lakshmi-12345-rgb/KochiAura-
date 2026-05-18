/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, ReactNode, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import InvestmentGuidePage from './pages/InvestmentGuidePage';
import VillasPage from './pages/VillasPage';
import ApartmentsPage from './pages/ApartmentsPage';
import BlogPage from './pages/BlogPage';
import ThreeDBackground from './components/ThreeDBackground';
import AdminDashboard from './components/admin/AdminDashboard';
import SEO from './components/SEO';
import ScrollToTop from './components/ScrollToTop';
import { ShieldCheck, Lock, ChevronDown } from 'lucide-react';

function AppContent() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [isStarting, setIsStarting] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsStarting(false);
    }, 3500); 
    return () => clearTimeout(timer);
  }, []);

  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen bg-[#070707] text-neutral-300 font-sans selection:bg-[#d4af37]/30 selection:text-white relative z-10">
      <AnimatePresence>
        {isStarting && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-[#070707] flex items-center justify-center p-4"
          >
            <div className="relative flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-neutral-900 border border-[#d4af37]/20 flex items-center justify-center relative overflow-hidden"
              >
                 {/* Internal gold glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#d4af3715,transparent_70%)] animate-pulse" />
                <span className="text-4xl md:text-6xl font-serif text-[#d4af37] relative z-10">⚜</span>
              </motion.div>
              
              <div className="mt-8 overflow-hidden h-6">
                <motion.div
                  initial={{ y: 30 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="flex flex-col items-center"
                >
                  <span className="text-sm font-serif font-semibold tracking-[0.3em] text-white">AURA KOCHI</span>
                  <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#d4af37] mt-1 opacity-50">Private Brief</span>
                </motion.div>
              </div>

              {/* Progress bar line */}
              <div className="w-48 h-[1px] bg-neutral-900 mt-12 relative overflow-hidden">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{ duration: 2, ease: "linear" }}
                  className="absolute inset-0 bg-[#d4af37]/50"
                 />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SEO />
      <ScrollToTop />
      
      <ThreeDBackground />
      
      {/* Deluxe Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-30 bg-black/85 backdrop-blur-md border-b border-[#d4af37]/20 p-4 md:px-8 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          <Link to="/" className="flex items-center space-x-2 cursor-pointer group">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-[#b38f12] via-[#d4af37] to-[#b38f12] p-[1px] flex items-center justify-center">
              <div className="w-full h-full bg-black rounded flex items-center justify-center">
                <span className="text-sm font-serif font-bold text-[#d4af37] group-hover:scale-110 transition-transform">⚜</span>
              </div>
            </div>
            <div>
              <span className="text-xs sm:text-sm font-serif font-semibold tracking-[0.2em] text-white block">AURA KOCHI</span>
              <span className="text-[8px] font-mono uppercase tracking-[0.3em] text-[#d4af37] block">Royal Holdings</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center space-x-7 text-xs font-mono tracking-widest uppercase text-neutral-400">
            <div className="relative group/menu">
              <button className="hover:text-[#d4af37] transition-colors flex items-center space-x-1 py-4">
                <span>Collections</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              <div className="absolute top-full -left-4 w-48 bg-black/95 backdrop-blur-xl border border-neutral-800 rounded-xl p-2 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all">
                <Link to="/villas" className="block px-4 py-2 hover:bg-[#d4af37]/10 hover:text-[#d4af37] rounded-lg">Villas</Link>
                <Link to="/apartments" className="block px-4 py-2 hover:bg-[#d4af37]/10 hover:text-[#d4af37] rounded-lg">Apartments</Link>
              </div>
            </div>
            <Link to="/investment-guide" className="hover:text-[#d4af37] transition-colors">Guide</Link>
            <Link to="/about" className="hover:text-[#d4af37] transition-colors">About</Link>
            <Link to="/blog" className="hover:text-[#d4af37] transition-colors">Chronicles</Link>
            <Link to="/faq" className="hover:text-[#d4af37] transition-colors">FAQ</Link>
          </nav>

          <div className="flex items-center space-x-3">
            <Link
              to="/contact"
              className="px-4 py-2 bg-[#d4af37] hover:brightness-110 active:scale-95 text-black font-semibold text-[10px] tracking-widest uppercase font-mono rounded transition-all"
            >
              Consult Desk
            </Link>
          </div>
        </div>
      </header>

      <main>
        <AnimatePresence mode="wait">
          <Routes location={location}>
            <Route path="/" element={<PageWrapper key="home"><HomePage /></PageWrapper>} />
            <Route path="/about" element={<PageWrapper key="about"><AboutPage /></PageWrapper>} />
            <Route path="/contact" element={<PageWrapper key="contact"><ContactPage /></PageWrapper>} />
            <Route path="/faq" element={<PageWrapper key="faq"><FAQPage /></PageWrapper>} />
            <Route path="/investment-guide" element={<PageWrapper key="guide"><InvestmentGuidePage /></PageWrapper>} />
            <Route path="/villas" element={<PageWrapper key="villas"><VillasPage /></PageWrapper>} />
            <Route path="/apartments" element={<PageWrapper key="apartments"><ApartmentsPage /></PageWrapper>} />
            <Route path="/blog" element={<PageWrapper key="blog"><BlogPage /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Footer Elevation */}
      <footer className="bg-black border-t border-neutral-900 py-16 px-4 md:px-8 text-center sm:text-left relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-neutral-900 pb-12">
          
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center justify-center sm:justify-start space-x-2">
              <span className="text-xl font-serif text-[#d4af37]">⚜</span>
              <span className="text-sm font-serif font-semibold tracking-widest text-white uppercase text-shadow-gold text-left">
                AURA KOCHI ROYAL PORTFOLIO
              </span>
            </div>
            <p className="text-neutral-500 text-xs leading-relaxed font-light font-sans text-left">
              An elite real-estate collective crafting unrivaled boutique acquisitions. Meticulously restorability audited historical archives. Complete thermal, safety, and smart grid automation certificates complied.
            </p>
          </div>

          <div className="md:col-span-2 space-y-3.5">
            <h4 className="text-[11px] font-semibold text-white uppercase tracking-widest font-mono">Company</h4>
            <ul className="text-xs text-neutral-500 space-y-2 font-mono uppercase tracking-wider">
              <li><Link to="/about" className="hover:text-[#d4af37]">Legacy</Link></li>
              <li><Link to="/blog" className="hover:text-[#d4af37]">Chronicles</Link></li>
              <li><Link to="/faq" className="hover:text-[#d4af37]">Inquiries</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3.5">
            <h4 className="text-[11px] font-semibold text-white uppercase tracking-widest font-mono">Curation</h4>
            <ul className="text-xs text-neutral-500 space-y-2 font-mono uppercase tracking-wider">
              <li><Link to="/villas" className="hover:text-[#d4af37]">Villas</Link></li>
              <li><Link to="/apartments" className="hover:text-[#d4af37]">Sky Assets</Link></li>
              <li><Link to="/investment-guide" className="hover:text-[#d4af37]">Blueprints</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3.5">
            <h4 className="text-[11px] font-semibold text-white uppercase tracking-widest font-mono">Contact</h4>
            <ul className="text-xs text-neutral-500 space-y-2 font-mono uppercase tracking-wider">
              <li><Link to="/contact" className="hover:text-[#d4af37]">Global Desk</Link></li>
              <li><span className="text-[#d4af37]">reji K.</span></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3 flex flex-col items-center sm:items-start justify-center">
            <div className="inline-flex items-center space-x-1.5 bg-neutral-900 px-3 py-1.5 rounded border border-neutral-800">
              <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="text-[9px] uppercase font-mono tracking-widest text-neutral-400">Vastu certified</span>
            </div>
            <button onClick={() => setShowAdmin(true)} className="inline-flex items-center space-x-1.5 text-neutral-700 hover:text-[#d4af37] transition-colors cursor-pointer group">
              <Lock className="w-2.5 h-2.5 opacity-50 group-hover:opacity-100" />
              <span className="text-[8px] uppercase font-mono tracking-[0.2em]">Console Access</span>
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-[10px] text-neutral-600 font-mono tracking-wider uppercase">
          <p>© {new Date().getFullYear()} AURA KOCHI EST. ALL RIGHTS RESERVED.</p>
          <p className="mt-2 sm:mt-0">Premium Design • Kochi Royal Real Estates</p>
        </div>
      </footer>

      {showAdmin && <AdminDashboard onExit={() => setShowAdmin(false)} />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function PageWrapper({ children }: { children: ReactNode, key?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
