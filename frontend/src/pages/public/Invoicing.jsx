import React, { useState } from 'react';

function Invoicing({ setCurrentPage }) {
  const [currency, setCurrency] = useState('USD');
  const [tipPercentage, setTipPercentage] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  // Currency Exchange Rates Simulation
  const rates = {
    USD: { symbol: '$', rate: 1 },
    EUR: { symbol: '€', rate: 0.92 },
    BTC: { symbol: '₿', rate: 0.000016 },
    QC:  { symbol: '⬡', rate: 10 } // Quantum Credits
  };

  const currentRate = rates[currency].rate;
  const currentSymbol = rates[currency].symbol;

  // Base Values in USD
  const subtotalUSD = 392.00;
  const taxUSD = 39.20;
  const discountUSD = 78.00;
  
  const calculatedTipUSD = (subtotalUSD * tipPercentage) / 100;
  const totalPayableUSD = (subtotalUSD + taxUSD - discountUSD + calculatedTipUSD);

  // Convert based on selected currency
  const formatValuation = (valUSD) => {
    const converted = valUSD * currentRate;
    if (currency === 'BTC') return `${currentSymbol} ${converted.toFixed(5)}`;
    return `${currentSymbol}${converted.toFixed(2)}`;
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShareLink = () => {
    navigator.clipboard.writeText(`https://hotelease.com/secure/invoice/INV-20260901?token=qtn_7789x21`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="w-full min-h-[100vh] bg-[#020202] text-stone-200 font-sans selection:bg-cyan-500 selection:text-black px-4 md:px-8 py-10 relative overflow-hidden">
      
      {/* Background Holographic Glows */}
      <div className="absolute top-[0%] right-[10%] w-[50%] h-[50%] bg-teal-500/10 blur-[150px] rounded-full animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-[20%] left-[10%] w-[40%] h-[40%] bg-cyan-600/10 blur-[150px] rounded-full animate-pulse pointer-events-none" style={{ animationDelay: '2s' }}></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <div className="max-w-[1150px] mx-auto space-y-8 relative z-10">
        
        {/* Top Control Bar (Hidden during print) */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 print:hidden bg-[#080808] border border-white/5 p-4 rounded-2xl backdrop-blur-2xl shadow-lg">
          <button 
            onClick={() => setCurrentPage ? setCurrentPage('home') : window.location.href = '/'} 
            className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-stone-300 hover:bg-white/10 hover:text-cyan-400 text-[10px] font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Exit Terminal (Dashboard)
          </button>

          {/* New Feature: Currency & Share Tools */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <div className="bg-[#0a0a0a] p-1 rounded-xl border border-white/10 flex">
              {['USD', 'EUR', 'BTC', 'QC'].map((curr) => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr)}
                  className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${currency === curr ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40' : 'text-stone-500 hover:text-stone-300'}`}
                >
                  {curr}
                </button>
              ))}
            </div>

            <button 
              onClick={handleShareLink}
              className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-stone-300 text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2"
            >
              {copiedLink ? '✓ Link Copied' : '🔗 Share Link'}
            </button>
          
            <button 
              onClick={handlePrint}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-500 hover:from-teal-500 hover:to-cyan-400 text-black font-bold text-[10px] uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(20,184,166,0.3)] transition-all duration-300 flex items-center gap-2"
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              PDF / Print
            </button>
          </div>
        </div>

        {/* Ultra-Modern Invoice Container (Printed part) */}
        <div className="bg-[#050505] border border-white/10 rounded-[2.5rem] p-8 md:p-14 shadow-[0_30px_60px_rgba(0,0,0,0.8)] relative overflow-hidden print:bg-white print:text-black print:shadow-none print:border-none print:p-0">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px] pointer-events-none print:hidden"></div>

          {/* Invoice Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-10 mb-10 border-b border-white/5 print:border-gray-200 relative z-10">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-teal-500/10 border border-teal-500/30 text-teal-400 rounded-2xl flex items-center justify-center font-black text-xl shadow-inner print:bg-teal-900 print:text-white">
                  H
                </div>
                <span className="text-3xl font-light text-white tracking-tight print:text-black">
                  Hotel<span className="font-black text-teal-400 print:text-teal-700">Ease</span>
                </span>
              </div>
              <p className="text-xs font-medium text-stone-400 print:text-gray-600">123 Luxury Avenue, Cyber Sector, 1212</p>
              <p className="text-xs font-medium text-stone-400 print:text-gray-600 mt-0.5">secure@hotelease.com | +880 1234 567890</p>
            </div>
            
            <div className="text-left md:text-right">
              <h1 className="text-3xl md:text-4xl font-black text-stone-600 uppercase tracking-[0.2em] mb-2 print:text-gray-400">Invoice</h1>
              <div className="space-y-1">
                <p className="text-xs font-bold text-stone-300 print:text-black"><span className="text-stone-500 uppercase tracking-wider text-[10px] print:text-gray-500">Invoice ID:</span> INV-20260901</p>
                <p className="text-xs font-bold text-stone-300 print:text-black"><span className="text-stone-500 uppercase tracking-wider text-[10px] print:text-gray-500">Issued Date:</span> Oct 05, 2026</p>
                <p className="text-[9px] font-mono font-bold text-cyan-400 print:text-gray-600 mt-1">QUANTUM HASH: 0x98f4...e21a</p>
              </div>
            </div>
          </div>

          {/* Client & Payment Status Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 relative z-10">
            <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl backdrop-blur-md print:bg-gray-50 print:border-gray-200 shadow-inner">
              <p className="text-[10px] font-black text-stone-500 uppercase tracking-widest mb-3 print:text-gray-500">Billed Recipient</p>
              <h3 className="text-lg font-bold text-white mb-1 print:text-black">Sk Sujaan Mondal</h3>
              <p className="text-xs font-medium text-stone-400 print:text-gray-600">sujaanz@secureportal.com</p>
              <p className="text-xs font-medium text-stone-400 print:text-gray-600 mt-0.5">+880 1234 567890</p>
            </div>
            
            <div className="bg-teal-950/20 border border-teal-500/20 p-6 rounded-2xl flex flex-col justify-between backdrop-blur-md print:bg-teal-50 print:border-teal-200 shadow-inner">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <p className="text-[10px] font-black text-teal-400 uppercase tracking-widest print:text-teal-800">Financial Status</p>
                  <span className="bg-teal-500/20 border border-teal-500/30 text-teal-300 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-sm print:bg-green-600 print:text-white">
                    Paid in Full ({currency})
                  </span>
                </div>
                <p className="text-xs font-bold text-stone-300 print:text-teal-900"><span className="text-stone-500 uppercase tracking-wider text-[10px] print:text-teal-700">Method:</span> Neural Credit Link (**** 2584)</p>
              </div>
              <p className="text-xs font-bold text-stone-300 pt-3 border-t border-white/5 mt-3 print:text-teal-900 print:border-teal-200">
                <span className="text-stone-500 uppercase tracking-wider text-[10px] print:text-teal-700">Settled On:</span> Oct 05, 2026
              </p>
            </div>
          </div>

          {/* Itemization Table */}
          <div className="mb-10 overflow-x-auto relative z-10">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-[10px] font-black text-stone-500 uppercase tracking-widest print:border-gray-300 print:text-gray-600">
                  <th className="py-4 px-3">Item Description</th>
                  <th className="py-4 px-3 text-center">Qty / Nights</th>
                  <th className="py-4 px-3 text-right">Valuation ({currency})</th>
                </tr>
              </thead>
              <tbody className="text-xs font-medium text-stone-300 divide-y divide-white/5 print:text-gray-800 print:divide-gray-200">
                <tr>
                  <td className="py-4 px-3 text-white font-bold print:text-black">Premium Suite Node (Room 101)</td>
                  <td className="py-4 px-3 text-center text-stone-400 print:text-gray-600">2</td>
                  <td className="py-4 px-3 text-right text-teal-400 font-bold print:text-black">{formatValuation(312.00)}</td>
                </tr>
                <tr>
                  <td className="py-4 px-3 text-white font-bold print:text-black">Neural Spa Service (Deep Tissue Massage)</td>
                  <td className="py-4 px-3 text-center text-stone-400 print:text-gray-600">1</td>
                  <td className="py-4 px-3 text-right text-teal-400 font-bold print:text-black">{formatValuation(45.00)}</td>
                </tr>
                <tr>
                  <td className="py-4 px-3 text-white font-bold print:text-black">Autonomous Drone Dining</td>
                  <td className="py-4 px-3 text-center text-stone-400 print:text-gray-600">1</td>
                  <td className="py-4 px-3 text-right text-teal-400 font-bold print:text-black">{formatValuation(35.00)}</td>
                </tr>
                {tipPercentage > 0 && (
                  <tr>
                    <td className="py-4 px-3 text-teal-300 font-bold print:text-black">Autonomous Staff Tip ({tipPercentage}%)</td>
                    <td className="py-4 px-3 text-center text-stone-400 print:text-gray-600">1</td>
                    <td className="py-4 px-3 text-right text-teal-300 font-bold print:text-black">{formatValuation(calculatedTipUSD)}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* New Feature: Interactive Tip Selector (Hidden on print) */}
          <div className="mb-10 bg-[#0a0a0a] border border-white/5 p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4 print:hidden">
            <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Add Crew / Drone Pilot Tip:</span>
            <div className="flex gap-2">
              {[0, 5, 10, 15, 20].map((tip) => (
                <button
                  key={tip}
                  onClick={() => setTipPercentage(tip)}
                  className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${tipPercentage === tip ? 'bg-teal-500 text-black shadow-[0_0_15px_rgba(20,184,166,0.4)]' : 'bg-white/5 text-stone-400 hover:bg-white/10'}`}
                >
                  {tip === 0 ? 'No Tip' : `${tip}%`}
                </button>
              ))}
            </div>
          </div>

          {/* Total Calculations Summary */}
          <div className="flex justify-end pt-6 border-t border-white/5 print:border-gray-200 relative z-10">
            <div className="w-full md:w-5/12 space-y-3">
              <div className="flex justify-between text-xs font-medium text-stone-400 print:text-gray-600">
                <span>Subtotal Valuation</span>
                <span className="text-stone-200 print:text-black">{formatValuation(subtotalUSD)}</span>
              </div>
              <div className="flex justify-between text-xs font-medium text-stone-400 print:text-gray-600">
                <span>Regulatory Taxes (10%)</span>
                <span className="text-stone-200 print:text-black">{formatValuation(taxUSD)}</span>
              </div>
              {tipPercentage > 0 && (
                <div className="flex justify-between text-xs font-medium text-teal-400 print:text-teal-700">
                  <span>Crew Tip ({tipPercentage}%)</span>
                  <span>{formatValuation(calculatedTipUSD)}</span>
                </div>
              )}
              <div className="flex justify-between text-xs font-bold text-teal-400 pb-3 border-b border-white/5 print:border-gray-200 print:text-teal-700">
                <span>Applied Elite Discount (SUMMER25)</span>
                <span>-{formatValuation(discountUSD)}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-xs font-black text-white uppercase tracking-widest print:text-black">Total Payable</span>
                <span className="text-2xl md:text-3xl font-black text-white tracking-tight print:text-black">{formatValuation(totalPayableUSD)}</span>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-16 pt-8 border-t border-white/5 text-center print:border-gray-200 relative z-10">
            <p className="text-xs font-medium text-stone-400 print:text-gray-600">Thank you for selecting HotelEase as your luxury hospitality partner.</p>
            <p className="text-[10px] font-black text-stone-500 mt-1 uppercase tracking-widest print:text-gray-400">System generated secure financial record - Cryptographically Verified.</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Invoicing;