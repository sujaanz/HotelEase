import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function PromoCodes() {
  const trendData = [
    { month: 'Jan', redemptions: 120 }, { month: 'Feb', redemptions: 180 },
    { month: 'Mar', redemptions: 150 }, { month: 'Apr', redemptions: 280 },
    { month: 'May', redemptions: 220 }, { month: 'Jun', redemptions: 390 },
  ];

  const promos = [
    { name: 'Summer Getaway', code: 'SUMMER25', discount: '25%', usage: 145, status: 'Active', end: '2026-12-31' },
    { name: 'Welcome Bonus', code: 'WELCOME50', discount: '$50 Flat', usage: 320, status: 'Active', end: '2026-12-31' },
    { name: 'Flash Sale', code: 'FLASH40', discount: '40%', usage: 890, status: 'Expired', end: '2026-09-30' },
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-6">
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Promo Code & Coupon Management</h1>
          <p className="text-xs font-bold text-gray-500 mt-1">Track Campaign Performance & Discounts</p>
        </div>
        <button className="bg-teal-800 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-teal-900 transition flex items-center gap-2">
          <span>+</span> Create New Promo
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Active Promotions Table */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2">
          <h3 className="text-sm font-black text-gray-800 mb-5 border-b border-gray-100 pb-3">Active Promotions</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[10px] font-black text-gray-400 uppercase tracking-wider border-b border-gray-100">
                  <th className="py-3 px-2">Campaign Name</th>
                  <th className="py-3 px-2">Code</th>
                  <th className="py-3 px-2">Discount Value</th>
                  <th className="py-3 px-2 text-center">Usage Count</th>
                  <th className="py-3 px-2">Status</th>
                  <th className="py-3 px-2 text-right">Valid Until</th>
                </tr>
              </thead>
              <tbody className="text-xs font-bold text-gray-800">
                {promos.map((promo, idx) => (
                  <tr key={idx} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition">
                    <td className="py-4 px-2">{promo.name}</td>
                    <td className="py-4 px-2"><span className="bg-gray-100 px-2 py-1 rounded tracking-widest font-black text-gray-600">{promo.code}</span></td>
                    <td className="py-4 px-2 text-teal-700">{promo.discount}</td>
                    <td className="py-4 px-2 text-center">{promo.usage}</td>
                    <td className="py-4 px-2">
                      <span className={`px-2 py-1 rounded text-[10px] font-black uppercase ${promo.status === 'Active' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        {promo.status}
                      </span>
                    </td>
                    <td className="py-4 px-2 text-right text-gray-500">{promo.end}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Coupon Redemption Trends */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-black text-gray-800 mb-5 border-b border-gray-100 pb-3">Redemption Trends</h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af', fontWeight: 'bold' }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Line type="monotone" dataKey="redemptions" stroke="#0f766e" strokeWidth={3} dot={{ r: 4, fill: '#0f766e' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-center">
             <p className="text-2xl font-black text-gray-900">+45%</p>
             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Increase in last 30 days</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default PromoCodes;