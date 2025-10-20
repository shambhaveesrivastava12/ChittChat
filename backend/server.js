// backend/server.js
import path from "path";
import fs from "fs";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import conversationRoutes from "./routes/conversation.route.js"
import uploadRoutes from "./routes/upload.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js"; // ✅ uses shared app with CORS already applied

// Load environment variables
dotenv.config();

const __dirname = path.resolve();
const PORT = process.env.PORT || 5000;

// ✅ Core middleware
app.use(express.json());
app.use(cookieParser());

// ✅ Serve uploaded files
const uploadsPath = path.join(__dirname, "backend/public/uploads");
app.use("/uploads", express.static(uploadsPath));

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use('/api/conversation',conversationRoutes)
// Debug endpoint to help diagnose CORS/origin issues. Returns the incoming Origin header and allowed origins.
app.use("/api/upload", uploadRoutes);

// ✅ Debug endpoint to verify CORS
app.get("/api/debug/origin", (req, res) => {
	const incomingOrigin = req.headers.origin || null;
	const rawFrontendUrls =
		process.env.FRONTEND_URLS || process.env.FRONTEND_URL || "http://localhost:3000";
	const FRONTEND_URLS = rawFrontendUrls
		.split(",")
		.map((s) => s.trim().replace(/\/$/, ""))
		.filter(Boolean);
	res.json({ incomingOrigin, allowedOrigins: FRONTEND_URLS });
});

// ✅ Serve frontend build (optional if you deploy frontend separately)
const frontendDistPath = path.join(__dirname, "frontend", "dist");
const frontendIndex = path.join(frontendDistPath, "index.html");

if (fs.existsSync(frontendIndex)) {
	app.use(express.static(frontendDistPath));

	app.get("*", (req, res) => {
		res.sendFile(frontendIndex);
	});
} else {
	console.log("⚠️ Frontend build not found at", frontendIndex);
}

// ✅ Start server
server.listen(PORT, () => {
	connectToMongoDB();
	console.log(`🚀 Server running on port ${PORT}`);
});
