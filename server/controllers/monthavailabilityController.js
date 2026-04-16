import Booking from "../models/Booking.js";

export const getMonthAvailability = async (req, res) => {
    try {
        const { month } = req.query;

        if (!month) {
            return res.status(400).json({ error: "Month query parameter is required" });
        }

        const bookings = await Booking.find({ 
            date: { 
                $regex: `^${month}` // Matches dates like "2024-07-01", "2024-07-15", etc.
            }
        });
        const days = {};

        bookings.forEach(booking => {
            if(!days[booking.date]) {
                days[booking.date] = 0;
            }
            days[booking.date]++;
        });

        const result = {};

        Object.keys(days).forEach(date => {
            if(days[date] >= 11) { // Assuming 11 slots per day
                result[date] = "full";
            } else {
                result[date] = "available";
            }
        });

        res.json(result);
    } catch (err) {
        console.error("Error fetching month availability:", err);
        res.status(500).json({ error: "Server error" });
    }
}