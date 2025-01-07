import { createContext, useContext, useState, useEffect } from "react";
import { useAuthcontext } from "./Authcontext";
import io from 'socket.io-client';

// Create a context for Socket
const SocketContext = createContext();
export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);  // Initializing as null instead of an empty array
    const [onlineUser, setOnlineUser] = useState([]);  // Renamed to `onlineUser` for consistency
    const { authuser } = useAuthcontext();  // Assuming you have an AuthContext that provides the authenticated user

    useEffect(() => {
        if (authuser) {
            // Create a socket connection when the user is authenticated
            const socketInstance = io("http://localhost:8000", {
                query: { userId: authuser._id },  // Sending user ID for socket identification
            });

            setSocket(socketInstance);

            // Listen for online users updates
            socketInstance.on("getOnlineUsers", (users) => {
                setOnlineUser(users);
            });

            // Cleanup on unmount or when authuser changes
            return () => socketInstance.close();
            //setSocket(null);
        } else {
            // Close the socket if there's no authenticated user
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authuser]);  // Effect depends on authuser

    return (
        <SocketContext.Provider value={{ socket, onlineUser }}>
            {children}
        </SocketContext.Provider>
    );
};
