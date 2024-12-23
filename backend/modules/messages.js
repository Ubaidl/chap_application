import mongoose, { Schema } from "mongoose";

const messageschema = new Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,

    },
    receiverid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    message: {
        type: String,
        required: true,
    },


}, {
    timestamps: true,
}
);
const Message = mongoose.model("Message", messageschema)
export default Message;