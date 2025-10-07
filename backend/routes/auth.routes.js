import express from "express";
import { login, logout, signup , requestOtp, resetPasswordWithOtp, changePassword} from "../controllers/auth.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.post("/forgot-password/otp", requestOtp);

router.post("/reset-password/otp", resetPasswordWithOtp);

router.put("/profile/change-password", protectRoute, changePassword);

export default router;
