
import React, { useState, useEffect } from 'react';
import { Lock, Unlock, FileText, Image, Trash2, ShieldCheck, AlertCircle, RefreshCw } from 'lucide-react';

// --- CRYPTO UTILITIES ---

// 1. Convert helpers
const buffToBase64 = (buffer: ArrayBuffer) => btoa(String.fromCharCode(...new Uint8Array(buffer)));
const base64ToBuff = (base64: string) => Uint8Array.from(atob(base64), c => c.charCodeAt(0));

// 2. Derive a Key from the PIN (PBKDF2)
// This turns a weak 4-digit PIN into a strong cryptographic key using a random salt.
const deriveKey = async (pin: string, salt: Uint8Array): Promise<CryptoKey> => {
  const enc = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    enc.encode(pin),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  return window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100000,
      hash: "SHA-256"
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
};

// 3. Encrypt Data
const encryptVault = async (data: any, pin: string) => {
  const salt = window.crypto.getRandomValues(new Uint8Array(16));
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(pin, salt);
  const enc = new TextEncoder();
  const encodedData = enc.encode(JSON.stringify(data));

  const ciphertext = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv: iv },
    key,
    encodedData
  );

  return {
    salt: buffToBase64(salt),
    iv: buffToBase64(iv),
    ciphertext: buffToBase64(ciphertext)
  };
};

// 4. Decrypt Data
const decryptVault = async (encryptedObj: any, pin: string) => {
  const salt = base64ToBuff(encryptedObj.salt);
  const iv = base64ToBuff(encryptedObj.iv);
  const ciphertext = base64ToBuff(encryptedObj.ciphertext);

  const key = await deriveKey(pin, salt);

  try {
    const decryptedBuffer = await window.crypto.subtle.decrypt(
      { name: "AES-GCM", iv: iv },
      key,
      ciphertext
    );
    const dec = new TextDecoder();
    return JSON.parse(dec.decode(decryptedBuffer));
  } catch (e) {
    throw new Error("Incorrect PIN or corrupted data");
  }
};

// --- COMPONENT ---

const SafeFolder = () => {
  const [isLocked, setIsLocked] = useState(true);
  const [hasVault, setHasVault] = useState(false);
  const [pin, setPin] = useState('');
  const [status, setStatus] = useState(''); // for error/success messages
  const [isLoading, setIsLoading] = useState(false);

  // Default data to seed the vault with if it's new
  const DEFAULT_EVIDENCE = [
    { id: 1, type: 'image', name: 'Screenshot_IG_Harassment.png', date: 'Oct 24, 2023' },
    { id: 2, type: 'text', name: 'WhatsApp_Threat_Log.txt', date: 'Oct 25, 2023' },
    { id: 3, type: 'text', name: 'Stalker_Profile_URLs.json', date: 'Oct 28, 2023' },
  ];

  const [evidence, setEvidence] = useState<any[]>([]);

  // Check on load if we have a vault in localStorage
  useEffect(() => {
    const vault = localStorage.getItem('digisafe_vault');
    if (vault) {
      setHasVault(true);
    }
  }, []);

  const handleCreateVault = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.length < 4) {
      setStatus('PIN must be at least 4 digits');
      return;
    }
    setIsLoading(true);
    try {
      // Encrypt the default evidence with the new PIN
      const encrypted = await encryptVault(DEFAULT_EVIDENCE, pin);
      localStorage.setItem('digisafe_vault', JSON.stringify(encrypted));
      
      setHasVault(true);
      setEvidence(DEFAULT_EVIDENCE);
      setIsLocked(false);
      setStatus('');
    } catch (err) {
      setStatus('Encryption failed. Try again.');
    } finally {
      setIsLoading(false);
      setPin('');
    }
  };

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('Deriving keys...');
    
    try {
      const vaultStr = localStorage.getItem('digisafe_vault');
      if (!vaultStr) throw new Error("No vault found");
      
      const vaultObj = JSON.parse(vaultStr);
      
      // Attempt decryption
      const decryptedData = await decryptVault(vaultObj, pin);
      
      setEvidence(decryptedData);
      setIsLocked(false);
      setStatus('');
    } catch (err) {
      setStatus('Incorrect PIN. Access Denied.');
    } finally {
      setIsLoading(false);
      setPin('');
    }
  };

  const handleReset = () => {
    if (window.confirm("WARNING: This will delete all encrypted evidence permanently. You cannot undo this. Are you sure?")) {
      localStorage.removeItem('digisafe_vault');
      setHasVault(false);
      setEvidence([]);
      setPin('');
      setStatus('Vault reset complete.');
    }
  };

  const handleLock = () => {
    setIsLocked(true);
    setEvidence([]); // Clear data from memory
    setPin('');
  };

  // --- RENDER: LOCKED STATE ---
  if (isLocked) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 animate-fade-in">
        <div className="bg-teal-900 p-6 rounded-full text-cream mb-6 shadow-xl relative">
          <Lock size={48} />
          {isLoading && <div className="absolute inset-0 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>}
        </div>
        
        <h2 className="text-3xl font-serif font-bold text-teal-900 mb-2">
          {hasVault ? 'Unlock Safe Folder' : 'Setup Safe Folder'}
        </h2>
        
        <p className="text-gray-600 mb-8 max-w-md">
          {hasVault 
            ? 'Enter your PIN to decrypt your evidence using your local key.' 
            : 'Create a PIN to initialize your encrypted vault. This PIN generates your encryption key.'}
        </p>
        
        <form onSubmit={hasVault ? handleUnlock : handleCreateVault} className="w-full max-w-xs space-y-4">
          <input
            type="password"
            maxLength={6}
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full text-center text-3xl tracking-widest py-3 border-2 border-gray-300 rounded-xl focus:border-terracotta focus:ring-0 transition-colors"
            placeholder="• • • •"
            autoFocus
          />
          {status && <p className={`text-sm font-bold ${status.includes('Denied') || status.includes('failed') ? 'text-red-500' : 'text-teal-600'}`}>{status}</p>}
          
          <button 
            type="submit"
            disabled={isLoading || !pin}
            className="w-full bg-terracotta hover:bg-terracotta-600 text-white font-bold py-3 rounded-xl shadow-lg transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Processing...' : (hasVault ? 'Decrypt & Unlock' : 'Encrypt & Create')}
          </button>
        </form>

        <div className="mt-8 p-4 bg-gray-50 rounded-xl max-w-sm border border-gray-100">
           <p className="text-xs text-gray-500 mb-2 flex items-center justify-center gap-1">
             <ShieldCheck size={12} className="text-teal-600"/> 
             Security: AES-GCM-256 Encryption
           </p>
           <p className="text-[10px] text-gray-400">
             Your PIN is converted into a cryptographic key using PBKDF2 (100,000 iterations). 
             We do not store your PIN. If you lose it, data is unrecoverable.
           </p>
           {hasVault && (
             <button onClick={handleReset} className="mt-4 text-[10px] text-red-400 underline hover:text-red-600 flex items-center justify-center w-full gap-1">
               <RefreshCw size={10} /> Reset Vault (Delete Data)
             </button>
           )}
        </div>
      </div>
    );
  }

  // --- RENDER: UNLOCKED STATE ---
  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-scale-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-serif font-bold text-teal-900 flex items-center gap-3">
          <Unlock className="text-terracotta" />
          Evidence Locker
        </h1>
        <button 
          onClick={handleLock}
          className="text-sm font-bold text-white bg-teal-900 hover:bg-teal-800 px-6 py-2 rounded-lg shadow-md transition-colors flex items-center gap-2"
        >
          <Lock size={14} /> Lock Folder
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 min-h-[500px] p-6 relative">
        <div className="absolute top-0 right-0 p-4">
             <div className="flex items-center space-x-2 text-xs text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100">
                 <ShieldCheck size={12} />
                 <span>Decrypted Mode Active</span>
             </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-8">
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
          <div className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer hover:border-teal-500 hover:bg-teal-50 transition-colors group">
            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 mb-2 group-hover:scale-110 transition-transform">
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
