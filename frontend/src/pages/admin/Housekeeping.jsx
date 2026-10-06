import React, { useState } from 'react';

function Housekeeping() {
  const [filter, setFilter] = useState('All');

  const tasks = [
    { room: '101', status: 'Dirty', housekeeper: 'Maria S.', priority: 'High', maintenance: '-' },
    { room: '102', status: 'Clean', housekeeper: 'John D.', priority: 'Low', maintenance: '-' },
    { room: '105', status: 'Maintenance', housekeeper: 'Unassigned', priority: 'Urgent', maintenance: 'AC Leaking' },
    { room: '204', status: 'Dirty', housekeeper: 'Sarah K.', priority: 'Medium', maintenance: '-' },
    { room: '301', status: 'Cleaning', housekeeper: 'David M.', priority: 'High', maintenance: '-' },
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Housekeeping & Maintenance</h1>
          <p className="text-xs font-bold text-gray-500 mt-1">Live Staff Tracking & Task Priority</p>
        </div>
        <button className="bg-teal-800 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-teal-900 transition flex items-center gap-2">
          <span>+</span> Assign New Task
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Main Task List */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-3">
          <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-100">
            <h3 className="text-sm font-black text-gray-800">Room Status Matrix</h3>
            <div className="flex gap-2">
              <select className="border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-bold text-gray-600 outline-none">
                <option>Sort by: Priority</option>
                <option>Sort by: Room No</option>
              </select>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[10px] font-black text-gray-400 uppercase tracking-wider border-b border-gray-100">
                  <th className="py-3 px-2">Room No.</th>
                  <th className="py-3 px-2">Status</th>
                  <th className="py-3 px-2">Housekeeper Assigned</th>
                  <th className="py-3 px-2">Maintenance Notes</th>
                  <th className="py-3 px-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-xs font-bold text-gray-800">
                {tasks.map((task, idx) => (
                  <tr key={idx} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition">
                    <td className="py-4 px-2">{task.room}</td>
                    <td className="py-4 px-2">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border 
                        ${task.status === 'Clean' ? 'bg-green-50 text-green-700 border-green-200' : 
                          task.status === 'Dirty' ? 'bg-red-50 text-red-700 border-red-200' : 
                          task.status === 'Cleaning' ? 'bg-blue-50 text-blue-700 border-blue-200' : 
                          'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>
                        {task.status}
                      </span>
                    </td>
                    <td className="py-4 px-2 text-gray-600 flex items-center gap-2">
                      {task.housekeeper !== 'Unassigned' && <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px]">{task.housekeeper.charAt(0)}</div>}
                      {task.housekeeper}
                    </td>
                    <td className="py-4 px-2 text-gray-500">{task.maintenance}</td>
                    <td className="py-4 px-2 text-right">
                      <button className="text-teal-600 hover:text-teal-800 font-bold px-2 py-1 bg-teal-50 rounded border border-teal-100">Update</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Sidebar: Priority Tasks */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-black text-gray-800 mb-4 pb-2 border-b border-gray-100">Priority Tasks ⚠️</h3>
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-100 p-3 rounded-xl">
                <div className="flex justify-between items-start">
                  <h4 className="text-xs font-black text-red-800">Room 105</h4>
                  <span className="text-[9px] bg-red-200 text-red-800 px-2 py-0.5 rounded font-bold uppercase">Urgent</span>
                </div>
                <p className="text-[10px] font-bold text-red-600 mt-1">AC Leaking - Maintenance Required</p>
              </div>
              <div className="bg-orange-50 border border-orange-100 p-3 rounded-xl">
                <div className="flex justify-between items-start">
                  <h4 className="text-xs font-black text-orange-800">Room 101</h4>
                  <span className="text-[9px] bg-orange-200 text-orange-800 px-2 py-0.5 rounded font-bold uppercase">High</span>
                </div>
                <p className="text-[10px] font-bold text-orange-600 mt-1">VIP Check-in at 2 PM. Cleaning pending.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Housekeeping;