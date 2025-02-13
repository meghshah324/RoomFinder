import User from "../models/user.model.js";
import becrypt from "bcryptjs"
import { errorHandler } from "../utils/error.js";

export  const signup = async (req,res,next) => {
    const {username , email ,  password , gender } = req.body;
    const hashPassword = becrypt.hashSync(password,10);
    const newUser = new User({
         username , email, password : hashPassword ,gender
    })
    try{
        await newUser.save();
        res.status(200).json({ message: "User Created Successfully" });
    } catch(err){
        next(err);
    }
}