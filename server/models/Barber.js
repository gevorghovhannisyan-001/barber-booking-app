import mongoose from "mongoose";

const barberSchema = new mongoose.Schema({
  name: String,
  phone: String,
  telegramChatId: String
});

const Barber = mongoose.model("Barber", barberSchema);

export default Barber;