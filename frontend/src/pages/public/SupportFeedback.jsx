import React from 'react';

function SupportFeedback() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Client Support & Feedback Hub</h1>
        <p className="text-sm font-bold text-gray-500">How can we help you today? Submit a ticket, leave a review, or chat with our live agents.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Submit Review / Form */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-black text-gray-800 mb-5 border-b border-gray-100 pb-3">Submit a Ticket / Review</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Topic</label>
              <select className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-600 outline-none text-sm font-bold text-gray-700">
                <option>Booking Issue</option>
                <option>Leave a Review</option>
                <option>Billing Question</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Message</label>
              <textarea rows="4" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-600 outline-none text-sm font-medium text-gray-900 resize-none" placeholder="Explain your issue or share your experience..."></textarea>
            </div>
            <button className="w-full bg-teal-800 text-white font-black py-3.5 rounded-xl hover:bg-teal-900 transition shadow-md">
              Submit Request
            </button>
          </div>
        </div>

        {/* Recent Tickets & Feedback */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-black text-gray-800 mb-5 border-b border-gray-100 pb-3">Recent Tickets</h2>
          <div className="space-y-3">
            {[
              { id: '#TK-8021', issue: 'Payment failed during checkout', status: 'Open', color: 'bg-yellow-50 text-yellow-700' },
              { id: '#TK-8015', issue: 'Request for early check-in', status: 'Resolved', color: 'bg-green-50 text-green-700' },
              { id: '#TK-7992', issue: 'Room AC not cooling', status: 'Closed', color: 'bg-gray-100 text-gray-600' }
            ].map((ticket, idx) => (
              <div key={idx} className="border border-gray-100 rounded-xl p-4 hover:shadow-sm transition cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">{ticket.id}</span>
                  <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${ticket.color}`}>{ticket.status}</span>
                </div>
                <p className="text-sm font-bold text-gray-800">{ticket.issue}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info & Live Chat Mockup */}
        <div className="space-y-6">
          <div className="bg-teal-900 text-white p-6 rounded-2xl shadow-md">
            <h2 className="text-lg font-black mb-4 border-b border-teal-700 pb-3">Contact Us Directly</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-teal-800 rounded-full flex items-center justify-center text-xl">📞</div>
                <div>
                  <p className="text-[10px] font-bold text-teal-300 uppercase tracking-wider">Phone Support (24/7)</p>
                  <p className="text-sm font-bold">+880 1234 567890</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-teal-800 rounded-full flex items-center justify-center text-xl">✉️</div>
                <div>
                  <p className="text-[10px] font-bold text-teal-300 uppercase tracking-wider">Email Us</p>
                  <p className="text-sm font-bold">support@hotelease.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Live Chat Widget UI */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden flex flex-col h-64">
            <div className="bg-teal-800 text-white px-4 py-3 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-xs font-bold">Live Chat Support</span>
              </div>
              <button className="text-teal-200 hover:text-white">_</button>
            </div>
            <div className="flex-1 bg-gray-50 p-4 overflow-y-auto flex flex-col gap-3">
              <div className="bg-teal-100 text-teal-900 p-2 rounded-xl rounded-tl-none w-3/4 text-xs font-medium shadow-sm">
                Hello! How can I assist you with your booking today?
              </div>
            </div>
            <div className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
              <input type="text" placeholder="Type a message..." className="flex-1 bg-gray-100 px-3 py-2 rounded-lg text-xs outline-none focus:ring-1 focus:ring-teal-500" />
              <button className="text-teal-700 hover:text-teal-900">➤</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default SupportFeedback;