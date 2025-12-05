
import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../constants';

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col bg-cream font-sans text-charcoal">
      {/* Public Navigation */}
      <nav className="px-6 md:px-12 py-4 flex justify-between items-center bg-white sticky top-0 z-40 border-b border-gray-100 shadow-sm">
        <Link to="/" className="flex items-center space-x-2">
            <Logo className="w-10 h-10" />
            <span className="text-2xl font-serif font-bold text-teal-900 tracking-tight">DigiSafe+</span>
        </Link>
        <div className="space-x-8 hidden md:flex text-sm font-bold tracking-wide uppercase text-gray-600">
            <Link to="/about" className="hover:text-terracotta transition-colors">Mission</Link>
            <Link to="/plans" className="hover:text-terracotta transition-colors">Plans</Link>
            <Link to="/support" className="hover:text-terracotta transition-colors">Support</Link>
        </div>
        <div className="space-x-4">
            <Link to="/auth" className="text-teal-900 font-bold hover:underline">Log In</Link>
            <Link 
              to="/scan"
              className="bg-terracotta text-white px-5 py-2 rounded-md font-bold hover:bg-terracotta-600 transition-colors shadow-sm text-sm uppercase tracking-wide"
            >
                Quick Scan
            </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Simple Footer */}
      <footer className="bg-teal-950 text-gray-400 py-12 px-6 border-t border-teal-900 text-sm mt-auto">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex flex-col items-center md:items-start space-y-2">
                  <div className="flex items-center space-x-2">
                      <Logo className="w-8 h-8" />
                      <span className="font-serif font-bold text-xl text-white">DigiSafe+</span>
                  </div>
                  <p>System D • Protecting African Women & Girls</p>
              </div>
              <div className="flex gap-6 font-bold uppercase tracking-wider text-xs">
                  <Link to="/about" className="hover:text-white transition-colors">About</Link>
                  <Link to="/plans" className="hover:text-white transition-colors">Plans</Link>
                  <Link to="/support" className="hover:text-white transition-colors">Support</Link>
                  <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </div>
              <div>
                  &copy; {new Date().getFullYear()} System D.
              </div>
          </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
