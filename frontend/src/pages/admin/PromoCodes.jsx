import React, { useState } from 'react';
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

function PromoCodes() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPromoName, setNewPromoName] = useState('');
  const [newPromoCode, setNewPromoCode] = useState('');
  const [newDiscount, setNewDiscount] = useState('');
  const [copiedCode, setCopiedCode] = useState(null);

  // অরিজিনাল ডেটা ১০০% অক্ষত রাখা হয়েছে
  const [promos, setPromos] = useState([
    { id: 1, name: 'Summer Getaway', code: 'SUMMER25', discount: '25%', usage: 145, status: 'Active', end: '2026-12-31', revenue: '$14,500' },
    { id: 2, name: 'Welcome Bonus', code: 'WELCOME50', discount: '$50 Flat', usage: 320, status: 'Active', end: '2026-12-31', revenue: '$16,000' },
    { id: 3, name: 'Flash Sale', code: 'FLASH40', discount: '40%', usage: 890, status: 'Expired', end: '2026-09-30', revenue: '$35,600' },
  ]);

  const trendData = [
    { month: 'Jan', redemptions: 120 }, { month: 'Feb', redemptions: 180 },
    { month: 'Mar', redemptions: 150 }, { month: 'Apr', redemptions: 280 },
    { month: 'May', redemptions: 220 }, { month: 'Jun', redemptions: 390 },
  ];

  // নতুন প্রমো কোড অ্যাড করার হ্যান্ডলার
  const handleCreatePromo = (e) => {
    e.preventDefault();
    if (!newPromoName || !newPromoCode || !newDiscount) {
      alert("Please fill in all campaign fields.");
      return;
    }
    const newEntry = {
      id: Date.now(),
      name: newPromoName,
      code: newPromoCode.toUpperCase(),
      discount: newDiscount,
      usage: 0,
      status: 'Active',
      end: '2026-12-31',
      revenue: '$0'
    };
    setPromos([newEntry, ...promos]);
    setNewPromoName('');
    setNewPromoCode('');
    setNewDiscount('');
    setIsModalOpen(false);
  };

  // স্ট্যাটাস টগল করার ফাংশন
  const toggleStatus = (id) => {
    setPromos(promos.map(p => p.id === id ? { ...p, status: p.status === 'Active' ? 'Expired' : 'Active' } : p));
  };

  // ক্লিপবোর্ডে কোড কপি করার ফাংশন
  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="w-full min-h-screen bg-[#050505] text-stone-200 font-sans selection:bg-teal-500 selection:text-white px-4 md:px-8 py-8 relative overflow-hidden">
      
      {/* Deep Ambient Neon Glows */}
      <div className="absolute top-[5%] left-[20%] w-[700px] h-[700px] bg-teal-500/10 rounded-full blur-[180px] pointer-events-none"></div>
      <div className="absolute bottom-[5%] right-[10%] w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-[1600px] mx-auto relative z-10 space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-teal-500/10 border border-teal-500/30 text-teal-400 px-3.5 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center gap-2 shadow-[0_0_15px_rgba(20,184,166,0.15)]">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping"></span>
                Yield & Campaign Matrix
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-light text-white tracking-tight">Promo Code <span className="font-bold text-teal-400">&</span> Coupons</h1>
            <p className="text-xs font-bold text-stone-500 uppercase tracking-widest mt-2">Next-Gen Campaign Performance & Redemption Telemetry</p>
          </div>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white px-7 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-[0_0_25px_rgba(20,184,166,0.3)] hover:shadow-[0_0_35px_rgba(20,184,166,0.5)] transition-all duration-300 flex items-center gap-2.5 active:scale-95"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
            Create New Campaign
          </button>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 relative overflow-hidden backdrop-blur-xl group hover:border-teal-500/30 transition-all">
            <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1">Total Active Campaigns</p>
            <h2 className="text-3xl font-light text-white">{promos.filter(p => p.status === 'Active').length}</h2>
            <div className="absolute right-4 bottom-4 w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform">
               <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
            </div>
          </div>
          
          <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 relative overflow-hidden backdrop-blur-xl group hover:border-teal-500/30 transition-all">
            <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1">Total Redemptions</p>
            <h2 className="text-3xl font-light text-white">{promos.reduce((sum, p) => sum + p.usage, 0)}</h2>
            <div className="absolute right-4 bottom-4 w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
               <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            </div>
          </div>

          <div className="bg-gradient-to-br from-teal-950/40 via-black to-black border border-teal-500/20 rounded-3xl p-6 relative overflow-hidden backdrop-blur-xl shadow-[0_0_30px_rgba(20,184,166,0.05)]">
            <p className="text-[10px] font-bold text-teal-400 uppercase tracking-widest mb-1">Revenue Impact</p>
            <h2 className="text-3xl font-light text-white">$66,100</h2>
            <div className="absolute right-4 bottom-4 w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-300">
               <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
          </div>
        </div>

        {/* Bento Grid Layout: Promo Cards & Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Active Promotions Bento Card Grid (2 Cols) */}
          <div className="bg-gradient-to-br from-white/[0.04] via-white/[0.01] to-transparent border border-white/10 rounded-3xl p-6 md:p-8 lg:col-span-2 shadow-2xl backdrop-blur-2xl flex flex-col justify-between">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
              <div>
                <h3 className="text-xl font-light text-white tracking-wide">Active Campaign Matrix</h3>
                <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mt-0.5">Click code to copy instantly</p>
              </div>
            </div>

            {/* Grid of Interactive Promo Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {promos.map((promo) => (
                <div key={promo.id} className="bg-white/[0.02] border border-white/10 hover:border-teal-500/40 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
                  
                  {/* Subtle Card Glow */}
                  <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-teal-500/5 rounded-full blur-2xl group-hover:bg-teal-500/15 transition-all"></div>

                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-xs font-bold text-white tracking-wide">{promo.name}</span>
                      <button 
                        onClick={() => toggleStatus(promo.id)}
                        className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border transition ${
                          promo.status === 'Active' ? 'bg-teal-500/10 text-teal-400 border-teal-500/30' : 'bg-red-500/10 text-red-400 border-red-500/30'
                        }`}
                      >
                        {promo.status}
                      </button>
                    </div>

                    {/* Interactive Code Box */}
                    <div 
                      onClick={() => handleCopyCode(promo.code)}
                      className="bg-black/60 border border-white/10 hover:border-teal-500/50 p-4 rounded-xl flex items-center justify-between cursor-pointer transition-all shadow-inner group/code my-4"
                      title="Click to copy code"
                    >
                      <div>
                        <p className="text-[9px] font-bold text-stone-500 uppercase tracking-widest">Coupon Code</p>
                        <p className="font-mono text-lg font-black text-teal-400 tracking-wider mt-0.5">{promo.code}</p>
                      </div>
                      <span className="text-[10px] font-bold text-stone-400 group-hover/code:text-teal-400 transition-colors bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/5">
                        {copiedCode === promo.code ? 'Copied ✓' : 'Copy'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs font-medium text-stone-400 mt-4">
                      <div>
                        <p className="text-[9px] font-bold text-stone-600 uppercase tracking-widest">Discount</p>
                        <p className="text-white font-bold mt-0.5">{promo.discount}</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-bold text-stone-600 uppercase tracking-widest">Usage Count</p>
                        <p className="text-white font-bold mt-0.5">{promo.usage} Redemptions</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-[10px] text-stone-500 font-mono">
                    <span>Valid until: {promo.end}</span>
                    <span className="text-teal-400 font-bold">{promo.revenue}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Redemption Trends & Analytics Card */}
          <div className="bg-gradient-to-br from-white/[0.04] via-white/[0.01] to-transparent border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-2xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
                <h3 className="text-lg font-light text-white tracking-wide">Redemption Velocity</h3>
                <span className="text-[9px] font-bold text-teal-400 uppercase tracking-widest bg-teal-500/10 border border-teal-500/30 px-3 py-1 rounded-full animate-pulse">
                  Live Stream
                </span>
              </div>
              
              <div className="w-full h-64 my-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#78716c', fontWeight: 'bold' }} />
                    <Tooltip contentStyle={{ backgroundColor: '#121212', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', boxShadow: '0 15px 40px rgba(0,0,0,0.8)' }} />
                    <Line type="monotone" dataKey="redemptions" stroke="#2dd4bf" strokeWidth={3.5} dot={{ r: 5, fill: '#2dd4bf', strokeWidth: 2, stroke: '#050505' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10 bg-white/[0.02] p-5 rounded-2xl border border-white/5 text-center">
               <p className="text-3xl font-light text-white tracking-tight">+45%</p>
               <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mt-1">Surge in Redemptions (Last 30 Days)</p>
            </div>
          </div>

        </div>
      </div>

      {/* Ultra-Modern Modal for Creating Promo */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-xl flex items-center justify-center z-50 px-4 animate-fade-in">
          <div className="bg-[#121212] border border-white/15 rounded-3xl p-8 max-w-md w-full shadow-2xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex justify-between items-center border-b border-white/10 pb-4 relative z-10">
              <h3 className="text-xl font-light text-white tracking-wide">Launch New Campaign</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-stone-500 hover:text-white text-lg font-bold">✕</button>
            </div>
            
            <form onSubmit={handleCreatePromo} className="space-y-4 relative z-10">
              <div>
                <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Campaign Name</label>
                <input 
                  type="text" 
                  value={newPromoName} 
                  onChange={(e) => setNewPromoName(e.target.value)}
                  placeholder="e.g. Winter Holiday Special" 
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3.5 text-xs text-white placeholder-stone-600 outline-none focus:border-teal-500/50"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Promo Code</label>
                <input 
                  type="text" 
                  value={newPromoCode} 
                  onChange={(e) => setNewPromoCode(e.target.value)}
                  placeholder="e.g. WINTER30" 
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3.5 text-xs text-white placeholder-stone-600 outline-none focus:border-teal-500/50 font-mono uppercase tracking-widest"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Discount Value</label>
                <input 
                  type="text" 
                  value={newDiscount} 
                  onChange={(e) => setNewDiscount(e.target.value)}
                  placeholder="e.g. 30% or $40 Flat" 
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3.5 text-xs text-white placeholder-stone-600 outline-none focus:border-teal-500/50"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-stone-300 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 bg-teal-600 hover:bg-teal-500 text-white py-3.5 rounded-xl text-xs font-black uppercase tracking-widest transition shadow-[0_0_20px_rgba(20,184,166,0.3)]"
                >
                  Deploy Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default PromoCodes;