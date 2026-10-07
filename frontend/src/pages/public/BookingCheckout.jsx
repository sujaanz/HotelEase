import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BookingCheckout({ setCurrentPage }) {
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [biometricVerified, setBiometricVerified] = useState(false);
  
  // Add-ons State
  const [addons, setAddons] = useState({
    airportPickup: false,
    earlyCheckIn: false,
    carbonOffset: true
  });

  // Guest Data State
  const [formData, setFormData] = useState({
    guest_name: '',
    guest_email: '',
    room_id: 1, 
    check_in: '2026-11-12',
    check_out: '2026-11-14',
    base_amount: 312.00,
    discount: 78.00
  });

  // Calculate Total dynamically based on add-ons
  const calculateTotal = () => {
    let total = formData.base_amount - formData.discount + (formData.base_amount * 0.10); // Base + Tax - Discount
    if (addons.airportPickup) total += 50;
    if (addons.earlyCheckIn) total += 30;
    if (addons.carbonOffset) total += 5;
    return total;
  };

  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCardChange = (e) => {
    let { name, value } = e.target;
    if (name === 'number') {
      value = value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
    } else if (name === 'expiry') {
      value = value.replace(/\D/g, '').replace(/^(\d{2})(\d{1,2})/, '$1 / $2').slice(0, 7);
    } else if (name === 'cvv') {
      value = value.replace(/\D/g, '').slice(0, 4);
    }
    setCardData({ ...cardData, [name]: value });
  };

  const handleAddonChange = (addonName) => {
    setAddons(prev => ({ ...prev, [addonName]: !prev[addonName] }));
  };

  const simulateBiometric = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setBiometricVerified(true);
      setIsProcessing(false);
    }, 1500);
  };

  const handleConfirmBooking = () => {
    if(!formData.guest_name || !formData.guest_email) {
      alert("Please enter your First Name and Email Address.");
      return;
    }
    if(paymentMethod === 'credit_card' && (!cardData.number || !cardData.expiry || !cardData.cvv)) {
      alert("Please fill in your valid card details.");
      return;
    }
    if (!biometricVerified) {
      simulateBiometric();
      return;
    }

    setIsProcessing(true);
    const finalData = { ...formData, total_amount: calculateTotal() };

    axios.post('http://127.0.0.1:5000/api/bookings', finalData)
      .then(response => {
        alert("Success: " + response.data.message + "\nYour Booking ID is: " + response.data.booking_id);
        setIsProcessing(false);
        setCurrentPage('profile'); 
      })
      .catch(error => {
        console.error("Booking error:", error);
        alert("Something went wrong! Is the Flask server running?");
        setIsProcessing(false);
      });
  };

  return (
    <div className="w-full min-h-[100vh] bg-[#030303] text-stone-200 font-sans selection:bg-cyan-500 selection:text-black pt-10 pb-20 px-4 md:px-8 relative overflow-hidden">
      
      {/* Background Holographic Glows */}
      <div className="absolute top-[0%] left-[10%] w-[50%] h-[50%] bg-teal-500/10 blur-[150px] rounded-full animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] bg-cyan-600/10 blur-[150px] rounded-full animate-pulse pointer-events-none" style={{ animationDelay: '2s' }}></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
          <div>
            <button onClick={() => setCurrentPage('rooms')} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-stone-500 hover:text-cyan-400 mb-6 transition-all group w-max">
              <span className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-cyan-500/30 group-hover:-translate-x-1 transition-all">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-3 h-3"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
              </span>
              Return to Grid
            </button>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Secure <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">Checkout.</span>
            </h1>
            <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mt-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
              Biometric & 256-Bit Encrypted Gateway
            </p>
          </div>
          
          <div className="flex items-center gap-2 bg-[#0a0a0a] border border-white/5 px-4 py-2 rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.5)]">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4 text-green-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            <span className="text-[9px] font-black text-white uppercase tracking-widest">Connection Safe</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Left Side: Dynamic Forms & Enhancements */}
          <div className="flex-1 space-y-6">
            
            {/* 1. Guest Identity Form */}
            <div className="bg-[#050505] border border-white/5 rounded-[2rem] p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group hover:border-cyan-500/20 transition-all duration-500">
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 text-cyan-400">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  </div>
                  <h2 className="text-xs font-black text-white uppercase tracking-widest">Primary Guest Identity</h2>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[9px] font-black text-stone-500 uppercase tracking-widest mb-2">Legal Name / Designation <span className="text-cyan-400">*</span></label>
                  <input 
                    type="text" 
                    name="guest_name"
                    value={formData.guest_name}
                    onChange={handleInputChange}
                    className="w-full bg-[#0a0a0a] px-5 py-4 rounded-xl border border-white/10 focus:border-cyan-500/50 outline-none text-xs font-medium text-white placeholder-stone-700 transition-all shadow-inner focus:shadow-[0_0_15px_rgba(6,182,212,0.1)]" 
                    placeholder="e.g., John Doe" 
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-black text-stone-500 uppercase tracking-widest mb-2">Secure Comms (Email) <span className="text-cyan-400">*</span></label>
                  <input 
                    type="email" 
                    name="guest_email"
                    value={formData.guest_email}
                    onChange={handleInputChange}
                    className="w-full bg-[#0a0a0a] px-5 py-4 rounded-xl border border-white/10 focus:border-cyan-500/50 outline-none text-xs font-medium text-white placeholder-stone-700 transition-all shadow-inner focus:shadow-[0_0_15px_rgba(6,182,212,0.1)]" 
                    placeholder="name@domain.com" 
                  />
                </div>
              </div>
            </div>

            {/* 🌟 NEW: Stay Enhancements (Add-ons) */}
            <div className="bg-[#050505] border border-white/5 rounded-[2rem] p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group hover:border-teal-500/20 transition-all duration-500">
               <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-6">
                  <div className="w-8 h-8 rounded-full bg-teal-500/10 flex items-center justify-center border border-teal-500/20 text-teal-400">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                  </div>
                  <h2 className="text-xs font-black text-white uppercase tracking-widest">Enhance Your Stay</h2>
                </div>
                
                <div className="space-y-3">
                  <label className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${addons.airportPickup ? 'border-teal-500 bg-teal-500/10' : 'border-white/5 bg-[#0a0a0a] hover:border-white/20'}`}>
                    <div className="flex items-center gap-3">
                      <input type="checkbox" checked={addons.airportPickup} onChange={() => handleAddonChange('airportPickup')} className="w-4 h-4 accent-teal-500 rounded bg-black border-white/20" />
                      <span className="text-xs font-bold text-white">Autonomous Airport Transfer</span>
                    </div>
                    <span className="text-[10px] font-mono text-teal-400">+$50.00</span>
                  </label>

                  <label className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${addons.earlyCheckIn ? 'border-teal-500 bg-teal-500/10' : 'border-white/5 bg-[#0a0a0a] hover:border-white/20'}`}>
                    <div className="flex items-center gap-3">
                      <input type="checkbox" checked={addons.earlyCheckIn} onChange={() => handleAddonChange('earlyCheckIn')} className="w-4 h-4 accent-teal-500 rounded bg-black border-white/20" />
                      <span className="text-xs font-bold text-white">Priority Early Check-in (10 AM)</span>
                    </div>
                    <span className="text-[10px] font-mono text-teal-400">+$30.00</span>
                  </label>
                  
                  {/* Eco Option */}
                  <label className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${addons.carbonOffset ? 'border-green-500 bg-green-500/10' : 'border-white/5 bg-[#0a0a0a] hover:border-white/20'}`}>
                    <div className="flex items-center gap-3">
                      <input type="checkbox" checked={addons.carbonOffset} onChange={() => handleAddonChange('carbonOffset')} className="w-4 h-4 accent-green-500 rounded bg-black border-white/20" />
                      <div>
                        <span className="text-xs font-bold text-white block">Carbon Neutral Flight Offset</span>
                        <span className="text-[9px] text-stone-500">Neutralize your travel emissions via certified eco-projects.</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-green-400">+$5.00</span>
                  </label>
                </div>
            </div>

            {/* 3. Payment Gateway */}
            <div className="bg-[#050505] border border-white/5 rounded-[2rem] p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group hover:border-cyan-500/20 transition-all duration-500">
              <div className="flex flex-wrap justify-between items-center border-b border-white/5 pb-4 mb-6 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 text-cyan-400">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                  </div>
                  <h2 className="text-xs font-black text-white uppercase tracking-widest">Transaction Method</h2>
                </div>
                <div className="flex gap-2 items-center opacity-50">
                  <svg viewBox="0 0 32 32" className="w-8 h-8 text-white" fill="currentColor"><path d="M11 16c0-2.88 1.15-5.5 3-7.44C12.14 7.29 10.15 6.5 8 6.5 4.35 6.5 1.4 9.45 1.4 13.1v5.8c0 3.65 2.95 6.6 6.6 6.6 2.15 0 4.14-.79 5.6-2.06-1.85-1.94-3-4.56-3-7.44zm20-2.9v5.8c0 3.65-2.95 6.6-6.6 6.6-2.15 0-4.14-.79-5.6-2.06C20.65 21.5 21.8 18.88 21.8 16c0-2.88-1.15-5.5-3-7.44C20.26 7.29 22.25 6.5 24.4 6.5 28.05 6.5 31 9.45 31 13.1z"/></svg>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <button 
                  onClick={() => setPaymentMethod('credit_card')} 
                  className={`flex-1 py-4 border rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${paymentMethod === 'credit_card' ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.15)]' : 'border-white/5 bg-[#0a0a0a] text-stone-500 hover:border-white/20 hover:text-stone-300'}`}
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                  Neural Card
                </button>
                <button 
                  onClick={() => setPaymentMethod('crypto')} 
                  className={`flex-1 py-4 border rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${paymentMethod === 'crypto' ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.15)]' : 'border-white/5 bg-[#0a0a0a] text-stone-500 hover:border-white/20 hover:text-stone-300'}`}
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  Digital Wallet / Crypto
                </button>
              </div>

              {paymentMethod === 'credit_card' && (
                <div className="space-y-5 animate-fade-in">
                  <div>
                    <label className="block text-[9px] font-black text-stone-500 uppercase tracking-widest mb-2">Card Matrix Number</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        name="number"
                        value={cardData.number}
                        onChange={handleCardChange}
                        className="w-full bg-[#0a0a0a] px-5 py-4 rounded-xl border border-white/10 focus:border-cyan-500/50 outline-none font-mono text-xs tracking-widest text-white placeholder-stone-700 transition-all shadow-inner focus:shadow-[0_0_15px_rgba(6,182,212,0.1)]" 
                        placeholder="0000 0000 0000 0000" 
                      />
                      <div className="absolute right-5 top-1/2 -translate-y-1/2 flex gap-1">
                        <div className="w-6 h-4 bg-white/10 rounded-sm"></div>
                        <div className="w-6 h-4 bg-white/10 rounded-sm"></div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[9px] font-black text-stone-500 uppercase tracking-widest mb-2">Valid Thru</label>
                      <input 
                        type="text" 
                        name="expiry"
                        value={cardData.expiry}
                        onChange={handleCardChange}
                        className="w-full bg-[#0a0a0a] px-5 py-4 rounded-xl border border-white/10 focus:border-cyan-500/50 outline-none font-mono text-xs tracking-widest text-white placeholder-stone-700 transition-all text-center shadow-inner focus:shadow-[0_0_15px_rgba(6,182,212,0.1)]" 
                        placeholder="MM / YY" 
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-black text-stone-500 uppercase tracking-widest mb-2">Security Hash (CVV)</label>
                      <input 
                        type="password" 
                        name="cvv"
                        value={cardData.cvv}
                        onChange={handleCardChange}
                        className="w-full bg-[#0a0a0a] px-5 py-4 rounded-xl border border-white/10 focus:border-cyan-500/50 outline-none font-mono text-xs tracking-widest text-white placeholder-stone-700 transition-all text-center shadow-inner focus:shadow-[0_0_15px_rgba(6,182,212,0.1)]" 
                        placeholder="***" 
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {paymentMethod === 'crypto' && (
                <div className="text-center py-6 animate-fade-in bg-[#0a0a0a] border border-white/5 rounded-xl shadow-inner relative overflow-hidden">
                  {/* Dynamic Conversion Rate overlay */}
                  <div className="absolute top-2 left-0 w-full flex justify-between px-4">
                     <span className="text-[8px] font-mono text-stone-500">1 ETH = $2,450.00</span>
                     <span className="text-[8px] font-mono text-stone-500">USDC Active</span>
                  </div>
                  <div className="w-32 h-32 mx-auto bg-white p-2 rounded-xl mt-6 mb-4 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:scale-105 transition-transform">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=HotelEaseSecureCheckout" alt="Scan to Pay" className="w-full h-full object-contain" />
                  </div>
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Scan to authorize transfer</p>
                  <div className="inline-flex items-center gap-2 mt-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                    <p className="text-[9px] font-black text-cyan-400 uppercase tracking-widest">Awaiting ~{(calculateTotal() / 2450).toFixed(4)} ETH</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side: Digital Invoice Summary */}
          <div className="w-full lg:w-[420px]">
            <div className="bg-[#050505] p-6 md:p-8 rounded-[2.5rem] border border-white/5 shadow-[0_30px_60px_rgba(0,0,0,0.8)] sticky top-28 relative overflow-hidden group hover:border-cyan-500/30 transition-all duration-500">
              
              <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 blur-[60px] rounded-full pointer-events-none group-hover:bg-cyan-500/10 transition-colors"></div>
              
              <div className="flex justify-between items-center border-b border-white/5 pb-5 mb-6 relative z-10">
                <h2 className="text-xs font-black text-white uppercase tracking-widest">Digital Manifest</h2>
                <span className="text-[8px] font-black text-cyan-400 uppercase tracking-[0.2em] border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 rounded-md">Validated</span>
              </div>
              
              <div className="flex gap-4 mb-6 pb-6 border-b border-white/5 relative z-10">
                <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-white/10">
                  <img src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Room" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="font-bold text-white text-base leading-tight mb-1">Quantum Master Suite</h3>
                  <p className="text-[9px] font-black text-stone-500 uppercase tracking-widest mb-2">Sector: Maldives Node</p>
                  <div className="flex items-center gap-2 text-[9px] font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 border border-cyan-500/20 px-2 py-1 rounded w-max">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-3 h-3"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    <span>{formData.check_in} — {formData.check_out}</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Invoice Computation */}
              <div className="space-y-4 text-xs font-medium text-stone-400 mb-6 border-b border-white/5 pb-6 relative z-10">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest">Base Computation</span>
                  <span className="text-white font-mono">${formData.base_amount.toFixed(2)}</span>
                </div>
                
                {addons.airportPickup && (
                   <div className="flex justify-between items-center text-stone-500">
                     <span className="text-[10px] uppercase tracking-widest">+ Auto Transfer</span>
                     <span className="font-mono">$50.00</span>
                   </div>
                )}
                {addons.earlyCheckIn && (
                   <div className="flex justify-between items-center text-stone-500">
                     <span className="text-[10px] uppercase tracking-widest">+ Priority Access</span>
                     <span className="font-mono">$30.00</span>
                   </div>
                )}
                {addons.carbonOffset && (
                   <div className="flex justify-between items-center text-green-400/80">
                     <span className="text-[10px] uppercase tracking-widest">+ Carbon Offset</span>
                     <span className="font-mono">$5.00</span>
                   </div>
                )}

                <div className="flex justify-between items-center border-t border-white/5 pt-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest">Service Matrix (10%)</span>
                  <span className="text-white font-mono">${(formData.base_amount * 0.10).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-cyan-400 bg-cyan-500/5 p-2 rounded-lg -mx-2 px-2 border border-cyan-500/10">
                  <span className="text-[10px] font-black uppercase tracking-widest">Elite Tier Adjustment</span>
                  <span className="font-mono">-${formData.discount.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-8 relative z-10">
                <div>
                  <span className="text-[9px] font-black text-stone-500 uppercase tracking-widest mb-1 block">Total Authorization</span>
                  <span className="text-[8px] font-bold text-stone-600 uppercase tracking-widest">USD Currency</span>
                </div>
                <div className="text-right">
                  <span className="text-4xl font-black text-white tracking-tight leading-none">${calculateTotal().toFixed(2).split('.')[0]}<span className="text-xl text-stone-500">.{calculateTotal().toFixed(2).split('.')[1]}</span></span>
                </div>
              </div>

              {/* 🌟 Biometric Confirmation Button */}
              <button 
                onClick={handleConfirmBooking}
                disabled={isProcessing}
                className={`w-full font-black py-5 rounded-2xl transition-all duration-300 relative z-10 flex justify-center items-center gap-2 text-[10px] uppercase tracking-[0.2em]
                  ${isProcessing ? 'bg-cyan-900/40 text-cyan-500 border border-cyan-500/20 cursor-wait' : 'bg-gradient-to-r from-teal-500 to-cyan-500 text-black shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:scale-[1.02]'}`}
              >
                {isProcessing ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Awaiting Biometrics...
                  </>
                ) : !biometricVerified ? (
                  <>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" /></svg>
                    Tap to Verify Identity
                  </>
                ) : (
                  <>
                    Authorize Transfer <span className="text-sm">→</span>
                  </>
                )}
              </button>
              
              <p className="text-center text-[8px] font-bold text-stone-600 mt-5 uppercase tracking-widest relative z-10 flex items-center justify-center gap-1.5">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-3 h-3"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
                Secured by HotelEase Quantum Node
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default BookingCheckout;