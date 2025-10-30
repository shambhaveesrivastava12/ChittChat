import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
	const { socket } = useSocketContext();
	const { messages, setMessages } = useConversation();

	useEffect(() => {
		socket?.on("newMessage", (newMessage) => {
			newMessage.shouldShake = true;
			const sound = new Audio(notificationSound);
			sound.play();
			setMessages([...messages, newMessage]);
		});

		// Update messages as seen on sender's side
		socket?.on("messagesSeen", ({ by, messageIds }) => {
			if (!Array.isArray(messageIds) || !messageIds.length) return;
			setMessages(
				messages.map((m) =>
					messageIds.some((id) => String(id) === String(m._id))
						? { ...m, seenBy: Array.isArray(m.seenBy) ? [...new Set([...m.seenBy, by])] : [by] }
						: m
				)
			);
		});

		return () => {
			socket?.off("newMessage");
			socket?.off("messagesSeen");
		};
	}, [socket, setMessages, messages]);
};
export default useListenMessages;
