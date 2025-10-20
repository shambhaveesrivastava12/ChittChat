// socket/socket.js
import { Server } from "socket.io";
import http from "http";
import express from "express";
import cors from "cors";

// Create express app
const app = express();

// ✅ Load frontend URLs from environment variables
const rawFrontendUrls =
	process.env.FRONTEND_URLS || process.env.FRONTEND_URL || "http://localhost:3000";

const CLIENT_ORIGINS = rawFrontendUrls
	.split(",")
	.map((s) => s.trim().replace(/\/$/, "")) // remove trailing slash
	.filter(Boolean);

console.log("[Socket Setup] Allowed CORS origins:", CLIENT_ORIGINS);

// ✅ Apply CORS middleware directly to the shared Express app
app.use(
	cors({
		origin: (origin, callback) => {
			if (!origin || CLIENT_ORIGINS.includes(origin.replace(/\/$/, ""))) {
				return callback(null, true);
			}
			console.log("CORS blocked for origin:", origin);
			return callback(null, false);
		},
		credentials: true,
		methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
	})
);

// ✅ Handle preflight requests (important for Render)
app.options("*", cors());

// ✅ Create HTTP server using the same app
const server = http.createServer(app);

// ✅ Initialize Socket.io with identical CORS policy
const io = new Server(server, {
	cors: {
		origin: CLIENT_ORIGINS,
		methods: ["GET", "POST"],
		credentials: true,
	},
});

// ===== Socket Logic ===== //
const userSocketMap = {}; // { userId: socketId }

export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};

export const getAllOnlineUsers = () => {
	return { ...userSocketMap };
};

// Connection logic
io.on("connection", (socket) => {
	console.log("✅ User connected:", socket.id);

	// Extract userId from handshake (query or auth)
	const { auth = {}, query = {} } = socket.handshake;
	let userId = query.userId || auth.userId;

	if (!userId && auth.token) {
		try {
			const jwt = require("jsonwebtoken");
			const decoded = jwt.verify(auth.token, process.env.JWT_SECRET);
			userId = decoded.userId;
		} catch (err) {
			console.log("❌ Invalid socket auth token:", err.message);
		}
	}

	if (userId && userId !== "undefined") {
		userSocketMap[userId] = socket.id;
		console.log(`🟢 Registered user ${userId} -> socket ${socket.id}`);
	} else {
		console.log("⚠️ No userId provided for socket:", socket.id);
	}

	// Notify all users of current online list
	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	// 🔹 Listen for typing events and relay to recipient
	socket.on("typing", ({ to }) => {
		const receiverSocketId = getReceiverSocketId(to);
		if (receiverSocketId) {
			io.to(receiverSocketId).emit("typing", { from: userId });
		}
		});

	socket.on("stop_typing", ({ to }) => {
		const receiverSocketId = getReceiverSocketId(to);
		if (receiverSocketId) {
			io.to(receiverSocketId).emit("stop_typing", { from: userId });
		}
	});


	// Disconnect logic
	socket.on("disconnect", () => {
		console.log("🔴 User disconnected:", socket.id);

		for (const [uid, sid] of Object.entries(userSocketMap)) {
			if (sid === socket.id) {
				delete userSocketMap[uid];
				break;
			}
		}

		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
});

// Export shared app, io, and server
export { app, io, server };
