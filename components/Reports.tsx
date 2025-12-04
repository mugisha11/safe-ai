import React, { useState } from 'react';
import { FileText, Download, Copy, ExternalLink } from 'lucide-react';

const Reports = () => {
  const [platform, setPlatform] = useState('Instagram');
  const [incidentType, setIncidentType] = useState('Harassment');

  const getTemplateText = () => {
    return `To ${platform} Safety Team,

I am writing to report a case of ${incidentType} involving my account. The user [INSERT_HANDLE] has repeatedly violated your Community Standards by:

1. Sending unsolicited threatening messages.
2. Posting non-consensual imagery.
3. Evading previous blocks via new accounts.

Attached is a zip file containing timestamped screenshots and log exports as evidence. 

I request an immediate investigation and the suspension of the offending account to ensure my safety.

User ID: [YOUR_ID]
Date: ${new Date().toLocaleDateString()}`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-3">
         <h1 className="text-3xl font-serif font-bold text-teal-900">Report Builder</h1>
         <p className="text-gray-600">
           Reporting harassment can be overwhelming. We help you package your evidence and write the correct legal text for each platform.
         </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Configuration */}
        <div className="md:col-span-1 space-y-6">
           <div className="space-y-2">
             <label className="text-sm font-bold text-gray-700">Platform</label>
             <select 
                value={platform} 
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full rounded-xl border-gray-300 focus:border-teal-500 focus:ring-teal-500 bg-white"
             >
               <option>Instagram</option>
               <option>Facebook</option>
               <option>TikTok</option>
               <option>X (Twitter)</option>
               <option>WhatsApp</option>
             </select>
           </div>
           
           <div className="space-y-2">
             <label className="text-sm font-bold text-gray-700">Incident Type</label>
             <select
                value={incidentType}
                onChange={(e) => setIncidentType(e.target.value)}
                className="w-full rounded-xl border-gray-300 focus:border-teal-500 focus:ring-teal-500 bg-white"
             >
               <option>Harassment</option>
               <option>Impersonation</option>
               <option>Image Abuse</option>
               <option>Hate Speech</option>
             </select>
           </div>

           <div className="bg-teal-50 p-4 rounded-xl border border-teal-100">
             <h4 className="font-bold text-teal-900 mb-2 text-sm">Evidence Attached</h4>
             <ul className="text-xs text-gray-600 list-disc ml-4 space-y-1">
               <li>Screenshot_IG_Harassment.png</li>
               <li>WhatsApp_Threat_Log.txt</li>
             </ul>
             <button className="mt-3 text-xs font-bold text-terracotta hover:underline">Edit Selection</button>
           </div>
        </div>

        {/* Preview */}
        <div className="md:col-span-2 space-y-4">
           <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm relative">
             <div className="absolute top-4 right-4 flex space-x-2">
               <button className="p-2 text-gray-400 hover:text-teal-900" title="Copy Text">
                 <Copy size={18} />
               </button>
             </div>
             
             <h3 className="text-lg font-bold text-gray-800 mb-4">Generated Report Text</h3>
             <textarea 
               readOnly
               className="w-full h-64 p-4 bg-gray-50 rounded-xl border border-gray-200 font-mono text-sm leading-relaxed resize-none focus:outline-none"
               value={getTemplateText()}
             />
           </div>

           <div className="flex flex-col sm:flex-row gap-4">
             <button className="flex-1 bg-teal-900 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-teal-800 transition-colors flex justify-center items-center gap-2">
               <Download size={18} />
               Download Evidence Package (.zip)
             </button>
             <button className="flex-1 bg-white text-teal-900 border-2 border-teal-900 font-bold py-3 rounded-xl hover:bg-teal-50 transition-colors flex justify-center items-center gap-2">
               <ExternalLink size={18} />
               Open {platform} Help Center
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
