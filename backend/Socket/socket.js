import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST"],
    },
});

export const getreceiversocketid = (receiverId) => {
    console.log("Fetching socket ID for receiver:", receiverId);
    console.log("Current userSocketMap:", userSocketMap);
    return userSocketMap[receiverId];
};


const userSocketMap = {};

io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;
    console.log("User connected with ID:", userId, "Socket ID:", socket.id);

    if (userId && userId !== "undefined") {
        userSocketMap[userId] = socket.id;
        console.log("Updated userSocketMap:", userSocketMap);
    }

    // Emit the list of online users
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // Handle user disconnection
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
        // Remove user from the socket map when they disconnect
        if (userId) {
            delete userSocketMap[userId];
        }
        // Emit updated online users list
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { app, server, io };
