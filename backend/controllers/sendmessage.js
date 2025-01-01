import express from 'express';
import Conservation from '../modules/conservation.js';
import Message from '../modules/messages.js';
import Mongoose from 'mongoose'; // import with uppercase M

const sendmessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user?._id;

        console.log("Request body:", req.body);
        console.log("Receiver ID:", receiverId);
        console.log("Sender ID:", senderId);

        if (!senderId || !receiverId || !message) {
            console.error("Validation failed: Missing required fields");
            return res.status(400).json({ error: "Missing required fields" });
        }

        if (!Mongoose.isValidObjectId(senderId) || !Mongoose.isValidObjectId(receiverId)) {
            console.error("Validation failed: Invalid ObjectId");
            return res.status(400).json({ error: "Invalid sender or receiver ID" });
        }

        let conservation = await Conservation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!conservation) {
            console.log("No existing conversation. Creating a new one.");
            conservation = await Conservation.create({
                participants: [senderId, receiverId],

            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });
        if (newMessage) {
            conservation.messages.push(newMessage._id);

        }



        console.log("Saving conversation and message...");
        await Promise.all([conservation.save(), newMessage.save()]);

        console.log("Message saved successfully:", newMessage);
        res.status(201).json(newMessage);
    } catch (error) {
        console.error("Error in sending message controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};


const getmessage = async (req, res) => {
    try {
        const { id: receiverId } = req.params;
        const userId = req.user._id;

        if (!Mongoose.isValidObjectId(receiverId) || !Mongoose.isValidObjectId(userId)) {
            return res.status(400).json({ error: "Invalid user or receiver ID" });
        }

        const senderObjectId = new Mongoose.Types.ObjectId(userId);
        const receiverObjectId = new Mongoose.Types.ObjectId(receiverId);

        const conversation = await Conservation.findOne({
            participants: { $all: [userId, receiverId] }
        }).populate("messages");

        if (!conversation) return res.status(200).json([]);

        const messages = conversation.messages;
        res.status(200).json(messages);

    } catch (error) {
        console.error("Error in getting messages:", error.message);
        res.status(500).json({ error: "Something went wrong" });
    }
};

export { sendmessage, getmessage };
