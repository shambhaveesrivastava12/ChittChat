import { useEffect, useRef, useState } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import TypingIndicator from "./TypingIndicator";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";
import { useSocketContext } from "../../context/SocketContext";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const [isTyping, setIsTyping] = useState(false);
  const { socket } = useSocketContext();
  const { authUser } = useAuthContext();
  const bottomRef = useRef(null);

  // Handle socket typing events
  useEffect(() => {
    if (!socket || !selectedConversation) return;

    const currentConversationId = selectedConversation._id;

    const handleTyping = ({ from }) => {
      if (from === currentConversationId) setIsTyping(true);
    };

    const handleStopTyping = ({ from }) => {
      if (from === currentConversationId) setIsTyping(false);
    };

    socket.on("typing", handleTyping);
    socket.on("stop_typing", handleStopTyping);

    setIsTyping(false); // reset when switching chats

    return () => {
      socket.off("typing", handleTyping);
      socket.off("stop_typing", handleStopTyping);
    };
  }, [socket, selectedConversation]);

  // Reset selected conversation when component unmounts
  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [selectedConversation]);

  if (!selectedConversation) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100 dark:bg-gray-800 text-center px-4 overflow-hidden">
        <div className="text-gray-800 dark:text-gray-200 font-semibold flex flex-col items-center gap-3">
          <p className="text-lg sm:text-xl">Welcome 👋 {authUser?.fullName} ❄</p>
          <p className="text-base sm:text-lg">Select a chat to start messaging</p>
          <TiMessages className="text-4xl sm:text-6xl text-slate-500 dark:text-slate-400 mt-2" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-100 dark:bg-gray-800">
      {/* Chat Header */}
      <div className="flex items-center justify-between bg-slate-300 dark:bg-slate-700 px-4 py-3 border-b border-slate-400/40 sticky top-0 z-10">
        <div>
          <span className="label-text text-gray-800 dark:text-gray-200 text-sm sm:text-base">
            To:
          </span>{" "}
          <span className="font-semibold text-gray-900 dark:text-white text-base sm:text-lg">
            {selectedConversation.fullName}
          </span>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 scrollbar-thin scrollbar-thumb-slate-400 dark:scrollbar-thumb-slate-700">
        <Messages />
        {isTyping && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* Input Fixed at Bottom */}
      <div className="sticky bottom-0 bg-gray-200 dark:bg-slate-900 border-t border-slate-300 dark:border-slate-700 p-2 sm:p-3">
        <MessageInput />
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