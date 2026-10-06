import React from 'react';

function Invoicing({ setCurrentPage }) {
  
  // প্রিন্ট বা পিডিএফ সেভ করার ফাংশন
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-[1000px] mx-auto px-4 py-8">
      
      {/* Top Action Bar (এটি প্রিন্ট করার সময় দেখা যাবে না) */}
      <div className="flex justify-between items-center mb-8 print:hidden">
        <button onClick={() => setCurrentPage('home')} className="text-sm font-bold text-teal-700 hover:text-teal-900 transition flex items-center gap-2">
          <span>←</span> Back to Dashboard
        </button>
        <button 
          onClick={handlePrint}
          className="bg-teal-800 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-teal-900 shadow-sm transition flex items-center gap-2"
        >
          <span>🖨️</span> Download PDF / Print
        </button>
      </div>

      {/* Invoice Document (এই অংশটি প্রিন্ট হবে) */}
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-md border border-gray-100 print:shadow-none print:border-none print:p-0">
        
        {/* Invoice Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b border-gray-100 pb-8">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 bg-teal-800 rounded-xl flex items-center justify-center font-black text-white text-xl">H</div>
              <span className="text-3xl font-black tracking-tighter text-gray-900">Hotel<span className="text-teal-600">Ease</span></span>
            </div>
            <p className="text-xs font-bold text-gray-500">123 Luxury Avenue, Dhaka, 1212</p>
            <p className="text-xs font-bold text-gray-500">hello@hotelease.com | +880 1234 567890</p>
          </div>
          <div className="text-left md:text-right">
            <h1 className="text-4xl font-black text-gray-200 uppercase tracking-widest mb-2">Invoice</h1>
            <p className="text-sm font-bold text-gray-800"><span className="text-gray-400">Invoice ID:</span> INV-20260901</p>
            <p className="text-sm font-bold text-gray-800"><span className="text-gray-400">Date:</span> Oct 05, 2026</p>
          </div>
        </div>

        {/* Guest & Payment Status */}
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-10">
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-2">Billed To:</p>
            <h3 className="text-lg font-black text-gray-900">Sk Sujaan Mondal</h3>
            <p className="text-sm font-bold text-gray-600">sujaan@example.com</p>
            <p className="text-sm font-bold text-gray-600">+91 98765 43210</p>
          </div>
          
          <div className="bg-teal-50 border border-teal-100 p-5 rounded-2xl min-w-[250px]">
            <p className="text-[10px] font-black text-teal-600 uppercase tracking-wider mb-1">Payment Status</p>
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-green-500 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded">Paid in Full</span>
            </div>
            <p className="text-xs font-bold text-teal-800"><span className="opacity-70">Method:</span> Credit Card (**** 2584)</p>
            <p className="text-xs font-bold text-teal-800"><span className="opacity-70">Paid On:</span> Oct 05, 2026</p>
          </div>
        </div>

        {/* Itemization Table */}
        <div className="mb-10">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b-2 border-gray-900 text-xs font-black text-gray-800 uppercase tracking-wider">
                <th className="py-3">Item Description</th>
                <th className="py-3 text-center">Qty / Nights</th>
                <th className="py-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="text-sm font-bold text-gray-700">
              <tr className="border-b border-gray-100">
                <td className="py-4">Premium Suite (Room 101)</td>
                <td className="py-4 text-center">2</td>
                <td className="py-4 text-right">$312.00</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-4">Spa Service (Deep Tissue Massage)</td>
                <td className="py-4 text-center">1</td>
                <td className="py-4 text-right">$45.00</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-4">Dining Fee (In-room Dining)</td>
                <td className="py-4 text-center">1</td>
                <td className="py-4 text-right">$35.00</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Total Calculations */}
        <div className="flex justify-end">
          <div className="w-full md:w-1/2 space-y-3">
            <div className="flex justify-between text-sm font-bold text-gray-600">
              <span>Subtotal</span>
              <span>$392.00</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-gray-600">
              <span>Taxes (10%)</span>
              <span>$39.20</span>
            </div>
            <div className="flex justify-between text-sm font-black text-teal-600 pb-3 border-b border-gray-200">
              <span>Discount (SUMMER25)</span>
              <span>-$78.00</span>
            </div>
            <div className="flex justify-between items-end pt-2">
              <span className="text-sm font-black text-gray-800 uppercase tracking-wider">Total</span>
              <span className="text-3xl font-black text-gray-900">$353.20</span>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-16 pt-8 border-t border-gray-100 text-center">
          <p className="text-xs font-bold text-gray-400">Thank you for choosing HotelEase. We hope you enjoyed your stay!</p>
          <p className="text-[10px] font-bold text-gray-300 mt-1">This is a computer-generated invoice and does not require a signature.</p>
        </div>

      </div>
    </div>
  );
}

export default Invoicing;