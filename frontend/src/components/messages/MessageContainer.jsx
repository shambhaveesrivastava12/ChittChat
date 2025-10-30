// import { useEffect, useMemo, useState } from "react";
// import useConversation from "../../zustand/useConversation";
// import MessageInput from "./MessageInput";
// import Messages from "./Messages";
// import TypingIndicator from "./TypingIndicator";
// import { TiMessages } from "react-icons/ti";
// import { useAuthContext } from "../../context/AuthContext";
// import { useSocketContext } from "../../context/SocketContext";
// import useGetBlockedUsers from "../../hooks/useGetBlockedUsers";
// import useBlockUser from "../../hooks/useBlockUser";
// import useUnblockUser from "../../hooks/useUnblockUser";

// const MessageContainer = () => {
//     const { selectedConversation, setSelectedConversation } = useConversation();
//     const [isTyping, setIsTyping] = useState(false);
//     const { socket } = useSocketContext();
//     const { users: blockedUsers, refresh: refreshBlocked } = useGetBlockedUsers();
//     const { blockUser } = useBlockUser();
//     const { unblockUser } = useUnblockUser();

//     const isBlocked = useMemo(() => {
//         if (!selectedConversation) return false;
//         return blockedUsers?.some((u) => u._id === selectedConversation._id);
//     }, [blockedUsers, selectedConversation]);

//     useEffect(() => {
//     if (!socket || !selectedConversation) return;

//     const currentConversationId = selectedConversation._id;

//     const handleTyping = ({ from }) => {
//         if (from === currentConversationId) {
//         setIsTyping(true);
//         }
//     };

//     const handleStopTyping = ({ from }) => {
//         if (from === currentConversationId) {
//         setIsTyping(false);
//         }
//     };

//     socket.on("typing", handleTyping);
//     socket.on("stop_typing", handleStopTyping);

//     setIsTyping(false); // reset when switching chats

//     return () => {
//         socket.off("typing", handleTyping);
//         socket.off("stop_typing", handleStopTyping);
//     };
//     }, [socket, selectedConversation]);


//     useEffect(() => {
//         // cleanup function (unmounts)
//         return () => setSelectedConversation(null);
//     }, [setSelectedConversation]);

//     return (
//         <div className='md:min-w-[450px] flex flex-col bg-gray-100 dark:bg-gray-800'>
//             {!selectedConversation ? (
//                 <NoChatSelected />
//             ) : (
//                 <>
//                     {/* Header */}
//                     <div className='bg-slate-300 dark:bg-slate-700 px-4 py-2 mb-2 flex items-center justify-between'>
//                         <div>
//                             <span className='label-text text-gray-800 dark:text-gray-200'>To:</span>{" "}
//                             <span className='text-gray-900 dark:text-white font-bold'>{selectedConversation.fullName}</span>
//                         </div>
//                         <div className='flex gap-2'>
//                             {!isBlocked ? (
//                                 <button
//                                     className='px-2 py-1 text-xs rounded bg-red-600 text-white'
//                                     onClick={async () => {
//                                         const ok = await blockUser(selectedConversation._id);
//                                         if (ok) {
//                                             await refreshBlocked();
//                                         }
//                                     }}
//                                 >
//                                     Block
//                                 </button>
//                             ) : (
//                                 <button
//                                     className='px-2 py-1 text-xs rounded bg-blue-600 text-white'
//                                     onClick={async () => {
//                                         const ok = await unblockUser(selectedConversation._id);
//                                         if (ok) {
//                                             await refreshBlocked();
//                                         }
//                                     }}
//                                 >
//                                     Unblock
//                                 </button>
//                             )}
//                         </div>
//                     </div>
//                     <Messages />
//                     {isTyping && <TypingIndicator />}
//                     {isBlocked ? (
//                         <div className='px-4 py-2 text-center text-sm text-gray-700 dark:text-gray-300'>
//                             You have blocked this user. Unblock to send messages.
//                         </div>
//                     ) : (
//                         <MessageInput />
//                     )}
//                 </>
//             )}
//         </div>
//     );
// };
// export default MessageContainer;

// const NoChatSelected = () => {
//     const { authUser } = useAuthContext();
//     return (
//         <div className='flex items-center justify-center w-full h-full'>
//             <div className='px-4 text-center sm:text-lg md:text-xl text-gray-800 dark:text-gray-200 font-semibold flex flex-col items-center gap-2'>
//                 <p>Welcome 👋 {authUser.fullName} ❄</p>
//                 <p>Select a chat to start messaging</p>
//                 <TiMessages className='text-3xl md:text-6xl text-center' />
//             </div>
//         </div>
//     );
// };

// // STARTER CODE SNIPPET
// // import MessageInput from "./MessageInput";
// // import Messages from "./Messages";

// // const MessageContainer = () => {
// //  return (
// //      <div className='md:min-w-[450px] flex flex-col'>
// //          <>
// //              {/* Header */}
// //              <div className='bg-slate-500 px-4 py-2 mb-2'>
// //                  <span className='label-text'>To:</span> <span className='text-gray-900 font-bold'>John doe</span>
// //              </div>

// //              <Messages />
// //              <MessageInput />
// //          </>
// //      </div>
// //  );
// // };
// // export default MessageContainer;
// src/components/messages/MessageContainer.jsx
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
  const { authUser } = useAuthContext();

  // blocked users hook
  const { blockedUsers, refresh: refreshBlocked } = useGetBlockedUsers();
  const blockUser = useBlockUser();
  const unblockUser = useUnblockUser();

  // example socket typing handling
  useEffect(() => {
    if (!socket) return;
    const onTyping = (payload) => {
      if (!selectedConversation) return;
      if (payload.conversationId === selectedConversation._id) {
        setIsTyping(payload.isTyping);
        // clear typing after a timeout
        if (payload.isTyping) {
          setTimeout(() => setIsTyping(false), 3500);
        }
      }
    };
    socket.on("typing", onTyping);
    return () => socket.off("typing", onTyping);
  }, [socket, selectedConversation]);

  // If no conversation selected -> show the central "Welcome" UI (matches screenshot)
  if (!selectedConversation) {
    return (
      <div className="w-full h-full flex flex-col">
        <div className="h-full flex flex-col items-center justify-center text-center px-6">
          <div className="w-full max-w-[280px]">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-700/60 mx-auto mb-4">
                <TiMessages className="w-8 h-8 text-white/90" />
              </div>
              <h2 className="text-white font-semibold text-lg mb-2">Welcome <span aria-hidden>👋</span> <span aria-hidden>❄️</span></h2>
              <p className="text-sm text-slate-300">Select a chat to start messaging</p>
            </div>
            <div className="mt-6 flex items-center justify-center">
              <div className="text-slate-400 text-3xl">💬</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // conversation selected -> show header, messages and input
  const otherParticipant = useMemo(() => {
    if (!selectedConversation?.participants || !authUser) return null;
    return selectedConversation.participants.find((p) => p._id !== authUser._id) || null;
  }, [selectedConversation, authUser]);

  const isBlocked = blockedUsers?.some((b) => b._id === (otherParticipant?._id || selectedConversation._id));

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700 bg-slate-900/40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white">
            {otherParticipant?.fullName?.[0]?.toUpperCase() || selectedConversation?.title?.[0]?.toUpperCase() || "U"}
          </div>
          <div className="flex flex-col">
            <span className="text-white font-medium text-sm">
              {otherParticipant?.fullName || selectedConversation?.title || "Conversation"}
            </span>
            <span className="text-xs text-slate-400">{otherParticipant?.username || ""}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Block / Unblock - keep your hooks calls */}
          {!isBlocked ? (
            <button
              className="px-3 py-1 text-xs rounded bg-rose-600 text-white"
              onClick={async () => {
                await blockUser(selectedConversation._id);
                await refreshBlocked();
              }}
            >
              Block
            </button>
          ) : (
            <button
              className="px-3 py-1 text-xs rounded bg-green-600 text-white"
              onClick={async () => {
                await unblockUser(selectedConversation._id);
                await refreshBlocked();
              }}
            >
              Unblock
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-auto px-4 py-3">
        <Messages />
        {isTyping && <TypingIndicator />}
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-slate-700 bg-slate-900/30">
        <MessageInput />
      </div>
    </div>
  );
};

export default MessageContainer;
