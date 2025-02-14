import {rateLimit} from "express-rate-limit";

export const authRateLimiter = rateLimit({
    windowMs: 5*60*1000,
    max: 20,
    message: "Limit has been reached. Please try again after 5 minutes."
})