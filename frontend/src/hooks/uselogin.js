import React, { useState } from "react";
import { useAuthcontext } from "../Contextapi/Authcontext";
import toast from "react-hot-toast";

const uselogin = () => {
    const [loading, setloading] = useState(false);
    const { setauthuser } = useAuthcontext();

    const login = async ({ username, email, password }) => {
        setloading(true);
        try {
            const res = await fetch("http://localhost:8000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }), // Send data to match backend structure
                credentials: "include",
            });

            const data = await res.json();
            if (res.status !== 200 || data.error) {
                throw new Error(data.error || "Login failed");
            }

            // Store user data in localStorage or update state
            localStorage.setItem("user", JSON.stringify(data.user)); // Store user-specific safe data
            setauthuser(data.user);
            const refreshtoken = data.refreshtoken; // Assume you get this from your API response
            localStorage.setItem("refreshtoken", refreshtoken);

            toast.success("Login successful!");
            console.log("Logged in user:", data.user);
        } catch (error) {
            console.error("Login Error:", error.message);
            toast.error(error.message || "An error occurred during login.");
        } finally {
            setloading(false);
        }
    };

    return { loading, login };
};

export default uselogin;
