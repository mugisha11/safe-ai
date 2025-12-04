import { SAFETY_SCAN_QUESTIONS, ScanOption, ScanQuestion } from '../constants';

export interface ScanResult {
  overallScore: number; // 0-100
  categoryScores: Record<string, number>; // Category name -> 0-100 score
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  recommendations: string[];
}

export const calculateSafetyScore = (answers: Record<number, number>): ScanResult => {
  // answers maps questionId -> optionIndex
  
  const categoryTotals: Record<string, { current: number; max: number }> = {};
  let totalScore = 0;
  let maxTotalScore = 0;

  SAFETY_SCAN_QUESTIONS.forEach((q) => {
    const answerIndex = answers[q.id];
    
    // Initialize category if not exists
    if (!categoryTotals[q.category]) {
      categoryTotals[q.category] = { current: 0, max: 0 };
    }

    // Max possible score for this question (assuming max option score is usually 10)
    // We find the max score among options for this specific question to be accurate
    const maxQuestionScore = Math.max(...q.options.map(o => o.score));
    categoryTotals[q.category].max += maxQuestionScore;
    maxTotalScore += maxQuestionScore;

    // User's score
    if (answerIndex !== undefined && q.options[answerIndex]) {
      const score = q.options[answerIndex].score;
      categoryTotals[q.category].current += score;
      totalScore += score;
    }
  });

  // Calculate percentages
  const overallPercentage = Math.round((totalScore / maxTotalScore) * 100);
  
  const categoryScores: Record<string, number> = {};
  Object.keys(categoryTotals).forEach(cat => {
    const { current, max } = categoryTotals[cat];
    categoryScores[cat] = max > 0 ? Math.round((current / max) * 100) : 0;
  });

  // Determine Risk Level
  let riskLevel: ScanResult['riskLevel'] = 'Low';
  if (overallPercentage < 40) riskLevel = 'Critical';
  else if (overallPercentage < 70) riskLevel = 'High';
  else if (overallPercentage < 90) riskLevel = 'Medium';
  else riskLevel = 'Low';

  // Generate Recommendations
  const recommendations: string[] = [];

  // Logic for recommendations based on low category scores or specific answers
  if (categoryScores['Account Security'] < 70) {
    recommendations.push("Action: Enable Two-Factor Authentication (2FA) on your email and Instagram immediately.");
    recommendations.push("Tip: Use a password manager to create unique passwords for every site.");
  }
  
  if (categoryScores['Privacy'] < 70) {
    recommendations.push("Action: Review your Privacy Settings. Set your main profiles to 'Private' or 'Friends Only'.");
    recommendations.push("Tip: Turn off location tagging for photos taken at your home or school.");
  }

  if (categoryScores['Harassment'] < 80) {
    recommendations.push("Action: Learn where the 'Block' and 'Report' buttons are on every app you use.");
    recommendations.push("Tip: If you receive threats, do not reply. Screenshot them and store them in the Safe Folder.");
  }

  if (categoryScores['Image Safety'] < 80) {
    recommendations.push("Action: Audit your old posts. Delete any photos that show your home address or school uniform.");
    recommendations.push("Tip: Avoid sharing intimate images digitally; they can be saved/shared without your consent.");
  }

  if (categoryScores['Impersonation'] < 70) {
    recommendations.push("Action: Search your name on Google once a month to see what information is public.");
  }

  if (categoryScores['Emotional Safety'] < 70) {
    recommendations.push("Action: Set a 30-minute daily timer for social media usage.");
    recommendations.push("Tip: Unfollow accounts that make you feel anxious or inadequate.");
  }

  // Fallback if score is high
  if (recommendations.length === 0) {
    recommendations.push("Great job! Keep monitoring your accounts regularly.");
    recommendations.push("Share your knowledge with a friend to help keep them safe too.");
  }

  return {
    overallScore: overallPercentage,
    categoryScores,
    riskLevel,
    recommendations: recommendations.slice(0, 5) // Top 5 tips
  };
};