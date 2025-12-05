
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../constants';

const Auth = ({ onLogin }: { onLogin: () => void }) => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-kitenge-pattern bg-cream flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-sm max-w-md w-full rounded-3xl shadow-2xl p-8 md:p-12 border border-white/50 relative overflow-hidden">
        {/* Decorative circle */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-bl-full -mr-4 -mt-4 pointer-events-none"></div>
        
        <div className="flex justify-center mb-8">
          <Logo className="w-16 h-16 drop-shadow-sm" />
        </div>

        <h2 className="text-3xl font-serif font-bold text-teal-900 text-center mb-2 tracking-tight">
          {isLogin ? 'Welcome Back' : 'Join the Sisterhood'}
        </h2>
        <p className="text-center text-gray-500 mb-8 font-medium">
          {isLogin ? 'Enter your secure credentials.' : 'Create your digital safety account.'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
             <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700 ml-1">Full Name</label>
                <input 
                  type="text" 
                  className="w-full px-5 py-3.5 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:border-terracotta focus:ring-4 focus:ring-terracotta/10 transition-all duration-200 shadow-sm outline-none" 
                  placeholder="Jane Doe" 
                  required 
                />
             </div>
          )}
          
          <div className="space-y-1.5">
             <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
             <input 
                type="email" 
                className="w-full px-5 py-3.5 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:border-terracotta focus:ring-4 focus:ring-terracotta/10 transition-all duration-200 shadow-sm outline-none" 
                placeholder="jane@example.com" 
                required 
              />
          </div>

          <div className="space-y-1.5">
             <div className="flex justify-between items-center px-1">
                <label className="text-sm font-bold text-gray-700">Password</label>
                {isLogin && <button type="button" className="text-xs font-bold text-terracotta hover:underline">Forgot?</button>}
             </div>
             <input 
                type="password" 
                className="w-full px-5 py-3.5 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:border-terracotta focus:ring-4 focus:ring-terracotta/10 transition-all duration-200 shadow-sm outline-none" 
                placeholder="••••••••" 
                required 
              />
          </div>

          <button 
            type="submit" 
            className="w-full bg-teal-900 hover:bg-teal-800 text-white font-bold py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all active:scale-[0.98] mt-6 flex justify-center items-center gap-2"
          >
            {isLogin ? 'Secure Login' : 'Create Account'}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-gray-100 pt-6">
          <p className="text-gray-500 text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-terracotta font-bold hover:underline"
            >
                {isLogin ? "Sign up free" : "Log in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
