import React, { useState } from 'react';

function RoomsSearch({ rooms, setCurrentPage }) {
  const [showMap, setShowMap] = useState(true);

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-6">
      
      {/* Top Search Bar */}
      <div className="bg-teal-900 rounded-xl p-3 mb-6 flex flex-col md:flex-row gap-3 items-center shadow-md">
        <div className="flex-1 bg-white/10 rounded-lg px-4 py-2 text-white flex items-center gap-2 w-full">
          <span>📍</span> <span className="text-sm font-bold">Dhaka</span>
        </div>
        <div className="flex-1 bg-white/10 rounded-lg px-4 py-2 text-white flex items-center gap-2 w-full">
          <span>📅</span> <span className="text-sm font-bold">Check-in - Check-out</span>
        </div>
        <div className="flex-1 bg-white/10 rounded-lg px-4 py-2 text-white flex items-center gap-2 w-full">
          <span>👥</span> <span className="text-sm font-bold">Guests & Rooms</span>
        </div>
        <button className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm px-6 py-2 rounded-lg transition w-full md:w-auto shadow-sm">
          Modify
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Left Sidebar: Filters */}
        <aside className="w-full lg:w-64 flex-shrink-0 bg-white rounded-2xl shadow-sm border border-gray-100 p-5 h-fit">
          <h3 className="font-black text-gray-800 border-b border-gray-100 pb-3 mb-4">Search Filters</h3>
          
          <div className="mb-6">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Price Range</h4>
            <input type="range" className="w-full accent-teal-600" min="50" max="500" />
            <div className="flex justify-between text-xs font-bold text-gray-600 mt-2">
              <span>$50</span><span>$500+</span>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Amenities</h4>
            <div className="space-y-2">
              {['Free WiFi', 'Pool', 'Spa', 'Gym'].map((item, idx) => (
                <label key={idx} className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 text-teal-600 rounded border-gray-300 focus:ring-teal-600" />
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-teal-800">{item}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Middle/Right: Hotel Results & Map */}
        <section className="flex-1 flex flex-col xl:flex-row gap-6">
          
          {/* Hotel List (Real Data Mapping) */}
          <div className={`flex-1 flex flex-col gap-4 ${showMap ? 'xl:w-1/2' : 'w-full'}`}>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-black text-gray-800">
                Available Rooms 
                <span className="text-teal-600 text-sm bg-teal-50 px-2 py-0.5 rounded-md ml-2">{rooms ? rooms.length : 0} Found</span>
              </h2>
              <button 
                onClick={() => setShowMap(!showMap)} 
                className="xl:hidden bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-bold border border-gray-200"
              >
                {showMap ? 'Hide Map' : 'Show Map'}
              </button>
            </div>

            {/* Check if rooms data exists from backend */}
            {rooms && rooms.length > 0 ? (
              rooms.map((room, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col sm:flex-row gap-4 hover:shadow-md transition">
                  <div className="w-full sm:w-48 h-32 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0 relative">
                     <img src={`https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80`} alt="Room" className="w-full h-full object-cover" />
                     <button className="absolute top-2 right-2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 transition shadow-sm">❤️</button>
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-black text-gray-900 leading-tight">Room {room.room_number || room.id}</h3>
                        <div className="flex items-center gap-1 bg-green-50 px-1.5 py-0.5 rounded border border-green-100 text-[10px] font-black text-green-700">{room.status || 'Available'}</div>
                      </div>
                      <p className="text-xs font-semibold text-gray-500 mt-1 capitalize">Type: {room.room_type || room.type || 'Standard Suite'}</p>
                      <div className="flex flex-wrap gap-1 mt-3">
                        <span className="text-[9px] font-bold uppercase tracking-wider bg-gray-100 text-gray-600 px-2 py-0.5 rounded">Free WiFi</span>
                        <span className="text-[9px] font-bold uppercase tracking-wider bg-green-50 text-green-700 px-2 py-0.5 rounded border border-green-100">Breakfast</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-end mt-4 sm:mt-0 border-t sm:border-t-0 border-gray-100 pt-3 sm:pt-0">
                      <div>
                        <p className="text-xl font-black text-teal-700">${room.price_per_night || room.price || '150'} <span className="text-xs text-gray-500 font-medium">/night</span></p>
                      </div>
                      <button onClick={() => setCurrentPage('checkout')} className="bg-teal-800 text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-teal-900 transition shadow-sm">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center flex flex-col items-center">
                 <div className="text-4xl mb-3">📡</div>
                 <h3 className="text-lg font-black text-gray-800">Waiting for Backend...</h3>
                 <p className="text-xs font-bold text-gray-500 mt-2">Connecting to Flask Server. Please ensure your Python backend is running.</p>
              </div>
            )}
          </div>

          {/* Map View Panel */}
          {showMap && (
            <div className="flex-1 bg-gray-100 rounded-2xl border border-gray-200 overflow-hidden relative min-h-[400px] xl:min-h-full xl:sticky xl:top-24 h-fit hidden xl:block">
               <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80" alt="Map" className="w-full h-full object-cover opacity-60" />
               <div className="absolute inset-0 bg-teal-900/10 backdrop-blur-[1px] flex items-center justify-center">
                 <div className="bg-white/90 backdrop-blur-md p-4 rounded-xl text-center shadow-lg border border-white/50 max-w-xs">
                   <div className="text-3xl mb-2">📍</div>
                   <h3 className="font-black text-gray-800 text-sm">Live Properties</h3>
                   <p className="text-xs text-gray-500 mt-1 font-medium">Map syncs with your database.</p>
                 </div>
               </div>
            </div>
          )}

        </section>
      </div>
    </div>
  );
}

export default RoomsSearch;