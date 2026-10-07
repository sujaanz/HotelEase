import React from 'react';

function SearchFilter({ searchTerm, setSearchTerm, filterStatus, setFilterStatus }) {
  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-[1.5rem] p-5 shadow-[0_0_30px_rgba(20,184,166,0.03)] backdrop-blur-xl mb-8 flex flex-col md:flex-row gap-4 justify-between items-center relative overflow-hidden group">
      
      {/* Subtle Ambient Glow */}
      <div className="absolute -left-10 -top-10 w-40 h-40 bg-teal-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-teal-500/20 transition-all duration-700"></div>

      {/* Search Input Section */}
      <div className="w-full md:w-2/3 relative z-10">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search rooms, suites, or IDs..."
            className="w-full bg-[#050505] border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-xs font-medium text-white placeholder-stone-600 outline-none focus:border-teal-500/50 focus:shadow-[0_0_15px_rgba(20,184,166,0.1)] transition-all shadow-inner"
          />
          {/* Cyber Search Icon */}
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4 text-stone-500 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-teal-400 transition-colors">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Filter Select Section */}
      <div className="w-full md:w-1/3 relative z-10">
        <div className="relative">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full appearance-none bg-[#050505] border border-white/10 rounded-xl pl-5 pr-10 py-3.5 text-[10px] font-black uppercase tracking-widest text-teal-400 outline-none focus:border-teal-500/50 focus:shadow-[0_0_15px_rgba(20,184,166,0.1)] transition-all shadow-inner cursor-pointer"
          >
            <option value="All" className="bg-[#121212] text-stone-300">All Status</option>
            <option value="Available" className="bg-[#121212] text-teal-400">Available</option>
            <option value="Booked" className="bg-[#121212] text-red-400">Booked</option>
          </select>
          
          {/* Custom Dropdown Arrow */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-stone-500 group-focus-within:text-teal-400 transition-colors">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

    </div>
  );
}

export default SearchFilter;