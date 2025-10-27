import { useState } from "react";
import toast from "react-hot-toast";

const useBlockUser = () => {
  const [loading, setLoading] = useState(false);

  const blockUser = async (userId) => {
    if (!userId) return;
    setLoading(true);
    try {
      const API = import.meta.env.VITE_API_URL || "";
      const token = localStorage.getItem("chat-token");
      const headers = token
        ? { Authorization: `Bearer ${token}` }
        : {};

      const res = await fetch(`${API}/api/users/block/${userId}`, {
        method: "POST",
        credentials: "include",
        headers,
      });

      const contentType = res.headers.get("content-type") || "";
      let data = null;
      if (contentType.includes("application/json")) {
        data = await res.json();
      }

      if (!res.ok) {
        throw new Error(data?.error || `Failed to block user (${res.status})`);
      }
      toast.success("User blocked");
      return true;
    } catch (err) {
      toast.error(err.message || "Failed to block user");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, blockUser };
};

export default useBlockUser;
