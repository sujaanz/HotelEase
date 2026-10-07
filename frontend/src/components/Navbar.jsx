import React, { useState, useEffect } from 'react';

function Navbar({ setCurrentPage, userRole, handleLogout }) {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const isLoggedIn = !!token && !!user;
  const initials = isLoggedIn && user?.name ? user.name.charAt(0).toUpperCase() : 'G';
  
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuClick = (page) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false); // ক্লিক করার পর মোবাইল মেনু বন্ধ হবে
  };

  return (
    // আউটার হেডার: সাদা লাইন ব্লক করার জন্য pb-6 যোগ করা হলো এবং bg-[#030303] নিশ্চিত করা হলো
    <header className={`sticky top-0 z-[100] w-full transition-all duration-300 ${
      scrolled ? 'bg-[#030303]/95 backdrop-blur-2xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)] pb-2' : 'bg-[#030303] pb-4 md:pb-6'
    }`}>
      
      {/* ইনার কন্টেইনার: ডেস্কটপে ফ্লোটিং গ্যাপ, মোবাইলে গ্যাপ জিরো */}
      <div className={`w-full max-w-[1700px] mx-auto transition-all duration-300 relative ${
        scrolled ? 'p-0' : 'p-0 xl:pt-5 xl:px-6'
      }`}>
        
        {/* নেভবার বডি: ডেস্কটপে ফ্লোটিং আইল্যান্ড, মোবাইলে ফ্ল্যাট */}
        <nav className={`w-full flex items-center justify-between transition-all duration-300 ${
          scrolled 
            ? 'px-4 py-3 md:px-8 md:py-3.5' 
            : 'px-4 py-3 xl:bg-[#0a0a0a] xl:border xl:border-white/10 xl:rounded-[2.5rem] xl:px-6 xl:py-2.5 xl:shadow-[0_0_30px_rgba(20,184,166,0.05)]'
        }`}>
          
          {/* 1. Left: Cybernetic Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group shrink-0"
            onClick={() => handleMenuClick('home')}
          >
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-[#121212] to-black border border-teal-500/40 text-teal-400 flex items-center justify-center font-black text-xs md:text-sm rounded-full shadow-inner group-hover:scale-110 transition-transform duration-300 relative overflow-hidden">
               <div className="absolute inset-0 bg-teal-500/10 blur-sm"></div>
               <span className="relative z-10">H</span>
            </div>
            <div className="flex flex-col">
              <span className="text-base md:text-lg font-bold tracking-wider text-white group-hover:text-teal-400 transition-colors leading-tight">HotelEase</span>
              <span className="text-[6px] md:text-[7px] font-black uppercase tracking-[0.3em] text-teal-500/80">Quantum Node</span>
            </div>
          </div>

          {/* 2. Center: Desktop Neural Links (Hidden on Mobile/Tablet) */}
          <div className="hidden xl:flex flex-1 items-center justify-center">
            <div className="flex items-center gap-1.5 p-1.5 bg-white/[0.03] border border-white/5 rounded-full shadow-inner">
              {userRole === 'guest' ? (
                <>
                  <button onClick={() => handleMenuClick('home')} className="px-4 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest text-stone-400 hover:text-white hover:bg-white/10 transition-all">Home</button>
                  <button onClick={() => handleMenuClick('rooms')} className="px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest text-teal-400 bg-teal-500/10 border border-teal-500/20 hover:bg-teal-500/20 shadow-[0_0_15px_rgba(20,184,166,0.1)] transition-all">Rooms</button>
                  <button onClick={() => handleMenuClick('invoicing')} className="px-4 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest text-stone-400 hover:text-white hover:bg-white/10 transition-all">Invoicing</button>
                  <button onClick={() => handleMenuClick('legal')} className="px-4 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest text-stone-400 hover:text-white hover:bg-white/10 transition-all">Policies</button>
                  <button onClick={() => handleMenuClick('support')} className="px-4 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest text-stone-400 hover:text-white hover:bg-white/10 transition-all">Support</button>
                  <button onClick={() => handleMenuClick('aiconcierge')} className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 transition-all group ml-1">
                    <span className="group-hover:animate-spin-slow">✨</span> AI Guide
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => handleMenuClick('admin')} className="px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest text-teal-400 bg-teal-500/10 border border-teal-500/20 transition-all">Dash</button>
                  <button onClick={() => handleMenuClick('frontdesk')} className="px-3 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest text-stone-400 hover:text-white hover:bg-white/10 transition-all">Front Desk</button>
                  <button onClick={() => handleMenuClick('housekeeping')} className="px-3 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest text-stone-400 hover:text-white hover:bg-white/10 transition-all">H.Keeping</button>
                  <button onClick={() => handleMenuClick('promos')} className="px-3 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest text-stone-400 hover:text-white hover:bg-white/10 transition-all">Promos</button>
                  <button onClick={() => handleMenuClick('chain')} className="px-3 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest text-stone-400 hover:text-white hover:bg-white/10 transition-all">Chain</button>
                  <button onClick={() => handleMenuClick('channel')} className="px-3 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest text-stone-400 hover:text-white hover:bg-white/10 transition-all">Channel</button>
                  <button onClick={() => handleMenuClick('analytics')} className="px-3 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest text-stone-400 hover:text-white hover:bg-white/10 transition-all">Analytics</button>
                  <button onClick={() => handleMenuClick('events')} className="px-3 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest text-stone-400 hover:text-white hover:bg-white/10 transition-all">Events</button>
                  <button onClick={() => handleMenuClick('staff')} className="px-3 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest text-stone-400 hover:text-white hover:bg-white/10 transition-all">Staff</button>
                </>
              )}
            </div>
          </div>

          {/* 3. Right: Profile & Mobile Menu Toggle */}
          <div className="flex items-center justify-end gap-2.5 shrink-0">
            
            {isLoggedIn ? (
              <div className="flex items-center gap-2 md:gap-3">
                <div className="hidden sm:flex flex-col text-right pr-1">
                  <span className="text-[7px] font-black uppercase tracking-widest text-stone-500">Verified</span>
                  <span className="text-xs font-bold text-white tracking-wide">
                    {user.name.split(' ')[0]}
                  </span>
                </div>
                
                <button 
                  onClick={() => handleMenuClick(userRole === 'admin' ? 'admin' : 'profile')}
                  className="w-8 h-8 md:w-10 md:h-10 bg-black text-teal-400 rounded-full flex shrink-0 items-center justify-center text-xs md:text-sm font-black border-2 border-teal-500/40 hover:bg-teal-500/10 hover:shadow-[0_0_15px_rgba(20,184,166,0.3)] transition-all"
                  title={user.name}
                >
                  {initials}
                </button>

                <button 
                  onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} 
                  className="hidden sm:flex p-2 md:p-2.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 rounded-full transition-all"
                  title="Disconnect"
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                </button>
              </div>
            ) : (
              <button 
                onClick={() => handleMenuClick('auth')} 
                className="hidden sm:flex bg-teal-500 text-[#050505] hover:bg-teal-400 text-[9px] font-black uppercase tracking-widest px-5 py-2.5 rounded-full transition-all shadow-[0_0_15px_rgba(20,184,166,0.3)] items-center gap-2"
              >
                Login <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-3 h-3"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
              </button>
            )}

            {/* Mobile Hamburger Icon */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-stone-300 hover:text-white bg-white/[0.05] border border-white/10 rounded-full active:scale-95 transition-all ml-1"
            >
              {isMobileMenuOpen ? (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4 md:w-5 md:h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4 md:w-5 md:h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </nav>

        {/* Mobile / Tablet Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full px-3 md:px-6 mt-2 xl:hidden z-40">
            <div className="w-full bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-4 shadow-2xl animate-fade-in">
              <div className="flex flex-col gap-1.5 max-h-[70vh] overflow-y-auto scrollbar-none">
                {userRole === 'guest' ? (
                  <>
                    <button onClick={() => handleMenuClick('home')} className="w-full text-left px-5 py-3.5 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-stone-300 hover:bg-white/5 transition-all">Home</button>
                    <button onClick={() => handleMenuClick('rooms')} className="w-full text-left px-5 py-3.5 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-teal-400 bg-teal-500/10 border border-teal-500/20 transition-all">Rooms & Suites</button>
                    <button onClick={() => handleMenuClick('invoicing')} className="w-full text-left px-5 py-3.5 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-stone-300 hover:bg-white/5 transition-all">Invoicing</button>
                    <button onClick={() => handleMenuClick('legal')} className="w-full text-left px-5 py-3.5 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-stone-300 hover:bg-white/5 transition-all">Policies</button>
                    <button onClick={() => handleMenuClick('support')} className="w-full text-left px-5 py-3.5 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-stone-300 hover:bg-white/5 transition-all">Support</button>
                    <button onClick={() => handleMenuClick('aiconcierge')} className="w-full text-left px-5 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 transition-all mt-2">
                      ✨ AI Concierge
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleMenuClick('admin')} className="w-full text-left px-5 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-teal-400 bg-teal-500/10 border border-teal-500/20 transition-all">Dashboard</button>
                    <button onClick={() => handleMenuClick('frontdesk')} className="w-full text-left px-5 py-3.5 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-stone-300 hover:bg-white/5 transition-all">Front Desk</button>
                    <button onClick={() => handleMenuClick('housekeeping')} className="w-full text-left px-5 py-3.5 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-stone-300 hover:bg-white/5 transition-all">Housekeeping</button>
                    <button onClick={() => handleMenuClick('promos')} className="w-full text-left px-5 py-3.5 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-stone-300 hover:bg-white/5 transition-all">Promo Codes</button>
                    <button onClick={() => handleMenuClick('chain')} className="w-full text-left px-5 py-3.5 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-stone-300 hover:bg-white/5 transition-all">Chain Management</button>
                    <button onClick={() => handleMenuClick('channel')} className="w-full text-left px-5 py-3.5 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-stone-300 hover:bg-white/5 transition-all">Channel Manager</button>
                    <button onClick={() => handleMenuClick('analytics')} className="w-full text-left px-5 py-3.5 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-stone-300 hover:bg-white/5 transition-all">Analytics</button>
                    <button onClick={() => handleMenuClick('events')} className="w-full text-left px-5 py-3.5 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-stone-300 hover:bg-white/5 transition-all">Banquet Events</button>
                    <button onClick={() => handleMenuClick('staff')} className="w-full text-left px-5 py-3.5 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-stone-300 hover:bg-white/5 transition-all">Staff Rostering</button>
                  </>
                )}

                <div className="w-full h-px bg-white/5 my-2"></div>

                {!isLoggedIn ? (
                  <button onClick={() => handleMenuClick('auth')} className="w-full text-center bg-teal-500 text-[#050505] text-[10px] font-black uppercase tracking-widest px-4 py-4 rounded-xl transition-all shadow-[0_0_15px_rgba(20,184,166,0.3)]">
                    System Login
                  </button>
                ) : (
                  <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="w-full text-center bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-black uppercase tracking-widest px-4 py-4 rounded-xl transition-all">
                    Disconnect Session
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;