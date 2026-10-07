import React, { useState, useEffect } from 'react';

function Navbar({ setCurrentPage, userRole, handleLogout }) {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const isLoggedIn = !!token && !!user;
  const initials = isLoggedIn && user?.name ? user.name.charAt(0).toUpperCase() : 'G';
  
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Smooth Scroll Effect Fix - No Jittering
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20 && !scrolled) {
        setScrolled(true);
      } else if (window.scrollY <= 20 && scrolled) {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Handle Body Scroll Lock when Mobile Menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  const handleMenuClick = (page) => {
    setCurrentPage(page);
    // Smoothly close menu with a tiny delay for better UX
    setTimeout(() => {
      setIsMobileMenuOpen(false);
    }, 150);
  };

  return (
    <>
      <header className="sticky top-0 z-[100] w-full">
        <div className={`w-full transition-all duration-500 ease-out border-b ${
          scrolled 
            ? 'bg-[#020202]/80 backdrop-blur-2xl border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)]' 
            : 'bg-[#020202] border-transparent'
        }`}>
          
          {/* Fixed Height Nav Container to prevent layout shift */}
          <nav className="w-full max-w-[1650px] mx-auto px-4 md:px-8 h-[72px] md:h-[88px] flex items-center justify-between">
            
            {/* 1. Left: Original Modern Luxury Brand Logo */}
            <div 
              className="flex items-center gap-3 cursor-pointer group shrink-0"
              onClick={() => handleMenuClick('home')}
            >
              <div className="w-9 h-9 md:w-11 md:h-11 bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)] group-hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all duration-300">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6 text-[#050505]">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-lg md:text-xl font-black tracking-tight text-white group-hover:text-cyan-400 transition-colors leading-none mb-1">HotelEase</span>
                <span className="text-[7px] md:text-[8px] font-black uppercase tracking-[0.2em] text-stone-400 leading-none">Smart Luxury</span>
              </div>
            </div>

            {/* 2. Center: Modern Desktop Links (Hidden on Mobile/Tablet) */}
            <div className="hidden xl:flex flex-1 items-center justify-center">
              <div className="flex items-center gap-1.5 p-1.5 bg-white/[0.03] border border-white/10 rounded-full shadow-inner">
                {userRole === 'guest' ? (
                  <>
                    <button onClick={() => handleMenuClick('home')} className="px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-stone-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer">Home</button>
                    <button onClick={() => handleMenuClick('rooms')} className="px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all cursor-pointer">Rooms</button>
                    <button onClick={() => handleMenuClick('invoicing')} className="px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-stone-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer">Invoicing</button>
                    <button onClick={() => handleMenuClick('legal')} className="px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-stone-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer">Policies</button>
                    <button onClick={() => handleMenuClick('support')} className="px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-stone-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer">Support</button>
                    <button onClick={() => handleMenuClick('aiconcierge')} className="flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest text-[#050505] bg-cyan-400 hover:bg-cyan-300 transition-all shadow-[0_0_15px_rgba(6,182,212,0.5)] cursor-pointer ml-1">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                      AI Concierge
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleMenuClick('admin')} className="px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 shadow-inner cursor-pointer">Dashboard</button>
                    <button onClick={() => handleMenuClick('frontdesk')} className="px-4 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-stone-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer">Front Desk</button>
                    <button onClick={() => handleMenuClick('housekeeping')} className="px-4 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-stone-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer">H.Keeping</button>
                    <button onClick={() => handleMenuClick('promos')} className="px-4 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-stone-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer">Promos</button>
                    <button onClick={() => handleMenuClick('chain')} className="px-4 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-stone-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer">Chain</button>
                    <button onClick={() => handleMenuClick('channel')} className="px-4 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-stone-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer">Channel</button>
                    <button onClick={() => handleMenuClick('analytics')} className="px-4 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-stone-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer">Analytics</button>
                    <button onClick={() => handleMenuClick('events')} className="px-4 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-stone-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer">Events</button>
                    <button onClick={() => handleMenuClick('staff')} className="px-4 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-stone-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer">Staff</button>
                  </>
                )}
              </div>
            </div>

            {/* 3. Right: Profile & Action Buttons */}
            <div className="flex items-center justify-end gap-3 shrink-0">
              
              {isLoggedIn ? (
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex flex-col text-right pr-2">
                    <span className="text-[8px] font-black uppercase tracking-widest text-cyan-400">Authenticated</span>
                    <span className="text-sm font-bold text-white tracking-wide">
                      {user.name.split(' ')[0]}
                    </span>
                  </div>
                  
                  {/* Profile Button */}
                  <button 
                    onClick={() => handleMenuClick(userRole === 'admin' ? 'admin' : 'profile')}
                    className="hidden sm:flex w-10 h-10 md:w-11 md:h-11 bg-[#050505] text-white rounded-full shrink-0 items-center justify-center text-sm md:text-base font-black border border-white/20 hover:border-cyan-400 hover:text-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all cursor-pointer"
                    title="Profile"
                  >
                    {initials}
                  </button>

                  {/* Logout Button */}
                  <button 
                    onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} 
                    className="hidden sm:flex w-10 h-10 md:w-11 md:h-11 bg-[#050505] hover:bg-red-500/10 border border-white/20 hover:border-red-500/40 text-stone-400 hover:text-red-400 items-center justify-center rounded-full transition-all cursor-pointer"
                    title="Logout"
                  >
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4 md:w-5 md:h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => handleMenuClick('auth')} 
                  className="hidden sm:flex bg-white hover:bg-stone-200 text-[#050505] text-[10px] font-black uppercase tracking-[0.15em] px-6 py-3 rounded-xl transition-all shadow-[0_5px_15px_rgba(255,255,255,0.15)] items-center gap-2 cursor-pointer"
                >
                  Sign In
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </button>
              )}

              {/* Mobile Hamburger Toggle (Always visible on mobile/tablet) */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="xl:hidden w-10 h-10 md:w-11 md:h-11 flex items-center justify-center text-white bg-white/5 border border-white/10 rounded-xl active:scale-95 transition-all cursor-pointer z-[120]"
              >
                {isMobileMenuOpen ? (
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6 text-cyan-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                ) : (
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" /></svg>
                )}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Full Screen Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[90] xl:hidden">
          {/* Backdrop Blur Overlay */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          
          {/* Sliding Glass Panel */}
          <div className="absolute top-[72px] md:top-[88px] left-0 w-full h-[calc(100vh-72px)] md:h-[calc(100vh-88px)] overflow-y-auto pb-10 shadow-[0_30px_60px_rgba(0,0,0,0.9)] border-t border-white/10 bg-[#020202]/95 backdrop-blur-3xl animate-fade-in-down">
            <div className="flex flex-col px-4 md:px-8 py-6 w-full max-w-2xl mx-auto space-y-3">
              
              {/* Mobile User Profile Section (If Logged In) */}
              {isLoggedIn && (
                <div className="flex items-center gap-4 p-5 bg-[#080808] border border-white/10 rounded-2xl mb-4">
                  <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 rounded-full flex items-center justify-center text-lg font-black shadow-inner">
                    {initials}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white tracking-wide">{user.name}</h3>
                    <p className="text-[10px] font-black text-stone-500 uppercase tracking-widest">{userRole === 'admin' ? 'System Administrator' : 'Verified Guest'}</p>
                  </div>
                </div>
              )}

              {userRole === 'guest' ? (
                <>
                  <p className="text-[10px] font-black uppercase tracking-widest text-stone-600 pl-2 mt-2">Main Menu</p>
                  <button onClick={() => handleMenuClick('home')} className="w-full flex items-center justify-between px-5 py-4 rounded-2xl text-xs font-black uppercase tracking-widest text-stone-300 hover:bg-white/5 active:bg-white/10 border border-transparent transition-all cursor-pointer">
                    Home
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4 opacity-50"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"/></svg>
                  </button>
                  <button onClick={() => handleMenuClick('rooms')} className="w-full flex items-center justify-between px-5 py-4 rounded-2xl text-xs font-black uppercase tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 transition-all cursor-pointer shadow-inner">
                    Rooms & Suites
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"/></svg>
                  </button>
                  <button onClick={() => handleMenuClick('aiconcierge')} className="w-full flex items-center justify-between px-5 py-4 rounded-2xl text-xs font-black uppercase tracking-widest text-[#050505] bg-cyan-400 hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] cursor-pointer mt-2">
                    <span className="flex items-center gap-2">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                      AI Concierge
                    </span>
                    <span className="bg-black/20 px-2 py-0.5 rounded text-[9px]">NEW</span>
                  </button>

                  <p className="text-[10px] font-black uppercase tracking-widest text-stone-600 pl-2 mt-6">Services & Legal</p>
                  <button onClick={() => handleMenuClick('invoicing')} className="w-full flex items-center justify-between px-5 py-4 rounded-2xl text-xs font-black uppercase tracking-widest text-stone-300 hover:bg-white/5 active:bg-white/10 border border-transparent transition-all cursor-pointer">
                    Invoicing
                  </button>
                  <button onClick={() => handleMenuClick('legal')} className="w-full flex items-center justify-between px-5 py-4 rounded-2xl text-xs font-black uppercase tracking-widest text-stone-300 hover:bg-white/5 active:bg-white/10 border border-transparent transition-all cursor-pointer">
                    Policies
                  </button>
                  <button onClick={() => handleMenuClick('support')} className="w-full flex items-center justify-between px-5 py-4 rounded-2xl text-xs font-black uppercase tracking-widest text-stone-300 hover:bg-white/5 active:bg-white/10 border border-transparent transition-all cursor-pointer">
                    Support
                  </button>
                </>
              ) : (
                <>
                  <p className="text-[10px] font-black uppercase tracking-widest text-stone-600 pl-2 mt-2">System Core</p>
                  <button onClick={() => handleMenuClick('admin')} className="w-full flex items-center justify-between px-5 py-4 rounded-2xl text-xs font-black uppercase tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 transition-all cursor-pointer shadow-inner">
                    Dashboard Central
                  </button>
                  <button onClick={() => handleMenuClick('analytics')} className="w-full flex items-center justify-between px-5 py-4 rounded-2xl text-xs font-black uppercase tracking-widest text-stone-300 hover:bg-white/5 active:bg-white/10 border border-transparent transition-all cursor-pointer">
                    Neural Analytics
                  </button>

                  <p className="text-[10px] font-black uppercase tracking-widest text-stone-600 pl-2 mt-4">Node Management</p>
                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => handleMenuClick('frontdesk')} className="px-4 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-stone-300 bg-[#080808] border border-white/5 hover:border-cyan-500/30 transition-all cursor-pointer text-center">Front Desk</button>
                    <button onClick={() => handleMenuClick('housekeeping')} className="px-4 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-stone-300 bg-[#080808] border border-white/5 hover:border-cyan-500/30 transition-all cursor-pointer text-center">H.Keeping</button>
                    <button onClick={() => handleMenuClick('events')} className="px-4 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-stone-300 bg-[#080808] border border-white/5 hover:border-cyan-500/30 transition-all cursor-pointer text-center">Events</button>
                    <button onClick={() => handleMenuClick('staff')} className="px-4 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-stone-300 bg-[#080808] border border-white/5 hover:border-cyan-500/30 transition-all cursor-pointer text-center">Staff Matrix</button>
                  </div>

                  <p className="text-[10px] font-black uppercase tracking-widest text-stone-600 pl-2 mt-4">Distribution</p>
                  <button onClick={() => handleMenuClick('promos')} className="w-full flex items-center justify-between px-5 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest text-stone-300 hover:bg-white/5 border border-transparent transition-all cursor-pointer">Promo Codes</button>
                  <button onClick={() => handleMenuClick('chain')} className="w-full flex items-center justify-between px-5 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest text-stone-300 hover:bg-white/5 border border-transparent transition-all cursor-pointer">Chain Network</button>
                  <button onClick={() => handleMenuClick('channel')} className="w-full flex items-center justify-between px-5 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest text-stone-300 hover:bg-white/5 border border-transparent transition-all cursor-pointer">Channel Manager</button>
                </>
              )}

              <div className="w-full h-px bg-white/10 my-4"></div>

              {!isLoggedIn ? (
                <button onClick={() => handleMenuClick('auth')} className="w-full flex items-center justify-center gap-3 bg-white hover:bg-stone-200 text-[#050505] text-[11px] font-black uppercase tracking-[0.2em] px-5 py-5 rounded-2xl transition-all shadow-[0_10px_20px_rgba(255,255,255,0.15)] active:scale-95 cursor-pointer">
                  Sign In
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </button>
              ) : (
                <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="w-full flex items-center justify-center gap-2 bg-[#080808] border border-red-500/20 hover:bg-red-900/20 text-red-400 text-[11px] font-black uppercase tracking-widest px-5 py-5 rounded-2xl transition-all shadow-inner active:scale-95 cursor-pointer mt-2">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                  Disconnect Session
                </button>
              )}
              
              {/* Extra spacing at bottom for safe scrolling */}
              <div className="h-20"></div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;