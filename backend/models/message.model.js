import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        message: {
            type: String,
        },
        fileUrl: {
            type: String,
        },
        fileType: {
            type: String,
        },
        deliveredTo: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        seenBy: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        // createdAt, updatedAt
    },
    { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;