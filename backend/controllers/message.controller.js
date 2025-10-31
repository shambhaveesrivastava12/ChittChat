import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
	try {
		const { message, fileUrl, fileType } = req.body;
		const { id: receiverId } = req.params;
		const senderId = req.user._id;

		// Enforce blocklist in both directions
		const [sender, receiver] = await Promise.all([
			User.findById(senderId).select("blockedUsers"),
			User.findById(receiverId).select("blockedUsers"),
		]);
		if (!receiver) return res.status(404).json({ error: "Recipient not found" });
		const senderBlockedReceiver = sender?.blockedUsers?.some((id) => String(id) === String(receiverId));
		const receiverBlockedSender = receiver?.blockedUsers?.some((id) => String(id) === String(senderId));
		if (senderBlockedReceiver || receiverBlockedSender) {
			return res.status(403).json({ error: "You cannot message this user" });
		}

		if (!message && !fileUrl) {
			return res.status(400).json({ error: "Cannot send an empty message" });
		}

		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
			});
		}

		const newMessage = new Message({
			senderId,
			receiverId,
			message,
			fileUrl,
			fileType,
			deliveredTo: [receiverId], // Mark as delivered to receiver
			seenBy: [],
		});

		if (newMessage) {
			conversation.messages.push(newMessage._id);
		}

		await Promise.all([conversation.save(), newMessage.save()]);

		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

		res.status(201).json(newMessage);
	} catch (error) {
		console.error("Error in sendMessage controller:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const getMessages = async (req, res) => {
	try {
		const { id: userToChatId } = req.params;
		const senderId = req.user._id;

		// Disallow fetching messages if either user has blocked the other
		const [me, them] = await Promise.all([
			User.findById(senderId).select("blockedUsers"),
			User.findById(userToChatId).select("blockedUsers"),
		]);
		if (!them) return res.status(404).json({ error: "User not found" });
		const iBlocked = me?.blockedUsers?.some((id) => String(id) === String(userToChatId));
		const theyBlocked = them?.blockedUsers?.some((id) => String(id) === String(senderId));
		if (iBlocked || theyBlocked) {
			return res.status(403).json({ error: "You cannot view messages with this user" });
		}

				const conversation = await Conversation.findOne({
						participants: { $all: [senderId, userToChatId] },
				}).populate("messages");

				if (!conversation) return res.status(200).json([]);

				// Determine which messages should be marked as seen
				const toMarkSeen = conversation.messages.filter(
					(m) => String(m.receiverId) === String(senderId) && !(m.seenBy || []).some((u) => String(u) === String(senderId))
				);
				const toMarkIds = toMarkSeen.map((m) => m._id);

				if (toMarkIds.length) {
					await Message.updateMany(
						{ _id: { $in: toMarkIds } },
						{ $addToSet: { seenBy: senderId } }
					);

					// Notify original sender that these messages were seen
					const otherUserSocketId = getReceiverSocketId(userToChatId);
					if (otherUserSocketId) {
						io.to(otherUserSocketId).emit("messagesSeen", {
							by: senderId,
							messageIds: toMarkIds,
						});
					}
				}

				// Refetch messages to get updated seenBy
				const updatedConversation = await Conversation.findOne({
						participants: { $all: [senderId, userToChatId] },
				}).populate("messages");
				const messages = updatedConversation.messages;

				res.status(200).json(messages);
	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};