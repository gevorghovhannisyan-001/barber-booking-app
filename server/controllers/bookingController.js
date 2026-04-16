import Booking from "../models/Booking.js";
import { sendEmail } from "../utils/mailer.js"; // optional
import { sendBookingNotification } from "../services/telegram.service.js"; // optional
// Public — create booking
export const createBooking = async (req, res) => {
  try {
    const {
      date,
      time,
      firstname,
      lastname,
      phone,
      email,
      acceptedTerms
    } = req.body;

    // 1️⃣ Validate required fields
    if (!date || !time || !firstname || !lastname || !phone || !email) {
      return res.status(400).json({
        error: "All fields are required"
      });
    }

    // 2️⃣ Validate terms acceptance
    if (acceptedTerms !== true) {
      return res.status(400).json({
        error: "You must accept the terms."
      });
    }

    // 3️⃣ Prevent double booking
    const existingBooking = await Booking.findOne({ date, time });
    if (existingBooking) {
      return res.status(400).json({
        error: "This time slot is already booked"
      });
    }

    // 4️⃣ Create booking
    const newBooking = await Booking.create({
      date,
      time,
      firstname,
      lastname,
      phone,
      email,
      acceptedTerms
    });

    const BARBER_CHAT_ID = process.env.BARBER_CHAT_ID;

    // 5️⃣ Send Telegram notification (NON-BLOCKING)
    sendBookingNotification(BARBER_CHAT_ID, newBooking).catch((err) => {
      console.error("Telegram notification failed:", err.message);
    });

    // 6️⃣ Send email (NON-BLOCKING)
    sendEmail(
      process.env.ADMIN_EMAIL,
      "💈 Նոր ամրագրում",
      `
        <h3>Նոր ամրագրում ${firstname} ${lastname}-ից</h3>
        <p>Օր: ${date}</p>
        <p>Ժամ: ${time}</p>
        <p>Հեռախոս: ${phone}</p>
        <p>Էլ. փոստ: ${email}</p>
      `
    ).catch((err) => {
      console.error("Email sending failed:", err.message);
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking: newBooking
    });

  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({
      error: "Server error"
    });
  }
};