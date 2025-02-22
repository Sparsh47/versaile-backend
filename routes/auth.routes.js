import express from "express";
import {login, signup} from "../controllers/user.controller.js";

export const router = express.Router();

router.post("/signup", signup)
router.post("/login", login)