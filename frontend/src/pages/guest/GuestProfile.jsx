import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GuestProfile() {
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming'); 

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

  return (
    <div className="w-full min-h-screen bg-[#070707] text-stone-200 font-sans selection:bg-teal-500 selection:text-white pt-10 pb-20 px-4 md:px-10">
      <div className="max-w-[1050px] mx-auto space-y-8">
        
        {/* Ultra-Modern Dark Glassmorphism Profile Header */}
        <div className="relative bg-gradient-to-br from-white/[0.07] via-white/[0.03] to-transparent backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
          {/* Ambient Lighting Accents */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left w-full">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl blur opacity-30 group-hover:opacity-75 transition duration-500"></div>
                <div className="relative w-24 h-24 bg-[#121212] rounded-2xl p-1.5 border border-white/10 flex items-center justify-center">
                  <img src="https://ui-avatars.com/api/?name=Valued+Guest&background=121212&color=2dd4bf&bold=true&size=200" alt="Profile" className="w-full h-full rounded-xl object-cover" />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[9px] font-bold uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"></span>
                  Verified Elite Status
                </div>
                <h1 className="text-3xl md:text-4xl font-light text-white tracking-tight">Valued Guest</h1>
                <p className="text-xs text-stone-400 font-medium tracking-wide">guest@secureportal.com <span className="mx-2 text-stone-600">/</span> +880 1234 567890</p>
              </div>
            </div>

            {/* Quick Metrics Badge Group */}
            <div className="flex md:flex-col gap-3 w-full md:w-auto justify-center">
              <div className="bg-white/[0.04] border border-white/10 px-5 py-3 rounded-2xl text-center md:text-right backdrop-blur-md">
                <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">Reward Balance</p>
                <p className="text-lg font-light text-teal-400 tracking-wide mt-0.5">1,250 PTS</p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls Section & Sleek Tab Switcher */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white/[0.02] border border-white/5 p-4 rounded-2xl backdrop-blur-md">
          <div className="flex items-center gap-3 px-2">
            <div className="w-2 h-2 rounded-full bg-teal-400"></div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">Itinerary Registry</h2>
          </div>
          
          <div className="bg-black/60 p-1.5 rounded-xl border border-white/10 flex w-full sm:w-auto">
            <button 
              onClick={() => setActiveTab('upcoming')}
              className={`flex-1 sm:flex-none px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${activeTab === 'upcoming' ? 'bg-white/10 text-white shadow-lg border border-white/10' : 'text-stone-500 hover:text-stone-300'}`}
            >
              Upcoming Stays
            </button>
            <button 
              onClick={() => setActiveTab('past')}
              className={`flex-1 sm:flex-none px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${activeTab === 'past' ? 'bg-white/10 text-white shadow-lg border border-white/10' : 'text-stone-500 hover:text-stone-300'}`}
            >
              Past History
            </button>
          </div>
        </div>
        
        {/* Booking Cards Container */}
        <div className="space-y-4">
          {loading ? (
            <div className="bg-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/10 p-16 text-center flex flex-col items-center justify-center min-h-[300px]">
               <div className="w-8 h-8 border-2 border-teal-500/20 border-t-teal-400 rounded-full animate-spin mb-4"></div>
               <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest">Synchronizing secure records...</h3>
            </div>
          ) : displayedBookings.length === 0 ? (
            <div className="bg-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/10 p-16 text-center min-h-[300px] flex flex-col justify-center items-center">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-stone-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
              </div>
              <h3 class="text-sm font-light text-white tracking-wide mb-1">No {activeTab} records located</h3>
              <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Your portfolio for this category is completely clear.</p>
            </div>
          ) : (
            displayedBookings.map((booking) => {
              const checkInDate = booking.check_in ? new Date(booking.check_in) : null;
              const isCancelled = booking.status === 'Cancelled';
              const isCompleted = booking.status === 'Completed';

              return (
                <div key={booking.id} className="group bg-gradient-to-r from-white/[0.04] to-white/[0.01] backdrop-blur-md rounded-2xl border border-white/10 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:border-teal-500/40 hover:bg-white/[0.06] transition-all duration-300 shadow-lg">
                  
                  <div className="flex gap-5 items-center w-full md:w-auto">
                    {/* Modern Date Box */}
                    <div className="w-18 h-18 w-20 bg-black/60 text-teal-400 rounded-2xl flex flex-col items-center justify-center border border-white/10 flex-shrink-0 group-hover:border-teal-500/40 group-hover:scale-105 transition-all duration-300 shadow-inner">
                      <span className="text-[9px] font-extrabold uppercase tracking-widest text-stone-400">
                        {checkInDate ? checkInDate.toLocaleString('default', { month: 'short' }) : 'N/A'}
                      </span>
                      <span className="text-2xl font-light text-white mt-0.5">
                        {checkInDate ? checkInDate.getDate() : '--'}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-xl font-light text-white tracking-wide">Suite {booking.room_number || 'TBD'}</h3>
                        
                        <span className={`px-2.5 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest border ${
                          isCancelled ? 'bg-red-500/10 border-red-500/20 text-red-400' : 
                          isCompleted ? 'bg-stone-500/10 border-stone-500/20 text-stone-400' : 
                          'bg-teal-500/10 border-teal-500/20 text-teal-400'
                        }`}>
                          {booking.status || 'Confirmed'}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                        <span className="text-stone-500">Identifier: BKG-{booking.id}</span>
                        <span className="text-stone-300">Valuation: ${(Number(booking.total_amount) || 0).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Button Controls */}
                  <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                    {activeTab === 'upcoming' && (
                      <button 
                        onClick={() => alert(`Initiating cancellation protocol for BKG-${booking.id}`)}
                        className="flex-1 md:flex-none bg-white/5 border border-white/10 text-stone-300 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all duration-200"
                      >
                        Cancel Stay
                      </button>
                    )}
                    <button 
                      onClick={() => alert(`Downloading secure invoice bundle for BKG-${booking.id}`)}
                      className="flex-1 md:flex-none bg-teal-600 hover:bg-teal-500 text-white border border-teal-500/40 px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(20,184,166,0.25)] hover:shadow-[0_0_25px_rgba(20,184,166,0.4)] transition-all duration-300"
                    >
                      Download Invoice
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
}

export default GuestProfile;