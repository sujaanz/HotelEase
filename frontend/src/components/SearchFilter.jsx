import React from 'react';

function SearchFilter({ searchTerm, setSearchTerm, filterStatus, setFilterStatus }) {
  return (
    <div className="bg-[#060606] border border-white/10 rounded-[2.5rem] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl mb-8 flex flex-col md:flex-row gap-4 justify-between items-center relative overflow-hidden group">
      
      {/* Ambient Cyber Glow */}
      <div className="absolute -left-10 -top-10 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/20 transition-all duration-700"></div>

      {/* Search Input Section */}
      <div className="w-full md:w-2/3 relative z-10">
        <div className="relative flex items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search rooms, suites, or IDs..."
            className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-xs font-bold text-white placeholder-stone-600 outline-none focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all shadow-inner"
          />
          {/* Cyber Search Icon */}
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4 text-stone-500 absolute left-4 group-focus-within:text-cyan-400 transition-colors">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Filter Select Section */}
      <div className="w-full md:w-1/3 relative z-10">
        <div className="relative flex items-center">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full appearance-none bg-[#0a0a0a] border border-white/10 rounded-2xl pl-5 pr-10 py-4 text-[10px] font-black uppercase tracking-widest text-cyan-400 outline-none focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all shadow-inner cursor-pointer"
          >
            <option value="All" className="bg-[#0a0a0a] text-stone-300">All Status</option>
            <option value="Available" className="bg-[#0a0a0a] text-cyan-400">Available</option>
            <option value="Booked" className="bg-[#0a0a0a] text-red-400">Booked</option>
          </select>
          
          {/* Custom Dropdown Arrow */}
          <div className="absolute right-4 pointer-events-none text-stone-500 group-focus-within:text-cyan-400 transition-colors">
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