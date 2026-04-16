// middleware/rateLimiters.js
import rateLimit from "express-rate-limit";

// Limit how often a single IP can attempt to book or request email verifications
export const bookingLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 booking requests per windowMs
  message: {
    error: "Too many booking attempts, please try again later.",
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
});
