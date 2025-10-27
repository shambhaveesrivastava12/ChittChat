import { useEffect, useMemo, useState } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import TypingIndicator from "./TypingIndicator";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";
import { useSocketContext } from "../../context/SocketContext";
import useGetBlockedUsers from "../../hooks/useGetBlockedUsers";
import useBlockUser from "../../hooks/useBlockUser";
import useUnblockUser from "../../hooks/useUnblockUser";

const MessageContainer = () => {
    const { selectedConversation, setSelectedConversation } = useConversation();
    const [isTyping, setIsTyping] = useState(false);
    const { socket } = useSocketContext();
    const { users: blockedUsers, refresh: refreshBlocked } = useGetBlockedUsers();
    const { blockUser } = useBlockUser();
    const { unblockUser } = useUnblockUser();

    const isBlocked = useMemo(() => {
        if (!selectedConversation) return false;
        return blockedUsers?.some((u) => u._id === selectedConversation._id);
    }, [blockedUsers, selectedConversation]);

    useEffect(() => {
    if (!socket || !selectedConversation) return;

    const currentConversationId = selectedConversation._id;

    const handleTyping = ({ from }) => {
        if (from === currentConversationId) {
        setIsTyping(true);
        }
    };

    const handleStopTyping = ({ from }) => {
        if (from === currentConversationId) {
        setIsTyping(false);
        }
    };

    socket.on("typing", handleTyping);
    socket.on("stop_typing", handleStopTyping);

    setIsTyping(false); // reset when switching chats

    return () => {
        socket.off("typing", handleTyping);
        socket.off("stop_typing", handleStopTyping);
    };
    }, [socket, selectedConversation]);


    useEffect(() => {
        // cleanup function (unmounts)
        return () => setSelectedConversation(null);
    }, [setSelectedConversation]);

    return (
        <div className='md:min-w-[450px] flex flex-col bg-gray-100 dark:bg-gray-800'>
            {!selectedConversation ? (
                <NoChatSelected />
            ) : (
                <>
                    {/* Header */}
                    <div className='bg-slate-300 dark:bg-slate-700 px-4 py-2 mb-2 flex items-center justify-between'>
                        <div>
                            <span className='label-text text-gray-800 dark:text-gray-200'>To:</span>{" "}
                            <span className='text-gray-900 dark:text-white font-bold'>{selectedConversation.fullName}</span>
                        </div>
                        <div className='flex gap-2'>
                            {!isBlocked ? (
                                <button
                                    className='px-2 py-1 text-xs rounded bg-red-600 text-white'
                                    onClick={async () => {
                                        const ok = await blockUser(selectedConversation._id);
                                        if (ok) {
                                            await refreshBlocked();
                                        }
                                    }}
                                >
                                    Block
                                </button>
                            ) : (
                                <button
                                    className='px-2 py-1 text-xs rounded bg-blue-600 text-white'
                                    onClick={async () => {
                                        const ok = await unblockUser(selectedConversation._id);
                                        if (ok) {
                                            await refreshBlocked();
                                        }
                                    }}
                                >
                                    Unblock
                                </button>
                            )}
                        </div>
                    </div>
                    <Messages />
                    {isTyping && <TypingIndicator />}
                    {isBlocked ? (
                        <div className='px-4 py-2 text-center text-sm text-gray-700 dark:text-gray-300'>
                            You have blocked this user. Unblock to send messages.
                        </div>
                    ) : (
                        <MessageInput />
                    )}
                </>
            )}
        </div>
    );
};
export default MessageContainer;

const NoChatSelected = () => {
    const { authUser } = useAuthContext();
    return (
        <div className='flex items-center justify-center w-full h-full'>
            <div className='px-4 text-center sm:text-lg md:text-xl text-gray-800 dark:text-gray-200 font-semibold flex flex-col items-center gap-2'>
                <p>Welcome 👋 {authUser.fullName} ❄</p>
                <p>Select a chat to start messaging</p>
                <TiMessages className='text-3xl md:text-6xl text-center' />
            </div>
        </div>
    );
};

// STARTER CODE SNIPPET
// import MessageInput from "./MessageInput";
// import Messages from "./Messages";

// const MessageContainer = () => {
//  return (
//      <div className='md:min-w-[450px] flex flex-col'>
//          <>
//              {/* Header */}
//              <div className='bg-slate-500 px-4 py-2 mb-2'>
//                  <span className='label-text'>To:</span> <span className='text-gray-900 font-bold'>John doe</span>
//              </div>

//              <Messages />
//              <MessageInput />
//          </>
//      </div>
//  );
// };
// export default MessageContainer;