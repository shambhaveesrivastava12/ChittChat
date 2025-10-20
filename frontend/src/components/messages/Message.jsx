// frontend/src/components/messages/Message.jsx
import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";
import { FaFileAlt } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
// 1. IMPORT THE NEW PLUGIN
import remarkGfm from "remark-gfm";

const Message = ({ message }) => {
    const { authUser } = useAuthContext();
    const { selectedConversation } = useConversation();
    const fromMe = message.senderId === authUser._id;
    const formattedTime = extractTime(message.createdAt);
    const chatClassName = fromMe ? "chat-end" : "chat-start";
    const profilePic = fromMe
        ? authUser.profilePic
        : selectedConversation?.profilePic;
    const bubbleBgColor = fromMe
        ? "bg-blue-500 dark:bg-blue-700"
        : "bg-gray-200 dark:bg-gray-600";
    const bubbleTextColor = fromMe ? "text-white" : "text-gray-800 dark:text-white";
    const shakeClass = message.shouldShake ? "shake" : "";

    const isImage = message.fileType?.startsWith("image/");

    const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
    const fileSrc = message.fileUrl?.startsWith("http")
        ? message.fileUrl
        : `${API}${message.fileUrl}`;

    const fileName =
        message.fileUrl?.split("-").slice(1).join("-") || "file";

    return (
        <div className={`chat ${chatClassName}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img alt="User avatar" src={profilePic} />
                </div>
            </div>

            <div
                className={`chat-bubble ${bubbleTextColor} ${bubbleBgColor} ${shakeClass} pb-2 flex flex-col`}
            >
                {message.fileUrl && (
                    isImage ? (
                        <img
                            src={fileSrc}
                            alt="Sent file"
                            className="max-w-xs rounded-lg mb-2 cursor-pointer"
                            onClick={() => window.open(fileSrc, "_blank")}
                        />
                    ) : (
                        <a
                            href={fileSrc}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 p-2 bg-white/20 hover:bg-white/30 rounded-lg mb-2"
                        >
                            <FaFileAlt className="w-6 h-6" />
                            <span className="truncate">{fileName}</span>
                        </a>
                    )
                )}

                {/* 2. ADD THE PLUGIN TO THE COMPONENT */}
                {message.message && (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {message.message}
                    </ReactMarkdown>
                )}
            </div>

            <div className="chat-footer opacity-50 text-xs flex gap-1 items-center text-gray-800 dark:text-gray-300">
                {formattedTime}
            </div>
        </div>
    );
};

export default Message;