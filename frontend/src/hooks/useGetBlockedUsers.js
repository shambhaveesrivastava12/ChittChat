import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";

const useGetBlockedUsers = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const fetchBlocked = useCallback(async () => {
    setLoading(true);
    try {
      const API = import.meta.env.VITE_API_URL || "";
      const token = localStorage.getItem("chat-token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const res = await fetch(`${API}/api/users/blocked`, {
        credentials: "include",
        headers,
      });

      const contentType = res.headers.get("content-type") || "";
      let data = null;
      if (contentType.includes("application/json")) {
        data = await res.json();
      }

      if (!res.ok) {
        throw new Error(data?.error || `Failed to fetch blocked users (${res.status})`);
      }

      setUsers(data?.users || []);
    } catch (err) {
      toast.error(err.message || "Failed to load blocked users");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlocked();
  }, [fetchBlocked]);

  return { loading, users, refresh: fetchBlocked };
};

export default useGetBlockedUsers;
