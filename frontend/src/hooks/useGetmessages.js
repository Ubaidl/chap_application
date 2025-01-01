import React, { useEffect, useState } from 'react'
import useConversation from '../zustand/useConversation';
import toast from 'react-hot-toast';

const useGetmessages = () => {
    const [loading, setloading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        const getmessages = async () => {
            setloading(true);
            try {
                const res = await fetch(`http://localhost:8000/api/sendmsg/getmessage/${selectedConversation._id}`, {
                    method: 'GET',
                    credentials: 'include', // Important: sends cookies (like refresh token)
                });

                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error);
                }

                console.log("api response", data)
                if (!Array.isArray(data)) {
                    throw new Error("API response is not an array");
                }
                setMessages(data);

            } catch (error) {
                toast.error(error.message)

            } finally {
                setloading(false);
            }

        }

        if (selectedConversation?._id) getmessages();

    }, [selectedConversation?._id, setMessages])

    return { messages, loading }
}

export default useGetmessages

//http://localhost:8000/api/sendmsg/getmessage/${selectedConversation._id}