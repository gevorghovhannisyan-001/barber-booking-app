import Booking from "../models/Booking.js";

const generateSlots = (start, end, duration) => {
  const slots = [];

  let [hour, minute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);

  while (hour < endHour || (hour === endHour && minute < endMinute)) {
    const time =
      String(hour).padStart(2, "0") +
      ":" +
      String(minute).padStart(2, "0");

    slots.push(time);

    minute += duration;

    if (minute >= 60) {
      hour += Math.floor(minute / 60);
      minute = minute % 60;
    }
  }

  return slots;
};

export const getAvailableSlots = async (req, res) => {
  try {
    const { date } = req.query;     
    if (!date) {
      return res.status(400).json({ error: "Date query parameter is required" });
    }

    const start = "09:00";
    const end = "20:00";
    const duration = 60; // 60 minutes per slot
    const allSlots = generateSlots(start, end, duration);

    // Fetch booked times for the given date
    const bookings = await Booking.find({ date });
    const bookedTimes = bookings.map((booking) => booking.time);

    // Filter out booked times from all slots
    const availableSlots = allSlots.filter((slot) => !bookedTimes.includes(slot));

    res.json({ slots: availableSlots });

  } catch (err) {
    console.error("Error fetching available slots:", err);
    res.status(500).json({ error: "Server error" });
  }
};