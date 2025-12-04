import React, { useState, useEffect } from 'react';
import { SAFETY_SCAN_QUESTIONS } from '../constants';
import { calculateSafetyScore, ScanResult } from '../services/scoreEngine';
import { ChevronRight, ChevronLeft, ShieldCheck, AlertTriangle, Download, X, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

interface GuestScannerProps {
  isOpen: boolean;
  onClose: () => void;
}

const GuestScanner: React.FC<GuestScannerProps> = ({ isOpen, onClose }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [animating, setAnimating] = useState(false);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentQuestionIndex(0);
      setAnswers({});
      setShowResults(false);
      setResult(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentQuestion = SAFETY_SCAN_QUESTIONS[currentQuestionIndex];
  const progress = ((currentQuestionIndex + (showResults ? 1 : 0)) / SAFETY_SCAN_QUESTIONS.length) * 100;

  const handleOptionSelect = (optionIndex: number) => {
    if (animating) return;
    
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: optionIndex }));
    setAnimating(true);

    setTimeout(() => {
      setAnimating(false);
      if (currentQuestionIndex < SAFETY_SCAN_QUESTIONS.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        finishScan({ ...answers, [currentQuestion.id]: optionIndex });
      }
    }, 400); // Wait for slide out animation
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const finishScan = (finalAnswers: Record<number, number>) => {
    const res = calculateSafetyScore(finalAnswers);
    setResult(res);
    setShowResults(true);
  };

  // --- Results View ---
  if (showResults && result) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-teal-900/90 backdrop-blur-sm animate-fade-in overflow-y-auto">
        <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-scale-in my-8 md:my-0">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-50 p-2 bg-white/20 hover:bg-white/40 rounded-full text-teal-900 md:text-white transition-colors"
          >
            <X size={24} />
          </button>

          {/* Left Panel: Score Visualization */}
          <div className="bg-teal-900 text-cream p-8 md:p-12 flex flex-col items-center justify-center text-center md:w-5/12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-kitenge-pattern opacity-10"></div>
            <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-teal-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
            
            <h2 className="text-xl font-serif font-bold text-teal-200 mb-8 relative z-10 uppercase tracking-widest">Safety Analysis</h2>
            
            <div className="relative z-10 w-48 h-48 rounded-full border-[12px] border-teal-800 flex items-center justify-center mb-8 bg-teal-950 shadow-2xl">
               <div className="text-center">
                 <span className={`text-6xl font-bold block ${result.overallScore > 70 ? 'text-green-400' : result.overallScore > 40 ? 'text-gold' : 'text-red-400'}`}>
                   {result.overallScore}
                   <span className="text-2xl text-teal-500">%</span>
                 </span>
                 <span className="text-xs text-teal-400 uppercase tracking-wide font-medium mt-1 block">Total Score</span>
               </div>
            </div>
            
            <div className="relative z-10 mb-8">
                <p className="text-sm font-medium uppercase tracking-widest text-teal-400 mb-1">Risk Level</p>
                <p className={`text-3xl font-bold ${result.riskLevel === 'Critical' || result.riskLevel === 'High' ? 'text-terracotta' : 'text-white'}`}>{result.riskLevel}</p>
            </div>
            
            <div className="w-full relative z-10 space-y-3">
              <Link to="/auth" onClick={onClose} className="block w-full bg-gold hover:bg-orange-400 text-teal-900 font-bold py-4 rounded-xl transition-all shadow-lg active:scale-95">
                Start Full Monitoring
              </Link>
              <p className="text-xs text-teal-300/60">Create a free account to save these results.</p>
            </div>
          </div>

          {/* Right Panel: Detailed Insights */}
          <div className="p-8 md:p-12 md:w-7/12 bg-cream overflow-y-auto max-h-[90vh]">
            <h2 className="text-3xl font-serif font-bold text-teal-900 mb-2">Your Action Plan</h2>
            <p className="text-gray-500 mb-8">Based on your answers, here is your personalized digital safety checklist.</p>
            
            {/* Category Bars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mb-10">
               {Object.entries(result.categoryScores).map(([cat, score]) => (
                 <div key={cat}>
                    <div className="flex justify-between text-xs font-bold text-teal-800 mb-1">
                      <span>{cat}</span>
                      <span>{score}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-1000 ease-out ${score > 70 ? 'bg-teal-500' : score > 40 ? 'bg-gold' : 'bg-terracotta'}`} 
                        style={{ width: `${score}%` }}
                      ></div>
                    </div>
                 </div>
               ))}
            </div>

            {/* Recommendations List */}
            <div className="space-y-4 mb-8">
              {result.recommendations.map((rec, idx) => (
                <div key={idx} className="flex items-start gap-4 bg-white p-5 rounded-xl border border-orange-100 shadow-sm animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
                   <div className={`shrink-0 p-2 rounded-lg ${rec.startsWith('Action') ? 'bg-red-50 text-terracotta' : 'bg-teal-50 text-teal-600'}`}>
                      {rec.startsWith('Action') ? <AlertTriangle size={20} /> : <ShieldCheck size={20} />}
                   </div>
                   <div>
                     <span className={`text-xs font-bold uppercase tracking-wide mb-1 block ${rec.startsWith('Action') ? 'text-terracotta' : 'text-teal-600'}`}>
                       {rec.split(':')[0]}
                     </span>
                     <p className="text-gray-700 text-sm leading-relaxed font-medium">
                       {rec.split(':')[1]}
                     </p>
                   </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-6 border-t border-gray-200">
               <button className="flex items-center gap-2 text-gray-500 hover:text-teal-900 font-bold text-sm transition-colors">
                 <Download size={16} />
                 Download PDF Report
               </button>
               <button onClick={onClose} className="text-teal-900 font-bold hover:underline">
                 Close
               </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- Questionnaire View ---
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-teal-900/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl relative overflow-hidden flex flex-col min-h-[500px] animate-scale-in">
        
        {/* Close Button */}
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
        >
            <X size={24} />
        </button>

        {/* Progress Bar */}
        <div className="w-full bg-gray-100 h-2">
          <div 
            className="bg-gradient-to-r from-terracotta to-gold h-2 progress-bar" 
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Content Container */}
        <div className="flex-1 p-8 md:p-12 flex flex-col relative">
           {/* Animated Question Card */}
           <div key={currentQuestionIndex} className={`flex-1 flex flex-col ${animating ? 'animate-slide-out' : 'animate-slide-in'}`}>
             
             {/* Header */}
             <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                  Question {currentQuestion.id} of {SAFETY_SCAN_QUESTIONS.length}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                  currentQuestion.category === 'Privacy' ? 'bg-purple-100 text-purple-700' :
                  currentQuestion.category === 'Harassment' ? 'bg-red-100 text-red-700' :
                  'bg-teal-100 text-teal-800'
                }`}>
                  {currentQuestion.category}
                </span>
             </div>

             {/* Question Text */}
             <h2 className="text-2xl md:text-3xl font-serif font-bold text-teal-900 mb-8 leading-tight">
               {currentQuestion.question}
             </h2>

             {/* Options */}
             <div className="space-y-3 flex-1">
               {currentQuestion.options.map((option, idx) => (
                 <button
                   key={idx}
                   onClick={() => handleOptionSelect(idx)}
                   className="w-full text-left p-4 md:p-5 rounded-2xl border-2 border-gray-100 hover:border-terracotta hover:bg-orange-50 transition-all duration-200 group flex justify-between items-center"
                 >
                   <span className="font-medium text-gray-700 group-hover:text-teal-900 text-lg">{option.text}</span>
                   <div className="w-6 h-6 rounded-full border-2 border-gray-300 group-hover:border-terracotta group-hover:bg-terracotta flex items-center justify-center transition-colors">
                     <Check size={14} className="text-white opacity-0 group-hover:opacity-100" />
                   </div>
                 </button>
               ))}
             </div>
           </div>
           
           {/* Footer Nav */}
           <div className="mt-8 flex justify-between items-center border-t border-gray-100 pt-6">
             <button 
               onClick={handleBack}
               disabled={currentQuestionIndex === 0}
               className={`flex items-center gap-2 font-bold text-sm transition-colors ${currentQuestionIndex === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-teal-900'}`}
             >
               <ChevronLeft size={16} /> Previous
             </button>
             {/* Note: Next button is implied by selection, but kept back for nav structure */}
           </div>
        </div>
      </div>
    </div>
  );
};

export default GuestScanner;