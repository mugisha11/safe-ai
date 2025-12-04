import { Alert, AlertSeverity, AlertType, Platform } from '../types';

// Generators for mock data
const MOCK_HANDLES = ['@creepy_guy99', '@anon_user', '@ex_boyfriend', '@bot_network_23'];
const MOCK_MESSAGES = [
  'I know where you live.',
  'Why didnt you reply to me?',
  'Send me money or else.',
  'Is this you in this photo?',
  'New login detected from Lagos, Nigeria'
];

export const generateMockAlert = (): Alert => {
  const platforms: Platform[] = ['Instagram', 'X', 'Facebook', 'TikTok', 'WhatsApp'];
  const platform = platforms[Math.floor(Math.random() * platforms.length)];
  
  const types = Object.values(AlertType);
  const type = types[Math.floor(Math.random() * types.length)];
  
  let severity = AlertSeverity.LOW;
  let excerpt = '';

  switch (type) {
    case AlertType.HARASSMENT:
      severity = Math.random() > 0.5 ? AlertSeverity.HIGH : AlertSeverity.MEDIUM;
      excerpt = `DM from ${MOCK_HANDLES[Math.floor(Math.random() * MOCK_HANDLES.length)]}: "${MOCK_MESSAGES[Math.floor(Math.random() * 3)]}"`;
      break;
    case AlertType.LOGIN_ANOMALY:
      severity = AlertSeverity.CRITICAL;
      excerpt = `Unusual login attempt from Chrome/Windows in Nairobi.`;
      break;
    case AlertType.IMPERSONATION:
      severity = AlertSeverity.HIGH;
      excerpt = `New account using your profile picture detected on ${platform}.`;
      break;
    default:
      excerpt = "Suspicious activity detected on your timeline.";
  }

  return {
    id: Math.random().toString(36).substr(2, 9),
    platform,
    type,
    severity,
    excerpt,
    timestamp: new Date(),
    read: false
  };
};

// Simulate fetching connected accounts
export const getConnectedAccounts = () => {
    return [
        { platform: 'Instagram', connected: true, username: '@digisister_ke' },
        { platform: 'Facebook', connected: true, username: 'Jane Doe' },
        { platform: 'TikTok', connected: false },
        { platform: 'X', connected: false },
        { platform: 'WhatsApp', connected: true, username: '+254 7XX XXX XXX' }
    ];
};
