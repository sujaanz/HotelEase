import React, { useState } from 'react';

function Home({ setCurrentPage }) {
  const [searchMode, setSearchMode] = useState('smart'); // 'smart' or 'manual'

  return (
    <div className="w-full bg-[#0a0a0a] text-white font-sans overflow-hidden selection:bg-teal-500 selection:text-white">
      
      {/* 1. Futuristic AI Hero Section */}
      <section className="relative w-full h-[90vh] min-h-[650px] flex flex-col justify-center items-center px-4">
        
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[70%] bg-teal-900/30 blur-[120px] rounded-full animate-pulse"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[70%] bg-blue-900/20 blur-[120px] rounded-full animate-pulse delay-1000"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542314831-c6a4d14d4c57?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')" }}
          ></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center mt-12 mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping"></span>
            <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-teal-100">HotelEase Next-Gen v2.0</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-tight">
            The Future of <br className="hidden md:block"/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">Intelligent Stays.</span>
          </h1>
          <p className="text-sm md:text-lg font-light text-gray-400 max-w-2xl mx-auto">
            Experience the world's first AI-driven hospitality ecosystem. From smart bookings to IoT-connected luxury suites.
          </p>
        </div>

        {/* AI Smart Search Console */}
        <div className="relative z-20 w-full max-w-3xl bg-white/5 backdrop-blur-2xl p-4 rounded-3xl shadow-[0_0_50px_rgba(20,184,166,0.15)] border border-white/10">
          
          {/* Mode Toggle */}
          <div className="flex justify-center mb-4 gap-4">
            <button 
              onClick={() => setSearchMode('smart')}
              className={`text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full transition-all ${searchMode === 'smart' ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30' : 'text-gray-500 hover:text-gray-300'}`}
            >
              AI Prompt Booking
            </button>
            <button 
              onClick={() => setSearchMode('manual')}
              className={`text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full transition-all ${searchMode === 'manual' ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30' : 'text-gray-500 hover:text-gray-300'}`}
            >
              Manual Search
            </button>
          </div>

          {searchMode === 'smart' ? (
            <div className="relative flex items-center">
              <div className="absolute left-4 text-xs font-bold text-teal-400 tracking-widest uppercase">AI</div>
              <input 
                type="text" 
                placeholder="e.g., I want a penthouse in Maldives for 2 adults next Friday..." 
                className="w-full bg-black/40 border border-white/10 rounded-2xl py-5 pl-14 pr-32 text-sm text-white placeholder-gray-500 outline-none focus:border-teal-500/50 transition-colors"
              />
              <button 
                onClick={() => setCurrentPage('rooms')}
                className="absolute right-2 top-2 bottom-2 bg-gradient-to-r from-teal-500 to-blue-600 text-white px-6 rounded-xl font-bold text-sm hover:shadow-[0_0_20px_rgba(20,184,166,0.4)] transition-all"
              >
                Generate
              </button>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-3">
              <input type="text" placeholder="Destination" className="flex-1 bg-black/40 border border-white/10 rounded-xl py-4 px-4 text-sm text-white outline-none focus:border-teal-500/50" />
              <input type="text" placeholder="Check-in - Out" className="flex-1 bg-black/40 border border-white/10 rounded-xl py-4 px-4 text-sm text-white outline-none focus:border-teal-500/50" />
              <button onClick={() => setCurrentPage('rooms')} className="bg-white text-black px-8 py-4 rounded-xl font-black text-sm hover:bg-gray-200 transition">Search</button>
            </div>
          )}
        </div>
      </section>

      {/* 2. Smart Room IoT Integration Preview */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-white/5 relative">
        <div className="absolute left-0 top-1/2 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full"></div>
        
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="w-full md:w-1/2">
            <span className="text-teal-400 text-xs font-bold uppercase tracking-widest mb-2 block">IoT Connected Stays</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">Control your sanctuary <br/>from your phone.</h2>
            <p className="text-gray-400 font-light mb-8 leading-relaxed">
              Every HotelEase premium suite comes equipped with smart room technology. Adjust the mood lighting, draw the curtains, or set the perfect AC temperature before you even step inside.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-white/10 transition">
                <span className="text-xs font-bold text-teal-400 mb-1">CLIMATE</span>
                <span className="text-xs font-medium text-gray-300">22°C Controlled</span>
              </div>
              <div className="bg-teal-500/10 border border-teal-500/30 p-4 rounded-2xl flex flex-col items-center justify-center cursor-pointer shadow-[0_0_15px_rgba(20,184,166,0.1)]">
                <span className="text-xs font-bold text-teal-400 mb-1">AMBIENCE</span>
                <span className="text-xs font-medium text-teal-200">Relax Mode</span>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-white/10 transition">
                <span className="text-xs font-bold text-teal-400 mb-1">AUDIO</span>
                <span className="text-xs font-medium text-gray-300">Spatial Sync</span>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-white/10 transition">
                <span className="text-xs font-bold text-teal-400 mb-1">SECURITY</span>
                <span className="text-xs font-medium text-gray-300">Biometric Active</span>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-teal-500 to-blue-600 rounded-3xl transform rotate-3 blur-lg opacity-20"></div>
            <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Smart Room" className="relative rounded-3xl border border-white/10 shadow-2xl z-10" />
          </div>
        </div>
      </section>

      {/* 3. 360° VR Previews */}
      <section className="bg-white/5 border-y border-white/10 py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-2 block">Virtual Reality</span>
          <h2 className="text-4xl font-black tracking-tight mb-12">Don't just look. Step inside.</h2>
          
          <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden group cursor-pointer border border-white/10 shadow-2xl">
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition duration-500 z-10"></div>
            <img src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" alt="VR Room" className="w-full h-full object-cover scale-100 group-hover:scale-105 transition duration-1000" />
            
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="px-6 py-3 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest border border-white/30 group-hover:bg-white group-hover:text-black transition">
                Launch 360 Tour
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. NEW FEATURE: VIP Loyalty Tiers (Fills page richness) */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <span className="text-teal-400 text-xs font-bold uppercase tracking-widest mb-2 block">Membership</span>
          <h2 className="text-4xl font-black tracking-tight">The Inner Circle Privileges</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Tier 01</span>
              <h3 className="text-2xl font-bold mt-2 mb-4">Silver Access</h3>
              <p className="text-stone-400 text-sm font-light mb-6">Complimentary high-speed satellite internet and priority late checkout.</p>
            </div>
            <button onClick={() => setCurrentPage('auth')} className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold uppercase tracking-wider transition">Join Free</button>
          </div>

          <div className="bg-gradient-to-b from-teal-900/40 to-black border border-teal-500/30 p-8 rounded-3xl flex flex-col justify-between relative shadow-[0_0_30px_rgba(20,184,166,0.1)]">
            <span className="absolute -top-3 right-8 bg-teal-500 text-black text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full">Popular</span>
            <div>
              <span className="text-xs font-bold text-teal-400 uppercase tracking-widest">Tier 02</span>
              <h3 className="text-2xl font-bold mt-2 mb-4">Gold Elite</h3>
              <p className="text-stone-300 text-sm font-light mb-6">Complimentary airport transfers, daily spa credits, and room upgrades.</p>
            </div>
            <button onClick={() => setCurrentPage('auth')} className="w-full py-3 bg-teal-600 hover:bg-teal-500 rounded-xl text-xs font-bold uppercase tracking-wider transition">Upgrade Now</button>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Tier 03</span>
              <h3 className="text-2xl font-bold mt-2 mb-4">Platinum Reserve</h3>
              <p className="text-stone-400 text-sm font-light mb-6">Dedicated 24/7 private butler, private helicopter access, and custom dining.</p>
            </div>
            <button onClick={() => setCurrentPage('auth')} className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold uppercase tracking-wider transition">Request Access</button>
          </div>
        </div>
      </section>

      {/* 5. Hyper-Modern Destinations */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-black tracking-tight mb-2">Global Network</h2>
            <p className="text-sm text-gray-400">Exclusive properties seamlessly integrated with our AI engine.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'Kyoto, Japan', status: '8 Smart Suites Available', img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
            { name: 'Maldives', status: 'VR Tour Active', img: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
            { name: 'Swiss Alps', status: 'Crypto Booking Enabled', img: 'https://images.unsplash.com/photo-1531366936336-62fc674621c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
          ].map((dest, idx) => (
            <div 
              key={idx} 
              className="relative h-80 rounded-2xl overflow-hidden group cursor-pointer border border-white/10" 
              onClick={() => setCurrentPage('rooms')}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10"></div>
              <img src={dest.img} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
              <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-end">
                <div>
                  <h3 className="text-white font-black text-2xl mb-1">{dest.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
                    <span className="text-[10px] uppercase tracking-wider text-teal-400 font-bold">{dest.status}</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-white group-hover:text-black transition">
                  →
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

export default Home;