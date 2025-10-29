import { useState } from "react";
import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";
import useConversation from "../../zustand/useConversation";
import Conversation from "./Conversation";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";

const Conversations = () => {
	const { loading, conversations, loadMore } = useGetConversations(); 
	// conversations is an object: { users, nextCursor, hasNextPage }
	const { setSlicedUsers } = useConversation();
	const [offset, setOffset] = useState(0); // offset for slicing

	// handle up/down scrolling for pagination
	const handleScroll = (direction, limit) => {
		const total = conversations.users.length;
		let newOffset = offset;

		if (direction === "down") {
			newOffset = Math.min(offset + limit, total - limit);
		} else if (direction === "up") {
			newOffset = Math.max(offset - limit, 0);
		}

		setOffset(newOffset);
		setSlicedUsers(conversations.users.slice(newOffset, newOffset + limit));
	};

	if (loading) {
		return (
			<div className="flex justify-center items-center py-4">
				<span className="loading loading-spinner text-sky-500"></span>
			</div>
		);
	}

	return (
		<div className="py-3 flex flex-col overflow-auto">
			{/* Scroll Up Button */}
			<button
				className="mx-auto mb-2 p-1 rounded-full bg-slate-800/40 hover:bg-slate-700/60 transition shadow-sm"
				onClick={() => handleScroll("up", 5)}
			>
				<BsChevronUp size={18} className="text-gray-300" />
			</button>

			{/* Conversations List */}
			<div className="overflow-auto my-2 custom-scrollbar">
				{conversations.slicedUsers?.length > 0 ? (
					conversations.slicedUsers.map((conversation, idx) => (
						<Conversation
							key={conversation._id}
							conversation={conversation}
							emoji={getRandomEmoji()}
							lastIdx={idx === conversations.slicedUsers.length - 1}
						/>
					))
				) : (
					<p className="text-center text-gray-400 text-sm py-4">
						No conversations found
					</p>
				)}
			</div>

			{/* Scroll Down Button */}
			<button
				className="mx-auto mt-2 p-1 rounded-full bg-slate-800/40 hover:bg-slate-700/60 transition shadow-sm"
				onClick={() => handleScroll("down", 5)}
			>
				<BsChevronDown size={18} className="text-gray-300" />
			</button>

			{/* Load More */}
			{conversations.hasNextPage && (
				<div className="text-center mt-3">
					<button
						onClick={loadMore}
						className="px-4 py-1.5 text-sm font-medium rounded-lg bg-sky-600/70 hover:bg-sky-500 transition text-white shadow-sm"
					>
						Load more
					</button>
				</div>
			)}
		</div>
	);
};

export default Conversations;

// // STARTER CODE SNIPPET
// // import Conversation from "./Conversation";

// // const Conversations = () => {
// //  return (
// //      <div className='py-2 flex flex-col overflow-auto'>
// //          <Conversation />
// //          <Conversation />
// //          <Conversation />
// //          <Conversation />
// //          <Conversation />
// //          <Conversation />
// //      </div>
// //  );
// // };
// // export default Conversations;
