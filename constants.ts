import { DeveloperProfile, TelegramConfig, SupportTier } from './types';

// WARNING: In a production environment, never expose Bot Tokens in client-side code.
export const TELEGRAM_CONFIG: TelegramConfig = {
  botToken: "8290154403:AAF_t0so8vHIBgliK55FsVFAxF_eJ4nGRc0",
  chatId: "8275181483"
};

export const DEV_PROFILE: DeveloperProfile = {
  name: "MAULANA",
  role: "Full Stack Developer",
  avatar: "https://files.catbox.moe/w64vs7.jpg",
  skills: ["React.js", "JavaScript", "HTML", "UI/UX", "Python"],
  bio: "I am the developer of this website, which I created for the purpose of easy and practical payments."
};

export const DANA_DETAILS = {
  number: "08812477475",
  name: "TOLANI"
};

// Using a placeholder QR for demo. Replace with actual QRIS.
export const QRIS_IMAGE_URL = "https://files.catbox.moe/6wyqxv.jpg";

export const SUPPORT_TIERS: SupportTier[] = [
  {
    id: 'coffee',
    label: 'Coffee',
    price: 15000,
    emoji: '☕',
    description: 'Buy me a coffee to keep me awake.'
  },
  {
    id: 'meal',
    label: 'Meal',
    price: 50000,
    emoji: '🍔',
    description: 'Fuel for a coding session.'
  },
  {
    id: 'server',
    label: 'Server',
    price: 100000,
    emoji: '🚀',
    description: 'Help cover server and domain costs.'
  }
];