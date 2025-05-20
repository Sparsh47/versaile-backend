import {Router} from "express";
import {addDocumentInUser, getAllDocuments} from "../controllers/document.controller.js";

export const router = Router();

router.get("/getAllDocuments/:id", getAllDocuments);
router.patch("/addDocument/:userId",addDocumentInUser);