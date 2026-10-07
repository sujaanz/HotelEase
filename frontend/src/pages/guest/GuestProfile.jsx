import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GuestProfile({ setCurrentPage, setUserRole }) {
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming', 'past', 'preferences', 'service'
  
  // User Profile State with Editing Support
  const [user, setUser] = useState(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    return savedUser || { 
      name: 'Sk Sujaan Mondal', 
      email: 'sujaanz@secureportal.com',
      phone: '+880 1234 567890',
      tier: 'Platinum Core'
    };
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(user);

  // IoT & Interactive Suite States
  const [walletAdded, setWalletAdded] = useState(false);
  const [climateTemp, setClimateTemp] = useState(22);
  const [roomMood, setRoomMood] = useState('relax');
  const [audioVolume, setAudioVolume] = useState(65);
  const [dndMode, setDndMode] = useState(false);
  const [curtainsOpen, setCurtainsOpen] = useState(true);
  const [flightPnr, setFlightPnr] = useState('');
  const [pnrLinked, setPnrLinked] = useState(false);
  
  // Actions & Dining States
  const [processingId, setProcessingId] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [orderDispatched, setOrderDispatched] = useState(false);

  const API_BASE_URL = 'http://127.0.0.1:5000';

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/bookings`)
      .then(response => {
        setMyBookings(response.data.reverse());
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching guest bookings:", error);
        setLoading(false);
      });
  }, []);

  const displayedBookings = myBookings.filter(booking => 
    activeTab === 'upcoming' 
      ? booking.status !== 'Completed' && booking.status !== 'Cancelled' 
      : booking.status === 'Completed' || booking.status === 'Cancelled'
  );

  // Working Handlers
  const handleExitTerminal = () => {
    if (setCurrentPage) setCurrentPage('home');
    else window.location.href = '/';
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    if (setUserRole) setUserRole(null);
    if (setCurrentPage) setCurrentPage('auth');
    else window.location.reload();
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    setUser(editForm);
    localStorage.setItem('user', JSON.stringify(editForm));
    setIsEditing(false);
    alert('Identity Matrix updated successfully.');
  };

  const handleAddToWallet = () => {
    setWalletAdded('loading');
    setTimeout(() => setWalletAdded(true), 1500);
  };

  const handleLinkFlight = () => {
    if(!flightPnr) return;
    setPnrLinked('loading');
    setTimeout(() => setPnrLinked(true), 1200);
  };

  const handleCancelBooking = (id) => {
    if(window.confirm(`Are you sure you want to abort booking BKG-${id}?`)) {
      setMyBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'Cancelled' } : b));
    }
  };

  const handleDownloadInvoice = (id) => {
    setProcessingId(id);
    setTimeout(() => {
      setProcessingId(null);
      alert(`Secure Invoice BKG-${id} downloaded successfully.`);
    }, 2000);
  };

  const handleOrderService = () => {
    setOrderDispatched('loading');
    setTimeout(() => {
      setOrderDispatched(true);
      setCartCount(0);
    }, 2000);
  };

  return (
    <div className="w-full min-h-[100vh] bg-[#030303] text-stone-200 font-sans selection:bg-cyan-500 selection:text-black pt-10 pb-20 px-4 md:px-8 relative overflow-hidden">
      
      {/* Background Holographic Glows */}
      <div className="absolute top-[0%] right-[10%] w-[40%] h-[40%] bg-teal-500/10 blur-[150px] rounded-full animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-[20%] left-[10%] w-[30%] h-[40%] bg-cyan-600/10 blur-[150px] rounded-full animate-pulse pointer-events-none" style={{ animationDelay: '2s' }}></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <div className="max-w-[1300px] mx-auto space-y-8 relative z-10">
        
        {/* Navigation & Header */}
        <div className="flex items-center justify-between border-b border-white/5 pb-6">
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            Neural <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">Dashboard.</span>
          </h1>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleExitTerminal} 
              className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-stone-400 hover:text-cyan-400 transition-colors bg-white/5 px-4 py-2.5 rounded-xl border border-white/10 shadow-sm"
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              Exit Terminal
            </button>
            <button 
              onClick={handleLogout} 
              className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-red-400 hover:bg-red-500 hover:text-black transition-all bg-red-500/10 px-4 py-2.5 rounded-xl border border-red-500/20 shadow-sm"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Profile Matrix & Digital Key */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* 1. Identity Matrix with Profile Editing Feature */}
            <div className="bg-[#050505] border border-white/5 rounded-[2rem] p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group hover:border-cyan-500/20 transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-[50px] rounded-full"></div>
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="relative mb-5 group-hover:scale-105 transition-transform duration-500">
                  <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-[1.5rem] blur opacity-40 animate-pulse"></div>
                  <div className="relative w-24 h-24 bg-[#0a0a0a] rounded-[1.5rem] p-1 border border-white/10 flex items-center justify-center overflow-hidden">
                    <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0a0a0a&color=22d3ee&bold=true&size=200`} alt="Profile" className="w-full h-full rounded-[1.25rem] object-cover" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-cyan-500 text-black rounded-full flex items-center justify-center border-4 border-[#050505] shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                  </div>
                </div>
                
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[8px] font-black uppercase tracking-widest text-cyan-400 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span> {user.tier}
                </div>

                {!isEditing ? (
                  <>
                    <h2 className="text-2xl font-black text-white tracking-wide mb-1">{user.name}</h2>
                    <p className="text-[10px] text-stone-500 font-mono tracking-widest uppercase mb-1">{user.email}</p>
                    <p className="text-[10px] text-stone-400 font-medium tracking-wide mb-4">{user.phone || '+880 1234 567890'}</p>
                    
                    <button 
                      onClick={() => { setEditForm(user); setIsEditing(true); }}
                      className="w-full py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest text-white transition-all mb-4"
                    >
                      Edit Profile Matrix
                    </button>
                  </>
                ) : (
                  <form onSubmit={handleProfileSave} className="w-full space-y-3 text-left mb-4 animate-fade-in">
                    <div>
                      <label className="block text-[8px] font-black text-stone-400 uppercase tracking-widest mb-1">Full Name</label>
                      <input 
                        type="text" 
                        value={editForm.name} 
                        onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                        className="w-full bg-[#0a0a0a] px-3 py-2.5 rounded-lg border border-white/10 text-white text-xs outline-none focus:border-cyan-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[8px] font-black text-stone-400 uppercase tracking-widest mb-1">Email</label>
                      <input 
                        type="email" 
                        value={editForm.email} 
                        onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                        className="w-full bg-[#0a0a0a] px-3 py-2.5 rounded-lg border border-white/10 text-white text-xs outline-none focus:border-cyan-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[8px] font-black text-stone-400 uppercase tracking-widest mb-1">Phone</label>
                      <input 
                        type="text" 
                        value={editForm.phone} 
                        onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                        className="w-full bg-[#0a0a0a] px-3 py-2.5 rounded-lg border border-white/10 text-white text-xs outline-none focus:border-cyan-400"
                      />
                    </div>
                    <div className="flex gap-2 pt-1">
                      <button type="submit" className="flex-1 py-2 bg-cyan-500 text-black rounded-lg text-[9px] font-black uppercase tracking-widest">Save</button>
                      <button type="button" onClick={() => setIsEditing(false)} className="px-3 py-2 bg-white/5 text-stone-400 rounded-lg text-[9px] font-black uppercase tracking-widest">Cancel</button>
                    </div>
                  </form>
                )}
                
                {/* Reward Points Tracker */}
                <div className="w-full bg-[#0a0a0a] border border-white/5 rounded-xl p-4 mt-2 shadow-inner">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-[8px] font-black text-stone-500 uppercase tracking-widest">Global Rewards</span>
                    <span className="text-lg font-mono font-bold text-teal-400">1,250 <span className="text-[8px] text-stone-500">PTS</span></span>
                  </div>
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 w-[65%] rounded-full shadow-[0_0_10px_#22d3ee]"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Active Digital Key */}
            {myBookings.some(b => b.status !== 'Completed' && b.status !== 'Cancelled') && (
              <div className="bg-gradient-to-br from-[#0a0a0a] to-[#050505] border border-teal-500/30 rounded-[2rem] p-6 md:p-8 shadow-[0_20px_50px_rgba(20,184,166,0.1)] group hover:border-teal-500/50 transition-all duration-500 relative overflow-hidden animate-fade-in">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent opacity-50"></div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-full bg-teal-500/10 flex items-center justify-center border border-teal-500/20 text-teal-400">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                  </div>
                  <span className="text-[8px] bg-teal-500/20 text-teal-400 border border-teal-500/30 px-2 py-1 rounded uppercase font-black tracking-widest animate-pulse">Sync Active</span>
                </div>
                <h3 className="text-xl font-black text-white tracking-wide mb-1">Digital Suite Key</h3>
                <p className="text-[9px] text-stone-400 font-bold uppercase tracking-widest mb-6">NFC Wallet Integration</p>
                <div className="flex gap-2">
                  <button 
                    onClick={handleAddToWallet}
                    disabled={walletAdded}
                    className={`flex-1 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-1.5 transition-all
                      ${walletAdded === true ? 'bg-green-500 text-black shadow-[0_0_15px_rgba(34,197,94,0.3)]' : walletAdded === 'loading' ? 'bg-white/50 text-black cursor-wait' : 'bg-white hover:bg-stone-200 text-black'}`}
                  >
                    {walletAdded === true ? '✓ Added' : walletAdded === 'loading' ? 'Syncing...' : ' Add to Wallet'}
                  </button>
                  <button className="w-12 h-[38px] bg-[#121212] border border-white/10 hover:border-teal-500/50 rounded-xl flex items-center justify-center transition-colors">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white"><path d="M11.996 0A12 12 0 0 0 0 12c0 6.627 5.373 12 12 12 6.626 0 12-5.373 12-12 0-6.628-5.373-12-12-12zm-3.8 19.387c-1.42 0-2.483-1.096-2.483-2.564 0-1.47 1.064-2.565 2.483-2.565 1.42 0 2.483 1.096 2.483 2.565 0 1.468-1.063 2.564-2.483 2.564zm7.6 0c-1.42 0-2.483-1.096-2.483-2.564 0-1.47 1.063-2.565 2.483-2.565 1.42 0 2.483 1.096 2.483 2.565 0 1.468-1.063 2.564-2.483 2.564zm0-6.936c-2.316 0-4.195-1.92-4.195-4.288s1.88-4.288 4.195-4.288 4.194 1.92 4.194 4.288-1.878 4.288-4.194 4.288z"/></svg>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Dynamic Data Matrix & Modern Tabs */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Multi-Tab Switcher */}
            <div className="bg-[#050505] border border-white/5 p-2 rounded-2xl flex flex-col sm:flex-row items-center gap-2 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              <div className="flex w-full bg-[#0a0a0a] p-1 rounded-xl border border-white/5 shadow-inner overflow-x-auto hide-scrollbar">
                <button 
                  onClick={() => setActiveTab('upcoming')}
                  className={`flex-1 whitespace-nowrap px-4 py-3 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${activeTab === 'upcoming' ? 'bg-cyan-500/10 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)] border border-cyan-500/20' : 'text-stone-500 hover:text-stone-300'}`}
                >
                  Itineraries
                </button>
                <button 
                  onClick={() => setActiveTab('past')}
                  className={`flex-1 whitespace-nowrap px-4 py-3 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${activeTab === 'past' ? 'bg-white/10 text-white shadow-sm border border-white/10' : 'text-stone-500 hover:text-stone-300'}`}
                >
                  History
                </button>
                <button 
                  onClick={() => setActiveTab('preferences')}
                  className={`flex-1 whitespace-nowrap px-4 py-3 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${activeTab === 'preferences' ? 'bg-purple-500/10 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)] border border-purple-500/20' : 'text-stone-500 hover:text-stone-300'}`}
                >
                  Suite Config
                </button>
                <button 
                  onClick={() => setActiveTab('service')}
                  className={`flex-1 whitespace-nowrap px-4 py-3 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${activeTab === 'service' ? 'bg-teal-500/10 text-teal-400 shadow-[0_0_15px_rgba(20,184,166,0.2)] border border-teal-500/20' : 'text-stone-500 hover:text-stone-300'}`}
                >
                  AI Dining
                </button>
              </div>
            </div>

            {/* Content Rendering based on Tab */}
            <div className="space-y-5">
              
              {/* 1. Suite Configuration Tab */}
              {activeTab === 'preferences' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fade-in">
                  <div className="bg-[#050505] rounded-[2rem] border border-white/5 p-6 md:p-8 hover:border-purple-500/30 transition-colors shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-sm font-black text-white uppercase tracking-widest">Climate Matrix</h3>
                      <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse shadow-[0_0_10px_#a855f7]"></span>
                    </div>
                    <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-4">Target Arrival Temperature</p>
                    <div className="flex items-center gap-4 bg-[#0a0a0a] p-3 rounded-xl border border-white/5 shadow-inner">
                      <input type="range" min="16" max="28" value={climateTemp} onChange={(e) => setClimateTemp(e.target.value)} className="w-full accent-purple-500 h-1 bg-white/10 rounded-full appearance-none cursor-pointer" />
                      <span className="text-lg font-mono font-bold text-purple-400 w-12 text-right">{climateTemp}°C</span>
                    </div>
                  </div>

                  <div className="bg-[#050505] rounded-[2rem] border border-white/5 p-6 md:p-8 hover:border-cyan-500/30 transition-colors shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-sm font-black text-white uppercase tracking-widest">Ambient Mood</h3>
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4 text-cyan-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <button onClick={() => setRoomMood('relax')} className={`py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${roomMood === 'relax' ? 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-400' : 'bg-[#0a0a0a] border border-white/5 text-stone-500'}`}>Relax (Dim)</button>
                      <button onClick={() => setRoomMood('work')} className={`py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${roomMood === 'work' ? 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-400' : 'bg-[#0a0a0a] border border-white/5 text-stone-500'}`}>Work (Bright)</button>
                    </div>
                  </div>

                  <div className="bg-[#050505] rounded-[2rem] border border-white/5 p-6 md:p-8 hover:border-teal-500/30 transition-colors shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-sm font-black text-white uppercase tracking-widest">Spatial Audio Sync</h3>
                      <span className="text-[10px] font-mono text-teal-400">{audioVolume}%</span>
                    </div>
                    <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-4">Surround Sound Volume</p>
                    <div className="flex items-center gap-4 bg-[#0a0a0a] p-3 rounded-xl border border-white/5 shadow-inner">
                      <input type="range" min="0" max="100" value={audioVolume} onChange={(e) => setAudioVolume(e.target.value)} className="w-full accent-teal-500 h-1 bg-white/10 rounded-full appearance-none cursor-pointer" />
                    </div>
                  </div>

                  <div className="bg-[#050505] rounded-[2rem] border border-white/5 p-6 md:p-8 hover:border-blue-500/30 transition-colors shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex flex-col justify-between">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-sm font-black text-white uppercase tracking-widest">Smart Security & DND</h3>
                      <span className={`w-2 h-2 rounded-full ${dndMode ? 'bg-red-400 shadow-[0_0_10px_#f87171]' : 'bg-green-400 shadow-[0_0_10px_#4ade80]'}`}></span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <button onClick={() => setDndMode(!dndMode)} className={`py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${dndMode ? 'bg-red-500/20 border border-red-500/40 text-red-400' : 'bg-[#0a0a0a] border border-white/5 text-stone-400'}`}>
                        {dndMode ? 'DND Active' : 'Enable DND'}
                      </button>
                      <button onClick={() => setCurtainsOpen(!curtainsOpen)} className={`py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${curtainsOpen ? 'bg-blue-500/20 border border-blue-500/40 text-blue-400' : 'bg-[#0a0a0a] border border-white/5 text-stone-400'}`}>
                        {curtainsOpen ? 'Blinds Open' : 'Blinds Closed'}
                      </button>
                    </div>
                  </div>

                  <div className="md:col-span-2 bg-gradient-to-r from-[#050505] to-[#0a0a0a] rounded-[2rem] border border-white/5 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                    <div>
                      <h3 className="text-sm font-black text-white uppercase tracking-widest mb-2">Transport Sync</h3>
                      <p className="text-xs font-medium text-stone-400 max-w-sm">Link your flight details for automated airport pickup.</p>
                    </div>
                    <div className="flex w-full md:w-auto gap-2">
                      <input type="text" value={flightPnr} onChange={(e) => setFlightPnr(e.target.value.toUpperCase())} disabled={pnrLinked === true} placeholder="Flight PNR (e.g. EK502)" className="w-full md:w-48 bg-[#020202] px-4 py-3 rounded-xl border border-white/10 outline-none text-xs font-bold font-mono tracking-widest text-white shadow-inner disabled:opacity-50" />
                      <button onClick={handleLinkFlight} disabled={pnrLinked !== false || !flightPnr} className={`px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${pnrLinked === true ? 'bg-teal-500/20 border border-teal-500/50 text-teal-400' : pnrLinked === 'loading' ? 'bg-white/10 text-stone-400 cursor-wait' : flightPnr ? 'bg-teal-500 hover:bg-teal-400 text-black shadow-[0_0_15px_rgba(20,184,166,0.3)]' : 'bg-white/5 text-stone-600 cursor-not-allowed'}`}>{pnrLinked === true ? 'Linked ✓' : pnrLinked === 'loading' ? 'Syncing...' : 'Link'}</button>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. AI Dining Tab */}
              {activeTab === 'service' && (
                <div className="bg-[#050505] rounded-[2.5rem] border border-white/5 p-6 md:p-8 animate-fade-in shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h3 className="text-2xl font-black text-white tracking-tight mb-1">In-Suite Dining</h3>
                      <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Delivered by Autonomous Drones</p>
                    </div>
                    <div className="bg-teal-500/10 border border-teal-500/30 text-teal-400 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">Cart: {cartCount} Items</div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className="bg-[#0a0a0a] border border-white/5 p-4 rounded-[1.5rem] flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-black rounded-xl overflow-hidden border border-white/10"><img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&q=80" className="w-full h-full object-cover" alt="Burger" /></div>
                        <div><h4 className="text-sm font-bold text-white mb-1">Wagyu Sliders</h4><span className="text-[10px] font-mono text-teal-400 block">$45.00</span></div>
                      </div>
                      <button onClick={() => setCartCount(c => c+1)} className="w-8 h-8 rounded-full bg-white/5 hover:bg-teal-500 text-white hover:text-black flex items-center justify-center transition-colors">+</button>
                    </div>
                    <div className="bg-[#0a0a0a] border border-white/5 p-4 rounded-[1.5rem] flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-black rounded-xl overflow-hidden border border-white/10"><img src="https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=200&q=80" className="w-full h-full object-cover" alt="Wine" /></div>
                        <div><h4 className="text-sm font-bold text-white mb-1">Dom Pérignon</h4><span className="text-[10px] font-mono text-teal-400 block">$250.00</span></div>
                      </div>
                      <button onClick={() => setCartCount(c => c+1)} className="w-8 h-8 rounded-full bg-white/5 hover:bg-teal-500 text-white hover:text-black flex items-center justify-center transition-colors">+</button>
                    </div>
                  </div>
                  <div className="border-t border-white/5 pt-6 flex justify-end">
                    <button onClick={handleOrderService} disabled={cartCount === 0 || orderDispatched !== false} className={`px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${cartCount === 0 && !orderDispatched ? 'bg-white/5 text-stone-500 cursor-not-allowed' : orderDispatched === true ? 'bg-green-500 text-black shadow-[0_0_20px_rgba(34,197,94,0.3)]' : orderDispatched === 'loading' ? 'bg-teal-900/50 text-teal-400 cursor-wait' : 'bg-teal-500 text-black hover:shadow-[0_0_20px_rgba(20,184,166,0.4)]'}`}>{orderDispatched === true ? 'Dispatched to Room' : orderDispatched === 'loading' ? 'Processing...' : 'Confirm Order'}</button>
                  </div>
                </div>
              )}

              {/* 3. Original Bookings Tab (Upcoming / Past) */}
              {(activeTab === 'upcoming' || activeTab === 'past') && (
                <>
                  {loading ? (
                    <div className="bg-[#050505] rounded-[2rem] border border-white/5 p-16 text-center flex flex-col items-center justify-center min-h-[400px]">
                      <div className="w-10 h-10 border-2 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin mb-4"></div>
                      <h3 className="text-[9px] font-black text-stone-500 uppercase tracking-widest">Syncing Matrix Database...</h3>
                    </div>
                  ) : displayedBookings.length === 0 ? (
                    <div className="bg-[#050505] rounded-[2rem] border border-white/5 p-16 text-center min-h-[400px] flex flex-col justify-center items-center">
                      <div className="w-16 h-16 rounded-2xl bg-[#0a0a0a] border border-white/5 flex items-center justify-center mb-5 text-stone-600">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
                      </div>
                      <h3 className="text-lg font-bold text-white tracking-wide mb-2">No {activeTab} records located</h3>
                      <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Your portfolio for this category is completely clear.</p>
                    </div>
                  ) : (
                    displayedBookings.map((booking) => {
                      const checkInDate = booking.check_in ? new Date(booking.check_in) : null;
                      const isCancelled = booking.status === 'Cancelled';
                      const isCompleted = booking.status === 'Completed';

                      return (
                        <div key={booking.id} className="group bg-[#050505] rounded-[2rem] border border-white/5 p-5 md:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:border-cyan-500/30 transition-all duration-300 shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                          <div className="flex gap-5 items-center w-full md:w-auto">
                            <div className="w-20 h-20 bg-[#0a0a0a] text-cyan-400 rounded-[1.25rem] flex flex-col items-center justify-center border border-white/5 flex-shrink-0 shadow-inner">
                              <span className="text-[8px] font-black uppercase tracking-[0.2em] text-stone-500 mb-1">{checkInDate ? checkInDate.toLocaleString('default', { month: 'short' }) : 'N/A'}</span>
                              <span className="text-2xl font-black text-white leading-none">{checkInDate ? checkInDate.getDate() : '--'}</span>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center gap-3 flex-wrap">
                                <h3 className="text-lg font-bold text-white tracking-tight">Suite Node {booking.room_number || 'TBD'}</h3>
                                <span className={`px-2 py-1 rounded border text-[7px] font-black uppercase tracking-[0.2em] ${isCancelled ? 'bg-red-500/10 border-red-500/20 text-red-400' : isCompleted ? 'bg-stone-500/10 border-stone-500/20 text-stone-400' : 'bg-teal-500/10 border-teal-500/20 text-teal-400'}`}>{booking.status || 'Confirmed'}</span>
                              </div>
                              <div className="flex flex-wrap items-center gap-x-4 text-[9px] font-bold text-stone-500 uppercase tracking-widest font-mono">
                                <span>BKG-{booking.id}</span>
                                <span>•</span>
                                <span className="text-stone-300">${(Number(booking.total_amount) || 0).toFixed(2)}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 w-full md:w-auto justify-end border-t border-white/5 md:border-none pt-4 md:pt-0">
                            {activeTab === 'upcoming' && !isCancelled && (
                              <button onClick={() => handleCancelBooking(booking.id)} className="bg-[#0a0a0a] border border-white/5 text-stone-400 hover:bg-red-500/10 hover:text-red-400 px-5 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all">Cancel</button>
                            )}
                            <button onClick={() => handleDownloadInvoice(booking.id)} disabled={processingId === booking.id} className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-5 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-2">
                              {processingId === booking.id ? 'Processing...' : 'Invoice'}
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </>
              )}

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default GuestProfile;