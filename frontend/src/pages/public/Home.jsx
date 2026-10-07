import React, { useState } from 'react';

function Home({ setCurrentPage }) {
  const [searchMode, setSearchMode] = useState('smart');

  return (
    <div className="w-full bg-[#030303] text-stone-200 font-sans overflow-hidden selection:bg-teal-500 selection:text-white relative">
      
      {/* 🌟 Floating AI Concierge Orb */}
      <div className="fixed bottom-8 right-8 z-[100] group cursor-pointer" onClick={() => setCurrentPage('aiconcierge')}>
        <div className="relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14">
          <div className="absolute inset-0 bg-teal-500/20 rounded-full blur-xl animate-pulse group-hover:bg-teal-500/50 transition-all duration-500"></div>
          <div className="relative w-10 h-10 md:w-12 md:h-12 bg-gradient-to-tr from-black to-[#121212] border border-teal-500/40 rounded-full shadow-[0_0_20px_rgba(20,184,166,0.3)] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <span className="text-base md:text-lg">✨</span>
          </div>
          <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
            <span className="text-[10px] font-bold text-white uppercase tracking-widest">Ask AI Guide</span>
          </div>
        </div>
      </div>

      {/* 1. Hero Section & AI Predictor */}
      <section className="relative w-full h-[90vh] min-h-[650px] flex flex-col justify-center items-center px-4 md:px-8">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[0%] left-[20%] w-[40%] h-[50%] bg-teal-500/10 blur-[150px] rounded-full animate-pulse"></div>
          <div className="absolute bottom-[10%] right-[20%] w-[30%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-[0.2]"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542314831-c6a4d14d4c57?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')" }}
          ></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center mt-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.02] border border-white/10 backdrop-blur-md mb-6 shadow-[0_0_15px_rgba(20,184,166,0.05)]">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping"></span>
            <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-teal-400">Welcome to HotelEase</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-5 leading-[1.05]">
            Redefining Luxury. <br className="hidden md:block"/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-teal-100 to-teal-500">
              Intelligently.
            </span>
          </h1>
          <p className="text-xs md:text-sm font-medium text-stone-400 max-w-2xl mx-auto leading-relaxed">
            Experience the world's first AI-driven hospitality ecosystem. Book ultra-premium suites, manage your stay from your phone, and enjoy unparalleled comfort.
          </p>
        </div>

        {/* AI Smart Search Console */}
        <div className="relative z-20 w-full max-w-2xl bg-[#0a0a0a]/80 backdrop-blur-2xl p-4 md:p-6 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-white/5">
          <div className="flex justify-center mb-5 gap-1 bg-black/40 p-1 rounded-full w-max mx-auto border border-white/5">
            <button 
              onClick={() => setSearchMode('smart')}
              className={`text-[9px] font-bold uppercase tracking-widest px-6 py-2 rounded-full transition-all ${searchMode === 'smart' ? 'bg-teal-500 text-black shadow-[0_0_15px_rgba(20,184,166,0.3)]' : 'text-stone-500 hover:text-stone-300'}`}
            >
              AI Booking
            </button>
            <button 
              onClick={() => setSearchMode('manual')}
              className={`text-[9px] font-bold uppercase tracking-widest px-6 py-2 rounded-full transition-all ${searchMode === 'manual' ? 'bg-white/10 text-white shadow-sm border border-white/5' : 'text-stone-500 hover:text-stone-300'}`}
            >
              Manual Search
            </button>
          </div>

          {searchMode === 'smart' ? (
            <div className="relative flex flex-col gap-3 group/input">
              <div className="relative flex items-center">
                <div className="absolute left-4 flex items-center gap-1.5 text-[9px] font-black text-teal-400 tracking-widest uppercase">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  AI
                </div>
                <input 
                  type="text" 
                  placeholder="e.g., A private villa in Maldives for 2 adults next weekend..." 
                  className="w-full bg-[#050505] border border-white/5 rounded-xl py-4 pl-12 pr-32 text-xs font-medium text-white placeholder-stone-600 outline-none focus:border-teal-500/30 transition-all shadow-inner"
                />
                <button 
                  onClick={() => setCurrentPage('rooms')}
                  className="absolute right-2 top-2 bottom-2 bg-gradient-to-r from-teal-600 to-teal-400 text-black px-6 rounded-lg font-black text-[9px] uppercase tracking-widest hover:shadow-[0_0_15px_rgba(20,184,166,0.4)] transition-all"
                >
                  Generate
                </button>
              </div>
              {/* AI Demand Insight */}
              <div className="flex justify-between items-center px-2">
                <p className="text-[9px] font-medium text-stone-500 flex items-center gap-1.5">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-3 h-3 text-green-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                  <span className="text-green-400 font-bold">AI Insight:</span> High availability next weekend. Save ~12%.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-3">
              <input type="text" placeholder="Destination or Hotel" className="flex-1 bg-[#050505] border border-white/5 rounded-xl py-4 px-4 text-xs font-medium text-white placeholder-stone-600 outline-none focus:border-white/20 shadow-inner" />
              <input type="date" className="flex-1 bg-[#050505] border border-white/5 rounded-xl py-4 px-4 text-xs font-medium text-stone-400 outline-none focus:border-white/20 shadow-inner [color-scheme:dark]" />
              <button onClick={() => setCurrentPage('rooms')} className="bg-white text-black px-8 py-4 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-stone-200 transition-colors">Search</button>
            </div>
          )}
        </div>
      </section>

      {/* 2. Signature Accommodations (NEW ROOMS) */}
      <section className="max-w-[1500px] mx-auto px-4 md:px-8 py-20 relative border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <span className="text-teal-400 text-[9px] font-bold uppercase tracking-widest mb-2 block">Our Rooms</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-2">Signature Accommodations</h2>
            <p className="text-sm font-medium text-stone-400 max-w-lg">From cozy executive rooms to expansive oceanfront villas, find the perfect space for your stay.</p>
          </div>
          <button onClick={() => setCurrentPage('rooms')} className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-[9px] font-bold uppercase tracking-widest text-white transition-all">
            View All Rooms
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] overflow-hidden group hover:border-white/10 transition-colors">
            <div className="relative h-60 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Presidential Suite" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white border border-white/10">$450 / night</div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">Presidential Penthouse</h3>
              <p className="text-xs text-stone-400 mb-4 leading-relaxed">Top floor panoramic city views, private jacuzzi, and expansive living area.</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-stone-500">
                  <span className="flex items-center gap-1 text-[10px] font-bold uppercase"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg> 4 Guests</span>
                  <span className="flex items-center gap-1 text-[10px] font-bold uppercase"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg> 120m²</span>
                </div>
                <button onClick={() => setCurrentPage('rooms')} className="text-[10px] font-bold text-teal-400 hover:text-teal-300 uppercase tracking-widest">Book Now →</button>
              </div>
            </div>
          </div>

          <div className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] overflow-hidden group hover:border-white/10 transition-colors">
            <div className="relative h-60 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Ocean Villa" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white border border-white/10">$850 / night</div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">Oceanfront Pool Villa</h3>
              <p className="text-xs text-stone-400 mb-4 leading-relaxed">Direct beach access, private infinity pool, and dedicated butler service.</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-stone-500">
                  <span className="flex items-center gap-1 text-[10px] font-bold uppercase"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg> 2 Guests</span>
                  <span className="flex items-center gap-1 text-[10px] font-bold uppercase"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg> 180m²</span>
                </div>
                <button onClick={() => setCurrentPage('rooms')} className="text-[10px] font-bold text-teal-400 hover:text-teal-300 uppercase tracking-widest">Book Now →</button>
              </div>
            </div>
          </div>

          <div className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] overflow-hidden group hover:border-white/10 transition-colors">
            <div className="relative h-60 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Executive Room" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white border border-white/10">$250 / night</div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">Smart Executive Room</h3>
              <p className="text-xs text-stone-400 mb-4 leading-relaxed">Perfect for business travelers. Ergonomic workspace and full IoT climate control.</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-stone-500">
                  <span className="flex items-center gap-1 text-[10px] font-bold uppercase"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg> 2 Guests</span>
                  <span className="flex items-center gap-1 text-[10px] font-bold uppercase"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg> 45m²</span>
                </div>
                <button onClick={() => setCurrentPage('rooms')} className="text-[10px] font-bold text-teal-400 hover:text-teal-300 uppercase tracking-widest">Book Now →</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. RESTORED: 360° VR Previews (+ WebXR Badge) */}
      <section className="py-20 px-4 md:px-8 relative border-t border-white/5">
        <div className="absolute inset-0 bg-white/[0.01] border-y border-white/5 pointer-events-none"></div>
        <div className="max-w-[1500px] mx-auto text-center relative z-10">
          <span className="text-blue-400 text-[9px] font-bold uppercase tracking-widest mb-2 block">Virtual Reality</span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-8">Don't just look. <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Step inside.</span></h2>
          
          <div className="relative w-full h-[400px] md:h-[500px] rounded-[2rem] md:rounded-[3rem] overflow-hidden group cursor-pointer border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-all duration-700 z-10 backdrop-blur-[1px] group-hover:backdrop-blur-0"></div>
            <img src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="VR Room" className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-1000" />
            
            {/* Spatial Ready Badge */}
            <div className="absolute top-6 right-6 z-30 bg-black/50 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
              <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse shadow-[0_0_8px_#c084fc]"></span>
              <span className="text-[8px] font-bold text-white uppercase tracking-widest">WebXR / Spatial Ready</span>
            </div>

            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="px-6 py-3 bg-black/50 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20 group-hover:bg-white group-hover:text-black group-hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                Launch 360 Tour
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Smart Room IoT Integration (Original 4 Cards + Eco) */}
      <section className="max-w-[1500px] mx-auto px-4 md:px-8 py-20 relative border-t border-white/5">
        <div className="absolute left-0 top-1/2 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          <div className="w-full lg:w-1/2 space-y-4 relative z-10">
            <span className="text-teal-400 text-[9px] font-bold uppercase tracking-widest mb-1 block">IoT Connected Stays</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1]">
              Control your sanctuary <br/><span className="text-teal-400">from your phone.</span>
            </h2>
            <p className="text-stone-400 font-medium leading-relaxed text-sm max-w-md mb-8">
              Every HotelEase premium suite comes equipped with smart room technology. Adjust the mood lighting, draw the curtains, or set the perfect AC temperature before you even step inside.
            </p>
            
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="bg-[#0a0a0a] border border-white/5 p-4 md:p-5 rounded-[1.5rem] flex flex-col items-center justify-center cursor-pointer hover:bg-white/[0.02] hover:border-white/10 transition-colors">
                <span className="text-[9px] font-black text-teal-400 uppercase tracking-widest mb-1">CLIMATE</span>
                <span className="text-xs font-bold text-white">22°C Controlled</span>
              </div>
              <div className="bg-gradient-to-b from-teal-900/20 to-black border border-teal-500/30 p-4 md:p-5 rounded-[1.5rem] flex flex-col items-center justify-center cursor-pointer shadow-[0_0_15px_rgba(20,184,166,0.1)]">
                <span className="text-[9px] font-black text-teal-400 uppercase tracking-widest mb-1">AMBIENCE</span>
                <span className="text-xs font-bold text-white">Relax Mode</span>
              </div>
              <div className="bg-[#0a0a0a] border border-white/5 p-4 md:p-5 rounded-[1.5rem] flex flex-col items-center justify-center cursor-pointer hover:bg-white/[0.02] hover:border-white/10 transition-colors">
                <span className="text-[9px] font-black text-teal-400 uppercase tracking-widest mb-1">AUDIO</span>
                <span className="text-xs font-bold text-white">Spatial Sync</span>
              </div>
              <div className="bg-[#0a0a0a] border border-white/5 p-4 md:p-5 rounded-[1.5rem] flex flex-col items-center justify-center cursor-pointer hover:bg-white/[0.02] hover:border-white/10 transition-colors">
                <span className="text-[9px] font-black text-teal-400 uppercase tracking-widest mb-1">SECURITY</span>
                <span className="text-xs font-bold text-white">Biometric Active</span>
              </div>
              {/* Eco Telemetry */}
              <div className="col-span-2 bg-gradient-to-r from-[#050505] to-green-900/10 border border-green-500/20 p-4 rounded-[1.5rem] flex items-center justify-between hover:border-green-500/40 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-400">
                    <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2a9.985 9.985 0 0 1 8 3h-3v2h7V0h-2v2.735A11.954 11.954 0 0 0 12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12h-2c0 5.523-4.477 10-10 10z"/></svg>
                  </div>
                  <div>
                    <span className="text-[9px] font-black text-green-400 uppercase tracking-widest block mb-0.5">Eco-Telemetry</span>
                    <span className="text-[10px] font-medium text-stone-300">100% Carbon Neutral AI Ops</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-teal-500 to-blue-600 rounded-[2.5rem] transform rotate-3 blur-lg opacity-20"></div>
            <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Smart Room" className="relative rounded-[2.5rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10 w-full object-cover h-[350px] md:h-[500px]" />
          </div>
        </div>
      </section>

      {/* 5. Premium Amenities */}
      <section className="max-w-[1500px] mx-auto px-4 md:px-8 py-20 border-t border-white/5">
        <div className="text-center mb-16">
          <span className="text-teal-400 text-[9px] font-bold uppercase tracking-widest mb-2 block">Experiences</span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">Beyond the Room</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[2rem] hover:bg-white/[0.02] transition-colors">
            <div className="w-12 h-12 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-4 text-teal-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="text-sm font-bold text-white mb-2">Wellness & Spa</h3>
            <p className="text-[10px] text-stone-400 leading-relaxed">Rejuvenate with world-class therapies and massages.</p>
          </div>
          
          <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[2rem] hover:bg-white/[0.02] transition-colors">
            <div className="w-12 h-12 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-4 text-teal-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" /></svg>
            </div>
            <h3 className="text-sm font-bold text-white mb-2">Fine Dining</h3>
            <p className="text-[10px] text-stone-400 leading-relaxed">Michelin-starred chefs preparing global cuisines.</p>
          </div>

          <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[2rem] hover:bg-white/[0.02] transition-colors">
            <div className="w-12 h-12 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-4 text-teal-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
            </div>
            <h3 className="text-sm font-bold text-white mb-2">Infinity Pools</h3>
            <p className="text-[10px] text-stone-400 leading-relaxed">Temperature-controlled pools with panoramic views.</p>
          </div>

          <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[2rem] hover:bg-white/[0.02] transition-colors">
            <div className="w-12 h-12 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-4 text-teal-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h3 className="text-sm font-bold text-white mb-2">Smart Gym</h3>
            <p className="text-[10px] text-stone-400 leading-relaxed">24/7 access to AI-powered fitness equipment.</p>
          </div>
        </div>
      </section>

      {/* 6. Expanded Destinations (6 Locations) */}
      <section className="max-w-[1500px] mx-auto px-4 md:px-8 py-20 border-t border-white/5">
        <div className="flex flex-col justify-center items-center text-center mb-12 gap-2">
          <span className="text-teal-400 text-[9px] font-bold uppercase tracking-widest block">Locations</span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">Explore the World</h2>
          <p className="text-sm font-medium text-stone-400 max-w-lg">Discover our curated selection of ultra-luxury properties across the globe.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {[
            { name: 'Kyoto, Japan', desc: 'Zen meets Smart Tech', img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80' },
            { name: 'Maldives', desc: 'Overwater Luxury', img: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80' },
            { name: 'Dubai, UAE', desc: 'Skyline Penthouses', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80' },
            { name: 'Paris, France', desc: 'Eiffel View Suites', img: 'https://images.unsplash.com/photo-1502602898657-3e9076006e00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80' },
            { name: 'Swiss Alps', desc: 'Winter Chalets', img: 'https://images.unsplash.com/photo-1531366936336-62fc674621c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80' },
            { name: 'Bali, Indonesia', desc: 'Jungle Retreats', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80' }
          ].map((dest, idx) => (
            <div 
              key={idx} 
              className="relative h-[250px] md:h-[300px] rounded-[1.5rem] overflow-hidden group cursor-pointer border border-white/5" 
              onClick={() => setCurrentPage('rooms')}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/20 to-transparent z-10 transition-opacity duration-500"></div>
              <img src={dest.img} alt={dest.name} className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-1000" />
              
              <div className="absolute bottom-5 left-5 z-20">
                <h3 className="text-white font-bold text-xl md:text-2xl mb-1">{dest.name}</h3>
                <p className="text-[10px] text-stone-300 font-medium uppercase tracking-widest">{dest.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. VIP Loyalty Tiers */}
      <section className="max-w-[1500px] mx-auto px-4 md:px-8 py-20 border-t border-white/5">
        <div className="text-center mb-12">
          <span className="text-teal-400 text-[9px] font-bold uppercase tracking-widest mb-2 block">Membership</span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">The Inner Circle Privileges</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="bg-[#0a0a0a] border border-white/5 p-6 md:p-8 rounded-[2rem] flex flex-col justify-between group">
            <div>
              <span className="text-[9px] font-black text-stone-500 uppercase tracking-widest">Tier 01</span>
              <h3 className="text-2xl font-black mt-2 mb-4 text-white">Silver Access</h3>
              <p className="text-stone-400 text-sm font-medium mb-6">Complimentary high-speed satellite internet and priority late checkout.</p>
              <div className="flex items-center gap-2 mb-6">
                <span className="bg-white/5 border border-white/10 px-2 py-1 rounded-md text-[8px] font-bold text-stone-300 uppercase flex items-center gap-1"> Wallet Key</span>
              </div>
            </div>
            <button onClick={() => setCurrentPage('auth')} className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-[9px] font-black uppercase tracking-widest text-white transition-all">Join Free</button>
          </div>

          <div className="bg-gradient-to-b from-[#0a0a0a] to-[#050505] border border-teal-500/30 p-6 md:p-8 rounded-[2rem] flex flex-col justify-between relative shadow-[0_0_30px_rgba(20,184,166,0.05)] md:-translate-y-2 group">
            <span className="absolute -top-3 right-8 bg-teal-500 text-black text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full">Popular</span>
            <div>
              <span className="text-[9px] font-black text-teal-400 uppercase tracking-widest">Tier 02</span>
              <h3 className="text-2xl font-black mt-2 mb-4 text-white">Gold Elite</h3>
              <p className="text-stone-300 text-sm font-medium mb-6">Complimentary airport transfers, daily spa credits, and room upgrades.</p>
              <div className="flex items-center gap-2 mb-6">
                <span className="bg-teal-500/10 border border-teal-500/20 px-2 py-1 rounded-md text-[8px] font-bold text-teal-400 uppercase flex items-center gap-1"> Wallet Key</span>
                <span className="bg-blue-500/10 border border-blue-500/20 px-2 py-1 rounded-md text-[8px] font-bold text-blue-400 uppercase flex items-center gap-1">G-Pay Ready</span>
              </div>
            </div>
            <button onClick={() => setCurrentPage('auth')} className="w-full py-3 bg-teal-500 hover:bg-teal-400 rounded-xl text-[9px] font-black uppercase tracking-widest text-black transition-all">Upgrade Now</button>
          </div>

          <div className="bg-[#0a0a0a] border border-white/5 p-6 md:p-8 rounded-[2rem] flex flex-col justify-between group">
            <div>
              <span className="text-[9px] font-black text-stone-500 uppercase tracking-widest">Tier 03</span>
              <h3 className="text-2xl font-black mt-2 mb-4 text-white">Platinum Reserve</h3>
              <p className="text-stone-400 text-sm font-medium mb-6">Dedicated 24/7 private butler, private helicopter access, and custom dining.</p>
              <div className="flex items-center gap-2 mb-6">
                <span className="bg-purple-500/10 border border-purple-500/20 px-2 py-1 rounded-md text-[8px] font-bold text-purple-400 uppercase flex items-center gap-1">Biometric + All Keys</span>
              </div>
            </div>
            <button onClick={() => setCurrentPage('auth')} className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-[9px] font-black uppercase tracking-widest text-white transition-all">Request Access</button>
          </div>
        </div>
      </section>

      {/* 8. Mobile App Download Section */}
      <section className="max-w-[1500px] mx-auto px-4 md:px-8 py-20 border-t border-white/5 mb-10">
        <div className="bg-gradient-to-r from-teal-900/20 to-blue-900/10 border border-white/10 rounded-[2.5rem] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="w-full md:w-1/2">
            <span className="text-teal-400 text-[9px] font-bold uppercase tracking-widest mb-2 block">HotelEase App</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">Your Room Key <br/> is Your Phone.</h2>
            <p className="text-stone-300 font-medium text-sm mb-8 max-w-md leading-relaxed">
              Skip the front desk. Use the HotelEase app to unlock your door, order room service, and customize your room's climate from anywhere.
            </p>
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-white text-black rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-stone-200 transition-colors">
                App Store
              </button>
              <button className="px-6 py-3 bg-transparent border border-white/30 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">
                Google Play
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="w-64 h-96 bg-black border-[4px] border-white/10 rounded-[3rem] p-4 relative shadow-[0_20px_50px_rgba(20,184,166,0.1)]">
              <div className="w-full h-full bg-[#0a0a0a] rounded-[2rem] border border-white/5 flex flex-col items-center justify-center p-6">
                <div className="w-16 h-16 rounded-full bg-teal-500/10 flex items-center justify-center mb-4 border border-teal-500/20">
                  <svg className="w-8 h-8 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                </div>
                <h4 className="text-white font-bold text-lg">Tap to Unlock</h4>
                <p className="text-[10px] text-stone-500 mt-2 text-center">NFC Digital Key Active</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;