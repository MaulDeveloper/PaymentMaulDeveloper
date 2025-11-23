export enum PaymentMethod {
  DANA = 'dana',
  QRIS = 'qris'
}

export interface DeveloperProfile {
  name: string;
  role: string;
  avatar: string;
  skills: string[];
  bio: string;
}

export interface TelegramConfig {
  botToken: string;
  chatId: string;
}

export interface SupportTier {
  id: string;
  label: string;
  price: number;
  emoji: string;
  description: string;
}