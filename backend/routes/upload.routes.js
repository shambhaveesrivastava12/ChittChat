// backend/routes/upload.routes.js
import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import upload from "../middleware/multer.middleware.js";
import { uploadFile } from "../controllers/upload.controller.js";

const router = express.Router();

// ✅ POST /api/upload
router.post("/", protectRoute, upload.single("file"), uploadFile);

export default router;
