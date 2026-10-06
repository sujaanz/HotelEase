import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

function AdvancedAnalytics() {
  const revParData = [
    { month: 'Jan', lastYear: 60, thisYear: 75 }, { month: 'Feb', lastYear: 65, thisYear: 82 },
    { month: 'Mar', lastYear: 80, thisYear: 95 }, { month: 'Apr', lastYear: 75, thisYear: 110 },
    { month: 'May', lastYear: 90, thisYear: 125 }, { month: 'Jun', lastYear: 105, thisYear: 140 },
  ];

  const segmentData = [
    { name: 'Corporate', value: 45 }, { name: 'Direct Booking', value: 30 },
    { name: 'OTA', value: 15 }, { name: 'Walk-in', value: 10 }
  ];
  const COLORS = ['#0f766e', '#14b8a6', '#99f6e4', '#ccfbf1'];

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-6">
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Advanced Analytics & Reports</h1>
          <p className="text-xs font-bold text-gray-500 mt-1">Deep Dive into RevPAR & Market Segmentation</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-xs font-bold shadow-sm">Last 6 Months</button>
          <button className="bg-teal-800 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-sm hover:bg-teal-900 transition">Export PDF</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* RevPAR Year-over-Year (Area Chart) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2">
          <h3 className="text-sm font-black text-gray-800 mb-6">RevPAR Performance (Year-over-Year)</h3>
          <div className="w-full h-72">
            <ResponsiveContainer height="100%" width="100%">
              <AreaChart data={revParData}>
                <defs>
                  <linearGradient id="colorThisYear" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0f766e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0f766e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 'bold' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 'bold' }} tickFormatter={(value) => `$${value}`} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="lastYear" name="2025" stroke="#9ca3af" strokeDasharray="5 5" strokeWidth={2} fill="none" />
                <Area type="monotone" dataKey="thisYear" name="2026" stroke="#0f766e" strokeWidth={3} fillOpacity={1} fill="url(#colorThisYear)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Market Segmentation (Donut Chart) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <h3 className="text-sm font-black text-gray-800 mb-2">Market Segmentation</h3>
          <div className="w-full flex-1 min-h-[200px]">
            <ResponsiveContainer height="100%" width="100%">
              <PieChart>
                <Pie data={segmentData} dataKey="value" innerRadius={60} outerRadius={90} paddingAngle={5}>
                  {segmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {segmentData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-[10px] font-bold text-gray-600">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx] }}></span>
                {item.name} ({item.value}%)
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default AdvancedAnalytics;