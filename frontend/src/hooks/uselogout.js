import React, { useState } from "react";
import { useAuthcontext } from "../Contextapi/Authcontext";
import toast from "react-hot-toast";

const uselogout = () => {
    const [loading, setloading] = useState(false);
    const { setauthuser } = useAuthcontext();

    const logout = async () => {
        setloading(true);
        try {
            const res = await fetch("http://localhost:8000/api/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // Include cookies with the request
            });

            const data = await res.json();
            if (res.status !== 200 || data.error) {
                throw new Error(data.error || "Logout failed");
            }

            // Clear user data from localStorage and auth context
            localStorage.removeItem("refreshtoken");
            localStorage.removeItem("user");
            //localStorage.removeItem("refreshtoken");

            setauthuser(null);


            toast.success("Logout successful!");
        } catch (error) {
            console.error("Logout Error:", error.message);
            toast.error(error.message || "An error occurred during logout.");
        } finally {
            setloading(false);
        }
    };

    return { loading, logout };
};

export default uselogout;
