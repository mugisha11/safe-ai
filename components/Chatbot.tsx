import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, MapPin, Phone, Shield, ChevronDown } from 'lucide-react';
import { ChatMessage, generateBotResponse } from '../services/chatbotService';
import { CHATBOT_QUICK_REPLIES, HelpCenter } from '../constants';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Hello! I am DigiBot. I can help you with safety tips, reporting guides, or finding local support. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    // Add User Message
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: text,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Get Bot Response
    try {
      const botResponse = await generateBotResponse(text);
      setIsTyping(false);
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(inputText);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center hover:scale-110 ${isOpen ? 'bg-terracotta rotate-90' : 'bg-teal-900 animate-bounce-slow'}`}
        aria-label="Toggle Chatbot"
      >
        {isOpen ? <X color="white" size={28} /> : <MessageCircle color="#F2A66A" size={28} />}
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-24 right-6 w-[90vw] md:w-[400px] bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-50 flex flex-col transition-all duration-300 origin-bottom-right ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-10 pointer-events-none'}`}
        style={{ height: 'min(600px, 70vh)' }}
      >
        {/* Header */}
        <div className="bg-teal-900 p-4 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
             <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                <Shield className="text-gold" size={20} />
             </div>
             <div>
               <h3 className="font-bold text-white text-lg font-serif">DigiBot</h3>
               <div className="flex items-center space-x-1">
                 <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                 <span className="text-xs text-teal-200">Online • AI Assistant</span>
               </div>
             </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-teal-300 hover:text-white">
            <ChevronDown size={24} />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-cream bg-kitenge-pattern">
           {messages.map((msg) => (
             <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-teal-900 text-gold flex items-center justify-center mr-2 shrink-0 self-end mb-1">
                    <Shield size={14} />
                  </div>
                )}
                
                <div className={`max-w-[80%] space-y-2`}>
                  <div className={`p-3.5 rounded-2xl shadow-sm text-sm leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'bg-terracotta text-white rounded-br-none' 
                      : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                  }`}>
                    {msg.text}
                  </div>
                  
                  {/* Rich Content: Help Center List */}
                  {msg.type === 'help-center-list' && msg.data && (
                    <div className="space-y-2 mt-2 animate-fade-in-up">
                      {(msg.data as HelpCenter[]).map((center, idx) => (
                        <div key={idx} className="bg-white p-3 rounded-xl border-l-4 border-teal-500 shadow-sm hover:shadow-md transition-shadow">
                           <h4 className="font-bold text-teal-900 text-sm">{center.name}</h4>
                           <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                             <MapPin size={12} /> {center.city}, {center.country}
                           </p>
                           <a href={`tel:${center.phone}`} className="text-xs font-bold text-terracotta flex items-center gap-1 mt-2 hover:underline">
                             <Phone size={12} /> {center.phone}
                           </a>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
             </div>
           ))}
           
           {isTyping && (
             <div className="flex justify-start">
                <div className="w-8 h-8 rounded-full bg-teal-900 text-gold flex items-center justify-center mr-2 shrink-0 self-end mb-1">
                  <Shield size={14} />
                </div>
                <div className="bg-white p-4 rounded-2xl rounded-bl-none border border-gray-100 shadow-sm flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
             </div>
           )}
           <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white p-4 border-t border-gray-100 shrink-0">
          {/* Quick Replies */}
          {messages.length < 3 && (
             <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
               {CHATBOT_QUICK_REPLIES.map((qr, i) => (
                 <button 
                   key={i}
                   onClick={() => handleSend(qr)}
                   className="whitespace-nowrap px-3 py-1.5 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-100 hover:bg-teal-100 transition-colors"
                 >
                   {qr}
                 </button>
               ))}
             </div>
          )}

          <div className="flex items-center space-x-2">
            <input 
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask for help or safety tips..."
              className="flex-1 bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
            />
            <button 
              onClick={() => handleSend(inputText)}
              disabled={!inputText.trim() || isTyping}
              className="p-3 bg-teal-900 text-gold rounded-xl hover:bg-teal-800 disabled:opacity-50 transition-colors shadow-md"
            >
              <Send size={18} />
            </button>
          </div>
          <div className="text-center mt-2">
            <p className="text-[10px] text-gray-400">Bot responses are automated. In emergencies, call police.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;