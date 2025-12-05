
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { 
  Shield, Activity, Eye, FileText, Lock, 
  Menu, X, Bell, LogOut, Heart, LifeBuoy, Info
} from 'lucide-react';
import { Logo } from './constants';
import Dashboard from './components/Dashboard';
import Monitoring from './components/Monitoring';
import Scanner from './components/Scanner';
import SafeFolder from './components/SafeFolder';
import Reports from './components/Reports';
import Plans from './components/Plans';
import Auth from './components/Auth';
import Landing from './components/Landing';
import About from './components/About';
import Support from './components/Support';
import Chatbot from './components/Chatbot';
import PublicLayout from './components/PublicLayout';
import { generateMockAlert } from './services/monitoringService';
import { Alert } from './types';

// --- Sidebar Component ---
const Sidebar = ({ isOpen, onClose, panicMode, onLogout }: { isOpen: boolean, onClose: () => void, panicMode: () => void, onLogout: () => void }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { icon: Activity, label: 'Dashboard', path: '/dashboard' },
    { icon: Eye, label: 'Monitoring', path: '/monitor' },
    { icon: Shield, label: 'Safety Scanner', path: '/scan' },
    { icon: Lock, label: 'Safe Folder', path: '/safe-folder' },
    { icon: FileText, label: 'Reports', path: '/reports' },
    { icon: Heart, label: 'Plans', path: '/plans' },
    { icon: Info, label: 'About', path: '/about' },
    { icon: LifeBuoy, label: 'Support', path: '/support' },
  ];

  return (
    <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-teal-900 text-cream transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:inset-auto shadow-xl flex flex-col`}>
      <div className="flex items-center justify-between p-6 shrink-0">
        <Link to="/dashboard" className="flex items-center space-x-2" onClick={onClose}>
          <Logo className="w-8 h-8" />
          <span className="text-xl font-bold font-serif tracking-wide">DigiSafe+</span>
        </Link>
        <button onClick={onClose} className="md:hidden text-cream hover:text-gold">
          <X size={24} />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 space-y-2 mt-2 custom-scrollbar">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => window.innerWidth < 768 && onClose()}
            className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive(item.path) ? 'bg-terracotta text-white shadow-lg' : 'hover:bg-teal-800 text-teal-100'}`}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-6 space-y-3 shrink-0 bg-teal-900 border-t border-teal-800">
        <button 
          onClick={onLogout}
          className="w-full bg-teal-800 hover:bg-teal-700 text-teal-100 font-bold py-3 px-4 rounded-xl shadow-sm flex items-center justify-center space-x-2 transition-colors"
        >
          <LogOut size={18} />
          <span>Log Out</span>
        </button>

        <button 
          onClick={panicMode}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg flex items-center justify-center space-x-2 transition-transform active:scale-95"
        >
          <Activity size={18} />
          <span>Panic Exit</span>
        </button>
        <div className="text-xs text-center text-teal-300 opacity-60 pt-2">
          System D • Ver 1.0.6
        </div>
      </div>
    </aside>
  );
};

// --- Main App Layout for Authenticated Users ---
const AppLayout = ({ children, onLogout }: { children: React.ReactNode, onLogout: () => void }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState<Alert[]>([]);

  // Simulation: Add random alerts occasionally
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) { // 20% chance every 15s
        const newAlert = generateMockAlert();
        setNotifications(prev => [newAlert, ...prev].slice(1, 10)); // Keep last 10
      }
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const handlePanic = () => {
    // Immediate redirect for safety
    window.location.href = "https://www.google.com/search?q=weather+forecast";
  };

  return (
    <div className="flex h-screen bg-cream overflow-hidden font-sans">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        panicMode={handlePanic} 
        onLogout={onLogout}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Mobile Header */}
        <header className="flex items-center justify-between p-4 md:px-8 md:py-6 bg-white/50 backdrop-blur-sm border-b border-orange-100/50">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden text-teal-900">
            <Menu size={24} />
          </button>
          
          <div className="hidden md:block">
            <h2 className="text-lg font-serif text-teal-900 italic">"You are safe here, sister."</h2>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="p-2 text-teal-900 hover:bg-orange-50 rounded-full transition-colors relative">
                <Bell size={24} />
                {notifications.some(n => !n.read) && (
                  <span className="absolute top-1 right-1 w-3 h-3 bg-terracotta rounded-full border-2 border-white"></span>
                )}
              </button>
            </div>
            <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center border-2 border-gold text-terracotta font-bold">
              JD
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 relative bg-kitenge-pattern">
           {children}
        </main>
      </div>
    </div>
  );
};

// --- App Component ---
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Router is wrapped inside the return, so we can't use useNavigate here directly.
  // We handle navigation inside the components or via conditional rendering tricks,
  // but for the root logout, passing the state setter is cleaner.

  const handleLogout = () => {
    setIsAuthenticated(false);
    // Since we are using conditional rendering for layouts, 
    // React Router will automatically show the Public/Landing routes
    // because ProtectedRoute will redirect to /auth or home if accessed.
  };

  // Helper to choose layout based on auth state
  const RouteLayout = ({ children }: { children: React.ReactNode }) => {
    if (isAuthenticated) {
      return <AppLayout onLogout={handleLogout}>{children}</AppLayout>;
    }
    return <PublicLayout>{children}</PublicLayout>;
  };

  // Helper for strictly protected routes
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!isAuthenticated) {
      return <Navigate to="/auth" />;
    }
    return <AppLayout onLogout={handleLogout}>{children}</AppLayout>;
  };

  return (
    <Router>
      {/* Global Chatbot Bubble */}
      <Chatbot />
      
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth onLogin={() => setIsAuthenticated(true)} />} />
        
        {/* Hybrid Routes (Public or Protected depending on login) */}
        <Route path="/about" element={<RouteLayout><About /></RouteLayout>} />
        <Route path="/plans" element={<RouteLayout><Plans /></RouteLayout>} />
        <Route path="/support" element={<RouteLayout><Support /></RouteLayout>} />
        <Route path="/scan" element={<RouteLayout><Scanner /></RouteLayout>} />
        
        {/* Strictly Protected Dashboard Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/monitor" element={<ProtectedRoute><Monitoring /></ProtectedRoute>} />
        <Route path="/safe-folder" element={<ProtectedRoute><SafeFolder /></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />

        {/* Catch all */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/"} />} />
      </Routes>
    </Router>
  );
}
