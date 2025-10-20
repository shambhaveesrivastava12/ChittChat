import mongoose from "mongoose";
import Conversation from "../models/conversation.model.js";
import User from "../models/user.model.js"
export const getConversation = async (req, res) => {
  try {
    // get the user name and userId from query parameter
    const username = req.query?.username // this username is username of the first user in a convo
    const userId = req.query?.userId // this userId is the userId of the second user in the convo which we will get directly from authContext in frontend

    if(!username || username.trim() === ""){
      return res.status(400).json({ error: "provide the username" });
    }
    if (!userId || userId.trim() === "") {
      return res.status(400).json({ error: "provide the user id" });
    }

    // querying the user collection to find user by username
    const user1Details = await User.findOne({username})
    if(!user1Details){
      return res.status(404).json({ error: "user with the provided username not found" });
    }
    const user1id = user1Details?._id

    // convert the id strings to mongose objectId and fetch the conversations
    let user2id;
    try {
      user2id = new mongoose.Types.ObjectId(userId);
    } catch (err) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }
    
    const user2idExists = await User.findById(user2id) // checking if user 2 exists

    if(!user2idExists){
      return res.status(404).json({ error: "user 2 does not exist" });
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [user1id, user2id] },
    })
      .populate("participants", "-password")
      .populate("messages");

    if(!conversation && user2idExists){// creating a conversation if it does not already exist
      conversation = await Conversation.create({
				participants: [user1id, user2id],
			});
      conversation = await Conversation.findOne({ // had to specificially find the created conversation otherwise it was causing somme issues
      participants: { $all: [user1id, user2id] },
    })
      .populate("participants", "-password")
      .populate("messages");
    }
    
    return res.status(200).json({
      conversation,
    });
  } catch (error) {
    console.error("Error in getConversations: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
