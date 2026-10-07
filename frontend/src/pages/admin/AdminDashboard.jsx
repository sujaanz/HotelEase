import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

function AdminDashboard({ setCurrentPage }) {
  const [isExporting, setIsExporting] = useState(false);
  const [autoApprove, setAutoApprove] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState('This Week');
  const [currentTime, setCurrentTime] = useState('');

  // Live Clock Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const revenueData = [
    { name: 'Jan', value: 4200 }, { name: 'Feb', value: 3800 },
    { name: 'Mar', value: 6500 }, { name: 'Apr', value: 8900 },
    { name: 'May', value: 7200 }, { name: 'Jun', value: 11400 },
  ];
  
  const occupancyData = [
    { name: 'Occupied', value: 78 }, { name: 'Available', value: 22 }
  ];
  const COLORS = ['#2dd4bf', '#134e4a']; 

  const recentActivities = [
    { id: 1, action: 'New Booking', user: 'Guest #892', time: '2 mins ago', status: 'text-teal-400' },
    { id: 2, action: 'Check-in', user: 'Room 102', time: '15 mins ago', status: 'text-stone-300' },
    { id: 3, action: 'Payment Failed', user: 'Guest #890', time: '1 hour ago', status: 'text-red-400' },
    { id: 4, action: 'Room Cleaned', user: 'Housekeeping', time: '2 hours ago', status: 'text-stone-300' },
  ];

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert("System data exported successfully via secure channel.");
    }, 1500);
  };

  return (
    <div className="w-full min-h-screen bg-[#050505] text-stone-200 font-sans selection:bg-teal-500 selection:text-white px-4 md:px-8 py-8 relative overflow-hidden">
      
      {/* Deep Ambient Neon Glows */}
      <div className="absolute top-[5%] right-[10%] w-[800px] h-[800px] bg-teal-500/10 rounded-full blur-[200px] pointer-events-none"></div>
      <div className="absolute bottom-[5%] left-[5%] w-[700px] h-[700px] bg-cyan-500/5 rounded-full blur-[180px] pointer-events-none"></div>

      <div className="max-w-[1700px] mx-auto relative z-10 space-y-8">
        
        {/* Modern Header with Live Clock */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <div className="bg-white/[0.03] border border-white/10 px-3.5 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest text-teal-400 flex items-center gap-2 backdrop-blur-md shadow-[0_0_15px_rgba(20,184,166,0.15)]">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping"></span>
                System Live Neural Sync
              </div>
              <div className="text-[10px] font-bold text-stone-500 uppercase tracking-widest flex items-center gap-1.5 font-mono">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-3.5 h-3.5 text-teal-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {currentTime || 'Syncing...'}
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-light text-white tracking-tight">Enterprise <span className="font-bold text-teal-400">Command</span></h1>
          </div>
          
          <div className="flex gap-3 w-full md:w-auto">
            <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-stone-300 p-3.5 rounded-2xl transition-all shadow-sm group" title="System Settings">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </button>
            <button onClick={handleExport} disabled={isExporting} className="bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 disabled:opacity-50 text-white px-7 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-[0_0_25px_rgba(20,184,166,0.3)] hover:shadow-[0_0_35px_rgba(20,184,166,0.5)] transition-all duration-300 flex items-center justify-center min-w-[160px] gap-2.5">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              {isExporting ? 'Processing...' : 'Export Report'}
            </button>
          </div>
        </div>

        {/* Bento Grid Layout - Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          
          {/* Quick Stat 1 */}
          <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 relative overflow-hidden group hover:border-teal-500/40 transition-all backdrop-blur-2xl">
            <div className="absolute right-0 top-0 w-32 h-32 bg-teal-500/10 blur-[50px] pointer-events-none"></div>
            <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">Net Revenue</p>
            <h3 className="text-3xl font-light text-white">$42,000</h3>
            <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-teal-400 uppercase tracking-widest">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
              +14.5% vs last week
            </div>
          </div>

          {/* Quick Stat 2 */}
          <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 relative overflow-hidden group hover:border-teal-500/40 transition-all backdrop-blur-2xl">
            <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">Active Bookings</p>
            <h3 className="text-3xl font-light text-white">124</h3>
            <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-teal-400 uppercase tracking-widest">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
              8 new today
            </div>
          </div>

          {/* Occupancy Donut (Compact) */}
          <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 flex items-center justify-between xl:col-span-1 hover:border-teal-500/40 transition-all backdrop-blur-2xl">
            <div>
              <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">Occupancy</p>
              <h3 className="text-3xl font-light text-white">78%</h3>
              <p className="text-[9px] font-bold text-stone-500 uppercase tracking-widest mt-3">22% Available</p>
            </div>
            <div className="w-24 h-24 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={occupancyData} innerRadius={35} outerRadius={45} dataKey="value" stroke="none">
                    {occupancyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI Insight Box */}
          <div className="bg-gradient-to-br from-teal-950/40 via-black to-black border border-teal-500/25 rounded-3xl p-6 xl:col-span-1 shadow-[0_0_30px_rgba(20,184,166,0.08)] relative overflow-hidden backdrop-blur-2xl">
            <div className="absolute -right-4 -top-4 text-teal-500/10 pointer-events-none">
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-32 h-32"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-teal-400">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </span>
                <p className="text-[9px] font-bold text-teal-400 uppercase tracking-widest">AI Intelligence Insight</p>
              </div>
              <p className="text-xs font-medium text-stone-300 leading-relaxed">
                Revenue is projected to hit <span className="text-white font-bold">$12.5k</span> by weekend. Consider dynamic pricing on standard rooms.
              </p>
            </div>
          </div>
        </div>

        {/* Bento Grid Layout - Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Analytics Area Chart */}
          <div className="bg-gradient-to-br from-white/[0.04] via-white/[0.01] to-transparent border border-white/10 rounded-3xl p-8 lg:col-span-2 flex flex-col min-h-[380px] shadow-2xl backdrop-blur-2xl">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-xl font-light text-white tracking-wide">Revenue Trajectory</h3>
                <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mt-1">Year to Date Analysis</p>
              </div>
              <button className="text-[9px] font-bold text-teal-400 border border-teal-500/30 bg-teal-500/10 px-4.5 py-2 rounded-xl uppercase tracking-widest hover:bg-teal-500/20 transition-all">
                View Full Report
              </button>
            </div>
            
            <div className="w-full flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#78716c', fontWeight: 'bold' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#78716c', fontWeight: 'bold' }} dx={-10} tickFormatter={(val) => `$${val/1000}k`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#121212', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', fontSize: '11px', color: '#fff', boxShadow: '0 15px 40px rgba(0,0,0,0.8)' }}
                    itemStyle={{ color: '#2dd4bf', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#2dd4bf" strokeWidth={3.5} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Live Activity Feed */}
          <div className="bg-gradient-to-br from-white/[0.04] via-white/[0.01] to-transparent border border-white/10 rounded-3xl p-8 flex flex-col h-full shadow-2xl backdrop-blur-2xl">
            <h3 className="text-xl font-light text-white tracking-wide mb-1">Live Audit Log</h3>
            <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-6">Real-time system activities</p>
            
            <div className="flex-1 space-y-6 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-white/20 before:rounded-full after:absolute after:left-[3px] after:top-4 after:w-[1px] after:h-full after:bg-white/5 last:after:hidden">
                  <p className={`text-xs font-bold ${activity.status} uppercase tracking-wider mb-0.5`}>{activity.action}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-white">{activity.user}</p>
                    <p className="text-[9px] font-bold text-stone-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3.5 border border-white/10 rounded-2xl text-[10px] font-bold text-stone-400 uppercase tracking-widest hover:bg-white/5 transition-all">
              View All Logs
            </button>
          </div>
        </div>

        {/* Bento Grid Layout - Row 3 (Inventory Matrix & Toggles) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Advanced Toggles & Actions */}
          <div className="bg-gradient-to-br from-white/[0.04] via-white/[0.01] to-transparent border border-white/10 rounded-3xl p-6 lg:p-8 flex flex-col justify-between shadow-2xl backdrop-blur-2xl">
            <div>
              <h3 className="text-xl font-light text-white tracking-wide mb-6">System Controls</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between group bg-black/40 p-4 rounded-2xl border border-white/5">
                  <div>
                    <span className="block text-[10px] font-bold text-white uppercase tracking-widest">Auto-Approve</span>
                    <span className="text-[9px] font-bold text-stone-500">AI booking validation</span>
                  </div>
                  <button onClick={() => setAutoApprove(!autoApprove)} className={`w-12 h-6 rounded-full flex items-center transition-all duration-300 p-1 focus:outline-none border ${autoApprove ? 'bg-teal-500/20 border-teal-500/50' : 'bg-white/5 border-white/10'}`}>
                    <div className={`w-4 h-4 rounded-full shadow-sm transform transition-transform duration-300 ${autoApprove ? 'translate-x-6 bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.8)]' : 'translate-x-0 bg-stone-500'}`}></div>
                  </button>
                </div>
                
                <div className="flex items-center justify-between group bg-black/40 p-4 rounded-2xl border border-white/5">
                  <div>
                    <span className="block text-[10px] font-bold text-white uppercase tracking-widest">Maintenance Mode</span>
                    <span className="text-[9px] font-bold text-stone-500">Lock new reservations</span>
                  </div>
                  <button onClick={() => setMaintenanceMode(!maintenanceMode)} className={`w-12 h-6 rounded-full flex items-center transition-all duration-300 p-1 focus:outline-none border ${maintenanceMode ? 'bg-red-500/20 border-red-500/50' : 'bg-white/5 border-white/10'}`}>
                    <div className={`w-4 h-4 rounded-full shadow-sm transform transition-transform duration-300 ${maintenanceMode ? 'translate-x-6 bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.8)]' : 'translate-x-0 bg-stone-500'}`}></div>
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <button onClick={() => setCurrentPage('frontdesk')} className="w-full bg-teal-600 hover:bg-teal-500 text-white py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(20,184,166,0.3)]">
                Front Desk Panel
              </button>
              <button onClick={() => setCurrentPage('housekeeping')} className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-stone-300 py-3.5 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all">
                Housekeeping
              </button>
            </div>
          </div>

          {/* Matrix Table */}
          <div className="bg-gradient-to-br from-white/[0.04] via-white/[0.01] to-transparent border border-white/10 rounded-3xl p-6 lg:p-8 lg:col-span-3 overflow-x-auto shadow-2xl backdrop-blur-2xl">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-light text-white tracking-wide">Inventory Matrix</h3>
              <div className="relative">
                <select value={selectedWeek} onChange={(e) => setSelectedWeek(e.target.value)} className="bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-[9px] font-bold text-stone-300 uppercase tracking-widest outline-none focus:border-teal-500/50 appearance-none pr-8 cursor-pointer shadow-inner">
                  <option value="This Week">Current Week</option>
                  <option value="Next Week">Next Week</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-stone-500">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-3 h-3"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>
            
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="text-[9px] font-bold text-stone-500 uppercase tracking-widest border-b border-white/10">
                  <th className="pb-4 pr-4">Room No.</th>
                  <th className="pb-4 px-2">Type</th>
                  <th className="pb-4 px-2 text-center">Mo</th>
                  <th className="pb-4 px-2 text-center">Tu</th>
                  <th className="pb-4 px-2 text-center">We</th>
                  <th className="pb-4 px-2 text-center">Th</th>
                  <th className="pb-4 px-2 text-center">Fr</th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium text-stone-300">
                {[
                  { no: '101', type: 'King Suite', days: ['border-red-500/30 text-red-400', 'border-red-500/30 text-red-400', 'border-teal-500/30 text-teal-400', 'border-teal-500/30 text-teal-400', 'border-stone-500/30 text-stone-500'] },
                  { no: '102', type: 'Double Room', days: ['border-teal-500/30 text-teal-400', 'border-teal-500/30 text-teal-400', 'border-teal-500/30 text-teal-400', 'border-red-500/30 text-red-400', 'border-red-500/30 text-red-400'] },
                  { no: '103', type: 'Double Room', days: ['border-stone-500/30 text-stone-500', 'border-teal-500/30 text-teal-400', 'border-teal-500/30 text-teal-400', 'border-teal-500/30 text-teal-400', 'border-teal-500/30 text-teal-400'] },
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                    <td className="py-5 pr-4 font-bold text-white">{row.no}</td>
                    <td className="py-5 px-2 text-stone-400 text-[11px] uppercase tracking-wider">{row.type}</td>
                    {row.days.map((statusClass, dIdx) => (
                      <td key={dIdx} className="py-5 px-2 text-center">
                        <div className={`w-9 h-7 mx-auto rounded-xl border flex items-center justify-center ${statusClass} bg-black/40 shadow-inner`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;