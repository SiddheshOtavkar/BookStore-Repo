import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Protected Routes token based
export const requireSignIn = async (req, res, next) => {
    try {
        const decode = JWT.verify(
            req.headers.authorization, // token headers me hota hai
            process.env.JWT_SECRET
        );
        req.user = decode;
        console.log(req.user);
        next();
    } catch (error) {
        console.log(error);
    }
};

//admin access
export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);
        if (user.role !== 1) {
            return res.status(401).send({
                success: false,
                message: "UnAuthorized Access"
            });
        }
        else {
            next(); //user admin hai toh access kar payega
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            error,
            message: "Error in admin middleware"
        });
    }
}