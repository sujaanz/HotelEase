import React, { useState } from 'react';
import axios from 'axios';

function BookingCheckout({ setCurrentPage }) {
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // কাস্টমারের ডেটা সেভ করার জন্য স্টেট
  const [formData, setFormData] = useState({
    guest_name: '',
    guest_email: '',
    room_id: 1, // আপাতত রুম ১০১-এর আইডি
    check_in: '2026-11-12',
    check_out: '2026-11-14',
    total_amount: 265.20
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // API-এর মাধ্যমে ব্যাকএন্ডে ডেটা পাঠানোর ফাংশন
  const handleConfirmBooking = () => {
    if(!formData.guest_name || !formData.guest_email) {
      alert("Please enter your First Name and Email Address.");
      return;
    }

    setIsProcessing(true);

    // ফ্লাস্ক ব্যাকএন্ডে POST রিকোয়েস্ট পাঠানো হচ্ছে
    axios.post('http://127.0.0.1:5000/api/bookings', formData)
      .then(response => {
        alert("Success: " + response.data.message + "\nYour Booking ID is: " + response.data.booking_id);
        setIsProcessing(false);
        setCurrentPage('profile'); // বুকিং সফল হলে প্রোফাইলে নিয়ে যাবে
      })
      .catch(error => {
        console.error("Booking error:", error);
        alert("Something went wrong! Is the Flask server running?");
        setIsProcessing(false);
      });
  };

  return (
    <div className="w-full min-h-screen bg-[#0a0a0a] text-stone-200 font-sans selection:bg-teal-500 selection:text-white pt-8 pb-16 px-4 md:px-8">
      
      <div className="max-w-[1200px] mx-auto">
        
        {/* Back Button & Header */}
        <div className="mb-8">
          <button onClick={() => setCurrentPage('rooms')} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-teal-400 mb-6 transition group">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4 group-hover:-translate-x-1 transition-transform"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Return to Inventory
          </button>
          <h1 className="text-3xl md:text-4xl font-light text-white tracking-wide">Secure Authorization</h1>
          <p className="text-xs text-stone-500 uppercase tracking-widest mt-2">Encrypted Checkout Gateway</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Side: Forms (Glassmorphism) */}
          <div className="flex-1 space-y-6">
            
            {/* Guest Information */}
            <div className="bg-white/5 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5 text-teal-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                <h2 className="text-sm font-semibold text-white uppercase tracking-widest">Primary Guest ID</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">First Name / Designation *</label>
                  <input 
                    type="text" 
                    name="guest_name"
                    value={formData.guest_name}
                    onChange={handleInputChange}
                    className="w-full bg-black/40 px-4 py-3.5 rounded-xl border border-white/10 focus:border-teal-400 outline-none font-medium text-white placeholder-stone-600 transition" 
                    placeholder="Enter full name" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">Secure Comms (Email) *</label>
                  <input 
                    type="email" 
                    name="guest_email"
                    value={formData.guest_email}
                    onChange={handleInputChange}
                    className="w-full bg-black/40 px-4 py-3.5 rounded-xl border border-white/10 focus:border-teal-400 outline-none font-medium text-white placeholder-stone-600 transition" 
                    placeholder="name@domain.com" 
                  />
                </div>
              </div>
            </div>

            {/* Payment Options */}
            <div className="bg-white/5 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
              <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5 text-teal-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  <h2 className="text-sm font-semibold text-white uppercase tracking-widest">Transaction Method</h2>
                </div>
                <span className="text-[9px] text-teal-400 uppercase tracking-widest font-bold border border-teal-500/30 bg-teal-900/20 px-2 py-1 rounded">256-Bit Encrypted</span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button 
                  onClick={() => setPaymentMethod('credit_card')} 
                  className={`flex-1 py-4 border rounded-xl flex items-center justify-center gap-3 font-semibold text-xs uppercase tracking-wider transition-all duration-300 ${paymentMethod === 'credit_card' ? 'border-teal-500 bg-teal-500/10 text-teal-300 shadow-[0_0_15px_rgba(20,184,166,0.15)]' : 'border-white/10 bg-black/30 text-stone-400 hover:border-teal-500/50'}`}
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                  Credit Card
                </button>
                <button 
                  onClick={() => setPaymentMethod('crypto')} 
                  className={`flex-1 py-4 border rounded-xl flex items-center justify-center gap-3 font-semibold text-xs uppercase tracking-wider transition-all duration-300 ${paymentMethod === 'crypto' ? 'border-teal-500 bg-teal-500/10 text-teal-300 shadow-[0_0_15px_rgba(20,184,166,0.15)]' : 'border-white/10 bg-black/30 text-stone-400 hover:border-teal-500/50'}`}
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  Digital Wallet
                </button>
              </div>

              {paymentMethod === 'credit_card' && (
                <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
                  <div>
                    <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">Card Number</label>
                    <div className="relative">
                      <input type="text" className="w-full bg-black/40 px-4 py-3.5 rounded-xl border border-white/10 focus:border-teal-400 outline-none font-mono tracking-widest text-white placeholder-stone-600 transition" placeholder="0000 0000 0000 0000" />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1">
                        <div className="w-6 h-4 bg-white/20 rounded-sm"></div>
                        <div className="w-6 h-4 bg-white/20 rounded-sm"></div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">Expiry Date</label>
                      <input type="text" className="w-full bg-black/40 px-4 py-3.5 rounded-xl border border-white/10 focus:border-teal-400 outline-none font-mono tracking-widest text-white placeholder-stone-600 transition text-center" placeholder="MM / YY" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">CVV Security</label>
                      <input type="password" maxLength="3" className="w-full bg-black/40 px-4 py-3.5 rounded-xl border border-white/10 focus:border-teal-400 outline-none font-mono tracking-widest text-white placeholder-stone-600 transition text-center" placeholder="***" />
                    </div>
                  </div>
                </div>
              )}
              
              {paymentMethod === 'crypto' && (
                <div className="text-center py-6 animate-[fadeIn_0.5s_ease-out]">
                  <div className="w-32 h-32 mx-auto bg-white p-2 rounded-xl mb-4">
                    {/* Placeholder for QR Code */}
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=HotelEaseBooking" alt="QR Code" className="w-full h-full object-contain" />
                  </div>
                  <p className="text-xs text-stone-400 font-medium">Scan to pay with Ethereum (ETH) or USDC.</p>
                  <p className="text-[10px] font-mono text-teal-400 mt-2">Network: ERC-20</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Side: Digital Invoice Summary */}
          <div className="w-full lg:w-96">
            <div className="bg-[#0f0f0f] p-6 md:p-8 rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.8)] sticky top-24 relative overflow-hidden">
              
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 blur-[50px] rounded-full"></div>
              
              <h2 className="text-sm font-semibold text-white uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Digital Invoice</h2>
              
              <div className="flex gap-4 mb-6 pb-6 border-b border-white/10">
                <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=200&q=80" alt="Room" className="w-20 h-20 rounded-xl object-cover opacity-80" />
                <div className="flex flex-col justify-center">
                  <h3 className="font-light text-white text-lg leading-tight tracking-wide">Kyoto Nexus Tower</h3>
                  <p className="text-[10px] text-teal-400 uppercase tracking-widest mt-1 font-semibold">Premium Tech Suite</p>
                  <div className="flex items-center gap-2 mt-2 text-[9px] font-bold text-stone-500 uppercase tracking-widest">
                    <span>Oct 15 - Oct 20</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-xs font-medium text-stone-400 mb-6 border-b border-white/10 pb-6">
                <div className="flex justify-between items-center">
                  <span>Base Rate (5 Nights)</span>
                  <span className="text-white">$312.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Service Matrix (10%)</span>
                  <span className="text-white">$31.20</span>
                </div>
                <div className="flex justify-between items-center text-teal-400">
                  <span>Elite Member Discount</span>
                  <span>-$78.00</span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-8">
                <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1">Total Authorization</span>
                <span className="text-4xl font-light text-white tracking-wide">$265<span className="text-xl text-stone-400">.20</span></span>
              </div>

              <button 
                onClick={handleConfirmBooking}
                disabled={isProcessing}
                className={`w-full font-bold py-4 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(20,184,166,0.2)] flex justify-center items-center gap-3 text-xs uppercase tracking-widest
                  ${isProcessing ? 'bg-teal-900/50 text-teal-300 border border-teal-500/30 cursor-not-allowed' : 'bg-teal-600 text-white hover:bg-teal-500 hover:shadow-[0_0_25px_rgba(20,184,166,0.4)] active:scale-95'}`}
              >
                {isProcessing ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Authorizing...
                  </>
                ) : (
                  <>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Confirm Authorization
                  </>
                )}
              </button>
              
              <p className="text-center text-[9px] text-stone-500 mt-4 uppercase tracking-widest">
                By authorizing, you accept our <span className="text-teal-400 cursor-pointer">Security Protocols</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingCheckout;