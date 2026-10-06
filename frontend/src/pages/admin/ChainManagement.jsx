import React from 'react';

function ChainManagement() {
  const properties = [
    { name: 'HotelEase Dhaka', city: 'Dhaka', occupancy: '78%', revPar: '$85.50', adr: '$110.00', status: 'Optimal' },
    { name: 'Serene Resort', city: 'Cox\'s Bazar', occupancy: '92%', revPar: '$145.20', adr: '$158.00', status: 'High Demand' },
    { name: 'Tea Garden Resort', city: 'Sylhet', occupancy: '64%', revPar: '$55.80', adr: '$88.00', status: 'Needs Attention' },
    { name: 'Oceanfront Inn', city: 'Chittagong', occupancy: '81%', revPar: '$95.00', adr: '$118.00', status: 'Optimal' },
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Chain Administration Hub</h1>
          <p className="text-xs font-bold text-gray-500 mt-1">Multi-Property Management & Global Overview</p>
        </div>
        <button className="bg-teal-800 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-teal-900 transition flex items-center gap-2">
          <span>+</span> Add New Property
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Properties</p>
          <h2 className="text-3xl font-black text-gray-900 mt-1">04</h2>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Rooms (Global)</p>
          <h2 className="text-3xl font-black text-gray-900 mt-1">542</h2>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Average Network Occupancy</p>
          <h2 className="text-3xl font-black text-teal-700 mt-1">78.5%</h2>
        </div>
      </div>

      {/* Map & Property List */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-sm font-black text-gray-800">Global Footprint</h3>
          <button className="text-teal-600 text-xs font-bold hover:underline">View Detailed Map</button>
        </div>
        
        {/* Map Placeholder */}
        <div className="w-full h-64 bg-teal-50 rounded-xl mb-6 relative overflow-hidden border border-teal-100 flex items-center justify-center">
          <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center"></div>
          <div className="relative z-10 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-teal-200 shadow-sm text-center">
            <span className="text-xl">🗺️</span>
            <p className="text-xs font-black text-teal-800 mt-1">Interactive Map Integration Ready</p>
          </div>
        </div>

        {/* Property Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] font-black text-gray-400 uppercase tracking-wider border-b border-gray-100">
                <th className="py-3 px-2">Property Name</th>
                <th className="py-3 px-2">City/Location</th>
                <th className="py-3 px-2">Occupancy</th>
                <th className="py-3 px-2">RevPAR</th>
                <th className="py-3 px-2">ADR</th>
                <th className="py-3 px-2 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="text-xs font-bold text-gray-800">
              {properties.map((prop, idx) => (
                <tr key={idx} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition">
                  <td className="py-4 px-2">{prop.name}</td>
                  <td className="py-4 px-2 text-gray-500">{prop.city}</td>
                  <td className="py-4 px-2">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-teal-600" style={{ width: prop.occupancy }}></div>
                      </div>
                      <span>{prop.occupancy}</span>
                    </div>
                  </td>
                  <td className="py-4 px-2 text-teal-700">{prop.revPar}</td>
                  <td className="py-4 px-2">{prop.adr}</td>
                  <td className="py-4 px-2 text-right">
                    <span className={`px-2 py-1 rounded text-[9px] font-black uppercase ${
                      prop.status === 'Optimal' ? 'bg-green-50 text-green-700' :
                      prop.status === 'High Demand' ? 'bg-orange-50 text-orange-700' : 'bg-red-50 text-red-700'
                    }`}>
                      {prop.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ChainManagement;