import React, { useState } from 'react';

function BanquetEvents() {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMenu, setActiveMenu] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
  const [isModalOpen, setIsModalOpen] = useState(false); // New Interactive Modal State

  // নতুন বুকিং ফর্মের স্টেট
  const [newEventName, setNewEventName] = useState('');
  const [newHall, setNewHall] = useState('Grand Ballroom');
  const [newAttendees, setNewAttendees] = useState('');

  // অরিজিনাল ডেটা ১০০% সুরক্ষিত ও অক্ষত রাখা হয়েছে
  const [eventsData, setEventsData] = useState([
    { 
      id: 'EV-8902', name: 'Smith Wedding Reception', type: 'Wedding', hall: 'Grand Ballroom', 
      date: 'Oct 15, 2026', time: '6:00 PM - 11:00 PM', status: 'Confirmed', attendees: 350,
      paymentProgress: 100, requirements: ['Catering', 'DJ Setup', 'Valet'], clash: false
    },
    { 
      id: 'EV-8905', name: 'Tech Innovators Conference', type: 'Corporate', hall: 'Crystal Hall A', 
      date: 'Oct 18, 2026', time: '9:00 AM - 5:00 PM', status: 'Preparation', attendees: 120,
      paymentProgress: 75, requirements: ['AV Setup', 'High-speed WiFi'], clash: false
    },
    { 
      id: 'EV-8911', name: 'Annual Corporate Gala', type: 'Gala', hall: 'Grand Ballroom', 
      date: 'Oct 25, 2026', time: '7:00 PM - 12:00 AM', status: 'Pending Payment', attendees: 400,
      paymentProgress: 25, requirements: ['Catering', 'Stage Setup'], clash: true 
    },
    { 
      id: 'EV-8915', name: 'Global Health Summit', type: 'Conference', hall: 'Sapphire Room', 
      date: 'Nov 02, 2026', time: '10:00 AM - 4:00 PM', status: 'Confirmed', attendees: 85,
      paymentProgress: 100, requirements: ['AV Setup', 'Catering'], clash: false
    },
  ]);

  const handleCreateBooking = (e) => {
    e.preventDefault();
    if (!newEventName || !newAttendees) {
      alert("Please fill in all booking fields.");
      return;
    }
    const newEntry = {
      id: `EV-${Math.floor(1000 + Math.random() * 9000)}`,
      name: newEventName,
      type: 'Corporate',
      hall: newHall,
      date: 'Nov 10, 2026',
      time: '10:00 AM - 4:00 PM',
      status: 'Confirmed',
      attendees: parseInt(newAttendees) || 100,
      paymentProgress: 50,
      requirements: ['AV Setup', 'Catering'],
      clash: false
    };
    setEventsData([newEntry, ...eventsData]);
    setNewEventName('');
    setNewAttendees('');
    setIsModalOpen(false);
  };

  const filteredEvents = eventsData.filter(event => {
    const matchesFilter = filter === 'All' || event.status === filter;
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase()) || event.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="w-full min-h-screen bg-[#030303] text-stone-200 font-sans selection:bg-teal-500 selection:text-white px-4 md:px-10 py-10 relative overflow-hidden">
      
      {/* Deep Cyber Ambient Neon Glows */}
      <div className="absolute top-[5%] left-[20%] w-[800px] h-[800px] bg-teal-500/10 rounded-full blur-[200px] pointer-events-none"></div>
      <div className="absolute bottom-[5%] right-[10%] w-[700px] h-[700px] bg-cyan-500/5 rounded-full blur-[180px] pointer-events-none"></div>

      <div className="max-w-[1700px] mx-auto relative z-10 space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-teal-500/10 border border-teal-500/30 text-teal-400 px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center gap-2.5 shadow-[0_0_20px_rgba(20,184,166,0.2)] backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping"></span>
                Event Intelligence Suite v4.2
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-light text-white tracking-tight">Banquet <span className="font-bold text-teal-400">&</span> Event Spaces</h1>
            <p className="text-xs font-bold text-stone-500 uppercase tracking-widest mt-2">Manage Conference Halls, Weddings & Financial Telemetry</p>
          </div>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white px-7 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-[0_0_25px_rgba(20,184,166,0.3)] hover:shadow-[0_0_35px_rgba(20,184,166,0.5)] transition-all duration-300 flex items-center gap-2.5"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
            Create New Booking
          </button>
        </div>

        {/* Top Quick Stats Widget */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 backdrop-blur-2xl relative overflow-hidden group hover:border-teal-500/30 transition-all">
            <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-teal-500/10 blur-xl group-hover:bg-teal-500/20 transition-all"></div>
            <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1 relative z-10">Total Events (Month)</p>
            <h3 className="text-3xl font-light text-white relative z-10">24</h3>
          </div>
          <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 backdrop-blur-2xl relative overflow-hidden group hover:border-teal-500/30 transition-all">
            <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-blue-500/10 blur-xl group-hover:bg-blue-500/20 transition-all"></div>
            <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1 relative z-10">Total Attendees</p>
            <h3 className="text-3xl font-light text-white relative z-10">1,850</h3>
          </div>
          <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 backdrop-blur-2xl relative overflow-hidden group hover:border-teal-500/30 transition-all">
            <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-green-500/10 blur-xl group-hover:bg-green-500/20 transition-all"></div>
            <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1 relative z-10">Halls Available Today</p>
            <h3 className="text-3xl font-light text-white relative z-10">3 / 5</h3>
          </div>
          <div className="bg-gradient-to-br from-teal-950/40 via-black to-black border border-teal-500/25 rounded-3xl p-6 relative overflow-hidden shadow-[0_0_30px_rgba(20,184,166,0.08)] backdrop-blur-2xl">
             <div className="flex justify-between items-start mb-1">
                <p className="text-[10px] font-bold text-teal-400 uppercase tracking-widest">Revenue Collected</p>
                <span className="text-teal-400"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg></span>
             </div>
            <h3 className="text-3xl font-light text-white">$42,500</h3>
          </div>
        </div>

        {/* Main Event Section */}
        <div className="bg-gradient-to-br from-white/[0.04] via-white/[0.01] to-transparent border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-2xl">
          
          {/* Advanced Control Bar */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5 mb-8 border-b border-white/10 pb-6">
            <h3 className="text-xl font-light text-white tracking-wide">Upcoming Event Schedule</h3>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
              
              {/* Search Bar */}
              <div className="relative w-full sm:w-72">
                <input 
                  type="text" 
                  placeholder="Search events, IDs..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs font-medium text-white placeholder-stone-500 outline-none focus:border-teal-500/50 shadow-inner transition-colors"
                />
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>

              {/* Status Filter */}
              <div className="flex bg-black/60 border border-white/10 rounded-xl p-1 w-full sm:w-auto overflow-x-auto scrollbar-none">
                {['All', 'Confirmed', 'Preparation', 'Pending'].map((statusOption) => (
                  <button 
                    key={statusOption}
                    onClick={() => setFilter(statusOption === 'Pending' ? 'Pending Payment' : statusOption)}
                    className={`px-4 py-2 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                      (filter === statusOption || (filter === 'Pending Payment' && statusOption === 'Pending')) 
                      ? 'bg-white/10 text-white shadow-sm' 
                      : 'text-stone-500 hover:text-stone-300'
                    }`}
                  >
                    {statusOption}
                  </button>
                ))}
              </div>

              {/* List vs Grid View Toggle */}
              <div className="flex bg-black/60 border border-white/10 rounded-xl p-1 hidden md:flex">
                  <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white/10 text-white shadow-sm' : 'text-stone-500 hover:text-white'}`} title="List View">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
                  </button>
                  <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white/10 text-white shadow-sm' : 'text-stone-500 hover:text-white'}`} title="Card View">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                  </button>
              </div>

            </div>
          </div>

          {/* Dynamic Render: List View OR Grid View */}
          {viewMode === 'list' ? (
            
            /* Enhanced Table View */
            <div className="overflow-x-auto w-full animate-fade-in">
              <table className="w-full text-left border-collapse min-w-[1000px]">
                <thead>
                  <tr className="text-[9px] font-bold text-stone-500 uppercase tracking-widest border-b border-white/10">
                    <th className="pb-4 px-3">Event Details</th>
                    <th className="pb-4 px-3">Schedule & Location</th>
                    <th className="pb-4 px-3 w-48">Service Requirements</th>
                    <th className="pb-4 px-3 w-40">Payment Status</th>
                    <th className="pb-4 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-medium text-stone-300">
                  {filteredEvents.length > 0 ? (
                    filteredEvents.map((event) => (
                      <tr key={event.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors group">
                        
                        {/* Event Name & Warning */}
                        <td className="py-5 px-3">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-white text-base">{event.name}</span>
                            {event.clash && (
                              <span className="bg-red-500/10 border border-red-500/30 text-red-400 px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.3)]" title="Schedule overlap detected">
                                Conflict Risk
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2.5 text-[10px] uppercase tracking-wider text-stone-500 mt-1">
                            <span className="bg-black/50 border border-white/10 px-2.5 py-1 rounded-lg text-stone-300 font-mono">{event.id}</span>
                            <span className="w-1 h-1 rounded-full bg-stone-600"></span>
                            <span className="text-teal-400 font-bold">{event.type}</span>
                            <span className="w-1 h-1 rounded-full bg-stone-600"></span>
                            <span>{event.attendees} Pax</span>
                          </div>
                        </td>

                        {/* Location & Time */}
                        <td className="py-5 px-3">
                          <div className="flex items-center gap-2 text-stone-200 mb-1 font-bold">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4 text-teal-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                            {event.hall}
                          </div>
                          <div className="flex items-center gap-2 text-[10px] font-bold text-stone-500 uppercase tracking-widest mt-1">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            {event.date} • {event.time.split(' - ')[0]}
                          </div>
                        </td>

                        {/* Smart Requirement Tags */}
                        <td className="py-5 px-3">
                          <div className="flex flex-wrap gap-1.5">
                            {event.requirements.map((req, i) => (
                              <span key={i} className="bg-black/50 border border-white/10 text-stone-300 px-2.5 py-1 rounded-xl text-[9px] font-bold uppercase tracking-widest whitespace-nowrap">
                                {req}
                              </span>
                            ))}
                          </div>
                        </td>

                        {/* Financial Progress Bar */}
                        <td className="py-5 px-3">
                          <div className="flex justify-between items-center mb-1.5">
                            <span className={`text-[9px] font-bold uppercase tracking-widest ${
                              event.paymentProgress === 100 ? 'text-teal-400' : 
                              event.paymentProgress >= 50 ? 'text-blue-400' : 'text-yellow-400'
                            }`}>
                              {event.status}
                            </span>
                            <span className="text-[9px] font-bold text-stone-400 font-mono">{event.paymentProgress}%</span>
                          </div>
                          <div className="w-full bg-black/60 rounded-full h-2 border border-white/5 overflow-hidden">
                            <div className={`h-full rounded-full ${
                              event.paymentProgress === 100 ? 'bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.8)]' : 
                              event.paymentProgress >= 50 ? 'bg-blue-400' : 'bg-yellow-400'
                            }`} style={{ width: `${event.paymentProgress}%` }}></div>
                          </div>
                        </td>
                        
                        {/* Modern Action Dropdown */}
                        <td className="py-5 px-3 text-right relative">
                          <button 
                            onClick={() => setActiveMenu(activeMenu === event.id ? null : event.id)}
                            className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-stone-300 hover:text-white transition-colors"
                          >
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                          </button>
                          
                          {activeMenu === event.id && (
                            <div className="absolute right-3 top-16 mt-1 w-52 bg-[#121212] border border-white/15 rounded-2xl shadow-2xl py-2 z-50 animate-fade-in text-left">
                              <button className="w-full px-4 py-2.5 text-[11px] font-bold text-stone-300 hover:bg-white/5 hover:text-teal-400 transition-colors text-left flex items-center gap-2.5">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                View Full Details
                              </button>
                              <button className="w-full px-4 py-2.5 text-[11px] font-bold text-stone-300 hover:bg-white/5 hover:text-teal-400 transition-colors text-left flex items-center gap-2.5">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                Manage Banquet Menu
                              </button>
                              <div className="w-full h-px bg-white/10 my-1"></div>
                              <button className="w-full px-4 py-2.5 text-[11px] font-bold text-red-400 hover:bg-red-500/10 transition-colors text-left flex items-center gap-2.5">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                Cancel Reservation
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="py-16 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 mb-4 text-stone-600 border border-white/5">
                           <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </div>
                        <p className="text-stone-400 text-sm font-medium">No events found matching your search criteria.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          ) : (
            
            /* Interactive Grid / Card View */
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-fade-in">
              {filteredEvents.map((event) => (
                <div key={event.id} className="bg-white/[0.02] border border-white/10 hover:border-teal-500/40 rounded-3xl p-6 transition-all duration-300 relative group flex flex-col justify-between backdrop-blur-xl">
                  
                  {/* Top Status & Date */}
                  <div className="flex justify-between items-start mb-5">
                    <div className="bg-black/50 border border-white/10 rounded-xl px-3.5 py-2 text-center shadow-inner">
                      <p className="text-[9px] font-bold text-stone-500 uppercase tracking-widest">{event.date.split(' ')[0]}</p>
                      <p className="text-lg font-light text-white">{event.date.split(' ')[1].replace(',', '')}</p>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[9px] font-bold uppercase tracking-widest border ${
                        event.status === 'Confirmed' ? 'bg-teal-500/10 text-teal-400 border-teal-500/30' :
                        event.status === 'Preparation' ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
                      }`}>
                      {event.status}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2">
                       <span className="text-[9px] font-bold text-teal-400 uppercase tracking-widest bg-teal-500/10 border border-teal-500/20 px-2.5 py-1 rounded-lg">{event.type}</span>
                       {event.clash && <span className="text-[9px] font-bold text-red-400 uppercase tracking-widest bg-red-500/10 border border-red-500/30 px-2.5 py-1 rounded-lg animate-pulse">Conflict Risk</span>}
                    </div>
                    <h3 className="text-xl font-bold text-white tracking-wide">{event.name}</h3>
                    
                    <div className="space-y-2 pt-2 text-xs font-medium text-stone-400">
                      <div className="flex items-center gap-3">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4 text-teal-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                        <span className="text-white font-medium">{event.hall}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4 text-teal-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4 text-teal-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                        <span>{event.attendees} Attendees</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                       {event.requirements.map((req, i) => (
                          <span key={i} className="bg-black/50 border border-white/5 text-stone-400 px-2 py-0.5 rounded-md text-[8px] font-bold uppercase tracking-widest">
                             {req}
                          </span>
                       ))}
                    </div>
                    <button className="text-[10px] font-bold uppercase tracking-widest text-teal-400 hover:text-teal-300 transition-colors flex items-center gap-1">
                      Manage <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-3 h-3 group-hover:translate-x-1 transition-transform"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>

      {/* New Feature: Create Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-xl flex items-center justify-center z-50 px-4 animate-fade-in">
          <div className="bg-[#121212] border border-white/15 rounded-3xl p-8 max-w-md w-full shadow-2xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex justify-between items-center border-b border-white/10 pb-4 relative z-10">
              <h3 className="text-xl font-light text-white tracking-wide">Schedule Banquet Booking</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-stone-500 hover:text-white text-lg font-bold">✕</button>
            </div>
            
            <form onSubmit={handleCreateBooking} className="space-y-4 relative z-10">
              <div>
                <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Event Title</label>
                <input 
                  type="text" 
                  value={newEventName} 
                  onChange={(e) => setNewEventName(e.target.value)}
                  placeholder="e.g. Royal Wedding Reception" 
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3.5 text-xs text-white placeholder-stone-600 outline-none focus:border-teal-500/50"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Hall Selection</label>
                <select 
                  value={newHall} 
                  onChange={(e) => setNewHall(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3.5 text-xs text-white outline-none focus:border-teal-500/50 cursor-pointer"
                >
                  <option value="Grand Ballroom">Grand Ballroom</option>
                  <option value="Crystal Hall A">Crystal Hall A</option>
                  <option value="Sapphire Room">Sapphire Room</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Estimated Attendees (Pax)</label>
                <input 
                  type="number" 
                  value={newAttendees} 
                  onChange={(e) => setNewAttendees(e.target.value)}
                  placeholder="e.g. 250" 
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3.5 text-xs text-white placeholder-stone-600 outline-none focus:border-teal-500/50"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-stone-300 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 bg-teal-600 hover:bg-teal-500 text-white py-3.5 rounded-xl text-xs font-black uppercase tracking-widest transition shadow-[0_0_20px_rgba(20,184,166,0.3)]"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default BanquetEvents;