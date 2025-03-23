import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
    const { username, email, password, gender } = req.body;

    const hashPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({
        username,
        email,
        password: hashPassword,
        gender
    });

    try {
        await newUser.save();
        const jwtToken = jwt.sign({ userId: newUser._id, email: newUser.email }, "secret");

        res.cookie('token', jwtToken, {
            httpOnly: true,
            sameSite: 'Strict',
            secure: false,
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(200).json({ message: "User Created Successfully" });
    } catch (err) {
        next(err);
    }
}
