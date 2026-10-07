import React, { useState } from 'react';

function StaffRostering() {
  const [filterRole, setFilterRole] = useState('All');
  const [publishStatus, setPublishStatus] = useState('Neural synchronization active across all property nodes');
  const [isPublishing, setIsPublishing] = useState(false);
  const [workloadAI, setWorkloadAI] = useState(true);

  // অরিজিনাল ডেটা ১০০% সুরক্ষিত ও অক্ষত রাখা হয়েছে
  const [staffList, setStaffList] = useState([
    { id: 1, name: 'Michael T.', role: 'Front Desk', shifts: ['Morning', 'Morning', 'Off', 'Evening', 'Evening', 'Night', 'Night'], efficiency: '98.4%' },
    { id: 2, name: 'Sarah K.', role: 'Manager', shifts: ['Day', 'Day', 'Day', 'Day', 'Day', 'Off', 'Off'], efficiency: '99.1%' },
    { id: 3, name: 'David M.', role: 'Housekeeping', shifts: ['Evening', 'Night', 'Night', 'Off', 'Morning', 'Morning', 'Morning'], efficiency: '96.8%' },
  ]);

  // রিয়েল-টাইম লাইভ টেলিমেট্রি লগ স্ট্রিম
  const [telemetryLogs, setTelemetryLogs] = useState([
    { id: 1, time: 'Just now', event: 'Neural roster node initialized. Zero conflict state.', type: 'secure' },
    { id: 2, time: '2m ago', event: 'Automated labor regulation compliance check passed.', type: 'info' },
  ]);

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const shiftTypes = ['Morning', 'Day', 'Evening', 'Night', 'Off'];

  // সাইবারনেটিক শিফট সাইকেলিং লজিক
  const handleShiftClick = (staffId, dayIdx) => {
    setStaffList(staffList.map(staff => {
      if (staff.id === staffId) {
        const currentShift = staff.shifts[dayIdx];
        const nextIdx = (shiftTypes.indexOf(currentShift) + 1) % shiftTypes.length;
        const newShifts = [...staff.shifts];
        newShifts[dayIdx] = shiftTypes[nextIdx];

        // লাইভ টেলিমেট্রি লগ পুশ
        setTelemetryLogs(prev => [
          { id: Date.now(), time: 'Just now', event: `Shift reallocated for ${staff.name} on ${days[dayIdx]} -> [${shiftTypes[nextIdx]}]`, type: 'info' },
          ...prev.slice(0, 4)
        ]);

        return { ...staff, shifts: newShifts };
      }
      return staff;
    }));
    setPublishStatus('Unpublished quantum state detected. Deploy roster to sync.');
  };

  // এআই ওয়ার্কলোড অপ্টিমাইজার
  const handleAIOptimize = () => {
    setStaffList(staffList.map(staff => ({
      ...staff,
      shifts: staff.shifts.map(s => s === 'Off' ? 'Morning' : s)
    })));
    setTelemetryLogs(prev => [
      { id: Date.now(), time: 'Just now', event: 'AI Workload Vector: All off-days temporarily overridden for peak surge.', type: 'secure' },
      ...prev
    ]);
    setPublishStatus('AI Rebalance Matrix successfully computed.');
  };

  // রোস্টার ডিপ্লয়মেন্ট হ্যান্ডলার
  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      setPublishStatus('Quantum Roster successfully deployed & synced across hotel chain.');
      setTelemetryLogs(prev => [
        { id: Date.now(), time: 'Just now', event: 'Global timetable broadcasted to mobile workforce endpoints.', type: 'secure' },
        ...prev
      ]);
      alert("Quantum Roster deployed successfully. All staff endpoints synchronized.");
    }, 1500);
  };

  const filteredStaff = staffList.filter(staff => {
    if (filterRole === 'All') return true;
    return staff.role === filterRole;
  });

  const getCyberShiftStyle = (shift) => {
    switch(shift) {
      case 'Morning': return 'bg-teal-500/10 text-teal-300 border-teal-500/40 shadow-[0_0_15px_rgba(20,184,166,0.15)]';
      case 'Day': return 'bg-cyan-500/10 text-cyan-300 border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.15)]';
      case 'Evening': return 'bg-amber-500/10 text-amber-300 border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.15)]';
      case 'Night': return 'bg-indigo-500/10 text-indigo-300 border-indigo-500/40 shadow-[0_0_15px_rgba(99,102,241,0.15)]';
      case 'Off': return 'bg-white/[0.02] text-stone-600 border-white/5 line-through';
      default: return 'bg-white/5 text-stone-300 border-white/10';
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#030303] text-stone-200 font-sans selection:bg-teal-500 selection:text-white px-4 md:px-8 py-8 relative overflow-hidden">
      
      {/* Deep Cyber Ambient Neon Glows */}
      <div className="absolute top-[5%] left-[10%] w-[800px] h-[800px] bg-teal-600/10 rounded-full blur-[200px] pointer-events-none"></div>
      <div className="absolute bottom-[5%] right-[5%] w-[700px] h-[700px] bg-cyan-600/5 rounded-full blur-[180px] pointer-events-none"></div>

      <div className="max-w-[1700px] mx-auto relative z-10 space-y-8">
        
        {/* Futuristic Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-teal-500/10 border border-teal-500/30 text-teal-400 px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center gap-2.5 shadow-[0_0_20px_rgba(20,184,166,0.2)]">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping"></span>
                Quantum Workforce Engine v4.8
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-light text-white tracking-tight">Staff Rostering <span className="font-bold text-teal-400">&</span> Labor AI</h1>
            <p className="text-xs font-bold text-stone-500 uppercase tracking-widest mt-2">Autonomous Timetable Matrix & Neural Telemetry</p>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <button 
              onClick={handleAIOptimize}
              className="flex-1 md:flex-none bg-white/5 hover:bg-white/10 border border-white/10 text-stone-200 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm hover:border-teal-500/40"
            >
              Run AI Labor Rebalancer
            </button>
            <button 
              onClick={handlePublish}
              disabled={isPublishing}
              className="flex-1 md:flex-none bg-gradient-to-r from-teal-600 via-teal-500 to-cyan-500 hover:from-teal-500 hover:to-cyan-400 disabled:opacity-50 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-[0_0_30px_rgba(20,184,166,0.4)] hover:shadow-[0_0_45px_rgba(20,184,166,0.6)] transition-all duration-300 flex items-center justify-center gap-3"
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className={`w-4 h-4 ${isPublishing ? 'animate-spin' : ''}`}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              {isPublishing ? 'Deploying Quantum State...' : 'Deploy Roster'}
            </button>
          </div>
        </div>

        {/* Top Telemetry & Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 backdrop-blur-2xl relative overflow-hidden group hover:border-teal-500/30 transition-all">
            <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1">Active Personnel Node</p>
            <h2 className="text-3xl font-light text-white">{staffList.length} Operators</h2>
            <div className="absolute right-4 bottom-4 w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
               <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 backdrop-blur-2xl relative overflow-hidden group hover:border-teal-500/30 transition-all">
            <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1">Coverage Saturation</p>
            <h2 className="text-3xl font-light text-teal-400">100% Optimal</h2>
            <div className="absolute right-4 bottom-4 w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
               <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 backdrop-blur-2xl relative overflow-hidden group hover:border-teal-500/30 transition-all">
            <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1">Burnout Risk Index</p>
            <h2 className="text-3xl font-light text-white">0.02% (Low)</h2>
            <div className="absolute right-4 bottom-4 w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
               <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
          </div>

          <div className="bg-gradient-to-br from-teal-950/40 via-black to-black border border-teal-500/25 rounded-3xl p-6 backdrop-blur-2xl relative overflow-hidden shadow-[0_0_30px_rgba(20,184,166,0.08)]">
            <div className="flex justify-between items-center mb-1">
              <p className="text-[10px] font-bold text-teal-400 uppercase tracking-widest">Neural Autopilot</p>
              <button onClick={() => setWorkloadAI(!workloadAI)} className={`w-9 h-5 rounded-full flex items-center transition-all p-0.5 border ${workloadAI ? 'bg-teal-500/20 border-teal-500/50' : 'bg-white/5 border-white/10'}`}>
                <div className={`w-3.5 h-3.5 rounded-full transition-transform ${workloadAI ? 'translate-x-4 bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.9)]' : 'translate-x-0 bg-stone-500'}`}></div>
              </button>
            </div>
            <h2 className="text-sm font-medium text-white">{workloadAI ? 'Active Dynamic Balance' : 'Manual Override'}</h2>
          </div>
        </div>

        {/* Main Bento Grid & Timetable Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Main Shift Grid (3 Cols) */}
          <div className="bg-gradient-to-br from-white/[0.04] via-white/[0.01] to-transparent border border-white/10 rounded-3xl p-6 md:p-8 lg:col-span-3 shadow-2xl backdrop-blur-2xl flex flex-col justify-between">
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-white/10">
              <div>
                <h3 className="text-xl font-light text-white tracking-wide">Weekly Shift Matrix</h3>
                <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mt-0.5">Click any shift cell to cycle assignment instantly</p>
              </div>

              <div className="flex bg-black/60 border border-white/10 rounded-xl p-1">
                {['All', 'Front Desk', 'Manager', 'Housekeeping'].map((roleTab) => (
                  <button 
                    key={roleTab}
                    onClick={() => setFilterRole(roleTab)}
                    className={`px-4 py-2 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all ${filterRole === roleTab ? 'bg-white/10 text-white shadow-sm' : 'text-stone-500 hover:text-stone-300'}`}
                  >
                    {roleTab}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto w-full flex-1">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="text-[9px] font-bold text-stone-500 uppercase tracking-widest border-b border-white/10">
                    <th className="py-4 px-4 w-64">Personnel & Department</th>
                    {days.map(day => <th key={day} className="py-4 px-3 text-center">{day}</th>)}
                    <th className="py-4 px-4 text-right">Efficiency Index</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-medium text-stone-300">
                  {filteredStaff.map((staff) => (
                    <tr key={staff.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition">
                      <td className="py-5 px-4 flex items-center gap-3.5">
                        <div className="w-11 h-11 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center font-bold text-sm text-teal-400 shadow-inner">
                          {staff.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-white">{staff.name}</p>
                          <p className="text-[10px] text-stone-500 font-bold uppercase tracking-wider mt-0.5">{staff.role}</p>
                        </div>
                      </td>
                      
                      {staff.shifts.map((shift, sIdx) => (
                        <td key={sIdx} className="py-5 px-2 text-center">
                          <button 
                            onClick={() => handleShiftClick(staff.id, sIdx)}
                            className={`w-full py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all duration-300 hover:scale-105 active:scale-95 ${getCyberShiftStyle(shift)}`}
                            title="Click to cycle shift state"
                          >
                            {shift}
                          </button>
                        </td>
                      ))}

                      <td className="py-5 px-4 text-right">
                         <span className="font-mono font-bold text-teal-400 text-xs bg-teal-500/10 border border-teal-500/20 px-3 py-1.5 rounded-xl">
                           {staff.efficiency}
                         </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Sidebar: Live Telemetry Stream */}
          <div className="bg-gradient-to-br from-white/[0.04] via-white/[0.01] to-transparent border border-white/10 rounded-3xl p-6 shadow-2xl backdrop-blur-2xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-5 pb-3 border-b border-white/10">
                <h3 className="text-lg font-light text-white tracking-wide">Neural Telemetry</h3>
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
              </div>
              
              <div className="space-y-3 bg-black/60 border border-white/5 rounded-2xl p-4 h-[300px] overflow-y-auto font-mono">
                {telemetryLogs.map((log) => (
                  <div key={log.id} className="text-[11px] pb-3 border-b border-white/5 last:border-0 last:pb-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[9px] font-bold text-teal-400 uppercase tracking-widest">
                        [{log.type}]
                      </span>
                      <span className="text-[9px] text-stone-500">{log.time}</span>
                    </div>
                    <p className="text-stone-300 font-sans leading-relaxed">{log.event}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 text-center">
               <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">{publishStatus}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default StaffRostering;