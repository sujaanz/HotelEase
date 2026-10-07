import React, { useState, useEffect } from 'react';

function Home({ setCurrentPage }) {
  const [searchMode, setSearchMode] = useState('smart');
  
  // Interactive Search States
  const [aiSearchInput, setAiSearchInput] = useState('');
  const [manualSearch, setManualSearch] = useState({ destination: '', date: '' });
  const [isProcessing, setIsProcessing] = useState(false);

  // 360 VR Modal State
  const [isVrModalOpen, setIsVrModalOpen] = useState(false);
  const [vrProgress, setVrProgress] = useState(0);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState('');

  // Fully Functional IoT Room Switches (Clickable Cards)
  const [iotStates, setIotStates] = useState({
    climate: true,
    ambience: false,
    audio: true,
    security: true,
    eco: true
  });

  const toggleIot = (key) => {
    setIotStates(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleAppDownload = (platform) => {
    showToast(`Secure gateway initiating for ${platform}...`);
  };

  const handleSearchSubmit = () => {
    setIsProcessing(true);
    
    // হোম পেজের সার্চ কুয়েরি লোকাল স্টোরেজে সেভ করা হচ্ছে যাতে Rooms পেজ রিসিভ করতে পারে
    if (searchMode === 'smart') {
      localStorage.setItem('hotelSearchQuery', aiSearchInput);
    } else {
      localStorage.setItem('hotelSearchQuery', manualSearch.destination);
    }

    // Simulate AI Processing time before routing
    setTimeout(() => {
      setIsProcessing(false);
      setCurrentPage('rooms');
    }, 1500);
  };

  // Simulate VR Loading Progress
  useEffect(() => {
    if (isVrModalOpen) {
      setVrProgress(0);
      const interval = setInterval(() => {
        setVrProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 5;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isVrModalOpen]);

  return (
    <div className="w-full bg-[#020202] text-stone-200 font-sans overflow-hidden selection:bg-cyan-500 selection:text-black relative">
      
      {/* Custom Cyber Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] bg-[#0a0a0a]/90 backdrop-blur-xl border border-cyan-500/50 px-6 py-3 rounded-2xl shadow-[0_0_30px_rgba(6,182,212,0.3)] animate-fade-in-up flex items-center gap-3">
          <span className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></span>
          <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">{toastMessage}</span>
        </div>
      )}

      {/* Floating AI Concierge Orb */}
      <div className="fixed bottom-8 right-8 z-[100] group cursor-pointer active:scale-95 transition-transform" onClick={() => setCurrentPage('aiconcierge')}>
        <div className="relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14">
          <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-xl animate-pulse group-hover:bg-cyan-500/50 transition-all duration-500"></div>
          <div className="relative w-10 h-10 md:w-12 md:h-12 bg-[#050505] border border-cyan-500/40 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.3)] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5 text-cyan-400">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-lg">
            <span className="text-[9px] font-black text-white uppercase tracking-widest">Ask AI Guide</span>
          </div>
        </div>
      </div>

      {/* 1. Hero Section & AI Predictor */}
      <section className="relative w-full h-[90vh] min-h-[650px] flex flex-col justify-center items-center px-4 md:px-8">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[0%] left-[20%] w-[40%] h-[50%] bg-teal-500/10 blur-[150px] rounded-full animate-pulse"></div>
          <div className="absolute bottom-[10%] right-[20%] w-[30%] h-[40%] bg-cyan-600/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-[0.15]"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542314831-c6a4d14d4c57?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')" }}
          ></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center mt-4 mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.02] border border-white/10 backdrop-blur-md mb-6 shadow-inner">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="text-[9px] font-black tracking-[0.2em] uppercase text-cyan-400">Welcome to HotelEase</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-5 leading-[1.05]">
            Redefining Luxury. <br className="hidden md:block"/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-teal-100 to-cyan-400">
              Intelligently.
            </span>
          </h1>
          <p className="text-xs md:text-sm font-bold text-stone-400 max-w-2xl mx-auto leading-relaxed">
            Experience the world's first AI-driven hospitality ecosystem. Book ultra-premium suites, manage your stay from your phone, and enjoy unparalleled comfort.
          </p>
        </div>

        {/* AI Smart Search Console */}
        <div className="relative z-20 w-full max-w-2xl bg-[#060606]/90 backdrop-blur-2xl p-5 md:p-6 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-white/10 transition-all">
          <div className="flex justify-center mb-5 gap-1 bg-[#0a0a0a] p-1.5 rounded-2xl w-max mx-auto border border-white/5 shadow-inner">
            <button 
              onClick={() => setSearchMode('smart')}
              className={`text-[9px] font-black uppercase tracking-widest px-6 py-2.5 rounded-xl transition-all cursor-pointer active:scale-95 ${searchMode === 'smart' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-stone-500 hover:text-stone-300'}`}
            >
              AI Search
            </button>
            <button 
              onClick={() => setSearchMode('manual')}
              className={`text-[9px] font-black uppercase tracking-widest px-6 py-2.5 rounded-xl transition-all cursor-pointer active:scale-95 ${searchMode === 'manual' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-stone-500 hover:text-stone-300'}`}
            >
              Manual Grid
            </button>
          </div>

          {searchMode === 'smart' ? (
            <div className="relative flex flex-col gap-3 group/input">
              <div className="relative flex items-center">
                <div className="absolute left-5 flex items-center gap-2 text-[9px] font-black text-cyan-400 tracking-widest uppercase">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  AI
                </div>
                <input 
                  type="text" 
                  value={aiSearchInput}
                  onChange={(e) => setAiSearchInput(e.target.value)}
                  placeholder="e.g., A private villa in Maldives for 2 adults next weekend..." 
                  disabled={isProcessing}
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl py-4.5 pl-16 pr-36 text-xs font-bold text-white placeholder-stone-600 outline-none focus:border-cyan-400 transition-all shadow-inner disabled:opacity-50"
                />
                <button 
                  onClick={handleSearchSubmit}
                  disabled={isProcessing}
                  className="absolute right-2 top-2 bottom-2 bg-gradient-to-r from-teal-600 to-cyan-500 text-black px-6 rounded-xl font-black text-[9px] uppercase tracking-widest hover:from-teal-500 hover:to-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all cursor-pointer active:scale-95 flex items-center justify-center min-w-[100px]"
                >
                  {isProcessing ? (
                    <svg className="animate-spin h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : 'Generate'}
                </button>
              </div>
              <div className="flex justify-between items-center px-3">
                <p className="text-[9px] font-bold text-stone-500 flex items-center gap-1.5 uppercase tracking-widest">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-3.5 h-3.5 text-cyan-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                  <span className="text-cyan-400">Insight:</span> High availability next weekend. Save ~12%.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-3">
              <input 
                type="text" 
                value={manualSearch.destination}
                onChange={(e) => setManualSearch({...manualSearch, destination: e.target.value})}
                placeholder="Destination or Node" 
                disabled={isProcessing}
                className="flex-1 bg-[#0a0a0a] border border-white/10 rounded-2xl py-4 px-5 text-xs font-bold text-white placeholder-stone-600 outline-none focus:border-cyan-400 shadow-inner disabled:opacity-50 transition-all" 
              />
              <input 
                type="date" 
                value={manualSearch.date}
                onChange={(e) => setManualSearch({...manualSearch, date: e.target.value})}
                disabled={isProcessing}
                className="flex-1 bg-[#0a0a0a] border border-white/10 rounded-2xl py-4 px-5 text-xs font-bold text-stone-400 outline-none focus:border-cyan-400 shadow-inner [color-scheme:dark] disabled:opacity-50 transition-all" 
              />
              <button 
                onClick={handleSearchSubmit} 
                disabled={isProcessing}
                className="bg-gradient-to-r from-teal-600 to-cyan-500 text-black px-8 py-4 rounded-2xl font-black text-[9px] uppercase tracking-widest hover:from-teal-500 hover:to-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all cursor-pointer active:scale-95 flex items-center justify-center min-w-[120px]"
              >
                {isProcessing ? 'Scanning...' : 'Search'}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 2. Signature Accommodations */}
      <section className="max-w-[1550px] mx-auto px-4 md:px-8 py-20 relative border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <span className="text-cyan-400 text-[9px] font-black uppercase tracking-widest mb-2 block">Our Nodes</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-2 text-white">Signature Accommodations</h2>
            <p className="text-sm font-bold text-stone-500 max-w-lg">From cozy executive nodes to expansive oceanfront villas, find the perfect space for your stay.</p>
          </div>
          <button onClick={() => setCurrentPage('rooms')} className="px-6 py-3.5 bg-[#050505] hover:bg-white/5 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest text-white transition-all shadow-lg cursor-pointer active:scale-95">
            View All Nodes
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Presidential Penthouse */}
          <div className="bg-[#060606] border border-white/10 rounded-[2.5rem] overflow-hidden group hover:border-cyan-500/40 transition-colors shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <div className="relative h-60 overflow-hidden shadow-inner">
              <img src="https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Presidential Suite" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100" />
              <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black font-mono text-white border border-white/10">$450 / night</div>
            </div>
            <div className="p-8">
              <h3 className="text-xl font-black text-white mb-2 tracking-tight">Presidential Penthouse</h3>
              <p className="text-xs font-bold text-stone-500 mb-6 leading-relaxed">Top floor panoramic city views, private jacuzzi, and expansive living area.</p>
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex items-center gap-3 text-stone-400">
                  <span className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest"><svg className="w-3.5 h-3.5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg> 4 Guests</span>
                  <span className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest"><svg className="w-3.5 h-3.5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg> 120m²</span>
                </div>
                <button onClick={() => setCurrentPage('rooms')} className="text-[9px] font-black text-cyan-400 hover:text-white uppercase tracking-widest cursor-pointer active:scale-95 transition-transform">Book Now →</button>
              </div>
            </div>
          </div>

          {/* Oceanfront Pool Villa */}
          <div className="bg-[#060606] border border-white/10 rounded-[2.5rem] overflow-hidden group hover:border-cyan-500/40 transition-colors shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <div className="relative h-60 overflow-hidden shadow-inner">
              <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Ocean Villa" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100" />
              <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black font-mono text-white border border-white/10">$850 / night</div>
            </div>
            <div className="p-8">
              <h3 className="text-xl font-black text-white mb-2 tracking-tight">Oceanfront Pool Villa</h3>
              <p className="text-xs font-bold text-stone-500 mb-6 leading-relaxed">Direct beach access, private infinity pool, and dedicated neural butler service.</p>
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex items-center gap-3 text-stone-400">
                  <span className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest"><svg className="w-3.5 h-3.5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg> 2 Guests</span>
                  <span className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest"><svg className="w-3.5 h-3.5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg> 180m²</span>
                </div>
                <button onClick={() => setCurrentPage('rooms')} className="text-[9px] font-black text-cyan-400 hover:text-white uppercase tracking-widest cursor-pointer active:scale-95 transition-transform">Book Now →</button>
              </div>
            </div>
          </div>

          {/* Executive Room */}
          <div className="bg-[#060606] border border-white/10 rounded-[2.5rem] overflow-hidden group hover:border-cyan-500/40 transition-colors shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <div className="relative h-60 overflow-hidden shadow-inner">
              <img src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Executive Room" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100" />
              <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black font-mono text-white border border-white/10">$250 / night</div>
            </div>
            <div className="p-8">
              <h3 className="text-xl font-black text-white mb-2 tracking-tight">Smart Executive Node</h3>
              <p className="text-xs font-bold text-stone-500 mb-6 leading-relaxed">Perfect for business travelers. Ergonomic workspace and full IoT climate control.</p>
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex items-center gap-3 text-stone-400">
                  <span className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest"><svg className="w-3.5 h-3.5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg> 2 Guests</span>
                  <span className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest"><svg className="w-3.5 h-3.5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg> 45m²</span>
                </div>
                <button onClick={() => setCurrentPage('rooms')} className="text-[9px] font-black text-cyan-400 hover:text-white uppercase tracking-widest cursor-pointer active:scale-95 transition-transform">Book Now →</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Fully Interactive IoT Connected Stays */}
      <section className="max-w-[1550px] mx-auto px-4 md:px-8 py-20 relative border-t border-white/5">
        <div className="absolute left-0 top-1/2 w-64 h-64 bg-cyan-600/10 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <div className="w-full lg:w-1/2 space-y-4 relative z-10">
            <span className="text-cyan-400 text-[9px] font-black uppercase tracking-widest mb-1 block">IoT Connected Stays</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1] text-white">
              Control your sanctuary <br/><span className="text-cyan-400">from your phone.</span>
            </h2>
            <p className="text-stone-500 font-bold leading-relaxed text-xs max-w-md mb-8">
              Every HotelEase premium suite comes equipped with smart room technology. Tap the interactive cards below to simulate the IoT network.
            </p>
            
            {/* Functional Toggle Cards */}
            <div className="grid grid-cols-2 gap-4">
              
              {/* Climate Card */}
              <div 
                onClick={() => toggleIot('climate')}
                className={`p-5 rounded-[1.5rem] flex flex-col items-center justify-center cursor-pointer transition-all duration-300 active:scale-95 select-none ${iotStates.climate ? 'bg-cyan-900/20 border border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.15)]' : 'bg-[#0a0a0a] border border-white/10 hover:border-white/20'}`}
              >
                <span className={`text-[9px] font-black uppercase tracking-widest mb-1 transition-colors ${iotStates.climate ? 'text-cyan-400' : 'text-stone-500'}`}>CLIMATE</span>
                <span className={`text-xs font-bold transition-colors ${iotStates.climate ? 'text-white' : 'text-stone-500'}`}>
                  {iotStates.climate ? '22.5°C Stabilized' : 'System Off'}
                </span>
              </div>

              {/* Ambience Card */}
              <div 
                onClick={() => toggleIot('ambience')}
                className={`p-5 rounded-[1.5rem] flex flex-col items-center justify-center cursor-pointer transition-all duration-300 active:scale-95 select-none ${iotStates.ambience ? 'bg-purple-900/20 border border-purple-500/40 shadow-[0_0_20px_rgba(168,85,247,0.15)]' : 'bg-[#0a0a0a] border border-white/10 hover:border-white/20'}`}
              >
                <span className={`text-[9px] font-black uppercase tracking-widest mb-1 transition-colors ${iotStates.ambience ? 'text-purple-400' : 'text-stone-500'}`}>AMBIENCE</span>
                <span className={`text-xs font-bold transition-colors ${iotStates.ambience ? 'text-white' : 'text-stone-500'}`}>
                  {iotStates.ambience ? 'Neon Relax Mode' : 'Standard Lighting'}
                </span>
              </div>

              {/* Audio Card */}
              <div 
                onClick={() => toggleIot('audio')}
                className={`p-5 rounded-[1.5rem] flex flex-col items-center justify-center cursor-pointer transition-all duration-300 active:scale-95 select-none ${iotStates.audio ? 'bg-cyan-900/20 border border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.15)]' : 'bg-[#0a0a0a] border border-white/10 hover:border-white/20'}`}
              >
                <span className={`text-[9px] font-black uppercase tracking-widest mb-1 transition-colors ${iotStates.audio ? 'text-cyan-400' : 'text-stone-500'}`}>AUDIO</span>
                <span className={`text-xs font-bold transition-colors ${iotStates.audio ? 'text-white' : 'text-stone-500'}`}>
                  {iotStates.audio ? 'Playing: Cyber-Jazz' : 'Muted'}
                </span>
              </div>

              {/* Security Card */}
              <div 
                onClick={() => toggleIot('security')}
                className={`p-5 rounded-[1.5rem] flex flex-col items-center justify-center cursor-pointer transition-all duration-300 active:scale-95 select-none ${iotStates.security ? 'bg-green-900/20 border border-green-500/40 shadow-[0_0_20px_rgba(34,197,94,0.15)]' : 'bg-red-900/10 border border-red-500/30'}`}
              >
                <span className={`text-[9px] font-black uppercase tracking-widest mb-1 transition-colors ${iotStates.security ? 'text-green-400' : 'text-red-400'}`}>SECURITY</span>
                <span className={`text-xs font-bold transition-colors ${iotStates.security ? 'text-white' : 'text-red-300'}`}>
                  {iotStates.security ? 'Biometric Armed' : 'System Unlocked'}
                </span>
              </div>
              
              {/* Eco Telemetry Card */}
              <div 
                onClick={() => toggleIot('eco')}
                className={`col-span-2 p-5 rounded-[1.5rem] flex items-center justify-center cursor-pointer transition-all duration-300 active:scale-95 select-none ${iotStates.eco ? 'bg-teal-950/20 border border-teal-500/30 shadow-inner' : 'bg-[#0a0a0a] border border-white/10'}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${iotStates.eco ? 'bg-teal-500/10 text-teal-400' : 'bg-white/5 text-stone-600'}`}>
                    <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2a9.985 9.985 0 0 1 8 3h-3v2h7V0h-2v2.735A11.954 11.954 0 0 0 12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12h-2c0 5.523-4.477 10-10 10z"/></svg>
                  </div>
                  <div>
                    <span className={`text-[9px] font-black uppercase tracking-widest block mb-0.5 transition-colors ${iotStates.eco ? 'text-teal-400' : 'text-stone-500'}`}>Eco-Telemetry</span>
                    <span className={`text-[10px] font-bold transition-colors ${iotStates.eco ? 'text-stone-400' : 'text-stone-600'}`}>
                      {iotStates.eco ? '100% Carbon Neutral AI Ops' : 'Standard Grid Power'}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
          
          <div className="w-full lg:w-1/2 relative">
            <div className={`absolute inset-0 bg-gradient-to-tr ${iotStates.ambience ? 'from-purple-500 to-cyan-500' : 'from-cyan-500 to-blue-600'} rounded-[3rem] transform rotate-3 blur-2xl transition-all duration-700 ${iotStates.ambience ? 'opacity-50' : 'opacity-20'}`}></div>
            <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Smart Room" className={`relative rounded-[3rem] border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.8)] z-10 w-full object-cover h-[400px] md:h-[550px] transition-all duration-700 ${iotStates.climate ? 'brightness-100' : 'brightness-50'}`} />
          </div>
        </div>
      </section>

      {/* 4. 360° VR Previews */}
      <section className="py-20 px-4 md:px-8 relative border-t border-white/5">
        <div className="absolute inset-0 bg-white/[0.01] pointer-events-none"></div>
        <div className="max-w-[1550px] mx-auto text-center relative z-10">
          <span className="text-cyan-400 text-[9px] font-black uppercase tracking-widest mb-2 block">Virtual Reality</span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-8 text-white">Don't just look. <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Step inside.</span></h2>
          
          <div 
            onClick={() => setIsVrModalOpen(true)}
            className="relative w-full h-[400px] md:h-[500px] rounded-[3rem] overflow-hidden group cursor-pointer border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.8)] active:scale-[0.98] transition-transform"
          >
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-all duration-700 z-10 backdrop-blur-[1px] group-hover:backdrop-blur-0"></div>
            <img src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="VR Room" className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-1000" />
            
            <div className="absolute top-8 right-8 z-30 bg-black/80 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-full flex items-center gap-2.5 shadow-lg">
              <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse shadow-[0_0_10px_#c084fc]"></span>
              <span className="text-[9px] font-black text-white uppercase tracking-widest">WebXR Ready</span>
            </div>

            <div className="absolute inset-0 flex items-center justify-center z-20">
              <button className="px-8 py-4 bg-black/60 backdrop-blur-md rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border border-white/20 group-hover:bg-white group-hover:text-black group-hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.1)] text-white cursor-pointer pointer-events-none">
                Launch 360 Tour
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Premium Amenities */}
      <section className="max-w-[1550px] mx-auto px-4 md:px-8 py-20 border-t border-white/5">
        <div className="text-center mb-16">
          <span className="text-cyan-400 text-[9px] font-black uppercase tracking-widest mb-2 block">Experiences</span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white">Beyond the Room</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="bg-[#060606] border border-white/10 p-8 rounded-[2.5rem] hover:border-cyan-500/40 transition-colors shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="w-12 h-12 mx-auto bg-[#0a0a0a] border border-white/10 rounded-xl flex items-center justify-center mb-5 text-cyan-400 shadow-inner">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="text-sm font-black text-white mb-2">Wellness & Spa</h3>
            <p className="text-[10px] text-stone-500 font-bold leading-relaxed">Rejuvenate with world-class therapies and massages.</p>
          </div>
          
          <div className="bg-[#060606] border border-white/10 p-8 rounded-[2.5rem] hover:border-cyan-500/40 transition-colors shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="w-12 h-12 mx-auto bg-[#0a0a0a] border border-white/10 rounded-xl flex items-center justify-center mb-5 text-cyan-400 shadow-inner">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" /></svg>
            </div>
            <h3 className="text-sm font-black text-white mb-2">Fine Dining</h3>
            <p className="text-[10px] text-stone-500 font-bold leading-relaxed">Michelin-starred chefs preparing global cuisines.</p>
          </div>

          <div className="bg-[#060606] border border-white/10 p-8 rounded-[2.5rem] hover:border-cyan-500/40 transition-colors shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="w-12 h-12 mx-auto bg-[#0a0a0a] border border-white/10 rounded-xl flex items-center justify-center mb-5 text-cyan-400 shadow-inner">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
            </div>
            <h3 className="text-sm font-black text-white mb-2">Infinity Pools</h3>
            <p className="text-[10px] text-stone-500 font-bold leading-relaxed">Temperature-controlled pools with panoramic views.</p>
          </div>

          <div className="bg-[#060606] border border-white/10 p-8 rounded-[2.5rem] hover:border-cyan-500/40 transition-colors shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="w-12 h-12 mx-auto bg-[#0a0a0a] border border-white/10 rounded-xl flex items-center justify-center mb-5 text-cyan-400 shadow-inner">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h3 className="text-sm font-black text-white mb-2">Smart Gym</h3>
            <p className="text-[10px] text-stone-500 font-bold leading-relaxed">24/7 access to AI-powered fitness equipment.</p>
          </div>
        </div>
      </section>

      {/* 6. Expanded Destinations */}
      <section className="max-w-[1550px] mx-auto px-4 md:px-8 py-20 border-t border-white/5">
        <div className="flex flex-col justify-center items-center text-center mb-12 gap-2">
          <span className="text-cyan-400 text-[9px] font-black uppercase tracking-widest block">Locations</span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white">Explore the World</h2>
          <p className="text-xs font-bold text-stone-500 max-w-lg">Discover our curated selection of ultra-luxury properties across the globe.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              className="relative h-[250px] md:h-[300px] rounded-[2.5rem] overflow-hidden group cursor-pointer border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] active:scale-[0.98] transition-transform" 
              onClick={() => setCurrentPage('rooms')}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/40 to-transparent z-10 transition-opacity duration-500"></div>
              <img src={dest.img} alt={dest.name} className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-1000" />
              
              <div className="absolute bottom-6 left-6 z-20">
                <h3 className="text-white font-black text-xl md:text-2xl mb-1 tracking-tight">{dest.name}</h3>
                <p className="text-[10px] text-cyan-400 font-black uppercase tracking-widest">{dest.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. VIP Loyalty Tiers */}
      <section className="max-w-[1550px] mx-auto px-4 md:px-8 py-20 border-t border-white/5">
        <div className="text-center mb-16">
          <span className="text-cyan-400 text-[9px] font-black uppercase tracking-widest mb-2 block">Membership</span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white">The Inner Circle Privileges</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#060606] border border-white/10 p-8 rounded-[2.5rem] flex flex-col justify-between group shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div>
              <span className="text-[9px] font-black text-stone-500 uppercase tracking-widest">Tier 01</span>
              <h3 className="text-2xl font-black mt-2 mb-4 text-white">Silver Access</h3>
              <p className="text-stone-500 text-xs font-bold mb-6 leading-relaxed">Complimentary high-speed satellite internet and priority late checkout.</p>
              <div className="flex items-center gap-2 mb-8">
                <span className="bg-[#0a0a0a] border border-white/10 px-3 py-1.5 rounded-lg text-[8px] font-black text-stone-300 uppercase tracking-widest shadow-inner">Apple Wallet Ready</span>
              </div>
            </div>
            <button onClick={() => setCurrentPage('auth')} className="w-full py-4 bg-[#0a0a0a] hover:bg-white/10 border border-white/10 rounded-2xl text-[9px] font-black uppercase tracking-widest text-white transition-all shadow-inner cursor-pointer active:scale-95">Join Free</button>
          </div>

          <div className="bg-gradient-to-b from-[#0a0a0a] to-[#060606] border border-cyan-500/40 p-8 rounded-[2.5rem] flex flex-col justify-between relative shadow-[0_30px_60px_rgba(6,182,212,0.15)] md:-translate-y-4 group">
            <span className="absolute -top-3 right-8 bg-cyan-500 text-black text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.5)]">Popular</span>
            <div>
              <span className="text-[9px] font-black text-cyan-400 uppercase tracking-widest">Tier 02</span>
              <h3 className="text-2xl font-black mt-2 mb-4 text-white">Gold Elite</h3>
              <p className="text-stone-300 text-xs font-bold mb-6 leading-relaxed">Complimentary airport transfers, daily spa credits, and room upgrades.</p>
              <div className="flex flex-wrap items-center gap-2 mb-8">
                <span className="bg-cyan-500/10 border border-cyan-500/30 px-3 py-1.5 rounded-lg text-[8px] font-black text-cyan-400 uppercase tracking-widest shadow-inner">Apple Wallet</span>
                <span className="bg-blue-500/10 border border-blue-500/30 px-3 py-1.5 rounded-lg text-[8px] font-black text-blue-400 uppercase tracking-widest shadow-inner">G-Pay Ready</span>
              </div>
            </div>
            <button onClick={() => setCurrentPage('auth')} className="w-full py-4 bg-gradient-to-r from-teal-600 to-cyan-500 hover:from-teal-500 hover:to-cyan-400 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-black transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] cursor-pointer active:scale-95">Upgrade Now</button>
          </div>

          <div className="bg-[#060606] border border-white/10 p-8 rounded-[2.5rem] flex flex-col justify-between group shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div>
              <span className="text-[9px] font-black text-stone-500 uppercase tracking-widest">Tier 03</span>
              <h3 className="text-2xl font-black mt-2 mb-4 text-white">Platinum Reserve</h3>
              <p className="text-stone-500 text-xs font-bold mb-6 leading-relaxed">Dedicated 24/7 private butler, private helicopter access, and custom dining.</p>
              <div className="flex items-center gap-2 mb-8">
                <span className="bg-[#0a0a0a] border border-white/10 px-3 py-1.5 rounded-lg text-[8px] font-black text-stone-300 uppercase tracking-widest shadow-inner">Biometric Auth</span>
              </div>
            </div>
            <button onClick={() => setCurrentPage('auth')} className="w-full py-4 bg-[#0a0a0a] hover:bg-white/10 border border-white/10 rounded-2xl text-[9px] font-black uppercase tracking-widest text-white transition-all shadow-inner cursor-pointer active:scale-95">Request Access</button>
          </div>
        </div>
      </section>

      {/* 8. Mobile App Download Section */}
      <section className="max-w-[1550px] mx-auto px-4 md:px-8 py-20 border-t border-white/5 mb-10">
        <div className="bg-gradient-to-r from-teal-900/20 to-cyan-900/10 border border-white/10 rounded-[3rem] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 shadow-[0_30px_60px_rgba(0,0,0,0.8)]">
          <div className="w-full md:w-1/2">
            <span className="text-cyan-400 text-[9px] font-black uppercase tracking-widest mb-3 block">HotelEase Core App</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-5 text-white">Your Room Key <br/> is Your Phone.</h2>
            <p className="text-stone-400 font-bold text-xs mb-8 max-w-md leading-relaxed">
              Skip the front desk. Use the HotelEase app to unlock your door, order room service, and customize your room's climate from anywhere.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => handleAppDownload('App Store')}
                className="px-8 py-4 bg-white text-black rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] hover:bg-stone-200 transition-colors shadow-lg cursor-pointer active:scale-95"
              >
                App Store
              </button>
              <button 
                onClick={() => handleAppDownload('Google Play')}
                className="px-8 py-4 bg-[#0a0a0a] border border-white/10 text-white rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-colors shadow-inner cursor-pointer active:scale-95"
              >
                Google Play
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="w-64 h-96 bg-black border-[6px] border-white/10 rounded-[3.5rem] p-3 relative shadow-[0_30px_80px_rgba(6,182,212,0.2)] hover:-translate-y-2 transition-transform duration-500">
              <div className="w-full h-full bg-[#050505] rounded-[2.5rem] border border-white/5 flex flex-col items-center justify-center p-6 shadow-inner">
                <div className="w-16 h-16 rounded-full bg-cyan-500/10 flex items-center justify-center mb-5 border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.2)] animate-pulse">
                  <svg className="w-7 h-7 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                </div>
                <h4 className="text-white font-black text-lg tracking-tight">Tap to Unlock</h4>
                <p className="text-[9px] font-black text-stone-500 mt-2 text-center uppercase tracking-widest">NFC Digital Key Active</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Functional VR Modal with Interactive Progress Bar */}
      {isVrModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4">
          <div className="w-full max-w-5xl h-[80vh] bg-[#050505] border border-white/10 rounded-[3rem] shadow-[0_0_100px_rgba(6,182,212,0.2)] overflow-hidden relative flex flex-col items-center justify-center">
            <button 
              onClick={() => setIsVrModalOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full flex items-center justify-center text-white z-20 transition-colors cursor-pointer"
            >
              ✕
            </button>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-40 mix-blend-screen animate-pulse"></div>
            
            <div className="relative z-10 flex flex-col items-center w-full max-w-md px-8">
              {vrProgress < 100 ? (
                <>
                  <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin mb-6"></div>
                  <h2 className="text-2xl font-black text-white tracking-widest uppercase">Initializing WebXR Environment</h2>
                  <p className="text-cyan-400 text-xs font-mono mt-3 uppercase tracking-[0.2em] mb-6">Loading Textures & Telemetry... {vrProgress}%</p>
                  
                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-cyan-400 transition-all duration-100 ease-linear shadow-[0_0_10px_#22d3ee]" 
                      style={{ width: `${vrProgress}%` }}
                    ></div>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 bg-cyan-500/20 border border-cyan-500/50 rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-8 h-8 text-cyan-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                  </div>
                  <h2 className="text-2xl font-black text-white tracking-widest uppercase mb-6">Environment Ready</h2>
                  <button 
                    onClick={() => {
                      setIsVrModalOpen(false);
                      showToast('Entering 360 Space...');
                    }}
                    className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-black text-[10px] uppercase tracking-[0.2em] rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.4)] active:scale-95 transition-all cursor-pointer"
                  >
                    Enter Room
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Home;