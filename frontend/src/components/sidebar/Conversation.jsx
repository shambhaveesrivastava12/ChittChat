import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation, lastIdx, emoji }) => {
	const { selectedConversation, setSelectedConversation } = useConversation();
	const { onlineUsers } = useSocketContext();

	const isSelected = selectedConversation?._id === conversation._id;
	const isOnline = onlineUsers.includes(conversation._id);

	return (
		<>
			<div
				onClick={() => setSelectedConversation(conversation)}
				className={`flex gap-2 items-center 
					hover:bg-sky-500 dark:hover:bg-sky-700 
					rounded p-2 py-1 cursor-pointer transition-all duration-200
					${isSelected ? "bg-sky-500 dark:bg-sky-700 shadow-inner" : ""}
				`}
			>
				{/* Avatar */}
				<div className={`avatar ${isOnline ? "online" : ""}`}>
					<div className="w-12 rounded-full ring-2 ring-slate-700/30">
						<img
							src={conversation.profilePic}
							alt={`${conversation.fullName}'s avatar`}
							className="object-cover"
						/>
					</div>
				</div>

				{/* User Info */}
				<div className="flex flex-col flex-1">
					<div className="flex gap-3 justify-between items-center">
						<p
							className={`font-bold truncate ${
								isSelected ? "text-white" : "text-gray-800 dark:text-gray-200"
							}`}
						>
							{conversation.fullName}
						</p>
						<span className="text-xl">{emoji}</span>
					</div>
				</div>
			</div>

			{/* Divider */}
			{!lastIdx && <div className="divider my-0 py-0 h-1 opacity-30" />}
		</>
	);
};

export default Conversation;
