import React, { useState } from 'react';
import axios from 'axios';

function Auth({ setCurrentPage, setUserRole }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!formData.email) {
      alert("Please enter your email address first to reset password.");
      return;
    }
    alert("Password reset link has been sent to " + formData.email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const url = isLogin ? 'http://127.0.0.1:5000/api/login' : 'http://127.0.0.1:5000/api/register';
    
    const payload = isLogin 
      ? { email: formData.email, password: formData.password } 
      : formData;

    axios.post(url, payload)
      .then(response => {
        setLoading(false);
        
        // আধুনিক JWT টোকেন ও ইউজার ডেটা লোকাল স্টোরেজে সেভ করা
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }

        const user = response.data.user;
        if (setUserRole) setUserRole(user.role);
        
        if (user.role === 'admin') {
          setCurrentPage('admin');
        } else {
          setCurrentPage('profile');
        }
      })
      .catch(err => {
        setLoading(false);
        setError(err.response?.data?.error || 'An error occurred. Is the server running?');
      });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        
        {/* Header */}
        <div className="bg-teal-900 px-8 py-10 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-teal-800 rounded-full mix-blend-multiply filter blur-2xl opacity-50"></div>
          <h2 className="text-3xl font-black text-white relative z-10 tracking-tight">
            Hotel<span className="text-teal-400">Ease</span>
          </h2>
          <p className="text-teal-200 text-xs font-bold mt-2 relative z-10 uppercase tracking-widest">
            {isLogin ? 'Welcome Back' : 'Join the Elite'}
          </p>
        </div>

        {/* Form */}
        <div className="p-8">
          <div className="flex justify-center gap-4 mb-8">
            <button 
              onClick={() => { setIsLogin(true); setError(''); }} 
              className={`text-sm font-black uppercase tracking-wider pb-2 border-b-2 transition ${isLogin ? 'text-teal-800 border-teal-800' : 'text-gray-400 border-transparent hover:text-gray-600'}`}
            >
              Sign In
            </button>
            <button 
              onClick={() => { setIsLogin(false); setError(''); }} 
              className={`text-sm font-black uppercase tracking-wider pb-2 border-b-2 transition ${!isLogin ? 'text-teal-800 border-teal-800' : 'text-gray-400 border-transparent hover:text-gray-600'}`}
            >
              Create Account
            </button>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-xs font-bold p-3 rounded-lg mb-4 border border-red-200 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-600 outline-none text-sm font-medium text-gray-900" 
                  placeholder="Sk Sujaan Mondal" 
                />
              </div>
            )}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-600 outline-none text-sm font-medium text-gray-900" 
                placeholder="sujaan@example.com" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Password</label>
              <input 
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                required 
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-600 outline-none text-sm font-medium text-gray-900" 
                placeholder="••••••••" 
              />
            </div>

            {isLogin && (
              <div className="text-right">
                <button 
                  type="button" 
                  onClick={handleForgotPassword} 
                  className="text-xs font-bold text-teal-600 hover:text-teal-800 transition"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading} 
              className={`w-full text-white font-black py-4 rounded-xl transition shadow-lg mt-4 ${loading ? 'bg-teal-600 cursor-not-allowed' : 'bg-teal-800 hover:bg-teal-900'}`}
            >
              {loading ? 'PROCESSING...' : (isLogin ? 'SIGN IN' : 'CREATE ACCOUNT')}
            </button>
          </form>

          {/* Social Login */}
          <div className="mt-8 text-center">
            <p className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider">Or continue with</p>
            <div className="flex gap-3">
              <button type="button" onClick={() => alert("Google Login integration ready.")} className="flex-1 py-3 border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition shadow-sm text-xs">Google</button>
              <button type="button" onClick={() => alert("GitHub Login integration ready.")} className="flex-1 py-3 border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition shadow-sm text-xs">GitHub</button>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Auth;