import React, { useState } from 'react';
import { analyzeText, scanForFace, AnalysisResult } from '../services/aiEngine';
import { AlertTriangle, ShieldCheck, Upload, ChevronRight, Copy } from 'lucide-react';

const Scanner = () => {
  const [activeTab, setActiveTab] = useState<'text' | 'image'>('text');
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  
  // Image State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageResult, setImageResult] = useState<{found: boolean, locations: string[]} | null>(null);

  const handleTextAnalysis = async () => {
    if (!inputText.trim()) return;
    setIsAnalyzing(true);
    setResult(null);
    try {
      const res = await analyzeText(inputText);
      setResult(res);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        setSelectedFile(e.target.files[0]);
        setImageResult(null); // reset result
    }
  };

  const handleImageScan = async () => {
      if(!selectedFile) return;
      setIsAnalyzing(true);
      try {
          const res = await scanForFace(selectedFile);
          setImageResult(res);
      } finally {
          setIsAnalyzing(false);
      }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-serif font-bold text-teal-900">Safety Scanner</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Not sure if a message is dangerous? Paste it here. Worried your photos are being used elsewhere? Upload a selfie to check.
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-lg border border-orange-100 overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-gray-100">
          <button
            onClick={() => setActiveTab('text')}
            className={`flex-1 py-4 font-bold text-center transition-colors ${activeTab === 'text' ? 'bg-terracotta text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
          >
            Message Analyzer
          </button>
          <button
            onClick={() => setActiveTab('image')}
            className={`flex-1 py-4 font-bold text-center transition-colors ${activeTab === 'image' ? 'bg-terracotta text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
          >
            Face Watcher
          </button>
        </div>

        <div className="p-6 md:p-8 min-h-[400px]">
          {activeTab === 'text' ? (
            <div className="space-y-6">
              <label className="block text-sm font-bold text-gray-700">
                Paste message content, comments, or emails here:
              </label>
              <textarea
                className="w-full h-40 p-4 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:ring-0 resize-none bg-gray-50"
                placeholder="He said: ..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <button
                onClick={handleTextAnalysis}
                disabled={isAnalyzing || !inputText}
                className="w-full py-3 bg-teal-900 hover:bg-teal-800 text-white font-bold rounded-xl transition-all disabled:opacity-50 flex justify-center items-center"
              >
                {isAnalyzing ? 'AI is analyzing tone and threats...' : 'Analyze Risk Level'}
              </button>

              {result && (
                <div className={`mt-6 p-6 rounded-2xl border-l-4 ${result.riskLevel === 'High' ? 'bg-red-50 border-red-500' : result.riskLevel === 'Medium' ? 'bg-orange-50 border-orange-500' : 'bg-green-50 border-green-500'} animate-fade-in`}>
                  <div className="flex items-start justify-between">
                    <div>
                        <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                           {result.riskLevel === 'Safe' ? <ShieldCheck /> : <AlertTriangle />} 
                           Risk Level: {result.riskLevel} ({result.score}/100)
                        </h4>
                        <p className="text-gray-800 mb-3">{result.advice}</p>
                        {result.flags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {result.flags.map(f => (
                                    <span key={f} className="px-2 py-1 bg-white rounded border border-gray-200 text-xs font-bold text-gray-600 uppercase tracking-wide">{f}</span>
                                ))}
                            </div>
                        )}
                    </div>
                  </div>
                  {result.riskLevel !== 'Safe' && (
                      <div className="mt-4 flex gap-3">
                          <button className="text-sm font-bold text-teal-900 underline">Add to Evidence Locker</button>
                          <button className="text-sm font-bold text-terracotta underline">View Response Templates</button>
                      </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
                 <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-sm text-blue-800 mb-6">
                     <strong>Privacy Notice:</strong> Your image is converted to a mathematical hash locally. We do not store your raw photos on our servers without explicit permission.
                 </div>
                 
                 <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-white transition-colors cursor-pointer relative">
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    {selectedFile ? (
                         <div className="text-center">
                             <img src={URL.createObjectURL(selectedFile)} alt="Preview" className="h-32 w-32 object-cover rounded-full mx-auto mb-4 border-4 border-white shadow-md" />
                             <p className="font-bold text-gray-800">{selectedFile.name}</p>
                             <p className="text-sm text-gray-500">Click to change</p>
                         </div>
                    ) : (
                        <div className="text-center">
                            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                            <p className="font-bold text-gray-700">Drop a clear photo of your face here</p>
                            <p className="text-sm text-gray-400">or click to browse</p>
                        </div>
                    )}
                 </div>

                 <button
                    onClick={handleImageScan}
                    disabled={isAnalyzing || !selectedFile}
                    className="w-full py-3 bg-teal-900 hover:bg-teal-800 text-white font-bold rounded-xl transition-all disabled:opacity-50"
                  >
                    {isAnalyzing ? 'Scanning public web (Simulation)...' : 'Scan for Reuploads'}
                  </button>

                  {imageResult && (
                      <div className="mt-6">
                          {imageResult.found ? (
                              <div className="bg-red-50 p-6 rounded-2xl border border-red-200">
                                  <h4 className="font-bold text-red-800 flex items-center gap-2 mb-4">
                                      <AlertTriangle size={20}/>
                                      Potential Matches Found
                                  </h4>
                                  <p className="text-sm text-gray-700 mb-4">We found images that look very similar to yours on these platforms:</p>
                                  <ul className="space-y-2">
                                      {imageResult.locations.map((loc, i) => (
                                          <li key={i} className="flex justify-between items-center bg-white p-3 rounded-lg border border-red-100 shadow-sm">
                                              <span className="font-medium text-gray-800">{loc}</span>
                                              <button className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200">Request Takedown</button>
                                          </li>
                                      ))}
                                  </ul>
                              </div>
                          ) : (
                              <div className="bg-green-50 p-6 rounded-2xl border border-green-200 text-center">
                                  <ShieldCheck className="mx-auto h-12 w-12 text-green-600 mb-2" />
                                  <h4 className="font-bold text-green-800 text-lg">Good News</h4>
                                  <p className="text-green-700">We didn't find any public matches for this image on monitored platforms.</p>
                              </div>
                          )}
                      </div>
                  )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Scanner;
