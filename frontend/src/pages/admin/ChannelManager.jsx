import React, { useState } from 'react';

function ChannelManager() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [filter, setFilter] = useState('All');
  const [yieldAI, setYieldAI] = useState(true);
  
  // অরিজিনাল ডেটা এবং কানেক্টিভিটি স্টেট ১০০% সুরক্ষিত
  const [channels, setChannels] = useState([
    { id: 'ch-1', name: 'Booking.com', status: 'Synced', commission: '15%', lastSync: 'Just now', active: true, bookingsToday: 14, rate: '$180' },
    { id: 'ch-2', name: 'Expedia', status: 'Synced', commission: '18%', lastSync: '5 mins ago', active: true, bookingsToday: 9, rate: '$180' },
    { id: 'ch-3', name: 'Agoda', status: 'Pending', commission: '12%', lastSync: '1 hr ago', active: false, bookingsToday: 2, rate: '$175' },
    { id: 'ch-4', name: 'Airbnb', status: 'Synced', commission: '3%', lastSync: '10 mins ago', active: true, bookingsToday: 7, rate: '$180' },
  ]);

  // রিয়েল-টাইম লাইভ ওয়েবহুক লগ স্ট্রিম
  const [webhookLogs, setWebhookLogs] = useState([
    { id: 1, time: 'Just now', event: 'New booking confirmed via Booking.com (Room 204)', type: 'success' },
    { id: 2, time: '3 mins ago', event: 'Inventory count updated across 3 active OTA nodes', type: 'info' },
    { id: 3, time: '12 mins ago', event: 'Rate parity check passed successfully', type: 'success' },
  ]);

  // চ্যানেল টগল করার ফাংশন
  const toggleChannel = (id) => {
    setChannels(channels.map(ch => {
      if (ch.id === id) {
        const newActive = !ch.active;
        setWebhookLogs(prev => [
          { id: Date.now(), time: 'Just now', event: `Gateway connection toggled for ${ch.name} (${newActive ? 'Connected' : 'Disconnected'})`, type: 'info' },
          ...prev
        ]);
        return { 
          ...ch, 
          active: newActive, 
          status: newActive ? 'Synced' : 'Disconnected',
          lastSync: 'Just now' 
        };
      }
      return ch;
    }));
  };

  // ফোর্স সিঙ্ক ফাংশন
  const handleForceSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setChannels(channels.map(ch => ch.active ? { ...ch, status: 'Synced', lastSync: 'Just now' } : ch));
      setWebhookLogs(prev => [
        { id: Date.now(), time: 'Just now', event: 'Manual force sync executed across all active distribution nodes.', type: 'success' },
        ...prev
      ]);
      alert("All active channels synchronized with global central inventory successfully.");
    }, 1500);
  };

  const filteredChannels = channels.filter(ch => {
    if (filter === 'All') return true;
    if (filter === 'Synced') return ch.status === 'Synced';
    if (filter === 'Pending') return ch.status === 'Pending' || ch.status === 'Disconnected';
    return true;
  });

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
                Central Distribution Hub
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-light text-white tracking-tight">Channel Manager <span className="font-bold text-teal-400">&</span> OTAs</h1>
            <p className="text-xs font-bold text-stone-500 uppercase tracking-widest mt-2">Global Inventory & Real-Time Rate Parity Engine</p>
          </div>
          
          <div className="flex gap-4 w-full md:w-auto">
            <button 
              onClick={handleForceSync}
              disabled={isSyncing}
              className="flex-1 md:flex-none bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(20,184,166,0.2)] hover:shadow-[0_0_30px_rgba(20,184,166,0.4)] transition-all duration-300 flex items-center gap-2.5 justify-center"
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {isSyncing ? 'Syncing Network...' : 'Force Sync All Channels'}
            </button>
          </div>
        </div>

        {/* Top Quick Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
            <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1">Active OTA Nodes</p>
            <h3 className="text-2xl font-light text-white">3 / 4 Connected</h3>
          </div>
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
            <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1">Total Bookings Today</p>
            <h3 className="text-2xl font-light text-white">32 Bookings</h3>
          </div>
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
            <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1">Rate Parity Score</p>
            <h3 className="text-2xl font-light text-teal-400">100% Match</h3>
          </div>
          <div className="bg-gradient-to-br from-teal-950/40 to-black border border-teal-500/20 rounded-2xl p-6 relative overflow-hidden">
            <div className="flex justify-between items-center mb-1">
              <p className="text-[10px] font-bold text-teal-400 uppercase tracking-widest">AI Yield Management</p>
              <button onClick={() => setYieldAI(!yieldAI)} className={`w-9 h-5 rounded-full flex items-center transition-all p-0.5 border ${yieldAI ? 'bg-teal-500/20 border-teal-500/50' : 'bg-white/5 border-white/10'}`}>
                <div className={`w-3.5 h-3.5 rounded-full transition-transform ${yieldAI ? 'translate-x-4 bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.8)]' : 'translate-x-0 bg-stone-500'}`}></div>
              </button>
            </div>
            <h3 className="text-sm font-medium text-white">{yieldAI ? 'Auto-Optimizing Rates' : 'Manual Control'}</h3>
          </div>
        </div>

        {/* Main Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Connected Channels Management Cards (2 Cols) */}
          <div className="bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent border border-white/10 rounded-3xl p-6 md:p-8 lg:col-span-2 shadow-2xl backdrop-blur-xl flex flex-col">
            
            {/* Filter & Control Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-white/10">
              <div>
                <h3 className="text-lg font-light text-white tracking-wide">Connected Distribution Channels</h3>
                <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mt-0.5">Direct API Gateways</p>
              </div>

              <div className="flex bg-black/60 border border-white/10 rounded-xl p-1">
                {['All', 'Synced', 'Pending'].map((statusTab) => (
                  <button 
                    key={statusTab}
                    onClick={() => setFilter(statusTab)}
                    className={`px-4 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all ${filter === statusTab ? 'bg-white/10 text-white shadow-sm' : 'text-stone-500 hover:text-stone-300'}`}
                  >
                    {statusTab}
                  </button>
                ))}
              </div>
            </div>

            {/* Channels Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 flex-1">
              {filteredChannels.map((ch) => (
                <div key={ch.id} className="bg-white/[0.02] border border-white/10 p-6 rounded-2xl hover:bg-white/[0.05] hover:border-teal-500/30 transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center font-bold text-lg text-teal-400 group-hover:scale-110 transition-transform shadow-inner">
                        {ch.name.charAt(0)}
                      </div>
                      
                      {/* Interactive Connect/Disconnect Toggle Switch */}
                      <button 
                        onClick={() => toggleChannel(ch.id)}
                        className={`w-11 h-6 rounded-full flex items-center transition-all duration-300 p-1 focus:outline-none border ${ch.active ? 'bg-teal-500/20 border-teal-500/50' : 'bg-white/5 border-white/10'}`}
                        title="Toggle Gateway Connection"
                      >
                        <div className={`w-4 h-4 rounded-full shadow-sm transform transition-transform duration-300 ${ch.active ? 'translate-x-5 bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.8)]' : 'translate-x-0 bg-stone-500'}`}></div>
                      </button>
                    </div>

                    <h4 className="text-sm font-bold text-white tracking-wide mb-1">{ch.name}</h4>
                    <div className="flex gap-4 text-[10px] font-bold uppercase tracking-widest text-stone-500 mt-2">
                      <p>Commission: <span className="text-stone-300">{ch.commission}</span></p>
                      <p>Bookings: <span className="text-teal-400">{ch.bookingsToday}</span></p>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className={`text-[9px] font-bold px-3 py-1 rounded-md uppercase tracking-widest border ${
                      ch.status === 'Synced' ? 'bg-teal-500/10 text-teal-400 border-teal-500/30' : 
                      ch.status === 'Disconnected' ? 'bg-red-500/10 text-red-400 border-red-500/30' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
                    }`}>
                      {ch.status}
                    </span>
                    <span className="text-[9px] font-medium text-stone-500">Rate: {ch.rate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Health & Live Webhook Stream Panel */}
          <div className="bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-xl flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-light text-white tracking-wide mb-1">Live API Webhook Stream</h3>
              <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-6">Real-time OTA Event Log</p>
              
              {/* Terminal Log Stream */}
              <div className="space-y-3 bg-black/50 border border-white/5 rounded-2xl p-4 h-[260px] overflow-y-auto">
                {webhookLogs.map((log) => (
                  <div key={log.id} className="text-xs pb-3 border-b border-white/5 last:border-0 last:pb-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className={`text-[9px] font-bold uppercase tracking-widest ${log.type === 'success' ? 'text-teal-400' : 'text-blue-400'}`}>
                        {log.type === 'success' ? 'Verified' : 'Event'}
                      </span>
                      <span className="text-[9px] text-stone-500 font-mono">{log.time}</span>
                    </div>
                    <p className="text-stone-300 font-medium leading-relaxed">{log.event}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Notification Alerts */}
            <div className="space-y-3 mt-6">
              <div className="bg-teal-500/10 border border-teal-500/30 text-teal-300 p-4 rounded-2xl text-xs font-medium leading-relaxed">
                <span className="block font-bold uppercase tracking-widest text-[9px] mb-1 text-teal-400">System Secure</span>
                Central inventory locks are successfully pushed to all active OTAs in real-time.
              </div>
            </div>
          </div>

        </div>

        {/* New Feature: Live Rate Parity Matrix Table */}
        <div className="bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-light text-white tracking-wide">Cross-Platform Rate Parity Matrix</h3>
            <span className="text-[10px] font-bold text-teal-400 uppercase tracking-widest bg-teal-500/10 border border-teal-500/30 px-3 py-1 rounded-full">
              Parity Enforced
            </span>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="text-[9px] font-bold text-stone-500 uppercase tracking-widest border-b border-white/10">
                  <th className="pb-4 px-3">Room Category</th>
                  <th className="pb-4 px-3">Booking.com Rate</th>
                  <th className="pb-4 px-3">Expedia Rate</th>
                  <th className="pb-4 px-3">Agoda Rate</th>
                  <th className="pb-4 px-3">Airbnb Rate</th>
                  <th className="pb-4 px-3 text-right">Parity Status</th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium text-stone-300">
                {[
                  { category: 'Deluxe King Suite', bCom: '$180.00', expedia: '$180.00', agoda: '$180.00', airbnb: '$180.00', status: 'Matched' },
                  { category: 'Executive Double Room', bCom: '$125.00', expedia: '$125.00', agoda: '$125.00', airbnb: '$125.00', status: 'Matched' },
                  { category: 'Penthouse Luxury Suite', bCom: '$350.00', expedia: '$350.00', agoda: '$350.00', airbnb: '$350.00', status: 'Matched' },
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-3 font-bold text-white">{row.category}</td>
                    <td className="py-4 px-3 text-stone-300">{row.bCom}</td>
                    <td className="py-4 px-3 text-stone-300">{row.expedia}</td>
                    <td className="py-4 px-3 text-stone-300">{row.agoda}</td>
                    <td className="py-4 px-3 text-stone-300">{row.airbnb}</td>
                    <td className="py-4 px-3 text-right">
                      <span className="bg-teal-500/10 border border-teal-500/30 text-teal-400 px-2.5 py-1 rounded text-[9px] font-bold uppercase tracking-widest">
                        {row.status}
                      </span>
                    </td>
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

export default ChannelManager;