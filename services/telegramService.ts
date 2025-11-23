import { TELEGRAM_CONFIG } from '../constants';

export const sendProofToTelegram = async (
  file: File,
  note: string,
  productName: string,
  nominal: string,
  method: string
): Promise<boolean> => {
  const formData = new FormData();
  formData.append("chat_id", TELEGRAM_CONFIG.chatId);
  
  const caption = `
⚡ *NEW PROOF OF PAYMENT* ⚡
━━━━━━━━━━━━━━━━━━
📦 *Product:* ${productName || "-"}
👤 *Name:* ${note || "Anonymous"}
💰 *Method:* ${method.toUpperCase()}
💵 *Nominal:* ${nominal || "-"}
📅 *Time:* ${new Date().toLocaleString()}
━━━━━━━━━━━━━━━━━━
🚀 _"Code never sleeps."_
`;

  formData.append("caption", caption);
  formData.append("parse_mode", "Markdown");

  const isImage = file.type.startsWith("image/");
  
  // Determine endpoint and field name based on file type
  const endpoint = isImage ? "sendPhoto" : "sendDocument";
  const fileField = isImage ? "photo" : "document";
  
  formData.append(fileField, file);

  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_CONFIG.botToken}/${endpoint}`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (!data.ok) {
      console.error("Telegram API Error:", data);
      throw new Error(data.description || "Failed to send to Telegram");
    }
    return true;
  } catch (error) {
    console.error("Network Error:", error);
    throw error;
  }
};