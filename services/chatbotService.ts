import { HELP_CENTERS, HelpCenter, CHATBOT_QUICK_REPLIES, SAFETY_TIPS } from '../constants';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
  type?: 'text' | 'help-center-list' | 'location-request';
  data?: any;
}

const MOCK_LOCATION_DELAY = 1000;
const RESPONSE_DELAY = 800;

// Keyword-based intent system
const INTENTS = {
  GREETING: ['hi', 'hello', 'hey', 'start', 'help'],
  HARASSMENT: ['harassment', 'threat', 'bullying', 'stalking', 'messages'],
  IMAGE_ABUSE: ['photo', 'image', 'picture', 'nudes', 'sextortion', 'fake profile'],
  ACCOUNT_SECURITY: ['password', 'hack', 'login', '2fa', 'security'],
  EMERGENCY: ['danger', 'emergency', 'police', 'hurt', 'scared', 'urgent', 'unsafe', 'hospital', 'ambulance', 'find police', 'near me', 'need help'],
  LOCATION: ['location', 'near me', 'find help', 'center', 'ngo']
};

/**
 * Calculates distance between two coordinates in Kilometers (Haversine Formula)
 */
const getDistanceFromLatLonInKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
};

const deg2rad = (deg: number) => {
  return deg * (Math.PI / 180);
};

export interface ScoredHelpCenter extends HelpCenter {
  distance: number; // in km
}

/**
 * Simulates an API call to finding nearest help centers based on GPS
 */
export const processUserLocation = async (lat: number, lng: number): Promise<ChatMessage> => {
  await new Promise(resolve => setTimeout(resolve, MOCK_LOCATION_DELAY));

  // Sort centers by distance
  const sortedCenters: ScoredHelpCenter[] = HELP_CENTERS.map(center => ({
    ...center,
    distance: getDistanceFromLatLonInKm(lat, lng, center.lat, center.lng)
  })).sort((a, b) => a.distance - b.distance);

  // Take top 3 closest
  const nearest = sortedCenters.slice(0, 3);
  const safetyTip = SAFETY_TIPS[Math.floor(Math.random() * SAFETY_TIPS.length)];

  if (nearest.length === 0 || nearest[0].distance > 5000) {
     return {
        id: Date.now().toString(),
        sender: 'bot',
        text: "I couldn't find any specific help centers in your immediate vicinity in my database. Please contact your national emergency number immediately (usually 112, 911, or 999).",
        timestamp: new Date(),
        type: 'text'
     };
  }

  return {
    id: Date.now().toString(),
    sender: 'bot',
    text: "Here are the closest support centers to your location. Please contact them or go there if you feel unsafe.",
    timestamp: new Date(),
    type: 'help-center-list',
    data: {
      centers: nearest,
      tip: safetyTip,
      emergencyNumber: "112 / 999" // Generic fallback, in production this comes from a country DB
    }
  };
};

export const findNearestHelpCenters = async (userCity?: string): Promise<HelpCenter[]> => {
  await new Promise(resolve => setTimeout(resolve, MOCK_LOCATION_DELAY));
  
  if (!userCity) {
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

  // 1. Emergency / Location Trigger (Highest Priority)
  // When user says "find police", "I need help", "unsafe", etc.
  if (INTENTS.EMERGENCY.some(k => text.includes(k))) {
    return {
      id: Math.random().toString(36).substr(2, 9),
      sender: 'bot',
      text: "I understand you need help. To find the nearest police station or support center, I need to know your location.",
      timestamp: new Date(),
      type: 'location-request', // Triggers the Permission UI
      data: null
    };
  }

  // 2. Image Abuse
  else if (INTENTS.IMAGE_ABUSE.some(k => text.includes(k))) {
    responseText = "I'm sorry you're going through this. If someone is sharing your intimate images without consent:\n\n1. Do NOT delete the messages (you need evidence).\n2. Take screenshots.\n3. Report the user via the platform's safety center.\n\nWould you like me to open the Report Builder tool?";
  }
  // 3. Harassment
  else if (INTENTS.HARASSMENT.some(k => text.includes(k))) {
    responseText = "Online harassment is not your fault. You have the right to feel safe. I recommend enabling 'Restrict' mode on the harasser's account so they can't see when you're online. Have you saved evidence of the messages yet?";
  }
  // 4. Security
  else if (INTENTS.ACCOUNT_SECURITY.some(k => text.includes(k))) {
    responseText = "Securing your account is a great step. I recommend enabling Two-Factor Authentication (2FA) immediately. Never share your OTP code with anyone, even if they claim to be support.";
  }
  // 5. General / Greeting
  else if (INTENTS.GREETING.some(k => text.includes(k))) {
    responseText = "Hello, sister. I am DigiBot, your automated safety assistant. I can help you find support, report harassment, or secure your accounts. How can I help you today?";
  }
  // Fallback for location-like queries without urgency
  else if (INTENTS.LOCATION.some(k => text.includes(k))) {
     const cities = Array.from(new Set(HELP_CENTERS.map(hc => hc.city.toLowerCase())));
     const detectedCity = cities.find(city => text.includes(city));

     if (detectedCity) {
       const centers = await findNearestHelpCenters(detectedCity);
       responseText = `I found some organizations in ${detectedCity.charAt(0).toUpperCase() + detectedCity.slice(1)} that can help you.`;
       type = 'help-center-list';
       data = { centers: centers, tip: "Always meet in public places.", emergencyNumber: "112" };
     } else {
       return {
        id: Math.random().toString(36).substr(2, 9),
        sender: 'bot',
        text: "I can find support organizations near you. Would you like to share your GPS location?",
        timestamp: new Date(),
        type: 'location-request',
        data: null
       };
     }
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
