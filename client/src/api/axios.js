import axios from "axios";

const api = axios.create({
  baseURL: "https://barber-booking-app-1.onrender.com/api",
});

export default api;
