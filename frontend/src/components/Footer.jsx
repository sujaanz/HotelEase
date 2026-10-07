import React from 'react';

function Footer({ setCurrentPage }) {
  return (
    <footer className="w-full bg-[#030303] border-t border-white/5 pt-16 pb-6 relative overflow-hidden mt-auto z-20">
      
      {/* Subtle Ambient Glow */}
      <div className="absolute bottom-[-20%] left-[10%] w-[500px] h-[500px] bg-teal-900/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute top-[-10%] right-[5%] w-[400px] h-[400px] bg-cyan-900/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-[1700px] mx-auto px-6 md:px-10 relative z-10">
        
        {/* Top Section: Multi-column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand & Intro */}
          <div className="space-y-4">
            <div 
              className="flex items-center gap-3 cursor-pointer group w-max"
              onClick={() => setCurrentPage?.('home')}
            >
              <div className="w-9 h-9 bg-black border border-teal-500/30 text-teal-400 flex items-center justify-center font-black text-sm rounded-lg shadow-[0_0_15px_rgba(20,184,166,0.1)] group-hover:bg-teal-500/10 transition-all duration-300">
                H
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-light tracking-wide text-white group-hover:text-teal-400 transition-colors">Hotel<span className="font-bold">Ease</span></span>
                <span className="text-[7px] font-black uppercase tracking-[0.3em] text-teal-500/60">Global Command</span>
              </div>
            </div>
            <p className="text-xs font-medium text-stone-500 leading-relaxed pr-4">
              The world's first AI-driven hospitality ecosystem. Seamlessly blending smart bookings, IoT-connected luxury suites, and quantum workforce management.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-stone-400 hover:bg-teal-500/20 hover:text-teal-400 transition-all cursor-pointer">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </span>
              <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-stone-400 hover:bg-teal-500/20 hover:text-teal-400 transition-all cursor-pointer">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </span>
              <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-stone-400 hover:bg-teal-500/20 hover:text-teal-400 transition-all cursor-pointer">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </span>
            </div>
          </div>

          {/* Column 2: Ecosystem */}
          <div>
            <h4 className="text-white text-sm font-bold tracking-wide mb-6">Ecosystem</h4>
            <ul className="space-y-3">
              <li><button onClick={() => setCurrentPage?.('rooms')} className="text-xs font-medium text-stone-400 hover:text-teal-400 hover:translate-x-1 transition-all">Rooms & Suites</button></li>
              <li><button onClick={() => setCurrentPage?.('aiconcierge')} className="text-xs font-medium text-stone-400 hover:text-teal-400 hover:translate-x-1 transition-all flex items-center gap-2">AI Concierge <span className="bg-teal-500/10 text-teal-400 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">New</span></button></li>
              <li><button onClick={() => setCurrentPage?.('admin')} className="text-xs font-medium text-stone-400 hover:text-teal-400 hover:translate-x-1 transition-all">Enterprise Command</button></li>
              <li><button onClick={() => setCurrentPage?.('auth')} className="text-xs font-medium text-stone-400 hover:text-teal-400 hover:translate-x-1 transition-all">System Auth</button></li>
            </ul>
          </div>

          {/* Column 3: Management */}
          <div>
            <h4 className="text-white text-sm font-bold tracking-wide mb-6">Management</h4>
            <ul className="space-y-3">
              <li><button onClick={() => setCurrentPage?.('frontdesk')} className="text-xs font-medium text-stone-400 hover:text-teal-400 hover:translate-x-1 transition-all">Front Desk Node</button></li>
              <li><button onClick={() => setCurrentPage?.('housekeeping')} className="text-xs font-medium text-stone-400 hover:text-teal-400 hover:translate-x-1 transition-all">Housekeeping Matrix</button></li>
              <li><button onClick={() => setCurrentPage?.('events')} className="text-xs font-medium text-stone-400 hover:text-teal-400 hover:translate-x-1 transition-all">Banquet Events</button></li>
              <li><button onClick={() => setCurrentPage?.('analytics')} className="text-xs font-medium text-stone-400 hover:text-teal-400 hover:translate-x-1 transition-all">Neural Analytics</button></li>
            </ul>
          </div>

          {/* Column 4: Legal & Tech */}
          <div>
            <h4 className="text-white text-sm font-bold tracking-wide mb-6">Compliance</h4>
            <ul className="space-y-3 mb-6">
              <li><button onClick={() => setCurrentPage?.('legal')} className="text-xs font-medium text-stone-400 hover:text-teal-400 hover:translate-x-1 transition-all">Privacy Policy</button></li>
              <li><button onClick={() => setCurrentPage?.('legal')} className="text-xs font-medium text-stone-400 hover:text-teal-400 hover:translate-x-1 transition-all">Terms of Service</button></li>
              <li><button onClick={() => setCurrentPage?.('invoicing')} className="text-xs font-medium text-stone-400 hover:text-teal-400 hover:translate-x-1 transition-all">Billing & Invoicing</button></li>
            </ul>
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3 inline-block">
              <p className="text-[9px] font-bold text-stone-500 uppercase tracking-widest mb-1.5">Architecture</p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-xs font-black text-cyan-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span> React
                </div>
                <div className="w-px h-3 bg-white/20"></div>
                <div className="flex items-center gap-1.5 text-xs font-black text-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-white"></span> Flask
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Section: Divider & Copyright */}
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest text-center md:text-left">
            © {new Date().getFullYear()} HotelEase. All rights reserved.
          </p>
          
          <div className="flex items-center gap-2 bg-black/40 border border-teal-500/20 px-3 py-1.5 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
            <span className="text-[9px] font-bold text-teal-400 uppercase tracking-widest">All Systems Operational</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;