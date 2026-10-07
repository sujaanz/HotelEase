import React, { useState, useEffect } from 'react';
import axios from 'axios';

// --- Components ---
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// --- Public Pages ---
import Home from './pages/public/Home';
import RoomsSearch from './pages/public/RoomsSearch';
import Auth from './pages/public/Auth';
import AiConcierge from './pages/public/AiConcierge';
import BookingCheckout from './pages/public/BookingCheckout';
import Invoicing from './pages/public/Invoicing';
import LegalPolicies from './pages/public/LegalPolicies';
import SupportFeedback from './pages/public/SupportFeedback';

// --- Guest Pages ---
import GuestProfile from './pages/guest/GuestProfile';

// --- Admin Pages ---
import AdminDashboard from './pages/admin/AdminDashboard';
import FrontDesk from './pages/admin/FrontDesk';
import Housekeeping from './pages/admin/Housekeeping';
import PromoCodes from './pages/admin/PromoCodes';
import ChainManagement from './pages/admin/ChainManagement';
import AdvancedAnalytics from './pages/admin/AdvancedAnalytics';
import BanquetEvents from './pages/admin/BanquetEvents';
import ChannelManager from './pages/admin/ChannelManager';
import StaffRostering from './pages/admin/StaffRostering';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [userRole, setUserRole] = useState('guest'); // 'guest' অথবা 'admin'
  const [rooms, setRooms] = useState([]);
  
  // ব্যাকএন্ড ফ্লাস্ক সার্ভার থেকে রিয়েল রুমের ডেটা ফেচ করা
  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/rooms')
      .then(response => {
        setRooms(response.data);
      })
      .catch(error => {
        console.error("Error fetching rooms from backend:", error);
      });
  }, []);

  // পেজ রিলোড হলে লোকাল স্টোরেজ থেকে ইউজারের লগ-ইন চেক করা
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      const parsedUser = JSON.parse(user);
      setUserRole(parsedUser.role);
    }
  }, []);

  // পারফেক্ট লগ-আউট ফাংশন (যা Navbar-এ পাঠানো হবে)
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUserRole('guest');
    setCurrentPage('auth'); // লগ-আউটের পর লগইন পেজে রিডাইরেক্ট করবে
  };

  return (
    // মেইন কন্টেইনারটিকে গ্লোবাল ডার্ক থিম (bg-[#030303]) করে দেওয়া হয়েছে
    <div className="min-h-screen bg-[#030303] text-stone-200 flex flex-col justify-between font-sans selection:bg-cyan-500 selection:text-black relative overflow-hidden">
      
      {/* গ্লোবাল ডাইনামিক লাইটিং যা ট্রানজিশনগুলোকে আরও স্মুথ করবে */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col">
        {/* নেভিগেশন বার */}
        <Navbar 
          setCurrentPage={setCurrentPage} 
          userRole={userRole} 
          handleLogout={handleLogout} 
        />

        {/* মেইন কনটেন্ট ও রাউটিং */}
        <main className="flex-1 w-full relative">
          
          {/* Public Pages */}
          {currentPage === 'home' && <Home setCurrentPage={setCurrentPage} />}
          {currentPage === 'rooms' && <RoomsSearch rooms={rooms} setCurrentPage={setCurrentPage} />}
          
          {/* Auth পেজ */}
          {currentPage === 'auth' && <Auth setCurrentPage={setCurrentPage} setUserRole={setUserRole} />}
          
          {currentPage === 'aiconcierge' && <AiConcierge setCurrentPage={setCurrentPage} />}
          {currentPage === 'checkout' && <BookingCheckout setCurrentPage={setCurrentPage} />}
          {currentPage === 'invoicing' && <Invoicing setCurrentPage={setCurrentPage} />}
          {currentPage === 'legal' && <LegalPolicies setCurrentPage={setCurrentPage} />}
          {currentPage === 'support' && <SupportFeedback setCurrentPage={setCurrentPage} />}

          {/* Guest Pages */}
          {currentPage === 'profile' && <GuestProfile setCurrentPage={setCurrentPage} />}

          {/* Admin & Enterprise Pages */}
          {currentPage === 'admin' && <AdminDashboard setCurrentPage={setCurrentPage} />}
          {currentPage === 'frontdesk' && <FrontDesk setCurrentPage={setCurrentPage} />}
          {currentPage === 'housekeeping' && <Housekeeping setCurrentPage={setCurrentPage} />}
          {currentPage === 'promos' && <PromoCodes setCurrentPage={setCurrentPage} />}
          {currentPage === 'chain' && <ChainManagement setCurrentPage={setCurrentPage} />}
          {currentPage === 'analytics' && <AdvancedAnalytics setCurrentPage={setCurrentPage} />}
          {currentPage === 'events' && <BanquetEvents setCurrentPage={setCurrentPage} />}
          {currentPage === 'channel' && <ChannelManager setCurrentPage={setCurrentPage} />}
          {currentPage === 'staff' && <StaffRostering setCurrentPage={setCurrentPage} />}
        </main>
      </div>

      {/* ফুটার */}
      <div className="relative z-10">
        <Footer setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
}

export default App;