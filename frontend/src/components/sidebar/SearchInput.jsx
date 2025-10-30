// import { useState } from "react";
// import { IoSearchSharp } from "react-icons/io5";
// import useConversation from "../../zustand/useConversation";
// import useGetConversations from "../../hooks/useGetConversations";
// import toast from "react-hot-toast";
// import { getConversation } from "../../utils/getConversation";
// import { useAuthContext } from "../../context/AuthContext";

// const SearchInput = () => {
// 	const [search, setSearch] = useState("");
// 	const { setSelectedConversation,appendConversation } = useConversation();
// 	const { conversations } = useGetConversations();
// 	const {authUser} = useAuthContext(); // the current user id is to be passed to the getConversation function
// 	const userId = authUser?._id

// 	const handleSubmit = async (e) => { // making the function async to allow the searching of user
// 		e.preventDefault();
// 		if (!search) return;
// 		if (search.length < 3) {
// 			return toast.error("Search term must be at least 3 characters long");
// 		}
// 		if(authUser.username == search){
// 			toast.error("cannot initialize conversation with self")
// 			return
// 		}
// 		const conversation = conversations.users.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase())); // updating the use of conversations from useGetConversations hook
// 		if (conversation) {
// 			setSelectedConversation(conversation);
// 			setSearch("");
// 		}else{
// 			const data = await getConversation(search.toLowerCase(),userId)
// 			const userToappend = data?.conversation?.participants.filter((user)=> user._id != userId )[0]
// 			if(!userToappend){
// 				toast.error("No such user found!");
// 				return
// 			}
// 			appendConversation(userToappend) // updating zustand store to show the fetched user
// 		} 
// 	};
// 	return (
// 		<form onSubmit={handleSubmit} className='flex items-center gap-2'>
// 			<input
// 				type='text'
// 				placeholder='Search…'
// 				className='input input-bordered rounded-full bg-white dark:text-white dark:bg-slate-700'
// 				value={search}
// 				onChange={(e) => setSearch(e.target.value)}
// 			/>
// 			<button type='submit' className='btn btn-circle bg-sky-500 text-white'>
// 				<IoSearchSharp className='w-6 h-6 outline-none' />
// 			</button>
// 		</form>
// 	);
// };
// export default SearchInput;
// src/components/sidebar/SearchInput.jsx
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
    if (authUser?.username === search) {
      toast.error("cannot initialize conversation with self");
      return;
    }
    const conversation = conversations?.users?.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      const data = await getConversation(search.toLowerCase(), userId);
      const userToappend = data?.conversation?.participants?.filter((user) => user._id != userId)[0];
      if (!userToappend) {
        toast.error("No such user found!");
        return;
      }
      appendConversation(userToappend);
      setSearch("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full">
      <input
        type="text"
        placeholder="Search…"
        className="input input-bordered rounded-full bg-white dark:text-white dark:bg-slate-700 w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearchSharp className="w-5 h-5" />
      </button>
    </form>
  );
};
export default SearchInput;
