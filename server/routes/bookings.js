import express from "express";
import { createBooking} from "../controllers/bookingController.js";
import { bookingLimiter } from "../middleware/rateLimiters.js";

const router = express.Router();

router.post("/checkout", bookingLimiter, createBooking); 

export default router;