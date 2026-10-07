import React, { useState } from 'react';

function ChainManagement() {
  const [mapStyle, setMapStyle] = useState('radar'); // 'radar' or 'satellite'
  const [activePropertyAction, setActivePropertyAction] = useState(null);

  const properties = [
    { id: 'HQ-DHK-01', name: 'HotelEase Dhaka', city: 'Dhaka', region: 'Central', occupancy: 78, revPar: '$85.50', adr: '$110.00', status: 'Optimal', alert: false },
    { id: 'RS-CXB-02', name: 'Serene Resort', city: "Cox's Bazar", region: 'South', occupancy: 92, revPar: '$145.20', adr: '$158.00', status: 'High Demand', alert: false },
    { id: 'TG-SYL-03', name: 'Tea Garden Resort', city: 'Sylhet', region: 'Northeast', occupancy: 64, revPar: '$55.80', adr: '$88.00', status: 'Needs Attention', alert: true },
    { id: 'OF-CTG-04', name: 'Oceanfront Inn', city: 'Chittagong', region: 'Southeast', occupancy: 81, revPar: '$95.00', adr: '$118.00', status: 'Optimal', alert: false },
  ];

  return (
    <div className="w-full min-h-screen bg-[#070707] text-stone-200 font-sans selection:bg-teal-500 selection:text-white px-4 md:px-8 py-8 relative overflow-hidden">
      
      {/* Deep Ambient Glows */}
      <div className="absolute top-[5%] left-[10%] w-[700px] h-[700px] bg-teal-600/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-[1500px] mx-auto relative z-10 space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-teal-500/10 border border-teal-500/30 text-teal-400 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Global Network
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-light text-white tracking-tight">Chain Administration</h1>
            <p className="text-xs font-bold text-stone-500 uppercase tracking-widest mt-2">Multi-Property Management & Global Overview</p>
          </div>
          
          <button className="bg-teal-600 hover:bg-teal-500 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(20,184,166,0.2)] hover:shadow-[0_0_30px_rgba(20,184,166,0.4)] transition-all duration-300 flex items-center gap-2">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
            Add New Property
          </button>
        </div>

        {/* Top KPIs / Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.04] transition-colors relative overflow-hidden group">
            <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1 relative z-10">Total Properties</p>
            <h2 className="text-3xl font-light text-white relative z-10">04</h2>
            <div className="absolute -right-4 -bottom-4 text-white/5 group-hover:text-white/10 transition-colors">
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-20 h-20"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
            </div>
          </div>
          
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.04] transition-colors relative overflow-hidden group">
            <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1 relative z-10">Total Rooms (Global)</p>
            <h2 className="text-3xl font-light text-white relative z-10">542</h2>
            <div className="absolute -right-4 -bottom-4 text-white/5 group-hover:text-white/10 transition-colors">
               <svg fill="currentColor" viewBox="0 0 24 24" className="w-20 h-20"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            </div>
          </div>
          
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.04] transition-colors relative overflow-hidden">
            <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1">Avg Network Occupancy</p>
            <div className="flex items-end gap-3 mt-1">
               <h2 className="text-3xl font-light text-teal-400">78.5%</h2>
               <span className="text-[10px] font-bold text-green-400 mb-1">+2.4%</span>
            </div>
          </div>

          {/* New Feature: System Health Widget */}
          <div className="bg-gradient-to-br from-teal-950/40 to-black border border-teal-500/20 rounded-2xl p-6 relative overflow-hidden shadow-[0_0_20px_rgba(20,184,166,0.05)]">
             <div className="flex justify-between items-start mb-2">
                <p className="text-[10px] font-bold text-teal-400 uppercase tracking-widest">Network Status</p>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                </span>
             </div>
            <h2 className="text-xl font-medium text-white mt-2">All Nodes Online</h2>
            <p className="text-[9px] font-bold text-stone-500 uppercase tracking-widest mt-1">Synced 2 mins ago</p>
          </div>
        </div>

        {/* Global Map & Alerts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           
           {/* Interactive Map Area */}
           <div className="bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent border border-white/10 rounded-3xl p-6 lg:p-8 lg:col-span-2 shadow-2xl backdrop-blur-xl flex flex-col min-h-[400px]">
              <div className="flex justify-between items-center mb-6">
                <div>
                   <h3 className="text-lg font-light text-white tracking-wide">Global Footprint</h3>
                   <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mt-1">Live Geo-tracking</p>
                </div>
                
                {/* New Feature: Map Style Toggle */}
                <div className="flex bg-black/60 border border-white/10 rounded-lg p-1">
                  <button 
                     onClick={() => setMapStyle('radar')} 
                     className={`px-3 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-widest transition-colors ${mapStyle === 'radar' ? 'bg-white/10 text-white' : 'text-stone-500 hover:text-white'}`}
                  >
                     Radar
                  </button>
                  <button 
                     onClick={() => setMapStyle('satellite')} 
                     className={`px-3 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-widest transition-colors ${mapStyle === 'satellite' ? 'bg-white/10 text-white' : 'text-stone-500 hover:text-white'}`}
                  >
                     Satellite
                  </button>
                </div>
              </div>

              {/* Map UI Element */}
              <div className="w-full flex-1 rounded-2xl relative overflow-hidden border border-white/5 bg-[#0a0a0a] flex items-center justify-center group">
                 {/* Map Background based on state */}
                 <div className={`absolute inset-0 transition-opacity duration-1000 ${mapStyle === 'radar' ? 'opacity-30' : 'opacity-0'}`} 
                      style={{ backgroundImage: 'radial-gradient(circle at center, #14b8a6 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
                 </div>
                 
                 {mapStyle === 'satellite' && (
                    <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center transition-opacity duration-1000 mix-blend-luminosity"></div>
                 )}

                 {/* Map Scanning Animation (Only in Radar Mode) */}
                 {mapStyle === 'radar' && (
                    <div className="absolute inset-0 rounded-full border border-teal-500/20 w-[150%] h-[150%] -top-[25%] -left-[25%] animate-[spin_10s_linear_infinite] pointer-events-none">
                       <div className="w-1/2 h-full bg-gradient-to-r from-transparent to-teal-500/10 origin-right"></div>
                    </div>
                 )}

                 <div className="relative z-10 bg-black/60 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 text-center shadow-2xl group-hover:scale-105 transition-transform">
                   <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-8 h-8 text-teal-400 mx-auto mb-2"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                   <p className="text-xs font-bold text-white uppercase tracking-widest">Map Engine Connecting</p>
                   <p className="text-[9px] font-medium text-stone-400 mt-1">Geo-API Integration Pending</p>
                 </div>
              </div>
           </div>

           {/* New Feature: AI Smart Alerts Panel */}
           <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 lg:p-8 flex flex-col shadow-lg">
              <h3 className="text-lg font-light text-white tracking-wide mb-1">Intelligence Alerts</h3>
              <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-6">AI Automated Monitoring</p>
              
              <div className="flex-1 space-y-4">
                 {/* Alert Item 1 */}
                 <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-4 flex gap-4">
                    <div className="mt-0.5">
                       <span className="relative flex h-2.5 w-2.5">
                         <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                         <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-500"></span>
                       </span>
                    </div>
                    <div>
                       <h4 className="text-xs font-bold text-yellow-400 mb-1 uppercase tracking-wider">Occupancy Drop Detected</h4>
                       <p className="text-[11px] text-stone-400 leading-relaxed">Tea Garden Resort (Sylhet) is currently at 64% capacity. Recommended to run flash promos.</p>
                    </div>
                 </div>
                 
                 {/* Alert Item 2 */}
                 <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex gap-4">
                    <div className="mt-0.5">
                       <span className="w-2.5 h-2.5 rounded-full bg-stone-600 block"></span>
                    </div>
                    <div>
                       <h4 className="text-xs font-bold text-white mb-1 uppercase tracking-wider">High Demand Projection</h4>
                       <p className="text-[11px] text-stone-400 leading-relaxed">Serene Resort forecasting 98% occupancy for upcoming weekend.</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Multi-Property Management Table */}
        <div className="bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-xl overflow-hidden">
          
          <div className="flex justify-between items-center mb-6">
             <h3 className="text-lg font-light text-white tracking-wide">Property Network Directory</h3>
             <button className="text-[10px] font-bold text-teal-400 uppercase tracking-widest hover:text-white transition-colors">Download Matrix</button>
          </div>
          
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="text-[9px] font-bold text-stone-500 uppercase tracking-widest border-b border-white/10">
                  <th className="pb-4 px-3 flex items-center gap-1 cursor-pointer hover:text-stone-300">Property Details <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" /></svg></th>
                  <th className="pb-4 px-3">Location</th>
                  <th className="pb-4 px-3 w-48">Live Occupancy</th>
                  <th className="pb-4 px-3">RevPAR & ADR</th>
                  <th className="pb-4 px-3">System Status</th>
                  <th className="pb-4 px-3 text-right">Control</th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium text-stone-300">
                {properties.map((prop, idx) => (
                  <tr key={prop.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors group">
                    
                    {/* Property Name & ID */}
                    <td className="py-5 px-3">
                      <div className="font-bold text-white mb-1 flex items-center gap-2">
                         {prop.name}
                         {prop.alert && <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" title="Requires Attention"></span>}
                      </div>
                      <div className="text-[9px] uppercase tracking-widest text-stone-500 bg-white/5 px-2 py-0.5 rounded inline-block">
                        ID: {prop.id}
                      </div>
                    </td>
                    
                    {/* Location */}
                    <td className="py-5 px-3">
                      <div className="text-stone-300 mb-1">{prop.city}</div>
                      <div className="text-[9px] uppercase tracking-widest text-stone-500">{prop.region} Region</div>
                    </td>
                    
                    {/* Visual Occupancy Bar */}
                    <td className="py-5 px-3">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-[10px] font-bold text-stone-400">{prop.occupancy}% Filled</span>
                      </div>
                      <div className="w-full bg-black/50 rounded-full h-1.5 border border-white/5 overflow-hidden">
                        <div className={`h-full rounded-full transition-all duration-1000 ${
                           prop.occupancy >= 80 ? 'bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.5)]' : 
                           prop.occupancy >= 60 ? 'bg-blue-400' : 'bg-yellow-400'
                        }`} style={{ width: `${prop.occupancy}%` }}></div>
                      </div>
                    </td>
                    
                    {/* Financials */}
                    <td className="py-5 px-3">
                      <div className="text-teal-400 font-bold mb-1">{prop.revPar} <span className="text-[9px] font-normal text-stone-500 tracking-wider">/ RevPAR</span></div>
                      <div className="text-stone-400 text-xs">{prop.adr} <span className="text-[9px] text-stone-500 tracking-wider">/ ADR</span></div>
                    </td>
                    
                    {/* Status Badge */}
                    <td className="py-5 px-3">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-widest border ${
                        prop.status === 'Optimal' ? 'bg-teal-500/10 text-teal-400 border-teal-500/30' :
                        prop.status === 'High Demand' ? 'bg-orange-500/10 text-orange-400 border-orange-500/30' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
                      }`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        {prop.status}
                      </span>
                    </td>
                    
                    {/* Custom Action Dropdown */}
                    <td className="py-5 px-3 text-right relative">
                        <button 
                          onClick={() => setActivePropertyAction(activePropertyAction === prop.id ? null : prop.id)}
                          className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-stone-400 hover:text-white transition-colors"
                        >
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                        </button>
                        
                        {activePropertyAction === prop.id && (
                          <div className="absolute right-3 top-16 mt-1 w-48 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl py-2 z-50 animate-fade-in text-left">
                            <button className="w-full px-4 py-2.5 text-[11px] font-bold text-stone-300 hover:bg-white/5 hover:text-teal-400 transition-colors flex items-center gap-2">
                               <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                               Access Branch Dashboard
                            </button>
                            <button className="w-full px-4 py-2.5 text-[11px] font-bold text-stone-300 hover:bg-white/5 hover:text-teal-400 transition-colors flex items-center gap-2">
                               <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                               Manage Branch Staff
                            </button>
                            <div className="w-full h-px bg-white/10 my-1"></div>
                            <button className="w-full px-4 py-2.5 text-[11px] font-bold text-stone-400 hover:bg-white/5 transition-colors flex items-center gap-2">
                               Generate Branch Report
                            </button>
                          </div>
                        )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ChainManagement;