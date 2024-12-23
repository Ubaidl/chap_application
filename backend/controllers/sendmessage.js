import express from 'express'
import Conservation from '../modules/conservation.js';
import Message from '../modules/messages.js';
import Mongoose from 'mongoose' // import with uppercase M

const sendmessage = async (req, res) => {
    //res.send("hello gays i as still alive")
    // const messageId = req.params.id; // Extract the ID from the URL
    // console.log('Message ID:', messageId);
    // res.send(`Message ID received: ${messageId}`);
    try {
        const { message } = req.body;
        const { id: receiverid } = req.params;//  const receiverid=req.params.id
        const senderId = req.user._id;

        const senderObjectId = new Mongoose.Types.ObjectId(senderId);
        const receiverObjectId = new Mongoose.Types.ObjectId(receiverid);

        let conservation = await Conservation.findOne({
            participants: { $all: [senderObjectId, receiverObjectId] }
        })
        if (!conservation) {
            conservation = await Conservation.create({
                participants: [senderObjectId, receiverObjectId]
            });

        }
        const newmessage = new Message({
            senderId: senderObjectId,      // Match schema field name
            receiverid: receiverObjectId, // Match schema field name
            message,


        });
        //return res.send(newmessage)

        if (newmessage) {
            conservation.messages.push(newmessage._id)
        }
        //return res.send(newmessage._id)

        // }
        await conservation.save();        // OR  await Promise.all([conservation.save(), newmessage.save()])
        await newmessage.save();


        return res.status(201).json(newmessage)
        // await newmessage.save();

        // res.status(201).json(newmessage)






    } catch (error) {
        console.log("error in sending message controller", error.message)
        res.status(500).json({ error: "internal serever error" })

    }

};

const getmessage = async (req, res) => {
    //res.send("hello gays i am get message router");
    try {
        const recerierId = req.params;
        const userId = req.user._id;
        //return res.status(200).json("i am ok");
        const senderObjectId = new Mongoose.Types.ObjectId(userId);
        const receiverObjectId = new Mongoose.Types.ObjectId(recerierId);
        if (!Mongoose.isValidObjectId(recerierId) || !Mongoose.isValidObjectId(userId)) {
            return res.status(400).json({ error: "Invalid user or receiver ID" });
        }


        const conversation = await Conservation.findOne({
            participants: { $all: [senderObjectId, receiverObjectId] }
        }).populate({
            path: 'messages', // Populate messages field
            select: 'senderId receiverid message createdAt' // Fields to include
        });



        if (!conversation) {
            return res.status(200).json();

        }

        const messages = conversation.messages;
        res.status(200).json({ meg: messages })
        console.log(messages)


    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "something went wrong" })

    }

}
export {
    sendmessage,
    getmessage,

}