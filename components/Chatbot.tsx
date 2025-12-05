import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, MapPin, Phone, Shield, ChevronDown, Navigation, AlertCircle } from 'lucide-react';
import { ChatMessage, generateBotResponse, processUserLocation, ScoredHelpCenter } from '../services/chatbotService';
import { CHATBOT_QUICK_REPLIES } from '../constants';

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
  const [isLocating, setIsLocating] = useState(false);
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

  // --- LOCATION HANDLING ---
  const handleAllowLocation = () => {
    setIsLocating(true);
    if (!navigator.geolocation) {
       addBotMessage("Geolocation is not supported by your browser. Please type your city name instead.");
       setIsLocating(false);
       return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        // User message confirming action
        setMessages(prev => [...prev, {
            id: Date.now().toString(),
            sender: 'user',
            text: "📍 Location shared",
            timestamp: new Date()
        }]);
        
        // Fetch results
        try {
            const resultMessage = await processUserLocation(latitude, longitude);
            setMessages(prev => [...prev, resultMessage]);
        } catch (e) {
            addBotMessage("Sorry, I had trouble finding centers near you. Try typing your city name.");
        } finally {
            setIsLocating(false);
        }
      },
      (error) => {
        setIsLocating(false);
        console.error(error);
        addBotMessage("Location access denied. Please type your city name (e.g., 'Nairobi') to find help.");
      }
    );
  };

  const handleDenyLocation = () => {
    setMessages(prev => [...prev, {
        id: Date.now().toString(),
        sender: 'user',
        text: "No, I prefer not to share.",
        timestamp: new Date()
    }]);
    setIsTyping(true);
    setTimeout(() => {
        setIsTyping(false);
        addBotMessage("Understood. Please type your city name so I can list available centers nearby.");
    }, 1000);
  };

  const addBotMessage = (text: string) => {
      setMessages(prev => [...prev, {
          id: Date.now().toString(),
          sender: 'bot',
          text,
          timestamp: new Date()
      }]);
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
                
                <div className={`max-w-[85%] space-y-2`}>
                  <div className={`p-3.5 rounded-2xl shadow-sm text-sm leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'bg-terracotta text-white rounded-br-none' 
                      : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                  }`}>
                    {msg.text}
                  </div>

                  {/* --- TYPE: LOCATION REQUEST --- */}
                  {msg.type === 'location-request' && (
                      <div className="bg-white p-4 rounded-xl border border-teal-100 shadow-md animate-fade-in-up">
                          <p className="text-xs font-bold text-teal-900 mb-2 flex items-center gap-1">
                              <MapPin size={12} className="text-terracotta"/>
                              Permission Required
                          </p>
                          <p className="text-xs text-gray-600 mb-3">Do you allow me to use your GPS location to find the nearest help center?</p>
                          <div className="flex gap-2">
                              <button 
                                onClick={handleAllowLocation}
                                disabled={isLocating}
                                className="flex-1 bg-teal-900 text-white text-xs font-bold py-2 rounded-lg hover:bg-teal-800 transition-colors flex items-center justify-center gap-1"
                              >
                                  {isLocating ? 'Locating...' : 'Allow'}
                              </button>
                              <button 
                                onClick={handleDenyLocation}
                                disabled={isLocating}
                                className="flex-1 bg-gray-100 text-gray-600 text-xs font-bold py-2 rounded-lg hover:bg-gray-200 transition-colors"
                              >
                                  Deny
                              </button>
                          </div>
                      </div>
                  )}
                  
                  {/* --- TYPE: HELP CENTER RESULTS --- */}
                  {msg.type === 'help-center-list' && msg.data && (
                    <div className="space-y-3 mt-2 animate-fade-in-up w-full">
                      {/* Emergency Banner */}
                      <div className="bg-red-50 border border-red-100 p-3 rounded-xl flex items-start gap-3">
                          <AlertCircle className="text-red-600 shrink-0" size={18} />
                          <div>
                              <p className="text-xs font-bold text-red-700">In Danger?</p>
                              <p className="text-xs text-red-600">Call Emergency: <span className="font-bold text-lg block">{msg.data.emergencyNumber}</span></p>
                          </div>
                      </div>

                      {/* Center Cards */}
                      {(msg.data.centers as ScoredHelpCenter[]).map((center, idx) => (
                        <div key={idx} className="bg-white p-3 rounded-xl border-l-4 border-teal-500 shadow-sm hover:shadow-md transition-shadow">
                           <div className="flex justify-between items-start">
                                <h4 className="font-bold text-teal-900 text-sm">{center.name}</h4>
                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${center.type === 'Police' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                                    {center.type}
                                </span>
                           </div>
                           
                           <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                             <MapPin size={12} /> {center.distance ? `${center.distance.toFixed(1)} km away` : center.city}
                           </p>
                           
                           <div className="flex gap-2 mt-3">
                               <a 
                                 href={`tel:${center.phone}`} 
                                 className="flex-1 bg-teal-50 text-teal-800 text-xs font-bold py-1.5 rounded hover:bg-teal-100 flex items-center justify-center gap-1 transition-colors"
                               >
                                 <Phone size={12} /> Call
                               </a>
                               <a 
                                 href={`https://www.google.com/maps/dir/?api=1&destination=${center.lat},${center.lng}`}
                                 target="_blank"
                                 rel="noreferrer"
                                 className="flex-1 bg-gray-50 text-gray-700 text-xs font-bold py-1.5 rounded hover:bg-gray-100 flex items-center justify-center gap-1 transition-colors"
                               >
                                 <Navigation size={12} /> Map
                               </a>
                           </div>
                        </div>
                      ))}

                      {/* Safety Tip */}
                      {msg.data.tip && (
                          <div className="bg-gold/10 p-3 rounded-xl border border-gold/20 text-center">
                              <p className="text-[10px] font-bold text-terracotta uppercase tracking-wider mb-1">Safety Tip</p>
                              <p className="text-xs text-gray-700 italic">"{msg.data.tip}"</p>
                          </div>
                      )}
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
