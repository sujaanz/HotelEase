import React, { useState } from 'react';

function RoomsSearch({ rooms, setCurrentPage }) {
  const [showMap, setShowMap] = useState(true);

  return (
    <div className="w-full min-h-screen bg-[#0a0a0a] text-stone-200 font-sans selection:bg-teal-500 selection:text-white pt-8 pb-16 px-4 md:px-8">
      
      <div className="max-w-[1400px] mx-auto">
        
        {/* Top Search Console (Glassmorphism with Voice Search) */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-3 mb-8 flex flex-col md:flex-row gap-3 items-center shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          
          <div className="flex-1 bg-black/40 rounded-xl px-4 py-3 text-white flex items-center gap-3 w-full border border-white/5 hover:border-teal-500/30 transition">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5 text-teal-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
            <div className="flex flex-col flex-1">
              <span className="text-[9px] text-stone-500 uppercase tracking-widest font-bold">Location</span>
              <span className="text-sm font-medium">Kyoto, Japan</span>
            </div>
          </div>
          
          <div className="flex-1 bg-black/40 rounded-xl px-4 py-3 text-white flex items-center gap-3 w-full border border-white/5 hover:border-teal-500/30 transition">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5 text-teal-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            <div className="flex flex-col">
              <span className="text-[9px] text-stone-500 uppercase tracking-widest font-bold">Dates</span>
              <span className="text-sm font-medium">Oct 15 - Oct 20</span>
            </div>
          </div>
          
          <div className="flex-1 bg-black/40 rounded-xl px-4 py-3 text-white flex items-center gap-3 w-full border border-white/5 hover:border-teal-500/30 transition">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5 text-teal-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            <div className="flex flex-col">
              <span className="text-[9px] text-stone-500 uppercase tracking-widest font-bold">Occupancy</span>
              <span className="text-sm font-medium">2 Adults, 1 Premium Suite</span>
            </div>
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            {/* AI Voice Command Button */}
            <button className="bg-white/10 hover:bg-white/20 text-white p-4 rounded-xl transition-all border border-white/10 shadow-sm flex items-center justify-center group">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5 text-teal-400 group-hover:scale-110 transition"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
            </button>
            <button className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-xl transition-all flex-1 shadow-[0_0_15px_rgba(20,184,166,0.3)]">
              Modify
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Sidebar: Advanced Next-Gen Filters */}
          <aside className="w-full lg:w-72 flex-shrink-0 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 h-fit">
            <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-6">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5 text-teal-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
              <h3 className="font-semibold text-white uppercase tracking-widest text-sm">Preferences</h3>
            </div>
            
            {/* Price Filter */}
            <div className="mb-8">
              <h4 className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-4">Nightly Rate (USD)</h4>
              <input type="range" className="w-full accent-teal-500 bg-black/50 h-1 rounded-full appearance-none outline-none" min="100" max="2000" />
              <div className="flex justify-between text-xs font-medium text-stone-400 mt-3">
                <span>$100</span><span>$2000+</span>
              </div>
            </div>

            {/* NEW: Experience Modes */}
            <div className="mb-8">
              <h4 className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-4">Experience Mode</h4>
              <div className="flex flex-col gap-2">
                {['Deep Sleep Optimization', 'Executive Workstation', 'Wellness & Spa Retreat'].map((mode, idx) => (
                  <button key={idx} className="text-left px-4 py-2.5 rounded-lg border border-white/10 bg-black/30 hover:bg-teal-900/30 hover:border-teal-500/30 transition text-xs font-medium text-stone-300">
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Smart Amenities */}
            <div className="mb-8">
              <h4 className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-4">Smart Amenities</h4>
              <div className="space-y-3">
                {['IoT Climate & Lighting', 'Robot Concierge', 'Biometric Entry', 'In-Room AI Assistant'].map((item, idx) => (
                  <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                      <input type="checkbox" className="peer appearance-none w-4 h-4 border border-white/20 rounded-sm bg-black/30 checked:bg-teal-500 checked:border-teal-500 transition-colors" />
                      <svg className="absolute w-3 h-3 text-black opacity-0 peer-checked:opacity-100 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                    </div>
                    <span className="text-xs font-medium text-stone-300 group-hover:text-teal-300 transition-colors">{item}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* NEW: Sustainability / Eco-Friendly */}
            <div>
              <h4 className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-4">Sustainability</h4>
              <label className="flex items-center justify-between cursor-pointer p-3 rounded-lg bg-teal-900/10 border border-teal-500/20">
                <span className="text-xs font-semibold text-teal-400">Net-Zero Carbon Rooms</span>
                <div className="relative">
                  <input type="checkbox" className="peer sr-only" />
                  <div className="w-8 h-4 bg-black/50 rounded-full border border-white/20 peer-checked:bg-teal-500 transition-colors"></div>
                  <div className="absolute left-1 top-0.5 w-3 h-3 bg-white rounded-full peer-checked:translate-x-3 transition-transform"></div>
                </div>
              </label>
            </div>
          </aside>

          {/* Middle/Right: Hotel Results & Map */}
          <section className="flex-1 flex flex-col xl:flex-row gap-8">
            
            {/* Hotel List */}
            <div className={`flex-1 flex flex-col gap-5 ${showMap ? 'xl:w-1/2' : 'w-full'}`}>
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-light text-white tracking-wide">
                  Curated Selections 
                  <span className="text-teal-400 text-xs bg-teal-900/30 border border-teal-500/20 px-3 py-1 rounded-full ml-3 font-semibold uppercase tracking-wider">
                    {rooms ? rooms.length : 0} Matches
                  </span>
                </h2>
                <button 
                  onClick={() => setShowMap(!showMap)} 
                  className="xl:hidden bg-white/5 text-stone-300 px-4 py-2 rounded-lg text-xs font-bold border border-white/10 uppercase tracking-wider hover:bg-white/10"
                >
                  {showMap ? 'Hide Map' : 'Show Map'}
                </button>
              </div>

              {/* Check if rooms data exists */}
              {rooms && rooms.length > 0 ? (
                rooms.map((room, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-4 flex flex-col sm:flex-row gap-5 hover:border-teal-500/50 hover:bg-white/10 transition-all duration-300 group">
                    
                    {/* Room Image & 3D Twin Button */}
                    <div className="w-full sm:w-64 h-48 bg-black rounded-xl overflow-hidden flex-shrink-0 relative">
                       <img src={`https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80`} alt="Room" className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition duration-700" />
                       
                       {/* Floating Action Buttons */}
                       <div className="absolute top-3 right-3 flex gap-2">
                         <button className="w-8 h-8 bg-black/50 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-stone-400 hover:text-white hover:border-white transition">
                           <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
                         </button>
                       </div>

                       {/* NEW: 3D Digital Twin Option */}
                       <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                         <button className="bg-white/20 backdrop-blur-md border border-white/40 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition flex items-center gap-2">
                           <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" /></svg>
                           Launch 3D Twin
                         </button>
                       </div>
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="text-2xl font-light text-white tracking-wide">Suite {room.room_number || room.id}</h3>
                          
                          {/* AI Match Score Badge */}
                          <div className="flex items-center gap-1.5 bg-teal-500/10 px-2.5 py-1 rounded border border-teal-500/30 text-[10px] font-bold uppercase tracking-widest text-teal-400">
                            AI Match: 98%
                          </div>
                        </div>
                        <p className="text-xs font-light text-stone-400 mt-1 uppercase tracking-wider">{room.room_type || room.type || 'Intelligent Premium Suite'}</p>
                        
                        <div className="flex flex-wrap gap-2 mt-4">
                          <span className="text-[10px] font-semibold bg-white/5 border border-white/10 text-stone-300 px-2.5 py-1 rounded-md flex items-center gap-1">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-3 h-3 text-teal-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            Eco-Smart
                          </span>
                          <span className="text-[10px] font-semibold bg-white/5 border border-white/10 text-stone-300 px-2.5 py-1 rounded-md flex items-center gap-1">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-3 h-3 text-teal-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" /></svg>
                            Biometric
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-end mt-6 sm:mt-0 pt-4 sm:pt-0">
                        <div>
                          <p className="text-3xl font-light text-white">${room.price_per_night || room.price || '450'} <span className="text-xs text-stone-500 font-medium">/ night</span></p>
                          <p className="text-[10px] text-teal-400 mt-1 uppercase tracking-widest font-semibold">Dynamic Price Locked</p>
                        </div>
                        <button 
                          onClick={() => setCurrentPage('checkout')} 
                          className="bg-teal-600 text-white px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-teal-500 hover:shadow-[0_0_15px_rgba(20,184,166,0.4)] transition-all"
                        >
                          Reserve
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                /* Elegant Loading State */
                <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
                   <svg className="w-10 h-10 text-teal-500 mb-4 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                   </svg>
                   <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-2">Syncing Data</h3>
                   <p className="text-xs font-light text-stone-500 max-w-xs">Connecting to secure servers to fetch real-time availability.</p>
                </div>
              )}
            </div>

            {/* Map View Panel (Elegant, not hacker-style) */}
            {showMap && (
              <div className="flex-1 rounded-2xl border border-white/10 overflow-hidden relative min-h-[400px] xl:min-h-full xl:sticky xl:top-8 h-fit hidden xl:block bg-[#0f0f0f]">
                 
                 {/* Dark Elegant Map Image */}
                 <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80" alt="Map" className="w-full h-full object-cover opacity-40 grayscale mix-blend-lighten" />
                 
                 {/* Subtle gradient overlay */}
                 <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
                 
                 {/* Map Location Pulse */}
                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                   <div className="relative flex items-center justify-center">
                     <div className="absolute w-24 h-24 bg-teal-500/20 rounded-full animate-ping"></div>
                     <div className="w-4 h-4 bg-teal-400 rounded-full border-2 border-white shadow-[0_0_15px_rgba(20,184,166,0.8)]"></div>
                   </div>
                 </div>

                 {/* Floating Info Box */}
                 <div className="absolute bottom-6 left-6 right-6 bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/10 flex justify-between items-center shadow-lg">
                   <div>
                     <h4 className="text-xs font-bold text-white uppercase tracking-widest">Live Interactive Map</h4>
                     <p className="text-[10px] text-stone-400 mt-1">Showing {rooms ? rooms.length : 0} properties in selected area</p>
                   </div>
                   <button className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center text-white hover:bg-teal-500 transition">
                     <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
                   </button>
                 </div>
              </div>
            )}

          </section>
        </div>
      </div>
    </div>
  );
}

export default RoomsSearch;