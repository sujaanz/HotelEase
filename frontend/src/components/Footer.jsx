import React, { useState, useEffect } from 'react';

function Footer({ setCurrentPage }) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Live Server Clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 4000);
    }
  };

  return (
    <footer className="w-full bg-[#020202] border-t border-white/10 pt-16 pb-6 relative overflow-hidden mt-auto z-20">
      
      {/* Subtle Ambient Glow & Cyber Grid */}
      <div className="absolute bottom-[-20%] left-[10%] w-[600px] h-[600px] bg-teal-900/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute top-[-10%] right-[5%] w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none [mask-image:radial-gradient(ellipse_60%_50%_at_50%_100%,#000_80%,transparent_100%)]"></div>

      <div className="max-w-[1550px] mx-auto px-6 md:px-10 relative z-10">
        
        {/* NEW: VIP Access Terminal (Newsletter Banner) */}
        <div className="bg-[#050505] border border-white/10 rounded-[2.5rem] p-8 md:p-10 mb-16 flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="w-full md:w-1/2">
            <span className="flex items-center gap-2 text-cyan-400 text-[9px] font-black uppercase tracking-widest mb-3">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping"></span>
              Join the Inner Circle
            </span>
            <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-2">Unlock Secret <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">Node Access.</span></h3>
            <p className="text-xs font-bold text-stone-500 max-w-md">Subscribe to our telemetry feed for VIP upgrades, hidden suites, and exclusive AI discounts.</p>
          </div>
          
          <div className="w-full md:w-1/2 flex justify-end">
            {isSubscribed ? (
              <div className="w-full max-w-md bg-cyan-500/10 border border-cyan-500/30 rounded-2xl p-4 flex items-center justify-center gap-3 shadow-inner">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5 text-cyan-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Neural Link Established</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="w-full max-w-md relative flex items-center">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Secure Comm (Email)..." 
                  required
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl py-4 pl-5 pr-36 text-xs font-bold text-white placeholder-stone-600 outline-none focus:border-cyan-400 transition-all shadow-inner"
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-2 bottom-2 bg-white/5 hover:bg-cyan-500 hover:text-black border border-white/10 hover:border-cyan-400 text-white px-6 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(6,182,212,0)] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] cursor-pointer"
                >
                  Connect
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Top Section: Multi-column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand & Intro */}
          <div className="space-y-5">
            <div 
              className="flex items-center gap-3 cursor-pointer group w-max"
              onClick={() => setCurrentPage?.('home')}
            >
              <div className="w-10 h-10 bg-[#0a0a0a] border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-black text-sm rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.15)] group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-light tracking-wide text-white group-hover:text-cyan-400 transition-colors">Hotel<span className="font-black">Ease</span></span>
                <span className="text-[7px] font-black uppercase tracking-[0.3em] text-cyan-500/60">Global Command</span>
              </div>
            </div>
            <p className="text-xs font-bold text-stone-500 leading-relaxed pr-4">
              The world's first AI-driven hospitality ecosystem. Seamlessly blending smart bookings, IoT-connected luxury suites, and quantum workforce management.
            </p>
            
            {/* Neural Social Hub */}
            <div className="flex items-center gap-3 pt-2">
              {[
                <svg key="1" fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>,
                <svg key="2" fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>,
                <svg key="3" fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              ].map((icon, i) => (
                <span key={i} className="w-9 h-9 rounded-xl bg-[#0a0a0a] border border-white/10 flex items-center justify-center text-stone-500 hover:bg-cyan-500/20 hover:border-cyan-500/50 hover:text-cyan-400 hover:-translate-y-1 transition-all shadow-inner cursor-pointer">
                  {icon}
                </span>
              ))}
            </div>
          </div>

          {/* Column 2: Ecosystem */}
          <div>
            <h4 className="text-white text-xs font-black uppercase tracking-widest mb-6 border-l-2 border-cyan-400 pl-3">Ecosystem</h4>
            <ul className="space-y-4">
              {[
                { name: 'Rooms & Suites', page: 'rooms' },
                { name: 'AI Concierge', page: 'aiconcierge', tag: 'New' },
                { name: 'Enterprise Command', page: 'admin' },
                { name: 'System Auth', page: 'auth' }
              ].map((item, idx) => (
                <li key={idx}>
                  <button onClick={() => setCurrentPage?.(item.page)} className="group flex items-center gap-2 text-xs font-bold text-stone-500 hover:text-cyan-400 transition-all cursor-pointer">
                    <svg className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"/></svg>
                    {item.name}
                    {item.tag && <span className="bg-cyan-500/10 text-cyan-400 text-[8px] font-black px-1.5 py-0.5 rounded border border-cyan-500/30 uppercase">{item.tag}</span>}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Management */}
          <div>
            <h4 className="text-white text-xs font-black uppercase tracking-widest mb-6 border-l-2 border-teal-400 pl-3">Management</h4>
            <ul className="space-y-4">
              {[
                { name: 'Front Desk Node', page: 'frontdesk' },
                { name: 'Housekeeping Matrix', page: 'housekeeping' },
                { name: 'Banquet Events', page: 'events' },
                { name: 'Neural Analytics', page: 'analytics' }
              ].map((item, idx) => (
                <li key={idx}>
                  <button onClick={() => setCurrentPage?.(item.page)} className="group flex items-center gap-2 text-xs font-bold text-stone-500 hover:text-teal-400 transition-all cursor-pointer">
                    <svg className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"/></svg>
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Compliance & Architecture */}
          <div>
            <h4 className="text-white text-xs font-black uppercase tracking-widest mb-6 border-l-2 border-purple-400 pl-3">Compliance</h4>
            <ul className="space-y-4 mb-6">
              {[
                { name: 'Privacy Policy', page: 'legal' },
                { name: 'Terms of Service', page: 'legal' },
                { name: 'Billing & Invoicing', page: 'invoicing' }
              ].map((item, idx) => (
                <li key={idx}>
                  <button onClick={() => setCurrentPage?.(item.page)} className="group flex items-center gap-2 text-xs font-bold text-stone-500 hover:text-white transition-all cursor-pointer">
                    <svg className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"/></svg>
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
            
            {/* Tech Stack Indicator */}
            <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-4 inline-block shadow-inner w-full">
              <p className="text-[9px] font-black text-stone-500 uppercase tracking-widest mb-2">Architecture Core</p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-cyan-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse"></span> React
                </div>
                <div className="w-px h-3 bg-white/20"></div>
                <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#fff] animate-pulse"></span> Flask
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Section: Divider, Copyright, Clock & Status */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <p className="text-[9px] font-black text-stone-500 uppercase tracking-widest text-center md:text-left">
            © {new Date().getFullYear()} HotelEase Global. All rights reserved.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* NEW: Live Server Clock */}
            <div className="flex items-center gap-2 bg-[#060606] border border-white/10 px-4 py-2 rounded-full shadow-inner">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-3.5 h-3.5 text-stone-500"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span className="text-[9px] font-mono font-black text-stone-400 uppercase tracking-widest">
                {currentTime.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })} HQ
              </span>
            </div>

            {/* System Status Node */}
            <div className="flex items-center gap-2 bg-cyan-900/10 border border-cyan-500/30 px-4 py-2 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.1)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="text-[9px] font-black text-cyan-400 uppercase tracking-widest">Global Nodes Operational</span>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}

export default Footer;