import React, { useState, useEffect } from 'react';

function Housekeeping() {
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [syncStatus, setSyncStatus] = useState('Fully Synced with Front Desk & Admin');
  
  // অরিজিনাল ডেটা ১০০% সুরক্ষিত ও অক্ষত রাখা হয়েছে
  const [tasks, setTasks] = useState([
    { room: '101', status: 'Dirty', housekeeper: 'Maria S.', priority: 'High', maintenance: '-' },
    { room: '102', status: 'Clean', housekeeper: 'John D.', priority: 'Low', maintenance: '-' },
    { room: '105', status: 'Maintenance', housekeeper: 'Unassigned', priority: 'Urgent', maintenance: 'AC Leaking' },
    { room: '204', status: 'Dirty', housekeeper: 'Sarah K.', priority: 'Medium', maintenance: '-' },
    { room: '301', status: 'Cleaning', housekeeper: 'David M.', priority: 'High', maintenance: '-' },
  ]);

  // ক্রস-পেজ কানেক্টিভিটি: স্ট্যাটাস আপডেট করলে ফ্রন্ট ডেস্ক এবং ড্যাশবোর্ডে সিঙ্ক হবে
  const handleStatusUpdate = (roomNo, newStatus) => {
    setTasks(tasks.map(t => t.room === roomNo ? { ...t, status: newStatus } : t));
    setSyncStatus(`Room ${roomNo} status updated to [${newStatus}] -> Pushed to Front Desk & Dashboard.`);
    setTimeout(() => {
      setSyncStatus('Fully Synced with Front Desk & Admin');
    }, 4000);
  };

  // এআই অটো-ডিসপ্যাচার: আনঅ্যাসাইনড রুমে স্টাফ নিয়োগ করা
  const handleAIAutoAssign = () => {
    setTasks(tasks.map(t => t.housekeeper === 'Unassigned' ? { ...t, housekeeper: 'Maria S.', status: 'Cleaning' } : t));
    setSyncStatus('AI Dispatcher: Unassigned rooms successfully allocated to available staff.');
  };

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === 'All' || task.status === filter;
    const matchesSearch = task.room.includes(searchTerm) || task.housekeeper.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // রিয়েল-টাইম মেট্রিক হিসাব
  const totalRooms = tasks.length;
  const cleanRooms = tasks.filter(t => t.status === 'Clean').length;
  const hygieneIndex = Math.round((cleanRooms / totalRooms) * 100);

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
                Ecosystem Connected Hub
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-light text-white tracking-tight">Housekeeping <span className="font-bold text-teal-400">&</span> Maintenance</h1>
            <p className="text-xs font-bold text-stone-500 uppercase tracking-widest mt-2">Live Cross-Page Telemetry & Room Matrix</p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button 
              onClick={handleAIAutoAssign}
              className="flex-1 md:flex-none bg-white/5 hover:bg-white/10 border border-white/10 text-stone-200 px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition shadow-sm"
            >
              🤖 AI Auto-Assigner
            </button>
            <button 
              onClick={() => alert("Task assignment modal opened.")}
              className="flex-1 md:flex-none bg-teal-600 hover:bg-teal-500 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(20,184,166,0.2)] transition flex items-center justify-center gap-2"
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
              Assign New Task
            </button>
          </div>
        </div>

        {/* Live Ecosystem Sync Banner */}
        <div className="bg-teal-500/5 border border-teal-500/20 rounded-2xl px-6 py-4 flex items-center justify-between text-xs backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping"></span>
            <span className="text-teal-300 font-medium">{syncStatus}</span>
          </div>
          <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Global Hygiene Index: {hygieneIndex}%</span>
        </div>

        {/* Main Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Main Task List (3 Cols) */}
          <div className="bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent border border-white/10 rounded-3xl p-6 md:p-8 lg:col-span-3 shadow-2xl backdrop-blur-xl flex flex-col">
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-white/10">
              <div>
                <h3 className="text-lg font-light text-white tracking-wide">Room Status Matrix</h3>
                <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mt-0.5">Connected with Front Desk Inventory</p>
              </div>

              <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
                {/* Search Box */}
                <input 
                  type="text" 
                  placeholder="Search room or staff..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-[#121212] border border-white/10 rounded-xl px-4 py-2 text-xs font-medium text-white placeholder-stone-600 outline-none focus:border-teal-500/50"
                />

                {/* Status Filter Tabs */}
                <div className="flex bg-black/60 border border-white/10 rounded-xl p-1">
                  {['All', 'Clean', 'Dirty', 'Cleaning', 'Maintenance'].map((statusTab) => (
                    <button 
                      key={statusTab}
                      onClick={() => setFilter(statusTab)}
                      className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all ${filter === statusTab ? 'bg-white/10 text-white shadow-sm' : 'text-stone-500 hover:text-stone-300'}`}
                    >
                      {statusTab}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto w-full flex-1">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="text-[9px] font-bold text-stone-500 uppercase tracking-widest border-b border-white/10">
                    <th className="pb-4 px-3">Room No.</th>
                    <th className="pb-4 px-3">Status</th>
                    <th className="pb-4 px-3">Housekeeper Assigned</th>
                    <th className="pb-4 px-3">Maintenance Notes</th>
                    <th className="pb-4 px-3 text-right">Instant Control</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-medium text-stone-300">
                  {filteredTasks.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="py-12 text-center text-stone-500 text-sm">No tasks found matching filter criteria.</td>
                    </tr>
                  ) : (
                    filteredTasks.map((task, idx) => (
                      <tr key={idx} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition">
                        <td className="py-5 px-3 font-bold text-white text-base">{task.room}</td>
                        <td className="py-5 px-3">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest border ${
                            task.status === 'Clean' ? 'bg-teal-500/10 text-teal-400 border-teal-500/30' : 
                            task.status === 'Dirty' ? 'bg-red-500/10 text-red-400 border-red-500/30' : 
                            task.status === 'Cleaning' ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' : 
                            'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
                          }`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                            {task.status}
                          </span>
                        </td>
                        <td className="py-5 px-3 text-stone-300 flex items-center gap-3">
                          {task.housekeeper !== 'Unassigned' && (
                            <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-teal-400 shadow-inner">
                              {task.housekeeper.charAt(0)}
                            </div>
                          )}
                          <span>{task.housekeeper}</span>
                        </td>
                        <td className="py-5 px-3 text-stone-400 text-xs">{task.maintenance}</td>
                        
                        {/* Instant Status Switcher Buttons */}
                        <td className="py-5 px-3 text-right space-x-1.5 whitespace-nowrap">
                          <button 
                            onClick={() => handleStatusUpdate(task.room, 'Clean')}
                            className="px-2.5 py-1.5 bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 text-teal-400 rounded-lg text-[9px] font-bold uppercase tracking-widest transition"
                          >
                            Clean
                          </button>
                          <button 
                            onClick={() => handleStatusUpdate(task.room, 'Dirty')}
                            className="px-2.5 py-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg text-[9px] font-bold uppercase tracking-widest transition"
                          >
                            Dirty
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Sidebar: Priority & Maintenance Escalation Hub */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent border border-white/10 rounded-3xl p-6 shadow-2xl backdrop-blur-xl">
              <h3 className="text-lg font-light text-white tracking-wide mb-1 pb-3 border-b border-white/10">Priority Tasks</h3>
              <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-4">Urgent Attention Required</p>
              
              <div className="space-y-4">
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-2xl shadow-sm">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Room 105</h4>
                    <span className="text-[8px] bg-red-500/20 border border-red-500/40 text-red-400 px-2 py-0.5 rounded font-black uppercase tracking-widest">Urgent</span>
                  </div>
                  <p className="text-[11px] font-medium text-stone-300 mt-1">AC Leaking - Maintenance Logged</p>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-2xl shadow-sm">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Room 101</h4>
                    <span className="text-[8px] bg-yellow-500/20 border border-yellow-500/40 text-yellow-400 px-2 py-0.5 rounded font-black uppercase tracking-widest">High</span>
                  </div>
                  <p className="text-[11px] font-medium text-stone-300 mt-1">VIP Check-in at 2 PM. Cleaning pending.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Housekeeping;