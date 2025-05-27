import {Router} from "express";
import {
    addDocumentInUser,
    getAllDocuments,
    createDocument,
} from "../controllers/document.controller.js";

export const router = Router();

router.get("/getAllDocuments/:id", getAllDocuments);
router.post("/createDocument/:userId", createDocument);
router.patch("/addDocument/:userId", addDocumentInUser);