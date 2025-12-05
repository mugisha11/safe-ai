import React from 'react';

// SVG Icons as components for easier usage
export const Logo = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 5L15 20V45C15 68.5 29.5 89.5 50 95C70.5 89.5 85 68.5 85 45V20L50 5Z" fill="#0B5560"/>
    <path d="M50 15L25 25V45C25 62 35.5 77 50 82C64.5 77 75 62 75 45V25L50 15Z" fill="#106A76"/>
    <path d="M50 35C41.7 35 35 41.7 35 50C35 58.3 41.7 65 50 65C58.3 65 65 58.3 65 50C65 41.7 58.3 35 50 35ZM50 59C45 59 41 55 41 50C41 45 45 41 50 41C55 41 59 45 59 50C59 55 55 59 50 59Z" fill="#F2A66A"/>
  </svg>
);

// --- IMAGERY (Unsplash Source IDs) ---
export const IMAGES = {
  hero: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=2574&auto=format&fit=crop", // Confident African woman using tech
  community: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2669&auto=format&fit=crop", // Group/Community
  crisis: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=2669&auto=format&fit=crop", // Serious/Pensive emotion
  education: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2670&auto=format&fit=crop" // Education/Children
};

export const PLANS = [
  {
    name: 'Free Plan',
    price: '$0',
    description: 'Essential protection for every woman.',
    features: ['Basic scans', '5 social media checks/month', 'Safety score', 'Real-time alerts'],
    cta: 'Start Free',
    recommended: false
  },
  {
    name: 'Premium Plan',
    price: '$5/mo',
    period: 'or $50/year',
    description: 'Full coverage for active digital lives.',
    features: ['Unlimited monitoring', 'Real-time alerts', 'AI coaching', 'Evidence export', 'Priority Support'],
    cta: 'Upgrade Now',
    recommended: true
  },
  {
    name: 'Family / School',
    price: '$15/mo',
    period: 'or $150/year',
    description: 'Protect your loved ones.',
    features: ['Up to 10 profiles', 'Family dashboard', 'School monitoring', 'Aggregate reports'],
    cta: 'Get Family Plan',
    recommended: false
  },
  {
    name: 'Enterprise / NGO',
    price: 'Contact Sales',
    description: 'For organizations protecting their community.',
    features: ['Bulk monitoring', 'Analytics dashboard', 'API access', 'Case management', 'Training'],
    cta: 'Contact Sales',
    recommended: false
  }
];

export const MOCK_QUESTIONS = [
  "Do you use the same password for multiple social accounts?",
  "Has a stranger messaged you in the last week?",
  "Is your location visible on your public posts?",
  "Do you have Two-Factor Authentication enabled?",
  "Have you ever shared an intimate image privately?"
];

export const LANDING_FEATURES = [
  {
    title: "Monitor Threats",
    description: "We scan social platforms 24/7 to detect harassment before it escalates.",
    iconName: "Eye"
  },
  {
    title: "Secure Evidence",
    description: "Our Safe Folder acts as a digital vault for evidence, encrypted and local.",
    iconName: "Lock"
  },
  {
    title: "Empower & Educate",
    description: "AI-driven coaching teaches digital rights and safety strategies.",
    iconName: "Bot"
  }
];

export const TESTIMONIALS = [
  {
    text: "I almost left social media because of the harassment. DigiSafe+ gave me the tools to reclaim my voice and protect my space. I am no longer afraid.",
    author: "Aminata, Nairobi",
    role: "Journalist & Activist"
  },
  {
    text: "As a school principal, protecting our students online is as important as protecting them in the classroom. This platform is essential.",
    author: "Mrs. Okonkwo, Lagos",
    role: "Educator"
  }
];

// --- 12-Question Safety Scan Configuration ---

export interface ScanOption {
  text: string;
  score: number; // 0 (Risky) to 10 (Safe)
}

export interface ScanQuestion {
  id: number;
  category: 'Privacy' | 'Harassment' | 'Image Safety' | 'Impersonation' | 'Account Security' | 'Emotional Safety';
  question: string;
  type: 'multiple-choice';
  options: ScanOption[];
}

export const SAFETY_SCAN_QUESTIONS: ScanQuestion[] = [
  {
    id: 1,
    category: "Account Security",
    question: "Do you use the same password for your email and social media accounts?",
    type: "multiple-choice",
    options: [
      { text: "Yes, it's easier to remember", score: 0 },
      { text: "For some accounts", score: 5 },
      { text: "No, I use unique passwords", score: 10 }
    ]
  },
  {
    id: 2,
    category: "Account Security",
    question: "Do you have Two-Factor Authentication (2FA) enabled?",
    type: "multiple-choice",
    options: [
      { text: "No / I don't know what that is", score: 0 },
      { text: "On my main email only", score: 5 },
      { text: "Yes, on all major accounts", score: 10 }
    ]
  },
  {
    id: 3,
    category: "Privacy",
    question: "Is your location (GPS) visible on your public posts or stories?",
    type: "multiple-choice",
    options: [
      { text: "Yes, I like to tag places", score: 2 },
      { text: "Sometimes / Only for friends", score: 7 },
      { text: "No, never", score: 10 }
    ]
  },
  {
    id: 4,
    category: "Privacy",
    question: "Is your main Instagram/TikTok account set to Private or Public?",
    type: "multiple-choice",
    options: [
      { text: "Public - I want followers", score: 2 },
      { text: "Public - but I limit info", score: 5 },
      { text: "Private", score: 10 }
    ]
  },
  {
    id: 5,
    category: "Harassment",
    question: "Do you accept friend requests or DMs from strangers?",
    type: "multiple-choice",
    options: [
      { text: "Yes, I like making friends", score: 2 },
      { text: "Sometimes, if they look real", score: 5 },
      { text: "No, I only add people I know", score: 10 }
    ]
  },
  {
    id: 6,
    category: "Harassment",
    question: "Do you know how to block and report a user on your favorite apps?",
    type: "multiple-choice",
    options: [
      { text: "No, I've never done it", score: 0 },
      { text: "I think so", score: 5 },
      { text: "Yes, I've done it before", score: 10 }
    ]
  },
  {
    id: 7,
    category: "Image Safety",
    question: "Have you ever shared an intimate photo via DM or chat?",
    type: "multiple-choice",
    options: [
      { text: "Yes", score: 0 },
      { text: "Once or twice", score: 5 },
      { text: "No, never", score: 10 }
    ]
  },
  {
    id: 8,
    category: "Image Safety",
    question: "Do you post photos that clearly show your home, school logo, or workplace?",
    type: "multiple-choice",
    options: [
      { text: "Yes, frequently", score: 0 },
      { text: "Rarely", score: 6 },
      { text: "No, I'm careful about background", score: 10 }
    ]
  },
  {
    id: 9,
    category: "Impersonation",
    question: "Have you ever searched (Googled) your own name or handle?",
    type: "multiple-choice",
    options: [
      { text: "No, never", score: 2 },
      { text: "Once, a long time ago", score: 5 },
      { text: "Yes, I check regularly", score: 10 }
    ]
  },
  {
    id: 10,
    category: "Impersonation",
    question: "Do you use your real full name as your public username?",
    type: "multiple-choice",
    options: [
      { text: "Yes", score: 3 },
      { text: "First name only", score: 7 },
      { text: "No, I use a nickname/handle", score: 10 }
    ]
  },
  {
    id: 11,
    category: "Emotional Safety",
    question: "Do you feel anxious or stressed when you receive a notification?",
    type: "multiple-choice",
    options: [
      { text: "Often", score: 2 },
      { text: "Sometimes", score: 6 },
      { text: "Rarely / Never", score: 10 }
    ]
  },
  {
    id: 12,
    category: "Emotional Safety",
    question: "Do you take regular breaks (digital detox) from social media?",
    type: "multiple-choice",
    options: [
      { text: "No, I'm always online", score: 2 },
      { text: "Occasionally", score: 6 },
      { text: "Yes, regularly", score: 10 }
    ]
  }
];

// --- Chatbot & Help Centers Configuration ---

export interface HelpCenter {
  name: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  type: 'Police' | 'Hospital' | 'NGO' | 'Government' | 'Hotline';
  lat: number;
  lng: number;
}

export const HELP_CENTERS: HelpCenter[] = [
  // Rwanda
  { name: "SafeCity Rwanda", city: "Kigali", country: "Rwanda", phone: "+250 788 123 456", email: "contact@safecity.rw", type: "NGO", lat: -1.9441, lng: 30.0619 },
  { name: "Isange One Stop Center", city: "Kigali", country: "Rwanda", phone: "3512", email: "help@isange.gov.rw", type: "Government", lat: -1.9536, lng: 30.1044 },
  { name: "Kigali Central Police Station", city: "Kigali", country: "Rwanda", phone: "112", email: "police@gov.rw", type: "Police", lat: -1.9520, lng: 30.0600 },
  
  // Kenya
  { name: "Gender Based Violence Recovery Centre", city: "Nairobi", country: "Kenya", phone: "+254 719 638 006", email: "gbvrc@nwh.co.ke", type: "Hospital", lat: -1.3000, lng: 36.7850 },
  { name: "FIDA Kenya", city: "Nairobi", country: "Kenya", phone: "+254 722 509 760", email: "info@fidakenya.org", type: "NGO", lat: -1.2921, lng: 36.8219 },
  
  // Nigeria
  { name: "Domestic Violence Support Group", city: "Lagos", country: "Nigeria", phone: "0813 966 8888", email: "support@dvsg.ng", type: "NGO", lat: 6.5244, lng: 3.3792 },
  { name: "Lagos State Domestic & Sexual Violence Response Team", city: "Lagos", country: "Nigeria", phone: "0813 796 0048", email: "info@dsvrtlagos.org", type: "Government", lat: 6.6018, lng: 3.3515 },
  
  // South Africa
  { name: "Tears Foundation", city: "Johannesburg", country: "South Africa", phone: "*134*7355#", email: "info@tears.co.za", type: "NGO", lat: -26.2041, lng: 28.0473 },
  { name: "Gender Violence Command Centre", city: "Pretoria", country: "South Africa", phone: "0800 428 428", email: "support@gvdc.gov.za", type: "Government", lat: -25.7479, lng: 28.2293 },
  
  // Ghana
  { name: "The Ark Foundation", city: "Accra", country: "Ghana", phone: "+233 24 377 7773", email: "info@arkfoundationghana.org", type: "NGO", lat: 5.6037, lng: -0.1870 }
];

export const SAFETY_TIPS = [
  "Stay on the line with the operator until help arrives.",
  "Share your live location with a trusted friend via WhatsApp.",
  "Go to a crowded public place if you feel you are being followed.",
  "Do not agree to meet strangers from the internet in private places."
];

export const CHATBOT_QUICK_REPLIES = [
  "I need help",
  "How do I report harassment?",
  "Find police near me",
  "Secure my account"
];
