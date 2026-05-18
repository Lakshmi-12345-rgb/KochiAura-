import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calculator, 
  Percent, 
  Calendar, 
  Wallet, 
  ArrowRight, 
  TrendingUp, 
  Info,
  ShieldCheck,
  CreditCard
} from 'lucide-react';

export default function MortgageCalculator() {
  const [propertyPrice, setPropertyPrice] = useState(50000000); // 5 Cr
  const [downPayment, setDownPayment] = useState(10000000); // 1 Cr
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTerm, setLoanTerm] = useState(20);
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  useEffect(() => {
    const principal = propertyPrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    if (monthlyRate > 0) {
      const emiVal = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                     (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      
      const totalPay = emiVal * numberOfPayments;
      setEmi(Math.round(emiVal));
      setTotalPayment(Math.round(totalPay));
      setTotalInterest(Math.round(totalPay - principal));
    } else {
      const emiVal = principal / numberOfPayments;
      const totalPay = principal;
      setEmi(Math.round(emiVal));
      setTotalPayment(Math.round(totalPay));
      setTotalInterest(0);
    }
  }, [propertyPrice, downPayment, interestRate, loanTerm]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const formatCr = (val: number) => {
    return (val / 10000000).toFixed(2) + ' Cr';
  };

  return (
    <section id="mortgage-tool" className="py-24 bg-[#050505] relative overflow-hidden">
      {/* Visual background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#d4af37] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[40rem] h-[40rem] bg-blue-500/10 rounded-full blur-[180px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center space-x-2 text-[#d4af37]"
          >
            <Calculator className="w-4 h-4" />
            <span className="text-[10px] font-mono uppercase tracking-[0.4em]">Investment Modeling</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight italic">
            Capital <span className="text-[#d4af37]">Acquisition</span> Planner
          </h2>
          <p className="text-neutral-500 max-w-xl mx-auto text-sm font-light leading-relaxed">
            Architect your financial route for Kochi's prestigious holdings with our high-fidelity EMI modeling engine.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-8 bg-neutral-900/30 border border-neutral-800 p-8 rounded-3xl backdrop-blur-sm">
            
            {/* Property Price Selector */}
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Total Asset Value</label>
                <span className="text-xl font-serif text-white">{formatCurrency(propertyPrice)}</span>
              </div>
              <input 
                type="range"
                min="10000000"
                max="500000000"
                step="1000000"
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(parseInt(e.target.value))}
                className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#d4af37]"
              />
              <div className="flex justify-between text-[9px] font-mono text-neutral-600 uppercase tracking-widest">
                <span>Min Entry (1 Cr)</span>
                <span>Crown Jewel (50 Cr)</span>
              </div>
            </div>

            {/* Down Payment Selector */}
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Initial Capital Commitment</label>
                <span className="text-lg font-serif text-[#d4af37]">{formatCurrency(downPayment)}</span>
              </div>
              <input 
                type="range"
                min="2000000"
                max={propertyPrice * 0.9}
                step="500000"
                value={downPayment}
                onChange={(e) => setDownPayment(parseInt(e.target.value))}
                className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#d4af37]"
              />
              <div className="flex justify-between text-[9px] font-mono text-neutral-600 uppercase tracking-widest">
                <span>Buffer Registry</span>
                <span>Max Safe Liquid (90%)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Interest Rate */}
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Interest rate (p.a.)</label>
                  <span className="text-lg font-mono text-white">{interestRate}%</span>
                </div>
                <input 
                  type="range"
                  min="5"
                  max="15"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                  className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#d4af37]"
                />
              </div>

              {/* Loan Term */}
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Amortization Period</label>
                  <span className="text-lg font-mono text-white">{loanTerm} Years</span>
                </div>
                <div className="flex space-x-2">
                  {[10, 15, 20, 30].map(yr => (
                    <button
                      key={yr}
                      onClick={() => setLoanTerm(yr)}
                      className={`flex-1 py-2 rounded-lg text-[10px] font-mono border transition-all ${
                        loanTerm === yr 
                          ? 'bg-[#d4af37] text-black border-[#d4af37] font-bold' 
                          : 'bg-black/40 border-neutral-800 text-neutral-500 hover:border-neutral-600'
                      }`}
                    >
                      {yr}Y
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-800 flex items-center space-x-4">
               <div className="p-3 bg-[#d4af37]/5 border border-[#d4af37]/20 rounded-2xl">
                 <ShieldCheck className="w-5 h-5 text-[#d4af37]" />
               </div>
               <p className="text-[10px] text-neutral-500 font-mono uppercase leading-relaxed tracking-wider">
                 Calculations are based on standard amortization protocols for NRI and HNI residents within Kerala jurisdiction.
               </p>
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-5 h-full space-y-6">
            <div className="bg-gradient-to-br from-[#d4af37] to-[#8a6d1c] p-8 rounded-3xl shadow-2xl relative overflow-hidden group">
              {/* Decorative Card Texture */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl" />
              
              <div className="relative z-10 space-y-8">
                <div className="flex justify-between items-start">
                   <div className="space-y-1">
                      <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-black/60 font-bold">Monthly Commitment</span>
                      <h3 className="text-3xl sm:text-4xl font-serif text-black tracking-tight">{formatCurrency(emi)}</h3>
                   </div>
                   <div className="w-10 h-10 bg-black/20 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-black" />
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-black/10 pt-6">
                  <div className="space-y-1">
                    <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-black/60 font-bold italic">Total Repayment</span>
                    <p className="text-sm font-bold text-black">{formatCr(totalPayment)}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-black/60 font-bold italic">Interest Component</span>
                    <p className="text-sm font-bold text-black">{formatCr(totalInterest)}</p>
                  </div>
                </div>

                <button className="w-full py-4 bg-black text-white rounded-2xl text-[10px] font-mono uppercase tracking-[0.3em] font-bold flex items-center justify-center space-x-2 group-hover:bg-[#1a1a1a] transition-all">
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Request Pre-Approval</span>
                </button>
              </div>
            </div>

            <div className="bg-neutral-900/50 border border-neutral-800 p-6 rounded-3xl space-y-4">
               <h4 className="flex items-center text-[10px] font-mono uppercase tracking-widest text-[#d4af37]">
                 <Info className="w-3.5 h-3.5 mr-2" /> Financial Insights
               </h4>
               <div className="space-y-3">
                 <InsightItem 
                   label="Principal Amount" 
                   value={formatCurrency(propertyPrice - downPayment)} 
                 />
                 <InsightItem 
                   label="LTV (Loan to Value)" 
                   value={`${Math.round(((propertyPrice - downPayment) / propertyPrice) * 100)}%`} 
                 />
                 <InsightItem 
                   label="Staging Estimate" 
                   value={formatCurrency(propertyPrice * 0.05)} 
                   sublabel="Suggested interior buffer"
                 />
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function InsightItem({ label, value, sublabel }: { label: string, value: string, sublabel?: string }) {
  return (
    <div className="flex justify-between items-center py-1.5 border-b border-neutral-800/50 last:border-0">
      <div className="space-y-0.5">
        <span className="text-[10px] text-neutral-500 font-sans">{label}</span>
        {sublabel && <p className="text-[8px] text-neutral-700 font-mono italic uppercase">{sublabel}</p>}
      </div>
      <span className="text-xs font-mono text-white font-semibold">{value}</span>
    </div>
  );
}
