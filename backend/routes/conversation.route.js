import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getConversation } from "../controllers/conversation.controller.js";


const router = express.Router();

router.get("/", protectRoute, getConversation);

export default router;
