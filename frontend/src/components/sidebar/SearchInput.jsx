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
	const { authUser } = useAuthContext();
	const userId = authUser?._id;

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!search) return;
		if (search.length < 3) {
			return toast.error("Search term must be at least 3 characters long");
		}
		if (authUser.username === search) {
			toast.error("Cannot initialize conversation with self");
			return;
		}

		const conversation = conversations.users.find((c) =>
			c.fullName.toLowerCase().includes(search.toLowerCase())
		);

		if (conversation) {
			setSelectedConversation(conversation);
			setSearch("");
		} else {
			const data = await getConversation(search.toLowerCase(), userId);
			const userToAppend = data?.conversation?.participants.filter(
				(user) => user._id !== userId
			)[0];

			if (!userToAppend) {
				toast.error("No such user found!");
				return;
			}
			appendConversation(userToAppend);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex items-center gap-2 w-full bg-white/90 dark:bg-slate-800/60 border border-slate-400/40 dark:border-slate-600/50 
                       rounded-full px-3 py-1.5 backdrop-blur-md transition-all focus-within:ring-2 focus-within:ring-sky-500"
		>
			<input
				type="text"
				placeholder="Search…"
				className="flex-1 bg-transparent text-gray-800 dark:text-gray-100 placeholder-gray-500 outline-none"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<button
				type="submit"
				className="p-2 rounded-full bg-sky-500 hover:bg-sky-600 transition text-white flex items-center justify-center"
			>
				<IoSearchSharp className="w-5 h-5" />
			</button>
		</form>
	);
};

export default SearchInput;
