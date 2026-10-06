import React from 'react';

function StaffRostering() {
  const staffList = [
    { name: 'Michael T.', role: 'Front Desk', shifts: ['Morning', 'Morning', 'Off', 'Evening', 'Evening', 'Night', 'Night'] },
    { name: 'Sarah K.', role: 'Manager', shifts: ['Day', 'Day', 'Day', 'Day', 'Day', 'Off', 'Off'] },
    { name: 'David M.', role: 'Housekeeping', shifts: ['Evening', 'Night', 'Night', 'Off', 'Morning', 'Morning', 'Morning'] },
  ];

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const getShiftStyle = (shift) => {
    switch(shift) {
      case 'Morning': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Day': return 'bg-teal-50 text-teal-700 border-teal-200';
      case 'Evening': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Night': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Off': return 'bg-gray-100 text-gray-400 border-gray-200 line-through';
      default: return 'bg-white';
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Staff Rostering</h1>
          <p className="text-xs font-bold text-gray-500 mt-1">Weekly Shift Management & Timetable</p>
        </div>
        <button className="bg-teal-800 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-teal-900 transition">
          Publish Roster
        </button>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="text-[10px] font-black text-gray-400 uppercase tracking-wider border-b border-gray-100">
              <th className="py-3 px-4 w-48">Staff Member</th>
              {days.map(day => <th key={day} className="py-3 px-2 text-center">{day}</th>)}
            </tr>
          </thead>
          <tbody className="text-sm font-bold text-gray-800">
            {staffList.map((staff, idx) => (
              <tr key={idx} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                <td className="py-4 px-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs">{staff.name.charAt(0)}</div>
                  <div>
                    <p>{staff.name}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">{staff.role}</p>
                  </div>
                </td>
                {staff.shifts.map((shift, sIdx) => (
                  <td key={sIdx} className="py-4 px-2 text-center">
                    <div className={`text-[10px] font-black uppercase px-2 py-1.5 rounded border ${getShiftStyle(shift)}`}>
                      {shift}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StaffRostering;