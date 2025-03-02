import  jwt  from "jsonwebtoken";
import bcrypt from "bcrypt"
import dotenv from "dotenv";
import User from "../models/user.model.js";
dotenv.config();

export const Login = async (req,res) => {
    console.log(process.env.JWT_SECRET);
   try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const passwordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ email: user.email }, "secret");
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error fetching login:", error); 
    res.status(500).json({ error: error.message }); 
  }
};