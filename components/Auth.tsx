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
      <div className="bg-white max-w-md w-full rounded-3xl shadow-xl p-8 md:p-12 border border-orange-100 relative overflow-hidden">
        {/* Decorative circle */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-bl-full -mr-4 -mt-4"></div>
        
        <div className="flex justify-center mb-8">
          <Logo className="w-16 h-16" />
        </div>

        <h2 className="text-3xl font-serif font-bold text-teal-900 text-center mb-2">
          {isLogin ? 'Welcome Back' : 'Join the Sisterhood'}
        </h2>
        <p className="text-center text-gray-500 mb-8">
          {isLogin ? 'Enter your secure credentials.' : 'Create your digital safety account.'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
             <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700">Full Name</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-terracotta focus:ring-terracotta" placeholder="Jane Doe" required />
             </div>
          )}
          
          <div className="space-y-1">
             <label className="text-sm font-bold text-gray-700">Email Address</label>
             <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-terracotta focus:ring-terracotta" placeholder="jane@example.com" required />
          </div>

          <div className="space-y-1">
             <label className="text-sm font-bold text-gray-700">Password</label>
             <input type="password" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-terracotta focus:ring-terracotta" placeholder="••••••••" required />
          </div>

          <button type="submit" className="w-full bg-teal-900 hover:bg-teal-800 text-white font-bold py-4 rounded-xl shadow-lg transition-transform active:scale-95 mt-4">
            {isLogin ? 'Secure Login' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-terracotta font-bold text-sm hover:underline"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
