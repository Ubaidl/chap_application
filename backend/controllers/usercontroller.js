import express from 'express'
import User from '../modules/usermodel.js';


const generatetoken = async (user_id) => {
    try {
        const user = await User.findById(user_id);

        if (!user) {
            throw new Error("User not found");
        }

        const refreshtoken = user.generaterefreshtoken();

        user.refreshtoken = refreshtoken;
        await user.save({ validateBeforeSave: false });

        return refreshtoken;
    } catch (error) {
        console.error("Error generating token:", error.message);
        throw new Error("Could not generate token");
    }
};


const userregister = async (req, res) => {
    // //res.send('hello world')
    // // res.status(200).json({
    // //     message: "ok"
    // // })
    //const fullname = req.body;
    //return res.send("i am a register")


    // // const { fullname, username, email, password, gender, profilepic } = req.body;
    try {
        const { fullname, username, email, password, gender } = req.body;
        console.log(fullname, username, email, password, gender)
        // return res.status(200).json({ fullname, username, email, password, gender });
        if ([fullname, username, email, password, gender].some((field) => field.trim() === "")) {
            console.log("all fields are must be filled")
            return res.status(400).json({ error: "all fielsd are must required" })
        }
        // //return res.status(201).json({
        // msg: "every thing is ok till now"
        //  })


        const existeduser = await User.findOne({
            $or: [{ username }, { email }]
        })
        if (existeduser) {
            console.log("user already existed");
            return res.status(400).json({ error: "user already existed" })

        }

        // //     //temporary hash the password

        const boyprofile = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlprofile = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newuser = await User.create({
            fullname,
            username,
            email,
            password,
            gender,
            profilepic: gender === 'male' ? boyprofile : girlprofile

        })
        const createduser = await User.findById(newuser._id)
        if (!createduser) {
            return res.status(500).json({ error: "Something went wrong" });
        }

        return res.status(201).json({
            createduser,
        });



    } catch (error) {
        res.status(500).json({ error: "internall error" })
        console.log("error")

    }

}
const userlogin = async (req, res) => {

    try {
        const { username, email, password } = req.body;
        if (!(username || email)) {
            return res.status(400).json({ error: "username or email are required" });

        }
        // 1 check point correction
        //  return res.status(400).json({ msg: "i received email or username" });

        const user = await User.findOne({
            $or: [{ username }, { email }]
        })

        if (!user) {
            return res.status(400).json({ error: "user not exist" });

        }
        // 2 check point correct return res.status(400).json({ msg: user });

        const isvalidpassword = await user.ispasswordCorrect(password)

        if (!isvalidpassword) {
            return res.status(400).json({ error: "password invalid" });

        }
        // 3 checkpoint is valid return res.status(400).json({ psd: " password is valid" });

        // error capture
        const refreshtoken = await generatetoken(user._id)
        //return res.status(400).json({ ref: refreshtoken });


        const loggedinuser = await User.findById(user._id).select("-password -refreshtoken")
        //5 check point correct
        //return res.status(400).json({ loggeninuser: loggedinuser });


        const options = {
            httpOnly: true,
            secure: true,
        }




        return res.status(201).cookie("refreshtoken", refreshtoken, options).json({
            user: loggedinuser,
            message: "user loggedin successfully"
        })
    } catch (error) {
        console.error("Login error:", error.message);
        return res.status(500).json({ error: "Internal server error" });

    }



    // try {
    //     const { username, email, password } = req.body;
    //     if (!username && !email) {
    //         return res.status(400).json({ error: "username or email are required" });

    //     }

    //     const user = await User.find({
    //         $or: [{ username }, { email }]
    //     })

    //     if (!user) {
    //         return res.status(400).json({ error: "user not exist" });
    //     }

    //     const isvalidpassword = await user.ispasswordCorrect(password);
    //     if (!isvalidpassword) {
    //         return res.status(400).json({ error: "password is incorrectt" });

    //     }
    //     const refreshtoken = await generaterefreshtoken(user._id);

    //     const loggedinuser = await User.findById(user._id).select("-password")

    //     const options = {
    //         httpOnly: true,
    //         secure: true
    //     }
    //     return res.status(200).cookie("refreshtoken,", refreshtoken, options).json({
    //         user: loggedinuser,
    //         meg: "sucessfully"
    //     })

    // } catch (error) {

    // }


}

const userlogout = async (req, res) => {
    try {
        // Update the user's refreshtoken field to undefined
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $set: {
                    refreshtoken: undefined,
                },
            },
            {
                new: true, // Return the updated value
            }
        );

        // Set cookie options
        const options = {
            httpOnly: true,
            secure: true,
        };

        // Clear the refresh token cookie and send response
        return res.status(200).clearCookie("refreshtoken", options).json({
            message: "Logout successful",
        });

    } catch (error) {
        // Handle errors
        console.error(error);
        return res.status(500).json({
            message: "Something went wrong during logout.",
        });
    }
};

export {
    userregister,
    userlogin,
    userlogout,
}