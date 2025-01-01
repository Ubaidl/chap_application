import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Authcontext, useAuthcontext } from '../Contextapi/Authcontext';

const usesignup = () => {
    const [loading, setloading] = useState(false);
    const { authuser, setauthuser } = useAuthcontext(Authcontext)

    const signupfunction = async ({ fullname, username, email, password, gender }) => {
        const success = handleinputerrors({ fullname, username, email, password, gender });
        if (!success) return;

        setloading(true);
        try {
            const res = await fetch('http://localhost:8000/api/auth/register', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullname, username, email, password, gender }),
            });





            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }



            localStorage.setItem("user", JSON.stringify(data))
            setauthuser(data);

        } catch (error) {
            toast.error(error.message || "Something went wrong");
        } finally {
            setloading(false);
        }
    };

    return { signupfunction, loading };
};

export default usesignup;

function handleinputerrors({ fullname, username, email, password, gender }) {
    if (!fullname) {
        toast.error("Full name is required");
        return false;
    }
    if (!username) {
        toast.error("Username is required");
        return false;
    }
    if (!email) {
        toast.error("Email is required");
        return false;
    }
    if (!password) {
        toast.error("Password is required");
        return false;
    }
    if (!gender) {
        toast.error("Gender is required");
        return false;
    }
    return true;
}
