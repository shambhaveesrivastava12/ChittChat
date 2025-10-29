import { useEffect, useRef, useMemo, useState } from "react";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";
import { useAuthContext } from "../../context/AuthContext";
import useGetBlockedUsers from "../../hooks/useGetBlockedUsers";
import useBlockUser from "../../hooks/useBlockUser";
import useUnblockUser from "../../hooks/useUnblockUser";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import TypingIndicator from "./TypingIndicator";
import NoChatSelected from "./NoChatSelected";

const MessageContainer = () => {
  const { selectedConversation, isTyping } = useConversation();
  const { socket } = useSocketContext();
  const { authUser } = useAuthContext();
  const bottomRef = useRef(null);
  const { users: blockedUsers, refresh: refreshBlocked } = useGetBlockedUsers();
  const { blockUser } = useBlockUser();
  const { unblockUser } = useUnblockUser();

  const isBlocked = useMemo(() => {
    if (!selectedConversation) return false;
    return blockedUsers?.some((u) => u._id === selectedConversation._id);
  }, [blockedUsers, selectedConversation]);

  if (!selectedConversation) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <p className="text-lg sm:text-xl">Welcome 👋 {authUser?.fullName} ❄</p>
        <p className="text-base sm:text-lg">Select a chat to start messaging</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-100 dark:bg-gray-800">
      {/* Header */}
      <div className="flex items-center justify-between bg-slate-300 dark:bg-slate-700 px-4 py-3 border-b border-slate-400/40 sticky top-0 z-10">
        <div>
          <span className="label-text text-gray-800 dark:text-gray-200 text-sm sm:text-base">
            To:
          </span>{" "}
          <span className="font-semibold text-gray-900 dark:text-white text-base sm:text-lg">
            {selectedConversation.fullName}
          </span>
        </div>

        <div className="flex gap-2">
          {!isBlocked ? (
            <button
              className="px-2 py-1 text-xs rounded bg-red-600 text-white"
              onClick={async () => {
                const ok = await blockUser(selectedConversation._id);
                if (ok) await refreshBlocked();
              }}
            >
              Block
            </button>
          ) : (
            <button
              className="px-2 py-1 text-xs rounded bg-blue-600 text-white"
              onClick={async () => {
                const ok = await unblockUser(selectedConversation._id);
                if (ok) await refreshBlocked();
              }}
            >
              Unblock
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 scrollbar-thin scrollbar-thumb-slate-400 dark:scrollbar-thumb-slate-700">
        <Messages />
        {isTyping && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="sticky bottom-0 bg-gray-200 dark:bg-slate-900 border-t border-slate-300 dark:border-slate-700 p-2 sm:p-3">
        {isBlocked ? (
          <div className="px-4 py-2 text-center text-sm text-gray-700 dark:text-gray-300">
            You have blocked this user. Unblock to send messages.
          </div>
        ) : (
          <MessageInput />
        )}
      </div>
    </div>
  );
};

export default MessageContainer;

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
