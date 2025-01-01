import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function useGetConversations() {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);


    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try {
                console.log('heloo i am working ok')
                const res = await fetch("http://localhost:8000/api/getallusers/users", {
                    method: 'GET',
                    credentials: 'include', // Important: sends cookies (like refresh token)
                });

                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error);
                }
                setConversations(data);
                console.log("this is a data", data)
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        getConversations();
    }, []);

    return { loading, conversations };
}
export default useGetConversations;

//http://localhost:8000/api/getallusers/users