import React, { useState } from 'react';

function LegalPolicies() {
  const [activeSection, setActiveSection] = useState('01');
  const [isAccepted, setIsAccepted] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const policies = [
    {
      id: '01',
      title: 'Terms of Service',
      content: 'Welcome to HotelEase. By accessing our platform, you agree to comply with our terms and conditions. Our hotel management software is designed for both personal bookings and enterprise-level operations. Any misuse of our booking algorithms, API endpoints, or database structures will result in immediate termination of your account.'
    },
    {
      id: '02',
      title: 'Privacy & Data Protection',
      content: 'We value your privacy. Your personal information, including booking histories and payment methods, are strictly encrypted. We do not sell your personal data to third parties. AI Chatbot conversations are processed via secure Gemini API channels. You can request complete data deletion at any time by contacting support.'
    },
    {
      id: '03',
      title: 'Cancellation & Refund Policy',
      content: 'Bookings can be canceled free of charge up to 48 hours before check-in. Cancellations made within 48 hours of the check-in date are subject to a one-night cancellation fee. Refunds are processed within 5-7 business days to the original payment method.'
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#070707] text-stone-200 font-sans selection:bg-teal-500 selection:text-white px-4 md:px-10 py-12 flex flex-col items-center">
      
      <div className="w-full max-w-[900px] relative z-10 space-y-6">
        
        {/* Top Controls */}
        <div className="flex justify-between items-center print:hidden">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isAccepted ? 'bg-teal-400' : 'bg-stone-600'} animate-pulse`}></span>
            <span className="text-[9px] font-bold uppercase tracking-widest text-stone-400">
              {isAccepted ? 'Compliance Verified' : 'Awaiting Consent'}
            </span>
          </div>
          
          <button 
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-teal-500/50 hover:text-teal-400 text-stone-400 text-[9px] font-bold uppercase tracking-widest transition-all duration-300 flex items-center gap-2 shadow-sm"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
            Export Record
          </button>
        </div>

        {/* Main Glass Container */}
        <div className="bg-gradient-to-br from-white/[0.07] via-white/[0.03] to-transparent backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden print:bg-white print:text-black print:shadow-none print:border-none">
          
          {/* Header */}
          <div className="p-8 md:p-12 border-b border-white/10 print:border-gray-300 relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-[80px] pointer-events-none print:hidden"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-light text-white tracking-tight mb-2 print:text-black">
                  Legal <span className="font-bold text-teal-400 print:text-teal-700">&</span> Privacy
                </h1>
                <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest print:text-gray-500">
                  Version 4.0 | Effective Oct 2026
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl backdrop-blur-md print:hidden">
                <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest mb-1">Status</p>
                <p className="text-sm font-light text-white tracking-wide">Standard Enterprise</p>
              </div>
            </div>
          </div>

          {/* Interactive Accordion Sections */}
          <div className="p-4 md:p-8 space-y-4 print:space-y-6 print:p-0 print:mt-8">
            {policies.map((policy) => (
              <div 
                key={policy.id} 
                className={`border border-white/10 rounded-2xl transition-all duration-500 overflow-hidden print:border-none print:rounded-none ${
                  activeSection === policy.id ? 'bg-white/[0.05] shadow-[0_0_30px_rgba(20,184,166,0.05)]' : 'bg-white/[0.01] hover:bg-white/[0.03]'
                }`}
              >
                {/* Accordion Header */}
                <button 
                  onClick={() => setActiveSection(activeSection === policy.id ? null : policy.id)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none print:hidden"
                >
                  <div className="flex items-center gap-4">
                    <span className={`text-xl font-black transition-colors duration-300 ${activeSection === policy.id ? 'text-teal-400' : 'text-stone-600'}`}>
                      {policy.id}
                    </span>
                    <h2 className="text-base md:text-lg font-light text-white tracking-wide">
                      {policy.title}
                    </h2>
                  </div>
                  <div className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-transform duration-300 ${activeSection === policy.id ? 'rotate-180 bg-teal-500/10 border-teal-500/30 text-teal-400' : 'text-stone-500'}`}>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </button>

                {/* Print Header (Only visible during print) */}
                <div className="hidden print:flex items-center gap-3 mb-2">
                  <span className="text-teal-700 font-black text-xl">{policy.id}.</span>
                  <h2 className="text-lg font-bold text-black">{policy.title}</h2>
                </div>

                {/* Accordion Content */}
                <div 
                  className={`px-5 md:px-14 transition-all duration-500 print:max-h-full print:opacity-100 print:mb-8 print:p-0 ${
                    activeSection === policy.id ? 'max-h-[500px] opacity-100 pb-6' : 'max-h-0 opacity-0 pb-0'
                  }`}
                >
                  <p className="text-sm font-medium text-stone-400 leading-relaxed text-justify print:text-gray-700">
                    {policy.content}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Consent Footer */}
          <div className="bg-black/40 border-t border-white/10 p-6 md:p-8 flex flex-col sm:flex-row justify-between items-center gap-6 print:hidden">
            <div>
              <p className="text-sm font-light text-white tracking-wide mb-1">Acknowledge Policies</p>
              <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Digital consent is required to proceed</p>
            </div>
            
            {/* Modern Toggle Switch */}
            <label className="flex items-center gap-4 cursor-pointer group">
              <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${isAccepted ? 'text-teal-400' : 'text-stone-500'}`}>
                {isAccepted ? 'Agreed' : 'Reviewing'}
              </span>
              <div className="relative">
                <input 
                  type="checkbox" 
                  className="sr-only" 
                  checked={isAccepted}
                  onChange={() => setIsAccepted(!isAccepted)}
                />
                <div className={`block w-14 h-8 rounded-full border transition-all duration-300 ${isAccepted ? 'bg-teal-500/20 border-teal-500/50' : 'bg-white/5 border-white/10 group-hover:border-white/30'}`}></div>
                <div className={`absolute left-1.5 top-1.5 bg-white w-5 h-5 rounded-full transition-transform duration-300 shadow-md ${isAccepted ? 'transform translate-x-6 bg-teal-400 shadow-[0_0_15px_rgba(45,212,191,0.6)]' : 'bg-stone-400'}`}></div>
              </div>
            </label>
          </div>

        </div>

      </div>
    </div>
  );
}

export default LegalPolicies;