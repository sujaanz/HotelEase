import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FrontDesk() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // ফ্লাস্ক ব্যাকএন্ড থেকে সমস্ত বুকিংয়ের ডেটা নিয়ে আসা
  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/bookings')
      .then(response => {
        // নতুন বুকিংগুলো যেন সবার উপরে থাকে তাই রিভার্স করে দেওয়া হলো
        setBookings(response.data.reverse()); 
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching bookings:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-6">
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Front Desk Operations</h1>
          <p className="text-xs font-bold text-gray-500 mt-1">Live Check-in & Guest Management</p>
        </div>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-teal-50 text-teal-700 px-4 py-2 rounded-lg text-xs font-bold border border-teal-200 hover:bg-teal-100 transition shadow-sm"
        >
          🔄 Refresh Bookings
        </button>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center border-l-4 border-l-teal-600">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Bookings</p>
            <h2 className="text-3xl font-black text-gray-900 mt-1">{bookings.length}</h2>
          </div>
          <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center text-teal-600 text-xl">🛬</div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center border-l-4 border-l-yellow-500">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Pending Check-ins</p>
            <h2 className="text-3xl font-black text-gray-900 mt-1">{bookings.filter(b => b.status === 'Confirmed').length}</h2>
          </div>
          <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center text-yellow-600 text-xl">🕒</div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center border-l-4 border-l-blue-500">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Revenue</p>
            <h2 className="text-3xl font-black text-gray-900 mt-1">
               ${bookings.reduce((sum, booking) => sum + booking.total_amount, 0).toFixed(2)}
            </h2>
          </div>
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 text-xl">💰</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Quick Check-in Panel */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
          <h3 className="text-sm font-black text-gray-800 mb-5 border-b border-gray-100 pb-3">Quick Check-in</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Booking ID</label>
              <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-600 outline-none text-sm font-bold text-gray-900" placeholder="e.g. 1, 2, 3..." />
            </div>
            <button className="w-full bg-teal-800 text-white font-black py-4 rounded-xl hover:bg-teal-900 transition shadow-md flex items-center justify-center gap-2">
              <span>📷</span> Scan ID / Passport
            </button>
            <button className="w-full bg-gray-100 text-teal-800 font-black py-3 rounded-xl hover:bg-gray-200 transition shadow-sm border border-gray-200">
              Manual Check-in
            </button>
          </div>
        </div>

        {/* Live Bookings List */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2">
          <div className="flex justify-between items-center mb-5 border-b border-gray-100 pb-3">
            <h3 className="text-sm font-black text-gray-800">Live Booking Activity</h3>
            <input type="text" placeholder="Search Guest..." className="border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-bold outline-none focus:border-teal-500" />
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[10px] font-black text-gray-400 uppercase tracking-wider border-b border-gray-100">
                  <th className="py-3 px-2">Guest Name</th>
                  <th className="py-3 px-2">Booking ID</th>
                  <th className="py-3 px-2">Room No.</th>
                  <th className="py-3 px-2">Total Amount</th>
                  <th className="py-3 px-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-xs font-bold text-gray-800">
                
                {loading ? (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-gray-400">Loading bookings from database...</td>
                  </tr>
                ) : bookings.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-gray-400">No bookings found. Make a booking from the Guest View!</td>
                  </tr>
                ) : (
                  bookings.map((booking, idx) => (
                    <tr key={idx} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition">
                      <td className="py-4 px-2 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-[10px] font-black">
                          {booking.guest_name ? booking.guest_name.charAt(0).toUpperCase() : 'G'}
                        </div>
                        <div>
                           <p>{booking.guest_name}</p>
                           <p className="text-[9px] text-gray-400 font-medium">{booking.guest_email}</p>
                        </div>
                      </td>
                      <td className="py-4 px-2 text-gray-500">BKG-{booking.id}</td>
                      <td className="py-4 px-2 text-gray-500">Room {booking.room_number || 'N/A'}</td>
                      <td className="py-4 px-2 text-teal-700">${booking.total_amount.toFixed(2)}</td>
                      <td className="py-4 px-2 text-right">
                        <button className="bg-teal-50 border border-teal-200 text-teal-700 px-4 py-1.5 rounded-lg hover:bg-teal-100 transition">Check-in</button>
                      </td>
                    </tr>
                  ))
                )}
                
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

export default FrontDesk;