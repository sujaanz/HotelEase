import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FrontDesk() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [checkedInIds, setCheckedInIds] = useState([]);
  const [quickId, setQuickId] = useState("");
  
  // নতুন ফিচার স্টেট: শিফট হ্যান্ডওভার নোটস এবং এনকোডেড কি-কার্ড
  const [notes, setNotes] = useState([
    { id: 1, author: 'Shift Lead - Alex', time: '10:30 AM', text: 'VIP guest arriving in Room 302 at 3 PM. Keep champagne ready.' },
    { id: 2, author: 'Night Audit - Sarah', time: '06:00 AM', text: 'All system nodes synced with OTAs without errors.' }
  ]);
  const [newNote, setNewNote] = useState("");
  const [encodedKeys, setEncodedKeys] = useState([]);

  // ফ্লাস্ক ব্যাকএন্ড থেকে সমস্ত বুকিংয়ের ডেটা নিয়ে আসা (অরিজিনাল লজিক সুরক্ষিত)
  const fetchBookings = (isManualRefresh = false) => {
    if (isManualRefresh) setIsRefreshing(true);
    
    axios.get('http://127.0.0.1:5000/api/bookings')
      .then(response => {
        setBookings(response.data.reverse()); 
        setLoading(false);
        if (isManualRefresh) setTimeout(() => setIsRefreshing(false), 800);
      })
      .catch(error => {
        console.error("Error fetching bookings:", error);
        setLoading(false);
        if (isManualRefresh) setIsRefreshing(false);
      });
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // ফাংশনাল চেক-ইন লজিক
  const handleCheckIn = (bookingId) => {
    if (!checkedInIds.includes(bookingId)) {
      setCheckedInIds(prev => [...prev, bookingId]);
      setTimeout(() => {
        alert(`Guest Check-in completed successfully for Booking ID: BKG-${bookingId}`);
      }, 300);
    }
  };

  // কুইক ম্যানুয়াল চেক-ইন হ্যান্ডলার
  const handleQuickCheckIn = () => {
    if (!quickId) {
      alert("Please enter a valid Booking ID.");
      return;
    }
    const numericId = parseInt(quickId.replace('BKG-', ''), 10);
    handleCheckIn(numericId);
    setQuickId("");
  };

  // নতুন ফিচার: ডিজিটাল কি-কার্ড এনকোডার সিমুলেটর
  const handleEncodeKey = (bookingId, roomNo) => {
    if (!encodedKeys.includes(bookingId)) {
      setEncodedKeys(prev => [...prev, bookingId]);
      alert(`NFC Digital Key Card successfully encoded for Room ${roomNo || 'Standard'} (Booking BKG-${bookingId})`);
    } else {
      alert(`Key card already active for this booking.`);
    }
  };

  // নতুন ফিচার: শিফট নোট অ্যাড করা
  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    const noteObj = {
      id: Date.now(),
      author: 'Current Agent',
      time: 'Just now',
      text: newNote
    };
    setNotes([noteObj, ...notes]);
    setNewNote("");
  };

  // লাইভ সার্চ ফিল্টার
  const filteredBookings = bookings.filter(booking => 
    booking.guest_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(booking.id).includes(searchTerm)
  );

  return (
    <div className="w-full min-h-screen bg-[#070707] text-stone-200 font-sans selection:bg-teal-500 selection:text-white px-4 md:px-8 py-8 relative overflow-hidden">
      
      {/* Deep Ambient Glows */}
      <div className="absolute top-[10%] right-[-10%] w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-[1500px] mx-auto relative z-10 space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-white/15">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-teal-500/10 border border-teal-500/30 text-teal-400 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse"></span>
                Front Desk Operations Hub
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-light text-white tracking-tight">Front Desk <span className="font-bold text-teal-400">&</span> Check-In</h1>
            <p className="text-xs font-bold text-stone-500 uppercase tracking-widest mt-2">Live Flask Database Sync & NFC Key Encoding</p>
          </div>
          
          <button 
            onClick={() => fetchBookings(true)} 
            disabled={isRefreshing}
            className="bg-white/5 hover:bg-white/10 border border-white/10 text-stone-200 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 disabled:opacity-50 flex items-center gap-2.5 shadow-sm"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {isRefreshing ? 'Syncing DB...' : 'Refresh Bookings'}
          </button>
        </div>

        {/* Top Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1">Total Bookings</p>
                <h2 className="text-3xl font-light text-white">{bookings.length}</h2>
              </div>
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
            </div>
          </div>
          
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1">Pending Check-ins</p>
                <h2 className="text-3xl font-light text-yellow-400">
                  {Math.max(0, bookings.length - checkedInIds.length)}
                </h2>
              </div>
              <div className="w-12 h-12 rounded-xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-400">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-teal-950/40 to-black border border-teal-500/20 rounded-2xl p-6 relative overflow-hidden shadow-[0_0_20px_rgba(20,184,166,0.05)]">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-[10px] font-bold text-teal-400 uppercase tracking-widest mb-1">Total Revenue</p>
                <h2 className="text-3xl font-light text-white">
                  ${bookings.reduce((sum, booking) => sum + (booking.total_amount || 0), 0).toFixed(2)}
                </h2>
              </div>
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Quick Check-in & Shift Notes */}
          <div className="space-y-6">
            {/* Quick Check-in Panel */}
            <div className="bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-xl space-y-6">
              <h3 className="text-lg font-light text-white tracking-wide border-b border-white/10 pb-4">Quick Check-in</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Booking ID</label>
                  <input 
                    type="text" 
                    value={quickId}
                    onChange={(e) => setQuickId(e.target.value)}
                    className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-3 text-xs font-medium text-white placeholder-stone-600 outline-none focus:border-teal-500/50 shadow-inner" 
                    placeholder="e.g. 1, 2, 3..." 
                  />
                </div>
                <button 
                  onClick={() => alert("Hardware NFC Gateway scanning active. Place guest passport or ID on reader terminal.")}
                  className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-stone-200 font-bold py-3.5 rounded-xl text-xs uppercase tracking-widest transition shadow-sm flex items-center justify-center gap-2"
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4 text-teal-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  Scan ID / Passport
                </button>
                <button 
                  onClick={handleQuickCheckIn}
                  className="w-full bg-teal-600 hover:bg-teal-500 text-white font-black py-4 rounded-xl text-xs uppercase tracking-widest transition shadow-[0_0_20px_rgba(20,184,166,0.2)] flex items-center justify-center gap-2"
                >
                  Manual Check-in
                </button>
              </div>
            </div>

            {/* New Feature: Shift Handover Notes Terminal */}
            <div className="bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent border border-white/10 rounded-3xl p-6 shadow-2xl backdrop-blur-xl space-y-4">
              <h3 className="text-sm font-light text-white tracking-wide border-b border-white/10 pb-3">Shift Handover Notes</h3>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {notes.map(n => (
                  <div key={n.id} className="bg-black/40 border border-white/5 p-3 rounded-xl text-xs">
                    <div className="flex justify-between text-[9px] text-stone-500 font-bold mb-1">
                      <span className="text-teal-400">{n.author}</span>
                      <span>{n.time}</span>
                    </div>
                    <p className="text-stone-300 font-medium">{n.text}</p>
                  </div>
                ))}
              </div>
              <form onSubmit={handleAddNote} className="flex gap-2 pt-2">
                <input 
                  type="text" 
                  value={newNote} 
                  onChange={(e) => setNewNote(e.target.value)} 
                  placeholder="Add handover note..." 
                  className="flex-1 bg-[#121212] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-stone-600 outline-none focus:border-teal-500/50"
                />
                <button type="submit" className="bg-teal-600 hover:bg-teal-500 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition">
                  Post
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Live Bookings List with NFC Key Encoder */}
          <div className="bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent border border-white/10 rounded-3xl p-6 md:p-8 lg:col-span-2 shadow-2xl backdrop-blur-xl space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-4">
              <h3 className="text-lg font-light text-white tracking-wide">Live Booking Activity</h3>
              <div className="relative w-full sm:w-64">
                <input 
                  type="text" 
                  placeholder="Search Guest or ID..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#121212] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs font-medium text-white placeholder-stone-600 outline-none focus:border-teal-500/50 shadow-inner" 
                />
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
            </div>
            
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse min-w-[750px]">
                <thead>
                  <tr className="text-[9px] font-bold text-stone-500 uppercase tracking-widest border-b border-white/10">
                    <th className="pb-4 px-3">Guest Name</th>
                    <th className="pb-4 px-3">Booking ID</th>
                    <th className="pb-4 px-3">Room No.</th>
                    <th className="pb-4 px-3">Total Amount</th>
                    <th className="pb-4 px-3 text-right">Front Desk Controls</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-medium text-stone-300">
                  
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="py-12 text-center text-stone-500 text-sm">Loading live database records from Flask API...</td>
                    </tr>
                  ) : filteredBookings.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="py-12 text-center text-stone-500 text-sm">No bookings found in database. Make a booking from the Guest View!</td>
                    </tr>
                  ) : (
                    filteredBookings.map((booking, idx) => {
                      const isCheckedIn = checkedInIds.includes(booking.id);
                      const isKeyEncoded = encodedKeys.includes(booking.id);
                      
                      return (
                        <tr key={idx} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition">
                          <td className="py-5 px-3 flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400 flex items-center justify-center text-xs font-bold shadow-inner">
                              {booking.guest_name ? booking.guest_name.charAt(0).toUpperCase() : 'G'}
                            </div>
                            <div>
                               <p className="font-bold text-white">{booking.guest_name}</p>
                               <p className="text-[10px] text-stone-500 font-medium">{booking.guest_email}</p>
                            </div>
                          </td>
                          <td className="py-5 px-3 font-mono text-stone-400">BKG-{booking.id}</td>
                          <td className="py-5 px-3 text-stone-300">Room {booking.room_number || 'N/A'}</td>
                          <td className="py-5 px-3 text-teal-400 font-bold">${booking.total_amount ? booking.total_amount.toFixed(2) : '0.00'}</td>
                          
                          {/* Advanced Actions Cell */}
                          <td className="py-5 px-3 text-right space-x-2 whitespace-nowrap">
                            <button 
                              onClick={() => handleCheckIn(booking.id)}
                              disabled={isCheckedIn}
                              className={`px-3.5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition border ${isCheckedIn ? 'bg-white/5 text-stone-600 border-white/5 cursor-not-allowed' : 'bg-teal-500/10 border-teal-500/30 text-teal-400 hover:bg-teal-500/20'}`}
                            >
                              {isCheckedIn ? 'Checked-in ✓' : 'Check-in'}
                            </button>

                            {isCheckedIn && (
                              <button 
                                onClick={() => handleEncodeKey(booking.id, booking.room_number)}
                                className={`px-3.5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition border ${isKeyEncoded ? 'bg-teal-500 text-black border-teal-400 font-black' : 'bg-white/5 border-white/10 text-stone-300 hover:bg-white/10'}`}
                              >
                                {isKeyEncoded ? 'Key Encoded ✓' : 'Encode Key'}
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                  
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default FrontDesk;