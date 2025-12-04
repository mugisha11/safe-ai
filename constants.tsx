import React from 'react';

// SVG Icons as components for easier usage
export const Logo = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 5L15 20V45C15 68.5 29.5 89.5 50 95C70.5 89.5 85 68.5 85 45V20L50 5Z" fill="#0B5560"/>
    <path d="M50 15L25 25V45C25 62 35.5 77 50 82C64.5 77 75 62 75 45V25L50 15Z" fill="#106A76"/>
    <path d="M50 35C41.7 35 35 41.7 35 50C35 58.3 41.7 65 50 65C58.3 65 65 58.3 65 50C65 41.7 58.3 35 50 35ZM50 59C45 59 41 55 41 50C41 45 45 41 50 41C55 41 59 45 59 50C59 55 55 59 50 59Z" fill="#F2A66A"/>
  </svg>
);

export const IllustrationShield = () => (
    <svg viewBox="0 0 200 200" className="w-full h-auto" fill="none">
        <circle cx="100" cy="100" r="90" fill="#FFF8F2"/>
        <path d="M100 20L40 45V90C40 135 65 175 100 190C135 175 160 135 160 90V45L100 20Z" fill="#D86A4A" opacity="0.1"/>
        <path d="M100 40L55 60V90C55 125 75 155 100 165C125 155 145 125 145 90V60L100 40Z" stroke="#0B5560" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M85 90L95 100L115 80" stroke="#0B5560" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const IllustrationWoman = () => (
  <svg viewBox="0 0 200 200" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="90" fill="#F2A66A" fillOpacity="0.1"/>
    <path d="M100 180C144.183 180 180 144.183 180 100C180 55.8172 144.183 20 100 20C55.8172 20 20 55.8172 20 100C20 144.183 55.8172 180 100 180Z" stroke="#F2A66A" strokeWidth="2" strokeDasharray="4 4"/>
    <path d="M100 60C111.046 60 120 68.9543 120 80C120 91.0457 111.046 100 100 100C88.9543 100 80 91.0457 80 80C80 68.9543 88.9543 60 100 60Z" fill="#0B5560"/>
    <path d="M60 160C60 137.909 77.9086 120 100 120C122.091 120 140 137.909 140 160" stroke="#0B5560" strokeWidth="8" strokeLinecap="round"/>
  </svg>
);

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
    title: "Social Media Monitoring",
    description: "Track harassment and suspicious activity across platforms.",
    iconName: "Eye"
  },
  {
    title: "Harassment & Threat Detection",
    description: "Detect harmful messages and posts instantly.",
    iconName: "ShieldAlert"
  },
  {
    title: "Image & Impersonation",
    description: "Know if your photos are misused online.",
    iconName: "Image"
  },
  {
    title: "AI Safety Coach",
    description: "Get personalized guidance and actionable safety tips.",
    iconName: "Bot"
  },
  {
    title: "Safe Folder",
    description: "Securely save scans, evidence, and reports locally.",
    iconName: "Lock"
  },
  {
    title: "Real-Time Alerts",
    description: "Stay informed instantly about any risk.",
    iconName: "Bell"
  }
];

export const TESTIMONIALS = [
  {
    text: "DigiSafe+ alerted me to a fake profile using my photos within minutes. I was able to report it before it did any damage.",
    author: "Aminata, Nairobi",
    role: "Entrepreneur"
  },
  {
    text: "As a mother of two teen girls, the Family Plan gives me peace of mind without invading their privacy. It's a lifesaver.",
    author: "Chioma, Lagos",
    role: "Parent"
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
  type: 'NGO' | 'Government' | 'Hotline';
}

export const HELP_CENTERS: HelpCenter[] = [
  { name: "SafeCity Rwanda", city: "Kigali", country: "Rwanda", phone: "+250 788 123 456", email: "contact@safecity.rw", type: "NGO" },
  { name: "Isange One Stop Center", city: "Kigali", country: "Rwanda", phone: "3512 (Toll Free)", email: "help@isange.gov.rw", type: "Government" },
  { name: "Gender Based Violence Recovery Centre", city: "Nairobi", country: "Kenya", phone: "+254 719 638 006", email: "gbvrc@nwh.co.ke", type: "NGO" },
  { name: "FIDA Kenya", city: "Nairobi", country: "Kenya", phone: "+254 722 509 760", email: "info@fidakenya.org", type: "NGO" },
  { name: "Domestic Violence Support Group", city: "Lagos", country: "Nigeria", phone: "0813 966 8888", email: "support@dvsg.ng", type: "NGO" },
  { name: "Lagos State Domestic & Sexual Violence Response Team", city: "Lagos", country: "Nigeria", phone: "0813 796 0048", email: "info@dsvrtlagos.org", type: "Government" },
  { name: "Tears Foundation", city: "Johannesburg", country: "South Africa", phone: "*134*7355#", email: "info@tears.co.za", type: "NGO" },
  { name: "Gender Violence Command Centre", city: "Pretoria", country: "South Africa", phone: "0800 428 428", email: "support@gvdc.gov.za", type: "Government" },
  { name: "The Ark Foundation", city: "Accra", country: "Ghana", phone: "+233 24 377 7773", email: "info@arkfoundationghana.org", type: "NGO" }
];

export const CHATBOT_QUICK_REPLIES = [
  "How do I report harassment?",
  "Find help near me",
  "Someone is using my photos",
  "Secure my account"
];