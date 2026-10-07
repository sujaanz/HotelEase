import React, { useState } from 'react';

function RoomsSearch({ rooms = [], setCurrentPage }) {
  const [showMap, setShowMap] = useState(true);
  const [maxPrice, setMaxPrice] = useState(2000);
  const [selectedMode, setSelectedMode] = useState('All');
  const [sortBy, setSortBy] = useState('recommended');
  const [favorites, setFavorites] = useState([]);
  const [sustainabilityEco, setSustainabilityEco] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [currency, setCurrency] = useState('USD');
  const [compareList, setCompareList] = useState([]);
  const [activeModalRoom, setActiveModalRoom] = useState(null);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // Currency Exchange Rates
  const currencyRates = {
    USD: { symbol: '$', rate: 1 },
    EUR: { symbol: '€', rate: 0.92 },
    GBP: { symbol: '£', rate: 0.79 }
  };

  const formatPrice = (usdPrice) => {
    const converted = usdPrice * currencyRates[currency].rate;
    return `${currencyRates[currency].symbol}${converted.toFixed(0)}`;
  };

  // Interactive Search Parameters State
  const [searchParams, setSearchParams] = useState({
    location: 'Kyoto Sector, Japan',
    dates: 'Oct 15 - Oct 20',
    occupancy: '2 Adults, 1 Suite'
  });

  // Smart Amenities Checkbox State
  const [amenities, setAmenities] = useState({
    iotClimate: false,
    robotConcierge: false,
    biometricEntry: false,
    aiAssistant: false
  });

  const toggleFavorite = (roomId) => {
    setFavorites(prev => 
      prev.includes(roomId) ? prev.filter(id => id !== roomId) : [...prev, roomId]
    );
  };

  const toggleCompare = (roomId) => {
    setCompareList(prev => {
      if (prev.includes(roomId)) {
        return prev.filter(id => id !== roomId);
      }
      if (prev.length >= 3) {
        alert("Maximum 3 suites can be compared simultaneously.");
        return prev;
      }
      return [...prev, roomId];
    });
  };

  const handleAmenityChange = (key) => {
    setAmenities(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Voice Search simulation using Web Speech API
  const handleVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice recognition is not supported in this browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchParams(prev => ({ ...prev, location: transcript }));
    };
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const defaultRooms = [
    { id: 101, room_number: '101', room_type: 'King Suite', price_per_night: 250, match: '98%', features: ['Eco-Smart', 'Biometric'], location: 'Kyoto' },
    { id: 102, room_number: '102', room_type: 'Executive Penthouse', price_per_night: 650, match: '95%', features: ['Private Balcony', 'AI Butler'], location: 'Kyoto' },
    { id: 103, room_number: '103', room_type: 'Zen Garden Villa', price_per_night: 420, match: '92%', features: ['Onsen Bath', 'Net-Zero'], location: 'Tokyo' },
    { id: 104, room_number: '104', room_type: 'Cyber Deluxe', price_per_night: 310, match: '90%', features: ['Spatial Audio', 'Holo-Desk'], location: 'Osaka' }
  ];

  const dataSource = Array.isArray(rooms) && rooms.length > 0 ? rooms : defaultRooms;

  // Fully Functional Filter and Sort Logic
  const filteredRooms = dataSource.filter(room => {
    const price = Number(room.price_per_night || room.price || 450);
    const type = room.room_type || room.type || 'Suite';
    const roomLocation = room.location || searchParams.location;

    const matchesPrice = price <= maxPrice;
    const matchesMode = selectedMode === 'All' || type.toLowerCase().includes(selectedMode.toLowerCase());
    const matchesLocation = !searchParams.location || roomLocation.toLowerCase().includes(searchParams.location.toLowerCase()) || type.toLowerCase().includes(searchParams.location.toLowerCase());
    const matchesEco = !sustainabilityEco || (room.features && room.features.includes('Net-Zero')) || type.toLowerCase().includes('villa');

    return matchesPrice && matchesMode && matchesLocation && matchesEco;
  }).sort((a, b) => {
    const priceA = Number(a.price_per_night || a.price || 450);
    const priceB = Number(b.price_per_night || b.price || 450);
    if (sortBy === 'low-high') return priceA - priceB;
    if (sortBy === 'high-low') return priceB - priceA;
    return 0;
  });

  return (
    <div className="w-full min-h-[100vh] bg-[#020202] text-stone-200 font-sans selection:bg-cyan-500 selection:text-black py-8 px-4 md:px-8 relative overflow-hidden">
      
      {/* Background Holographic Glows */}
      <div className="absolute top-[0%] left-[20%] w-[50%] h-[50%] bg-teal-500/10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[20%] w-[40%] h-[40%] bg-cyan-600/10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <div className="max-w-[1550px] mx-auto space-y-8 relative z-10">
        
        {/* Top Header & Navigation Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-[#060606] border border-white/5 p-5 md:p-6 rounded-[2.5rem] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] gap-4">
          <button 
            onClick={() => setCurrentPage ? setCurrentPage('home') : window.location.href = '/'} 
            className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-stone-300 hover:bg-white/10 hover:text-cyan-400 text-[10px] font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Exit Terminal (Dashboard)
          </button>
          
          <div className="flex items-center gap-4">
            {/* Currency Selector Toggle */}
            <div className="bg-[#0a0a0a] p-1 rounded-xl border border-white/10 flex">
              {['USD', 'EUR', 'GBP'].map((curr) => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr)}
                  className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all cursor-pointer ${currency === curr ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40' : 'text-stone-500 hover:text-stone-300'}`}
                >
                  {curr}
                </button>
              ))}
            </div>

            {compareList.length > 0 && (
              <button 
                onClick={() => setIsCompareOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 text-[9px] font-black uppercase tracking-widest hover:bg-cyan-500/30 transition cursor-pointer"
              >
                Compare Suites ({compareList.length})
              </button>
            )}
          </div>

          <div className="text-center md:text-right">
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">Suite Matrix & Discovery</h1>
            <p className="text-[9px] font-black text-cyan-400 uppercase tracking-[0.2em] mt-0.5">Real-Time Telemetry & Inventory Sync</p>
          </div>
        </div>

        {/* Top Search Console (Directly Editable by User) */}
        <div className="bg-[#060606] border border-white/10 rounded-[2.5rem] p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
          
          {/* Location Input */}
          <div className="bg-[#0a0a0a] rounded-2xl px-4 py-3 text-white flex items-center gap-3 border border-white/5 shadow-inner">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5 text-cyan-400 flex-shrink-0"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-[8px] text-stone-500 uppercase tracking-widest font-black">Location Node</span>
              <input 
                type="text" 
                value={searchParams.location}
                onChange={(e) => setSearchParams({ ...searchParams, location: e.target.value })}
                placeholder="Enter city or sector..."
                className="w-full bg-transparent border-none outline-none text-xs font-bold text-white placeholder-stone-500"
              />
            </div>
          </div>
          
          {/* Dates Input */}
          <div className="bg-[#0a0a0a] rounded-2xl px-4 py-3 text-white flex items-center gap-3 border border-white/5 shadow-inner">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5 text-cyan-400 flex-shrink-0"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-[8px] text-stone-500 uppercase tracking-widest font-black">Temporal Span</span>
              <input 
                type="text" 
                value={searchParams.dates}
                onChange={(e) => setSearchParams({ ...searchParams, dates: e.target.value })}
                className="w-full bg-transparent border-none outline-none text-xs font-bold text-white placeholder-stone-500"
              />
            </div>
          </div>
          
          {/* Occupancy Input */}
          <div className="bg-[#0a0a0a] rounded-2xl px-4 py-3 text-white flex items-center gap-3 border border-white/5 shadow-inner">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5 text-cyan-400 flex-shrink-0"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-[8px] text-stone-500 uppercase tracking-widest font-black">Occupancy Matrix</span>
              <input 
                type="text" 
                value={searchParams.occupancy}
                onChange={(e) => setSearchParams({ ...searchParams, occupancy: e.target.value })}
                className="w-full bg-transparent border-none outline-none text-xs font-bold text-white placeholder-stone-500"
              />
            </div>
          </div>

          {/* Voice Search & Action Button */}
          <div className="flex gap-2 items-center">
            <button 
              type="button"
              onClick={handleVoiceSearch}
              title="Voice Search"
              className={`p-3.5 rounded-2xl border transition-all flex items-center justify-center cursor-pointer ${isListening ? 'bg-cyan-500/20 border-cyan-400 text-cyan-400 animate-pulse' : 'bg-white/5 border-white/10 text-stone-400 hover:text-cyan-400'}`}
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
            </button>
            <button 
              type="button"
              className="flex-1 bg-gradient-to-r from-teal-600 to-cyan-500 hover:from-teal-500 hover:to-cyan-400 text-black font-black text-[10px] uppercase tracking-[0.2em] py-4 rounded-2xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] text-center cursor-pointer"
            >
              Sync Search
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Sidebar: All Filters */}
          <aside className="w-full lg:w-80 flex-shrink-0 bg-[#060606] rounded-[2.5rem] border border-white/10 p-6 md:p-8 h-fit shadow-[0_30px_60px_rgba(0,0,0,0.8)] space-y-8">
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5 text-cyan-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
              <h3 className="font-black text-white uppercase tracking-widest text-xs">Telemetry Filters</h3>
            </div>
            
            {/* Price Filter */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-[9px] font-black text-stone-500 uppercase tracking-widest">Nightly Rate ({currency})</h4>
                <span className="text-xs font-mono font-bold text-cyan-400">{formatPrice(maxPrice)}</span>
              </div>
              <input 
                type="range" 
                min="100" 
                max="2000" 
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-cyan-400 bg-[#0a0a0a] h-1.5 rounded-full appearance-none outline-none border border-white/5 cursor-pointer" 
              />
            </div>

            {/* Experience Modes */}
            <div>
              <h4 className="text-[9px] font-black text-stone-500 uppercase tracking-widest mb-4">Experience Mode</h4>
              <div className="flex flex-col gap-2.5">
                {['All', 'Deep Sleep Optimization', 'Executive Workstation', 'Wellness & Spa Retreat'].map((mode) => (
                  <button 
                    key={mode} 
                    type="button"
                    onClick={() => setSelectedMode(mode)}
                    className={`text-left px-4 py-3 rounded-xl border text-xs font-bold transition-all shadow-inner truncate cursor-pointer ${selectedMode === mode ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-400' : 'border-white/5 bg-[#0a0a0a] text-stone-400 hover:text-white'}`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Smart Amenities Checkboxes */}
            <div>
              <h4 className="text-[9px] font-black text-stone-500 uppercase tracking-widest mb-4">Smart Amenities</h4>
              <div className="space-y-3.5">
                {[
                  { key: 'iotClimate', label: 'IoT Climate & Lighting' },
                  { key: 'robotConcierge', label: 'Robot Concierge' },
                  { key: 'biometricEntry', label: 'Biometric Entry' },
                  { key: 'aiAssistant', label: 'In-Room AI Assistant' }
                ].map((item) => (
                  <label key={item.key} className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                      <input 
                        type="checkbox" 
                        checked={amenities[item.key]} 
                        onChange={() => handleAmenityChange(item.key)}
                        className="peer appearance-none w-4 h-4 border border-white/20 rounded-md bg-[#0a0a0a] checked:bg-cyan-400 checked:border-cyan-400 transition-colors cursor-pointer" 
                      />
                      <svg className="absolute w-3 h-3 text-black opacity-0 peer-checked:opacity-100 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                    </div>
                    <span className="text-xs font-bold text-stone-300 group-hover:text-cyan-300 transition-colors">{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sustainability Toggle */}
            <div>
              <h4 className="text-[9px] font-black text-stone-500 uppercase tracking-widest mb-4">Sustainability</h4>
              <label className="flex items-center justify-between cursor-pointer p-3.5 rounded-2xl bg-teal-950/20 border border-teal-500/30 shadow-inner">
                <span className="text-xs font-bold text-teal-400">Net-Zero Carbon Rooms</span>
                <div className="relative">
                  <input type="checkbox" checked={sustainabilityEco} onChange={() => setSustainabilityEco(!sustainabilityEco)} className="peer sr-only" />
                  <div className="w-10 h-5 bg-black/60 rounded-full border border-white/20 peer-checked:bg-teal-400 transition-colors"></div>
                  <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full peer-checked:translate-x-5 transition-transform shadow-md"></div>
                </div>
              </label>
            </div>
          </aside>

          {/* Right Section: Results & Map */}
          <section className="flex-1 flex flex-col xl:flex-row gap-8 min-w-0">
            <div className={`flex-1 flex flex-col gap-6 min-w-0 ${showMap ? 'xl:w-1/2' : 'w-full'}`}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
                <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-3">
                  Curated Selections 
                  <span className="text-cyan-400 text-[10px] font-black bg-cyan-500/10 border border-cyan-500/30 px-3.5 py-1.5 rounded-full uppercase tracking-widest">
                    {filteredRooms.length} Matches
                  </span>
                </h2>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-between">
                  <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-[#060606] text-stone-300 px-4 py-3 rounded-xl text-[10px] font-black border border-white/10 uppercase tracking-widest outline-none cursor-pointer"
                  >
                    <option value="recommended">Sort: Recommended</option>
                    <option value="low-high">Price: Low to High</option>
                    <option value="high-low">Price: High to Low</option>
                  </select>

                  <button 
                    type="button"
                    onClick={() => setShowMap(!showMap)} 
                    className="xl:hidden bg-[#060606] text-stone-300 px-4 py-3 rounded-xl text-[10px] font-black border border-white/10 uppercase tracking-widest hover:bg-white/10 transition cursor-pointer"
                  >
                    {showMap ? 'Hide Map' : 'Show Map'}
                  </button>
                </div>
              </div>

              {filteredRooms.length > 0 ? (
                filteredRooms.map((room, index) => {
                  const roomId = room.room_number || room.id || index;
                  const isFav = favorites.includes(roomId);
                  const isCompared = compareList.includes(roomId);
                  const priceUSD = Number(room.price_per_night || room.price || 450);

                  return (
                    <div key={roomId} className="bg-[#060606] border border-white/10 rounded-[2.5rem] p-6 md:p-8 flex flex-col gap-6 hover:border-cyan-500/40 transition-all duration-300 group shadow-[0_30px_60px_rgba(0,0,0,0.8)] min-w-0">
                      
                      <div className="flex flex-col sm:flex-row gap-6 items-start min-w-0">
                        <div className="w-full sm:w-48 h-40 bg-black rounded-2xl overflow-hidden relative border border-white/15 flex-shrink-0 shadow-inner">
                           <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80" alt="Room" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                           
                           {/* Wishlist Button */}
                           <button 
                             type="button"
                             onClick={() => toggleFavorite(roomId)}
                             className={`absolute top-3 right-3 w-8 h-8 backdrop-blur-md border rounded-full flex items-center justify-center transition shadow-lg cursor-pointer ${isFav ? 'bg-cyan-500 border-cyan-400 text-black' : 'bg-black/60 border-white/20 text-stone-300'}`}
                           >
                             <svg fill={isFav ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
                           </button>

                           {/* Compare Toggle Button */}
                           <button 
                             type="button"
                             onClick={() => toggleCompare(roomId)}
                             className={`absolute bottom-3 left-3 px-2.5 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest backdrop-blur-md border transition cursor-pointer ${isCompared ? 'bg-cyan-500 text-black border-cyan-400' : 'bg-black/60 text-stone-300 border-white/20'}`}
                           >
                             {isCompared ? 'Comparing' : '+ Compare'}
                           </button>
                        </div>

                        <div className="flex-1 w-full space-y-3 min-w-0">
                          <div className="flex justify-between items-start gap-3 min-w-0">
                            <div className="min-w-0">
                              <h3 className="text-xl font-black text-white tracking-tight truncate">Suite Node {room.room_number || room.id}</h3>
                              <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mt-1 truncate">{room.room_type || room.type || 'Intelligent Suite'} ({room.location || searchParams.location})</p>
                            </div>
                            <span className="bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30 text-[9px] font-black uppercase tracking-widest text-cyan-400 whitespace-nowrap flex-shrink-0">
                              Match: {room.match || '98%'}
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-2 pt-1">
                            <span className="text-[9px] font-black uppercase tracking-widest bg-[#0a0a0a] border border-white/10 text-stone-300 px-3 py-1.5 rounded-xl">
                              Eco-Smart
                            </span>
                            <span className="text-[9px] font-black uppercase tracking-widest bg-[#0a0a0a] border border-white/10 text-stone-300 px-3 py-1.5 rounded-xl">
                              Biometric
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-4 border-t border-white/5 gap-4 min-w-0">
                        <div className="min-w-0">
                          <div className="flex items-baseline gap-1.5 min-w-0">
                            <span className="text-2xl font-black text-white font-mono">{formatPrice(priceUSD)}</span>
                            <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">/ night</span>
                          </div>
                          <p className="text-[9px] text-cyan-400 uppercase tracking-widest font-black mt-0.5 truncate">Dynamic Rate Locked</p>
                        </div>

                        <div className="flex gap-2 w-full sm:w-auto">
                          <button 
                            type="button"
                            onClick={() => setActiveModalRoom(room)} 
                            className="flex-1 sm:flex-initial bg-white/5 hover:bg-white/10 border border-white/10 text-stone-300 px-5 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition cursor-pointer"
                          >
                            Telemetry
                          </button>
                          <button 
                            type="button"
                            onClick={() => setCurrentPage ? setCurrentPage('checkout') : null} 
                            className="flex-1 sm:flex-initial flex-shrink-0 bg-gradient-to-r from-teal-600 to-cyan-500 text-black px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:from-teal-500 hover:to-cyan-400 transition-all shadow-lg text-center cursor-pointer"
                          >
                            Reserve Suite
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })
              ) : (
                <div className="bg-[#060606] border border-white/10 rounded-[2.5rem] p-16 text-center">
                   <h3 className="text-xs font-black text-stone-400 uppercase tracking-widest mb-1">No Matching Suite Nodes Found</h3>
                </div>
              )}
            </div>

            {/* Map Panel */}
            {showMap && (
              <div className="flex-1 rounded-[2.5rem] border border-white/10 overflow-hidden relative min-h-[400px] xl:min-h-full xl:sticky xl:top-8 h-fit hidden xl:block bg-[#060606] shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                 <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80" alt="Map" className="w-full h-full object-cover opacity-40 grayscale mix-blend-lighten" />
              </div>
            )}
          </section>
        </div>
      </div>

      {/* 3D Suite Telemetry / Quick View Modal */}
      {activeModalRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-[#080808] border border-white/10 rounded-[2.5rem] max-w-lg w-full p-8 relative shadow-[0_30px_80px_rgba(0,0,0,0.9)] space-y-6">
            <button 
              type="button"
              onClick={() => setActiveModalRoom(null)}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-stone-400 hover:text-white transition cursor-pointer"
            >
              ✕
            </button>
            
            <h2 className="text-2xl font-black text-white tracking-tight">Suite Node {activeModalRoom.room_number || activeModalRoom.id} Telemetry</h2>
            <p className="text-xs font-bold text-cyan-400 uppercase tracking-widest">{activeModalRoom.room_type || 'Executive Suite'} | Location: {activeModalRoom.location || searchParams.location}</p>
            
            <div className="space-y-3 text-xs text-stone-300">
              <div className="bg-[#0a0a0a] p-4 rounded-2xl border border-white/5 flex justify-between">
                <span className="text-stone-500 uppercase font-black">Current Nightly Rate</span>
                <span className="font-mono font-bold text-white">{formatPrice(Number(activeModalRoom.price_per_night || activeModalRoom.price || 450))}</span>
              </div>
              <div className="bg-[#0a0a0a] p-4 rounded-2xl border border-white/5 flex justify-between">
                <span className="text-stone-500 uppercase font-black">AI Compatibility Score</span>
                <span className="font-bold text-cyan-400">{activeModalRoom.match || '98%'} Optimal</span>
              </div>
              <div className="bg-[#0a0a0a] p-4 rounded-2xl border border-white/5 flex justify-between">
                <span className="text-stone-500 uppercase font-black">IoT Climate Regulation</span>
                <span className="font-bold text-teal-400">Stable (21.5 C)</span>
              </div>
            </div>

            <button 
              type="button"
              onClick={() => { setActiveModalRoom(null); if(setCurrentPage) setCurrentPage('checkout'); }}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-teal-600 to-cyan-500 text-black font-black text-xs uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(6,182,212,0.4)] cursor-pointer"
            >
              Proceed to Secure Checkout
            </button>
          </div>
        </div>
      )}

      {/* Compare Suites Drawer Modal */}
      {isCompareOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-[#080808] border border-white/10 rounded-[2.5rem] max-w-3xl w-full p-8 relative shadow-[0_30px_80px_rgba(0,0,0,0.9)] space-y-6">
            <button 
              type="button"
              onClick={() => setIsCompareOpen(false)}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-stone-400 hover:text-white transition cursor-pointer"
            >
              ✕
            </button>
            
            <h2 className="text-2xl font-black text-white tracking-tight">Suite Comparison Matrix</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {compareList.map(id => {
                const room = dataSource.find(r => (r.room_number || r.id) === id) || dataSource[0];
                return (
                  <div key={id} className="bg-[#0a0a0a] border border-white/10 p-5 rounded-2xl space-y-3">
                    <h3 className="font-bold text-white text-sm">Node {room.room_number || room.id}</h3>
                    <p className="text-[10px] text-cyan-400 uppercase font-bold">{room.room_type || 'Suite'}</p>
                    <p className="text-xs font-mono font-bold text-stone-200">{formatPrice(Number(room.price_per_night || room.price || 450))} / night</p>
                    <button 
                      type="button"
                      onClick={() => setCompareList(prev => prev.filter(item => item !== id))}
                      className="w-full py-2 bg-red-500/10 border border-red-500/30 text-red-400 text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-red-500/20 cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default RoomsSearch;