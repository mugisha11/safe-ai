import React, { useState } from 'react';
import { Platform } from '../types';
import { getConnectedAccounts } from '../services/monitoringService';
import { CheckCircle, Plus, AlertOctagon, RefreshCw } from 'lucide-react';

const Monitoring = () => {
  const [accounts, setAccounts] = useState(getConnectedAccounts());
  const [isScanning, setIsScanning] = useState(false);

  const toggleConnection = (idx: number) => {
    const newAccounts = [...accounts];
    newAccounts[idx].connected = !newAccounts[idx].connected;
    setAccounts(newAccounts);
  };

  const simulateScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-teal-900">Social Monitoring</h1>
          <p className="text-gray-600">Manage connections and view active threats across your platforms.</p>
        </div>
        <button 
          onClick={simulateScan}
          disabled={isScanning}
          className="flex items-center space-x-2 bg-terracotta hover:bg-terracotta-600 text-white px-5 py-3 rounded-full font-medium shadow-md transition-all disabled:opacity-50"
        >
          <RefreshCw className={isScanning ? 'animate-spin' : ''} size={20} />
          <span>{isScanning ? 'Scanning...' : 'Force System Scan'}</span>
        </button>
      </div>

      {/* Connections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map((acc, idx) => (
          <div key={acc.platform} className={`relative p-6 rounded-2xl border transition-all duration-300 ${acc.connected ? 'bg-white border-teal-200 shadow-sm' : 'bg-gray-50 border-gray-200 opacity-80'}`}>
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                 {/* Placeholder for real brand icons */}
                 <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${acc.connected ? 'bg-teal-700' : 'bg-gray-400'}`}>
                    {acc.platform.charAt(0)}
                 </div>
                 <div>
                    <h3 className="font-bold text-gray-800">{acc.platform}</h3>
                    <p className="text-xs text-gray-500">{acc.connected ? 'Active • Monitoring' : 'Not Connected'}</p>
                 </div>
              </div>
              <div 
                onClick={() => toggleConnection(idx)}
                className={`w-12 h-7 rounded-full p-1 cursor-pointer transition-colors ${acc.connected ? 'bg-teal-600' : 'bg-gray-300'}`}
              >
                <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${acc.connected ? 'translate-x-5' : 'translate-x-0'}`} />
              </div>
            </div>
            
            {acc.connected && (
               <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500">Handle:</span>
                    <span className="font-medium text-teal-800">{acc.username || 'Not set'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Last Check:</span>
                    <span className="font-medium text-gray-800">Just now</span>
                  </div>
               </div>
            )}
            
            {!acc.connected && (
               <div className="mt-6 flex justify-center">
                 <button 
                    onClick={() => toggleConnection(idx)}
                    className="flex items-center space-x-2 text-sm font-bold text-terracotta hover:text-terracotta-600"
                  >
                    <Plus size={16} />
                    <span>Connect Account</span>
                 </button>
               </div>
            )}
          </div>
        ))}
      </div>

      {/* Live Logs / Threat Radar */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200 shadow-sm">
        <h3 className="text-xl font-bold text-teal-900 mb-6 flex items-center space-x-2">
            <AlertOctagon size={24} className="text-terracotta" />
            <span>Stalker Radar & Graph</span>
        </h3>
        
        <div className="bg-gray-900 rounded-xl p-6 text-green-400 font-mono text-sm h-64 overflow-y-auto space-y-2">
            <p className="text-gray-500 pb-2 border-b border-gray-800 mb-2">// Real-time heuristic monitoring initialized...</p>
            <p>[10:42:05] Checking @digisister_ke DMs... <span className="text-green-500">CLEAN</span></p>
            <p>[10:42:15] Analyzing image hashes on Facebook... <span className="text-green-500">NO MATCH</span></p>
            <p>[10:42:30] <span className="text-yellow-500">WARN:</span> Follower spike detected on Instagram (+15 in 1min). Analyzing profiles...</p>
            <p>[10:42:32] Profile analysis: 12/15 identified as bot network. <span className="text-red-400">ACTION: Flagged for user review.</span></p>
            <p>[10:42:45] Cross-referencing phone numbers in WhatsApp... <span className="text-green-500">OK</span></p>
            {isScanning && (
                <>
                <p className="animate-pulse">[System] Manual Deep Scan initiated...</p>
                <p>[System] Scanning public mentions...</p>
                <p>[System] Checking data breach records...</p>
                </>
            )}
        </div>
        <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
                The Stalker Radar groups suspicious accounts that may belong to the same person based on language, posting time, and IP clusters.
            </p>
        </div>
      </div>
    </div>
  );
};

export default Monitoring;
