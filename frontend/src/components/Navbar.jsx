import React from 'react';

function Navbar({ setCurrentPage, userRole, handleLogout }) {
  // লোকাল স্টোরেজ থেকে চেক করা হচ্ছে ইউজার লগইন করা আছে কি না
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const isLoggedIn = !!token && !!user;

  // ইউজারের নামের প্রথম অক্ষর বের করা (প্রোফাইল আইকনের জন্য)
  const initials = isLoggedIn && user.name ? user.name.charAt(0).toUpperCase() : 'G';

  return (
    <nav className="bg-[#1a3636] text-white px-4 lg:px-6 py-3 shadow-md flex flex-wrap justify-between items-center gap-4">
      
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

      {/* 2. Center: Dynamic Links based on Real Role */}
      <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 text-sm font-semibold w-full lg:w-auto">
        
        {userRole === 'guest' ? (
          <>
            <button onClick={() => setCurrentPage('home')} className="text-gray-300 hover:text-white transition">Home</button>
            <button onClick={() => setCurrentPage('rooms')} className="text-yellow-400">Rooms & Suites</button>
            <button onClick={() => setCurrentPage('support')} className="text-gray-300 hover:text-white transition">Support</button>
            <button onClick={() => setCurrentPage('aiconcierge')} className="flex items-center gap-1 bg-teal-800/40 border border-teal-500/50 px-4 py-1.5 rounded-full text-teal-300 hover:bg-teal-700 hover:text-white transition">
              ✨ AI Concierge
            </button>
          </>
        ) : (
          <>
            <button onClick={() => setCurrentPage('admin')} className="text-yellow-400">Dashboard</button>
            <button onClick={() => setCurrentPage('frontdesk')} className="text-gray-300 hover:text-white transition">Front Desk</button>
            <button onClick={() => setCurrentPage('housekeeping')} className="text-gray-300 hover:text-white transition">Housekeeping</button>
            <button onClick={() => setCurrentPage('analytics')} className="text-gray-300 hover:text-white transition">Analytics</button>
            <button onClick={() => setCurrentPage('events')} className="text-gray-300 hover:text-white transition">Events</button>
            <button onClick={() => setCurrentPage('staff')} className="text-gray-300 hover:text-white transition">Staff</button>
          </>
        )}
      </div>

      {/* 3. Right: User Profile & Logout / Login */}
      <div className="flex items-center justify-center gap-4 w-full md:w-auto">
        
        {isLoggedIn ? (
          <>
            {/* ইউজারের নাম */}
            <span className="text-xs font-bold text-teal-300 hidden md:block">
              Hi, {user.name.split(' ')[0]}
            </span>
            
            {/* লগআউট বাটন */}
            <button 
              onClick={handleLogout} 
              className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/50 text-red-400 text-xs font-bold px-4 py-2 rounded-lg transition whitespace-nowrap"
            >
              Logout
            </button>
            
            {/* প্রোফাইল আইকন */}
            <button 
              onClick={() => setCurrentPage(userRole === 'admin' ? 'admin' : 'profile')}
              className="w-9 h-9 bg-teal-600 text-white rounded-full flex flex-shrink-0 items-center justify-center text-xs font-bold border border-teal-400 hover:border-white transition shadow-sm"
              title={user.name}
            >
              {initials}
            </button>
          </>
        ) : (
          /* লগইন না থাকলে এই বাটন দেখাবে */
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