import React from 'react';

function Invoicing({ setCurrentPage }) {
  
  // প্রিন্ট বা পিডিএফ সেভ করার ফাংশন
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full min-h-screen bg-[#070707] text-stone-200 font-sans selection:bg-teal-500 selection:text-white px-4 md:px-10 py-12">
      <div className="max-w-[1000px] mx-auto space-y-8">
        
        {/* Top Action Bar (প্রিন্ট করার সময় এটি লুকানো থাকবে) */}
        <div className="flex justify-between items-center print:hidden">
          <button 
            onClick={() => setCurrentPage('home')} 
            className="px-5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-stone-300 hover:bg-white/[0.08] hover:text-white text-[10px] font-bold uppercase tracking-widest transition-all duration-300 flex items-center gap-2"
          >
            <span>←</span> Back to Dashboard
          </button>
          
          <button 
            onClick={handlePrint}
            className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-[10px] font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(20,184,166,0.25)] transition-all duration-300 flex items-center gap-2"
          >
            Download PDF / Print
          </button>
        </div>

        {/* Ultra-Modern Invoice Container (এই অংশটি প্রিন্ট হবে) */}
        <div className="bg-gradient-to-br from-white/[0.07] via-white/[0.03] to-transparent backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-14 shadow-[0_25px_60px_rgba(0,0,0,0.8)] print:bg-white print:text-black print:shadow-none print:border-none print:p-0">
          
          {/* Invoice Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-10 mb-10 border-b border-white/10 print:border-gray-200">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-teal-500/10 border border-teal-500/20 text-teal-400 rounded-2xl flex items-center justify-center font-black text-xl shadow-inner print:bg-teal-900 print:text-white">
                  H
                </div>
                <span className="text-3xl font-light text-white tracking-tight print:text-black">
                  Hotel<span className="font-bold text-teal-400 print:text-teal-700">Ease</span>
                </span>
              </div>
              <p className="text-xs font-medium text-stone-400 print:text-gray-600">123 Luxury Avenue, Dhaka, 1212</p>
              <p className="text-xs font-medium text-stone-400 print:text-gray-600 mt-0.5">hello@hotelease.com | +880 1234 567890</p>
            </div>
            
            <div className="text-left md:text-right">
              <h1 className="text-3xl md:text-4xl font-light text-stone-600 uppercase tracking-widest mb-2 print:text-gray-400">Invoice</h1>
              <div className="space-y-1">
                <p className="text-xs font-bold text-stone-300 print:text-black"><span className="text-stone-500 uppercase tracking-wider text-[10px] print:text-gray-500">Invoice ID:</span> INV-20260901</p>
                <p className="text-xs font-bold text-stone-300 print:text-black"><span className="text-stone-500 uppercase tracking-wider text-[10px] print:text-gray-500">Issued Date:</span> Oct 05, 2026</p>
              </div>
            </div>
          </div>

          {/* Client & Payment Status Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white/[0.03] border border-white/10 p-6 rounded-2xl backdrop-blur-md print:bg-gray-50 print:border-gray-200">
              <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-3 print:text-gray-500">Billed Recipient</p>
              <h3 className="text-lg font-light text-white mb-1 print:text-black">Valued Guest</h3>
              <p className="text-xs font-medium text-stone-400 print:text-gray-600">guest@secureportal.com</p>
              <p className="text-xs font-medium text-stone-400 print:text-gray-600 mt-0.5">+880 1234 567890</p>
            </div>
            
            <div className="bg-teal-950/30 border border-teal-500/20 p-6 rounded-2xl flex flex-col justify-between backdrop-blur-md print:bg-teal-50 print:border-teal-200">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <p className="text-[10px] font-bold text-teal-400 uppercase tracking-widest print:text-teal-800">Financial Status</p>
                  <span className="bg-teal-500/20 border border-teal-500/30 text-teal-300 text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm print:bg-green-600 print:text-white">
                    Paid in Full
                  </span>
                </div>
                <p className="text-xs font-bold text-stone-300 print:text-teal-900"><span className="text-stone-500 uppercase tracking-wider text-[10px] print:text-teal-700">Method:</span> Credit Card (**** 2584)</p>
              </div>
              <p className="text-xs font-bold text-stone-300 pt-3 border-t border-white/10 mt-3 print:text-teal-900 print:border-teal-200">
                <span className="text-stone-500 uppercase tracking-wider text-[10px] print:text-teal-700">Settled On:</span> Oct 05, 2026
              </p>
            </div>
          </div>

          {/* Itemization Table */}
          <div className="mb-12 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-[10px] font-bold text-stone-500 uppercase tracking-widest print:border-gray-300 print:text-gray-600">
                  <th className="py-4 px-3">Item Description</th>
                  <th className="py-4 px-3 text-center">Qty / Nights</th>
                  <th className="py-4 px-3 text-right">Valuation</th>
                </tr>
              </thead>
              <tbody className="text-xs font-medium text-stone-300 divide-y divide-white/5 print:text-gray-800 print:divide-gray-200">
                <tr>
                  <td className="py-4 px-3 text-white font-bold print:text-black">Premium Suite (Room 101)</td>
                  <td className="py-4 px-3 text-center text-stone-400 print:text-gray-600">2</td>
                  <td className="py-4 px-3 text-right text-teal-400 font-bold print:text-black">$312.00</td>
                </tr>
                <tr>
                  <td className="py-4 px-3 text-white font-bold print:text-black">Spa Service (Deep Tissue Massage)</td>
                  <td className="py-4 px-3 text-center text-stone-400 print:text-gray-600">1</td>
                  <td className="py-4 px-3 text-right text-teal-400 font-bold print:text-black">$45.00</td>
                </tr>
                <tr>
                  <td className="py-4 px-3 text-white font-bold print:text-black">Dining Fee (In-room Dining)</td>
                  <td className="py-4 px-3 text-center text-stone-400 print:text-gray-600">1</td>
                  <td className="py-4 px-3 text-right text-teal-400 font-bold print:text-black">$35.00</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Total Calculations Summary */}
          <div className="flex justify-end pt-6 border-t border-white/10 print:border-gray-200">
            <div className="w-full md:w-5/12 space-y-3">
              <div className="flex justify-between text-xs font-medium text-stone-400 print:text-gray-600">
                <span>Subtotal Valuation</span>
                <span className="text-stone-200 print:text-black">$392.00</span>
              </div>
              <div className="flex justify-between text-xs font-medium text-stone-400 print:text-gray-600">
                <span>Regulatory Taxes (10%)</span>
                <span className="text-stone-200 print:text-black">$39.20</span>
              </div>
              <div className="flex justify-between text-xs font-bold text-teal-400 pb-3 border-b border-white/10 print:border-gray-200 print:text-teal-700">
                <span>Applied Discount (SUMMER25)</span>
                <span>-$78.00</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-xs font-bold text-white uppercase tracking-widest print:text-black">Total Payable</span>
                <span className="text-2xl md:text-3xl font-light text-white tracking-tight print:text-black">$353.20</span>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-16 pt-8 border-t border-white/10 text-center print:border-gray-200">
            <p className="text-xs font-medium text-stone-400 print:text-gray-600">Thank you for selecting HotelEase as your luxury hospitality partner.</p>
            <p className="text-[10px] font-bold text-stone-600 mt-1 uppercase tracking-widest print:text-gray-400">System generated financial record - No signature required.</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Invoicing;