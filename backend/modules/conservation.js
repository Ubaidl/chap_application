import mongoose, { Schema } from "mongoose";
const conservationschema = new Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",  // Refers to the User model
    }],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
            default: [],

        }
    ]

}, {
    timestamps: true,
});
const conservation = mongoose.model("Conservation", conservationschema);
export default conservation;