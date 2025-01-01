// const sendmessage = async (message) => {
//     setloading(true);
//     try {
//         if (!selectedConversation?._id) {
//             throw new Error("No conversation selected.");
//         }
//         console.log("Selected Conversation:", selectedConversation); // Log the selected conversation
//         console.log("Sending Message is !!!!:", message); // Log the message being sent

//         const res = await fetch(
//             `http://localhost:8000/api/sendmsg/sendmessage/${selectedConversation._id}`,
//             {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ message }),
//                 credentials: "include",
//             }
//         );

//         const data = await res.json();
//         console.log("Response from server:", data); // Log the response from the server

//         if (data.error) throw new Error(data.error);

//    const updatedMessages = Array.isArray(messages) ? messages : [];
// setMessages([...updatedMessages, data]);

//     } catch (error) {
//         toast.error(error.message || "An unexpected error occurred.");
//     } finally {
//         setloading(false);
//     }
// };
// export default useSendmessages;

// // const res = await fetch(
// //     `http://localhost:8000/api/sendmsg/sendmessage/${selectedConversation._id}`,
// //     {
// //         method: "POST",
// //         headers: {
// //             "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({ message }),
// //         credentials: "include",
// //     }
// // );


import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    const sendMessage = async (message) => {
        setLoading(true);
        try {
            const res = await fetch(
                `http://localhost:8000/api/sendmsg/sendmessage/${selectedConversation._id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ message }),
                    credentials: "include",
                }
            );
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            //const updatedMessages = Array.isArray(messages) ? messages : [];
            setMessages([...message, data]);

            //setMessages([...messages, data]);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { sendMessage, loading };
};
export default useSendMessage;