import React from 'react';

function ChannelManager() {
  const channels = [
    { name: 'Booking.com', status: 'Synced', commission: '15%', lastSync: 'Just now', color: 'text-blue-700 bg-blue-50' },
    { name: 'Expedia', status: 'Synced', commission: '18%', lastSync: '5 mins ago', color: 'text-yellow-700 bg-yellow-50' },
    { name: 'Agoda', status: 'Pending', commission: '12%', lastSync: '1 hr ago', color: 'text-orange-700 bg-orange-50' },
    { name: 'Airbnb', status: 'Synced', commission: '3%', lastSync: '10 mins ago', color: 'text-red-700 bg-red-50' },
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Channel Manager & OTA Hub</h1>
          <p className="text-xs font-bold text-gray-500 mt-1">Live Sync with Global Travel Agencies</p>
        </div>
        <button className="bg-teal-800 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-teal-900 transition flex items-center gap-2">
          <span>🔄</span> Force Sync All Channels
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Connected Channels */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2">
          <h3 className="text-sm font-black text-gray-800 mb-5 border-b border-gray-100 pb-3">Connected Channels</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {channels.map((ch, idx) => (
              <div key={idx} className="border border-gray-100 p-4 rounded-xl text-center hover:shadow-md transition">
                <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center font-black text-xl mb-3 ${ch.color}`}>
                  {ch.name.charAt(0)}
                </div>
                <h4 className="text-sm font-bold text-gray-900">{ch.name}</h4>
                <p className="text-[10px] font-black uppercase mt-1 tracking-wider text-gray-400">Com: {ch.commission}</p>
                <div className={`mt-3 text-[10px] font-bold px-2 py-1 rounded-md uppercase ${ch.status === 'Synced' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                  {ch.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sync Status & Alerts */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-black text-gray-800 mb-5 border-b border-gray-100 pb-3">Connection Health</h3>
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 rounded-full border-8 border-teal-100 flex items-center justify-center relative">
               <div className="absolute inset-0 rounded-full border-8 border-teal-600 border-t-transparent border-l-transparent transform rotate-45"></div>
               <div className="text-center">
                 <span className="text-2xl font-black text-gray-900">98%</span>
                 <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Uptime</p>
               </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="bg-red-50 text-red-800 p-3 rounded-lg border border-red-100 text-xs font-bold">
              ⚠️ Agoda API sync delayed by 1 hour.
            </div>
            <div className="bg-green-50 text-green-800 p-3 rounded-lg border border-green-100 text-xs font-bold">
              ✅ Price parity maintained across all platforms.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChannelManager;