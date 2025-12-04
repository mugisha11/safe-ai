export type Platform = 'Facebook' | 'Instagram' | 'X' | 'TikTok' | 'WhatsApp' | 'Telegram';

export enum AlertSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export enum AlertType {
  HARASSMENT = 'Harassment',
  IMPERSONATION = 'Impersonation',
  IMAGE_MISUSE = 'Image Misuse',
  LOGIN_ANOMALY = 'Login Anomaly',
  FOLLOWER_SPIKE = 'Suspicious Follower Spike'
}

export interface Alert {
  id: string;
  platform: Platform;
  type: AlertType;
  severity: AlertSeverity;
  excerpt: string;
  timestamp: Date;
  read: boolean;
}

export interface ConnectedAccount {
  platform: Platform;
  connected: boolean;
  username?: string;
  lastSync?: Date;
}

export interface ReportItem {
  id: string;
  title: string;
  date: string;
  platform: Platform;
  status: 'Draft' | 'Ready' | 'Submitted';
  content: string;
}

export interface SafetyScoreMetrics {
  privacy: number;
  harassment: number;
  image: number;
  impersonation: number;
  account: number;
  overall: number;
}
