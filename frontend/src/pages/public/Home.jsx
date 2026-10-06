import React from 'react';

function Home({ setCurrentPage }) {
  return (
    <div className="w-full">
      {/* 1. Hero Section (আপনার ডিজাইন অনুযায়ী) */}
      <section className="relative w-full h-[70vh] min-h-[500px] flex flex-col justify-center items-center text-center px-4 bg-teal-900 overflow-hidden">
        
        {/* ব্যাকগ্রাউন্ড ইমেজ ও ডার্ক ওভারলে */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 opacity-40 mix-blend-overlay" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542314831-c6a4d14d4c57?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 to-transparent z-0"></div>

        {/* Hero Content */}
        <div className="relative z-10 text-white max-w-4xl mx-auto mb-10 mt-10">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-white drop-shadow-lg">
            Find Your Perfect Stay
          </h1>
          <p className="text-base md:text-xl font-medium text-teal-50 drop-shadow-md">
            Experience world-class luxury, comfort, and seamless reservations with HotelEase.
          </p>
        </div>

        {/* Booking Search Bar (ডিজাইনের মতো রাউন্ডেড বক্স) */}
        <div className="relative z-20 w-full max-w-4xl bg-white p-3 rounded-2xl shadow-xl flex flex-col md:flex-row gap-3 items-center border border-gray-100">
          
          <div className="w-full flex-1 border border-gray-200 rounded-xl p-2.5 flex items-center bg-gray-50 hover:bg-white hover:border-teal-400 transition cursor-text group">
            <span className="text-xl px-2 text-teal-600 group-hover:text-teal-800 transition">📍</span>
            <div className="flex flex-col w-full text-left">
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Location</span>
              <input type="text" placeholder="Where are you going?" className="w-full bg-transparent outline-none text-gray-800 font-bold text-sm placeholder-gray-400" defaultValue="Dhaka" />
            </div>
          </div>
          
          <div className="w-full flex-1 border border-gray-200 rounded-xl p-2.5 flex items-center bg-gray-50 hover:bg-white hover:border-teal-400 transition cursor-text group">
            <span className="text-xl px-2 text-teal-600 group-hover:text-teal-800 transition">📅</span>
            <div className="flex flex-col w-full text-left">
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Dates</span>
              <input type="text" placeholder="Check-in - Check-out" className="w-full bg-transparent outline-none text-gray-800 font-bold text-sm placeholder-gray-400" />
            </div>
          </div>

          <div className="w-full flex-1 border border-gray-200 rounded-xl p-2.5 flex items-center bg-gray-50 hover:bg-white hover:border-teal-400 transition cursor-pointer group">
            <span className="text-xl px-2 text-teal-600 group-hover:text-teal-800 transition">👥</span>
            <div className="flex flex-col w-full text-left">
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Guests</span>
              <select className="w-full bg-transparent outline-none text-gray-800 font-bold text-sm cursor-pointer appearance-none">
                <option>2 Adults, 1 Room</option>
                <option>1 Adult, 1 Room</option>
                <option>Family (4 Adults)</option>
              </select>
            </div>
          </div>

          <button 
            onClick={() => setCurrentPage('rooms')}
            className="w-full md:w-auto bg-teal-600 text-white px-8 py-3.5 rounded-xl font-black text-sm hover:bg-teal-700 active:scale-95 transition shadow-md"
          >
            Search
          </button>
        </div>
      </section>

      {/* 2. Featured Offers & Destinations (আপনার ডিজাইনের মতো) */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        
        {/* Featured Offers */}
        <div className="mb-16">
          <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-black text-gray-800">Featured Offers</h2>
            <button onClick={() => setCurrentPage('promos')} className="text-sm font-bold text-teal-600 hover:text-teal-800">View All</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col md:flex-row group hover:shadow-md transition">
              <div className="w-full md:w-2/5 h-48 md:h-auto overflow-hidden">
                <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Summer Promo" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="w-full md:w-3/5 p-6 flex flex-col justify-center bg-teal-900 text-white relative overflow-hidden">
                <div className="absolute -right-10 -bottom-10 opacity-10 text-9xl">🏖️</div>
                <span className="bg-teal-400 text-teal-900 text-[10px] font-black px-2.5 py-1 rounded-md w-fit mb-3 uppercase tracking-wider">SUMMER25</span>
                <h3 className="text-xl font-black mb-2">Summer Getaway</h3>
                <p className="text-teal-100/80 text-xs mb-5 font-medium">Book early and get a massive 25% discount on all premium suites.</p>
                <button onClick={() => setCurrentPage('rooms')} className="w-fit bg-white text-teal-900 px-4 py-2 rounded-lg text-xs font-bold hover:bg-teal-50 transition shadow-sm">Claim Offer</button>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col md:flex-row group hover:shadow-md transition">
              <div className="w-full md:w-2/5 h-48 md:h-auto overflow-hidden">
                <img src="https://images.unsplash.com/photo-1551882547-ff40c0d509af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Welcome Bonus" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="w-full md:w-3/5 p-6 flex flex-col justify-center bg-gray-900 text-white relative overflow-hidden">
                <div className="absolute -right-10 -bottom-10 opacity-10 text-9xl">✨</div>
                <span className="bg-gray-700 text-white text-[10px] font-black px-2.5 py-1 rounded-md w-fit mb-3 uppercase tracking-wider">WELCOME50</span>
                <h3 className="text-xl font-black mb-2">New User Bonus</h3>
                <p className="text-gray-300 text-xs mb-5 font-medium">Sign up today and receive a flat $50 off your first booking.</p>
                <button onClick={() => setCurrentPage('auth')} className="w-fit bg-teal-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-teal-500 transition shadow-sm">Sign Up Now</button>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Destinations */}
        <div>
          <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-black text-gray-800">Popular Destinations</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Dhaka', 'Cox\'s Bazar', 'Sylhet', 'Chittagong'].map((city, idx) => (
              <div key={idx} className="relative h-40 rounded-2xl overflow-hidden group cursor-pointer" onClick={() => setCurrentPage('rooms')}>
                <div className="absolute inset-0 bg-gray-900/40 group-hover:bg-gray-900/20 transition z-10"></div>
                <img src={`https://source.unsplash.com/random/400x300/?city,${city}`} alt={city} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                <div className="absolute bottom-4 left-4 z-20">
                  <h3 className="text-white font-black text-lg drop-shadow-md">{city}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>
    </div>
  );
}

export default Home;