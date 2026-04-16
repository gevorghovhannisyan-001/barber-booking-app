// services/telegram.service.js
import bot from "../utils/telegram.js";

export const sendBookingNotification = async (chatId, booking) => {
  const message = `
💈 Նոր Ամրագրում

👤 Անուն: ${booking.firstname} ${booking.lastname}
📅 Օր: ${booking.date}
⏰ Ժամ: ${booking.time}
📞 Հեռախոս: ${booking.phone}
`;

  try {
    await bot.sendMessage(chatId, message);
  } catch (err) {
    console.error("Telegram error:", err.message);
  }
};
