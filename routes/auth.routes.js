import express from "express";
import {syncUser} from "../controllers/user.controller.js";

export const router = express.Router();

router.post("/sync-user", syncUser)
