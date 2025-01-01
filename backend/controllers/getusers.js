import express from 'express'
import User from '../modules/usermodel.js';

const getalluserforsidebar = async (req, res) => {
    // return res.send("hello boys");

    try {
        const loggedinuser = req.user._id;
        // return res.send(loggedinuser)

        if (!loggedinuser) {
            return res.status(500).json({ error: "user does not exist" });

        }

        const alluser = await User.find({ _id: { $ne: loggedinuser } }).select("-password");
        res.status(200).json(alluser)

    } catch (error) {
        res.status(500).json({ error: " something went wrong" })

    }
}



export {
    getalluserforsidebar,


}
