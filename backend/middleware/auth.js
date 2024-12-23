import jwt from "jsonwebtoken"
import User from '../modules/usermodel.js'

const verifyjwt = (async (req, res, next) => {
    try {
        const token = req.cookies?.refreshtoken;
        //console.log(token)

        if (!token) {
            return res.status(401).json({
                error: "unauthorized request",
            });

        }
        const decodedtoken = jwt.verify(token, process.env.REFRESH_SCREAT);
        console.log(decodedtoken)
        const user = await User.findById(decodedtoken?._id).select('-password  -refreshtoken');
        if (!user) {
            return res.status(401).json({
                error: "invalid Accesstoken",
            });

        }
        req.user = user;
        next()
    } catch (error) {
        return res.status(401).json({
            error: "invalid accesstoken",
        });

    }
});
export default verifyjwt;