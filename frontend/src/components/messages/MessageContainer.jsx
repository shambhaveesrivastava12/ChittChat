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
