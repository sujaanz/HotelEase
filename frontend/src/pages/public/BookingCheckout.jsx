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
        alert("🎉 " + response.data.message + "\nYour Booking ID is: " + response.data.booking_id);
        setIsProcessing(false);
        setCurrentPage('profile'); // বুকিং সফল হলে প্রোফাইলে নিয়ে যাবে
      })
      .catch(error => {
        console.error("Booking error:", error);
        alert("Something went wrong! Is the Flask server running?");
        setIsProcessing(false);
      });
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      {/* Back Button & Header */}
      <button onClick={() => setCurrentPage('rooms')} className="flex items-center gap-2 text-sm font-bold text-teal-700 hover:text-teal-900 mb-6 transition">
        <span>←</span> Back to Search
      </button>
      
      <h1 className="text-3xl font-black text-gray-900 mb-8">Secure Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side: Forms */}
        <div className="flex-1 space-y-8">
          
          {/* Guest Information */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-black text-gray-800 mb-5 border-b border-gray-100 pb-3">Guest Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">First Name *</label>
                <input 
                  type="text" 
                  name="guest_name"
                  value={formData.guest_name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-600 outline-none font-medium text-gray-900" 
                  placeholder="John Doe" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address *</label>
                <input 
                  type="email" 
                  name="guest_email"
                  value={formData.guest_email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-600 outline-none font-medium text-gray-900" 
                  placeholder="john@example.com" 
                />
              </div>
            </div>
          </div>

          {/* Payment Options */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-black text-gray-800 mb-5 border-b border-gray-100 pb-3">Payment Method</h2>
            
            <div className="flex gap-4 mb-6">
              <button onClick={() => setPaymentMethod('credit_card')} className={`flex-1 py-4 border-2 rounded-xl flex items-center justify-center gap-2 font-bold transition ${paymentMethod === 'credit_card' ? 'border-teal-600 bg-teal-50 text-teal-800' : 'border-gray-200 text-gray-500 hover:border-teal-300'}`}>
                💳 Credit Card
              </button>
              <button onClick={() => setPaymentMethod('paypal')} className={`flex-1 py-4 border-2 rounded-xl flex items-center justify-center gap-2 font-bold transition ${paymentMethod === 'paypal' ? 'border-teal-600 bg-teal-50 text-teal-800' : 'border-gray-200 text-gray-500 hover:border-teal-300'}`}>
                🅿️ PayPal
              </button>
            </div>

            {paymentMethod === 'credit_card' && (
              <div className="space-y-4 animate-fade-in">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Card Number</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-600 outline-none font-medium text-gray-900" placeholder="0000 0000 0000 0000" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Order Summary */}
        <div className="w-full lg:w-96">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
            <h2 className="text-xl font-black text-gray-800 mb-5 border-b border-gray-100 pb-3">Booking Summary</h2>
            
            <div className="flex gap-4 mb-5 pb-5 border-b border-gray-100">
              <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&q=80" alt="Room" className="w-20 h-20 rounded-lg object-cover" />
              <div>
                <h3 className="font-bold text-gray-900 leading-tight">Serene View Resort</h3>
                <p className="text-xs text-gray-500 mt-1">Premium Suite</p>
                <div className="flex items-center gap-1 mt-1 text-[10px] font-bold text-gray-400">
                  <span>📅 Nov 12 - Nov 14</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-sm font-semibold text-gray-600 mb-5 border-b border-gray-100 pb-5">
              <div className="flex justify-between"><span>$156 x 2 Nights</span><span>$312.00</span></div>
              <div className="flex justify-between"><span>Taxes & Fees (10%)</span><span>$31.20</span></div>
              <div className="flex justify-between text-teal-600"><span>Summer Promo</span><span>-$78.00</span></div>
            </div>

            <div className="flex justify-between items-end mb-6">
              <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Total Due</span>
              <span className="text-3xl font-black text-gray-900">$265.20</span>
            </div>

            <button 
              onClick={handleConfirmBooking}
              disabled={isProcessing}
              className={`w-full text-white font-black py-4 rounded-xl transition shadow-lg flex justify-center items-center gap-2 
                ${isProcessing ? 'bg-teal-600 cursor-not-allowed' : 'bg-teal-800 hover:bg-teal-900 active:scale-95'}`}
            >
              {isProcessing ? 'Processing...' : 'CONFIRM BOOKING'}
            </button>
            <p className="text-center text-xs text-gray-400 mt-3 font-medium">By confirming, you agree to our Terms & Conditions.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingCheckout;