import { useState } from "react";
import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";
import useConversation from "../../zustand/useConversation";
import Conversation from "./Conversation";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";

const Conversations = () => {
  const { loading, conversations,loadMore } = useGetConversations(); 
	// conversations is now an object of the structure {
	// 	users,
	// 	nextCursor,
	// 	hasNextPage
	// }
  const {setSlicedUsers} = useConversation()
  const [offset,setOffset] = useState(0) // state variable to maintain the offset

  // function to handle scrolling
  const handleScroll = (direction,limit) => {
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

  return (
    <div className="py-2 flex flex-col overflow-auto">
	  {/* moved the loader up here since errors were being caused in the previous implementation */}
      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : (
        <>
          <button 
            className="m-auto"
            onClick={()=> handleScroll("up",5)}>
            <BsChevronUp size={18} />
          </button>
           <div className="overflow-auto my-2">
          {conversations.slicedUsers?.map((conversation, idx) => (
            <Conversation
              key={conversation._id}
              conversation={conversation}
              emoji={getRandomEmoji()}
              lastIdx={idx === conversations.slicedUsers.length - 1}
            />
          ))}
          </div>
          <button 
            className="m-auto"
            onClick={()=> handleScroll("down",5)}>
            <BsChevronDown size={18} />
          </button>
		  {conversations.hasNextPage?<button onClick={loadMore}>Load more</button>:null}
        </>
      )}
    </div>
  );
};
export default Conversations;

// STARTER CODE SNIPPET
// import Conversation from "./Conversation";

// const Conversations = () => {
//  return (
//      <div className='py-2 flex flex-col overflow-auto'>
//          <Conversation />
//          <Conversation />
//          <Conversation />
//          <Conversation />
//          <Conversation />
//          <Conversation />
//      </div>
//  );
// };
// export default Conversations;