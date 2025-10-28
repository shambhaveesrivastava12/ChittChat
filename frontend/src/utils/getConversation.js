// function resposible for fetchinng the conversation

import toast from "react-hot-toast";

export const getConversation = async (username, userId) => {
  try {
    const API = import.meta.env.VITE_API_URL || "";
    const token = localStorage.getItem("chat-token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const res = await fetch(
      `${API}/api/conversation?username=${username}&userId=${userId}`,
      {
        credentials: "include",
        headers,
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return { error: data.error || "Failed to fetch conversation" };
    }

    return data;
  } catch (error) {
    console.error("getConversation error:", error);
    return { error: "Network error. Please check your connection." };
  }
};
