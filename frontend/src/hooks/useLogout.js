import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

const useLogout = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const logout = async () => {
		setLoading(true);
		try {
			const API = import.meta.env.VITE_API_URL || "";
			const token = localStorage.getItem("chat-token");
			const headers = token ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } : { "Content-Type": "application/json" };
			const res = await fetch(`${API}/api/auth/logout`, {
				method: "POST",
				headers,
				credentials: "include",
			});
			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}

			localStorage.removeItem("chat-user");
			useConversation.persist.clearStorage(); // clearing the zustand local storage conversations on logout
			const store = useConversation.getState(); 
			store.setConversations({ users: [], nextCursor: null, hasNextPage: false },true);// clearing the zustand memory of the old conversations
			setAuthUser(null);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, logout };
};
export default useLogout;
