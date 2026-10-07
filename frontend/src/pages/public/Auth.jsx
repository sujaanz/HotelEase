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
    <div className="w-full min-h-[90vh] bg-[#030303] text-stone-200 font-sans selection:bg-teal-500 selection:text-white flex items-center justify-center px-4 py-12 relative overflow-hidden">
      
      {/* Background Ambient Glows (Matches Home.jsx) */}
      <div className="absolute top-[0%] left-[20%] w-[40%] h-[50%] bg-teal-500/10 blur-[150px] rounded-full animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[20%] w-[30%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full animate-pulse pointer-events-none" style={{ animationDelay: '2s' }}></div>

      <div className="w-full max-w-[440px] bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] p-8 md:p-10 shadow-[0_30px_60px_rgba(0,0,0,0.8)] relative z-10 group hover:border-teal-500/20 transition-all duration-500">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/5 border border-white/10 text-teal-400 font-black text-xl mb-5 shadow-[0_0_20px_rgba(20,184,166,0.1)] group-hover:scale-110 group-hover:bg-teal-500/10 group-hover:border-teal-500/30 transition-all duration-300">
            H
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-2">
            Hotel<span className="text-teal-400">Ease</span> System
          </h2>
          <div className="flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"></span>
            <p className="text-[10px] text-stone-400 font-bold tracking-widest uppercase">
              {isForgotMode 
                ? 'Security Recovery Protocol' 
                : (isLogin ? 'Encrypted Access Portal' : 'New Identity Registration')}
            </p>
          </div>
        </div>

        {/* Custom Tab Switcher */}
        {!isForgotMode && (
          <div className="bg-black/50 p-1.5 rounded-2xl border border-white/5 flex mb-8 shadow-inner">
            <button 
              type="button"
              onClick={() => handleTabSwitch(true)}
              className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${isLogin ? 'bg-teal-500 text-black shadow-[0_0_15px_rgba(20,184,166,0.3)]' : 'text-stone-500 hover:text-stone-300'}`}
            >
              Sign In
            </button>
            <button 
              type="button"
              onClick={() => handleTabSwitch(false)}
              className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${!isLogin ? 'bg-white/10 text-white border border-white/10 shadow-sm' : 'text-stone-500 hover:text-stone-300'}`}
            >
              Register
            </button>
          </div>
        )}

        {/* Status Alerts */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-[11px] font-bold p-4 rounded-xl mb-6 flex items-center gap-2.5 shadow-inner">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4 shrink-0"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {error}
          </div>
        )}

        {successMessage && (
          <div className="bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[11px] font-bold p-4 rounded-xl mb-6 flex items-center gap-2.5 shadow-inner">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4 shrink-0"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
            {successMessage}
          </div>
        )}

        {/* Forgot Password View */}
        {isForgotMode ? (
          <form onSubmit={handleForgotSubmit} className="space-y-5">
            <div>
              <label className="block text-[9px] font-black text-stone-500 uppercase tracking-widest mb-2">Registered Email</label>
              <input 
                type="email" 
                value={forgotEmail} 
                onChange={(e) => setForgotEmail(e.target.value)} 
                required 
                className="w-full px-5 py-4 rounded-xl bg-[#050505] border border-white/10 text-white placeholder-stone-600 focus:outline-none focus:border-teal-500/50 transition-all text-xs shadow-inner" 
                placeholder="identity@matrix.com" 
              />
            </div>

            <button 
              type="submit" 
              disabled={forgotLoading} 
              className="w-full bg-teal-500 hover:bg-teal-400 text-black text-[10px] font-black uppercase tracking-widest py-4 rounded-xl shadow-[0_0_20px_rgba(20,184,166,0.2)] hover:shadow-[0_0_30px_rgba(20,184,166,0.4)] transition-all duration-300 disabled:opacity-50 mt-2"
            >
              {forgotLoading ? 'Processing Request...' : 'Send Recovery Link'}
            </button>

            <div className="text-center pt-4">
              <button 
                type="button" 
                onClick={() => { setIsForgotMode(false); setError(''); setSuccessMessage(''); }}
                className="text-[9px] font-bold text-stone-500 hover:text-teal-400 uppercase tracking-widest transition-colors flex items-center justify-center gap-1.5 w-full"
              >
                ← Back to Login Module
              </button>
            </div>
          </form>
        ) : (
          /* Main Auth Form */
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-[9px] font-black text-stone-500 uppercase tracking-widest mb-2">Full Legal Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                  className="w-full px-5 py-4 rounded-xl bg-[#050505] border border-white/10 text-white placeholder-stone-600 focus:outline-none focus:border-teal-500/50 transition-all text-xs shadow-inner" 
                  placeholder="John Doe" 
                />
              </div>
            )}

            <div>
              <label className="block text-[9px] font-black text-stone-500 uppercase tracking-widest mb-2">Email Identity</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
                className="w-full px-5 py-4 rounded-xl bg-[#050505] border border-white/10 text-white placeholder-stone-600 focus:outline-none focus:border-teal-500/50 transition-all text-xs shadow-inner" 
                placeholder="identity@matrix.com" 
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-[9px] font-black text-stone-500 uppercase tracking-widest">Security Key (Password)</label>
                {isLogin && (
                  <button 
                    type="button" 
                    onClick={() => { setIsForgotMode(true); setError(''); setSuccessMessage(''); }}
                    className="text-[9px] font-bold text-teal-400 hover:text-teal-300 uppercase tracking-widest transition-colors"
                  >
                    Lost Key?
                  </button>
                )}
              </div>

              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  required 
                  className="w-full px-5 py-4 pr-16 rounded-xl bg-[#050505] border border-white/10 text-white placeholder-stone-600 focus:outline-none focus:border-teal-500/50 transition-all text-xs shadow-inner" 
                  placeholder="••••••••••••" 
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-black uppercase tracking-widest text-stone-500 hover:text-teal-400 transition-colors"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-gradient-to-r from-teal-600 to-teal-400 text-black text-[10px] font-black uppercase tracking-widest py-4 rounded-xl shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)] transition-all duration-300 mt-4 disabled:opacity-50 hover:scale-[1.02]"
            >
              {loading ? 'Authenticating...' : (isLogin ? 'Initialize Session' : 'Create Identity')}
            </button>
          </form>
        )}

        {/* Social Logins */}
        {!isForgotMode && (
          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-[9px] font-bold text-stone-600 uppercase tracking-widest mb-4">Or authenticate via provider</p>
            <div className="flex gap-3">
              <button 
                type="button" 
                onClick={() => alert("Google OAuth provider integration is ready.")} 
                className="flex-1 py-3.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl font-black text-stone-300 hover:text-white transition-all text-[10px] uppercase tracking-widest flex items-center justify-center gap-2"
              >
                Google
              </button>
              <button 
                type="button" 
                onClick={() => alert("GitHub OAuth provider integration is ready.")} 
                className="flex-1 py-3.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl font-black text-stone-300 hover:text-white transition-all text-[10px] uppercase tracking-widest flex items-center justify-center gap-2"
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