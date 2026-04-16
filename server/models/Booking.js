import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  date: { type: String, required: true },
  time: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  acceptedTerms: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Booking", bookingSchema);