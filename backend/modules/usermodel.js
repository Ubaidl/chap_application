import mongoose, { Schema } from 'mongoose'
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';




const userschema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilepic: {
        type: String,
        default: ""
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female']
    },
    refreshtoken: { type: String },

}, {
    timestamps: true,
})
userschema.pre("save", async function (next) {
    console.log("Pre-save hook triggered");
    // Ensure `this` refers to the document
    if (!this.isModified("password")) return next();

    try {
        // Hash the password with bcryptjs
        this.password = await bcryptjs.hash(this.password, 10);
        next();
    } catch (err) {
        next(err); // Pass error to the next middleware
    }
});
userschema.methods.ispasswordCorrect = async function (password) {
    return await bcryptjs.compare(password, this.password);
}
userschema.methods.generaterefreshtoken = async function () {
    return jwt.sign({
        _id: this.id,
        fullname: this.fullname,
        username: this.username,
        email: this.email,

    },
        process.env.REFRESH_SCREAT,
        {
            expiresIn: process.env.REFRESH_EXPIRES
        }
    )

}



const User = mongoose.model("User", userschema)
export default User;



