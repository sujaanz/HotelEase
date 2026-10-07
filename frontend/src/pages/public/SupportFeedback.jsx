import React, { useState } from 'react';

function SupportFeedback() {
  const [ticketTopic, setTicketTopic] = useState('Booking Issue');
  const [ticketMessage, setTicketMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ticketMessage.trim()) {
      alert(`Ticket submitted successfully for: ${ticketTopic}`);
      setTicketMessage('');
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#070707] text-stone-200 font-sans selection:bg-teal-500 selection:text-white px-4 md:px-10 py-12 flex flex-col items-center relative overflow-hidden">
      
      {/* Ambient Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-[1200px] relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[9px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 shadow-inner">
            Support Center
          </span>
          <h1 className="text-3xl md:text-5xl font-light text-white tracking-tight mb-4">
            Client Support <span className="font-bold text-teal-400">&</span> Feedback
          </h1>
          <p className="text-xs font-medium text-stone-400 uppercase tracking-widest">
            How can we help you today? Submit a ticket, review, or chat live.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 1. Submit Ticket / Review Form */}
          <div className="bg-gradient-to-br from-white/[0.07] via-white/[0.03] to-transparent backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-[0_25px_50px_rgba(0,0,0,0.5)] flex flex-col">
            <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-teal-400">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
              </div>
              <h2 className="text-lg font-light text-white tracking-wide">Submit Request</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5 flex-1 flex flex-col">
              <div>
                <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Category Topic</label>
                <div className="relative">
                  <select 
                    value={ticketTopic}
                    onChange={(e) => setTicketTopic(e.target.value)}
                    className="w-full px-5 py-3.5 rounded-xl bg-[#121212]/80 border border-white/10 text-white focus:ring-2 focus:ring-teal-500/50 outline-none text-xs font-medium appearance-none cursor-pointer transition-all"
                  >
                    <option className="bg-[#121212]">Booking Issue</option>
                    <option className="bg-[#121212]">Leave a Review</option>
                    <option className="bg-[#121212]">Billing Question</option>
                    <option className="bg-[#121212]">Other</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex flex-col">
                <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Message Details</label>
                <textarea 
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                  rows="5" 
                  required
                  className="w-full flex-1 px-5 py-4 rounded-xl bg-[#121212]/80 border border-white/10 text-white placeholder-stone-600 focus:ring-2 focus:ring-teal-500/50 outline-none text-xs font-medium resize-none transition-all shadow-inner" 
                  placeholder="Explain your issue or share your experience in detail..."
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-500 text-white text-[10px] font-black uppercase tracking-widest py-4 rounded-xl shadow-[0_0_20px_rgba(20,184,166,0.2)] hover:shadow-[0_0_30px_rgba(20,184,166,0.4)] transition-all duration-300 mt-2"
              >
                Submit Ticket
              </button>
            </form>
          </div>

          {/* 2. Recent Tickets List */}
          <div className="bg-gradient-to-br from-white/[0.07] via-white/[0.03] to-transparent backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-[0_25px_50px_rgba(0,0,0,0.5)]">
            <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-teal-400">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              </div>
              <h2 className="text-lg font-light text-white tracking-wide">Recent Tickets</h2>
            </div>
            
            <div className="space-y-4">
              {[
                { id: '#TK-8021', issue: 'Payment failed during checkout', status: 'Open', color: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400' },
                { id: '#TK-8015', issue: 'Request for early check-in', status: 'Resolved', color: 'bg-teal-500/10 border-teal-500/30 text-teal-400' },
                { id: '#TK-7992', issue: 'Room AC not cooling properly', status: 'Closed', color: 'bg-white/5 border-white/10 text-stone-400' }
              ].map((ticket, idx) => (
                <div key={idx} className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 hover:bg-white/[0.06] hover:border-white/10 transition-all cursor-pointer group">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">{ticket.id}</span>
                    <span className={`text-[8px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border ${ticket.color}`}>
                      {ticket.status}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-stone-300 group-hover:text-white transition-colors">{ticket.issue}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Contact Info & Live Chat UI */}
          <div className="space-y-6 flex flex-col">
            
            {/* Contact Info */}
            <div className="bg-gradient-to-br from-teal-900/40 to-teal-950/40 backdrop-blur-xl border border-teal-500/20 p-8 rounded-3xl shadow-lg">
              <div className="flex items-center gap-3 mb-6 border-b border-teal-500/20 pb-4">
                <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                </div>
                <h2 className="text-lg font-light text-white tracking-wide">Direct Support</h2>
              </div>
              
              <div className="space-y-5">
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 bg-black/40 border border-teal-500/20 rounded-xl flex items-center justify-center text-teal-400 group-hover:bg-teal-500/20 transition-colors">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-teal-500 uppercase tracking-widest mb-0.5">Phone (24/7)</p>
                    <p className="text-sm font-light text-white tracking-wide">+880 1234 567890</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 bg-black/40 border border-teal-500/20 rounded-xl flex items-center justify-center text-teal-400 group-hover:bg-teal-500/20 transition-colors">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-teal-500 uppercase tracking-widest mb-0.5">Email Support</p>
                    <p className="text-sm font-light text-white tracking-wide">support@hotelease.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Chat Widget UI */}
            <div className="bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 rounded-3xl overflow-hidden flex flex-col h-[300px] shadow-2xl backdrop-blur-md">
              <div className="bg-white/5 border-b border-white/10 px-5 py-4 flex justify-between items-center backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500"></span>
                  </span>
                  <span className="text-[10px] font-bold text-white uppercase tracking-widest">Live Agent</span>
                </div>
                <button className="text-stone-500 hover:text-white transition-colors">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"/></svg>
                </button>
              </div>
              
              <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-4">
                <div className="bg-teal-900/40 border border-teal-500/20 text-stone-200 p-4 rounded-2xl rounded-tl-sm w-[85%] text-xs font-medium leading-relaxed shadow-sm">
                  Hello! How can I assist you with your booking today?
                </div>
              </div>
              
              <div className="p-4 bg-white/5 border-t border-white/10 flex items-center gap-3 backdrop-blur-xl">
                <input 
                  type="text" 
                  placeholder="Type a message..." 
                  className="flex-1 bg-[#121212]/80 border border-white/10 text-white px-4 py-3 rounded-xl text-xs outline-none focus:border-teal-500/50 font-medium placeholder-stone-600 transition-colors" 
                />
                <button className="bg-teal-600 hover:bg-teal-500 text-white w-10 h-10 rounded-xl flex items-center justify-center transition-all shadow-[0_0_15px_rgba(20,184,166,0.2)]">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default SupportFeedback;