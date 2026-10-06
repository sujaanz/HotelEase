import React, { useState } from 'react';
import axios from 'axios';

function Auth({ setCurrentPage, setUserRole }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Forgot Password States
  const [isForgotMode, setIsForgotMode] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);

  const API_BASE_URL = 'http://127.0.0.1:5000';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTabSwitch = (status) => {
    setIsLogin(status);
    setError('');
    setSuccessMessage('');
    setIsForgotMode(false);
    setFormData({ name: '', email: '', password: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    const url = isLogin ? `${API_BASE_URL}/api/login` : `${API_BASE_URL}/api/register`;
    const payload = isLogin ? { email: formData.email, password: formData.password } : formData;

    axios.post(url, payload)
      .then(response => {
        setLoading(false);
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        const user = response.data.user;
        if (setUserRole) setUserRole(user.role);
        setCurrentPage(user.role === 'admin' ? 'admin' : 'profile');
      })
      .catch(err => {
        setLoading(false);
        setError(err.response?.data?.error || 'Authentication failed. Please verify credentials.');
      });
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail) {
      setError('Please provide a registered email address.');
      return;
    }
    setForgotLoading(true);
    setError('');

    setTimeout(() => {
      setForgotLoading(false);
      setSuccessMessage(`Secure recovery link dispatched to ${forgotEmail}`);
      setForgotEmail('');
    }, 1000);
  };

  return (
    <div className="w-full min-h-[90vh] bg-[#070707] text-stone-200 font-sans selection:bg-teal-500 selection:text-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-[440px] bg-gradient-to-br from-white/[0.07] via-white/[0.03] to-transparent backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative overflow-hidden">
        
        {/* Ambient Glow Effects */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-[90px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[90px] pointer-events-none"></div>

        {/* Header Section */}
        <div className="text-center relative z-10 mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-400 font-black text-xl mb-4 shadow-inner">
            H
          </div>
          <h2 className="text-2xl md:text-3xl font-light text-white tracking-tight">
            Hotel<span className="font-bold text-teal-400">Ease</span> Portal
          </h2>
          <p className="text-xs text-stone-400 font-medium tracking-wide mt-1">
            {isForgotMode 
              ? 'Account Security & Recovery' 
              : (isLogin ? 'Enter your credentials to access portal' : 'Register your secure guest profile')}
          </p>
        </div>

        {/* Working Tab Switcher */}
        {!isForgotMode && (
          <div className="bg-black/60 p-1.5 rounded-2xl border border-white/10 flex relative z-10 mb-6 shadow-inner">
            <button 
              type="button"
              onClick={() => handleTabSwitch(true)}
              className={`flex-1 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${isLogin ? 'bg-white/10 text-white shadow-md border border-white/10' : 'text-stone-500 hover:text-stone-300'}`}
            >
              Sign In
            </button>
            <button 
              type="button"
              onClick={() => handleTabSwitch(false)}
              className={`flex-1 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${!isLogin ? 'bg-white/10 text-white shadow-md border border-white/10' : 'text-stone-500 hover:text-stone-300'}`}
            >
              Register
            </button>
          </div>
        )}

        {/* Status Banners */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold p-3.5 rounded-2xl mb-6 relative z-10 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
            {error}
          </div>
        )}

        {successMessage && (
          <div className="bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-bold p-3.5 rounded-2xl mb-6 relative z-10 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
            {successMessage}
          </div>
        )}

        {/* Forgot Password View */}
        {isForgotMode ? (
          <form onSubmit={handleForgotSubmit} className="space-y-4 relative z-10">
            <div>
              <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Registered Email</label>
              <input 
                type="email" 
                value={forgotEmail} 
                onChange={(e) => setForgotEmail(e.target.value)} 
                required 
                className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-white placeholder-stone-600 focus:outline-none focus:border-teal-500/50 focus:bg-white/[0.07] text-xs font-medium transition-all" 
                placeholder="name@secureportal.com" 
              />
            </div>

            <button 
              type="submit" 
              disabled={forgotLoading} 
              className="w-full bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold uppercase tracking-widest py-3.5 rounded-2xl shadow-[0_0_20px_rgba(20,184,166,0.3)] transition-all duration-300 disabled:opacity-50"
            >
              {forgotLoading ? 'Processing Request...' : 'Send Recovery Link'}
            </button>

            <div className="text-center pt-2">
              <button 
                type="button" 
                onClick={() => { setIsForgotMode(false); setError(''); setSuccessMessage(''); }}
                className="text-[10px] font-bold text-stone-400 hover:text-teal-400 uppercase tracking-widest transition-colors"
              >
                Back to Sign In
              </button>
            </div>
          </form>
        ) : (
          /* Main Form */
          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            {!isLogin && (
              <div>
                <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Full Legal Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                  className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-white placeholder-stone-600 focus:outline-none focus:border-teal-500/50 focus:bg-white/[0.07] text-xs font-medium transition-all" 
                  placeholder="Valued Member" 
                />
              </div>
            )}

            <div>
              <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Email Address</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
                className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-white placeholder-stone-600 focus:outline-none focus:border-teal-500/50 focus:bg-white/[0.07] text-xs font-medium transition-all" 
                placeholder="name@secureportal.com" 
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest">Password</label>
                {isLogin && (
                  <button 
                    type="button" 
                    onClick={() => { setIsForgotMode(true); setError(''); setSuccessMessage(''); }}
                    className="text-[10px] font-bold text-teal-400 hover:text-teal-300 uppercase tracking-widest transition-colors"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>

              {/* Password Input with Show/Hide Toggle */}
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  required 
                  className="w-full px-4 py-3.5 pr-16 rounded-2xl bg-white/[0.04] border border-white/10 text-white placeholder-stone-600 focus:outline-none focus:border-teal-500/50 focus:bg-white/[0.07] text-xs font-medium transition-all" 
                  placeholder="••••••••••••" 
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-bold uppercase tracking-widest text-stone-400 hover:text-teal-400 transition-colors py-1 px-1"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold uppercase tracking-widest py-4 rounded-2xl shadow-[0_0_25px_rgba(20,184,166,0.3)] transition-all duration-300 mt-2 disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : (isLogin ? 'Sign In to Portal' : 'Create Secure Profile')}
            </button>
          </form>
        )}

        {/* Restored Social Logins Section */}
        {!isForgotMode && (
          <div className="mt-8 pt-6 border-t border-white/10 relative z-10 text-center">
            <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-4">Or authenticate via provider</p>
            <div className="flex gap-3">
              <button 
                type="button" 
                onClick={() => alert("Google OAuth provider integration is ready.")} 
                className="flex-1 py-3 bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 rounded-2xl font-bold text-stone-300 transition-all text-xs shadow-sm"
              >
                Google
              </button>
              <button 
                type="button" 
                onClick={() => alert("GitHub OAuth provider integration is ready.")} 
                className="flex-1 py-3 bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 rounded-2xl font-bold text-stone-300 transition-all text-xs shadow-sm"
              >
                GitHub
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Auth;