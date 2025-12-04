import { HELP_CENTERS, HelpCenter, CHATBOT_QUICK_REPLIES } from '../constants';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
  type?: 'text' | 'help-center-list';
  data?: any;
}

const MOCK_LOCATION_DELAY = 1500;
const RESPONSE_DELAY = 800;

// Simple keyword-based intent system for the prototype
const INTENTS = {
  GREETING: ['hi', 'hello', 'hey', 'start', 'help'],
  HARASSMENT: ['harassment', 'threat', 'bullying', 'stalking', 'messages'],
  IMAGE_ABUSE: ['photo', 'image', 'picture', 'nudes', 'sextortion', 'fake profile'],
  ACCOUNT_SECURITY: ['password', 'hack', 'login', '2fa', 'security'],
  EMERGENCY: ['danger', 'emergency', 'police', 'hurt', 'scared', 'urgent'],
  LOCATION: ['location', 'near me', 'find help', 'center', 'ngo']
};

export const findNearestHelpCenters = async (userCity?: string): Promise<HelpCenter[]> => {
  await new Promise(resolve => setTimeout(resolve, MOCK_LOCATION_DELAY));
  
  if (!userCity) {
    // If no city provided, return a diverse set for the demo
    return [HELP_CENTERS[0], HELP_CENTERS[2], HELP_CENTERS[4]];
  }

  const normalizedCity = userCity.toLowerCase();
  return HELP_CENTERS.filter(hc => 
    hc.city.toLowerCase().includes(normalizedCity) || 
    hc.country.toLowerCase().includes(normalizedCity)
  );
};

export const generateBotResponse = async (input: string): Promise<ChatMessage> => {
  await new Promise(resolve => setTimeout(resolve, RESPONSE_DELAY));

  const text = input.toLowerCase();
  let responseText = "I'm listening. Could you tell me a bit more so I can guide you correctly?";
  let type: ChatMessage['type'] = 'text';
  let data: any = null;

  // 1. Check for Location/Help Intent
  if (INTENTS.LOCATION.some(k => text.includes(k))) {
     // Check if a city is mentioned in the text
     const cities = Array.from(new Set(HELP_CENTERS.map(hc => hc.city.toLowerCase())));
     const detectedCity = cities.find(city => text.includes(city));

     if (detectedCity) {
       const centers = await findNearestHelpCenters(detectedCity);
       responseText = `I found some organizations in ${detectedCity.charAt(0).toUpperCase() + detectedCity.slice(1)} that can help you. You can contact them directly/anonymously.`;
       type = 'help-center-list';
       data = centers;
     } else {
       responseText = "I can find support organizations near you. Which city are you currently in? (e.g., Nairobi, Lagos, Kigali)";
     }
  } 
  // 2. Emergency
  else if (INTENTS.EMERGENCY.some(k => text.includes(k))) {
    responseText = "⚠️ If you are in immediate danger, please contact the local police or a trusted family member immediately. I can also list emergency hotlines if you tell me your city.";
  }
  // 3. Image Abuse
  else if (INTENTS.IMAGE_ABUSE.some(k => text.includes(k))) {
    responseText = "I'm sorry you're going through this. If someone is sharing your intimate images without consent:\n\n1. Do NOT delete the messages (you need evidence).\n2. Take screenshots.\n3. Report the user via the platform's safety center.\n\nWould you like me to open the Report Builder tool?";
  }
  // 4. Harassment
  else if (INTENTS.HARASSMENT.some(k => text.includes(k))) {
    responseText = "Online harassment is not your fault. You have the right to feel safe. I recommend enabling 'Restrict' mode on the harasser's account so they can't see when you're online. Have you saved evidence of the messages yet?";
  }
  // 5. Security
  else if (INTENTS.ACCOUNT_SECURITY.some(k => text.includes(k))) {
    responseText = "Securing your account is a great step. I recommend enabling Two-Factor Authentication (2FA) immediately. Never share your OTP code with anyone, even if they claim to be support.";
  }
  // 6. Greetings
  else if (INTENTS.GREETING.some(k => text.includes(k))) {
    responseText = "Hello, sister. I am DigiBot, your automated safety assistant. I can help you find support, report harassment, or secure your accounts. How can I help you today?";
  }

  return {
    id: Math.random().toString(36).substr(2, 9),
    sender: 'bot',
    text: responseText,
    timestamp: new Date(),
    type,
    data
  };
};