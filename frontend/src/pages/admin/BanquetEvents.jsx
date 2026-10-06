import React from 'react';

function BanquetEvents() {
  const events = [
    { name: 'Smith Wedding Reception', hall: 'Grand Ballroom', date: 'Oct 15, 2026', time: '6:00 PM - 11:00 PM', status: 'Confirmed', attendees: 350 },
    { name: 'Tech Innovators Conference', hall: 'Crystal Hall A', date: 'Oct 18, 2026', time: '9:00 AM - 5:00 PM', status: 'Preparation', attendees: 120 },
    { name: 'Annual Corporate Gala', hall: 'Grand Ballroom', date: 'Oct 25, 2026', time: '7:00 PM - 12:00 AM', status: 'Pending Payment', attendees: 400 },
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Banquet & Event Reservations</h1>
          <p className="text-xs font-bold text-gray-500 mt-1">Manage Conference Halls & Event Spaces</p>
        </div>
        <button className="bg-teal-800 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-teal-900 transition">
          + Book New Event
        </button>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-sm font-black text-gray-800 mb-5 border-b border-gray-100 pb-3">Upcoming Events List</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] font-black text-gray-400 uppercase tracking-wider border-b border-gray-100">
                <th className="py-3 px-2">Event Name</th>
                <th className="py-3 px-2">Assigned Hall</th>
                <th className="py-3 px-2">Date & Time</th>
                <th className="py-3 px-2 text-center">Attendees</th>
                <th className="py-3 px-2">Status</th>
                <th className="py-3 px-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-xs font-bold text-gray-800">
              {events.map((event, idx) => (
                <tr key={idx} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition">
                  <td className="py-4 px-2 text-sm">{event.name}</td>
                  <td className="py-4 px-2 text-teal-700">{event.hall}</td>
                  <td className="py-4 px-2 text-gray-500">
                    <div>{event.date}</div>
                    <div className="text-[10px] mt-0.5">{event.time}</div>
                  </td>
                  <td className="py-4 px-2 text-center text-gray-500">{event.attendees}</td>
                  <td className="py-4 px-2">
                    <span className={`px-2 py-1 rounded text-[10px] font-black uppercase ${
                      event.status === 'Confirmed' ? 'bg-green-50 text-green-700' :
                      event.status === 'Preparation' ? 'bg-blue-50 text-blue-700' : 'bg-yellow-50 text-yellow-700'
                    }`}>
                      {event.status}
                    </span>
                  </td>
                  <td className="py-4 px-2 text-right">
                    <button className="text-teal-600 hover:text-teal-800 font-bold px-3 py-1.5 bg-teal-50 rounded-lg border border-teal-100">View Details</button>
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

export default BanquetEvents;