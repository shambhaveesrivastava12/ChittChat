import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSidebar , getProfile,  updateProfile, blockUser, unblockUser, getBlockedUsers } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", protectRoute, getUsersForSidebar);
router.get("/profile", protectRoute, getProfile);
router.put("/update", protectRoute, updateProfile);
router.post('/block/:id', protectRoute, blockUser);
router.delete('/block/:id', protectRoute, unblockUser);
router.get('/blocked', protectRoute, getBlockedUsers);

export default router;
