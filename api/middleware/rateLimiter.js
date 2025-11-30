import rateLimit from "express-rate-limit";

// Create a general rate limiter
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: {
    message: "Too many requests from this IP, please try again after 15 minutes."
  },
  standardHeaders: true, 
  legacyHeaders: false,
});
// Create a specific rate limiter for authentication routes
export const authLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 10,
  message: {
    message: "Too many login attempts. Please try again later.",
  },
});
