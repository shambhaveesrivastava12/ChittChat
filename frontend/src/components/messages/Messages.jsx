import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {/* Render messages */}
      {!loading && messages.length > 0 && (
        messages.map((message, index) => (
          <div
            key={message._id || index}
            ref={index === messages.length - 1 ? lastMessageRef : null}
          >
            <Message message={message} />
          </div>
        ))
      )}

      {/* Loading skeleton */}
      {loading && (
        [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)
      )}

      {/* Empty state */}
      {!loading && messages.length === 0 && (
        <p className="text-center text-gray-800 dark:text-gray-200">
          Send a message to start the conversation
        </p>
      )}
    </div>
  );
};

export default Messages;

// STARTER CODE SNIPPET
// import Message from "./Message";

// const Messages = () => {
//  return (
//      <div className='px-4 flex-1 overflow-auto'>
//          <Message />
//          <Message />
//          <Message />
//          <Message />
//          <Message />
//          <Message />
//          <Message />
//          <Message />
//          <Message />
//          <Message />
//          <Message />
//          <Message />
//      </div>
//  );
// };
// export default Messages;