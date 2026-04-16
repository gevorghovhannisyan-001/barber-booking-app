import api from "./axios";

export const createBooking = async (bookingData) => {
  const res = await api.post("/bookings/checkout", bookingData);
  return res.data;
};