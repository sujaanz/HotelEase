import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

function AiConcierge({ setCurrentPage }) {
  const formatTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const [aiPersona, setAiPersona] = useState('Concierge'); // 'Concierge', 'Tech Guide', 'Dining Expert'
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Greetings. I am your HotelEase Neural Concierge. How may I assist your stay today?', time: formatTime() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [ttsActive, setTtsActive] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages, isTyping]);

  const speakText = (text) => {
    if ('speechSynthesis' in window && ttsActive) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSend = (text = input) => {
    if (!text.trim()) return;

    const newMessages = [...messages, { sender: 'user', text, time: formatTime() }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    axios.post('http://127.0.0.1:5000/api/chat', { message: `[Mode: ${aiPersona}] ${text}` })
      .then(response => {
        const replyText = response.data.reply;
        setMessages([...newMessages, { sender: 'ai', text: replyText, time: formatTime() }]);
        setIsTyping(false);
        speakText(replyText);
      })
      .catch(error => {
        console.error("Chat error:", error);
        const errText = "Connection interrupted. Please ensure the secure backend server is operational.";
        setMessages([...newMessages, { sender: 'ai', text: errText, time: formatTime() }]);
        setIsTyping(false);
      });
  };

  // Voice Input (Web Speech API)
  const handleVoiceCommand = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice recognition is not supported in this browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard.");
  };

  const handleClearSession = () => {
    setMessages([{ sender: 'ai', text: 'Session reset complete. How may I assist you now?', time: formatTime() }]);
  };

  const handleExportChat = () => {
    const chatLog = messages.map(m => `[${m.time}] ${m.sender.toUpperCase()}: ${m.text}`).join('\n');
    const blob = new Blob([chatLog], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'HotelEase_AI_ChatLog.txt';
    a.click();
  };

  const quickQuestions = [
    "What time is check-in?",
    "Do you have a spa?",
    "Arrange an airport pickup",
    "Unlock my suite door"
  ];

  return (
    <div className="w-full min-h-[100vh] bg-[#020202] text-stone-200 font-sans selection:bg-cyan-500 selection:text-black pt-8 pb-20 px-4 md:px-8 relative overflow-hidden flex flex-col items-center">
      
      {/* Background Holographic Glows (Consistent with Home, Checkout & Profile) */}
      <div className="absolute top-[0%] left-[20%] w-[50%] h-[50%] bg-teal-500/10 blur-[150px] rounded-full animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[20%] w-[40%] h-[40%] bg-cyan-600/10 blur-[150px] rounded-full animate-pulse pointer-events-none" style={{ animationDelay: '2s' }}></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <div className="w-full max-w-[1300px] h-[88vh] flex flex-col bg-[#050505] border border-white/5 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.8)] relative z-10 overflow-hidden group hover:border-cyan-500/20 transition-all duration-500">

        {/* Top Header & Telemetry Bar (Matches Profile & Checkout Header Style) */}
        <div className="bg-[#080808] border-b border-white/5 p-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4 backdrop-blur-2xl">
          
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-teal-500/10 border border-teal-500/30 rounded-2xl flex items-center justify-center shadow-inner relative">
                <span className="text-teal-400 font-black text-base tracking-widest uppercase">AI</span>
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-teal-400 border-2 border-[#050505] rounded-full animate-pulse shadow-[0_0_10px_#2dd4bf]"></span>
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-black text-white tracking-tight">Virtual Concierge</h1>
                <p className="text-[9px] font-black text-teal-400 uppercase tracking-[0.2em]">{aiPersona} Matrix Active</p>
              </div>
            </div>
          </div>

          {/* Persona Mode Pills */}
          <div className="flex bg-[#0a0a0a] p-1.5 rounded-xl border border-white/5 shadow-inner overflow-x-auto hide-scrollbar">
            {['Concierge', 'Tech Guide', 'Dining Expert'].map((mode) => (
              <button 
                key={mode}
                onClick={() => setAiPersona(mode)}
                className={`px-4 py-2 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${aiPersona === mode ? 'bg-teal-500/20 text-teal-400 border border-teal-500/40 shadow-[0_0_15px_rgba(20,184,166,0.2)]' : 'text-stone-500 hover:text-stone-300'}`}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* Action Tools & Linked Exit Button */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setTtsActive(!ttsActive)}
              title="Toggle Voice Readout"
              className={`p-3 rounded-xl border transition-all text-xs ${ttsActive ? 'bg-teal-500/20 border-teal-500/40 text-teal-400 shadow-[0_0_10px_rgba(20,184,166,0.2)]' : 'bg-white/5 border-white/10 text-stone-400 hover:text-white'}`}
            >
              🔊
            </button>
            <button 
              onClick={handleExportChat}
              title="Export Transcript"
              className="px-3.5 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-stone-400 text-[9px] font-black uppercase tracking-widest transition-colors"
            >
              Export
            </button>
            <button 
              onClick={handleClearSession}
              title="Reset Session"
              className="px-3.5 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 text-[9px] font-black uppercase tracking-widest transition-colors"
            >
              Reset
            </button>
            <button 
              onClick={() => setCurrentPage ? setCurrentPage('home') : window.location.href = '/'}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[9px] font-black uppercase tracking-widest hover:bg-cyan-500/20 shadow-sm ml-2 transition-all"
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              Exit Terminal
            </button>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          
          <div className="flex justify-center mb-4">
            <span className="bg-white/[0.02] border border-white/5 text-stone-400 text-[9px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full backdrop-blur-sm shadow-inner">
              Encrypted Quantum Protocol • Mode: {aiPersona}
            </span>
          </div>

          {messages.map((msg, idx) => (
            <div key={idx} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} animate-fade-in-up`}>
              <div className={`group relative max-w-[85%] md:max-w-[70%] p-5 text-xs md:text-sm font-medium leading-relaxed tracking-wide shadow-xl ${
                msg.sender === 'user' 
                  ? 'bg-gradient-to-r from-teal-600 to-teal-400 text-black rounded-[1.8rem] rounded-tr-sm font-bold shadow-[0_0_20px_rgba(20,184,166,0.3)]' 
                  : 'bg-[#0a0a0a] border border-white/5 text-stone-200 rounded-[1.8rem] rounded-tl-sm backdrop-blur-md'
              }`}>
                {msg.text}
                
                {/* Copy Button for AI Messages */}
                {msg.sender === 'ai' && (
                  <button 
                    onClick={() => handleCopy(msg.text)}
                    className="absolute -right-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-2 bg-white/5 border border-white/10 rounded-lg text-stone-400 hover:text-teal-400 hover:bg-white/10 transition-all duration-300"
                    title="Copy to clipboard"
                  >
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  </button>
                )}
              </div>
              <span className="text-[9px] font-bold text-stone-500 mt-2 uppercase tracking-widest px-1">
                {msg.time}
              </span>
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-[#0a0a0a] border border-white/5 p-5 rounded-[1.8rem] rounded-tl-sm flex items-center gap-2 shadow-lg backdrop-blur-md">
                <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Advanced Input Area */}
        <div className="bg-black/60 border-t border-white/5 p-6 md:p-8 backdrop-blur-xl">
          <div className="flex flex-wrap gap-2.5 mb-5">
            {quickQuestions.map((q, idx) => (
              <button 
                key={idx} 
                onClick={() => handleSend(q)} 
                className="bg-white/[0.02] border border-white/5 hover:border-teal-500/30 hover:bg-teal-500/10 text-stone-400 hover:text-teal-300 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2"
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-3 h-3"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                {q}
              </button>
            ))}
          </div>
          
          <div className="flex gap-3 relative">
            <div className="relative flex-1">
              <input 
                type="text" 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={`Ask ${aiPersona} anything about your stay...`} 
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl pl-6 pr-14 py-4 outline-none focus:border-teal-500/50 transition-all font-medium text-white placeholder-stone-600 shadow-inner text-xs md:text-sm"
              />
              {/* Voice Command Button */}
              <button 
                onClick={handleVoiceCommand}
                title="Use Voice Command"
                className={`absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-xl transition-all duration-300 ${isListening ? 'bg-teal-500/20 text-teal-400 animate-pulse shadow-[0_0_15px_rgba(20,184,166,0.3)]' : 'text-stone-500 hover:text-teal-400 hover:bg-white/5'}`}
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
              </button>
            </div>
            
            <button 
              onClick={() => handleSend()} 
              disabled={!input.trim() && !isListening}
              className="bg-gradient-to-r from-teal-600 to-teal-400 hover:from-teal-500 hover:to-teal-300 disabled:opacity-50 disabled:hover:from-teal-600 text-black px-6 md:px-8 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 shadow-[0_0_20px_rgba(20,184,166,0.2)] hover:shadow-[0_0_30px_rgba(20,184,166,0.4)] flex items-center justify-center gap-2 shrink-0"
            >
              <span className="hidden md:inline">Transmit</span>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AiConcierge;