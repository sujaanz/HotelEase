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

// মডার্ন আর্কিটেকচার: Axios Interceptor
// এটি প্রতিবার API কল করার সময় ইউজারের টোকেনটি হেডারে (Headers) সেট করে দেবে
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [userRole, setUserRole] = useState('guest'); 
  const [rooms, setRooms] = useState([]);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      setUserRole(JSON.parse(user).role);
    }
  }, []);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/rooms')
      .then(response => {
        setRooms(response.data);
      })
      .catch(error => {
        console.error("Error fetching rooms:", error);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUserRole('guest');
    setCurrentPage('home');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between font-sans">
      <div>
        <Navbar setCurrentPage={setCurrentPage} userRole={userRole} handleLogout={handleLogout} />

        <main className="py-2">
          {currentPage === 'home' && <Home setCurrentPage={setCurrentPage} />}
          {currentPage === 'rooms' && <RoomsSearch rooms={rooms} setCurrentPage={setCurrentPage} />}
          {currentPage === 'auth' && <Auth setCurrentPage={setCurrentPage} setUserRole={setUserRole} />}
          {currentPage === 'aiconcierge' && <AiConcierge />}
          {currentPage === 'checkout' && <BookingCheckout setCurrentPage={setCurrentPage} />}
          {currentPage === 'invoicing' && <Invoicing setCurrentPage={setCurrentPage} />}
          {currentPage === 'legal' && <LegalPolicies />}
          {currentPage === 'support' && <SupportFeedback />}

          {currentPage === 'profile' && <GuestProfile />}

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
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default App;