import React, { useEffect } from 'react';
import { useSocketContext } from '../Contextapi/socketcontext';
import useConversation from '../zustand/useConversation';
import Messages from '../components/Messages';

const uselistenmessages = () => {
    const { socket } = useSocketContext();
    const { messages, setmessages } = useConversation();

    useEffect(() => {
        socket?.on("newmessage", (newmessage) => {
            newmessage.shouldShake = true;
            setmessages((prevMessages) => [...prevMessages, newmessage]);
        });

        return () => {
            socket?.off("newmessage");
        };
    }, [socket, setmessages, messages]);
};

export default uselistenmessages;
