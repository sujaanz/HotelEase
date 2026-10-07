import React, { useState, useEffect } from 'react';

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

  // Interactive Popup States for Calendar & Occupancy Modals
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isOccupancyOpen, setIsOccupancyOpen] = useState(false);

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

  // Clean Search Parameters State (No Dummy Data)
  const [searchParams, setSearchParams] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    adults: 1,
    roomsCount: 1
  });

  // Sync Search Query from Home Page (LocalStorage)
  useEffect(() => {
    const savedQuery = localStorage.getItem('hotelSearchQuery');
    if (savedQuery) {
      setSearchParams(prev => ({ ...prev, location: savedQuery }));
      localStorage.removeItem('hotelSearchQuery');
    }
  }, []);

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
    { id: 101, room_number: '101', room_type: 'King Suite', price_per_night: 250, match: '98%', features: ['Eco-Smart', 'Biometric', 'IoT Climate'], location: 'Kyoto' },
    { id: 102, room_number: '102', room_type: 'Executive Penthouse', price_per_night: 650, match: '95%', features: ['Private Balcony', 'AI Butler', 'Robot Concierge'], location: 'Kyoto' },
    { id: 103, room_number: '103', room_type: 'Zen Garden Villa', price_per_night: 420, match: '92%', features: ['Onsen Bath', 'Net-Zero', 'Biometric Entry'], location: 'Tokyo' },
    { id: 104, room_number: '104', room_type: 'Cyber Deluxe', price_per_night: 310, match: '90%', features: ['Spatial Audio', 'Holo-Desk', 'AI Assistant'], location: 'Osaka' }
  ];

  const dataSource = Array.isArray(rooms) && rooms.length > 0 ? rooms : defaultRooms;

  // Fully Functional Filter and Sort Logic
  const filteredRooms = dataSource.filter(room => {
    const price = Number(room.price_per_night || room.price || 450);
    const type = room.room_type || room.type || 'Suite';
    const roomLocation = room.location || '';
    const roomFeatures = room.features || [];

    const matchesPrice = price <= maxPrice;
    
    // Experience Mode Matching
    const matchesMode = 
      selectedMode === 'All' || 
      (selectedMode === 'Deep Sleep Optimization' && (type.toLowerCase().includes('suite') || roomFeatures.includes('Eco-Smart'))) ||
      (selectedMode === 'Executive Workstation' && (type.toLowerCase().includes('penthouse') || type.toLowerCase().includes('deluxe'))) ||
      (selectedMode === 'Wellness & Spa Retreat' && (type.toLowerCase().includes('villa') || roomFeatures.includes('Onsen Bath')));

    // Dynamic Location Search Matching
    const matchesLocation = !searchParams.location || 
      roomLocation.toLowerCase().includes(searchParams.location.toLowerCase()) || 
      type.toLowerCase().includes(searchParams.location.toLowerCase());

    const matchesEco = !sustainabilityEco || roomFeatures.includes('Net-Zero') || roomFeatures.includes('Eco-Smart') || type.toLowerCase().includes('villa');

    // Smart Amenities Filtering
    const matchesAmenities = 
      (!amenities.iotClimate || roomFeatures.some(f => f.toLowerCase().includes('climate') || f.toLowerCase().includes('iot') || f.toLowerCase().includes('eco'))) &&
      (!amenities.robotConcierge || roomFeatures.some(f => f.toLowerCase().includes('concierge') || f.toLowerCase().includes('robot') || f.toLowerCase().includes('butler'))) &&
      (!amenities.biometricEntry || roomFeatures.some(f => f.toLowerCase().includes('biometric') || f.toLowerCase().includes('entry'))) &&
      (!amenities.aiAssistant || roomFeatures.some(f => f.toLowerCase().includes('ai') || f.toLowerCase().includes('assistant')));

    return matchesPrice && matchesMode && matchesLocation && matchesEco && matchesAmenities;
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
            type="button"
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
                  type="button"
                  onClick={() => setCurrency(curr)}
                  className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all cursor-pointer ${currency === curr ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40' : 'text-stone-500 hover:text-stone-300'}`}
                >
                  {curr}
                </button>
              ))}
            </div>

            {compareList.length > 0 && (
              <button 
                type="button"
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

        {/* Top Search Console (Clean Inputs & Safe Sync Button) */}
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
                placeholder="Search city, sector or suite..."
                className="w-full bg-transparent border-none outline-none text-xs font-bold text-white placeholder-stone-500"
              />
            </div>
          </div>
          
          {/* Temporal Span */}
          <div 
            onClick={() => setIsCalendarOpen(true)}
            className="bg-[#0a0a0a] rounded-2xl px-4 py-3 text-white flex items-center gap-3 border border-white/5 shadow-inner cursor-pointer hover:border-cyan-500/30 transition-all"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5 text-cyan-400 flex-shrink-0"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-[8px] text-stone-500 uppercase tracking-widest font-black">Temporal Span</span>
              <span className="text-xs font-bold text-white truncate">
                {searchParams.checkIn && searchParams.checkOut ? `${searchParams.checkIn} to ${searchParams.checkOut}` : 'Select dates...'}
              </span>
            </div>
          </div>
          
          {/* Occupancy Matrix */}
          <div 
            onClick={() => setIsOccupancyOpen(true)}
            className="bg-[#0a0a0a] rounded-2xl px-4 py-3 text-white flex items-center gap-3 border border-white/5 shadow-inner cursor-pointer hover:border-cyan-500/30 transition-all"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5 text-cyan-400 flex-shrink-0"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-[8px] text-stone-500 uppercase tracking-widest font-black">Occupancy Matrix</span>
              <span className="text-xs font-bold text-white truncate">{searchParams.adults} Adults, {searchParams.roomsCount} Suite</span>
            </div>
          </div>

          {/* Voice Search & Safe Sync Search Button */}
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
              onClick={() => {
                // Safe Sync: Keeps parameters intact, just applies reactive search feedback
              }}
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

              {/* Room Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredRooms.length > 0 ? (
                  filteredRooms.map((room, index) => {
                    const roomId = room.room_number || room.id || index;
                    const roomPrice = Number(room.price_per_night || room.price || 450);
                    const roomType = room.room_type || room.type || 'Luxury Suite';
                    const roomImg = room.image || 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                    const isFav = favorites.includes(roomId);
                    const isCompared = compareList.includes(roomId);

                    return (
                      <div key={roomId} className="bg-[#060606] border border-white/10 rounded-[2rem] overflow-hidden group hover:border-cyan-500/40 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col justify-between">
                        <div className="relative h-48 overflow-hidden">
                          <img src={roomImg} alt={roomType} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100" />
                          <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black font-mono text-white border border-white/10">
                            {formatPrice(roomPrice)} / night
                          </div>
                          <button 
                            type="button"
                            onClick={() => toggleFavorite(roomId)}
                            className={`absolute top-4 left-4 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md border transition-all cursor-pointer ${isFav ? 'bg-red-500/20 border-red-500/50 text-red-400' : 'bg-black/60 border-white/10 text-white hover:text-cyan-400'}`}
                          >
                            <svg className="w-4 h-4" fill={isFav ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                          </button>
                        </div>
                        <div className="p-6 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[9px] font-black text-cyan-400 uppercase tracking-widest">{room.location || searchParams.location}</span>
                              <span className="text-[9px] font-mono bg-white/5 border border-white/10 px-2 py-0.5 rounded text-stone-300">Match: {room.match || '95%'}</span>
                            </div>
                            <h3 className="text-lg font-black text-white mb-2 tracking-tight">{roomType}</h3>
                            <p className="text-xs text-stone-400 line-clamp-2 mb-4 font-bold">Ultra-modern smart suite with automated climate, biometric lock, and ambient lighting.</p>
                          </div>
                          
                          <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                            <button 
                              type="button"
                              onClick={() => toggleCompare(roomId)}
                              className={`text-[9px] font-black uppercase tracking-widest px-3 py-2 rounded-xl border transition-all cursor-pointer ${isCompared ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-400' : 'bg-[#0a0a0a] border-white/10 text-stone-400 hover:text-white'}`}
                            >
                              {isCompared ? 'Compared' : '+ Compare'}
                            </button>
                            <button 
                              type="button"
                              onClick={() => setActiveModalRoom(room)}
                              className="text-[9px] font-black text-cyan-400 hover:text-white uppercase tracking-widest cursor-pointer active:scale-95 transition-transform"
                            >
                              Inspect Node →
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="col-span-2 py-20 text-center bg-[#060606] border border-white/10 rounded-[2.5rem]">
                    <p className="text-stone-500 text-xs font-black uppercase tracking-widest">No Suites Found Matching Parameters</p>
                  </div>
                )}
              </div>
            </div>

            {/* Interactive Map Section */}
            {showMap && (
              <div className="xl:w-1/2 bg-[#060606] border border-white/10 rounded-[2.5rem] p-6 shadow-[0_30px_60px_rgba(0,0,0,0.8)] flex flex-col h-[650px] sticky top-28">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xs font-black uppercase tracking-widest text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                    Sector Radar Map
                  </h3>
                  <span className="text-[9px] font-mono text-cyan-400">Live Satellite Feed</span>
                </div>
                <div className="flex-1 bg-[#0a0a0a] rounded-[2rem] border border-white/5 relative overflow-hidden flex items-center justify-center group">
                  <div className="absolute inset-0 bg-[radial-gradient(#22d3ee_1px,transparent_1px)] [background-size:24px_24px] opacity-20"></div>
                  <div className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-screen" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')" }}></div>
                  
                  {/* Simulated Radar Pins */}
                  <div className="absolute top-1/3 left-1/3 bg-cyan-500 text-black font-black text-[9px] px-3 py-1.5 rounded-full shadow-[0_0_20px_#22d3ee] animate-bounce cursor-pointer">
                    Kyoto Hub ($250)
                  </div>
                  <div className="absolute bottom-1/3 right-1/4 bg-teal-500 text-black font-black text-[9px] px-3 py-1.5 rounded-full shadow-[0_0_20px_#14b8a6] cursor-pointer">
                    Tokyo Tower ($420)
                  </div>

                  <div className="relative z-10 text-center p-6 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl max-w-xs shadow-2xl">
                    <p className="text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-1">Interactive Telemetry Map</p>
                    <p className="text-[9px] text-stone-400 font-bold">Select any node pin or suite card to inspect sector coordinates and biometric routing.</p>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>

      </div>

      {/* Interactive Calendar Modal */}
      {isCalendarOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="w-full max-w-md bg-[#060606] border border-white/10 rounded-[2.5rem] p-6 shadow-2xl">
            <h3 className="text-sm font-black text-white uppercase tracking-widest mb-4">Select Temporal Span</h3>
            <div className="space-y-4 mb-6">
              <div>
                <label className="text-[9px] font-black text-stone-500 uppercase tracking-widest block mb-1">Check-in Date</label>
                <input 
                  type="date" 
                  value={searchParams.checkIn} 
                  onChange={(e) => setSearchParams({ ...searchParams, checkIn: e.target.value })}
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-3 text-xs font-bold text-white outline-none focus:border-cyan-400" 
                />
              </div>
              <div>
                <label className="text-[9px] font-black text-stone-500 uppercase tracking-widest block mb-1">Check-out Date</label>
                <input 
                  type="date" 
                  value={searchParams.checkOut} 
                  onChange={(e) => setSearchParams({ ...searchParams, checkOut: e.target.value })}
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-3 text-xs font-bold text-white outline-none focus:border-cyan-400" 
                />
              </div>
            </div>
            <button 
              type="button"
              onClick={() => setIsCalendarOpen(false)}
              className="w-full py-3.5 bg-cyan-400 text-black font-black text-[10px] uppercase tracking-widest rounded-xl cursor-pointer"
            >
              Confirm Dates
            </button>
          </div>
        </div>
      )}

      {/* Interactive Occupancy Modal */}
      {isOccupancyOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="w-full max-w-md bg-[#060606] border border-white/10 rounded-[2.5rem] p-6 shadow-2xl">
            <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6">Configure Occupancy</h3>
            <div className="space-y-6 mb-6">
              <div className="flex justify-between items-center bg-[#0a0a0a] p-4 rounded-2xl border border-white/5">
                <div>
                  <p className="text-xs font-bold text-white">Adults</p>
                  <p className="text-[9px] text-stone-500 uppercase tracking-widest">Ages 13 or above</p>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    type="button"
                    onClick={() => setSearchParams(prev => ({ ...prev, adults: Math.max(1, prev.adults - 1) }))}
                    className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white font-bold cursor-pointer hover:bg-white/10"
                  >-</button>
                  <span className="text-sm font-mono font-bold text-cyan-400">{searchParams.adults}</span>
                  <button 
                    type="button"
                    onClick={() => setSearchParams(prev => ({ ...prev, adults: prev.adults + 1 }))}
                    className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white font-bold cursor-pointer hover:bg-white/10"
                  >+</button>
                </div>
              </div>

              <div className="flex justify-between items-center bg-[#0a0a0a] p-4 rounded-2xl border border-white/5">
                <div>
                  <p className="text-xs font-bold text-white">Suites / Rooms</p>
                  <p className="text-[9px] text-stone-500 uppercase tracking-widest">Number of units</p>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    type="button"
                    onClick={() => setSearchParams(prev => ({ ...prev, roomsCount: Math.max(1, prev.roomsCount - 1) }))}
                    className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white font-bold cursor-pointer hover:bg-white/10"
                  >-</button>
                  <span className="text-sm font-mono font-bold text-cyan-400">{searchParams.roomsCount}</span>
                  <button 
                    type="button"
                    onClick={() => setSearchParams(prev => ({ ...prev, roomsCount: prev.roomsCount + 1 }))}
                    className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white font-bold cursor-pointer hover:bg-white/10"
                  >+</button>
                </div>
              </div>
            </div>
            <button 
              type="button"
              onClick={() => setIsOccupancyOpen(false)}
              className="w-full py-3.5 bg-cyan-400 text-black font-black text-[10px] uppercase tracking-widest rounded-xl cursor-pointer"
            >
              Confirm Matrix
            </button>
          </div>
        </div>
      )}

      {/* Room Details Modal */}
      {activeModalRoom && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4">
          <div className="w-full max-w-2xl bg-[#060606] border border-white/10 rounded-[3rem] p-8 shadow-[0_0_80px_rgba(6,182,212,0.3)] relative">
            <button 
              type="button"
              onClick={() => setActiveModalRoom(null)}
              className="absolute top-6 right-6 w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full flex items-center justify-center text-white transition-colors cursor-pointer"
            >
              ✕
            </button>
            <div className="flex items-center gap-2 text-cyan-400 text-[9px] font-black uppercase tracking-widest mb-2">
              <span>Node ID: #{activeModalRoom.id || activeModalRoom.room_number}</span>
            </div>
            <h2 className="text-2xl font-black text-white mb-3 tracking-tight">{activeModalRoom.room_type || activeModalRoom.type}</h2>
            <p className="text-xs font-bold text-stone-400 mb-6 leading-relaxed">
              Equipped with advanced quantum environmental controls, automated security, and 24/7 AI concierge routing.
            </p>
            <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-4 mb-6">
              <span className="text-[9px] font-black uppercase tracking-widest text-stone-500 block mb-2">Features Included</span>
              <div className="flex flex-wrap gap-2">
                {(activeModalRoom.features || ['IoT Climate', 'Biometric Lock', 'Net-Zero']).map((f, i) => (
                  <span key={i} className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[9px] font-black uppercase px-3 py-1 rounded-lg">{f}</span>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <span className="text-lg font-black font-mono text-white">{formatPrice(activeModalRoom.price_per_night || activeModalRoom.price || 450)} <span className="text-xs text-stone-500 font-sans">/ night</span></span>
              
              <button 
                type="button"
                onClick={() => {
                  localStorage.setItem('selectedRoomToBook', JSON.stringify({
                    ...activeModalRoom,
                    dates: searchParams.checkIn && searchParams.checkOut ? `${searchParams.checkIn} to ${searchParams.checkOut}` : 'Oct 15 - Oct 20',
                    occupancy: `${searchParams.adults} Adults, ${searchParams.roomsCount} Suite`
                  }));
                  setActiveModalRoom(null);
                  if (setCurrentPage) {
                    setCurrentPage('checkout'); 
                  } else {
                    window.location.href = '/checkout';
                  }
                }}
                className="px-8 py-4 bg-gradient-to-r from-teal-600 to-cyan-500 hover:from-teal-500 hover:to-cyan-400 text-black font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl shadow-[0_0_20px_rgba(6,182,212,0.4)] cursor-pointer"
              >
                Book Suite Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Comparison Drawer */}
      {isCompareOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4">
          <div className="w-full max-w-4xl bg-[#060606] border border-white/10 rounded-[3rem] p-8 shadow-[0_0_80px_rgba(6,182,212,0.3)] relative">
            <button 
              type="button"
              onClick={() => setIsCompareOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full flex items-center justify-center text-white transition-colors cursor-pointer"
            >
              ✕
            </button>
            <h2 className="text-2xl font-black text-white mb-6 tracking-tight uppercase">Suite Telemetry Comparison</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {compareList.map(id => {
                const suite = dataSource.find(r => (r.room_number || r.id) === id);
                if (!suite) return null;
                return (
                  <div key={id} className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-5 space-y-3">
                    <h4 className="text-sm font-black text-white">{suite.room_type || suite.type}</h4>
                    <p className="text-xs font-mono text-cyan-400">{formatPrice(suite.price_per_night || suite.price || 450)} / night</p>
                    <p className="text-[10px] text-stone-400 font-bold">Match Score: {suite.match || '95%'}</p>
                    <button 
                      type="button"
                      onClick={() => setCompareList(prev => prev.filter(item => item !== id))}
                      className="text-[9px] font-black text-red-400 hover:text-red-300 uppercase tracking-widest pt-2 block cursor-pointer"
                    >
                      Remove from Matrix
                    </button>
                  </div>
                );
              })}
            </div>
            <button 
              type="button"
              onClick={() => setIsCompareOpen(false)}
              className="w-full py-4 bg-cyan-400 text-black font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl cursor-pointer"
            >
              Close Comparison
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default RoomsSearch;