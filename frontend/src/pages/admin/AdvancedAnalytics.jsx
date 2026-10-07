import React, { useState } from 'react';
import { AreaChart, Area, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, ComposedChart } from 'recharts';

function AdvancedAnalytics() {
  const [viewMode, setViewMode] = useState('chart'); // 'chart' or 'table'
  const [showAIForecast, setShowAIForecast] = useState(true);
  const [dateRange, setDateRange] = useState('Last 6 Months');
  const [currency, setCurrency] = useState('USD'); // New Feature: Currency switcher
  const [isAIModalOpen, setIsAIModalOpen] = useState(false); // New Feature: AI Yield Modal
  const [aiLoading, setAiLoading] = useState(false);

  // Enhanced Data with AI Predictions (Future Data Points)
  const revParData = [
    { month: 'Jan', lastYear: 60, thisYear: 75, predicted: 75 },
    { month: 'Feb', lastYear: 65, thisYear: 82, predicted: 82 },
    { month: 'Mar', lastYear: 80, thisYear: 95, predicted: 95 },
    { month: 'Apr', lastYear: 75, thisYear: 110, predicted: 110 },
    { month: 'May', lastYear: 90, thisYear: 125, predicted: 125 },
    { month: 'Jun', lastYear: 105, thisYear: 140, predicted: 140 },
    // AI Future Projection Data
    { month: 'Jul', lastYear: 110, thisYear: null, predicted: 165 }, 
    { month: 'Aug', lastYear: 115, thisYear: null, predicted: 180 },
  ];

  const segmentData = [
    { name: 'Corporate', value: 45 }, { name: 'Direct Booking', value: 30 },
    { name: 'OTA', value: 15 }, { name: 'Walk-in', value: 10 }
  ];
  
  const COLORS = ['#2dd4bf', '#0f766e', '#042f2e', '#4ade80'];

  const currencyMultiplier = currency === 'USD' ? 1 : currency === 'EUR' ? 0.92 : 0.79;
  const currencySymbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '£';

  const handleExportPDF = () => {
    window.print();
  };

  const handleRunAIOptimization = () => {
    setAiLoading(true);
    setTimeout(() => {
      setAiLoading(false);
      setIsAIModalOpen(false);
      alert("AI Yield Matrix successfully optimized. Pricing vectors pushed to Channel Manager.");
    }, 1500);
  };

  return (
    <div className="w-full min-h-screen bg-[#030303] text-stone-200 font-sans selection:bg-teal-500 selection:text-white px-4 md:px-10 py-10 relative overflow-hidden">
      
      {/* Deep Cyber Ambient Neon Glows */}
      <div className="absolute top-[5%] left-[15%] w-[800px] h-[800px] bg-teal-500/10 rounded-full blur-[200px] pointer-events-none print:hidden"></div>
      <div className="absolute bottom-[5%] right-[5%] w-[700px] h-[700px] bg-cyan-500/5 rounded-full blur-[180px] pointer-events-none print:hidden"></div>

      <div className="max-w-[1700px] mx-auto relative z-10 space-y-8">
        
        {/* Advanced Filter & Action Header */}
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 pb-6 border-b border-white/10 print:border-none">
          <div>
            <div className="flex items-center gap-3 mb-3 print:hidden">
              <span className="bg-teal-500/10 border border-teal-500/30 text-teal-400 px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center gap-2.5 shadow-[0_0_20px_rgba(20,184,166,0.2)] backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping"></span>
                Neural Business Intelligence v5.0
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-light text-white tracking-tight">Advanced <span className="font-bold text-teal-400">Analytics</span></h1>
            <p className="text-xs font-bold text-stone-500 uppercase tracking-widest mt-2">Deep Dive into RevPAR, Autonomous AI Projections & Market Segmentation</p>
          </div>
          
          {/* Interactive Super Control Bar */}
          <div className="flex flex-wrap items-center gap-4 w-full xl:w-auto p-2.5 bg-white/[0.03] border border-white/10 rounded-2xl backdrop-blur-2xl print:hidden shadow-2xl">
            
            {/* Currency Switcher */}
            <div className="flex bg-black/60 rounded-xl p-1 border border-white/5">
              {['USD', 'EUR', 'GBP'].map((cur) => (
                <button 
                  key={cur}
                  onClick={() => setCurrency(cur)}
                  className={`px-3 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${currency === cur ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40' : 'text-stone-500 hover:text-stone-300'}`}
                >
                  {cur}
                </button>
              ))}
            </div>

            <div className="w-px h-6 bg-white/10 hidden md:block"></div>

            {/* Date Range Selector */}
            <div className="flex bg-black/60 rounded-xl p-1 border border-white/5">
              <button 
                onClick={() => setDateRange('YTD')}
                className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${dateRange === 'YTD' ? 'bg-white/10 text-white shadow-sm' : 'text-stone-500 hover:text-stone-300'}`}
              >
                YTD
              </button>
              <button 
                onClick={() => setDateRange('Last 6 Months')}
                className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${dateRange === 'Last 6 Months' ? 'bg-white/10 text-white shadow-sm' : 'text-stone-500 hover:text-stone-300'}`}
              >
                6 Months
              </button>
            </div>

            <div className="w-px h-6 bg-white/10 hidden md:block"></div>

            {/* AI Yield Trigger Button */}
            <button 
              onClick={() => setIsAIModalOpen(true)}
              className="bg-white/5 hover:bg-white/10 border border-white/10 text-stone-200 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition shadow-sm"
            >
              🤖 AI Yield Hub
            </button>

            {/* Export PDF */}
            <button 
              onClick={handleExportPDF}
              className="bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(20,184,166,0.3)] transition-all flex items-center gap-2"
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
              Export
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main RevPAR Section */}
          <div className="bg-gradient-to-br from-white/[0.04] via-white/[0.01] to-transparent border border-white/10 rounded-3xl p-6 md:p-8 lg:col-span-2 flex flex-col min-h-[540px] shadow-2xl backdrop-blur-2xl">
            
            {/* Header & View Toggles & AI Switch */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8 border-b border-white/10 pb-6">
              <div>
                <h3 className="text-xl font-light text-white tracking-wide">RevPAR Performance Matrix</h3>
                <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mt-1">YoY Growth Tracking & Neural Projections ({currency})</p>
              </div>
              
              <div className="flex items-center gap-6 print:hidden">
                {/* AI Forecast Toggle */}
                <div className="flex items-center gap-3 bg-white/5 border border-white/5 px-3.5 py-2 rounded-xl">
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${showAIForecast ? 'text-teal-400' : 'text-stone-400'}`}>
                    AI Forecast
                  </span>
                  <button 
                    onClick={() => setShowAIForecast(!showAIForecast)} 
                    className={`w-11 h-6 rounded-full flex items-center transition-all duration-300 p-1 focus:outline-none border ${showAIForecast ? 'bg-teal-500/20 border-teal-500/50' : 'bg-white/5 border-white/10'}`}
                  >
                    <div className={`w-4 h-4 rounded-full shadow-sm transform transition-transform duration-300 ${showAIForecast ? 'translate-x-5 bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.9)]' : 'translate-x-0 bg-stone-500'}`}></div>
                  </button>
                </div>
                
                <div className="w-px h-6 bg-white/10"></div>

                {/* Chart vs Table Toggle */}
                <div className="flex bg-black/60 border border-white/10 rounded-xl p-1">
                  <button onClick={() => setViewMode('chart')} className={`p-2 rounded-lg transition-colors ${viewMode === 'chart' ? 'bg-white/10 text-white shadow-sm' : 'text-stone-500 hover:text-white'}`} title="Chart View">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>
                  </button>
                  <button onClick={() => setViewMode('table')} className={`p-2 rounded-lg transition-colors ${viewMode === 'table' ? 'bg-white/10 text-white shadow-sm' : 'text-stone-500 hover:text-white'}`} title="Data Table View">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Dynamic Content: Chart OR Table */}
            <div className="w-full flex-1 relative min-h-[360px]">
              {viewMode === 'chart' ? (
                <div className="absolute inset-0 animate-fade-in">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={revParData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorThisYear" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#78716c', fontSize: 10, fontWeight: 'bold' }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#78716c', fontSize: 10, fontWeight: 'bold' }} tickFormatter={(value) => `${currencySymbol}${Math.round(value * currencyMultiplier)}`} dx={-5} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#121212', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', fontSize: '12px', color: '#fff', boxShadow: '0 15px 40px rgba(0,0,0,0.8)' }} 
                        formatter={(value) => [`${currencySymbol}${Math.round(value * currencyMultiplier)}`, '']}
                        itemStyle={{ fontWeight: 'bold' }}
                      />
                      <Area type="monotone" dataKey="lastYear" name="2025 RevPAR" stroke="#78716c" strokeDasharray="4 4" strokeWidth={2} fill="none" />
                      <Area type="monotone" dataKey="thisYear" name="2026 RevPAR" stroke="#2dd4bf" strokeWidth={3.5} fillOpacity={1} fill="url(#colorThisYear)" activeDot={{ r: 6, fill: '#121212', stroke: '#2dd4bf', strokeWidth: 2 }} />
                      
                      {/* Conditional AI Projection Line */}
                      {showAIForecast && (
                        <Line type="monotone" dataKey="predicted" name="AI Projection" stroke="#c084fc" strokeWidth={3} strokeDasharray="6 6" dot={{ r: 4, fill: '#121212', stroke: '#c084fc', strokeWidth: 2 }} />
                      )}
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                /* Raw Data Table View */
                <div className="absolute inset-0 overflow-auto animate-fade-in border border-white/5 rounded-2xl bg-black/40">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-white/5 sticky top-0 backdrop-blur-xl">
                      <tr className="text-[10px] font-bold text-stone-400 uppercase tracking-widest border-b border-white/10">
                        <th className="p-4">Period</th>
                        <th className="p-4 text-right">2025 RevPAR</th>
                        <th className="p-4 text-right">2026 RevPAR</th>
                        <th className="p-4 text-right text-teal-400">YoY Growth</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm font-medium text-stone-200">
                      {revParData.filter(d => d.thisYear !== null).map((row, idx) => (
                        <tr key={idx} className="border-b border-white/5 hover:bg-white/[0.02] transition">
                          <td className="p-4 font-bold text-white">{row.month}</td>
                          <td className="p-4 text-right text-stone-400 font-mono">{currencySymbol}{Math.round(row.lastYear * currencyMultiplier)}.00</td>
                          <td className="p-4 text-right font-bold text-teal-400 font-mono">{currencySymbol}{Math.round(row.thisYear * currencyMultiplier)}.00</td>
                          <td className="p-4 text-right font-bold text-green-400 font-mono">+{((row.thisYear - row.lastYear) / row.lastYear * 100).toFixed(1)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-8">
            
            {/* Market Segmentation */}
            <div className="bg-gradient-to-br from-white/[0.04] via-white/[0.01] to-transparent border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col shadow-2xl backdrop-blur-2xl">
              <h3 className="text-xl font-light text-white tracking-wide">Market Segments</h3>
              <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mt-0.5">Booking channel distribution</p>

              <div className="w-full h-48 relative flex justify-center items-center mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={segmentData} dataKey="value" innerRadius={60} outerRadius={85} paddingAngle={5} stroke="none">
                      {segmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#121212', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', fontSize: '11px', color: '#fff', boxShadow: '0 10px 30px rgba(0,0,0,0.8)' }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xs font-bold text-stone-500 uppercase tracking-widest">Share</span>
                  <span className="text-xl font-light text-white">YTD</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mt-4">
                {segmentData.map((item, idx) => (
                  <div key={idx} className="bg-black/40 border border-white/5 p-3.5 rounded-2xl">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.3)]" style={{ backgroundColor: COLORS[idx] }}></span>
                      <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest truncate">{item.name}</span>
                    </div>
                    <span className="text-base font-bold text-white">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Competitor Benchmarking Widget */}
            <div className="bg-gradient-to-br from-teal-950/40 via-black to-black border border-teal-500/25 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 text-teal-500/10 pointer-events-none">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-24 h-24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              </div>
              <h3 className="text-xs font-black text-teal-400 uppercase tracking-widest mb-6 relative z-10">Comp Set Benchmark</h3>
              <div className="space-y-5 relative z-10">
                <div>
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-2">
                    <span className="text-white">HotelEase ADR</span>
                    <span className="text-teal-400 font-mono">{currencySymbol}{Math.round(185 * currencyMultiplier)}</span>
                  </div>
                  <div className="w-full bg-black/60 rounded-full h-2 border border-white/5 overflow-hidden">
                    <div className="bg-gradient-to-r from-teal-500 to-cyan-400 h-full rounded-full shadow-[0_0_12px_rgba(45,212,191,0.8)]" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-2">
                    <span className="text-stone-400">Market Average</span>
                    <span className="text-stone-300 font-mono">{currencySymbol}{Math.round(162 * currencyMultiplier)}</span>
                  </div>
                  <div className="w-full bg-black/60 rounded-full h-2 border border-white/5 overflow-hidden">
                    <div className="bg-stone-500 h-full rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* New Feature: AI Yield Hub Modal */}
      {isAIModalOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-xl flex items-center justify-center z-50 px-4 animate-fade-in">
          <div className="bg-[#121212] border border-white/15 rounded-3xl p-8 max-w-lg w-full shadow-2xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex justify-between items-center border-b border-white/10 pb-4 relative z-10">
              <div>
                <h3 className="text-xl font-light text-white tracking-wide">Autonomous AI Yield Hub</h3>
                <p className="text-[10px] font-bold text-teal-400 uppercase tracking-widest mt-0.5">Neural Pricing & Demand Optimization</p>
              </div>
              <button onClick={() => setIsAIModalOpen(false)} className="text-stone-500 hover:text-white text-lg font-bold">✕</button>
            </div>
            
            <div className="space-y-4 text-xs font-medium text-stone-300 relative z-10">
              <div className="bg-white/[0.03] border border-white/10 p-4 rounded-2xl">
                <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1">Algorithmic Recommendation</p>
                <p className="text-white">Based on upcoming weekend surge in Dhaka & regional events, AI suggests a <span className="text-teal-400 font-bold">+12% ADR adjustment</span> across Deluxe suites.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/50 p-4 rounded-2xl border border-white/5">
                  <p className="text-[9px] font-bold text-stone-500 uppercase tracking-widest">Confidence Score</p>
                  <p className="text-xl font-light text-white mt-1">98.7%</p>
                </div>
                <div className="bg-black/50 p-4 rounded-2xl border border-white/5">
                  <p className="text-[9px] font-bold text-stone-500 uppercase tracking-widest">Est. Revenue Lift</p>
                  <p className="text-xl font-light text-teal-400 mt-1">+$14,200</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4 relative z-10">
              <button 
                onClick={() => setIsAIModalOpen(false)}
                className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-stone-300 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest transition"
              >
                Dismiss
              </button>
              <button 
                onClick={handleRunAIOptimization}
                disabled={aiLoading}
                className="flex-1 bg-teal-600 hover:bg-teal-500 text-white py-3.5 rounded-xl text-xs font-black uppercase tracking-widest transition shadow-[0_0_25px_rgba(20,184,166,0.3)] flex items-center justify-center gap-2"
              >
                {aiLoading ? 'Optimizing Vectors...' : 'Deploy AI Strategy'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default AdvancedAnalytics;