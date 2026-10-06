import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

function AiConcierge() {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hello! I am your HotelEase AI Concierge ✨. How can I make your stay more comfortable today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages, isTyping]);

  const handleSend = (text = input) => {
    if (!text.trim()) return;

    // ইউজারের মেসেজ অ্যাড করা
    const newMessages = [...messages, { sender: 'user', text }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    // ফ্লাস্ক ব্যাকএন্ডে API কল করা
    axios.post('http://127.0.0.1:5000/api/chat', { message: text })
      .then(response => {
        setMessages([...newMessages, { sender: 'ai', text: response.data.reply }]);
        setIsTyping(false);
      })
      .catch(error => {
        console.error("Chat error:", error);
        setMessages([...newMessages, { sender: 'ai', text: "I'm having trouble connecting to the server. Please check if the backend is running." }]);
        setIsTyping(false);
      });
  };

  const quickQuestions = [
    "What time is check-in?",
    "Do you have a spa?",
    "Can you arrange an airport pickup?"
  ];

  return (
    <div className="max-w-[1000px] mx-auto px-4 py-8 h-[85vh] flex flex-col">
      {/* Header */}
      <div className="bg-teal-900 text-white p-6 rounded-t-3xl shadow-md flex justify-between items-center z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-teal-800 border-2 border-teal-400 rounded-full flex items-center justify-center text-2xl shadow-lg relative">
            🤖<span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-teal-900 rounded-full"></span>
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight">HotelEase AI Concierge</h1>
            <p className="text-xs font-bold text-teal-300">Powered by Gemini AI</p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-white border-x border-gray-200 overflow-y-auto p-6 space-y-6 shadow-inner relative">
        <div className="flex justify-center mb-6">
          <span className="bg-gray-100 text-gray-400 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">Today</span>
        </div>

        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] p-4 rounded-2xl text-sm font-semibold shadow-sm ${
              msg.sender === 'user' ? 'bg-teal-700 text-white rounded-tr-none' : 'bg-gray-50 border border-gray-100 text-gray-800 rounded-tl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-50 border border-gray-100 p-4 rounded-2xl rounded-tl-none flex gap-1 shadow-sm">
              <span className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
              <span className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-gray-50 p-6 rounded-b-3xl border border-t-0 border-gray-200 shadow-sm">
        <div className="flex flex-wrap gap-2 mb-4">
          {quickQuestions.map((q, idx) => (
            <button key={idx} onClick={() => handleSend(q)} className="bg-white border border-teal-100 text-teal-700 hover:bg-teal-50 px-3 py-1.5 rounded-full text-xs font-bold transition shadow-sm">
              {q}
            </button>
          ))}
        </div>
        <div className="flex gap-3">
          <input 
            type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me anything..." 
            className="flex-1 bg-white border border-gray-300 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-teal-600 transition font-medium text-gray-800 shadow-sm"
          />
          <button onClick={() => handleSend()} className="bg-teal-800 hover:bg-teal-900 text-white px-6 rounded-xl font-black transition shadow-md">
            Send 
          </button>
        </div>
      </div>
    </div>
  );
}

export default AiConcierge;