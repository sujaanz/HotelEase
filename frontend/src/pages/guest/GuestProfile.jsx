import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GuestProfile() {
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // ব্যাকএন্ড থেকে বুকিং ডেটা নিয়ে আসা
  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/bookings')
      .then(response => {
        // আপাতত আমরা ধরে নিচ্ছি সর্বশেষ বুকিংগুলো এই ইউজারের (যেহেতু লগিন সিস্টেম এখনো সিমুলেটেড)
        setMyBookings(response.data.reverse());
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching guest bookings:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-[1000px] mx-auto px-4 py-8">
      
      {/* Profile Header */}
      <div className="bg-teal-900 text-white rounded-3xl p-8 mb-8 shadow-md flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-800 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2"></div>
        <div className="w-24 h-24 bg-white rounded-full p-1 relative z-10 shadow-lg">
          <img src="https://ui-avatars.com/api/?name=Guest+User&background=0f766e&color=fff" alt="Profile" className="w-full h-full rounded-full object-cover" />
        </div>
        <div className="text-center md:text-left relative z-10">
          <h1 className="text-3xl font-black tracking-tight">Welcome back, Guest!</h1>
          <p className="text-teal-200 text-sm font-bold mt-1">guest@example.com | +880 1234 567890</p>
          <div className="mt-3 flex flex-wrap gap-2 justify-center md:justify-start">
            <span className="bg-teal-800 border border-teal-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-teal-100">Gold Member</span>
            <span className="bg-teal-800 border border-teal-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-teal-100">1,250 Points</span>
          </div>
        </div>
      </div>

      {/* Active Bookings Section */}
      <h2 className="text-xl font-black text-gray-900 mb-5">My Recent Bookings</h2>
      
      <div className="space-y-4">
        {loading ? (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center text-gray-500 font-bold text-sm">
            Loading your bookings...
          </div>
        ) : myBookings.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
            <span className="text-4xl mb-3 block">🧳</span>
            <h3 className="text-lg font-black text-gray-800">No bookings yet</h3>
            <p className="text-xs font-bold text-gray-500 mt-1">Ready for your next adventure?</p>
          </div>
        ) : (
          myBookings.map((booking, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6 hover:shadow-md transition">
              <div className="flex gap-4 items-center w-full md:w-auto">
                <div className="w-16 h-16 bg-teal-50 text-teal-700 rounded-xl flex flex-col items-center justify-center border border-teal-100 flex-shrink-0">
                  <span className="text-[10px] font-black uppercase">{new Date(booking.check_in).toLocaleString('default', { month: 'short' })}</span>
                  <span className="text-xl font-black">{new Date(booking.check_in).getDate()}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-black text-gray-900">Room {booking.room_number || 'TBD'}</h3>
                    <span className="bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider">
                      {booking.status}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-gray-500">Booking ID: BKG-{booking.id}</p>
                  <p className="text-xs font-bold text-gray-500">Total: ${booking.total_amount.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="flex gap-3 w-full md:w-auto">
                <button className="flex-1 md:flex-none bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-5 py-2.5 rounded-xl text-xs font-bold shadow-sm transition">
                  Cancel
                </button>
                <button className="flex-1 md:flex-none bg-teal-800 hover:bg-teal-900 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-sm transition">
                  Download Invoice
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}

export default GuestProfile;