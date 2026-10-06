import React from 'react';

function LegalPolicies() {
  return (
    <div className="max-w-[800px] mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Legal & Privacy Hub</h1>
        <p className="text-sm font-bold text-gray-500 mt-2">Last updated: October 2026</p>
      </div>

      <div className="space-y-8 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
        
        <section>
          <h2 className="text-2xl font-black text-teal-900 mb-4">1. Terms of Service</h2>
          <p className="text-sm font-medium text-gray-600 leading-relaxed">
            Welcome to HotelEase. By accessing our platform, you agree to comply with our terms and conditions. Our hotel management software is designed for both personal bookings and enterprise-level operations. Any misuse of our booking algorithms, API endpoints, or database structures will result in immediate termination of your account.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black text-teal-900 mb-4">2. Privacy & Data Protection</h2>
          <p className="text-sm font-medium text-gray-600 leading-relaxed mb-4">
            We value your privacy. Your personal information, including booking histories and payment methods, are strictly encrypted. 
          </p>
          <ul className="list-disc pl-5 text-sm font-medium text-gray-600 space-y-2">
            <li>We do not sell your personal data to third parties.</li>
            <li>AI Chatbot conversations are processed via secure Gemini API channels.</li>
            <li>You can request complete data deletion at any time by contacting support.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-black text-teal-900 mb-4">3. Cancellation & Refund Policy</h2>
          <p className="text-sm font-medium text-gray-600 leading-relaxed">
            Bookings can be canceled free of charge up to 48 hours before check-in. Cancellations made within 48 hours of the check-in date are subject to a one-night cancellation fee. Refunds are processed within 5-7 business days to the original payment method.
          </p>
        </section>
        
      </div>
    </div>
  );
}

export default LegalPolicies;