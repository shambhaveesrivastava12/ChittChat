import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'
const useConversation = create(
	persist(
	(set) => ({
	selectedConversation: null,
	setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
	messages: [],
	setMessages: (messages) => set({ messages }),
	conversations: {
		users:[],
		nextCursor:null,
		hasNextPage:false,
    slicedUsers:[] // sliced users contain the current batch of users to show in the sidebar
	},
	setConversations: (newData,clear=false) => // set conversation now persist the previous users
        set((state) => {
          if(clear){ // clear is a flag variable which decides if the data is to be reset (in case of logout)
            return {
              conversations: {
		                          users:[],
		                          nextCursor:null,
		                          hasNextPage:false,
                              slicedUsers:[]
	            }
            }
          }
          const existingUsers = state.conversations.users;
          const newUsers = newData.users || [];

          // Filter out duplicates by _id
          const mergedUsers = [
            ...existingUsers,
            ...newUsers.filter(
              (newUser) => !existingUsers.some((u) => u._id === newUser._id)
            ),
          ];

          return {
            conversations: {
              users: mergedUsers,
              nextCursor: newData.nextCursor ?? state.conversations.nextCursor,
              hasNextPage: newData.hasNextPage ?? state.conversations.hasNextPage,
              slicedUsers: newUsers
            },
          };
        }),
	appendConversation: (conversation) =>  // this function is used when a single user is to be appended in the sidebar i.e when using the searching option
		 set((state) => {
          // avoid duplicates based on _id
          const alreadyExists = state.conversations.slicedUsers.some(
            (u) => u._id === conversation._id
          );

          if (alreadyExists) return state; // no change

          return {
            conversations: {
              ...state.conversations,
              slicedUsers: [conversation, ...state.conversations.slicedUsers],
            },
          };
        }),
	setSlicedUsers: (data) => // function to set the sliced users
    set((state)=>({
      conversations: {
        ...state.conversations,
        slicedUsers: data
      }
    }))
	}),
	{ // persisting the conversation data in local storage
      name: "conversation-storage",
	  storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        conversations: state.conversations,
        selectedConversation: state.selectedConversation,
      }),
    }
));

export default useConversation;
