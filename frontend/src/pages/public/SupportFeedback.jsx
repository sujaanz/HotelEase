import React, { useState } from 'react';

function SupportFeedback({ setCurrentPage }) {
  const [ticketTopic, setTicketTopic] = useState('Booking Issue');
  const [ticketMessage, setTicketMessage] = useState('');
  const [ticketPriority, setTicketPriority] = useState('Standard');
  
  // Dynamic Tickets State
  const [tickets, setTickets] = useState([
    { id: '#TK-8021', issue: 'Payment failed during checkout', status: 'Open', priority: 'High', color: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400' },
    { id: '#TK-8015', issue: 'Request for early check-in', status: 'Resolved', priority: 'Standard', color: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' },
    { id: '#TK-7992', issue: 'Room AC not cooling properly', status: 'Closed', priority: 'Critical', color: 'bg-white/5 border-white/10 text-stone-400' }
  ]);

  // Ticket Tracker State
  const [searchId, setSearchId] = useState('');
  const [trackedResult, setTrackedResult] = useState(null);

  // AI Diagnostic State
  const [diagnosticStatus, setDiagnosticStatus] = useState('Idle (Systems Ready)');
  const [isScanning, setIsScanning] = useState(false);

  // CSAT Rating State
  const [csatRating, setCsatRating] = useState(5);
  const [csatSubmitted, setCsatSubmitted] = useState(false);

  // Interactive Live Chat State
  const [chatMessages, setChatMessages] = useState([
    { sender: 'agent', text: 'Hello! How can I assist you with your cyber-luxury reservation today?' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!ticketMessage.trim()) return;

    const newTicketId = `#TK-${Math.floor(1000 + Math.random() * 9000)}`;
    const newTicket = {
      id: newTicketId,
      issue: ticketMessage,
      status: 'Open',
      priority: ticketPriority,
      color: ticketPriority === 'Critical' ? 'bg-red-500/10 border-red-500/30 text-red-400' : ticketPriority === 'High' ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400' : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
    };

    setTickets([newTicket, ...tickets]);
    setTicketMessage('');
    alert(`Support ticket successfully dispatched! ID: ${newTicketId}`);
  };

  const handleTrackTicket = (e) => {
    e.preventDefault();
    if (!searchId.trim()) return;
    const found = tickets.find(t => t.id.toLowerCase() === searchId.trim().toLowerCase());
    setTrackedResult(found || { notFound: true });
  };

  const runAiDiagnostic = () => {
    setIsScanning(true);
    setDiagnosticStatus('Scanning API Gateways & IoT Nodes...');
    setTimeout(() => {
      setDiagnosticStatus('All Systems Nominal. Zero Latency Detected.');
      setIsScanning(false);
    }, 1500);
  };

  const handleSendMessage = (textToSend) => {
    const msg = textToSend || chatInput;
    if (!msg.trim()) return;

    setChatMessages(prev => [...prev, { sender: 'user', text: msg }]);
    if (!textToSend) setChatInput('');

    setTimeout(() => {
      setChatMessages(prev => [
        ...prev, 
        { sender: 'agent', text: 'Telemetry verified. Our autonomous support lead is processing your request.' }
      ]);
    }, 1000);
  };

  return (
    <div className="w-full min-h-[100vh] bg-[#030303] text-stone-200 font-sans selection:bg-cyan-500 selection:text-black px-4 md:px-10 py-10 relative overflow-hidden flex flex-col items-center">
      
      {/* Background Holographic Glows */}
      <div className="absolute top-[0%] left-[20%] w-[50%] h-[50%] bg-teal-500/10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[20%] w-[40%] h-[40%] bg-cyan-600/10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <div className="w-full max-w-[1400px] relative z-10 space-y-8">
        
        {/* Top Exit Navigation Bar */}
        <div className="flex justify-between items-center bg-[#060606] border border-white/5 p-4 rounded-2xl backdrop-blur-2xl shadow-lg">
          <button 
            type="button"
            onClick={() => setCurrentPage ? setCurrentPage('home') : window.location.href = '/'} 
            className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-stone-300 hover:bg-white/10 hover:text-cyan-400 text-[10px] font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2 cursor-pointer"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Exit Terminal (Dashboard)
          </button>
          <div className="text-right hidden sm:block">
            <p className="text-[9px] font-black text-cyan-400 uppercase tracking-widest">Support Node: Active Protocol</p>
          </div>
        </div>

        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-4">
          <span className="inline-block bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-3 shadow-inner">
            Support Command Center
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-3">
            Client Support <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">&</span> Feedback
          </h1>
          <p className="text-[10px] font-black text-stone-500 uppercase tracking-widest">
            Submit tickets, track quantum resolution, run diagnostics, or connect via live neural chat.
          </p>
        </div>

        {/* Top Feature Bar: AI Diagnostics & Ticket Tracker */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* AI Self-Service Diagnostic Tool */}
          <div className="bg-[#060606] border border-white/10 rounded-[2.5rem] p-6 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <div>
              <h3 className="text-xs font-black text-white uppercase tracking-widest mb-1">Autonomous AI Self-Diagnostic</h3>
              <p className="text-[10px] font-bold text-stone-500 mb-4">Run instant telemetry checks on room locks and booking ledger sync.</p>
              
              <div className="bg-[#0a0a0a] p-3.5 rounded-xl border border-white/5 font-mono text-[10px] text-cyan-400 mb-4 shadow-inner">
                Status: {diagnosticStatus}
              </div>
            </div>

            <button 
              type="button"
              disabled={isScanning}
              onClick={runAiDiagnostic}
              className="w-full py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-stone-300 hover:text-cyan-400 text-[9px] font-black uppercase tracking-widest rounded-xl transition cursor-pointer disabled:opacity-50"
            >
              {isScanning ? 'Executing Scan...' : 'Run Diagnostic Scan'}
            </button>
          </div>

          {/* Quick Ticket Tracker */}
          <div className="bg-[#060606] border border-white/10 rounded-[2.5rem] p-6 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <div>
              <h3 className="text-xs font-black text-white uppercase tracking-widest mb-1">Quantum Ticket Tracker</h3>
              <p className="text-[10px] font-bold text-stone-500 mb-4">Enter dispatch ID to check resolution progress.</p>
              
              <form onSubmit={handleTrackTicket} className="flex gap-2 mb-3">
                <input 
                  type="text" 
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  placeholder="e.g. #TK-8021" 
                  className="flex-1 bg-[#0a0a0a] border border-white/10 text-white px-4 py-3 rounded-xl text-xs outline-none focus:border-cyan-400 font-mono font-bold uppercase"
                />
                <button type="submit" className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black text-[9px] font-black uppercase tracking-widest rounded-xl transition cursor-pointer">
                  Search
                </button>
              </form>

              {trackedResult && (
                <div className="bg-[#0a0a0a] p-3.5 rounded-xl border border-white/5 text-xs">
                  {trackedResult.notFound ? (
                    <span className="text-red-400 font-bold">Ticket ID not found in matrix ledger.</span>
                  ) : (
                    <div className="flex justify-between items-center text-stone-300 font-bold">
                      <span className="truncate pr-2">{trackedResult.id}: {trackedResult.issue}</span>
                      <span className="text-cyan-400 font-mono uppercase text-[9px] flex-shrink-0">{trackedResult.status}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Main 3-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 1. Submit Ticket / Request Form */}
          <div className="bg-[#060606] backdrop-blur-2xl rounded-[2.5rem] border border-white/10 p-8 shadow-[0_30px_60px_rgba(0,0,0,0.8)] flex flex-col">
            <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
              <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 shadow-inner">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
              </div>
              <h2 className="text-base font-bold text-white tracking-wide">Submit Request</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4 flex-1 flex flex-col">
              <div>
                <label className="block text-[9px] font-black text-stone-500 uppercase tracking-widest mb-1.5">Category Topic</label>
                <div className="relative">
                  <select 
                    value={ticketTopic}
                    onChange={(e) => setTicketTopic(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-[#0a0a0a] border border-white/10 text-white focus:border-cyan-400 outline-none text-xs font-bold appearance-none cursor-pointer transition-all shadow-inner"
                  >
                    <option className="bg-[#0a0a0a]">Booking Issue</option>
                    <option className="bg-[#0a0a0a]">Leave a Review</option>
                    <option className="bg-[#0a0a0a]">Billing Question</option>
                    <option className="bg-[#0a0a0a]">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-black text-stone-500 uppercase tracking-widest mb-1.5">Priority Level</label>
                <div className="flex gap-2">
                  {['Standard', 'High', 'Critical'].map((prio) => (
                    <button
                      key={prio}
                      type="button"
                      onClick={() => setTicketPriority(prio)}
                      className={`flex-1 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest border transition cursor-pointer ${ticketPriority === prio ? 'bg-cyan-500/20 border-cyan-400 text-cyan-400' : 'bg-[#0a0a0a] border-white/5 text-stone-500 hover:text-stone-300'}`}
                    >
                      {prio}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1 flex flex-col">
                <label className="block text-[9px] font-black text-stone-500 uppercase tracking-widest mb-1.5">Message Details</label>
                <textarea 
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                  rows="4" 
                  required
                  className="w-full flex-1 px-4 py-3 rounded-xl bg-[#0a0a0a] border border-white/10 text-white placeholder-stone-600 focus:border-cyan-400 outline-none text-xs font-medium resize-none transition-all shadow-inner" 
                  placeholder="Explain your issue in detail..."
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-teal-600 to-cyan-500 hover:from-teal-500 hover:to-cyan-400 text-black text-[10px] font-black uppercase tracking-[0.2em] py-4 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all mt-2 cursor-pointer"
              >
                Dispatch Ticket
              </button>
            </form>
          </div>

          {/* 2. Recent Tickets List */}
          <div className="bg-[#060606] backdrop-blur-2xl rounded-[2.5rem] border border-white/10 p-8 shadow-[0_30px_60px_rgba(0,0,0,0.8)] flex flex-col">
            <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
              <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 shadow-inner">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              </div>
              <h2 className="text-base font-bold text-white tracking-wide">Recent Tickets</h2>
            </div>
            
            <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
              {tickets.map((ticket, idx) => (
                <div key={idx} className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-4 hover:border-cyan-500/30 transition-all cursor-pointer group shadow-inner">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[9px] font-mono font-black text-cyan-400 tracking-widest">{ticket.id}</span>
                    <div className="flex gap-2">
                      <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded border bg-white/5 border-white/10 text-stone-400">
                        {ticket.priority || 'Standard'}
                      </span>
                      <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded border ${ticket.color}`}>
                        {ticket.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs font-bold text-stone-300 group-hover:text-white transition-colors">{ticket.issue}</p>
                </div>
              ))}
            </div>

            {/* CSAT Rating Feedback Matrix */}
            <div className="mt-6 pt-4 border-t border-white/5">
              <p className="text-[9px] font-black text-stone-500 uppercase tracking-widest mb-2">Post-Stay Experience CSAT</p>
              {!csatSubmitted ? (
                <div className="flex items-center justify-between bg-[#0a0a0a] px-4 py-2.5 rounded-xl border border-white/5">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setCsatRating(star)}
                        className={`w-6 h-6 rounded text-xs font-black transition cursor-pointer ${csatRating >= star ? 'bg-cyan-500 text-black' : 'bg-white/5 text-stone-500'}`}
                      >
                        {star}
                      </button>
                    ))}
                  </div>
                  <button 
                    type="button"
                    onClick={() => setCsatSubmitted(true)}
                    className="px-3 py-1.5 bg-white/10 hover:bg-cyan-400 hover:text-black text-white text-[9px] font-black uppercase tracking-widest rounded-lg transition cursor-pointer"
                  >
                    Rate
                  </button>
                </div>
              ) : (
                <div className="bg-cyan-500/10 border border-cyan-500/30 p-2.5 rounded-xl text-center text-xs font-bold text-cyan-400">
                  Rating Recorded ({csatRating}/5). Thank you!
                </div>
              )}
            </div>
          </div>

          {/* 3. Direct Support & Interactive Live Neural Chat */}
          <div className="space-y-6 flex flex-col">
            
            {/* Direct Support Info */}
            <div className="bg-[#060606] border border-white/10 p-6 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.8)]">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Direct Communication</h2>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center bg-[#0a0a0a] p-3.5 rounded-xl border border-white/5">
                  <span className="text-stone-500 font-bold uppercase text-[9px]">Hotline (24/7)</span>
                  <span className="font-mono font-bold text-white">+880 1234 567890</span>
                </div>
                <div className="flex justify-between items-center bg-[#0a0a0a] p-3.5 rounded-xl border border-white/5">
                  <span className="text-stone-500 font-bold uppercase text-[9px]">Secure Email</span>
                  <span className="font-bold text-cyan-400">support@hotelease.com</span>
                </div>
              </div>
            </div>

            {/* Live Neural Chat Widget UI with Prompt Chips */}
            <div className="bg-[#060606] border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col h-[320px] shadow-[0_30px_60px_rgba(0,0,0,0.8)]">
              <div className="bg-[#080808] border-b border-white/5 px-5 py-3.5 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                  </span>
                  <span className="text-[9px] font-black text-white uppercase tracking-widest">Live Neural Agent</span>
                </div>
              </div>

              {/* Quick Prompt Chips */}
              <div className="flex gap-1.5 px-4 pt-2.5 overflow-x-auto no-scrollbar">
                {['Check Refund', 'Reset Biometric Key', 'Extend Stay'].map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => handleSendMessage(prompt)}
                    className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-white/5 hover:bg-cyan-500/20 border border-white/10 text-stone-300 text-[8px] font-black uppercase tracking-widest transition cursor-pointer"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
              
              <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`p-3 rounded-2xl text-xs font-medium leading-relaxed max-w-[85%] shadow-inner ${msg.sender === 'user' ? 'bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 ml-auto rounded-tr-sm' : 'bg-[#0a0a0a] border border-white/5 text-stone-300 rounded-tl-sm'}`}>
                    {msg.text}
                  </div>
                ))}
              </div>
              
              <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="p-3 bg-[#080808] border-t border-white/5 flex items-center gap-2">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type a message..." 
                  className="flex-1 bg-[#0a0a0a] border border-white/10 text-white px-4 py-2.5 rounded-xl text-xs outline-none focus:border-cyan-400 font-bold placeholder-stone-600" 
                />
                <button type="submit" className="bg-cyan-500 hover:bg-cyan-400 text-black w-9 h-9 rounded-xl flex items-center justify-center transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)] cursor-pointer">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
                </button>
              </form>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default SupportFeedback;