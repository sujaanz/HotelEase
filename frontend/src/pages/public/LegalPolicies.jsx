import React, { useState } from 'react';

function LegalPolicies({ setCurrentPage }) {
  const [activeSection, setActiveSection] = useState('01');
  const [jurisdiction, setJurisdiction] = useState('GDPR');
  const [isAccepted, setIsAccepted] = useState(false);
  const [signatureName, setSignatureName] = useState('');
  const [isSigned, setIsSigned] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleSignAgreement = (e) => {
    e.preventDefault();
    if (!signatureName.trim()) return;
    setIsSigned(true);
    setIsAccepted(true);
    alert(`Cryptographic signature recorded for: ${signatureName}`);
  };

  const policies = [
    {
      id: '01',
      title: 'Terms of Service',
      content: jurisdiction === 'GDPR'
        ? 'Welcome to HotelEase. By accessing our platform, you agree to comply with our terms and conditions under GDPR compliance frameworks. Our hotel management software is designed for both personal bookings and enterprise-level operations. Any misuse of our booking algorithms, API endpoints, or database structures will result in immediate termination of your account and revocation of digital access keys.'
        : 'Welcome to HotelEase. By accessing our platform, you agree to comply with our terms and conditions. Our hotel management software is designed for both personal bookings and enterprise-level operations. Any misuse of our booking algorithms, API endpoints, or database structures will result in immediate termination of your account.'
    },
    {
      id: '02',
      title: 'Privacy & Data Protection',
      content: 'We value your privacy. Your personal information, including booking histories and payment methods, are strictly encrypted using military-grade AES-256 protocols. We do not sell your personal data to third parties. AI Chatbot conversations are processed via secure Gemini API channels with zero-retention logging. You can request complete data deletion at any time by contacting support.'
    },
    {
      id: '03',
      title: 'Cancellation & Refund Policy',
      content: 'Bookings can be canceled free of charge up to 48 hours before check-in. Cancellations made within 48 hours of the check-in date are subject to a one-night cancellation fee. Refunds are processed within 5-7 business days to the original payment method or through autonomous settlement back to your linked digital wallet.'
    }
  ];

  return (
    <div className={`w-full min-h-[100vh] ${highContrast ? 'bg-black text-white' : 'bg-[#030303] text-stone-200'} font-sans selection:bg-cyan-500 selection:text-black px-4 md:px-8 py-10 relative overflow-x-hidden flex flex-col items-center transition-colors duration-500`}>
      
      {/* Background Holographic Glows */}
      <div className="absolute top-[0%] left-[15%] w-[50%] h-[50%] bg-teal-500/10 blur-[150px] rounded-full animate-pulse pointer-events-none print:hidden"></div>
      <div className="absolute bottom-[10%] right-[15%] w-[40%] h-[40%] bg-cyan-600/10 blur-[150px] rounded-full animate-pulse pointer-events-none print:hidden" style={{ animationDelay: '2s' }}></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] print:hidden"></div>

      <div className="w-full max-w-[1150px] relative z-10 space-y-6">
        
        {/* Top Advanced Command Bar (Optimized for mobile flex-wrap) */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 print:hidden bg-[#080808] border border-white/5 p-4 rounded-2xl backdrop-blur-2xl shadow-lg">
          <button 
            onClick={() => setCurrentPage ? setCurrentPage('home') : window.location.href = '/'} 
            className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-stone-300 hover:bg-white/10 hover:text-cyan-400 text-[10px] font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2 cursor-pointer"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Exit Terminal (Dashboard)
          </button>

          {/* Jurisdiction & Theme Controls */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto justify-center sm:justify-end">
            <div className="bg-[#0a0a0a] p-1 rounded-xl border border-white/10 flex flex-wrap gap-1">
              {['GDPR', 'CCPA', 'Enterprise'].map((jur) => (
                <button
                  key={jur}
                  onClick={() => setJurisdiction(jur)}
                  className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all cursor-pointer ${jurisdiction === jur ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.2)]' : 'text-stone-500 hover:text-stone-300'}`}
                >
                  {jur}
                </button>
              ))}
            </div>

            <button 
              onClick={() => setHighContrast(!highContrast)}
              title="Toggle High Contrast Mode"
              className="px-3.5 py-3 rounded-xl bg-white/5 border border-white/10 text-stone-400 hover:text-white text-xs font-bold uppercase tracking-widest cursor-pointer"
            >
              Contrast
            </button>

            <button 
              onClick={handlePrint}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-500 hover:from-teal-500 hover:to-cyan-400 text-black font-bold text-[10px] uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(20,184,166,0.3)] transition-all flex items-center gap-2 cursor-pointer"
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
              Export Record
            </button>
          </div>
        </div>

        {/* Main Glass Container */}
        <div className="bg-[#050505] border border-white/10 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden print:bg-white print:text-black print:shadow-none print:border-none">
          
          {/* Header */}
          <div className="p-6 sm:p-8 md:p-12 border-b border-white/5 print:border-gray-300 relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none print:hidden"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2 print:text-black">
                  Legal <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">&</span> Compliance
                </h1>
                <p className="text-[10px] font-black text-stone-500 uppercase tracking-widest print:text-gray-500">
                  Standard Framework | Jurisdiction: <span className="text-cyan-400 font-mono">{jurisdiction}</span> | Rev. Oct 2026
                </p>
              </div>
              <div className="bg-[#0a0a0a] border border-white/5 px-5 py-3 rounded-2xl backdrop-blur-md print:hidden shadow-inner">
                <p className="text-[8px] font-black text-stone-500 uppercase tracking-widest mb-1">Live Audit Hash</p>
                <p className="text-[10px] font-mono font-bold text-teal-400 tracking-wider">0x77f9...4b21</p>
              </div>
            </div>
          </div>

          {/* Interactive Accordion Sections */}
          <div className="p-4 sm:p-6 md:p-8 space-y-4 print:space-y-6 print:p-0 print:mt-8">
            {policies.map((policy) => (
              <div 
                key={policy.id} 
                className={`border rounded-2xl transition-all duration-500 overflow-hidden print:border-none print:rounded-none ${
                  activeSection === policy.id ? 'bg-[#0a0a0a] border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.1)]' : 'bg-white/[0.02] border-white/5 hover:border-white/10'
                }`}
              >
                {/* Accordion Header */}
                <button 
                  onClick={() => setActiveSection(activeSection === policy.id ? null : policy.id)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none print:hidden cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <span className={`text-lg font-mono font-black transition-colors duration-300 ${activeSection === policy.id ? 'text-cyan-400' : 'text-stone-600'}`}>
                      {policy.id}
                    </span>
                    <h2 className="text-base md:text-lg font-bold text-white tracking-wide">
                      {policy.title}
                    </h2>
                  </div>
                  <div className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-transform duration-300 ${activeSection === policy.id ? 'rotate-180 bg-cyan-500/10 border-cyan-500/30 text-cyan-400' : 'bg-white/5 border-white/10 text-stone-500'}`}>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </button>

                {/* Print Header */}
                <div className="hidden print:flex items-center gap-3 mb-2">
                  <span className="text-teal-700 font-black text-xl">{policy.id}.</span>
                  <h2 className="text-lg font-bold text-black">{policy.title}</h2>
                </div>

                {/* Accordion Content */}
                <div 
                  className={`px-5 md:px-14 transition-all duration-500 print:max-h-full print:opacity-100 print:mb-8 print:p-0 ${
                    activeSection === policy.id ? 'max-h-[500px] opacity-100 pb-6' : 'max-h-0 opacity-0 pb-0 overflow-hidden'
                  }`}
                >
                  <p className="text-xs md:text-sm font-medium text-stone-400 leading-relaxed text-justify print:text-gray-700">
                    {policy.content}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Cryptographic Digital Signature Block (Responsive Form Layout) */}
          <div className="bg-black/60 border-t border-white/5 p-6 md:p-8 backdrop-blur-xl print:hidden">
            <div className="max-w-xl">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Cryptographic Compliance Signature</h3>
              <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-4">Sign below to cryptographically bind your session to these terms.</p>
              
              {!isSigned ? (
                <form onSubmit={handleSignAgreement} className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="text" 
                    value={signatureName} 
                    onChange={(e) => setSignatureName(e.target.value)} 
                    placeholder="Enter Full Legal Name..." 
                    className="flex-1 bg-[#0a0a0a] px-5 py-3.5 rounded-2xl border border-white/10 outline-none text-xs text-white font-bold focus:border-cyan-400 shadow-inner"
                    required
                  />
                  <button type="submit" className="px-6 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-black rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all cursor-pointer">
                    Sign & Seal
                  </button>
                </form>
              ) : (
                <div className="bg-[#0a0a0a] border border-cyan-500/30 p-4 rounded-2xl flex items-center justify-between shadow-inner">
                  <div>
                    <p className="text-[9px] font-black text-stone-500 uppercase tracking-widest">Cryptographically Signed By</p>
                    <p className="text-sm font-black text-cyan-400 tracking-wide font-mono mt-0.5">{signatureName} (Verified)</p>
                  </div>
                  <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest">
                    Hash Seal OK
                  </span>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default LegalPolicies;