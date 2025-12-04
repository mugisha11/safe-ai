// This service simulates the AI analysis. 
// In production, this would call the Gemini API using @google/genai.

import { Alert, AlertSeverity, AlertType, ConnectedAccount } from '../types';

// Simulated Analysis Result
export interface AnalysisResult {
  score: number; // 0-100 (100 is safe)
  riskLevel: 'Safe' | 'Low' | 'Medium' | 'High';
  flags: string[];
  advice: string;
}

export const analyzeText = async (text: string): Promise<AnalysisResult> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  const lowerText = text.toLowerCase();
  let riskScore = 0;
  const flags: string[] = [];

  // Simple rule-based heuristics for the demo
  if (lowerText.includes('kill') || lowerText.includes('hurt') || lowerText.includes('die')) {
    riskScore += 80;
    flags.push('Violent language detected');
  }
  if (lowerText.includes('send nudes') || lowerText.includes('private pics') || lowerText.includes('sex')) {
    riskScore += 60;
    flags.push('Sexual harassment / Sextortion risk');
  }
  if (lowerText.includes('stupid') || lowerText.includes('ugly') || lowerText.includes('hate')) {
    riskScore += 40;
    flags.push('Bullying / Emotional abuse');
  }
  if (lowerText.includes('money') || lowerText.includes('transfer') || lowerText.includes('mpesa')) {
    riskScore += 30;
    flags.push('Potential financial scam');
  }

  let riskLevel: AnalysisResult['riskLevel'] = 'Safe';
  let advice = "This message seems safe. Trust your instincts.";

  if (riskScore > 70) {
    riskLevel = 'High';
    advice = "⚠️ DANGER: Do not reply. Screenshot immediately using the Safe Folder. Block this user.";
  } else if (riskScore > 40) {
    riskLevel = 'Medium';
    advice = "Caution: This message is aggressive. Do not engage. Consider restricting this user.";
  } else if (riskScore > 0) {
    riskLevel = 'Low';
    advice = "Be careful. This language is not friendly. Monitor the situation.";
  }

  return {
    score: Math.max(0, 100 - riskScore),
    riskLevel,
    flags,
    advice
  };
};

// Simulation of the Face Watcher / Image Reupload detector
export const scanForFace = async (file: File): Promise<{ found: boolean; locations: string[] }> => {
  await new Promise(resolve => setTimeout(resolve, 3000)); // Longer delay for "processing"
  
  // Randomly return a match for demo purposes if the file name contains 'risk'
  const isRisk = Math.random() > 0.7; 
  
  if (isRisk) {
    return {
      found: true,
      locations: ['Twitter (Suspicious Bot)', 'Adult Forum #42', 'Instagram (Impersonator)']
    };
  }
  return { found: false, locations: [] };
};
