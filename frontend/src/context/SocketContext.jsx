import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const { authUser } = useAuthContext();

	useEffect(() => {
		if (authUser) {
			const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || window.location.origin;
			// Token is stored as a raw JWT string; don't JSON.parse it
			const tokenStr = localStorage.getItem("chat-token") || "";

			const socket = io(SOCKET_URL, {
				auth: {
					// Provide both the raw token and userId to avoid server-side JSON parsing/require
					token: { token: tokenStr, userId: authUser?._id },
				},
				withCredentials: true,
			});

			setSocket(socket);

			// socket.on() is used to listen to the events. can be used both on client and server side
			socket.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
			});

			return () => socket.close();
		} else {
			// Close and clear any existing socket without referencing it in deps
			setSocket((prev) => {
				if (prev) prev.close();
				return null;
			});
		}
	}, [authUser]);

	return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};
