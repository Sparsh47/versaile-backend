import express from "express";
import {login, signup} from "../controllers/user.controller.js";
import {authRateLimiter} from "../middlewares/authRateLimiter.js";

export const router = express.Router();

router.post("/signup", authRateLimiter, signup)
router.post("/login", authRateLimiter, login)