import React from 'react';

function Navbar({ setCurrentPage, userRole, handleLogout }) {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const isLoggedIn = !!token && !!user;
  const initials = isLoggedIn && user?.name ? user.name.charAt(0).toUpperCase() : 'G';

  return (
    <nav className="bg-[#1a3636] text-white px-4 py-3 shadow-md flex flex-wrap justify-between items-center gap-4">
      
      {/* 1. Left: Logo */}
      <div 
        className="flex items-center gap-3 cursor-pointer w-full md:w-auto justify-center md:justify-start"
        onClick={() => setCurrentPage('home')}
      >
        <div className="w-8 h-8 bg-teal-500 text-white flex items-center justify-center font-bold text-xl rounded shadow-sm">
          H
        </div>
        <span className="text-xl font-bold tracking-wide">HotelEase</span>
      </div>

      {/* 2. Center: All Restored Links */}
      <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 text-xs md:text-sm font-semibold w-full lg:w-auto">
        
        {userRole === 'guest' ? (
          <>
            <button onClick={() => setCurrentPage('home')} className="hover:text-teal-300 transition">Home</button>
            <button onClick={() => setCurrentPage('rooms')} className="text-yellow-400 hover:text-yellow-300 transition">Rooms & Suites</button>
            <button onClick={() => setCurrentPage('invoicing')} className="hover:text-teal-300 transition">Invoicing</button>
            <button onClick={() => setCurrentPage('legal')} className="hover:text-teal-300 transition">Policies</button>
            <button onClick={() => setCurrentPage('support')} className="hover:text-teal-300 transition">Support</button>
            <button onClick={() => setCurrentPage('aiconcierge')} className="flex items-center gap-1 bg-teal-800/40 border border-teal-500/50 px-3 py-1 rounded-full text-teal-300 hover:bg-teal-700 hover:text-white transition">
              ✨ AI Concierge
            </button>
          </>
        ) : (
          <>
            <button onClick={() => setCurrentPage('admin')} className="text-yellow-400 hover:text-yellow-300 transition">Dashboard</button>
            <button onClick={() => setCurrentPage('frontdesk')} className="hover:text-teal-300 transition">Front Desk</button>
            <button onClick={() => setCurrentPage('housekeeping')} className="hover:text-teal-300 transition">Housekeeping</button>
            <button onClick={() => setCurrentPage('promos')} className="hover:text-teal-300 transition">Promo Codes</button>
            <button onClick={() => setCurrentPage('chain')} className="hover:text-teal-300 transition">Chain Mgt</button>
            <button onClick={() => setCurrentPage('channel')} className="hover:text-teal-300 transition">Channel Mgt</button>
            <button onClick={() => setCurrentPage('analytics')} className="hover:text-teal-300 transition">Analytics</button>
            <button onClick={() => setCurrentPage('events')} className="hover:text-teal-300 transition">Events</button>
            <button onClick={() => setCurrentPage('staff')} className="hover:text-teal-300 transition">Staff</button>
          </>
        )}
      </div>

      {/* 3. Right: User Profile & Auth */}
      <div className="flex items-center justify-center gap-4 w-full md:w-auto">
        {isLoggedIn ? (
          <>
            <span className="text-xs font-bold text-teal-300 hidden md:block">
              Hi, {user.name.split(' ')[0]}
            </span>
            <button 
              onClick={handleLogout} 
              className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/50 text-red-400 text-xs font-bold px-4 py-2 rounded-lg transition whitespace-nowrap"
            >
              Logout
            </button>
            <button 
              onClick={() => setCurrentPage(userRole === 'admin' ? 'admin' : 'profile')}
              className="w-9 h-9 bg-teal-600 text-white rounded-full flex flex-shrink-0 items-center justify-center text-xs font-bold border border-teal-400 hover:border-white transition shadow-sm"
              title={user.name}
            >
              {initials}
            </button>
          </>
        ) : (
          <button 
            onClick={() => setCurrentPage('auth')} 
            className="bg-[#0f2424] hover:bg-teal-700 border border-teal-700/50 text-white text-xs font-bold px-4 py-2 rounded-lg transition whitespace-nowrap"
          >
            Login / Sign Up
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;