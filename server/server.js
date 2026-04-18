import 'dotenv/config';
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import { connectDB } from "./utils/db.js"; // your connect util
import bookingRoutes from "./routes/bookings.js";
import availabilityRoutes from "./routes/availability.js";
import monthAvailabilityRoutes from "./routes/monthavailability.js";
import "./utils/telegram.js"; // initialize Telegram bot
import bot from './utils/telegram.js';

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 
  "💈 You are now connected and will receive booking notifications."
  );

  console.log("Telegram chat_id:", chatId);
});

const app = express();
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use(cors({
  origin: process.env.FRONTEND_URL || "https://barber-booking-app-git-main-hovhannigevorg-2540s-projects.vercel.app",
  credentials: true,
}));

app.use("/api/bookings", bookingRoutes);
app.use("/api/availability", availabilityRoutes);
app.use("/api", monthAvailabilityRoutes);

connectDB(process.env.MONGODB_URI).then(() => {
  app.listen(process.env.PORT || 5000, () => console.log(`Server running on http://localhost:${process.env.PORT || 5000}`));
});
