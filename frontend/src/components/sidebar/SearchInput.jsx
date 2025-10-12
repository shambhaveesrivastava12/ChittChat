import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";
import { getConversation } from "../../utils/getConversation";
import { useAuthContext } from "../../context/AuthContext";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation, appendConversation } = useConversation();
  const { conversations } = useGetConversations();
  const { authUser } = useAuthContext(); // the current user id is to be passed to the getConversation function
  const userId = authUser?._id;

  const handleSubmit = async (e) => {
    // making the function async to allow the searching of user
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long");
    }
    if (authUser.username === search) {
      toast.error("Cannot initialize conversation with self");
      return;
    }

    // First, check if user exists in current conversations by username
    const existingUser = conversations.users.find(
      (c) => c.username.toLowerCase() === search.toLowerCase()
    );
    if (existingUser) {
      setSelectedConversation(existingUser);
      setSearch("");
      return;
    }

    // If not found locally, search for user on server
    try {
      const data = await getConversation(search.toLowerCase(), userId);
      if (data?.error) {
        toast.error(data.error);
        return;
      }

      const userToAppend = data?.conversation?.participants.filter(
        (user) => user._id !== userId
      )[0];
      if (!userToAppend) {
        toast.error("No such user found!");
        return;
      }

      // Add user to conversations and select them
      appendConversation(userToAppend);
      setSelectedConversation(userToAppend);
      setSearch("");
    } catch (error) {
      console.error("Search error:", error);
      toast.error("Failed to search for user. Please try again.");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search…"
        className="input input-bordered rounded-full bg-white dark:text-white dark:bg-slate-700"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};
export default SearchInput;
