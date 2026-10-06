import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

function AdminDashboard({ setCurrentPage }) {
  // ডামি ডেটা চার্টের জন্য
  const revenueData = [
    { name: 'Jan', value: 400 }, { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 }, { name: 'Apr', value: 800 },
    { name: 'May', value: 500 }, { name: 'Jun', value: 900 },
  ];
  const occupancyData = [
    { name: 'Occupied', value: 78 }, { name: 'Available', value: 22 }
  ];
  const COLORS = ['#0f766e', '#ccfbf1']; // Teal 700 & Teal 100

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-6">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Chain Administration & Data Hub</h1>
          <p className="text-xs font-bold text-gray-500 mt-1">Enterprise Overview & Live Analytics</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-xs font-bold shadow-sm">Detailed User Reports</button>
          <button className="bg-teal-800 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-sm hover:bg-teal-900 transition">Export Data</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        
        {/* Occupancy Rate (Donut Chart) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center relative">
          <h3 className="text-sm font-black text-gray-800 absolute top-6 left-6">Occupancy Rate</h3>
          <div className="w-full h-48 mt-8">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={occupancyData} innerRadius={60} outerRadius={80} dataKey="value" stroke="none">
                  {occupancyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="absolute inset-0 flex items-center justify-center pt-8 pointer-events-none">
            <span className="text-3xl font-black text-gray-800">78%</span>
          </div>
          <div className="flex justify-between w-full mt-2 px-4 text-[10px] font-bold text-gray-500 uppercase">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-teal-700"></span> Occupied (78%)</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-teal-100"></span> Available (22%)</span>
          </div>
        </div>

        {/* Revenue Trend (Line Chart) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-black text-gray-800">Revenue Trend (YTD)</h3>
            <span className="bg-green-100 text-green-800 text-[10px] font-black uppercase px-3 py-1 rounded-full border border-green-200 flex items-center gap-1">
              📈 Predictive Analytics
            </span>
          </div>
          <div className="w-full h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af', fontWeight: 'bold' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af', fontWeight: 'bold' }} dx={-10} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Line type="monotone" dataKey="value" stroke="#0f766e" strokeWidth={4} dot={{ r: 4, fill: '#0f766e', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Grid: Room Availability & Status Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Status Actions */}
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 h-full">
            <h3 className="text-sm font-black text-gray-800 mb-4">Status & Actions</h3>
            <div className="space-y-3">
              <button onClick={() => setCurrentPage('frontdesk')} className="w-full bg-teal-800 text-white py-3 rounded-xl text-xs font-bold hover:bg-teal-900 transition shadow-sm text-left px-4 flex justify-between">
                <span>New Reservations</span> <span className="bg-white/20 px-2 rounded">12</span>
              </button>
              <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl text-xs font-bold hover:bg-gray-200 transition shadow-sm text-left px-4">
                Block Rooms
              </button>
              <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl text-xs font-bold hover:bg-gray-200 transition shadow-sm text-left px-4">
                User Accounts Management
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Inventory Matrix */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-3 overflow-x-auto">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-sm font-black text-gray-800">Detailed Inventory Matrix</h3>
            <select className="border border-gray-200 rounded-lg px-2 py-1 text-xs font-bold text-gray-600 outline-none">
              <option>This Week</option>
              <option>Next Week</option>
            </select>
          </div>
          
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] font-black text-gray-400 uppercase tracking-wider border-b border-gray-100">
                <th className="py-3 pr-4">Room No.</th>
                <th className="py-3 px-2">Type</th>
                <th className="py-3 px-2 text-center">Mo</th>
                <th className="py-3 px-2 text-center">Tu</th>
                <th className="py-3 px-2 text-center">We</th>
                <th className="py-3 px-2 text-center">Th</th>
                <th className="py-3 px-2 text-center">Fr</th>
              </tr>
            </thead>
            <tbody className="text-xs font-bold text-gray-700">
              {[
                { no: '101', type: 'King Suite', days: ['bg-red-100 text-red-700', 'bg-red-100 text-red-700', 'bg-green-100 text-green-700', 'bg-green-100 text-green-700', 'bg-yellow-100 text-yellow-700'] },
                { no: '102', type: 'Double Room', days: ['bg-green-100 text-green-700', 'bg-green-100 text-green-700', 'bg-green-100 text-green-700', 'bg-red-100 text-red-700', 'bg-red-100 text-red-700'] },
                { no: '103', type: 'Double Room', days: ['bg-yellow-100 text-yellow-700', 'bg-green-100 text-green-700', 'bg-green-100 text-green-700', 'bg-green-100 text-green-700', 'bg-green-100 text-green-700'] },
              ].map((row, idx) => (
                <tr key={idx} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                  <td className="py-3 pr-4">{row.no}</td>
                  <td className="py-3 px-2 text-gray-500">{row.type}</td>
                  {row.days.map((statusClass, dIdx) => (
                    <td key={dIdx} className="py-3 px-2 text-center">
                      <div className={`w-6 h-6 mx-auto rounded flex items-center justify-center ${statusClass}`}>•</div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;