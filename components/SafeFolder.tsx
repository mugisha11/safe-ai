import React, { useState } from 'react';
import { Lock, Unlock, FileText, Image, Trash2 } from 'lucide-react';

const SafeFolder = () => {
  const [isLocked, setIsLocked] = useState(true);
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  // Mock Evidence Data
  const [evidence] = useState([
    { id: 1, type: 'image', name: 'Screenshot_IG_Harassment.png', date: 'Oct 24, 2023' },
    { id: 2, type: 'text', name: 'WhatsApp_Threat_Log.txt', date: 'Oct 25, 2023' },
    { id: 3, type: 'text', name: 'Stalker_Profile_URLs.json', date: 'Oct 28, 2023' },
  ]);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo PIN is 1234
    if (pin === '1234') {
      setIsLocked(false);
      setError('');
    } else {
      setError('Incorrect PIN. Try 1234 for demo.');
      setPin('');
    }
  };

  if (isLocked) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="bg-teal-900 p-6 rounded-full text-cream mb-6 shadow-xl">
          <Lock size={48} />
        </div>
        <h2 className="text-3xl font-serif font-bold text-teal-900 mb-2">Safe Folder</h2>
        <p className="text-gray-600 mb-8 max-w-md">
          This folder is encrypted on your device. Enter your PIN to access your saved evidence.
        </p>
        
        <form onSubmit={handleUnlock} className="w-full max-w-xs space-y-4">
          <input
            type="password"
            maxLength={4}
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full text-center text-3xl tracking-widest py-3 border-2 border-gray-300 rounded-xl focus:border-terracotta focus:ring-0"
            placeholder="• • • •"
          />
          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
          <button 
            type="submit"
            className="w-full bg-terracotta hover:bg-terracotta-600 text-white font-bold py-3 rounded-xl shadow-lg transition-transform active:scale-95"
          >
            Unlock
          </button>
        </form>
        <p className="mt-8 text-xs text-gray-400">
          Encryption: AES-256 (Simulated) • Local Storage Only
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-serif font-bold text-teal-900 flex items-center gap-3">
          <Unlock className="text-terracotta" />
          Evidence Locker
        </h1>
        <button 
          onClick={() => { setIsLocked(true); setPin(''); }}
          className="text-sm font-bold text-gray-500 hover:text-teal-900 border border-gray-300 px-4 py-2 rounded-lg"
        >
          Lock Folder
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 min-h-[500px] p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {evidence.map((item) => (
            <div key={item.id} className="group relative bg-gray-50 hover:bg-orange-50 rounded-2xl p-4 flex flex-col items-center text-center cursor-pointer transition-colors border border-transparent hover:border-orange-200">
              <div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center mb-3 text-teal-800">
                {item.type === 'image' ? <Image size={32} /> : <FileText size={32} />}
              </div>
              <p className="text-sm font-bold text-gray-800 line-clamp-2 w-full break-words">{item.name}</p>
              <p className="text-xs text-gray-400 mt-1">{item.date}</p>
              
              <button className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-opacity bg-white rounded-full p-1 shadow-sm">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
          
          {/* Add New Button */}
          <div className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer hover:border-teal-500 hover:bg-teal-50 transition-colors">
            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 mb-2">
              <span className="text-2xl font-bold">+</span>
            </div>
            <p className="text-sm font-bold text-teal-900">Add Evidence</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafeFolder;
