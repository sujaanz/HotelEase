import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

function AiConcierge() {
  const formatTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Greetings. I am the HotelEase AI Concierge. How may I assist you with your stay today?', time: formatTime() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages, isTyping]);

  const handleSend = (text = input) => {
    if (!text.trim()) return;

    const newMessages = [...messages, { sender: 'user', text, time: formatTime() }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    axios.post('http://127.0.0.1:5000/api/chat', { message: text })
      .then(response => {
        setMessages([...newMessages, { sender: 'ai', text: response.data.reply, time: formatTime() }]);
        setIsTyping(false);
      })
      .catch(error => {
        console.error("Chat error:", error);
        setMessages([...newMessages, { sender: 'ai', text: "Connection interrupted. Please ensure the secure backend server is operational.", time: formatTime() }]);
        setIsTyping(false);
      });
  };

  // Modern Feature: Voice Input (Web Speech API)
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

  // Modern Feature: Copy AI Response
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  // Modern Feature: Clear Chat Session
  const handleClearSession = () => {
    setMessages([{ sender: 'ai', text: 'Session reset complete. How may I assist you now?', time: formatTime() }]);
  };

  const quickQuestions = [
    "What time is check-in?",
    "Do you have a spa?",
    "Arrange an airport pickup"
  ];

  return (
    <div className="w-full min-h-[90vh] bg-[#070707] text-stone-200 font-sans selection:bg-teal-500 selection:text-white px-4 md:px-10 py-10 flex flex-col items-center">
      
      <div className="w-full max-w-[1050px] h-[85vh] flex flex-col bg-gradient-to-br from-white/[0.07] via-white/[0.03] to-transparent backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative overflow-hidden">
        
        {/* Ambient Background Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Header with Clear Session Action */}
        <div className="bg-white/[0.03] border-b border-white/10 p-5 md:px-8 flex justify-between items-center z-10 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-teal-500/10 border border-teal-500/30 rounded-2xl flex items-center justify-center shadow-inner relative">
              <span className="text-teal-400 font-black text-lg tracking-widest uppercase">AI</span>
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-teal-400 border-2 border-[#070707] rounded-full animate-pulse"></span>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-light text-white tracking-tight">Virtual Concierge</h1>
              <p className="text-[10px] font-bold text-teal-500 uppercase tracking-widest mt-0.5">Intelligence Matrix Active</p>
            </div>
          </div>
          <button 
            onClick={handleClearSession}
            title="Reset Session"
            className="p-2.5 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 transition-all duration-300 text-stone-400 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            <span className="hidden md:block">Reset</span>
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 z-10 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          
          <div className="flex justify-center mb-6">
            <span className="bg-white/[0.05] border border-white/10 text-stone-400 text-[9px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full backdrop-blur-sm">
              Secure Channel Open
            </span>
          </div>

          {messages.map((msg, idx) => (
            <div key={idx} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} animate-fade-in-up`}>
              <div className={`group relative max-w-[85%] md:max-w-[70%] p-5 text-sm font-medium leading-relaxed tracking-wide shadow-lg ${
                msg.sender === 'user' 
                  ? 'bg-gradient-to-br from-teal-600 to-teal-800 text-white rounded-3xl rounded-tr-sm border border-teal-500/30' 
                  : 'bg-white/[0.05] border border-white/10 text-stone-200 rounded-3xl rounded-tl-sm backdrop-blur-md'
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
              <div className="bg-white/[0.05] border border-white/10 p-5 rounded-3xl rounded-tl-sm flex items-center gap-2 shadow-lg backdrop-blur-md">
                <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Advanced Input Area */}
        <div className="bg-black/40 border-t border-white/10 p-6 md:p-8 z-10 backdrop-blur-xl">
          <div className="flex flex-wrap gap-3 mb-5">
            {quickQuestions.map((q, idx) => (
              <button 
                key={idx} 
                onClick={() => handleSend(q)} 
                className="bg-white/[0.03] border border-white/10 hover:border-teal-500/50 hover:bg-teal-500/10 text-stone-300 hover:text-teal-300 px-4 py-2 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all duration-300 flex items-center gap-2"
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-3 h-3"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
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
                placeholder="Type your inquiry here..." 
                className="w-full bg-[#121212]/80 border border-white/10 rounded-2xl pl-6 pr-14 py-4 outline-none focus:border-teal-500/50 focus:bg-[#1a1a1a]/90 transition-all font-medium text-white placeholder-stone-600 shadow-inner text-sm"
              />
              {/* Voice Command Button */}
              <button 
                onClick={handleVoiceCommand}
                title="Use Voice Command"
                className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all duration-300 ${isListening ? 'bg-teal-500/20 text-teal-400 animate-pulse' : 'text-stone-500 hover:text-teal-400 hover:bg-white/5'}`}
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
              </button>
            </div>
            
            <button 
              onClick={() => handleSend()} 
              disabled={!input.trim() && !isListening}
              className="bg-teal-600 hover:bg-teal-500 disabled:opacity-50 disabled:hover:bg-teal-600 text-white px-6 md:px-8 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(20,184,166,0.2)] hover:shadow-[0_0_30px_rgba(20,184,166,0.4)] flex items-center justify-center gap-2"
            >
              <span className="hidden md:inline">Transmit</span>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AiConcierge;