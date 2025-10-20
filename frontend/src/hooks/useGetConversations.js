import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

const useGetConversations = (initialLimit = 5) => { 
  const [loading, setLoading] = useState(true);
  const { conversations, setConversations } = useConversation();// using zustand store to get conversations

  // creating a fetchConversation function which will be returned by the hook to export the loadMore functionality
  const fetchConversations = useCallback(async (limit = initialLimit, cursor = "") => {
    try {
      setLoading(true);
      const API = import.meta.env.VITE_API_URL || "";
      const token = localStorage.getItem("chat-token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

	  // checking if limit is a valid int greater than 0
	  const parsedLimit = parseInt(limit, 10);
	  const safeLimit = !isNaN(parsedLimit) && parsedLimit > 0 ? parsedLimit : 2;

	  // building parameters
      const params = new URLSearchParams();
      params.set("limit", safeLimit);
      if (cursor) params.set("cursor", cursor);

      // fetching the convo based on the parameters
      const res = await fetch(`${API}/api/users?${params.toString()}`, {
        credentials: "include",
        headers,
      });
      const data = await res.json();

      if (data.error) throw new Error(data.error);

      setConversations(data) // updating the zustand store
      
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [initialLimit]);

  // Initial fetch 
  useEffect(() => {
    if (conversations.users?.length > 0) { // if the data is already loaded via the local storage only set the loading to false and return
    setLoading(false);
    return;
  }
  fetchConversations(initialLimit);
  }, [fetchConversations, initialLimit, conversations.users]);

  // loadMore function
  const loadMore = () => {
    if (conversations.hasNextPage) {
      fetchConversations(initialLimit, conversations.nextCursor);
    }
  };

  return { loading, conversations, loadMore };// exporting the loadMore function
};

export default useGetConversations;
